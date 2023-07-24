import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Button, Row, Col, Form } from "react-bootstrap";

import { login } from "./LoginActions.js";

const Login = ({ login, auth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/about");
    }
  }, [auth.isAuthenticated, navigate]);

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const onLoginClick = () => {
    const userData = {
      email: email,
      password: password
    };

    console.log("Email:", email);
    console.log("Password:", password);
    login(userData, "/about", navigate);
  };

  return (
    <Container>
      <Row>
        <Col md="4">
          <h1>Login</h1>
          <Form>
            <Form.Group controlId="emailId">
              <Form.Label>Your Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={onChange}
              />
            </Form.Group>
  
            <Form.Group controlId="passwordId">
              <Form.Label>Your password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={onChange}
              />
            </Form.Group>
          </Form>
          <Button color="primary" onClick={onLoginClick}>
            Login
          </Button>
          <p className="mt-2">
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
          <p className="mt-2">
            Forgot password?{" "}
            <Link to="/send_reset_password">Reset Password</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
  
  };


//export default Login;
Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

// Update the export line
export default connect(mapStateToProps, {
    login,
  })(Login);
  