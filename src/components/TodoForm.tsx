import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../slices/taskSlice';
import { Task } from '../lib/types';
import { RootState } from '../store';

function createId(tasks: Task[]): number {
  return tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
}

export default function TodoForm() {
  const { t } = useTranslation();
  const [task, setTask] = useState('');

  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const dispatch = useDispatch();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      task: { value: string };
    };

    if (target.task.value) {
      dispatch(addTask({ id: createId(tasks), text: target.task.value, done: false }));
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
      <Button type="submit" variant="outlined" size="small" sx={{ verticalAlign: 'bottom' }}>
        {t('buttonLabel')}
      </Button>
    </Box>
  );
}
