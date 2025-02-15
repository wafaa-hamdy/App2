import amazonPay from "../../assets/images/amazon-pay.png"
import americanExpress from "../../assets/images/American-Express-Color.png"
import masterCard from "../../assets/images/mastercard.webp"
import paypal from "../../assets/images/paypal.png"

import appStore from "../../assets/images/get-apple-store.png"
import googlePlay from "../../assets/images/get-google-play.png"

export default function Footer() {
  return <>
    <footer className="bg-slate-100 py-8">
      <div className="container space-y-4">
        <header>
          <h2 className="text-xl font-semibold text-slate-800 pb-2">Get the FreshCart App</h2>
          <p className="text-slate-400">We will send you a link, open it on your phone to download the app</p>
        </header>

        <div className="flex gap-2">
          <input type="email" className="form-control grow" placeholder="Email Address" />
          <button className="btn uppercase bg-primary-500 hover:bg-primary-700 text-white text-sm font-semibold">Share App Link</button>
        </div>

        <div className="flex justify-between items-center py-4 border-y-2 border-slate-300 border-opacity-50">
          <div className="payment-partners flex gap-3 items-center">
            <h3 className="pe-2">Payment Partners</h3>
            <img className="w-24" src={amazonPay} alt="" />
            <img className="w-24" src={americanExpress} alt="" />
            <img className="w-16" src={masterCard} alt="" />
            <img className="w-24" src={paypal} alt="" />
          </div>
          <div className="download flex gap-3 items-center">
            <h3 className="pe-2">Get Deliveries with FreshCart</h3>
            <img className="w-24" src={appStore} alt="" />
            <img className="w-[110px]" src={googlePlay} alt="" />
          </div>
        </div>
      </div>
    </footer>
  </>
}
