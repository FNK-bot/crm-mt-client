import React from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";

const AddEditCustomerDialog = ({ open, onClose, customerData, handleInputChange, handleSubmit, editingId }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{editingId ? "Edit Customer" : "Add Customer"}</DialogTitle>
      <DialogContent>
        <TextField fullWidth label="Name" name="name" value={customerData.name} onChange={handleInputChange} sx={{ mb: 2 }} />
        <TextField fullWidth label="Email" name="email" type="email" value={customerData.email}  sx={{ mb: 2 }} disabled={editingId}/>
        <TextField fullWidth label="Phone" name="phone" value={customerData.phone} onChange={handleInputChange} sx={{ mb: 2 }} />
        <TextField fullWidth label="Company" name="company" value={customerData.company} onChange={handleInputChange} sx={{ mb: 2 }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">{editingId ? "Update" : "Add"}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditCustomerDialog;
