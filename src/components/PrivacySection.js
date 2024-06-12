import "./PrivacySection.css";

const PrivacySection = () => {
  return (
    <section className="section">
      <div className="textcontainer">
        <div className="privacy-policy-wrapper">
          <b className="privacy-policy"> Privacy Policy</b>
        </div>
        <div className="homeex-is-committed-container">
          <p className="homeex-is-committed">
            HomeEx is committed to protecting the privacy of our users. This
            Privacy Policy explains what information we collect, how we use it,
            and under what circumstances we may disclose it.
          </p>
          <p className="blank-line">&nbsp;</p>
          <p className="information-we-collect">
            <b>Information We Collect</b>
          </p>
          <p className="blank-line1">
            <b>&nbsp;</b>
          </p>
          <p className="we-collect-two">
            We collect two types of information from our users:
          </p>
          <p className="blank-line2">&nbsp;</p>
          <p className="personal-information-this-is-i">
            <i className="personal-information">Personal Information</i>
            <span className="this-is-information">
              {" "}
              This is information that can be used to identify you, such as your
              name, email address, and billing information. We only collect
              personal information that you voluntarily provide to us when you
              create an account or use our services.
            </span>
          </p>
          <p className="blank-line3">&nbsp;</p>
          <p className="usage-data-this-is-information">
            <i className="usage-data">Usage Data</i>
            <i className="i">{` `}</i>
            <span className="this-is-information1">
              This is information about how you use our platform, such as the
              pages you visit, the features you use, and the time you spend on
              the platform. We collect usage data automatically through cookies
              and other tracking technologies.
            </span>
          </p>
          <p className="blank-line4">&nbsp;</p>
          <p className="how-we-use-your-information">
            <b>How We Use Your Information</b>
          </p>
          <p className="we-use-the">
            We use the information we collect to deliver and improve the
            functionality of HomeEx. This includes creating and managing your
            account, tracking your home expenses to give you financial insights,
            providing customer support when needed, and sending important
            updates, security alerts, or support messages directly to you.
          </p>
          <p className="blank-line5">&nbsp;</p>
          <p className="sharing-your-information">
            <b>Sharing Your Information</b>
          </p>
          <p className="we-understand-the">
            We understand the importance of data privacy. We will never share
            your personal information with third-party companies for marketing
            purposes without your permission. However, in some limited
            circumstances, we may share your information:
          </p>
          <p className="blank-line6">&nbsp;</p>
          <p className="with-service-providers-we-part">
            <i className="with-service-providers">{`With service providers `}</i>
            <span className="we-partner-with">
              We partner with certain service providers who help us maintain and
              operate HomeEx. These providers, such as payment processors and
              data storage companies, are obligated by contract to use your
              information only to provide the specific services we request.
            </span>
          </p>
          <p className="blank-line7">&nbsp;</p>
          <p className="in-the-event-of-a-business-tra">
            <i className="in-the-event">In the event of a business transfer</i>
            <b className="b">{` `}</b>
            <span className="if-homeex-is">
              If HomeEx is involved in a merger, acquisition, or asset sale,
              your information may be transferred to the new owner. We will
              provide you with notice of any such transfer and the opportunity
              to exercise choices regarding your information.
            </span>
          </p>
          <p className="blank-line8">&nbsp;</p>
          <p className="to-comply-with-the-law-we-may">
            <i className="to-comply-with">To comply with the law</i>
            <i className="i1">{` `}</i>
            <span className="we-may-disclose">
              We may disclose your information if we are required to do so by
              law or in the good faith belief that such disclosure is necessary
              to comply with a court order, subpoena, or other legal process.
            </span>
          </p>
          <p className="blank-line9">&nbsp;</p>
          <p className="data-retention">
            <b>Data Retention</b>
          </p>
          <p className="we-will-retain">
            We will retain your information for as long as your account is
            active or as needed to provide you with services. We will also
            retain your information as necessary to comply with our legal
            obligations, resolve disputes, and enforce our agreements.
          </p>
          <p className="blank-line10">
            <b>&nbsp;</b>
          </p>
          <p className="your-choices">
            <b>Your Choices</b>
          </p>
          <p className="you-have-the">
            You have the right to access, update, and delete your personal
            information. You can also opt out of receiving marketing
            communications from us. To exercise these rights, please contact us
            at [cfnprojects@gmail.com].
          </p>
          <p className="blank-line11">&nbsp;</p>
          <p className="security">
            <b>Security</b>
          </p>
          <p className="we-take-reasonable">
            We take reasonable steps to protect your information from
            unauthorized access, disclosure, alteration, or destruction.
            However, no internet transmission or electronic storage is 100%
            secure. We encourage you to use strong passwords and to be careful
            about the information you share online.
          </p>
          <p className="blank-line12">&nbsp;</p>
          <p className="contact-us1">
            <b>Contact Us</b>
          </p>
          <p className="if-you-have">
            If you have any questions about this Privacy Policy, please contact
            us at [cfnprojects@gmail.com].
          </p>
        </div>
      </div>
    </section>
  );
};


export default PrivacySection;
