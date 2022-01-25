import React from "react";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Login.module.css";
import {
  fetchAsyncLogin,
  fetchAsyncRegister,
  editUsername,
  editPassword,
  toggleMode,
  selectAuthen,
  selectIsLoginView,
} from "./loginSlice";

const Login = () => {
  const dispatch = useDispatch();
  const authen = useSelector(selectAuthen);
  const isLoginView = useSelector(selectIsLoginView);
  const btnDisabler = authen.username === "" || authen.password === "";

  const login = async () => {
    if (isLoginView) {
      try {
        await dispatch(fetchAsyncLogin(authen));
      } catch (Error) {
        window.error("Loginに失敗しました");
      }
    }
    try {
      console.log(authen);
      const result = await dispatch(fetchAsyncRegister(authen));
      if (fetchAsyncRegister.fulfilled.match(result)) {
        await dispatch(fetchAsyncLogin(authen));
      }
    } catch (Error) {
      window.error("Registerに失敗しました");
    }
  };

  return (
    <div className={styles.containerLogin}>
      <div className={styles.appLogin}>
        <h1>{isLoginView ? "Login" : "Register"}</h1>
        <span>Username</span>
        <input
          type="text"
          className={styles.inputLog}
          name="username"
          placeholder=""
          onChange={(e) => dispatch(editUsername(e.target.value))}
          required
        />
        <span>Password</span>
        <input
          type="password"
          className={styles.inputLog}
          name="password"
          placeholder=""
          onChange={(e) => dispatch(editPassword(e.target.value))}
          required
        />
        <Button
          variant="contained"
          disabled={btnDisabler}
          color="primary"
          onClick={login}
        >
          {isLoginView ? "Login" : "Register"}
        </Button>
        <span
          className={styles.switchText}
          onClick={() => dispatch(toggleMode())}
        >
          {isLoginView ? "Create account" : "Back to Login"}
        </span>
      </div>
    </div>
  );
};

export default Login;
