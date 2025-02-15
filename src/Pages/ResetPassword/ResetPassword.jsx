import axios from 'axios'
import { useFormik } from 'formik'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { object, string } from 'yup'
import { UserContext } from '../../Context/User.context'
import { Helmet } from 'react-helmet'

export default function ResetPassword() {
  const { token, setToken } = useContext(UserContext)
  let navigate = useNavigate()
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
  const validationSchema = object({
    email: string().required('Email is required').email('Invalid email'),
    newPassword: string()
      .required('Password is required')
      .matches(
        passwordRegex,
        'Password must be eight characters minimum, at least one upper case letter, one lower case letter, one number and one special character'
      ),
  })

  async function handleResetPassword(values) {
    let toastId = toast.loading('Resetting password...')

    try {
      const options = {
        url: 'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
        method: 'PUT',
        data: values,
      }
      let { data } = await axios.request(options)
      if (data.token) {
        toast.success('Password reset successfully')
        setToken(data.token)
        localStorage.setItem('token', data.token)
        setTimeout(() => {
          navigate('/')
        }, 2000)
      }
    } catch (error) {
      console.log(error)
    } finally {
      toast.dismiss(toastId)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
    },
    validationSchema,
    onSubmit: handleResetPassword,
  })

  return (
    <>
    <Helmet>
      <title>Reset Password</title>
    </Helmet>
      <h1 className="text-slate-600 text-2xl font-semibold mb-5">
        <i className="fa-solid fa-lock mr-3"></i>Reset your password
      </h1>

      <form
        className="flex flex-col items-center space-y-3 justify-center"
        onSubmit={formik.handleSubmit}
      >
        <div className="email w-full">
          <input
            type="email"
            className="form-control w-full py-4"
            placeholder="Email address"
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="mt-1 text-red-600">*{formik.errors.email}</p>
          )}
        </div>

        <div className="password w-full">
          <input
            type="password"
            className="form-control w-full py-4"
            placeholder="New password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            name="newPassword"
            onBlur={formik.handleBlur}
          />
          {formik.errors.newPassword && formik.touched.newPassword && (
            <p className="mt-1 text-red-600">*{formik.errors.newPassword}</p>
          )}
        </div>

        <button className="btn bg-primary-400 hover:bg-primary-600 text-white font-medium">
          Reset Password
        </button>
      </form>
    </>
  )
}
