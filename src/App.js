import React, { useState } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  Redirect
  // Router
} from "react-router-dom";
// import { createHashHistory } from "history";
import UserWrapper from "./module/users/users.js";
import PostsWapper from "./module/posts/posts.js";
import "./App.css";

function App() {
  const [url, setUrl] = useState(window.location.pathname);
  return (
    <BrowserRouter>
      <div style={{ display: "flex", height: "100%" }}>
        <div className="sidebar">
          <Link to="/">
            <div
              onClick={() => setUrl("")}
              className={
                !url || url === "" || url === "/"
                  ? "navItem navItemSelected"
                  : "navItem"
              }
            >
              Users
            </div>
          </Link>
          <Link to="/posts">
            <div
              onClick={() => setUrl("/posts")}
              className={
                url === "/posts" ? "navItem navItemSelected" : "navItem"
              }
            >
              Posts
            </div>
          </Link>
        </div>
        <div className="content">
          <Switch>
            <Route path="/" exact component={UserWrapper} />
            <Route path="/posts" exact component={PostsWapper} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
