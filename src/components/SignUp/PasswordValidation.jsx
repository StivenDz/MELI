import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {hasSecuence} from "@hooks/useValidateSecuence";
import {useNavigate } from 'react-router-dom';
import AppContext from '@context/AppContext';

const PasswordValidation = ({props}) => {
    const {errorInSignUp,allValidated} = React.useContext(AppContext);
    const navigate = useNavigate();
    // v1:"Mínimo 8 caracteres con letras y números.",
    // v2:"Mínimo 1 signo o símbolo como ?-!*$#.",
    // v3:"No incluyas tu nombre o apellido.",
    // v4:"Sin secuencias como 1234 o ABCD.",
    // v5:"Sin caracteres repetidos consecutivos como aa.",
    // v6:"Sin tu e-mail, ni “mercadolibre” o “mercadopago”.",
    // v7:"No incluyas la fecha de hoy.",
    
    const currentDate = {
        day:new Date().getDate(),
        month:new Date().getMonth() + 1,
        year:new Date().getFullYear()
    }
    const [validations,setValidations] = React.useState({
        v1:false,
        v2:false,
        v3:true,
        v4:true,
        v5:true,
        v6:true,
        v7:true
    })
    const handleInput = (e) =>{
        let pass = e.target.value
        if(pass.length >= 8 && /[a-zA-Z]/.test(pass) && /\d/.test(pass)){
            !validations.v1 && setValidations({
                ...validations,
                v1:true
            })
        }else{
            validations.v1 && setValidations({
                ...validations,
                v1:false
            })
        }

        if(/\W/.test(pass)){
            !validations.v2 && setValidations({
                ...validations,
                v2:true
            })
        }else{
            validations.v2 && setValidations({
                ...validations,
                v2:false
            })
        }

        if((pass.toLowerCase()).includes((props.name).toLowerCase()) || (pass.toLowerCase()).includes((props.lastname).toLowerCase())){
            validations.v3 && setValidations({
                ...validations,
                v3:false
            })
        }else{
            !validations.v3 && setValidations({
                ...validations,
                v3:true
            })
        }
        if(hasSecuence(pass.toLowerCase())){
            validations.v4 && setValidations({
                ...validations,
                v4:false
            })
        }else{
            !validations.v4 && setValidations({
                ...validations,
                v4:true
            })
        }
        if(/(.)\1{2}/.test(pass.toLowerCase())){
            validations.v5 && setValidations({
                ...validations,
                v5:false
            })
        }else{
            !validations.v5 && setValidations({
                ...validations,
                v5:true
            })
        }

        if(
            (pass.toLowerCase()).includes(props.email)|| 
            ((pass.toLowerCase())).replaceAll(" ","").includes("mercadolibre") || 
            ((pass.toLowerCase())).replaceAll(" ","").includes("mercadopago")){
                validations.v6 && setValidations({
                    ...validations,
                    v6:false
                })
        }else{
            !validations.v6 && setValidations({
                ...validations,
                v6:true
            })
        }

        if(
            pass.includes(`${currentDate.day}${currentDate.month}`) || 
            pass.includes(`${currentDate.month}${currentDate.day}`) || 
            pass.includes(`${currentDate.year}`)){
                validations.v7 && setValidations({
                    ...validations,
                    v7:false
                })
        }else{
            !validations.v7 && setValidations({
                ...validations,
                v7:true
            })
        }
    }
    const validPassword = () =>{
        let values = Object.values(validations);
        for (let i = 0; i < values.length; i++) {
            if(!values[i]) return false
        }
        return true;
    }

    !props.validated &&
        React.useEffect(()=>{
            validPassword() ? document.getElementById("passBtn").removeAttribute("disabled") : document.getElementById("passBtn").setAttribute("disabled","true")
        },[validations])

    const handleError = () =>{
        props.error && errorInSignUp(false,"password")
    }

    const passwordValidated = () =>{
        allValidated(true);
        navigate("/signup/registered=true");
    }
    return ( 
        <section className={props.validated ? "congratsPassword" : "contentPassword"}>
            {!props.validated &&
            <>
                <h1>{props.title}</h1>
                <p>{props.text}</p>
                <section>
                    <span>{props.label1}</span>
                    <input onInput={handleInput} type="password" name="password" id="password" />
                </section>
                <div>
                    <span><FontAwesomeIcon className={validations.v1 ? "valid" : "emptyIcon"} icon={validations.v1 ? "fa-solid fa-circle-check" : "fa-solid fa-circle"}/> {props.v1}</span>
                    <span><FontAwesomeIcon className={validations.v2 ? "valid" : "emptyIcon"} icon={validations.v2 ? "fa-solid fa-circle-check" : "fa-solid fa-circle"} /> {props.v2}</span>
                    <span><FontAwesomeIcon className={validations.v3 ? "valid" : "emptyIcon"} icon={validations.v3 ? "fa-solid fa-circle-check" : "fa-solid fa-circle"} /> {props.v3}</span>
                    <span><FontAwesomeIcon className={validations.v4 ? "valid" : "emptyIcon"} icon={validations.v4 ? "fa-solid fa-circle-check" : "fa-solid fa-circle"} /> {props.v4}</span>
                    <span><FontAwesomeIcon className={validations.v5 ? "valid" : "emptyIcon"} icon={validations.v5 ? "fa-solid fa-circle-check" : "fa-solid fa-circle"} /> {props.v5}</span>
                    <span><FontAwesomeIcon className={validations.v6 ? "valid" : "emptyIcon"} icon={validations.v6 ? "fa-solid fa-circle-check" : "fa-solid fa-circle"} /> {props.v6}</span>
                    <span><FontAwesomeIcon className={validations.v7 ? "valid" : "emptyIcon"} icon={validations.v7 ? "fa-solid fa-circle-check" : "fa-solid fa-circle"} /> {props.v7}</span>
                </div>
                <section>
                    <span className={props.error ? "invalidLabel" : "labelForPassC"}>{props.label2}</span>
                    <input className={props.error ? "invalidInput" : "passwordConfirmation"} type="password" onClick={handleError} name="Cpassword" id="Cpassword" />
                    {props.error && <span className='errorText'><FontAwesomeIcon icon="fa-solid fa-circle-exclamation" />{props.errorText}</span>}
                </section>
                <button id='passBtn' type="submit" disabled>{props.buttonText}</button>
            </>
            }
            {props.validated && 
                <>
                    <img src={props.image} alt="" />
                    <h1>Creaste tu contraseña</h1>
                    <p>Asegúrate de recordarla, la necesitarás para ingresar a tu cuenta.</p>
                    <button type='button' onClick={passwordValidated}>Continuar</button>
                </>
            }
        </section>
     );
}
 
export default PasswordValidation;