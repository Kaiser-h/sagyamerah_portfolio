import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import React, { useContext } from "react";
import GlobalContext from "../context/Context";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase";

const AddResearchInterests = () => {
  const {
    researchType,
    setResearchType,
    researchOverview,
    setResearchOverview,
  } = useContext(GlobalContext);

  const addResearchCategory = async () => {
    if (researchType && researchOverview) {
      await setDoc(doc(db, "researchs", researchType), {
        type: researchType,
        overview: researchOverview,
      });
      setResearchType("");
      setResearchOverview("");
    }
  };

  return (
    <div className="w-96 flex flex-col gap-5 mx-auto">
      <Input
        required
        label="Research Category(eg.Machine Learning)"
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
      <Button onClick={() => addResearchCategory()}>
        Add Research Category
      </Button>
    </div>
  );
};

export default AddResearchInterests;
