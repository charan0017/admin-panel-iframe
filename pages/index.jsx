import { useState } from 'react';
import Head from 'next/head'
import { Container, Row, Col } from 'react-bootstrap';
import { useIframeSubscriber } from '../hooks';
import { SideNav, SideModal } from '../components';
import { PUBSUB_ACTION_TYPE_PROFILE, PUBSUB_ACTION_TYPE_POSTS } from '../constants';

export default function Home() {
    const [iframeRef, setIframeRef] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [userPosts, setUserPosts] = useState([]);

    useIframeSubscriber(iframeRef, (type, payload) => {
        if (type === PUBSUB_ACTION_TYPE_PROFILE) {
            setUserProfile(payload);
        } else if (type === PUBSUB_ACTION_TYPE_POSTS) {
            setUserPosts(payload);
        }
    });

    console.log(userProfile);
    console.log(userPosts);

    return (
        <Container className="bg-dark-info m-0 pb-5">
            <Head>
                <title>Admin Panel iFrame</title>
                <meta name="description" content="Admin Panel for showing users and their posts" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <SideNav />
            <SideModal>
                Hi
            </SideModal>
            <SideModal>
                Hello
            </SideModal>
            <Row>
                <Col>
                    <h1 className="text-center mt-4 mb-2 fw-bold">Admin Panel iFrame</h1>
                </Col>
            </Row>
            <Row className="m-0">
                <Col className="p-0">
                    <div className="w-100 h-vh-100">
                        <iframe ref={setIframeRef} src="/users" className="w-100 h-100 border rounded-3" />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
