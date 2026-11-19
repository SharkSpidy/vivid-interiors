export type Emirate = 'Ajman' | 'Dubai' | 'Sharjah' | 'Abu Dhabi';

export type ProjectCategory = 'Bespoke Woodwork' | 'Commercial Fit-Out' | 'Luxury Residential';

export type ProjectFilter = 'All' | ProjectCategory;

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  emirate: Emirate;
  year: number;
  clientSector: string;
  area: string;
  timeline: string;
  summary: string;
  materials: string[];
  scope: string[];
  image: string;
  gallery: string[];
  featured?: boolean;
}

export interface MaterialSpec {
  id: string;
  name: string;
  species: string;
  image: string;
  description: string;
  applications: string[];
  technical: { label: string; value: string }[];
  climateNote: string;
}

export type ProjectScope =
  | 'Bespoke Woodwork'
  | 'Commercial Fit-Out'
  | 'Luxury Residential Interiors'
  | 'Turnkey Fit-Out'
  | 'Something else';

export interface InquiryForm {
  fullName: string;
  phone: string;
  emirate: Emirate | '';
  scope: ProjectScope | '';
  brief: string;
}

export type InquiryErrors = Partial<Record<keyof InquiryForm, string>>;

export interface StudioDetails {
  legalName: string;
  email: string;
  phoneDisplay: string;
  whatsappNumber: string;
  addressLines: string[];
  hours: string;
  instagramHandle: string;
  instagramUrl: string;
}
