import React, { useEffect, useState } from "react";
import axios from "../api/axios";
export default function Library() {
  const [library, setLibrary] = useState({});
  useEffect(() => {
    (async () => {
      try {
        console.log((await axios.get("/channels/library")).data);
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, []);
  return <div></div>;
}
