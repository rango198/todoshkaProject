import css from "./EditProfileForm.module.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Icon from "../Icon/Icon";
import sprite from "../../assets/svg/sprite.svg";
import { useUserId, useUserName } from "../../hooks";

// import { editProfile } from "../../redux/thunk/reduxThunk";
import { updateUserThunk } from "../../redux/thunk/authThunk";
import { UserSchema } from "../../schema/UserSchema";
import { useUserEmail } from "../../hooks/useUserEmail";

const EditProfileForm = ({ userAvatar, onClose }) => {
  const dispatch = useDispatch();

  const [type, setType] = useState("password");
  const userName = useUserName();
  const userId = useUserId();
  const userEmail = useUserEmail();
  const [newAvatar, setNewAvatar] = useState(null);
  const [svg, setSvg] = useState("eye");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userName,
      email: userEmail,
      password: "",
    },
    resolver: yupResolver(UserSchema),
    mode: "onChange",
  });

  const selectedFile = watch("avatar");

  useEffect(() => {
    if (selectedFile && selectedFile.length !== 0) {
      const reader = new FileReader();
      reader.onload = () => {
        const filePath = reader.result;
        setNewAvatar(filePath);
      };
      reader.readAsDataURL(new Blob([selectedFile[0]]));
    }
  }, [selectedFile, reset]);

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
      setSvg(" ");
    } else {
      setType("password");
      setSvg("eye");
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("avatar", data.avatar[0]);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);

    const userData = { userId, formData };
    dispatch(updateUserThunk(userData)).then(() => {
      onClose();
    });
    reset();
  };

  // const handleClose = () => {
  //   console.log(typeof onClose);
  //   onClose();
  // };

  return (
    <div className={css.modalContainer}>
      {/* <button onClick={handleClose} className={css.closeModal}>
        <Icon id="close" className={css.closeSvg} />
      </button> */}
      <h2 className={css.textNameModal}>Edit profile</h2>
      <form className={css.formUser} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.formData}>
          <div className={css.imgContainer}>
            <img
              width="68px"
              height="68px"
              className={css.profileImag}
              src={newAvatar || userAvatar}
              alt="user-avatar"
            />

            <label className={css.labelAvatar}>
              <input
                className={css.inputAvatar}
                type="file"
                {...register("avatar")}
              />
              <svg
                className={css.svgPlus}
                width="10px"
                height="10px"
                stroke="black"
              >
                <use href={sprite + "#plus"}></use>
              </svg>
            </label>
          </div>
          <input
            className={css.inputMail}
            autoComplete="off"
            {...register("name")}
          />
          <span className={css.errorMessage}>{errors.name?.message}</span>

          <input className={css.inputMail} {...register("email")} />
          <span className={css.errorMessage}>{errors.email?.message}</span>

          <div className={css.inputEye}>
            <input
              className={css.inputPassword}
              type={type}
              autoComplete="off"
              {...register("password")}
            />
            <div onClick={handleToggle}>
              <Icon id="eye" src={svg} className={css.svgIcon} />
            </div>
            <span className={css.errorMessage}>{errors.password?.message}</span>
          </div>
        </div>
        <button className={css.buttonSend} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};
export default EditProfileForm;
