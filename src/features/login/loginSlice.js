import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useHistory } from "react-router-dom";

const apiUrl = "http://localhost:8000";

// 本来絶対にやってはいけない(サンプルのため実装)
// localStorageはセキュアではない
// https://techracho.bpsinc.jp/hachi8833/2019_10_09/80851
const token = localStorage.localJWT;

export const fetchAsyncLogin = createAsyncThunk("login/post", async (auth) => {
  const res = await axios.post(`${apiUrl}/authen/jwt/create`, auth, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
});

export const fetchAsyncRegister = createAsyncThunk(
  "login/register",
  async (auth) => {
    const res = await axios.post(`${apiUrl}/api/register/`, auth, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  }
);

export const fetchAsyncProf = createAsyncThunk("login/get", async (auth) => {
  const res = await axios.get(`${apiUrl}/api/myself/`, {
    headers: { Authorization: `JWT ${token}` },
  });
  return res.data;
});

const loginSlice = createSlice({
  name: "login",
  initialState: {
    authen: {
      //user authentification
      username: "",
      password: "",
    },
    isLoginView: true, // ログイン画面でのモードの切り替え
    profile: {
      // ログインしているidとユーザー名
      id: 0,
      username: "",
    },
  },
  reducers: {
    editUsername(state, action) {
      state.authen.username = action.payload;
    },
    editPassword(state, action) {
      state.authen.password = action.payload;
    },
    toggleMode(state) {
      state.isLoginView = !state.isLoginView;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      localStorage.setItem("localJWT", action.payload.access); // axios.get.res.data
      action.payload.access && (window.location.href = "/tasks");
    });
    builder.addCase(fetchAsyncProf.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

export const { editUsername, editPassword, toggleMode } = loginSlice.actions;
// selectorで参照できるよう、エクスポート
// stateのオブジェクトを引数にstateを返却する
export const selectAuthen = (state) => state.login.authen;
export const selectIsLoginView = (state) => state.login.isLoginView;
export const selectProfile = (state) => state.login.profile;

export default loginSlice.reducer;
