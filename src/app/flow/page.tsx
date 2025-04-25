import { PlayerJourneyGraph } from "@/components/flow/PlayerJourneyGraph";

export default function FlowPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1930] to-[#15295A] flex flex-col items-center">
      <header className="w-full max-w-4xl mx-auto p-4 pt-8 text-center">
        <h1 className="text-3xl font-display font-bold text-white mb-2 tracking-wide">
          Player Flow
        </h1>
        <p className="text-white/80 max-w-xl mx-auto">
          How players move through game components and earn rewards
        </p>
      </header>
      
      <main className="flex-1 p-4 flex flex-col items-center justify-center w-full">
        <div className="relative w-full max-w-4xl mx-auto">
          <PlayerJourneyGraph />
        </div>
      </main>
    </div>
  );
} 