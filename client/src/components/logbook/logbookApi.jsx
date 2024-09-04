import axios from "axios";

export function getLogbookDetails(documentId) {

    const config = {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    };
  
    return axios.get(`http://localhost:4000/api/v1/logbook/${documentId}`, config);
  }
    
  