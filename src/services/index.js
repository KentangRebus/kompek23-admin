import API from "./axios";

export default {
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
};
