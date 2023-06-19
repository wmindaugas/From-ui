import {Container} from "@mui/material";
import Product from "../forms/Product";
import {Route, Routes} from "react-router-dom";
import User from "../forms/User";
import Products from "../page/Products";
import ProductDetailPage from "../page/ProductDetailPage";
import Cart from "../page/Cart";
import Login from "../forms/Login";
import SecuredRoute from "../security/SecuredRoute";

//test commit
const Content = () => {

    return (
        <>
            <Container disableGutters maxWidth="xl" component="main"
                       sx={ {
                           display: 'flex',
                           flexDirection: 'column',
                           minHeight: 'calc(100vh - 157px)',
                           mt: 4
                       } }>

                <Routes>
                    <Route path="/" element={ <Products/> }/>
                    <Route path="/users/registration" element={ <User/> }/>
                    <Route path="/products/:productId" element={ <ProductDetailPage/> }/>
                    <Route path="/products/create" element={ <SecuredRoute roles={['ADMIN']}/> }>
                        <Route path="/products/create" element={ <Product key="create"/> }/>
                    </Route>
                    <Route path="/products/:productId/update" element={ <SecuredRoute roles={['USER']}/> }>
                        <Route path="/products/:productId/update" element={ <Product key="update"/> }/>
                    </Route>
                    <Route path="/cart" element={ <Cart/> }/>
                    <Route path="/login" element={ <Login/> }/>
                </Routes>
            </Container>
        </>
    );
}

export default Content;