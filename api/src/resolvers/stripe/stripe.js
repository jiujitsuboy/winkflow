const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { getInsurance } = require("../insurance/insurances")
const {calculateCost} = require("../../utils/common")

const createPaymentIntent = async (coverInput) => {

  const insurance = await getInsurance(coverInput.insuranceId)
  console.log("insurance: ",insurance)
  if(!insurance){
    throw new Error(`Not a valid insurance `)
  }

  const period = (new Date(coverInput.endDate).getTime() - new Date(coverInput.startDate).getTime())/(1000*3600*24)
  const amount = parseInt(calculateCost(insurance.cost, period)) * coverInput.amount
  console.log("amount: ",amount)
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
  });

  return { clientSecret: paymentIntent.client_secret };
};

module.exports = { createPaymentIntent }
