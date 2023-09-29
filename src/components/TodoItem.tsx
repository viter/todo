import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Task } from '../lib/types';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../slices/taskSlice';

export default function TodoItem({ item }: { item: Task }) {
  const dispatch = useDispatch();

  function handleUpdate(item: Task) {
    dispatch(updateTask(item));
  }

  const labelId = `checkbox-list-label-${item}`;

  function handleDelete(item: Task) {
    dispatch(deleteTask(item));
  }

  const textDecoration = item.done ? 'line-through' : 'none';

  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="comments"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleDelete(item)}
        >
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton
        sx={{ borderRadius: '3px' }}
        role={undefined}
        onClick={() => handleUpdate(item)}
        dense
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={item.done}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={item.text} sx={{ textDecoration }} />
      </ListItemButton>
    </ListItem>
  );
}
