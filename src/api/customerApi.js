import axiosInstance from "./axiosInstance";

export const getCustomers = async () => {
  try {
    const response = await axiosInstance.get("/customers");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Error fetching customers";
  }
};

export const addCustomer = async (customer) => {
  try {
    const response = await axiosInstance.post("/customers", customer);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Error adding customer";
  }
};

export const updateCustomer = async (id, customer) => {
  try {
    const response = await axiosInstance.patch(`/customers/${id}`, customer);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Error updating customer";
  }
};

export const deleteCustomer = async (id) => {
  try {
    await axiosInstance.delete(`/customers/${id}`);
    return { msg: "Customer deleted successfully" };
  } catch (error) {
    throw error.response ? error.response.data : "Error deleting customer";
  }
};

export const addDeal = async (customerId, deal) => {
  try {
    const response = await axiosInstance.post(`/deals`, {
      ...deal,
      customerId,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Error adding deal";
  }
};

export const addNote = async (customerId, text) => {
  try {
    const response = await axiosInstance.post(`/notes`, { customerId, text });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Error adding note";
  }
};
