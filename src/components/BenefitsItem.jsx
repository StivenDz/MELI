import React from 'react';

const BenefitsItem = ({props}) => {
    return ( 
        <div>
            <img src={props.img1} alt="" />
            <section>
                <img src={props.img2} alt="" />
                <div>
                    {props?.text1 && <span className='freeDays'>{props?.text1}</span>}
                    {props?.text2 && <span className='benefitsText'>{props?.text2}</span>}
                    {props?.text3 && <span>{props?.text3}</span>}
                </div>
            </section>
        </div>
     );
}
 
export default BenefitsItem;