import { SearchPanel } from "./serach-panel";
import { List } from "./list";
import { useState } from "react";
import { useDebounce } from "../../utils";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { Typography } from "antd";

// const apiUrl = process.env.REACT_APP_API_URL; // npm start 的时候读取.env.development,npm run build读.env文件

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const debouncedParam = useDebounce(param, 500);
  const { isLoading, error, data: list } = useProjects(debouncedParam);
  const { data: users } = useUsers();

  return (
    <div>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List users={users || []} dataSource={list || []} loading={isLoading} />
    </div>
  );
};
