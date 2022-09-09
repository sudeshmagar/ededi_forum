import React, { useState, useContext } from "react";
import { GlobalContext } from "./../context/Provider";
import { createForum } from "./../context/actions/topic.action";
import { createReplay } from "./../context/actions/replay.action";
import { createTopic } from "./../context/actions/post.action";

function Form(Props) {
  const { topicDispatch, postDispatch, replayDispatch } =
    useContext(GlobalContext);

  const [title, setTitle] = useState("");
  const [topicText, setTopicText] = useState("");

  const onSubmit = async () => {
    if (Props.title == "Forum") {
      createForum({ title, topicText })(topicDispatch);
      setTopicText("");
      setTitle("");
    }
    if (Props.title == "Topic") {
      const postText = topicText;
      createTopic({ title, postText, TopicId: Props.TopicId })(postDispatch);
      setTopicText("");
      setTitle("");
    }
    if (Props.title == "Reply") {
      const commentBody = topicText;
      createReplay({ commentBody, PostId: Props.PostId })(replayDispatch);
      setTopicText("");
      setTitle("");
    }
  };
  // console.log(Props);
  //////////////////////////////////////////////////

  return (
    <>
      <div className="comment-box">
        {!Props.loginState.loggedIn ? (
          <div className="rounded-2xl border-t-blue-500 border-b-slate-100 border-b border-t-2 mb-5 p-5 bg-white drop-shadow-sm mt-5">
            <p>You must be logged in to create Forum Title.</p>
          </div>
        ) : (
          <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
            {Props.title == "Reply" ? (
              ""
            ) : (
              <>
                <label htmlFor="forum-title">{Props.title} Title</label>
                <input
                  type="text"
                  id="forum-title"
                  name="forum-title"
                  placeholder="Input forum title"
                  className="rounded-2xl mb-5 px-4 py-2 border border-slate-300"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </>
            )}

            <label htmlFor="forum-description">{Props.title} Description</label>
            <textarea
              className="px-4 py-2 border border-slate-300 rounded-2xl h-40 mb-5"
              value={topicText}
              onChange={(e) => setTopicText(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="mb-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px4 py-2 rounded-full border-none"
              onClick={onSubmit}
            >
              Create
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default Form;
