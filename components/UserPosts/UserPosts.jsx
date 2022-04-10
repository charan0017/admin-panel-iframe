import { Container, Row, Col, Card, Badge } from 'react-bootstrap';

export default function UserPosts({ userPostsData }) {
    if (!Array.isArray(userPostsData) || userPostsData.length < 1) {
        return (
            <Container>
                <Row className="mt-3">
                    <Col>
                        <h6 className="text-center">No Profile Selected to show the posts!</h6>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container>
            {userPostsData.map((post, index) => (
                <Card key={`${post.id}`} className="w-100 mt-3">
                    <Card.Header>
                        <Badge pill bg="secondary">{index + 1} days ago</Badge>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Text>{post.body}</Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
}
