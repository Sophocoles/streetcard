import React, { useState, useEffect } from "react";
import axios from "axios";

function BackendForm({ path }) {
  const [formContent, setFormContent] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/${path}`)
      .then(response => {
        setFormContent(response.data);
      })
      .catch(error => {
        console.error("Error fetching form content:", error);
      });
  }, [path]);

  return (
    <div>
      {formContent ? (
        <div dangerouslySetInnerHTML={{ __html: formContent }}></div>
      ) : (
        <p>Loading form...</p>
      )}
    </div>
  );
}

export default BackendForm;
