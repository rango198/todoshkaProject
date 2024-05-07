import { useSelector } from "react-redux";
import { selectModalContent } from "../../redux/selectors/serviceSelector";
import NeedHelpModal from "../Sidebar/needHelp/NeedHelp";

const ModalContent = () => {
  const modalContent = useSelector(selectModalContent);

  switch (modalContent.action) {
    case "add":
      return <div>Hello World</div>;

    case "userbar":
      return <div>UserBar</div>;

    case "help":
      return <NeedHelpModal />;
    case "userInfo":
      return <UserInfo />;

    default:
      return null;
  }
};
export default ModalContent;
