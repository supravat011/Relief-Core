export enum ReliefStatus {
  SAFE = 'Safe',
  INJURED = 'Injured',
  MISSING = 'Missing',
  DECEASED = 'Deceased',
  DISPLACED = 'Displaced'
}

export enum UrgencyLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical'
}

export interface Victim {
  id: string;
  fullName: string;
  age: number;
  gender: string;
  status: ReliefStatus;
  contactNumber: string;
  assignedCampId: string | null;
  needs: string[];
  registeredAt: string;
}

export interface Resource {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  status: 'Good' | 'Low' | 'Critical';
}

export interface Camp {
  id: string;
  name: string;
  location: string;
  capacity: number;
  occupancy: number;
  status: 'Active' | 'Full' | 'Closed';
  resources: Resource[];
  managerName: string;
}

export interface AIResourcePrediction {
  campId: string;
  predictions: {
    item: string;
    suggestedQuantity: number;
    reasoning: string;
  }[];
}