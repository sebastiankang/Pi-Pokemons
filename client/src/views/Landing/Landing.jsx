import { Link } from "react-router-dom";
import style from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={style.landingcontainer}>
      <div className={style.content}>
        <button className={style.enterbutton}>
          <Link to={"/home"}>Enter</Link>
        </button>
      </div>
    </div>
  );
};

export default Landing;
