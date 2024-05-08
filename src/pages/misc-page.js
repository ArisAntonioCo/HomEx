import Sidebar from "../components/sidebar";
import "./misc-page.css";

const MiscPage = () => {
  return (
    <div className="miscpage">

      <Sidebar />

      {/* MISC PANEL*/}
      <main className="misc-panel">
        <header className="mobile-devices5">
          <div className="container13">
            <img className="menu-icon5" loading="lazy" alt="" src="/menu.svg" />
          </div>
        </header>

        <section className="container14">

        {/* MISC TOTAL CARD */}
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
          {/* PROPERTY */}
          <div className="misctotal1">$999</div>
        </div>


          <form className="container31">
            <div className="heading6">
              <div className="h18">
                <h2 className="expenses15">Expenses/</h2>
                <h2 className="miscellaneous8">Miscellaneous</h2>
              </div>
              
              {/* ADD POPUP BUTTON */}
              <button className="addexbtn5">
                <img className="edit-button-icon" alt="" src="/vector-10.svg" />
                <div className="add-expense5">Add Expense</div>
              </button>
            </div>

            {/* TABLE CONTAINER */}
            <div className="table5">

              {/* TABLE HEADER */}
              <div className="row10">
                <div className="header-cell20">
                  <div className="service-provider5">Service Provider</div>
                </div>
                <div className="header-cell21">
                  <div className="date-paid5">Date Paid</div>
                </div>
                <div className="header-cell22">
                  <div className="amount5">Amount</div>
                </div>
                <div className="header-cell23">
                  <div className="action5">Action</div>
                </div>
              </div>

              {/* TABLE ROW 
                  Sample Data lng ni
                  Pwede ra i copy ag classes sa pag add para consistent ag UI
              */}
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
                   {/* EDIT POPUP BUTTON */}
                  <div className="buttons5">
                    <button className="edit-button5">
                      <div className="edit5">Edit</div>
                    </button>
                    {/* DELETE  BUTTON */}
                    <button className="delete-button5">
                      <div className="delete6">Delete</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* END TABLE ROW
              */}
          </form>
        </section>
      </main>
    </div>
  );
};

export default MiscPage;
