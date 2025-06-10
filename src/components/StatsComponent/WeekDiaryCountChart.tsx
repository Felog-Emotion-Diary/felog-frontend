import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { dayKoMap } from "./WeekEmotionChart";

interface Props {
  data: { day: string; count: number }[];
}

function WeekDiaryCountChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" tickFormatter={(value) => dayKoMap[value] || value}/>
        <YAxis domain={[0, 30]} ticks={[0,10,20,30]} allowDecimals={false} />
        <Bar dataKey="count" fill="#D8D2C2" barSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default WeekDiaryCountChart;
