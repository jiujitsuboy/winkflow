import { sendRequest } from "./apiOperations";

const getUserByName = (name, token) => {
  const query = {
    query: `
            query {
                getUserByName(name: "${name}") {
                    id
                    name
                    myInsurances {
                      startDate
                      endDate
                      insurance {
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
                        user{
                          id
                        }
                      }
                    }
                  }
            }
          `,
  };
  return sendRequest(query, token);
};

const getUser = (id, token) => {
  const query = {
    query: `
            query {
                getUser(id: ${id}) {
                    id
                    name
                    myInsurances {
                      startDate
                      endDate
                      insurance {
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
                        user{
                          id
                        }
                      }
                    }
                }
            }
          `,
  };
  return sendRequest(query, token);
};

const createUser = (name, token) => {
  const query = {
    query: `
            mutation {
              createUser(name:"${name}"){
                id
                name
              }
            }
          `,
  };
  return sendRequest(query, token);
};

export { getUserByName, getUser, createUser };
