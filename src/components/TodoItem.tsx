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
import { gql, useMutation } from '@apollo/client';

const UPDATE_TASK = gql`
  mutation UpdateTask($updateTaskId: ID!) {
    updateTask(id: $updateTaskId) {
      code
      success
      message
      task {
        id
        text
        done
      }
    }
  }
`;
const DELETE_TASK = gql`
  mutation DeleteTask($deleteTaskId: ID!) {
    deleteTask(id: $deleteTaskId) {
      code
      success
      message
      task {
        id
        text
        done
      }
    }
  }
`;

export default function TodoItem({ item }: { item: Task }) {
  const [toggleDoneTask] = useMutation(UPDATE_TASK, {
    onCompleted: (data) => {
      dispatch(updateTask(data.updateTask.task));
    },
  });

  const [removeTask] = useMutation(DELETE_TASK, {
    onCompleted: (data) => {
      dispatch(deleteTask(data.deleteTask.task));
    },
  });

  const dispatch = useDispatch();

  function handleUpdate(item: Task) {
    if (item.id) {
      toggleDoneTask({
        variables: {
          updateTaskId: item.id,
        },
      });
    }
  }

  const labelId = `checkbox-list-label-${item.id}`;

  function handleDelete(item: Task) {
    if (item.id) {
      removeTask({
        variables: {
          deleteTaskId: item.id,
        },
      });
    }
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
            name="done"
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
