import { UserMsg } from "./cmp/UserMsg";
import { SeatIndex } from "./page/SeatIndex";
import "./style/index.css";

export function App() {
  return (
    <>
    <main>
      <SeatIndex />
    </main>
    <UserMsg/>
    </>
  );
}
