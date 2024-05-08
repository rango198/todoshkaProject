// import css from "./NeedHelp.module.css";

// const NeedHelpModal = () => {
//   return (
//     <div className={css.modalContainer}>
//       <p className={css.textNameModal}>Need help</p>
//       <form className={css.form}>
//         <input
//           className={css.inputMail}
//           required
//           name="email"
//           type="email"
//           placeholder="Email address "
//         />
//         <textarea
//           className={css.textAreaComment}
//           required
//           name="comment"
//           type="text"
//           placeholder="Comment"
//         />
//         <button className={css.buttonSend} type="submit">
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default NeedHelpModal;

import { useDispatch } from "react-redux";
import { setModalStatus } from "../../../redux/slice/servicesSlice";
import css from "./NeedHelp.module.css";
import { useState } from "react";
import { sendHelpThunk } from "../../../redux/thunk/authThunk";

const NeedHelpModal = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    comment: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendHelpThunk(formData));

    console.log(formData);

    setFormData({
      email: "",
      comment: "",
    });

    dispatch(setModalStatus(false));
  };

  return (
    <>
      <div className={css.modalContainer}>
        <p className={css.textNameModal}>Need help</p>

        <form className={css.form} onSubmit={handleSubmit}>
          <input
            className={css.inputMail}
            required
            name="email"
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleInputChange}
          />
          <textarea
            className={css.textAreaComment}
            required
            name="comment"
            type="text"
            placeholder="Comment"
            value={formData.comment}
            onChange={handleInputChange}
          />
          <button className={css.buttonSend} type="submit">
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default NeedHelpModal;
