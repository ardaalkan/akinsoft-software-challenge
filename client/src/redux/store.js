import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ user: userReducer });

// Redux Persist için yapılandırma ayarları
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

// Redux Persist ile saklanacak reducer ifadeleri
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Serileştirilebilirlik kontrolü
    }),
});

export const persistor = persistStore(store);
