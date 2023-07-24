import React, { Component } from "react";
import { connect } from "react-redux"; // new import
import PropTypes from "prop-types"; // new import
import { Link, Route } from "react-router-dom";
import {
  Container,
  Button,
  Row,
  Col,
  Form,
  FormControl
} from "react-bootstrap";

import { signupNewUser } from "./SignupActions"; // new import

console.log("In ssignup")

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        user_type: "",
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // update function to call the action
  onSignupClick = () => {
    const userData = {
        username: this.state.username,
        email: this.state.email,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        password: this.state.password,
        user_type: this.state.user_type,
    };
    this.props.signupNewUser(userData, this.props.history); // <-- pass history as the second argument
  };

  render() {
    return (
      <Container>
        
        <Row>
          <Col md="4">
            <h1>Sign up</h1>
            <Form>
              <Form.Group controlId="usernameId">
                <Form.Label>User name</Form.Label>
                <Form.Control
                  isInvalid={this.props.createUser.usernameError}
                  type="text"
                  name="username"
                  placeholder="Enter user name"
                  value={this.state.username}
                  onChange={this.onChange}
                />
                <FormControl.Feedback type="invalid">
                  {this.props.createUser.usernameError}
                </FormControl.Feedback>
              </Form.Group>

              <Form.Group controlId="passwordId">
                <Form.Label>Your password</Form.Label>
                <Form.Control
                  isInvalid={this.props.createUser.passwordError}
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <Form.Control.Feedback type="invalid">
                  {this.props.createUser.passwordError}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="emailId">
                <Form.Label>Email</Form.Label>
                <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={this.state.email}
                onChange={this.onChange}
                />
                </Form.Group>

                <Form.Group controlId="firstNameId">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                type="text"
                name="first_name"
                placeholder="Enter first name"
                value={this.state.first_name}
                onChange={this.onChange}
                />
                </Form.Group>

                <Form.Group controlId="lastNameId">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                type="text"
                name="last_name"
                placeholder="Enter last name"
                value={this.state.last_name}
                onChange={this.onChange}
                />
                </Form.Group>

                <Form.Group controlId="userTypeId">
                <Form.Label>User Type</Form.Label>
                <Form.Control
                as="select"
                name="user_type"
                value={this.state.user_type}
                onChange={this.onChange}
                >
                <option value="">Choose...</option>
                <option value="client">Client</option>
                <option value="provider">Provider</option>
                </Form.Control>
                </Form.Group>

            </Form>
            <Button color="primary" onClick={this.onSignupClick}>
              Sign up
            </Button>
            <p className="mt-2">
              Already have account? <Link to="/login">Login</Link>
            </p>
          </Col>
        </Row>
       
        </Container>
    );
  }
}

// connect action and reducer
// replace 
// export default Signup;
// with code below:

Signup.propTypes = {
  signupNewUser: PropTypes.func.isRequired,
  createUser: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  createUser: state.createUser
});

export default connect(mapStateToProps, {
  signupNewUser
})(Signup);