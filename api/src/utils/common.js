const calculateCost = (cost, period) => {
    
  let averageCost = cost

  if (period) {
    const rate = period / 365;
    if (rate > 1) {
      averageCost = cost - cost * 0.5;
    } else {
      averageCost = cost + cost * (1 - rate);
    }
  }

  return averageCost
};

module.exports = { calculateCost }
