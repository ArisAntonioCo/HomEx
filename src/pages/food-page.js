import Sidebar from "../components/sidebar";
import "./food-page.css";

const FoodPage = () => {
  return (
    <div className="foodpage">
      
      <Sidebar />

      {/* FOOD PANEL */}
      <main className="food-panel">

        {/* DRAWER FOR MOBILE DEVICES */}
        <header className="mobile-devices3"> 
          <div className="container7">
            <img className="menu-icon3" loading="lazy" alt="" src="/menu.svg" />
          </div>
        </header>

        {/* FOOD TOTAL CARD */}
        <section className="container8">
          <div className="foodcard1">
            <div className="label8">
              <img
                className="foodicon1"
                loading="lazy"
                alt=""
                src="/foodicon1@2x.png"
              />
              <h1 className="food1">Food</h1>
              <div className="total14">
                <div className="total15">Total $</div>
              </div>
            </div>
            {/* PROPERTY */}
            <div className="foodtotal1">$999</div>
          </div>

          <div className="container9">
            <div className="heading2">
              <div className="h15">
                <h2 className="expenses2">Expenses/</h2>
                <h2 className="food2">Food</h2>
              </div>

              {/* ADD POPUP BUTTON */}
              <button className="addexbtn2">
                <img className="vector-icon1" alt="" src="/vector-10.svg" />
                <div className="add-expense2">Add Expense</div>
              </button>
            </div>

            {/* TABLE CONTAINER */}
            <div className="table2">

              {/* TABLE HEADER */}
              <div className="row4">
                <div className="header-cell8">
                  <div className="service-provider2">Service Provider</div>
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

              {/* TABLE ROW 
                  Sample Data lng ni
                  Pwede ra i copy ag classes sa pag add para consistent ag UI
              */}
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

                    {/* EDIT POPUP BUTTON */}
                    <button className="edit-button2">
                      <div className="edit2">Edit</div>
                    </button>

                    {/* DELETE BUTTON */}
                    <button className="delete-button2">
                      <div className="delete2">Delete</div>
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

export default FoodPage;
