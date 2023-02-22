import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ITrack } from "../../types/track";
import { fetchAllTracks } from "./FetchTracks";

interface TrackSlice {
    tracks: ITrack[];
    isLoading: boolean;
    error: string;
}

const initialState: TrackSlice = {
    tracks: [],
    isLoading: false,
    error: ''
}

export const trackSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAllTracks.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchAllTracks.fulfilled.type]: (state, action: PayloadAction<ITrack[]>) => {
            state.isLoading = false
            state.error = ''
            state.tracks = action.payload
        },
        [fetchAllTracks.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        [HYDRATE]: (state, action) => {
            state.tracks = action.payload.tracks.tracks
        }
    }
})

export default trackSlice.reducer;