export const makeActionCreator = (type, ...argNames) => (...args) => {
    const action = { type };
    argNames.forEach((arg, index) => {
        action[argNames[index]] = args[index];
    });
    return action;
};

export const createReducer = (initialState, actionHandlers) => (
    (state = initialState, action) => {
        if (actionHandlers[action.type]) {
            return actionHandlers[action.type](state, action);
        }
        return state;
    }
);
