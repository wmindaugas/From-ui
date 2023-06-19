import {useEffect, useState} from "react";
import {getProducts} from "../api/productApi";
import {Button, CircularProgress, Paper, Table, TableBody, TableContainer, TableHead, TableRow} from "@mui/material";
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import styled from "@emotion/styled";
import {NavLink} from "react-router-dom";
import DeleteProduct from "../DeleteProduct";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../../store/slices/cartSlice";
import {useTranslation} from "react-i18next";
import store from "../../store/store";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${ tableCellClasses.head }`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${ tableCellClasses.body }`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Products = () => {

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const dispatcher = useDispatch();
    const addProduct = (product) => dispatcher(addToCart(product));
    const {t} = useTranslation('products');
    const user = useSelector(store => store.user.user);

    useEffect(() => {
        getProducts()
            .then(({data}) => setProducts(data))
            .catch((error) => console.log('error ', error))
            .finally(() => setLoading(false));
    }, []);

    const removeProduct = (productId) => {
        const filteredProducts = products.filter(p => p.id !== productId);

        setProducts(filteredProducts);
    }

    return (
        <>
            {
                loading ? <CircularProgress/> :
                    <TableContainer component={ Paper }>
                        <Table sx={ {minWidth: 700} } aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>{ t('name') }</StyledTableCell>
                                    <StyledTableCell>{ t('category') }</StyledTableCell>
                                    <StyledTableCell>{ t('description') }</StyledTableCell>
                                    <StyledTableCell align="right">{ t('quantity') }</StyledTableCell>
                                    <StyledTableCell align="right">{ t('price') }</StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { products.map((product) => (
                                    <StyledTableRow key={ product.id }>
                                        <StyledTableCell component="th" scope="row">
                                            <NavLink to={ `/products/${ product.id }` }>
                                                { product.name }
                                            </NavLink>
                                        </StyledTableCell>
                                        <StyledTableCell>{ product.category }</StyledTableCell>
                                        <StyledTableCell sx={ {maxWidth: 600} }>{ product.description }</StyledTableCell>
                                        <StyledTableCell align="right">{ product.quantity }</StyledTableCell>
                                        <StyledTableCell align="right">{ product.price } €</StyledTableCell>
                                        <StyledTableCell align="right">
                                            {
                                                user?.roles.includes('ADMIN') && <DeleteProduct key={ product.id }
                                                                                                productId={ product.id }
                                                                                                removeProduct={ removeProduct }/>
                                            }
                                            <Button variant="outlined"
                                                    type="button"
                                                    color="primary"
                                                    sx={ {ml: 1} }
                                                    onClick={ () => addProduct(product) }><AddShoppingCartIcon/></Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )) }
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
        </>
    )
}

export default Products;