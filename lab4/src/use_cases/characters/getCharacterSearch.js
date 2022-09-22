import getSearchPage from '../../api/characters/getCharacterSearch';

const getCharacterSearch = async ({
    page,
    query,
    setPageData,
    setPageLoading,
    setPageError,
    setHasNextPage,
}) => {
    let pageData;
    try {
        pageData = await getSearchPage({ page, limit: 20, query });
        const hasNext =
            pageData.getCount() < 20 ||
            pageData.getOffset() + pageData.getCount() === pageData.getTotal();
        setHasNextPage(hasNext);
        setPageData(pageData);
        setPageLoading(false);
    } catch (error) {
        setPageError(error);
        setPageLoading(false);
        setHasNextPage(false);
        return;
    }
};

export default getCharacterSearch;
