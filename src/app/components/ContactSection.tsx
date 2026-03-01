export default function ContactSection() {
  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-sm text-indigo-500 tracking-wider uppercase mb-2">
            Let&apos;s Connect
          </p>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="gradient-text">Get in Touch</span>
          </h2>
          <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto">
            Interested in working together or have a question? I&apos;d love to
            hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:ripunjoy.buddha@gmail.com"
              className="group px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-medium text-white transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/20 flex items-center justify-center gap-3"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              ripunjoy.buddha@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/ripunjoy-buddha"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 light-card rounded-xl font-medium text-gray-700 hover:text-indigo-600 transition-all duration-200 flex items-center justify-center gap-3"
            >
              <svg
                className="w-5 h-5"
                fill="#4f39f6"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn Profile
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-sm text-gray-400">
            © {new Date().getFullYear()} Ripunjoy Buddha. Built with NextJs and
            ClaudeCode
          </p>
          <p className="text-sm text-gray-400">🍁 Canada</p>
        </div>
      </footer>
    </>
  );
}
