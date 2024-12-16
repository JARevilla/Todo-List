import React, { useEffect, useState } from "react";
import {
  Layout,
  Table,
  Card,
  Button,
  Switch,
  Space,
  message,
  Typography,
} from "antd";
import { PlusOutlined, LogoutOutlined } from "@ant-design/icons";
import { getTasks, deleteTask, updateTaskStatus } from "../services/taskService";
import { Link, useNavigate } from "react-router-dom";

const { Header, Content } = Layout;
const { Text, Title } = Typography;


const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [viewMode, setViewMode] = useState("box");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const taskData = await getTasks();
      setTasks(taskData);
    } catch {
      message.error("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      message.success("Task deleted successfully.");
    } catch {
      message.error("Failed to delete task.");
    }
  };

  const handleToggleCompleted = async (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    try {
      await updateTaskStatus(taskId, !task.completed);
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId ? { ...t, completed: !task.completed } : t
        )
      );
      message.success("Task status updated.");
    } catch {
      message.error("Failed to update task status.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/login");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    setUser(storedUser || "User");
    fetchTasks();
  }, []);

  // AntD Table columns for Table View
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Due Date",
      dataIndex: "due_date",
      key: "due_date",
      render: (date) => date || "No due date",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority) =>
        priority === "H" ? "High" : priority === "M" ? "Medium" : "Low",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => category || "Work",
    },
    {
      title: "Completed",
      dataIndex: "completed",
      key: "completed",
      render: (completed) => (completed ? "Yes" : "No"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, task) => (
        <Space size="small">
          <Button
            type="primary"
            onClick={() => handleToggleCompleted(task.id)}
          >
            {task.completed ? "Mark Incomplete" : "Mark Completed"}
          </Button>
          <Button danger onClick={() => handleDelete(task.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
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


      <Content style={{ padding: "20px" }}>
        <Title level={2}>Task List</Title>
        <Space style={{ marginBottom: 16 }}>
          <Link to="/create">
            <Button type="primary" icon={<PlusOutlined />}>
              Create New Task
            </Button>
          </Link>
          <Switch
            checked={viewMode === "table"}
            onChange={() =>
              setViewMode((prevMode) => (prevMode === "box" ? "table" : "box"))
            }
            checkedChildren="Table View"
            unCheckedChildren="Box View"
          />
        </Space>
        <br/>
        {viewMode === "box" ? (
          <Space wrap>
            {tasks.map((task) => (
              <Card
                key={task.id}
                title={task.name}
                bordered
                extra={
                  <Button
                    size="small"
                    danger
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </Button>
                }
                style={{ width: 300 }}
              >
                <p>{task.description}</p>
                <p>Due Date: {task.due_date || "No due date"}</p>
                <p>
                  Priority:{" "}
                  {task.priority === "H"
                    ? "High"
                    : task.priority === "M"
                    ? "Medium"
                    : "Low"}
                </p>
                <p>Category: {task.category || "No category"}</p>
                {/* <p>Completed: {task.completed || ""}</p> */}
                <p>Completed: {task.completed ? "Yes" : "No"}</p>
                <Button
                  type="primary"
                  onClick={() => handleToggleCompleted(task.id)}
                >
                  {task.completed ? "Mark Incomplete" : "Mark Completed"}
                </Button>
              </Card>
            ))}
          </Space>
        ) : (
          <Table
            dataSource={tasks}
            columns={columns}
            rowKey="id"
            loading={loading}
          />
        )}
      </Content>
    </Layout>
  );
};

export default TaskPage;
