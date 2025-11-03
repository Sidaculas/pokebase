import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function SearchBar({ searchTerm, setSearchTerm }: any) {
	return (
		<View style={styles.searchContainer}>
			<MaterialIcons
				name="search"
				size={22}
				color="#777"
				style={styles.searchIcon}
			/>
			<TextInput
				style={styles.searchInput}
				placeholder="Search Pokémon by name"
				placeholderTextColor="#aaa"
				value={searchTerm}
				onChangeText={setSearchTerm}
				autoCapitalize="none"
				cursorColor="#ff4d6d"
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		borderRadius: 12,
		paddingHorizontal: 12,
		paddingVertical: 8,
		marginTop: 15,
		// marginHorizontal: 20,
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	searchIcon: {
		marginRight: 8,
	},
	searchInput: {
		flex: 1,
		fontSize: 16,
		color: "#333",
		fontWeight: "500",
	},
});
