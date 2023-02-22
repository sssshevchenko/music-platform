import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITrack } from "../../types/track";

interface PlayerState {
    active: null | ITrack;
    volume: number;
    duration: number;
    currentTime: number;
    pause: boolean;
}

const initialState: PlayerState = {
    pause: true,
    active: null,
    currentTime: 0,
    duration: 0,
    volume: 50
}

export const playerSlice = createSlice({
    name: 'playerSlice',
    initialState,
    reducers: {
        pauseTrack(state) {
            state.pause = true
        },
        playTrack(state) {
            state.pause = false
        },
        setActive(state, action: PayloadAction<ITrack>) {
            state.active = action.payload
            state.duration = 0
            state.currentTime = 0
        },
        setCurrentTime(state, action: PayloadAction<number>) {
            state.currentTime = action.payload
        },
        setDuration(state, action: PayloadAction<number>) {
            state.duration = action.payload
        },
        setVolume(state, action: PayloadAction<number>) {
            state.volume = action.payload
        }
    }
})

export default playerSlice.reducer;
export const {pauseTrack, playTrack, setActive, setCurrentTime, setDuration, setVolume} = playerSlice.actions;