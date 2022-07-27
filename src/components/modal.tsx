import { Button, Modal } from "antd";
import CreateTaskForm from "./createTaskForm";
import { useContext } from "react";
import TasksContext from "../context/TasksContext";

import "./modal.css";

const ModalComponent = () => {
  const { isModalVisible, setIsModalVisible, tasks, setCurrentTask } =
    useContext(TasksContext);

  const showModal = () => {
    setIsModalVisible(true);
    setCurrentTask(null as any);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const anyTaskNotDone = tasks.some((task) => !task.done);
  return (
    <div>
      {!anyTaskNotDone && (
        <Button className="bg-orange" onClick={showModal}>
          Create Your First Task :)
        </Button>
      )}
      <Modal visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <CreateTaskForm setPopup={setIsModalVisible} />
      </Modal>
    </div>
  );
};

export default ModalComponent;
