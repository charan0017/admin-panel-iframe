import { useRef, useCallback } from 'react';
import { Card, Row, Col, CloseButton } from 'react-bootstrap';
import styles from './SideModal.module.css';

export default function SideModal({ title, children, modalIsOpen, setModalIsOpen, onModalClose }) {
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
                <Card className="rounded-0 h-100 bg-dark-info">
                    <Card.Header>
                        <Row>
                            <Col>
                                <h3 className="ms-3">{title}</h3>
                            </Col>
                            <Col>
                                <CloseButton className="float-end" onClick={handleCloseModal} />
                            </Col>
                        </Row>
                    </Card.Header>
                    {children}
                </Card>
            </div>
        </div>
    );
}
