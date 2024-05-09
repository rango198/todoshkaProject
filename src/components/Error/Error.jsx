import { useLocation } from 'react-router-dom';
// import { useRef } from 'react';
import { Link } from 'react-router-dom';

import img from '../../assets/img/error/error.png'
import css from './Error.module.css'

const Error = () => {
    const location = useLocation()

    // const goBack = useRef(location?.state?.from ?? '/home');
    const goBack = location?.state?.from ?? '/home';

    return (
    <div className={css.wrapper}>
        <div >
            <h1 className={css.title}>Page Not Found</h1>
            <p className={css.text}><Link to={goBack}>Go to Home Page</Link></p>
        </div>
        <img src={img} alt="error page" />

     </div>
    )
}

export default Error;