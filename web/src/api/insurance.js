import { sendRequest } from "./apiOperations";

const getInsurances = (pageNum = 0, pageSize = 1000) => {
  const query = {
    query: `
            query {
              getInsurances(pageNum: ${pageNum}, pageSize: ${pageSize}) {
                insurances {
                  id
                  name
                  logo
                  cost
                  capacity
                  chains {
                    id
                    name
                    url
                  }
                  user {
                    id
                    name
                    myInsurances {
                      startDate
                      endDate
                    }
                  }
                }
                pageNum
                totalRows
              }
            }
          `,
  };
  return sendRequest(query, false);
};

const getInsurance = (id) => {
  const query = {
    query: `
            query {
              getInsurance(id: ${id}) {
                id
                name
                logo
                cost
                capacity
                chains {
                  id
                  name
                  url
                }
                user {
                  id
                  name
                  myInsurances {
                    startDate
                    endDate
                  }
                }
              }
            }
          `,
  };
  return sendRequest(query, false);
};

const buyCover = (insuranceId, userId, startDate, endDate, amount, token) => {
  const query = {
    query: `
            mutation {
              buyCover(coverInput:{insuranceId:${insuranceId}, userId:${userId}, startDate:"${startDate}", endDate:"${endDate}",amount:${amount}}){
                id
                name
                logo
                cost
                capacity
                chains{
                  id
                  name
                  url
                }
                user {
                  id
                  name
                }
              }
            }
          `,
  };
  return sendRequest(query, token);
};

export { getInsurances, getInsurance, buyCover };
