import React from 'react';
import Task from '../task/task'
import List from '@material-ui/core/List';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

function Tasks(props) {

    const { loading, error, data } = useQuery(gql`
        {
            tasks {
                id,
                title,
                description
            }
        }
    `);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <List>
            { data.tasks.map(({ id, title, description }) =>
                <Task key={id} id={id} title={title} description={description} />)
            }
        </List>
    );

}

export default Tasks