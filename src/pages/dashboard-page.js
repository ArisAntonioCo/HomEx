import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/sidebar";
import "./dashboard-page.css";
import DepartmentCountsChart from '../components/DepartmentCountsChart';
import JobTitlesCountsChart from "../components/JobTitlesCountsChart";
import EmployeeHireDateChart from "../components/EmployeeChart";
//Redux Imports
import { fetchEmployees } from "../Redux/employeeSlice"; //employee

const DashboardPage = () => {

  const dispatch = useDispatch();

const {
  employees: employeeData,
  totalEmployees: employeeCount,
  departmentCounts: deptJobEmployeeCounts,
  departmentEmployeeCounts: employeeDepartmentCounts,
  
} = useSelector((state) => state.employee); //employee

  useEffect(() => {
    // Fetch data for all expense categories
    dispatch(fetchEmployees()); 
    console.log(employeeDepartmentCounts),
    console.log(deptJobEmployeeCounts) 
  }, [dispatch]);




  return (
    <div className="dashboardpage">

      <Sidebar />

      <main className="dashboard-panel">

        <div className="headingcontainer">
          <div className="h14">
            <h1 className="dashboard">Dashboard</h1>
          </div>
          <div className="p">
            <div className="track-and-manage">
              Track and manage your employees
            </div>
          </div>
        </div>
        <div className="cardcontainer">
          <div className="topcardcontainer">

             {/* EMPLOYEE CARD */}
            <div className="employeecard1">
              <div className="label2">
                <h1 className="employee2">Employees</h1>
              </div>
              
                <EmployeeHireDateChart employees={employeeData}/>
            </div>

             {/* JOB TITLE CARD */}
            <div className="jobcard">
              <div className="label4">
                <h1 className="job">Departments</h1>

              </div>
              <DepartmentCountsChart departmentEmployeeCounts={employeeDepartmentCounts} />

            </div>
          </div>


          <div className="middlecardcontainer">

            <div className="payrollcard">
              <div className="label5">
                <h1 className="payroll">Jobs per department</h1>
    
              </div>
              <JobTitlesCountsChart departmentCounts={deptJobEmployeeCounts} />

            </div>
          </div>


          
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
