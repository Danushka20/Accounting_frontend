import React from "react";
import {
    Box,
    Stack,
    Typography,
    Button,
    Paper,
    Divider,
    TextField,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

interface FiscalYearFormData {
    fiscalYearFrom: string;
    fiscalYearTo: string;
}

export default function UpdateFiscalYear() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FiscalYearFormData>({
        defaultValues: {
            fiscalYearFrom: "",
            fiscalYearTo: "",
        },
    });

    const fiscalYearFrom = watch("fiscalYearFrom");

    const onSubmit = (data: FiscalYearFormData) => {
        console.log("Submitted:", data);
        alert("Fiscal Year submitted successfully!");
    };

    return (
        <Stack alignItems="center" sx={{ mt: 4, px: 2 }}>
            <Paper
                sx={{
                    p: theme.spacing(3),
                    width: "100%",
                    maxWidth: isMobile ? "100%" : "600px",
                    boxShadow: 2,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6" sx={{ mb: 2, textAlign: isMobile ? "center" : "left" }}>
                    Fiscal Year Setup
                </Typography>

                <Stack spacing={3}>
                    <Divider />

                    <Controller
                        name="fiscalYearFrom"
                        control={control}
                        rules={{ required: "Fiscal Year Begin is required" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Fiscal Year Begin"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                error={!!errors.fiscalYearFrom}
                                helperText={errors.fiscalYearFrom?.message}
                            />
                        )}
                    />

                    <Controller
                        name="fiscalYearTo"
                        control={control}
                        rules={{
                            required: "Fiscal Year End is required",
                            validate: (value) =>
                                !fiscalYearFrom || value >= fiscalYearFrom
                                    ? true
                                    : "Fiscal Year End must be after Begin",
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Fiscal Year End"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                error={!!errors.fiscalYearTo}
                                helperText={errors.fiscalYearTo?.message}
                            />
                        )}
                    />
                </Stack>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        justifyContent: "space-between",
                        gap: 2,
                        mt: 3,
                    }}
                >
                    <Button
                        fullWidth={isMobile}
                        onClick={() => window.history.back()}
                        variant="outlined"
                    >
                        Back
                    </Button>

                    <Button
                        fullWidth={isMobile}
                        variant="contained"
                        sx={{ backgroundColor: "var(--pallet-blue)" }}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Update
                    </Button>
                </Box>
            </Paper>
        </Stack>
    );
}
