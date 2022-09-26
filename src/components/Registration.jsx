import React from 'react';

const Registration = ({props}) => {
    const validateLength = (e) =>{
        const button = document.getElementById('submitButton');
        e.target.value.length > 0 ? button.removeAttribute("disabled") : button.setAttribute("disabled","true");
    }   

    return ( 
        <section className='contentForm'>
            <h1>Ingresa tu {props.title}</h1>
            <p>{props.text}</p>
            <input onInput={validateLength} type={props.inputType} name={props.inputName}/>
            <button disabled id='submitButton' type="submit">{props.buttonText}</button>
        </section>
     );
}
 
export default Registration;