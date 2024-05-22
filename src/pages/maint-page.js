import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/sidebar";
import Drawer from "../components/drawer";
import AddModalMaint from "../components/popups/add-modal-maint";
import EditModalMaint from "../components/popups/edit-modal-maint";
import {
  fetchMaintenanceExpenses,
  updateMaintenanceExpense,
  deleteMaintenanceExpense,
  addMaintenanceExpense,
} from "../Redux/maintSlice"; // Assuming you have a similar slice for maintenance
import "./misc-page.css";

const MaintPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const dispatch = useDispatch();
  const { expenses, totalBillAmount, loading, error } = useSelector(
    (state) => state.maintenance // Access data from maintenance slice
  );

  useEffect(() => {
    dispatch(fetchMaintenanceExpenses()); // Fetch maintenance expenses
  }, [dispatch, refreshKey]);

  const handleEditClick = (expense) => {
    setSelectedExpenseId(expense);
    toggleEditModal();
  };

  const handleEditExpense = (updatedExpense) => {
    dispatch(updateMaintenanceExpense(updatedExpense));
    setSelectedExpenseId(null);
    refreshTable();
  };

  const handleDeleteClick = (expenseId) => {
    setSelectedExpenseId(expenseId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (selectedExpenseId) {
      dispatch(deleteMaintenanceExpense(selectedExpenseId));
      setSelectedExpenseId(null);
      refreshTable();
    }
    setShowDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleAddExpense = (newExpense) => {
    dispatch(addMaintenanceExpense(newExpense));
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

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="miscpage">
            {windowWidth > 768 ? <Sidebar /> : isDrawerOpen && <Drawer />}


      <main className="misc-panel">
        <header className="mobile-devices5" onClick={toggleDrawer}>
          <div className="container13">
            <img
              className="menu-icon5"
              loading="lazy"
              alt="Menu Icon"
              src="/menu.svg"
            />
          </div>
        </header>
        {showDeleteConfirmation && (
          <div className="delete-confirmation-modal">
            <p>Are you sure you want to delete this expense?</p>
            <button onClick={handleConfirmDelete}>Yes</button>
            <button onClick={handleCancelDelete}>No</button>
          </div>
        )}
        <section className="container14">
          <div className="misccard1">
            <div className="label11">
              <img
                className="miscicon1"
                loading="lazy"
                alt=""
                src="/miscicon1@2x.png"
              />
              <h1 className="miscellaneous7">Miscellaneous</h1>
              <button className="total20">
                <div className="total21">Total $</div>
              </button>
            </div>
            <div className="misctotal1">${totalBillAmount}</div>
          </div>

          <div className="container31">
            {" "}
            {/* Removed the <form> element */}
            <div className="heading6">
              <div className="h18">
                <h2 className="expenses15">Expenses/</h2>
                <h2 className="miscellaneous8">Maintenance</h2>
              </div>
              <button className="addexbtn5" onClick={toggleAddModal}>
                <img className="edit-button-icon" alt="" src="/vector-10.svg" />
                <div className="add-expense5">Add Expense</div>
              </button>
            </div>
            <div className="table5">
              <div className="row10">
                <div className="header-cell20">
                  <div className="service-provider5">Description</div>
                </div>
                <div className="header-cell21">
                  <div className="date-paid5">Date Paid</div>
                </div>
                <div className="header-cell22">
                  <div className="amount3">Amount</div>
                </div>
                <div className="header-cell23">
                  <div className="action5">Action</div>
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
                  <div className="row11" key={expense.expenseId}>
                    <div className="table-cell20">{expense.billMonth}</div>
                    <div className="table-cell21">
                      {new Date(expense.datePaid).toISOString().slice(0, 10)}
                    </div>
                    <div className="table-cell22">${expense.billAmount}</div>
                    <div className="table-cell23">
                      <div className="buttons5">
                        <button
                          className="edit-button5"
                          onClick={() => handleEditClick(expense)}
                        >
                          <div className="edit5">Edit</div>
                        </button>

                        <button
                          className="delete-button5"
                          onClick={() => handleDeleteClick(expense.expensesId)}
                        >
                          <div className="delete6">Delete</div>
                        </button>
                      </div>
                    </div>
                    <div style={{ display: "none" }}>{expense.expenseId}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

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
      </main>
    </div>
  );
};

export default MaintPage;
