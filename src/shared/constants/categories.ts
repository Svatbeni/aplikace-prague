import { PlaceCategory } from '../../types';

export const categoryLabels: Record<PlaceCategory, string> = {
  [PlaceCategory.SIGHTSEEING]: 'Top Sights',
  [PlaceCategory.HIDDEN_GEMS]: 'Hidden Gems',
  [PlaceCategory.BIZARRE]: 'Bizarre',
  [PlaceCategory.VIEWPOINTS]: 'Viewpoints',
  [PlaceCategory.PARKS]: 'Parks',
  [PlaceCategory.CULTURE]: 'Culture',
  [PlaceCategory.FOOD]: 'Food & Drink',
  [PlaceCategory.NIGHTLIFE]: 'Nightlife',
  [PlaceCategory.KIDS]: 'Kids',
};

export const categoryIcons: Record<PlaceCategory, string> = {
  [PlaceCategory.SIGHTSEEING]: 'camera',
  [PlaceCategory.HIDDEN_GEMS]: 'star',
  [PlaceCategory.BIZARRE]: 'help-circle',
  [PlaceCategory.VIEWPOINTS]: 'eye',
  [PlaceCategory.PARKS]: 'leaf',
  [PlaceCategory.CULTURE]: 'book',
  [PlaceCategory.FOOD]: 'restaurant',
  [PlaceCategory.NIGHTLIFE]: 'musical-notes',
  [PlaceCategory.KIDS]: 'happy',
};

