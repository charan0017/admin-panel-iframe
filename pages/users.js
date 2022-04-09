import { useState, useEffect, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Table, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import { FaSearch, FaSortUp } from 'react-icons/fa';
import { requestAPI } from '../utils';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [lastSortedBy, setLastSortedBy] = useState('id');

    const fetchUsers = useCallback(async () => {
        const { data, error } = await requestAPI('/users', {}, false);
        if (error) {
            return;
        }
        setUsers(data);
    }, []);

    const searchUsers = useCallback((searchVal) => {
        setSearch(searchVal);
        setFilteredUsers(users.filter(user => {
            const searchLower = searchVal.toLowerCase();
            return user.name.toLowerCase().includes(searchLower)
                || user.username.toLowerCase().includes(searchLower)
                || user.email.toLowerCase().includes(searchLower)
                || user.phone.toLowerCase().includes(searchLower)
                || user.website.toLowerCase().includes(searchLower);
        }));
    }, [users]);

    const searchUsersDebounced = useDebouncedCallback(searchUsers, 500);

    const sortUsers = useCallback((e, sortBy) => {
        e.preventDefault();

        if  (sortBy === lastSortedBy) {
            return;
        }

        setUsers(users.sort((a, b) => {
            if (sortBy === 'id') {
                return a.id - b.id;
            } else {
                return a[sortBy].localeCompare(b[sortBy]);
            }
        }));
        setLastSortedBy(sortBy);
    }, [lastSortedBy, users]);

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
                    <InputGroup size="md" className="my-3 me-3 w-18 float-end"
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
                        <td><a className="text-decoration-none" href={`mailto:${user.email}`}>{user.email}</a></td>
                        <td><a className="text-decoration-none" href={`tel:${user.phone}`}>{user.phone}</a></td>
                        <td><a className="text-decoration-none" href={user.website} target="_blank" rel="noreferrer">{user.website}</a></td>
                        <td><Button size="sm">View Profile</Button></td>
                        <td><Button size="sm">View Post</Button></td>
                    </tr>
                ))}
                </tbody>
            </Table>
            {users.length === 0 && (
                <h6 className="text-center">No users found</h6>
            )}
            {search && filteredUsers.length === 0 && (
                <h6 className="text-center">No users found</h6>
            )}
        </>
    );
}
