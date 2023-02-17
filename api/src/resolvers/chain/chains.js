
const chainRepo = require("../../repositories/chains")

const getChain = async (id) => {
    return chainRepo.getChain(id);
};

const getChains = async (pageNum, pageSize) => {
    return chainRepo.getChains(pageNum, pageSize);
};

const createChain = async ({name, url}) => {
    return chainRepo.createChain(name, url);
};

module.exports = { getChain, getChains, createChain}