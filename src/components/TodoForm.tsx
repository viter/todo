import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../slices/taskSlice';
import { Task } from '../lib/types';
import { RootState } from '../store';
import { gql, useMutation } from '@apollo/client';

const ADD_TASK = gql`
  mutation AddTask($text: String) {
    addTask(text: $text) {
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

export default function TodoForm() {
  const { t } = useTranslation();
  const [task, setTask] = useState('');
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [addNewTask] = useMutation(ADD_TASK, {
    onCompleted: (data) => {
      dispatch(
        addTask({
          id: data.addTask.task.id,
          text: data.addTask.task.text,
          done: data.addTask.task.done,
        }),
      );
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      task: { value: string };
    };

    if (target.task.value) {
      addNewTask({
        variables: {
          text: target.task.value,
        },
      });
    }

    setTask('');
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTask(e.target.value);
  }
  return (
    <Box
      component="form"
      margin="0 auto"
      display="block"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        id="task"
        name="task"
        label={t('inputLabel')}
        variant="standard"
        value={task}
        onChange={handleChange}
      />
      <Button
        type="submit"
        id="submit"
        variant="outlined"
        size="small"
        sx={{ verticalAlign: 'bottom' }}
      >
        {t('buttonLabel')}
      </Button>
    </Box>
  );
}
