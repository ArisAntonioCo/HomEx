import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/sidebar";
// import AddModalFood from "../components/popups/add-modal-jobtitles";
// import EditModalFood from "../components/popups/edit-modal-jobtitles";
import {
  fetchJobTitles,
  updateJobTitle,
  deleteJobTitle,
  addJobTitle
} from "../Redux/jobtitlesSlice";
import "./job-page.css";

const JobPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const dispatch = useDispatch();
  const { expenses, totalBillAmount, loading, error } = useSelector(
    (state) => state.jobtitles
  );

  useEffect(() => {
    dispatch(fetchJobTitles());
  }, [dispatch, refreshKey]);

  const handleEditClick = (expense) => {
    setSelectedExpenseId(expense);
    toggleEditModal();
  };

  const handleEditExpense = (updatedExpense) => {
    dispatch(updateJobTitle(updatedExpense));
    setSelectedExpenseId(null);
    refreshTable();
  };

  const handleDeleteClick = (expenseId) => {
    setSelectedExpenseId(expenseId);
    setShowDeleteConfirmation(true);
  };
  
  const handleConfirmDelete = () => {
    if (selectedExpenseId) {
      dispatch(deleteJobTitle(selectedExpenseId));
      setSelectedExpenseId(null);
      refreshTable();
    }
    setShowDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleAddExpense = (newExpense) => {
    dispatch(addJobTitle(newExpense));
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="jobtitpage">
      <Sidebar />
      {isDrawerOpen && <Drawer />}
      <main className="jobtit-panel">
        <header className="mobile-devices3" onClick={toggleDrawer}>
          <div className="container7">
            <img className="menu-icon3" loading="lazy" alt="Menu Icon" src="/menu.svg" />
          </div>
        </header>
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
                <h2 className="jobtitles2">Manage /</h2>
                <h2 className="jobtit2">Job Titles</h2>
              </div>
              <button className="addjobtitbtn2" onClick={toggleAddModal}>
                <img className="vector-icon1" alt="" src="/vector-10.svg" />
                <div className="add-jobtitle4">Add Job Title</div>
              </button>
            </div>

            <div className="table2">
              <div className="row4">
                <div className="header-cell">
                  <div className="job-title">Job Title</div>
                </div>
                <div className="header-cell">
                  <div className="salary">Salary</div>
                </div>
                <div className="header-cell">
                  <div className="action">Action</div>
                </div>
              </div>
              {/* Conditional Rendering for Table Data */}
              {loading ? (
                <div className="loading-indicator">Loading jobtitles...</div>
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
                        onClick={() => handleDeleteClick(expense.expensesId)}
                      >
                        Delete
                      </button>
                    </div>
                    <div style={{display: 'none'}}>{expense.expenseId}</div>
                  </div>
                ))
              )}
              
            </div>
          </div>
        </section>
      </main>

      {showAddModal && (
        <div className="modal-backdrop">
          <AddModalFood
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
          <EditModalFood 
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

export default JobPage;