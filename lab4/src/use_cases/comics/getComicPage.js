import getPage from '../../api/comics/getPage';

const getComicPage = async ({
    page,
    setPageData,
    setPageLoading,
    setPageError,
    setHasNextPage,
}) => {
    let pageData;
    try {
        pageData = await getPage({ page, limit: 20 });
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
    }
};

export default getComicPage;
