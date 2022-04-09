import { Row, Col } from 'react-bootstrap';
import { FaIdCard, FaEnvelope } from 'react-icons/fa';
import styles from './Sidenav.module.css';

export default function Sidenav() {
    return (
        <div className={styles.sidenav}>
            <div className={styles.stickyRight}>
                <Row className="mt-3">
                    <Col>
                        <a className="ms-3 text-decoration-none text-dark" href="#">
                            <FaIdCard /> Profile
                        </a>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <a className="ms-3 text-decoration-none text-dark" href="#">
                            <FaEnvelope /> Post
                        </a>
                    </Col>
                </Row>
            </div>

        </div>
    );
}
