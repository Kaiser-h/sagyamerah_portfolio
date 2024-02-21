import React, { useContext } from "react";
import GlobalContext from "../context/Context";
import { Button } from "@material-tailwind/react";

const PublicationsTypeAndOverview = () => {
  const {
    publications,
    setPublicationType,
    setPublicationOverview,
    setPublicationId,
    setShowUpdatePublicationsOverviewDialog,
  } = useContext(GlobalContext);

  const handleUpdate = (item) => {
    setPublicationType(item.type);
    setPublicationOverview(item.overview);
    setPublicationId(item.id);
    setShowUpdatePublicationsOverviewDialog(true);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {publications.map((item, index) => (
        <div
          key={index}
          className="w-96 lg:w-1/2 bg-white px-6 py-2 mb-3 rounded-lg"
        >
          <p className="text-[18px] border-b-2 mb-2">{item.type}</p>
          <p className="border-2 mb-2 p-2">{item.overview}</p>

          <Button onClick={() => handleUpdate(item)}>Edit</Button>
        </div>
      ))}
      gothere
    </div>
  );
};

export default PublicationsTypeAndOverview;
