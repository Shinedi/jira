import { SearchPanel } from "./serach-panel";
import { List } from "./list";
import { useState, useEffect } from "react";
import { cleanObject, useDebounce, useMount } from "../../utils";
import { useHttp } from "utils/http";

const apiUrl = process.env.REACT_APP_API_URL; // npm start 的时候读取.env.development,npm run build读.env文件

export const ProjectListScreen = () => {
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const client = useHttp();
  const debouncedParam = useDebounce(param, 500);
  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });
  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List users={users} list={list} />
    </div>
  );
};
