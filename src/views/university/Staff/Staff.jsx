import moment from "moment"; // Example for onSort prop
import React from "react"; // Import React
//import { render } from 'react-dom'; // Import render method
import { Row, Col, Modal, Button, Alert } from "react-bootstrap";
import Datatable from "react-bs-datatable";

import API from "../../../services";

const header = [
  { title: "NPM", prop: "npm", sortable: true, filterable: true },
  { title: "Name", prop: "name", sortable: true, filterable: true },
  // { title: "Major", prop: "major", sortable: true, filterable: true },
  { title: "Phone", prop: "phone", sortable: true, filterable: true },
  { title: "Line", prop: "line_id", sortable: true, filterable: true },
  { title: "Division", prop: "division", sortable: true, filterable: true },
  { title: "Interview", prop: "interview", sortable: true, filterable: true },
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

class Staff extends React.Component {
  state = {
    body: [],
    modalData: {},
    isShow: false,
    alert: {
      variant: "",
      show: false,
      msg: "",
    },
  };

  async getStaffData(page) {
    const data = await API.getStaff(page);
    const staffData = data.data;
    staffData.forEach((staff) => {
      let divisionString = "";
      staff.division = JSON.parse(staff.division);
      staff.division.forEach((e) => {
        if (e !== null || e !== "null") {
          divisionString += `${e} \n`;
        }
      });
      staff.division = divisionString;

      let interviewString = "";
      staff.interview = JSON.parse(staff.interview);
      staff.interview.forEach((e) => {
        interviewString += `${e} \n`;
      });
      staff.interview = interviewString;
    });
    this.setState({
      body: staffData,
    });
  }

  onRowClick(row) {
    alert(`You clicked on the row ${JSON.stringify(row)}`);
  }

  componentDidMount() {
    this.getStaffData();
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

  handleDeleteStaff = (id) => {
    API.deleteStaff(id)
      .then((response) => {
        this.setState({
          alert: {
            variant: "success",
            show: true,
            msg: "Delete Success",
          },
        });
      })
      .catch((error) => {
        this.setState({
          alert: {
            variant: "danger",
            show: true,
            msg: "Failed to Delete, Please refresh the page",
          },
        });
      });

    setTimeout(() => {
      this.handleModalCancel();
      this.getStaffData();
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
                  <h1 className="title">Staff</h1>
                </div>
              </div>

              <div className="col-12">
                <section className="box ">
                  <header className="panel_header">
                    <h2 className="title float-left">Staff Data</h2>
                  </header>
                  <div className="content-body">
                    <div className="row">
                      <div className="col-lg-12 dt-disp">
                        <Datatable
                          onRowClick={(data) => {
                            this.handleOpenModal(data);
                          }}
                          tableHeaders={header}
                          tableBody={this.state.body}
                          k
                          eyName="userTable"
                          tableClass="striped table-hover table-responsive"
                          rowsPerPage={10}
                          rowsPerPageOption={[5, 10]}
                          initialSort={{ prop: "npm", isAscending: true }}
                          onSort={onSortFunction}
                          labels={customLabels}
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
            <Modal.Title>Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col lg={3}>NPM: </Col>
              <Col>{this.state.modalData.npm}</Col>
            </Row>
            <Row>
              <Col lg={3}>Nama: </Col>
              <Col>{this.state.modalData.name}</Col>
            </Row>
            <Row>
              <Col lg={3}>Jurusan: </Col>
              <Col>{this.state.modalData.major}</Col>
            </Row>
            <Row>
              <Col lg={3}>Phone: </Col>
              <Col>{this.state.modalData.phone}</Col>
            </Row>
            <Row>
              <Col lg={3}>Line: </Col>
              <Col>{this.state.modalData.line_id}</Col>
            </Row>
            <Row>
              <Col lg={3}>Division: </Col>
              <Col style={{ whiteSpace: "pre-line" }}>
                {this.state.modalData.division}
              </Col>
            </Row>
            <Row>
              <Col lg={3}>Interview: </Col>
              <Col style={{ whiteSpace: "pre-line" }}>
                {this.state.modalData.interview}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => {
                this.handleDeleteStaff(this.state.modalData.id);
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

export default Staff;
