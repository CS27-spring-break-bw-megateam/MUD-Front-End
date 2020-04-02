import axios from "axios";

export default function serverHandshake(auth) {
  const options = {
    baseURL: "https://lambda-mud-test.herokuapp.com/"
  };

  if (auth) {
    const token = localStorage.getItem("token");
    options.headers = {
      // authorization: `Bearer ${token}`
      authorization: `${token}`
    };
  }

  return axios.create(options);
}
