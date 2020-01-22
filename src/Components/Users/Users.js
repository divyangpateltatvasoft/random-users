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
import { getRandomUsersAPI } from '../../API/UserAPI';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

// Material-UI style
const styles = theme => ({
    container: {
        maxHeight: 750,
    },
});

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

    // Get random users data.
    getRandomUsersData() {
        getRandomUsersAPI(this.state.showingRecords)
            .then(data => {
                this.setState({
                    users: data,
                    isLoading: false
                });
            }, error => {
                this.setState({
                    error: error,
                    isLoading: false
                });
            });
    }

    // Refresh random users data on Refresh button click.
    refreshData = () => {
        this.setState({ isLoading: true }, () => this.getRandomUsersData());
    }

    // This function is used for show total numbers of random users. 
    onChangeRecords = (event) => {
        this.setState({ showingRecords: event.target.value, isLoading: true }, () => this.getRandomUsersData());
    }

    render() {
        const { classes } = this.props;

        if (this.state.error) {
            return (
                <div>
                    {/* Display error message if any error occured during the fetch api of random users. */}
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
                        {/* If loading is in progress then show progress bar otherwise load table data. */}
                        {this.state.isLoading ? <CircularProgress className="loader" color="secondary" /> :
                            <TableContainer component={Paper} className={classes.container}>
                                <Table stickyHeader aria-label="sticky table">
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

Users.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Users);