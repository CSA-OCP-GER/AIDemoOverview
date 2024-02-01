"use client";
import * as React from "react";
import { useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import DialogContent from "@mui/joy/DialogContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";

type Props = {
  children: React.ReactNode;
};

const ModalCard = ({ children }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <React.Fragment>
      <button
        className="mr-4 px-2 py-1 text-sm font-semibold text-blue-600 hover:text-blue-900 hover:underline"
        onClick={() => setOpen(true)}
      >
        View Demo Asset
      </button>
      <Modal
        aria-labelledby="close-modal-title"
        open={open}
        onClose={(
          _event: React.MouseEvent<HTMLButtonElement>,
          reason: string,
        ) => {
          setOpen(false);
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Sheet
          variant="outlined"
          className="w-5/6 shadow-2xl lg:w-2/3"
          sx={{
            minWidth: 300,
            borderRadius: "md",
          }}
        >
          <ModalClose variant="outlined" />
          <DialogContent>{children}</DialogContent>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
};

export default ModalCard;
