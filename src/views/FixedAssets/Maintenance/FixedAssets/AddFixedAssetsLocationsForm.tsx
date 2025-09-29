import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";

interface FixedAssetsLocationData {
  locationCode: string;
  locationName: string;
  contactDeliveries: string;
  address: string;
  telNumber: string;
  secondaryTelNumber: string;
  faxNumber: string;
  email: string;
}

export default function AddFixedAssetsLocations() {
  const [formData, setFormData] = useState<FixedAssetsLocationData>({
    locationCode: "",
    locationName: "",
    contactDeliveries: "",
    address: "",
    telNumber: "",
    secondaryTelNumber: "",
    faxNumber: "",
    email: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FixedAssetsLocationData, string>>>({});

  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  const handleChange = (field: keyof FixedAssetsLocationData, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof FixedAssetsLocationData, string>> = {};
    const phoneRegex = /^[0-9]{10}$/;
    const faxRegex = /^[0-9]{6,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.locationCode.trim()) newErrors.locationCode = "Location Code is required";
    if (!formData.locationName.trim()) newErrors.locationName = "Location Name is required";
    if (!formData.contactDeliveries.trim()) newErrors.contactDeliveries = "Contact for Deliveries is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.telNumber.trim()) newErrors.telNumber = "Telephone Number is required";
    else if (!phoneRegex.test(formData.telNumber)) newErrors.telNumber = "Enter a valid 10-digit number";
    if (formData.secondaryTelNumber && !phoneRegex.test(formData.secondaryTelNumber))
      newErrors.secondaryTelNumber = "Enter a valid 10-digit secondary number";
    if (formData.faxNumber && !faxRegex.test(formData.faxNumber)) newErrors.faxNumber = "Enter a valid fax number (6-15 digits)";
    if (!formData.email.trim()) newErrors.email = "E-mail is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Enter a valid email address";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log("Submitted Location:", formData);
      alert("Fixed Assets Location added successfully!");
    }
  };

  return (
    <Stack alignItems="center" sx={{ mt: 4, px: isMobile ? 2 : 0 }}>
      <Paper sx={{ p: 3, maxWidth: "600px", width: "100%", boxShadow: 2, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 3, textAlign: isMobile ? "center" : "left" }}>
          Add Fixed Assets Location
        </Typography>

        <Stack spacing={2}>
          {([
            { label: "Location Code", field: "locationCode" },
            { label: "Location Name", field: "locationName" },
            { label: "Contact for Deliveries", field: "contactDeliveries" },
            { label: "Address", field: "address" },
            { label: "Telephone Number", field: "telNumber" },
            { label: "Secondary Telephone Number", field: "secondaryTelNumber" },
            { label: "Facsimile No.", field: "faxNumber" },
            { label: "E-mail", field: "email" },
          ] as const).map(({ label, field }) => (
            <TextField
              key={field}
              label={label}
              size="small"
              fullWidth
              value={formData[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              error={!!errors[field]}
              helperText={errors[field] || " "}
            />
          ))}
        </Stack>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 3,
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 2 : 0,
          }}
        >
          <Button onClick={() => window.history.back()}>Back</Button>

          <Button
            variant="contained"
            fullWidth={isMobile}
            sx={{ backgroundColor: "var(--pallet-blue)" }}
            onClick={handleSubmit}
          >
            Add New
          </Button>
        </Box>
      </Paper>
    </Stack>
  );
}
