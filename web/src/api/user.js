import { sendRequest } from "./apiOperations";

const getUserByName = (name) => {
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
  return sendRequest(query, false);
};

const getUser = (id) => {
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
  return sendRequest(query, false);
};

const createUser = (name) => {
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
  return sendRequest(query, false);
};

export { getUserByName, getUser, createUser };
