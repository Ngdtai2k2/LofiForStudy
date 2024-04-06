import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Container, Grid, Button, Box } from '@mui/material';
import backgroundIntro from './../../assets/images/background-intro.gif';

import './styles.css';

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'Listen to lofi for study!!!';
  }, []);

  return (
    <div className="background-image">
      <img
        src={backgroundIntro}
        alt="Background intro"
        className="w-100 h-100 img-fluid"
      />
      <Container maxWidth="xl">
        <Grid container justifyContent="center">
          <Grid item xs={12} md={6} textAlign="center">
            <div className="title-container">
              <h1 className="tracking-in-expand-fwd">Lofi for study</h1>
              <h3 className="subtitle">Listen to lofi for study!!!</h3>
              <div className="music-notes-1 note-amination">♬</div>
              <div className="music-notes-2 note-amination">♪</div>
              <div className="music-notes-3 note-amination">♯</div>
              <div className="bubble-container">
                <div className="bubble1"></div>
                <div className="bubble2"></div>
                <div className="bubble3"></div>
              </div>
              <div className="wrap">
                  <button
                    className="button-effect"
                    onClick={() => navigate('/music')}
                  >
                    Let's study now!
                  </button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
