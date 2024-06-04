import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const EmployeeHireDateChart = ({ employees }) => {
  // Generate counts of employees hired on each date
  const hireDateCounts = employees.reduce((acc, employee) => {
    const hireDate = new Date(employee.hire_date).toISOString().split('T')[0]; // Convert ISO string back to date
    acc[hireDate] = (acc[hireDate] || 0) + 1;
    return acc;
  }, {});

  // Sort the dates and counts for the x and y axes
  const sortedDates = Object.keys(hireDateCounts).sort();
  const sortedCounts = sortedDates.map(date => hireDateCounts[date]);

  // Convert dates to number of days since earliest date
  const earliestDate = new Date(sortedDates[0]);
  const xAxisData = sortedDates.map(date => Math.round((new Date(date) - earliestDate) / (1000 * 60 * 60 * 24)));

  return (
    <div style={{ width: '100%', height: '20rem'}}>
      <LineChart
        xAxis={[{ data: xAxisData, label: 'Days since earliest hire date' }]}
        yAxis={[{ label: 'Number of hires' }]}
        series={[{ data: sortedCounts }]}
        height={300}
        margin={{ left: 50, right: 50, top: 50, bottom: 50 }} // Increase margins
        grid={{ vertical: true, horizontal: true }}
      />
    </div>
  );
};

export default EmployeeHireDateChart;