import { journey } from "@/data/journey";

export default function Journey() {
  return (
    <section id="journey" className="border-b border-white/10 px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <div className="mb-2 flex items-center gap-2 text-sm text-teal-300">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400" /> Learning Journey
        </div>
        <h2 className="font-serif text-2xl text-white sm:text-3xl">Milestones</h2>

        <div className="mt-8 space-y-4 border-l-2 border-white/10 pl-6">
          {journey.map((j) => (
            <div key={j.id} className="relative">
              <span
                className={`absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full ${
                  j.confirmed ? "bg-teal-400" : "bg-white/20"
                }`}
              />
              <div className={j.confirmed ? "text-white" : "italic text-slate-500"}>{j.label}</div>
              <div className="text-sm text-slate-400">{j.detail}</div>
              {!j.confirmed && (
                <div className="mt-1 text-xs text-amber-400/80">Placeholder — edit src/data/journey.ts</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
