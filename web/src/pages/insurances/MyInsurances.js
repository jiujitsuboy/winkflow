import React, { useContext, useEffect, useState } from "react";
import Insurance from "../../components/insurance/Insurance";
import { getUser } from "../../api/user";
import UserContext from "../../store/auth-context";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const MyInsurances = () => {
  const userContext = useContext(UserContext);
  const [insurances, setInsurances] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUserById = async () => {
    setLoading(true);
    const resp = await getUser(userContext.userId);
    if (resp.success && resp.data.getUser) {
      const insurances = resp.data.getUser.myInsurances.map(
        (myInsurance) => myInsurance.insurance
      );
      console.log("resp.data.myInsurances.insurance: ", insurances);

      setInsurances(insurances);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUserById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="main_label">My Insurances</div>
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
        {!loading &&
          insurances.map((insurance, index) => (
            <Insurance key={index} insurance={insurance} />
          ))}
      </div>
    </>
  );
};

export default MyInsurances;
