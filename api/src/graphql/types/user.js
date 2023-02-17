const userType = `
    type User {
        id: Int!
        name: String!
        myInsurances: [MyInsurance]!
    }
`

const myInsuranceType = `
    type MyInsurance {
        startDate: String!
        endDate: String!
        insurance: Insurance!
    }
`

const userPaginatedType = `
    type UserPaginated {
            users: [User]
            pageNum: Int
            totalRows: Int
    }
`

module.exports = {userType, myInsuranceType, userPaginatedType}