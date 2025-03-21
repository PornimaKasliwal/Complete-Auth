import { useFormik } from 'formik'
import * as yup from 'yup'
import handeleClasses from './share/handleClasses'
import { Link, useNavigate } from 'react-router-dom'
import { useSigninMutation } from '../redux/apis/auth.api'
import { useEffect } from 'react'

const Login = () => {
    const navigate = useNavigate()
    const [signin, { isSuccess }] = useSigninMutation()
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().required(),
            password: yup.string().required(),
        }),
        onSubmit: (values, { resetForm }) => {
            signin(values)
            resetForm()
        }
    })

    useEffect(() => {
        if (isSuccess) {
            navigate("/admin")
        }
    }, [isSuccess])


    return <>
        <div class="container">
            <div class="row">
                <div class="col-sm-6 offset-sm-3">
                    <div class="card">
                        <div class="card-header">Signup</div>
                        <form onSubmit={formik.handleSubmit} >
                            <div class="card-body">
                                <div>
                                    <label for="email" class="form-label">First Email</label>
                                    <input
                                        type="text"
                                        {...formik.getFieldProps("email")}
                                        className={handeleClasses(formik, "email")}
                                        id="email"
                                        placeholder="Enter Your Email"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">Please choose a username.</div>
                                </div>
                                <div class="mt-2">
                                    <label for="password" class="form-label">Password</label>
                                    <input
                                        type="password"
                                        {...formik.getFieldProps("password")}
                                        className={handeleClasses(formik, "password")}
                                        id="password"
                                        placeholder="Enter Your Password"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">Please choose a username.</div>
                                </div>
                                <button type="submit" class="btn btn-primary w-100 mt-3">
                                    Login
                                </button>
                                <p class="text-center mt-3">
                                    Dont Have Account? <Link to="/register">Register</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Login