import Sidebar from "../components/sidebar";
import "./maint-page.css";

const MaintPage = () => {
  return (
    <div className="maintpage">

      <Sidebar />
      
      {/* MAINTENANCE PANEL*/}
      <main className="maint-panel">
        <div className="mobile-devices4">
          <div className="container10">
            <img className="menu-icon4" loading="lazy" alt="" src="/menu.svg" />
          </div>
        </div>

        {/* MAINTENANCE CARD*/}
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
              <button className="total16">
                <div className="total17">Total $</div>
              </button>
            </div>
            {/* MAINTENANCE TOTAL PROPERTY*/}
            <div className="maintenancetotal1">$999</div>
          </div>
          <form className="container12">
            <div className="heading3">
              <div className="h16">
                <h2 className="expenses3">Expenses/</h2>
                <h2 className="maintenance2">Maintenance</h2>
              </div>

              {/* ADD POPUP BUTTON */}
              <button className="addexbtn3">
                <img className="vector-icon2" alt="" src="/vector-10.svg" />
                <div className="add-expense3">Add Expense</div>
              </button>
            </div>

            {/* TABLE CONTAINER */}
            <div className="table3">

               {/* TABLE HEADER */}
              <div className="row6">
                <div className="header-cell12">
                  <div className="service-provider3">Service Provider</div>
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
              
              {/* TABLE ROW 
                  Sample Data lng ni
                  Pwede ra i copy ag classes sa pag add para consistent ag UI
              */}
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
                   {/* EDIT POPUP BUTTON */}
                  <div className="buttons3">
                    <button className="edit-button3">
                      <div className="edit3">Edit</div>
                    </button>
                     {/* DELETE  BUTTON */}
                    <button className="delete-button3">
                      <div className="delete3">Delete</div>
                    </button>
                  </div>
                </div>
              </div>
              {/* END TABLE ROW
              */}
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default MaintPage;
