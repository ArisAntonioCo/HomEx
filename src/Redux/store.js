import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import electricityReducer from "./electricitySlice";
import waterReducer from "./waterSlice";
import foodReducer from "./foodSlice";
import maintenanceReducer from "./maintSlice";
import miscellaneousReducer from "./miscSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userAuth'],
};
const rootReducer = combineReducers({
  user: userReducer,
  electricity: electricityReducer,
  water: waterReducer,
  food: foodReducer,
  maintenance: maintenanceReducer,
  miscellaneous: miscellaneousReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer); 

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
