import { useSelector } from "react-redux";
import { selectModalContent } from "../../redux/selectors/serviceSelector";
import NeedHelpModal from "../Sidebar/needHelp/NeedHelp";
import EditProfileForm from "../EditProfileForm/EditProfileForm";

import AddColumnModal from "../AddColumnModal/AddColumModal.jsx";

const ModalContent = () => {
  const modalContent = useSelector(selectModalContent);

  switch (modalContent.action) {
    case "add":
      return <div>Hello World</div>;

    case "help":
      return <NeedHelpModal />;

    case "editProfile":
      return <EditProfileForm />;

    case "addColum":
      return <AddColumnModal />;

    default:
      return null;
  }
};
export default ModalContent;
