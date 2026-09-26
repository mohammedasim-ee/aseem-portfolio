import { skills } from "@/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="border-b border-white/10 px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-2 flex items-center gap-2 text-sm text-teal-300">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400" /> Skills
        </div>
        <h2 className="font-serif text-2xl text-white sm:text-3xl">Technologies</h2>
        <p className="mt-2 max-w-xl text-slate-400">
          Labeled &quot;used in projects&quot; rather than a proficiency claim — appearing in a repo
          doesn&apos;t mean mastery.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {skills.map((s) => (
            <div key={s.name} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">{s.name}</span>
                <span className="text-xs text-slate-500">{s.label}</span>
              </div>
              <div className="mt-1 text-xs text-slate-500">Seen in {s.seenIn.length} project(s)</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
