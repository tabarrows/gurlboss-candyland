import { Candy, Heart, Star, Sparkles, Truck } from 'lucide-react';
import { HERO_IMAGE, COLORFUL_CANDY_IMAGE } from '@/lib/types';

export default function AboutPage() {
  return (
    <div className="animate-fade-in">
      <div className="bg-gradient-to-br from-gcl-pink-50 to-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl text-gcl-pink-600 mb-2">About GurlBoss CandyLand</h1>
          <p className="text-sm text-gray-500">Jamaica's sweetest candy destination</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-3xl overflow-hidden shadow-xl mb-10 aspect-[16/9]">
          <img src={HERO_IMAGE} alt="GurlBoss CandyLand candy" className="h-full w-full object-cover" />
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="font-display text-2xl text-gcl-pink-600 mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            GurlBoss CandyLand (GCL) is a premium candy boutique bringing joy to candy lovers across Jamaica. 
            What started as a passion for sharing sweet treats has grown into a full candy destination — 
            offering everything from individual favorites to custom mixes and our signature GurlBoss Fave candy platters.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            We believe candy should be fun, colorful, and made with care. That's why every Pick & Mix bag 
            and every GBF platter is hand-arranged with your choice of candies, creating a one-of-a-kind 
            sweet experience every time.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 my-10">
          {[
            { icon: Candy, title: '50+ Candy Options', desc: 'From gummy to sour, chocolate to international' },
            { icon: Star, title: 'Signature GBF Platters', desc: 'Real candy platters, beautifully arranged' },
            { icon: Sparkles, title: 'Custom Pick & Mix', desc: 'Build your own mix in 4 sizes' },
          ].map((f) => (
            <div key={f.title} className="card p-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gcl-pink-50 mx-auto mb-3">
                <f.icon className="h-7 w-7 text-gcl-pink-500" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">{f.title}</h3>
              <p className="text-xs text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-gcl-pink-50 border border-gcl-pink-100 p-6 mb-10">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gcl-pink-100 shrink-0">
              <Truck className="h-6 w-6 text-gcl-pink-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gcl-pink-600 mb-1">Delivery</h3>
              <p className="text-sm text-gray-600">
                We offer <strong>FREE delivery in Montego Bay</strong> and islandwide shipping through Knutsford. 
                Place your order online and we'll take care of the rest!
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-gcl-pink-500 to-gcl-pink-700 p-8 text-center text-white">
          <Heart className="h-10 w-10 mx-auto mb-3" />
          <h3 className="font-display text-2xl mb-2">Made with love in Jamaica</h3>
          <p className="text-gcl-pink-100 text-sm">
            Follow us on TikTok <strong>@1GURL_BOSSGCL</strong> and Instagram <strong>@GURL_BOSSGCL</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
