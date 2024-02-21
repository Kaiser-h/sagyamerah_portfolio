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

const UpdateSupervisions = () => {
  const {
    supervisions,
    supervisionType,
    setSupervisionType,
    supervisionContent,
    setSupervisionContent,
    supervisionContentId,
    setSupervisionContentId,
    showUpdateSupervisionsDialog,
    setShowUpdateSupervisionsDialog,
  } = useContext(GlobalContext);

  const updateSupervisions = async () => {
    if ((supervisionType && supervisionContent, supervisionContentId)) {
      await updateDoc(
        doc(
          db,
          "supervisions",
          supervisionType,
          "supervisions",
          supervisionContentId
        ),
        {
          cite: supervisionContent,
        }
      );
      handleClose();
    }
  };

  const handleClose = () => {
    setSupervisionType("");
    setSupervisionContent("");
    setSupervisionContentId("");
    setShowUpdateSupervisionsDialog(false);
  };

  return (
    <Dialog open={showUpdateSupervisionsDialog} handler={handleClose}>
      <DialogHeader>Edit Supervisions</DialogHeader>
      <DialogBody>
        <div className="w-96 flex flex-col gap-5 mx-auto">
          <Select
            disabled
            label="Select Supervision Type"
            value={supervisionType}
            onChange={(newValue) => setSupervisionType(newValue)}
          >
            {["PhD", "Masters", "Undergraduate"].map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
          </Select>
          <Textarea
            required
            label="Supervision"
            value={supervisionContent}
            className="w-full p-4 mb-4 outline-none"
            onChange={(e) => setSupervisionContent(e.target.value)}
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
          onClick={() => updateSupervisions()}
        >
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default UpdateSupervisions;
