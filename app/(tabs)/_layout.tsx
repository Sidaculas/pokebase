import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function TabsLayout() {
	return (
		<View style={styles.container}>
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: "#ff4d6d",
					tabBarInactiveTintColor: "#aaa",
					tabBarStyle: {
						backgroundColor: "#fff",
						borderTopWidth: 0,
						elevation: 5,
						paddingBottom: 8,
						height: 60,
					},
					headerShown: false,
				}}
			>
				<Tabs.Screen
					name="home"
					options={{
						title: "Home",
						tabBarIcon: ({ color, size }) => (
							<MaterialIcons name="home" size={size} color={color} />
						),
					}}
				/>
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
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
