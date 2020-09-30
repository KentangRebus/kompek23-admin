import University from "views/university/Dashboard/University.jsx";

import Staff from "../views/university/Staff/Staff";
import Webinar from "../views/university/Webinar/Webinar";
import Participant from "../views/university/Participant/Participant";
import Case from "../views/university/Case/Course";
import Registration from "../views/university/Registration/Registration";

var BASEDIR = process.env.REACT_APP_BASEDIR;

var dashRoutes = [
  { path: "#", name: "Main Menu", type: "navgroup" },
  {
    path: BASEDIR + "/dashboard",
    name: "Dashboard",
    icon: "speedometer",
    badge: "",
    component: University,
  },
  {
    path: BASEDIR + "/staff",
    name: "Staff",
    icon: "user",
    component: Staff,
  },
  {
    path: BASEDIR + "/webinar",
    name: "Webinar",
    icon: "map",
    component: Webinar,
  },
  {
    path: BASEDIR + "/participant",
    name: "Participant",
    icon: "people",
    component: Participant,
  },
  // {
  //   path: BASEDIR + "/case",
  //   name: "Case",
  //   icon: "folder-alt",
  //   component: Case,
  // },
  {
    path: BASEDIR + "/registration",
    name: "Registration",
    icon: "chart",
    component: Registration,
  },

  //{ redirect: true, path: BASEDIR+"/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
