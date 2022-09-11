import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import Home from '@pages/Home';
import ProductDetail from '@pages/ProductDetail';
import Categories from '@pages/Categories';
import ProductsByCategory from '@pages/ProductsByCategory';
import NotFound from '@pages/NotFound';

import AppContext from '@context/AppContext';
import useInitialState from '@hooks/useInitialState';

const App = () =>{
    const initialState = useInitialState();
    return (
        <AppContext.Provider value={initialState}>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Home/>} />
                    <Route exact path="/categories" element={<Categories/>} />
                    <Route exact path="/category=:categoryName/:categoryId" element={<ProductsByCategory/>} />
                    <Route exact path="/product=:productName/:productId" element={<ProductDetail/>} />
                    <Route exact path='*' element={<NotFound/>} />
                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    )
}
export default App;