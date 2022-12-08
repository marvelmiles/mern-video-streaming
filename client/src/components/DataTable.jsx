import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "styled-components";
import { useState, useEffect } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import axios from "../api/axios";
import { Popover } from "@mui/material";
export const VideoList = ({ columns = [], url, actionBar }) => {
  const [videos, setVideos] = useState([]);
  const {
    palette: { divider, text }
  } = useTheme();

  useEffect(() => {
    (async () => {
      try {
        const d = await axios.get(url, {
          withCredentials: true
        });
        console.log(d, " table list...");
        setVideos(d);
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, [url]);

  return (
    <>
      {actionBar ? (
        <div
          style={{
            padding: "16px 8px",
            border: `1px solid ${divider}`
          }}
        >
          {actionBar}
        </div>
      ) : null}
      <div
        style={{
          height: "450px"
        }}
      >
        <DataGrid
          // loading={true}
          rowSpacingType="border"
          showCellRightBorder
          showColumnRightBorder
          checkboxSelection
          rows={videos}
          columns={columns}
          autoPageSize
          rowHeight={150}
        />
      </div>
    </>
  );
};
