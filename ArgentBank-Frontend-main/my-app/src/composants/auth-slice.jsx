import { createSlice } from "@reduxjs/toolkit";

const users = [
    {
        id: 1,
        firstName: "Tony",
        lastName: "Stark",
        email: "tony@stark.com",
        password: "password123",
    },
    {
        id: 2,
        firstName: "Steve",
        lastName: "Rogers",
        email: "steve@rogers.com",
        password: "password456",
    },
];

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        error: null,
        user: null,
    },
    reducers: {
        login: (state, action) => {
            const { email, password, rememberMe } = action.payload;
            const user = users.find(
                (u) => u.email === email && u.password === password
            );

            if (user) {
                state.isAuthenticated = true;
                state.user = user;
                state.error = null;

                if (rememberMe) {
                    localStorage.setItem("user", JSON.stringify(user));
                }
            } else {
                state.error = "Invalid username or password!";
            }
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
            localStorage.removeItem("user");
        },
        checkAuth: (state) => {
            const savedUser = localStorage.getItem("user");
            if (savedUser) {
                state.isAuthenticated = true;
                state.user = JSON.parse(savedUser);
            }
        },
        updateUsername: (state, action) => {
            if (state.user) {
                state.user.firstName = action.payload;
                localStorage.setItem("user", JSON.stringify(state.user)); 
            }
        }
    },
});

export const { login, logout, checkAuth, updateUsername} = authSlice.actions;
export default authSlice.reducer;