import React, { useState } from "react";

import ChartBar from "./ChartBar";

import { sortRank } from "./sort";
import "../../styles/Chart.css";

function MyChart(props) {
  const data = [
    { name: "이균", count: 32, rank: 3 },
    { name: "장성호", count: 41, rank: 2 },
    { name: "강동하", count: 49, rank: 1 },
    { name: "유미리", count: 23, rank: 5 },
    { name: "나주영", count: 26, rank: 4 },
  ];

  const [countData, setCountData] = useState(sortRank(data));

  const maxCount =
    Math.max(...countData.map((el) => el.count)) < 50
      ? 50
      : Math.max(...countData.map((el) => el.count));

  const chartHeight = (maxCount + 50) * 3;

  const barWidth = 50;
  const barMargin = 10;
  const numofBars = countData.length;
  let width = numofBars * (barWidth + barMargin);

  return (
    <div>
      <svg
        width={width}
        height={chartHeight}
        viewBox={`0 0 ${width} ${chartHeight}`}
        preserveAspectRatio="xMidYMax meet"
      >
        {countData.map((el, idx) => {
          const barHeight = el.count * 2.5;
          return (
            <ChartBar
              key={el.name}
              x={idx * (barWidth + barMargin) + 5}
              y={chartHeight - barHeight - 20}
              width={barWidth}
              height={barHeight}
              chartHeight={chartHeight}
              data={el}
            />
          );
        })}
      </svg>
    </div>
  );
}

export default MyChart;
