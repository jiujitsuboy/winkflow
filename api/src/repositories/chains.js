const prisma = require("./prismaClient/client");

class ChainRepo {
  constructor() {
    this.db = prisma;
  }

  getChain = async (id) => {
    let chain = null;
    try {
      chain = await this.db.chains.findUnique({
        where: {
          id: id,
        },
        include: {
          insurance: true,
        },
      });
    } catch (error) {
      console.log(error);
    }

    return chain;
  };

  getChains = async (pageNum, pageSize) => {
    let chainPaginated = null;
    try {
      const totalRows = await this.db.chains.count();

      const chains = await this.db.chains.findMany({
        orderBy: {
          name: "asc",
        },
        skip: pageNum * pageSize,
        take: pageSize,
        include: {
          insurance: true,
        },
      });

      chainPaginated = { chains, pageNum, totalRows };
    } catch (error) {
      console.log(error);
    }

    return chainPaginated;
  };

  createChain = async (name, url) => {
    const chainCreated = await this.db.chains.create({
      data: { name, url },
      include: {
        state: {
          include: {
            insurance: true,
          },
        },
      },
    });

    return chainCreated;
  };
}

module.exports = new ChainRepo();
