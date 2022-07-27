import React, { useState } from "react";

type Task = {
  title: string;
  description: string;
  kpis: string[];
  id: number;
  type: string;
  done: boolean;
};

type ContextType = {
  tasks: Array<Task>;
  setTasks: (tasks: Array<Task>) => void;
  isModalVisible: boolean;
  setIsModalVisible: (boolean: boolean) => void;
  currentTask: Task | any;
  setCurrentTask: (task: Task) => void;
};

const initialTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
const TasksContext = React.createContext<ContextType>({
  tasks: [],
  setTasks: () => {},
  isModalVisible: false,
  setIsModalVisible: () => {},
  currentTask: null,
  setCurrentTask: () => {},
});

export const TasksProvider = (props: any) => {
  const [tasks, setTasks] = useState<Array<Task>>(initialTasks);
  const [currentTask, setCurrentTask] = useState(null as any);
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        isModalVisible,
        setIsModalVisible,
        currentTask,
        setCurrentTask,
      }}
    >
      {props.children}
    </TasksContext.Provider>
  );
};

export default TasksContext;
