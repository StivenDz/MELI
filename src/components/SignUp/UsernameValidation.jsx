import React from 'react';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppContext from '@context/AppContext';

const UsernameValidation = ({ props }) => {
    const {current} = React.useContext(AppContext);
    const navigate = useNavigate();
    const validationUsername = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+(?: [a-zA-ZáéíóúÁÉÍÓÚñÑ ]+)*$/;
    const [errInput1, setErrInput1] = React.useState(null);
    const [errInput2, setErrInput2] = React.useState(null);

    const handleInput = (e) => {
        let name = document.getElementById("name").value;
        let lastname = document.getElementById("lastname").value;
        
        if(name.length >= 3 && lastname.length >= 3){
            if (!validationUsername.test(name)) {
                setErrInput1(true);
            } else {
                setErrInput1(false);
            }
    
            if (!validationUsername.test(lastname)) {
                setErrInput2(true);
            } else {
                setErrInput2(false);
            }
        }
    }
    const usernameValidated = () =>{
        current("phone");
        navigate("/signup");
    }

    !props.validated &&
        React.useEffect(() => {
                (errInput1 === false && errInput2 === false) ? document.getElementById('submitButton').removeAttribute("disabled") : document.getElementById('submitButton').setAttribute("disabled", "true")
        }, [errInput1,errInput2])
    return (
        <section className={props.validated ? "congratsUsername" : "contentUsername"}>
            {props.validated && <img src={props.image}/>}
            {!props.validated && <>
                <div className='title'>
                    <h1>{props.title}</h1>
                    <p>{props.text}</p>
                </div>
                <div className='inputData'>
                    <div>
                        <span className={errInput1 ? "invalidText" : "nameLabel"}>Nombre</span>
                        <input className={errInput1 ? "invalidInput" : "name"} type="text" name='name' id='name' required autoComplete='off' minLength={3} onInput={handleInput} />
                        {errInput1 && <p className='invalidText'><FontAwesomeIcon icon="fa-solid fa-circle-exclamation" /> Caracteres incorrectos</p>} 
                    </div>
                    <div>
                        <span className={errInput2 ? "invalidText" : "lastnameLabel"}>Apellido</span>
                        <input className={errInput2 ? "invalidInput" : "lastname"} type="text" name='lastname' id='lastname' required autoComplete='off' minLength={3} onInput={handleInput} />
                        {errInput2 && <p className='invalidText'><FontAwesomeIcon icon="fa-solid fa-circle-exclamation" /> Caracteres incorrectos</p>} 
                    </div>
                </div>
                <div className="buttonContainer">
                    <button disabled id='submitButton' type="submit">{props.buttonText}</button>
                </div>
            </>}
            {props.validated && <>
                <h1>Nombre completado</h1>
                <p>{props.name} {props.lastname} <FontAwesomeIcon icon="fa-solid fa-circle-check" /></p>
                <button type='button' onClick={usernameValidated}>{props.buttonText}</button>
            </>}
        </section>
    );
}

export default UsernameValidation;