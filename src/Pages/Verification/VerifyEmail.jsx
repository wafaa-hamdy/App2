import axios from 'axios'
import { useFormik } from 'formik'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { object, string } from 'yup'
import { UserContext } from '../../Context/User.context'
import { Helmet } from 'react-helmet'

export default function VerifyEmail() {
  const {token , setToken} = useContext(UserContext)
  let navigate = useNavigate()
  const validationSchema = object({
    resetCode: string().required("Please enter your verification code").matches(/^\d{4,8}$/, "The reset code must be between 4 and 8 numbers.")
  })

  async function handleCode(values){
    let toastId = toast.loading("Verifying")

    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method: "POST",
        data: values,
      }
      let {data} = await axios.request(options)
      if(data.status == 'Success'){
        setToken(data.token)
        localStorage.setItem("token", data.token)
        toast.success("Email Verified")
        setTimeout(()=>{navigate('/resetpassword')},2000)
      }
    } catch (error) {
      toast.error("Invalid Code")
      console.log(error)
    } finally {
      toast.dismiss(toastId)
    }
  }

  const formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    validationSchema,
    onSubmit: handleCode,
  })

  return (
    <>
    <Helmet>
      <title>Verify Email</title>
    </Helmet>
      <h1 className="text-slate-600 text-2xl font-semibold mb-5">
        <i className="fa-solid fa-lock mr-3"></i>Please enter verification code
      </h1>

      <form
        className="flex flex-col items-center space-y-3 justify-center"
        onSubmit={formik.handleSubmit}
      >
        <input
          type="tel"
          className="form-control w-full py-4"
          placeholder="Verification code"
          value = {formik.values.resetCode}
          onChange={formik.handleChange}
          name= "resetCode"
          onBlur={formik.handleBlur}
        />
        {formik.errors.resetCode && formik.touched.resetCode && (
          <p className="mt-1 text-red-600">*{formik.errors.resetCode}</p>
        )}
        <button
          type="submit"
          className="btn bg-primary-400 hover:bg-primary-600 text-white font-medium"
        >
        Verify
        </button>
      </form>
    </>
  )
}
