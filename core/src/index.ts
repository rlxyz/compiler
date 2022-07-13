import { Layers } from './x/layers';
import { LayerElement, GeneSequence, CanvasRenderObject, LayerConfig, ImageFormatConfig, BuildConfig } from './types';

// export { BuildConfig, ImageFormatConfig, LayerConfig, Layers, LayerElement, GeneSequence, CanvasRenderObject };

const layerConfig: LayerConfig[] = [
  {
    name: '1. Background',
    metadata: true,
    traits: [
      {
        name: 'Prism',
        weight: 10,
      },
      {
        name: 'Future-Past',
        weight: 15,
      },
      {
        name: 'The-Deep',
        weight: 22,
      },
      {
        name: 'Firestorm',
        weight: 25,
      },
      {
        name: 'Galaxy',
        weight: 35,
      },
      {
        name: 'Cloudy',
        weight: 40,
      },
      {
        name: 'Carnage-Yellow',
        weight: 50,
      },
      {
        name: 'Carnage-Dark-Grey',
        weight: 50,
      },
      {
        name: 'Carnage-Blue',
        weight: 50,
      },
      {
        name: 'Carnage-Purple',
        weight: 50,
      },
      {
        name: 'Carnage-Pink',
        weight: 50,
      },
      {
        name: 'Carnage',
        weight: 50,
      },
    ],
  },
  {
    name: '2. Scenery',
    metadata: true,
    traits: [
      {
        name: 'Blister-Pack',
        weight: 8,
      },
      {
        name: 'Inferno',
        weight: 10,
      },
      {
        name: 'Invader',
        weight: 23,
      },
      {
        name: 'STOP ALL HUMANS',
        weight: 25,
      },
      {
        name: 'LABYRINTH',
        weight: 30,
      },
      {
        name: 'Bubbles',
        weight: 35,
      },
      {
        name: 'LEVATRON',
        weight: 60,
      },
      {
        name: 'NONE',
        weight: 325,
      },
    ],
  },
  {
    name: '3. Clamps',
    metadata: true,
    traits: [
      {
        name: 'Golden-Triple-Clamps',
        weight: 10,
      },
      {
        name: 'Electric-Clamps',
        weight: 15,
      },
      {
        name: 'TRIPLE CLAMPS CHROME',
        weight: 20,
      },
      {
        name: 'TRIPLE CLAMPS GREY',
        weight: 40,
      },
      {
        name: 'TRIPLE CLAMPS',
        weight: 40,
      },
      {
        name: 'CHROME CLAMPS',
        weight: 40,
      },
      {
        name: 'GREY CLAMPS',
        weight: 50,
      },
      {
        name: 'OG',
        weight: 50,
      },
    ],
  },
  {
    name: '4. Accessories',
    metadata: true,
    traits: [
      {
        name: 'Parasite-Pet',
        weight: 10,
      },
      {
        name: 'Archangle',
        weight: 15,
      },
      {
        name: 'Goldenrods',
        weight: 17,
      },
      {
        name: 'Cape',
        weight: 20,
      },
      {
        name: 'HYDRO CABLES',
        weight: 40,
      },
      {
        name: 'SIRUM CABLES',
        weight: 40,
      },
      {
        name: 'BLOOD BANK',
        weight: 40,
      },
      {
        name: 'SUPPLY CABLES',
        weight: 50,
      },
      {
        name: 'Old Fashioned',
        weight: 50,
      },
      {
        name: 'Power Cords',
        weight: 50,
      },
      {
        name: 'NONE',
        weight: 300,
      },
    ],
  },
  {
    name: '5. Arms',
    metadata: true,
    traits: [
      {
        name: 'Maglev-Ultra',
        weight: 10,
      },
      {
        name: 'Maglev',
        weight: 15,
      },
      {
        name: 'GOLDEN ARMS',
        weight: 20,
      },
      {
        name: 'PLASMA ARMS',
        weight: 20,
      },
      {
        name: 'HYDRO ARMS',
        weight: 20,
      },
      {
        name: 'DOUBLE CARAMEL BRANDED',
        weight: 25,
      },
      {
        name: 'PINK BRANDED',
        weight: 25,
      },
      {
        name: 'BLUE BRANDED',
        weight: 25,
      },
      {
        name: 'DOUBLE CARAMEL',
        weight: 50,
      },
      {
        name: 'CARAMEL',
        weight: 50,
      },
      {
        name: 'PINK',
        weight: 50,
      },
      {
        name: 'BLUE',
        weight: 50,
      },
      {
        name: 'OG DARK',
        weight: 50,
      },
      {
        name: 'OG',
        weight: 50,
      },
    ],
  },
  {
    name: '6. Gloves',
    metadata: true,
    traits: [
      {
        name: 'Firestorm',
        weight: 10,
      },
      {
        name: 'Copper-Fire',
        weight: 11,
      },
      {
        name: 'GOLDEN GLOVES',
        weight: 15,
      },
      {
        name: 'ROAD WARRIOR',
        weight: 20,
      },
      {
        name: 'PRISM',
        weight: 40,
      },
      {
        name: 'TRIPPY',
        weight: 40,
      },
      {
        name: 'Armour Gloves',
        weight: 38,
      },
      {
        name: 'KISS GLOVES',
        weight: 40,
      },
      {
        name: 'SPECKLE CARAMEL GLOVES',
        weight: 50,
      },
      {
        name: 'SPECKLE PINK GLOVES',
        weight: 50,
      },
      {
        name: 'SPECKLE BLUE GLOVES',
        weight: 50,
      },
      {
        name: 'SPECKLE DARKNESS GLOVES',
        weight: 50,
      },
      {
        name: 'SPECKLE OG GLOVES',
        weight: 50,
      },
      {
        name: 'BLACK GLOVES',
        weight: 50,
      },
      {
        name: 'NONE',
        weight: 100,
      },
    ],
  },
  {
    name: '7. Shoulder',
    metadata: true,
    traits: [
      {
        name: 'PET PARASITE',
        weight: 10,
      },
      {
        name: 'INSECTICIDE',
        weight: 15,
      },
      {
        name: 'CANNONS',
        weight: 19,
      },
      {
        name: 'LIQUID SWORDS',
        weight: 20,
      },
      {
        name: 'REAPER',
        weight: 22,
      },
      {
        name: 'SHELLSHOCK',
        weight: 24,
      },
      {
        name: 'GHOSTING',
        weight: 25,
      },
      {
        name: '8 BALL',
        weight: 30,
      },
      {
        name: 'PRISM',
        weight: 33,
      },
      {
        name: 'TRIPPY',
        weight: 34,
      },
      {
        name: 'MIDSUMMER NIGHT',
        weight: 35,
      },
      {
        name: 'ROAD WARRIOR',
        weight: 36,
      },
      {
        name: 'ARMOURED',
        weight: 40,
      },
      {
        name: 'KISS',
        weight: 45,
      },
      {
        name: 'SPECKLE CARAMEL',
        weight: 50,
      },
      {
        name: 'SPECKLE PINK',
        weight: 50,
      },
      {
        name: 'SPECKLE BLUE',
        weight: 50,
      },
      {
        name: 'SPECKLE DARKNESS',
        weight: 50,
      },
      {
        name: 'SPECKLE OG',
        weight: 50,
      },
    ],
  },
  {
    name: '8. Body',
    metadata: true,
    traits: [
      {
        name: 'PRISM',
        weight: 10,
      },
      {
        name: 'TRIPPY',
        weight: 15,
      },
      {
        name: 'MIDSUMMER NIGHT',
        weight: 19,
      },
      {
        name: 'BALMY MORNING',
        weight: 20,
      },
      {
        name: 'KISS',
        weight: 22,
      },
      {
        name: 'CHROME',
        weight: 24,
      },
      {
        name: 'BURNT OUT',
        weight: 25,
      },
      {
        name: 'Camo',
        weight: 28,
      },
      {
        name: 'GRAFFITI BOT CARAMEL',
        weight: 30,
      },
      {
        name: 'GRAFFITI BOT PINK',
        weight: 30,
      },
      {
        name: 'GRAFFITI BOT BLUE',
        weight: 30,
      },
      {
        name: 'GRAFFITI BOT',
        weight: 30,
      },
      {
        name: 'YO CARAMEL',
        weight: 40,
      },
      {
        name: 'YO PINK',
        weight: 40,
      },
      {
        name: 'YO BLUE',
        weight: 40,
      },
      {
        name: 'YO DARKNESS',
        weight: 40,
      },
      {
        name: 'YO OG',
        weight: 40,
      },
      {
        name: 'SPECKLE CARAMEL',
        weight: 45,
      },
      {
        name: 'SPECKLE PINK',
        weight: 45,
      },
      {
        name: 'SPECKLE BLUE',
        weight: 45,
      },
      {
        name: 'SPECKLE DARKNESS',
        weight: 45,
      },
      {
        name: 'SPECKLE OG',
        weight: 45,
      },
    ],
  },
  {
    name: '9. Body Accessories',
    metadata: true,
    traits: [
      {
        name: 'TREASURE 4',
        weight: 8,
      },
      {
        name: 'TREASURE 3',
        weight: 8,
      },
      {
        name: 'TREASURE 2',
        weight: 8,
      },
      {
        name: 'TREASURE 1',
        weight: 8,
      },
      {
        name: 'SHATTER',
        weight: 15,
      },
      {
        name: 'TRAUMA',
        weight: 21,
      },
      {
        name: 'BONE COLLECTOR',
        weight: 25,
      },
      {
        name: 'WORLD CHAMPION',
        weight: 26,
      },
      {
        name: 'ZOMBIE',
        weight: 30,
      },
      {
        name: 'HAND CANNON',
        weight: 31,
      },
      {
        name: 'STOP ALL HUMANS',
        weight: 32,
      },
      {
        name: 'ALL EYES ON YOU',
        weight: 35,
      },
      {
        name: 'BROKEN',
        weight: 40,
      },
      {
        name: 'CHAINED',
        weight: 41,
      },
      {
        name: 'PLASMA',
        weight: 42,
      },
      {
        name: '1992 Golden',
        weight: 43,
      },
      {
        name: '1992',
        weight: 45,
      },
      {
        name: 'Power Plasma',
        weight: 46,
      },
      {
        name: 'Yo',
        weight: 47,
      },
      {
        name: 'TARZAN',
        weight: 48,
      },
      {
        name: 'NONE',
        weight: 100,
      },
    ],
  },
  {
    name: '10. Head Detail',
    metadata: true,
    traits: [
      {
        name: 'MARV',
        weight: 10,
      },
      {
        name: 'BARS',
        weight: 12,
      },
      {
        name: 'WARRIOR',
        weight: 14,
      },
      {
        name: 'ELITE SENSORS',
        weight: 15,
      },
      {
        name: 'SENSORS',
        weight: 20,
      },
      {
        name: '1992',
        weight: 25,
      },
      {
        name: 'NELLY',
        weight: 30,
      },
      {
        name: 'TRAUMA',
        weight: 35,
      },
      {
        name: 'SCARS',
        weight: 50,
      },
      {
        name: 'NONE',
        weight: 150,
      },
    ],
  },
  {
    name: '11. Mouth',
    metadata: true,
    traits: [
      {
        name: 'RAINBOW GRILLZ',
        weight: 10,
      },
      {
        name: 'GOLD GRILLZ',
        weight: 11,
      },
      {
        name: 'EVERLASTING',
        weight: 14,
      },
      {
        name: 'PIZZA REPLICA GOLD',
        weight: 15,
      },
      {
        name: 'PIZZA REPLICA',
        weight: 20,
      },
      {
        name: 'PIZZA',
        weight: 21,
      },
      {
        name: 'DONUT REPLICA',
        weight: 25,
      },
      {
        name: 'DONUT',
        weight: 26,
      },
      {
        name: 'OCTOBOT',
        weight: 30,
      },
      {
        name: 'CHEESE',
        weight: 31,
      },
      {
        name: 'SHOOK',
        weight: 32,
      },
      {
        name: 'ROBOSHOUT',
        weight: 35,
      },
      {
        name: 'SCREAM',
        weight: 40,
      },
      {
        name: 'WHAT',
        weight: 41,
      },
      {
        name: 'SMILE',
        weight: 45,
      },
      {
        name: 'ROBOSMIRK',
        weight: 46,
      },
      {
        name: 'ROBOGRIN',
        weight: 47,
      },
    ],
  },
  {
    name: '12. Eyes',
    metadata: true,
    traits: [
      {
        name: 'RAINBOW VISION',
        weight: 10,
      },
      {
        name: 'LASER',
        weight: 12,
      },
      {
        name: 'ETH',
        weight: 25,
      },
      {
        name: 'POSSESSED',
        weight: 30,
      },
      {
        name: 'WATERWORLD',
        weight: 31,
      },
      {
        name: 'LEMONAID',
        weight: 32,
      },
      {
        name: 'PORTAL',
        weight: 35,
      },
      {
        name: 'SADNESS',
        weight: 36,
      },
      {
        name: 'TIRED',
        weight: 38,
      },
      {
        name: 'LED',
        weight: 40,
      },
      {
        name: 'CATEYEZ',
        weight: 42,
      },
      {
        name: 'APOCALYPSE',
        weight: 44,
      },
      {
        name: 'X',
        weight: 46,
      },
      {
        name: 'VIZORRR',
        weight: 48,
      },
      {
        name: 'MEDICATED',
        weight: 50,
      },
      {
        name: 'CRY ME A RIVER',
        weight: 51,
      },
      {
        name: 'SCANNING',
        weight: 55,
      },
      {
        name: 'BLUE PUPILL',
        weight: 56,
      },
      {
        name: 'RED PUPILL',
        weight: 58,
      },
      {
        name: 'SCUBA GOLD',
        weight: 60,
      },
      {
        name: 'SCUBA',
        weight: 70,
      },
    ],
  },
  {
    name: '13. Head Accessories',
    metadata: true,
    traits: [
      {
        name: 'GOLDEN MC',
        weight: 10,
      },
      {
        name: 'DOOMED',
        weight: 12,
      },
      {
        name: 'ROYALS',
        weight: 25,
      },
      {
        name: 'LEONIDIS',
        weight: 30,
      },
      {
        name: 'FORREST GENERAL',
        weight: 31,
      },
      {
        name: 'GENERAL',
        weight: 32,
      },
      {
        name: 'STAY ROBO',
        weight: 35,
      },
      {
        name: 'WARRIOR',
        weight: 36,
      },
      {
        name: 'PARASITE BRAIN',
        weight: 38,
      },
      {
        name: 'BRAINIAC',
        weight: 40,
      },
      {
        name: 'SPLIT',
        weight: 41,
      },
      {
        name: 'SPRAYCAN',
        weight: 42,
      },
      {
        name: 'GUMBALL',
        weight: 43,
      },
      {
        name: 'ROBOCAP',
        weight: 44,
      },
      {
        name: 'EVERYDAY',
        weight: 46,
      },
      {
        name: 'INFRABLUE BEANIE',
        weight: 50,
      },
      {
        name: 'INFRARED BEANIE',
        weight: 50,
      },
      {
        name: 'BLACK BEANIE',
        weight: 50,
      },
      {
        name: 'HORNS',
        weight: 55,
      },
      {
        name: 'HALO GOLD',
        weight: 60,
      },
      {
        name: 'HALO SILVER',
        weight: 63,
      },
      {
        name: 'HALO BRONZE',
        weight: 65,
      },
    ],
  },
];

const basePath = process.cwd();

const imageFormatConfig: ImageFormatConfig = { width: 1500, height: 1500, smoothing: false };

const layer: Layers = new Layers(layerConfig, imageFormatConfig, basePath, false, false);

layer.createRandomImages(5000);
