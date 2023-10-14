import "./left_side_main.css";
import { Link } from "react-router-dom";
import {AiFillHome,AiFillStar,AiFillClockCircle} from 'react-icons/ai'
import {GiPistolGun,GiCompass,GiLovers,GiDramaMasks,GiSolarSystem} from 'react-icons/gi'
import {FaGhost,FaLaugh} from 'react-icons/fa'
const LeftSideMain = () => {
  const menu = [
    { title: "Home", link: "home" ,icon:<AiFillHome/>},
    { title: "Top Rated", link: "movies/toprated" ,icon:<AiFillStar/>},
    { title: "Recent", link: "movies/recent" ,icon:<AiFillClockCircle/>},
  ];
  const genre = [
    { title: "Action", link: "genre/action" ,icon:<GiPistolGun/>},
    { title: "Comedy", link: "genre/comedy" ,icon:<FaLaugh/>},
    { title: "Adventure", link: "genre/adventure" ,icon:<GiCompass/>},
    { title: "Horror", link: "genre/horror" ,icon:<FaGhost/>},
    { title: "Romance", link: "genre/romance" ,icon:<GiLovers/>},
    { title: "Drama", link: "genre/drama" ,icon:<GiDramaMasks/>},
    { title: "Sc-Fi", link: "genre/scfi" ,icon:<GiSolarSystem/>},
  ];
  return (
    <div className="left-side-main">
      <div className="menu">
        <span>Menu</span>
        <ul>
          {menu.map((link) => (
            <li className="left-side-list" key={link.title}>{link.icon} {link.title}</li>
          ))}
        </ul>
      </div>
      <div className="genre">
        <span>Genres</span>
        <ul>
          {genre.map((link) => (<li className="left-side-list" key={link.title}>
            <Link to={link.link}>
            {link.icon} {link.title}
            </Link></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeftSideMain;
