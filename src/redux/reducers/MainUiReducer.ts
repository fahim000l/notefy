export interface MainUiActionType {
  type?: "MENU_TOGGLE";
}

export interface MainUiStateType {
  menu: boolean;
}

const initialState: MainUiStateType = {
  menu: false,
};

const MainUiReducer = (state = initialState, action: MainUiActionType) => {
  switch (action?.type) {
    case "MENU_TOGGLE":
      return {
        ...state,
        menu: !state.menu,
      };

    default:
      return state;
  }
};

export default MainUiReducer;
