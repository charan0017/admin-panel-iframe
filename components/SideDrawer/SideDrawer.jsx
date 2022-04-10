import { useRef, useCallback } from 'react';
import {Card, Row, Col, CloseButton, Container} from 'react-bootstrap';
import styles from './SideDrawer.module.css';

export default function SideDrawer({ title, children, modalIsOpen, setModalIsOpen, onModalClose }) {
    const modalRef = useRef(null);

    const handleCloseModal = useCallback(() => {
        setModalIsOpen(false);
        if (onModalClose) {
            onModalClose();
        }
    }, [setModalIsOpen, onModalClose]);

    const handleClickOutside = useCallback((event) => {
        if (modalRef.current !== event.target) {
            return;
        }
        handleCloseModal();
    }, [handleCloseModal]);

    return (
        <div ref={modalRef} className={`${styles.sideModal} ${modalIsOpen ? '' : 'd-none'}`} onClick={handleClickOutside}>
            <div className={styles.sideModalContent}>
                <Row className="sticky-top m-0 bg-dark-info">
                    <Col>
                        <h3 className="ms-3 mt-1">{title}</h3>
                    </Col>
                    <Col>
                        <CloseButton className="float-end me-3 mt-2" onClick={handleCloseModal} />
                    </Col>
                </Row>
                <Container>
                    {children}
                </Container>
            </div>
        </div>
    );
}
