import React from "react";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import API from "../../../services/index";

const competitionMap = {
  EQ: {
    name: "Economic Quiz",
  },
  ERP: {
    name: "Economic Research Paper",
  },
  EDC: {
    name: "Economic Debate Competition",
  },
  BC: {
    name: "Business Challege",
  },
};

class Case extends React.Component {
  state = {
    competition: [],
    EQ: "",
    ERP: "",
    EDC: "",
    BC: "",
    show: false,
    variant: "",
    message: "",
    iframe: "",
  };

  async getCompetition() {
    const { data } = await API.getCompetition();
    this.setState({
      competition: data,
    });
  }

  componentDidMount() {
    this.getCompetition();
  }

  handleChangeFile(key, value) {
    this.setState({
      [key]: value.files[0],
    });
  }

  async handleFileUpload(e, key) {
    e.preventDefault();
    if (this.state[key] !== "") {
      try {
        this.setState({
          show: true,
          variant: "warning",
          message: "Uploading file please wait ....",
        });

        let form = new FormData();
        form.append("name", key);
        form.append("file", this.state[key]);

        let { data } = await API.uploadFileCompetition(form);

        this.setState({
          competition: data,
          show: true,
          variant: "success",
          message: "Upload File Success",
          [key]: "",
        });
      } catch (error) {
        this.setState({
          show: true,
          variant: "danger",
          message: "Please make sure the file is correct or refresh the page",
        });
      }
    } else {
      this.setState({
        show: true,
        variant: "danger",
        message: "Please make sure the file is correct or refresh the page",
      });
    }
  }

  handleDownload(name) {
    try {
      const path = `https://backend.kompek-febui.com/api/competition/${name}`;

      this.setState({
        show: true,
        variant: "warning",
        message: "Downloading file please wait...",
        iframe: path,
      });

      this.setState({
        show: true,
        variant: "success",
        message: "File Downloaded",
      });
    } catch (error) {
      this.setState({
        show: true,
        variant: "danger",
        message: "Download failed, please refresh the page",
      });
    }
  }

  render() {
    return (
      <div>
        <div className="content">
          <Row>
            <Col xs={12} md={12}>
              <div className="page-title">
                <div className="float-left">
                  <h1 className="title">Case</h1>
                </div>
              </div>

              <div className="col-xl-12">
                <section className="box ">
                  <header className="panel_header">
                    <h2 className="title float-left">Case File</h2>
                  </header>
                  <div className="content-body">
                    <div className="row">
                      <div className="col-12">
                        <Alert
                          variant={this.state.variant}
                          show={this.state.show}
                          onClick={() => this.setState({ show: false })}
                        >
                          {this.state.message}
                        </Alert>
                      </div>
                      <div className="col-12">
                        <Row>
                          {this.state.competition.map((comp, idx) => (
                            <Col lg={6} sm={12} key={idx}>
                              <div
                                className="team-member aside-style"
                                style={{ display: "block" }}
                              >
                                <div className="row margin-0">
                                  <div className="team-info col-12">
                                    <h2>{competitionMap[comp.name].name}</h2>
                                    <p>File: {comp.path}</p>
                                    <div>
                                      <Form
                                        onSubmit={(e) =>
                                          this.handleFileUpload(e, comp.name)
                                        }
                                      >
                                        <Form.Group>
                                          <Form.File
                                            id="caseFile"
                                            label="Upload Case File: "
                                            onChange={(e) =>
                                              this.handleChangeFile(
                                                comp.name,
                                                e.target
                                              )
                                            }
                                          />
                                        </Form.Group>
                                        <Button
                                          disabled={
                                            this.state[comp.name] === ""
                                          }
                                          block
                                          style={{
                                            padding: "5px 20px",
                                            backgroundColor: "#4D908E",
                                          }}
                                          variant="primary"
                                          type="submit"
                                        >
                                          Upload
                                        </Button>
                                      </Form>
                                    </div>
                                    <Button
                                      disabled={comp.path === ""}
                                      block
                                      className="mt-2"
                                      style={{
                                        padding: "5px 20px",
                                        backgroundColor: "#457B9D",
                                      }}
                                      variant="primary"
                                      onClick={() =>
                                        this.handleDownload(comp.name)
                                      }
                                    >
                                      Download
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          ))}
                        </Row>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </Col>
          </Row>
        </div>
        <div style={{ display: "none" }}>
          <iframe src={this.state.iframe} />
        </div>
      </div>
    );
  }
}

export default Case;
