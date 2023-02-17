const insuranceType = `
    type Insurance {
        id: Int!
        name: String!
        logo: String
        cost: Float!
        capacity: String
        chains: [Chain]!
        user: [User]!
    }
`

const insurancePaginated = `
        type InsurancePaginated {
            insurances: [Insurance]
            pageNum: Int
            totalRows: Int
        }
`

const insuranceInputData =`
        input InsuranceInputData {
            name: String!
            logo: String
            cost: Float!
            capacity: String
            chains: [Int]!
        }
`

const coverInputData = `
        input CoverInputData {
            insuranceId: Int!
            userId: Int!
            startDate: String
            endDate: String
        }
`

module.exports = { insuranceType, insurancePaginated, insuranceInputData, coverInputData}