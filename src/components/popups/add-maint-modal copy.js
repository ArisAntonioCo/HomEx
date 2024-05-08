import "./add-modal.css";

const AddMaintModal = () => {
  return (
    <div className="add-modal">
      <section className="addform">
        {/*FORM CONTAINER*/}
        <form className="container">
          <div className="content">
            <div className="sub-container">
              <div className="add-expense-container">
                <p className="add-expense">Add Expense</p>
                <p className="expense-name">Maintenance</p>
              </div>
              <img
                className="amount-service-provider-label"
                loading="lazy"
                alt=""
                src="/vector.svg"
              />
            </div>
            
            {/*INPUT FORM*/}
            <div className="input">
              <div className="amount">
                <input
                  className="service-provider"
                  placeholder="Service Provider"
                  type="text"
                />
              </div>
              <div className="date">
                <input className="date1" placeholder="Date" type="text" />
              </div>
              <div className="name">
                <input className="amount1" placeholder="Amount" type="text" />
              </div>
            </div>
          </div>

          {/*ADD BUTTON*/}
          <button className="button">
            <button className="container1">
              <img className="vector-icon" alt="" src="/vector-1.svg" />
              <div className="add-expense1">Add Expense</div>
            </button>
          </button>
        </form>
      </section>
    </div>
  );
};

export default AddMaintModal;
