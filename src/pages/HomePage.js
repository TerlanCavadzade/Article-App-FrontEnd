import { useEffect } from "react";
import StartingPageContent from "../components/StartingPage/StartingPageContent";
import { titleChangeHandler } from "../utilities/titleChange";

const HomePage = () => {
  useEffect(() => {
    titleChangeHandler("Home Page - Name");
  }, []);
  return <StartingPageContent />;
};

export default HomePage;
