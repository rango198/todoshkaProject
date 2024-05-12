import { useDispatch } from "react-redux";
import { setModalStatus } from "../../../redux/slice/servicesSlice";
import css from "./NeedHelp.module.css";
import { useState } from "react";
import { sendHelpThunk } from "../../../redux/thunk/authThunk";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(sendHelpThunk(formData));

      if (formData.comment.length <= 10) {
        toast.error("The message must be at least 10 characters long", {
          style: {
            backgroundColor: "var(--bg-theme)",
            border: "1px solid var(--bg-button-active)",
            borderRadius: "8px",
            color: "var(--color-font)",
            fontFamily: "PoppinsMedium",
          },
          icon: "👍",
        });
      } else {
        toast.success("Your message has been successfully sent.", {
          style: {
            backgroundColor: "var(--bg-theme)",
            border: "1px solid var(--bg-button-active)",
            borderRadius: "8px",
            color: "var(--color-font)",
            fontFamily: "PoppinsMedium",
          },
          progressStyle: {
            backgroundColor: "var(--bg-button-active)",
          },
        });
        dispatch(setModalStatus(false));
        setFormData({ email: "", comment: "" });
      }
    } catch (error) {
      toast.error("An error occurred. Try sending the message later", {
        style: {
          backgroundColor: "var(--bg-theme)",
          border: "1px solid var(--bg-button-active)",
          borderRadius: "8px",
          color: "var(--color-font)",
          fontFamily: "PoppinsMedium",
        },
      });
    }
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
