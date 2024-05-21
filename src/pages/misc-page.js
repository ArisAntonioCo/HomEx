import React, { useState, useEffect } from 'react';
import Sidebar from "../components/sidebar";
import Drawer from "../components/drawer";
import AddModalMisc from '../components/popups/add-modal-misc';
import EditModalMisc from '../components/popups/edit-modal-misc';
import "./misc-page.css";

const MiscPage = () => {
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
    <div className="miscpage">
      <Sidebar />
      {isDrawerOpen && <Drawer />}

      <main className="misc-panel">
        <header className="mobile-devices5" onClick={toggleDrawer}>
          <div className="container13">
            <img className="menu-icon5" loading="lazy" alt="Menu Icon" src="/menu.svg" />
          </div>
        </header>

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
            <div className="misctotal1">$999</div>
          </div>

          <form className="container31">
            <div className="heading6">
              <div className="h18">
                <h2 className="expenses15">Expenses/</h2>
                <h2 className="miscellaneous8">Miscellaneous</h2>
              </div>
              <button className="addexbtn5" onClick={toggleAddModal}>
                <img className="edit-button-icon" alt="" src="/vector-10.svg" />
                <div className="add-expense5">Add Expense</div>
              </button>
            </div>

            <div className="table5">
              <div className="row10">
                <div className="header-cell20">
                  <div className="service-provider5">Name</div>
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
              <div className="row11">
                <div className="table-cell20">
                  <div className="noreco5">Noreco</div>
                </div>
                <div className="table-cell21">
                  <div className="sample-date5">Sample Date</div>
                </div>
                <div className="table-cell22">
                  <div className="p-100005">P 10,000</div>
                </div>
                <div className="table-cell23">
                  <div className="buttons5">
                    <button className="edit-button5" onClick={toggleEditModal}>
                      <div className="edit5">Edit</div>
                    </button>
                    <button className="delete-button5">
                      <div className="delete6">Delete</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>

        {showAddModal && (
          <div className="modal-backdrop">
            <AddModalMisc close={toggleAddModal} />
          </div>
        )}
        {showEditModal && (
          <div className="modal-backdrop">
            <EditModalMisc close={toggleEditModal} />
          </div>
        )}
      </main>
    </div>
  );
};

export default MiscPage;
