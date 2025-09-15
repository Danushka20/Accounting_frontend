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

// API function to get Units of Measure
const getUnitsOfMeasureList = async () => [
  { id: 1, unit: "kg", description: "Kilogram", decimals: 2, status: "Active" },
  { id: 2, unit: "pcs", description: "Pieces", decimals: 0, status: "Inactive" },
  { id: 3, unit: "ltr", description: "Liter", decimals: 3, status: "Active" },
  { id: 4, unit: "m", description: "Meter", decimals: 2, status: "Active" },
];

function UnitsOfMeasureTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [showInactive, setShowInactive] = useState(false);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const { data: unitsData = [] } = useQuery({
    queryKey: ["unitsOfMeasure"],
    queryFn: getUnitsOfMeasureList,
  });

  // Filter with search + showInactive toggle
  const filteredUnits = useMemo(() => {
    if (!unitsData) return [];
    let filtered = unitsData;

    if (!showInactive) {
      filtered = filtered.filter((item) => item.status === "Active");
    }

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.unit.toLowerCase().includes(lowerQuery) ||
          item.description.toLowerCase().includes(lowerQuery)
      );
    }

    return filtered;
  }, [unitsData, searchQuery, showInactive]);

  const paginatedUnits = useMemo(() => {
    if (rowsPerPage === -1) return filteredUnits;
    return filteredUnits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredUnits, page, rowsPerPage]);

  const handleChangePage = (_event: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id: number) => {
    alert(`Delete Unit with id: ${id}`);
  };

  const breadcrumbItems = [
    { title: "Home", href: "/home" },
    { title: "Units of Measure" },
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
          <PageTitle title="Units of Measure" />
          <Breadcrumb breadcrumbs={breadcrumbItems} />
        </Box>

        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/itemsandinventory/maintenance/units-of-measure/add-units-of-measure")}
          >
            Add Unit
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
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Search..." />
        </Box>
      </Box>

      {/* Table */}
      <Stack sx={{ alignItems: "center" }}>
        <TableContainer
          component={Paper}
          elevation={2}
          sx={{ overflowX: "auto", maxWidth: isMobile ? "88vw" : "100%" }}
        >
          <Table aria-label="units of measure table">
            <TableHead sx={{ backgroundColor: "var(--pallet-lighter-blue)" }}>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Decimals</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedUnits.length > 0 ? (
                paginatedUnits.map((item, index) => (
                  <TableRow key={item.id} hover>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.decimals}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => navigate(
                            "/itemsandinventory/maintenance/units-of-measure/update-units-of-measure"
                            // `/inventory/units-of-measure/edit/${item.id}`
                        )}
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
                  <TableCell colSpan={5} align="center">
                    <Typography variant="body2">No Records Found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={5}
                  count={filteredUnits.length}
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

export default UnitsOfMeasureTable;
