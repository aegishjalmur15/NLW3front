import React from 'react';
import "../styles/pages/landing.css";
import logo from "../assets/images/Logo.svg";
import { FiArrowRight } from 'react-icons/fi';
import {Link} from 'react-router-dom';

function Landing(){
    return(
        <div id="landing-page">
        <div className="content-wrapper">
            <img src={logo} alt="HAPPY"/>

            <main>
              <h1>Leve felicidade para o mundo</h1>
              <p>Visite orfanatos e mude o dia de muitas crianças.</p>
            </main>

            <div className="location">
              <strong>Recife</strong>
              <span>Pernambuco</span>
            </div>

            <Link to="/app" className="enter-app">
              <FiArrowRight size="26px" color="rgba(0,0,0,0.6)" />
            </Link>
        </div>
      </div>
    );
}

export default Landing