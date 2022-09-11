import React from 'react';
import { motion } from 'framer-motion';
import CategoriesList from '@components/CategoriesList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CategoriesContainer = ({showOrHide}) => {
    const [isHovering,setIsHoveing] = React.useState(false)
    return ( 
        <motion.article 
            animate={{opacity: (showOrHide || isHovering) ? 1 : 0,pointerEvents : (showOrHide || isHovering) ? 'all' : 'none'}}
            className="categoriesContainer"
        >
            <div onMouseOver={()=> setIsHoveing(true)}
                onMouseLeave={()=> setIsHoveing(false)}
            >
                <div className="bar"></div>
                <FontAwesomeIcon className='triangle' icon="fa-solid fa-play" />
                <CategoriesList />
            </div>
        </motion.article>
     );
}
 
export default CategoriesContainer;