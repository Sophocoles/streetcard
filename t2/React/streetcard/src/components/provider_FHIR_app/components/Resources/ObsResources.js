import React, { useContext } from "react";
import ResourceContext from "../ResourceContext";
import CustomTable from "../CustomTable";
import '../Table.css'

export default function ObsResources() {
  const resourceContext = useContext(ResourceContext);
  const data = resourceContext.resources || [];

  const observationsObj = data.find((item) => item.key === "Observations");
  const observations = observationsObj ? observationsObj.value : [];

  return (
    <div>
      <h2>Obs Resources</h2>
      <CustomTable data={observations} />
    </div>
  );
}
