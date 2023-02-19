import React, { useContext, useEffect, useState } from "react";
import Insurance from "../../components/insurance/Insurance";
import { getUser } from "../../api/user";
import { getUserByName, createUser } from "../../api/user";
import UserContext from "../../store/auth-context";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { useAuth0 } from "@auth0/auth0-react";

const MyInsurances = () => {
  const userContext = useContext(UserContext);
  const [insurances, setInsurances] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth0();

  const getUserIdByName = async (name) => {
    setLoading(true);
    let userId;
    // const token = await getAccessTokenSilently()
    const token = await userContext.getUserToken();
    const resp = await getUserByName(name, token);

    if (resp.success && resp.data.getUserByName) {
      userId = resp.data.getUserByName.id;
      userContext.storeUserId(userId);
      getUserById(userId, token);
    } else {
      const resp = await createUser(name);
      if (resp.success && resp.data.createUser) {
        userId = resp.data.createUser;
      }
    }
    setLoading(false);
  };

  const getUserById = async (userId, token) => {
    const resp = await getUser(userId, token);
    if (resp.success && resp.data.getUser) {
      const insurances = resp.data.getUser.myInsurances.map(
        (myInsurance) => myInsurance.insurance
      );
      setInsurances(insurances);
    }
  };

  useEffect(() => {
    if (user) {
      getUserIdByName(user.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <div className="main_label">My Insurances</div>
      {loading ? (
        <div className="centered">
          <LoadingSpinner />
        </div>
      ) : insurances.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            justifyItems: "center",
          }}
        >
          {insurances.map((insurance, index) => (
            <Insurance key={index} insurance={insurance} hideButton={true} />
          ))}
        </div>
      ) : (
        <div
          className="centered"
          style={{
            border: "1px solid #ccc",
            borderRadius: "20px",
            height: "20vh",
            width: "60rem",
            boxShadow: "5px 3px 5px #ccc",
            flexDirection: "column",
          }}
        >
          <h2>No Insurances/Covers purchased yet.</h2>

          <div>
            <img src="insurance.svg" alt="insurance" width="40px" />
            <img src="insurance.svg" alt="insurance" width="40px" />
            <img src="insurance.svg" alt="insurance" width="40px" />
          </div>
        </div>
      )}
    </>
  );
};

export default MyInsurances;
