import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

import backgroundIntro from './../../assets/images/background-intro.gif';

import './styles.css';

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'Listen to lofi for study!!!';
  }, []);

  return (
    <div className="background-image">
      <Image
        src={backgroundIntro}
        alt="Background intro"
        className="w-100 h-100 img-fluid"
      />
      <Container
        fluid
        className="h-100 d-flex justify-content-center align-items-center position-absolute top-0 start-0"
      >
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
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
                <div>
                  <button className="button" onClick={() => navigate('/music')}>
                    Let's study now!
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
