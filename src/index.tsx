import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { loadServer, DevTools } from "jira-dev-tool";
// 务必在jira-dev-tool之后引用
import "antd/dist/antd.less";
import { AppProviders } from "./context";
import { QueryClient, QueryClientProvider } from "react-query";

loadServer(() =>
  ReactDOM.render(
    <React.StrictMode>
      <QueryClientProvider client={new QueryClient()}>
        <AppProviders>
          <DevTools />
          <App />
        </AppProviders>
      </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById("root")
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
