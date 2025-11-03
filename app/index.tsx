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

	const loadPokemon = async () => {
		if (loading || !hasMore) return;
		setLoading(true);
		try {
			const pokemons = await getPokemons(offset, limit);

			if (pokemons.length === 0) setHasMore(false);
			else {
				setPokemon((prev) => [
					...prev,
					...pokemons.filter((p) => !prev.some((pp) => pp.id === p.id)),
				]);
				setOffset((prev) => prev + limit);
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadPokemon();
	}, []);

	const screenWidth = Dimensions.get("window").width;
	const numColumns = screenWidth > 600 ? 3 : 2;
	console.log(searchTerm);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.header}>Pokébase</Text>
				<Text style={styles.subHeader}>Search for a Pokémon by name</Text>

				<TextInput
					placeholder="Search by Name"
					onChangeText={(text) => setSearchTerm(text)}
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
				onEndReached={loadPokemon}
				onEndReachedThreshold={0.5}
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
});
