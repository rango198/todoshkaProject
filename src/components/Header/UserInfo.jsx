import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setModalContent,
  setModalStatus,
} from "../../redux/slice/servicesSlice";
import Modal from "../Modal/Modal";
import EditProfileForm from "../EditProfileForm/EditProfileForm";
import css from "./UserInfo.module.css";
import {
  selectUserAvatar,
  selectUserName,
} from "../../redux/selectors/selector";

const UserInfo = () => {
  const avatarURL = useSelector(selectUserAvatar);
  const userNameN = useSelector(selectUserName);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

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

  return (
    <div className={css.userInfoContainer}>
      <button
        className={css.button_user}
        onClick={openModal}
        aria-label="user-profile"
      >
        {userNameN}
        {avatarURL ? (
          <div className={css.img_box}>
            <img className={css.icon_user} src={avatarURL} alt="user-avatar" />
          </div>
        ) : (
          <div className={css.avatar}></div>
        )}
      </button>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <EditProfileForm />
      </Modal>
    </div>
  );
};
export default UserInfo;
