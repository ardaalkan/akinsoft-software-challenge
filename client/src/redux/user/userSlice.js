import { createSlice } from "@reduxjs/toolkit";

// Başlangıç durumu (initial state) tanımı
const initialState = {
  currentUser: null, // Geçerli kullanıcı bilgisi
  error: null, // Hata durumu
  loading: false, // Yüklenme durumu
};

// Redux slice'ı oluşturulur
const userSlice = createSlice({
  name: "user", // Slice'ın adı
  initialState, // Başlangıç durumu
  reducers: {
    // Kullanıcı girişi başladığında çalışır
    signInStart: (state) => {
      state.loading = true;
    },
    // Kullanıcı girişi başarılı olduğunda çalışır
    signInSuccess: (state, action) => {
      state.currentUser = action.payload; // Geçerli kullanıcı bilgisi güncellenir
      state.loading = false; // Yüklenme durumu sıfırlanır
      state.error = null; // Hata durumu sıfırlanır
    },
    // Kullanıcı girişi başarısız olduğunda çalışır
    signInFailure: (state, action) => {
      state.error = action.payload; // Hata mesajı güncellenir
      state.loading = false; // Yüklenme durumu sıfırlanır
    },
    // Kullanıcı hesabını silme işlemi başladığında çalışır
    deleteUserStart: (state) => {
      state.loading = true;
    },
    // Kullanıcı hesabını silme işlemi başarılı olduğunda çalışır
    deleteUserSuccess: (state) => {
      state.currentUser = null; // Geçerli kullanıcı bilgisi null olarak sıfırlanır
      state.loading = false; // Yüklenme durumu sıfırlanır
      state.error = null; // Hata durumu sıfırlanır
    },
    // Kullanıcı hesabını silme işlemi başarısız olduğunda çalışır
    deleteUserFailure: (state, action) => {
      state.error = action.payload; // Hata mesajı güncellenir
      state.loading = false; // Yüklenme durumu sıfırlanır
    },
    // Kullanıcı oturumu kapatma işlemi başladığında çalışır
    signOutStart: (state) => {
      state.loading = true;
    },
    // Kullanıcı oturumu başarılı bir şekilde kapattığında çalışır
    signOutSuccess: (state) => {
      state.currentUser = null; // Geçerli kullanıcı bilgisi null olarak sıfırlanır
      state.loading = false; // Yüklenme durumu sıfırlanır
      state.error = null; // Hata durumu sıfırlanır
    },
    // Kullanıcı oturumu kapatma işlemi başarısız olduğunda çalışır
    signOutFailure: (state, action) => {
      state.error = action.payload; // Hata mesajı güncellenir
      state.loading = false; // Yüklenme durumu sıfırlanır
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signOutFailure,
  signOutStart,
  signOutSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
