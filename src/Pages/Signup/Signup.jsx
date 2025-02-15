import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";

export default function Signup() {
  let navigate = useNavigate()

  const [emailExistError, setEmailExistError] = useState(null)



  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
  const phoneRegex = /^(02)?01[0125][0-9]{8}$/

  const validationSchema = object({
    name: string().required("Name is required").min(3, "Name must be at least 3 letters.").max(25, "Name cannot be more than 25 character."),
    email: string().required("Email is required").email("Invalid email"),
    password: string().required("Password is required").matches(passwordRegex, "Password must be eight characters minimum, at least one upper case letter, one lower case letter, one number and one special character"),
    rePassword: string().required("Confirm Password is required").oneOf([ref("password")], "Repassword must match with password."),
    phone: string().required("Phone is required").matches(phoneRegex, "Phone must be Egyptian phone number."),
  })

  async function handleRegister(values){
    let toastId = toast.loading("waiting")


    try{
      const options ={
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      }
      let {data} = await axios.request(options)
      if(data.message == "success"){
        toast.success("Account created successfully")
        setTimeout(()=> {navigate("/login")}, 2000)
      }
    } catch(error){
      setEmailExistError(error.response.data.message)
      toast.error(error.response.data.message)
    } finally{
      toast.dismiss(toastId)
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },

    validationSchema,

    onSubmit: handleRegister,
  });

  return (
    <>
    <Helmet>
      <title>Register</title>
    </Helmet>
      <h1 className="text-slate-600 text-2xl font-semibold mb-5">
        <i className="fa-regular fa-circle-user mr-3"></i>Register Now</h1>
      <form className="space-y-3 flex flex-col items-center justify-center" onSubmit={formik.handleSubmit}>
        <div className="name w-full">
          <input
            type="text"
            className="form-control w-full"
            placeholder="Type your name"
            value={formik.values.name}
            onChange={formik.handleChange}
            name="name"
            onBlur={formik.handleBlur}
          />

          {formik.errors.name && formik.touched.name && <p className="mt-1 text-red-600">*{formik.errors.name}</p>}
        </div>

        <div className="email w-full">
          <input
            type="email"
            className="form-control w-full"
            placeholder="Email Address"
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && <p className="mt-1 text-red-600">*{formik.errors.email}</p>}
          {emailExistError && <p className="mt-1 text-red-600">*{emailExistError}</p>}
        </div>

        <div className="password w-full">
          <input
            type="password"
            className="form-control w-full"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            name="password"
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && <p className="mt-1 text-red-600">*{formik.errors.password}</p>}
        </div>

        <div className="rePassword w-full">
          <input
            type="password"
            className="form-control w-full"
            placeholder="Re-Password"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            name="rePassword"
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword && <p className="mt-1 text-red-600">*{formik.errors.rePassword}</p>}
        </div>

        <div className="phone w-full">
          <input
            type="tel"
            className="form-control w-full"
            placeholder="Phone Number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            name="phone"
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone && <p className="mt-1 text-red-600">*{formik.errors.phone}</p>}
        </div>

        <button type="submit" className="btn self-center text-white font-semibold w-1/4 bg-primary-400 hover:bg-primary-600 ">Sign Up</button>
      </form>
    </>
  );
}
