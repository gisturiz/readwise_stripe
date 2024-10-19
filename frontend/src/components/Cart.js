import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Button,
  Divider,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const totalAmount = cartItems.length * 15; // $15 per book

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1">No items in cart.</Typography>
      ) : (
        <Box>
          <List>
            {cartItems.map((book, index) => (
              <div key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      variant="square"
                      src={book.thumbnail}
                      alt={book.title}
                      sx={{ width: 56, height: 56 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={book.title}
                    secondary={`By: ${book.authors.join(', ')}`}
                  />
                  <Typography variant="body1" sx={{ mr: 2 }}>
                    Price: $15.00
                  </Typography>
                  <IconButton edge="end" onClick={() => removeFromCart(book.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Typography variant="h6">Total: ${totalAmount.toFixed(2)}</Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/checkout"
              startIcon={<ShoppingCartCheckoutIcon />}
              sx={{ mt: 2 }}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Cart;