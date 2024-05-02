import { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./AuthComponent.module.css";
import RegisterForm from "../RegisterForm/RegisterForm";
import LoginForm from "../LoginForm/LoginForm";

const AuthComponent = () => {
  const [activeTab, setActiveTab] = useState(0);
  const location = useLocation();

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  useEffect(() => {
    const { pathname } = location;
    if (pathname === "/auth/register") {
      setActiveTab(0);
    } else if (pathname === "/auth/login") {
      setActiveTab(1);
    }
  }, [location]);

  return (
    <div className={styles.authPageContainer}>
      <Tabs selectedIndex={activeTab} onSelect={handleTabChange}>
        <TabList>
          <Tab>
            <NavLink to="/auth/register">Registration</NavLink>
          </Tab>
          <Tab>
            <NavLink to="/auth/login">Log In</NavLink>
          </Tab>
        </TabList>

        <TabPanel>
          <RegisterForm />
        </TabPanel>

        <TabPanel>
          <LoginForm />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default AuthComponent;
