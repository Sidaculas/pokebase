import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabsLayout() {
	return (
		<SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: "#ff4d6d",
					tabBarInactiveTintColor: "#555",
					tabBarStyle: styles.tabBar,
					tabBarLabelStyle: styles.tabLabel,
					headerShown: false,
				}}
			>
				{/* Home Tab */}
				<Tabs.Screen
					name="home"
					options={{
						title: "Home",
						tabBarIcon: ({ color, size }) => (
							<MaterialIcons name="home" size={size} color={color} />
						),
					}}
				/>

				{/* Favorites Tab */}
				<Tabs.Screen
					name="favorite"
					options={{
						title: "Favorites",
						tabBarIcon: ({ color, size }) => (
							<MaterialIcons name="favorite" size={size} color={color} />
						),
					}}
				/>
			</Tabs>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	tabBar: {
		position: "absolute",
		// bottom: Platform.OS === "ios" ? 30 : 20, // floating effect
		marginHorizontal: 10, // keeps inside screen edges
		height: 70,
		borderRadius: 35,
		backgroundColor: "#fff",
		borderWidth: 2,
		borderColor: "#ff4d6d",

		elevation: 8, // Android shadow
		// shadowColor: "#ff4d6d", // iOS shadow
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.3,
		shadowRadius: 10,

		// paddingBottom: Platform.OS === "ios" ? 10 : 5,
	},
	tabLabel: {
		fontSize: 12,
		fontWeight: "700",
		textTransform: "uppercase",
	},
});
