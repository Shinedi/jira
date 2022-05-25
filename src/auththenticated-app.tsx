import { useAuth } from "context/auth-context";
import React from "react";
import styled from "@emotion/styled";
import { ProjectListScreen } from "screens/project-list";
import { Row } from "./components/lib";
import { ReactComponent as SoftWareLogo } from "./assets/software-logo.svg";
import { Menu, Dropdown, Button } from "antd";

/*

grid和flex区别
1. 要考虑，是一维布局 还是 二维布局
一般来说， 一维布局用flex, 二维布局用grid
2. 是从内容出发还是布局出发
从布局出发: 先规划网格，然后再把元素往里面填充 使用grid
*/

export const AuththenticatedApp = () => {
  const { logout, user } = useAuth();
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <SoftWareLogo width={"18rem"} color={"rgb(38, 152, 255)"} />
          {/* <img src={softWareLogo} width={'180px'}/> */}
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={"logout"}>
                  <Button type={"link"} onClick={logout}>
                    登出
                  </Button>
                </Menu.Item>
              </Menu>
            }
          >
            <Button type={"link"} onClick={(e) => e.preventDefault()}>
              Hi! {user?.name}
            </Button>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem; // 每行的高度
  grid-template-columns: 6rem 1fr 6rem; // 每列的宽度，1fr代表自适应
  grid-template-areas:  // 布局

    "header header header"
    "nav main aside"
    "footer footer footer";
  height: 100vh;
`;
const Header = styled(Row)`
  grid-area: header; // grid模块名称
  padding: 3.2rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main`
  grid-area: main;
`;
