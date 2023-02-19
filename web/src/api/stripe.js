import { sendRequest } from "./apiOperations";

const createPaymentIntent = (insuranceId, userId,startDate,endDate, amount, token) => {
  const query = {
    query: `
            mutation {
              createPaymentIntent(coverInput:{insuranceId:${insuranceId}, userId:${userId},startDate: "${startDate}", endDate: "${endDate}", amount:${amount} }){
                clientSecret
              }
            }
          `,
  };
  return sendRequest(query, token);
};

export { createPaymentIntent };
