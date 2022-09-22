import React from 'react';
import { useParams, useLocation, useHistory, Link } from 'react-router-dom';
import getCharacterPage from '../../use_cases/characters/getCharacterPage';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import ErrorComponent from '../ErrorComponent';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../actions';
import { useApolloClient } from '@apollo/client';

const CharacterPage = () => {
    const client = useApolloClient();
    const dispatch = useDispatch();
    const allPageData = useSelector((state) => state.page);
    const { page } = useParams();
    const { pathname } = useLocation();
    const history = useHistory();
    React.useEffect(() => {
        dispatch(actions.setPageNum(page));
    }, [dispatch, page]);

    React.useEffect(() => {
        dispatch(actions.startLoading());
        const pageNum = allPageData.pageNum;
        getCharacterPage({
            page: pageNum + '',
            dispatch,
            client,
        });
    }, [allPageData.pageNum, dispatch, client]);

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
                        <Card.Img variant="top" src={res.getThumbnail()} alt={res.getName()} />
                        <Card.Body>
                            <Card.Title>
                                <Link to={`/characters/${res.getId()}`}>
                                    {res.getName()}
                                </Link>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            );
        });
        return cards;
    }, [allPageData]);
    return allPageData.isLoading || allPageData.type !== 'characters' ? (
        <div>Loading</div>
    ) : allPageData.isError ? (
        <ErrorComponent error={'Page not found!'} />
    ) : (
        <Container>
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

export default CharacterPage;
