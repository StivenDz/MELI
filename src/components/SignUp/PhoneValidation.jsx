import React from 'react';
import CountriesCode from "@json/CountriesCode.json";
import {sortJSON} from '@hooks/useOrderJSON';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router';
import AppContext from '@context/AppContext';

const PhoneValidation = ({props}) => {
    const navigate = useNavigate();
    const {current} = React.useContext(AppContext);
    const orderedCountriesCode = sortJSON(CountriesCode,"phone_code","asc");
    const handleInput = (e) =>{
        e.target.value.length > 9 ? document.getElementById("submitBtn").removeAttribute("disabled") : document.getElementById("submitBtn").setAttribute("disabled","true")
    }

    const handleCheck = (e) =>{
        e.target.checked ?  
        document.getElementById("congratsBtn").removeAttribute("disabled") 
        :
        document.getElementById("congratsBtn").setAttribute("disabled","true")
    }

    const validatedPhone = (e) =>{
        current("password");
        navigate("/signup");
    }

    return ( 
        <section className={props.validated ? "congratsPhone" : "contentPhone"}>
            {!props.validated && <>
                <h1>{props.title}</h1>
                <p>{props.text}</p>
                <div>
                    <select name='phone_code' defaultValue={"57"}>
                        {orderedCountriesCode.map(country => (
                            country.phone_code === "57" ? 
                            <option key={country.iso3} value={country.phone_code}>{`+${country.phone_code} ${country.iso3}`}</option> 
                            : 
                            country.phone_code.length > 0 && <option key={country.iso3} value={country.phone_code}>{`+${country.phone_code} ${country.iso3}`}</option>
                        ))}
                    </select>
                    <input type="number" name="phone" id="phone" minLength={10} required onInput={handleInput}/>
                </div>
                <span>{props.text2}</span>
                <button id='submitBtn' disabled type="submit">{props.buttonText}</button>
            </>}
            {props.validated && <>
                <img src={props.image} alt="" />
                <h1>Validamos tu teléfono</h1>
                <span>{props.phone}<FontAwesomeIcon icon="fa-solid fa-circle-check" /></span>
                <p>Te servirá para ingresar a tu cuenta y para que podamos confirmar que eres tú cuando sea necesario.</p>
                <div>
                    <input type="checkbox" defaultChecked onInput={handleCheck} name="conditions" id="conditions" />
                    <p>Acepto que me contacten por WhatsApp y/o SMS a este número</p>
                </div>
                <button id='congratsBtn' type={'button'} onClick={() => validatedPhone()}>Continuar</button>
            </>}
        </section>
     );
}
 
export default PhoneValidation;