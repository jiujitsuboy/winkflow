import React, { Fragment, useContext, useEffect, useState } from "react";
import { createPaymentIntent } from "../../api/stripe";
import { buyCover } from "../../api/insurance";
import { loadStripe } from "@stripe/stripe-js";
import UserContext from "../../store/auth-context";
import {
  CardElement,  
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import "./StripeCheckout.css";
import Insurance from "../../components/insurance/Insurance";
import Swal from "sweetalert2";


const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const userContext = useContext(UserContext);

  const insurance = userContext.insurance;
  const userId = userContext.userId;

  const createStripePaymentIntent = async (insurance) => {
    const id = insurance.insurance.id;
    const { period, amount } = insurance;
    const token = await userContext.getUserToken()

    let startDate = new Date();
    let endDate = new Date();
    endDate.setDate(startDate.getDate() + period);

    try {
      const responseCreatePaymentIntent = await createPaymentIntent(
        id,
        userId,
        startDate,
        endDate, 
        amount,
        token
      );
      if (
        responseCreatePaymentIntent.success &&
        responseCreatePaymentIntent.data.createPaymentIntent
      ) {        
        setClientSecret(
          responseCreatePaymentIntent.data.createPaymentIntent.clientSecret
        );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong, with the payment intent!'
        })
        console.log("Stripe error");
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error
      })
    }
  };

  useEffect(() => {
    createStripePaymentIntent(insurance);
    //eslint-disable-next-line
  }, []);

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      await assignCover();
    }
  };

  const assignCover = async () => {
    const id = insurance.insurance.id;
    const { period, amount } = insurance;
    const token = await userContext.getUserToken()

    let startDate = new Date();
    let endDate = new Date();
    endDate.setDate(startDate.getDate() + period);

    const resp = await buyCover(id, userContext.userId, startDate, endDate, amount, token);

    if (resp.success && resp.data.buyCover) {      
      Swal.fire({title:`${resp.data.buyCover.name} Purchased`, icon:'success'});
    }
  };

  return (
    <Fragment>
      <div>
        {succeeded && (
          <article>
            <h2>Thank you</h2>
            <h4>Your payment was successful</h4>
          </article>
        )}
        <Insurance insurance={insurance.insurance} hideButton={true} />
      </div>
      {!succeeded && (
        <div>
          <article>
            <p>
              <b>Your total price is: </b>
              {insurance.averageCost}
            </p>
            <p>
              <b>Test Card Number:</b> 4242 4242 4242 4242
            </p>
          </article>
          <form id="payment-form" onSubmit={handleSubmit}>
            <CardElement
              id="card-element"
              onChange={handleChange}
            ></CardElement>
            <button disabled={processing || disabled || succeeded} id="submit">
              <span id="button-test">
                {processing ? (
                  <div className="spinner" id="spinner"></div>
                ) : (
                  "Pay"
                )}
              </span>
            </button>
            {error && (
              <div className="card-error" role="alert">
                {error}
              </div>
            )}
            <p
              className={succeeded ? "result-message" : "result-message hidden"}
            >
              Payment succeeded, see the result in your{" "}
              <a
                href="https://dashboard.stripe.com/test/payments"
                alt="dashboard"
              >
                Stripe dashboard.
              </a>
            </p>
          </form>
        </div>
      )}
    </Fragment>
  );
};

const StripeCheckout = () => {
  return (
    <div className="centered" style={{height:"50vh"}}>
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default StripeCheckout;
