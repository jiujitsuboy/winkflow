
const {getUser, getUserByName, createUser} = require("../resolvers/user/users")
const {getChain, getChains, createChain} = require("../resolvers/chain/chains")
const {getInsurance, getInsurances, createInsurance, buyCover} = require("../resolvers/insurance/insurances");

module.exports = {
    //USER
    async getUser(args, req) {
        // await validateAuthenticationWithoutAuthorization(req)
        const id = args.id;

        return getUser(id);
    },
    async getUserByName(args, req) {
        // await validateAuthenticationWithoutAuthorization(req)
        const name = args.name;

        return getUserByName(name);
    },
    async createUser(args, req) {
        const name = args.name

        return createUser(name)

    },
    //CHAIN
    async getChain(args, req) {
        // await validateAuthenticationWithoutAuthorization(req)
        const id = args.id;

        return getChain(id);
    },
    async getChains(args, req) {
        // await validateAuthenticationWithoutAuthorization(req)
        const pageNum = args.pageNum || 0
        const pageSize = args.pageSize || 10

        return getChains(pageNum, pageSize);
    },

    async createChain(args, req) {
        const chainInput = args.chainInput

        return createChain(chainInput)

    },
    //INSURANCE
    async getInsurance(args, req) {
        // await validateAuthenticationWithoutAuthorization(req)
        const id = args.id;

        return getInsurance(id);
    },
    async getInsurances(args, req) {
        // await validateAuthenticationWithoutAuthorization(req)
        const pageNum = args.pageNum || 0
        const pageSize = args.pageSize || 10

        return getInsurances(pageNum, pageSize);
    },

    async createInsurance(args, req) {
        const insuranceInput = args.insuranceInput

        return createInsurance(insuranceInput)
    },
    async buyCover(args, req) {
        const coverInput = args.coverInput

        return buyCover(coverInput)
    }
}