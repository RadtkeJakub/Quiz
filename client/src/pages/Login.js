import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Modal from "../components/Modal";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

import wavesTop from "../images/waves-top.svg";
import wavesBottom from "../images/waves-bottom.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion, faUser } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState();

  return (
    <div className="home">
      <img className="home__waves-top" src={wavesTop} alt="waves" />
      <img className="home__waves-bottom" src={wavesBottom} alt="waves" />
      <h1 className="home__title">Quizz</h1>
      <p className="home__description ">
        Please chose your login method or register
      </p>
      <p className="home__second-description">
        In order to play you need to be logged in
      </p>
      <div className="home__cards">
        <Link to="/">
          <Card
            front={
              <Link className="center" to="/lobby">
                <FontAwesomeIcon icon={faQuestion} className="card__icon" />
                <p className="card__name">Guest</p>
                <p className="card__description">
                  Playing as a guest your statistics wont be save
                </p>
              </Link>
            }
          />
        </Link>
        <Link to="/">
          <Card
            additionalClass="card--user"
            front={
              <>
                <FontAwesomeIcon icon={faUser} className="card__icon" />
                <p className="card__name">User</p>
                <p className="card__description">
                  User can add friends and have access to statistics
                </p>
              </>
            }
            back={
              <>
                <div
                  className="button button--login"
                  onClick={() => setIsLoginModalOpen(!isLoginModalOpen)}
                >
                  Log in
                </div>
                <div
                  className="button button--dark button--login"
                  onClick={() => setIsRegisterModalOpen(!isRegisterModalOpen)}
                >
                  Sign up
                </div>
              </>
            }
          />
        </Link>
      </div>
      <Modal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen}>
        <LoginForm />
      </Modal>
      <Modal isOpen={isRegisterModalOpen} setIsOpen={setIsRegisterModalOpen}>
        <RegisterForm />
      </Modal>
    </div>
  );
};

export default Login;
