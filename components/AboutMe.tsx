import Image from "next/image";

export default function AboutMe() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-text font-[family-name:var(--font-heading)] mb-4">
          Who Am I
        </h2>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg shadow-primary/5 border border-primary-light">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Photo */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="/headshot.jpeg"
                alt="Joel Montano"
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bio content */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-text font-[family-name:var(--font-heading)] mb-2">
                Joel Montano
              </h3>
              <p className="text-primary font-medium font-[family-name:var(--font-body)] mb-4">
                Technical Program Manager
              </p>
              <p className="text-muted leading-relaxed font-[family-name:var(--font-body)] mb-4">
                I'm not a trained educator but I've naturally pursued
                opportunities to teach and mentor. Combined with my day-job of
                handling the complex buildout and security of supercomputer
                clusters, I believe my skillset is ideal for a role that will
                rely on navigating a large, diverse, and complicated institution
                that is K-12 education in the US.
              </p>
              <p className="text-muted leading-relaxed font-[family-name:var(--font-body)]">
                In my spare time I box, train in olympic lifts, read a lot, and
                lead playtime at home.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
