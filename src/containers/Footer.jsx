import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FooterInfoContainer from './FooterInfoContainer';

const Footer = () => {
    return (
        <footer>
            <FooterInfoContainer />
            <section className="footer-Earth">
                <div className="wrapper">
                    <a href="mailto:stivendiazh@gmail.com" target="__BLANK" className="iconsocial email">
                        <div className="tooltip">Mail</div>
                        <span><FontAwesomeIcon icon="fa-regular fa-envelope" /></span>
                    </a>
                    <a href="https://www.linkedin.com/in/stiven-diaz-19072002dzh/" target="__BLANK" className="iconsocial linkdein">
                        <div className="tooltip" translate="no">linkedIn</div>
                        <span><FontAwesomeIcon icon="fa-brands fa-linkedin" /></span>
                    </a>
                    <a href="https://instagram.com/stiven_dz" target="__BLANK" className="iconsocial instagram">
                        <div className="tooltip">Instagram</div>
                        <span><FontAwesomeIcon icon="fa-brands fa-instagram" aria-hidden={true}/></span>
                    </a>
                    <a href="https://github.com/StivenDz" target="__BLANK" className="iconsocial github">
                        <div className="tooltip">Github</div>
                        <span><FontAwesomeIcon icon="fa-brands fa-github" /></span>
                    </a>
                </div>
                <p>Copyright &copy;2022 | Stiven Diaz <sup>19</sup></p>
            </section>
        </footer>
    );
}

export default Footer;