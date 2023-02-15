import React from "react";
import Insurance from "../components/Insurance/Insurance";

const Insurances = () => {
  const insuraces = [
    {
      name: "Aura",
      logo: "/aura.png",
      cost: "2.60%",
      capacity: "112 ETH/ 193.6k DAI",
      images: [
        {
          url: "/arbitrum.svg",
          name: "arbitrum",
        },
      ],
    },
    {
      name: "Enzume v4",
      logo: "/enzyme-v4.svg",
      cost: "2.60%",
      capacity: "112 ETH/ 193.6k DAI",
      images: [
        {
          url: "/arbitrum.svg",
          name: "arbitrum",
        },
        {
          url: "/avalanche.svg",
          name: "avalanche",
        },
      ],
    },
    {
        name: "Gearbox V2",
        logo: "/gearbox.png",
        cost: "2.60%",
        capacity: "112 ETH/ 193.6k DAI",
        images: [
          {
            url: "/arbitrum.svg",
            name: "arbitrum",
          },
        ],
      },
  ];
  return <>
    <div className="main_label">My Insurances</div>
    <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", justifyItems:"center"}}>
        {insuraces.map(insurace => <Insurance insurace={insurace}/>)}
    </div>    
  </>;
};

export default Insurances;
