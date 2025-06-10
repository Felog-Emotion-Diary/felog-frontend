import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { emotionColorMap, type EmotionCode } from "../../utils/emotionUtils";
import CustomTooltip from "./CustomTooltip";

interface WeekEmotionData {
  [key: string]: { emotion: EmotionCode; count: number };
}

interface Props {
  data: WeekEmotionData;
}

export const dayKoMap: Record<string, string> = {
  mon: "월",
  tue: "화",
  wed: "수",
  thu: "목",
  fri: "금",
  sat: "토",
  sun: "일",
};

function WeekEmotionChart({ data }: Props) {
  
  const chartData = Object.entries(data).map(([day, value]) => ({
    day,
    ...value,
  })) as { day: string; emotion: EmotionCode; count: number }[];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="day"
          tickFormatter={(value) => dayKoMap[value] || value}
        />
        <YAxis domain={[0, 30]} ticks={[0, 10, 20, 30]} allowDecimals={false} />
        <Tooltip content={CustomTooltip} cursor={false} />
        <Bar dataKey="count" barSize={40}>
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={emotionColorMap[entry.emotion] || "#ccc"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default WeekEmotionChart;
