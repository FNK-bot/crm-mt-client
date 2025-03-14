import React from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Select, MenuItem } from "@mui/material";

const AddDealDialog = ({ open, onClose, dealData, setDealData, handleSubmit }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Deal</DialogTitle>
      <DialogContent>
        <TextField fullWidth label="Deal Amount" type="number" value={dealData.amount} 
          onChange={(e) => setDealData({ ...dealData, amount: e.target.value })} sx={{ mb: 2 }} />
        <Select fullWidth value={dealData.status} 
          onChange={(e) => setDealData({ ...dealData, status: e.target.value })}>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="won">Won</MenuItem>
          <MenuItem value="lost">Lost</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Add Deal</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDealDialog;
