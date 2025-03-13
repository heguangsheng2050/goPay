import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Paper,
  Container,
  Typography,
  useTheme,
} from '@mui/material';
import CreditCardForm from './CreditCardForm';
import ACHForm from './ACHForm';

const PaymentForm = () => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        align="center" 
        sx={{ 
          mb: 4,
          color: 'text.primary',
          fontSize: '2.5rem',
          fontWeight: 600,
        }}
      >
        Checkout
      </Typography>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4,
          borderRadius: 3,
          backgroundColor: 'background.paper',
          backdropFilter: 'blur(20px)',
        }}
      >
        <Box sx={{ 
          borderRadius: 2,
          backgroundColor: theme.palette.grey[100],
          mb: 4,
          p: 0.5,
        }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="payment method tabs"
            centered
            sx={{
              '& .MuiTab-root': {
                minHeight: '48px',
                borderRadius: 1.5,
                mx: 0.5,
                color: 'text.secondary',
                '&.Mui-selected': {
                  color: 'text.primary',
                  backgroundColor: 'background.paper',
                },
              },
              '& .MuiTabs-indicator': {
                display: 'none',
              },
            }}
          >
            <Tab label="Credit Card" />
            <Tab label="ACH" />
          </Tabs>
        </Box>
        <Box sx={{ mt: 3 }}>
          {tabValue === 0 && <CreditCardForm />}
          {tabValue === 1 && <ACHForm />}
        </Box>
      </Paper>
    </Container>
  );
};

export default PaymentForm;