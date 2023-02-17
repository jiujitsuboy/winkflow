const { getUser, getUserByName, createUser } = require("./users")
const { users } = require("../../test/testData")
const prisma = require("../../repositories/prismaClient/client")
const { getPrismaMock } = require("../../repositories/prismaClient/singleton");

jest.mock("../../repositories/prismaClient/client");
const prismaMock = getPrismaMock(prisma);

describe("Test user CRUD", () => {
  it("get one user by id", async () => {
    const userId = 1;

    prismaMock.users.findUnique.mockResolvedValue(users[0]);

    const userRetrieved = await getUser(userId);
    expect(userRetrieved).toBeTruthy();
    expect(userRetrieved?.id).toBe(userId);
  });
  it("fail to get one user by id", async () => {
    const userId = 1;

    prismaMock.users.findUnique.mockRejectedValue(new Error("error"));

    const userRetrieved = await getUser(userId);
    expect(userRetrieved).toBeFalsy()
  });
  it("get one user by name", async () => {
    const name = "user1@gmail.com";

    prismaMock.users.findUnique.mockResolvedValue(users[0]);

    const userRetrieved = await getUserByName(name);
    expect(userRetrieved).toBeTruthy();
    expect(userRetrieved?.name).toBe(name);
  });
  it("fail to get one user by name", async () => {
    const name = "user1@gmail.com";

    prismaMock.users.findUnique.mockRejectedValue(new Error("error"));

    const userRetrieved = await getUserByName(name);
    expect(userRetrieved).toBeFalsy()
  });
  it("create a new user", async () => {

    prismaMock.users.create.mockResolvedValue(users[1])

    const name = "user@email.com"
    const userCreated = await createUser(name)
    expect(userCreated).toBeTruthy()
    expect(userCreated?.id).toBeTruthy()
  });
});
