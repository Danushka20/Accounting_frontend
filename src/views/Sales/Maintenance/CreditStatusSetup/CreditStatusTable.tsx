import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Paper,
  Typography,
  useMediaQuery,
  Theme,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../../components/BreadCrumb";
import PageTitle from "../../../../components/PageTitle";
import SearchBar from "../../../../components/SearchBar";
import theme from "../../../../theme";

// Mock API function for Credit Status
const getCreditStatusList = async () => [
  { id: 1, description: "Good history", disallowInvoices: true, status: "Active" },
  { id: 2, description: "Blocked", disallowInvoices: false, status: "Inactive" },
  { id: 3, description: "Limited", disallowInvoices: false, status: "Inctive" },
  { id: 4, description: "Good History", disallowInvoices: true, status: "Active" },
];

function CreditStatusTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [showInactive, setShowInactive] = useState(false);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const { data: creditStatusData = [] } = useQuery({
    queryKey: ["creditStatus"],
    queryFn: getCreditStatusList,
  });

  // Filter with search + inactive toggle
  const filteredCreditStatus = useMemo(() => {
    if (!creditStatusData) return [];
    let filtered = creditStatusData;

    if (!showInactive) {
      filtered = filtered.filter((item) => item.status === "Active");
    }

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.description.toLowerCase().includes(lowerQuery) ||
          (item.disallowInvoices ? "Invoice Ok" : "No Invoicing").includes(lowerQuery)
      );
    }

    return filtered;
  }, [creditStatusData, searchQuery, showInactive]);

  const paginatedCreditStatus = useMemo(() => {
    if (rowsPerPage === -1) return filteredCreditStatus;
    return filteredCreditStatus.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredCreditStatus, page, rowsPerPage]);

  const handleChangePage = (_event: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id: number) => {
    alert(`Delete Credit Status with id: ${id}`);
  };

  const breadcrumbItems = [
    { title: "Home", href: "/home" },
    { title: "Credit Status" },
  ];

  return (
    <Stack>
      {/* Header with buttons */}
      <Box
        sx={{
          padding: theme.spacing(2),
          boxShadow: 2,
          marginY: 2,
          borderRadius: 1,
          overflowX: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <PageTitle title="Credit Status" />
          <Breadcrumb breadcrumbs={breadcrumbItems} />
        </Box>

        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/sales/maintenance/credit-status-setup/add-credit-status")}
          >
            Add Credit Status
          </Button>

          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Stack>
      </Box>

      {/* Search + Show Inactive Toggle */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 2,
          mb: 2,
          width: "100%",
          alignItems: "center",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={showInactive}
              onChange={(e) => setShowInactive(e.target.checked)}
            />
          }
          label="Show also Inactive"
        />

        <Box sx={{ width: isMobile ? "100%" : "300px" }}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Search..."
          />
        </Box>
      </Box>

      {/* Table */}
      <Stack sx={{ alignItems: "center" }}>
        <TableContainer
          component={Paper}
          elevation={2}
          sx={{ overflowX: "auto", maxWidth: isMobile ? "88vw" : "100%" }}
        >
          <Table aria-label="credit status table">
            <TableHead sx={{ backgroundColor: "var(--pallet-lighter-blue)" }}>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Disallow Invoices</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedCreditStatus.length > 0 ? (
                paginatedCreditStatus.map((item, index) => (
                  <TableRow key={item.id} hover>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.disallowInvoices ? "Invoice Ok" : "No Invoicing"}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => navigate("/sales/maintenance/credit-status-setup/update-credit-status")}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography variant="body2">No Records Found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={4}
                  count={filteredCreditStatus.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  showFirstButton
                  showLastButton
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Stack>
    </Stack>
  );
}

export default CreditStatusTable;
