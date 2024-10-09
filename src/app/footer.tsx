export function Footer() {
  return (
    <footer className="w-full bg-black text-white px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full mx-auto">
        <div>
          <p className="text-4xl font-serif">Stop Waiting, Start Building.</p>
        </div>
        <div className="space-y-4">
          <p className="text-lg opacity-50">
            We are the University of Southern California’s premier, student-run,
            product incubator. Every semester, LavaLab invites a new cohort of
            visionary designers, developers, and project managers to build
            tomorrow’s startups, today.
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
