import React from "react";
import styles from "./App.module.css";

import { FaSignInAlt } from "react-icons/fa";
import TaskList from "./features/task/TaskList";
import TaskDetail from "./features/task/TaskDetail";
import TaskInput from "./features/task/TaskInput";
import Header from "./features/login/Header";
import { useHistory } from "react-router-dom";

function App() {
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("localJWT");
    history.push({ pathname: "/" });
  };

  return (
    <div className={styles.containerTasks}>
      <div className={styles.appTasks}>
        <button onClick={logout} className={styles.signBtn}>
          <FaSignInAlt />
        </button>
        <Header />
        <TaskInput />
        <TaskList />
      </div>
      <div className={styles.appDetails}>
        <TaskDetail />
      </div>
    </div>
  );
}

export default App;
