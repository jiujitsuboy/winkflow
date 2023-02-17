import React, { useEffect, useState } from "react";
import Insurance from "../../components/insurance/Insurance";
import { getInsurances } from "../../api/insurance";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const Insurances = () => {
  const [insurances, setInsurances] = useState([]);
  const [loading, setLoading] = useState(false);

  const getInsurancesRange = async () => {
    setLoading(true);
    const resp = await getInsurances();
    if (resp.success && resp.data.getInsurances) {

      const insurances = resp.data.getInsurances.insurances

      setInsurances(insurances);
    }
    setLoading(false);
  };

  useEffect(() => {
    getInsurancesRange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="main_label">Available Insurances</div>
      {loading && (
          <div className="centered">
            <LoadingSpinner />
          </div>
        )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          justifyItems: "center",
        }}
      >
        {!loading &&insurances.map((insurance, index) => (
          <Insurance key={index} insurance={insurance} />
        ))}
      </div>
    </>
  );
};

export default Insurances;
