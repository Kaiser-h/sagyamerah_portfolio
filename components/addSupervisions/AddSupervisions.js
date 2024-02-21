import React, { useContext } from "react";
import GlobalContext from "../context/Context";
import {
  Timestamp,
  addDoc,
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/app/firebase";
import {
  Button,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";

const AddSupervisions = () => {
  const {
    supervisionType,
    setSupervisionType,
    supervisionContent,
    setSupervisionContent,
  } = useContext(GlobalContext);

  const addSupervisions = async () => {
    if (supervisionType && supervisionContent) {
      await addDoc(
        collection(db, "supervisions", supervisionType, "supervisions"),
        {
          cite: supervisionContent,
          createdAt: Timestamp.now(),
        }
      );
      setSupervisionType("");
      setSupervisionContent("");
    }
  };

  return (
    <div className="w-96 flex flex-col gap-5 mx-auto">
      <Typography className="text-center">Supervision Info</Typography>
      <Select
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
      <Button onClick={() => addSupervisions()}>Add Supervision</Button>
    </div>
  );
};

export default AddSupervisions;
