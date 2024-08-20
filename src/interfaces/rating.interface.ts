export interface RatingField {
  id: string;
  name: string;
}

export interface Ratings {
  createdAt: string;
  updatedAt: string;
  id: string;
  name: string;
  ratingFields: RatingField[];
}
