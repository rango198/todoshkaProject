import { useEffect, useState } from "react";
import { useTheme, useUserAvatar, useUserName } from "../../hooks";
import { useDispatch } from "react-redux";
import {
  setModalContent,
  setModalStatus,
} from "../../redux/slice/servicesSlice";
import Modal from "../Modal/Modal";
import EditProfileForm from "../EditProfileForm/EditProfileForm";

const UserInfo = () => {
  const darkAvatar = "../../assets/img/userAvatar/user-dark.png";
  const ligthAvatar = "../../assets/img/userAvatar/user-light.png";
  const violetAvatar = "../../assets/img/userAvatar/user-violet.png";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userAvatar, setUserAvatar] = useState(darkAvatar);
  const dispatch = useDispatch();
  const userName = useUserName();
  const userAvatarGet = useUserAvatar();
  const theme = useTheme();

  const openModal = () => {
    const handleClick = () => {
      dispatch(
        setModalContent({
          action: "editProfile",
        })
      );
      dispatch(setModalStatus(true));
    };
    handleClick();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const userAvatarDefaultTheme = (theme) => {
    let defaultAvatar;

    switch (theme) {
      case "dark":
        defaultAvatar = darkAvatar;
        break;
      case "light":
        defaultAvatar = ligthAvatar;
        break;
      case "violet":
        defaultAvatar = violetAvatar;
        break;
      default:
        defaultAvatar = darkAvatar;
    }
    return defaultAvatar;
  };

  useEffect(() => {
    const avatar = userAvatarDefaultTheme(theme);

    if (userAvatarGet === "../../assets/img/userAvatar/user2x-min.png") {
      return setUserAvatar(avatar);
    } else {
      return setUserAvatar(userAvatarGet);
    }
  }, [theme, userAvatarGet]);

  return (
    <div>
      <p>{userName}</p>
      <button onClick={openModal}>
        <img src={userAvatar} alt="user-avatar" />
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <EditProfileForm userAvatar={userAvatar} onClose={closeModal} />
      </Modal>
    </div>
  );
};
export default UserInfo;
