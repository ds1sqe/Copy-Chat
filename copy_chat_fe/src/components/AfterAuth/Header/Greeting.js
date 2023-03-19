import React from "react";

export default function Greeting({ auth }) {
  const firstname = auth?.user.firstname;
  const lastname = auth?.user.lastname;
  const username = auth?.user.username;

  let uname;

  if (firstname === undefined) {
    console.log("user's firstname undefined");
    uname = username;
  } else {
    uname = firstname + " ";
    if (lastname !== undefined) {
      uname = uname + lastname;
    } else {
      console.log("user's lastname undefined");
    }
  }

  return (
    <div className="greeting">
      <p>hello {uname}</p>
    </div>
  );
}
