import React from "react";
import { useAuth } from "../context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "utils/use-async";

// interface Base {
//   id: number;
// }

// interface Advance extends Base {
//   name: string;
// }
// // 参数只要符合Base类型即可
// const test = (p: Base) => {}
// // 鸭子类型(duck typing)：面向接口编程
// const a: Advance = {name: '123', id: 123};
// test(a)
// const apiUrl = process.env.REACT_APP_API_URL; // npm start 的时候读取.env.development,npm run build读.env文件

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  // HTMLFormElement extends Element
  const handleSubmit = (values: { username: string; password: string }) => {
    run(login(values)).catch(onError);
  };
  return (
    <Form onFinish={handleSubmit}>
      {/* {user ? (
        <div>
          登陆成功 用户名： {user.name} token: {user.token}
        </div>
      ) : (
        <></>
      )} */}
      <Form.Item
        name={"username"}
        rules={[
          {
            required: true,
            message: "请输入用户名",
          },
        ]}
      >
        <Input placeholder={"用户名"} type="text" id="username" />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[
          {
            required: true,
            message: "请输入密码",
          },
        ]}
      >
        <Input placeholder="输入密码" type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
