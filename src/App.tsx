import "./App.css";
import useOnlineStatus from "@/hooks/useOnlineStatus.tsx";
import { useIsDarkMode } from "@/hooks/useIsDarkMode.tsx";
import TrafficLight from "@/components/TrafficLight.tsx";
import useMouseEvent from "@/hooks/useMouseEvent.tsx";
import useCurrentTime from "@/hooks/useCurrentTime.tsx";

const config = {
  red: {
    backgroundColor: "red",
    duration: 8000,
    next: "green",
  },
  yellow: {
    backgroundColor: "yellow",
    duration: 1000,
    next: "red",
  },
  green: {
    backgroundColor: "green",
    duration: 8000,
    next: "yellow",
  },
};

function App() {
  // console.log("render APP !!");
  const online = useOnlineStatus();
  const isDarkMode = useIsDarkMode();
  const { x, y } = useMouseEvent();
  const { currentTime } = useCurrentTime();
  return (
    <>
      <div>Network now is {online ? "✅ online" : "❌ offline"}</div>
      <div>The current theme is {isDarkMode ? "dark" : "light"}</div>
      {/*<h1*/}
      {/*  style={{*/}
      {/*    padding: "1rem",*/}
      {/*    backgroundColor: isDarkMode ? "pink" : "purple",*/}
      {/*    color: isDarkMode ? "white" : "darkgray",*/}
      {/*  }}*/}
      {/*>*/}
      {/*  {isDarkMode ? "dark" : "light"} theme*/}
      {/*</h1>*/}
      <TrafficLight config={config} layout={"horizontal"} />
      <TrafficLight config={config} layout={"vertical"} />
      <h1 style={{ width: "100%" }}>
        Mouse Event x: {x} , y: {y}
      </h1>
      <h1>CURRENT TIME: {currentTime.toLocaleString()}</h1>
    </>
  );
}

export default App;
