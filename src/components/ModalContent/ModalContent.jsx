import { useSelector } from "react-redux";
import { selectModalContent } from "../../redux/selectors/serviceSelector";

const ModalContent = () => {
  const modalContent = useSelector(selectModalContent);

  switch (modalContent.action) {
    case "add":
      return <div>Hello World</div>;

    case "userbar":
      return <div>UserBar</div>;

    default:
      return null;
  }
};
export default ModalContent;
