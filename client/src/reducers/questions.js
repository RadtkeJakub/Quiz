const initState = {
  questions: [],
  categories: [],
  currentCategory: [],
  difficulty: [],
  amount: [],
};

const questions = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_CATEGORIES":
      return { ...state, categories: action.payload.categories };

    case "SET_CURRENT_CATEGORY":
      return { ...state, currentCategory: action.payload };

    case "DELETE_CATEGORY":
      const categoryToDelete = action.payload || state.currentAction;

      const updatedCategories = state.categories.filter(
        (category) => category.id !== categoryToDelete
      );

      return { ...state, categories: updatedCategories, currentCategory: null };

    case "SET_DIFFICULTY":
      return { ...state, difficulty: action.payload };

    case "SET_AMOUNT":
      return { ...state, amount: action.payload };

    case "FETCH_QUESTIONS":
      return { ...state, questions: action.payload };

    default:
      return { ...state };
  }
};

export default questions;
