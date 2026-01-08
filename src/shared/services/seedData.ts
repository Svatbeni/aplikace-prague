import { PlaceRepository } from '../repositories/PlaceRepository';
import { TourRepository } from '../repositories/TourRepository';
import { HotelRepository } from '../repositories/HotelRepository';
import { TipRepository } from '../repositories/TipRepository';
import { Place, PlaceCategory, Tour, Hotel, PracticalTip, TipCategory } from '../../types';

const samplePlaces: Omit<Place, 'createdAt' | 'updatedAt'>[] = [
  {
    id: '1',
    name: 'Charles Bridge',
    shortDescription: 'Historic stone bridge spanning the Vltava River',
    description:
      'Charles Bridge is a historic bridge that crosses the Vltava river in Prague. Construction started in 1357 under the auspices of King Charles IV and finished in the early 15th century. It is one of the most famous bridges in Europe.',
    practicalTips:
      'Visit early in the morning (before 8 AM) or late in the evening to avoid crowds. Free to visit. Best views are from both sides of the river.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0865,
    longitude: 14.4110,
    images: ['place-1.jpg'],
    address: 'Karlův most, 110 00 Praha 1',
    estimatedVisitDuration: 30,
    priceRange: 'free',
    isPremium: false,
  },
  {
    id: '2',
    name: 'Prague Castle',
    shortDescription: 'Largest ancient castle complex in the world',
    description:
      'Prague Castle is a castle complex in Prague, built in the 9th century. It is the official office of the President of the Czech Republic and one of the most important cultural institutions in the Czech Republic.',
    practicalTips:
      'Buy tickets online to skip the lines. Allow 2-3 hours for a complete visit. Free entry to the castle grounds, but tickets required for buildings.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0904,
    longitude: 14.4004,
    images: ['place-2.jpg'],
    address: 'Pražský hrad, 119 08 Praha 1',
    estimatedVisitDuration: 180,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '3',
    name: 'Old Town Square',
    shortDescription: 'Historic square with the Astronomical Clock',
    description:
      'Old Town Square is a historic square in the Old Town quarter of Prague. It is located between Wenceslas Square and Charles Bridge. The square features various architectural styles including the Gothic Church of Our Lady before Týn.',
    practicalTips:
      'Visit the Astronomical Clock on the hour to see the "Walk of the Apostles". The square is always crowded but most beautiful during Christmas markets.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0875,
    longitude: 14.4214,
    images: ['place-3.jpg'],
    address: 'Staroměstské nám., 110 00 Praha 1',
    estimatedVisitDuration: 60,
    priceRange: 'free',
    isPremium: false,
  },
  {
    id: '4',
    name: 'Petřín Hill',
    shortDescription: 'Park with observation tower offering panoramic views',
    description:
      'Petřín is a hill in the center of Prague. It rises 327 m above sea level and some 130 m above the left bank of the Vltava River. The hill is almost entirely covered with parks and is a popular recreational area.',
    practicalTips:
      'Take the funicular railway for a unique experience, or walk up the hill for free. Best visited on a clear day for views. Free entry to the park.',
    category: PlaceCategory.VIEWPOINTS,
    latitude: 50.0833,
    longitude: 14.3958,
    images: ['place-4.jpg'],
    address: 'Petřínské sady, 118 00 Praha 1',
    estimatedVisitDuration: 90,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '5',
    name: 'Vyšehrad',
    shortDescription: 'Historic fort with cemetery and beautiful views',
    description:
      'Vyšehrad is a historic fort located in Prague. It was probably built in the 10th century on a hill over the Vltava River. The fort contains the Basilica of St. Peter and St. Paul, as well as the Vyšehrad cemetery.',
    practicalTips:
      'Less crowded than Prague Castle. Free entry to most areas. Great for sunset views. Cemetery contains many famous Czech personalities.',
    category: PlaceCategory.HIDDEN_GEMS,
    latitude: 50.0644,
    longitude: 14.4189,
    images: ['place-5.jpg'],
    address: 'V Pevnosti 159/5b, 128 00 Praha 2',
    estimatedVisitDuration: 90,
    priceRange: 'free',
    isPremium: false,
  },
  {
    id: '6',
    name: 'John Lennon Wall',
    shortDescription: 'Colorful wall with graffiti and peace messages',
    description:
      'The John Lennon Wall is a wall in Prague filled with John Lennon-inspired graffiti and pieces of lyrics from Beatles songs. It represents a symbol of global ideals such as love and peace.',
    practicalTips:
      'Always changing with new graffiti. Free to visit. Best photographed in natural light. Located near Charles Bridge.',
    category: PlaceCategory.HIDDEN_GEMS,
    latitude: 50.0857,
    longitude: 14.4075,
    images: ['place-6.jpg'],
    address: 'Velkopřevorské náměstí, 100 00 Praha 1',
    estimatedVisitDuration: 15,
    priceRange: 'free',
    isPremium: false,
  },
  {
    id: '7',
    name: 'U Fleků',
    shortDescription: 'Historic brewery restaurant serving traditional Czech food',
    description:
      'U Fleků is a historic brewery in Prague, established in 1499. It is the oldest brewery in Prague still in operation. The restaurant serves traditional Czech cuisine and the famous dark beer.',
    practicalTips:
      'Reservations recommended. Try the dark beer (Tmavý ležák). Traditional Czech dishes are hearty portions. Tourist-friendly but authentic.',
    category: PlaceCategory.FOOD,
    latitude: 50.0751,
    longitude: 14.4189,
    images: ['place-7.jpg'],
    address: 'Křemencova 11, 110 00 Praha 1',
    estimatedVisitDuration: 90,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '8',
    name: 'Stromovka Park',
    shortDescription: 'Large park perfect for walking and relaxation',
    description:
      'Stromovka is the largest park in Prague, covering over 95 hectares. It was originally a royal game reserve and is now a popular recreational area with ponds, walking paths, and sports facilities.',
    practicalTips:
      'Perfect for a peaceful escape from the city. Great for families with children. Free entry. Bring a picnic.',
    category: PlaceCategory.NATURE,
    latitude: 50.1083,
    longitude: 14.4317,
    images: ['place-8.jpg'],
    address: 'Královská obora, 170 00 Praha 7',
    estimatedVisitDuration: 60,
    priceRange: 'free',
    isPremium: false,
  },
];

export const seedDatabase = async (): Promise<void> => {
  const repo = new PlaceRepository();

  // Always update all places to ensure they have local images
  const existing = await repo.getAll();
  const now = new Date();
  
  if (existing.length > 0) {
    // Update ALL existing places with local images
    for (const existingPlace of existing) {
      const samplePlace = samplePlaces.find(p => p.id === existingPlace.id);
      if (samplePlace) {
        await repo.update({
          ...samplePlace,
          createdAt: existingPlace.createdAt,
          updatedAt: now,
        });
      }
    }
    
    // Insert any missing places
    for (const samplePlace of samplePlaces) {
      const exists = existing.find(p => p.id === samplePlace.id);
      if (!exists) {
        await repo.insert({
          ...samplePlace,
          createdAt: now,
          updatedAt: now,
        });
      }
    }
  } else {
    // Insert sample places if database is empty
    for (const place of samplePlaces) {
      await repo.insert({
        ...place,
        createdAt: now,
        updatedAt: now,
      });
    }
  }

  // Seed tours
  await seedTours();

  // Seed hotels
  await seedHotels();

  // Seed practical tips
  await seedTips();
};

const sampleTours: Omit<Tour, 'createdAt' | 'updatedAt'>[] = [
  {
    id: 'tour-1',
    title: 'Prague Castle: Skip-the-Line Ticket & Audio Guide',
    shortDescription: 'Skip the long queues and explore Prague Castle at your own pace with an audio guide',
    description: 'Visit the largest ancient castle complex in the world without waiting in long lines. This skip-the-line ticket includes access to all major attractions within Prague Castle, including St. Vitus Cathedral, Old Royal Palace, St. George\'s Basilica, and Golden Lane. The audio guide provides fascinating insights into the history and architecture of this UNESCO World Heritage site.',
    duration: '2-3 hours',
    priceRange: '€15-25',
    affiliateLink: 'https://www.getyourguide.com/prague-l10/prague-castle-skip-the-line-ticket-with-audio-guide-t26944/',
    provider: 'GetYourGuide',
    category: 'Sightseeing',
    rating: 4.6,
    requiresOnline: true,
  },
  {
    id: 'tour-2',
    title: 'Prague: Vltava River Cruise with Buffet Lunch',
    shortDescription: 'Enjoy a relaxing cruise along the Vltava River with delicious buffet lunch',
    description: 'Experience Prague from a unique perspective on a scenic river cruise. Sail past iconic landmarks including Charles Bridge, Prague Castle, and the National Theatre while enjoying a delicious buffet lunch. The cruise offers stunning views of the city\'s architecture and is perfect for photography enthusiasts. Available in multiple languages.',
    duration: '2 hours',
    priceRange: '€30-45',
    affiliateLink: 'https://www.getyourguide.com/prague-l10/prague-vltava-river-cruise-with-buffet-lunch-t22328/',
    provider: 'GetYourGuide',
    category: 'Cruise',
    rating: 4.5,
    requiresOnline: true,
  },
  {
    id: 'tour-3',
    title: 'Prague: Old Town & Jewish Quarter Walking Tour',
    shortDescription: 'Discover the historic Old Town and Jewish Quarter with a knowledgeable local guide',
    description: 'Explore Prague\'s most historic neighborhoods on this comprehensive walking tour. Visit the Old Town Square with its famous Astronomical Clock, walk through the narrow streets of the Jewish Quarter, and learn about the rich history of Prague\'s Jewish community. The tour includes entry to the Old-New Synagogue and the Jewish Cemetery. Perfect for first-time visitors.',
    duration: '3 hours',
    priceRange: '€20-30',
    affiliateLink: 'https://www.getyourguide.com/prague-l10/prague-old-town-jewish-quarter-walking-tour-t3573/',
    provider: 'GetYourGuide',
    category: 'Walking Tour',
    rating: 4.7,
    requiresOnline: true,
  },
  {
    id: 'tour-4',
    title: 'Prague: Evening Vltava River Cruise with Dinner',
    shortDescription: 'Romantic evening cruise with dinner and live music',
    description: 'Experience Prague\'s magical atmosphere on an evening river cruise. Enjoy a delicious 3-course dinner while sailing past beautifully illuminated landmarks. The cruise includes live music and offers breathtaking views of Prague Castle, Charles Bridge, and the city skyline at sunset. A perfect romantic experience for couples.',
    duration: '2.5 hours',
    priceRange: '€50-70',
    affiliateLink: 'https://www.getyourguide.com/prague-l10/prague-evening-vltava-river-cruise-with-dinner-t22330/',
    provider: 'GetYourGuide',
    category: 'Dinner Cruise',
    rating: 4.6,
    requiresOnline: true,
  },
  {
    id: 'tour-5',
    title: 'Prague: Food Tour with Traditional Czech Dishes',
    shortDescription: 'Taste authentic Czech cuisine at local restaurants and pubs',
    description: 'Discover the flavors of Czech cuisine on this guided food tour. Visit traditional restaurants and pubs in the Old Town, sample classic dishes like goulash, dumplings, and schnitzel, and learn about Czech culinary traditions. The tour includes multiple food stops and drinks. A must-do for food lovers visiting Prague.',
    duration: '3.5 hours',
    priceRange: '€45-65',
    affiliateLink: 'https://www.getyourguide.com/prague-l10/prague-food-tour-with-traditional-czech-dishes-t3575/',
    provider: 'GetYourGuide',
    category: 'Food Tour',
    rating: 4.8,
    requiresOnline: true,
  },
  {
    id: 'tour-6',
    title: 'Prague: Ghosts and Legends of Old Town Walking Tour',
    shortDescription: 'Explore Prague\'s dark history and spooky legends on an evening walking tour',
    description: 'Discover the mysterious side of Prague on this atmospheric evening walking tour. Hear spine-chilling stories about ghosts, alchemists, and legends as you walk through the dimly lit streets of the Old Town. Visit haunted locations and learn about Prague\'s dark history. Perfect for those who enjoy spooky stories and want to see a different side of the city.',
    duration: '1.5 hours',
    priceRange: '€15-25',
    affiliateLink: 'https://www.getyourguide.com/prague-l10/prague-ghosts-and-legends-of-old-town-walking-tour-t3576/',
    provider: 'GetYourGuide',
    category: 'Walking Tour',
    rating: 4.5,
    requiresOnline: true,
  },
  {
    id: 'tour-7',
    title: 'Prague: Day Trip to Český Krumlov',
    shortDescription: 'Visit the fairy-tale town of Český Krumlov on a day trip from Prague',
    description: 'Escape the city and visit one of the most beautiful towns in the Czech Republic. Český Krumlov is a UNESCO World Heritage site with a stunning castle, charming medieval streets, and picturesque river views. The tour includes transportation, a guided walking tour, and free time to explore. Perfect for those who want to see more of the Czech Republic.',
    duration: '10 hours',
    priceRange: '€50-80',
    affiliateLink: 'https://www.getyourguide.com/prague-l10/prague-day-trip-to-cesky-krumlov-t3577/',
    provider: 'GetYourGuide',
    category: 'Day Trip',
    rating: 4.7,
    requiresOnline: true,
  },
  {
    id: 'tour-8',
    title: 'Prague: Beer Tasting Tour in Traditional Pubs',
    shortDescription: 'Sample the best Czech beers at traditional pubs with a local guide',
    description: 'Experience Czech beer culture on this guided tasting tour. Visit traditional pubs and breweries, sample different types of Czech beer, and learn about the brewing process and history. The tour includes multiple beer tastings and snacks. A must-do for beer enthusiasts visiting Prague.',
    duration: '3 hours',
    priceRange: '€35-50',
    affiliateLink: 'https://www.getyourguide.com/prague-l10/prague-beer-tasting-tour-in-traditional-pubs-t3578/',
    provider: 'GetYourGuide',
    category: 'Beer Tour',
    rating: 4.6,
    requiresOnline: true,
  },
  {
    id: 'tour-9',
    title: 'Prague: Segway Tour of Old Town and Castle',
    shortDescription: 'Explore Prague on a fun Segway tour covering major attractions',
    description: 'Discover Prague in a fun and unique way on a Segway tour. Glide through the Old Town, cross Charles Bridge, and explore the area around Prague Castle. The tour includes training, safety equipment, and a knowledgeable guide. Perfect for those who want to cover more ground while having fun.',
    duration: '2.5 hours',
    priceRange: '€50-70',
    affiliateLink: 'https://www.getyourguide.com/prague-l10/prague-segway-tour-of-old-town-and-castle-t3579/',
    provider: 'GetYourGuide',
    category: 'Segway Tour',
    rating: 4.4,
    requiresOnline: true,
  },
  {
    id: 'tour-10',
    title: 'Prague: Astronomical Clock Tower Entry Ticket',
    shortDescription: 'Skip the line and climb the Astronomical Clock Tower for panoramic views',
    description: 'Visit one of Prague\'s most iconic landmarks without waiting in long queues. Climb the Astronomical Clock Tower for breathtaking panoramic views of the Old Town Square and surrounding areas. The ticket includes access to the tower and an audio guide explaining the history of the clock. Perfect for photography enthusiasts.',
    duration: '30-45 minutes',
    priceRange: '€10-15',
    affiliateLink: 'https://www.getyourguide.com/prague-l10/prague-astronomical-clock-tower-entry-ticket-t3580/',
    provider: 'GetYourGuide',
    category: 'Sightseeing',
    rating: 4.5,
    requiresOnline: true,
  },
];

export const seedTours = async (): Promise<void> => {
  const repo = new TourRepository();
  const existing = await repo.getAll();
  const now = new Date();

  if (existing.length > 0) {
    // Update existing tours
    for (const existingTour of existing) {
      const sampleTour = sampleTours.find((t) => t.id === existingTour.id);
      if (sampleTour) {
        await repo.update({
          ...sampleTour,
          createdAt: existingTour.createdAt,
          updatedAt: now,
        });
      }
    }

    // Insert any missing tours
    for (const sampleTour of sampleTours) {
      const exists = existing.find((t) => t.id === sampleTour.id);
      if (!exists) {
        await repo.insert({
          ...sampleTour,
          createdAt: now,
          updatedAt: now,
        });
      }
    }
    return;
  }

  // Insert sample tours if database is empty
  for (const tour of sampleTours) {
    await repo.insert({
      ...tour,
      createdAt: now,
      updatedAt: now,
    });
  }
};

const sampleHotels: Omit<Hotel, 'createdAt' | 'updatedAt'>[] = [
  {
    id: 'hotel-1',
    name: 'Metropolitan Old Town',
    area: 'Old Town',
    description: 'Elegant hotel in the heart of Old Town, just steps away from major landmarks. Features modern rooms with historic charm, rooftop terrace with city views, and excellent location for sightseeing.',
    priceRange: '€100-150',
    affiliateLink: 'https://www.booking.com/hotel/cz/rubicon-old-town.en.html?aid=1709572',
    rating: 4.5,
    features: ['Rooftop terrace', 'City center location', 'Historic building', 'Free WiFi'],
  },
  {
    id: 'hotel-2',
    name: 'River View Residence by Charles Bridge',
    area: 'Lesser Town',
    description: 'Beautiful apartment hotel with stunning views of Charles Bridge and Vltava River. Perfect for couples seeking a romantic stay with river views and easy access to Prague Castle.',
    priceRange: '€120-180',
    affiliateLink: 'https://www.booking.com/hotel/cz/river-view-residence-by-charles-bridge.en.html?aid=1709572',
    rating: 4.7,
    features: ['River view', 'Charles Bridge views', 'Apartment style', 'Kitchen facilities'],
  },
  {
    id: 'hotel-3',
    name: 'Dancing House Hotel',
    area: 'New Town',
    description: 'Iconic modern hotel in the famous Dancing House building. Unique architecture, contemporary design, and excellent views of the river and city. Perfect for architecture enthusiasts.',
    priceRange: '€150-250',
    affiliateLink: 'https://www.booking.com/hotel/cz/dancing-house.en.html?aid=1709572',
    rating: 4.6,
    features: ['Iconic architecture', 'Rooftop bar', 'Modern design', 'River views'],
  },
  {
    id: 'hotel-4',
    name: 'Pension Akát',
    area: 'Žižkov',
    description: 'Budget-friendly pension in the vibrant Žižkov district. Clean, comfortable rooms, friendly staff, and great value for money. Close to nightlife and local restaurants.',
    priceRange: '€40-70',
    affiliateLink: 'https://www.booking.com/hotel/cz/pension-aka-t.en.html?aid=1709572',
    rating: 4.2,
    features: ['Budget friendly', 'Local area', 'Good value', 'Public transport nearby'],
  },
  {
    id: 'hotel-5',
    name: 'Czech Inn',
    area: 'Žižkov',
    description: 'Modern hostel-hotel hybrid offering both private rooms and dormitories. Great for budget travelers and backpackers. Located in the lively Žižkov neighborhood with excellent nightlife.',
    priceRange: '€30-60',
    affiliateLink: 'https://www.booking.com/hotel/cz/czech-inn.en.html?aid=1709572',
    rating: 4.3,
    features: ['Budget option', 'Hostel & hotel', 'Social atmosphere', 'Nightlife nearby'],
  },
  {
    id: 'hotel-6',
    name: 'Wenceslas Square Hotel',
    area: 'New Town',
    description: 'Hotel with rooftop terrace overlooking Wenceslas Square. Central location, modern rooms, and excellent views of the famous square. Great for first-time visitors.',
    priceRange: '€80-130',
    affiliateLink: 'https://www.booking.com/hotel/cz/wenceslas-square.en.html?aid=1709572',
    rating: 4.4,
    features: ['Rooftop terrace', 'Wenceslas Square views', 'Central location', 'Shopping nearby'],
  },
  {
    id: 'hotel-7',
    name: 'Hotel Orion',
    area: 'Vinohrady',
    description: 'Charming hotel in the peaceful Vinohrady district, surrounded by parks and cafés. Perfect for longer stays, families, and those seeking a relaxed atmosphere away from tourist crowds.',
    priceRange: '€70-110',
    affiliateLink: 'https://www.booking.com/hotel/cz/orion-prague-2.en.html?aid=1709572',
    rating: 4.5,
    features: ['Parks nearby', 'Café culture', 'Quiet area', 'Family friendly'],
  },
  {
    id: 'hotel-8',
    name: 'Anna Hotel',
    area: 'Vinohrady',
    description: 'Boutique hotel in Vinohrady with elegant design and personalized service. Close to Riegrovy Sady park, excellent cafés, and local restaurants. Ideal for a relaxed stay.',
    priceRange: '€90-140',
    affiliateLink: 'https://www.booking.com/hotel/cz/anna.en.html?aid=1709572',
    rating: 4.6,
    features: ['Boutique style', 'Parks nearby', 'Local cafés', 'Personalized service'],
  },
  {
    id: 'hotel-9',
    name: 'Libero Residence',
    area: 'Vinohrady',
    description: 'Apartment hotel in the green Vinohrady district. Spacious apartments with kitchen facilities, perfect for families and longer stays. Surrounded by parks and excellent dining options.',
    priceRange: '€100-160',
    affiliateLink: 'https://www.booking.com/hotel/cz/pension44praha.en.html?aid=1709572',
    rating: 4.5,
    features: ['Apartment style', 'Kitchen facilities', 'Family friendly', 'Parks nearby'],
  },
  {
    id: 'hotel-10',
    name: 'Grand Hotel Bohemia',
    area: 'Old Town',
    description: 'Luxury 5-star hotel in the heart of Old Town. Elegant rooms, fine dining restaurant, spa facilities, and impeccable service. Perfect for a luxurious stay in Prague.',
    priceRange: '€200-350',
    affiliateLink: 'https://www.booking.com/hotel/cz/grandhotelbohemia.en.html?aid=1709572',
    rating: 4.8,
    features: ['5-star luxury', 'Spa facilities', 'Fine dining', 'Historic building', 'Premium service'],
  },
  {
    id: 'hotel-11',
    name: 'Alchymist Grand Hotel & Spa',
    area: 'Lesser Town',
    description: 'Luxurious hotel in Lesser Town with baroque architecture and spa facilities. Romantic atmosphere, elegant rooms, and excellent location near Prague Castle. Perfect for couples.',
    priceRange: '€180-300',
    affiliateLink: 'https://www.booking.com/hotel/cz/reshotelalchymistprague.en.html?aid=1709572',
    rating: 4.7,
    features: ['Luxury spa', 'Baroque architecture', 'Romantic', 'Prague Castle nearby', 'Fine dining'],
  },
  {
    id: 'hotel-12',
    name: 'KINGS COURT',
    area: 'Old Town',
    description: 'Premium hotel in Old Town with elegant design and excellent service. Central location, spacious rooms, and attention to detail. Perfect for discerning travelers.',
    priceRange: '€150-280',
    affiliateLink: 'https://booking.stay22.com/czechtheworld/QiazfhbDc-',
    rating: 4.6,
    features: ['Premium service', 'Central location', 'Elegant design', 'Spacious rooms'],
  },
];

export const seedHotels = async (): Promise<void> => {
  const repo = new HotelRepository();
  const existing = await repo.getAll();
  const now = new Date();

  if (existing.length > 0) {
    // Update existing hotels
    for (const existingHotel of existing) {
      const sampleHotel = sampleHotels.find((h) => h.id === existingHotel.id);
      if (sampleHotel) {
        await repo.update({
          ...sampleHotel,
          createdAt: existingHotel.createdAt || now,
          updatedAt: now,
        } as Hotel & { createdAt: Date; updatedAt: Date });
      }
    }

    // Insert any missing hotels
    for (const sampleHotel of sampleHotels) {
      const exists = existing.find((h) => h.id === sampleHotel.id);
      if (!exists) {
        await repo.insert({
          ...sampleHotel,
          createdAt: now,
          updatedAt: now,
        } as Hotel & { createdAt: Date; updatedAt: Date });
      }
    }
    return;
  }

  // Insert sample hotels if database is empty
  for (const hotel of sampleHotels) {
    await repo.insert({
      ...hotel,
      createdAt: now,
      updatedAt: now,
    } as Hotel & { createdAt: Date; updatedAt: Date });
  }
};

const sampleTips: Omit<PracticalTip, 'updatedAt'>[] = [
  // TRANSPORT tips
  {
    id: 'tip-transport-1',
    category: TipCategory.TRANSPORT,
    title: 'Prague Public Transport System',
    content: 'Prague has an excellent public transport system with metro, trams, and buses. The system is ranked among the best in the world. You can buy tickets at ticket machines, via the PID Lítačka mobile app, or at tobacco shops. Always validate your ticket when entering - you only need to validate once per journey, even when transferring between lines.',
    icon: 'subway',
    priority: 10,
  },
  {
    id: 'tip-transport-2',
    category: TipCategory.TRANSPORT,
    title: 'Ticket Types and Prices',
    content: 'Short-term tickets: 30 minutes (30 CZK), 90 minutes (40 CZK), 24 hours (120 CZK), 72 hours (330 CZK). For longer stays, consider a monthly pass. Children under 6 travel free, children 6-15 and seniors 65+ get discounted tickets. Always validate your ticket immediately after purchase - fines for traveling without a valid ticket are 1000 CZK.',
    icon: 'ticket',
    priority: 9,
  },
  {
    id: 'tip-transport-3',
    category: TipCategory.TRANSPORT,
    title: 'From Airport to City Center',
    content: 'The cheapest way: Take bus 100 or 119 to metro station, then metro to city center (total 40 CZK). Bus 100 goes to Zličín (metro B), bus 119 goes to Nádraží Veleslavín (metro A). Journey time: 30-45 minutes. Alternatively, Airport Express bus (100 CZK) goes directly to main train station. Taxi/Uber costs 400-600 CZK.',
    icon: 'airplane',
    priority: 10,
  },
  {
    id: 'tip-transport-4',
    category: TipCategory.TRANSPORT,
    title: 'Using Metro in Prague',
    content: 'Prague has 3 metro lines (A, B, C) with clear color coding. Metro runs from 5 AM to midnight (extended hours on weekends). Transfer stations are well-marked and transfers usually take just a few minutes. During rush hours (7-9 AM, 4-6 PM), metro can be very crowded. Avoid traveling with large luggage during peak times.',
    icon: 'train',
    priority: 8,
  },
  {
    id: 'tip-transport-5',
    category: TipCategory.TRANSPORT,
    title: 'Trams - Scenic Way to Travel',
    content: 'Trams are a great way to see the city while traveling. Popular routes include tram 22 (passes many major attractions) and tram 17. Trams run frequently, usually every 5-10 minutes during the day. Remember to press the stop button before your stop. Trams are accessible and safe, but watch your belongings during rush hours.',
    icon: 'car',
    priority: 7,
  },
  {
    id: 'tip-transport-6',
    category: TipCategory.TRANSPORT,
    title: 'Finding Your Way',
    content: 'Download the official PID Lítačka app for route planning, real-time schedules, and mobile tickets. Google Maps also works well for public transport in Prague. At metro stations and major tram stops, you\'ll find route maps and schedules. Most locals are happy to help if you ask for directions.',
    icon: 'map',
    priority: 6,
  },
  
  // MONEY tips
  {
    id: 'tip-money-1',
    category: TipCategory.MONEY,
    title: 'Czech Currency - Czech Crown (CZK)',
    content: 'The official currency is the Czech Crown (Koruna česká, CZK). Czech Republic is not in the Eurozone. Most places accept cards, but always carry some cash for smaller shops, markets, and tips. Current exchange rate: approximately 1 EUR = 24-25 CZK, 1 USD = 22-23 CZK (rates vary).',
    icon: 'cash',
    priority: 10,
  },
  {
    id: 'tip-money-2',
    category: TipCategory.MONEY,
    title: 'Currency Exchange - Avoid Tourist Traps',
    content: 'NEVER exchange money at exchange offices in tourist areas (Old Town Square, Wenceslas Square) - they offer terrible rates and hidden fees. Use ATMs instead (they offer fair rates) or exchange at banks. Good exchange offices include: Exchange.cz, Interchange, or banks. Always check the rate and commission before exchanging. Avoid "0% commission" signs - they hide fees in the exchange rate.',
    icon: 'card',
    priority: 10,
  },
  {
    id: 'tip-money-3',
    category: TipCategory.MONEY,
    title: 'Daily Budget Guide',
    content: 'Budget traveler: 800-1200 CZK/day (hostel, street food, free attractions). Mid-range: 1500-2500 CZK/day (hotel, restaurants, paid attractions). Luxury: 3000+ CZK/day. Meal costs: Budget restaurant 150-250 CZK, Mid-range 300-500 CZK, Fine dining 600+ CZK. Beer: 40-60 CZK in pubs, 80-120 CZK in tourist areas.',
    icon: 'wallet',
    priority: 8,
  },
  {
    id: 'tip-money-4',
    category: TipCategory.MONEY,
    title: 'Paying with Cards',
    content: 'Most restaurants, shops, and hotels accept credit/debit cards (Visa, Mastercard). Contactless payments are very common. However, some smaller shops, markets, and street vendors only accept cash. Always ask before ordering if you\'re not sure. Tipping is usually done in cash even when paying by card.',
    icon: 'card-outline',
    priority: 7,
  },
  
  // SAFETY tips
  {
    id: 'tip-safety-1',
    category: TipCategory.SAFETY,
    title: 'Prague is Generally Very Safe',
    content: 'Prague is one of the safest cities in Europe. Violent crime is extremely rare. However, like in any major tourist destination, be aware of pickpockets, especially in crowded areas like Charles Bridge, Old Town Square, and on public transport. Keep valuables secure and be cautious of your surroundings.',
    icon: 'shield-checkmark',
    priority: 9,
  },
  {
    id: 'tip-safety-2',
    category: TipCategory.SAFETY,
    title: 'Common Tourist Scams to Avoid',
    content: '1) Fake money exchange offices with terrible rates. 2) Taxi drivers overcharging (use Uber/Bolt or official taxis). 3) Pickpockets in crowded areas. 4) "Free" tours that demand payment. 5) People offering to help with tickets then asking for money. 6) Fake police asking to check your wallet. 7) Restaurant menu scams (check prices before ordering). Always trust your instincts and walk away from suspicious situations.',
    icon: 'warning',
    priority: 10,
  },
  {
    id: 'tip-safety-3',
    category: TipCategory.SAFETY,
    title: 'Protecting Your Belongings',
    content: 'Keep wallets and phones in front pockets or secure bags. Don\'t leave bags unattended. Be extra careful on trams and metro, especially during rush hours. Avoid displaying expensive jewelry or large amounts of cash. Use hotel safes for passports and extra money. Make copies of important documents and store them separately.',
    icon: 'lock-closed',
    priority: 8,
  },
  {
    id: 'tip-safety-4',
    category: TipCategory.SAFETY,
    title: 'Safe Areas and Areas to Be Cautious',
    content: 'Prague is generally safe throughout, but be extra cautious in: Very crowded tourist areas (pickpockets), late-night areas around train stations, and isolated areas after dark. Safe areas include: Old Town, Lesser Town, Vinohrady, and most residential districts. Trust your instincts - if an area feels unsafe, leave.',
    icon: 'location',
    priority: 6,
  },
  
  // EMERGENCY tips
  {
    id: 'tip-emergency-1',
    category: TipCategory.EMERGENCY,
    title: 'Emergency Phone Numbers',
    content: '112 - European emergency number (police, fire, ambulance). 158 - Police. 150 - Fire department. 155 - Ambulance. 156 - Municipal police. For non-emergency medical issues, visit a pharmacy (lékárna) or call your embassy. EU citizens can use their European Health Insurance Card (EHIC) for emergency treatment.',
    icon: 'call',
    priority: 10,
  },
  {
    id: 'tip-emergency-2',
    category: TipCategory.EMERGENCY,
    title: 'Lost or Stolen Items',
    content: 'If something is stolen, report it to police (158) immediately. For lost items on public transport, contact Prague Public Transport lost & found. For lost passports, contact your embassy immediately. Keep embassy contact information with you. Travel insurance is highly recommended to cover theft, loss, and medical emergencies.',
    icon: 'document-text',
    priority: 8,
  },
  {
    id: 'tip-emergency-3',
    category: TipCategory.EMERGENCY,
    title: 'Medical Emergencies',
    content: 'For serious emergencies, call 155 (ambulance) or 112. Major hospitals with 24/7 emergency departments include: General University Hospital (VFN), Motol University Hospital. Pharmacies (lékárna) are widely available - look for green cross signs. Many pharmacies are open 24/7. EU citizens should carry EHIC card.',
    icon: 'medical',
    priority: 9,
  },
  
  // TIPPING tips
  {
    id: 'tip-tipping-1',
    category: TipCategory.TIPPING,
    title: 'Tipping in Restaurants',
    content: 'Tipping is customary but not mandatory. Standard tip: 10-15% of the bill, or round up to the nearest 50 or 100 CZK. For excellent service, 15-20% is appreciated. Tips are usually given in cash, even when paying by card. Simply tell the server the total amount you want to pay (including tip) when paying by card, or leave cash on the table.',
    icon: 'restaurant',
    priority: 10,
  },
  {
    id: 'tip-tipping-2',
    category: TipCategory.TIPPING,
    title: 'Tipping in Other Places',
    content: 'Cafés: Round up or 10-20 CZK. Bars: 10-20 CZK per drink or 10% of bill. Taxis: Round up to nearest 10 CZK or 10%. Tour guides: 100-200 CZK per person for half-day tours, 200-500 CZK for full-day tours. Hotel staff: 50-100 CZK for porters, 50-100 CZK per night for housekeeping (left in room).',
    icon: 'card',
    priority: 8,
  },
  {
    id: 'tip-tipping-3',
    category: TipCategory.TIPPING,
    title: 'When Not to Tip',
    content: 'You don\'t need to tip: Fast food restaurants, self-service places, when service charge is already included (check your bill), or if service was poor. Tipping is a gesture of appreciation for good service, not an obligation. If you\'re unsure, observe what locals do or simply round up the bill.',
    icon: 'close-circle',
    priority: 6,
  },
  
  // INTERNET tips
  {
    id: 'tip-internet-1',
    category: TipCategory.INTERNET,
    title: 'Free WiFi in Prague',
    content: 'Free WiFi is widely available in Prague. Most cafés, restaurants, hotels, and public spaces offer free WiFi. Look for networks named "Prague WiFi" in public areas. Many tourist attractions also provide free WiFi. However, be cautious when using public WiFi - avoid accessing sensitive information like banking. Consider using a VPN for added security.',
    icon: 'wifi',
    priority: 9,
  },
  {
    id: 'tip-internet-2',
    category: TipCategory.INTERNET,
    title: 'Mobile Data and SIM Cards',
    content: 'EU roaming: If you have an EU SIM card, you can use your data plan in Czech Republic without extra charges (fair use policy applies). For non-EU visitors, consider buying a local SIM card. Major providers: Vodafone, T-Mobile, O2. Prepaid SIM cards cost around 200-300 CZK and include data. You can buy them at airports, train stations, or provider stores.',
    icon: 'phone-portrait',
    priority: 7,
  },
  
  // GENERAL tips
  {
    id: 'tip-general-1',
    category: TipCategory.GENERAL,
    title: 'Best Time to Visit Prague',
    content: 'Spring (April-May) and Fall (September-October): Best weather, fewer crowds, moderate prices. Summer (June-August): Warm weather but very crowded and higher prices. Winter (December-February): Cold but magical with Christmas markets, fewer tourists, lower prices. January-February: Least crowded but coldest. Avoid major holidays and school breaks for fewer crowds.',
    icon: 'calendar',
    priority: 9,
  },
  {
    id: 'tip-general-2',
    category: TipCategory.GENERAL,
    title: 'Avoiding Crowds',
    content: 'Visit major attractions early morning (before 8 AM) or late evening. Charles Bridge is almost empty at sunrise. Visit popular sites on weekdays rather than weekends. Consider visiting in shoulder seasons (April-May, September-October). Stay in neighborhoods like Vinohrady or Žižkov - just 10 minutes from center but much quieter. Book tickets online in advance to skip queues.',
    icon: 'people',
    priority: 8,
  },
  {
    id: 'tip-general-3',
    category: TipCategory.GENERAL,
    title: 'Tap Water is Safe to Drink',
    content: 'Tap water in Prague is safe to drink and of high quality. You can drink tap water everywhere - in restaurants, hotels, and public fountains. This will save you money and reduce plastic waste. Bring a reusable water bottle and refill it throughout the day. Many public places have drinking fountains.',
    icon: 'water',
    priority: 8,
  },
  {
    id: 'tip-general-4',
    category: TipCategory.GENERAL,
    title: 'Basic Czech Phrases',
    content: 'Hello: Dobrý den (DOH-bree den). Thank you: Děkuji (DYE-koo-yee). Please: Prosím (PRO-seem). Yes: Ano (AH-no). No: Ne (NEH). Excuse me: Promiňte (PRO-min-tyeh). Do you speak English?: Mluvíte anglicky? (MLU-vee-teh an-GLIT-skee). While most people in tourist areas speak English, locals appreciate when you try Czech phrases.',
    icon: 'chatbubbles',
    priority: 7,
  },
  {
    id: 'tip-general-5',
    category: TipCategory.GENERAL,
    title: 'Language in Prague',
    content: 'Czech is the official language, but English is widely spoken in tourist areas, hotels, restaurants, and by younger people. You\'ll have no problem getting by with English in Prague. However, learning a few basic Czech phrases (hello, thank you, please) is appreciated by locals and shows respect for the culture.',
    icon: 'language',
    priority: 6,
  },
  {
    id: 'tip-general-6',
    category: TipCategory.GENERAL,
    title: 'Alcohol Laws',
    content: 'Legal drinking age is 18. Drinking in public is generally tolerated in parks and some public spaces, but be respectful. Drinking on public transport is prohibited. Some areas have specific restrictions. Don\'t drink and drive - zero tolerance policy. Beer is very cheap and part of Czech culture, but drink responsibly.',
    icon: 'beer',
    priority: 5,
  },
  {
    id: 'tip-general-7',
    category: TipCategory.GENERAL,
    title: 'Shopping Tips',
    content: 'Most shops are open Monday-Friday 9 AM-6 PM, Saturday 9 AM-1 PM, closed Sundays. Large shopping centers are open daily including Sundays. Tourist shops in Old Town are open daily but more expensive. For better prices, shop away from main tourist areas. Czech crystal, garnet jewelry, and marionettes are popular souvenirs.',
    icon: 'bag',
    priority: 5,
  },
  {
    id: 'tip-general-8',
    category: TipCategory.GENERAL,
    title: 'Dress Code and What to Pack',
    content: 'Prague is casual - no strict dress codes. Comfortable walking shoes are essential (cobblestone streets!). Weather can change quickly - pack layers. In summer: light clothes, sunscreen, hat. In winter: warm coat, gloves, hat, waterproof boots. Umbrella is useful year-round. For churches, cover shoulders and knees (scarves available at entrances).',
    icon: 'shirt',
    priority: 6,
  },
];

export const seedTips = async (): Promise<void> => {
  const repo = new TipRepository();
  const existing = await repo.getAll();
  const now = new Date();

  if (existing.length > 0) {
    // Update existing tips
    for (const existingTip of existing) {
      const sampleTip = sampleTips.find((t) => t.id === existingTip.id);
      if (sampleTip) {
        await repo.update({
          ...sampleTip,
          updatedAt: now,
        });
      }
    }

    // Insert any missing tips
    for (const sampleTip of sampleTips) {
      const exists = existing.find((t) => t.id === sampleTip.id);
      if (!exists) {
        await repo.insert({
          ...sampleTip,
          updatedAt: now,
        });
      }
    }
    return;
  }

  // Insert sample tips if database is empty
  for (const tip of sampleTips) {
    await repo.insert({
      ...tip,
      updatedAt: now,
    });
  }
};

