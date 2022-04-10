import { Row, Col } from 'react-bootstrap';
import { FaIdCard, FaEnvelope } from 'react-icons/fa';
import styles from './SideNav.module.css';

export default function SideNav({ onProfileClick, onPostsClick }) {
    return (
        <>
            <div className={styles.sideNavVr}>&nbsp;</div>
            <div className={styles.sideNav}>
                <Row className="mt-3">
                    <Col>
                        <a className="ms-3 text-decoration-none text-dark" href="#" onClick={onProfileClick}>
                            <FaIdCard /> Profile
                        </a>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <a className="ms-3 text-decoration-none text-dark" href="#" onClick={onPostsClick}>
                            <FaEnvelope /> Post
                        </a>
                    </Col>
                </Row>
            </div>
        </>
    );
}
