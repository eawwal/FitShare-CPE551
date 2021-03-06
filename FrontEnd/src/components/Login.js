import React, { Component } from "react";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText,
  FormFeedback,
  Spinner,
  Row
} from "reactstrap";
import { connect } from "react-redux";
import "../styles/App.css";
import { Redirect, Link } from "react-router-dom";
import { loginAuthentication } from "../actions/userActions"

const mapStateToProps = state => {
  return {
    loggedIn: state.userInformation.loginSuccess,
    refreshingData: state.userInformation.refreshing
  };
};

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      validate: {
        emailState: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state;
    if (emailRex.test(e.target.value)) {
      validate.emailState = "has-success";
    } else {
      validate.emailState = "has-danger";
    }
    this.setState({ validate });
  }

  handleChange = async event => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [name]: value
    });
  };

  async submitForm(e) {
    e.preventDefault();
    this.props.dispatch((loginAuthentication(this.state.email, this.state.password)))

  }

  render() {
    const { email, password } = this.state;
    const { loggedIn, refreshingData } = this.props;
    return (
      <div>
        {loggedIn && <Redirect to="/home" />}
        <Container fluid className="App">
          <h2 style={{display: "flex", justifyContent: "center"}}>Sign In</h2>
          <Form className="form" onSubmit={e => this.submitForm(e)}>
            <Col>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="name@example.com"
                  autoFocus={true}
                  value={email}
                  valid={this.state.validate.emailState === "has-success"}
                  invalid={this.state.validate.emailState === "has-danger"}
                  disabled={refreshingData ? true : false}
                  onChange={e => {
                    this.validateEmail(e);
                    this.handleChange(e);
                  }}
                />
                <FormFeedback valid />
                <FormFeedback>
                  Enter a properly formatted email address
                </FormFeedback>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="********"
                  disabled={refreshingData ? true : false}
                  value={password}
                  onChange={e => this.handleChange(e)}
                />
              </FormGroup>
            </Col>
            <Col style={{display: "flex", justifyContent: "space-between"}}>
              <Button>Login</Button>
              <Button color="primary" tag={Link} to="/register">Register</Button>
            </Col>
          </Form>
            {
            refreshingData &&
            <FormGroup >
              <Col style={{display: "flex", justifyContent: "center"}}>
                <Spinner color="primary" style={{ width: '4rem', height: '4rem'}} />
              </Col>
            </FormGroup>
          }
        </Container>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(LogIn);
