import "./section2.css";

const Section2 = () => {
  return (
    <section className="section3">
      <div className="subheading">
        <h1 className="track-expenses-effortlessly">
          Track Expenses Effortlessly
        </h1>
        <div className="our-platforms-intuitive-container">
          <p className="our-platforms-intuitive">
            Our platform's intuitive tabs for electricity, food, water,
            miscellaneous, and maintenance streamline expense tracking. Easily
            navigate through
          </p>
          <p className="modules-to-monitor">
            {" "}
            modules to monitor every aspect of your household spending, ensuring
            you stay in control effortlessly.
          </p>
        </div>
      </div>
      <div className="cards">
        <div className="card1">
          <div className="container21">
            <div className="top-content">
              <b className="b">1</b>
              <h1 className="create-expenses">
                <p className="create">Create</p>
                <p className="expenses6">Expenses</p>
              </h1>
            </div>
            <div className="bottom-content">
              <div className="quickly-input-your">
                Quickly input your spending details to start tracking your
                finances efficiently.
              </div>
            </div>
          </div>
        </div>
        <div className="card2">
          <div className="container22">
            <div className="top-content1">
              <b className="b1">2</b>
              <h1 className="read-expenses">
                <p className="read">Read</p>
                <p className="expenses7">Expenses</p>
              </h1>
            </div>
            <div className="bottom-content1">
              <div className="easily-review-your">
                Easily review your recorded expenses for a clear understanding
                of your spending habits.
              </div>
            </div>
          </div>
        </div>
        <div className="card3">
          <div className="container23">
            <div className="top-content2">
              <b className="b2">3</b>
              <h1 className="update-expenses">
                <p className="update">Update</p>
                <p className="expenses8">Expenses</p>
              </h1>
            </div>
            <div className="bottom-content2">
              <div className="seamlessly-modify-and">
                Seamlessly modify and refine your expense records as needed with
                simple editing tools.
              </div>
            </div>
          </div>
        </div>
        <div className="card4">
          <div className="container24">
            <div className="top-content3">
              <b className="b3">4</b>
              <h1 className="delete-expenses">
                <p className="delete5">Delete</p>
                <p className="expenses9">Expenses</p>
              </h1>
            </div>
            <div className="bottom-content3">
              <div className="effortlessly-remove-outdated">
                Effortlessly remove outdated or unnecessary entries to keep your
                records accurate and organized.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;
