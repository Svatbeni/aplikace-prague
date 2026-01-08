import { PlaceCategory } from '../../types';

export const categoryLabels: Record<PlaceCategory, string> = {
  [PlaceCategory.SIGHTSEEING]: 'Sightseeing',
  [PlaceCategory.HIDDEN_GEMS]: 'Hidden Gems',
  [PlaceCategory.FOOD]: 'Food & Drink',
  [PlaceCategory.NATURE]: 'Nature',
  [PlaceCategory.VIEWPOINTS]: 'Viewpoints',
};

export const categoryIcons: Record<PlaceCategory, string> = {
  [PlaceCategory.SIGHTSEEING]: 'camera',
  [PlaceCategory.HIDDEN_GEMS]: 'star',
  [PlaceCategory.FOOD]: 'restaurant',
  [PlaceCategory.NATURE]: 'leaf',
  [PlaceCategory.VIEWPOINTS]: 'eye',
};

