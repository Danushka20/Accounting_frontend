import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Stack,
  TableFooter,
  TablePagination,
  Typography,
  useMediaQuery,
  Theme,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useMemo, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../../components/BreadCrumb";
import PageTitle from "../../../../components/PageTitle";
import theme from "../../../../theme";
import SearchBar from "../../../../components/SearchBar";

// Mock API function
const getSalesAreaList = async () => [
  { id: 1, areaName: "Colombo", status: "Active" },
  { id: 2, areaName: "Gampaha", status: "Active" },
  { id: 3, areaName: "Kandy", status: "Inactive" },
  { id: 4, areaName: "Galle", status: "Active" },
  { id: 5, areaName: "Kurunegala", status: "Inactive" },
  { id: 6, areaName: "Matara", status: "Active" },
];

function SalesAreaTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [showInactive, setShowInactive] = useState(false);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const { data: salesAreas = [] } = useQuery({
    queryKey: ["salesAreas"],
    queryFn: getSalesAreaList,
  });

  const filteredAreas = useMemo(() => {
    if (!salesAreas) return [];

    let filtered = salesAreas;

    if (!showInactive) {
      filtered = filtered.filter((item) => item.status === "Active");
    }

    if (!searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (area) =>
          area.areaName.toLowerCase().includes(lowerQuery)
      );
    }
    return filtered;
  }, [salesAreas, searchQuery, showInactive]);

  const paginatedAreas = useMemo(() => {
    if (rowsPerPage === -1) return filteredAreas;
    return filteredAreas.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [filteredAreas, page, rowsPerPage]);

  const handleChangePage = (_event: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id: number) => {
    alert(`Delete area with id: ${id}`);
  };

  const breadcrumbItems = [
    { title: "Home", href: "/home" },
    { title: "Sales Areas" },
  ];

  return (
    <Stack>
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
          <PageTitle title="Sales Areas" />
          <Breadcrumb breadcrumbs={breadcrumbItems} />
        </Box>

        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/sales/maintenance/sales-areas/add-sales-area")}
          >
            Add Area
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

      {/* Search Bar */}
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

      <Stack sx={{ alignItems: "center" }}>
        <TableContainer
          component={Paper}
          elevation={2}
          sx={{ overflowX: "auto", maxWidth: isMobile ? "88vw" : "100%" }}
        >
          <Table aria-label="sales area table">
            <TableHead sx={{ backgroundColor: "var(--pallet-lighter-blue)" }}>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Area Name</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedAreas.length > 0 ? (
                paginatedAreas.map((area, index) => (
                  <TableRow key={area.id} hover>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{area.areaName}</TableCell>
                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                      >
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() =>
                            navigate(
                              "/sales/maintenance/sales-areas/update-sales-area"
                              // `/sales/maintenance/sales-areas/update-sales-area/${area.id}`
                              )
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDelete(area.id)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <Typography variant="body2">No Records Found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={filteredAreas.length}
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

export default SalesAreaTable;
