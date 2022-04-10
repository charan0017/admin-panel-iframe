import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import styles from './UserProfile.module.css';

const defaultUserProfileImage = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=christopher-campbell-rDEOVtE7vOs-unsplash.jpg";

export default function UserProfile({ userProfileData }) {
    if (!userProfileData) {
        return (
            <Container>
                <Row className="mt-3">
                    <Col>
                        <h6 className="text-center">No Profile Selected!</h6>
                    </Col>
                </Row>
            </Container>
        );
    }

    const userAddress = Object.values(userProfileData.address)
        .filter(subAddress => typeof subAddress === 'string')
        .join(', ');

    return (
        <>
            <Card.Img src={userProfileData.image || defaultUserProfileImage} alt="user profile picture" />
            <Card.ImgOverlay className={`${styles.userProfileInfo} mt-5`}>
                <Card.Title className="text-light text-center">{userProfileData.name}</Card.Title>
                <Card.Text className="text-light text-center">
                    {userProfileData.username}
                </Card.Text>
            </Card.ImgOverlay>
            <Container>
                <Form>
                    <Form.Group controlId="user-email" className="mt-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email" placeholder="User Email" value={userProfileData.email}
                            readOnly
                            aria-label={`${userProfileData.name}'s email`}
                        />
                    </Form.Group>
                    <Form.Group controlId="user-address" className="mt-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            as="textarea" rows={3} placeholder="User Address" value={userAddress}
                            readOnly
                            aria-label={`${userProfileData.name}'s address`}
                        />
                    </Form.Group>
                    <Form.Group controlId="user-phone" className="mt-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text" placeholder="User Phone" value={userProfileData.phone}
                            readOnly
                            aria-label={`${userProfileData.name}'s phone`}
                        />
                    </Form.Group>
                    <Form.Group controlId="user-website" className="mt-3">
                        <Form.Label>Website</Form.Label>
                        <Form.Control
                            type="text" placeholder="User Website" value={userProfileData.website}
                            readOnly
                            aria-label={`${userProfileData.name}'s website`}
                        />
                    </Form.Group>
                    <Form.Group controlId="user-company-name" className="mt-3">
                        <Form.Label>Company name</Form.Label>
                        <Form.Control
                            type="text" placeholder="User Company Name" value={userProfileData.company.name}
                            readOnly
                            aria-label={`${userProfileData.name}'s company name`}
                        />
                    </Form.Group>
                </Form>
            </Container>
        </>
    );
}
