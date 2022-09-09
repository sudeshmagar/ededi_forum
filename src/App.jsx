import React, { useContext, useEffect } from "react";
import logo from "./assets/images/ededi_new.png";
import Forums from "./pages/Forums";
import Nav from "./components/nav";
import ProfileCard from "./components/profile_card";
import LoginCard from "./components/login_card";
import { GlobalContext } from "./context/Provider";
import { Link, useLocation } from "react-router-dom";
import "./App.css";
import { Outlet } from "react-router-dom";
import { fetchRecentTopics } from "./context/actions/topic.action";

function App() {
  const location = useLocation();
  const { pathname } = location;
  const { loginState, topicDispatch, topics } = useContext(GlobalContext);

  useEffect(() => {
    fetchRecentTopics()(topicDispatch);
  }, [topicDispatch]);
  // console.log(topics.recent);
  return (
    <>
      <section className="bg-white dark:bg-slate-700">
        <aside className="h-screen w-[22%] fixed top-0 left-0">
          <div className="top h-1/2 min-h-[400px] w-100 bg-slate-800 dark:bg-slate-600 relative">
            <div className="logo p-5 pt-20 flex justify-center">
              <img src={logo} alt="logo" className="w-32 mb-10" />
            </div>
            <div className="profile flex flex-col items-center w-2/3 h1/2 bg-white dark:bg-slate-800 absolute ml-auto mr-auto inset-x-0 -bottom-50 rounded-2xl p-5 drop-shadow-lg">
              {loginState.loggedIn ? (
                <ProfileCard loginState={loginState} />
              ) : (
                <LoginCard />
              )}
              {/* if logged in */}
              {/* <ProfileCard /> */}

              {/* if not logged in */}
              {/* <LoginCard /> */}
            </div>
          </div>

          <div className="bottom bg-slate-50 w-100 h-full pt-52 flex justify-center">
            <p className="mt-10 text-slate-300">New features comming soon</p>
          </div>
        </aside>

        <main className="w-[78%] h-auto ml-[22%]">
          <Nav userInfo={loginState} />
          <article className="content w-full h-100 mt-[71px] flex flex-row dark:text-slate-400">
            <section className=" h-full w-2/3 p-20 mt-5">
              {/* <Outlet/> */}
              {pathname == "/" ? <Forums /> : <Outlet />}
            </section>
            <section className="border-l flex flex-col items-center w-1/3 h-min-screen mt-5 relative">
              <div className="right-aside sticky top-24 w-[90%]">
                <div className="card bg-slate-100  rounded p-8 w-[90%] flex flex-col items-center pt-16">
                  <div className="card-body">
                    <h2 className="pb-5 font-semibold text-lg">
                      Recent Topics
                    </h2>
                    <ul>
                      {topics.recent.length < 1 ? (
                        <div className="text-center">
                          <p className="text-blue-500">No topics yet</p>
                        </div>
                      ) : (
                        topics.recent.map((topic, index) => (
                          <li className="pb-5" key={index}>
                            <Link
                              to={`/posts/${topic.id}`}
                              className="hover:text-indigo-500"
                            >
                              {topic.title}
                            </Link>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </div>
                <footer className="text-sm -mr-5">
                  <a href="#">Home</a>.<a href="#"> About</a>.
                  <a href="#"> FAQs</a>.<a href="#"> Contact Us</a>
                </footer>
              </div>
            </section>
          </article>
        </main>
      </section>
    </>
  );
}

export default App;
