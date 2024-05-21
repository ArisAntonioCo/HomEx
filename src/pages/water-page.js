import React, { useState, useEffect } from 'react';
import Sidebar from "../components/sidebar";
import Drawer from "../components/drawer";
import AddModalWater from '../components/popups/add-modal-water';  // Make sure this component exists
import EditModalWater from '../components/popups/edit-modal-water';  // Make sure this component exists
import "./water-page.css";

const WaterPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleAddModal = () => setShowAddModal(!showAddModal);
  const toggleEditModal = () => setShowEditModal(!showEditModal);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) { // Assuming 768px as a threshold for full screen
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="waterpage">
      <Sidebar />
      {isDrawerOpen && <Drawer />}

      <main className="water-panel">
        <header className="mobile-devices" onClick={toggleDrawer}>
          <div className="container">
            <img className="menu-icon" loading="lazy" alt="" src="/menu.svg" />
          </div>
        </header>

        <section className="container1">
          <div className="watercard">
            <div className="label">
              <img className="watericon" loading="lazy" alt="" src="/watericon@2x.png" />
              <h1 className="water">Water</h1>
              <div className="total">
                <div className="total1">Total $</div>
              </div>
            </div>
            <div className="watertotal">$999</div>
          </div>

          <div className="container2">
            <div className="heading">
              <div className="h1">
                <h2 className="expenses">Expenses/</h2>
                <h2 className="water1">Water</h2>
              </div>
              <button className="addexbtn" onClick={toggleAddModal}>
                <img className="editing-cell-icon" alt="" src="/vector-10.svg" />
                <div className="add-expense">Add Expense</div>
              </button>
            </div>

            <div className="table">
              <div className="row">
                <div className="header-cell">
                  <div className="service-provider">Service Provider</div>
                </div>
                <div className="header-cell1">
                  <div className="date-paid">Date Paid</div>
                </div>
                <div className="header-cell2">
                  <div className="amount">Amount</div>
                </div>
                <div className="header-cell3">
                  <div className="action">Action</div>
                </div>
              </div>

              {/* Example Row (static data) */}
              <div className="row1">
                <div className="table-cell">
                  <div className="noreco">Noreco</div>
                </div>
                <div className="table-cell1">
                  <div className="sample-date">Sample Date</div>
                </div>
                <div className="table-cell2">
                  <div className="p-10000">P 10,000</div>
                </div>
                <div className="table-cell3">
                  <div className="buttons">
                    <button className="edit-button" onClick={toggleEditModal}>
                      <div className="edit">Edit</div>
                    </button>
                    <button className="delete-button">
                      <div className="delete">Delete</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {showAddModal && (
        <div className="modal-backdrop">
          <AddModalWater close={toggleAddModal} />
        </div>
      )}
      {showEditModal && (
        <div className="modal-backdrop">
          <EditModalWater close={toggleEditModal} />
        </div>
      )}
    </div>
  );
};

export default WaterPage;
