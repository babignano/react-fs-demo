import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
    },
    link: {
        color: 'white',
        textDecoration: 'none'
    }
  }));

function Header(props) {
    const classes = useStyles(props);
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <Link to="/tasks" className={classes.link}>My Tasks</Link>
                </Typography>
                <Button color="inherit">
                    <Link to="/signout" className={classes.link}>Sign Out</Link>
                </Button>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <Link to="/user" className={classes.link}>
                        {get(props, 'user.email')}
                        <AccountCircle />
                    </Link>
                </IconButton>
            </Toolbar>
        </AppBar>)
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Header);