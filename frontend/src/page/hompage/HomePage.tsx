import { Outlet } from "react-router-dom";
import HomeNavigation from "../../components/navigation/HomeNavigation";
import classes from "./HomePage.module.css";

function HomePage() {
  return (
      <div className={classes.container}>
        <HomeNavigation />
        <Outlet />
      </div>
  );
}

export default HomePage;
