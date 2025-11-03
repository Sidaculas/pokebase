import { Pokemon } from "@/types/pokemon.types";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

export async function getPokemons(offset: number, limit: number = 20) {
	try {
		const res = await fetch(`${API_URL}?offset=${offset}&limit=${limit}`);
		const data = await res.json();

		// fetch detailed pokemon
		const detailedPokemon = await Promise.all(
			data.results.map(async (pokemon: Pokemon) => {
				const res = await fetch(pokemon.url as string);
				const data = await res.json();
				return {
					name: pokemon.name,
					url: pokemon.url,
					image: data.sprites.front_default,
					id: pokemon.url.split("/")[6],
					types: data.types,
				};
			})
		);
		return detailedPokemon;
	} catch (error) {
		console.log("error loading pokemon", error);
		throw error;
	}
}

export async function getSinglePokemon(url: string) {
	try {
		// 1️⃣ Fetch base Pokémon data
		const res = await fetch(url);
		if (!res.ok) throw new Error("Failed to fetch Pokémon data");
		const data = await res.json();

		// 2️⃣ Image (official artwork or fallback)
		const image =
			data.sprites?.other?.["official-artwork"]?.front_default ||
			data.sprites?.front_default ||
			null;

		// 3️⃣ Fetch species for description + evolution chain
		const speciesRes = await fetch(data.species.url);
		const species = await speciesRes.json();

		// --- English description ---
		const englishEntry = species.flavor_text_entries?.find(
			(entry: any) => entry.language.name === "en"
		);
		const description = englishEntry
			? englishEntry.flavor_text.replace(/\s+/g, " ").trim()
			: "No description available.";

		// --- Evolution chain (optional summary) ---
		let evolutionChain = [];
		try {
			const evoRes = await fetch(species.evolution_chain.url);
			if (evoRes.ok) {
				const evoData = await evoRes.json();
				let evo = evoData.chain;
				while (evo) {
					evolutionChain.push(evo.species.name);
					evo = evo.evolves_to[0];
				}
			}
		} catch {
			evolutionChain = [];
		}

		// --- 4️⃣ Likes / Hates Flavors (via Nature) ---
		let lovesFood = null;
		let hatesFood = null;
		try {
			const natureId = (data.id % 25) + 1; // map Pokémon id to valid nature range
			const natureRes = await fetch(
				`https://pokeapi.co/api/v2/nature/${natureId}/`
			);
			if (natureRes.ok) {
				const nature = await natureRes.json();
				lovesFood = nature.likes_flavor?.name ?? null;
				hatesFood = nature.hates_flavor?.name ?? null;
			}
		} catch {
			lovesFood = null;
			hatesFood = null;
		}

		// --- 5️⃣ Stats (HP, Attack, Defense, etc.) ---
		const stats = data.stats?.map((s: any) => ({
			name: s.stat.name,
			base: s.base_stat,
		}));

		// --- 6️⃣ Abilities (with effects if available) ---
		const abilities = await Promise.all(
			data.abilities.map(async (ab: any) => {
				const abRes = await fetch(ab.ability.url);
				const abData = await abRes.json();
				const effect =
					abData.effect_entries.find((e: any) => e.language.name === "en")
						?.short_effect || "";
				return { name: ab.ability.name, effect };
			})
		);

		// --- 7️⃣ Return Final Object ---
		return {
			id: data.id,
			name: data.name,
			types: data.types.map((t: any) => t.type.name),
			height: data.height / 10, // meters
			weight: data.weight / 10, // kilograms
			base_experience: data.base_experience,
			image,
			description,
			stats,
			abilities,
			evolutionChain,
			lovesFood,
			hatesFood,
		};
	} catch (error) {
		console.error("Error fetching Pokémon:", error);
		return {
			id: null,
			name: null,
			image: null,
			description: "Error loading Pokémon data.",
			types: [],
			height: null,
			weight: null,
			base_experience: null,
			stats: [],
			abilities: [],
			evolutionChain: [],
			lovesFood: null,
			hatesFood: null,
		};
	}
}
