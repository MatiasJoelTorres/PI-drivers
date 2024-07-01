import './Landing.styles.css';
import logo from '../../../../../cr-pi-drivers-main/F1.svg';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Landing = () => {
  useEffect(() => {
    const container = document.querySelector('.landing-container');
    for (let i = 0; i < 100; i++) {
      const drop = document.createElement('div');
      drop.className = 'raindrop';
      drop.style.left = `${Math.random() * 100}vw`;
      drop.style.animationDuration = `${Math.random() * 2 + 1}s`;
      container.appendChild(drop);
    }
  }, []);

  return (
    <div className="landing-container">
      <div className="content">
        <img src={logo} alt="logo" />
        <h1 className="outlined-glow-text">DRIVERS PI</h1>
        <div className="div-buttons">
          <Link to="/home">Comenzar</Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;