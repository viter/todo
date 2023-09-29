import List from '@mui/material/List';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import { Task } from '../lib/types';
import { RootState } from '../store';

export default function TodoList() {
  const items = useSelector((state: RootState) => state.tasks.tasks);
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
