import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";
import InputBox from "./InputBox";
import { addComment } from "../api";

const Container = styled.div`
  position: relative;
  &::before {
    content: "";
    background-color: ${({ rootComment }) =>
      rootComment ? "rgb(170, 170, 170)" : "transparent"};
    position: absolute;
    min-height: 100%;
    width: 1px;
    left: -10px;
  }
  margin-left: ${({ rootComment }) => (rootComment ? "3rem" : "0")};
`;

const Comments = ({
  newComment,
  editorMode,
  commentId = "",
  videoId = "",
  commentParams = ""
}) => {
  const { currentUser } = useSelector(state => state.user);
  const [comments, setComments] = useState(Array.from(new Array(0)));
  useEffect(() => {
    if (newComment) setComments(prev => [newComment, ...prev]);
  }, [newComment]);

  useEffect(() => {
    (async () => {
      try {
        setComments(null);
        const res = await axios.get(
          `/comments?commentId=${commentId}&videoId=${videoId}&${commentParams}`,
          {
            withCredentials: true
          }
        );
        setComments(res);
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, [commentId, videoId, commentParams]);
  return (
    <Container
      rootComment={!!commentId}
      style={{
        padding: editorMode ? "8px" : 0
      }}
    >
      {commentId || editorMode ? null : (
        <InputBox
          style={
            !commentId
              ? {
                  margin: "0",
                  marginBottom: "24px"
                }
              : undefined
          }
          channel={currentUser}
          handleAction={async (reason, data) => {
            switch (reason) {
              case "no-login":
                return console.log("pleas login...");
              default:
                const comment = await addComment({
                  commentId,
                  text: data,
                  videoId
                });
                setComments([comment, ...comments]);
                break;
            }
          }}
        />
      )}

      {comments ? (
        comments.length ? (
          comments.map((comment = { from: {} }) => (
            <Comment
              key={comment.id}
              comment={comment}
              videoId={videoId}
              currentChannel={currentUser.id}
              editorMode={editorMode}
              handleAction={(reason, data) => {
                switch (reason) {
                  case "delete":
                    setComments(comments.filter(({ id }) => id !== data));
                    return comments.length - 1 === 0;
                  default:
                    setComments(
                      comments.map(comment =>
                        comment.id === data.id ? data : comment
                      )
                    );
                    break;
                }
              }}
            />
          ))
        ) : (
          <div>No comment</div>
        )
      ) : (
        <div>loading... </div>
      )}
    </Container>
  );
};

export default Comments;
