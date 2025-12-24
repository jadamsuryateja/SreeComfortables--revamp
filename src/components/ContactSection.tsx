import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: 'Message Sent!', description: 'We will be in touch soon.' });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 bg-[#FFFEFA]">
      <div className="container-custom px-4 lg:px-24">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#997B44] uppercase tracking-[0.2em] text-xs font-bold mb-4">Contact Us</p>
          <h2 className="font-display text-5xl md:text-6xl text-[#2A2522] mb-4">
            Get In <span className="text-[#997B44]">Touch</span>
          </h2>
          <p className="text-gray-500 font-sans text-lg">We'd love to hear from you. Let's start a conversation.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 text-[#2A2522]">

          {/* Left Side - Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-display text-2xl mb-8">Contact Information</h3>

            {/* Phone Card */}
            <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-gray-100 dark:border-none flex items-start gap-6 hover:shadow-md transition-shadow">
              <div className="bg-[#C5A572]/10 p-4 rounded-xl text-[#C5A572]">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider mb-2">Phone</h4>
                <p className="font-sans text-lg">+91 93910 22433</p>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-gray-100 flex items-start gap-6 hover:shadow-md transition-shadow">
              <div className="bg-[#C5A572]/10 p-4 rounded-xl text-[#C5A572]">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider mb-2">Email</h4>
                <p className="font-sans text-base break-all">sreecomfortables@gmail.com</p>
                <p className="font-sans text-base break-all mt-1">sreenivasa_gorantla@yahoo.com</p>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-gray-100 flex items-start gap-6 hover:shadow-md transition-shadow">
              <div className="bg-[#C5A572]/10 p-4 rounded-xl text-[#C5A572]">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider mb-2">Locations</h4>
                <div className="space-y-4">
                  <div>
                    <p className="font-bold text-sm mb-1">Company</p>
                    <p className="font-sans text-sm text-gray-600">SREE COMFORTABLES Pvt. Ltd.</p>
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-1">Factory</p>
                    <p className="font-sans text-sm text-gray-600 leading-relaxed">
                      Plot No. 82, 5-35-212/2, Shakthipuram, Prashanthi Nagar Extn. IDA, Kukatpally, Hyd - 72
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF9F6] border border-gray-100 p-8 md:p-12 rounded-[2rem] shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-bold text-[#2A2522]">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-[#2A2522] focus:outline-none focus:border-[#C5A572] transition-colors placeholder:text-gray-400 font-sans shadow-sm"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-bold text-[#2A2522]">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-[#2A2522] focus:outline-none focus:border-[#C5A572] transition-colors placeholder:text-gray-400 font-sans shadow-sm"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-[#2A2522]">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-[#2A2522] focus:outline-none focus:border-[#C5A572] transition-colors placeholder:text-gray-400 font-sans shadow-sm"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-[#2A2522]">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your project..."
                    rows={5}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-[#2A2522] focus:outline-none focus:border-[#C5A572] transition-colors placeholder:text-gray-400 font-sans resize-none shadow-sm"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-[#2A2522] text-[#C5A572] py-4 rounded-lg uppercase tracking-widest font-bold hover:bg-[#3D342B] transition-colors duration-300 flex items-center justify-center gap-2 mt-4 shadow-lg shadow-[#2A2522]/20"
                >
                  Send Message <Send size={18} />
                </motion.button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
