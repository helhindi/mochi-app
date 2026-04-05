export interface Cat {
  id: string;
  name: string;
  breed: string;
  ageWeeks: number;
  pricePounds: number;
  gender: "male" | "female";
  location: string;
  description: string;
  imageUrl: string;
  available: boolean;
  colour: string;
}
