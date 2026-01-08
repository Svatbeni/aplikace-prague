import { PlaceRepository } from '../repositories/PlaceRepository';
import { TourRepository } from '../repositories/TourRepository';
import { Place, PlaceCategory, Tour } from '../../types';

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
    console.log(`Found ${existing.length} existing places, updating with local images...`);
    
    let updatedCount = 0;
    let insertedCount = 0;
    
    // Update ALL existing places with local images
    for (const existingPlace of existing) {
      const samplePlace = samplePlaces.find(p => p.id === existingPlace.id);
      if (samplePlace) {
        await repo.update({
          ...samplePlace,
          createdAt: existingPlace.createdAt,
          updatedAt: now,
        });
        updatedCount++;
        console.log(`Updated place ${samplePlace.id} (${samplePlace.name}) with image: ${samplePlace.images[0]}`);
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
        insertedCount++;
        console.log(`Inserted new place ${samplePlace.id} (${samplePlace.name}) with image: ${samplePlace.images[0]}`);
      }
    }
    
    console.log(`✓ Updated ${updatedCount} places, inserted ${insertedCount} new places with local images`);
  } else {
    // Insert sample places if database is empty
    for (const place of samplePlaces) {
      await repo.insert({
        ...place,
        createdAt: now,
        updatedAt: now,
      });
    }
    console.log(`Seeded ${samplePlaces.length} places`);
  }

  // Seed tours
  await seedTours();
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
    console.log(`Found ${existing.length} existing tours, updating...`);

    let updatedCount = 0;
    let insertedCount = 0;

    // Update existing tours
    for (const existingTour of existing) {
      const sampleTour = sampleTours.find((t) => t.id === existingTour.id);
      if (sampleTour) {
        await repo.update({
          ...sampleTour,
          createdAt: existingTour.createdAt,
          updatedAt: now,
        });
        updatedCount++;
        console.log(`Updated tour ${sampleTour.id} (${sampleTour.title})`);
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
        insertedCount++;
        console.log(`Inserted new tour ${sampleTour.id} (${sampleTour.title})`);
      }
    }

    console.log(`✓ Updated ${updatedCount} tours, inserted ${insertedCount} new tours`);
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

  console.log(`Seeded ${sampleTours.length} tours`);
};

