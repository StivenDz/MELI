import React from 'react';
import { BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';

import Home from '@pages/Home';
import Categories from '@pages/Categories';
import ProductsByCategory from '@pages/ProductsByCategory';
import ProductDetail from '@pages/ProductDetail';
import Cart from '@pages/CartPage';
import NotFound from '@pages/NotFound';

import AppContext from '@context/AppContext';
import useInitialState from '@hooks/useInitialState';

const App = () =>{
    const initialState = useInitialState();
    const isAuth = initialState.state.isLogged;
    return (
        <AppContext.Provider value={initialState}>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Home/>} />
                    <Route exact path="/categories" element={<Categories/>} />
                    <Route exact path="/category=:categoryName/:categoryId" element={<ProductsByCategory/>} />
                    <Route exact path="/product=:productName/:productId" element={<ProductDetail/>} />
                    <Route exact path="/cart" element={isAuth ? <Cart/> : <Navigate replace to={"/"} />} />
                    <Route path="*" element={<NotFound/>} />
                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    )
}
export default App;