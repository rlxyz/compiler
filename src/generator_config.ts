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
    name: 'Tiger',
    traits: [
      {
        name: '1. Terminator',
        weight: 15,
        link: [
          {
            name: 'Alert.png',
            weight: 80,
          },
          {
            name: 'Pounce.png',
            weight: 35,
          },
          {
            name: 'Attentive.png',
            weight: 30,
          },
          {
            name: 'Aware.png',
            weight: 25,
          },
          {
            name: 'Calm.png',
            weight: 25,
          },
          {
            name: 'Covert.png',
            weight: 25,
          },
        ],
      },
      {
        name: '2. Jade',
        weight: 30,
      },
      {
        name: '3. Water',
        weight: 30,
      },
      {
        name: '4. Silver',
        weight: 75,
      },
      {
        name: '5. Trippy',
        weight: 20,
        link: [
          {
            name: 'Alert.png',
            weight: 80,
          },
          // {
          //   name: 'Pounce.png',
          //   weight: 35,
          // },
          // {
          //   name: 'Attentive.png',
          //   weight: 30,
          // },
          // {
          //   name: 'Aware.png',
          //   weight: 25,
          // },
          // {
          //   name: 'Calm.png',
          //   weight: 25,
          // },
          // {
          //   name: 'Covert.png',
          //   weight: 25,
          // },
        ],
      },
      {
        name: '6. Gold',
        weight: 75,
        link: [
          {
            name: 'Alert.png',
            weight: 80,
          },
          // {
          //   name: 'Pounce.png',
          //   weight: 35,
          // },
          // {
          //   name: 'Attentive.png',
          //   weight: 30,
          // },
          // {
          //   name: 'Aware.png',
          //   weight: 25,
          // },
          // {
          //   name: 'Calm.png',
          //   weight: 25,
          // },
          // {
          //   name: 'Covert.png',
          //   weight: 25,
          // },
        ],
      },
      {
        name: '7. Noise',
        weight: 30,
      },
      {
        name: '8. Galaxy',
        weight: 20,
        link: [
          {
            name: 'Alert.png',
            weight: 80,
          },
          // {
          //   name: 'Pounce.png',
          //   weight: 35,
          // },
          // {
          //   name: 'Attentive.png',
          //   weight: 30,
          // },
          // {
          //   name: 'Aware.png',
          //   weight: 25,
          // },
          // {
          //   name: 'Calm.png',
          //   weight: 25,
          // },
          // {
          //   name: 'Covert.png',
          //   weight: 25,
          // },
        ],
      },
      {
        name: '9. Blue',
        weight: 25,
        link: [
          {
            name: 'Alert.png',
            weight: 80,
          },
          // {
          //   name: 'Pounce.png',
          //   weight: 35,
          // },
          // {
          //   name: 'Attentive.png',
          //   weight: 30,
          // },
          // {
          //   name: 'Aware.png',
          //   weight: 25,
          // },
          // {
          //   name: 'Calm.png',
          //   weight: 25,
          // },
          // {
          //   name: 'Covert.png',
          //   weight: 25,
          // },
        ],
      },
      {
        name: '10. Armoured',
        weight: 30,
      },
      {
        name: '11. Standard',
        weight: 120,
      },
      {
        name: '12. Fire',
        weight: 25,
      },
      {
        name: '13. 3rd Eye',
        weight: 30,
      },
      {
        name: '14. Radioactive',
        weight: 25,
      },
      {
        name: '15. Stone',
        weight: 75,
      },
      {
        name: '16. Tan',
        weight: 75,
      },
      {
        name: '17. Pink',
        weight: 75,
      },
      {
        name: '18. Purple',
        weight: 75,
      },
      {
        name: '19. Dark Grey',
        weight: 75,
      },
      {
        name: '20. White',
        weight: 75,
      },
    ],
    link: [
      {
        name: 'Alert.png',
        weight: 80,
      },
      {
        name: 'Pounce.png',
        weight: 35,
      },
      {
        name: 'Attentive.png',
        weight: 30,
      },
      {
        name: 'Aware.png',
        weight: 25,
      },
      {
        name: 'Calm.png',
        weight: 25,
      },
      {
        name: 'Covert.png',
        weight: 25,
      },
      {
        name: 'Fighting Stance.png',
        weight: 40,
      },
      {
        name: 'Fury.png',
        weight: 10,
      },
      {
        name: 'Growl.png',
        weight: 75,
      },
      {
        name: 'Leap.png',
        weight: 50,
      },
      {
        name: 'Lunging.png',
        weight: 50,
      },
      {
        name: 'Lurking.png',
        weight: 10,
      },
      {
        name: 'Mighty.png',
        weight: 5,
      },
      {
        name: 'Majestic.png',
        weight: 20,
      },
      {
        name: 'Parade.png',
        weight: 30,
      },
      {
        name: 'Peaceful.png',
        weight: 35,
      },
      {
        name: 'Primed.png',
        weight: 35,
      },
      {
        name: 'Rage.png',
        weight: 75,
      },
      {
        name: 'Relaxed.png',
        weight: 20,
      },
      {
        name: 'Roar.png',
        weight: 5,
      },
      {
        name: 'Sit.png',
        weight: 15,
      },
      {
        name: 'Stealth.png',
        weight: 20,
      },
      {
        name: 'Strike.png',
        weight: 75,
      },
      {
        name: 'Strong.png',
        weight: 30,
      },
      {
        name: 'Supreme.png',
        weight: 10,
      },
      {
        name: 'Swift.png',
        weight: 50,
      },
      {
        name: 'Swole.png',
        weight: 10,
      },
      {
        name: 'The Claw.png',
        weight: 25,
      },
      {
        name: 'Vicious.png',
        weight: 35,
      },
      {
        name: 'Yawn.png',
        weight: 50,
      },
    ],
  },
  {
    name: 'Lucky Charms',
    traits: [
      {
        name: 'Cards.png',
        weight: 75,
      },
      {
        name: 'Dice.png',
        weight: 90,
      },
      {
        name: 'Fire Crackers.png',
        weight: 112.5,
      },
      {
        name: 'Koi Fish.png',
        weight: 100,
      },
      {
        name: 'Lotus.png',
        weight: 122.5,
      },
      {
        name: 'Mah Jong.png',
        weight: 50,
      },
      {
        name: 'Mandarin Oranges.png',
        weight: 200,
      },
      {
        name: 'Tea Pot.png',
        weight: 250,
      },
    ],
  },
  {
    name: 'Emblems',
    traits: [
      {
        name: 'Bonsai.png',
        weight: 50,
      },
      {
        name: 'Foo Dog.png',
        weight: 75,
      },
      {
        name: 'Lantern.png',
        weight: 112.5,
      },
      {
        name: 'Money Cat.png',
        weight: 100,
      },
      {
        name: 'Prosperity God.png',
        weight: 122.5,
      },
      {
        name: 'Chinese Coin.png',
        weight: 140,
      },
      {
        name: 'Lion Dance.png',
        weight: 175,
      },
      {
        name: 'Peach.png',
        weight: 225,
      },
      // {
      //   name: 'Ying Yang.png',
      //   weight: 0,
      // },
    ],
  },
  {
    name: 'Frames',
    traits: [
      {
        name: 'Bamboo.png',
        weight: 50,
      },
      {
        name: 'Clouds.png',
        weight: 75,
      },
      {
        name: 'Palm Tree.png',
        weight: 112.5,
      },
      {
        name: 'Scrolls.png',
        weight: 100,
      },
      {
        name: 'Swords.png',
        weight: 122.5,
      },
      {
        name: 'Cherry Blossom.png',
        weight: 140,
      },
      {
        name: 'Hibiscus.png',
        weight: 175,
      },
      {
        name: 'Rings.png',
        weight: 225,
      },
      {
        name: 'Swallows.png',
        weight: 0,
      },
      {
        name: 'Waves.png',
        weight: 0,
      },
    ],
  },
  {
    name: 'Beers',
    traits: [
      {
        name: '1932.png',
        weight: 50,
      },
      {
        name: '1953.png',
        weight: 75,
      },
      {
        name: '1961.png',
        weight: 112.5,
      },
      {
        name: '1970.png',
        weight: 100,
      },
      {
        name: '1998.png',
        weight: 122.5,
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
  // {
  //   name: 'Texture',
  //   traits: [
  //     {
  //       name: 'Texture-01.png',
  //       weight: 1,
  //     },
  // //   ],
  // },
];

export { imageFormatConfig, buildConfig, layerConfig };
