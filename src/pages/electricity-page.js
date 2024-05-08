import Sidebar from "../components/sidebar";
import "./electricity-page.css";

const ElectricityPage = () => {
  return (
    <div className="electricitypage1">

      <Sidebar />

      {/* ElECTRICITY PANEL */}
      <main className="electricity-panel1">

        {/* DRAWER FOR MOBILE DEVICES */}
        <header className="mobile-devices6">
          <div className="container15">
            <img className="menu-icon6" loading="lazy" alt="" src="/menu.svg" />
          </div>
        </header>

        {/* ELECTRICITY TOTAL CARD */}
        <section className="container16">
          <div className="electricitycard2">
            <div className="label10">
              <img
                className="electricityicon2"
                loading="lazy"
                alt=""
                src="/electricityicon2@2x.png"
              />
              <h1 className="electricity3">Electricity</h1>
              <div className="total18">
                <div className="total19">Total $</div>
              </div>
            </div>
             {/* PROPERTY */}
            <div className="electricitytotal2">$999</div>
          </div>

          <div className="container17">
            <div className="heading4">
              <div className="h17">
                <h2 className="expenses4">Expenses/</h2>
                <h2 className="electricity4">Electricity</h2>
              </div>

               {/* ADD POPUP BUTTON */}
              <button className="addexbtn4">
                <img className="vector-icon3" alt="" src="/vector-10.svg" />
                <div className="add-expense4">Add Expense</div>
              </button>
            </div>

            {/* TABLE CONTAINER */}
            <div className="table4">

              {/* TABLE HEADER */}
              <div className="row8">
                <div className="header-cell16">
                  <div className="service-provider4">Service Provider</div>
                </div>
                <div className="header-cell17">
                  <div className="date-paid4">Date Paid</div>
                </div>
                <div className="header-cell18">
                  <div className="amount4">Amount</div>
                </div>
                <div className="header-cell19">
                  <div className="action4">Action</div>
                </div>
              </div>

              {/* TABLE ROW 
                  Sample Data lng ni
                  Pwede ra i copy ag classes sa pag add para consistent ag UI
              */}
              <div className="row9">
                <div className="table-cell16">
                  <div className="noreco4">Noreco</div>
                </div>
                <div className="table-cell17">
                  <div className="sample-date4">Sample Date</div>
                </div>
                <div className="table-cell18">
                  <div className="p-100004">P 10,000</div>
                </div>
                <div className="table-cell19">
                   {/* EDIT POPUP BUTTON */}
                  <div className="buttons4">
                    <button className="edit-button4">
                      <div className="edit4">Edit</div>
                    </button>
                    {/* DELETE BUTTON */}
                    <button className="delete-button4">
                      <div className="delete4">Delete</div>
                    </button>
                  </div>
                </div>
              </div>
              {/* END TABLE ROW
              */}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ElectricityPage;
