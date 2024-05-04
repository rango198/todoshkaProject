import css from "./welcome_page.module.css";
import Welcome from "../../components/Welcome/Welcome";

const WelcomePage = () => {
    return (
        <div className={css.container}>
            <h1 className={css.visually_hidden}>
                Welcome Page
            </h1>
            <Welcome />
        </div>
    );
};

export default WelcomePage;
