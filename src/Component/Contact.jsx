import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Github,
  MessageSquare,
  Download,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Smartphone
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/Resume.pdf";
    link.download = "Julius_Dagana_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "daganajulius5@gmail.com",
      link: "mailto:daganajulius5@gmail.com",
      color: "blue"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Phone",
      value: "+233 55 328 0522",
      link: "tel:+233553280522",
      color: "emerald"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      value: "Accra, Ghana",
      link: null,
      color: "purple"
    },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      url: "https://www.linkedin.com/in/dagana-julius-7b2685364",
      gradient: "from-blue-600 to-blue-400"
    },
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5" />,
      url: "https://github.com/Julius-git-coder",
      gradient: "from-gray-900 to-gray-700"
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="w-6 h-6" />,
      url: "https://wa.me/+233553280522",
      gradient: "from-green-600 to-green-400"
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfd] py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-block relative">
            <Sparkles className="absolute -top-8 -right-8 w-10 h-10 text-blue-600 animate-pulse opacity-20" />
            <span className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-3 block">Available for Hire</span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight">
              Let's Build <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Together</span>
            </h1>
            <div className="h-1.5 w-32 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto mt-8 font-semibold leading-relaxed">
            Have a revolutionary idea? I'm ready to turn your vision into a high-performance reality. Reach out and let's start something extraordinary.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          {/* Contact Information & Socials */}
          <div className="space-y-12">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2.5rem] blur opacity-5 group-hover:opacity-10 transition duration-1000"></div>
              <div className="relative bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-gray-50">
                  <MessageSquare className="w-32 h-32" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight relative">Direct Connection</h2>
                <p className="text-gray-500 font-semibold mb-10 relative">
                  Preferred way to reach out for project consultations, collaborative opportunities, or just a professional greeting.
                </p>

                <div className="space-y-6 relative">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="group/card bg-gray-50/50 hover:bg-white p-6 rounded-2xl border border-transparent hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
                    >
                      <div className="flex items-center gap-6">
                        <div className="flex items-center justify-center w-14 h-14 bg-white rounded-2xl shadow-sm text-blue-600 transform group-hover/card:scale-110 group-hover/card:rotate-6 transition-all duration-300">
                          {info.icon}
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{info.title}</h3>
                          {info.link ? (
                            <a
                              href={info.link}
                              className="text-lg font-black text-gray-900 hover:text-blue-600 transition-colors"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <span className="text-lg font-black text-gray-900">{info.value}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Connectivity */}
            <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
              <div className="absolute top-0 left-0 -m-10 w-40 h-40 bg-blue-600 rounded-full blur-[80px] opacity-20"></div>
              <h3 className="text-xl font-black mb-8 tracking-tight relative">Digital Footprint</h3>
              <div className="grid grid-cols-3 gap-6 relative">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social flex flex-col items-center gap-4 transition-transform hover:-translate-y-2"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${social.gradient} rounded-2xl flex items-center justify-center p-4 shadow-lg group-hover/social:shadow-2xl transition-all duration-300`}>
                      <div className="text-white transform group-hover/social:scale-110 transition-transform">
                        {social.icon}
                      </div>
                    </div>
                    <span className="text-xs font-bold text-gray-400 group-hover/social:text-white transition-colors uppercase tracking-widest">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form Container */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[3rem] blur-2xl opacity-5"></div>
            <div className="relative bg-white rounded-[2.5rem] shadow-2xl p-8 lg:p-12 border border-gray-50">
              <h2 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">Initiate Project</h2>
              <form
                className="space-y-8"
                action="https://api.web3forms.com/submit"
                method="POST"
              >
                <input type="hidden" name="access_key" value="082aed03-4b1f-4889-a31b-20b581eea26f" />
                <input type="hidden" name="subject" value="New High-Tier Collaboration Request" />
                <input type="hidden" name="from_name" value="Portfolio Intelligence" />

                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-300 font-semibold placeholder:text-gray-300"
                      placeholder="Identify yourself"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Node</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-300 font-semibold placeholder:text-gray-300"
                      placeholder="address@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Communication Line</label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-300 font-semibold placeholder:text-gray-300"
                    placeholder="Telecom signal (optional)"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Project Directive</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-300 font-semibold placeholder:text-gray-300 resize-none"
                    placeholder="Briefly describe your vision and requirements..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full group relative inline-flex items-center justify-center gap-4 px-10 py-5 bg-gray-900 text-white rounded-2xl font-black overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative">Deploy Inquiry</span>
                  <Send className="relative w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Global CTA Section */}
        <div className="mt-24 lg:mt-32 text-center bg-white rounded-[3rem] p-12 lg:p-20 border border-gray-100 shadow-sm relative group overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
          <h3 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6 tracking-tight">Need a Comprehensive Review?</h3>
          <p className="text-gray-500 text-lg sm:text-xl font-semibold mb-12 max-w-2xl mx-auto leading-relaxed">
            I'm always open to discussing technical strategies and high-impact digital solutions. Your success is the primary objective.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="mailto:daganajulius5@gmail.com"
              className="group flex items-center gap-3 px-8 py-4 bg-blue-50 text-blue-600 rounded-2xl font-black hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
              Direct Email
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              onClick={handleDownloadCV}
              className="group flex items-center gap-3 px-8 py-4 bg-gray-50 text-gray-900 rounded-2xl font-black hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              Capture Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
