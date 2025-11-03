import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext<any>(null);

export const FavoritesProvider = ({ children }: any) => {
	const [favorites, setFavorites] = useState<any[]>([]);
	const STORAGE_KEY = "@favorites";

	useEffect(() => {
		const loadFavorites = async () => {
			try {
				const stored = await AsyncStorage.getItem(STORAGE_KEY);
				if (stored) {
					setFavorites(JSON.parse(stored));
				}
			} catch (err) {
				console.error("Error loading favorites:", err);
			}
		};
		loadFavorites();
	}, []);

	useEffect(() => {
		const saveFavorites = async () => {
			try {
				await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
			} catch (err) {
				console.error("Error saving favorites:", err);
			}
		};
		if (favorites.length > 0 || favorites.length === 0) {
			saveFavorites();
		}
	}, [favorites]);

	const addFavorite = (pokemon: any) => {
		setFavorites((prev) => {
			if (prev.some((p) => p.id === pokemon.id)) return prev;
			return [...prev, pokemon];
		});
	};

	const removeFavorite = (pokemonId: number) => {
		setFavorites((prev) => prev.filter((p) => p.id !== pokemonId));
	};

	const isFavorite = (pokemonId: number) =>
		favorites.some((p) => p.id === pokemonId);

	return (
		<FavoritesContext.Provider
			value={{ favorites, addFavorite, removeFavorite, isFavorite }}
		>
			{children}
		</FavoritesContext.Provider>
	);
};

export const useFavorites = () => useContext(FavoritesContext);
