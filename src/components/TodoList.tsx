import List from '@mui/material/List';
import { useDispatch, useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import { Task } from '../lib/types';
import { RootState } from '../store';
import { useQuery, gql } from '@apollo/client';
import { loadTasks } from '../slices/taskSlice';
import { useEffect } from 'react';

const TASKS = gql`
  query GetTasks {
    tasks {
      id
      text
      done
    }
  }
`;

export default function TodoList() {
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(TASKS, {
    onCompleted: (data) => {
      dispatch(loadTasks(data.tasks));
    },
  });

  const items = useSelector((state: RootState) => state.tasks.tasks);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return items.length ? (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        marginTop: '2rem',
        borderRadius: '5px',
        padding: '1rem',
      }}
    >
      {items.map((item: Task) => {
        return <TodoItem item={item} key={item.id} />;
      })}
    </List>
  ) : null;
}
