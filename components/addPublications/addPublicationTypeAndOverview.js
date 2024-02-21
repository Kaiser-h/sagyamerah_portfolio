import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import React, { useContext } from "react";
import GlobalContext from "../context/Context";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase";

const AddPublicationTypeAndOverview = () => {
  const {
    publicationType,
    setPublicationType,
    publicationOverview,
    setPublicationOverview,
  } = useContext(GlobalContext);

  const addPublicationCategory = async () => {
    if (publicationType && publicationOverview) {
      await setDoc(doc(db, "publications", publicationType), {
        type: publicationType,
        overview: publicationOverview,
      });
      setPublicationType("");
      setPublicationOverview("");
    }
  };

  return (
    <div className="w-96 flex flex-col gap-5 mx-auto">
      <Typography className="text-center">Publication Category Info</Typography>
      <Input
        required
        label="Publication Category(eg.Machine Learning)"
        value={publicationType}
        className="w-full p-4 mb-4 outline-none"
        onChange={(e) => setPublicationType(e.target.value)}
      />
      <Textarea
        required
        label="Category Overview"
        value={publicationOverview}
        className="w-full p-4 mb-4 outline-none"
        onChange={(e) => setPublicationOverview(e.target.value)}
      />
      <Button onClick={() => addPublicationCategory()}>
        Add Publication Category
      </Button>
    </div>
  );
};

export default AddPublicationTypeAndOverview;
