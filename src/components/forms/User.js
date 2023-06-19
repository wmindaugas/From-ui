import {Form, Formik} from "formik";
import {Alert, Button, CircularProgress, Stack, Typography} from "@mui/material";
import * as Yup from 'yup';
import FormTextInput from "./FormTextInput";
import {createUser} from "../api/userApi";
import {useState} from "react";
import {useTranslation} from "react-i18next";

const userValidationSchema = Yup.object().shape(
    {
        username: Yup.string()
            .min(5, 'Name must be longer than 5')
            .max(10, 'Name must be shorter than 10')
            .required('Name is required'),
        surname: Yup.string()
            .min(5, 'Surname must be longer than 5')
            .max(10, 'Surname must be shorter than 10')
            .required('Surname is required'),
        name: Yup.string()
            .required("Name is required"),
        email: Yup.string()
            .email()
            .required('Email is required'),
        phone: Yup.string()
            .required('Phone is required'),
        password: Yup.string()
            .min(10, 'Password must contain at least 10 symbols...')
            .required('Password is required'),
        repeatPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Password is required')
    }
)

const User = () => {

    const {t} = useTranslation('user');
    const [error, setError] = useState();

    const onCreateUser = (values, helpers) => {
        createUser(values)
            .then((data) => console.log('success ', data))
            .catch(({response}) => setError(response.data.reason))
            .finally(() => helpers.setSubmitting(false));
    }

    return (
        <Formik
            initialValues={ {
                username: '',
                name: '',
                surname: '',
                email: '',
                phone: '',
                password: '',
                repeatPassword: ''
            } }

            onSubmit={ onCreateUser }

            validationSchema={ userValidationSchema }
        >
            { props => (
                <Form>
                    {error && <Alert severity="error">{t(error)}</Alert> }
                    <Stack spacing={ 1 } direction="column">
                        <Typography variant="h5">Create user:</Typography>
                        <FormTextInput error={ props.touched.username && !!props.errors.username }
                                       name="username"
                                       label="UserName"/>
                        <FormTextInput error={ props.touched.name && !!props.errors.name }
                                       name="name"
                                       label="Name"/>
                        <FormTextInput error={ props.touched.surname && !!props.errors.surname }
                                       name="surname"
                                       label="User surname"/>
                        <FormTextInput error={ props.touched.email && !!props.errors.email }
                                       name="email"
                                       label="User email"/>
                        <FormTextInput error={ props.touched.phone && !!props.errors.phone }
                                       name="phone"
                                       label="User phone"/>
                        <FormTextInput error={ props.touched.password && !!props.errors.password }
                                       name="password"
                                       label="Password"
                                       type="password"/>
                        <FormTextInput error={ props.touched.repeatPassword && !!props.errors.repeatPassword }
                                       name="repeatPassword"
                                       label="Password confirmation"
                                       type="password"/>
                    </Stack>
                    <Typography sx={ {textAlign: 'right', mt: 2} }>
                        {
                            props.isSubmitting ? <CircularProgress/> :
                                <Button variant="outlined" type="submit">Save user</Button>
                        }
                    </Typography>
                </Form>
            ) }
        </Formik>
    )
}

export default User;