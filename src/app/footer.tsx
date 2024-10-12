import Link from "next/link";
import { FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const socials = {
  instagram: {
    url: "https://www.instagram.com/usclavalab/",
    icon: <FaInstagram />,
  },
  linkedin: {
    url: "https://www.linkedin.com/company/usclavalab/",
    icon: <FaLinkedinIn />,
  },
  facebook: {
    url: "https://www.facebook.com/usclavalab/",
    icon: <FaFacebookF />,
  },
  email: {
    url: "mailto:usclavalab@gmail.com",
    icon: <FaEnvelope />,
  },
};

export function Footer() {
  return (
    <footer className="w-full bg-black px-6 py-16 text-white">
      <div>
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 md:grid-cols-2">
          <div className="text-left md:text-right">
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
        <div className="mt-8 block">
          <div className="flex justify-center gap-4">
            {Object.entries(socials).map(([i, social]) => (
              <Link
                key={i}
                className="rounded bg-gray-500 p-2 text-black transition-colors duration-100 hover:bg-gray-200"
                href={social.url}
                target="_blank"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
