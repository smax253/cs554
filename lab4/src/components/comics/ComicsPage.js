import React from 'react';
import { useParams, useLocation, useHistory, Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import getComicPage from '../../use_cases/comics/getComicPage';
import ErrorComponent from '../ErrorComponent';

const ComicsPage = () => {
    const { page } = useParams();
    const { pathname } = useLocation();
    const history = useHistory();
    const [pageNum, setPageNum] = React.useState(+page);
    const [pageData, setPageData] = React.useState(null);
    const [pageLoading, setPageLoading] = React.useState(false);
    const [pageError, setPageError] = React.useState(null);
    const [hasNextPage, setHasNextPage] = React.useState(true);

    React.useEffect(() => {
        setPageLoading(true);
        getComicPage({
            page,
            setPageData,
            setPageLoading,
            setPageError,
            setHasNextPage,
        });
    }, [page, setPageData, setPageError, setPageLoading, setHasNextPage]);

    const changePage = React.useCallback(
        (forward) => {
            let newPageNum;
            if (forward) newPageNum = pageNum + 1;
            else newPageNum = pageNum - 1;
            history.push(`${pathname.replace(pageNum, newPageNum)}`);
            setPageNum(newPageNum);
        },
        [pageNum, history, pathname]
    );

    const pageComponents = React.useCallback(() => {
        if (
            !pageData ||
            !pageData.getResults() ||
            pageData.getResults().length === 0
        )
            return <ErrorComponent error={'Page is empty!'} />;
        const results = pageData.getResults();
        const cards = results.map((res) => {
            return (
                <Col md="4" lg="3" key={res.getId()}>
                    <Card>
                        <Card.Img variant="top" src={res.getThumbnail()} />
                        <Card.Body>
                            <Card.Title>
                                <Link to={`/comics/${res.getId()}`}>
                                    {res.getTitle()}
                                </Link>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            );
        });
        return cards;
    }, [pageData]);

    return pageLoading ? (
        <div>Loading</div>
    ) : pageError ? (
        <ErrorComponent error={'Page not found!'} />
    ) : (
        <Container>
            <Row>{pageComponents()}</Row>
            <Row>
                <Pagination>
                    <Pagination.Item
                        disabled={pageNum === 0}
                        onClick={() => changePage(false)}
                    >
                        Previous
                    </Pagination.Item>
                    <Pagination.Item
                        disabled={hasNextPage}
                        onClick={() => changePage(true)}
                    >
                        Next
                    </Pagination.Item>
                </Pagination>
            </Row>
        </Container>
    );
};

export default ComicsPage;
