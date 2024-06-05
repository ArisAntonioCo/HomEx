import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/sidebar";
import {
  fetchEmployees,
  updateEmployee,
  deleteEmployee,
  addEmployee,
} from "../Redux/employeeSlice";
import "./employee-page.css";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import ConfirmationDialog from "../components/popups/confirmationDialogue";
import AddEmployeeModal from "../components/popups/addEmployeeModal";
import EditEmployeeModal from "../components/popups/editEmployeeModal";
import { fetchJobTitles } from "../Redux/jobtitlesSlice";
import { fetchDepartments } from "../Redux/departmentsSlice";
import ReusableSnackbar from "./../components/popups/reusableSnackbar";
const EmployeePage = () => {
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
  const jobTitles = useSelector((state) => state.jobTitle);
  const departments = useSelector((state) => state.department);
  const { employees, loading, error } = useSelector((state) => state.employee);
  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchJobTitles());
    dispatch(fetchDepartments());
  }, [dispatch, refreshKey]);

  const handleEditClick = (employee) => {
    console.log(employee);
    setSelectedId(employee);
    refreshTable();
    openEditModal();
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
      dispatch(deleteEmployee(selectedId)).then(() => {
        refreshTable();
      });
      setSelectedId(null);
    }
    setShowDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const refreshTable = () => {
    setRefreshKey((oldKey) => oldKey + 1);
  };

  const openEditModal = () => {
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const selectedEmployee = employees.find(
    (employee) => employee.employee_id === selectedId
  );
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
          <ReusableSnackbar
            open={open}
            message={successMessage}
            severity="success"
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          />
        )}
        <section className="container16">
          <div className="container17">
            <div className="heading4">
              <div className="h17">
                <h2 className="expenses4">Manage/</h2>
                <h2 className="employee4">Employee</h2>
              </div>
              <AddEmployeeModal
                onSuccess={setSuccessMessage}
                jobTitles={jobTitles}
                departments={departments}
              >
                <img className="vector-icon3" alt="" src="/vector-10.svg" />
                <div className="add-expense4">Add Employee</div>
              </AddEmployeeModal>
            </div>

            <div className="table5">
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
            </div>
            <div className="table4">
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
                    <div className="table-cell">{employee.date_of_birth}</div>
                    <div className="table-cell18">{employee.address}</div>
                    <div className="table-cell18">
                      {employee.department_name}
                    </div>
                    <div className="table-cell18">
                      {employee.job_title_name}
                    </div>
                    <div className="table-cell">{employee.hire_date}</div>
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

      {showEditModal && selectedId && (
  <div className="modal-backdrop">
    <EditEmployeeModal
    jobTitles={jobTitles}
    departments={departments}
      close={() => {
        toggleEditModal();
        refreshTable();
      }}
      employee={selectedId} // Pass the selected employee data
      onSave={handleEdit}
      onSuccess={setSuccessMessage}
      open={openEditModal} // Pass the showEditModal state as a prop
      handleClose={closeEditModal} // Pass the closeEditModal function as a prop
    />
  </div>
)}
    </div>
  );
};

export default EmployeePage;
