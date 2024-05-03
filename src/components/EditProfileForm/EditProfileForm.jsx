// import styles from "./EditProfileForm.module.css";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";

// import sprite from "../../assets/svg/sprite.svg";
// import { useUserId } from "../../hooks/useUserId";
// import { useUserName } from "../../hooks/useUserName";

// // import { editProfile } from "redux/thunk/reduxThunk";

// import { EditProfileSchema } from "../../shemas/EditProfileSchema";
// import { useUserEmail } from "../../hooks/useUserEmail";

// //эту функцию нужно перенести в reduxThunk
// const editProfile = createAsyncThunk(
//   "auth/profile",
//   async (userData, thunkAPI) => {
//     try {
//       const { data } = await axiosPrivateFormData.put(
//         `/api/users/current/${userData.userId}`,
//         userData.formData
//       );
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.code);
//     }
//   }
// );

// const EditProfileForm = ({ userAvatar, onClose }) => {
//   const dispatch = useDispatch();
//   const [type, setType] = useState("password");
//   const userName = useUserName();
//   const userId = useUserId();
//   const userEmail = useUserEmail();
//   const [newAvatar, setNewAvatar] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     watch,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       name: userName,
//       email: userEmail,
//       password: "",
//     },
//     resolver: yupResolver(EditProfileSchema),
//     mode: "onChange",
//   });

//   const selectedFile = watch("avatar");

//   useEffect(() => {
//     if (selectedFile && selectedFile.length !== 0) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const filePath = reader.result;
//         setNewAvatar(filePath);
//       };
//       reader.readAsDataURL(new Blob([selectedFile[0]]));
//     }
//   }, [selectedFile, reset]);

//   const handleToggle = () => {
//     if (type === "password") {
//       setType("text");
//     } else {
//       setType("password");
//     }
//   };

//   const onSubmit = async (data) => {
//     const formData = new FormData();
//     formData.append("avatar", data.avatar[0]);
//     formData.append("name", data.name);
//     formData.append("email", data.email);
//     formData.append("password", data.password);

//     const userData = { userId, formData };
//     dispatch(editProfile(userData)).then(() => {
//       onClose();
//     });
//     reset();
//   };

//   return (
//     <div className={styles.profileContainer}>
//       <form className={styles.profileForm} onSubmit={handleSubmit(onSubmit)}>
//         <h2 className={styles.profileTitle}>Edit profile</h2>
//         <div className={styles.formData}>
//           <img
//             className={styles.profileImag}
//             src={newAvatar || userAvatar}
//             alt="user-avatar"
//           />
//           <label className={styles.profileLabelAvatar}>
//             <input type="file" {...register("avatar")} />
//             <svg width="10px" height="10px" stroke="black">
//               <use href={sprite + "#user"}></use>
//             </svg>
//           </label>
//           <label>
//             <input autoComplete="off" {...register("name")} />
//             <span className={styles.errorMessage}>{errors.name?.message}</span>
//           </label>
//           <label>
//             <input {...register("email")} />
//             <span className={styles.errorMessage}>{errors.email?.message}</span>
//           </label>

//           <label className={styles.labelPassword}>
//             <input
//               type={type}
//               placeholder="new password"
//               autoComplete="off"
//               {...register("password")}
//             />

//             <button type="button" onClick={handleToggle}>
//               <svgEye width="20px" height="20px">
//                 <use href={sprite + "#plus"}></use>
//               </svgEye>
//             </button>
//             <span className={styles.errorMessage}>
//               {errors.password?.message}
//             </span>
//           </label>
//         </div>
//         <button className={styles.profileButton} type="submit">
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };
// export default EditProfileForm;
