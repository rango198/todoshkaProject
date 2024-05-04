import styles from "./need-help.module.css";

const NeedHelpModal = () => {
  return (
    <div className={styles.modalContainer}>
      <p className={styles.textNameModal}>Need help</p>
      <form className={styles.form}>
        <input
          className={styles.inputMail}
          type="email"
          placeholder="Email address "
        />
        <textarea
          className={styles.textAreaComment}
          type="text"
          placeholder="Comment"
        />
        <button className={styles.buttonSend} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default NeedHelpModal;
