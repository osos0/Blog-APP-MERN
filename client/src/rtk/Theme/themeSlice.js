import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

const userSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    ToggleTheme: (state, action) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { ToggleTheme } = userSlice.actions;

export default userSlice.reducer;
