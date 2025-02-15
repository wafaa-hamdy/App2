import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";
import { UserContext } from "../../Context/User.context";
import { Helmet } from "react-helmet";

export default function Login() {

  const {token, setToken} = useContext(UserContext)





  let navigate = useNavigate()

  const [loginError, setloginError] = useState(null)

  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/


  const validationSchema = object({
    email: string().required("Email is required").email("Invalid email"),
    password: string().required("Password is required").matches(passwordRegex, "Password must be eight characters minimum, at least one upper case letter, one lower case letter, one number and one special character"),
  })

  async function handleLogin(values){
    let toastId = toast.loading("waiting")


    try{
      const options ={
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      }
      let {data} = await axios.request(options)
      if(data.message == "success"){
        setToken(data.token);
        localStorage.setItem("token", data.token)
        toast.success("User logged in successfully")
        setTimeout(()=>{navigate("/")},2000)
      }

    } catch(error){
      setloginError(error.response.data.message)
      toast.error("Invalid email or password")
    } finally{
      toast.dismiss(toastId)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema,

    onSubmit: handleLogin,
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <h1 className="text-slate-600 text-2xl font-semibold mb-5">
        <i className="fa-regular fa-circle-user mr-3"></i>Login Now</h1>
      <form className="space-y-3 flex flex-col items-center justify-center" onSubmit={formik.handleSubmit}>

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
          {loginError && <p className="mt-1 text-red-600">*{loginError}</p> }
        </div>

        <button type="submit" className="btn self-center text-white font-semibold w-1/4  bg-primary-400 hover:bg-primary-600 ">Login</button>
        <p className="font-semibold text-primary-500 hover:text-primary-700"><Link to={"/forgotpassword"}>Forgot password?</Link></p>
      </form>
    </>
  );
}
