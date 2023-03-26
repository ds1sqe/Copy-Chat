import React, { useState } from "react";
import { AxiosInstanceProvider } from "../../hook/endpoint/axios/useAxios";
import DetailPannel from "./DetailPannel/DetailPannel";
import GroupSelector from "./SidePannel/GroupSelector";

import "./Main.css";

const REST_DOMAIN = process.env.REACT_APP_REST_DOMAIN;

export default function Main({ getToken, setToken, user, setUser }) {
  const axiosOptions = {
    baseURL: REST_DOMAIN,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const [group, setGroup] = useState("");

  return (
    <div className="main">
      <AxiosInstanceProvider
        config={axiosOptions}
        requestInterceptors={[
          function (config) {
            const token = getToken();
            config.headers.Authorization = token ? `Bearer ${token}` : "";
          },
        ]}
      >
        <GroupSelector group={group} setGroup={setGroup} />
        <DetailPannel group={group} />
      </AxiosInstanceProvider>
    </div>
  );
}
