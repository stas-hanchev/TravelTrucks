'use client'

import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { BookingFormValues } from '@/types/form'

import styles from './BookingForm.module.css'
import Button from '@/components/Button/Button'

const initialValues: BookingFormValues = {
    username: '',
    email: '',
}

const BookingFormSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .max(30, 'Name is too long')
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
})

export default function BookingForm() {
    const handleSubmit = (
        values: BookingFormValues,
        actions: FormikHelpers<BookingFormValues>
    ) => {
        console.log('Order data:', values)
        actions.resetForm()
    }

    return (
        <div className={styles.form_container}>
            <h2 className={styles.form_heading}>Book your campervan now</h2>
            <p className={styles.form_paragraph}>
                Stay connected! We are always ready to help you.
            </p>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={BookingFormSchema}
            >
                <Form className={styles.form}>
                    <Field
                        type="text"
                        name="username"
                        placeholder="Name*"
                        className={styles.username_input}
                    ></Field>
                    
                    <ErrorMessage name="username" component="span" className={styles.error} />
                    
                    <Field
                        type="email"
                        name="email"
                        placeholder="Email*"
                        className={styles.email_input}
                    ></Field>
                    
                    <ErrorMessage name="email" component="span" className={styles.error} />

                    <Button className={styles.send_btn} type="submit">
                        Send
                    </Button>
                </Form>
            </Formik>
        </div>
    )
}
