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

const UpdateResearchInterests = () => {
  const {
    researchType,
    setResearchType,
    researchOverview,
    setResearchOverview,
    researchId,
    setResearchId,
    showUpdateResearchsOverviewDialog,
    setShowUpdateResearchsOverviewDialog,
  } = useContext(GlobalContext);

  const updateResearchCategory = async () => {
    if (researchId && researchType && researchOverview) {
      await updateDoc(doc(db, "researchs", researchId), {
        type: researchType.trim(),
        overview: researchOverview.trim(),
      });

      handleClose();
    }
  };

  const handleClose = () => {
    setResearchType("");
    setResearchOverview("");
    setResearchId("");
    setShowUpdateResearchsOverviewDialog(false);
  };

  return (
    <Dialog open={showUpdateResearchsOverviewDialog} handler={handleClose}>
      <DialogHeader>Edit Research Overview</DialogHeader>
      <DialogBody>
        <div className="w-96 flex flex-col gap-5 mx-auto">
          <Input
            required
            label="Category Overview"
            value={researchType}
            className="w-full p-4 mb-4 outline-none"
            onChange={(e) => setResearchType(e.target.value)}
          />
          <Textarea
            required
            label="Category Overview"
            value={researchOverview}
            className="w-full p-4 mb-4 outline-none"
            onChange={(e) => setResearchOverview(e.target.value)}
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
          onClick={() => updateResearchCategory()}
        >
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default UpdateResearchInterests;
