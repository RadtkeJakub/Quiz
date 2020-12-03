import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  currentCategory,
  setAmount,
  loadQuestions,
  loadCategories,
  setDifficulty,
} from "./actions/questions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCategories());
  });

  const setEverything = () => {
    dispatch(currentCategory(10));
    dispatch(setDifficulty("hard"));
    dispatch(setAmount(10));
    dispatch(loadQuestions());
  };
  return (
    <div className="App">
      <h1 onClick={setEverything}>App</h1>
    </div>
  );
}

export default App;
