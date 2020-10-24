import API from "./axios";

export default {
  login(payload) {
    return API.post("login", payload);
  },
  getStaff() {
    return API.get(`/staff`);
  },
  deleteStaff(id) {
    return API.delete(`/staff/${id}`);
  },
  getWebinar() {
    return API.get(`/webbinar`);
  },
  deleteWebinar(id) {
    return API.delete(`/webbinar/${id}`);
  },
  getRegistration() {
    return API.get("/registration");
  },
  enableRegistration(name) {
    return API.post(`/registration/enable/${name}`);
  },
  disableRegistration(name) {
    return API.post(`/registration/disable/${name}`);
  },
  getCompetition() {
    return API.get("/competition");
  },
  uploadFileCompetition(payload) {
    return API.post("/competition", payload);
  },
  downloadFileCompetition(code) {
    return API.get(`/competition/${code}`);
  },
  getParticipant() {
    return API.get("/participant");
  },
};
