import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  

  const onNavlinksContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onNavlinksContainer1Click = useCallback(() => {
    navigate("/dashboard-page");
  }, [navigate]);

  const onNavlinksContainer2Click = useCallback(() => {
    navigate("/employee-page");
  }, [navigate]);

  const onNavlinksContainer3Click = useCallback(() => {
    navigate("/dept-page");
  }, [navigate]);

  const onNavlinksContainer4Click = useCallback(() => {
    navigate("/job-page");
  }, [navigate]);

  const onNavlinksContainer5Click = useCallback(() => {
    navigate("/payroll-page");
  }, [navigate]);


  return (
    <div className="sidebar">
      <div className="logo">
      <img
            className="vector-icon14"
            loading="lazy"
            alt=""
            src="/leeplaza.png"
          />
      </div>
      <div className="options">

        {/* HOME BUTTON */}
        <div className="navlinks" onClick={onNavlinksContainerClick}>
          <img className="vector-icon4" alt="" src="/vector@2x.png" />
          <div className="home">Home</div>
        </div>

        {/* DASHBOARD BUTTON */}
        <div className="navlinks" onClick={onNavlinksContainer1Click}>
          <img className="vector-icon5" alt="" src="/vector-1@2x.png" />
          <div className="dashboard1">Dashboard</div>
        </div>

        <div className="text">
          <div className="manage5">MANAGE</div>
        </div>

        {/* Employee BUTTON */}
        <div className="navlinks" onClick={onNavlinksContainer2Click}>
          <img className="vector-icon6" alt="" src="/Employee.png" />
          <div className="employee5">Employees</div>
        </div>

        {/* WATER BUTTON */}
        <div className="navlinks" onClick={onNavlinksContainer3Click}>
          <img className="vector-icon7" alt="" src="/Department.png" />
          <div className="dept3">Departments</div>
        </div>

        {/* FOOD BUTTON */}
        <div className="navlinks" onClick={onNavlinksContainer4Click}>
          <img className="vector-icon8" alt="" src="/JobTitle.png" />
          <div className="job3">Job Titles</div>
        </div>

        {/* MAINTENANCE BUTTON*/}
        <div className="navlinks" onClick={onNavlinksContainer5Click}>
          <img
            className="vector-icon9"
            loading="lazy"
            alt=""
            src="/Payroll.png"
          />
          <div className="payroll3">Payroll</div>
        </div>

      </div>

      {/* SIGN OUT BUTTON */}
      <div className="navlinks">
        <div className="container18">
          <img className="vector-icon13" alt="" src="/vector-9@2x.png" />
          <div className="sign-out">Sign out</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
