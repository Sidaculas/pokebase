import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function CatchButton({ onPress, isActive }: any) {
	const scale = useSharedValue(1);
	const glow = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
		shadowOpacity: glow.value,
	}));

	const onPressIn = () => {
		scale.value = withSpring(1.1);
		glow.value = withTiming(0.8, { duration: 200 });
	};

	const onPressOut = () => {
		scale.value = withSpring(1);
		glow.value = withTiming(0.5, { duration: 200 });
	};

	return (
		<AnimatedTouchable
			activeOpacity={0.9}
			onPressIn={onPressIn}
			onPressOut={onPressOut}
			onPress={onPress}
			style={[styles.button, animatedStyle]}
		>
			<MaterialIcons
				name="favorite"
				size={30}
				color={isActive ? "#ff4d6d" : "#000000"}
			/>
		</AnimatedTouchable>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#fff",
		width: 60,
		height: 60,
		borderRadius: 30,
		alignItems: "center",
		justifyContent: "center",
		alignSelf: "center",
		marginVertical: 20,
		shadowColor: "#dbd2d2",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.4,
		shadowRadius: 6,
		elevation: 5,
	},
});
