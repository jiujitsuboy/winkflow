const { PrismaClient } = require('@prisma/client')
const { DeepMockProxy } = require('jest-mock-extended')

const getPrismaMock = (prisma) => {
  return prisma
}

module.exports = {getPrismaMock}
