import css from "./AddColumModal.module.css";
// import ButtonAdd from "../ButtonAdd/ButtonAdd";
// import ButtonClose from "../ButtonClose/ButtonClose";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { useState } from 'react';
import { setModalStatus } from "../../redux/slice/servicesSlice.js";
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import {addColumnThunk} from "../../redux/thunk/servicesThunk.js";
import Icon from "../Icon/Icon.jsx";




const AddColumnModal = () => {
    const dispatch = useDispatch();

    // const { boardId } = useParams();
    const { register, handleSubmit } = useForm();
    const [errorMessage, setErrorMessage] = useState(null);

    const onSubmit = async (data) => {
        try {
            const response = await dispatch(addColumnThunk(data));
            dispatch(setModalStatus(false));
            if (response.error) {
                setErrorMessage(response.payload);
            } else {
                toast.success(`Column created with title ${response}`);

            }
        } catch (error) {
            console.error(error);
            toast.error('Error adding column');
        }
    };


    // const handleChange = (e) => {
    //     setTitle(e.target.value);
    //     setErrorMessage('');
    // };

    return (
        <div className={css.modal}>
            {/*<ButtonClose onClick={onClose} />*/}
            <p className={css.title}>Add column</p>
            <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register('title')}
                    defaultValue="test"
                    className={css.input}
                    type="text"
                    placeholder="Title"
                />
                {errorMessage && <span className={css.error}>{errorMessage}</span>}
                <button className={css.submBtn} type="submit">
                   <span className={css.button_icon_bg}>
        <Icon id="plus" className={css.button_icon}/>
      </span>
                    <span className={css.button_title}>Add</span>
                </button>
                {errorMessage && (
                    <p>{errorMessage}</p>
                )}
            </form>
        </div>
    );
};

export default AddColumnModal;