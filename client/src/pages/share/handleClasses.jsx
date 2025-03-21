import clsx from 'clsx'

const handeleClasses = (formik, key) => clsx({
    "form-control my-2": true,
    "is-invalid": formik.touched[key] && formik.errors[key],
    "is-valid": formik.touched[key] && !formik.errors[key],
})
export default handeleClasses