import styled from "@emotion/styled";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import {Alert, Box, Button, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {useDispatch, useSelector} from "react-redux";
import {decreaseQuantity, deleteFromCart, increaseQuantity} from "../../store/slices/cartSlice";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
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

const Cart = () => {

    const dispatcher = useDispatch();
    const products = useSelector(state => state.cart);
    const totalPrice = products.reduce((sum, {cartQuantity, price}) => sum + (cartQuantity * price), 0);

    const increaseCartQuantity = (productId) => dispatcher(increaseQuantity(productId));
    const decreaseCartQuantity = (productId) => dispatcher(decreaseQuantity(productId));
    const deleteProduct = (productId) => dispatcher(deleteFromCart(productId));

    return (
        <>
            {
                products.length > 0 ?
                    <>
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 700}} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Name</StyledTableCell>
                                        <StyledTableCell>Category</StyledTableCell>
                                        <StyledTableCell>Description</StyledTableCell>
                                        <StyledTableCell align="center">Quantity</StyledTableCell>
                                        <StyledTableCell align="right">Price</StyledTableCell>
                                        <StyledTableCell align="right">Sub total</StyledTableCell>
                                        <StyledTableCell></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.map((product) => (
                                        <StyledTableRow key={product.id}>
                                            <StyledTableCell component="th" scope="row">
                                                <NavLink to={`/products/${product.id}`}>
                                                    {product.name}
                                                </NavLink>
                                            </StyledTableCell>
                                            <StyledTableCell>{product.category}</StyledTableCell>
                                            <StyledTableCell sx={{maxWidth: 600}}>{product.description}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Button variant="outlined"
                                                        type="button"
                                                        sx={{p: 0, mr: 1, minWidth: '25px'}}
                                                        onClick={() => decreaseCartQuantity(product.id)}
                                                        disabled={product.cartQuantity < 2}>-</Button>
                                                {product.cartQuantity}
                                                <Button variant="outlined"
                                                        type="button"
                                                        sx={{p: 0, ml: 1, minWidth: '25px'}}
                                                        onClick={() => increaseCartQuantity(product.id)}
                                                        disabled={product.cartQuantity >= product.quantity}>+</Button>
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{product.price} €</StyledTableCell>
                                            <StyledTableCell align="right">
                                                {(product.price * product.cartQuantity).toFixed(2)} €
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                <Button variant="outlined"
                                                        type="button"
                                                        color="error"
                                                        onClick={() => deleteProduct(product.id)}><DeleteOutlinedIcon/></Button>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box sx={{display: 'flex', justifyContent:'end', my: 2}}>
                            <Paper sx={{p: 2}}>
                                <Typography variant="h6">Total price: {totalPrice.toFixed(2)} €</Typography>
                            </Paper>

                        </Box>
                    </> : <Alert severity="info">Cart is empty</Alert>
            }

        </>
    );
}

export default Cart;