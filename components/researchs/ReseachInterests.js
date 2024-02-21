import React, { useContext } from "react";
import GlobalContext from "../context/Context";
import { Button } from "@material-tailwind/react";

const ResearchInterests = () => {
  const {
    researchs,
    setResearchType,
    setResearchOverview,
    setResearchId,
    setShowUpdateResearchsOverviewDialog,
  } = useContext(GlobalContext);

  const handleUpdate = (research) => {
    setResearchType(research.type);
    setResearchOverview(research.overview);
    setResearchId(research.id);
    setShowUpdateResearchsOverviewDialog(true);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {researchs.map((research, index) => (
        <div
          key={index}
          className="w-96 lg:w-1/2 bg-white px-6 py-2 mb-3 rounded-lg"
        >
          <p className="text-[18px] border-b-2 mb-2">{research.type}</p>
          <p className="border-2 mb-2 p-2">{research.overview}</p>

          <Button onClick={() => handleUpdate(research)}>Edit</Button>
        </div>
      ))}
    </div>
  );
};

export default ResearchInterests;
