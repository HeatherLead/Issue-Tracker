"use client";
import { Card } from "@radix-ui/themes";
import React from "react";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";
interface props {
  Open: number;
  InProgress: number;
  Closed: number;
}
const IssueChart = ({ Open, InProgress, Closed }: props) => {
  const data = [
    { label: "Open", value: Open },
    { label: "In Progress", value: InProgress },
    { label: "Closed", value: Closed },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            barSize={80}
            style={{ fill: "var(--accent-9)" }}
            dataKey="value"
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
