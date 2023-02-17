const { getInsurance, getInsurances, createInsurance, buyCover } = require("./insurances")
const { insurances } = require("../../test/testData")
const prisma = require("../../repositories/prismaClient/client")
const { getPrismaMock } = require("../../repositories/prismaClient/singleton");
const { getChains } = require("../../graphql/resolvers");

jest.mock("../../repositories/prismaClient/client");
const prismaMock = getPrismaMock(prisma);

describe("Test insurance CRUD", () => {
  it("get one insurance", async () => {
    const insuranceId = 1;

    prismaMock.insurances.findUnique.mockResolvedValue(insurances[0]);

    const insuranceRetrieved = await getInsurance(insuranceId);
    expect(insuranceRetrieved).toBeTruthy();
    expect(insuranceRetrieved?.id).toBe(insuranceId);
  });
  it("fail to get one insurance", async () => {
    const insuranceId = 1;

    prismaMock.insurances.findUnique.mockRejectedValue(new Error("error"));

    const insuranceRetrieved = await getInsurance(insuranceId);
    expect(insuranceRetrieved).toBeFalsy()
  });
  it("get all insurances", async () => {
    const pageNum = 0;
    const pageSize = 10;

    prismaMock.insurances.count.mockResolvedValue(insurances.length);
    prismaMock.insurances.findMany.mockResolvedValue(insurances);

    const insurancesRetrieved = await getInsurances(pageNum, pageSize);
    expect(insurancesRetrieved).toBeTruthy();
    expect(insurancesRetrieved?.totalRows).toBe(insurances.length);
  });
  it("fail to get all insurance", async () => {
    const pageNum = 0;
    const pageSize = 10;

    prismaMock.insurances.count.mockRejectedValue(new Error("error"));

    const insurancesRetrieved = await getInsurances(pageNum, pageSize);
    expect(insurancesRetrieved).toBeFalsy()
  });
  it("create a new insurance", async () => {

    prismaMock.insurances.create.mockResolvedValue(insurances[0])
    prismaMock.insuranceChains.createMany.mockResolvedValue(2)
    prismaMock.$transaction.mockImplementation((callback)=>callback(prismaMock))

    const insuranceCreated = await createInsurance(insurances[0])
    expect(insuranceCreated).toBeTruthy()
    expect(insuranceCreated?.id).toBeTruthy()
  });
  it("buy a coverage", async () => {
    const insuranceId = 1;
    const userId = 1;
    const startDate = "2023-01-01"
    const endDate = "2024-01-01"
    prismaMock.userInsurances.create.mockResolvedValue({insurance: insurances[0]})

    const buyCoverCreated = await buyCover({insuranceId, userId, startDate, endDate})
    expect(buyCoverCreated).toBeTruthy()
    expect(buyCoverCreated?.id).toBeTruthy()
  });
});
