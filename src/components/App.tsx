import { useState } from "react";
import classes from "./app.module.scss";
import { Outlet, Link } from "react-router-dom";
import About from "@/pages/about/About";

export const App = () => {
  const [count, setCount] = useState<number>(0);
  const increment = () => setCount((prev) => prev + 1);
  return (
    <div>
      <div>
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
