import { createSlice } from "@reduxjs/toolkit";

// Función para obtener el usuario guardado en sesión (localStorage)
const getSessionUser = () => {
  try {
    const sessionUser = localStorage.getItem("sessionUser");
    return sessionUser ? JSON.parse(sessionUser) : null;
  } catch (error) {
    console.error("Error al leer 'sessionUser' de localStorage:", error);
    return null;
  }
};

// Slice de usuario
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: getSessionUser(),
    isAuthenticated: !!getSessionUser(),
  },
  reducers: {
    loginUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("sessionUser", JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      localStorage.removeItem("sessionUser");
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;