import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const JobTitlesCountsChart = ({ departmentCounts }) => {
  if (!departmentCounts) {
    return null;
  }

  const generateColorPalette = (jobTitleCounts) => {
    const allJobTitles = Object.values(jobTitleCounts).flatMap(Object.keys);
    const uniqueJobTitles = [...new Set(allJobTitles)];
    return uniqueJobTitles.reduce((acc, jobTitle, index) => {
      acc[jobTitle] = `hsl(240, ${100 - (index * (100 / uniqueJobTitles.length))}%, 50%)`;
      return acc;
    }, {});
  };

  const colorPalette = generateColorPalette(departmentCounts);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {Object.entries(departmentCounts).map(
          ([department, jobTitleCounts], index) => (
            <Grid item xs={6} key={department}>
              <Item>
                <Grid container alignItems="center">
                  <Grid xs={6}>
                    {" "}
                    {/* Pie Chart on the Left */}
                    <PieChart
                      series={[
                        {
                          data: Object.entries(jobTitleCounts).map(
                            ([jobTitle, count]) => ({
                              value: count,
                              color: colorPalette[jobTitle], // Assign color from colorPalette
                            })
                          ),
                        },
                      ]}
                      width={200} // Adjust width as needed
                      height={200}
                    />
                  </Grid>
                  <Grid xs={6} sx={{ textAlign: "left" }}>
                    {" "}
                    {/* Legend on the Right */}
                    <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                      {department}
                    </Typography>
                    {Object.entries(jobTitleCounts).map(([jobTitle, count]) => (
                      <div
                        key={jobTitle}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "5px",
                        }}
                      >
                        <div
                          style={{
                            width: "15px",
                            height: "15px",
                            backgroundColor: colorPalette[jobTitle],
                            marginRight: "8px",
                          }}
                        />
                        <span>
                          {jobTitle}: {count}
                        </span>
                      </div>
                    ))}
                  </Grid>
                </Grid>
              </Item>
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
};

export default JobTitlesCountsChart;