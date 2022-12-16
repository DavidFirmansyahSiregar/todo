import { Button, Form, Input, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import React, { useState,} from "react";
import { useNavigate } from "react-router-dom";
import './auth.css';

export const SignIn = () => {
  
  const navigate = useNavigate();
  const [data, setdata] = useState({ email: "", password: "" });

  const onFinish = () => {
    console.log("Received values of form: ", data);
    message.success("You're logged in");
    navigate("/todo");
  };

  return (
    <div className="sign-in-content">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        scrollToFirstError
      >
        <h1>Sign In</h1>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
          hasFeedback
        >
          <Input
            prefix={<MailOutlined />}
            value={data.email}
            placeholder="E-mail"
            onChange={(e) => setdata({ ...data, email: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            value={data.password}
            placeholder="Password"
            autoComplete="true"
            onChange={(e) => setdata({ ...data, password: e.target.value })}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="submit-btn"
            disabled={data.password?.length === 0 ? true : false}
          >
            Sign in
          </Button>
        </Form.Item>
        Or{" "}
        <a href="signup" style={{ color: "#f5f5f5" }}>
          SignUp now!
        </a>
      </Form>
    </div>
  );
};
