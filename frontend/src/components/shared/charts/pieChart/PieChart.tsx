import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { PieChartProps } from "../../../../@types/charts/pieChart.types";

const PieChart: React.FC<PieChartProps> = ({ pieData }) => {
  return (
    <ResponsivePie
      data={pieData}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      colors={{ scheme: "nivo" }}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "ruby",
          },
          id: "dots",
        },
        {
          match: {
            id: "c",
          },
          id: "dots",
        },
        {
          match: {
            id: "go",
          },
          id: "dots",
        },
        {
          match: {
            id: "python",
          },
          id: "dots",
        },
        {
          match: {
            id: "scala",
          },
          id: "lines",
        },
        {
          match: {
            id: "lisp",
          },
          id: "lines",
        },
        {
          match: {
            id: "elixir",
          },
          id: "lines",
        },
        {
          match: {
            id: "javascript",
          },
          id: "lines",
        },
      ]}
      animate={true}
      // legends={[
      //   {
      //     anchor: 'right',
      //     direction: 'column',
      //     justify: false,
      //     translateX: 0,
      //     translateY: 0,
      //     itemsSpacing: 0,
      //     itemWidth: 100,
      //     itemHeight: 18,
      //     itemTextColor: '#999',
      //     itemDirection: 'left-to-right',
      //     itemOpacity: 1,
      //     symbolSize: 18,
      //     symbolShape: 'circle',
      //     effects: [
      //       {
      //         on: 'hover',
      //         style: {
      //           itemTextColor: '#000',
      //         },
      //       },
      //     ],
      //   },
      // ]}
    />
  );
};

export default PieChart;
