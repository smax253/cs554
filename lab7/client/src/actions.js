const nextPage = () => ({
    type: 'NEXT_PAGE',
    payload: {},
});

const prevPage = () => ({
    type: 'PREV_PAGE',
    payload: {},
});

const updatePageData = (type, pageData, error) => ({
    type: 'UPDATE_DATA',
    payload: { type, pageData, error },
});

const startLoading = () => ({
    type: 'SET_LOADING',
    payload: {},
});

const setPageNum = (pageNum) => ({
    type: 'SET_PAGE',
    payload: {
        pageNum,
    },
});

const changePageType = (type) => ({
    type: 'CHANGE_TYPE',
    payload: {
        type,
    },
});

const setSearchTerm = (term) => ({
    type: 'UPDATE_SEARCH',
    payload: {
        searchTerm: term,
    },
});

const setSearchType = (type) => ({
    type: 'UPDATE_TYPE',
    payload: {
        type,
    },
});

const updateSinglePageData = (type, data, error) => ({
    type: 'UPDATE_SINGLE_DATA',
    payload: {
        type,
        data,
        error,
    },
});

const setSingleLoading = () => ({
    type: 'SET_SINGLE_LOADING',
    payload: {},
});

export default {
    nextPage,
    prevPage,
    updatePageData,
    startLoading,
    setPageNum,
    changePageType,
    setSearchTerm,
    setSearchType,
    updateSinglePageData,
    setSingleLoading,
};
