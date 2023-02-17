const { PrismaClient } = require('@prisma/client')
const { mockDeep, mockReset, DeepMockProxy } = require('jest-mock-extended')

const prisma = new PrismaClient()

const prismaMock= mockDeep()

beforeEach(() => {
  mockReset(prismaMock)
})

module.exports = prismaMock