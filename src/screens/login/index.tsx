import React, { FormEvent } from "react";
import { useAuth } from "../../context/auth-context";

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

export const LoginScreen = () => {
  const { login, user } = useAuth();
  // HTMLFormElement extends Element
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      {user ? (
        <div>
          登陆成功 用户名： {user.name} token: {user.token}
        </div>
      ) : (
        <></>
      )}
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <button type={"submit"}>登录</button>
    </form>
  );
};
