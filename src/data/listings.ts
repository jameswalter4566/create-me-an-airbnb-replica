import l01 from '../assets/listings/l01.jpg';
import l02 from '../assets/listings/l02.jpg';
import l03 from '../assets/listings/l03.jpg';
import l04 from '../assets/listings/l04.jpg';
import l05 from '../assets/listings/l05.jpg';
import l06 from '../assets/listings/l06.jpg';
import l07 from '../assets/listings/l07.jpg';
import l08 from '../assets/listings/l08.jpg';
import l09 from '../assets/listings/l09.jpg';
import l10 from '../assets/listings/l10.jpg';
import l11 from '../assets/listings/l11.jpg';
import l12 from '../assets/listings/l12.jpg';
import l13 from '../assets/listings/l13.jpg';
import l14 from '../assets/listings/l14.jpg';
import l15 from '../assets/listings/l15.jpg';
import l16 from '../assets/listings/l16.jpg';
import l17 from '../assets/listings/l17.jpg';
import l18 from '../assets/listings/l18.jpg';
import l19 from '../assets/listings/l19.jpg';
import l20 from '../assets/listings/l20.jpg';
import l21 from '../assets/listings/l21.jpg';
import l22 from '../assets/listings/l22.jpg';
import l23 from '../assets/listings/l23.jpg';
import l24 from '../assets/listings/l24.jpg';
import l25 from '../assets/listings/l25.jpg';
import l26 from '../assets/listings/l26.jpg';
import l27 from '../assets/listings/l27.jpg';
import l28 from '../assets/listings/l28.jpg';
import l29 from '../assets/listings/l29.jpg';
import l30 from '../assets/listings/l30.jpg';

const pool = [
  l01, l02, l03, l04, l05, l06, l07, l08, l09, l10,
  l11, l12, l13, l14, l15, l16, l17, l18, l19, l20,
  l21, l22, l23, l24, l25, l26, l27, l28, l29, l30,
];

/** Returns `count` images from the pool starting at `start`, wrapping around. */
function pick(start: number, count = 5): string[] {
  return Array.from({ length: count }, (_, i) => pool[(start + i * 7) % pool.length]);
}

export type Listing = {
  id: string;
  images: string[];
  title: string;
  subtitle: string;
  rating?: number;
  badge?: string;
  showFeesNote?: boolean;
};

export type Section = {
  id: string;
  title: string;
  listings: Listing[];
};

export const sections: Section[] = [
  {
    id: 'recently-viewed',
    title: 'Recently viewed',
    listings: [
      { id: 'rv1', images: pick(0), title: 'Los Angeles', subtitle: '1 bed' },
      { id: 'rv2', images: pick(3), title: 'Marina del Rey', subtitle: '1 bed' },
      { id: 'rv3', images: pick(6), title: 'Los Angeles', subtitle: '2 beds', rating: 4.82 },
      { id: 'rv4', images: pick(9), title: 'Los Angeles', subtitle: '2 beds' },
      { id: 'rv5', images: pick(12), title: 'West Hollywood', subtitle: '2 beds' },
      { id: 'rv6', images: pick(15), title: 'West Hollywood', subtitle: '2 beds', rating: 4.0 },
      { id: 'rv7', images: pick(18), title: 'West Hollywood', subtitle: '5 beds', rating: 4.36 },
      { id: 'rv8', images: pick(21), title: 'Beverly Hills', subtitle: '3 beds', rating: 4.91 },
    ],
  },
  {
    id: 'popular-weho',
    title: 'Popular homes in West Hollywood',
    listings: [
      { id: 'ph1', images: pick(1), title: 'Apartment in Los Angeles', subtitle: '$809 for 2 nights', rating: 4.82 },
      { id: 'ph2', images: pick(4), title: 'Apartment in West Hollywood', subtitle: '$644 for 2 nights', rating: 5.0 },
      { id: 'ph3', images: pick(7), title: 'Apartment in Vernon', subtitle: '$1,156 for 2 nights', rating: 4.99, badge: 'Guest favorite' },
      { id: 'ph4', images: pick(10), title: 'Apartment in West Hollywood', subtitle: '$600 for 2 nights', rating: 5.0, badge: 'Guest favorite', showFeesNote: true },
      { id: 'ph5', images: pick(13), title: 'Villa in West Hollywood', subtitle: '$1,903 for 2 nights', rating: 4.97, badge: 'Guest favorite' },
      { id: 'ph6', images: pick(16), title: 'Home in West Hollywood', subtitle: '$2,656 for 2 nights', rating: 5.0, badge: 'Guest favorite' },
      { id: 'ph7', images: pick(19), title: 'Home in Los Angeles', subtitle: '$2,061 for 2 nights', rating: 4.89, badge: 'Guest favorite' },
      { id: 'ph8', images: pick(22), title: 'Loft in West Hollywood', subtitle: '$742 for 2 nights', rating: 4.85 },
    ],
  },
  {
    id: 'available-la',
    title: 'Available next month in Los Angeles',
    listings: [
      { id: 'al1', images: pick(2), title: 'Apartment in Los Angeles', subtitle: '$512 for 2 nights', rating: 4.78 },
      { id: 'al2', images: pick(5), title: 'Guesthouse in Los Angeles', subtitle: '$389 for 2 nights', rating: 4.93, badge: 'Guest favorite' },
      { id: 'al3', images: pick(8), title: 'Bungalow in Los Angeles', subtitle: '$465 for 2 nights', rating: 4.88 },
      { id: 'al4', images: pick(11), title: 'Condo in Downtown LA', subtitle: '$598 for 2 nights', rating: 4.71 },
      { id: 'al5', images: pick(14), title: 'Studio in Los Angeles', subtitle: '$333 for 2 nights', rating: 4.95, badge: 'Guest favorite' },
      { id: 'al6', images: pick(17), title: 'Home in Silver Lake', subtitle: '$877 for 2 nights', rating: 4.9 },
      { id: 'al7', images: pick(20), title: 'Apartment in Los Feliz', subtitle: '$540 for 2 nights', rating: 4.83 },
      { id: 'al8', images: pick(23), title: 'Cottage in Los Angeles', subtitle: '$612 for 2 nights', rating: 4.86 },
    ],
  },
  {
    id: 'santa-monica',
    title: 'Stay in Santa Monica',
    listings: [
      { id: 'sm1', images: pick(24), title: 'Apartment in Santa Monica', subtitle: '$720 for 2 nights', rating: 4.87 },
      { id: 'sm2', images: pick(27), title: 'Condo in Santa Monica', subtitle: '$965 for 2 nights', rating: 4.92, badge: 'Guest favorite' },
      { id: 'sm3', images: pick(0), title: 'Beach house in Santa Monica', subtitle: '$1,845 for 2 nights', rating: 4.98, badge: 'Guest favorite' },
      { id: 'sm4', images: pick(3), title: 'Loft in Santa Monica', subtitle: '$688 for 2 nights', rating: 4.8 },
      { id: 'sm5', images: pick(6), title: 'Studio near the pier', subtitle: '$430 for 2 nights', rating: 4.76 },
      { id: 'sm6', images: pick(9), title: 'Villa in Santa Monica', subtitle: '$2,310 for 2 nights', rating: 5.0, badge: 'Guest favorite' },
      { id: 'sm7', images: pick(12), title: 'Apartment near the beach', subtitle: '$795 for 2 nights', rating: 4.84 },
      { id: 'sm8', images: pick(15), title: 'Bungalow in Santa Monica', subtitle: '$910 for 2 nights', rating: 4.89 },
    ],
  },
  {
    id: 'malibu',
    title: 'Popular homes in Malibu',
    listings: [
      { id: 'mb1', images: pick(25), title: 'Villa in Malibu', subtitle: '$3,420 for 2 nights', rating: 5.0, badge: 'Guest favorite' },
      { id: 'mb2', images: pick(28), title: 'Home in Malibu', subtitle: '$2,780 for 2 nights', rating: 4.95, badge: 'Guest favorite' },
      { id: 'mb3', images: pick(1), title: 'Beachfront home in Malibu', subtitle: '$4,150 for 2 nights', rating: 4.97 },
      { id: 'mb4', images: pick(4), title: 'Cottage in Malibu', subtitle: '$1,290 for 2 nights', rating: 4.88 },
      { id: 'mb5', images: pick(7), title: 'Guesthouse in Malibu', subtitle: '$980 for 2 nights', rating: 4.9, badge: 'Guest favorite' },
      { id: 'mb6', images: pick(10), title: 'Apartment in Malibu', subtitle: '$1,120 for 2 nights', rating: 4.82 },
      { id: 'mb7', images: pick(13), title: 'Modern villa in Malibu', subtitle: '$5,600 for 2 nights', rating: 5.0, badge: 'Guest favorite' },
      { id: 'mb8', images: pick(16), title: 'Home above the coast', subtitle: '$2,240 for 2 nights', rating: 4.93 },
    ],
  },
];
