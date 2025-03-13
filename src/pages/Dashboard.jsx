import React, { useState, useEffect } from "react";
import { getCustomers, addCustomer, updateCustomer, deleteCustomer, addDeal, addNote } from "../api/customerApi";
import { Container, TextField, Button, Typography, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery } from "@mui/material";
import { Edit, Delete, NoteAdd, MonetizationOn, ExitToApp, Visibility } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import AddEditCustomerDialog from "../components/AddEditCustomerDialog";
import AddDealDialog from "../components/AddDealDialog";
import AddNoteDialog from "../components/AddNoteDialog";
import { logout } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openCustomerDialog, setOpenCustomerDialog] = useState(false);
  const [customerData, setCustomerData] = useState({ name: "", email: "", phone: "", company: "" });
  const [editingId, setEditingId] = useState(null);
  const [openDealDialog, setOpenDealDialog] = useState(false);
  const [openNoteDialog, setOpenNoteDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [dealData, setDealData] = useState({ amount: "", status: "pending" });
  const [noteText, setNoteText] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (err) {
      toast.error("Failed to fetch customers");
    }
  };

  const handleDeleteCustomer = async () => {
    try {
      await deleteCustomer(deleteId);
      toast.success("Customer deleted successfully");
      setDeleteId(null);
      fetchCustomers();
    } catch (err) {
      toast.error("Error deleting customer");
    }
  };

  return (
    <Container sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ my: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        Customer Dashboard
        <Button variant="contained" color="secondary" sx={{ float: "right" }} onClick={() => {
          dispatch(logout())
          toast.success("Logged out successfully");
          navigate("/login");
        }}>
          <ExitToApp sx={{ mr: 1 }}/> Logout
        </Button>
      </Typography>

      <TextField fullWidth label="Search Customers" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ mb: 2 }} />

      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => setOpenCustomerDialog(true)}>
        Add Customer
      </Button>

      <Table sx={{ minWidth: 650, overflowX: "auto" }}>
        <TableHead>
          <TableRow>
          {!isMobile && <TableCell>Name</TableCell>}
            <TableCell>Email</TableCell>
            {!isMobile && <TableCell>Phone</TableCell>}
            {!isMobile && <TableCell>Company</TableCell>}
            <TableCell>Deals</TableCell>
            <TableCell>Notes</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.length > 0 ? customers.map((customer) => (
            <TableRow key={customer._id}>
              {!isMobile && <TableCell>{customer.name}</TableCell>}
              <TableCell>{customer.email}</TableCell>
              {!isMobile && <TableCell>{customer.phone}</TableCell>}
              {!isMobile && <TableCell>{customer.company}</TableCell>}
              <TableCell>
                {customer.deal ? (
                  <Button sx={{ backgroundColor: customer.deal.status === "won" ? "green" : customer.deal.status === "pending" ? "blue" : "red", color: "white" }}>
                    ${customer.deal.amount} - {customer.deal.status.toUpperCase()}
                  </Button>
                ) : (
                  <IconButton onClick={() => { setSelectedCustomer(customer); setOpenDealDialog(true); }}>
                    <MonetizationOn /> Add Deal
                  </IconButton>
                )}
              </TableCell>
              <TableCell>
                {customer.note ? (
                  <Button onClick={() => { setSelectedCustomer(customer); setOpenNoteDialog(true); }}>
                    <Visibility /> Show Note
                  </Button>
                ) : (
                  <IconButton color="info" onClick={() => { setSelectedCustomer(customer); setOpenNoteDialog(true); }}>
                    <NoteAdd /> Add Note
                  </IconButton>
                )}
              </TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => { setEditingId(customer._id); setCustomerData(customer); setOpenCustomerDialog(true); }}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => setDeleteId(customer._id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          )) : <TableRow><TableCell colSpan={7} align="center">No data found</TableCell></TableRow>}
        </TableBody>
      </Table>

      {/* Add/Edit Customer Dialog */}
      <AddEditCustomerDialog open={openCustomerDialog} onClose={() => setOpenCustomerDialog(false)} customerData={customerData} handleInputChange={(e) => setCustomerData({ ...customerData, [e.target.name]: e.target.value })} handleSubmit={() => {
        if (editingId) {
          updateCustomer(editingId, customerData).then(() => {
            toast.success("Customer updated successfully");
            setOpenCustomerDialog(false);
            fetchCustomers();
          }).catch(err => toast.error(err.msg));
        } else {
          addCustomer(customerData).then(() => {
            toast.success("Customer added successfully");
            setOpenCustomerDialog(false);
            fetchCustomers();
          }).catch(err => toast.error(err.msg));
        }
      }} editingId={editingId} />

      {/* Add Deal Dialog */}
      <AddDealDialog open={openDealDialog} onClose={() => setOpenDealDialog(false)} dealData={dealData} setDealData={setDealData} handleSubmit={() => {
        addDeal(selectedCustomer._id, dealData).then(() => {
          toast.success("Deal added successfully");
          setOpenDealDialog(false);
          fetchCustomers();
        }).catch(err => toast.error(err.msg));
      }} />

      {/* Add Note Dialog */}
      <AddNoteDialog open={openNoteDialog} onClose={() => setOpenNoteDialog(false)} noteText={noteText} setNoteText={setNoteText} handleSubmit={() => {
        addNote(selectedCustomer._id, noteText).then(() => {
          toast.success("Note added successfully");
          setOpenNoteDialog(false);
          fetchCustomers();
        }).catch(err => toast.error(err.msg));
      }} existingNote={selectedCustomer?.note ? selectedCustomer.note.text : null} />

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this customer?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)} color="secondary">Cancel</Button>
          <Button onClick={handleDeleteCustomer} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </Container>
  );
};

export default Dashboard;
