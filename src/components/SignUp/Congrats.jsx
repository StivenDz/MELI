import React from 'react';
import congratsIcon from '@icons/congratsIcon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router';

const Congrats = ({name}) => {
    const navigate = useNavigate();
    return ( 
        <section className='congratsContainer'>
            <div>
                <img src={congratsIcon} alt="" />
                <FontAwesomeIcon icon="fa-solid fa-circle-check" />
            </div>
            <h1>{name}, ya puedes usar tu cuenta</h1>
            <section>
                <div>
                    <FontAwesomeIcon icon="fa-solid fa-envelope" />

                </div>
                <p>Podrás iniciar sesión ingresando tu número e-mail y tu contraseña.</p>
            </section>
            <section>
                <div>
                    <FontAwesomeIcon icon="fa-regular fa-user" />
                </div>
                <p>Si necesitas cambiar tus datos, hazlo desde Mis Datos.</p>
            </section>
            <button type='button' onClick={()=> navigate('/')}>Ir al inicio</button>
        </section>
    );
}
 
export default Congrats;