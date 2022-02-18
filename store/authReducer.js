
export const initialState = {
  user: null,
};

export const USER_DATA_STATE_CHANGED = "USER_DATA_STATE_CHANGED";

export const reducer = (state, action) => {
  switch (action.type) {
    case USER_DATA_STATE_CHANGED:
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
      else {
        localStorage.removeItem("user");
        localStorage.removeItem("first_name");
        localStorage.removeItem("last_name");
        localStorage.removeItem("email");
      }
      return {
        ...state,
        user: action.payload,
      };
  }
  return state;
};
