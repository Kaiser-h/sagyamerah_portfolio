import React, { useContext } from "react";
import GlobalContext from "../context/Context";
import { Button } from "@material-tailwind/react";

const Publications = () => {
  const {
    publications,
    setPublicationContent,
    setPublicationContentId,
    setPublicationId,
    setShowUpdatePublicationDialog,
  } = useContext(GlobalContext);

  const handleSort = (arr) => {
    return arr.sort((a, b) => b.createdAt - a.createdAt);
  };

  const handleUpdate = (parentId, cite, id) => {
    setPublicationId(parentId);
    setPublicationContent(cite);
    setPublicationContentId(id);
    setShowUpdatePublicationDialog(true);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {publications.map((mItem, mIndex) => (
        <div
          key={mIndex}
          className="w-96 lg:w-1/2 bg-white px-6 py-2 mb-3 rounded-lg"
        >
          <p className="text-[18px] border-b-2 mb-2">{mItem.type}</p>
          {handleSort(mItem.publications).map((item, index) => (
            <div key={index} className="border-2 mb-2 p-2">
              <div
                dangerouslySetInnerHTML={{
                  __html: item.cite,
                }}
              />
              <Button
                onClick={() => handleUpdate(mItem.id, item.cite, item.id)}
              >
                Edit
              </Button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Publications;
