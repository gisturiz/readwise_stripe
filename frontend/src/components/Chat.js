// src/components/Chat.js
import React, { useState, useContext } from 'react';
import { getBookRecommendations } from '../services/api';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  List,
  ListItem,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from '@mui/material';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToCart } = useContext(CartContext);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput('');
    setLoading(true);

    try {
      const response = await getBookRecommendations(input);

      if (response.books) {
        const assistantMessage = { sender: 'assistant', books: response.books };
        setMessages((prev) => [...prev, assistantMessage]);
      } else if (response.message) {
        const assistantMessage = { sender: 'assistant', text: response.message };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      toast.error('An error occurred while fetching recommendations.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (book) => {
    addToCart(book);
    toast.success(`${book.title} has been added to your cart.`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box component="form" onSubmit={handleSend} sx={{ display: 'flex', mb: 2 }}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button variant="contained" type="submit" sx={{ ml: 1 }}>
          Send
        </Button>
      </Box>

      <Paper variant="outlined" sx={{ p: 2, height: '500px', overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            {msg.text && (
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  backgroundColor: msg.sender === 'user' ? '#e3f2fd' : '#f1f0f0',
                  maxWidth: '100%',
                  ml: msg.sender === 'user' ? 'auto' : 0,
                  mr: msg.sender === 'assistant' ? 'auto' : 0,
                }}
              >
                <Typography variant="body1">{msg.text}</Typography>
              </Paper>
            )}
            {msg.books && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">ReadWise recommends:</Typography>
                <List sx={{ mt: 1 }}>
                  {msg.books.map((book, idx) => (
                    <ListItem key={idx} alignItems="flex-start">
                      <Card sx={{ display: 'flex', width: '100%' }}>
                        {book.thumbnail && (
                          <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image={book.thumbnail}
                            alt={book.title}
                          />
                        )}
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                          <CardContent>
                            <Typography component="div" variant="h5">
                              {book.title}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                              By: {book.authors.join(', ')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                              {book.description}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button size="small" onClick={() => handleAddToCart(book)}>
                              Add to Cart
                            </Button>
                          </CardActions>
                        </Box>
                      </Card>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Box>
        ))}
        {loading && (
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <ClipLoader color="#0000ff" loading={loading} size={50} />
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Chat;