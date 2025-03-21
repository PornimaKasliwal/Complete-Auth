import { useFormik } from 'formik'
import * as yup from 'yup'
import handeleClasses from './share/handleClasses'
import { Link, useNavigate } from 'react-router-dom'
import { useSignupMutation } from '../redux/apis/auth.api'
import { useEffect } from 'react'

const Ragister = () => {
    const navigate = useNavigate()
    const [signup, { isSuccess }] = useSignupMutation()
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            cpassword: "",
        },
        validationSchema: yup.object({
            name: yup.string().required(),
            email: yup.string().required(),
            password: yup.string().required(),
            cpassword: yup.string().required().oneOf([yup.ref("password")]),
        }),
        onSubmit: (values, { resetForm }) => {
            signup(values)
            resetForm()
        }
    })
    useEffect(() => {
        if (isSuccess) {
            navigate("/")
        }
    }, [isSuccess])


    return <>
        <div class="container">
            <div class="row">
                <div class="col-sm-6 offset-sm-3">
                    <div class="card">
                        <div class="card-header">Signup</div>
                        <form onSubmit={formik.handleSubmit}>
                            <div class="card-body">
                                <div>
                                    <label for="name" class="form-label">First name</label>
                                    <input
                                        type="text"
                                        {...formik.getFieldProps("name")}
                                        className={handeleClasses(formik, "name")}
                                        id="name"
                                        placeholder="Enter your name"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">Please choose a username.</div>
                                </div>
                                <div class="mt-2">
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
                                        type="text"
                                        {...formik.getFieldProps("password")}
                                        className={handeleClasses(formik, "password")}
                                        id="password"
                                        placeholder="Enter Your Password"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">Please choose a password.</div>
                                </div>
                                <div class="mt-2">
                                    <label for="cpassword" class="form-label"
                                    >Confirm Password</label
                                    >
                                    <input
                                        type="text"
                                        {...formik.getFieldProps("cpassword")}
                                        className={handeleClasses(formik, "cpassword")}
                                        id="cpassword"
                                        placeholder="Confirm Your Password"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">
                                        Please Recheck Your Password.
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary w-100 mt-3">
                                    Signup
                                </button>
                                <p class="text-center mt-3">
                                    Already Have Account? <Link to="/">Login</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Ragister