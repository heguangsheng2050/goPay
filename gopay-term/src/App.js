import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import PaymentForm from './components/PaymentForm';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PaymentForm />
    </ThemeProvider>
  );
}

export default App;
