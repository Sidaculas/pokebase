import { colorType } from "@/lib/colorTypes";
import { getPokemons } from "@/lib/fetchData";
import { Pokemon } from "@/types/pokemon.types";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
	const [pokemon, setPokemon] = useState<Pokemon[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [offset, setOffset] = useState(0);
	const limit = 20;

	const loadPokemon = async (
		searchValue: string = "",
		offsetParam?: number
	) => {
		// use explicit offset when provided to avoid stale state issues
		const currentOffset =
			typeof offsetParam === "number" ? offsetParam : offset;
		// if not searching and no more pages, stop
		if (loading || (!hasMore && !searchValue)) return;
		setLoading(true);

		try {
			const pokemons = await getPokemons(currentOffset, limit);
			const filtered = searchValue
				? pokemons.filter((p) =>
						p.name.toLowerCase().includes(searchValue.toLowerCase())
				  )
				: pokemons;

			if (filtered.length === 0) {
				// For searches, don't immediately mark hasMore=false — there could be matches on later pages.
				if (!searchValue) {
					setHasMore(false);
				} else {
					// advance offset so future calls fetch the next page
					setOffset(currentOffset + limit);
				}
			} else {
				setPokemon((prev) =>
					currentOffset === 0
						? filtered
						: [
								...prev,
								...filtered.filter((p) => !prev.some((pp) => pp.id === p.id)),
						  ]
				);
				setOffset(currentOffset + limit);
			}
		} catch (error) {
			console.error("Error loading pokemon:", error);
			setHasMore(false);
		} finally {
			setLoading(false);
		}
	};

	// Initial load
	useEffect(() => {
		loadPokemon();
	}, []);

	// Handle search
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			// reset UI state then fetch starting at offset 0
			setOffset(0);
			setPokemon([]);
			setHasMore(true);
			loadPokemon(searchTerm, 0);
		}, 200); // debounce // debounce for 500ms

		return () => clearTimeout(timeoutId);
	}, [searchTerm]);

	const screenWidth = Dimensions.get("window").width;
	const numColumns = screenWidth > 600 ? 3 : 2;

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.header}>Pokébase</Text>
				<Text style={styles.subHeader}>Search for a Pokémon by name</Text>

				<TextInput
					style={styles.searchInput}
					placeholder="Search by Name"
					value={searchTerm}
					onChangeText={setSearchTerm}
				/>
			</View>

			<FlatList
				data={pokemon}
				numColumns={numColumns}
				renderItem={({ item }) => (
					<Link
						href={{
							pathname: "/details",
							params: { name: item.name, url: item.url },
						}}
						style={styles.cardLink}
					>
						<View
							style={[
								{
									backgroundColor: `${colorType[item.types[0].type.name]}50`,
									borderColor: `${colorType[item.types[0].type.name]}`,
								},
								styles.card,
							]}
						>
							<Image source={{ uri: item.image }} style={styles.pokemonImage} />
							<Text style={styles.pokemonName}>{item.name}</Text>
						</View>
					</Link>
				)}
				keyExtractor={(item) => item.id.toString()}
				onEndReached={() => {
					if (!searchTerm) {
						loadPokemon("", offset);
					} else {
						// when searching, continue fetching next page to find matches
						loadPokemon(searchTerm, offset);
					}
				}}
				onEndReachedThreshold={0.5}
				ListEmptyComponent={
					<Text style={styles.emptyText}>
						{loading ? "Loading..." : "No Pokémon found"}
					</Text>
				}
				ListFooterComponent={
					loading ? <ActivityIndicator style={{ margin: 16 }} /> : null
				}
				contentContainerStyle={styles.listContainer}
				columnWrapperStyle={numColumns > 1 && styles.row}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f9f9f9",
		paddingHorizontal: 10,
		marginTop: 16,
	},
	headerContainer: {
		marginBottom: 16,
		paddingTop: 12,
		paddingHorizontal: 4,
	},
	header: {
		fontSize: 36,
		fontWeight: "800",
		color: "#333",
	},
	subHeader: {
		fontSize: 16,
		color: "#666",
		marginTop: 4,
	},
	listContainer: {
		paddingBottom: 24,
		paddingTop: 8,
		// paddingHorizontal: 4,
	},
	row: {
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: 16,
	},
	cardLink: {
		flex: 1,
		alignItems: "center",
		marginHorizontal: 6,
		marginBottom: 12,
	},
	card: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 16,
		padding: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 2,

		width: "100%",
		height: 250,
		// // minHeight: 180,
		borderWidth: 1,
		// // borderColor: "#e0e7ef",
	},
	pokemonImage: {
		width: "100%",
		height: 150,
		marginBottom: 10,
	},
	pokemonName: {
		fontSize: 20,
		fontWeight: "600",
		textTransform: "capitalize",
		color: "#333",
	},
	searchInput: {
		backgroundColor: "white",
		padding: 12,
		borderRadius: 8,
		marginTop: 8,
		borderWidth: 1,
		borderColor: "#ddd",
	},
	emptyText: {
		textAlign: "center",
		marginTop: 20,
		fontSize: 16,
		color: "#666",
	},
});
