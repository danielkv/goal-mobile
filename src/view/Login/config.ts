import * as yup from 'yup'

export type TLoginForm = { email: string; password: string }

export const initialValues = (): TLoginForm => ({
    email: 'danielkv@gmail.com',
    password: '123456',
})

export const validationSchema = yup.object().shape({
    email: yup.string().required('Email é obrigatório'),
    password: yup.string().required('Email é obrigatório'),
})
