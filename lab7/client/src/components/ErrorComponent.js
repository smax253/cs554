import Container from 'react-bootstrap/esm/Container';

const ErrorComponent = ({ error }) => {
    return (
        <Container>
            <div>{error}</div>
            <a href="/">Go Home</a>
        </Container>
    );
};

export default ErrorComponent;
