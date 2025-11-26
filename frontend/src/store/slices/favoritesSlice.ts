import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Initial State
const initialState: string[] = [];

// Favorites Slice
const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        setFavorites(state, action: PayloadAction<string[]>) {
            const newState = action.payload;
            localStorage.setItem("wishlist", JSON.stringify(newState));
            return newState;
        },
        addFavorite(state, action: PayloadAction<string>) {
            const updatedState = [...state, action.payload];
            localStorage.setItem("wishlist", JSON.stringify(updatedState));
            return updatedState;
        },
        removeFavorite(state, action: PayloadAction<string>) {
            const updatedState = state.filter(item => item !== action.payload);
            localStorage.setItem("wishlist", JSON.stringify(updatedState));
            return updatedState;
        },
        removeAllFavorites() {
            const updatedState: string[] = [];
            localStorage.setItem("wishlist", JSON.stringify(updatedState));
            return updatedState;
        }
    },
});

// Export Actions
export const {
    setFavorites,
    addFavorite,
    removeFavorite,
    removeAllFavorites,
} = favoritesSlice.actions;

// Export Reducer
export default favoritesSlice.reducer;
