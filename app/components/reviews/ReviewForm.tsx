import {Review} from "@/lib/features/reviews/reviewApiSlice";
import {Button, Form as BForm, Modal} from "react-bootstrap";
import * as Yup from 'yup';
import {ErrorMessage, Field, Form, Formik, FormikValues} from "formik";
import styles from "@/app/components/movies/movies.module.css";
import {useAppDispatch} from "@/lib/hooks";
import {addReview, updateReview} from "@/lib/features/reviews/reviewSlice";
import {Movie} from "@/lib/features/movies/movieApiSice";

const ReviewSchema = Yup.object().shape({
    review: Yup.string().required('Required'),
    rating: Yup.string().required('Required'),
})

export default function ReviewForm({movie, review, show, handleClose, edit} : {
    review?: Review;
    movie?: Movie;
    show: boolean;
    handleClose: () => void;
    edit?: boolean;
}) {

    const dispatch = useAppDispatch();

    const initValues =  {
        title: movie?.title || '',
        year: movie?.year || '',
        review: review?.review || '',
        rating: review?.rating || '',
    }

    function submitHandler(values: FormikValues) {
        console.log(values);
        const id = Math.random()+"";
        const newReview: Review = {
            _id: review?._id || id?.split('.')[1],
            movie: movie?._id,
            review: values.review,
            rating: values.rating,
        }
        console.log(newReview);
        if(edit)
            dispatch(updateReview(newReview))
        else
            dispatch(addReview(newReview));
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{edit? "Edit" : "New"} Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik initialValues={initValues}
                        validationSchema={ReviewSchema}
                        onSubmit={(values, {setSubmitting}) => {
                            setSubmitting(false);
                            submitHandler(values);
                            handleClose();
                        }}
                >
                    {
                        ({isSubmitting}) => (
                            <Form>
                                <BForm.Group className={"mb-2"}>
                                    <BForm.Label htmlFor="title" className={"fw-medium"}>Title</BForm.Label>
                                    <Field
                                        id="title"
                                        type="text"
                                        name="title"
                                        as={BForm.Control}
                                        disabled
                                    />
                                    <ErrorMessage name="review" className={styles.error} component={"div"}/>
                                </BForm.Group>
                                <BForm.Group className={"mb-2"}>
                                    <BForm.Label htmlFor="year" className={"fw-medium"}>Year</BForm.Label>
                                    <Field
                                        id="year"
                                        type="text"
                                        name="year"
                                        as={BForm.Control}
                                        disabled
                                    />
                                    <ErrorMessage name="review" className={styles.error} component={"div"}/>
                                </BForm.Group>
                                <BForm.Group className={"mb-2"}>
                                    <BForm.Label htmlFor="review" className={"fw-medium"}>Review</BForm.Label>
                                    <Field
                                        id="review"
                                        type="text"
                                        name="review"
                                        as={BForm.Control}
                                    />
                                    <ErrorMessage name="review" className={styles.error} component={"div"}/>
                                </BForm.Group>
                                <BForm.Group className={"mb-2"}>
                                    <BForm.Label htmlFor="rating" className={"fw-medium"}>Rating</BForm.Label>
                                    <Field
                                        id="rating"
                                        type="text"
                                        name="rating"
                                        as={BForm.Control}
                                    />
                                    <ErrorMessage name="rating" className={styles.error} component={"div"}/>
                                </BForm.Group>
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