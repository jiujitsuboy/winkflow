const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { getInsurance } = require("../insurance/insurances");
const { calculateCost } = require("../../utils/common");

const createPaymentIntent = async (coverInput) => {
  const insurance = await getInsurance(coverInput.insuranceId);

  if (!insurance) {
    throw new Error(`Not a valid insurance `);
  }

  const period =
    +(new Date(coverInput.endDate).getTime() -
      new Date(coverInput.startDate).getTime()) /
    (1000 * 3600 * 24);

  let amount = calculateCost(+insurance.cost, period);
  amount = amount * +coverInput.amount;
  amount = Math.round(amount);
  console.log("amount calculated: ", amount);

  //Stripe dont allow values below 50
  if (amount < 50) {
    amount = 50;
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
  });

  return { clientSecret: paymentIntent.client_secret };
};

module.exports = { createPaymentIntent };
