import axios from 'axios'
import { useFormik } from 'formik'
import { Helmet } from 'react-helmet'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { object, string } from 'yup'

export default function ForgotPassword() {
  let navigate = useNavigate()
  const validationSchema = object({
    email: string().required("Email is required").email("Invalid email")
  })

  async function handleForgetPassword(values) {
    let toastId = toast.loading("Sending verification code")
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        method: "POST",
        data: values,
      }
      let {data} = await axios.request(options)
      if(data.statusMsg == "success"){
        toast.success("Verification code sent")
        setTimeout(()=>{navigate("/verifyemail")}, 2000)
      }
    } catch (error) {
      toast.error("Email doesn't exist in our database")
    } finally {
      toast.dismiss(toastId)
    }
    
  }

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: handleForgetPassword,
  })

  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      <h1 className="text-slate-600 text-2xl font-semibold mb-5">
        <i className="fa-solid fa-envelope mr-3"></i>Please enter your Email to
        verify
      </h1>

      <form className="flex flex-col items-center space-y-3 justify-center" onSubmit={formik.handleSubmit}>
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

        <button type='submit' className="btn bg-primary-400 hover:bg-primary-600 text-white font-medium">
          Send Verification Code
        </button>
      </form>
    </>
  )
}
