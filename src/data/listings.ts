import img0 from '../assets/listings/img_0.jpg';
import img1 from '../assets/listings/img_1.jpg';
import img2 from '../assets/listings/img_2.jpg';
import img3 from '../assets/listings/img_3.jpg';
import img4 from '../assets/listings/img_4.jpg';
import img5 from '../assets/listings/img_5.jpg';
import img6 from '../assets/listings/img_6.jpg';
import img7 from '../assets/listings/img_7.jpg';
import img8 from '../assets/listings/img_8.jpg';
import img9 from '../assets/listings/img_9.jpg';
import img10 from '../assets/listings/img_10.jpg';
import img11 from '../assets/listings/img_11.jpg';
import img12 from '../assets/listings/img_12.jpg';
import img13 from '../assets/listings/img_13.jpg';
import img16 from '../assets/listings/img_16.jpg';
import img17 from '../assets/listings/img_17.jpg';
import img18 from '../assets/listings/img_18.jpg';
import img19 from '../assets/listings/img_19.jpg';

export interface Listing {
  id: string;
  image: string;
  title: string;
  /** Second line, e.g. "1 bed" or "$809 for 2 nights". */
  meta: string;
  rating?: number;
  guestFavorite?: boolean;
}

export interface Section {
  id: string;
  title: string;
  listings: Listing[];
}

export const sections: Section[] = [
  {
    id: 'recently-viewed',
    title: 'Recently viewed',
    listings: [
      { id: 'rv1', image: img0, title: 'Los Angeles', meta: '1 bed' },
      { id: 'rv2', image: img10, title: 'Marina del Rey', meta: '1 bed' },
      { id: 'rv3', image: img6, title: 'Los Angeles', meta: '2 beds', rating: 4.82 },
      { id: 'rv4', image: img1, title: 'Los Angeles', meta: '2 beds' },
      { id: 'rv5', image: img9, title: 'West Hollywood', meta: '2 beds' },
      { id: 'rv6', image: img13, title: 'West Hollywood', meta: '2 beds', rating: 4.0 },
      { id: 'rv7', image: img7, title: 'West Hollywood', meta: '5 beds', rating: 4.36 },
    ],
  },
  {
    id: 'popular-weho',
    title: 'Popular homes in West Hollywood',
    listings: [
      { id: 'ph1', image: img5, title: 'Apartment in Los Angeles', meta: '$809 for 2 nights', rating: 4.82, guestFavorite: true },
      { id: 'ph2', image: img11, title: 'Apartment in West Hollywood', meta: '$644 for 2 nights', rating: 5.0, guestFavorite: true },
      { id: 'ph3', image: img18, title: 'Apartment in Vernon', meta: '$1,156 for 2 nights', rating: 4.99, guestFavorite: true },
      { id: 'ph4', image: img2, title: 'Apartment in West Hollywood', meta: '$600 for 2 nights', rating: 5.0, guestFavorite: true },
      { id: 'ph5', image: img8, title: 'Villa in West Hollywood', meta: '$1,903 for 2 nights', rating: 4.97, guestFavorite: true },
      { id: 'ph6', image: img16, title: 'Home in West Hollywood', meta: '$2,656 for 2 nights', rating: 5.0, guestFavorite: true },
      { id: 'ph7', image: img12, title: 'Home in Los Angeles', meta: '$2,061 for 2 nights', rating: 4.89, guestFavorite: true },
    ],
  },
  {
    id: 'available-malibu',
    title: 'Available next month in Malibu',
    listings: [
      { id: 'am1', image: img17, title: 'Home in Beverly Hills', meta: '$3,120 for 2 nights', rating: 4.95, guestFavorite: true },
      { id: 'am2', image: img19, title: 'Loft in Culver City', meta: '$742 for 2 nights', rating: 4.88 },
      { id: 'am3', image: img3, title: 'Apartment in Santa Monica', meta: '$980 for 2 nights', rating: 4.91, guestFavorite: true },
      { id: 'am4', image: img4, title: 'Apartment in Venice', meta: '$688 for 2 nights', rating: 4.79 },
      { id: 'am5', image: img13, title: 'Home in Malibu', meta: '$4,410 for 2 nights', rating: 4.97, guestFavorite: true },
      { id: 'am6', image: img9, title: 'Villa in Bel Air', meta: '$5,230 for 2 nights', rating: 5.0, guestFavorite: true },
      { id: 'am7', image: img7, title: 'Apartment in Pasadena', meta: '$556 for 2 nights', rating: 4.72 },
    ],
  },
  {
    id: 'stay-santa-monica',
    title: 'Stay in Santa Monica',
    listings: [
      { id: 'sm1', image: img16, title: 'Home in Santa Monica', meta: '$2,890 for 2 nights', rating: 4.93, guestFavorite: true },
      { id: 'sm2', image: img0, title: 'Apartment in Santa Monica', meta: '$720 for 2 nights', rating: 4.85 },
      { id: 'sm3', image: img11, title: 'Apartment in Brentwood', meta: '$910 for 2 nights', rating: 4.99, guestFavorite: true },
      { id: 'sm4', image: img5, title: 'Studio in Santa Monica', meta: '$540 for 2 nights', rating: 4.7 },
      { id: 'sm5', image: img18, title: 'Apartment in Westwood', meta: '$860 for 2 nights', rating: 4.9 },
      { id: 'sm6', image: img1, title: 'Home in Santa Monica', meta: '$1,640 for 2 nights', rating: 4.96, guestFavorite: true },
      { id: 'sm7', image: img12, title: 'Loft in Santa Monica', meta: '$1,180 for 2 nights', rating: 4.88 },
    ],
  },
];
