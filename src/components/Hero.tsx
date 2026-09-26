import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section id="home" className="border-b border-white/10 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 font-serif text-sm italic text-amber-400">Digital Transformation × AI</div>
        <h1 className="font-serif text-4xl leading-tight text-white sm:text-5xl">
          {profile.name} — student, builder,
          <br />
          <span className="text-teal-300">learning in public.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-slate-400">
          {profile.year} {profile.program} student at {profile.university}, interested in{" "}
          {profile.interests.slice(0, 3).join(", ")}, and more. This site includes an AI Digital
          Twin built only on verified facts — ask it anything.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#projects" className="rounded-full bg-teal-400 px-5 py-3 text-sm font-semibold text-slate-900">
            See projects
          </a>
          <a href="#twin" className="rounded-full border border-white/15 px-5 py-3 text-sm text-white hover:border-amber-400 hover:text-amber-300">
            Talk to my Digital Twin
          </a>
        </div>
      </div>
    </section>
  );
}
