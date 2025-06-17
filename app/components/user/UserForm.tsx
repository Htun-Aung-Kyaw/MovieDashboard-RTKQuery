import * as Yup from 'yup';
import {ErrorMessage, Field, Form, Formik, FormikValues} from "formik";
import {Button, Form as BForm} from "react-bootstrap";
import styles from "@/app/components/movies/movies.module.css";
import {useEffect, useState} from "react";
import UserModal from "@/app/components/user/UserModal";
import {useLoginMutation} from "@/lib/features/auth/authApiSlice";
import {login, selectAuth, User} from "@/lib/features/auth/authSlice";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {useRouter, useSearchParams} from "next/navigation";
import Swal from "sweetalert2";
const UserSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .max(50, 'Password is too long!')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')
        .required('Password is required'),
});

export default function UserForm() {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const searchParams = useSearchParams();
    // const auth = useAppSelector(selectAuth);

    const [loginApi] = useLoginMutation();
    const dispatch = useAppDispatch();

    const initialValues = {
        username: "",
        email: "",
        password: "",
    }

    // const redirectUrl = searchParams.get('redirectUrl');
    // useEffect(()=>{
    //     // console.log('Use Effect fired');
    //     if(auth)
    //     {
    //         //router.push('/');
    //         if(redirectUrl)
    //         {
    //             router.push(redirectUrl);
    //         }
    //         else
    //         {
    //             router.push('/');
    //         }
    //     }
    // },[]);

    function registerHandler() {
        handleShow();
    }

    const handleSubmit = (values:User) => {
        // console.log('Submitted', values);
        loginApi(values).unwrap().then(result => {
            dispatch(login(result));
            Swal.fire("Login Successful","","info");
            router.push('/?auth=true')
            // if(redirectUrl)
            // {
            //     router.push(redirectUrl);
            // }
            // else
            // {
            //     router.push('/');
            // }
        },(error)=>{
            setError(true);
            console.log('Login failed ',error);
        });
    }

    return (
        <Formik initialValues={initialValues}
                validationSchema={UserSchema}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    handleSubmit(values)
                    setSubmitting(false); // Set submitting to false after submission
                    resetForm(); // Reset the form fields
                }}
        >
            {
                ({isSubmitting}) => (
                    <Form>
                        <BForm.Group className={"mb-2"}>
                            <BForm.Label htmlFor="username" className={"fw-medium"}>Username*</BForm.Label>
                            <Field
                                id="username"
                                type="text"
                                name="username"
                                as={BForm.Control}
                            />
                            <ErrorMessage name="username" className={styles.error} component={"div"}/>
                        </BForm.Group>
                        <BForm.Group className={"mb-2"}>
                            <BForm.Label htmlFor="email" className={"fw-medium"}>Email*</BForm.Label>
                            <Field
                                id="email"
                                type="email"
                                name="email"
                                as={BForm.Control}
                            />
                            <ErrorMessage name="email" className={styles.error} component={"div"}/>
                        </BForm.Group>
                        <BForm.Group className={"mb-2"}>
                            <BForm.Label htmlFor="password" className={"fw-medium"}>Password*</BForm.Label>
                            <Field
                                id="password"
                                type="password"
                                name="password"
                                as={BForm.Control}
                            />
                            <ErrorMessage name="password" className={styles.error} component={"div"}/>
                        </BForm.Group>
                        {!error ? <p></p> : <p className={styles.error}>Login failed. Try again!</p>}
                        <Button variant="primary" type={"submit"} className={"my-2"}
                                disabled={isSubmitting}>{isSubmitting ? 'Logging in...' : 'Login'}</Button>
                        <p className={"my-2 text-decoration-underline"}>
                            Don't have an Account?
                            <Button variant={"warning"} className={"mx-2"} onClick={registerHandler}>Register</Button>
                        </p>
                        <UserModal show={show} handleClose={handleClose}/>
                    </Form>
                )
            }
        </Formik>
    )
}