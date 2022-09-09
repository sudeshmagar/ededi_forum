import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SignUp from "./pages/SignUp";
import "./index.css";
import { ToastContainer } from "material-react-toastify";
import { GlobalProvider } from "./context/Provider";
import Topics from "./pages/Topics";
import Replies from "./pages/Replies";

import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/topics/:id" element={<Topics />} />
            <Route path="/posts/:id" element={<Replies />} />
          </Route>
          <Route path="/register" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </GlobalProvider>
  </React.StrictMode>
);
