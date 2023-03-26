const REST_DOMAIN = process.env.REACT_APP_REST_DOMAIN;

async function renew_token(refresh_token: string) {
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

export function getToken() {
  let __token = sessionStorage.getItem("token");
  if (__token !== null) {
    let token = JSON.parse(__token);
    console.log("useToken>getToken:token", token);
    if (token.expire_on <= Date.now()) {
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
        /*
         * expire time => 5 * 60 * 1000 => 300,000ms
         * margin @3sec
         */
        expire_on: Date.now() + (5 * 60 * 1000 - 3 * 1000),
      };
      console.log("useToken>getToken:next_token:", next_token);
      sessionStorage.setItem("token", JSON.stringify(next_token));
      return next_token;
    }
    return token;
  }
}
