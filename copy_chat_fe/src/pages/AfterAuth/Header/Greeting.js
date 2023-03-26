import React from "react";

export default function Greeting({ user }) {
  console.log("Greeting>arg user", user);
  const firstname = user?.firstname;
  const lastname = user?.lastname;
  const username = user?.username;

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
