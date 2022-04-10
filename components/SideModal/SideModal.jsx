import { useState, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaWindowClose } from 'react-icons/fa';
import styles from './SideModal.module.css';

export default function SideModal({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    const modalRef = useRef(null);

    const handleClickOutside = (event) => {
        if (modalRef.current === event.target) {
            setIsOpen(false);
        }
    };

    return (
        <div ref={modalRef} className={`${styles.sideModal} ${isOpen ? '' : 'd-none'}`} onClick={handleClickOutside}>
            <div className={styles.sideModalContent}>
                <Row>
                    <Col>
                        <a href="#"
                           className="text-decoration-none float-end mx-2 my-2"
                           onClick={() => setIsOpen(false)}>
                            <FaWindowClose size="30" />
                        </a>
                    </Col>
                </Row>
                {children}
            </div>
        </div>
    );
}
