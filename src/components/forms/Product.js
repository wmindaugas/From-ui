import {Form, Formik} from "formik";
import {Alert, Button, CircularProgress, Stack, Typography} from "@mui/material";
import * as Yup from 'yup';
import FormTextInput from "./FormTextInput";
import {getProductById, saveProduct, updateProduct} from "../api/productApi";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

const productValidationSchema = Yup.object().shape(
    {
        name: Yup.string()
            .min(5, 'Name must be more then 5 symbols')
            .max(10, 'Name must be less then 10 symbols')
            .required('Name is required'),
        category: Yup.string()
            .required('Category is required'),
        description: Yup.string()
            .required('Description is required'),
        quantity: Yup.number()
            .typeError('Quantity must be a number')
            .positive('Quantity must be bigger then 0')
            .required('Quantity is required'),
        price: Yup.number()
            .typeError('Price must be a number')
            .positive('Price must be bigger then 0')
            .required('Price is required')
    }
)

const Product = () => {
    const [notification, setNotification] = useState({isVisible: false});
    const {productId} = useParams();
    const [product, setProduct] = useState({
        name: '',
        category: '',
        description: '',
        quantity: '',
        price: ''
    });
    const [loading, setLoading] = useState(true);
    const navigation = useNavigate();

    useEffect(() => {
        if (!productId) {
            setLoading(false);

            return;
        }

        getProductById(productId)
            .then(({data}) => setProduct(data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, []);

    const onFormSubmit = (values, helper) => {

        if (productId) {
            onProductUpdate(values, helper);
            return;
        }

        onCreateProduct(values, helper);
    }

    const onProductUpdate = (values, helper) => {
        updateProduct(values, productId)
            .then(() => navigation(`/products/${productId}`))
            .catch((error) => setNotification({isVisible: true, message: 'Product cannot be updated', severity: 'error'}))
            .finally(() => helper.setSubmitting(false));
    }

    const onCreateProduct = (values, helper) => {
        saveProduct(values)
            .then((response) => {
                helper.resetForm();
                setNotification({isVisible: true, message: 'Product created successfully', severity: 'success'});
            })
            .catch((error) => {
                setNotification({isVisible: true, message: 'Product cannot be created', severity: 'error'});
                console.log(error);
            })
            .finally(() => helper.setSubmitting(false));
    }

    return (
        <>
            {
                loading ? <CircularProgress/> : <Formik
                    initialValues={product}

                    onSubmit={onFormSubmit}

                    validationSchema={productValidationSchema}
                >
                    {props => (
                        <Form>
                            <Stack spacing={2} direction="column">
                                {notification.isVisible && <Alert severity={notification.severity}>{notification.message}</Alert>}
                                <Typography variant="h5">{productId ? 'Update Product:' : 'Create Product:'}</Typography>
                                <FormTextInput error={props.touched.name && !!props.errors.name}
                                               name="name"
                                               label="Product name"/>
                                <FormTextInput error={props.touched.category && !!props.errors.category}
                                               name="category"
                                               label="Product category"/>
                                <FormTextInput error={props.touched.description && !!props.errors.description}
                                               name="description"
                                               label="Product description"
                                               rows={3}
                                               multiline/>
                                <FormTextInput error={props.touched.quantity && !!props.errors.quantity}
                                               name="quantity"
                                               label="Product quantity"/>
                                <FormTextInput error={props.touched.price && !!props.errors.price}
                                               name="price"
                                               label="Product price"/>
                            </Stack>
                            <Typography sx={{textAlign: 'right', mt: 2}}>
                                {
                                    props.isSubmitting ? <CircularProgress/> : <Button variant="outlined" type="submit">{productId ? 'Update' : 'Create'}</Button>
                                }
                            </Typography>
                        </Form>
                    )
                    }
                </Formik>
            }
        </>
    )
}
export default Product;