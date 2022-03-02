import { AuththenticatedApp } from "auththenticated-app";
import { useAuth } from "context/auth-context";
import React from "react";
import { UnauththenticatedApp } from "unauththenticated-app";
import "./App.css";
// import {ProjectListScreen} from 'screens/project-list';

function App() {
  const {user} = useAuth();
  return (
    <div className="App">
      
      {user ? <AuththenticatedApp /> : <UnauththenticatedApp/>}
    </div>
  );
}

export default App;
