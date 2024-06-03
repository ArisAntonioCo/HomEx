import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/sidebar";
import AddModalElec from "../components/popups/add-modal-elec";
import EditModalElec from "../components/popups/edit-modal-elec";
import {
  fetchEmployees,
  updateEmployee,
  deleteEmployee,
  addEmployee,
} from "../Redux/employeeSlice";
import "./employee-page.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import ConfirmationDialog from "../components/popups/confirmationDialogue";

const EmployeePage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const [successMessage, setSuccessMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (successMessage && !hasShown) {
      setOpen(true);
      setHasShown(true);
    }
  }, [successMessage, hasShown]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const dispatch = useDispatch();
  const { employees, loading, error } = useSelector((state) => state.employee);
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch, refreshKey]);

  const handleEditClick = (expense) => {
    console.log(expense);
    setSelectedId(expense);
    toggleEditModal();
  };

  const handleEdit = (updated) => {
    dispatch(updateEmployee(updated));
    setSelectedId(null);
    refreshTable();
  };

  const handleDeleteClick = (employeeId) => {
    console.log(employeeId);
    setSelectedId(employeeId);
    setShowDeleteConfirmation(true); // Show confirmation modal on first click
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      dispatch(deleteEmployee(selectedId));
      setSelectedId(null);
      refreshTable();
    }
    setShowDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleAdd = (newEmp) => {
    dispatch(addEmployee(newEmp));
    refreshTable();
  };
  const refreshTable = () => {
    setRefreshKey((oldKey) => oldKey + 1);
  };
  const toggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
  };

  return (
    <div className="employeepage1">
      <Sidebar />

      <main className="employee-panel1">
        {showDeleteConfirmation && (
          <ConfirmationDialog
            mode="delete"
            title="Delete Confirmation"
            open={showDeleteConfirmation}
            handleCancel={handleCancelDelete}
            handleConfirm={handleConfirmDelete}
          />
        )}
        {successMessage && (
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <MuiAlert
              onClose={handleClose}
              severity="success"
              elevation={6}
              variant="filled"
            >
              {successMessage}
            </MuiAlert>
          </Snackbar>
        )}
        <section className="container16">
          <div className="container17">
            <div className="heading4">
              <div className="h17">
                <h2 className="expenses4">Manage/</h2>
                <h2 className="employee4">Employee</h2>
              </div>
              <button className="addexbtn4" onClick={toggleAddModal}>
                <img className="vector-icon3" alt="" src="/vector-10.svg" />
                <div className="add-expense4">Add Employee</div>
              </button>
            </div>

            <div className="table4">
              <div className="row8">
                <div className="header-cell16">
                  <div className="service-provider4">empId</div>
                </div>
                <div className="header-cell18">
                  <div className="amount2">f_name</div>
                </div>
                <div className="header-cell18">
                  <div className="amount2">l_name</div>
                </div>
                <div className="header-cell18">
                  <div className="amount2">birthdate</div>
                </div>
                <div className="header-cell17">
                  <div className="date-paid4">Address</div>
                </div>
                <div className="header-cell18">
                  <div className="amount2">deptId</div>
                </div>
                <div className="header-cell18">
                  <div className="amount2">jobId</div>
                </div>
                <div className="header-cell18">
                  <div className="amount2">Hire Date</div>
                </div>
                <div className="header-cell18">
                  <div className="amount2">salary</div>
                </div>
                <div className="header-cell18">
                  <div className="amount2">phone</div>
                </div>
                <div className="header-cell18">
                  <div className="amount2">email</div>
                </div>
                <div className="header-cell18">
                  <div className="amount2">Added By</div>
                </div>
                <div className="header-cell19">
                  <div className="action4">Action</div>
                </div>
              </div>

              {/* Conditional Rendering for Table Data */}
              {loading ? (
                <Box sx={{ width: "100%" }}>
                  <LinearProgress />
                </Box>
              ) : error ? (
                <div className="error-message">Error: {error.message}</div>
              ) : (
                // Table Rows (dynamically generated)
                employees.map((employee) => (
                  <div className="row9" key={employee.employee_id}>
                    <div className="table-cell16">{employee.emp_id}</div>
                    <div className="table-cell16">{employee.first_name}</div>
                    <div className="table-cell16">{employee.last_name}</div>
                    <div className="table-cell">
                      {new Date(employee.date_of_birth)
                        .toISOString()
                        .slice(0, 10)}
                    </div>
                    <div className="table-cell18">{employee.address}</div>
                    <div className="table-cell18">{employee.department_id}</div>
                    <div className="table-cell18">{employee.job_title_id}</div>
                    <div className="table-cell">
                      {new Date(employee.hire_date).toISOString().slice(0, 10)}
                    </div>
                    <div className="table-cell18">${employee.salary}</div>
                    <div className="table-cell18">{employee.phone_number}</div>
                    <div className="table-cell18">{employee.email}</div>
                    <div className="table-cell18">{employee.added_by}</div>
                    <div className="table-cell19">
                      <button
                        className="edit-button4"
                        onClick={(e) => handleEditClick(employee)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button4"
                        onClick={() => handleDeleteClick(employee.employee_id)}
                      >
                        Delete
                      </button>
                    </div>
                    <div style={{ display: "none" }}>
                      {employee.employee_id}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>

      {showAddModal && (
        <div className="modal-backdrop">
          <AddModalElec
            close={() => {
              toggleAddModal();
              refreshTable();
            }}
            onAdd={handleAdd}
            onSuccess={setSuccessMessage}
          />
        </div>
      )}
      {showEditModal && (
        <div className="modal-backdrop">
          <EditModalElec
            close={() => {
              toggleEditModal();
              refreshTable();
            }}
            employees={selectedId}
            onSave={handleEdit}
            onSuccess={setSuccessMessage}
          />
        </div>
      )}
    </div>
  );
};

export default EmployeePage;
