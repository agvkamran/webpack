import { useState } from "react";
import classes from "./app.module.scss";
import { Outlet, Link } from "react-router-dom";
import About from "@/pages/about/About";
import img_png from "@/assets/img_png.png";
import Img_svg from "@/assets/img_svg.svg";
import img_jpg from "@/assets/img_jpg.jpg";

export const App = () => {
  const [count, setCount] = useState<number>(0);
  const increment = () => setCount((prev) => prev + 1);
  return (
    <div>
      <div>
        <div>
          <img width={100} height={100} src={img_png} alt="img_png" />
          <img width={100} height={100} src={img_jpg} alt="img_jpg" />
          <Img_svg width={100} height={100} />
        </div>
        <Link to={"/about"}>About</Link>
        <Link to={"/shop"}>Shop</Link>
        <p className={classes.value}>{count}</p>
        <button className={classes.button} onClick={increment}>
          <span>+</span>
        </button>
      </div>
      <Outlet />
      <About />
    </div>
  );
};
