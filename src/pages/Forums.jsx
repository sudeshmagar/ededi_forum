import React, { useEffect, useContext } from "react";
import { ChatAlt2Icon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { GlobalContext } from "./../context/Provider";
import { fetchTopics } from "./../context/actions/topic.action";
import moment from "moment";
import Form from "./Form";
function Forums() {
  const { topics, topicDispatch, loginState } = useContext(GlobalContext);
  useEffect(() => {
    fetchTopics()(topicDispatch);
  }, [topicDispatch]);
  // console.log(topics);
  return (
    <>
      <div className="breadcrumb pb-2 border-b">
        <a href="#" className="mr-5 text-blue-500">
          All Forums
        </a>
      </div>
      <div className="list text-center">
        <ul className="list-inside">
          <li>
            <ul className="flex justify-between border-b">
              <li className="w-1/2 pl-12 text-left p-2">Forum</li>
              <li className="w-[10%] p-2">Topics</li>
              <li className="w-[10%] p-2">Posts</li>
              <li className="w-[20%] p-2">Last Post</li>
            </ul>
          </li>
          {topics.topics.map((topic, index) => (
            <li className="py-3" key={topic.id}>
              <ul className="flex justify-between items-center">
                <li className="w-1/2 text-left flex items-center">
                  <span className="inline-flex left-0 p-3 bg-indigo-50 rounded-md mr-2">
                    <ChatAlt2Icon className="w-3 h-3 text-indigo-600" />
                  </span>
                  <div className="content">
                    <h2 className="text-lg font-medium pt-2 pb-2">
                      <Link
                        to={`/topics/${topic.id}`}
                        state={{ data: topic }}
                        className="text-blue-500"
                      >
                        {topic.title}
                      </Link>
                    </h2>
                    <p className="text-sm w-fit">{topic.topicText}</p>
                  </div>
                </li>
                <li className="w-[10%]">{topic?.Posts?.length}</li>
                <li className="w-[10%]">
                  {topic.Posts ? topic?.Posts[index]?.Comments?.length : "0"}
                </li>
                <li className="w-[20%]">{moment(topic.createdAt).fromNow()}</li>
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {/* Create Forum

      <div className="comment-box">
        <div className="rounded-2xl border-t-blue-500 border-b-slate-100 border-b border-t-2 mb-5 p-5 bg-white drop-shadow-sm mt-5">
          <p>You must be logged in to create Forum Title.</p>
        </div>

        <form className="flex flex-col">
          <label htmlFor="forum-title">Forum Title</label>
          <input type="text" id="forum-title" name="forum-title" placeholder="Input forum title" className="rounded-2xl mb-5 px-4 py-2 border border-slate-300" />
          <label htmlFor="forum-description">Forum Description</label>
          <textarea className="px-4 py-2 border border-slate-300 rounded-2xl h-40 mb-5"></textarea>
          <button
          type="submit"
          className="mb-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px4 py-2 rounded-full border-none">
          Create
        </button>
        </form>

      </div> */}
      <Form loginState={loginState} title={"Forum"} />
    </>
  );
}

export default Forums;
