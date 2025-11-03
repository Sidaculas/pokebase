import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useFavorites } from "../../context/FavoritesContext";

export default function Favorite() {
	const { favorites } = useFavorites();

	if (favorites.length === 0) {
		return (
			<View style={styles.emptyContainer}>
				<Text style={styles.emptyText}>No favorites yet ❤️</Text>
			</View>
		);
	}

	return (
		<FlatList
			data={favorites}
			keyExtractor={(item) => item.id.toString()}
			contentContainerStyle={styles.listContainer}
			renderItem={({ item }) => (
				<View style={styles.card}>
					<Image source={{ uri: item.image }} style={styles.image} />
					<Text style={styles.name}>{item.name}</Text>
				</View>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	listContainer: { padding: 20 },
	card: {
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 12,
		marginBottom: 12,
		flexDirection: "row",
		alignItems: "center",
		elevation: 3,
	},
	image: { width: 60, height: 60, marginRight: 12 },
	name: { fontSize: 18, fontWeight: "bold", color: "#333" },
	emptyContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	emptyText: { fontSize: 18, color: "#aaa" },
});
