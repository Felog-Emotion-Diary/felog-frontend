import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import {
  emotionColorMap,
  emotionMapByCode,
  type EmotionCode,
} from "../../utils/emotionUtils";

interface PieData {
  emotion: EmotionCode;
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
  const chartData = data.map((item) => ({
    ...item,
    name: emotionMapByCode[item.emotion]?.name ?? `감정 ${item.emotion}`,
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="count"
          nameKey="name"
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
              fill={emotionColorMap[entry.emotion] || "#ddd"}
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
          formatter={(value) => {
            const emotion = emotionMapByCode[Number(value)];
            return emotion?.name ?? value;
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default EmotionPieChart;
