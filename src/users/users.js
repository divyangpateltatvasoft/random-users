import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Avatar } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';

class Users extends React.Component {
    state = {
        users: [],
        isLoading: true,
        error: null,
        showingRecords: 10
    }

    componentDidMount() {
        this.getRandomUsersData();
    }

    getRandomUsersData() {
        fetch("https://randomuser.me/api/?results=" + this.state.showingRecords)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        users: result.results,
                        isLoading: false
                    });
                },
                (error) => {
                    this.setState({
                        isLoading: false,
                        error
                    });
                }
            )
    }

    refreshData = () => {
        this.setState({ isLoading: true }, () => this.getRandomUsersData());
    }

    onChangeRecords = (event) => {
        this.setState({ showingRecords: event.target.value, isLoading: true }, () => this.getRandomUsersData());
    }

    render() {
        if (this.state.error) {
            return (
                <div>
                    Error: {this.state.error.message}
                </div>
            );
        } else {
            return (
                <div>
                    <Box m={2} className="pull-right">
                        <Select className="m-r-20" value={this.state.showingRecords} onChange={this.onChangeRecords}>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={500}>500</MenuItem>
                            <MenuItem value={1000}>1000</MenuItem>
                        </Select>
                        <label className="m-r-20">Records Showing</label>
                        <Button variant="contained" className="m-r-20" color="primary" onClick={this.refreshData}>Refresh Data</Button>
                    </Box>
                    <Box m={2}>
                        {this.state.isLoading ? <CircularProgress className="loader" color="secondary" /> :
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><b>Profile Picture</b></TableCell>
                                            <TableCell><b>Name</b></TableCell>
                                            <TableCell><b>Email</b></TableCell>
                                            <TableCell><b>City</b></TableCell>
                                            <TableCell><b>State</b></TableCell>
                                            <TableCell><b>Country</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.users.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Avatar src={row.picture.thumbnail} />
                                                </TableCell>
                                                <TableCell>
                                                    {row.name.title + " " + row.name.first + " " + row.name.last}
                                                </TableCell>
                                                <TableCell>
                                                    <a href="mailto:{row.email}" target="_top">{row.email}</a>

                                                </TableCell>
                                                <TableCell>{row.location.city}</TableCell>
                                                <TableCell>{row.location.state}</TableCell>
                                                <TableCell>{row.location.country}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        }
                    </Box>
                </div>
            );
        }
    }
}

export default Users;