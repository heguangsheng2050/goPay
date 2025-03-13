import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Box,
  Alert,
  Typography,
  Divider,
  useTheme,
} from '@mui/material';
import axios from 'axios';

const CreditCardForm = () => {
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
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
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
        paymentType: 'credit',
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
          cardNumber: '',
          cardHolder: '',
          expiryDate: '',
          cvv: '',
          amount: '',
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error processing payment');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Personal Information
          </Typography>
        </Grid>
        
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: theme.palette.grey[50],
                '&:hover': {
                  backgroundColor: theme.palette.grey[100],
                },
                '&.Mui-focused': {
                  backgroundColor: '#fff',
                },
              },
            }}
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
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address Line 2"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
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
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Card Number"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            inputProps={{ maxLength: 16 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Card Holder Name"
            name="cardHolder"
            value={formData.cardHolder}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            label="Expiry Date (MM/YY)"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            inputProps={{ maxLength: 5 }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            label="CVV"
            name="cvv"
            type="password"
            value={formData.cvv}
            onChange={handleChange}
            inputProps={{ maxLength: 4 }}
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
          />
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Payment Details
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Card Number"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            inputProps={{ maxLength: 16 }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: theme.palette.grey[50],
                '&:hover': {
                  backgroundColor: theme.palette.grey[100],
                },
                '&.Mui-focused': {
                  backgroundColor: '#fff',
                },
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Card Holder Name"
            name="cardHolder"
            value={formData.cardHolder}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: theme.palette.grey[50],
                '&:hover': {
                  backgroundColor: theme.palette.grey[100],
                },
                '&.Mui-focused': {
                  backgroundColor: '#fff',
                },
              },
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            label="Expiry Date"
            name="expiryDate"
            placeholder="MM/YY"
            value={formData.expiryDate}
            onChange={handleChange}
            inputProps={{ maxLength: 5 }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: theme.palette.grey[50],
                '&:hover': {
                  backgroundColor: theme.palette.grey[100],
                },
                '&.Mui-focused': {
                  backgroundColor: '#fff',
                },
              },
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            label="Security Code"
            name="cvv"
            type="password"
            value={formData.cvv}
            onChange={handleChange}
            inputProps={{ maxLength: 4 }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: theme.palette.grey[50],
                '&:hover': {
                  backgroundColor: theme.palette.grey[100],
                },
                '&.Mui-focused': {
                  backgroundColor: '#fff',
                },
              },
            }}
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
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: theme.palette.grey[50],
                '&:hover': {
                  backgroundColor: theme.palette.grey[100],
                },
                '&.Mui-focused': {
                  backgroundColor: '#fff',
                },
              },
            }}
          />
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
    </form>
  );
};

export default CreditCardForm;