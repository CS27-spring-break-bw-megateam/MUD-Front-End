import React, { useEffect } from "react";
import { navigate } from "@reach/router";

const PrivateRoute = props => {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token]);

  let { as: Comp, ...rest } = props;

  return token && <Comp {...rest} />;
};

export default PrivateRoute;
