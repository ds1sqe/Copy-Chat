import { useState } from "react";

const REST_DOMAIN = process.env.REACT_APP_REST_DOMAIN;

export default function useToken() {
  async function renew_token(refresh_token) {
    const r = JSON.stringify({
      refresh: refresh_token,
    });

    return fetch(REST_DOMAIN + "/account/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: r,
    }).then((data) => {
      console.log("useToken>renew_token", data);
      return data.json();
    });
  }

  const getToken = () => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    console.log("useToken>getToken:token", token);

    if (token == null) {
    } else if (token?.expire_on <= Date.now()) {
      // refreshing token
      console.log(
        "useToken>getToken:token expired. refreshing with ",
        JSON.stringify(token?.refresh_token)
      );

      const new_access_token = renew_token(token?.refresh_token);

      console.log("useToken>getToken:new_access_token:", new_access_token);

      const next_token = {
        access_token: new_access_token,
        refresh_token: token?.refresh_token,
        expire_on: Date.now() + 5000, //(5 * 60 * 1000 - 1000),
      };

      console.log("useToken>getToken:next_token:", next_token);

      sessionStorage.setItem("token", JSON.stringify(next_token));
      return next_token;
    }
    return token;
  };

  const saveToken = (new_token) => {
    let token;
    if (new_token === null) {
      token = null;
    } else {
      token = {
        ...new_token,
        expire_on: Date.now() + (5 * 60 * 1000 - 3 * 1000),
      };
    }

    sessionStorage.setItem("token", JSON.stringify(token));
    console.log("useToken>saveToken:token", token);
  };

  return {
    setToken: saveToken,
    getToken: getToken,
  };
}
