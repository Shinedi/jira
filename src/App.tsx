import { AuththenticatedApp } from "auththenticated-app";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallback } from "components/lib";
import { useAuth } from "context/auth-context";
import React from "react";
import { UnauththenticatedApp } from "unauththenticated-app";
import "./App.css";
// import {ProjectListScreen} from 'screens/project-list';

function App() {
  const {user} = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuththenticatedApp /> : <UnauththenticatedApp/>}
      </ErrorBoundary>
    </div>
  );
}

export default App;
