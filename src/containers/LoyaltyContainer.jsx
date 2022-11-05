import React from 'react';
import truck from "@logos/truck.png";
import StarPlus from "@icons/StarPlus.svg";
import DisneyPlus from "@icons/DisneyPlus.svg";

const LoyaltyContainer = () => {
    const items = [
        {
            img: DisneyPlus,
            text: "Disney+ sin cargo"
        },
        {
            img: StarPlus,
            text: "Star+ sin cargo"
        },
        {
            img: truck,
            text: "Envíos gratis y rápidos desde $ 70.000 y 40% OFF en envíos de menos de $ 70.000"
        }
    ];
    return (
        <section className='loyaltyContainer'>
            <section className='loyalty'>
                <div className="loyaltyContent">
                    <div className="loyaltyHeader">
                        <h3>Suscríbete al nivel 6</h3>
                        <div className='price'>
                            <pre>$ 50.690</pre>
                            <span>$ 17.899 <p>/mes</p></span>
                        </div>
                    </div>
                    <div className="loyaltyBody">
                        <p>Consigue los mejores beneficios en Mercado Libre</p>
                        <section>
                            {
                                items.map((item,i) => (
                                    <div key={i}>
                                        <img src={item.img} alt="" />
                                        <span>{item.text}</span>
                                    </div>
                                ))
                            }
                        </section>
                    </div>
                    <div className="loyaltyButton">
                        <button>Suscríbete</button>
                    </div>
                </div>
            </section>
        </section>
    );
}

export default LoyaltyContainer;