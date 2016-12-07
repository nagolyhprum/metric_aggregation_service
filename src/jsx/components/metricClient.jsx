import React from "react";

import ServerStatus from "components/serverStatus";
import ClientList from "components/clientList";
import DataDisplay from "components/dataDisplay";

const MetricClient = props => {
  return (
    <div>
      <DataDisplay/>
      <ServerStatus/>
      <ClientList/>
    </div>
  );
};

export default MetricClient;
