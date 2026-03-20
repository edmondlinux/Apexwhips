export interface Town {
  id: string;
  name: string;
  admin: string;
}

export interface TownDetail {
  city: string;
  admin_name: string;
  lat: string;
  lng: string;
  population: string;
  iso2: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: string;
  tag: string;
}

export type {
  User,
  NewUser,
  Team,
  NewTeam,
  TeamMember,
  NewTeamMember,
  ActivityLog,
  NewActivityLog,
  Invitation,
  NewInvitation,
  TeamDataWithMembers,
} from '@/lib/db/schema';
