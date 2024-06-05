import "./section.css";

const Section = () => {
  return (
    <section className="section1">
      <div className="text-wrapper1">
        <h1 className="frequently-asked-questions">
          Frequently Asked Questions
        </h1>
      </div>
      <div className="wrapper">
        <div className="questioncontainer">
          <h2 className="can-i-access">
            Can I access HomeEx on multiple devices?
          </h2>
          <div className="homeex-is-designed">
            HomeEx is designed to be accessible from any device with an internet
            connection. Whether you're on your computer, tablet, or smartphone,
            you can easily log in to your HomeEx account and manage your home
            expenses on the go.
          </div>
        </div>
        <div className="questioncontainer1">
          <h2 className="what-types-of">
            What types of expenses can I track with HomeEx?
          </h2>
          <div className="homeex-allows-you">
            HomeEx allows you to track a wide range of household expenses,
            including but not limited to electricity bills, grocery expenses,
            water bills, miscellaneous purchases, and maintenance costs. Our
            intuitive platform provides customizable categories so you can
            tailor your expense tracking to fit your specific needs.
          </div>
        </div>
        <div className="questioncontainer2">
          <h2 className="is-homeex-responsive">
            Is HomeEx responsive on Mobile?
          </h2>
          <div className="homeex-is-fully">
            HomeEx is fully responsive on mobile devices, ensuring that you can
            conveniently track your expenses on the go. Simply access HomeEx
            through your mobile browser, and you'll have seamless access to all
            features and functionalities, optimized for mobile viewing.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
