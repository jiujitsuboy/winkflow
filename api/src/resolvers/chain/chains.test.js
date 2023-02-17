const { getChain, getChains, createChain } = require("./chains")
const { chains } = require("../../test/testData")
const prisma = require("../../repositories/prismaClient/client")
const { getPrismaMock } = require("../../repositories/prismaClient/singleton");

jest.mock("../../repositories/prismaClient/client");
const prismaMock = getPrismaMock(prisma);

describe("Test chain CRUD", () => {
  it("get one chain", async () => {
    const chainId = 1;

    prismaMock.chains.findUnique.mockResolvedValue(chains[0]);

    const chainRetrieved = await getChain(chainId);
    expect(chainRetrieved).toBeTruthy();
    expect(chainRetrieved?.id).toBe(chainId);
  });
  it("fail to get one chain", async () => {
    const chainId = 1;

    prismaMock.chains.findUnique.mockRejectedValue(new Error("error"));

    const chainRetrieved = await getChain(chainId);
    expect(chainRetrieved).toBeFalsy()
  });
  it("get all chains", async () => {
    const pageNum = 0;
    const pageSize = 10;

    prismaMock.chains.count.mockResolvedValue(chains.length);
    prismaMock.chains.findMany.mockResolvedValue(chains);

    const chainsRetrieved = await getChains(pageNum, pageSize);
    expect(chainsRetrieved).toBeTruthy();
    expect(chainsRetrieved?.totalRows).toBe(chains.length);
  });
  it("fail to get all chain", async () => {
    const pageNum = 0;
    const pageSize = 10;

    prismaMock.chains.count.mockRejectedValue(new Error("error"));

    const chainsRetrieved = await getChains(pageNum, pageSize);
    expect(chainsRetrieved).toBeFalsy()
  });
  it("create a new chain", async () => {

    prismaMock.chains.create.mockResolvedValue(chains[0])

    const userCreated = await createChain(chains[0].name,chains[0].url)
    expect(userCreated).toBeTruthy()
    expect(userCreated?.id).toBeTruthy()
  });
});
