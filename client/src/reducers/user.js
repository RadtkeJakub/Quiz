const initState = {
  name: "",
  loggedIn: false,
  stats: {},
  friends: {},
};

const user = (state = initState, action) => {
  switch (action.name) {
    case "LOG_IN":
      return { ...state };
    case "LOG_OUT":
      return { ...state };
    default:
      return { ...state };
  }
};

export default user;
