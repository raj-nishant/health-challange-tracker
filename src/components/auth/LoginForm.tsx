import React, { useState, ChangeEvent } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  username: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState<LoginFormProps>({ username: "" });
  const [isCreatingChallenge, setIsCreatingChallenge] = useState(false);

  const { username } = loginForm;

  const onChangeLoginForm = (event: ChangeEvent<HTMLInputElement>) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = (values: LoginFormProps) => {
    localStorage.setItem("username", values.username);
    navigate("/dashboard");
  };

  const startChallenge = () => {
    setIsCreatingChallenge(true);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-8">
      <Form className="flex flex-col items-center gap-4" onFinish={login}>
        {isCreatingChallenge ? (
          <>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                type="text"
                placeholder="Your Name"
                name="username"
                value={username}
                onChange={onChangeLoginForm}
                className="w-72 h-10 px-3 py-2 border border-gray-300 rounded-md"
              />
            </Form.Item>
            <Form.Item>
              <Button
                className="w-44 h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md shadow-lg"
                type="primary"
                htmlType="submit"
              >
                Login
              </Button>
            </Form.Item>
          </>
        ) : (
          <Button
            className="w-44 h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md shadow-lg"
            type="primary"
            onClick={startChallenge}
          >
            Create Challenge
          </Button>
        )}
      </Form>
    </div>
  );
};

export default LoginForm;
