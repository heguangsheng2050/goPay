import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Paper,
  Container,
  Typography,
} from '@mui/material';
import CreditCardForm from './CreditCardForm';
import ACHForm from './ACHForm';

const PaymentForm = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Payment Form
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="payment method tabs"
            centered
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