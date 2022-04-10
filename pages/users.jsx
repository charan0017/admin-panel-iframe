import { useState, useEffect, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Table, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import { FaSearch, FaSortUp } from 'react-icons/fa';
import { useIframePublisher } from '../hooks';
import { requestAPI } from '../utils';
import { PUBSUB_ACTION_TYPE_PROFILE, PUBSUB_ACTION_TYPE_POSTS, PUBSUB_ACTION_TYPE_LOADING_POSTS } from '../constants';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [lastSortedBy, setLastSortedBy] = useState('id');
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedUserPosts, setSelectedUserPosts] = useState([]);
    const { publishAction } = useIframePublisher();

    const fetchUsers = useCallback(async () => {
        const { data, error } = await requestAPI('/users', {}, false);
        if (error) {
            return;
        }
        setUsers(data);
    }, []);

    const sortUsersData = useCallback((usersData, sortBy = lastSortedBy) => {
        return usersData.sort((a, b) => {
            if (sortBy === 'id') {
                return a.id - b.id;
            } else {
                return a[sortBy].localeCompare(b[sortBy]);
            }
        });
    }, [lastSortedBy]);

    const sortUsers = useCallback((e, sortBy) => {
        e.preventDefault();

        if  (sortBy === lastSortedBy) {
            return;
        }

        setUsers(sortUsersData(users, sortBy));
        setFilteredUsers(sortUsersData(filteredUsers, sortBy));
        setLastSortedBy(sortBy);
    }, [lastSortedBy, users, filteredUsers, sortUsersData]);

    const searchUsers = useCallback((searchVal) => {
        setSearch(searchVal);
        const filteredUsersData = users.filter(user => {
            const searchLower = searchVal.toLowerCase();
            return user.name.toLowerCase().includes(searchLower)
                || user.username.toLowerCase().includes(searchLower)
                || user.email.toLowerCase().includes(searchLower)
                || user.phone.toLowerCase().includes(searchLower)
                || user.website.toLowerCase().includes(searchLower);
        });
        setFilteredUsers(sortUsersData(filteredUsersData));
    }, [users, sortUsersData]);
    const searchUsersDebounced = useDebouncedCallback(searchUsers, 500);

    const fetchAndPublishUserPosts = useCallback(async (userId) => {
        if (userId === selectedUserId) {
            publishAction(PUBSUB_ACTION_TYPE_POSTS, selectedUserPosts);
            return;
        }

        publishAction(PUBSUB_ACTION_TYPE_LOADING_POSTS, true);

        const { data, error } = await requestAPI(`/posts?userId=${userId}`, {}, false);
        if (error) {
            setSelectedUserPosts([]);
            publishAction(PUBSUB_ACTION_TYPE_POSTS, []);
            return;
        }

        setSelectedUserId(userId);
        setSelectedUserPosts(data);
        publishAction(PUBSUB_ACTION_TYPE_POSTS, data);
    }, [publishAction, selectedUserId, selectedUserPosts]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const SortByLink = ({ sortBy }) => (
        <a href="#" onClick={(e) => sortUsers(e, sortBy)}>
            <FaSortUp className="float-end mt-2" color={lastSortedBy === sortBy ? '#ccc' : 'black'} />
        </a>
    );

    return (
        <>
            <Row>
                <Col>
                    <h4 className="text-decoration-underline ms-3 my-2 text-capitalize">{lastSortedBy}</h4>
                </Col>
                <Col xs={6} sm={6} md={3}>
                    <InputGroup size="md" className="my-2 pe-2 float-end"
                                onChange={(e) => searchUsersDebounced(e.target.value)}
                    >
                        <InputGroup.Text>
                            <FaSearch />
                        </InputGroup.Text>
                        <FormControl
                            placeholder="Search . . ."
                            aria-label="Search"
                            aria-describedby="search-bar"
                        />
                    </InputGroup>
                </Col>
            </Row>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th># <SortByLink sortBy="id" /></th>
                    <th>Name <SortByLink sortBy="name" /></th>
                    <th>User Name <SortByLink sortBy="username" /></th>
                    <th>Email <SortByLink sortBy="email" /></th>
                    <th>Phone <SortByLink sortBy="phone" /></th>
                    <th>Website <SortByLink sortBy="website" /></th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <tbody>
                {(search ? filteredUsers : users).map((user) => (
                    <tr key={`${user.id}`}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                        <td><a className="text-decoration-none text-dark" href={`mailto:${user.email}`}>{user.email}</a></td>
                        <td><a className="text-decoration-none text-dark" href={`tel:${user.phone}`}>{user.phone}</a></td>
                        <td><a className="text-decoration-none text-dark" href={user.website} target="_blank" rel="noreferrer">{user.website}</a></td>
                        <td><Button size="sm" onClick={() => publishAction(PUBSUB_ACTION_TYPE_PROFILE, user)}>View Profile</Button></td>
                        <td><Button size="sm" onClick={() => fetchAndPublishUserPosts(user.id)}>View Post</Button></td>
                    </tr>
                ))}
                </tbody>
            </Table>
            {users.length === 0 && (
                <h6 className="text-center">Loading users...</h6>
            )}
            {search && filteredUsers.length === 0 && (
                <h6 className="text-center">No users found</h6>
            )}
        </>
    );
}
