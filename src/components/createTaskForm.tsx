import React, { useState, useContext, useEffect } from "react";
import { Button, Form, Input, Radio, Row } from "antd";
import type { RadioChangeEvent } from "antd";

import TasksContext from "../context/TasksContext";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 24,
  },
};
const tailLayout = {
  wrapperCol: {
    span: 24,
  },
};
const { TextArea } = Input;

const CreateTasksForm = (props: any) => {
  const { setTasks, tasks, currentTask } = useContext(TasksContext);
  let [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(currentTask);
  }, [currentTask, form]);

  const onFinish = (values: any) => {
    if (currentTask && currentTask?.id) {
      const updatedTasks: any = tasks.map((task) => {
        if (task.id === currentTask.id) {
          return { ...task, ...values };
        }
        return task;
      });
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
      props.setPopup(false);
      return;
    }
    values.done = false;
    values.id = tasks.length ? tasks.length + 1 : 1;
    const oldervalue = JSON.parse(localStorage.getItem("tasks") || "[]");
    localStorage.setItem("tasks", JSON.stringify([...oldervalue, values]));
    setTasks([...oldervalue, values]);
    props.setPopup(false);
  };

  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        className="mt-3"
        name="title"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Task Title" />
      </Form.Item>
      <Form.Item
        name="description"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <TextArea rows={4} placeholder="Task Description" />
      </Form.Item>
      <Form.Item
        name="KPIs"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Gifts and KPIs for this Task" />
      </Form.Item>

      <Form.Item
        name="type"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Radio.Group className="w-100" onChange={onChange} value={value}>
          <div className="flex justify-between">
            <Radio value={"low"}>Low</Radio>
            <Radio value={"medium"}>Medium</Radio>
            <Radio value={"high"}>High</Radio>
          </div>
        </Radio.Group>
      </Form.Item>

      <Form.Item className="mt-3" {...tailLayout}>
        <Row justify="center">
          <Button className="bg-orange" htmlType="submit">
            {currentTask ? "Update Task" : "Add to Tasks"}
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default CreateTasksForm;
