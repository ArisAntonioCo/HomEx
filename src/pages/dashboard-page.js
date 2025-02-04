import Sidebar from "../components/sidebar";
import "./dashboard-page.css";

const DashboardPage = () => {
  return (
    <div className="dashboardpage">
      <Sidebar />
      <main className="dashboard-panel">
        <div className="mobile-devices2">
          <div className="container6">
            <img className="menu-icon2" loading="lazy" alt="" src="/menu.svg" />
          </div>
        </div>
        <div className="headingcontainer">
          <div className="h14">
            <h1 className="dashboard">Dashboard</h1>
          </div>
          <div className="p">
            <div className="track-and-manage">
              Track and manage your home expenses
            </div>
          </div>
        </div>
        <div className="cardcontainer">
          <div className="topcardcontainer">
            <div className="electricitycard1">
              <div className="label2">
                <img
                  className="electricityicon1"
                  loading="lazy"
                  alt=""
                  src="/electricityicon1@2x.png"
                />
                <h1 className="electricity2">Electricity</h1>
                <div className="total4">
                  <div className="total5">Total $</div>
                </div>
              </div>
              <div className="electricitytotal1">$999</div>
            </div>
            <div className="watercard1">
              <div className="label3">
                <img
                  className="watericon1"
                  loading="lazy"
                  alt=""
                  src="/watericon1@2x.png"
                />
                <h1 className="water2">Water</h1>
                <div className="total6">
                  <div className="total7">Total $</div>
                </div>
              </div>
              <div className="watertotal1">$999</div>
            </div>
            <div className="foodcard">
              <div className="label4">
                <img
                  className="foodicon"
                  loading="lazy"
                  alt=""
                  src="/foodicon@2x.png"
                />
                <h1 className="food">Food</h1>
                <div className="total8">
                  <div className="total9">Total $</div>
                </div>
              </div>
              <div className="foodtotal">$999</div>
            </div>
          </div>
          <div className="middlecardcontainer">
            <div className="maintenancecard">
              <div className="label5">
                <img
                  className="union-icon"
                  loading="lazy"
                  alt=""
                  src="/union@2x.png"
                />
                <h1 className="maintenance">Maintenance</h1>
                <div className="total10">
                  <div className="total11">Total $</div>
                </div>
              </div>
              <div className="maintenancetotal">$999</div>
            </div>
            <div className="misccard">
              <div className="label6">
                <img
                  className="miscicon"
                  loading="lazy"
                  alt=""
                  src="/miscicon@2x.png"
                />
                <h1 className="miscellaneous">Miscellaneous</h1>
                <div className="total12">
                  <div className="total13">Total $</div>
                </div>
              </div>
              <div className="misctotal">$999</div>
            </div>
          </div>
          <div className="bottomcardcontainer">
            <div className="totalexpensescard">
              <div className="label7">
                <h1 className="total-expenses">Total Expenses</h1>
                <img
                  className="expensesicon"
                  loading="lazy"
                  alt=""
                  src="/expensesicon@2x.png"
                />
              </div>
              <div className="expensestotal">$999</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
