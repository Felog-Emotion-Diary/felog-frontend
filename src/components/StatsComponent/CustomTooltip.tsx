import type { TooltipProps } from "recharts";
import type { Emotion } from "../../utils/emotionUtils";


interface PayloadItem {
  payload: {
    day: string;
    count: number;
    emotion: Emotion;
  };
}

function CustomTooltip({
  active,
  payload,
}: TooltipProps<number, string>) {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload as PayloadItem["payload"];

  return (
    <div
      style={{
        backgroundColor: "white",
        border: "1px solid #ccc",
        padding: "8px 12px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <div>감정: <strong>{data.emotion}</strong></div>
      <div>횟수: <strong>{data.count}</strong></div>
    </div>
  );
}

export default CustomTooltip;
