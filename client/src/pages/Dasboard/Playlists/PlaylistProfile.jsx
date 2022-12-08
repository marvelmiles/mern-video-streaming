import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { useParams } from "react-router-dom";
import axios from "../../../api/axios";
import PlaylistToolbox from "../../../components/PlaylistToolbox";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlaylistSuccess } from "../../../redux/playlistSlice";
import styled from "styled-components";
import Card from "../../../components/Card";
import SortIcon from "@mui/icons-material/Sort";
import { Button, Stack, CardLayout } from "../../../components/styled";

const PlaylistProfile = ({ editorMode }) => {
  const { currentPlaylist } = useSelector(state => state.playlist);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        console.log(
          await axios.get(`/playlists/${id}`, {
            withCredentials: true
          })
        );
        dispatch(
          fetchPlaylistSuccess(
            await axios.get(`/playlists/${id}`, {
              withCredentials: true
            })
          )
        );
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, [dispatch, id]);

  if (!currentPlaylist) return <div>loading...</div>;

  return (
    <Layout>
      <CardLayout
        style={{
          maxWidth: "1200px",
          marginInline: "auto",
          alignItems: "flex-start"
        }}
        $gridCol={{
          xs: 1,
          xl: 2
        }}
      >
        <PlaylistToolbox playlist={currentPlaylist} editorMode={editorMode} />
        <div style={{ paddingBottom: "24px", flex: 1 }}>
          <div
            style={{
              padding: "16px",
              position: "sticky",
              top: "64px",
              left: 0,
              backgroundColor: "#fff",
              width: "100%",
              height: "100%",
              zIndex: 1
            }}
          >
            <Button>
              <SortIcon />
              Sort
            </Button>
          </div>
          {Array.from(new Array(50)).map((v = {}) => (
            <Card
              key={v.id}
              variant="list"
              video={v}
              style={{
                flex: 1,
                padding: "0 8px"
              }}
              handleAction={() => {}}
            />
          ))}
        </div>
      </CardLayout>
    </Layout>
  );
};

export default PlaylistProfile;
