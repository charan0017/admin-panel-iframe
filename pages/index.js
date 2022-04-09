import Head from 'next/head'
import { Container, Row, Col } from 'react-bootstrap';
import { Sidenav } from '../components';

export default function Home() {
    return (
        <Container className="bg-dark-info m-0 pb-5">
            <Head>
                <title>Admin Panel iFrame</title>
                <meta name="description" content="Admin Panel for showing users and their posts" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Sidenav />
            <Row>
                <Col>
                    <h1 className="text-center mt-4 mb-2 fw-bold">Admin Panel iFrame</h1>
                </Col>
            </Row>
            <Row className="m-0">
                <Col className="p-0">
                    <div className="w-100 h-vh-100">
                            <iframe src="/users" className="w-100 h-100 border rounded-3" />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
