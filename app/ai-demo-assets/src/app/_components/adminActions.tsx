"use client"
import React from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/joy/Button";
import AddIcon from "@mui/icons-material/Add";
const CreateDemoAssetButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    // using the searchParams to pass the query string to the dialog
    // call samePage but with showDialog=true
    router.push("/search?showDialog=true");
  };

  return (
    <div className="flex justify-end">
      <Button variant="outlined" 
        startDecorator={<AddIcon />}
        onClick={handleClick}>
        Create Demo Asset
      </Button>
    </div>
  );
};

export default CreateDemoAssetButton;
