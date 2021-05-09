const initialState = {
    searchTerm: '',
    type: null,
};

const searchReducer = (state = initialState, action) => {
    const { type, payload } = action;
    console.log(type);
    switch (type) {
        case 'UPDATE_SEARCH':
            return {
                ...state,
                searchTerm: payload.searchTerm,
            };
        case 'UPDATE_TYPE':
            return {
                searchTerm: '',
                type: payload.type,
            };
        default:
            return state;
    }
};

export default searchReducer;
