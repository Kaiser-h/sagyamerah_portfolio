import React, { useContext } from "react";
import GlobalContext from "../context/Context";
import { Button } from "@material-tailwind/react";

const Supervisions = () => {
  const {
    supervisions,
    setSupervisionType,
    setSupervisionContent,
    setSupervisionContentId,
    setShowUpdateSupervisionsDialog,
  } = useContext(GlobalContext);

  const handleUpdate = (type, cite, id) => {
    setSupervisionType(type);
    setSupervisionContent(cite);
    setSupervisionContentId(id);
    setShowUpdateSupervisionsDialog(true);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {supervisions.map((mItem, mIndex) => (
        <div
          key={mIndex}
          className="w-96 lg:w-1/2 bg-white px-6 py-2 mb-3 rounded-lg"
        >
          <p className="text-[18px] border-b-2 mb-2">{mItem.type}</p>
          {mItem.supervisions.map((item, index) => (
            <div key={index} className="border-2 p-2 mb-3">
              <div>
                <p>{item.cite}</p>
              </div>
              <div>
                <Button
                  onClick={() => handleUpdate(mItem.type, item.cite, item.id)}
                >
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Supervisions;
