import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import CompareTeams from "./pages/CompareTeams";
import ComparePlayers from "./pages/ComparePlayers";

function App() {
  const [page, setPage] = useState("home");

  if (page == "compareTeams") {
    return <CompareTeams onBack={() => setPage("home")} />;
  }

  if (page == "comparePlayers") {
    return <ComparePlayers onBack={() => setPage("home")} />;
  }

  return (
    <Home 
      onCompareTeams={() => setPage("compareTeams")} 
      onComparePlayers={() => setPage("comparePlayers")}
    />
  );
}

export default App;