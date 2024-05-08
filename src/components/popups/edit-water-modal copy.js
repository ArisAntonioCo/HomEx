import "./edit-modal.css";

const EditWaterModal = () => {
  return (
    <div className="edit-modal">
      <section className="editform">
        {/*FORM CONTAINER*/}
        <form className="container2">
          <div className="content1">
            <div className="topframe">
              <div className="edit-expense-container">
                <p className="edit-expense">Edit Expense</p>
                <p className="expense-name">Water</p>
              </div>
              <img
                className="vector-icon1"
                loading="lazy"
                alt=""
                src="/vector.svg"
              />
            </div>
            {/*INPUT FORM*/}
            <div className="input1">
              <div className="amount2">
                <input
                  className="service-provider1"
                  placeholder="Service Provider"
                  type="text"
                />
              </div>
              <div className="date2">
                <input className="date3" placeholder="Date" type="text" />
              </div>
              <div className="name1">
                <input className="amount3" placeholder="Amount" type="text" />
              </div>
            </div>
          </div>

          {/*UPDATE BUTTON*/}
          <button className="button1">
            <div className="container3">
              <img className="vector-icon2" alt="" src="/vector-1.svg" />
              <div className="update-expense">Update Expense</div>
            </div>
          </button>


        </form>
      </section>
    </div>
  );
};

export default EditWaterModal;
