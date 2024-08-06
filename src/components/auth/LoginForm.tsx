import React, { useState, useContext, ChangeEvent } from "react";
import { Button, Form, Input } from "antd";
import { AuthContext } from "../../contexts/AuthContext";

interface LoginFormProps {
  username: string;
}

const LoginForm: React.FC = () => {
  // Context
  const { loadUser } = useContext(AuthContext);

  // Local state
  const [loginForm, setLoginForm] = useState<LoginFormProps>({ username: "" });

  const { username } = loginForm;

  const onChangeLoginForm = (event: ChangeEvent<HTMLInputElement>) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = async (values: LoginFormProps) => {
    console.log("username", values.username);
    loadUser(values.username);
    localStorage.setItem("username", values.username);
  };

  return (
    <div className="flex justify-center items-center ">
      <Form
        className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md"
        onFinish={login}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            type="text"
            placeholder="Your Name"
            name="username"
            value={username}
            onChange={onChangeLoginForm}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Create Challenge
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
