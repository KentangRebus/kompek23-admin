import React from "react";
import { Row, Col, Input, Alert } from "react-bootstrap";

import {} from "components";
import API from "../../../services/index";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    alert: {
      visible: false,
      variant: "",
      msg: "",
    },
  };

  handleChange(key, value) {
    this.setState({
      ...this.state,
      [key]: value,
    });
  }

  async doLogin() {
    try {
      const { data } = await API.login(this.state);
      if (data == "failed") {
        this.setState({
          alert: {
            visible: true,
            variant: "danger",
            msg:
              "Login failed, please check your username/password or refresh the page",
          },
        });
      } else {
        localStorage.setItem("tokenId", data.id);
        this.props.history.push("/dashboard");
      }
    } catch (error) {
      if (error.response) {
        this.setState({
          alert: {
            visible: true,
            variant: "danger",
            msg:
              "Login failed, please check your username / password or refresh the page",
          },
        });
      }
    }
  }

  handleSubmit = () => {
    this.doLogin();
  };

  render() {
    return (
      <div className="login-bg">
        <div>
          <Row>
            <Col xs={12} md={12}>
              <div className="container-fluid">
                <div className="login-wrapper row">
                  <div
                    id="login"
                    className="login loginpage offset-xl-4 offset-lg-3 offset-md-3 offset-0 col-12 col-md-6 col-xl-4"
                  >
                    <h1>
                      <a href="#!" title="Login Page" tabIndex="-1">
                        &nbsp;
                      </a>
                    </h1>

                    <form
                      name="loginform"
                      id="loginform"
                      action="#!"
                      method="post"
                    >
                      <p>
                        <label htmlFor="user_login">
                          Username
                          <br />
                          <input
                            type="text"
                            name="un"
                            id="user_name"
                            className="form-control"
                            onChange={(e) =>
                              this.handleChange("username", e.target.value)
                            }
                          />
                        </label>
                      </p>
                      <p>
                        <label htmlFor="user_pass">
                          Password
                          <br />
                          <input
                            type="password"
                            name="pwd"
                            id="user_pass"
                            className="input"
                            size="20"
                            onChange={(e) =>
                              this.handleChange("password", e.target.value)
                            }
                          />
                        </label>
                      </p>
                      <p className="submit">
                        <input
                          type="button"
                          name="wp-submit"
                          id="wp-submit"
                          className="btn btn-accent btn-block"
                          value="Sign In"
                          onClick={this.handleSubmit}
                        />
                      </p>
                    </form>
                    <Alert
                      show={this.state.alert.visible}
                      variant={this.state.alert.variant}
                    >
                      {this.state.alert.msg}
                    </Alert>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Login;
