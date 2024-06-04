import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/sidebar";
// import AddModalWater from "../components/popups/add-modal-departments";
// import EditModalWater from "../components/popups/edit-modal-departments";
import {
  fetchDepartments,
  updateDepartment,
  deleteDepartment,
  addDepartment
} from "../Redux/departmentsSlice";
import "./dept-page.css";

const DeptPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedDeptId, setSelectedExpenseId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const dispatch = useDispatch();
  const { departments, totalBillAmount, loading, error } = useSelector(
    (state) => state.departments
  );

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch, refreshKey]);

  const handleEditClick = (department) => {
    setSelectedExpenseId(department);
    toggleEditModal();
  };

  const handleEditExpense = (updatedDepartment) => {
    dispatch(updateDepartment(updatedDepartment));
    setSelectedExpenseId(null);
    refreshTable();
  };

  const handleDeleteClick = (deptId) => {
    setSelectedExpenseId(deptId);
    setShowDeleteConfirmation(true);
  };
  
  const handleConfirmDelete = () => {
    if (selectedDeptId) {
      dispatch(deleteDepartment(selectedDeptId));
      setSelectedExpenseId(null);
      refreshTable();
    }
    setShowDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleAddExpense = (newExpense) => {
    dispatch(addDepartment(newExpense));
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
    <div className="deptpage">

      <Sidebar />
      
      <main className="dept-panel">

        {showDeleteConfirmation && (
        <div className="delete-confirmation-modal">
          <p>Are you sure you want to delete this?</p>
          <button onClick={handleConfirmDelete}>Yes</button>
          <button onClick={handleCancelDelete}>No</button>
        </div>
      )}
        <section className="container1">

          <div className="container2">
            <div className="heading">
              <div className="h1">
                <h2 className="manage">Manage/</h2>
                <h2 className="dept">Department</h2>
              </div>
              <button className="addexbtn" onClick={toggleAddModal}>
                <img className="vector-icon" alt="" src="/vector-10.svg" />
                <div className="add-dept">Add Department</div>
              </button>
            </div>

            <div className="table">
              <div className="row">
                <div className="header-cell">
                  <div className="dept-name">Department Name</div>
                </div>
                <div className="header-cell">
                  <div className="action">Action</div>
                </div>
              </div>

              {/* Conditional Rendering for Table Data */}
              {loading ? (
                <div className="loading-indicator">Loading Department...</div>
              ) : error ? (
                <div className="error-message">Error: {error.message}</div>
              ) : (
                // Table Rows (dynamically generated)
                departments.map((department) => (
                  <div className="row" key={department.deptId}>
                    <div className="table-cell">{department.billMonth}</div>
                    <div className="table-cell">{new Date(department.datePaid).toISOString().slice(0,10)}</div>
                    <div className="table-cell">${department.billAmount}</div>
                    <div className="table-cell">
                      <button
                        className="edit-button"
                        onClick={() => handleEditClick(department)}
                      >
                        Edit
                      </button>
                      
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteClick(department.departmentsId)}
                      >
                        Delete
                      </button>
                    </div>
                    <div style={{display: 'none'}}>{department.deptId}</div>
                  </div>
                ))
              )}
              
            </div>
          </div>
        </section>
      </main>

      {showAddModal && (
        <div className="modal-backdrop">
          <AddModalWater
            close={() => {
              toggleAddModal();
              refreshTable();
            }}
            onAddExpense={handleAddExpense}
          />
        </div>
      )}
      {showEditModal && (
        <div className="modal-backdrop">
          <EditModalWater 
            close={() => {
              toggleEditModal();
              refreshTable();
            }}
            department={selectedDeptId}
            onSave={handleEditExpense} 
          />
        </div>
      )}
    </div>
  );
};

export default DeptPage;