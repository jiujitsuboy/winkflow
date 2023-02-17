const { Prisma } = require("@prisma/client");

const user1 = {
  id: 1,
  name: "user1@gmail.com",
  myInsurances: [
    {
      id: 1,
      userId: 2,
      startDate: "2023-02-01",
      endDate: "2024-02-01",
    },
  ],
};

const user2 = {
  id: 2,
  name: "user2@gmail.com",
  myInsurances: [
    {
      id: 1,
      userId: 2,
      startDate: "2023-01-01",
      endDate: "2023-04-01",
    },
  ],
};

const chain1 = {
  id: 1,
  name: "chain1",
  url: "/chain1.png",
};

const chain2 = {
  id: 1,
  name: "chain1",
  url: "/chain1.png",
};

const users = [user1, user2];
const chains = [chain1, chain2];

const insurance1 = {
  id: 1,
  name: "insurance1",
  logo: "/insurance1.png",
  cost: 2.87,
  capacity: "112 ETH/ 193.6k DAI",
  userInsurance: [
    {
      id:1,
      userId:1,
      insuranceId: 1,
      startDate:"2023-01-01",
      endDate:"2024-01-01",
      user: user1,
    },
  ],
  chains: [
    {
      id: 1,
      insuranceId: 1,
      chainId: chain1.id,
      chain: chain1,
    },
    {
      id: 2,
      insuranceId: 1,
      chainId: chain2.id,
      chain: chain2,
    },
  ],
};

const insurance2 = {
  id: 2,
  name: "insurance2",
  logo: "/insurance2.png",
  cost: 3.56,
  capacity: "116 ETH/ 123.2k DAI",
  userInsurance: [
    {
      id:2,
      userId:2,
      insuranceId: 2,
      startDate:"2023-01-01",
      endDate:"2023-04-01",
      user: user2,
    },
  ],
  chains: [
    {
      id: 1,
      insuranceId: 2,
      chainId: chain1.id,
      chain: chain1,
    },
    {
      id: 2,
      insuranceId: 2,
      chainId: chain2.id,
      chain: chain2,
    },
  ],
};

const insurances = [insurance1, insurance2];

module.exports = { users, chains, insurances };
