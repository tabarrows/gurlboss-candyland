import { useState } from 'react';
import { Phone, MapPin, Music, Instagram, Mail } from 'lucide-react';
import { useSettings } from '@/lib/use-settings';

export default function ContactPage() {
  const { settings } = useSettings();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const waNumber = settings.whatsapp_number.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Hi GurlBoss CandyLand! My name is ${form.name}.\n\n${form.message}\n\nMy email: ${form.email}`
    );
    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
    setSent(true);
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-gradient-to-br from-gcl-pink-50 to-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl text-gcl-pink-600 mb-2">Contact Us</h1>
          <p className="text-sm text-gray-500">We'd love to hear from you!</p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gcl-pink-50 shrink-0">
                  <Phone className="h-5 w-5 text-gcl-pink-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Phone / WhatsApp</p>
                  <p className="text-sm text-gray-500">{settings.whatsapp_number}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gcl-pink-50 shrink-0">
                  <MapPin className="h-5 w-5 text-gcl-pink-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Location</p>
                  <p className="text-sm text-gray-500">Montego Bay, Jamaica</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gcl-pink-50 shrink-0">
                  <Music className="h-5 w-5 text-gcl-pink-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">TikTok</p>
                  <p className="text-sm text-gray-500">@{settings.tiktok_handle}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gcl-pink-50 shrink-0">
                  <Instagram className="h-5 w-5 text-gcl-pink-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Instagram</p>
                  <p className="text-sm text-gray-500">@{settings.instagram_handle}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-gcl-pink-50 border border-gcl-pink-100 p-5">
              <h3 className="text-sm font-bold text-gcl-pink-600 mb-2">Delivery Info</h3>
              <p className="text-sm text-gray-600">
                FREE delivery in Montego Bay. Islandwide shipping through Knutsford.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card p-6">
            {sent ? (
              <div className="text-center py-10">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 mx-auto mb-4">
                  <Mail className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Message Ready!</h3>
                <p className="text-sm text-gray-500">
                  Your message has been prepared in WhatsApp. Please send it to complete your inquiry.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}
                  className="btn-secondary mt-6"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-lg font-bold text-gray-900">Send a Message</h2>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-field"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input-field"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="input-field resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Send via WhatsApp
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
