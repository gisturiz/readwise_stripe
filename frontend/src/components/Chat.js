// src/components/Chat.js
import React, { useState, useContext } from 'react';
import { getBookRecommendations } from '../services/api';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToCart } = useContext(CartContext);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput('');
    setLoading(true); // Start loading

    // Get recommendations
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
      setLoading(false); // End loading
    }
  };

  const handleAddToCart = (book) => {
    addToCart(book);
    toast.success(`${book.title} has been added to your cart.`);
  };

  return (
    <div>
      <h2>Chat with BookSmart AI</h2>
      <form onSubmit={handleSend} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
      {loading && (
        <div className="loader">
          <ClipLoader color="#0000ff" loading={loading} size={50} />
        </div>
      )}
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text && (
              <p>
                <strong>{msg.sender === 'user' ? 'You' : 'Assistant'}:</strong> {msg.text}
              </p>
            )}
            {msg.books && (
              <div>
                <p>
                  <strong>Assistant recommends:</strong>
                </p>
                {msg.books.map((book, idx) => (
                  <div key={idx} className="book-item">
                    <h4>{book.title}</h4>
                    <p>By: {book.authors.join(', ')}</p>
                    <p>{book.description}</p>
                    {book.thumbnail && <img src={book.thumbnail} alt={book.title} />}
                    <button onClick={() => handleAddToCart(book)}>Add to Cart</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;