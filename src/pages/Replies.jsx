import React, { useContext, useEffect, useState } from "react";
import { ThumbUpIcon, ThumbDownIcon } from "@heroicons/react/outline";
import avatar from "../assets/images/avatar.jpg";
import "../App.css";
import { Link, useParams, useLocation } from "react-router-dom";
import { GlobalContext } from "./../context/Provider";
import { fetchReplayById } from "./../context/actions/replay.action";
import Form from "./Form";

function Replies() {
  const { loginState, replies, replayDispatch } = useContext(GlobalContext);
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    fetchReplayById(id)(replayDispatch);
  }, [replayDispatch]);

  console.log(replies);

  return (
    <>
      <div className="breadcrumb pb-2 border-b">
        <Link to={`/`} className="mr-5 text-blue-500">
          Forums &gt; {location?.state?.data?.title}
        </Link>
      </div>
      <div className="rounded-2xl border-t-blue-500 border-b-slate-100 border-b border-t-2 mb-5 p-5 bg-white drop-shadow-sm mt-5">
        {/* <p>
          This forum has 14 topics, 81 replies, and was last updated 6 days, 2
          hours ago by John Doe.
        </p> */}
      </div>
      <div className="list text-center">
        <ul className="list-inside border-t">
          {replies.replies.length < 1 ? (
            <div className="text-center">
              <p className="text-blue-500">No topics yet</p>
            </div>
          ) : (
            replies.replies.map((reply, index) => (
              <li
                className="py-5 w-full border-b border-b-slate-100  flex justify-between align-middle"
                key={index}
              >
                <div className="items-start comment flex w-full">
                  <div className="avatar-details flex flex-col w-32">
                    <a href="#" title="View Profile" className="m-auto">
                      <img
                        src={avatar}
                        alt="Avatar"
                        className="rounded-full h-20"
                      />
                      <span>{reply.username}</span>
                    </a>
                    <div className="role text-xs font-light italic">
                      Participant
                    </div>
                  </div>
                  <div className="bg-slate-100 p-4 ml-7 rounded-lg w-full relative comment-dialog">
                    <p className="text-left">{reply.commentBody}</p>
                  </div>
                  <div className="flex flex-col items-center ml-2">
                    <ThumbUpIcon className="w-5 hover:cursor-pointer hover:text-blue-500" />
                    <span className="counter">{reply.Likes.length}</span>
                    <ThumbDownIcon className="w-5 hover:cursor-pointer hover:text-red-500" />
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
      <Form loginState={loginState} title={"Reply"} PostId={id} />
    </>
  );
}

export default Replies;
