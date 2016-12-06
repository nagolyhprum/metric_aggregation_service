import React from "react";

import ServerStatus from "components/serverStatus";
import ClientList from "components/clientList";

const MetricClient = props => {
  return (
    <div>
      <ServerStatus/>
      <ClientList/>
    </div>
  );
};

export default MetricClient;
