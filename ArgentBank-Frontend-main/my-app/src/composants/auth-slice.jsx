import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api/v1/user";


export const signUp = createAsyncThunk(
    "auth/signupUser",
    async ({ email, password, firstName, lastName }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/signup`, {
                email,
                password,
                firstName,
                lastName,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Erreur de l'inscription");
        }
    }
);


export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password, rememberMe }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
            console.log("🔍 Réponse complète de l'API Login :", response.data);
            const token = response.data.body?.token;
            if (!token) {
                throw new Error("Token non reçu !");
            }
            if (rememberMe) {
                localStorage.setItem("token", token);
            } else {
                localStorage.removeItem("token");
            }

            return { token };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Erreur de connexion");
        }
    }
);


export const fetchUserProfile = createAsyncThunk(
    "auth/fetchUserProfile",
    async (token, { rejectWithValue }) => {
        try {
           
            if (!token) {
                throw new Error("Aucun token trouvé");
            }
            const response = await axios.get(`${API_BASE_URL}/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log("🔍 Réponse complète de l'API Profile :", response.data);

            if (response.data.status !== 200) {
                throw new Error(response.data.message || "Erreur lors de la récupération du profil");
            }

            return response.data.body;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Impossible de récupérer le profil");
        }
    }
);


export const updateUserProfile = createAsyncThunk(
    "auth/updateUserProfile",
    async ({ firstName, lastName }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token") 

            if (!token) {
                throw new Error("Aucun token trouvé");
            }

            const response = await axios.put(
                `${API_BASE_URL}/profile`,
                { firstName, lastName },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.status !== 0) {
                throw new Error(response.data.message || "Erreur lors de la mise à jour");
            }

            return response.data.body;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Échec de la mise à jour du profil");
        }
    }
);


const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: localStorage.getItem("token") || null,
        isAuthenticated: !!(localStorage.getItem("token")),
        rememberMe: !!localStorage.getItem("token"),
        user: null,
        error: null,

    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.rememberMe = false;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.rememberMe = action.payload.rememberMe;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                console.log("✅ Profil utilisateur récupéré :", action.payload);
                state.user = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.user = { ...state.user, ...action.payload };
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;