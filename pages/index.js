import Head from 'next/head'
import { Container, Row, Col } from "react-bootstrap";

export default function Home() {
    return (
        <Container>
            <Head>
                <title>Admin Panel iFrame</title>
                <meta name="description" content="Admin Panel for showing users and their posts" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Row>
                <Col>Hello</Col>
            </Row>
        </Container>
    )
}
