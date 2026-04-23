export type SectionKey =
  | 'elements'
  | 'forms'
  | 'alertsWindows'
  | 'widgets'
  | 'interactions'
  | 'bookStoreApplication';

export type SectionMetadata = {
  name: string;
  url: string;
  homeCard: string;
  landingType: 'sectionLanding' | 'bookStoreLanding';
};

export const SECTION_LANDING_MESSAGE = 'Please select an item from left to start practice.';
export const SECTION_KEYS_ORDER: SectionKey[] = [
  'elements',
  'forms',
  'alertsWindows',
  'widgets',
  'interactions',
  'bookStoreApplication',
];

export const sectionMetadata: Record<SectionKey, SectionMetadata> = {
  elements: {
    name: 'Elements',
    url: 'elements',
    homeCard: 'Elements',
    landingType: 'sectionLanding',
  },
  forms: {
    name: 'Forms',
    url: 'forms',
    homeCard: 'Forms',
    landingType: 'sectionLanding',
  },
  alertsWindows: {
    name: 'Alerts, Frame & Windows',
    url: 'alertsWindows',
    homeCard: 'Alerts, Frame & Windows',
    landingType: 'sectionLanding',
  },
  widgets: {
    name: 'Widgets',
    url: 'widgets',
    homeCard: 'Widgets',
    landingType: 'sectionLanding',
  },
  interactions: {
    name: 'Interactions',
    url: 'interaction',
    homeCard: 'Interactions',
    landingType: 'sectionLanding',
  },
  bookStoreApplication: {
    name: 'Book Store Application',
    url: 'books',
    homeCard: 'Book Store Application',
    landingType: 'bookStoreLanding',
  },
};
