// Core entity types based on DATA_MODELS.md

export enum PlaceCategory {
  SIGHTSEEING = 'sightseeing',
  HIDDEN_GEMS = 'hidden_gems',
  FOOD = 'food',
  NATURE = 'nature',
  VIEWPOINTS = 'viewpoints',
}

export enum ItineraryType {
  ONE_DAY = 'one_day',
  TWO_DAYS = 'two_days',
  THREE_DAYS = 'three_days',
  THEMATIC = 'thematic',
}

export enum ItineraryTheme {
  FIRST_TIME = 'first_time',
  COUPLES = 'couples',
  HIDDEN_GEMS = 'hidden_gems',
  FOODIE = 'foodie',
  CULTURE = 'culture',
}

export enum TransportMode {
  WALKING = 'walking',
  TRAM = 'tram',
  METRO = 'metro',
  BUS = 'bus',
}

export enum Difficulty {
  EASY = 'easy',
  MODERATE = 'moderate',
  CHALLENGING = 'challenging',
}

export enum TipCategory {
  TRANSPORT = 'transport',
  MONEY = 'money',
  SAFETY = 'safety',
  EMERGENCY = 'emergency',
  TIPPING = 'tipping',
  INTERNET = 'internet',
  GENERAL = 'general',
}

export enum WeatherCondition {
  SUNNY = 'sunny',
  PARTLY_CLOUDY = 'partly_cloudy',
  CLOUDY = 'cloudy',
  RAIN = 'rain',
  SNOW = 'snow',
  STORM = 'storm',
}

export enum FavoriteType {
  PLACE = 'place',
  ITINERARY = 'itinerary',
  TOUR = 'tour',
  HOTEL = 'hotel',
}

export interface OpeningHours {
  monday?: DaySchedule;
  tuesday?: DaySchedule;
  wednesday?: DaySchedule;
  thursday?: DaySchedule;
  friday?: DaySchedule;
  saturday?: DaySchedule;
  sunday?: DaySchedule;
  notes?: string;
}

export interface DaySchedule {
  open: string;
  close: string;
  isClosed?: boolean;
}

export interface Place {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  practicalTips: string;
  category: PlaceCategory;
  latitude: number;
  longitude: number;
  openingHours?: OpeningHours;
  images: string[];
  address?: string;
  estimatedVisitDuration?: number;
  priceRange?: 'free' | 'low' | 'medium' | 'high';
  isPremium?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ItineraryPlace {
  placeId: string;
  order: number;
  estimatedDuration: number;
  transportTime?: number;
  transportMode?: TransportMode;
  notes?: string;
}

export interface Itinerary {
  id: string;
  title: string;
  description: string;
  type: ItineraryType;
  theme?: ItineraryTheme;
  places: ItineraryPlace[];
  estimatedDuration: number;
  walkingDistance?: number;
  transportHints?: string[];
  difficulty?: Difficulty;
  isPremium?: boolean;
  isFavorite?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tour {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  duration: string;
  priceRange: string;
  affiliateLink: string;
  provider?: string;
  category?: string;
  rating?: number;
  imageUrl?: string;
  requiresOnline: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PracticalTip {
  id: string;
  category: TipCategory;
  title: string;
  content: string;
  icon?: string;
  priority: number;
  updatedAt: Date;
}

export interface Hotel {
  id: string;
  name: string;
  area: string;
  description: string;
  priceRange: string;
  affiliateLink: string;
  imageUrl?: string;
  rating?: number;
  features?: string[];
}

export interface CurrentWeather {
  temperature: number;
  condition: WeatherCondition;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export interface ForecastDay {
  date: Date;
  high: number;
  low: number;
  condition: WeatherCondition;
  description: string;
  icon: string;
  precipitation?: number;
}

export interface Weather {
  location: string;
  current: CurrentWeather;
  forecast: ForecastDay[];
  lastUpdated: Date;
}

export interface Favorite {
  id: string;
  userId?: string;
  itemType: FavoriteType;
  itemId: string;
  createdAt: Date;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  offlineMapsDownloaded: boolean;
  lastSyncDate?: Date;
  adsEnabled: boolean;
  notificationEnabled: boolean;
}

export type RootStackParamList = {
  MainTabs: undefined;
  PlaceDetail: { placeId: string };
  ItineraryDetail: { itineraryId: string };
  TourDetail: { tourId: string };
  HotelDetail: { hotelId: string };
  PracticalTips: undefined;
};

export type MainTabsParamList = {
  Home: undefined;
  Places: undefined;
  Tours: undefined;
  Hotels: undefined;
  Map: undefined;
  Itineraries: undefined;
  More: undefined;
};

