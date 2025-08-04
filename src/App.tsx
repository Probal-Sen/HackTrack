import React, { useState, useEffect } from "react";
import { HackathonProvider } from "./contexts/HackathonContext";
import HackathonList from "./components/HackathonList";
import HackathonForm from "./components/HackathonForm";
import HackathonFilter from "./components/HackathonFilter";
import {
  Code,
  Plus,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Globe,
  Sun,
  Moon,
  MoreVertical,
} from "lucide-react";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  // Minimal, clean day/night toggle
  const [dark, setDark] = useState(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("theme") === "dark"
      : false,
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  return (
    <HackathonProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div
          className="fixed w-full z-50 transition-all duration-300 dark:bg-gray-900/90"
          style={{
            backgroundColor: isScrolled
              ? "rgba(79, 70, 229, 0.95)"
              : "transparent",
            backdropFilter: isScrolled ? "blur(8px)" : "none",
          }}
        >
          <header className="text-white dark:text-white">
            <div className="container mx-auto px-4 py-6 flex justify-between items-center">
              <div className="flex items-center">
                <Code size={28} className="mr-2" />
                <h1 className="text-2xl md:text-3xl font-bold">HackTrack</h1>
              </div>
              {/* Desktop Nav */}
              <div className="hidden md:flex items-center space-x-4">
                <button
                  onClick={openForm}
                  className="flex items-center px-4 py-2 bg-white text-indigo-600 rounded-md hover:bg-indigo-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <Plus size={18} className="mr-2" />
                  Add Hackathon
                </button>
                <button
                  onClick={() => setDark((d) => !d)}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 cursor-pointer border border-gray-300 dark:border-gray-600"
                  aria-label="Toggle dark mode"
                  style={{ outline: "none" }}
                >
                  <span className="transition-transform duration-300">
                    {dark ? (
                      <Moon className="text-yellow-300" size={24} />
                    ) : (
                      <Sun className="text-yellow-500" size={24} />
                    )}
                  </span>
                </button>
                <button
                  className="px-4 py-2 bg-white text-indigo-600 rounded-md hover:bg-indigo-50 transition-all duration-300"
                  onClick={() => setIsLoginOpen(true)}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsSignUpOpen(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all duration-300"
                >
                  Sign Up
                </button>
              </div>
              {/* Mobile Nav Toggle */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setMobileNavOpen((open) => !open)}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white focus:outline-none"
                  aria-label="Open menu"
                >
                  <MoreVertical size={28} />
                </button>
              </div>
            </div>
            {/* Mobile Nav Menu */}
            {mobileNavOpen && (
              <div className="md:hidden flex flex-col items-stretch bg-white/95 dark:bg-gray-900/95 shadow-lg rounded-b-xl px-4 pt-2 pb-4 space-y-3 animate-fade-in absolute w-full left-0 top-full z-50">
                <button
                  onClick={() => {
                    openForm();
                    setMobileNavOpen(false);
                  }}
                  className="flex items-center px-4 py-2 bg-white text-indigo-600 rounded-md hover:bg-indigo-50 transition-all duration-300 justify-center"
                >
                  <Plus size={18} className="mr-2" />
                  Add Hackathon
                </button>
                <button
                  onClick={() => {
                    setDark((d) => !d);
                    setMobileNavOpen(false);
                  }}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 cursor-pointer border border-gray-300 dark:border-gray-600 self-center"
                  aria-label="Toggle dark mode"
                  style={{ outline: "none" }}
                >
                  <span className="transition-transform duration-300">
                    {dark ? (
                      <Moon className="text-yellow-300" size={24} />
                    ) : (
                      <Sun className="text-yellow-500" size={24} />
                    )}
                  </span>
                </button>
                <button
                  className="px-4 py-2 bg-white text-indigo-600 rounded-md hover:bg-indigo-50 transition-all duration-300"
                  onClick={() => {
                    setIsLoginOpen(true);
                    setMobileNavOpen(false);
                  }}
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setIsSignUpOpen(true);
                    setMobileNavOpen(false);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all duration-300"
                >
                  Sign Up
                </button>
              </div>
            )}
          </header>
        </div>

        <div
          className="relative h-[500px] bg-cover bg-center flex items-center dark:bg-gray-800"
          style={{
            backgroundImage:
              'url("https://images.pexels.com/photos/7096/people-woman-coffee-meeting.jpg?auto=compress&cs=tinysrgb&w=1920")',
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-purple-900 bg-opacity-70 mix-blend-multiply dark:from-gray-900 dark:to-gray-800 dark:bg-opacity-80"></div>
          <div className="container mx-auto px-4 relative z-10 text-white mt-16 dark:text-white">
            <h2 className="text-5xl font-bold mb-4 animate-fade-in">
              Your Hackathon Journey
            </h2>
            <p className="text-xl opacity-90 max-w-2xl leading-relaxed dark:text-gray-300">
              Track, manage, and reflect on your coding adventures. Join
              hackathons, build amazing projects, and create lasting memories.
            </p>
          </div>
        </div>

        <main className="container mx-auto px-4 py-12 -mt-16 relative z-20">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 transform hover:shadow-2xl transition-all duration-300 dark:bg-gray-800 dark:text-white">
            <HackathonFilter />
            <HackathonList onAddNew={openForm} />
          </div>
        </main>

        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <HackathonForm onClose={closeForm} />
          </div>
        )}

        {isSignUpOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <SignUpForm onClose={() => setIsSignUpOpen(false)} />
          </div>
        )}

        {isLoginOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <LoginForm
              onClose={() => setIsLoginOpen(false)}
              onSwitchToSignUp={() => {
                setIsLoginOpen(false);
                setIsSignUpOpen(true);
              }}
            />
          </div>
        )}

        <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center text-indigo-600 mb-4 dark:text-indigo-400">
                  <Code size={24} className="mr-2" />
                  <span className="text-xl font-bold">HackTrack</span>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed dark:text-gray-300">
                  Your personal hackathon companion, helping you track and
                  celebrate your coding journey. Built with passion using React,
                  TypeScript, and Tailwind CSS.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/yourusername"
                    className="text-gray-600 hover:text-indigo-600 transition-colors dark:text-gray-300 dark:hover:text-indigo-400"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="https://linkedin.com/in/yourusername"
                    className="text-gray-600 hover:text-indigo-600 transition-colors dark:text-gray-300 dark:hover:text-indigo-400"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="https://twitter.com/yourusername"
                    className="text-gray-600 hover:text-indigo-600 transition-colors dark:text-gray-300 dark:hover:text-indigo-400"
                  >
                    <Twitter size={20} />
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 dark:text-gray-200">
                  Contact
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="mailto:your.email@example.com"
                      className="text-gray-600 hover:text-indigo-600 transition-colors flex items-center"
                    >
                      <Mail size={16} className="mr-2" />
                      9probalsen@gmail.com
                    </a>
                    <a
                      href="mailto:your.email@example.com"
                      className="text-gray-600 hover:text-indigo-600 transition-colors flex items-center"
                    >
                      <Mail size={16} className="mr-2" />
                      sumanpanja2005@gmail.com
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 dark:text-gray-200">
                  About Developer
                </h3>
                <div className="bg-white rounded-lg shadow-md p-4 dark:bg-gray-800">
                  <img
                    src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Developer"
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <p className="text-gray-600 text-sm dark:text-gray-300">
                    Passionate full-stack developer with a love for creating
                    beautiful and functional web applications.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-600 text-sm dark:text-gray-400">
                © {new Date().getFullYear()} HackTrack. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </HackathonProvider>
  );
}

export default App;
