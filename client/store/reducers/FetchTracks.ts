import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ITrack } from "../../types/track";

export const fetchAllTracks = createAsyncThunk(
    'tracks/fetchAll',
    async (_, thunkApi) => {
        try {
            const response = await axios.get<ITrack[]>('http://localhost:5000/tracks')
            return response.data
        } catch(e: any) {
            thunkApi.rejectWithValue('Failed to load tracks')
        }
    }
)

export const searchTrack = createAsyncThunk(
    'tracks/fetchAll',
    async (query, thunkApi) => {
        try {
            const response = await axios.get<ITrack[]>('http://localhost:5000/tracks/search?query=' + query)
            return response.data
        } catch(e: any) {
            thunkApi.rejectWithValue('Failed to load tracks')
        }
    }
)