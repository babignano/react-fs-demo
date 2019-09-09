import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function Task(props) {
    return <ListItem>
        <ListItemText primary={props.title} secondary={props.description} />
    </ListItem>
}

export default Task