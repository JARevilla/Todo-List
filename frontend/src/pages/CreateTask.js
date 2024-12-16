import React, { useState } from "react";
import { createTask } from "../services/taskService";
import { useNavigate } from "react-router-dom";
import { Layout, Button, Typography, Form, Input, DatePicker, Select, Checkbox, message } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;
const { Text } = Typography;

// Define category options as a constant
const CATEGORY_OPTIONS = ["Work", "Personal", "Fitness", "Hobby", "Other"];

const CreateTask = () => {
  const [user] = useState(localStorage.getItem("username") || "User"); // Retrieve logged-in user
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth_token"); // Remove token
    navigate("/login"); // Redirect to login page
  };

  const handleCreateTask = async (values) => {
    const { name, description, dueDate, priority, category, completed } = values;
    try {
      await createTask({
        name,
        description,
        due_date: dueDate ? dueDate.format("YYYY-MM-DD") : null,
        priority,
        category,
        completed: !!completed, // Ensure boolean type
      });
      message.success("Task created successfully!");
      navigate("/tasks"); // Redirect to task list
    } catch (error) {
      message.error("Failed to create task. Please try again.");
    }
  };

  const handleTaskRedirect = () => {
    window.location.href = '/tasks';  // Redirect to the registration page
  };

  return (
    // <Layout style={{ minHeight: "100vh" }}>
    <Layout>
      <Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ color: "white" }}>Welcome, {user}!</Text>
        <Button
          type="primary"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Header>
      
      <Content style={{ padding: "24px", maxWidth: "600px", margin: "0 auto" }}>
        <Typography.Title level={2}>Create New Task</Typography.Title>
        <Form
          layout="vertical"
          onFinish={handleCreateTask}
          initialValues={{
            priority: "L",
            completed: false,
          }}
        >
          <Form.Item
            label="Task Name"
            name="name"
            rules={[{ required: true, message: "Please enter the task name." }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter the task description." }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Due Date" name="dueDate">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Priority" name="priority">
            <Select>
              <Select.Option value="L">Low</Select.Option>
              <Select.Option value="M">Medium</Select.Option>
              <Select.Option value="H">High</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select a category." }]}
          >
            <Select placeholder="Select a category">
              {CATEGORY_OPTIONS.map((cat) => (
                <Select.Option key={cat} value={cat}>
                  {cat}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="completed" valuePropName="checked">
            <Checkbox>Mark as Completed</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Create Task
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="link" onClick={handleTaskRedirect} block>
              Back
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default CreateTask;
