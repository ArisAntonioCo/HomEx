import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/sidebar";
import "./dashboard-page.css";

//Redux Imports
import { fetchEmployees } from "../Redux/employeeSlice"; //employee
import { fetchDepartments } from "../Redux/departmentsSlice"; //department
import { fetchJobTitles } from "../Redux/jobtitlesSlice"; //jobTitle
import { fetchAllPayrolls } from "../Redux/payrollSlice"; //payroll

const DashboardPage = () => {

  const dispatch = useDispatch();

  // Use selectors for each expense category
  const {
    totalBillAmount: employeeTotal,
    loading: employeeLoading,
    error: employeeError,
  } = useSelector((state) => state.employee); //employee
  const {
    totalBillAmount: deptTotal,
    loading: deptLoading,
    error: departmentsError,
  } = useSelector((state) => state.departments); //department
  const {
    totalBillAmount: jobTotal,
    loading: jobLoading,
    error: jobError,
  } = useSelector((state) => state.payroll); //jobTitle
  const {
    totalBillAmount: payrollTotal,
    loading: payrollLoading,
    error: payrollError,
  } = useSelector((state) => state.jobtitlesenance); //payroll

  useEffect(() => {

    // Fetch data for all expense categories
    dispatch(fetchEmployees()); //fetchEmployee
    dispatch(fetchDepartments()); //fetchDepartment
    dispatch(fetchAllPayrolls()); //fetchJobTitle
    dispatch(fetchJobTitles()); //fetchPayroll

  }, [dispatch]);

  const calculateTotalExpenses = () => {
    let total = 0;
    
    // Convert totals to numbers, using 0 as the default if not a number
    const empTotal = parseFloat(employeeTotal) || 0;
    const depTotal = parseFloat(deptTotal) || 0; 
    const jbTotal = parseFloat(jobTotal) || 0; 
    const prTotal = parseFloat(payrollTotal) || 0; 
    total = empTotal + depTotal + jbTotal + prTotal;

    return total.toFixed(2); // Now total is guaranteed to be a number
};



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
              Track and manage your home expenses
            </div>
          </div>
        </div>
        <div className="cardcontainer">
          <div className="topcardcontainer">

             {/* EMPLOYEE CARD */}
            <div className="employeecard1">
              <div className="label2">
                <h1 className="employee2">Employee</h1>
                <div className="total4">
                  <div className="total5">Total $</div>
                </div>
              </div>
              {employeeLoading ? (
                <div className="employeetotal1">Loading...</div>
              ) : employeeError ? (
                <div className="employeetotal1">
                  Error: {employeeError.message}
                </div>
              ) : (
                <div className="employeetotal1">${employeeTotal}</div>
              )}
            </div>

             {/* DEPARTMENT CARD */}
            <div className="deptcard1">
              <div className="label3">
                <h1 className="dept2">Department</h1>
                <div className="total6">
                  <div className="total7">Total $</div>
                </div>
              </div>
              {deptLoading ? (
                <div className="depttotal1">Loading...</div>
              ) : departmentsError ? (
                <div className="depttotal1">Error: {departmentsError.message}</div>
              ) : (
                <div className="depttotal1">${deptTotal}</div>
              )}
            </div>

             {/* JOB TITLE CARD */}
            <div className="jobcard">
              <div className="label4">
                <h1 className="job">Job Title</h1>
                <div className="total8">
                  <div className="total9">Total $</div>
                </div>
              </div>
              {jobLoading ? (
                <div className="jobtotal">Loading...</div>
              ) : jobError ? (
                <div className="jobtotal">Error: {jobError.message}</div>
              ) : (
                <div className="jobtotal">${jobTotal}</div>
              )}
            </div>
          </div>


          <div className="middlecardcontainer">

            {/* PAYROLL CARD */}
            <div className="payrollcard">
              <div className="label5">
                <h1 className="payroll">Payroll</h1>
                <div className="total10">
                  <div className="total11">Total $</div>
                </div>
              </div>
              {payrollLoading ? (
                <div className="payrolltotal">Loading...</div>
              ) : payrollError ? (
                <div className="payrolltotal">
                  Error: {payrollError.message}
                </div>
              ) : (
                <div className="payrolltotal">${payrollTotal}</div>
              )}
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

              <div className="expensestotal">${calculateTotalExpenses()}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
