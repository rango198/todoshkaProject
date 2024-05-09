import css from "./WelcomePage.module.css";
import Welcome from "../../components/Welcome/Welcome";
import KanbanBoard from "../../components/newFolder/Board";

const WelcomePage = () => {
  return (
    <div className={css.container}>
      <h1 className={css.visually_hidden}>Welcome Page</h1>
      <Welcome />
      <KanbanBoard />
    </div>
  );
};

export default WelcomePage;
