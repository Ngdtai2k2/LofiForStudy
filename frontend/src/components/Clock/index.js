import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    setTime(new Date());
  }

  const timeOptions = { hour: 'numeric', minute: '2-digit' };

  return (
    <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' color='white' marginLeft={0.5}>
      <Typography variant="caption">{time.toLocaleTimeString([], timeOptions)}</Typography>
      <Typography variant="caption">{time.toLocaleDateString()}</Typography>
    </Box>
  );
}

export default Clock;
