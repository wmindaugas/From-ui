import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getProductById} from "../api/productApi";
import {Button, CircularProgress, Grid, ImageListItem, Paper, Typography} from "@mui/material";
import DeleteProduct from "../DeleteProduct";

const ProductDetailPage = () => {
    const {productId} = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});

    useEffect(() => {
        getProductById(productId)
            .then(({data}) => setProduct(data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            {
                loading ? <CircularProgress/> :
                    <div>
                        <Paper elevation={3} sx={{p: 1}}>
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                    <ImageListItem>
                                        <img src="https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"/>
                                    </ImageListItem>
                                </Grid>
                                <Grid item xs={7}>
                                    <Typography variant="h5">{product.name}</Typography>
                                    <Grid container spacing={2} sx={{mt: 2}}>
                                        <Grid item xs={2}>
                                            Category:
                                        </Grid>
                                        <Grid item xs={10}>
                                            {product.category}
                                        </Grid>
                                        <Grid item xs={2}>
                                            Description:
                                        </Grid>
                                        <Grid item xs={10}>
                                            {product.description}
                                        </Grid>
                                        <Grid item xs={2}>
                                            Quantity:
                                        </Grid>
                                        <Grid item xs={10}>
                                            {product.quantity}
                                        </Grid>
                                        <Grid item xs={2}>
                                            Price:
                                        </Grid>
                                        <Grid item xs={10} >
                                            <Typography sx={{fontWeight:700}}>
                                                {product.price}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Button variant="outlined"
                                                    to={`/products/${product.id}/update`}
                                                    component={NavLink}>Update product</Button>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <DeleteProduct productId={product.id}/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
            }
        </>
    );
};

export default ProductDetailPage;
