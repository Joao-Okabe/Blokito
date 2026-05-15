import type { ComponentProps } from 'react';
import type { ImageSourcePropType } from 'react-native';

import type MaterialIcons from '@expo/vector-icons/MaterialIcons';

export type BlockTone = {
  color: string;
  glow: string;
};

export type BlockImageSource = ImageSourcePropType;

export type BlockImageStyle = 'clean' | 'star' | 'bolt' | 'leaf' | 'gem';

export type BlokitoTheme = {
  id: string;
  name: string;
  price: number;
  description: string;
  accent: string;
  boardBackground: string;
  boardBorder: string;
  emptyCell: string;
  emptyCellDark: string;
  trayBackground: string;
  blockImage: BlockImageStyle;
  blockImages?: BlockImageSource[];
  blockIcon?: ComponentProps<typeof MaterialIcons>['name'];
  musicSource?: number;
  musicTitle?: string;
  palette: BlockTone[];
};

export const DEFAULT_THEME_ID = 'classic';

const POKEMON_BLOCK_IMAGES: BlockImageSource[] = [
  require('../assets/images/2.png'),
  require('../assets/images/3.png'),
  require('../assets/images/4.png'),
  require('../assets/images/5.png'),
  require('../assets/images/6.png'),
  require('../assets/images/7.png'),
];

const MINECRAFT_BLOCK_IMAGES: BlockImageSource[] = [
  require('../assets/images/8.png'),
  require('../assets/images/9.png'),
  require('../assets/images/10.png'),
  require('../assets/images/11.png'),
  require('../assets/images/12.png'),
  require('../assets/images/13.png'),
];

const EMOJI_BLOCK_IMAGES: BlockImageSource[] = [
  require('../assets/images/14.png'),
  require('../assets/images/15.png'),
  require('../assets/images/16.png'),
  require('../assets/images/17.png'),
  require('../assets/images/18.png'),
];

const SPONGEBOB_BLOCK_IMAGES: BlockImageSource[] = [
  require('../assets/images/19.png'),
  require('../assets/images/26.png'),
  require('../assets/images/27.png'),
  require('../assets/images/28.png'),
  require('../assets/images/29.png'),
  require('../assets/images/30.png'),
  require('../assets/images/31.png'),
];

const CAT_BLOCK_IMAGES: BlockImageSource[] = [
  require('../assets/images/20.png'),
  require('../assets/images/21.png'),
  require('../assets/images/22.png'),
  require('../assets/images/23.png'),
  require('../assets/images/24.png'),
  require('../assets/images/25.png'),
];

const CARD_BLOCK_IMAGES: BlockImageSource[] = [
  require('../assets/images/33.png'),
  require('../assets/images/34.png'),
  require('../assets/images/35.png'),
  require('../assets/images/36.png'),
  require('../assets/images/37.png'),
  require('../assets/images/38.png'),
];

const JUJUTSU_BLOCK_IMAGES: BlockImageSource[] = [
  require('../assets/images/39.png'),
  require('../assets/images/40.png'),
  require('../assets/images/41.png'),
  require('../assets/images/42.png'),
  require('../assets/images/43.png'),
  require('../assets/images/44.png'),
];

const MARVEL_BLOCK_IMAGES: BlockImageSource[] = [
  require('../assets/images/45.png'),
  require('../assets/images/46.png'),
  require('../assets/images/47.png'),
  require('../assets/images/48.png'),
  require('../assets/images/49.png'),
  require('../assets/images/50.png'),
];

const DC_BLOCK_IMAGES: BlockImageSource[] = [
  require('../assets/images/51.png'),
  require('../assets/images/52.png'),
  require('../assets/images/53.png'),
  require('../assets/images/54.png'),
  require('../assets/images/55.png'),
  require('../assets/images/56.png'),
];

const POCOYO_BLOCK_IMAGES: BlockImageSource[] = [
  require('../assets/images/57.png'),
  require('../assets/images/58.png'),
  require('../assets/images/59.png'),
  require('../assets/images/60.png'),
  require('../assets/images/61.png'),
  require('../assets/images/62.png'),
];

const FOOD_BLOCK_IMAGES: BlockImageSource[] = [
  require('../assets/images/63.png'),
  require('../assets/images/64.png'),
  require('../assets/images/65.png'),
  require('../assets/images/66.png'),
  require('../assets/images/67.png'),
  require('../assets/images/68.png'),
];

const SINGER_BLOCK_IMAGES: BlockImageSource[] = [
  require('../assets/images/69.png'),
  require('../assets/images/70.png'),
  require('../assets/images/71.png'),
  require('../assets/images/72.png'),
  require('../assets/images/73.png'),
  require('../assets/images/74.png'),
];

export const BLOKITO_THEMES: BlokitoTheme[] = [
  {
    id: DEFAULT_THEME_ID,
    name: 'Clássico',
    price: 0,
    description: 'Cores limpas e tabuleiro original.',
    accent: '#31D6C4',
    boardBackground: '#CED8E5',
    boardBorder: '#AAB8CA',
    emptyCell: '#E8EDF4',
    emptyCellDark: '#222832',
    trayBackground: '#FFFFFF',
    blockImage: 'clean',
    palette: [
      { color: '#31D6C4', glow: '#B9FFF5' },
      { color: '#FF6B6B', glow: '#FFD0D0' },
      { color: '#FFCE52', glow: '#FFF1B7' },
      { color: '#74D65F', glow: '#D9FFD0' },
      { color: '#A87CFF', glow: '#E7DAFF' },
      { color: '#F35BB2', glow: '#FFD3ED' },
      { color: '#4D9BFF', glow: '#D2E8FF' },
    ],
  },
  {
    id: 'adventure',
    name: 'Aventura Pixel',
    price: 450,
    description: 'Blocos com estrelas, cores vivas e música de aventura.',
    accent: '#F59E0B',
    boardBackground: '#263244',
    boardBorder: '#FBBF24',
    emptyCell: '#F4E6C8',
    emptyCellDark: '#1D2635',
    trayBackground: '#FFF7E6',
    blockImage: 'star',
    blockIcon: 'star',
    musicSource: require('../assets/sounds/pokemon_song_theme.mp3'),
    musicTitle: 'Tema de aventura',
    palette: [
      { color: '#F97316', glow: '#FED7AA' },
      { color: '#FACC15', glow: '#FEF08A' },
      { color: '#22C55E', glow: '#BBF7D0' },
      { color: '#38BDF8', glow: '#BAE6FD' },
      { color: '#FB7185', glow: '#FFE4E6' },
      { color: '#A855F7', glow: '#E9D5FF' },
      { color: '#14B8A6', glow: '#CCFBF1' },
    ],
  },
  {
    id: 'neon',
    name: 'Neon Noturno',
    price: 700,
    description: 'Peças elétricas, contraste forte e trilha arcade.',
    accent: '#22D3EE',
    boardBackground: '#111827',
    boardBorder: '#22D3EE',
    emptyCell: '#1F2937',
    emptyCellDark: '#101721',
    trayBackground: '#151B2C',
    blockImage: 'bolt',
    blockIcon: 'bolt',
    musicSource: require('../assets/sounds/pokemon_song_theme.mp3'),
    musicTitle: 'Arcade noturno',
    palette: [
      { color: '#22D3EE', glow: '#A5F3FC' },
      { color: '#F472B6', glow: '#FBCFE8' },
      { color: '#A3E635', glow: '#D9F99D' },
      { color: '#818CF8', glow: '#C7D2FE' },
      { color: '#FDE047', glow: '#FEF9C3' },
      { color: '#FB923C', glow: '#FED7AA' },
      { color: '#34D399', glow: '#A7F3D0' },
    ],
  },
  {
    id: 'pokemon',
    name: 'Pokémon',
    price: 900,
    description: 'Por que não jogar com esses tão amados monstrinhos?',
    accent: '#16A34A',
    boardBackground: '#D1E7D4',
    boardBorder: '#65A30D',
    emptyCell: '#EEF7ED',
    emptyCellDark: '#16251C',
    trayBackground: '#F7FCEE',
    blockImage: 'leaf',
    blockImages: POKEMON_BLOCK_IMAGES,
    blockIcon: 'local-florist',
    musicSource: require('../assets/sounds/pokemon_song_theme.mp3'),
    musicTitle: 'Jardim tranquilo',
    palette: [
      { color: '#16A34A', glow: '#BBF7D0' },
      { color: '#84CC16', glow: '#D9F99D' },
      { color: '#06B6D4', glow: '#CFFAFE' },
      { color: '#F97316', glow: '#FED7AA' },
      { color: '#E879F9', glow: '#F5D0FE' },
      { color: '#FBBF24', glow: '#FEF3C7' },
      { color: '#2DD4BF', glow: '#CCFBF1' },
    ],
  },
  {
    id: 'emoji',
    name: 'Emoji',
    price: 900,
    description: 'Apesar do filme não ser tão lembrado, ainda é muito bom',
    accent: '#16A34A',
    boardBackground: '#D1E7D4',
    boardBorder: '#65A30D',
    emptyCell: '#EEF7ED',
    emptyCellDark: '#16251C',
    trayBackground: '#F7FCEE',
    blockImage: 'leaf',
    blockImages: EMOJI_BLOCK_IMAGES,
    blockIcon: 'local-florist',
    musicSource: require('@/assets/sounds/Emojis.mp3'),
    musicTitle: 'Jardim tranquilo',
    palette: [
      { color: '#16A34A', glow: '#BBF7D0' },
      { color: '#84CC16', glow: '#D9F99D' },
      { color: '#06B6D4', glow: '#CFFAFE' },
      { color: '#F97316', glow: '#FED7AA' },
      { color: '#E879F9', glow: '#F5D0FE' },
      { color: '#FBBF24', glow: '#FEF3C7' },
      { color: '#2DD4BF', glow: '#CCFBF1' },
    ],
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    price: 900,
    description: 'O jogo mais amado do mundo e mais quadrado também',
    accent: '#16A34A',
    boardBackground: '#D1E7D4',
    boardBorder: '#65A30D',
    emptyCell: '#EEF7ED',
    emptyCellDark: '#16251C',
    trayBackground: '#F7FCEE',
    blockImage: 'leaf',
    blockImages: MINECRAFT_BLOCK_IMAGES,
    blockIcon: 'local-florist',
    musicSource: require('@/assets/sounds/Mine.mp3'),
    musicTitle: 'Jardim tranquilo',
    palette: [
      { color: '#16A34A', glow: '#BBF7D0' },
      { color: '#84CC16', glow: '#D9F99D' },
      { color: '#06B6D4', glow: '#CFFAFE' },
      { color: '#F97316', glow: '#FED7AA' },
      { color: '#E879F9', glow: '#F5D0FE' },
      { color: '#FBBF24', glow: '#FEF3C7' },
      { color: '#2DD4BF', glow: '#CCFBF1' },
    ],
  },
  {
    id: 'gato',
    name: 'Gatos',
    price: 900,
    description: 'O felino mais amado e fofo da terra',
    accent: '#16A34A',
    boardBackground: '#D1E7D4',
    boardBorder: '#65A30D',
    emptyCell: '#EEF7ED',
    emptyCellDark: '#16251C',
    trayBackground: '#F7FCEE',
    blockImage: 'leaf',
    blockImages: CAT_BLOCK_IMAGES,
    blockIcon: 'local-florist',
    musicSource: require('../assets/sounds/Meaw-meaw-triste.mp3'),
    musicTitle: 'Jardim tranquilo',
    palette: [
      { color: '#16A34A', glow: '#BBF7D0' },
      { color: '#84CC16', glow: '#D9F99D' },
      { color: '#06B6D4', glow: '#CFFAFE' },
      { color: '#F97316', glow: '#FED7AA' },
      { color: '#E879F9', glow: '#F5D0FE' },
      { color: '#FBBF24', glow: '#FEF3C7' },
      { color: '#2DD4BF', glow: '#CCFBF1' },
    ],
  },
  {
    id: 'bob_esponja',
    name: 'Bob Esponja',
    price: 900,
    description: 'Da para ouvir a risada daqui',
    accent: '#16A34A',
    boardBackground: '#D1E7D4',
    boardBorder: '#65A30D',
    emptyCell: '#EEF7ED',
    emptyCellDark: '#16251C',
    trayBackground: '#F7FCEE',
    blockImage: 'leaf',
    blockImages: SPONGEBOB_BLOCK_IMAGES,
    blockIcon: 'local-florist',
    musicSource: require('../assets/sounds/Bob-esponja.mp3'),
    musicTitle: 'Jardim tranquilo',
    palette: [
      { color: '#16A34A', glow: '#BBF7D0' },
      { color: '#84CC16', glow: '#D9F99D' },
      { color: '#06B6D4', glow: '#CFFAFE' },
      { color: '#F97316', glow: '#FED7AA' },
      { color: '#E879F9', glow: '#F5D0FE' },
      { color: '#FBBF24', glow: '#FEF3C7' },
      { color: '#2DD4BF', glow: '#CCFBF1' },
    ],
  },
  {
    id: 'baralho',
    name: 'Baralho',
    price: 900,
    description: 'Pede 6, pede',
    accent: '#16A34A',
    boardBackground: '#D1E7D4',
    boardBorder: '#65A30D',
    emptyCell: '#EEF7ED',
    emptyCellDark: '#16251C',
    trayBackground: '#F7FCEE',
    blockImage: 'leaf',
    blockImages: CARD_BLOCK_IMAGES,
    blockIcon: 'local-florist',
    musicSource: require('../assets/sounds/Naipes.mp3'),
    musicTitle: 'Jardim tranquilo',
    palette: [
      { color: '#16A34A', glow: '#BBF7D0' },
      { color: '#84CC16', glow: '#D9F99D' },
      { color: '#06B6D4', glow: '#CFFAFE' },
      { color: '#F97316', glow: '#FED7AA' },
      { color: '#E879F9', glow: '#F5D0FE' },
      { color: '#FBBF24', glow: '#FEF3C7' },
      { color: '#2DD4BF', glow: '#CCFBF1' },
    ],
  },
  {
    id: 'jujutsu_kaisen',
    name: 'Jujutsu Kaisen',
    price: 900,
    description: 'Ryōiki Tenkai: Fukuma Mizushi',
    accent: '#16A34A',
    boardBackground: '#D1E7D4',
    boardBorder: '#65A30D',
    emptyCell: '#EEF7ED',
    emptyCellDark: '#16251C',
    trayBackground: '#F7FCEE',
    blockImage: 'leaf',
    blockImages: JUJUTSU_BLOCK_IMAGES,
    blockIcon: 'local-florist',
    musicSource: require('../assets/sounds/JJK.mp3'),
    musicTitle: 'Jardim tranquilo',
    palette: [
      { color: '#16A34A', glow: '#BBF7D0' },
      { color: '#84CC16', glow: '#D9F99D' },
      { color: '#06B6D4', glow: '#CFFAFE' },
      { color: '#F97316', glow: '#FED7AA' },
      { color: '#E879F9', glow: '#F5D0FE' },
      { color: '#FBBF24', glow: '#FEF3C7' },
      { color: '#2DD4BF', glow: '#CCFBF1' },
    ],
  },
  {
    id: 'marvel_heroes',
    name: 'Heróis da Marvel',
    price: 900,
    description: 'Vingadores, avante!',
    accent: '#16A34A',
    boardBackground: '#D1E7D4',
    boardBorder: '#65A30D',
    emptyCell: '#EEF7ED',
    emptyCellDark: '#16251C',
    trayBackground: '#F7FCEE',
    blockImage: 'leaf',
    blockImages: MARVEL_BLOCK_IMAGES,
    blockIcon: 'local-florist',
    musicSource: require('../assets/sounds/Vingadores.mp3'),
    musicTitle: 'Jardim tranquilo',
    palette: [
      { color: '#16A34A', glow: '#BBF7D0' },
      { color: '#84CC16', glow: '#D9F99D' },
      { color: '#06B6D4', glow: '#CFFAFE' },
      { color: '#F97316', glow: '#FED7AA' },
      { color: '#E879F9', glow: '#F5D0FE' },
      { color: '#FBBF24', glow: '#FEF3C7' },
      { color: '#2DD4BF', glow: '#CCFBF1' },
    ],
  },
  {
    id: 'dc_heroes',
    name: 'Heróis da DC',
    price: 900,
    description: 'Você sangra?',
    accent: '#16A34A',
    boardBackground: '#D1E7D4',
    boardBorder: '#65A30D',
    emptyCell: '#EEF7ED',
    emptyCellDark: '#16251C',
    trayBackground: '#F7FCEE',
    blockImage: 'leaf',
    blockImages: DC_BLOCK_IMAGES,
    blockIcon: 'local-florist',
    musicSource: require('../assets/sounds/DC.mp3'),
    musicTitle: 'Jardim tranquilo',
    palette: [
      { color: '#16A34A', glow: '#BBF7D0' },
      { color: '#84CC16', glow: '#D9F99D' },
      { color: '#06B6D4', glow: '#CFFAFE' },
      { color: '#F97316', glow: '#FED7AA' },
      { color: '#E879F9', glow: '#F5D0FE' },
      { color: '#FBBF24', glow: '#FEF3C7' },
      { color: '#2DD4BF', glow: '#CCFBF1' },
    ],
  },
  {
    id: 'cantores_brasileiros',
    name: 'Cantores Famosos',
    price: 900,
    description: 'Joelma?',
    accent: '#16A34A',
    boardBackground: '#D1E7D4',
    boardBorder: '#65A30D',
    emptyCell: '#EEF7ED',
    emptyCellDark: '#16251C',
    trayBackground: '#F7FCEE',
    blockImage: 'leaf',
    blockImages: SINGER_BLOCK_IMAGES,
    blockIcon: 'local-florist',
    musicSource: require('../assets/sounds/cantores.mp3'),
    musicTitle: 'Jardim tranquilo',
    palette: [
      { color: '#16A34A', glow: '#BBF7D0' },
      { color: '#84CC16', glow: '#D9F99D' },
      { color: '#06B6D4', glow: '#CFFAFE' },
      { color: '#F97316', glow: '#FED7AA' },
      { color: '#E879F9', glow: '#F5D0FE' },
      { color: '#FBBF24', glow: '#FEF3C7' },
      { color: '#2DD4BF', glow: '#CCFBF1' },
    ],
  },
  {
    id: 'comida',
    name: 'Comidas',
    price: 900,
    description: 'A boca chega saliva',
    accent: '#16A34A',
    boardBackground: '#D1E7D4',
    boardBorder: '#65A30D',
    emptyCell: '#EEF7ED',
    emptyCellDark: '#16251C',
    trayBackground: '#F7FCEE',
    blockImage: 'leaf',
    blockImages: FOOD_BLOCK_IMAGES,
    blockIcon: 'local-florist',
    musicSource: require('../assets/sounds/Comidas.mp3'),
    musicTitle: 'Jardim tranquilo',
    palette: [
      { color: '#16A34A', glow: '#BBF7D0' },
      { color: '#84CC16', glow: '#D9F99D' },
      { color: '#06B6D4', glow: '#CFFAFE' },
      { color: '#F97316', glow: '#FED7AA' },
      { color: '#E879F9', glow: '#F5D0FE' },
      { color: '#FBBF24', glow: '#FEF3C7' },
      { color: '#2DD4BF', glow: '#CCFBF1' },
    ],
  },
  {
    id: 'pocoyo',
    name: 'Pocoyo',
    price: 900,
    description: 'Apesar deles não falarem nada, o pato tem jingado',
    accent: '#16A34A',
    boardBackground: '#D1E7D4',
    boardBorder: '#65A30D',
    emptyCell: '#EEF7ED',
    emptyCellDark: '#16251C',
    trayBackground: '#F7FCEE',
    blockImage: 'leaf',
    blockImages: POCOYO_BLOCK_IMAGES,
    blockIcon: 'local-florist',
    musicSource: require('../assets/sounds/Pocoyo.mp3'),
    musicTitle: 'Jardim tranquilo',
    palette: [
      { color: '#16A34A', glow: '#BBF7D0' },
      { color: '#84CC16', glow: '#D9F99D' },
      { color: '#06B6D4', glow: '#CFFAFE' },
      { color: '#F97316', glow: '#FED7AA' },
      { color: '#E879F9', glow: '#F5D0FE' },
      { color: '#FBBF24', glow: '#FEF3C7' },
      { color: '#2DD4BF', glow: '#CCFBF1' },
    ],
  },
];

export function getBlokitoTheme(themeId: string) {
  return BLOKITO_THEMES.find((theme) => theme.id === themeId) ?? BLOKITO_THEMES[0];
}
