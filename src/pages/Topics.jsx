import React, { useEffect, useContext } from "react";
import { ChatAlt2Icon, ChatIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import moment from "moment";
import { GlobalContext } from "./../context/Provider";
import { fetchPOstById } from "./../context/actions/post.action";
import Form from "./Form";

function Topics() {
  const { posts, postDispatch, loginState } = useContext(GlobalContext);

  const location = useLocation();
  const { id } = useParams();
  useEffect(() => {
    fetchPOstById(id)(postDispatch);
  }, [postDispatch, id]);

  return (
    <>
      <div className="breadcrumb pb-2 border-b">
        <Link to="/" className="mr-5 text-blue-500">
          Forums &gt; {location?.state?.data?.title}
        </Link>
      </div>
      <h1 className="font-bold text-2xl pt-2 pb-3">
        {location?.state?.data?.title}
      </h1>
      <div className="rounded-2xl border-blue-500 border-t-2 mb-5 p-5 drop-shadow-lg">
        {/* <p>
          This forum has 14 topics, 81 replies, and was last updated 6 days, 2
          hours ago by John Doe.
        </p> */}
      </div>
      <div className="list text-center">
        <ul className="list-inside">
          <li>
            <ul className="flex justify-between border-b">
              <li className="w-1/2 pl-12 text-left p-2">Topics</li>
              <li className="w-[10%] p-2">Voices</li>
              <li className="w-[10%] p-2">Posts</li>
              <li className="w-[20%] p-2">Last Post</li>
            </ul>
          </li>
          {posts.posts.length < 1 ? (
            <div className="text-center">
              <p className="text-blue-500">No topics yet</p>
            </div>
          ) : (
            posts.posts.map((post, index) => (
              <li className="py-3" key={index}>
                <ul className="flex justify-between items-center">
                  <li className="w-1/2 text-left flex items-center">
                    <span className="inline-flex left-0 p-3 bg-indigo-50 rounded-md mr-2">
                      <ChatIcon className="w-3 h-3 text-indigo-600" />
                    </span>
                    <div className="content">
                      <h2 className="text-lg font-medium pt-2 pb-2">
                        <Link
                          to={`/posts/${post.id}`}
                          state={{ data: post, oldData: location?.state?.data }}
                          className="text-blue-500"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-sm w-fit">
                        Started by <a href="#">@{post.username}</a>
                      </p>
                    </div>
                  </li>
                  <li className="w-[10%]">4</li>
                  <li className="w-[10%]">{post?.Comments?.length}</li>
                  <li className="w-[20%]">
                    <p>
                      <a href="#">@{post.username}</a>
                    </p>
                    <p>{moment(post.createdAt).fromNow()}</p>
                  </li>
                </ul>
              </li>
            ))
          )}
        </ul>
      </div>
      <Form loginState={loginState} title={"Topic"} TopicId={id} />
    </>
  );
}

export default Topics;
