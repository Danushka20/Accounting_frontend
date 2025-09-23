import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  FormHelperText,
  SelectChangeEvent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import theme from "../../../../../theme";

interface PurchasePricingFormData {
  currency: string;
  purchaseType: string;
  price: string;
}

export default function AddPurchasingPricingForm() {
  const [formData, setFormData] = useState<PurchasePricingFormData>({
    currency: "",
    purchaseType: "",
    price: "",
  });

  const [errors, setErrors] = useState<Partial<PurchasePricingFormData>>({});
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors: Partial<PurchasePricingFormData> = {};
    if (!formData.currency) newErrors.currency = "Currency is required";
    if (!formData.purchaseType) newErrors.purchaseType = "Purchase Type is required";
    if (!formData.price) newErrors.price = "Price is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log("Purchase Pricing Submitted:", formData);
      alert("Purchase Pricing added successfully!");
      setFormData({
        currency: "",
        purchaseType: "",
        price: "",
      });
    }
  };

  return (
    <Stack alignItems="center" sx={{ mt: 4, px: isMobile ? 2 : 0 }}>
      <Paper
        sx={{
          p: theme.spacing(3),
          maxWidth: "500px",
          width: "100%",
          boxShadow: 2,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 3, textAlign: isMobile ? "center" : "left" }}>
          Add Purchase Pricing
        </Typography>

        <Stack spacing={2}>
          <FormControl size="small" fullWidth error={!!errors.currency}>
            <InputLabel>Currency</InputLabel>
            <Select
              name="currency"
              value={formData.currency}
              onChange={handleSelectChange}
              label="Currency"
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="LKR">LKR</MenuItem>
            </Select>
            <FormHelperText>{errors.currency}</FormHelperText>
          </FormControl>

          <FormControl size="small" fullWidth error={!!errors.purchaseType}>
            <InputLabel>Purchase Type</InputLabel>
            <Select
              name="purchaseType"
              value={formData.purchaseType}
              onChange={handleSelectChange}
              label="Purchase Type"
            >
              <MenuItem value="retail">Retail</MenuItem>
              <MenuItem value="wholesale">Wholesale</MenuItem>
            </Select>
            <FormHelperText>{errors.purchaseType}</FormHelperText>
          </FormControl>

          <TextField
            label="Price (per each)"
            name="price"
            size="small"
            fullWidth
            type="number"
            value={formData.price}
            onChange={handleInputChange}
            error={!!errors.price}
            helperText={errors.price}
          />
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
          <Button onClick={() => navigate("/itemsandinventory/maintenance/items/purchasing-pricing")}>
            Back
          </Button>

          <Button
            variant="contained"
            fullWidth={isMobile}
            sx={{ backgroundColor: "var(--pallet-blue)" }}
            onClick={handleSubmit}
          >
            Add Pricing
          </Button>
        </Box>
      </Paper>
    </Stack>
  );
}
