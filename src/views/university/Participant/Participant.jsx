import moment from "moment"; // Example for onSort prop
import React from "react"; // Import React
//import { render } from 'react-dom'; // Import render method
import Datatable from "react-bs-datatable"; // Import this package
import { Row, Col } from "reactstrap";

import API from "../../../services";

const header = [
  {
    title: "Competition",
    prop: "competition",
    sortable: true,
    filterable: true,
  },
  { title: "Name", prop: "name", sortable: true, filterable: true },
  { title: "Team Name", prop: "team_name", sortable: true, filterable: true },
  { title: "Email", prop: "email", sortable: true, filterable: true },
  { title: "School", prop: "school", sortable: true, filterable: true },
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
    body: [
      {
        competition: "",
        name: "",
        team_name: "",
        email: "",
        school: "",
      },
    ],
  };

  async getStaffData(page) {
    const data = await API.getStaff(page);
    const staffData = data.data.data;
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
      staff.interview = divisionString;
    });
    console.log(staffData);
    this.setState({
      body: staffData,
    });
  }

  onRowClick(row) {
    alert(`You clicked on the row ${JSON.stringify(row)}`);
  }

  componentDidMount() {
    // this.getStaffData();
  }

  render() {
    return (
      <div>
        <div className="content">
          <Row>
            <Col xs={12} md={12}>
              <div className="page-title">
                <div className="float-left">
                  <h1 className="title">Participant</h1>
                </div>
              </div>

              <div className="col-12">
                <section className="box ">
                  <header className="panel_header">
                    <h2 className="title float-left">Participant Data</h2>
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
                          onRowClick={(row) => this.onRowClick}
                        />
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

export default Participant;
