import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/sidebar";
// import AddModalMaint from "../components/popups/add-modal-payroll";
// import EditModalMaint from "../components/popups/edit-modal-payroll";
import {
  fetchAllPayrolls,
  updatePayroll,
  deletePayroll,
  addPayroll,
} from "../Redux/payrollSlice"; 
import "./payroll-page.css";

const PayrollPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const dispatch = useDispatch();
  const { expenses, totalBillAmount, loading, error } = useSelector(
    (state) => state.payroll // Access data from payroll slice
  );

  useEffect(() => {
    dispatch(fetchAllPayrolls()); // Fetch payroll expenses
  }, [dispatch, refreshKey]);

  const handleEditClick = (expense) => {
    setSelectedExpenseId(expense);
    toggleEditModal();
  };

  const handleEditExpense = (updatedExpense) => {
    dispatch(updatePayroll(updatedExpense));
    setSelectedExpenseId(null);
    refreshTable();
  };

  const handleDeleteClick = (expenseId) => {
    setSelectedExpenseId(expenseId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (selectedExpenseId) {
      dispatch(deletePayroll(selectedExpenseId));
      setSelectedExpenseId(null);
      refreshTable();
    }
    setShowDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleAddExpense = (newExpense) => {
    dispatch(addPayroll(newExpense));
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
    <div className="payrollpage">
      <Sidebar />
      
      <main className="payroll-panel">

        {showDeleteConfirmation && (

          <div className="delete-confirmation-modal">
            <p>Are you sure you want to delete this?</p>
            <button onClick={handleConfirmDelete}>Yes</button>
            <button onClick={handleCancelDelete}>No</button>
          </div>
        )}
        <section className="container8">

          <div className="container9">
            <div className="heading2">
              <div className="h15">
                <h2 className="manage">Manage/</h2>
                <h2 className="payroll">Payroll</h2>
              </div>
              <button className="addexbtn2" onClick={toggleAddModal}>
                <img className="vector-icon1" alt="" src="/vector-10.svg" />
                <div className="add-expense4">Add Payroll</div>
              </button>
            </div>
            
            <div className="table2">
              <div className="row4">

                <div className="header-cell12">
                  <div className="column-name">Bonus</div>
                </div>

                <div className="header-cell12">
                  <div className="column-name">Deductions</div>
                </div>

                <div className="header-cell12">
                  <div className="column-name">Employee ID</div>
                </div>

                <div className="header-cell12">
                  <div className="column-name">Gross Salary</div>
                </div>

                <div className="header-cell12">
                  <div className="column-name">Net Salary</div>
                </div>

                <div className="header-cell12">
                  <div className="column-name">Pay Period End Date</div>
                </div>

                <div className="header-cell12">
                  <div className="column-name">Pay Period Start Date</div>
                </div>

                <div className="header-cell12">
                  <div className="column-name">Payroll ID</div>
                </div>
                
                <div className="header-cell12">
                  <div className="action">Action</div>
                </div>
              </div>
              {/* Conditional Rendering for Table Data */}
              {loading ? (
                <div className="loading-indicator">Loading expenses...</div>
              ) : error ? (
                <div className="error-message">Error: {error.message}</div>
              ) : (
                // Table Rows (dynamically generated)
                expenses.map((expense) => (
                  <div className="row" key={expense.expenseId}>
                    <div className="table-cell">{expense.billMonth}</div>
                    <div className="table-cell">{new Date(expense.datePaid).toISOString().slice(0,10)}</div>
                    <div className="table-cell">${expense.billAmount}</div>
                    <div className="table-cell">
                      <button
                        className="edit-button"
                        onClick={() => handleEditClick(expense)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() => {handleDeleteClick(expense.expensesId)}}
                      >
                        Delete
                      </button>
                    </div>
                    <div style={{ display: "none" }}>{expense.expenseId}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>

      {showAddModal && (
        <div className="modal-backdrop">
          <AddModalMaint
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
          <EditModalMaint
            close={() => {
              toggleEditModal();
              refreshTable();
            }}
            expense={selectedExpenseId}
            onSave={handleEditExpense}
          />
        </div>
      )}
    </div>
  );
};

export default PayrollPage;
