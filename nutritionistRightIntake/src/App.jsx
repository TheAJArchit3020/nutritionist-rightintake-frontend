import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MainDashboardPage from "./Pages/MainDashboardPage/MainDashboardPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MainDashboardPage />
    </>
  );
}

export default App;
