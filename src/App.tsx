import { ScrollArea } from "@/components/ui/ScrollArea";
import { VapiButton, vapi } from "./features/Assistant";
import { MessageList } from "./features/Messages";
import { useVapi } from "./features/Assistant";
import { useEffect, useRef } from "react";

function App() {
  const scrollAreaRef = useRef<any>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const viewport = viewportRef.current;
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight;
    }
  };

  const { toggleCall, messages, callStatus, activeTranscript, audioLevel } = useVapi();

  useEffect(() => {
    vapi.on("message", scrollToBottom);
    return () => {
      vapi.off("message", scrollToBottom);
    };
  }, []);

  return (
    <main className="flex flex-col h-screen">
      <div id="card" className="text-slate-950 dark:text-slate-50 w-full flex flex-col h-full relative">
        <div id="card-content" className="p-6 pt-0 flex-1 overflow-auto">
          <ScrollArea ref={scrollAreaRef} viewportRef={viewportRef} className="flex-1">
            <div className="flex flex-col min-h-[85vh]">
              <MessageList messages={messages} activeTranscript={activeTranscript} />
            </div>
          </ScrollArea>
        </div>
        <div id="card-footer" className="flex justify-center py-4">
          <VapiButton audioLevel={audioLevel} callStatus={callStatus} toggleCall={toggleCall} />
        </div>
      </div>
    </main>
  );
}

export default App;
