import styled from "styled-components";
import { memo, useEffect, useState } from "react";

interface ContainerProps {
  $layout: "vertical" | "horizontal";
}

type Props = {
  initial?: string;
  layout: "vertical" | "horizontal";
  config: {
    [x: string]: {
      backgroundColor: string;
      duration: number;
      next: string;
    };
  };
};
const TrafficLight = memo(({ initial = "green", layout, config }: Props) => {
  const [current, setCurrent] = useState(initial);
  console.log("render TrafficLight", current);
  const currentConfig = config[current];
  useEffect(() => {
    const { duration, next } = currentConfig;
    const timer = setTimeout(() => {
      setCurrent(next);
    }, duration);
    return () => clearTimeout(timer);
  }, [current]);
  return (
    <Container $layout={layout}>
      {Object.keys(config).map((color) => (
        <Light
          key={color}
          color={current === color ? config[color].backgroundColor : undefined}
        />
      ))}
    </Container>
  );
});
const Container = styled.div<ContainerProps>`
  display: inline-flex;
  flex-direction: ${(props) =>
    props.$layout === "vertical" ? "column" : "row"};
  gap: 1rem;
  border-radius: 4px;
  padding: 1rem;
  border: 2px solid dimgray;
  background: #1a1a1a;
`;
const LightDiv = styled.div`
  border-radius: 50%;
  border: 2px solid darkgray;
  width: 5rem;
  height: 5rem;
`;

const Light = ({ color = "gray" }: { color?: string }) => {
  return (
    <LightDiv className="light" style={{ backgroundColor: color }}></LightDiv>
  );
};

export default TrafficLight;
