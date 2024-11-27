import React, { useContext } from "react";
import Plot from "react-plotly.js";
import { Box, Typography, Grid, Paper } from "@mui/material";
import {CourseContext} from "../contexts/CourseContext";

const Visualizations = () => {
    const { courses } = useContext(CourseContext);

    // Flatten reviews into an array
    const reviews = courses.flatMap((course) =>
        course.reviews?.map((review) => ({
            courseId: course.courseId,
            title: course.title,
            overall: review.overall,
            difficulty: review.difficulty,
            usefulness: review.usefulness,
            major: review.major || "Unknown",
            anonymous: review.anonymous || "false",
            comments: review.additionalComments,
            tips: review.tips,
            professor: review.professor || "Unknown",
            date: review.createdAt,
        })) || []
    );

    // Check if data is empty
    if (reviews.length === 0) {
        return <Typography variant="h6">No data available for analysis.</Typography>;
    }

    // Data for visualizations
    const majorCounts = reviews.reduce((acc, review) => {
        acc[review.major] = (acc[review.major] || 0) + 1;
        return acc;
    }, {});

    return (
        <Box sx={{ padding: 4 }}>
            <Grid container spacing={3}>
                {/* Pie Chart */}
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} sx={{ padding: 2, overflow: "hidden" }}>
                        <Typography variant="h6" gutterBottom>
                            Breakdown of Majors
                        </Typography>
                        <Box sx={{ width: "100%", height: "100%" }}>
                            <Plot
                                data={[
                                    {
                                        labels: Object.keys(majorCounts),
                                        values: Object.values(majorCounts),
                                        type: "pie",
                                        textinfo: "label+percent",
                                        insidetextorientation: "radial",
                                    },
                                ]}
                                layout={{ title: "Breakdown of Majors", autosize: true }}
                                useResizeHandler
                                style={{ width: "100%", height: "100%" }}
                            />
                        </Box>
                    </Paper>
                </Grid>

                {/* Scatter Plot */}
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} sx={{ padding: 2, overflow: "hidden" }}>
                        <Typography variant="h6" gutterBottom>
                            Overall Rating vs Difficulty
                        </Typography>
                        <Box sx={{ width: "100%", height: "100%" }}>
                            <Plot
                                data={[
                                    {
                                        x: reviews.map((review) => review.overall),
                                        y: reviews.map((review) => review.difficulty),
                                        mode: "markers",
                                        type: "scatter",
                                        text: reviews.map((review) => `Major: ${review.major}`),
                                        marker: { size: 10 },
                                    },
                                ]}
                                layout={{
                                    title: "Overall Rating vs Difficulty",
                                    xaxis: { title: "Overall Rating" },
                                    yaxis: { title: "Difficulty" },
                                    autosize: true,
                                }}
                                useResizeHandler
                                style={{ width: "100%", height: "100%" }}
                            />
                        </Box>
                    </Paper>
                </Grid>

                {/* Histogram */}
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ padding: 2, overflow: "hidden" }}>
                        <Typography variant="h6" gutterBottom>
                            Overall Rating Distribution by Anonymity Status
                        </Typography>
                        <Box sx={{ width: "100%", height: "100%" }}>
                            <Plot
                                data={[
                                    {
                                        x: reviews.map((review) => review.overall),
                                        type: "histogram",
                                        marker: { color: "#636efa" },
                                        name: "Overall Rating",
                                    },
                                ]}
                                layout={{
                                    title: "Overall Rating Distribution",
                                    xaxis: { title: "Overall Rating" },
                                    autosize: true,
                                }}
                                useResizeHandler
                                style={{ width: "100%", height: "100%" }}
                            />
                        </Box>
                    </Paper>
                </Grid>

                {/* 3D Scatter Plot */}
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ padding: 2, overflow: "hidden" }}>
                        <Typography variant="h6" gutterBottom>
                            Difficulty vs Usefulness vs Rating (3D)
                        </Typography>
                        <Box sx={{ width: "100%", height: "100%" }}>
                            <Plot
                                data={[
                                    {
                                        x: reviews.map((review) => review.overall),
                                        y: reviews.map((review) => review.difficulty),
                                        z: reviews.map((review) => review.usefulness),
                                        mode: "markers",
                                        type: "scatter3d",
                                        marker: { size: 5, color: reviews.map((r) => (r.anonymous === "true" ? "blue" : "red")) },
                                    },
                                ]}
                                layout={{
                                    title: "Difficulty vs Usefulness vs Rating",
                                    scene: {
                                        xaxis: { title: "Overall Rating" },
                                        yaxis: { title: "Difficulty" },
                                        zaxis: { title: "Usefulness" },
                                    },
                                    autosize: true,
                                }}
                                useResizeHandler
                                style={{ width: "100%", height: "100%" }}
                            />
                        </Box>
                    </Paper>
                </Grid>

                {/* Scatter Matrix */}
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ padding: 2, overflow: "hidden" }}>
                        <Typography variant="h6" gutterBottom>
                            Relationships Between Review Metrics
                        </Typography>
                        <Box sx={{ width: "100%", height: "100%" }}>
                            <Plot
                                data={[
                                    {
                                        type: "splom",
                                        dimensions: [
                                            { label: "Difficulty", values: reviews.map((r) => r.difficulty) },
                                            { label: "Overall Rating", values: reviews.map((r) => r.overall) },
                                            { label: "Usefulness", values: reviews.map((r) => r.usefulness) },
                                        ],
                                        text: reviews.map((r) => r.major),
                                        marker: {
                                            color: reviews.map((r) => (r.anonymous === "true" ? "green" : "orange")),
                                            size: 5,
                                        },
                                    },
                                ]}
                                layout={{ title: "Review Metrics Scatter Matrix", autosize: true }}
                                useResizeHandler
                                style={{ width: "100%", height: "100%" }}
                            />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Visualizations;
