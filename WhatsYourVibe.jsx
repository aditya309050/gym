import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function WhatsYourVibe({ activeTab = 'MEN', onSelectVibe }) {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const vibesByGender = {
    WOMEN: [
      {
        id: 'BRIDAL LEHENGA',
        title: 'BRIDAL LEHENGA',
        description: 'Grand royal wedding lehengas with heirloom 32-kali flare and Mughal zardozi.',
        image: '/images/vibe/bridal_lehenga.jpg',
        fallback: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=85',
        filter: 'Lehengas'
      },
      {
        id: 'BANARASI SAREE',
        title: 'BANARASI SAREE',
        description: 'Pure Katan and Kadwa silk weaves from the timeless heritage ghats of Varanasi.',
        image: '/images/vibe/banarasi_saree.jpg',
        fallback: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85',
        filter: 'Banarasi Sarees'
      },
      {
        id: 'KURTI & SUITS',
        title: 'KURTI & SUITS',
        description: 'Everyday festive luxury, embroidered Chanderi suits, and elegant palazzo sets.',
        image: '/images/vibe/kurti_suits.jpg',
        fallback: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=85',
        filter: 'Kurtis & Suits'
      },
      {
        id: 'GOWNS & ANARKALIS',
        title: 'GOWNS & ANARKALIS',
        description: 'Floor-length flared royal Anarkalis and modern evening celebration gowns.',
        image: '/images/vibe/gowns_anarkalis.jpg',
        fallback: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=85',
        filter: 'Indo-Western'
      },
      {
        id: 'SHARARA & GHARARA',
        title: 'SHARARA & GHARARA',
        description: 'Dramatic festive silhouettes crafted for Sangeet nights and Mehendi twirls.',
        image: '/images/vibe/sharara_gharara.jpg',
        fallback: 'https://plus.unsplash.com/premium_photo-1682096060450-6ac06a3a0478?auto=format&fit=crop&w=800&q=85',
        filter: 'Kurtis & Suits'
      },
      {
        id: 'FESTIVE EDIT',
        title: 'FESTIVE EDIT',
        description: 'Luminous pastel and jewel-tone ensembles for Diwali, Eid and family celebrations.',
        image: '/images/vibe/festive_edit.jpg',
        fallback: 'https://plus.unsplash.com/premium_photo-1682092039530-584ae1d9da7f?auto=format&fit=crop&w=800&q=85',
        filter: 'Festive'
      },
      {
        id: 'ENGAGEMENT WEAR',
        title: 'ENGAGEMENT WEAR',
        description: 'Sophisticated contemporary cocktail sarees and pre-wedding statement looks.',
        image: '/images/vibe/engagement_wear.jpg',
        fallback: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85',
        filter: 'Engagement'
      },
      {
        id: 'DUPATTAS & ACCESSORIES',
        title: 'DUPATTAS & ACCESSORIES',
        description: 'Rich Banarasi brocade odhanis, heirloom dupattas, potlis, and royal jewellery.',
        image: '/images/vibe/dupattas_accessories.jpg',
        fallback: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=85',
        filter: 'Accessories'
      }
    ],
    MEN: [
      {
        id: 'SHERWANI',
        title: 'ROYAL SHERWANI',
        description: 'Handcrafted zardozi & raw silk sherwanis for grooms and grand weddings.',
        image: '/images/vibe/men_royal_sherwani.jpg',
        fallback: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=800&q=85',
        filter: 'Sherwanis'
      },
      {
        id: 'INDO WESTERN',
        title: 'INDO WESTERN',
        description: 'Contemporary asymmetric sculpted jackets, cowl drapes and tailored royal ensembles.',
        image: '/images/vibe/men_indo_western.jpg',
        fallback: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=85',
        filter: 'Indo-Western'
      },
      {
        id: 'JODHPURI',
        title: 'JODHPURI BANDHGALA',
        description: 'Regal structured high-collar bandhgalas for receptions and royal formal celebrations.',
        image: '/images/vibe/men_jodhpuri.jpg',
        fallback: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=85',
        filter: 'Indo-Western'
      },
      {
        id: 'KURTA JACKET SET',
        title: 'KURTA & BUNDI JACKET',
        description: 'Pure silk kurtas paired with embroidered Nehru jackets for Haldi & Mehendi.',
        image: '/images/vibe/men_kurta_jacket.jpg',
        fallback: 'https://images.unsplash.com/photo-1565708097881-bbf4ecf47cc1?auto=format&fit=crop&w=800&q=85',
        filter: 'Kurta Sets'
      },
      {
        id: 'ROYAL KURTA PAJAMA',
        title: 'ROYAL KURTA PAJAMA',
        description: 'Classic festive silk and chanderi kurtas tailored for pujas and celebrations.',
        image: '/images/vibe/men_kurta_pajama.jpg',
        fallback: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&w=800&q=85',
        filter: 'Kurta Sets'
      },
      {
        id: 'TUXEDO & COCKTAIL',
        title: 'TUXEDO & COCKTAIL',
        description: 'Velvet dinner jackets, peak lapels, and opulent black-tie celebration suits.',
        image: '/images/vibe/men_tuxedo.jpg',
        fallback: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=800&q=85',
        filter: 'Indo-Western'
      },
      {
        id: 'DHOTI & ANGRAKHA',
        title: 'DHOTI & ANGRAKHA SETS',
        description: 'Traditional ceremonial Angrakha drapes and Banarasi silk dhotis for wedding rituals.',
        image: '/images/vibe/men_dhoti_angrakha.jpg',
        fallback: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=85',
        filter: 'Kurta Sets'
      },
      {
        id: 'SAFAS & ACCESSORIES',
        title: 'SAFAS & ACCESSORIES',
        description: 'Royal groom pagris, kalgi jewels, pearl malas, silk stoles, and handcrafted mojaris.',
        image: '/images/vibe/men_safas_accessories.jpg',
        fallback: 'https://images.unsplash.com/photo-1621609764095-b32bbe35cf3a?auto=format&fit=crop&w=800&q=85',
        filter: 'Accessories'
      }
    ]
  };

  const vibes = vibesByGender[activeTab] || vibesByGender.MEN;

  const checkScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);
    const maxScroll = scrollWidth - clientWidth;
    setScrollProgress(maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0);
  };

  useEffect(() => {
    // Reset scroll on tab change
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
    const timer = setTimeout(checkScroll, 100);
    const el = carouselRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      clearTimeout(timer);
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [activeTab]);

  const handleScroll = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth * 0.75;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section className="w-full py-16 bg-[#fbf8f2] relative overflow-hidden">
      {/* Centered Decorative Motif & Heading */}
      <div className="text-center mb-10 space-y-2 px-4">
        <div className="flex justify-center items-center gap-2 mb-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#e25822]">
            <path d="M12 2L14.5 8.5L21 9.5L16 14L17.5 21L12 17.5L6.5 21L8 14L3 9.5L9.5 8.5L12 2Z" fill="currentColor" opacity="0.9" />
          </svg>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-[0.16em] text-[#2b241e] uppercase">
          WHAT'S YOUR VIBE?
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#786e62] tracking-wider uppercase font-semibold">
          Curated Royal Celebration & Ethnic Edits
        </p>
      </div>

      {/* Full-Width Arched Cards Carousel Container */}
      <div className="relative w-full px-4 sm:px-8 lg:px-12 xl:px-14 2xl:px-16 mx-auto">
        
        {/* Left Arrow Button */}
        <button 
          onClick={() => handleScroll('left')}
          disabled={!canScrollLeft}
          className={`absolute left-3 sm:left-5 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm shadow-xl border border-[#e8dfd1] text-[#2b241e] flex items-center justify-center transition-all duration-300 z-30 ${
            canScrollLeft 
              ? 'hover:bg-[#e25822] hover:text-white hover:scale-110 cursor-pointer opacity-100 shadow-lg' 
              : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Previous vibe"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Scrollable Track */}
        <div 
          ref={carouselRef}
          className="flex items-stretch gap-5 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar py-4 px-1"
        >
          {vibes.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => onSelectVibe && onSelectVibe(item.filter || item.title)}
              className="flex-none w-[275px] sm:w-[310px] md:w-[330px] lg:w-[calc(25%-18px)] xl:w-[calc(25%-18px)] 2xl:w-[calc(25%-19px)] snap-start group relative cursor-pointer overflow-hidden rounded-t-[140px] rounded-b-md border border-[#e6dccf] bg-[#ede3d2] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 select-none"
              style={{ height: '490px' }}
            >
              {/* Authentic High-Resolution Portrait Visual with Graceful Error Fallback */}
              <img
                src={item.image}
                alt={item.title}
                loading="eager"
                onError={(e) => {
                  if (item.fallback && e.currentTarget.src !== item.fallback) {
                    e.currentTarget.src = item.fallback;
                  }
                }}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* Arch Framing Border Highlight */}
              <div className="absolute inset-0 rounded-t-[140px] border-2 border-transparent group-hover:border-[#e25822]/50 transition-colors duration-500 pointer-events-none" />

              {/* Bottom Dark Maroon Gradient Overlay with Title and Description */}
              <div className="absolute inset-x-0 bottom-0 min-h-[175px] bg-gradient-to-t from-[#260e0a] via-[#3b1812]/92 via-50% to-transparent flex flex-col justify-end items-center px-4 pb-6 pt-10 text-center transition-all duration-300">
                
                {/* Category Title */}
                <span className="font-cinzel text-white text-sm sm:text-base font-bold tracking-[0.16em] uppercase drop-shadow-md group-hover:text-[#f7e0b5] transition-colors">
                  {item.title}
                </span>

                {/* Specific Descriptive Text */}
                <p className="text-[#eaddc5]/90 text-[11px] sm:text-xs font-sans font-normal line-clamp-2 mt-2 leading-relaxed tracking-normal group-hover:text-white transition-colors max-w-[280px]">
                  {item.description}
                </p>

                {/* Micro-Interaction CTA */}
                <div className="mt-2.5 flex items-center gap-1.5 text-[#e25822] text-[11px] font-cinzel font-bold tracking-widest uppercase opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span>Explore Vibe</span>
                  <ChevronRight size={13} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button 
          onClick={() => handleScroll('right')}
          disabled={!canScrollRight}
          className={`absolute right-3 sm:right-5 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm shadow-xl border border-[#e8dfd1] text-[#2b241e] flex items-center justify-center transition-all duration-300 z-30 ${
            canScrollRight 
              ? 'hover:bg-[#e25822] hover:text-white hover:scale-110 cursor-pointer opacity-100 shadow-lg' 
              : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Next vibe"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Carousel Progress Track & Indicator */}
      {vibes.length > 4 && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <div className="w-44 h-1.5 bg-[#e8dfd1] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#e25822] transition-all duration-300 rounded-full"
              style={{ width: `${Math.max(15, scrollProgress)}%` }}
            />
          </div>
          <span className="text-[11px] font-cinzel tracking-wider text-[#786e62] uppercase font-semibold">
            Explore all {vibes.length} festive vibes
          </span>
        </div>
      )}
    </section>
  );
}
