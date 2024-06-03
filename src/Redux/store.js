import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import employeeReducer from "./employeeSlice";
import departmentReducer from "./departmentsSlice";
import jobTitleReducer from "./jobtitlesSlice";
import payrollReducer from "./payrollSlice"; // Import the payroll reducer

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
  key: "root",
  storage,
  whitelist: ["user.isAuthenticated", "user.credentials.handle"],
};

const rootReducer = combineReducers({
  user: userReducer,
  employee: employeeReducer,
  department: departmentReducer,
  jobTitle: jobTitleReducer,
  payroll: payrollReducer, // Add the payroll reducer
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