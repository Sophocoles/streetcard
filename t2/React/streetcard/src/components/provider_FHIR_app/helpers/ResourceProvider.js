import React, { useState } from "react";
import ResourceContext from "./ResourceContext";

const ResourceProvider = ({ children }) => {
  const [resources, setResources] = useState([]);

  return (
    <ResourceContext.Provider value={{ resources, setResources }}>
      {children}
    </ResourceContext.Provider>
  );
};

export default ResourceProvider;
