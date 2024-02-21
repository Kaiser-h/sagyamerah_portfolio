"use client";
import React, { useContext } from "react";

import {
  Timestamp,
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Button, Option, Select, Typography } from "@material-tailwind/react";
import { db } from "@/app/firebase";
import GlobalContext from "../context/Context";

import dynamic from "next/dynamic";

const CustomEditor = dynamic(
  () => {
    return import("@/components/customEditor/CustomEditor");
  },
  { ssr: false }
);

const AddPublication = () => {
  const {
    publicationIdsAndTypes,
    publicationId,
    setPublicationId,
    publicationType,
    setPublicationType,
    publicationContent,
    setPublicationContent,
  } = useContext(GlobalContext);

  const addPublication = async () => {
    if (publicationId && publicationContent) {
      await addDoc(
        collection(db, "publications", publicationId, "publications"),
        {
          cite: publicationContent,
          createdAt: Timestamp.now(),
        }
      );
      setPublicationType("");
      setPublicationContent("");
    }
  };

  return (
    <div className="w-96 flex flex-col gap-5 mx-auto">
      <Typography className="text-center">Publication Info</Typography>
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

      <Button onClick={() => addPublication()}>Add Publication</Button>
    </div>
  );
};

export default AddPublication;
