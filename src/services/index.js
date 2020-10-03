import React from "react";
import API from "./axios";
import { useHistory } from "react-router-dom";

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
};
