import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import React, { useContext } from "react";
import GlobalContext from "../context/Context";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase";

import dynamic from "next/dynamic";

const CustomEditor = dynamic(
  () => {
    return import("@/components/customEditor/CustomEditor");
  },
  { ssr: false }
);

const UpdatePublication = () => {
  const {
    publicationIdsAndTypes,
    publicationId,
    setPublicationId,
    publicationContent,
    setPublicationContent,
    publicationContentId,
    setPublicationContentId,
    showUpdatePublicationDialog,
    setShowUpdatePublicationDialog,
  } = useContext(GlobalContext);

  const updatePublications = async () => {
    if ((publicationId && publicationContent, publicationContentId)) {
      await updateDoc(
        doc(
          db,
          "publications",
          publicationId,
          "publications",
          publicationContentId
        ),
        {
          cite: publicationContent,
        }
      );
      handleClose();
    }
  };

  const handleClose = () => {
    setPublicationId("");
    setPublicationContent("");
    setPublicationContentId("");
    setShowUpdatePublicationDialog(false);
  };

  return (
    <Dialog open={showUpdatePublicationDialog} handler={handleClose}>
      <DialogHeader>Edit Publications</DialogHeader>
      <DialogBody>
        <div className="w-96 flex flex-col gap-5 mx-auto">
          <Select
            label="Select Publication Category"
            value={publicationId}
            onChange={(newValue) => setPublicationId(newValue)}
          >
            {publicationIdsAndTypes.map((item, index) => (
              <Option key={index} value={item.id}>
                {item.type}
              </Option>
            ))}
          </Select>
          <CustomEditor
            value={publicationContent}
            onChangeFunction={setPublicationContent}
          />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleClose}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={() => updatePublications()}
        >
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default UpdatePublication;
