import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';

import TodoList from './components/TodoList';
import NavBar from './components/NavBar';
import TodoForm from './components/TodoForm';

export default function App() {
  const { t, i18n } = useTranslation();

  return (
    <>
      <NavBar />
      <Container maxWidth="sm">
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          sx={{ paddingTop: '4em' }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            fontWeight="bold"
            sx={{
              background: '-webkit-linear-gradient(#1A54A8, #1A9FA8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t('title')}
          </Typography>
          <TodoForm />
          <Box>
            <TodoList />
          </Box>
        </Box>
      </Container>
    </>
  );
}
