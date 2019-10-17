import React from 'react';
import Task from '../task/task'
import List from '@material-ui/core/List';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

function Tasks() {

    const { loading, error, data } = useQuery(gql`
        {
            task {
                _id,
                title,
                description
            }
        }
    `);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <List>
            { data.task.map(({ id, title, description }) =>
                <Task key={id} title={title} description={description} />)
            }
        </List>
    );

}

export default Tasks