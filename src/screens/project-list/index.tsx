import { SearchPanel } from "./serach-panel";
import { List } from "./list";
import { useState, useEffect } from "react";
import { cleanObject, useDebounce, useMount } from "../../utils";
import * as qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL; // npm start 的时候读取.env.development,npm run build读.env文件

export const ProjectListScreen = () => {
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 500);
  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async (response) => {
      if (response?.ok) {
        setList(await response.json()); // 由于fetch的写法，所以要用await
      }
    });
  }, [debouncedParam]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response?.ok) {
        setUsers(await response.json()); // 由于fetch的写法，所以要用await
      }
    });
  });
  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List users={users} list={list} />
    </div>
  );
};
