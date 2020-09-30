import React from "react";
import { Row, Col } from "reactstrap";

import { courses } from "variables/university/courses.jsx";
import Regislist from "../../../components/university/RegisList/Regislist";

var IMGDIR = process.env.REACT_APP_IMGDIR;

const data = [
  {
    avatar: IMGDIR + "/images/university/courses/course-1.jpg",
    name: "Staff Registration",
  },
  {
    avatar: IMGDIR + "/images/university/courses/course-2.jpg",
    name: "Webinar Registration",
  },
  {
    avatar: IMGDIR + "/images/university/courses/course-4.jpg",
    name: "Competition Registration",
  },
];

class Registration extends React.Component {
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
                        <Regislist courses={data} />
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
