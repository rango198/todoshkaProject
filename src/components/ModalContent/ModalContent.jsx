import { useSelector } from "react-redux";
import { selectModalContent } from "../../redux/selectors/serviceSelector";
import NeedHelpModal from "../Sidebar/needHelp/NeedHelp";
import EditProfileForm from "../EditProfileForm/EditProfileForm";

import AddColumnModal from "../AddColumnModal/AddColumModal.jsx";
import EditCardModal from "../Card/EditCardModal/EditCardModal.jsx";
import AddCard from "../AddCard/addCard";
const ModalContent = () => {
  const modalContent = useSelector(selectModalContent);

  switch (modalContent.action) {
    case "addCard":
      return <AddCard />;

    case "addColumn":
      return <AddColumnModal />;

    case "help":
      return <NeedHelpModal />;

    case "editProfile":
      return <EditProfileForm />;

    case "addColum":
      return <AddColumnModal />;

    case "editCard":
      return <EditCardModal />;

    default:
      return null;
  }
};
export default ModalContent;
