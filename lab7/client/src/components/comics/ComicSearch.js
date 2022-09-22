import React from 'react';
import { useParams, useLocation, useHistory, Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import ErrorComponent from '../ErrorComponent';
import getComicSearch from '../../use_cases/comics/getComicSearch';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../actions';
import { useApolloClient } from '@apollo/client';

const ComicSearch = () => {
    const allPageData = useSelector((state) => state.page);
    const dispatch = useDispatch();
    const { query, page } = useParams();
    const { pathname } = useLocation();
    const history = useHistory();
    const client = useApolloClient();


    React.useEffect(() => {
        dispatch(actions.setPageNum(page));
    }, [dispatch, page]);

    React.useEffect(() => {
        dispatch(actions.setSearchTerm(query));
        dispatch(actions.startLoading());
        getComicSearch({
            query,
            page: allPageData.pageNum + '',
            dispatch,
            client
        });
    }, [query, allPageData.pageNum, dispatch, client]);

    const changePage = React.useCallback(
        (forward) => {
            let newPageNum = allPageData.pageNum;
            if (forward) {
                dispatch(actions.nextPage());
                newPageNum++;
            } else {
                dispatch(actions.prevPage());
                newPageNum--;
            }
            const index = pathname.indexOf('page');
            history.push(`${pathname.slice(0, index + 4)}/${newPageNum}`);
        },
        [dispatch, pathname, history, allPageData.pageNum]
    );

    const pageComponents = React.useCallback(() => {
        const results = allPageData.entities;
        if (!results || results.length === 0)
            return <ErrorComponent error={'Page is empty!'} />;
        const cards = results.map((res) => {
            return (
                <Col md="4" lg="3" key={res.getId()}>
                    <Card>
                        <Card.Img variant="top" src={res.getThumbnail()} alt={res.getTitle()}/>
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
    }, [allPageData]);

    return allPageData.isLoading || allPageData.type !== 'comics' ? (
        <div>Loading</div>
    ) : allPageData.isError ? (
        <ErrorComponent error={'Page not found!'} />
    ) : (
        <Container>
            <h1>Search results for {query}</h1>
            <Row>{pageComponents()}</Row>
            <Row>
                <Pagination>
                    <Pagination.Item
                        disabled={
                            !allPageData.pageNum || allPageData.pageNum == 0
                        }
                        onClick={() => changePage(false)}
                    >
                        Previous
                    </Pagination.Item>
                    <Pagination.Item
                        disabled={!allPageData.hasNextPage}
                        onClick={() => changePage(true)}
                    >
                        Next
                    </Pagination.Item>
                </Pagination>
            </Row>
        </Container>
    );
};

export default ComicSearch;
