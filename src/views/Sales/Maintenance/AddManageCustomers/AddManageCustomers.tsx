import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import DashboardCard from "../../../../components/DashboardCard";
import SettingsIcon from "@mui/icons-material/Settings";
import ContactsIcon from "@mui/icons-material/Person";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useNavigate } from "react-router";

const AddAndManageCustomers = () => {
  const navigate = useNavigate();

  const customerItems = [
    { text: "General Settings", icon: <SettingsIcon sx={{ fontSize: 40, color: "#1976d2" }} />, path: "/sales/maintenance/add-and-manage-customers/general-settings" },
    { text: "Contacts", icon: <ContactsIcon sx={{ fontSize: 40, color: "#1976d2" }} />, path: "/sales/maintenance/add-and-manage-customers/contacts" },
    { text: "Transactions", icon: <ReceiptIcon sx={{ fontSize: 40, color: "#1976d2" }} />, path: "/sales/maintenance/add-and-manage-customers/transactions" },
    { text: "Sales Orders", icon: <ShoppingCartIcon sx={{ fontSize: 40, color: "#1976d2" }} />, path: "/sales/maintenance/add-and-manage-customers/sales-orders" },
    { text: "Attachments", icon: <AttachFileIcon sx={{ fontSize: 40, color: "#1976d2" }} />, path: "/sales/maintenance/add-and-manage-customers/attachments" },
  ];

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <Stack
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f0f0f0",
        p: { xs: 2, sm: 3, md: 5 }, // responsive padding
      }}
    >
      <Typography
        variant="h5"
        sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
      >
        Manage Customer
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {customerItems.map((item, index) => (
          <Grid
            item
            xs={12}  
            sm={6}   
            md={4} 
            key={index}
          >
            <DashboardCard
              text={item.text}
              icon={item.icon}
              onClick={() => handleItemClick(item.path)}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default AddAndManageCustomers;
