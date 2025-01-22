export interface Visitor {
  id: string;
  full_name: string;
  email: string;
  mobile: string;
  location: string;
  photo_url: string;
  created_at: string;
}

export interface Background {
  id: string;
  url: string;
  thumbnail: string;
  active: boolean;
  created_at: string;
}

export interface BackgroundOption {
  id: number;
  url: string;
  thumbnail: string;
}