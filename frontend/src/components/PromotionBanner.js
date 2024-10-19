// src/components/PromotionBanner.js
import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PromotionBanner = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'secondary.main',
        color: 'primary.contrastText',
        textAlign: 'center',
        position: 'relative',
        borderRadius: 1,
        py: 1,
      }}
    >
      <Typography variant="body1">
        Use code <strong>READ20</strong> at checkout to receive a 20% discount on your order!
      </Typography>
      <IconButton
        onClick={() => setVisible(false)}
        sx={{ position: 'absolute', right: 8, top: 0, color: 'inherit' }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default PromotionBanner;
