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

interface DimensionTagData {
  tagName: string;
  tagDescription: string;
}

export default function UpdateDimensionTagsForm() {
  const [formData, setFormData] = useState<DimensionTagData>({
    tagName: "",
    tagDescription: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof DimensionTagData, string>>>({});

  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  const handleChange = (field: keyof DimensionTagData, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof DimensionTagData, string>> = {};

    if (!formData.tagName.trim()) newErrors.tagName = "Tag Name is required";
    if (!formData.tagDescription.trim()) newErrors.tagDescription = "Tag Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log("Submitted Dimension Tag:", formData);
      alert("Dimension Tag updated successfully!");
    }
  };

  return (
    <Stack alignItems="center" sx={{ mt: 4, px: isMobile ? 2 : 0 }}>
      <Paper sx={{ p: 3, maxWidth: "500px", width: "100%", boxShadow: 2, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 3, textAlign: isMobile ? "center" : "left" }}>
          Update Dimension Tag
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Tag Name"
            size="small"
            fullWidth
            value={formData.tagName}
            onChange={(e) => handleChange("tagName", e.target.value)}
            error={!!errors.tagName}
            helperText={errors.tagName || " "}
          />

          <TextField
            label="Tag Description"
            size="small"
            fullWidth
            value={formData.tagDescription}
            onChange={(e) => handleChange("tagDescription", e.target.value)}
            error={!!errors.tagDescription}
            helperText={errors.tagDescription || " "}
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
          <Button onClick={() => window.history.back()}>Back</Button>

          <Button
            variant="contained"
            fullWidth={isMobile}
            sx={{ backgroundColor: "var(--pallet-blue)" }}
            onClick={handleSubmit}
          >
            Update
          </Button>
        </Box>
      </Paper>
    </Stack>
  );
}
