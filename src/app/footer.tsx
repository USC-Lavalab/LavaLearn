export function Footer() {
  return (
    <footer className="w-full bg-black px-6 py-16 text-white">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <p className="font-serif text-4xl">Stop Waiting, Start Building.</p>
        </div>
        <div className="space-y-4">
          <p className="text-lg opacity-50">
            We are the University of Southern California’s premier, student-run, product incubator. Every semester,
            LavaLab invites a new cohort of visionary designers, developers, and project managers to build tomorrow’s
            startups, today.
          </p>
          <p className="text-lg">
            <span className="opacity-50">Learn more about us on</span>{" "}
            <a href="https://usclavalab.org" className="underline">
              usclavalab.org ↗
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
