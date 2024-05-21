import React, { useState, useEffect } from 'react';
import Sidebar from "../components/sidebar";
import Drawer from "../components/drawer";
import AddModalFood from '../components/popups/add-modal-food';
import EditModalFood from '../components/popups/edit-modal-food';
import "./food-page.css";

const FoodPage = () => {
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
    <div className="foodpage">
      <Sidebar />
      {isDrawerOpen && <Drawer />}

      <main className="food-panel">
        <header className="mobile-devices3" onClick={toggleDrawer}>
          <div className="container7">
            <img className="menu-icon3" loading="lazy" alt="Menu Icon" src="/menu.svg" />
          </div>
        </header>

        <section className="container8">
          <div className="foodcard1">
            <div className="label8">
              <img className="foodicon1" loading="lazy" alt="" src="/foodicon1@2x.png" />
              <h1 className="food1">Food</h1>
              <div className="total14">
                <div className="total15">Total $</div>
              </div>
            </div>
            <div className="foodtotal1">$999</div>
          </div>

          <div className="container9">
            <div className="heading2">
              <div className="h15">
                <h2 className="expenses2">Expenses/</h2>
                <h2 className="food2">Food</h2>
              </div>
              <button className="addexbtn2" onClick={toggleAddModal}>
                <img className="vector-icon1" alt="" src="/vector-10.svg" />
                <div className="add-expense4">Add Expense</div>
              </button>
            </div>

            <div className="table2">
              <div className="row4">
                <div className="header-cell8">
                  <div className="service-provider2">Name</div>
                </div>
                <div className="header-cell9">
                  <div className="date-paid2">Date Paid</div>
                </div>
                <div className="header-cell10">
                  <div className="amount2">Amount</div>
                </div>
                <div className="header-cell11">
                  <div className="action2">Action</div>
                </div>
              </div>

              <div className="row5">
                <div className="table-cell8">
                  <div className="noreco2">Noreco</div>
                </div>
                <div className="table-cell9">
                  <div className="sample-date2">Sample Date</div>
                </div>
                <div className="table-cell10">
                  <div className="p-100002">P 10,000</div>
                </div>
                <div className="table-cell11">
                  <div className="buttons2">
                    <button className="edit-button2" onClick={toggleEditModal}>
                      <div className="edit2">Edit</div>
                    </button>
                    <button className="delete-button2">
                      <div className="delete2">Delete</div>
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
          <AddModalFood close={toggleAddModal} />
        </div>
      )}
      {showEditModal && (
        <div className="modal-backdrop">
          <EditModalFood close={toggleEditModal} />
        </div>
      )}
    </div>
  );
};

export default FoodPage;
