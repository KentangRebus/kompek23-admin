import UniversityLayout from "layouts/University.jsx";
import Login from "../views/university/Login/Login";

var BASEDIR = process.env.REACT_APP_BASEDIR;

var indexRoutes = [
  { path: "/login", name: "Login", component: Login },
  { path: BASEDIR + "/", name: "Home", component: UniversityLayout },
  { path: "/", name: "Home", component: UniversityLayout },
];

export default indexRoutes;
