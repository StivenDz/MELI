import React from 'react';
import PaymentMethodItem from '@components/PaymentMethodItem';

const PaymentMethodContainer = () => {
    const methods = [
        {
            img:"https://http2.mlstatic.com/storage/homes-korriban/assets/images/payments/credit-card.svg",
            text:"Hasta 48 cuotas",
            link:""
        },
        {
            img:"https://http2.mlstatic.com/storage/homes-korriban/assets/images/payments/transfer.svg",
            text:"Transferencia desde tu banco",
            link:""
        },
        {
            img:"https://http2.mlstatic.com/storage/homes-korriban/assets/images/payments/payment-agreement.svg",
            text:"Paga en efectivo",
            link:""
        },
        {
            img:"https://http2.mlstatic.com/storage/homes-korriban/assets/images/payments/view-more.svg",
            text:"Más medios de pago",
            link:""
        }
    ]

    return ( 
        <section className='paymentMethodContainer'>
            <div>
                {methods.map((method,i) => (
                    <PaymentMethodItem
                        key={i} props={method}
                    />
                ))}
            </div>
        </section>
     );
}
 
export default PaymentMethodContainer;