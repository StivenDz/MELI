import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppContext from '@context/AppContext';

const Registration = ({props}) => {
    const {isSubmitted,errorInSignUp,isValidating} = React.useContext(AppContext);
    const validateLength = (e) =>{
        e.target.value.length > 0 ? 
        (
            document.getElementById('submitBtn').removeAttribute("disabled"),
            props.error && (isSubmitted(false),errorInSignUp(false))) 
            : 
            document.getElementById('submitBtn').setAttribute("disabled","true");
    }   
    if(props.isSubmitted){
        document.getElementById('submitBtn').setAttribute("disabled", "true");
        document.getElementById('submitBtn').classList.add("loadingBackground");
    }
    if(props.error){
        document.getElementById('submitBtn').setAttribute("disabled",true);
        document.getElementById('submitBtn').classList.remove("loadingBackground");
    }

    const validateCode = (e) =>{
        let isFull = false;
        const inputsNumber = document.querySelectorAll(".numberInput");
        e.preventDefault();
        e.target.value.length === 0 ? e.target.type = "number" : e.target.type = "text";
        inputsNumber.forEach((target,i) =>{
            i < 3 && ( 
            target.value.length === 1 ?
                document.querySelectorAll(".numberInput")[`${i + 1}`].removeAttribute("disabled")
                : 
                document.querySelectorAll(".numberInput")[`${i + 1}`].setAttribute("disabled","true")
            )
            isFull = target.value.length === 1
        })
        isFull ? document.getElementById('submitBtn').removeAttribute("disabled") : document.getElementById('submitBtn').setAttribute("disabled","true");
        (!isFull && props.error) && errorInSignUp(false,"emailValidation");
            
    }

    return ( 
        <section className={!props?.validated ? 'contentForm' : "congratsContainer"}>
            {props?.image && <img src={props.image}/>}
            <h1>{props.title}</h1>
            {props?.validated && 
                <span>
                    {props.email} 
                    <FontAwesomeIcon icon="fa-solid fa-circle-check" />
                </span>}
            {props?.validation_code && <p>Lo enviamos a</p>}
            <p>{props?.validation_code && <b>{props.email}</b>} {props.text}</p>
            {!props?.validation_code && !props?.validated && <input className={props.error  ? "invalidInput" : "dataEnter"} onInput={validateLength} type={props.inputType} name={props.inputName}/>}
            {props?.validation_code && 
                <section className='numberInputsContainer'>
                    {props.numOfInputs.map(num => (
                        <input onInput={validateCode} name={`num${num}`} disabled={num > 1 ? true : false} tabIndex={num} key={num} className='numberInput' type="number"  maxLength={1} required/>
                    ))}
                </section>
            }
            {props.error &&
                <span className={props?.validation_code ? "errorInValidationCode" : "errorText"}>
                    <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" /> 
                    {props.errorText}
                    {props.inputType === "email" && 
                        <Link to={"/login"}>
                            Ingresar
                        </Link>}
                </span>}
            {!props?.validated && <button className='submitButton' disabled id='submitBtn' type="submit">
                {props.buttonText}
                {props.isSubmitted && <FontAwesomeIcon icon="fa-solid fa-spinner" className='spinner' />}
            </button>}

            {props?.validated &&
                <Link onClick={() => isValidating(false,true)} to={"/signup"}>{props.buttonText}</Link>  
            }
        </section>
     );
}
 
export default Registration;