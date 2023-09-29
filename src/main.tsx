import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import App from './App';
import GlobalStyles from '@mui/material/GlobalStyles';
import './lib/i18n';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles
          styles={{
            html: {
              margin: '0',
              padding: '0',
            },
            body: {
              background: 'linear-gradient(to right bottom, #171515, #252322) no-repeat',
              height: '100vh',
              padding: '0px',
              boxSizing: 'border-box',
            },
          }}
        />
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
