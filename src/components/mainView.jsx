import { Routes, Route } from "react-router-dom";
import LeftSideMain from "./leftSideMain";
import MidMain from "./midMain.jsx";
import RightSideMain from "./rightSideMain";
import VideoServer from "./videoServer";
import Comments from "./comments";
import TrendingMovies from "./trendingMovies";
import Subscribe from "./subscribe";
import PrivateRoute from "./privateRoute";
import "./mainView.css";
import "./comments.css";
const MainView = (props) => {
  return (
    <>
      <div className="grid-main-view">
        <LeftSideMain />
        <Routes>
          <Route path="/" element={<TrendingMovies />} />
          <Route path="genre/:genre" element={<MidMain />} />
          {props.user.isSubscribed ? (
            <Route
              path="watch/:id"
              element={<VideoServer user={props.user} />}
            />
          ) : (
            <Route path="watch/:id" element={<PrivateRoute />} />
          )}
        </Routes>

        <RightSideMain />
      </div>
      <div className="bottom-main-view">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Subscribe user={props.user} />
              </div>
            }
          />
          <Route
            path="watch/:id"
            element={<Comments user={props.user} Movies={props.Movies} />}
          />
        </Routes>
      </div>
    </>
  );
};

export default MainView;
