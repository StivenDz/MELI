import React from 'react';
import { BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';

import Home from '@pages/Home';
import Categories from '@pages/Categories';
import ProductsByCategory from '@pages/ProductsByCategory';
import ProductDetail from '@pages/ProductDetail';
import Cart from '@pages/CartPage';
import NotFound from '@pages/NotFound';
import Login from '@pages/Login';
import SignUp from '@pages/SignUp';

import AppContext from '@context/AppContext';
import useInitialState from '@hooks/useInitialState';

const App = () =>{
    const initialState = useInitialState();
    const state = {
        isAuth:initialState.state.isLogged,
        isValidatingEmail: initialState.state.signup.vEmail.isValidating,
        validatedEmail: initialState.state.signup.vEmail.validated,

        isValidatingUsername: initialState.state.signup.vUsername.isValidating,
        validatedUsername: initialState.state.signup.vUsername.validated,

        isValidatingPhone: initialState.state.signup.vPhone.isValidating,
        validatedPhone: initialState.state.signup.vPhone.validated,

        isValidatingPassword: initialState.state.signup.vPassword.isValidating,
        validatedPassword: initialState.state.signup.vPassword.validated,

        allValidated: initialState.state.signup.allValidated,
        congrats: initialState.state.signup.showCongratsView,
    }
    return (
        <AppContext.Provider value={initialState}>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Home/>} />
                    <Route exact path='/login' element={!state.isAuth ? <Login/> :  <NotFound/>}/>

                    <Route exact path='/signup' element={!state.isAuth ? <SignUp/> :  <NotFound/>}/>
                    <Route exact path='/signup/email-validation' element={!state.isAuth && state.isValidatingEmail ? <SignUp/> :  <NotFound/>}/>
                    <Route exact path='/signup/email-validation/:codehashed' element={!state.isAuth && state.isValidatingEmail ? <SignUp/> :  <NotFound/>}/>
                    <Route exact path='/signup/email-validation/validated=:bool' element={!state.isAuth && state.validatedEmail ? <SignUp/> :  <NotFound/>}/>

                    <Route exact path='/signup/username-validation' element={!state.isAuth && state.isValidatingUsername ? <SignUp/> :  <NotFound/>}/>
                    <Route exact path='/signup/username-validation/validated=:bool' element={!state.isAuth && state.validatedUsername ? <SignUp/> :  <NotFound/>}/>

                    <Route exact path='/signup/phone-validation' element={!state.isAuth && state.isValidatingPhone ? <SignUp/> :  <NotFound/>}/>
                    <Route exact path='/signup/phone-validation/validated=:bool' element={!state.isAuth && state.validatedPhone ? <SignUp/> :  <NotFound/>}/>

                    <Route exact path='/signup/password-validation' element={!state.isAuth && state.isValidatingPassword ? <SignUp/> :  <NotFound/>}/>
                    <Route exact path='/signup/password-validation/validated=:bool' element={!state.isAuth && state.validatedPassword ? <SignUp/> :  <NotFound/>}/>

                    <Route exact path='/signup/registered=:bool' element={!state.isAuth && state.allValidated ? <SignUp/> :  <NotFound/>}/>
                    <Route exact path='/signup/registered=:bool/congrats' element={state.isAuth && state.congrats ? <SignUp/> :  <NotFound/>}/>

                    <Route exact path="/categories" element={<Categories/>} />
                    <Route exact path="/category=:categoryName/:categoryId" element={<ProductsByCategory/>} />
                    <Route exact path="/product=:productName/aq=:available_quantity/c=:categoryId/:productId" element={<ProductDetail/>} />
                    <Route exact path="/cart" element={state.isAuth ? <Cart/> : <Navigate replace to={"/login"} />} />
                    <Route path="*" element={<NotFound/>} />
                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    )
}
export default App;