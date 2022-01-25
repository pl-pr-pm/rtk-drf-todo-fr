import React from "react";
import styles from "./App.module.css";

import { FaSignInAlt } from "react-icons/fa";
import TaskList from "./features/task/TaskList";
import TaskDetail from "./features/task/TaskDetail";
import TaskInput from "./features/task/TaskInput";

function App() {
  const logout = () => {
    localStorage.removeItem("localJWT");
    window.location.href = "/";
  };

  return (
    <div className={styles.containerTasks}>
      <div className={styles.appTasks}>
        <button onClick={logout} className={styles.signBtn}>
          <FaSignInAlt />
        </button>
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
