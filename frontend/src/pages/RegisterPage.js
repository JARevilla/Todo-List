import React, { useState } from 'react';
import { registerUser } from '../services/authService';  // Import register API call
import { Form, Input, Button, Alert, Row, Col } from 'antd'; // Import AntD components
import './../styles/register.css';  // Import registration page styles

const RegisterPage = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (values) => {
    const { username, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      await registerUser(username, password, email);
      setError('');
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        window.location.href = '/login'; // Redirect to login page after 3 seconds
      }, 3000);
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="register-container" style={{ width: '100%', maxWidth: '400px', margin: 'auto' }}>
      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Col>
          <h2>Register</h2>
        </Col>
      </Row>

      <Form
        name="register_form"
        onFinish={handleRegister}
        layout="vertical"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[{ required: true, message: 'Please confirm your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        {error && (
          <Form.Item>
            <Alert message={error} type="error" showIcon />
          </Form.Item>
        )}

        {success && (
          <Form.Item>
            <Alert message={success} type="success" showIcon />
          </Form.Item>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;
