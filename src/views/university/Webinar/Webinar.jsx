import moment from "moment"; // Example for onSort prop
import React from "react"; // Import React
//import { render } from 'react-dom'; // Import render method
import Datatable from "react-bs-datatable"; // Import this package
import { Row, Col, Modal, Button, Alert } from "react-bootstrap";

import API from "../../../services";

const header = [
  { title: "Name", prop: "name", sortable: true, filterable: true },
  {
    title: "Institution",
    prop: "institution",
    sortable: true,
    filterable: true,
  },
  { title: "Email", prop: "email", sortable: true, filterable: true },
  { title: "Phone", prop: "phone", sortable: true, filterable: true },
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

class Webinar extends React.Component {
  state = {
    body: [],
    isShow: false,
    modalData: {},
    alert: {
      variant: "",
      show: false,
      msg: "",
    },
  };

  async getWebinarData() {
    const data = await API.getWebinar();
    this.setState({
      body: data.data,
    });
  }

  componentDidMount() {
    this.getWebinarData();
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
      alert: {
        show: false,
      },
    });
  };

  handleDeleteData = (id) => {
    API.deleteWebinar(id)
      .then((res) => {
        this.setState({
          alert: {
            variant: "success",
            show: true,
            msg: "Delete Success",
          },
        });
      })
      .catch((err) => {
        this.setState({
          alert: {
            variant: "danger",
            show: true,
            msg: "Failed to delete, please refresh the page",
          },
        });
      });

    setTimeout(() => {
      this.handleModalCancel();
      this.getWebinarData();
    }, 800);
  };

  render() {
    return (
      <div>
        <div className="content">
          <Row>
            <Col xs={12} md={12}>
              <div className="page-title">
                <div className="float-left">
                  <h1 className="title">Webinar</h1>
                </div>
              </div>

              <div className="col-12">
                <section className="box ">
                  <header className="panel_header">
                    <h2 className="title float-left">Webinar Data</h2>
                  </header>
                  <div className="content-body">
                    <div className="row">
                      <div className="col-lg-12 dt-disp">
                        <Datatable
                          tableHeaders={header}
                          tableBody={this.state.body}
                          keyName="userTable"
                          tableClass="striped table-hover table-responsive"
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
                  </div>
                </section>
              </div>
            </Col>
          </Row>
        </div>
        <Modal show={this.state.isShow} onHide={this.handleModalCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>Name: </Col>
              <Col>{this.state.modalData.name}</Col>
            </Row>
            <Row>
              <Col>Institution: </Col>
              <Col>{this.state.modalData.institution}</Col>
            </Row>
            <Row>
              <Col>Email: </Col>
              <Col>{this.state.modalData.email}</Col>
            </Row>
            <Row>
              <Col>Phone: </Col>
              <Col>{this.state.modalData.phone}</Col>
            </Row>
            <Row>
              <Col>Register At: </Col>
              <Col>{this.state.modalData.created_at}</Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => {
                this.handleDeleteData(this.state.modalData.id);
              }}
            >
              Delete
            </Button>
            <Button variant="primary" onClick={this.handleModalCancel}>
              Close
            </Button>
          </Modal.Footer>
          <Alert
            variant={this.state.alert.variant}
            show={this.state.alert.show}
          >
            {this.state.alert.msg}
          </Alert>
        </Modal>
      </div>
    );
  }
}

export default Webinar;
