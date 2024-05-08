import Sidebar from "../components/sidebar";
import "./water-page.css";

const WaterPage = () => {
  return (
    <div className="waterpage">

      <Sidebar />

      {/* WATER PANEL */}
      <main className="water-panel">

        {/* DRAWER FOR MOBILE DEVICES */}
        <header className="mobile-devices">
          <div className="container">
            <img className="menu-icon" loading="lazy" alt="" src="/menu.svg" />
          </div>
        </header>

         {/* FOOD TOTAL CARD */}
        <section className="container1">
          <div className="watercard">
            <div className="label">
              <img
                className="watericon"
                loading="lazy"
                alt=""
                src="/watericon@2x.png"
              />
              <h1 className="water">Water</h1>
              <div className="total">
                <div className="total1">Total $</div>
              </div>
            </div>
            {/* PROPERTY */}
            <div className="watertotal">$999</div>
          </div>
          <div className="container2">
            <div className="heading">
              <div className="h1">
                <h2 className="expenses">Expenses/</h2>
                <h2 className="water1">Water</h2>
              </div>

               {/* ADD POPUP BUTTON */}
              <button className="addexbtn">
                <img
                  className="editing-cell-icon"
                  alt=""
                  src="/vector-10.svg"
                />
                <div className="add-expense">Add Expense</div>
              </button>
            </div>

             {/* TABLE CONTAINER */}
            <div className="table">

               {/* TABLE HEADER */}
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

              {/* TABLE ROW 
                  Sample Data lng ni
                  Pwede ra i copy ag classes sa pag add para consistent ag UI
              */}
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

                     {/* EDIT POPUP BUTTON */}
                    <button className="edit-button">
                      <div className="edit">Edit</div>
                    </button>

                    {/* DELETE BUTTON */}
                    <button className="delete-button">
                      <div className="delete">Delete</div>
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

export default WaterPage;
