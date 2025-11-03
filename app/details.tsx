import { colorType } from "@/lib/colorTypes";
import { getSinglePokemon } from "@/lib/fetchData";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CatchButton from "../components/button";
const { width } = Dimensions.get("window");

const Details = () => {
	const params = useLocalSearchParams();
	const [pokemon, setPokemon] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [activeTab, setActiveTab] = useState("Info");

	const loadPokemon = async () => {
		if (loading) return;
		setLoading(true);
		try {
			const data = await getSinglePokemon(params.url as string);
			setPokemon(data);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadPokemon();
	}, []);

	if (loading || !pokemon)
		return (
			<View style={styles.loadingContainer}>
				<Text style={styles.loadingText}>Loading...</Text>
			</View>
		);

	const renderContent = () => {
		switch (activeTab) {
			case "Info":
				return (
					<LinearGradient
						colors={["#f6656aff", "#e9cd8dff"]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={styles.card}
					>
						<Text style={styles.cardTitle}>Description</Text>
						<Text style={styles.cardText}>{pokemon.description}</Text>

						<Text style={styles.cardTitle}>Height & Weight</Text>
						<Text style={styles.cardText}>
							Height: {pokemon.height} m | Weight: {pokemon.weight} kg
						</Text>
					</LinearGradient>
				);
			case "Stats":
				return (
					<LinearGradient
						colors={["#f6656aff", "#e9cd8dff"]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={styles.card}
					>
						<Text style={styles.cardTitle}>Stats</Text>
						{pokemon.stats.map((st: any, index: number) => (
							<Text key={index} style={styles.cardText}>
								• {st.name}: {st.base}
							</Text>
						))}
					</LinearGradient>
				);
			case "Abilities":
				return (
					<LinearGradient
						colors={["#f6656aff", "#e9cd8dff"]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={styles.card}
					>
						<Text style={styles.cardTitle}>Abilities</Text>
						{pokemon.abilities.map((ab: any, index: number) => (
							<Text key={index} style={styles.cardText}>
								•{" "}
								<Text
									style={{ textDecorationLine: "underline", paddingBottom: 10 }}
								>
									{ab.name}
								</Text>
								: {"\n"} - {ab.effect}
							</Text>
						))}
					</LinearGradient>
				);
			case "Evolution":
				return (
					<LinearGradient
						colors={["#f6656aff", "#e9cd8dff"]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={styles.card}
					>
						<Text style={styles.cardTitle}>Evolution Chain</Text>
						<Text style={styles.cardText}>
							{pokemon.evolutionChain.join(" → ")}
						</Text>
					</LinearGradient>
				);
			case "Food":
				return (
					<LinearGradient
						colors={["#f6656aff", "#e9cd8dff"]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={styles.card}
					>
						<Text style={styles.cardTitle}>
							<MaterialCommunityIcons
								name="food-turkey"
								size={24}
								color="fire"
							/>{" "}
							Food Preferences
						</Text>
						<Text style={styles.cardText}> Loves: {pokemon.lovesFood} ❤️</Text>
						<Text style={styles.cardText}> Hates: {pokemon.hatesFood} 🤬</Text>
					</LinearGradient>
				);
			default:
				return null;
		}
	};

	return (
		<>
			<Stack.Screen
				options={{
					title: params.name as string,
					headerTitleAlign: "center",
				}}
			/>
			<SafeAreaView style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false}>
					{/* Pokémon Image */}
					<View style={styles.imageContainer}>
						<Image source={{ uri: pokemon.image }} style={styles.image} />
					</View>

					{/* Pokémon Name */}
					<Text style={styles.name}>{pokemon.name}</Text>

					{/* Pokémon Types */}
					<View style={styles.typeContainer}>
						{pokemon.types.map((type: string, idx: number) => (
							<Text
								key={idx}
								style={[
									styles.typeText,
									{ backgroundColor: colorType[type] || "#ccc" },
								]}
							>
								{type}
							</Text>
						))}
					</View>

					{/* Tabs */}
					<View style={styles.tabsContainer}>
						<LinearGradient
							colors={["#fff", "transparent"]}
							style={styles.fadeLeft}
							start={{ x: 0, y: 0 }}
							end={{ x: 0.1, y: 0 }}
						/>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={styles.tabsScroll}
						>
							{["Info", "Stats", "Abilities", "Evolution", "Food"].map(
								(tab) => (
									<TouchableOpacity
										key={tab}
										style={[styles.tab, activeTab === tab && styles.activeTab]}
										onPress={() => setActiveTab(tab)}
									>
										<Text
											style={[
												styles.tabText,
												activeTab === tab && styles.activeTabText,
											]}
										>
											{tab}
										</Text>
									</TouchableOpacity>
								)
							)}
						</ScrollView>
						<LinearGradient
							colors={["transparent", "#fff"]}
							style={styles.fadeRight}
							start={{ x: 0.9, y: 0 }}
							end={{ x: 1, y: 0 }}
						/>
					</View>

					{/* Tab Content */}
					<View style={styles.content}>{renderContent()}</View>

					<CatchButton />
				</ScrollView>
			</SafeAreaView>
		</>
	);
};

export default Details;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F6F8FC",
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	loadingText: {
		fontSize: 18,
		color: "#666",
	},

	imageContainer: {
		alignItems: "center",
		marginTop: 30,
	},
	image: {
		width: width * 0.8,
		height: 200,
		resizeMode: "contain",
	},
	name: {
		textAlign: "center",
		fontSize: 28,
		fontWeight: "bold",
		color: "#5467f9ff",
		marginTop: 10,
		textTransform: "capitalize",
		letterSpacing: 1,
	},
	typeContainer: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 10,
		marginVertical: 10,
		flexWrap: "wrap",
		marginBottom: 20,
	},
	typeText: {
		color: "#fff",
		fontWeight: "bold",
		borderRadius: 20,
		paddingHorizontal: 14,
		paddingVertical: 6,
		textTransform: "capitalize",
		fontSize: 14,
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowRadius: 3,
		elevation: 2,
	},

	tabsContainer: {
		flexDirection: "row",
		alignItems: "center",
		position: "relative",
	},
	tabsScroll: {
		paddingHorizontal: 16,
	},
	tab: {
		paddingVertical: 10,
		paddingHorizontal: 18,
		borderRadius: 20,
		marginRight: 10,
		backgroundColor: "#E3E6EB",
	},
	activeTab: {
		backgroundColor: "#f6656aff",
		shadowColor: "#f6656aff",
		shadowOpacity: 0.2,
		shadowRadius: 6,
		elevation: 4,
	},
	tabText: {
		fontSize: 14,
		color: "#333",
		fontWeight: "600",
		textTransform: "uppercase",
		letterSpacing: 0.5,
	},
	activeTabText: {
		color: "#fff",
		fontWeight: "bold",
	},

	content: {
		padding: 16,
	},

	card: {
		borderRadius: 16,
		marginBottom: 20,
		padding: 16,
		// borderWidth: 1.5,
		// borderColor: "#fff",
		shadowColor: "#333",
		shadowOpacity: 0.4,
		shadowRadius: 10,
		elevation: 6,
	},
	cardTitle: {
		fontSize: 20,
		fontWeight: "900",
		marginBottom: 10,
		color: "#f3ed43ff",
		textShadowColor: "rgba(255,255,255,0.3)",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 4,
		borderBottomWidth: 1,
		borderBottomColor: "rgba(255,255,255,0.1)",
		paddingBottom: 4,
	},
	cardText: {
		fontSize: 18,
		fontWeight: "600",
		color: "#1e0b30ff",
		marginBottom: 6,
		lineHeight: 22,
		letterSpacing: 0.3,
		fontStyle: "italic",
		textTransform: "capitalize",
	},

	fadeLeft: {
		position: "absolute",
		left: 0,
		top: 0,
		bottom: 0,
		width: 20,
		zIndex: 1,
	},
	fadeRight: {
		position: "absolute",
		right: 0,
		top: 0,
		bottom: 0,
		width: 20,
		zIndex: 1,
	},
	favoriteButton: {
		backgroundColor: "#8c1bd8ff",
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 30,
		alignSelf: "center",
		marginVertical: 16,
		shadowColor: "#4CAF50",
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 0.5,
		shadowRadius: 10,
		elevation: 8,
	},
	favoriteButtonText: {
		color: "#b7e914ff",
		fontSize: 16,
		fontWeight: "700",
		textAlign: "center",
		textTransform: "uppercase",
		letterSpacing: 1,
	},
});
