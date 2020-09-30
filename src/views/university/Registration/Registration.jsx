import React from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Row, Col } from "reactstrap";

import Regislist from "../../../components/university/RegisList/Regislist";
import API from "../../../services";

const IMGDIR = process.env.REACT_APP_IMGDIR;

class Registration extends React.Component {
  state = {
    registrationData: [],
    registrationMap: {
      staff: {
        name: "Staff Registration",
        avatar: `${IMGDIR}/images/university/courses/course-5.jpg`,
      },
      participant: {
        name: "Participant Registration",
        avatar: `${IMGDIR}/images/university/courses/course-2.jpg`,
      },
      webinar: {
        name: "Webinar Registration",
        avatar: `${IMGDIR}/images/university/courses/course-3.jpg`,
      },
    },
  };

  async getRegistrationData() {
    const data = await API.getRegistration();
    const regisData = data.data;
    this.setState({
      registrationData: regisData,
    });
    console.log(regisData);
    console.log(this.state.registrationMap);
  }

  componentDidMount() {
    this.getRegistrationData();
  }

  componentDidUpdate() {
    if (this.state.registrationData.length === 0) {
      this.getRegistrationData();
    }
  }

  handleDisable = (name) => {
    API.disableRegistration(name).then((response) => {
      this.setState({
        registrationData: response.data,
      });
    });
  };

  handleEnable = (name) => {
    API.enableRegistration(name).then((response) => {
      this.setState({
        registrationData: response.data,
      });
    });
  };

  render() {
    return (
      <div>
        <div className="content">
          <Row>
            <Col xs={12} md={12}>
              <div className="page-title">
                <div className="float-left">
                  <h1 className="title">Registration</h1>
                </div>
              </div>

              <div className="col-xl-12">
                <section className="box ">
                  <header className="panel_header">
                    <h2 className="title float-left">Manage Registration</h2>
                  </header>
                  <div className="content-body">
                    <div className="row">
                      <div className="col-12">
                        <div className="row">
                          {this.state.registrationData.map((e, idx) => (
                            <div
                              className="col-md-6 col-lg-6 col-sm-12"
                              key={idx}
                            >
                              <div className="team-member aside-style">
                                <div className="row margin-0">
                                  <div className="team-img col-4">
                                    <img
                                      className="img-fluid"
                                      src={
                                        this.state.registrationMap[e.name]
                                          .avatar
                                      }
                                      alt=""
                                    />
                                  </div>
                                  <div className="team-info col-8">
                                    <h3>
                                      <NavLink to="#">
                                        {
                                          this.state.registrationMap[e.name]
                                            .name
                                        }
                                      </NavLink>
                                    </h3>
                                    <span>
                                      Status:{" "}
                                      {e.status ? "Enabled" : "Disabled"}
                                    </span>
                                    <div>
                                      {e.status ? (
                                        <Button
                                          variant="danger"
                                          onClick={() =>
                                            this.handleDisable(e.name)
                                          }
                                        >
                                          Disable
                                        </Button>
                                      ) : (
                                        <Button
                                          variant="success"
                                          onClick={() =>
                                            this.handleEnable(e.name)
                                          }
                                        >
                                          Enable
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Registration;
