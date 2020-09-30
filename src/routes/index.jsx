import UniversityLayout from "layouts/University.jsx";

var BASEDIR = process.env.REACT_APP_BASEDIR;

var indexRoutes = [
  { path: BASEDIR + "/", name: "Home", component: UniversityLayout },
  { path: "/", name: "Home", component: UniversityLayout },
];

export default indexRoutes;
