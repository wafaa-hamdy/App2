import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import * as Yup from 'yup'
import { CartContext } from '../../Context/Cart.context'
import { UserContext } from '../../Context/User.context'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Checkout() {
  const { cartInfo } = useContext(CartContext)
  const { token } = useContext(UserContext)
  const navigate = useNavigate()

  const [paymentMethod, setPaymentMethod] = useState('null')

  // * Cash payment
  async function createCashOrder(values) {
    let toastId = toast.loading('We are creating your order')
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
        method: 'POST',
        headers: {
          token,
        },
        data: values,
      }

      let { data } = await axios.request(options)
      if (data.status == 'success') {
        toast.success('Order created successfully')
        setTimeout(() => {
          navigate('/allorders')
        }, 2000)
      }
    } catch (error) {
      console.log(error)
    } finally {
      toast.dismiss(toastId)
    }
  }

  // * Online payment
  async function createOnlineOrder(values) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
        method: 'POST',
        headers: {
          token,
        },
        data: values,
      }
      let { data } = await axios.request(options)
      
      if (data.status == 'success') {
        let toastId = toast.loading('Redirecting to payment gateway')
        setTimeout(() => {
          location.href = data.session.url
        }, 2000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const phoneRegex = /^(02)?01[0125][0-9]{8}$/

  const validationSchema = Yup.object({
    shippingAddress: Yup.object({
      phone: Yup.string()
        .required('Phone is required')
        .matches(phoneRegex, 'Phone must be a valid Egyptian phone number.'),
      city: Yup.string()
        .required('City is required')
        .min(3, 'City name must be at least 3 characters long'),
      details: Yup.string()
        .required('Address details are required')
        .min(10, 'Address details must be at least 10 characters long')
        .max(200, "Address details can't exceed 200 characters"),
    }),
  })

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: '',
        phone: '',
        city: '',
      },
    },

    validationSchema,

    onSubmit: (values)=>{
        if(paymentMethod == "cash") createCashOrder(values);
        else createOnlineOrder(values)
    }
  })

  return (
    <>
    <Helmet>
      <title>Checkout</title>
    </Helmet>
      <section>
        <h1 className="text-slate-600 text-2xl font-semibold mb-5">
          <i className="fa-solid fa-truck mr-3"></i>
          Shipping Address
        </h1>

        <form
          className="space-y-3 flex flex-col items-center justify-center"
          onSubmit={formik.handleSubmit}
        >
          <div className="city w-full">
            <input
              type="text"
              className="form-control w-full"
              placeholder="City"
              value={formik.values.shippingAddress.city}
              onChange={formik.handleChange}
              name="shippingAddress.city"
              onBlur={formik.handleBlur}
            />
            {formik.errors.shippingAddress?.city &&
              formik.touched.shippingAddress?.city && (
                <p className="mt-1 text-red-600">
                  *{formik.errors.shippingAddress.city}
                </p>
              )}
          </div>

          <div className="phone w-full">
            <input
              type="tel"
              className="form-control w-full"
              placeholder="Phone Number"
              value={formik.values.shippingAddress.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="shippingAddress.phone"
            />
            {formik.errors.shippingAddress?.phone &&
              formik.touched.shippingAddress?.phone && (
                <p className="mt-1 text-red-600">
                  *{formik.errors.shippingAddress.phone}
                </p>
              )}
          </div>

          <div className="details w-full">
            <textarea
              className="form-control w-full"
              placeholder="Address Details"
              value={formik.values.shippingAddress.details}
              onChange={formik.handleChange}
              name="shippingAddress.details"
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.errors.shippingAddress?.details &&
              formik.touched.shippingAddress?.details && (
                <p className="mt-1 text-red-600">
                  *{formik.errors.shippingAddress.details}
                </p>
              )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setPaymentMethod('cash')
              }}
              type="submit"
              className="btn bg-blue-500 hover:bg-blue-700 text-white font-semibold"
            >
              Cash On Delivery
            </button>
            <button
              onClick={() => {
                setPaymentMethod('online')
              }}
              type="submit"
              className="btn bg-lime-500 hover:bg-lime-700 text-white font-semibold"
            >
              Online Payment
            </button>
          </div>
        </form>
      </section>
    </>
  )
}
