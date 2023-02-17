
const insuranceRepo = require("../../repositories/insurances")

const getInsurance = async (id) => {
    return insuranceRepo.getInsurance(id);
};

const getInsurances = async (pageNum, pageSize) => {
    return insuranceRepo.getInsurances(pageNum, pageSize);
};

const createInsurance = async ({name, logo, cost, capacity, chains}) => {
    return insuranceRepo.createInsurance(name, logo, cost, capacity, chains);
};

const buyCover = async ({insuranceId, userId, startDate, endDate}) => {
    return insuranceRepo.buyCover(insuranceId, userId, new Date(startDate), new Date(endDate))
}

module.exports = { getInsurance, getInsurances, createInsurance, buyCover}