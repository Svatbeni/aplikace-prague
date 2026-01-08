import { PlaceRepository } from '../repositories/PlaceRepository';
import { Place, PlaceCategory } from '../../types';

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
    return;
  }

  // Insert sample places if database is empty
  for (const place of samplePlaces) {
    await repo.insert({
      ...place,
      createdAt: now,
      updatedAt: now,
    });
  }

  console.log(`Seeded ${samplePlaces.length} places`);
};

