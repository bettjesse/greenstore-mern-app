import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CheckoutSteps from "./CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../actions/orderAction";
import { useDispatch } from "react-redux";


const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch()

  const orderInfo= JSON.parse(sessionStorage.getItem("orderData"))
  const paymentData= {
    amount:Math.round(orderInfo.totalPrice* 100)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        email: email,
      },
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);

      try {
        const response = await fetch("http://localhost:4000/api/v1/payment/process", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData) 
        });

        if (!response.ok) {
          throw new Error("Failed to fetch client secret.");
        }

        const data = await response.json();
        console.log("[client_secret]", data.client_secret);
        
        const clientSecret= data.client_secret 

        if (!stripe|| !elements){

          return
        }

        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              email: email,
            },
          },
        });

        if (result.error) {
          console.log("[error]", result.error);
        } else {
          console.log("[PaymentIntent]", result.paymentIntent);
          console.log("intent", result.paymentIntent.status);
          const orderData = {
            ...orderInfo,
            paymentInfo:{
                id:result.paymentIntent.status,
                status: result.paymentIntent.status
            } 
          };
          dispatch(createOrder(orderData));
         
          // Redirect to success page
          navigate("/success");
        }
      } catch (error) {
        console.error(error);
      }
    }
  
    

  };

  return (
    <div>
      <CheckoutSteps shipping confirmOrder payment />
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@domain.com"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="cardElement">
            Credit or debit card
          </label>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <CardElement id="cardElement" />
          </div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={!stripe}
        >
          Pay{`-${orderInfo&& orderInfo.totalPrice}`}
        </button>
      </form>
    </div>
  );
};

export default Payment;
