import { useState } from "react";
import Calendar from "../../Calendar/Calendar";
import RadioColorCard from "../../RadioButtons/RadioColorCard";
import css from "./EditCardModal.module.css";
import ButtonAdd from "../../ButtonAdd/ButtonAdd";

const EditCardModal = () => {
  const [formData, setFormData] = useState({
    titleEdit: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className={css.modalContainer}>
        <p className={css.textNameModal}>Edit card</p>

        <form className={css.form} onSubmit={handleSubmit}>
          <input
            className={css.inputEdit}
            required
            name="titleEdit"
            type="text"
            placeholder="Title"
            value={formData.titleEdit}
            onChange={handleChange}
          />
          <textarea
            className={css.textAreaDescription}
            required
            name="description"
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
          <div className={css.labelDiv}>
            <p className={css.textLabel}>Label color</p>
            <RadioColorCard />
          </div>
          <div className={css.deadlineDiv}>
            <p className={css.textDeadline}>Deadline</p>
            <Calendar />
          </div>
          {/* <button className={css.buttonEdit} type="submit">
            Send
          </button> */}
          <ButtonAdd
            onSubmit={handleSubmit}
            className={css.buttonEdit}
            title="Edit"
            type="submit"
          />
        </form>
      </div>
    </>
  );
};

export default EditCardModal;
