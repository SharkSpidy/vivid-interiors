import type { Emirate, ProjectScope, StudioDetails } from '../types';

/**
 * Studio contact details.
 * TODO before launch: replace the street address, direct line and WhatsApp number
 * with the verified Ajman workshop details. They are shown as placeholders today.
 */
export const studio: StudioDetails = {
  legalName: 'Vivid Interiors LLC',
  email: 'studio@vividinteriors.ae',
  phoneDisplay: '+971 50 000 0000',
  whatsappNumber: '971500000000',
  addressLines: ['Studio & Joinery Workshop', 'Industrial Area 13, Ajman', 'United Arab Emirates'],
  hours: 'Monday to Saturday, 9:00 AM to 6:30 PM GST',
  instagramHandle: '@vividinteriors.ae',
  instagramUrl: 'https://instagram.com/vividinteriors.ae',
};

export const emirates: Emirate[] = ['Ajman', 'Dubai', 'Sharjah', 'Abu Dhabi'];

export const projectScopes: ProjectScope[] = [
  'Bespoke Woodwork',
  'Commercial Fit-Out',
  'Luxury Residential Interiors',
  'Turnkey Fit-Out',
  'Something else',
];
