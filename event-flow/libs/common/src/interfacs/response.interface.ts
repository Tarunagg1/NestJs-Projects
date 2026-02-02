export interface AuthResponse {
    accessToken: string;
}


export interface UserProfileResponse {
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface EventResponse {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    status: 'DRAFT' | 'PUBLISHED' | 'CANCELLED';
    organizerId: string;
    createdAt: Date;
    updatedAt: Date;
}