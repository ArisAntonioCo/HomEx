import React, { useState, useEffect } from 'react';
import Sidebar from "../components/sidebar";
import Drawer from "../components/drawer";
import AddModalMaint from '../components/popups/add-modal-maint';  // Ensure this component exists
import EditModalMaint from '../components/popups/edit-modal-maint';  // Ensure this component exists
import "./maint-page.css";

const MaintPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
  };

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
    <div className="maintpage">
      <Sidebar />
      {isDrawerOpen && <Drawer />}

      <main className="maint-panel">
        <header className="mobile-devices4" onClick={toggleDrawer}>
          <div className="container10">
            <img className="menu-icon4" loading="lazy" alt="Menu Icon" src="/menu.svg" />
          </div>
        </header>

        <section className="container11">
          <div className="maintenancecard1">
            <div className="label9">
              <img
                className="union-icon1"
                loading="lazy"
                alt=""
                src="/union1@2x.png"
              />
              <h1 className="maintenance1">Maintenance</h1>
              <div className="total16">
                <div className="total17">Total $</div>
              </div>
            </div>
            <div className="maintenancetotal1">$999</div>
          </div>

          <div className="container12">
            <div className="heading3">
              <div className="h16">
                <h2 className="expenses3">Expenses/</h2>
                <h2 className="maintenance2">Maintenance</h2>
              </div>
              <button className="addexbtn3" onClick={toggleAddModal}>
                <img className="vector-icon2" alt="" src="/vector-10.svg" />
                <div className="add-expense6">Add Expense</div>
              </button>
            </div>

            <div className="table3">
              <div className="row6">
                <div className="header-cell12">
                  <div className="service-provider3">Description</div>
                </div>
                <div className="header-cell13">
                  <div className="date-paid3">Date Paid</div>
                </div>
                <div className="header-cell14">
                  <div className="amount3">Amount</div>
                </div>
                <div className="header-cell15">
                  <div className="action3">Action</div>
                </div>
              </div>
              <div className="row7">
                <div className="table-cell12">
                  <div className="noreco3">Noreco</div>
                </div>
                <div className="table-cell13">
                  <div className="sample-date3">Sample Date</div>
                </div>
                <div className="table-cell14">
                  <div className="p-100003">P 10,000</div>
                </div>
                <div className="table-cell15">
                  <div className="buttons3">
                    <button className="edit-button3" onClick={toggleEditModal}>
                      <div className="edit3">Edit</div>
                    </button>
                    <button className="delete-button3">
                      <div className="delete3">Delete</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {showAddModal && (
          <div className="modal-backdrop">
            <AddModalMaint close={toggleAddModal} />
          </div>
        )}
        {showEditModal && (
          <div className="modal-backdrop">
            <EditModalMaint close={toggleEditModal} />
          </div>
        )}
      </main>
    </div>
  );
};

export default MaintPage;
