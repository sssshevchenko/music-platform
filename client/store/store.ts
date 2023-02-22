import { combineReducers, configureStore} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import playerReducer from "./reducers/PlayerReducer";
import trackReducer from "./reducers/TracksReducer";

const rootReducer = combineReducers({
    player: playerReducer,
    tracks: trackReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(setupStore, {debug: true})