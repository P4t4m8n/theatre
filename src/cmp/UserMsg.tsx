import { useEffect, useRef, useState } from "react";
import { SHOW_MSG, eventBus, KnownEventData } from "../service/event.bus";

export function UserMsg() {
  const [msg, setMsg] = useState<KnownEventData | null>(null);
  const timeoutIdRef = useRef<number | null>(null);

  useEffect(() => {
    const unsubscribe = eventBus.on<KnownEventData>(SHOW_MSG, (receivedMsg) => {
      setMsg(receivedMsg);
      window.scrollTo({ top: 0, behavior: "smooth" });

      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }

      timeoutIdRef.current = setTimeout(closeMsg, 2000);
    });

    return () => {
      unsubscribe();
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  function closeMsg() {
    setMsg(null);
  }

  if (!msg) return null;

  return (
    <section className={`user-msg ${msg.type}`}>
      <p>{msg.msg}</p>{" "}
    </section>
  );
}
