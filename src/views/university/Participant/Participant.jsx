import moment from "moment"; // Example for onSort prop
import React from "react"; // Import React
import { Alert, Modal, Button } from "react-bootstrap";
//import { render } from 'react-dom'; // Import render method
import Datatable from "react-bs-datatable"; // Import this package
import { Row, Col } from "reactstrap";

import API from "../../../services";

const header = [
  {
    title: "Competition",
    prop: "competition_name",
    sortable: true,
    filterable: true,
  },
  { title: "Name", prop: "name", sortable: true, filterable: true },
  { title: "Team Name", prop: "team_name", sortable: true, filterable: true },
  // { title: "Email", prop: "email", sortable: true, filterable: true },
  { title: "Form", prop: "form", sortable: true, filterable: true },
  { title: "Answer", prop: "answer", sortable: true, filterable: true },
  {
    title: "Register Date",
    prop: "created_at",
    sortable: true,
    filterable: true,
  },
];

const onSortFunction = {
  date(columnValue) {
    // Convert the string date format to UTC timestamp
    // So the table could sort it by number instead of by string
    return moment(columnValue, "Do MMMM YYYY").valueOf();
  },
};

const customLabels = {
  prev: "<",
  next: ">",
  show: "Display ",
  entries: " rows",
  noResults: "There is no data to be displayed",
};

class Participant extends React.Component {
  state = {
    body: [],
    modalData: {},
    isShow: false,
    alertModal: {
      variant: "",
      show: false,
      msg: "",
    },
    alert: {
      variant: "",
      show: false,
      msg: "",
    },
    iframe: "",
  };

  async getParicipantData() {
    try {
      let { data } = await API.getParticipant();

      data.forEach((e) => {
        e["competition_name"] = e.competition.name;

        e.name = JSON.parse(e.name);
        e.name = `${e.name[0]}\n${e.name[1]}\n${e.name[2]}\n`;

        if (e.payment_path !== null && e.school_path !== null) {
          e["form"] = (
            <svg
              style={{ color: "#5de65d", width: "30px" }}
              aria-hidden='true'
              focusable='false'
              data-prefix='fas'
              data-icon='check-circle'
              class='svg-inline--fa fa-check-circle fa-w-16'
              role='img'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 512 512'>
              <path
                fill='currentColor'
                d='M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z'></path>
            </svg>
          );
        } else {
          e["form"] = (
            <svg
              style={{ color: "maroon", width: "22px" }}
              aria-hidden='true'
              focusable='false'
              data-prefix='fas'
              data-icon='times'
              class='svg-inline--fa fa-times fa-w-11'
              role='img'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 352 512'>
              <path
                fill='currentColor'
                d='M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z'></path>
            </svg>
          );
        }

        if (e.answer_path !== null) {
          e["answer"] = (
            <svg
              style={{ color: "#5de65d", width: "30px" }}
              aria-hidden='true'
              focusable='false'
              data-prefix='fas'
              data-icon='check-circle'
              class='svg-inline--fa fa-check-circle fa-w-16'
              role='img'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 512 512'>
              <path
                fill='currentColor'
                d='M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z'></path>
            </svg>
          );
        } else {
          e["answer"] = (
            <svg
              style={{ color: "maroon", width: "22px" }}
              aria-hidden='true'
              focusable='false'
              data-prefix='fas'
              data-icon='times'
              class='svg-inline--fa fa-times fa-w-11'
              role='img'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 352 512'>
              <path
                fill='currentColor'
                d='M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z'></path>
            </svg>
          );
        }
      });

      this.setState({
        body: data,
      });
    } catch (error) {}
  }

  handleOpenModal(data) {
    this.setState({
      isShow: true,
      modalData: data,
    });
  }

  handleModalCancel = () => {
    this.setState({
      isShow: false,
      modalData: {},
      alertModal: {
        show: false,
      },
    });
  };

  async deleteParticipantData(id) {
    try {
      this.setState({
        alertModal: {
          variant: "warning",
          show: true,
          msg: "Deleting Participant Data, Please wait...",
        },
      });
      let { data } = await API.deleteParticipant(id);
      this.getParicipantData();
      this.setState({
        alertModal: {
          variant: "success",
          show: true,
          msg: "Participant Data Deleted",
        },
      });

      setTimeout(() => {
        this.setState({
          isShow: false,
          alertModal: {
            variant: "",
            show: false,
            msg: "",
          },
        });
      }, 2000);
    } catch (error) {}
  }

  componentDidMount() {
    this.getParicipantData();
  }

  async handleDownloadAllAnswer() {
    try {
      this.setState({
        alert: {
          variant: "warning",
          show: true,
          msg: "Zipping and Downloading Answer data, please wait...",
        },
        iframe:
          "https://backend.kompek-febui.com/api/participant/download/answer/all",
      });

      await API.downloadAllAnswer();

      this.setState({
        alert: {
          variant: "success",
          show: true,
          msg: "Download Complete",
        },
        iframe: "",
      });
    } catch (error) {
      this.setState({
        alert: {
          variant: "danger",
          show: true,
          msg: "Download Failed, please refresh the page",
        },
        iframe: "",
      });
    }
  }

  async handleDownloadAllForm() {
    try {
      this.setState({
        alert: {
          variant: "warning",
          show: true,
          msg: "Zipping and Downloading Form data, please wait...",
        },
        iframe:
          "https://backend.kompek-febui.com/api/participant/download/form/all",
      });

      await API.downloadAllForm();

      this.setState({
        alert: {
          variant: "success",
          show: true,
          msg: "Download Complete",
        },
        iframe: "",
      });
    } catch (error) {
      this.setState({
        alert: {
          variant: "danger",
          show: true,
          msg: "Download Failed, please refresh the page",
        },
        iframe: "",
      });
    }
  }

  async handleDownloadAnswer(id) {
    try {
      this.setState({
        alertModal: {
          variant: "warning",
          show: true,
          msg: "Zipping and Downloading Answer data, please wait...",
        },
        iframe: `https://backend.kompek-febui.com/api/participant/download/answer/${id}`,
      });

      await API.downloadForm(id);

      this.setState({
        alertModal: {
          variant: "success",
          show: true,
          msg: "Download Complete",
        },
        iframe: "",
      });
    } catch (error) {
      this.setState({
        alertModal: {
          variant: "danger",
          show: true,
          msg: "Download Failed, please refresh the page",
        },
        iframe: "",
      });
    }
  }

  async handleDownloadForm(id) {
    try {
      this.setState({
        alertModal: {
          variant: "warning",
          show: true,
          msg: "Zipping and Downloading Form data, please wait...",
        },
        iframe: `https://backend.kompek-febui.com/api/participant/download/form/${id}`,
      });

      await API.downloadForm(id);

      this.setState({
        alertModal: {
          variant: "success",
          show: true,
          msg: "Download Complete",
        },
        iframe: "",
      });
    } catch (error) {
      this.setState({
        alertModal: {
          variant: "danger",
          show: true,
          msg: "Download Failed, please refresh the page",
        },
        iframe: "",
      });
    }
  }

  render() {
    return (
      <div>
        <div className='content'>
          <Row>
            <Col xs={12} md={12}>
              <div className='page-title'>
                <div className='float-left'>
                  <h1 className='title'>Participant</h1>
                </div>
              </div>

              <div className='col-12'>
                <section className='box '>
                  <header className='panel_header'>
                    <h2 className='title float-left'>Participant Data</h2>
                  </header>
                  <div className='content-body'>
                    <div className='row'>
                      <div className='col-lg-12 dt-disp'>
                        <Datatable
                          tableHeaders={header}
                          tableBody={this.state.body}
                          keyName='userTable'
                          tableClass='striped table-hover table-responsive'
                          rowsPerPage={10}
                          rowsPerPageOption={[5, 10]}
                          initialSort={{ prop: "npm", isAscending: true }}
                          onSort={onSortFunction}
                          labels={customLabels}
                          onRowClick={(data) => {
                            this.handleOpenModal(data);
                          }}
                        />
                      </div>
                    </div>
                    <Alert
                      className='mt-2 text-center'
                      show={this.state.alert.show}
                      variant={this.state.alert.variant}>
                      {this.state.alert.msg}

                      <div
                        style={
                          this.state.alert.variant === "warning"
                            ? { textAlign: "center" }
                            : { display: "none" }
                        }>
                        <img
                          src='https://lh3.googleusercontent.com/pw/ACtC-3fSf9MkZ5Pc3PzuCH3kzW6WqvLTmAl9fBBNBDRVmzvYZjlvSvBIoF1-c4t_Sv8KGCPu-IX28ODwLPQfcgWnEZQaDKkUd-x4CmH1VrBJ3xmN_hxPEP38-ozQ9lOup1ovJ1KTke1l4LXL8CwV6XyJe8Ik=s200-no?authuser=0'
                          alt='loading'
                          style={{ width: "50px" }}
                        />
                      </div>
                    </Alert>
                    <Row>
                      <Col lg={3}>
                        <Button
                          className='customBtn'
                          block
                          onClick={() => {
                            this.handleDownloadAllForm();
                          }}>
                          Download All Form
                        </Button>
                      </Col>
                      <Col lg={3}>
                        <Button
                          className='customBtn purple'
                          block
                          onClick={() => {
                            this.handleDownloadAllAnswer();
                          }}>
                          Download All Answer
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </section>
              </div>
            </Col>
          </Row>
        </div>
        <Modal show={this.state.isShow} onHide={this.handleModalCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col lg={3}>Competition </Col>
              <Col lg={1}>{": "}</Col>
              <Col>{this.state.modalData.competition_name}</Col>
            </Row>
            <Row>
              <Col lg={3}>Name </Col>
              <Col lg={1}>{": "}</Col>
              <Col style={{ whiteSpace: "pre-line" }}>
                {this.state.modalData.name}
              </Col>
            </Row>
            <Row
              className={
                this.state.modalData.team_name === null ? "d-none" : ""
              }>
              <Col lg={3}>Team </Col>
              <Col lg={1}>{": "}</Col>
              <Col>{this.state.modalData.team_name}</Col>
            </Row>
            <Row>
              <Col lg={3}>Email </Col>
              <Col lg={1}>{": "}</Col>
              <Col>{this.state.modalData.email}</Col>
            </Row>
            <Row>
              <Col lg={3}>School </Col>
              <Col lg={1}>{": "}</Col>
              <Col>{this.state.modalData.school}</Col>
            </Row>
            <Row>
              <Col lg={3}>Payment File </Col>
              <Col lg={1}>{": "}</Col>
              <Col>{this.state.modalData.payment_path}</Col>
            </Row>
            <Row>
              <Col lg={3}>Form File </Col>
              <Col lg={1}>{": "}</Col>
              <Col>{this.state.modalData.school_path}</Col>
            </Row>
            <Row>
              <Col lg={3}>Answer File </Col>
              <Col lg={1}>{": "}</Col>
              <Col>
                {this.state.modalData.answer_path
                  ? this.state.modalData.answer_path
                  : "-"}
              </Col>
            </Row>
            <Row>
              <Col lg={3}>Register At </Col>
              <Col lg={1}>{": "}</Col>
              <Col>{this.state.modalData.created_at}</Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='primary'
              className='btn-icon'
              onClick={() => {
                this.handleDownloadForm(this.state.modalData.id);
              }}>
              <span>
                <svg
                  aria-hidden='true'
                  focusable='false'
                  data-prefix='fas'
                  data-icon='download'
                  className='svg-inline--fa fa-download fa-w-16'
                  role='img'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 512 512'>
                  <path
                    fill='currentColor'
                    d='M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z'></path>
                </svg>
              </span>
              Form
            </Button>
            <Button
              variant='primary'
              className='blue btn-icon'
              onClick={() => {
                this.handleDownloadAnswer(this.state.modalData.id);
              }}>
              <span>
                <svg
                  aria-hidden='true'
                  focusable='false'
                  data-prefix='fas'
                  data-icon='download'
                  className='svg-inline--fa fa-download fa-w-16'
                  role='img'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 512 512'>
                  <path
                    fill='currentColor'
                    d='M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z'></path>
                </svg>
              </span>
              Answer
            </Button>
            <Button
              variant='danger'
              onClick={() => {
                this.deleteParticipantData(this.state.modalData.id);
              }}>
              Delete
            </Button>
          </Modal.Footer>
          <Alert
            variant={this.state.alertModal.variant}
            show={this.state.alertModal.show}>
            {this.state.alertModal.msg}
          </Alert>
        </Modal>

        <div style={{ display: "none" }}>
          <iframe
            title='blank_frame'
            aria-hidden='true'
            src={this.state.iframe}
          />
        </div>
      </div>
    );
  }
}

export default Participant;
