import React, { createContext, useContext, useState } from "react";

const FavoritesContext = createContext<any>(null);

export const FavoritesProvider = ({ children }: any) => {
	const [favorites, setFavorites] = useState<any[]>([]);

	const addFavorite = (pokemon: any) => {
		// Avoid duplicates by name or ID
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
