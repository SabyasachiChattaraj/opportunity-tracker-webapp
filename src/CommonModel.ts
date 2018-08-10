export class User {
  userId: number;
  family_name: string;
  given_name: string;
  birthdate: string;
  email: string;
  phone_number: string;
  phone_number_verified:boolean;
  sub: string;
  address:string;
  primarySkills:string[];
  secondarySkills:string[];
  userGroup:string;
  userName:string;
}