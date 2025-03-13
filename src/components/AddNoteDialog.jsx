import React from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Typography } from "@mui/material";

const AddNoteDialog = ({ open, onClose, noteText, setNoteText, handleSubmit, existingNote }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{existingNote ? "View Note" : "Add Note"}</DialogTitle>
      <DialogContent>
        {existingNote ? (
          <Typography>{existingNote}</Typography>
        ) : (
          <TextField fullWidth label="Note" value={noteText} onChange={(e) => setNoteText(e.target.value)} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Close</Button>
        {!existingNote && <Button onClick={handleSubmit} color="primary">Add Note</Button>}
      </DialogActions>
    </Dialog>
  );
};

export default AddNoteDialog;
