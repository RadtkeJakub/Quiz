import axios from "axios";
import { quizCategoriesURL, quizQuestionsURL } from "../api";

export const loadCategories = () => async (dispatch) => {
  const quizCategories = await axios.get(quizCategoriesURL);

  dispatch({
    type: "FETCH_CATEGORIES",
    payload: {
      categories: quizCategories.data.trivia_categories,
    },
  });
};

export const currentCategory = (category) => {
  return {
    type: "SET_CURRENT_CATEGORY",
    payload: category,
  };
};

export const deleteCategory = (categoryId) => {
  return {
    type: "DELETE_CATEGORY",
    payload: categoryId,
  };
};

export const setDifficulty = (difficulty) => {
  const difficulties = ["easy", "medium", "hard"];
  difficulty = difficulties.includes(difficulty) ? difficulty : "easy";
  return {
    type: "SET_DIFFICULTY",
    payload: difficulty,
  };
};

export const setAmount = (amount) => {
  amount = amount < 20 ? amount : 20;
  return {
    type: "SET_AMOUNT",
    payload: amount,
  };
};

export const loadQuestions = () => async (dispatch, getState) => {
  const { categories, currentCategory, difficulty, amount } = getState().quiz;
  const randomCategory =
    categories[Math.floor(Math.random() * (categories.length - 1 - 0 + 1) + 0)];
  const questions = await axios.get(
    `${quizQuestionsURL}amount=${amount || 10}&category=${
      currentCategory || randomCategory
    }&difficulty=${difficulty}`
  );

  dispatch({
    type: "FETCH_QUESTIONS",
    payload: questions.data.results,
  });
};
