const { buildSchema } = require("graphql");
const { userType, myInsuranceType, userPaginatedType } = require("./types/user");
const { insuranceType,  insurancePaginated, insuranceInputData, coverInputData } = require("./types/insurance");
const { chainType, chainPaginated, chainInputData } = require("./types/chain");

const rootQuery = `
    type RootQuery {
        getUser(id: Int!): User
        getUserByName(name: String!): User
        getInsurance(id: Int!): Insurance
        getInsurances(pageNum: Int, pageSize: Int): InsurancePaginated
        getChain(id: Int!): Chain
        getChains(pageNum: Int, pageSize: Int): ChainPaginated
    }
`;

const rootMutation = `
    type RootMutation {
        createUser(name: String): User!
        createInsurance(insuranceInput: InsuranceInputData!): Insurance!
        createChain(chainInput: ChainInputData!): Chain!
        buyCover(coverInput: CoverInputData!): Insurance
    }
`;

const graphqlSchema = buildSchema(`

    ${userType}
    ${myInsuranceType}
    ${userPaginatedType}

    ${insuranceType}
    ${insurancePaginated}
    ${insuranceInputData}
    ${coverInputData}

    ${chainType}
    ${chainPaginated}
    ${chainInputData}

    ${rootQuery}
    ${rootMutation}

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

module.exports = graphqlSchema;
