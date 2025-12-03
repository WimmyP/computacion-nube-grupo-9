export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  stats: {
    events: number;
    followers: number;
    following: number;
  };
}

export interface AppEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  status: 'active' | 'past' | 'cancelled';
  price?: number;
}