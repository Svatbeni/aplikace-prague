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
  [PlaceCategory.SIGHTSEEING]: 'star',
  [PlaceCategory.HIDDEN_GEMS]: 'eye',
  [PlaceCategory.BIZARRE]: 'help-circle',
  [PlaceCategory.VIEWPOINTS]: 'camera',
  [PlaceCategory.PARKS]: 'leaf',
  [PlaceCategory.CULTURE]: 'storefront',
  [PlaceCategory.FOOD]: 'restaurant',
  [PlaceCategory.NIGHTLIFE]: 'wine',
  [PlaceCategory.KIDS]: 'happy',
};

