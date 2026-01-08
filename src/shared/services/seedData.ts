import { PlaceRepository } from '../repositories/PlaceRepository';
import { TourRepository } from '../repositories/TourRepository';
import { HotelRepository } from '../repositories/HotelRepository';
import { TipRepository } from '../repositories/TipRepository';
import { ItineraryRepository } from '../repositories/ItineraryRepository';
import { Place, PlaceCategory, Tour, Hotel, PracticalTip, TipCategory, Itinerary, ItineraryType, ItineraryTheme, TransportMode, Difficulty } from '../../types';

const samplePlaces: Omit<Place, 'createdAt' | 'updatedAt'>[] = [
  // Essential Things to Do for First-Timers
  {
    id: '1',
    name: 'Prague Castle',
    shortDescription: 'Largest ancient castle complex in the world',
    description:
      'Prague Castle is a castle complex in Prague, built in the 9th century. It is the official office of the President of the Czech Republic and one of the most important cultural institutions in the Czech Republic. Within its expansive complex, you\'ll find gems like St. Vitus Cathedral, the Old Royal Palace, St. George\'s Basilica, and the adorable Golden Lane.',
    practicalTips:
      'Go early to avoid the crowds and have a more serene castle experience. Buy tickets online to skip the lines. Allow 2-3 hours for a complete visit. Free entry to the castle grounds, but tickets required for buildings. Don\'t miss the Changing of the Guard ceremony.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0904,
    longitude: 14.4004,
    images: ['place-1.jpg'],
    address: 'Pražský hrad, 119 08 Praha 1',
    estimatedVisitDuration: 180,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '2',
    name: 'St. Vitus Cathedral',
    shortDescription: 'Gothic cathedral with stunning stained-glass windows',
    description:
      'St. Vitus Cathedral is a Gothic cathedral located within Prague Castle. As you step inside, you\'ll be greeted by intricate stained-glass windows, astonishing sculptures, and soaring Gothic spires. This isn\'t just a place of worship; it\'s the final resting place for many Czech kings and a showpiece of Czech history.',
    practicalTips:
      'Entrance to some parts of the cathedral is free, then there is a general circuit that is included in the Prague Castle Ticket. If you want access to the Great South Tower, you\'ll need a special ticket.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0909,
    longitude: 14.4005,
    images: ['place-2.jpg'],
    address: 'Pražský hrad, 119 08 Praha 1',
    estimatedVisitDuration: 45,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '3',
    name: 'Petřín Hill and Observation Tower',
    shortDescription: 'Park with observation tower offering panoramic views',
    description:
      'Petřín is a hill in the center of Prague. Often referred to as Prague\'s "mini-Eiffel Tower," this iron structure was built as part of the Jubilee Exhibition in 1891. Standing at a height of 58.70 meters, climb its 299 steps for a panoramic view that\'s nothing short of breathtaking. Beyond the tower, you\'ll find a captivating Mirror Maze, beautifully landscaped gardens, and park areas with panoramic views.',
    practicalTips:
      'Take the funicular railway for a unique experience (part of public transportation), or walk up the hill for free. Best visited on a clear day for views. Buy the combined ticket for both the Tower and Mirror Maze to save money.',
    category: PlaceCategory.VIEWPOINTS,
    latitude: 50.0833,
    longitude: 14.3958,
    images: ['place-3.jpg'],
    address: 'Petřínské sady, 118 00 Praha 1',
    estimatedVisitDuration: 90,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '4',
    name: 'St. Nicholas Church',
    shortDescription: 'Baroque church with extraordinary interior and dome',
    description:
      'St. Nicholas Church in Lesser Town is famed for its extraordinary interior, including a sky-high dome that rises 70 meters and spans 20 meters in diameter. The frescoes that adorn the church are equally captivating, as are the intricately decorated altar, pulpit, and organ.',
    practicalTips:
      'Guided tours usually cost around 200 CZK, though you can enter for less without a guide. The church regularly hosts beautiful concerts worth experiencing.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0880,
    longitude: 14.4030,
    images: ['place-4.jpg'],
    address: 'Malostranské náměstí, 118 00 Praha 1',
    estimatedVisitDuration: 30,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '5',
    name: 'John Lennon Wall',
    shortDescription: 'Colorful wall with graffiti and peace messages',
    description:
      'The John Lennon Wall is a wall in Prague filled with John Lennon-inspired graffiti and pieces of lyrics from Beatles songs. It started as a form of protest against the Communist regime and has evolved into a dynamic canvas that invites contributions from locals and tourists alike. It represents a symbol of global ideals such as love and peace.',
    practicalTips:
      'Always changing with new graffiti. Free to visit. Best photographed in natural light. Located near Charles Bridge.',
    category: PlaceCategory.HIDDEN_GEMS,
    latitude: 50.0857,
    longitude: 14.4075,
    images: ['place-5.jpg'],
    address: 'Velkopřevorské náměstí, 100 00 Praha 1',
    estimatedVisitDuration: 15,
    priceRange: 'free',
    isPremium: false,
  },
  {
    id: '6',
    name: 'Charles Bridge',
    shortDescription: 'Historic stone bridge spanning the Vltava River',
    description:
      'Charles Bridge is a historic bridge that crosses the Vltava river in Prague. Construction started in 1357 under the auspices of King Charles IV and finished in the early 15th century. This 14th-century stone bridge serves as a living gallery of baroque sculptures and a vantage point offering unparalleled views of Prague. Whether it\'s the silhouette of Prague Castle in the distance or the musicians and artists that line the bridge, every element tells a story.',
    practicalTips:
      'Visit early in the morning (before 8 AM) or late in the evening to avoid crowds. Free to visit. Best views are from both sides of the river. Find the statue of St. John of Nepomuk and rub the bronze plaque to bring yourself good luck and ensure that you will return to Prague.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0865,
    longitude: 14.4110,
    images: ['place-6.jpg'],
    address: 'Karlův most, 110 00 Praha 1',
    estimatedVisitDuration: 30,
    priceRange: 'free',
    isPremium: false,
  },
  {
    id: '7',
    name: 'Old Town Square',
    shortDescription: 'Historic square with the Astronomical Clock',
    description:
      'Old Town Square is a historic square in the Old Town quarter of Prague. This is the city\'s historical and cultural epicenter. Here, the past and present coalesce in an arresting display of architectural styles, from Gothic to Baroque and Renaissance. Whether it\'s the imposing Church of Our Lady before Týn, the grandeur of St. Nicholas Church in Old Town, the famous Astronomical Clock, or the intricate façades that surround the square, each building adds a layer to Prague\'s rich historical tapestry.',
    practicalTips:
      'Visit the Astronomical Clock on the hour to see the "Walk of the Apostles". The square is always crowded but most beautiful during Christmas markets.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0875,
    longitude: 14.4214,
    images: ['place-7.jpg'],
    address: 'Staroměstské nám., 110 00 Praha 1',
    estimatedVisitDuration: 60,
    priceRange: 'free',
    isPremium: false,
  },
  // Additional Essential Places
  {
    id: '8',
    name: 'Astronomical Clock',
    shortDescription: 'Medieval astronomical clock with hourly show',
    description:
      'The Prague Astronomical Clock is a medieval astronomical clock attached to the Old Town Hall. The clock was first installed in 1410, making it the third-oldest astronomical clock in the world and the oldest clock still operating.',
    practicalTips:
      'Watch the clock on the hour to see the "Walk of the Apostles". You can climb the tower for panoramic views. Best to visit early morning to avoid crowds.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0870,
    longitude: 14.4207,
    images: ['place-8.jpg'],
    address: 'Staroměstské náměstí 1, 110 00 Praha 1',
    estimatedVisitDuration: 30,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '9',
    name: 'Wenceslas Square',
    shortDescription: 'Historic square and commercial hub',
    description:
      'Wenceslas Square is one of the main city squares and the center of the business and cultural communities in the New Town of Prague. The square is named after Saint Wenceslas, the patron saint of Bohemia.',
    practicalTips:
      'Great for shopping and dining. Visit the National Museum at the top of the square. The square is always bustling with activity.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0814,
    longitude: 14.4286,
    images: ['place-1.jpg'],
    address: 'Václavské nám., 110 00 Praha 1',
    estimatedVisitDuration: 45,
    priceRange: 'free',
    isPremium: false,
  },
  {
    id: '10',
    name: 'Jewish Quarter (Josefov)',
    shortDescription: 'Historic Jewish quarter with synagogues and cemetery',
    description:
      'Josefov is a town quarter and the smallest cadastral area of Prague. It was the Jewish ghetto of the town. Today it is part of the Old Town and is known for its well-preserved synagogues, including the Old-New Synagogue, and the Jewish Cemetery.',
    practicalTips:
      'Purchase a combined ticket for all synagogues and the cemetery. Allow 2-3 hours for a complete visit. The Old-New Synagogue is the oldest active synagogue in Europe.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0900,
    longitude: 14.4180,
    images: ['place-2.jpg'],
    address: 'Josefov, 110 00 Praha 1',
    estimatedVisitDuration: 120,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '11',
    name: 'Dancing House',
    shortDescription: 'Iconic modern building with unique architecture',
    description:
      'The Dancing House is a building designed by Croatian-Czech architect Vlado Milunić in cooperation with Canadian-American architect Frank Gehry. The building stands out among the Baroque, Gothic and Art Nouveau buildings for which Prague is famous.',
    practicalTips:
      'Free to view from outside. There\'s a restaurant on the top floor with great views. Best photographed from across the river.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0755,
    longitude: 14.4144,
    images: ['place-3.jpg'],
    address: 'Jiráskovo nám. 1981/6, 120 00 Praha 2',
    estimatedVisitDuration: 20,
    priceRange: 'free',
    isPremium: false,
  },
  {
    id: '12',
    name: 'Vyšehrad',
    shortDescription: 'Historic fort with cemetery and beautiful views',
    description:
      'Vyšehrad is a historic fort located in Prague. It was probably built in the 10th century on a hill over the Vltava River. The fort contains the Basilica of St. Peter and St. Paul, as well as the Vyšehrad cemetery where many famous Czech personalities are buried.',
    practicalTips:
      'Less crowded than Prague Castle. Free entry to most areas. Great for sunset views. Cemetery contains many famous Czech personalities.',
    category: PlaceCategory.HIDDEN_GEMS,
    latitude: 50.0644,
    longitude: 14.4189,
    images: ['place-4.jpg'],
    address: 'V Pevnosti 159/5b, 128 00 Praha 2',
    estimatedVisitDuration: 90,
    priceRange: 'free',
    isPremium: false,
  },
  {
    id: '13',
    name: 'Stromovka Park',
    shortDescription: 'Large park perfect for walking and relaxation',
    description:
      'Stromovka is the largest park in Prague, covering over 95 hectares. It was originally a royal game reserve and is now a popular recreational area with ponds, walking paths, and sports facilities.',
    practicalTips:
      'Perfect for a peaceful escape from the city. Great for families with children. Free entry. Bring a picnic.',
    category: PlaceCategory.NATURE,
    latitude: 50.1083,
    longitude: 14.4317,
    images: ['place-5.jpg'],
    address: 'Královská obora, 170 00 Praha 7',
    estimatedVisitDuration: 60,
    priceRange: 'free',
    isPremium: false,
  },
  {
    id: '14',
    name: 'Letná Park',
    shortDescription: 'Park with beer garden and city views',
    description:
      'Letná Park is a large park on Letná hill, built on a plateau above steep embankments along the Vltava River. It offers stunning views of the city and is home to a popular beer garden.',
    practicalTips:
      'Great for sunset views. Visit the beer garden for a drink with a view. Free entry. Popular with locals.',
    category: PlaceCategory.VIEWPOINTS,
    latitude: 50.0950,
    longitude: 14.4200,
    images: ['place-6.jpg'],
    address: 'Letenské sady, 170 00 Praha 7',
    estimatedVisitDuration: 60,
    priceRange: 'free',
    isPremium: false,
  },
  {
    id: '15',
    name: 'Riegrovy Sady',
    shortDescription: 'Popular park with beer garden and city views',
    description:
      'Riegrovy Sady is a popular park in Vinohrady district, known for its beer garden and excellent views of Prague Castle. It\'s a favorite spot for locals to relax and socialize.',
    practicalTips:
      'Visit the beer garden for affordable drinks and great atmosphere. Best views at sunset. Free entry. Very popular with locals.',
    category: PlaceCategory.VIEWPOINTS,
    latitude: 50.0750,
    longitude: 14.4400,
    images: ['place-7.jpg'],
    address: 'Riegrovy sady, 120 00 Praha 2',
    estimatedVisitDuration: 60,
    priceRange: 'free',
    isPremium: false,
  },
  {
    id: '16',
    name: 'National Museum',
    shortDescription: 'Largest museum in the Czech Republic',
    description:
      'The National Museum is a Czech museum institution intended to systematically establish, prepare and publicly exhibit natural scientific and historical collections. The main building is located at the top of Wenceslas Square.',
    practicalTips:
      'Check opening hours before visiting. The building itself is worth seeing. Great views from the top steps.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0796,
    longitude: 14.4306,
    images: ['place-8.jpg'],
    address: 'Václavské nám. 68, 110 00 Praha 1',
    estimatedVisitDuration: 90,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '17',
    name: 'Municipal House',
    shortDescription: 'Art Nouveau building with concert hall',
    description:
      'The Municipal House is a major civic landmark and concert hall in Prague. It is widely considered the finest Art Nouveau building in the city.',
    practicalTips:
      'Take a guided tour to see the beautiful interiors. The building houses a concert hall and restaurants. Free to view from outside.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0872,
    longitude: 14.4280,
    images: ['place-1.jpg'],
    address: 'nám. Republiky 5, 110 00 Praha 1',
    estimatedVisitDuration: 45,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '18',
    name: 'Kampa Island',
    shortDescription: 'Quiet island with park and art installations',
    description:
      'Kampa is an island in the Vltava river in central Prague. It is separated from the Lesser Town by the Čertovka, a narrow artificial channel. The island offers a peaceful escape with parks, art installations, and great views.',
    practicalTips:
      'Less crowded than other areas. Great for a peaceful walk. Look for the giant crawling babies sculpture by David Černý.',
    category: PlaceCategory.HIDDEN_GEMS,
    latitude: 50.0836,
    longitude: 14.4083,
    images: ['place-2.jpg'],
    address: 'Kampa, 118 00 Praha 1',
    estimatedVisitDuration: 45,
    priceRange: 'free',
    isPremium: false,
  },
  {
    id: '19',
    name: 'Lennon Wall',
    shortDescription: 'Colorful wall with graffiti and peace messages',
    description:
      'The John Lennon Wall is a wall in Prague filled with John Lennon-inspired graffiti and pieces of lyrics from Beatles songs. It started as a form of protest against the Communist regime and has evolved into a dynamic canvas.',
    practicalTips:
      'Always changing with new graffiti. Free to visit. Best photographed in natural light. Located near Charles Bridge.',
    category: PlaceCategory.HIDDEN_GEMS,
    latitude: 50.0857,
    longitude: 14.4075,
    images: ['place-3.jpg'],
    address: 'Velkopřevorské náměstí, 100 00 Praha 1',
    estimatedVisitDuration: 15,
    priceRange: 'free',
    isPremium: false,
  },
  {
    id: '20',
    name: 'Golden Lane',
    shortDescription: 'Historic street with colorful houses',
    description:
      'Golden Lane is a street situated in Prague Castle. Originally built in the 16th century, the tiny houses were built for the castle guards. The street is now filled with small shops and exhibitions.',
    practicalTips:
      'Included in Prague Castle ticket. The houses are very small but charming. Franz Kafka lived at number 22.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0917,
    longitude: 14.4000,
    images: ['place-4.jpg'],
    address: 'Zlatá ulička, 119 00 Praha 1',
    estimatedVisitDuration: 30,
    priceRange: 'medium',
    isPremium: false,
  },
  // Food & Drink Places
  {
    id: '21',
    name: 'U Fleků',
    shortDescription: 'Historic brewery restaurant serving traditional Czech food',
    description:
      'U Fleků is a historic brewery in Prague, established in 1499. It is the oldest brewery in Prague still in operation. The restaurant serves traditional Czech cuisine and the famous dark beer.',
    practicalTips:
      'Reservations recommended. Try the dark beer (Tmavý ležák). Traditional Czech dishes are hearty portions. Tourist-friendly but authentic.',
    category: PlaceCategory.FOOD,
    latitude: 50.0751,
    longitude: 14.4189,
    images: ['place-5.jpg'],
    address: 'Křemencova 11, 110 00 Praha 1',
    estimatedVisitDuration: 90,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '22',
    name: 'Lokál',
    shortDescription: 'Popular restaurant chain serving traditional Czech food',
    description:
      'Lokál is a popular chain of restaurants in Prague serving traditional Czech cuisine in a modern setting. Known for excellent beer and authentic Czech dishes.',
    practicalTips:
      'Very popular with locals. Reservations recommended. Great value for money. Try the svíčková (beef with cream sauce).',
    category: PlaceCategory.FOOD,
    latitude: 50.0850,
    longitude: 14.4200,
    images: ['place-6.jpg'],
    address: 'Dlouhá 33, 110 00 Praha 1',
    estimatedVisitDuration: 90,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '23',
    name: 'Café Louvre',
    shortDescription: 'Historic café with elegant atmosphere',
    description:
      'Café Louvre is a historic café in Prague, established in 1902. It was frequented by famous figures including Franz Kafka and Albert Einstein. The café maintains its elegant atmosphere and serves excellent coffee and pastries.',
    practicalTips:
      'Great for breakfast or afternoon coffee. Try the traditional Czech pastries. Elegant atmosphere.',
    category: PlaceCategory.FOOD,
    latitude: 50.0810,
    longitude: 14.4220,
    images: ['place-7.jpg'],
    address: 'Národní 22, 110 00 Praha 1',
    estimatedVisitDuration: 60,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '24',
    name: 'U Modré Kachničky',
    shortDescription: 'Restaurant specializing in duck dishes',
    description:
      'U Modré Kachničky is a restaurant specializing in duck dishes, a Czech specialty. The restaurant offers traditional Czech cuisine in a cozy atmosphere.',
    practicalTips:
      'Reservations recommended. Try the duck with red cabbage and dumplings. Popular with both locals and tourists.',
    category: PlaceCategory.FOOD,
    latitude: 50.0880,
    longitude: 14.4150,
    images: ['place-8.jpg'],
    address: 'Nebovidská 6, 118 00 Praha 1',
    estimatedVisitDuration: 90,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '25',
    name: 'Beer Museum',
    shortDescription: 'Museum dedicated to Czech beer culture',
    description:
      'The Beer Museum in Prague showcases the history and culture of Czech beer. Visitors can learn about the brewing process and sample different types of Czech beer.',
    practicalTips:
      'Includes beer tastings. Great for beer enthusiasts. Learn about Czech beer culture and history.',
    category: PlaceCategory.FOOD,
    latitude: 50.0870,
    longitude: 14.4210,
    images: ['place-1.jpg'],
    address: 'Husova 7, 110 00 Praha 1',
    estimatedVisitDuration: 60,
    priceRange: 'medium',
    isPremium: false,
  },
  // More Hidden Gems
  {
    id: '26',
    name: 'Vrtba Garden',
    shortDescription: 'Baroque garden with beautiful views',
    description:
      'Vrtba Garden is a beautiful Baroque garden in Lesser Town, hidden away from the main tourist paths. It offers stunning views of Prague and is a peaceful oasis in the city.',
    practicalTips:
      'Lesser-known gem. Small entrance fee. Great for photography. Peaceful and less crowded.',
    category: PlaceCategory.HIDDEN_GEMS,
    latitude: 50.0860,
    longitude: 14.4000,
    images: ['place-2.jpg'],
    address: 'Karmelitská 25, 118 00 Praha 1',
    estimatedVisitDuration: 30,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '27',
    name: 'Žižkov Television Tower',
    shortDescription: 'Unique tower with observation deck',
    description:
      'The Žižkov Television Tower is a unique tower in the Žižkov district, known for the giant crawling babies sculptures by David Černý. It offers panoramic views of Prague from its observation deck.',
    practicalTips:
      'Unique architecture. Great views from the observation deck. The crawling babies are a must-see.',
    category: PlaceCategory.VIEWPOINTS,
    latitude: 50.0810,
    longitude: 14.4510,
    images: ['place-3.jpg'],
    address: 'Mahlerovy sady 1, 130 00 Praha 3',
    estimatedVisitDuration: 45,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '28',
    name: 'Prague Metronome',
    shortDescription: 'Giant metronome with city views',
    description:
      'The Prague Metronome is a large functional metronome located in Letná Park. It stands on the site where a massive statue of Joseph Stalin once stood. The area offers excellent views of the city.',
    practicalTips:
      'Free to visit. Great views of Prague. Popular spot for locals. Best visited at sunset.',
    category: PlaceCategory.VIEWPOINTS,
    latitude: 50.0950,
    longitude: 14.4200,
    images: ['place-4.jpg'],
    address: 'Letenské sady, 170 00 Praha 7',
    estimatedVisitDuration: 30,
    priceRange: 'free',
    isPremium: false,
  },
  {
    id: '29',
    name: 'David Černý Sculptures',
    shortDescription: 'Various provocative sculptures around the city',
    description:
      'David Černý is a famous Czech sculptor known for his provocative and humorous sculptures scattered throughout Prague. These include the crawling babies on Žižkov Tower, the hanging man, and many others.',
    practicalTips:
      'Free to view. Look for them while exploring the city. Each sculpture has its own story.',
    category: PlaceCategory.HIDDEN_GEMS,
    latitude: 50.0850,
    longitude: 14.4200,
    images: ['place-5.jpg'],
    address: 'Various locations in Prague',
    estimatedVisitDuration: 60,
    priceRange: 'free',
    isPremium: false,
  },
  {
    id: '30',
    name: 'Prague Zoo',
    shortDescription: 'One of the best zoos in Europe',
    description:
      'Prague Zoo is one of the best zoos in Europe, known for its successful breeding programs and naturalistic enclosures. It\'s home to over 5,000 animals representing more than 600 species.',
    practicalTips:
      'Great for families. Allow at least half a day. Check feeding times for special experiences. Take the funicular from the city.',
    category: PlaceCategory.NATURE,
    latitude: 50.1169,
    longitude: 14.4069,
    images: ['place-6.jpg'],
    address: 'U Trojského zámku 3/120, 171 00 Praha 7',
    estimatedVisitDuration: 240,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '31',
    name: 'Troja Castle',
    shortDescription: 'Baroque castle with beautiful gardens',
    description:
      'Troja Castle is a Baroque castle located in the Troja district of Prague. The castle is surrounded by beautiful French-style gardens and houses a collection of 19th-century Czech art.',
    practicalTips:
      'Beautiful gardens. Less crowded than Prague Castle. Combine with a visit to the nearby zoo.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.1150,
    longitude: 14.4100,
    images: ['place-7.jpg'],
    address: 'U Trojského zámku 1, 171 00 Praha 7',
    estimatedVisitDuration: 60,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '32',
    name: 'Prague Botanical Garden',
    shortDescription: 'Beautiful botanical gardens',
    description:
      'The Prague Botanical Garden features a wide variety of plants from around the world, including a beautiful Fata Morgana greenhouse with tropical plants.',
    practicalTips:
      'Great for nature lovers. The Fata Morgana greenhouse is a highlight. Combine with Troja Castle visit.',
    category: PlaceCategory.NATURE,
    latitude: 50.1160,
    longitude: 14.4080,
    images: ['place-8.jpg'],
    address: 'Nádvorní 134, 171 00 Praha 7',
    estimatedVisitDuration: 90,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '33',
    name: 'Church of Our Lady before Týn',
    shortDescription: 'Gothic church with distinctive twin spires',
    description:
      'The Church of Our Lady before Týn is a Gothic church in Old Town Square, known for its distinctive twin spires that dominate the square\'s skyline. The church dates back to the 14th century.',
    practicalTips:
      'Free to enter. Beautiful interior. The spires are a Prague landmark. Visit during off-peak hours.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0880,
    longitude: 14.4220,
    images: ['place-1.jpg'],
    address: 'Staroměstské nám., 110 00 Praha 1',
    estimatedVisitDuration: 30,
    priceRange: 'free',
    isPremium: false,
  },
  {
    id: '34',
    name: 'Powder Tower',
    shortDescription: 'Gothic tower with city views',
    description:
      'The Powder Tower is a Gothic tower in Prague, originally built as one of the city gates. It was used to store gunpowder in the 17th century, hence its name. Today, visitors can climb to the top for panoramic views.',
    practicalTips:
      'Climb to the top for great views. Located near Municipal House. Small entrance fee.',
    category: PlaceCategory.VIEWPOINTS,
    latitude: 50.0875,
    longitude: 14.4278,
    images: ['place-2.jpg'],
    address: 'nám. Republiky 5, 110 00 Praha 1',
    estimatedVisitDuration: 30,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '35',
    name: 'Old Town Hall',
    shortDescription: 'Historic town hall with tower',
    description:
      'The Old Town Hall is a complex of buildings in Old Town Square, best known for the Astronomical Clock. The tower offers excellent views of the square and surrounding area.',
    practicalTips:
      'Climb the tower for great views. The Astronomical Clock is on the side of the building. Best visited early morning.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0870,
    longitude: 14.4207,
    images: ['place-3.jpg'],
    address: 'Staroměstské náměstí 1, 110 00 Praha 1',
    estimatedVisitDuration: 45,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '36',
    name: 'Clementinum',
    shortDescription: 'Historic complex with beautiful library',
    description:
      'The Clementinum is a historic complex of buildings in Prague, housing the National Library. It features a beautiful Baroque library hall and an astronomical tower with views of the city.',
    practicalTips:
      'Guided tours available. The library hall is stunning. Climb the astronomical tower for views.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0865,
    longitude: 14.4160,
    images: ['place-4.jpg'],
    address: 'Mariánské nám. 5, 110 00 Praha 1',
    estimatedVisitDuration: 60,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '37',
    name: 'Strahov Monastery',
    shortDescription: 'Historic monastery with beautiful library',
    description:
      'Strahov Monastery is a Premonstratensian abbey founded in 1143. It houses a beautiful library with rare books and manuscripts, and offers great views of Prague.',
    practicalTips:
      'The library is a highlight. Great views from the monastery grounds. Less crowded than Prague Castle.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0860,
    longitude: 14.3890,
    images: ['place-5.jpg'],
    address: 'Strahovské nádvoří 1, 118 00 Praha 1',
    estimatedVisitDuration: 60,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '38',
    name: 'Prague Beer Gardens',
    shortDescription: 'Various beer gardens throughout the city',
    description:
      'Prague has numerous beer gardens where locals and visitors can enjoy Czech beer in a relaxed outdoor setting. Popular ones include Letná Beer Garden, Riegrovy Sady, and many others.',
    practicalTips:
      'Great for experiencing local culture. Affordable prices. Popular with locals. Best in summer months.',
    category: PlaceCategory.FOOD,
    latitude: 50.0850,
    longitude: 14.4200,
    images: ['place-6.jpg'],
    address: 'Various locations',
    estimatedVisitDuration: 90,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '39',
    name: 'Vinohrady District',
    shortDescription: 'Residential area with cafés and parks',
    description:
      'Vinohrady is a residential district of Prague known for its beautiful architecture, numerous cafés, parks, and relaxed atmosphere. It\'s a great place to experience local life away from tourist crowds.',
    practicalTips:
      'Great for cafés and restaurants. Less touristy. Beautiful architecture. Popular with expats.',
    category: PlaceCategory.HIDDEN_GEMS,
    latitude: 50.0750,
    longitude: 14.4400,
    images: ['place-7.jpg'],
    address: 'Vinohrady, 120 00 Praha 2',
    estimatedVisitDuration: 120,
    priceRange: 'free',
    isPremium: false,
  },
  {
    id: '40',
    name: 'Žižkov District',
    shortDescription: 'Vibrant district with nightlife and local culture',
    description:
      'Žižkov is a vibrant district of Prague known for its nightlife, local pubs, and authentic atmosphere. It\'s less touristy and offers a glimpse into local Prague life.',
    practicalTips:
      'Great for nightlife. Authentic local pubs. Less touristy. Home to the Žižkov Television Tower.',
    category: PlaceCategory.HIDDEN_GEMS,
    latitude: 50.0810,
    longitude: 14.4510,
    images: ['place-8.jpg'],
    address: 'Žižkov, 130 00 Praha 3',
    estimatedVisitDuration: 120,
    priceRange: 'free',
    isPremium: false,
  },
  // More places from the article - continuing to build comprehensive list
  {
    id: '41',
    name: 'Old-New Synagogue',
    shortDescription: 'Oldest active synagogue in Europe',
    description:
      'The Old-New Synagogue is Europe\'s oldest active synagogue. Completed in 1270, it is one of Prague\'s first Gothic buildings and a central part of the Jewish Quarter.',
    practicalTips:
      'Part of Jewish Quarter ticket. Men must cover their heads (kippahs provided). No photography inside. Very historic and significant.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0900,
    longitude: 14.4180,
    images: ['place-1.jpg'],
    address: 'Červená 2, 110 00 Praha 1',
    estimatedVisitDuration: 30,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '42',
    name: 'Jewish Cemetery',
    shortDescription: 'Historic Jewish cemetery with layered graves',
    description:
      'The Old Jewish Cemetery is one of the largest Jewish cemeteries in Europe and one of the most important Jewish historical monuments in Prague. Due to lack of space, graves were layered.',
    practicalTips:
      'Part of Jewish Quarter ticket. Very moving and historic. Allow time to reflect. Guided tours available.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0900,
    longitude: 14.4170,
    images: ['place-2.jpg'],
    address: 'Široká 3, 110 00 Praha 1',
    estimatedVisitDuration: 45,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '43',
    name: 'Pinkas Synagogue',
    shortDescription: 'Memorial to Holocaust victims',
    description:
      'The Pinkas Synagogue serves as a memorial to the 77,297 Czech Jewish victims of the Holocaust. The walls are inscribed with the names of all victims.',
    practicalTips:
      'Very moving memorial. Part of Jewish Quarter ticket. Allow time to read the names. Respectful atmosphere required.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0900,
    longitude: 14.4175,
    images: ['place-3.jpg'],
    address: 'Široká 3, 110 00 Praha 1',
    estimatedVisitDuration: 30,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '44',
    name: 'Spanish Synagogue',
    shortDescription: 'Beautiful Moorish-style synagogue',
    description:
      'The Spanish Synagogue is the newest synagogue in the Jewish Quarter, built in Moorish Revival style. It houses an exhibition on the history of Jews in Bohemia and Moravia.',
    practicalTips:
      'Beautiful interior. Part of Jewish Quarter ticket. Great architecture. Less crowded than Old-New Synagogue.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0900,
    longitude: 14.4190,
    images: ['place-4.jpg'],
    address: 'Vězeňská 1, 110 00 Praha 1',
    estimatedVisitDuration: 30,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '45',
    name: 'Franz Kafka Museum',
    shortDescription: 'Museum dedicated to the famous writer',
    description:
      'The Franz Kafka Museum is dedicated to the life and work of Franz Kafka, one of Prague\'s most famous literary figures. The museum features exhibits about his life and works.',
    practicalTips:
      'Great for literature fans. Audio guide recommended. Located near Charles Bridge. Allow 1-2 hours.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0860,
    longitude: 14.4100,
    images: ['place-5.jpg'],
    address: 'Cihelná 2b, 118 00 Praha 1',
    estimatedVisitDuration: 90,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '46',
    name: 'Mucha Museum',
    shortDescription: 'Museum dedicated to Art Nouveau artist Alphonse Mucha',
    description:
      'The Mucha Museum is dedicated to the life and work of Alphonse Mucha, a Czech Art Nouveau painter. The museum displays his famous posters, paintings, and decorative panels.',
    practicalTips:
      'Great for Art Nouveau fans. Beautiful artwork. Audio guide available. Allow 1 hour.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0850,
    longitude: 14.4250,
    images: ['place-6.jpg'],
    address: 'Kaunický palác, Panská 7, 110 00 Praha 1',
    estimatedVisitDuration: 60,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '47',
    name: 'National Gallery',
    shortDescription: 'Largest collection of art in the Czech Republic',
    description:
      'The National Gallery in Prague is the state-owned art gallery. It manages the largest collection of art in the Czech Republic, with works spanning from medieval to contemporary art.',
    practicalTips:
      'Multiple locations throughout the city. Check which exhibitions interest you. Great collection of Czech and European art.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0900,
    longitude: 14.4000,
    images: ['place-7.jpg'],
    address: 'Staroměstské nám. 12, 110 00 Praha 1',
    estimatedVisitDuration: 120,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '48',
    name: 'DOX Centre for Contemporary Art',
    shortDescription: 'Modern art gallery in Holešovice',
    description:
      'DOX is a centre for contemporary art, architecture and design located in the Holešovice district. It features cutting-edge exhibitions and installations.',
    practicalTips:
      'Great for modern art fans. Less touristy location. Interesting exhibitions. Check current program.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.1000,
    longitude: 14.4400,
    images: ['place-8.jpg'],
    address: 'Poupětova 1, 170 00 Praha 7',
    estimatedVisitDuration: 90,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '49',
    name: 'Prague National Theatre',
    shortDescription: 'Historic theatre with beautiful architecture',
    description:
      'The National Theatre is a historic theatre in Prague, known for its beautiful neo-Renaissance architecture. It is the alma mater of Czech opera and the national monument of Czech history and art.',
    practicalTips:
      'Book tickets in advance for performances. The building itself is beautiful. Guided tours available.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0810,
    longitude: 14.4140,
    images: ['place-1.jpg'],
    address: 'Národní 2, 110 00 Praha 1',
    estimatedVisitDuration: 60,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '50',
    name: 'Estates Theatre',
    shortDescription: 'Historic theatre where Mozart premiered Don Giovanni',
    description:
      'The Estates Theatre is a historic theatre in Prague where Mozart premiered his opera Don Giovanni in 1787. It is one of the most beautiful theatres in Europe.',
    practicalTips:
      'Book tickets for performances. Very historic venue. Beautiful interior. Mozart connection.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0860,
    longitude: 14.4250,
    images: ['place-2.jpg'],
    address: 'Ovocný trh 1, 110 00 Praha 1',
    estimatedVisitDuration: 60,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '51',
    name: 'Petřín Mirror Maze',
    shortDescription: 'Fun mirror maze on Petřín Hill',
    description:
      'The Petřín Mirror Maze is a fun attraction on Petřín Hill, featuring a hall of mirrors that creates amusing distortions. It was built for the 1891 Jubilee Exhibition.',
    practicalTips:
      'Fun for all ages. Buy combined ticket with Petřín Tower to save money. Great for photos.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0833,
    longitude: 14.3958,
    images: ['place-3.jpg'],
    address: 'Petřínské sady, 118 00 Praha 1',
    estimatedVisitDuration: 20,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '52',
    name: 'Prague Castle Gardens',
    shortDescription: 'Beautiful gardens around Prague Castle',
    description:
      'The Prague Castle Gardens are a series of beautiful gardens surrounding Prague Castle, offering peaceful walks and great views of the city.',
    practicalTips:
      'Free to enter. Less crowded than castle interiors. Great for a peaceful walk. Best in spring and summer.',
    category: PlaceCategory.NATURE,
    latitude: 50.0900,
    longitude: 14.4000,
    images: ['place-4.jpg'],
    address: 'Pražský hrad, 119 08 Praha 1',
    estimatedVisitDuration: 60,
    priceRange: 'free',
    isPremium: false,
  },
  {
    id: '53',
    name: 'Wallenstein Garden',
    shortDescription: 'Baroque garden in Lesser Town',
    description:
      'Wallenstein Garden is a beautiful Baroque garden in Lesser Town, featuring a large sala terrena, an artificial grotto, and peacocks. It\'s free to enter and offers a peaceful escape.',
    practicalTips:
      'Free to enter. Beautiful Baroque architecture. Peacocks roam freely. Peaceful and less crowded.',
    category: PlaceCategory.NATURE,
    latitude: 50.0900,
    longitude: 14.4050,
    images: ['place-5.jpg'],
    address: 'Valdštejnská 3, 118 00 Praha 1',
    estimatedVisitDuration: 30,
    priceRange: 'free',
    isPremium: false,
  },
  {
    id: '54',
    name: 'Franciscan Garden',
    shortDescription: 'Peaceful garden in the city center',
    description:
      'The Franciscan Garden is a peaceful garden in the city center, perfect for a quiet break from sightseeing. It features beautiful flower beds and benches.',
    practicalTips:
      'Free to enter. Very peaceful. Great for a break. Located near Wenceslas Square.',
    category: PlaceCategory.NATURE,
    latitude: 50.0810,
    longitude: 14.4250,
    images: ['place-6.jpg'],
    address: 'Jungmannovo nám., 110 00 Praha 1',
    estimatedVisitDuration: 20,
    priceRange: 'free',
    isPremium: false,
  },
  {
    id: '55',
    name: 'Havlíčkovy Sady',
    shortDescription: 'Park with vineyard and views',
    description:
      'Havlíčkovy Sady is a park in Vinohrady with a vineyard, offering great views of Prague. It\'s a popular spot for locals to relax.',
    practicalTips:
      'Free to enter. Great views. Vineyard adds charm. Popular with locals. Less touristy.',
    category: PlaceCategory.VIEWPOINTS,
    latitude: 50.0700,
    longitude: 14.4450,
    images: ['place-7.jpg'],
    address: 'Havlíčkovy sady, 120 00 Praha 2',
    estimatedVisitDuration: 45,
    priceRange: 'free',
    isPremium: false,
  },
  {
    id: '56',
    name: 'Divoká Šárka',
    shortDescription: 'Natural reserve with hiking trails',
    description:
      'Divoká Šárka is a natural reserve in Prague with hiking trails, a swimming pool, and beautiful natural scenery. It\'s a great escape from the city.',
    practicalTips:
      'Free to enter. Great for hiking. Natural swimming pool in summer. Less touristy. Take public transport.',
    category: PlaceCategory.NATURE,
    latitude: 50.1100,
    longitude: 14.3300,
    images: ['place-8.jpg'],
    address: 'Divoká Šárka, 162 00 Praha 6',
    estimatedVisitDuration: 120,
    priceRange: 'free',
    isPremium: false,
  },
  {
    id: '57',
    name: 'Prokopské údolí',
    shortDescription: 'Natural valley with hiking trails',
    description:
      'Prokopské údolí is a natural valley in Prague with hiking trails and beautiful natural scenery. It\'s a great place for outdoor activities.',
    practicalTips:
      'Free to enter. Great for hiking and nature walks. Less touristy. Natural beauty.',
    category: PlaceCategory.NATURE,
    latitude: 50.0500,
    longitude: 14.3800,
    images: ['place-1.jpg'],
    address: 'Prokopské údolí, 150 00 Praha 5',
    estimatedVisitDuration: 120,
    priceRange: 'free',
    isPremium: false,
  },
  {
    id: '58',
    name: 'Vltava River Cruises',
    shortDescription: 'Boat cruises along the Vltava River',
    description:
      'Vltava River cruises offer a unique perspective of Prague, passing by major landmarks including Charles Bridge, Prague Castle, and the National Theatre.',
    practicalTips:
      'Various cruise options available. Book in advance during peak season. Great for photography. Different durations available.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0865,
    longitude: 14.4110,
    images: ['place-2.jpg'],
    address: 'Various departure points along Vltava',
    estimatedVisitDuration: 60,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '59',
    name: 'Prague Markets',
    shortDescription: 'Various markets throughout the city',
    description:
      'Prague has several markets including farmers markets, Christmas markets, and flea markets. These offer a great way to experience local culture and find unique items.',
    practicalTips:
      'Christmas markets are especially popular. Farmers markets offer local produce. Check schedules. Great for souvenirs.',
    category: PlaceCategory.FOOD,
    latitude: 50.0875,
    longitude: 14.4214,
    images: ['place-3.jpg'],
    address: 'Various locations',
    estimatedVisitDuration: 60,
    priceRange: 'free',
    isPremium: false,
  },
  {
    id: '60',
    name: 'Havelské Tržiště',
    shortDescription: 'Historic market in Old Town',
    description:
      'Havelské Tržiště is a historic market in Old Town, operating since the 13th century. It offers fresh produce, souvenirs, and local goods.',
    practicalTips:
      'Open daily. Great for souvenirs. Fresh produce available. Located in Old Town. Bargaining possible.',
    category: PlaceCategory.FOOD,
    latitude: 50.0860,
    longitude: 14.4220,
    images: ['place-4.jpg'],
    address: 'Havelská, 110 00 Praha 1',
    estimatedVisitDuration: 30,
    priceRange: 'free',
    isPremium: false,
  },
  // Continuing with more places
  {
    id: '61',
    name: 'Naplavka',
    shortDescription: 'Riverside area with markets and events',
    description:
      'Naplavka is a popular riverside area along the Vltava River, known for its farmers markets, food stalls, and cultural events. It\'s a favorite spot for locals to relax.',
    practicalTips:
      'Farmers market on Saturdays. Great for food and drinks. Popular with locals. Beautiful river views.',
    category: PlaceCategory.FOOD,
    latitude: 50.0750,
    longitude: 14.4150,
    images: ['place-5.jpg'],
    address: 'Rašínovo nábř., 120 00 Praha 2',
    estimatedVisitDuration: 90,
    priceRange: 'free',
    isPremium: false,
  },
  {
    id: '62',
    name: 'Prague Food Tours',
    shortDescription: 'Guided tours to sample Czech cuisine',
    description:
      'Food tours in Prague offer visitors the chance to sample traditional Czech cuisine at local restaurants, pubs, and markets with knowledgeable guides.',
    practicalTips:
      'Book in advance. Great way to try local food. Various tour options available. Includes multiple food stops.',
    category: PlaceCategory.FOOD,
    latitude: 50.0850,
    longitude: 14.4200,
    images: ['place-6.jpg'],
    address: 'Various starting points',
    estimatedVisitDuration: 180,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '63',
    name: 'Beer Tasting Experiences',
    shortDescription: 'Various beer tasting tours and experiences',
    description:
      'Prague offers numerous beer tasting experiences where visitors can sample different types of Czech beer and learn about the brewing process and Czech beer culture.',
    practicalTips:
      'Various options available. Great for beer enthusiasts. Learn about Czech beer culture. Multiple tastings included.',
    category: PlaceCategory.FOOD,
    latitude: 50.0850,
    longitude: 14.4200,
    images: ['place-7.jpg'],
    address: 'Various locations',
    estimatedVisitDuration: 120,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '64',
    name: 'Traditional Czech Pubs',
    shortDescription: 'Authentic Czech pubs throughout the city',
    description:
      'Prague is famous for its traditional Czech pubs (hospoda) where locals gather to drink beer and socialize. These offer an authentic Czech experience.',
    practicalTips:
      'Great for experiencing local culture. Affordable beer. Try traditional Czech dishes. Popular with locals.',
    category: PlaceCategory.FOOD,
    latitude: 50.0850,
    longitude: 14.4200,
    images: ['place-8.jpg'],
    address: 'Various locations',
    estimatedVisitDuration: 90,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '65',
    name: 'Prague Ghost Tours',
    shortDescription: 'Evening walking tours of haunted locations',
    description:
      'Ghost tours in Prague take visitors through the city\'s dark history, visiting haunted locations and hearing spooky stories about ghosts, alchemists, and legends.',
    practicalTips:
      'Evening tours. Great for those who enjoy spooky stories. Atmospheric experience. Various tour options.',
    category: PlaceCategory.HIDDEN_GEMS,
    latitude: 50.0875,
    longitude: 14.4214,
    images: ['place-1.jpg'],
    address: 'Various starting points',
    estimatedVisitDuration: 90,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '66',
    name: 'Alchemist Tours',
    shortDescription: 'Tours exploring Prague\'s alchemical history',
    description:
      'Alchemist tours explore Prague\'s connection to alchemy, visiting locations associated with alchemists and the search for the philosopher\'s stone.',
    practicalTips:
      'Great for history enthusiasts. Learn about Prague\'s alchemical past. Various tour options. Evening tours available.',
    category: PlaceCategory.HIDDEN_GEMS,
    latitude: 50.0875,
    longitude: 14.4214,
    images: ['place-2.jpg'],
    address: 'Various starting points',
    estimatedVisitDuration: 90,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '67',
    name: 'Prague Segway Tours',
    shortDescription: 'Fun Segway tours around the city',
    description:
      'Segway tours offer a fun and unique way to explore Prague, covering more ground than walking tours while having an enjoyable experience.',
    practicalTips:
      'Fun for all ages. Training included. Covers major attractions. Great for those who want to see more in less time.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0850,
    longitude: 14.4200,
    images: ['place-3.jpg'],
    address: 'Various starting points',
    estimatedVisitDuration: 120,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '68',
    name: 'Prague Bike Tours',
    shortDescription: 'Bicycle tours exploring the city',
    description:
      'Bike tours in Prague offer an active way to explore the city, covering both major attractions and lesser-known areas with knowledgeable guides.',
    practicalTips:
      'Great for active travelers. Covers more ground than walking. Various tour options. Suitable for most fitness levels.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0850,
    longitude: 14.4200,
    images: ['place-4.jpg'],
    address: 'Various starting points',
    estimatedVisitDuration: 180,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '69',
    name: 'Prague Free Walking Tours',
    shortDescription: 'Free guided walking tours (tip-based)',
    description:
      'Free walking tours in Prague are tip-based tours that offer visitors an introduction to the city\'s history and major attractions with knowledgeable local guides.',
    practicalTips:
      'Tip-based (pay what you think it\'s worth). Great introduction to the city. Various tour options. Book in advance during peak season.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0875,
    longitude: 14.4214,
    images: ['place-5.jpg'],
    address: 'Various starting points',
    estimatedVisitDuration: 120,
    priceRange: 'free',
    isPremium: false,
  },
  {
    id: '70',
    name: 'Prague Castle Night Tours',
    shortDescription: 'Evening tours of Prague Castle',
    description:
      'Night tours of Prague Castle offer a different perspective, visiting the castle complex after dark when it\'s beautifully illuminated and less crowded.',
    practicalTips:
      'Different atmosphere at night. Less crowded. Beautiful lighting. Various tour options available.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0904,
    longitude: 14.4004,
    images: ['place-6.jpg'],
    address: 'Pražský hrad, 119 08 Praha 1',
    estimatedVisitDuration: 120,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '71',
    name: 'Prague Underground Tours',
    shortDescription: 'Tours of underground passages and cellars',
    description:
      'Underground tours explore Prague\'s hidden underground passages, cellars, and historical spaces beneath the city streets.',
    practicalTips:
      'Unique perspective on Prague. Learn about underground history. Various tour options. Not suitable for claustrophobic.',
    category: PlaceCategory.HIDDEN_GEMS,
    latitude: 50.0875,
    longitude: 14.4214,
    images: ['place-7.jpg'],
    address: 'Various starting points',
    estimatedVisitDuration: 90,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '72',
    name: 'Prague Communist Tours',
    shortDescription: 'Tours exploring Prague\'s communist history',
    description:
      'Communist tours explore Prague\'s history under communist rule, visiting significant locations and learning about life during the communist era.',
    practicalTips:
      'Great for history enthusiasts. Learn about recent Czech history. Various tour options. Educational experience.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0850,
    longitude: 14.4200,
    images: ['place-8.jpg'],
    address: 'Various starting points',
    estimatedVisitDuration: 180,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '73',
    name: 'Prague Architecture Tours',
    shortDescription: 'Tours focusing on Prague\'s architecture',
    description:
      'Architecture tours explore Prague\'s diverse architectural styles, from Gothic and Baroque to Art Nouveau and modern architecture.',
    practicalTips:
      'Great for architecture enthusiasts. Learn about different styles. Various tour options. Covers major architectural highlights.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0850,
    longitude: 14.4200,
    images: ['place-1.jpg'],
    address: 'Various starting points',
    estimatedVisitDuration: 180,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '74',
    name: 'Prague Photography Tours',
    shortDescription: 'Tours for photography enthusiasts',
    description:
      'Photography tours take visitors to the best spots for capturing Prague\'s beauty, with tips from professional photographers.',
    practicalTips:
      'Great for photography enthusiasts. Learn photography techniques. Best times for lighting. Covers iconic photo spots.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0850,
    longitude: 14.4200,
    images: ['place-2.jpg'],
    address: 'Various starting points',
    estimatedVisitDuration: 180,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '75',
    name: 'Prague Christmas Markets',
    shortDescription: 'Festive markets during the holiday season',
    description:
      'Prague\'s Christmas markets are among the most beautiful in Europe, with stalls selling crafts, food, and drinks in festive settings, especially in Old Town Square and Wenceslas Square.',
    practicalTips:
      'Open from late November to early January. Very crowded but magical. Try mulled wine and traditional treats. Great for souvenirs.',
    category: PlaceCategory.FOOD,
    latitude: 50.0875,
    longitude: 14.4214,
    images: ['place-3.jpg'],
    address: 'Old Town Square, Wenceslas Square',
    estimatedVisitDuration: 90,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '76',
    name: 'Prague Easter Markets',
    shortDescription: 'Spring markets with traditional crafts',
    description:
      'Easter markets in Prague feature traditional crafts, food, and Easter decorations, creating a festive spring atmosphere in the city squares.',
    practicalTips:
      'Open during Easter season. Less crowded than Christmas markets. Traditional crafts available. Great for families.',
    category: PlaceCategory.FOOD,
    latitude: 50.0875,
    longitude: 14.4214,
    images: ['place-4.jpg'],
    address: 'Old Town Square, Wenceslas Square',
    estimatedVisitDuration: 60,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '77',
    name: 'Prague Nightlife',
    shortDescription: 'Vibrant nightlife scene',
    description:
      'Prague has a vibrant nightlife scene with numerous bars, clubs, and music venues. Areas like Žižkov, Vinohrady, and Old Town offer diverse nightlife options.',
    practicalTips:
      'Great variety of venues. Affordable drinks. Popular areas include Žižkov and Vinohrady. Check opening hours.',
    category: PlaceCategory.FOOD,
    latitude: 50.0850,
    longitude: 14.4200,
    images: ['place-5.jpg'],
    address: 'Various locations',
    estimatedVisitDuration: 180,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '78',
    name: 'Prague Jazz Clubs',
    shortDescription: 'Jazz clubs with live music',
    description:
      'Prague has a thriving jazz scene with numerous clubs offering live music performances. These venues provide intimate settings to enjoy jazz music.',
    practicalTips:
      'Various venues throughout the city. Check schedules for performances. Great atmosphere. Cover charges vary.',
    category: PlaceCategory.FOOD,
    latitude: 50.0850,
    longitude: 14.4200,
    images: ['place-6.jpg'],
    address: 'Various locations',
    estimatedVisitDuration: 120,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '79',
    name: 'Prague Classical Music Concerts',
    shortDescription: 'Classical music performances throughout the city',
    description:
      'Prague offers numerous opportunities to enjoy classical music, with concerts in historic venues like churches, palaces, and concert halls.',
    practicalTips:
      'Various venues and performances. Book in advance. Beautiful historic settings. Great for music lovers.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0850,
    longitude: 14.4200,
    images: ['place-7.jpg'],
    address: 'Various venues',
    estimatedVisitDuration: 90,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '80',
    name: 'Prague Opera Performances',
    shortDescription: 'Opera performances at historic venues',
    description:
      'Prague offers world-class opera performances at venues like the National Theatre and Estates Theatre, where Mozart premiered Don Giovanni.',
    practicalTips:
      'Book tickets in advance. Various performances available. Historic venues. Great cultural experience.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0810,
    longitude: 14.4140,
    images: ['place-8.jpg'],
    address: 'National Theatre, Estates Theatre',
    estimatedVisitDuration: 180,
    priceRange: 'high',
    isPremium: false,
  },
  // More places - continuing towards 117
  {
    id: '81',
    name: 'Prague Black Light Theatre',
    shortDescription: 'Unique black light theatre performances',
    description:
      'Black light theatre is a unique form of performance art that originated in Prague, using UV light and fluorescent costumes to create magical visual effects.',
    practicalTips:
      'Unique Prague experience. Various shows available. Great for families. Book in advance.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0850,
    longitude: 14.4200,
    images: ['place-1.jpg'],
    address: 'Various venues',
    estimatedVisitDuration: 90,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '82',
    name: 'Puppet Shows',
    shortDescription: 'Traditional Czech puppet theatre',
    description:
      'Puppet theatre is a traditional Czech art form, and Prague offers numerous puppet shows, from traditional performances to modern interpretations.',
    practicalTips:
      'Great for families. Traditional Czech art form. Various venues. Fun for all ages.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0850,
    longitude: 14.4200,
    images: ['place-2.jpg'],
    address: 'Various venues',
    estimatedVisitDuration: 60,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '83',
    name: 'Prague Marionette Museum',
    shortDescription: 'Museum dedicated to Czech marionettes',
    description:
      'The Marionette Museum showcases the history and art of Czech puppetry, with an extensive collection of marionettes and information about this traditional art form.',
    practicalTips:
      'Great for families. Learn about Czech puppetry. Interactive exhibits. Gift shop with marionettes.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0850,
    longitude: 14.4200,
    images: ['place-3.jpg'],
    address: 'Various locations',
    estimatedVisitDuration: 60,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '84',
    name: 'Prague Planetarium',
    shortDescription: 'Planetarium with astronomy shows',
    description:
      'The Prague Planetarium offers astronomy shows and educational programs about the universe, with state-of-the-art projection technology.',
    practicalTips:
      'Great for families. Educational experience. Various shows available. Check schedule.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.1000,
    longitude: 14.4000,
    images: ['place-4.jpg'],
    address: 'Královská obora 233, 170 00 Praha 7',
    estimatedVisitDuration: 90,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '85',
    name: 'Prague Aquarium',
    shortDescription: 'Aquarium with marine life exhibits',
    description:
      'The Prague Aquarium features various marine life exhibits, offering visitors the chance to see fish and other aquatic creatures from around the world.',
    practicalTips:
      'Great for families. Educational experience. Various exhibits. Allow 1-2 hours.',
    category: PlaceCategory.NATURE,
    latitude: 50.1000,
    longitude: 14.4100,
    images: ['place-5.jpg'],
    address: 'Various locations',
    estimatedVisitDuration: 90,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '86',
    name: 'Prague Ice Skating',
    shortDescription: 'Ice skating rinks in winter',
    description:
      'During winter, Prague offers several ice skating rinks, including one in Old Town Square, providing a magical winter experience.',
    practicalTips:
      'Seasonal activity (winter). Great for families. Rent skates on site. Very popular during Christmas markets.',
    category: PlaceCategory.NATURE,
    latitude: 50.0875,
    longitude: 14.4214,
    images: ['place-6.jpg'],
    address: 'Old Town Square, various locations',
    estimatedVisitDuration: 60,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '87',
    name: 'Prague Bike Rental',
    shortDescription: 'Bike rental for exploring the city',
    description:
      'Bike rental services in Prague allow visitors to explore the city at their own pace, with various rental options and bike paths throughout the city.',
    practicalTips:
      'Various rental companies. Great way to see the city. Bike paths available. Affordable option.',
    category: PlaceCategory.NATURE,
    latitude: 50.0850,
    longitude: 14.4200,
    images: ['place-7.jpg'],
    address: 'Various rental locations',
    estimatedVisitDuration: 180,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '88',
    name: 'Prague Electric Scooter Rental',
    shortDescription: 'Electric scooter rental services',
    description:
      'Electric scooter rental services offer a fun and convenient way to explore Prague, with apps allowing easy rental and drop-off throughout the city.',
    practicalTips:
      'Download app. Easy to use. Great for short distances. Follow traffic rules.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0850,
    longitude: 14.4200,
    images: ['place-8.jpg'],
    address: 'Various locations',
    estimatedVisitDuration: 60,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '89',
    name: 'Prague Escape Rooms',
    shortDescription: 'Escape room experiences',
    description:
      'Prague has numerous escape rooms offering challenging puzzles and themed experiences, great for groups and families.',
    practicalTips:
      'Great for groups. Various themes available. Book in advance. Fun challenge.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0850,
    longitude: 14.4200,
    images: ['place-1.jpg'],
    address: 'Various locations',
    estimatedVisitDuration: 60,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '90',
    name: 'Prague VR Experiences',
    shortDescription: 'Virtual reality experiences',
    description:
      'Prague offers various VR experiences, from virtual tours of historical Prague to gaming experiences, providing immersive entertainment.',
    practicalTips:
      'Great for tech enthusiasts. Various experiences available. Book in advance. Fun for all ages.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0850,
    longitude: 14.4200,
    images: ['place-2.jpg'],
    address: 'Various locations',
    estimatedVisitDuration: 30,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '91',
    name: 'Prague Luxury Spas',
    shortDescription: 'Luxury spa experiences',
    description:
      'Prague offers numerous luxury spas providing relaxation and wellness treatments, from traditional massages to modern spa experiences.',
    practicalTips:
      'Book in advance. Various treatments available. Great for relaxation. Check packages.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0850,
    longitude: 14.4200,
    images: ['place-3.jpg'],
    address: 'Various spa locations',
    estimatedVisitDuration: 120,
    priceRange: 'high',
    isPremium: false,
  },
  {
    id: '92',
    name: 'Prague Luxury Shopping',
    shortDescription: 'High-end shopping districts',
    description:
      'Prague offers luxury shopping opportunities, with high-end brands and boutiques in areas like Pařížská Street and Wenceslas Square.',
    practicalTips:
      'Pařížská Street is the main luxury shopping area. Various international brands. Great for window shopping.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.0875,
    longitude: 14.4214,
    images: ['place-4.jpg'],
    address: 'Pařížská, Wenceslas Square',
    estimatedVisitDuration: 120,
    priceRange: 'high',
    isPremium: false,
  },
  {
    id: '93',
    name: 'Prague Fine Dining',
    shortDescription: 'Michelin-starred and fine dining restaurants',
    description:
      'Prague has several fine dining restaurants, including Michelin-starred establishments, offering exceptional culinary experiences.',
    practicalTips:
      'Reservations essential. Dress code may apply. Expensive but exceptional. Great for special occasions.',
    category: PlaceCategory.FOOD,
    latitude: 50.0850,
    longitude: 14.4200,
    images: ['place-5.jpg'],
    address: 'Various locations',
    estimatedVisitDuration: 180,
    priceRange: 'high',
    isPremium: false,
  },
  {
    id: '94',
    name: 'Prague Rooftop Bars',
    shortDescription: 'Rooftop bars with city views',
    description:
      'Prague has numerous rooftop bars offering stunning views of the city while enjoying drinks and food in elevated settings.',
    practicalTips:
      'Great for sunset views. Popular spots get crowded. Reservations recommended. Higher prices but great views.',
    category: PlaceCategory.VIEWPOINTS,
    latitude: 50.0850,
    longitude: 14.4200,
    images: ['place-6.jpg'],
    address: 'Various locations',
    estimatedVisitDuration: 90,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '95',
    name: 'Prague Helicopter Tours',
    shortDescription: 'Helicopter tours over the city',
    description:
      'Helicopter tours offer a unique aerial perspective of Prague, providing breathtaking views of the city from above.',
    practicalTips:
      'Expensive but unique experience. Book in advance. Weather dependent. Great for special occasions.',
    category: PlaceCategory.VIEWPOINTS,
    latitude: 50.0850,
    longitude: 14.4200,
    images: ['place-7.jpg'],
    address: 'Various departure points',
    estimatedVisitDuration: 30,
    priceRange: 'high',
    isPremium: false,
  },
  {
    id: '96',
    name: 'Prague Hot Air Balloon Rides',
    shortDescription: 'Hot air balloon rides over the countryside',
    description:
      'Hot air balloon rides offer a peaceful and romantic way to see the Czech countryside from above, with flights typically taking place outside the city.',
    practicalTips:
      'Weather dependent. Early morning flights. Book in advance. Romantic experience.',
    category: PlaceCategory.VIEWPOINTS,
    latitude: 50.1000,
    longitude: 14.4000,
    images: ['place-8.jpg'],
    address: 'Various departure points',
    estimatedVisitDuration: 120,
    priceRange: 'high',
    isPremium: false,
  },
  {
    id: '97',
    name: 'Prague Day Trip to Český Krumlov',
    shortDescription: 'Day trip to fairy-tale town',
    description:
      'Český Krumlov is a beautiful medieval town about 2.5 hours from Prague, with a stunning castle, charming streets, and UNESCO World Heritage status.',
    practicalTips:
      'Book organized tour or take bus/train. Allow full day. Very popular destination. Beautiful architecture.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 48.8127,
    longitude: 14.3175,
    images: ['place-1.jpg'],
    address: 'Český Krumlov (day trip)',
    estimatedVisitDuration: 480,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '98',
    name: 'Prague Day Trip to Karlštejn Castle',
    shortDescription: 'Day trip to medieval castle',
    description:
      'Karlštejn Castle is a Gothic castle about 30 km from Prague, built by Charles IV to store royal treasures. It\'s one of the most famous castles in the Czech Republic.',
    practicalTips:
      'Easy day trip by train. Book castle tour in advance. Beautiful countryside. Allow half day.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 49.9394,
    longitude: 14.1883,
    images: ['place-2.jpg'],
    address: 'Karlštejn (day trip)',
    estimatedVisitDuration: 240,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '99',
    name: 'Prague Day Trip to Kutná Hora',
    shortDescription: 'Day trip to historic town with bone church',
    description:
      'Kutná Hora is a historic town about 1 hour from Prague, famous for the Sedlec Ossuary (bone church) decorated with human bones, and the beautiful St. Barbara\'s Church.',
    practicalTips:
      'Easy day trip by train. Very unique bone church. Historic silver mining town. Allow half day.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 49.9494,
    longitude: 15.2681,
    images: ['place-3.jpg'],
    address: 'Kutná Hora (day trip)',
    estimatedVisitDuration: 240,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '100',
    name: 'Prague Day Trip to Terezín',
    shortDescription: 'Day trip to former concentration camp',
    description:
      'Terezín is a former concentration camp and ghetto about 1 hour from Prague, now a memorial and museum dedicated to the victims of the Holocaust.',
    practicalTips:
      'Very moving and educational. Easy day trip. Allow half day. Important historical site.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.5106,
    longitude: 14.1506,
    images: ['place-4.jpg'],
    address: 'Terezín (day trip)',
    estimatedVisitDuration: 240,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '101',
    name: 'Prague Day Trip to Plzeň',
    shortDescription: 'Day trip to beer city',
    description:
      'Plzeň (Pilsen) is the birthplace of Pilsner beer, about 1 hour from Prague. Visit the Pilsner Urquell Brewery and explore the historic city center.',
    practicalTips:
      'Great for beer enthusiasts. Brewery tours available. Easy day trip. Historic city center.',
    category: PlaceCategory.FOOD,
    latitude: 49.7475,
    longitude: 13.3775,
    images: ['place-5.jpg'],
    address: 'Plzeň (day trip)',
    estimatedVisitDuration: 300,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '102',
    name: 'Prague Day Trip to Konopiště Castle',
    shortDescription: 'Day trip to Archduke\'s castle',
    description:
      'Konopiště Castle is a beautiful castle about 50 km from Prague, once the residence of Archduke Franz Ferdinand. It features beautiful gardens and a large collection of hunting trophies.',
    practicalTips:
      'Easy day trip. Beautiful gardens. Historic significance. Allow half day.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 49.7800,
    longitude: 14.6600,
    images: ['place-6.jpg'],
    address: 'Konopiště (day trip)',
    estimatedVisitDuration: 240,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '103',
    name: 'Prague Day Trip to Karlovy Vary',
    shortDescription: 'Day trip to spa town',
    description:
      'Karlovy Vary is a famous spa town about 2 hours from Prague, known for its hot springs, beautiful architecture, and the annual film festival.',
    practicalTips:
      'Beautiful spa town. Try the spa wafers. Historic architecture. Allow full day.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.2306,
    longitude: 12.8711,
    images: ['place-7.jpg'],
    address: 'Karlovy Vary (day trip)',
    estimatedVisitDuration: 480,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '104',
    name: 'Prague Day Trip to Bohemian Switzerland',
    shortDescription: 'Day trip to national park',
    description:
      'Bohemian Switzerland National Park is a beautiful natural area about 2 hours from Prague, known for its sandstone formations, gorges, and hiking trails.',
    practicalTips:
      'Great for nature lovers. Hiking opportunities. Beautiful scenery. Allow full day.',
    category: PlaceCategory.NATURE,
    latitude: 50.8333,
    longitude: 14.2833,
    images: ['place-8.jpg'],
    address: 'Bohemian Switzerland (day trip)',
    estimatedVisitDuration: 480,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '105',
    name: 'Prague Day Trip to Mělník',
    shortDescription: 'Day trip to wine region',
    description:
      'Mělník is a town about 1 hour from Prague, located in a wine-growing region. Visit the castle, enjoy wine tastings, and see the confluence of the Vltava and Elbe rivers.',
    practicalTips:
      'Great for wine enthusiasts. Wine tastings available. Beautiful location. Easy day trip.',
    category: PlaceCategory.FOOD,
    latitude: 50.3500,
    longitude: 14.4833,
    images: ['place-1.jpg'],
    address: 'Mělník (day trip)',
    estimatedVisitDuration: 240,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '106',
    name: 'Prague Day Trip to Třeboň',
    shortDescription: 'Day trip to spa and fish region',
    description:
      'Třeboň is a historic spa town about 2 hours from Prague, known for its fishponds, spa treatments, and beautiful Renaissance architecture.',
    practicalTips:
      'Great for relaxation. Spa treatments available. Beautiful historic center. Allow full day.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 49.0039,
    longitude: 14.7706,
    images: ['place-2.jpg'],
    address: 'Třeboň (day trip)',
    estimatedVisitDuration: 480,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '107',
    name: 'Prague Day Trip to Hradec Králové',
    shortDescription: 'Day trip to historic city',
    description:
      'Hradec Králové is a historic city about 1.5 hours from Prague, known for its beautiful architecture, museums, and as a cultural center of Eastern Bohemia.',
    practicalTips:
      'Less touristy. Beautiful architecture. Museums and galleries. Easy day trip.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 50.2092,
    longitude: 15.8325,
    images: ['place-3.jpg'],
    address: 'Hradec Králové (day trip)',
    estimatedVisitDuration: 300,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '108',
    name: 'Prague Day Trip to Olomouc',
    shortDescription: 'Day trip to historic city',
    description:
      'Olomouc is a historic city about 2.5 hours from Prague, known for its beautiful main square, Holy Trinity Column (UNESCO), and historic architecture.',
    practicalTips:
      'Beautiful historic center. UNESCO site. Less touristy. Allow full day.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 49.5938,
    longitude: 17.2509,
    images: ['place-4.jpg'],
    address: 'Olomouc (day trip)',
    estimatedVisitDuration: 480,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '109',
    name: 'Prague Day Trip to Brno',
    shortDescription: 'Day trip to Czech Republic\'s second city',
    description:
      'Brno is the second-largest city in the Czech Republic, about 2.5 hours from Prague. It offers a different atmosphere with modern architecture, museums, and a vibrant cultural scene.',
    practicalTips:
      'Different from Prague. Modern architecture. Great museums. Vibrant city. Allow full day.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 49.1951,
    longitude: 16.6068,
    images: ['place-5.jpg'],
    address: 'Brno (day trip)',
    estimatedVisitDuration: 480,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '110',
    name: 'Prague Day Trip to Telč',
    shortDescription: 'Day trip to UNESCO town',
    description:
      'Telč is a beautiful Renaissance town and UNESCO World Heritage site about 2 hours from Prague, known for its perfectly preserved main square with colorful houses.',
    practicalTips:
      'UNESCO World Heritage site. Beautiful architecture. Less touristy. Allow half day.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 49.1842,
    longitude: 15.4528,
    images: ['place-6.jpg'],
    address: 'Telč (day trip)',
    estimatedVisitDuration: 240,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '111',
    name: 'Prague Day Trip to Lednice-Valtice',
    shortDescription: 'Day trip to cultural landscape',
    description:
      'The Lednice-Valtice Cultural Landscape is a UNESCO World Heritage site about 2.5 hours from Prague, featuring beautiful chateaux, gardens, and a romantic landscape.',
    practicalTips:
      'UNESCO World Heritage site. Beautiful chateaux. Great for nature lovers. Allow full day.',
    category: PlaceCategory.NATURE,
    latitude: 48.8000,
    longitude: 16.8000,
    images: ['place-7.jpg'],
    address: 'Lednice-Valtice (day trip)',
    estimatedVisitDuration: 480,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '112',
    name: 'Prague Day Trip to Adršpach-Teplice Rocks',
    shortDescription: 'Day trip to rock formations',
    description:
      'Adršpach-Teplice Rocks is a nature reserve about 2.5 hours from Prague, featuring stunning sandstone rock formations, gorges, and hiking trails.',
    practicalTips:
      'Great for hiking. Beautiful natural formations. Less touristy. Allow full day.',
    category: PlaceCategory.NATURE,
    latitude: 50.6167,
    longitude: 16.1167,
    images: ['place-8.jpg'],
    address: 'Adršpach-Teplice (day trip)',
    estimatedVisitDuration: 480,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '113',
    name: 'Prague Day Trip to Litomyšl',
    shortDescription: 'Day trip to Renaissance town',
    description:
      'Litomyšl is a beautiful Renaissance town about 2 hours from Prague, known for its UNESCO-listed castle and as the birthplace of composer Bedřich Smetana.',
    practicalTips:
      'UNESCO World Heritage site. Beautiful castle. Birthplace of Smetana. Allow half day.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 49.8700,
    longitude: 16.3100,
    images: ['place-1.jpg'],
    address: 'Litomyšl (day trip)',
    estimatedVisitDuration: 240,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '114',
    name: 'Prague Day Trip to Hluboká Castle',
    shortDescription: 'Day trip to fairy-tale castle',
    description:
      'Hluboká Castle is a beautiful neo-Gothic castle about 2 hours from Prague, resembling Windsor Castle. It features beautiful interiors and extensive gardens.',
    practicalTips:
      'Beautiful castle. Resembles Windsor Castle. Great gardens. Allow half day.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 49.0500,
    longitude: 14.4500,
    images: ['place-2.jpg'],
    address: 'Hluboká nad Vltavou (day trip)',
    estimatedVisitDuration: 240,
    priceRange: 'medium',
    isPremium: false,
  },
  {
    id: '115',
    name: 'Prague Day Trip to Znojmo',
    shortDescription: 'Day trip to wine region town',
    description:
      'Znojmo is a historic town in the wine region about 2.5 hours from Prague, known for its underground passages, historic architecture, and wine production.',
    practicalTips:
      'Wine region. Underground passages. Historic architecture. Allow full day.',
    category: PlaceCategory.SIGHTSEEING,
    latitude: 48.8556,
    longitude: 16.0489,
    images: ['place-3.jpg'],
    address: 'Znojmo (day trip)',
    estimatedVisitDuration: 480,
    priceRange: 'low',
    isPremium: false,
  },
  {
    id: '116',
    name: 'Prague Day Trip to Šumava National Park',
    shortDescription: 'Day trip to national park',
    description:
      'Šumava National Park is the largest national park in the Czech Republic, about 2.5 hours from Prague, offering beautiful nature, hiking trails, and pristine wilderness.',
    practicalTips:
      'Great for nature lovers. Hiking opportunities. Beautiful wilderness. Allow full day or overnight.',
    category: PlaceCategory.NATURE,
    latitude: 49.1667,
    longitude: 13.5000,
    images: ['place-4.jpg'],
    address: 'Šumava (day trip)',
    estimatedVisitDuration: 480,
    priceRange: 'free',
    isPremium: false,
  },
  {
    id: '117',
    name: 'Prague Day Trip to Moravian Karst',
    shortDescription: 'Day trip to cave system',
    description:
      'The Moravian Karst is a protected area about 2.5 hours from Prague, featuring extensive cave systems, including the famous Macocha Abyss, accessible by boat tours.',
    practicalTips:
      'Unique cave system. Boat tours available. Macocha Abyss is impressive. Allow full day.',
    category: PlaceCategory.NATURE,
    latitude: 49.3667,
    longitude: 16.7167,
    images: ['place-5.jpg'],
    address: 'Moravian Karst (day trip)',
    estimatedVisitDuration: 480,
    priceRange: 'medium',
    isPremium: false,
  },
];

export const seedDatabase = async (): Promise<void> => {
  const repo = new PlaceRepository();

  // Check if database is already seeded
  const existing = await repo.getAll();
  const now = new Date();
  
  if (existing.length > 0) {
    // Only update places that need updating (e.g., missing local images)
    // Check if any place needs updating by comparing images
    const placesToUpdate: Array<{ existing: Place; sample: typeof samplePlaces[0] }> = [];
    
    for (const existingPlace of existing) {
      const samplePlace = samplePlaces.find(p => p.id === existingPlace.id);
      if (samplePlace) {
        // Only update if images are different (e.g., if existing has URL instead of local file)
        const existingImages = existingPlace.images;
        const sampleImages = samplePlace.images;
        const needsUpdate = JSON.stringify(existingImages) !== JSON.stringify(sampleImages);
        
        if (needsUpdate) {
          placesToUpdate.push({ existing: existingPlace, sample: samplePlace });
        }
      }
    }
    
    // Batch update only places that need it
    for (const { existing: existingPlace, sample: samplePlace } of placesToUpdate) {
      await repo.update({
        ...samplePlace,
        createdAt: existingPlace.createdAt,
        updatedAt: now,
      });
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

  // Seed itineraries
  await seedItineraries();
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
    // Only insert missing tours, skip updates if data already exists
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
    // Only insert missing hotels, skip updates if data already exists
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
    // Only insert missing tips, skip updates if data already exists
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

const sampleItineraries: Omit<Itinerary, 'createdAt' | 'updatedAt'>[] = [
  {
    id: 'itinerary-1-day',
    title: '1 Day in Prague: Best of Prague in 24 Hours',
    description: 'Experience the best of Prague in just 24 hours! This carefully crafted itinerary takes you through the city\'s most iconic landmarks, starting at Prague Castle and descending through Lesser Town, across Charles Bridge, and into the historic Old Town. Designed by locals who know every corner of this enchanting city, this route maximizes your time while minimizing walking distance. The route is designed so you can see as much as possible in one day and also save elevation, as it starts up at the Castle and you gradually descend to the river and into the Old Town. Perfect for first-time visitors who want to see the must-see spots without rushing.',
    type: ItineraryType.ONE_DAY,
    theme: ItineraryTheme.FIRST_TIME,
    places: [
      {
        placeId: '2', // Prague Castle
        order: 1,
        estimatedDuration: 120,
        transportTime: 0,
        transportMode: TransportMode.WALKING,
        notes: 'START HERE: You have two options - Malostranská metro/tram station (closer but requires stairs) or Pražský Hrad tram station (further but no stairs). Entrance to the Castle Complex is FREE. For interiors, tickets are around 250 CZK. Castle area open 6 AM-10 PM, buildings 9 AM-5 PM. Don\'t miss: St. Vitus Cathedral (Gothic masterpiece), St. George\'s Basilica (Romanesque church), Golden Lane (colorful houses, best in morning), Changing of the Guard (every hour, grand ceremony at noon), and the panoramic view from Hradčanské Square.',
      },
      {
        placeId: '4', // Petřín Hill (optional detour B)
        order: 2,
        estimatedDuration: 90,
        transportTime: 15,
        transportMode: TransportMode.WALKING,
        notes: 'OPTIONAL DETOUR B: Beautiful but optional. If you prefer a relaxed day, skip this and continue to Lesser Town. Route: From Hradčanské náměstí via Úvoz Street to Strahov Monastery (oldest Premonstratensian monastery, beautiful library), then to Petřín Tower (220 CZK, elevator extra fee - 1:5 scale replica of Eiffel Tower). Walk down through Petřín orchards (steep but beautiful) or take the funicular (60 CZK). Continue to Church of Our Lady Victorious (Infant Jesus of Prague) and then to Lesser Town Square.',
      },
      {
        placeId: '6', // John Lennon Wall
        order: 3,
        estimatedDuration: 15,
        transportTime: 10,
        transportMode: TransportMode.WALKING,
        notes: 'Located at Velkopřevorské náměstí, hidden by the side of the royal road. Symbol of peace, love, and artistic freedom. Originally a regular wall, it became a canvas for political dissent during Communist era. After John Lennon\'s assassination in 1980, it transformed into a tribute. The wall is continually changing with new graffiti and messages. Free to visit. Nearby: Velkopřevorský mlýn (Grand Priory Mill) at Čertovka Canal - one of the last remaining functional water mills in Prague.',
      },
      {
        placeId: '1', // Charles Bridge
        order: 4,
        estimatedDuration: 30,
        transportTime: 5,
        transportMode: TransportMode.WALKING,
        notes: 'The most famous sight of Prague! Stone Gothic bridge spanning the Vltava River with 16 arches and 30 statues of saints. Built in 1357 by King Charles IV. Visit early morning (before 8 AM) or late evening to avoid crowds. Don\'t miss: Statue of St. John of Nepomuk - rub the bronze plaque for good luck and to ensure you return to Prague! After crossing, turn 2x right to see the famous view from Bedřich Smetana statue - one of the best Instagram spots that most tourists miss.',
      },
      {
        placeId: '3', // Old Town Square
        order: 5,
        estimatedDuration: 90,
        transportTime: 10,
        transportMode: TransportMode.WALKING,
        notes: 'The historical heart of Prague! Must-see attractions: Astronomical Clock (oldest in world, show every hour 9 AM-11 PM - "Walk of the Apostles"), Old Town Hall tower (300 CZK, incredible panoramic views), 27 crosses on the ground (memorial to 27 executed leaders from 1621), St. Nicholas Church (Baroque, organ played by Mozart), Marian Column (reconstructed in 2020), and Church of Our Lady before Týn (Gothic masterpiece with twin 80m spires). Lunch recommendations: Mincovna (great daily menus), U Červeného Páva, or Střídačka (owned by Czech hockey players, 2 meal options daily).',
      },
    ],
    estimatedDuration: 1440, // 24 hours in minutes
    walkingDistance: 5.5, // approximately 5.5 km for main route
    transportHints: [
      'START: Malostranská metro/tram station (Line A, closer but requires stairs) OR Pražský Hrad tram station (tram 22, further but no stairs)',
      'The route is designed to descend from the Castle, saving elevation - you start high and walk downhill',
      'Most of the route is walkable - public transport mainly needed to reach starting point',
      'Consider 24-hour public transport ticket (120 CZK) if you plan to use metro/tram',
      'END: Wenceslas Square (Václavské náměstí) at Muzeum metro station',
      'From end point: 1 metro stop to Main Train Station (Hlavní nádraží), 2 stops to Florenc bus station, or continue to airport via green metro to Nádraží Veleslavín then bus 119',
      'OPTIONAL DETOUR C - Jewish Quarter: Between Old Town Square and Vltava River. Must-see: Old-New Synagogue (oldest active in Europe, 13th century), Old Jewish Cemetery (15th century), Jewish Museum, Klausen Synagogue, Spanish Synagogue. Add 60-90 minutes if visiting.',
      'After Old Town Square: Continue via Celetná Street to Powder Tower (Gothic gate, gunpowder storage) and Municipal House (Art Nouveau, 1912, guided tours available), then to Wenceslas Square',
    ],
    difficulty: Difficulty.MODERATE,
    isPremium: false,
  },
];

export const seedItineraries = async (): Promise<void> => {
  const repo = new ItineraryRepository();
  const existing = await repo.getAll();
  const now = new Date();

  if (existing.length > 0) {
    // Only insert missing itineraries, skip updates if data already exists
    for (const sampleItinerary of sampleItineraries) {
      const exists = existing.find((i) => i.id === sampleItinerary.id);
      if (!exists) {
        await repo.insert({
          ...sampleItinerary,
          createdAt: now,
          updatedAt: now,
        });
      }
    }
    return;
  }

  // Insert sample itineraries if database is empty
  for (const itinerary of sampleItineraries) {
    await repo.insert({
      ...itinerary,
      createdAt: now,
      updatedAt: now,
    });
  }
};

