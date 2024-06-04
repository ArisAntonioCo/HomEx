import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const DepartmentCountsChart = ({ departmentEmployeeCounts }) => {
  const generateColorPalette = (departmentEmployeeCounts) => {
    const departments = Object.keys(departmentEmployeeCounts);
    return departments.reduce((acc, department, index) => {
      acc[department] = `hsl(240, ${100 - (index * (100 / departments.length))}%, 50%)`;
      return acc;
    }, {});
  };

  const colorPalette = generateColorPalette(departmentEmployeeCounts);

  const dataset = Object.entries(departmentEmployeeCounts).map(([department, count]) => ({
    department, // X-axis label (department name)
    count: Math.round(count), // Y-axis value (number of employees)
  }));

  const chartSetting = {
    yAxis: [
      {
        label: 'count',
        min: 0, // Start Y-axis at 1
        tickFormatter: (value) => Math.round(value), // Round the y-axis values to the nearest integer
      },
    ],
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-20px, 0)',
      },
    },
  };

  const valueFormatter = (value) => `${value}`;

  return (
  <div style={{ width: '100%', height: '20rem'}}>
    <BarChart
      borderRadius={28}
      dataset={dataset}
      barLabel="value"
      xAxis={[{ scaleType: 'band', dataKey: 'department' }]}
      series={[
        {
          dataKey: 'count',
          label: 'Count',
          valueFormatter,
          color: 'hsl(240, 100%, 50%)', // Use a single color for all bars
        },
      ]}
      margin={{ left: 50, right: 50, top: 50, bottom: 50 }} // Adjust margins
      {...chartSetting}
    />
  </div>
);
};

export default DepartmentCountsChart;