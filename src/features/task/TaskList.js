import React, { useEffect } from "react";
import styles from "./taskList.module.css";
import { useSelector, useDispatch } from "react-redux";
import TaskItem from "./TaskItem";
import { fetchAsyncProf } from "../login/loginSlice";
import { selectTasks, fetchAsyncGet } from "./taskSlice";

const TaskList = () => {
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAsyncTaskAndProf = async () => {
      await dispatch(fetchAsyncProf());
      await dispatch(fetchAsyncGet());
    };
    fetchAsyncTaskAndProf();
  }, [dispatch]);

  return (
    <div>
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
