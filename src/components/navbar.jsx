import { ImSearch } from "react-icons/im";
import { Link } from "react-router-dom";
import Profile from "./profile";
import "./navbar.css";
// import "bootstrap/dist/css/bootstrap.min.css";
const Navbar = (props) => {
  const nav = [
    { title: "Home", link: "/home" },
    { title: "Genre", link: "/genre" },
    { title: "Contact us", link: "/Contact us" },
  ];
  return (
    <>
      <div className="nav">
        <div className="log">
          <span className="logo">G2</span>movies
        </div>
        <ul className="nav-ul">
          {nav.map((link) => (
            <li key={link.title}><Link to={link.link}>{link.title}</Link></li>
          ))}
        </ul>
        <div className="search-box">
          <button className="btn-search">
            <icon className="fas fa-search">
              <ImSearch />
            </icon>
          </button>
          <input
            type="text"
            class="input-search"
            placeholder="Search by title..."
          />
        </div>
        {Object.keys(props.user).length === 0 ? (
          <h4 onClick={props.onToggle} className="login-btn">
            Login
          </h4>
        ) : (
          <Profile user={props.user}/>
        )}
      </div>
    </>
  );
};

export default Navbar;
