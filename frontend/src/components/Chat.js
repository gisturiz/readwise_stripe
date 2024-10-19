// src/components/Chat.js
import React, { useState, useContext } from 'react';
import { getBookRecommendations } from '../services/api';
import { CartContext } from '../context/CartContext';
import { ClipLoader } from 'react-spinners';
import AIWandIcon from '@mui/icons-material/AutoFixHigh';
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
  const [input, setInput] = useState('');
  const [books, setBooks] = useState([]); // Store the book recommendations
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false); // Track if a search has been made
  const { addToCart } = useContext(CartContext);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setInput('');
    setLoading(true);
    setSearchPerformed(true); // Mark that a search has been performed

    try {
      const response = await getBookRecommendations(input);

      if (response.books) {
        setBooks(response.books); // Set the books to the new recommendations
      } else {
        setBooks([]); // Clear books if no recommendations
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setBooks([]); // Clear books on error
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (book) => {
    addToCart({
      id: book.id,
      title: book.title,
      authors: book.authors,
      price: 15,
      quantity: 1, // Default quantity
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to ReadWise
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Describe the kind of books you're interested in, and we'll recommend titles you'll love.
      </Typography>

      {/* Input Field and Send Button */}
      <Box component="form" onSubmit={handleSend} sx={{ display: 'flex', mb: 2 }}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="I'm looking for mystery novels set in Victorian England."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{ ml: 1 }}
          disabled={loading || !input.trim()}
        >
          <AIWandIcon />
        </Button>
      </Box>

      {/* Results Window */}
      <Paper variant="outlined" sx={{ p: 2, minHeight: '300px' }}>
        {loading && (
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <ClipLoader color="#0000ff" loading={loading} size={50} />
          </Box>
        )}

        {!loading && searchPerformed && books.length > 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              ReadWise recommends:
            </Typography>
            <List sx={{ mt: 1 }}>
              {books.map((book, idx) => (
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

        {/* Display message if no recommendations found after search */}
        {!loading && searchPerformed && books.length === 0 && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            No recommendations found. Please try a different query.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Chat;