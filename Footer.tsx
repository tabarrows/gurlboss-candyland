import { Link } from 'react-router-dom';
import { Candy, Instagram, Music, Phone, MapPin } from 'lucide-react';
import { useSettings } from '@/lib/use-settings';

export default function Footer() {
  const { settings } = useSettings();

  return (
    <footer className="bg-gradient-to-br from-gcl-pink-600 to-gcl-pink-800 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <Candy className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-display text-xl">GurlBoss</p>
                <p className="text-[10px] font-bold tracking-widest uppercase text-gcl-pink-100">CandyLand</p>
              </div>
            </div>
            <p className="text-sm text-gcl-pink-100 leading-relaxed">
              Your fun and colorful candy destination. Premium candy, custom mixes, and signature platters.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-gcl-pink-100">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className="text-white/90 hover:text-white transition-colors">All Candy</Link></li>
              <li><Link to="/pick-and-mix" className="text-white/90 hover:text-white transition-colors">Pick & Mix</Link></li>
              <li><Link to="/gurlboss-fave" className="text-white/90 hover:text-white transition-colors">GurlBoss Fave Platters</Link></li>
              <li><Link to="/about" className="text-white/90 hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-gcl-pink-100">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-white/90">
                <Phone className="h-4 w-4 shrink-0" />
                <span>{settings.whatsapp_number}</span>
              </li>
              <li className="flex items-center gap-2 text-white/90">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>Montego Bay, Jamaica</span>
              </li>
              <li className="flex items-center gap-2 text-white/90">
                <Music className="h-4 w-4 shrink-0" />
                <span>TikTok: @{settings.tiktok_handle}</span>
              </li>
              <li className="flex items-center gap-2 text-white/90">
                <Instagram className="h-4 w-4 shrink-0" />
                <span>IG: @{settings.instagram_handle}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-gcl-pink-100">Follow Us</h3>
            <div className="flex gap-3">
              <a
                href={`https://www.tiktok.com/@${settings.tiktok_handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 transition-all hover:bg-white/30 active:scale-95"
                aria-label="TikTok"
              >
                <Music className="h-5 w-5" />
              </a>
              <a
                href={`https://www.instagram.com/${settings.instagram_handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 transition-all hover:bg-white/30 active:scale-95"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={`https://wa.me/${settings.whatsapp_number.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 transition-all hover:bg-white/30 active:scale-95"
                aria-label="WhatsApp"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/20">
          <p className="text-center text-xs text-gcl-pink-100">
            &copy; {new Date().getFullYear()} GurlBoss CandyLand (GCL). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
