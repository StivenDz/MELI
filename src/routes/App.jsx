import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import Home from '@pages/Home';
import ProductDetail from '@pages/ProductDetail';
import Category from '@pages/Category';
import Categories from '@pages/Categories';

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
                    <Route exact path="/category=:categoryName/:categoryId" element={<Category/>} />
                    <Route exact path="/product=:productName/:productId" element={<ProductDetail/>} />
                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    )
}
export default App;