import { profile } from "@/data/profile";

export default function About() {
  return (
    <section id="about" className="border-b border-white/10 px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-2 flex items-center gap-2 text-sm text-teal-300">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400" /> About
        </div>
        <h2 className="font-serif text-2xl text-white sm:text-3xl">The person behind the twin</h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <ul className="space-y-3 text-sm">
            <li className="rounded-lg border border-white/10 bg-white/5 p-3">
              <span className="font-semibold text-white">University</span>{" "}
              <span className="text-slate-400">{profile.university}</span>
            </li>
            <li className="rounded-lg border border-white/10 bg-white/5 p-3">
              <span className="font-semibold text-white">Program</span>{" "}
              <span className="text-slate-400">{profile.program} ({profile.year})</span>
            </li>
            <li className="rounded-lg border border-white/10 bg-white/5 p-3">
              <span className="font-semibold text-white">GitHub</span>{" "}
              <a href={profile.github} target="_blank" rel="noreferrer" className="text-teal-300 hover:underline">
                {profile.github.replace("https://", "")}
              </a>
            </li>
          </ul>

          <div>
            <p className="mb-3 text-sm text-slate-400">{profile.bioPlaceholder}</p>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((i) => (
                <span key={i} className="rounded-full border border-teal-400/30 bg-teal-400/10 px-3 py-1 text-xs text-teal-200">
                  {i}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
