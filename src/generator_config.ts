import { BuildConfig, ImageFormatConfig, LayerConfig, GeneratorConfig } from './old_index';

const basePath = process.cwd();

const buildConfig: BuildConfig = {
  basePath: basePath,
  invocations: 2,
  rarityDelimiter: '#',
  saveImage: false,
  geneDelimiter: '-',
};

const imageFormatConfig: ImageFormatConfig = {
  width: 843,
  height: 1191,
  smoothing: false,
};

const layerConfig: LayerConfig[] = [
  {
    name: 'Base',
    traits: [
      {
        name: 'White Base-01.png',
        weight: 1000,
      },
    ],
  },
  {
    name: 'Skin',
    metadata: true,
    traits: [
      {
        name: '1. Terminator',
        weight: 3,
        link: [
          {
            name: 'Fighting Stance.png',
            weight: 120,
          },
          {
            name: 'Fury.png',
            weight: 50,
          },
          {
            name: 'Leap.png',
            weight: 50,
          },
          {
            name: 'Lurking.png',
            weight: 100,
          },
          {
            name: 'Majestic.png',
            weight: 50,
          },
          {
            name: 'Rage.png',
            weight: 130,
          },
          {
            name: 'Roar.png',
            weight: 110,
          },
          {
            name: 'Strike.png',
            weight: 50,
          },
          {
            name: 'Supreme.png',
            weight: 220,
          },
          {
            name: 'Yawn.png',
            weight: 120,
          },
        ],
      },
      {
        name: '2. Jade',
        weight: 25,
      },
      {
        name: '3. Water',
        weight: 28,
      },
      {
        name: '4. Silver',
        weight: 83,
      },
      {
        name: '5. Trippy',
        weight: 7,
        link: [
          {
            name: 'Alert.png',
            weight: 110,
          },
          {
            name: 'Covert.png',
            weight: 110,
          },
          {
            name: 'Fighting Stance.png',
            weight: 60,
          },
          {
            name: 'Fury.png',
            weight: 40,
          },
          {
            name: 'Leap.png',
            weight: 40,
          },
          {
            name: 'Lurking.png',
            weight: 50,
          },
          {
            name: 'Majestic.png',
            weight: 40,
          },
          {
            name: 'Mighty.png',
            weight: 80,
          },
          {
            name: 'Rage.png',
            weight: 60,
          },
          {
            name: 'Roar.png',
            weight: 50,
          },
          {
            name: 'Strike.png',
            weight: 40,
          },
          {
            name: 'Strong.png',
            weight: 90,
          },
          {
            name: 'Supreme.png',
            weight: 70,
          },
          {
            name: 'Swole.png',
            weight: 90,
          },
          {
            name: 'Yawn.png',
            weight: 70,
          },
        ],
      },
      {
        name: '6. Gold',
        weight: 13,
        link: [
          {
            name: 'Alert.png',
            weight: 90,
          },
          {
            name: 'Covert.png',
            weight: 90,
          },
          {
            name: 'Fighting Stance.png',
            weight: 50,
          },
          {
            name: 'Fury.png',
            weight: 40,
          },
          {
            name: 'Growl.png',
            weight: 100,
          },
          {
            name: 'Leap.png',
            weight: 40,
          },
          {
            name: 'Lurking.png',
            weight: 40,
          },
          {
            name: 'Majestic.png',
            weight: 40,
          },
          {
            name: 'Mighty.png',
            weight: 70,
          },
          {
            name: 'Rage.png',
            weight: 60,
          },
          {
            name: 'Roar.png',
            weight: 50,
          },
          {
            name: 'Strike.png',
            weight: 40,
          },
          {
            name: 'Strong.png',
            weight: 80,
          },
          {
            name: 'Supreme.png',
            weight: 70,
          },
          {
            name: 'Swole.png',
            weight: 80,
          },
          {
            name: 'Yawn.png',
            weight: 60,
          },
        ],
      },
      {
        name: '7. Noise',
        weight: 54,
      },
      {
        name: '8. Galaxy',
        weight: 10,
        link: [
          {
            name: 'Alert.png',
            weight: 110,
          },
          {
            name: 'Covert.png',
            weight: 110,
          },
          {
            name: 'Fighting Stance.png',
            weight: 60,
          },
          {
            name: 'Fury.png',
            weight: 40,
          },
          {
            name: 'Leap.png',
            weight: 40,
          },
          {
            name: 'Lurking.png',
            weight: 50,
          },
          {
            name: 'Majestic.png',
            weight: 40,
          },
          {
            name: 'Mighty.png',
            weight: 80,
          },
          {
            name: 'Rage.png',
            weight: 60,
          },
          {
            name: 'Roar.png',
            weight: 50,
          },
          {
            name: 'Strike.png',
            weight: 40,
          },
          {
            name: 'Strong.png',
            weight: 90,
          },
          {
            name: 'Supreme.png',
            weight: 70,
          },
          {
            name: 'Swole.png',
            weight: 90,
          },
          {
            name: 'Yawn.png',
            weight: 70,
          },
        ],
      },
      {
        name: '9. Blue',
        weight: 6,
        link: [
          {
            name: 'Fighting Stance.png',
            weight: 80,
          },
          {
            name: 'Fury.png',
            weight: 80,
          },
          {
            name: 'Leap.png',
            weight: 80,
          },
          {
            name: 'Lurking.png',
            weight: 100,
          },
          {
            name: 'Majestic.png',
            weight: 80,
          },
          {
            name: 'Rage.png',
            weight: 110,
          },
          {
            name: 'Roar.png',
            weight: 110,
          },
          {
            name: 'Strike.png',
            weight: 90,
          },
          {
            name: 'Supreme.png',
            weight: 120,
          },
          {
            name: 'Yawn.png',
            weight: 120,
          },
        ],
      },
      {
        name: '10. Armoured',
        weight: 58,
      },
      {
        name: '11. Standard',
        weight: 105,
      },
      {
        name: '12. Fire',
        weight: 43,
      },
      {
        name: '13. 3rd Eye',
        weight: 51,
      },
      {
        name: '14. Radioactive',
        weight: 39,
      },
      {
        name: '15. Stone',
        weight: 65,
      },
      {
        name: '16. Tan',
        weight: 88,
      },
      {
        name: '17. Pink',
        weight: 79,
      },
      {
        name: '18. Purple',
        weight: 71,
      },
      {
        name: '19. Dark Grey',
        weight: 73,
      },
      {
        name: '20. White',
        weight: 97,
      },
    ],
    linkName: 'Pose',
    link: [
      {
        name: 'Alert.png',
        weight: 31,
      },
      {
        name: 'Attentive.png',
        weight: 35,
      },
      {
        name: 'Aware.png',
        weight: 40,
      },
      {
        name: 'Calm.png',
        weight: 41,
      },
      {
        name: 'Covert.png',
        weight: 32,
      },
      {
        name: 'Fighting Stance.png',
        weight: 21,
      },
      {
        name: 'Fury.png',
        weight: 12,
      },
      {
        name: 'Growl.png',
        weight: 33,
      },
      {
        name: 'Leap.png',
        weight: 11,
      },
      {
        name: 'Lunging.png',
        weight: 42,
      },
      {
        name: 'Lurking.png',
        weight: 18,
      },
      {
        name: 'Majestic.png',
        weight: 9,
      },
      {
        name: 'Mighty.png',
        weight: 28,
      },
      {
        name: 'Parade.png',
        weight: 43,
      },
      {
        name: 'Peaceful.png',
        weight: 43,
      },
      {
        name: 'Pounce.png',
        weight: 43,
      },
      {
        name: 'Primed.png',
        weight: 46,
      },
      {
        name: 'Rage.png',
        weight: 23,
      },
      {
        name: 'Relaxed.png',
        weight: 48,
      },
      {
        name: 'Roar.png',
        weight: 20,
      },
      {
        name: 'Sit.png',
        weight: 50,
      },
      {
        name: 'Stealth.png',
        weight: 50,
      },
      {
        name: 'Strike.png',
        weight: 15,
      },
      {
        name: 'Strong.png',
        weight: 30,
      },
      {
        name: 'Supreme.png',
        weight: 25,
      },
      {
        name: 'Swift.png',
        weight: 50,
      },
      {
        name: 'Swole.png',
        weight: 30,
      },
      {
        name: 'The Claw.png',
        weight: 52,
      },
      {
        name: 'Vicious.png',
        weight: 54,
      },
      {
        name: 'Yawn.png',
        weight: 24,
      },
    ],
  },
  {
    name: 'Lucky Charms',
    metadata: true,
    traits: [
      {
        name: 'Cards.png',
        weight: 60,
      },
      {
        name: 'Dice.png',
        weight: 85,
      },
      {
        name: 'Fire Crackers.png',
        weight: 152.5,
      },
      {
        name: 'Koi Fish.png',
        weight: 122.5,
      },
      {
        name: 'Lotus.png',
        weight: 130,
      },
      {
        name: 'Mah Jong.png',
        weight: 100,
      },
      {
        name: 'Mandarin Oranges.png',
        weight: 160,
      },
      {
        name: 'Tea Pot.png',
        weight: 190,
      },
    ],
  },
  {
    name: 'Emblem',
    metadata: true,
    traits: [
      {
        name: 'Bonsai.png',
        weight: 112.5,
      },
      {
        name: 'Foo Dog.png',
        weight: 55,
      },
      {
        name: 'Lantern.png',
        weight: 90,
      },
      {
        name: 'Money Cat.png',
        weight: 45,
      },
      {
        name: 'Prosperity God.png',
        weight: 100,
      },
      {
        name: 'Chinese Coin.png',
        weight: 122.5,
      },
      {
        name: 'Lion Dance.png',
        weight: 60,
      },
      {
        name: 'Fortune.png',
        weight: 75,
      },
      {
        name: 'Peach.png',
        weight: 150,
      },
      {
        name: 'Ying Yang.png',
        weight: 190,
      },
    ],
  },
  {
    name: 'Frames',
    metadata: true,
    traits: [
      {
        name: 'Bamboo.png',
        weight: 90,
      },
      {
        name: 'Hibiscus.png',
        weight: 60,
      },
      {
        name: 'Clouds.png',
        weight: 100,
      },
      {
        name: 'Palm Tree.png',
        weight: 55,
      },
      {
        name: 'Scrolls.png',
        weight: 45,
      },
      {
        name: 'Swords.png',
        weight: 112.5,
      },
      {
        name: 'Cherry Blossom.png',
        weight: 122.5,
      },
      {
        name: 'Hibiscus.png',
        weight: 60,
      },
      {
        name: 'Rings.png',
        weight: 150,
      },
      {
        name: 'Swallows.png',
        weight: 190,
      },
      {
        name: 'Waves.png',
        weight: 75,
      },
    ],
  },
  {
    name: 'Tiger Beer',
    metadata: true,
    traits: [
      {
        name: '1932.png',
        weight: 40,
      },
      {
        name: '1953.png',
        weight: 65,
      },
      {
        name: '1961.png',
        weight: 85,
      },
      {
        name: '1970.png',
        weight: 100,
      },
      {
        name: '1998.png',
        weight: 120,
      },
      {
        name: '2005.png',
        weight: 140,
      },
      {
        name: '2016.png',
        weight: 175,
      },
      {
        name: '2022.png',
        weight: 225,
      },
    ],
  },
  {
    name: 'Texture',
    traits: [
      {
        name: 'Texture-01.png',
        weight: 1,
      },
    ],
  },
];

export { imageFormatConfig, buildConfig, layerConfig };
