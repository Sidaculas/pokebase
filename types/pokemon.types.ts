export interface Pokemon {
	name: string;
	url: string;
	image: string;
	id: string;
	types: PokemonTypes[];
}

interface PokemonTypes {
	type: {
		name: string;
		url: string;
	};
}

export interface PokemonStat {
	name: string;
	base: number;
}

export interface PokemonAbility {
	name: string;
	effect: string;
}

export interface PokemonData {
	id: number | null;
	name: string | null;
	types: string[];
	height: number | null; // in meters
	weight: number | null; // in kilograms
	base_experience: number | null;
	image: string | null;
	description: string;
	stats: PokemonStat[];
	abilities: PokemonAbility[];
	evolutionChain: string[];
	lovesFood: string | null;
	hatesFood: string | null;
}
