import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: 'rgb(58, 59, 59, 0.2)',
    },
  },
});

export default theme;
