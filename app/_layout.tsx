import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Stack>
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
		</GestureHandlerRootView>
	);
}
