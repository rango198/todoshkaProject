import ButtonAdd from '../ButtonAdd/ButtonAdd';
import ButtonClose from '../ButtonClose/ButtonClose';

import css from './EditColumn.module.css';

const EditColumn = ({ onClose }) => {


  return (
    <div className={css.wrapper}>
      <ButtonClose onClick={onClose} />
      <h3 className={css.title}>Edit column</h3>
      <form>
        <input className={css.input}
          name="title"
          type="text"
          placeholder="Title"
        />
        <ButtonAdd className={css.buttonSbt} type="submit" title='Add' />
      </form>
    </div>
  );
}

export default EditColumn;
