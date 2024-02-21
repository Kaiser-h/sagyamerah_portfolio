import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import React, { useContext } from "react";
import GlobalContext from "../context/Context";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase";

const UpdatePublicationTypeAndOverview = () => {
  const {
    publicationType,
    setPublicationType,
    publicationOverview,
    setPublicationOverview,
    publicationId,
    setPublicationId,
    showUpdatePublicationsOverviewDialog,
    setShowUpdatePublicationsOverviewDialog,
  } = useContext(GlobalContext);

  const updatePublicationCategory = async () => {
    if (publicationType && publicationOverview) {
      await updateDoc(doc(db, "publications", publicationId), {
        type: publicationType,
        overview: publicationOverview,
      });

      handleClose();
    }
  };

  const handleClose = () => {
    setPublicationType("");
    setPublicationOverview("");
    setPublicationId(""), setShowUpdatePublicationsOverviewDialog(false);
  };

  return (
    <Dialog open={showUpdatePublicationsOverviewDialog} handler={handleClose}>
      <DialogHeader>Edit Publication Overview</DialogHeader>
      <DialogBody>
        <div className="w-96 flex flex-col gap-5 mx-auto">
          <Input
            required
            label="Publication Category(eg.Machine Learning)"
            value={publicationType}
            className="w-full p-4 mb-4 outline-none"
            onChange={(e) => setPublicationType(e.target.value)}
          />
          <Textarea
            required
            rows={10}
            label="Category Overview"
            value={publicationOverview}
            className="w-full p-4 mb-4 outline-none"
            onChange={(e) => setPublicationOverview(e.target.value)}
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
          onClick={() => updatePublicationCategory()}
        >
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default UpdatePublicationTypeAndOverview;
