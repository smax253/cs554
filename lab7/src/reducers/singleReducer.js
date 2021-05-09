const initialState = {
    data: null,
    isLoading: false,
    isError: false,
    type: null,
};

const singleReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'UPDATE_SINGLE_DATA':
            const { type, data, error } = payload;
            if (error) {
                return {
                    ...state,
                    isLoading: false,
                    isError: true,
                    data: null,
                    type,
                };
            } else {
                return {
                    ...state,
                    isLoading: false,
                    isError: false,
                    data,
                    type,
                };
            }
        case 'SET_SINGLE_LOADING':
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        default:
            return state;
    }
};

export default singleReducer;
