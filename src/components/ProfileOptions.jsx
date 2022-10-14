import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import profileImg from "@icons/ProfileAd.svg";
import { Link,useNavigate } from 'react-router-dom';
import AppContext from '@context/AppContext';


const ProfileOptions = ({name,showOrHide}) => {
    const {Logout} = React.useContext(AppContext);
    const [isHovering,setIsHoveing] = React.useState(false)
    const navigate = useNavigate();

    const handleLogout = (e) =>{
        e.preventDefault();
        Logout();
        navigate("/login");
    }
    return ( 
        <motion.aside 
            animate={{opacity: (showOrHide || isHovering) ? 1 : 0,pointerEvents : (showOrHide || isHovering) ? 'all' : 'none'}}
            className='profileOptions'
            onMouseOver={()=> setIsHoveing(true)}
            onMouseLeave={()=> setIsHoveing(false)}
            >
            <div>
                <figure>
                    <FontAwesomeIcon className="userIcon" icon="fa-regular fa-circle-user" />
                </figure>
                <div>
                    <h4>Hola, {name}</h4>
                    <p>
                        Nivel 1 - Mercado Pago 
                        <FontAwesomeIcon icon="fa-solid fa-angle-right" />
                    </p>
                    <img src={profileImg} alt="" />
                </div>
            </div>
            <div>
                <Link to={"#"}>Compras</Link>
                <Link to={"#"}>Preguntas</Link>
            </div>
            <div>
                <Link to={"#"}>Películas y series</Link>
            </div>
            <div>
                <Link to={"#"}>Mi perfil</Link>
            </div>
            <div>
                <Link to={"#"}>Vender</Link>
            </div>
            <div>
                <Link to={"#"} onClick={handleLogout}>Salir</Link>
            </div>
            <span className="bar"></span>

        </motion.aside>
     );
}
 
export default ProfileOptions;