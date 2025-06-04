import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { emotionColorMap, type Emotion } from "../../utils/emotionUtils";

interface PieData {
  emotion: string;
  count: number;
}

interface Props {
  data: PieData[];
}

function renderCustomizedLabel({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}) {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 34;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#333"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={13}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

function EmotionPieChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="emotion"
          cx="50%"
          cy="45%"
          outerRadius={100}
          innerRadius={50}
          label={renderCustomizedLabel}
          style={{ outline: "none" }}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={emotionColorMap[entry.emotion as Emotion] || "#ddd"}
            />
          ))}
        </Pie>
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{
            width: "100%",
            display: "grid",
            rowGap: 8,
            justifyContent: "center",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default EmotionPieChart;
