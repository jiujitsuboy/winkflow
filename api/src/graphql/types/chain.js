const chainType = `
    type Chain {
        id: Int!
        name: String!
        url: String!
    }
`

const chainInputData =`
    input ChainInputData {
            name: String!
            url: String!
    }
`

const chainPaginated = `
    type ChainPaginated {
            chains: [Chain]
            pageNum: Int
            totalRows: Int
    }
`

module.exports = { chainType, chainInputData, chainPaginated }