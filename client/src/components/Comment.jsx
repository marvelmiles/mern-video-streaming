import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { format } from "timeago.js";
import { Button, Stack, Avatar, IconButton } from "./styled";
import InputBox from "./InputBox";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Comments from "./Comments";
import { addComment } from "../api";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  word-break: break-word;
`;

const Content = styled.span`
  ${({ theme: { palette } }) => css`
    font-weight: 500;
    color: ${palette.text};
    & > div > span {
      font-size: 12px;
      font-weight: 400;
      color: ${palette.textSoft};
      margin-left: 5px;
    }
    & > p {
      margin: 8px 0;
    }
  `}
`;

const Comment = ({
  comment,
  videoId,
  currentChannel,
  handleAction,
  ...props
}) => {
  const [inputBox, setInputBox] = useState(null);
  const [showReplies, setShowReplies] = useState(false);
  const [newComment, setNewComment] = useState(null);

  const request = async (update, path) => {
    try {
      await axios.put(
        `/comments/${comment.id}${path ? "/" + path : ""}`,
        update.text ? update : undefined
      );
      if (update) {
        handleAction("update-comment", {
          ...comment,
          ...update
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      <Container>
        <Avatar src={comment.from.imgUrl} />
        <div style={{ flex: 7 }}>
          <Card>
            <Content>
              <div>
                {comment.from.name}{" "}
                <span>
                  {format(comment.createdAt)}
                  {comment.edited ? " (edited)" : null}
                </span>
              </div>
              <p>{comment.text}</p>
            </Content>
            {comment.from.id === currentChannel || props.editorMode ? (
              <div>
                <IconButton
                  style={{ margin: "10px" }}
                  onClick={async () => {
                    try {
                      await axios.delete(`/comments/${comment.id}`);
                      handleAction("delete", comment.id) &&
                        setShowReplies(false);
                    } catch (err) {
                      console.log(err.message);
                    }
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                {comment.from.id === currentChannel ? (
                  <IconButton
                    onClick={() => setInputBox({ value: comment.text })}
                  >
                    <EditIcon />
                  </IconButton>
                ) : null}
              </div>
            ) : null}
          </Card>
          <div
            style={{
              marginBottom: "20px"
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                style={{
                  border: comment.isLikedBy
                    ? "1px solid red"
                    : "1px solid transparent",
                  marginRight: "16px"
                }}
                onClick={() =>
                  request(
                    comment.isLikedBy
                      ? {
                          likes: comment.likes - 1,
                          isLikedBy: false
                        }
                      : {
                          likes: comment.likes + 1,
                          disLikes: comment.disLikes
                            ? comment.disLikes - 1
                            : comment.disLikes,
                          isLikedBy: true,
                          isDisLikedBy: false
                        },
                    comment.isLikedBy ? "undo-like" : "like"
                  )
                }
              >
                <ThumbUpIcon />
              </IconButton>
              <IconButton
                style={{
                  border: comment.isDisLikedBy
                    ? "1px solid red"
                    : "1px solid transparent",
                  marginRight: "8px"
                }}
                onClick={() =>
                  request(
                    comment.isDisLikedBy
                      ? {
                          disLikes: comment.disLikes - 1,
                          isDisLikedBy: false
                        }
                      : {
                          disLikes: comment.disLikes + 1,
                          likes: comment.likes
                            ? comment.likes - 1
                            : comment.likes,
                          isDisLikedBy: true,
                          isLikedBy: false
                        },
                    comment.isDisLikedBy ? "undo-dislike" : "dislike"
                  )
                }
              >
                <ThumbDownIcon /> {comment.disLikes}
              </IconButton>
              <Button
                style={{ borderRadius: "24px" }}
                variant="bgHover"
                onClick={() => {
                  setInputBox({});
                }}
              >
                Reply
              </Button>
            </div>
            {inputBox ? (
              <InputBox
                value={inputBox.value}
                showActionArea
                variant="sm"
                onCancel={() => setInputBox(null)}
                handleAction={async (reason, data) => {
                  try {
                    setInputBox(null);
                    switch (reason) {
                      case "no-login":
                        return console.log("no login.....");
                      case "update-comment":
                        await request({
                          text: data
                        });
                        break;
                      default:
                        setNewComment(
                          await addComment({
                            videoId,
                            text: data + " commented on " + comment.id,
                            commentId: comment.id
                          })
                        );
                        setShowReplies(true);
                    }
                  } catch (err) {
                    console.log(err.message);
                  }
                }}
              />
            ) : null}

            <Button
              style={{ borderRadius: "24px", marginTop: "8px" }}
              onClick={() => setShowReplies(!showReplies)}
            >
              {showReplies ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}{" "}
              {comment.replies}
              reply
            </Button>
            {showReplies ? (
              <Comments
                videoId={comment.videoId}
                commentId={comment.id}
                newComment={newComment}
                {...props}
              />
            ) : null}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Comment;
