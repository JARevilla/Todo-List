import React, { useState } from 'react';
import { loginUser } from '../services/authService'; // Import login API call
import { Form, Input, Button, Alert, Row, Col } from 'antd'; // Import AntD components
import './../styles/login.css'; // Import login page styles

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (values) => {
    const { username, password } = values;
    try {
      const token = await loginUser(username, password);
      localStorage.setItem('auth_token', token);
      localStorage.setItem("username", username);
      window.location.href = '/tasks'; // Redirect to tasks page
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  const handleRegisterRedirect = () => {
    window.location.href = '/register';  // Redirect to the registration page
  };

  return (
    <div className="login-container" style={{ width: '100%', maxWidth: '400px', margin: 'auto' }}>
      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Col>
          <h2>Login</h2>
        </Col>
      </Row>
      
      <Form
        name="login_form"
        initialValues={{ remember: true }}
        onFinish={handleLogin}
        layout="vertical"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        {error && (
          <Form.Item>
            <Alert message={error} type="error" showIcon />
          </Form.Item>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="link" onClick={handleRegisterRedirect} block>
            Register User
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
