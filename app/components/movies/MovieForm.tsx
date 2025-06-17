import * as Yup from 'yup';
import {Formik, Form, Field, ErrorMessage, FormikValues} from 'formik';
import {Button, Modal,Form as BForm} from "react-bootstrap";
import styles from "./movies.module.css";
import {Movie, useAddMovieMutation, useUpdateMovieMutation} from "@/lib/features/movies/movieApiSlice";
import Swal from "sweetalert2";

const MovieSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    year: Yup.string()
        .length(4, 'must be four digits!')
        .required('Required'),
    directorName:Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    phoneNo:Yup.string()
        .matches(/^\d{9}$/, 'Phone number must be exactly 9 digits') // Key part: regex for 9 digits
        .required('Phone number is required'),
});

export default function MovieForm({movie, show, handleClose, edit} : {
    movie?: Movie;
    show: boolean;
    handleClose: () => void;
    edit?: boolean;
}) {

    const initValues = !edit? {
        title: '',
        year:'',
        directorName:'',
        phoneNo:''
    } : {
        title: movie?.title,
        year: movie?.year,
        directorName: movie?.director.name,
        phoneNo: movie?.director.phoneNo || '',
    };

    // const dispatch = useAppDispatch();
    const [addMovieApi] = useAddMovieMutation();
    const [updateMovieApi] = useUpdateMovieMutation();

    function submitHandler(values: FormikValues) {
        const newMovie: Movie = {
            ...movie,
            title: values.title,
            director: {
                ...movie?.director,
                name: values.directorName,
                phoneNo: values.phoneNo,
            },
            year: values.year,
        }
        console.log(newMovie);
        if(edit) {
            Swal.fire({
                title: 'Edit Movie!',
                text: 'Are you sure to edit?',
                icon: 'warning',
                confirmButtonText: 'Yes',
                showDenyButton: true,
                showCancelButton: true,
                denyButtonText: `No`,
            }).then(result => {
                if (result.isConfirmed) {
                    // dispatch(updateMovie(newMovie))
                    updateMovieApi(newMovie);
                }
            })
        }
        else {
            // dispatch(addMovie(newMovie));
            addMovieApi(newMovie).unwrap().then(result => {console.log(result)});
            Swal.fire("New Movie Added", "", "info");
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{edit? "Edit" : "New"} Movie</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik initialValues={initValues}
                        validationSchema={MovieSchema}
                        onSubmit={(values, {setSubmitting}) => {
                            setSubmitting(true);
                            submitHandler(values);
                            handleClose();
                        }}>
                    {
                        ({errors, touched, isSubmitting}) => (
                            <Form>
                                {/*<Field name={"title"}/>*/}
                                {/*{errors.title && touched.title ? (<div className={styles.error}>{errors.title}</div>) : null}*/}

                                {/*Bootstrap Form*/}
                                <BForm.Group className={"mb-2"}>
                                    <BForm.Label htmlFor="title" className={"fw-medium"}>Title</BForm.Label>
                                    <Field
                                        id="title"
                                        type="text"
                                        name="title"
                                        as={BForm.Control}
                                    />
                                    <ErrorMessage name="title" className={styles.error} component={"div"}/>
                                </BForm.Group>
                                <BForm.Group className={"mb-2"}>
                                    <BForm.Label htmlFor="year" className={"fw-medium"}>Year</BForm.Label>
                                    <Field
                                        id="year"
                                        type="text"
                                        name="year"
                                        as={BForm.Control}
                                    />
                                    <ErrorMessage name="year" className={styles.error} component={"div"}/>
                                </BForm.Group>
                                <BForm.Group className={"mb-2"}>
                                    <BForm.Label htmlFor="director-name" className={"fw-medium"}>Director Name</BForm.Label>
                                    <Field
                                        id="director-name"
                                        type="text"
                                        name="directorName"
                                        as={BForm.Control}
                                    />
                                    {errors.directorName && touched.directorName ? (
                                        <div className={styles.error}>{errors.directorName}</div>
                                    ) : null}
                                </BForm.Group>
                                <BForm.Group className={"mb-2"}>
                                    <BForm.Label htmlFor="phone-no" className={"fw-medium"}>Phone No</BForm.Label>
                                    <Field
                                        id="phone-no"
                                        type="text"
                                        name="phoneNo"
                                        as={BForm.Control}
                                    />
                                    {errors.phoneNo && touched.phoneNo ? (
                                        <div className={styles.error}> {errors.phoneNo}</div>
                                    ) : null}
                                </BForm.Group>
                                {/*<Button variant="primary" className={"mt-3"} type={"submit"}>*/}
                                {/*    Save*/}
                                {/*</Button>*/}
                                <Modal.Footer className={"mt-3"}>
                                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                                    <Button variant="primary" type={"submit"} disabled={isSubmitting}>{edit?"Edit":"Save"}</Button>
                                </Modal.Footer>
                            </Form>
                        )
                    }
                </Formik>
            </Modal.Body>
        </Modal>
    )
}