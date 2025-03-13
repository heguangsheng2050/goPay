import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Box,
  Alert,
  Typography,
  useTheme,
} from '@mui/material';
import axios from 'axios';

const ACHForm = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    email: '',
    accountHolder: '',
    routingNumber: '',
    accountNumber: '',
    bankName: '',
    amount: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:52746/api/process-payment', {
        ...formData,
        paymentType: 'ach',
      });

      if (response.data.success) {
        setSuccess('Payment processed successfully!');
        setFormData({
          firstName: '',
          lastName: '',
          address1: '',
          address2: '',
          city: '',
          state: '',
          zipCode: '',
          phoneNumber: '',
          email: '',
          accountHolder: '',
          routingNumber: '',
          accountNumber: '',
          bankName: '',
          amount: '',
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error processing payment');
    }
  };

  const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: theme.palette.grey[50],
      '&:hover': {
        backgroundColor: theme.palette.grey[100],
      },
      '&.Mui-focused': {
        backgroundColor: '#fff',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Grid container spacing={3}>
          {error && (
            <Grid item xs={12}>
              <Alert 
                severity="error"
                sx={{
                  borderRadius: 2,
                  backgroundColor: '#ffebee',
                  '& .MuiAlert-icon': {
                    color: '#d32f2f',
                  },
                }}
              >
                {error}
              </Alert>
            </Grid>
          )}
          {success && (
            <Grid item xs={12}>
              <Alert 
                severity="success"
                sx={{
                  borderRadius: 2,
                  backgroundColor: '#f1f8e9',
                  '& .MuiAlert-icon': {
                    color: '#2e7d32',
                  },
                }}
              >
                {success}
              </Alert>
            </Grid>
          )}
          
          <Grid item xs={6}>
            <Box sx={{ pr: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Personal Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    sx={textFieldStyle}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    sx={textFieldStyle}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Address Line 1"
                    name="address1"
                    value={formData.address1}
                    onChange={handleChange}
                    sx={textFieldStyle}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address Line 2"
                    name="address2"
                    value={formData.address2}
                    onChange={handleChange}
                    sx={textFieldStyle}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    sx={textFieldStyle}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    required
                    fullWidth
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    inputProps={{ maxLength: 2 }}
                    sx={textFieldStyle}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    required
                    fullWidth
                    label="ZIP Code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    inputProps={{ maxLength: 5 }}
                    sx={textFieldStyle}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    inputProps={{ maxLength: 10 }}
                    sx={textFieldStyle}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    sx={textFieldStyle}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box sx={{ pl: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Bank Account Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Account Holder Name"
                    name="accountHolder"
                    value={formData.accountHolder}
                    onChange={handleChange}
                    sx={textFieldStyle}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Bank Name"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    sx={textFieldStyle}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Routing Number"
                    name="routingNumber"
                    value={formData.routingNumber}
                    onChange={handleChange}
                    inputProps={{ maxLength: 9 }}
                    sx={textFieldStyle}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Account Number"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    type="password"
                    sx={textFieldStyle}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Amount"
                    name="amount"
                    type="number"
                    value={formData.amount}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: '$',
                    }}
                    sx={textFieldStyle}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 500,
                  borderRadius: 2,
                  textTransform: 'none',
                  backgroundColor: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: '#333333',
                  },
                  boxShadow: 'none',
                }}
              >
                Pay Now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default ACHForm;