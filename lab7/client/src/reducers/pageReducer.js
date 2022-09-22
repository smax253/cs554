const initialState = {
    pageNum: null,
    isLoading: false,
    isError: false,
    hasNextPage: true,
    entities: [],
    type: null,
};

const pageReducer = (state = initialState, action) => {
    const { type, payload } = action;
    console.log('type', type);
    console.log('payload', payload);
    switch (type) {
        case 'CHANGE_TYPE':
            return {
                ...state,
                type: payload.type,
            };
        case 'SET_PAGE':
            return {
                ...state,
                pageNum: payload.pageNum,
            };
        case 'NEXT_PAGE':
            if (state.hasNextPage) {
                return {
                    ...state,
                    pageNum: +state.pageNum + 1,
                };
            } else return state;
        case 'PREV_PAGE':
            return {
                ...state,
                pageNum: +state.pageNum - 1,
            };
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: true,
            };
        case 'UPDATE_DATA':
            const { type, pageData, error } = payload;
            if (error) {
                return {
                    ...state,
                    isLoading: false,
                    isError: true,
                    type,
                };
            }
            const hasNext =
                pageData.getCount() < 20 ||
                pageData.getOffset() + pageData.getCount() ===
                    pageData.getTotal();
            return {
                ...state,
                entities: pageData.getResults(),
                hasNextPage: !hasNext,
                isLoading: false,
                isError: false,
                type,
            };
        default:
            return state;
    }
};

export default pageReducer;
