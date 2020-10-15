import React from "react";
import { AppRouter } from "./AppRouter";
import dotenv from "dotenv";
dotenv.config();

function App() {
  return (
    <div>
      <AppRouter />
    </div>
  );
}

export default App;
