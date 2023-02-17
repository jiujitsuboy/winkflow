const prisma = require("./prismaClient/client");

const assemblyUser = (user) => {
  const u = {
    id: user.id,
    name: user.name,
    myInsurances: user.myInsurances.map((myInsurance) => {
      return {
        startDate: myInsurance.startDate,
        endDate: myInsurance.endDate,
        insurance: {
          id: myInsurance.insurance.id,
          name: myInsurance.insurance.name,
          logo: myInsurance.insurance.logo,
          cost: myInsurance.insurance.cost,
          capacity: myInsurance.insurance.capacity,
          chains: myInsurance.insurance.chains.map((chain) => {
            return {
              id: chain.chain.id,
              name: chain.chain.name,
              url: chain.chain.url,
            };
          }),
          user: []
        },
      };
    }),
  };

  return u;
};

class UserRepo {
  constructor() {
    this.db = prisma;
  }

  getUser = async (id) => {
    let user = null;
    try {
      user = await this.db.users.findUnique({
        where: {
          id: id,
        },
        include: {
          myInsurances: {
            include: {
              insurance: {
                include: {
                  chains: {
                    include: {
                      chain: true
                    }
                  }
                }
              }
            },
          },
        },
      });
      user = assemblyUser(user);
    } catch (error) {
      console.log(error);
    }

    return user;
  };

  getUserByName = async (name) => {
    let user = null;
    try {
      user = await this.db.users.findUnique({
        where: {
          name: name,
        },
        include: {
          myInsurances: {
            include: {
              insurance: {
                include: {
                  chains: {
                    include: {
                      chain: true
                    }
                  }
                }
              }
            },
          },
        },
      });
      user = assemblyUser(user);
    } catch (error) {
      console.log(error);
    }

    return user;
  };

  createUser = async (name) => {
    const userCreated = await this.db.users.create({
      data: { name },
      include: {
        myInsurances: {
          include: {
            insurance: {
              include: {
                chains: {
                  include: {
                    chain: true
                  }
                }
              }
            }
          },
        },
      },
    });

    return userCreated;
  };
}

module.exports = new UserRepo();
