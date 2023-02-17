const prisma = require("./prismaClient/client");

const assemblyInsurance = (insurance) => {
  return {
    id: insurance.id,
    name: insurance.name,
    logo: insurance.logo,
    cost: insurance.cost,
    capacity: insurance.capacity,
    chains: insurance.chains.map((chain) => {
      return {
        id: chain.chain.id,
        name: chain.chain.name,
        url: chain.chain.url,
      };
    }),
    user: insurance.userInsurance.map((userInsuranc) => {
      return {
        id: userInsuranc.user.id,
        name: userInsuranc.user.name,
        myInsurances: [],
      };
    }),
  };
};

class InsuranceRepo {
  constructor() {
    this.db = prisma;
  }

  getInsurance = async (id) => {
    let insurance = null;
    try {
      insurance = assemblyInsurance(
        await this.db.insurances.findUnique({
          where: {
            id: id,
          },
          include: {
            userInsurance: {
              include: {
                user: true,
              },
            },
            chains: {
              include: {
                chain: true,
              },
            },
          },
        })
      );
    } catch (error) {
      console.log(error);
    }

    return insurance;
  };

  getInsurances = async (pageNum, pageSize) => {
    let insurancesPaginated = null;
    try {
      const totalRows = await this.db.insurances.count();

      const insurances = await this.db.insurances.findMany({
        orderBy: {
          name: "asc",
        },
        skip: pageNum * pageSize,
        take: pageSize,
        include: {
          userInsurance: {
            include: {
              user: true,
            },
          },
          chains: {
            include: {
              chain: true,
            },
          },
        },
      });

      insurancesPaginated = {
        insurances: insurances.map((insurance) => assemblyInsurance(insurance)),
        pageNum,
        totalRows,
      };
    } catch (error) {
      console.log(error);
    }

    return insurancesPaginated;
  };

  createInsurance = async (name, logo, cost, capacity, chains) => {
    return prisma.$transaction(async (tx) => {
      const insuranceCreated = await tx.insurances.create({
        data: { name, logo, cost, capacity },
      });

      if (chains.length > 0) {

        const insuranceChains = chains.map((chain) => {
          return {
            chainId: chain,
            insuranceId: insuranceCreated.id,
          };
        });

        await tx.insuranceChains.createMany({
          data: insuranceChains,
        });
      }

      const insurance = {
        ...insuranceCreated,
        chains: chains.map((chain) => {
          return {
            id: chain,
            name: "",
            url:""
          };
        }),
        user: [],
      };

      return insurance;
    });
  };

  buyCover = async (insuranceId, userId, startDate, endDate) => {
    const coverCreated = await this.db.userInsurances.create({
      data: { insuranceId, userId, startDate, endDate },
      include: {
        insurance: {
          include: {
            userInsurance: {
              include: {
                user: true,
              },
            },
            chains: {
              include: {
                chain: true,
              },
            },
          }
        }
      },
    });
    
    return assemblyInsurance(coverCreated.insurance);
  };
}

module.exports = new InsuranceRepo();
