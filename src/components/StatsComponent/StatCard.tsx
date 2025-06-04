import type React from "react";
import styled from "styled-components";

interface StatCardProps {
  value: { number: string | number | React.ReactNode; unit: string };
  label: string;
}

function StatCard({ value, label }: StatCardProps) {
  return (
    <Card>
      <Value>
        <Number>{value.number}</Number>
        <Unit>{value.unit}</Unit>
      </Value>
      <Label>{label}</Label>
    </Card>
  );
}

export default StatCard;

const Card = styled.div`
  background-color: white;
  padding: 50px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  text-align: center;
`;

const Value = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 4px;
`;

const Number = styled.span`
  font-size: 40px;
  font-weight: bold;
`;

const Unit = styled.span`
  font-size: 25px;
  margin-bottom: 4px;
`;

const Label = styled.div`
  font-size: 25px;
  color: #444;
  margin-top: 8px;
  text-align: left;
`;
