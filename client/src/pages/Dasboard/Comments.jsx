import React, { useState, useEffect } from "react";
import { VideoList } from "../../components/DataTable";
import Select from "../../components/Select";
import { Stack, Ul, Title } from "../../components/styled";
import SortIcon from "@mui/icons-material/Sort";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import axios from "../../api/axios";
import CommentsJSX from "../../components/Comments";
import Popover from "@mui/material/Popover";
import { useSearchParams } from "react-router-dom";
const Comments = () => {
  const {
    currentUser: { id }
  } = useSelector(state => state.user);
  const [searchParams, setSearchParams] = useSearchParams();
  const [commentParams, setCommentParams] = useState(`channelId=${id}`);
  const [openPopover, setOpenPopover] = useState(false);
  const closePopover = () => setOpenPopover(false);
  return (
    <Layout rootPath="dashboard" showVideoPreview>
      <Title style={{ padding: "16px" }}>Video Comments</Title>
      <Stack
        $borderLine
        $justify="normal"
        style={{
          padding: "16px 8px",
          borderRight: "none",
          borderLeft: "none"
        }}
      >
        <SortIcon onClick={() => setOpenPopover(true)} />
        <Select
          url={`/channels/videos/?channelId=${id}&select=title`}
          selectKey="title"
          onSelect={item => {
            setSearchParams({
              v: item === "all" ? "" : item.id
            });
          }}
        />
      </Stack>
      <CommentsJSX
        editorMode
        videoId={searchParams.get("v")}
        commentParams={commentParams}
      />
      <Popover open={openPopover} onClose={closePopover}>
        <Ul>
          {[
            {
              label: "Top comments",
              key: "top"
            },
            {
              label: "New comments",
              key: "new"
            }
          ].map(c => (
            <li
              key={c.key}
              onClick={() => {
                setCommentParams(`channelId=${id}&sortBy=${c.key}`);
                closePopover();
              }}
            >
              {c.label}
            </li>
          ))}
        </Ul>
      </Popover>
    </Layout>
  );
};

export default Comments;
