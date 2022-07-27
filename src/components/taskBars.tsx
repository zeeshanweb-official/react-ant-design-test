import * as React from "react";
import { Row, Col, Typography, Button, Modal } from "antd";

import { useContext } from "react";
import TasksContext from "../context/TasksContext";

const { Text } = Typography;

type Task = {
  title: string;
  description: string;
  kpis: string[];
  id: number;
  type: string;
  done: boolean;
};

interface IAppProps {
  tasks: Array<Task>;
  renderAsNested: boolean;
}

const TaskBars: React.FunctionComponent<IAppProps> = (props) => {
  const { setIsModalVisible, setCurrentTask, setTasks } =
    useContext(TasksContext);
  const [showDataModal, setShowDataModal] = React.useState(false);
  const [currentTaskDetails, setCurrentTaskDetails] = React.useState<Task>();

  const openModal = (task: Task) => {
    setIsModalVisible(true);
    setCurrentTask(task);
  };

  const markAsDone = (task: Task) => {
    const newTasks = props.tasks.map((t) => {
      if (t.id === task.id) {
        t.done = true;
      }
      return t;
    });
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTasks(newTasks);
    setShowDataModal(false);
  };

  const dataToRender = props.renderAsNested
    ? props.tasks.filter((t) => t.done)
    : props.tasks.filter((t) => !t.done);

  const openDataModal = (task: Task) => {
    if (props.renderAsNested) {
      return;
    }
    setShowDataModal(true);
    setCurrentTaskDetails(task);
  };
  const deleteTask = (task: Task) => {
    const newTasks = props.tasks.filter((t) => t.id !== task.id);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTasks(newTasks);
    setShowDataModal(false);
  };
  return (
    <React.Fragment>
      <Row justify="center">
        {props.renderAsNested && (
          <div className="my-5">
            <Text strong>Completed Tasks</Text>
          </div>
        )}
        <Col
          sm={24}
          md={!props.renderAsNested ? 24 : 20}
          lg={!props.renderAsNested ? 18 : 24}
          xl={!props.renderAsNested ? 16 : 24}
        >
          {dataToRender.map((task, index) => {
            return (
              <React.Fragment key={index}>
                <Row className="bordered-bar mb-2">
                  <Col
                    span={12}
                    onClick={() => {
                      openDataModal(task);
                    }}
                  >
                    <Row justify="start">
                      <Text strong>{task.title}</Text>
                    </Row>
                  </Col>
                  <Col
                    span={12}
                    onClick={() => {
                      openDataModal(task);
                    }}
                  >
                    <Row justify="end" align="middle">
                      <Text strong>{task.type}</Text>
                      <div
                        className="indicator"
                        style={{
                          backgroundColor:
                            task.type === "high"
                              ? "red"
                              : task.type === "medium"
                              ? "yellow"
                              : "green",
                        }}
                      ></div>
                    </Row>
                  </Col>
                  <Col
                    span={12}
                    className="mt-2"
                    onClick={() => {
                      openDataModal(task);
                    }}
                  >
                    <Row justify="start">
                      <Text type="secondary">{task.description}</Text>
                    </Row>
                  </Col>

                  <Col span={12} className="mt-1">
                    {!props.renderAsNested && (
                      <Row justify="end" className="gap-2">
                        <Button
                          onClick={() => {
                            markAsDone(task);
                          }}
                          className="bg-orange"
                        >
                          Done Task
                        </Button>
                        <Button
                          className="bg-green"
                          onClick={() => {
                            openModal(task);
                          }}
                        >
                          Edit Task
                        </Button>
                      </Row>
                    )}
                  </Col>
                </Row>
              </React.Fragment>
            );
          })}
        </Col>
      </Row>
      <Modal
        visible={showDataModal}
        onCancel={() => {
          setShowDataModal(false);
        }}
        centered
        width={800}
        footer={null}
      >
        <Row>
          <Col span={8}>
            <Row justify="start" align="middle">
              <div
                className="indicator"
                style={{
                  backgroundColor:
                    currentTaskDetails?.type === "high"
                      ? "red"
                      : currentTaskDetails?.type === "medium"
                      ? "yellow"
                      : "green",
                }}
              ></div>
              <Text strong>{currentTaskDetails?.type}</Text>
            </Row>
          </Col>
          <Col span={8} className="text-center">
            {currentTaskDetails?.title}
          </Col>
        </Row>
        <Text className="px-5">{currentTaskDetails?.description}</Text>
        <Row justify="space-between" className="mt-5">
          <Button
            className="bg-orange"
            onClick={() => {
              openModal(currentTaskDetails as any);
            }}
          >
            Edit Task
          </Button>
          <Button
            className="bg-green"
            onClick={() => {
              markAsDone(currentTaskDetails as any);
            }}
          >
            Done Task
          </Button>
          <Button
            onClick={() => {
              deleteTask(currentTaskDetails as any);
            }}
            type="primary"
            danger
          >
            Delete Task
          </Button>
        </Row>
      </Modal>
    </React.Fragment>
  );
};

export default TaskBars;
