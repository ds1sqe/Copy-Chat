import React from "react";
import axios from "axios";

/*
 * expire time => 5 * 60 * 1000 => 300,000ms
 * margin @ 5sec, 295,000ms
 */

// TODO: create two custom hook,
// useToken, => manage token vaildations
// useRest => custom axios that manange rest requests

const REST_DOMAIN = process.env.REACT_APP_REST_DOMAIN;

// HACK: this is test function

export default function CheckToken({ token }) {
  async function verify() {
    console.log("verify>>REST_DOMAIN", REST_DOMAIN);

    const vi = axios.create({ baseURL: REST_DOMAIN });

    const check = await vi
      .post(REST_DOMAIN + "/account/token/verify/", { token: token })
      .then((r) => console.log(r));

    return check;
  }

  return (
    <div className="verify-wrapper">
      <button type="button" onClick={() => verify()}>
        Check Token
      </button>
    </div>
  );
}
