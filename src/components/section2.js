import "./section2.css";

const Section2 = () => {
  return (
    <section className="section3">
      <div className="subheading">
        <h1 className="track-employee-effortlessly">
          Track Employee Records
        </h1>
        <div className="our-platforms-intuitive-container">
          <p className="our-platforms-intuitive">
          Our platform's intuitive tabs for various categories streamline employee record management.
          </p>
          <p className="modules-to-monitor">
            {" "}
            Easily navigate through modules to monitor every aspect of your workforce, ensuring you stay in control effortlessly.
          </p>
        </div>
      </div>
      <div className="cards">
        <div className="card1">
          <div className="container22">
            <div className="top-content1">
              <b className="b">1</b>
              <h1 className="create-employee">
                <p className="create">Create</p>
      
              </h1>
            </div>
            <div className="bottom-content">
              <div className="quickly-input-your">
                Quickly input employee details to start tracking records efficiently.
              </div>
            </div>
          </div>
        </div>
        <div className="card2">
          <div className="container22">
            <div className="top-content1">
              <b className="b1">2</b>
              <h1 className="read-employee">
                <p className="read">Read</p>

              </h1>
            </div>
            <div className="bottom-content1">
              <div className="easily-review-your">
                Easily review your employee records for a clear understanding
                on management.
              </div>
            </div>
          </div>
        </div>
        <div className="card3">
          <div className="container23">
            <div className="top-content2">
              <b className="b2">3</b>
              <h1 className="update-employee">
                <p className="update">Update</p>
              </h1>
            </div>
            <div className="bottom-content2">
              <div className="seamlessly-modify-and">
                Seamlessly modify and refine your employee data as needed with
                simple editing tools.
              </div>
            </div>
          </div>
        </div>
        <div className="card4">
          <div className="container24">
            <div className="top-content3">
              <b className="b3">4</b>
              <h1 className="delete-employee">
                <p className="delete5">Delete</p>
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
