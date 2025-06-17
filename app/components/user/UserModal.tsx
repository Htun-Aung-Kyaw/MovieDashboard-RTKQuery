import {Button, Form as BForm, Modal} from "react-bootstrap";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik, FormikState, FormikValues} from "formik";
import styles from "@/app/components/movies/movies.module.css";
import {User} from "@/lib/features/auth/authSlice";
import {useRegisterMutation} from "@/lib/features/auth/authApiSlice";

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
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
});

export default function UserModal({show, handleClose}: {show: boolean, handleClose: () => void}) {

    const [registerApi] = useRegisterMutation();

    const initialValues = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    }

    function handleSubmit(values: FormikValues,
                          setSubmitting: (isSubmitting: boolean) => void,
                          resetForm: () => void)
    {
            console.log('Submitted', values);
            const user: User = {
                username: values.username,
                email: values.email,
                password: values.password,
            }
            console.log('User', user);
            registerApi(user);
            setSubmitting(false); // Set submitting to false after submission
            resetForm(); // Reset the form fields
            handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik initialValues={initialValues}
                        validationSchema={UserSchema}
                        onSubmit={(values, {setSubmitting, resetForm}) => {
                            handleSubmit(values, setSubmitting, resetForm);
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
                                <BForm.Group className={"mb-2"}>
                                    <BForm.Label htmlFor="c-password" className={"fw-medium"}>Confirm Password*</BForm.Label>
                                    <Field
                                        id="c-password"
                                        type="password"
                                        name="confirmPassword"
                                        as={BForm.Control}
                                    />
                                    <ErrorMessage name="confirmPassword" className={styles.error} component={"div"}/>
                                </BForm.Group>
                                <Modal.Footer className={"mt-3"}>
                                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                                    <Button variant="primary" type={"submit"} disabled={isSubmitting}>{isSubmitting ? 'Creating...' : 'Create'}</Button>
                                </Modal.Footer>
                            </Form>
                        )
                    }
                </Formik>
            </Modal.Body>
        </Modal>
    );
}