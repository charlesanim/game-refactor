export interface LoginResponse {
  token: string;
  expires: Date;
}
export interface LoginRequest {
  username: string;
  password: string;
}

export interface ServiceError {
  errMsg: string;
  status: string;
}
/**
 * Interface for the 'Home' data
 */

export interface SearchResponse {
  gameId: number;
  title: string;
  platform: string;
}

export interface Platforms {
  name: string;
  platformId: number;
}
export interface SearchRequest {
  gameName: string;
  platformId?: number;
}

export interface GameDetails {
  gameId: number;
  title: string;
  overview: string;
  releaseDate: Date;
  genres: string[];
  publishers: string[];
  platform: Platforms;
  imageUrl: string | null;
}

export interface Collection {
  imageUrl: string | null;
  gameId: number;
  title: string;
  platform: string;
}
