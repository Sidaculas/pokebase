import { FavoritesProvider } from "@/context/FavoritesContext";
import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<FavoritesProvider>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen
					name="index"
					options={{ title: "Home", headerShown: false }}
				/>
				<Stack.Screen
					name="details"
					options={{
						title: "details",
						headerBackButtonDisplayMode: "minimal",
						presentation: "formSheet",
						sheetAllowedDetents: [0.3, 0.5, 0.999],
						sheetGrabberVisible: true,
						sheetCornerRadius: 30,
					}}
				/>
			</Stack>
		</FavoritesProvider>
	);
}
