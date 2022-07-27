import React, { useContext, useState } from "react";
import TasksContext from "../context/TasksContext";
import ModalComponent from "./modal";
import TaskBars from "./taskBars";
import "./mainContainer.css";
import { Row, Col, Button, Modal } from "antd";

const MainContainer: React.FC = () => {
  const { tasks } = useContext(TasksContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <div className="flex flex-col align-center w-100 h-100">
        <Row className="mt-5">
          <Col span={8}>
            <Button
              type="primary"
              onClick={() => {
                setIsModalVisible(true);
              }}
            >
              View Done Tasks{" "}
            </Button>
            <Modal
              centered
              width={1000}
              visible={isModalVisible}
              onCancel={handleCancel}
              footer={null}
            >
              <TaskBars tasks={tasks} renderAsNested={true} />
            </Modal>
          </Col>
          <Col span={8}>Hello World</Col>
        </Row>
        <div className="justify-center flex flex-col flex-grow">
          <ModalComponent />
          {tasks.length && <TaskBars tasks={tasks} renderAsNested={false} />}
        </div>
      </div>
    </>
  );
};

export default MainContainer;
