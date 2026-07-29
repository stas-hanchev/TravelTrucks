'use client'

import { Field, Form, Formik, FormikHelpers } from 'formik'
import { FiAlertCircle } from 'react-icons/fi'
import * as Yup from 'yup'

import { BookingRequestBody } from '@/types/camper'
import Button from '@/components/Button/Button'

import styles from './BookingForm.module.css'
import { createBookingRequest } from '@/lib/campers-api'

const initialValues: BookingRequestBody = {
    name: '',
    email: '',
}

const BookingFormSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Please enter your name.')
        .max(30, 'Name is too long.')
        .required('Please enter your name.'),

    email: Yup.string()
        .email('Please enter a valid email.')
        .required('Please enter your email.'),
})

interface BookingFormProps {
    camperId: string;
}

export default function BookingForm({ camperId }: BookingFormProps) {
    const handleSubmit = async (
        values: BookingRequestBody,
        actions: FormikHelpers<BookingRequestBody>
    ) => {
        console.log('Order data:', values)
        const response = await createBookingRequest(camperId, values);
        if (response.message) {
            alert(response.message);
        }

        actions.resetForm()
        actions.setSubmitting(false)
    }

    return (
        <div className={styles.form_container}>
            <h2 className={styles.form_heading}>
                Book your campervan now
            </h2>

            <p className={styles.form_paragraph}>
                Stay connected! We are always ready to help you.
            </p>

            <Formik
                initialValues={initialValues}
                validationSchema={BookingFormSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, submitCount, isSubmitting }) => {
                    const nameHasError =
                        Boolean(errors.name) &&
                        (Boolean(touched.name) || submitCount > 0)

                    const emailHasError =
                        Boolean(errors.email) &&
                        (Boolean(touched.email) || submitCount > 0)

                    return (
                        <Form className={styles.form} noValidate>
                            <div className={styles.field_group}>
                                <div className={styles.input_wrapper}>
                                    {nameHasError && (
                                        <label
                                            htmlFor="name"
                                            className={styles.error_label}
                                        >
                                            Name*
                                        </label>
                                    )}

                                    <Field
                                        id="name"
                                        type="text"
                                        name="name"
                                        placeholder={
                                            nameHasError ? '' : 'Name*'
                                        }
                                        className={`${styles.username_input} ${
                                            nameHasError
                                                ? styles.input_error
                                                : ''
                                        }`}
                                        aria-invalid={nameHasError}
                                        aria-describedby={
                                            nameHasError
                                                ? 'username-error'
                                                : undefined
                                        }
                                    />

                                    {nameHasError && (
                                        <FiAlertCircle
                                            className={styles.error_icon}
                                            aria-hidden="true"
                                        />
                                    )}
                                </div>

                                {nameHasError && (
                                    <span
                                        id="name-error"
                                        className={styles.error}
                                    >
                                        {errors.name}
                                    </span>
                                )}
                            </div>

                            <div
                                className={`${styles.field_group} ${styles.email_field_group}`}
                            >
                                <div className={styles.input_wrapper}>
                                    {emailHasError && (
                                        <label
                                            htmlFor="email"
                                            className={styles.error_label}
                                        >
                                            Email*
                                        </label>
                                    )}

                                    <Field
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder={
                                            emailHasError ? '' : 'Email*'
                                        }
                                        className={`${styles.email_input} ${
                                            emailHasError
                                                ? styles.input_error
                                                : ''
                                        }`}
                                        aria-invalid={emailHasError}
                                        aria-describedby={
                                            emailHasError
                                                ? 'email-error'
                                                : undefined
                                        }
                                    />

                                    {emailHasError && (
                                        <FiAlertCircle
                                            className={styles.error_icon}
                                            aria-hidden="true"
                                        />
                                    )}
                                </div>

                                {emailHasError && (
                                    <span
                                        id="email-error"
                                        className={styles.error}
                                    >
                                        {errors.email}
                                    </span>
                                )}
                            </div>

                            <Button
                                className={styles.send_btn}
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Send
                            </Button>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}