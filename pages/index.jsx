import { useState } from 'react';
import Head from 'next/head'
import { Container, Row, Col } from 'react-bootstrap';
import { useIframeSubscriber } from '../hooks';
import { SideNav, SideModal, UserProfile, UserPosts } from '../components';
import { PUBSUB_ACTION_TYPE_PROFILE, PUBSUB_ACTION_TYPE_POSTS, PUBSUB_ACTION_TYPE_LOADING_POSTS } from '../constants';

export default function Home() {
    const [iframeRef, setIframeRef] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [showUserProfileModal, setShowUserProfileModal] = useState(false);
    const [showUserPostsModal, setShowUserPostsModal] = useState(false);
    const [showLoadingPostsModal, setShowLoadingPostsModal] = useState(false);

    useIframeSubscriber(iframeRef, (type, payload) => {
        if (type === PUBSUB_ACTION_TYPE_PROFILE) {
            setUserProfile(payload);
            setShowUserProfileModal(true);
        } else if (type === PUBSUB_ACTION_TYPE_POSTS) {
            setUserPosts(payload);
            setShowLoadingPostsModal(false);
            setShowUserPostsModal(true);
        } else if (type === PUBSUB_ACTION_TYPE_LOADING_POSTS) {
            setShowUserPostsModal(true);
            setShowLoadingPostsModal(payload);
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

            <Row>
                <Col>
                    <h1 className="text-center mt-4 mb-2 fw-bold">Admin Panel iFrame</h1>
                </Col>
            </Row>
            <Row className="m-0 mt-3">
                <Col className="p-0">
                    <div className="w-100 h-vh-100">
                        <iframe ref={setIframeRef} src="/users" className="w-100 h-100 border rounded-3" />
                    </div>
                </Col>
            </Row>

            <SideNav
                onProfileClick={() => setShowUserProfileModal(true)}
                onPostsClick={() => setShowUserPostsModal(true)}
            />
            <SideModal
                title="Profile"
                modalIsOpen={showUserProfileModal}
                setModalIsOpen={setShowUserProfileModal}
                onModalClose={() => setUserProfile(null)}
            >
                <UserProfile userProfileData={userProfile} />
            </SideModal>
            <SideModal
                title="Posts"
                modalIsOpen={showUserPostsModal}
                setModalIsOpen={setShowUserPostsModal}
                onModalClose={() => setUserPosts([])}
            >
                <UserPosts isLoading={showLoadingPostsModal} userPostsData={userPosts} />
            </SideModal>
        </Container>
    )
}
