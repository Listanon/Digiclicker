/* eslint-disable array-bracket-newline */
///<reference path="../../declarations/requirements/RouteKillRequirement.d.ts"/>
///<reference path="../../declarations/requirements/GymBadgeRequirement.d.ts"/>
///<reference path="../../declarations/requirements/OneFromManyRequirement.d.ts"/>

const TownList: { [name: string]: Town } = {};

const pokeMartShop = new Shop([
    ItemList['Pokeball'],
    ItemList['Greatball'],
    ItemList['Ultraball'],
    ItemList['xAttack'],
    ItemList['xClick'],
    ItemList['Lucky_pill'],
    ItemList['Intel_floppy'],
    ItemList['Item_magnet'],
    ItemList['Lucky_floppy'],
    ItemList['SmallRestore'],
    ItemList['MediumRestore'],
    ItemList['LargeRestore'],
], 'Explorers Poké Mart');

const DepartmentStoreShop = new Shop([
    ItemList['Pokeball'],
    ItemList['Greatball'],
    ItemList['Ultraball'],
    ItemList['xAttack'],
    ItemList['xClick'],
    ItemList['Lucky_pill'],
    ItemList['Item_magnet'],
    ItemList['Intel_floppy'],
    ItemList['Lucky_floppy'],
    ItemList['SmallRestore'],
    ItemList['MediumRestore'],
    ItemList['LargeRestore'],
], 'Department Store');

const pokeLeagueShop = () => new Shop([
    new PokeballItem(GameConstants.Pokeball.Masterball, 10000000, GameConstants.Currency.money       , { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.money]}` }),
    new PokeballItem(GameConstants.Pokeball.Masterball, 75000   , GameConstants.Currency.explorecoin , { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.explorecoin]}` }),
    new PokeballItem(GameConstants.Pokeball.Masterball, 3000    , GameConstants.Currency.farmPoint   , { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.farmPoint]}` }),
    new PokeballItem(GameConstants.Pokeball.Masterball, 50      , GameConstants.Currency.diamond     , { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.diamond]}` }),
    //ItemList['RareCandy'],
    ItemList['Protein'],
]);

//Kanto Shops
const PewterCityShop = new Shop([
    ItemList['Pokeball'],
    ItemList['Intel_floppy'],
    ItemList['Lucky_pill'],
    ItemList['Mystery_egg'],
]);
const Route3Shop = new Shop([
    ItemList['Burpmon'],
]);
const CeruleanCityShop = new Shop([
    ItemList['Sincerity_Digimental'],
    ItemList['xAttack'],
    ItemList['Water_egg'],
]);
const VermilionCityShop = new Shop([
    ItemList['Knowledge_Digimental'],
    ItemList['Lucky_pill'],
    ItemList['Electric_egg'],
]);
const CeladonCityShop = new Shop([
    ItemList['Burpmon'],
    ItemList['Burpmon'],
    ItemList['Burpmon'],
    ItemList['Burpmon'],
    ItemList['Burpmon'],
],   'Game Corner Shop');
const CeladonDepartmentStoreShop = new Shop([
    ItemList['Pokeball'],
    ItemList['Greatball'],
    ItemList['xAttack'],
    ItemList['xClick'],
    ItemList['Lucky_pill'],
    ItemList['Item_magnet'],
    ItemList['Intel_floppy'],
    ItemList['Lucky_floppy'],
], 'Department Store');
const SaffronCityShop = new Shop([
    ItemList['Hope_Digimental'],
    ItemList['xClick'],
    ItemList['Purity_Digimental'],
    ItemList['Earth_egg'],
]);
const FuchsiaCityShop = new Shop([
    ItemList['Ultraball'],
    ItemList['Kindness_Digimental'],
    ItemList['Lucky_pill'],
    ItemList['Wind_egg'],
]);
const CinnabarIslandShop = new Shop([
    ItemList['Courage_Digimental'],
    ItemList['Fire_egg'],
    ItemList['SmallRestore'],
    ItemList['Explorer_kit'],
    ItemList['Golden_DVD'],
    ItemList['Shiny_Mirror'],
    ItemList['HatcheryHelperKris'],
]);
const ViridianCityShop = new Shop([
    ItemList['Pokeball'],
    ItemList['xAttack'],
    ItemList['xClick'],
    ItemList['Dungeon_ticket'],
]);
const LavenderTownShop = new Shop([
    ItemList['Greatball'],
    ItemList['Item_magnet'],
    ItemList['Lucky_floppy'],
    ItemList['Plant_egg'],
]);

// Kanto NPCs

const PalletProfOak = new ProfNPC('Hina',
    GameConstants.Region.adventure01,
    'Congratulations on completing your Adventure01 journey!',
    'Your task isn\'t over yet, a whole world awaits you! Onwards to Adventure02!',
    'assets/images/oak.png');

const ViridianCityOldMan = new NPC('Tamer Echo', [
    'In order to reduce server costs a caching system is in place.',
    'Sometimes when you venture in dungeons you might encounter hostile cached echos of tamers who were there before you.',
]);

const PewterBattleItemRival = new NPC('Battle Item Echo', [
    'Hey kid, you look new! Let me offer some advice, Battle Items like xAttack can be acquired along Routes, inside Dungeons and in Shops!',
    'Use them to help you out whenever you feel like time is against you!',
]);

const Route3ShadySalesman = new NPC('Shady Salesman', [
    'Have I got a deal just for you!',
    'I\'ll let you have a super secret Pokémon. For the right price!',
]);

const CeruleanKantoBerryMaster = new KantoBerryMasterNPC('Disk Master', [
    'Bah! You younglings have no appreciation of the art of physical media!',
    'Come back when you are ready to learn!',
]);

const VermilionFanClubChairman = new NPC('Breeder Echo', [
    'You won’t find a Digimon as wonderful as my favorite Psychemon in those Typed Eggs in the shops, but they might hatch rare Pokémon you can’t find anywhere else!',
]);

const LavenderMrFuji = new NPC('Collector Echo', [
    'Did you know that dot Digimon are more often found in Dungeons, at the Disk Shop, from Eggs, and even when Evolving from Items?',
]);

const BigSpender = new NPC('Big Spender Echo', [
    'I love shopping! When I come in, the cashiers know I want tons of items.',
    'You can use the Shop Amount Button settings to make it easy for big purchases, too!',
]);

const SaffronBattleItemRival = new NPC('Battle Item Master', [
    'Do I know you? Wait... Have you met my worthless rival? Ha! Let me guess, he gave you some unwanted advice?',
    'I bet he forget to tell you that although all Battle Items only last for 30 seconds they can stack and last for days! Now scram!',
]);

const FuchsiaKantoRoamerNPC = new RoamerNPC('Scouting Echo', [
    'There\'s been some recent sightings of roaming Digimon on {ROUTE_NAME}!',
], GameConstants.Region.adventure01);

const CinnabarIslandResearcher = new NPC('Researcher Echo', [
    'I heard what sounded like Digimon arguing from the forest last night. It was something about having a different color or something.',
    'Apparently others have heard the same ramblings all over the map!',
]);

//Kanto Towns
TownList['Primary Village'] = new Town(
    'Primary Village',
    GameConstants.Region.adventure01,
    [ViridianCityShop],
    {
        npcs: [PalletProfOak],
    }
);
TownList['Toy Town'] = new Town(
    'Toy Town',
    GameConstants.Region.adventure01,
    [PewterCityShop],
    {
         requirements: [
            new RouteKillRequirement(10, GameConstants.Region.adventure01, 5),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Andromon\'s Factory')),
        ],
        npcs: [PewterBattleItemRival],
    }
);
TownList['Koromon Village'] = new Town(
    'Koromon Village',
    GameConstants.Region.adventure01,
    [CeruleanCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.adventure01, 10)],
        npcs: [CeruleanKantoBerryMaster],
    }
);
TownList['Piccolomon\'s'] = new Town(
    'Piccolomon\'s',
    GameConstants.Region.adventure01,
    [VermilionCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.adventure01, 13)],
        npcs: [VermilionFanClubChairman],
    }
);
TownList['Vademon Dimension'] = new Town(
    'Vademon Dimension',
    GameConstants.Region.adventure01,
    [LavenderTownShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.adventure01, 14)],
        npcs: [LavenderMrFuji],
    }
);
TownList['Gennai\'s'] = new Town(
    'Gennai\'s',
    GameConstants.Region.adventure01,
    [CeladonDepartmentStoreShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.adventure01, 17)],
        npcs: [BigSpender],
    }
);
TownList['Tokyo City'] = new Town(
    'Tokyo City',
    GameConstants.Region.adventure01,
    [SaffronCityShop],
    {
        requirements: [
            new GymBadgeRequirement(BadgeEnums.Purity_Crest),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Vamdemon\'s Castle')),
        ],
        npcs: [SaffronBattleItemRival],
    }
);
TownList['ShogunGekomon\'s Castle'] = new Town(
    'ShogunGekomon\'s Castle',
    GameConstants.Region.adventure01,
    [FuchsiaCityShop],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.adventure01, 15),
            new GymBadgeRequirement(BadgeEnums.Knowledge_Crest)
        ],
        npcs: [FuchsiaKantoRoamerNPC],
    }
);
TownList['Whamon\'s Gulf'] = new Town(
    'Whamon\'s Gulf',
    GameConstants.Region.adventure01,
    [CinnabarIslandShop],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('VenomVamdemon Rampage')),],
        npcs: [CinnabarIslandResearcher],
    }
);
TownList['Pyokomon Village'] = new Town(
    'Pyokomon Village',
    GameConstants.Region.adventure01,
    [ViridianCityShop],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.adventure01, 2),
            new RouteKillRequirement(10, GameConstants.Region.adventure01, 3),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Coelamon Beach')),
        ],
        npcs: [ViridianCityOldMan],
    }
);
TownList['Apocalymon Space'] = new Town(
    'Apocalymon Space',
    GameConstants.Region.adventure01,
    [GymList['Ocean Data'], GymList['Forest Data'], GymList['City Data'], GymList['Wasteland Data'], GymList['Apocalymon Data'], pokeLeagueShop()],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.adventure01, 23),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Piemon\'s Observatory')),
        ],
    }

);

//Kanto Dungeons
TownList['Coelamon Beach'] = new DungeonTown(
    'Coelamon Beach',
    GameConstants.Region.adventure01,
    [new RouteKillRequirement(10, GameConstants.Region.adventure01, 2)]
);
TownList['Andromon\'s Factory'] = new DungeonTown(
    'Andromon\'s Factory',
    GameConstants.Region.adventure01,
    [new RouteKillRequirement(10, GameConstants.Region.adventure01,4)]
);
TownList['Lost Colosseum'] = new DungeonTown(
    'Lost Colosseum',
    GameConstants.Region.adventure01,
    [new RouteKillRequirement(10, GameConstants.Region.adventure01, 11)]
);
TownList['Mugendramon\'s Mill'] = new DungeonTown(
    'Mugendramon\'s Mill',
    GameConstants.Region.adventure01,
    [new RouteKillRequirement(10, GameConstants.Region.adventure01, 22)]
);
TownList['Digivice Temple'] = new DungeonTown(
    'Digivice Temple',
    GameConstants.Region.adventure01,
    [new RouteKillRequirement(10, GameConstants.Region.adventure01, 7)]
);
TownList['Metal Seadramon\'s Lair'] = new DungeonTown(
    'Metal Seadramon\'s Lair',
    GameConstants.Region.adventure01,
    [
         new RouteKillRequirement(10, GameConstants.Region.adventure01, 20),
         new GymBadgeRequirement(BadgeEnums.Sincerity_Crest),
    ]
);
TownList['Devimon Battle'] = new DungeonTown(
    'Devimon Battle',
    GameConstants.Region.adventure01,
    [new RouteKillRequirement(10, GameConstants.Region.adventure01, 8)]
);
TownList['Etemon\'s Pyramid'] = new DungeonTown(
    'Etemon\'s Pyramid',
    GameConstants.Region.adventure01,
    [new RouteKillRequirement(10, GameConstants.Region.adventure01, 13)]
);
TownList['VenomVamdemon Rampage'] = new DungeonTown(
    'VenomVamdemon Rampage',
    GameConstants.Region.adventure01,
    [new RouteKillRequirement(10, GameConstants.Region.adventure01, 19)]
);
TownList['Pinochimon\'s House'] = new DungeonTown(
    'Pinochimon\'s House',
    GameConstants.Region.adventure01,
    [
        new RouteKillRequirement(10, GameConstants.Region.adventure01, 21),
        new GymBadgeRequirement(BadgeEnums.Light_Crest),
    ]
);
TownList['Vamdemon\'s Castle'] = new DungeonTown(
    'Vamdemon\'s Castle',
    GameConstants.Region.adventure01,
    [
        new RouteKillRequirement(10, GameConstants.Region.adventure01, 16),
        new RouteKillRequirement(10, GameConstants.Region.adventure01, 17),
        new GymBadgeRequirement(BadgeEnums.Love_Crest),
    ]
);
TownList['Piemon\'s Observatory'] = new DungeonTown(
    'Piemon\'s Observatory',
    GameConstants.Region.adventure01,
    [
        new RouteKillRequirement(10, GameConstants.Region.adventure01, 23),
        new GymBadgeRequirement(BadgeEnums.Hope_Crest)
    ]
);
TownList['Our War Game'] = new DungeonTown(
    'Our War Game',
    GameConstants.Region.adventure01,
    [new GymBadgeRequirement(BadgeEnums.Apocalymon_Data)]
);

//Johto Shops
const NewBarkTownShop = new Shop([
    ItemList['Pokeball'],
]);
const VioletCityShop = new Shop([
    ItemList['MediumRestore'],
    ItemList['Burpmon'],
    ItemList['Mystery_egg'],
]);
const AzaleaTownShop = new Shop([
    ItemList['Kings_rock'],
    ItemList['Plant_egg'],
    ItemList['Purity_Digimental'],
]);
const GoldenrodDepartmentStoreShop = new Shop([
    ItemList['Pokeball'],
    ItemList['Greatball'],
    ItemList['Ultraball'],
    ItemList['xAttack'],
    ItemList['xClick'],
    ItemList['Lucky_pill'],
    ItemList['Item_magnet'],
    ItemList['Intel_floppy'],
    ItemList['Lucky_floppy'],
    ItemList['SmallRestore'],
    ItemList['MediumRestore'],
], 'Department Store');
const EcruteakCityShop = new Shop([
    ItemList['Greatball'],
    ItemList['Fire_egg'],
    ItemList['Soothe_bell'],
    ItemList['Courage_Digimental'],
]);
const OlivineCityShop = new Shop([
    ItemList['Metal_coat'],
    ItemList['Water_egg'],
    ItemList['Electric_egg'],
    ItemList['Sincerity_Digimental'],
    ItemList['Knowledge_Digimental'],
    ItemList['HatcheryHelperCarey'],
]);
const CianwoodCityShop = new Shop([
    ItemList['Ultraball'],
    ItemList['Earth_egg'],
    ItemList['Love_Digimental'],
]);
const MahoganyTownShop = new Shop([
    ItemList['Upgrade'],
    ItemList['Kindness_Digimental'],
    ItemList['HatcheryHelperDakota'],
]);
const BlackthornCityShop = new Shop([
    ItemList['LargeRestore'],
    ItemList['Dragon_scale'],
    ItemList['Wind_egg'],
]);

// Johto NPCs

const JohtoBerryMaster = new BerryMasterShop([
    ItemList['Speed_Boost'],
    ItemList['Space_Boost'],
    ItemList['Surprise_Boost'],
    ItemList['Quality_Boost'],
    ItemList['Berry_Shovel'],
    ItemList['Mulch_Shovel'],
    ItemList['Demo_Disk'],
    ItemList['FarmHandBailey'],
    ItemList['PuzzleDisk'],
    ItemList['FortuneDisk'],
    ItemList['ExerciseDisk'],
    ItemList['LibraryDisk'],
]);

const NewBarkTechnologyEnthusiast = new NPC('Tech Enthusiast', [
    'Technology is amazing! I have heard that picking up items in chests in Dungeons can make it easier to see! But the Dungeons seem to get harder with each chest you pick up...',
]);

const CherrygroveMrPokemon = new NPC('Mr. Pokémon', [
    'Welcome to Johto! This is where the first ever Pokémon egg was found long ago.',
    'Astounding breakthroughs have been made since then. We can now store Pokémon eggs for longer and queue them up for breeding.',
    'This new technology only allows up to four stored eggs, for now.',
]);

const VioletEarlDervish = new NPC('Earl Dervish', [
    'Earl I am! Teach you I will to be a better trainer!',
    'Some Pokémon babies, only from Day Care they come! Hatch! Hatch! Hatch!',
]);

const AzaleaOldMan = new NPC('Wise Old Man', [
    'There is an old tale about the Guardian of Ilex Forest.',
    'It says that the mythical Pokémon Celebi will appear before anyone who has proven they are a Champion Pokémon Trainer.',
]);

const EcruteakKimonoGirl = new NPC('Kimono Girl', [
    'Legends say that Ho-Oh is searching for a trainer of pure heart.',
    'To prove yourself, you must tame the three legendary beasts of Johto, and bring them to the nearby Tin Tower.',
]);

const OlivineSSAquaCaptain = new NPC('SS Aqua Captain', [
    'Aye! At this here dock you can travel to far away regions! But only ones you’ve travelled to before, I’ve heard the Professor has his own vessel to take ye’ to new lands!',
]);

const CianwoodPhotographyAide = new NPC('Photography Aide', [
    'Cameron the Photographer isn’t here right now, he’s off taking photos of Pokémon on Berry Farms. Did you know that some Berries can even attract rare Pokémon?',
]);

const MahoganySouvenirShopAttendant = new NPC('Souvenir Shop Attendant', [
    'We’ve got stuff here nobody else has got! But keep any Item Magnets you have away from the merchandise… especially the RageCandyBars. Keep ‘em outside where they belong, I’ve heard magnets can attract Pokémon with held items more often, and even more so in Dungeons!',
]);

const BlackthornJohtoRoamerNPC = new RoamerNPC('Pokéfan Trevor', [
    'On the news they are getting more reports of roaming Pokémon appearing on {ROUTE_NAME}!',
], GameConstants.Region.johto);

const ProfElm = new ProfNPC('Prof. Elm',
    GameConstants.Region.johto,
    'Oh, another regional Pokédex completed so soon?',
    'Amazing! Next stop is Hoenn, enjoy the sunshine while you\'re there!');


//Johto Towns
TownList['New Bark Town'] = new Town(
    'New Bark Town',
    GameConstants.Region.johto,
    [NewBarkTownShop],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Apocalymon_Data)],
        npcs: [ProfElm, NewBarkTechnologyEnthusiast],
    }
);
TownList['Cherrygrove City'] = new Town(
    'Cherrygrove City',
    GameConstants.Region.johto,
    [],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.johto, 29)],
        npcs: [CherrygroveMrPokemon],
    }
);
TownList['Violet City'] = new Town(
    'Violet City',
    GameConstants.Region.johto,
    [VioletCityShop, new MoveToDungeon(dungeonList['Sprout Tower'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.johto, 31)],
        npcs: [VioletEarlDervish],
    }
);
TownList['Azalea Town'] = new Town(
    'Azalea Town',
    GameConstants.Region.johto,
    [AzaleaTownShop, new MoveToDungeon(dungeonList['Slowpoke Well'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.johto, 33)],
        npcs: [AzaleaOldMan],
    }
);
TownList['Goldenrod City'] = new Town(
    'Goldenrod City',
    GameConstants.Region.johto,
    [GoldenrodDepartmentStoreShop, JohtoBerryMaster, new MoveToDungeon(dungeonList['Radio Tower'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.johto, 34)],
        npcs: [BigSpender],
    }
);
TownList['Ecruteak City'] = new Town(
    'Ecruteak City',
    GameConstants.Region.johto,
    [EcruteakCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.johto, 37)],
        npcs: [EcruteakKimonoGirl],
    }
);
TownList['Olivine City'] = new Town(
    'Olivine City',
    GameConstants.Region.johto,
    [OlivineCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.johto, 39)],
        npcs: [OlivineSSAquaCaptain],
    }
);
TownList['Cianwood City'] = new Town(
    'Cianwood City',
    GameConstants.Region.johto,
    [CianwoodCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.johto, 41)],
        npcs: [CianwoodPhotographyAide],
    }
);
TownList['Mahogany Town'] = new Town(
    'Mahogany Town',
    GameConstants.Region.johto,
    [MahoganyTownShop, new MoveToDungeon(dungeonList['Team Rockets Hideout'])],
    {
        requirements: [new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.johto, 42),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mt Mortar')),
        ])],
        npcs: [MahoganySouvenirShopAttendant],
    }
);
TownList['Blackthorn City'] = new Town(
    'Blackthorn City',
    GameConstants.Region.johto,
    [BlackthornCityShop],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Ice Path'))],
        npcs: [BlackthornJohtoRoamerNPC],
    }
);
TownList['Indigo Plateau Johto'] = new Town(
    'Indigo Plateau Johto',
    GameConstants.Region.johto,
    [GymList['Elite Will'], GymList['Elite Koga'], GymList['Elite Bruno2'], GymList['Elite Karen'], GymList['Champion Lance'], pokeLeagueShop()],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.johto, 26),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Johto')),
        ],
    }
);

//Johto Dungeons
TownList['Sprout Tower'] = new DungeonTown(
    'Sprout Tower',
    GameConstants.Region.johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 31)]
);
TownList['Ruins of Alph'] = new DungeonTown(
    'Ruins of Alph',
    GameConstants.Region.johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 32)]
);
TownList['Union Cave'] = new DungeonTown(
    'Union Cave',
    GameConstants.Region.johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 32)]
);
TownList['Slowpoke Well'] = new DungeonTown(
    'Slowpoke Well',
    GameConstants.Region.johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 33)]
);
TownList['Ilex Forest'] = new DungeonTown(
    'Ilex Forest',
    GameConstants.Region.johto,
    [new GymBadgeRequirement(BadgeEnums.Hive)]
);
TownList['Burned Tower'] = new DungeonTown(
    'Burned Tower',
    GameConstants.Region.johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 37)]
);
TownList['Tin Tower'] = new DungeonTown(
    'Tin Tower',
    GameConstants.Region.johto,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Radio Tower'))]
);
TownList['Whirl Islands'] = new DungeonTown(
    'Whirl Islands',
    GameConstants.Region.johto,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Radio Tower'))]
);
TownList['Mt Mortar'] = new DungeonTown(
    'Mt Mortar',
    GameConstants.Region.johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 37)]
);
TownList['Team Rockets Hideout'] = new DungeonTown(
    'Team Rockets Hideout',
    GameConstants.Region.johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 43)]
);
TownList['Radio Tower'] = new DungeonTown(
    'Radio Tower',
    GameConstants.Region.johto,
    [
        new GymBadgeRequirement(BadgeEnums.Mineral),
        new GymBadgeRequirement(BadgeEnums.Glacier),
    ]
);
TownList['Ice Path'] = new DungeonTown(
    'Ice Path',
    GameConstants.Region.johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 44)]
);
TownList['Dark Cave'] = new DungeonTown(
    'Dark Cave',
    GameConstants.Region.johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 45)]
);
TownList['Victory Road Johto'] = new DungeonTown(
    'Victory Road Johto',
    GameConstants.Region.johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 26)]
);
TownList['Mt Silver'] = new DungeonTown(
    'Mt Silver',
    GameConstants.Region.johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 28)]
);

//Hoenn Shops
const LittleRootTownShop = new Shop([
    ItemList['Pokeball'],
]);
const PetalburgCityShop = new Shop([
    ItemList['Kings_rock'],
]);
const RustboroCityShop = new Shop([
    ItemList['Mystery_egg'],
]);
const DewfordTownShop = new Shop([
    ItemList['Earth_egg'],
]);
const SlateportCityShop = new Shop([
    ItemList['Greatball'],
    ItemList['Water_egg'],
    ItemList['Kindness_Digimental'],
]);
const MauvilleCityShop = new Shop([
    ItemList['Electric_egg'],
    ItemList['Knowledge_Digimental'],
    ItemList['Metal_coat'],
    ItemList['HatcheryHelperJasmine'],
]);
const VerdanturfTownShop = new Shop([
    ItemList['Plant_egg'],
    ItemList['Soothe_bell'],
]);
const LavaridgeTownShop = new Shop([
    ItemList['Fire_egg'],
    ItemList['Courage_Digimental'],
]);
const FallarborTownShop = new Shop([
    ItemList['Hope_Digimental'],
    ItemList['Love_Digimental'],
]);
const FortreeCityShop = new Shop([
    ItemList['Ultraball'],
    ItemList['Purity_Digimental'],
]);
const MossdeepCityShop = new Shop([
    ItemList['Burpmon'],
    ItemList['Prism_scale'],
    ItemList['Upgrade'],
]);
const SootopolisCityShop = new Shop([
    ItemList['Sincerity_Digimental'],
]);
const PacifidlogTownShop = new Shop([
    ItemList['Deepsea_tooth'],
    ItemList['Deepsea_scale'],
]);
const EverGrandeCityShop = new Shop([
    ItemList['Wind_egg'],
    ItemList['Dragon_scale'],
]);
// TODO: finalize items and prices
const BattleFrontierShop = new Shop([
    new PokeballItem(GameConstants.Pokeball.Ultraball, 1, GameConstants.Currency.battlePoint),
    new PokeballItem(GameConstants.Pokeball.Masterball, 500, GameConstants.Currency.battlePoint , { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.battlePoint]}` }),
    new EnergyRestore(GameConstants.EnergyRestoreSize.SmallRestore, 10, GameConstants.Currency.battlePoint),
    new EnergyRestore(GameConstants.EnergyRestoreSize.MediumRestore, 20, GameConstants.Currency.battlePoint),
    new EnergyRestore(GameConstants.EnergyRestoreSize.LargeRestore, 40, GameConstants.Currency.battlePoint),
    ItemList['FarmHandJamie'],
    ItemList['HatcheryHelperNoel'],
]);

//Hoenn Berry Master
const HoennBerryMaster = new BerryMasterShop([
    ItemList['Speed_Boost'],
    ItemList['Space_Boost'],
    ItemList['Surprise_Boost'],
    ItemList['Quality_Boost'],
    ItemList['Berry_Shovel'],
    ItemList['Mulch_Shovel'],
    ItemList['Failure_Prevent'],
    ItemList['FarmHandKerry'],
]);

//Hoenn Flute Master
const HoennFluteMaster = new GemMasterShop([]);

//Hoenn NPCs

const LittlerootAide = new NPC('Professor Birch\'s Aide', [
    'We have received word from Mr. Pokémon in Johto! He has made another breakthrough.',
    'You can now store an additional four eggs in the queue! His research has really gained speed.',
    'He wants you to know that he will have an additional eight slots ready by the time you reach Sinnoh.',
]);

const OldaleTrackingScientist = new NPC('Tracking Scientist', [
    'Hey trainer, look at these footprints! Huh, I’ve never seen footprints like these before… They look like they came from two different Pokémon, and I saw two blurs, one red and one blue, quickly fly away just as I exited the Pokémon Center.',
    'They were flying really fast, I bet Pokémon that fast will only challenge trainers who have proven they are as strong as Champion Wallace...',
]);

const SlateportHoennRoamerNPC = new RoamerNPC('Reporter Gabby', [
    'Our sources indicate that roaming Pokémon are gathering on {ROUTE_NAME}!',
], GameConstants.Region.hoenn);

const FallarborProfessorCozmo = new NPC('Prof. Cozmo', [
    'Oh! Welcome, welcome. Do you by any chance have any Meteorites? No? Ah well, I’m studying the Pokémon Deoxys and I’ve heard that a Meteorite can cause it to change forms!',
    'I’ve also heard that the Battle Frontier may have some secrets relevant to Deoxys and its forms… but I’m not strong enough to find out...',
]);

const LavaridgeSootCollector = new NPC('Soot Collector', [
    'Blegh! I\'ve taken three soaks in the hot springs and I can still taste the soot!',
    'The Flute Trader in Fallarbor Town has been paying me to go collect soot to make Flutes, but I\'m sick of it.',
    'People say they have truly mystical powers, but that they require Gems of different types to use. Also, using more Flutes at the same time costs more Gems to use',
]);

const FortreeWeatherman = new NPC('Weatherman', [
    'Castform is a very finnicky pokemon.',
    'It changes forms when the weather is drastically different.',
    'If you want to collect them all, wait for the weather to change.',
]);

const MossdeepAstronomer = new NPC('Astronomer', [
    'Hey did you know about the Millennium Comet? We can see it in the sky right now, and it only comes around once every thousand years!',
    'There’s a legend that a mythical Wish Pokémon awakens when it passes over us. If you’re as strong as the Champion, maybe you’ll find it roaming around Hoenn granting wishes!',
]);

const PacifidlogDiver = new NPC('Diver', [
    'Yo! Find any cool stuff in chests lately?',
    ' I\'ve heard that if you beat a Dungeon a lot then the stuff you find in chests gets even more awesome.',
]);

const SootopolisWallace = new NPC('Gym Leader Wallace', [
    'The creators of the lands and ocean slumber within the Cave of Origin.',
    'However, they will only awaken when in the presence of a truly great trainer.',
    'You will have to overcome the Pokémon League before you have any chance to encounter them.',
]);

const ProfBirch = new ProfNPC('Prof. Birch',
    GameConstants.Region.hoenn,
    'That\'s another regional Pokédex completed! Fantastic.',
    'I really appreciate being able to see your outstanding progress, thank you! Sinnoh is next up.');

//Hoenn Towns
TownList['Littleroot Town'] = new Town(
    'Littleroot Town',
    GameConstants.Region.hoenn,
    [LittleRootTownShop],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion)],
        npcs: [ProfBirch, LittlerootAide],
    }
);
TownList['Oldale Town'] = new Town(
    'Oldale Town',
    GameConstants.Region.hoenn,
    [],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 101)],
        npcs: [OldaleTrackingScientist],
    }
);
TownList['Petalburg City'] = new Town(
    'Petalburg City',
    GameConstants.Region.hoenn,
    [PetalburgCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 102)],
    }
);
TownList['Rustboro City'] = new Town(
    'Rustboro City',
    GameConstants.Region.hoenn,
    [RustboroCityShop],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Petalburg Woods'))],
    }
);
TownList['Dewford Town'] = new Town(
    'Dewford Town',
    GameConstants.Region.hoenn,
    [DewfordTownShop],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Rusturf Tunnel'))],
    }
);
TownList['Slateport City'] = new Town(
    'Slateport City',
    GameConstants.Region.hoenn,
    [SlateportCityShop],
    {
        requirements: [
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Granite Cave')),
            new GymBadgeRequirement(BadgeEnums.Knuckle),
        ],
        npcs: [SlateportHoennRoamerNPC],
    }
);
TownList['Mauville City'] = new Town(
    'Mauville City',
    GameConstants.Region.hoenn,
    [MauvilleCityShop, HoennBerryMaster],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 110)],
    }
);
TownList['Verdanturf Town'] = new Town(
    'Verdanturf Town',
    GameConstants.Region.hoenn,
    [VerdanturfTownShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 117)],
    }
);
TownList['Mt. Chimney'] = new Town(
    'Mt. Chimney',
    GameConstants.Region.hoenn,
    [new MoveToDungeon(dungeonList['Fiery Path']), new MoveToDungeon(dungeonList['Mt. Chimney Crater']), new MoveToDungeon(dungeonList['Jagged Pass']), new MoveToDungeon(dungeonList['Magma Hideout'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 112)],
    }
);
TownList['Lavaridge Town'] = new Town(
    'Lavaridge Town',
    GameConstants.Region.hoenn,
    [LavaridgeTownShop],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Jagged Pass'))],
    }
);
TownList['Fallarbor Town'] = new Town(
    'Fallarbor Town',
    GameConstants.Region.hoenn,
    [FallarborTownShop, HoennFluteMaster],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 113)],
        npcs: [FallarborProfessorCozmo],
    }
);
TownList['Fortree City'] = new Town(
    'Fortree City',
    GameConstants.Region.hoenn,
    [FortreeCityShop],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Weather Institute'))],
        npcs: [FortreeWeatherman],
    }
);
TownList['LilyCove City'] = new Town(
    'LilyCove City',
    GameConstants.Region.hoenn,
    [DepartmentStoreShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 121)],
        npcs: [BigSpender],
    }
);
TownList['Mossdeep City'] = new Town(
    'Mossdeep City',
    GameConstants.Region.hoenn,
    [MossdeepCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 125)],
        npcs: [MossdeepAstronomer],
    }
);
TownList['Pacifidlog Town'] = new Town(
    'Pacifidlog Town',
    GameConstants.Region.hoenn,
    [PacifidlogTownShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 131)],
        npcs: [PacifidlogDiver],
    }
);
TownList['Sootopolis City'] = new Town(
    'Sootopolis City',
    GameConstants.Region.hoenn,
    [SootopolisCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 126), new GymBadgeRequirement(BadgeEnums.Mind)],
        npcs: [SootopolisWallace],
    }
);
TownList['Ever Grande City'] = new Town(
    'Ever Grande City',
    GameConstants.Region.hoenn,
    [EverGrandeCityShop],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Rain)],
    }
);
TownList['Battle Frontier'] = new Town(
    'Battle Frontier',
    GameConstants.Region.hoenn,
    [BattleFrontierShop, new BattleFrontierTownContent()],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)],
    }
);
TownList['Pokémon League Hoenn'] = new Town(
    'Pokémon League Hoenn',
    GameConstants.Region.hoenn,
    [GymList['Elite Sidney'], GymList['Elite Phoebe'], GymList['Elite Glacia'], GymList['Elite Drake'], GymList['Champion Wallace'], pokeLeagueShop()],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.hoenn, 128),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Hoenn')),
        ],
    }
);

//Hoenn Dungeons
TownList['Petalburg Woods'] = new DungeonTown(
    'Petalburg Woods',
    GameConstants.Region.hoenn,
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 104)]
);
TownList['Rusturf Tunnel'] = new DungeonTown(
    'Rusturf Tunnel',
    GameConstants.Region.hoenn,
    [
        new RouteKillRequirement(10, GameConstants.Region.hoenn, 116),
        new GymBadgeRequirement(BadgeEnums.Stone),
    ]
);
TownList['Granite Cave'] = new DungeonTown(
    'Granite Cave',
    GameConstants.Region.hoenn,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Rusturf Tunnel'))]
);
TownList['Fiery Path'] = new DungeonTown(
    'Fiery Path',
    GameConstants.Region.hoenn,
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 112)]
);
TownList['Meteor Falls'] = new DungeonTown(
    'Meteor Falls',
    GameConstants.Region.hoenn,
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 114)]
);
TownList['Mt. Chimney Crater'] = new DungeonTown(
    'Mt. Chimney Crater',
    GameConstants.Region.hoenn,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Meteor Falls'))]
);
TownList['Jagged Pass'] = new DungeonTown(
    'Jagged Pass',
    GameConstants.Region.hoenn,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mt. Chimney Crater'))]
);
TownList['New Mauville'] = new DungeonTown(
    'New Mauville',
    GameConstants.Region.hoenn,
    [new GymBadgeRequirement(BadgeEnums.Balance)]
);
TownList['Weather Institute'] = new DungeonTown(
    'Weather Institute',
    GameConstants.Region.hoenn,
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 119)]
);
TownList['Mt. Pyre'] = new DungeonTown(
    'Mt. Pyre',
    GameConstants.Region.hoenn,
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 122)]
);
TownList['Magma Hideout'] = new DungeonTown(
    'Magma Hideout',
    GameConstants.Region.hoenn,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mt. Pyre'))]
);
TownList['Aqua Hideout'] = new DungeonTown(
    'Aqua Hideout',
    GameConstants.Region.hoenn,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Magma Hideout'))]
);
TownList['Shoal Cave'] = new DungeonTown(
    'Shoal Cave',
    GameConstants.Region.hoenn,
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 125)]
);
TownList['Cave of Origin'] = new DungeonTown(
    'Cave of Origin',
    GameConstants.Region.hoenn,
    [
        new RouteKillRequirement(10, GameConstants.Region.hoenn, 126),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Seafloor Cavern')),
    ]
);
TownList['Seafloor Cavern'] = new DungeonTown(
    'Seafloor Cavern',
    GameConstants.Region.hoenn,
    [
        new RouteKillRequirement(10, GameConstants.Region.hoenn, 128),
        new GymBadgeRequirement(BadgeEnums.Mind),
    ]
);
TownList['Sky Pillar'] = new DungeonTown(
    'Sky Pillar',
    GameConstants.Region.hoenn,
    [
        new RouteKillRequirement(10, GameConstants.Region.hoenn, 131),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Cave of Origin')),
    ]
);
TownList['Victory Road Hoenn'] = new DungeonTown(
    'Victory Road Hoenn',
    GameConstants.Region.hoenn,
    [new GymBadgeRequirement(BadgeEnums.Rain)]
);
TownList['Sealed Chamber'] = new DungeonTown(
    'Sealed Chamber',
    GameConstants.Region.hoenn,
    [
        new RouteKillRequirement(10, GameConstants.Region.hoenn, 134),
        new GymBadgeRequirement(BadgeEnums.Mind),
    ]
);

//Sinnoh Shops
const TwinleafTownShop = new Shop([
    ItemList['Pokeball'],
]);
const JubilifeCityShop = new Shop([
    ItemList['Hope_Digimental'],
    ItemList['Love_Digimental'],
]);
const OreburghCityShop = new Shop([
    ItemList['Mystery_egg'],
]);
const FloaromaTownShop = new Shop([
    ItemList['Kings_rock'],
    ItemList['Kindness_Digimental'],
]);
const EternaCityShop = new Shop([
    ItemList['Plant_egg'],
    ItemList['Purity_Digimental'],
]);
const HearthomeCityShop = new Shop([
    ItemList['Greatball'],
    ItemList['Soothe_bell'],
    ItemList['Fire_egg'],
    ItemList['Courage_Digimental'],
]);
const SolaceonTownShop = new Shop([
    ItemList['Light_Digimental'],
    ItemList['Fate_Digimental'],
    ItemList['Miracles_Digimental'],
    ItemList['Spiritomb'],
]);
const CelesticTownShop = new Shop([
    ItemList['Wind_egg'],
    ItemList['Dragon_scale'],
]);
const CanalaveCityShop = new Shop ([
    ItemList['Earth_egg'],
    ItemList['Metal_coat'],
]);
const PalParkShop = new Shop([
    ItemList['Razor_claw'],
    ItemList['Razor_fang'],
    ItemList['Burpmon'],
    ItemList['Burpmon'],
    ItemList['Burpmon'],
]);
const SnowpointCityShop = new Shop([
    ItemList['Upgrade'],
]);
const SunyshoreCityShop = new Shop([
    ItemList['Electric_egg'],
    ItemList['Knowledge_Digimental'],
    ItemList['Deepsea_scale'],
    ItemList['Deepsea_tooth'],
]);
const SurvivalAreaShop = new Shop([
    ItemList['Electirizer'],
    ItemList['Magmarizer'],
]);
const ResortAreaShop = new Shop([
    ItemList['Reaper_cloth'],
    ItemList['Dubious_disc'],
    ItemList['Protector'],
]);
const PastoriaShop = new Shop([
    ItemList['Ultraball'],
    ItemList['Burpmon'],
    ItemList['Water_egg'],
    ItemList['Sincerity_Digimental'],
    ItemList['Prism_scale'],
]);

//Sinnoh Berry Master
const SinnohBerryMaster = new BerryMasterShop([
    ItemList['Speed_Boost'],
    ItemList['Space_Boost'],
    ItemList['Surprise_Boost'],
    ItemList['Quality_Boost'],
    ItemList['Berry_Shovel'],
    ItemList['Mulch_Shovel'],
    ItemList['FarmHandRiley'],
]);

//Sinnoh NPCs

const TwinleafContestChampion = new NPC('Contest Champion', [
    'Welcome to Sinnoh! There are many legends and myths here. For example, it is said that trainers that conquer the Lake nearby, Lake Verity, will meet a mythical Pokémon known for Emotion roaming around the region. It sure would have been awesome to partner with that Pokémon in one of my routines!',
]);

const SandgemBeachcomber = new NPC('Beachcomber', [
    'Hmmm… Oh! Sorry, I Didn’t see you there! Sometimes the strangest things wash up on this beach, I just got caught up in the search.',
    'Just last week a weird blue egg with a red center showed up. I went to go pick it up, but then it hatched! I was so surprised that the little blue Pokémon just hopped right back into the ocean. Who knows, maybe you’ll find it roaming around the region!',
]);

const FloaromaFlowerGirl = new NPC('Flower Girl', [
    'Something amazing just happened!',
    'My friend was taking their Eevee on a walk through Eterna Forest, and it suddenly evolved!',
    'Can you believe that?',
]);

const EternaLassCaroline = new NPC('Lass Caroline', [
    'Oh you came from the Forest! That Old Chateau is so creepy isn’t it? I’ve heard that trainers that catch the weird ghost in the TV have found ghosts in other appliances. Even lawnmowers!',
]);

const OreburghConstructionWorker = new NPC('Construction Worker', [
    'I was doing some exploring in Mt. Coronet last week, and my Nosepass gained a lot of levels.',
    'I had a big suprise when he reached level 20 though!',
]);

const HearthomeContestFan = new NPC('Contest Fan', [
    'My favourite contestant had a big reveal for us this week!',
    'Their prized Magneton had evolved into a Magnezone!',
    'I\'m so happy for them, all of that training in Mt. Coronet must have paid off!',
]);

const PalParkWarden = new NPC('Pal Park Warden', [
    'Hey! Welcome to the Pal Park, have you been to my Dad’s Safari Zone in Kanto? We don’t have as many Pokémon here, but I’ve heard that a flower Pokémon found here can bloom when it’s sunny outside!',
]);

const CanalaveYoungBoy = new NPC('Young Boy', [
    'Oh hello! Say, have you ever heard of Cresselia? Once when I was really little I had a really bad dream I couldn’t wake up from, but then a kind trainer went to an island near here and got help from Cresselia to cure me!',
    'Maybe if you can prove yourself by conquering that island you could find Cresselia roaming around the region...',
]);

const SnowpointYoungGirl = new NPC('Young Girl', [
    'Someone told me that training an Eevee in Lake Acuity will make it evolve.',
    'They must be lying, how can that be true?!',
]);

const SunyshoreRibbonerJulia = new NPC('Ribboner Julia', [
    'Oh! I don’t get visitors often. My husband is a sailor who visits far away lands… he always tells me these fantastic things.',
    'Did you know that in Johto they don’t see Pokémon like Mamoswine? It’s strange too, because you don’t even need a stone to evolve Piloswine… maybe they should try the Day Care?',
]);

const SurvivalAreaSinnohRoamerNPC = new RoamerNPC('Hiker Kevin', [
    'I spotted a bunch of roaming Pokémon on {ROUTE_NAME}!',
], GameConstants.Region.sinnoh);

const ProfRowan = new ProfNPC('Prof. Rowan',
    GameConstants.Region.sinnoh,
    'Congratulations, you\'re more than half-way completed on the national Pokédex!',
    'Next stop is Unova! I\'ve always wanted to visit Castelia City personally...');



//Sinnoh Towns
TownList['Twinleaf Town'] = new Town(
    'Twinleaf Town',
    GameConstants.Region.sinnoh,
    [TwinleafTownShop],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)],
        npcs: [TwinleafContestChampion],
    }
);
TownList['Sandgem Town'] = new Town(
    'Sandgem Town',
    GameConstants.Region.sinnoh,
    [],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 201)],
        npcs: [ProfRowan, SandgemBeachcomber],
    }
);
TownList['Jubilife City'] = new Town(
    'Jubilife City',
    GameConstants.Region.sinnoh,
    [JubilifeCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 202)],
    }
);
TownList['Oreburgh City'] = new Town(
    'Oreburgh City',
    GameConstants.Region.sinnoh,
    [OreburghCityShop],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Oreburgh Gate'))],
        npcs: [OreburghConstructionWorker],
    }
);
TownList['Floaroma Town'] = new Town(
    'Floaroma Town',
    GameConstants.Region.sinnoh,
    [FloaromaTownShop],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.sinnoh, 204),
            new GymBadgeRequirement(BadgeEnums.Coal),
        ],
        npcs: [FloaromaFlowerGirl],
    }
);
TownList['Eterna City'] = new Town(
    'Eterna City',
    GameConstants.Region.sinnoh,
    [EternaCityShop, new MoveToDungeon(dungeonList['Team Galactic Eterna Building'])],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Eterna Forest'))],
        npcs: [EternaLassCaroline],
    }
);
TownList['Mt. Coronet'] = new Town(
    'Mt. Coronet',
    GameConstants.Region.sinnoh,
    [new MoveToDungeon(dungeonList['Mt. Coronet South']), new MoveToDungeon(dungeonList['Mt. Coronet North']), new MoveToDungeon(dungeonList['Spear Pillar']), new MoveToDungeon(dungeonList['Hall of Origin'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 207)],
    }
);
TownList['Hearthome City'] = new Town(
    'Hearthome City',
    GameConstants.Region.sinnoh,
    [HearthomeCityShop, SinnohBerryMaster],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 208)],
        npcs: [HearthomeContestFan],
    }
);
TownList['Solaceon Town'] = new Town(
    'Solaceon Town',
    GameConstants.Region.sinnoh,
    [SolaceonTownShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 209)],
    }
);
TownList['Veilstone City'] = new Town(
    'Veilstone City',
    GameConstants.Region.sinnoh,
    [DepartmentStoreShop, new MoveToDungeon(dungeonList['Team Galactic HQ'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 215)],
        npcs: [BigSpender],
    }
);
TownList['Pastoria City'] = new Town(
    'Pastoria City',
    GameConstants.Region.sinnoh,
    [PastoriaShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 213)],
    }
);
TownList['Celestic Town'] = new Town(
    'Celestic Town',
    GameConstants.Region.sinnoh,
    [CelesticTownShop],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Fen)],
    }
);
TownList['Pal Park'] = new Town(
    'Pal Park',
    GameConstants.Region.sinnoh,
    [PalParkShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 221)],
        npcs: [PalParkWarden],
    }
);
TownList['Canalave City'] = new Town(
    'Canalave City',
    GameConstants.Region.sinnoh,
    [CanalaveCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 218)],
        npcs: [CanalaveYoungBoy],
    }
);
TownList['Snowpoint City'] = new Town(
    'Snowpoint City',
    GameConstants.Region.sinnoh,
    [SnowpointCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 217)],
        npcs: [SnowpointYoungGirl],
    }
);
TownList['Sunyshore City'] = new Town(
    'Sunyshore City',
    GameConstants.Region.sinnoh,
    [SunyshoreCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 222)],
        npcs: [SunyshoreRibbonerJulia],
    }
);
TownList['Pokémon League Sinnoh'] = new Town(
    'Pokémon League Sinnoh',
    GameConstants.Region.sinnoh,
    [],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Sinnoh'))],
    }
);
TownList['Fight Area'] = new Town(
    'Fight Area',
    GameConstants.Region.sinnoh,
    [],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)],
    }
);
TownList['Survival Area'] = new Town(
    'Survival Area',
    GameConstants.Region.sinnoh,
    [SurvivalAreaShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 225)],
        npcs: [SurvivalAreaSinnohRoamerNPC],
    }
);
TownList['Resort Area'] = new Town(
    'Resort Area',
    GameConstants.Region.sinnoh,
    [ResortAreaShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 229)],
    }
);
TownList['Pokémon League Sinnoh'] = new Town(
    'Pokémon League Sinnoh',
    GameConstants.Region.sinnoh,
    [GymList['Elite Aaron'], GymList['Elite Bertha'], GymList['Elite Flint'], GymList['Elite Lucian'], GymList['Champion Cynthia'], pokeLeagueShop()],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.sinnoh, 223),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Sinnoh')),
        ],
    }
);

//Sinnoh Dungeons
TownList['Oreburgh Gate'] = new DungeonTown(
    'Oreburgh Gate',
    GameConstants.Region.sinnoh,
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 203)]
);
TownList['Valley Windworks'] = new DungeonTown(
    'Valley Windworks',
    GameConstants.Region.sinnoh,
    [
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 204),
        new GymBadgeRequirement(BadgeEnums.Coal),
    ]
);
TownList['Eterna Forest'] = new DungeonTown(
    'Eterna Forest',
    GameConstants.Region.sinnoh,
    [
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 205),
        new GymBadgeRequirement(BadgeEnums.Coal),
    ]
);
TownList['Old Chateau'] = new DungeonTown(
    'Old Chateau',
    GameConstants.Region.sinnoh,
    [
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 205),
        new GymBadgeRequirement(BadgeEnums.Forest),
    ]
);
TownList['Team Galactic Eterna Building'] = new DungeonTown(
    'Team Galactic Eterna Building',
    GameConstants.Region.sinnoh,
    [new GymBadgeRequirement(BadgeEnums.Forest)]
);
TownList['Wayward Cave'] = new DungeonTown(
    'Wayward Cave',
    GameConstants.Region.sinnoh,
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 206)]
);
TownList['Mt. Coronet South'] = new DungeonTown(
    'Mt. Coronet South',
    GameConstants.Region.sinnoh,
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 207)]
);
TownList['Solaceon Ruins'] = new DungeonTown(
    'Solaceon Ruins',
    GameConstants.Region.sinnoh,
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 209)]
);
TownList['Iron Island'] = new DungeonTown(
    'Iron Island',
    GameConstants.Region.sinnoh,
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 218)]
);
TownList['Lake Valor'] = new DungeonTown(
    'Lake Valor',
    GameConstants.Region.sinnoh,
    [new GymBadgeRequirement(BadgeEnums.Mine)]
);
TownList['Lake Verity'] = new DungeonTown(
    'Lake Verity',
    GameConstants.Region.sinnoh,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Lake Valor'))]
);
TownList['Mt. Coronet North'] = new DungeonTown(
    'Mt. Coronet North',
    GameConstants.Region.sinnoh,
    [
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 211),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Lake Verity')),
    ]
);
TownList['Lake Acuity'] = new DungeonTown(
    'Lake Acuity',
    GameConstants.Region.sinnoh,
    [new GymBadgeRequirement(BadgeEnums.Icicle)]
);
TownList['Team Galactic HQ'] = new DungeonTown(
    'Team Galactic HQ',
    GameConstants.Region.sinnoh,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Lake Acuity'))]
);
TownList['Spear Pillar'] = new DungeonTown(
    'Spear Pillar',
    GameConstants.Region.sinnoh,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Galactic HQ'))]
);
TownList['Distortion World'] = new DungeonTown(
    'Distortion World',
    GameConstants.Region.sinnoh,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Spear Pillar'))]
);
TownList['Victory Road Sinnoh'] = new DungeonTown(
    'Victory Road Sinnoh',
    GameConstants.Region.sinnoh,
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 223)]
);
TownList['Sendoff Spring'] = new DungeonTown(
    'Sendoff Spring',
    GameConstants.Region.sinnoh,
    [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)]
);
TownList['Hall of Origin'] = new DungeonTown(
    'Hall of Origin',
    GameConstants.Region.sinnoh,
    [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)]
);
TownList['Fullmoon Island'] = new DungeonTown(
    'Fullmoon Island',
    GameConstants.Region.sinnoh,
    [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)]
);
TownList['Newmoon Island'] = new DungeonTown(
    'Newmoon Island',
    GameConstants.Region.sinnoh,
    [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)]
);
TownList['Flower Paradise'] = new DungeonTown(
    'Flower Paradise',
    GameConstants.Region.sinnoh,
    [
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 224),
        new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion),
    ]
);
TownList['Stark Mountain'] = new DungeonTown(
    'Stark Mountain',
    GameConstants.Region.sinnoh,
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 227)]
);
TownList['Snowpoint Temple'] = new DungeonTown(
    'Snowpoint Temple',
    GameConstants.Region.sinnoh,
    [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)]
);

//Unova Shops
const AspertiaCityShop = new Shop([
    ItemList['Pokeball'],
]);
const FloccesyTownShop = new Shop([
    ItemList['Mystery_egg'],
]);
const VirbankCityShop = new Shop([
    ItemList['Greatball'],
]);
const CasteliaCityShop = new Shop([
    ItemList['Kindness_Digimental'],
    ItemList['Water_egg'],
    ItemList['Kings_rock'],
]);
const NimbasaCityShop = new Shop([
    ItemList['Plant_egg'],
    ItemList['Electric_egg'],
    ItemList['Metal_coat'],
]);
const DriftveilCityShop = new Shop([
    ItemList['Burpmon'],
    ItemList['Razor_claw'],
    ItemList['Razor_fang'],
]);
const MistraltonCityShop = new Shop([
    ItemList['Ultraball'],
    ItemList['Knowledge_Digimental'],
    ItemList['Upgrade'],
]);
const LentimasTownShop = new Shop([
    ItemList['Fire_egg'],
]);
const UndellaTownShop = new Shop([
    ItemList['Deepsea_scale'],
    ItemList['Deepsea_tooth'],
]);
const LacunosaTownShop = new Shop([
    ItemList['Earth_egg'],
]);
const OpelucidCityShop = new Shop([
    ItemList['Wind_egg'],
    ItemList['Dragon_scale'],
]);
const HumilauCityShop = new Shop([
    ItemList['Prism_scale'],
]);
const IcirrusCityShop = new Shop([
    ItemList['Dubious_disc'],
    ItemList['Reaper_cloth'],
    ItemList['Protector'],
]);
const BlackAndWhiteParkShop = new Shop([
    ItemList['Hope_Digimental'],
    ItemList['Love_Digimental'],
]);
const NacreneCityShop = new Shop([
    ItemList['Soothe_bell'],
]);
const StriatonCityShop = new Shop([
    ItemList['Purity_Digimental'],
    ItemList['Sincerity_Digimental'],
    ItemList['Courage_Digimental'],
]);
const AccumulaTownShop = new Shop([
    ItemList['Fate_Digimental'],
    ItemList['Miracles_Digimental'],
    ItemList['Light_Digimental'],
]);
const NuvemaTownShop = new Shop([
    ItemList['Electirizer'],
    ItemList['Magmarizer'],
]);
const AnvilleTownShop = new Shop([
    ItemList['Burpmon'],
]);

//Unova Gem Master
const UnovaFluteMaster = new GemMasterShop([]);

//Unova NPCs
const ExcitedChild = new NPC('Excited Child', [
    'Did you hear? Did you see? It was on TV!',
    'I was just watching my favorite show, The National Gymquirer. It was a live segment! Some hot shot trainer from Kanto defeated Drayden! It was amazing! That trainer is so cool! Drayden is like unbeatable.',
    'Then my programme got interrupted by an emergency broadcast. A report on the first confirmed sightings of Tornadus and Thundurus in over twenty-five years! I\'ve read so much about them, they are my favorites.',
    'Last time they were spotted they just roamed around, causing all kinds of mischief. According to my books anyway. I\'m sure that amazing trainer from the TV will want to catch these mighty forces of nature.',
]);

const CasteliaMusician = new NPC('Musician', [
    'Sup. Ya like jazz? No? Well then you should check out me and my band at the Sonata Cafe where we never play Jazz.',
    'Sometimes a cool singing Pokémon shows up and joins in on our set. I’ve heard that trainers as strong as the Champion have found it roaming around the region looking for Pokémon battles… but even I wouldn’t challenge it to a Music battle.',
]);

const NimbasaExplorer = new NPC('Explorer', [
    'Whew! The desert is rough out there, glad you\'ve made it all the way to Nimbasa.',
    'Sometimes I find some weird stuff out in the sand, sometimes even Pokémon hiding in Chests. Like this one time in Relic Castle, I found a Pokémon that looks like a statue that I\'ve never seen before!',
]);

const IcirrusFanClubChairman = new NPC('Fan Club Chairman', [
    'Legends say Kyurem is missing a part of itself. It is waiting for a hero to fill in the missing parts of its body with Truth or Ideals.',
    'The legendary dragons of Dragonspiral Tower are said to embody these very concepts. They sometimes leave a piece of their DNA behind after a battle.',
    'If you have DNA splicers, perhaps you can make Kyurem whole again.',
    'I\'ve never seen it, but supposedly it works just like any evolution stone.',
]);

const UnovaRoamerNPC = new RoamerNPC('Professor Juniper\'s Aide', [
    'Our research indicates a higher concentration of roaming Pokémon on {ROUTE_NAME}!',
], GameConstants.Region.unova);

const ProfJuniper = new ProfNPC('Prof. Juniper',
    GameConstants.Region.unova,
    'Let me see your progress...Ah, fantastic, as usual!',
    'Allow me some time to arrange tickets for your next destination.');

//Unova Towns
TownList['Aspertia City'] = new Town(
    'Aspertia City',
    GameConstants.Region.unova,
    [AspertiaCityShop],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)],
        npcs: [],
    }
);
TownList['Floccesy Town'] = new Town(
    'Floccesy Town',
    GameConstants.Region.unova,
    [FloccesyTownShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.unova, 19)],
    }
);
TownList['Virbank City'] = new Town(
    'Virbank City',
    GameConstants.Region.unova,
    [VirbankCityShop],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Basic)],
    }
);
TownList['Castelia City'] = new Town(
    'Castelia City',
    GameConstants.Region.unova,
    [CasteliaCityShop, new MoveToDungeon(dungeonList['Castelia Sewers'])],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Toxic)],
        npcs: [CasteliaMusician],
    }
);
TownList['Nimbasa City'] = new Town(
    'Nimbasa City',
    GameConstants.Region.unova,
    [NimbasaCityShop],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.unova, 4),
            new GymBadgeRequirement(BadgeEnums.Insect),
        ],
        npcs: [NimbasaExplorer],
    }
);
TownList['Driftveil City'] = new Town(
    'Driftveil City',
    GameConstants.Region.unova,
    [DriftveilCityShop],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.unova,5),
            new GymBadgeRequirement(BadgeEnums.Bolt),
        ],
    }
);
TownList['Mistralton City'] = new Town(
    'Mistralton City',
    GameConstants.Region.unova,
    [MistraltonCityShop],
    {
        requirements: [
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Chargestone Cave')),
            new GymBadgeRequirement(BadgeEnums.Quake),
        ],
    }
);
TownList['Lentimas Town'] = new Town(
    'Lentimas Town',
    GameConstants.Region.unova,
    [LentimasTownShop],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Jet)],
    }
);
TownList['Undella Town'] = new Town(
    'Undella Town',
    GameConstants.Region.unova,
    [UndellaTownShop, UnovaFluteMaster],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Reversal Mountain'))],
    }
);
TownList['Lacunosa Town'] = new Town(
    'Lacunosa Town',
    GameConstants.Region.unova,
    [LacunosaTownShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.unova, 13)],
    }
);
TownList['Opelucid City'] = new Town(
    'Opelucid City',
    GameConstants.Region.unova,
    [OpelucidCityShop, new MoveToDungeon(dungeonList['Team Plasma Assault'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.unova, 11)],
    }
);
TownList['Shopping Mall Nine'] = new Town(
    'Shopping Mall Nine',
    GameConstants.Region.unova,
    [DepartmentStoreShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.unova, 9)],
    }
);
TownList['Humilau City'] = new Town(
    'Humilau City',
    GameConstants.Region.unova,
    [HumilauCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.unova, 21)],
        npcs: [ExcitedChild],
    }
);
TownList['Icirrus City'] = new Town(
    'Icirrus City',
    GameConstants.Region.unova,
    [IcirrusCityShop],
    {
        requirements: [new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.unova, 8),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Twist Mountain')),
        ])],
        npcs: [IcirrusFanClubChairman],
    }
);
TownList['Black and White Park'] = new Town(
    'Black and White Park',
    GameConstants.Region.unova,
    [BlackAndWhiteParkShop],
    {
        requirements: [new OneFromManyRequirement([
            new MultiRequirement([
                new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion),
                new RouteKillRequirement(10, GameConstants.Region.unova, 14),
            ]),
            new RouteKillRequirement(10, GameConstants.Region.unova, 15),
        ])],
    }
);
TownList['Nacrene City'] = new Town(
    'Nacrene City',
    GameConstants.Region.unova,
    [NacreneCityShop],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Pinwheel Forest'))],
    }
);
TownList['Striaton City'] = new Town(
    'Striaton City',
    GameConstants.Region.unova,
    [StriatonCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.unova, 3)],
    }
);
TownList['Accumula Town'] = new Town(
    'Accumula Town',
    GameConstants.Region.unova,
    [AccumulaTownShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.unova, 2)],
    }
);
TownList['Nuvema Town'] = new Town(
    'Nuvema Town',
    GameConstants.Region.unova,
    [NuvemaTownShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.unova, 1)],
        npcs: [ProfJuniper, UnovaRoamerNPC],
    }
);
TownList['Anville Town'] = new Town(
    'Anville Town',
    GameConstants.Region.unova,
    [AnvilleTownShop],
    {
        requirements: [
            new ObtainedPokemonRequirement(pokemonMap['Meloetta (aria)']),
            new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion),
        ],
    }
);
TownList['Pokémon League Unova'] = new Town(
    'Pokémon League Unova',
    GameConstants.Region.unova,
    [GymList['Elite Shauntal'], GymList['Elite Marshal'], GymList['Elite Grimsley'], GymList['Elite Caitlin'], GymList['Champion Iris'], pokeLeagueShop()],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.unova, 23),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Unova')),
        ],
    }
);

//Unova Dungeons
TownList['Pledge Grove'] = new DungeonTown(
    'Pledge Grove',
    GameConstants.Region.unova,
    [
        new ObtainedPokemonRequirement(pokemonMap.Burpmon),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Moor of Icirrus')),
    ]
);
TownList['Floccesy Ranch'] = new DungeonTown(
    'Floccesy Ranch',
    GameConstants.Region.unova,
    [new RouteKillRequirement(10, GameConstants.Region.unova, 20)]
);
TownList['Liberty Garden'] = new DungeonTown(
    'Liberty Garden',
    GameConstants.Region.unova,
    //Victini dungeon, maybe unlock later
    [new GymBadgeRequirement(BadgeEnums.Toxic)]
);
TownList['Castelia Sewers'] = new DungeonTown(
    'Castelia Sewers',
    GameConstants.Region.unova,
    [new GymBadgeRequirement(BadgeEnums.Toxic)]
);
TownList['Relic Passage'] = new DungeonTown(
    'Relic Passage',
    GameConstants.Region.unova,
    [
        new RouteKillRequirement(10, GameConstants.Region.unova,5),
        new GymBadgeRequirement(BadgeEnums.Bolt),
    ]
);
TownList['Relic Castle'] = new DungeonTown(
    'Relic Castle',
    GameConstants.Region.unova,
    [new RouteKillRequirement(10, GameConstants.Region.unova, 25)]
);
TownList['Lostlorn Forest'] = new DungeonTown(
    'Lostlorn Forest',
    GameConstants.Region.unova,
    [new RouteKillRequirement(10, GameConstants.Region.unova, 16)]
);
TownList['Chargestone Cave'] = new DungeonTown(
    'Chargestone Cave',
    GameConstants.Region.unova,
    [new RouteKillRequirement(10, GameConstants.Region.unova, 6)]
);
TownList['Mistralton Cave'] = new DungeonTown(
    'Mistralton Cave',
    GameConstants.Region.unova,
    [
        new GymBadgeRequirement(BadgeEnums.Quake),
        new RouteKillRequirement(10, GameConstants.Region.unova, 6),
    ]
);
TownList['Celestial Tower'] = new DungeonTown(
    'Celestial Tower',
    GameConstants.Region.unova,
    [new RouteKillRequirement(10, GameConstants.Region.unova, 7)]
);
TownList['Reversal Mountain'] = new DungeonTown(
    'Reversal Mountain',
    GameConstants.Region.unova,
    [new GymBadgeRequirement(BadgeEnums.Jet)]
);
TownList['Team Plasma Assault'] = new DungeonTown(
    'Team Plasma Assault',
    GameConstants.Region.unova,
    [
        new GymBadgeRequirement(BadgeEnums.Legend),
    ]
);
TownList['Seaside Cave'] = new DungeonTown(
    'Seaside Cave',
    GameConstants.Region.unova,
    [
        new RouteKillRequirement(10, GameConstants.Region.unova, 24),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Plasma Assault')),
    ]
);
TownList['Plasma Frigate'] = new DungeonTown(
    'Plasma Frigate',
    GameConstants.Region.unova,
    [
        new RouteKillRequirement(10, GameConstants.Region.unova, 22),
        new GymBadgeRequirement(BadgeEnums.Wave),
    ]
);
TownList['Giant Chasm'] = new DungeonTown(
    'Giant Chasm',
    GameConstants.Region.unova,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Plasma Frigate'))]
);
TownList['Cave of Being'] = new DungeonTown(
    'Cave of Being',
    GameConstants.Region.unova,
    [new RouteKillRequirement(10, GameConstants.Region.unova, 23)]
);
TownList['Abundant Shrine'] = new DungeonTown(
    'Abundant Shrine',
    GameConstants.Region.unova,
    [
        new RouteKillRequirement(10, GameConstants.Region.unova, 23),
        new RouteKillRequirement(10, GameConstants.Region.unova, 14),
        new ObtainedPokemonRequirement(pokemonMap.Burpmon),
        new ObtainedPokemonRequirement(pokemonMap.Burpmon),
    ]
);
TownList['Victory Road Unova'] = new DungeonTown(
    'Victory Road Unova',
    GameConstants.Region.unova,
    [new RouteKillRequirement(10, GameConstants.Region.unova, 23)]
);
TownList['Twist Mountain'] = new DungeonTown(
    'Twist Mountain',
    GameConstants.Region.unova,
    [new OneFromManyRequirement([
        new MultiRequirement([
            new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion),
            new RouteKillRequirement(10, GameConstants.Region.unova, 7),
        ]),
        new RouteKillRequirement(10, GameConstants.Region.unova, 8),
    ])]
);
TownList['Dragonspiral Tower'] = new DungeonTown(
    'Dragonspiral Tower',
    GameConstants.Region.unova,
    [new OneFromManyRequirement([
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Twist Mountain')),
        new RouteKillRequirement(10, GameConstants.Region.unova, 8),
    ])]
);
TownList['Moor of Icirrus'] = new DungeonTown(
    'Moor of Icirrus',
    GameConstants.Region.unova,
    [
        new RouteKillRequirement(10, GameConstants.Region.unova, 8),
        new ObtainedPokemonRequirement(pokemonMap.Burpmon),
        new ObtainedPokemonRequirement(pokemonMap.Burpmon),
        new ObtainedPokemonRequirement(pokemonMap.Burpmon),
    ]
);
TownList['Pinwheel Forest'] = new DungeonTown(
    'Pinwheel Forest',
    GameConstants.Region.unova,
    [new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)]
);
TownList['Dreamyard'] = new DungeonTown(
    'Dreamyard',
    GameConstants.Region.unova,
    [new RouteKillRequirement(10, GameConstants.Region.unova, 3)]
);
TownList['P2 Laboratory'] = new DungeonTown(
    'P2 Laboratory',
    GameConstants.Region.unova,
    [new RouteKillRequirement(10, GameConstants.Region.unova, 17)]
);

//Kalos Shops
const VanivilleTownShop = new Shop([
    ItemList['Pokeball'],
]);
const SantaluneCityShop = new Shop([
    ItemList['Mystery_egg'],
]);
const CamphrierTownShop = new Shop([
    ItemList['Greatball'],
    ItemList['Knowledge_Digimental'],
    ItemList['Electric_egg'],
]);
const AmbretteTownShop = new Shop([
    ItemList['Water_egg'],
    ItemList['Sincerity_Digimental'],
]);
const GeosengeTownShop = new Shop([
    ItemList['Fire_egg'],
    ItemList['Courage_Digimental'],
    ItemList['Kings_rock'],
]);
const ShalourCityShop = new Shop([
    ItemList['Earth_egg'],
    ItemList['Metal_coat'],
    ItemList['Kindness_Digimental'],
]);
const CoumarineCityShop = new Shop([
    ItemList['Ultraball'],
    ItemList['Plant_egg'],
    ItemList['Purity_Digimental'],
    ItemList['Electirizer'],
    ItemList['Magmarizer'],
]);
const LaverreCityShop = new Shop([
    ItemList['Sachet'],
    ItemList['Whipped_dream'],
    ItemList['Deepsea_scale'],
    ItemList['Deepsea_tooth'],
]);
const DendemilleTownShop = new Shop([
    ItemList['Fate_Digimental'],
    ItemList['Miracles_Digimental'],
    ItemList['Light_Digimental'],
    ItemList['Upgrade'],
]);
const AnistarCityShop = new Shop([
    ItemList['Love_Digimental'],
    ItemList['Hope_Digimental'],
    ItemList['Razor_claw'],
    ItemList['Razor_fang'],
]);
const CouriwayTownShop = new Shop([
    ItemList['Wind_egg'],
    ItemList['Dragon_scale'],
    ItemList['Prism_scale'],
]);
const SnowbelleCityShop = new Shop([
    ItemList['Protector'],
    ItemList['Reaper_cloth'],
    ItemList['Dubious_disc'],
]);

//Kalos NPCs

const LumioseEngineer = new NPC('Engineer', [
    'I\'m glad to be back in the city after so long at the Power Plant, it\'s so dusty out there!.',
    'Rumor has it that if you conquer the Kalos Power Plant enough times that a strong Pokémon will challenge you made of Fire and Water. But I bet you’d have to be the Champion before it finds you worthy… I certainly have never seen it!',
]);

const CamphrierFlabébéEnthusiast = new NPC('Flabébé Enthusiast', [
    'Ah, isn\'t Flabébé such an eye-catching Pokémon? All these different lovely colors…',
    'If you\'re searching for the yellow and blue kinds, look no further than the Farm!',
    'They simply can\'t resist berries that match their colors - just plant a few and they\'ll soon come wandering in.',
]);

const CoumarineBirdwatcher = new NPC('Birdwatcher', [
    'I\'ve heard there is a cave you can find if you go out on the ocean a little ways.',
    'Apparently defeating a strong creature there unleashes some energy.',
    'There are rumors that the energy calls some legendary birds to roam Kalos!',
]);

const LaverreFurisodeGirlKatherine = new NPC('Furisode Girl Katherine', [
    'Don\'t you find Goomy to be an interesting Pokémon? I certainly think so, even though it isn\'t a problem for my Pokémon~',
    'I\'ve heard its evolutionary line loves damp conditions, and apparently if you train a Sliggoo during rainy or foggy weather something marvelous happens!',
]);

const AnistarKalosRoamerNPC = new RoamerNPC('Hex Maniac Melanie', [
    'The spirits tell me roaming Pokémon have been spotted on {ROUTE_NAME}!',
], GameConstants.Region.kalos);

const KiloudeConfusedHiker = new NPC('Confused Hiker', [
    'Whoa! What the- Where am I? How did I get here? Last thing I can remember I was in Reflection Cave when this little Pokémon with hoops threw something at me… Oh you’ve beaten the Pokémon League? Maybe you can find it roaming around the region so you can tame that little prankster. Now how am I gonna get home…',
]);

const ProfSycamore = new ProfNPC('Prof. Sycamore',
    GameConstants.Region.kalos,
    'You\'re encountering Pokémon at a really good clip, aren\'t you? Congratulations! You completed the Pokédex!',
    'Onward to Alola, shall we?');

//Kalos Towns

TownList['Vaniville Town'] = new Town(
    'Vaniville Town',
    GameConstants.Region.kalos,
    [VanivilleTownShop],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)],
        npcs: [],
    }
);
TownList['Aquacorde Town'] = new Town(
    'Aquacorde Town',
    GameConstants.Region.kalos,
    [],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 1)],
    }
);
TownList['Santalune City'] = new Town(
    'Santalune City',
    GameConstants.Region.kalos,
    [SantaluneCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 3)],
    }
);
TownList['Lumiose City'] = new Town(
    'Lumiose City',
    GameConstants.Region.kalos,
    [DepartmentStoreShop,SantaluneCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 4)],
        npcs: [ProfSycamore, LumioseEngineer],
    }
);
TownList['Camphrier Town'] = new Town(
    'Camphrier Town',
    GameConstants.Region.kalos,
    [CamphrierTownShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 5)],
        npcs: [CamphrierFlabébéEnthusiast],
    }
);
TownList['Ambrette Town'] = new Town(
    'Ambrette Town',
    GameConstants.Region.kalos,
    [AmbretteTownShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 8)],
    }
);
TownList['Cyllage City'] = new Town(
    'Cyllage City',
    GameConstants.Region.kalos,
    [],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Glittering Cave'))],
    }
);
TownList['Geosenge Town'] = new Town(
    'Geosenge Town',
    GameConstants.Region.kalos,
    [GeosengeTownShop, new MoveToDungeon(dungeonList['Team Flare Secret HQ'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 10)],
    }
);
TownList['Shalour City'] = new Town(
    'Shalour City',
    GameConstants.Region.kalos,
    [ShalourCityShop],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Reflection Cave'))],
    }
);
TownList['Coumarine City'] = new Town(
    'Coumarine City',
    GameConstants.Region.kalos,
    [CoumarineCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 12)],
        npcs: [CoumarineBirdwatcher],
    }
);
TownList['Laverre City'] = new Town(
    'Laverre City',
    GameConstants.Region.kalos,
    [LaverreCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 14)],
        npcs: [LaverreFurisodeGirlKatherine],
    }
);
TownList['Dendemille Town'] = new Town(
    'Dendemille Town',
    GameConstants.Region.kalos,
    [DendemilleTownShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 15)],
    }
);
TownList['Anistar City'] = new Town(
    'Anistar City',
    GameConstants.Region.kalos,
    [AnistarCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 17)],
        npcs: [AnistarKalosRoamerNPC],
    }
);
TownList['Couriway Town'] = new Town(
    'Couriway Town',
    GameConstants.Region.kalos,
    [CouriwayTownShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 18)],
    }
);
TownList['Snowbelle City'] = new Town(
    'Snowbelle City',
    GameConstants.Region.kalos,
    [SnowbelleCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 19)],
    }
);
TownList['Kiloude City'] = new Town(
    'Kiloude City',
    GameConstants.Region.kalos,
    [],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)],
        npcs: [KiloudeConfusedHiker],
    }
);
TownList['Pokémon League Kalos'] = new Town(
    'Pokémon League Kalos',
    GameConstants.Region.kalos,
    [GymList['Elite Malva'], GymList['Elite Siebold'], GymList['Elite Wikstrom'], GymList['Elite Drasna'], GymList['Champion Diantha'], pokeLeagueShop()],
    {
        requirements: [
            new OneFromManyRequirement([
                new RouteKillRequirement(10, GameConstants.Region.kalos, 21),
                new RouteKillRequirement(10, GameConstants.Region.kalos, 22),
            ]),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Kalos')),
        ],
    }
);

//Kalos Dungeons
TownList['Santalune Forest'] = new DungeonTown(
    'Santalune Forest',
    GameConstants.Region.kalos,
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 2)]
);
TownList['Parfum Palace'] = new DungeonTown(
    'Parfum Palace',
    GameConstants.Region.kalos,
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 6)]
);
TownList['Connecting Cave'] = new DungeonTown(
    'Connecting Cave',
    GameConstants.Region.kalos,
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 7)]
);
TownList['Glittering Cave'] = new DungeonTown(
    'Glittering Cave',
    GameConstants.Region.kalos,
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 9)]
);
TownList['Reflection Cave'] = new DungeonTown(
    'Reflection Cave',
    GameConstants.Region.kalos,
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 11)]
);
//Tower of Mastery?
TownList['Sea Spirit\'s Den'] = new DungeonTown(
    'Sea Spirit\'s Den',
    GameConstants.Region.kalos,
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 23)]
);
TownList['Pokéball Factory'] = new DungeonTown(
    'Pokéball Factory',
    GameConstants.Region.kalos,
    [new GymBadgeRequirement(BadgeEnums.Fairy)]
);
TownList['Kalos Power Plant'] = new DungeonTown(
    'Kalos Power Plant',
    GameConstants.Region.kalos,
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 13), new GymBadgeRequirement(BadgeEnums.Plant)]
);
TownList['Lost Hotel'] = new DungeonTown(
    'Lost Hotel',
    GameConstants.Region.kalos,
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 15)]
);
TownList['Frost Cavern'] = new DungeonTown(
    'Frost Cavern',
    GameConstants.Region.kalos,
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 15)]
);
TownList['Team Flare Secret HQ'] = new DungeonTown(
    'Team Flare Secret HQ',
    GameConstants.Region.kalos,
    [new GymBadgeRequirement(BadgeEnums.Psychic)]
);
TownList['Terminus Cave'] = new DungeonTown(
    'Terminus Cave',
    GameConstants.Region.kalos,
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 18)]
);
TownList['Pokémon Village'] = new DungeonTown(
    'Pokémon Village',
    GameConstants.Region.kalos,
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 20)]
);
TownList['Victory Road Kalos'] = new DungeonTown(
    'Victory Road Kalos',
    GameConstants.Region.kalos,
    [
        new GymBadgeRequirement(BadgeEnums.Iceberg),
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.kalos, 21),
            new RouteKillRequirement(10, GameConstants.Region.kalos, 22),
        ]),
    ]
);
//Unknown Cave?

//Alola Shops

const IkiTownOutskirtsShop = new Shop([
    ItemList['Pokeball'],
]);
const HauoliCityShop = new Shop([
    ItemList['Mystery_egg'],
    ItemList['Miracles_Digimental'],
    ItemList['Fate_Digimental'],
    ItemList['Light_Digimental'],
]);
const HeaheaCityShop = new Shop([
    ItemList['Greatball'],
    ItemList['Sincerity_Digimental'],
    ItemList['Metal_coat'],
    ItemList['Kings_rock'],
]);
const PaniolaTownShop = new Shop([
    ItemList['Plant_egg'],
    ItemList['Fire_egg'],
    ItemList['Water_egg'],
]);
const KonikoniCityShop = new Shop([
    ItemList['Courage_Digimental'],
    ItemList['Soothe_bell'],
    ItemList['Kindness_Digimental'],
]);
const AetherParadiseShop = new Shop([
    ItemList['Type: Null'],
    ItemList['Upgrade'],
]);
const MalieCityShop = new Shop([
    ItemList['Ultraball'],
    ItemList['Knowledge_Digimental'],
    ItemList['Electric_egg'],
    ItemList['Magmarizer'],
    ItemList['Electirizer'],
]);
const TapuVillageShop = new Shop([
    ItemList['Friendship_Digimental'],
    ItemList['Razor_claw'],
    ItemList['Razor_fang'],
]);
const SeafolkVillageShop = new Shop([
    ItemList['Earth_egg'],
    ItemList['Deepsea_scale'],
    ItemList['Deepsea_tooth'],
    ItemList['Prism_scale'],
    ItemList['Sachet'],
    ItemList['Whipped_dream'],
]);
const ExeggutorIslandShop = new Shop([
    ItemList['Wind_egg'],
    ItemList['Purity_Digimental'],
    ItemList['Dragon_scale'],
    ItemList['Protector'],
    ItemList['Dubious_disc'],
    ItemList['Reaper_cloth'],
]);
const AltaroftheSunneandMooneShop = new Shop([
    ItemList['Poipole'],
    ItemList['Love_Digimental'],
    ItemList['Hope_Digimental'],
]);

//Alola NPCs

const IkiOutskirtsMom = new NPC('Scratch Cat Girl', [
    'I love cats very much, but dogs aren\'t so bad either.',
    'Out of all the dog like Pokémon, I think Rockruff is definitely the most adorable. And it even has three evolutions! One during the day, one at night and one in between, from 5 to 6 o\'clock.',
    'What\'s that? AM or PM?',
    'Yes.',
]);
const KukuisLabProfessor = new NPC('Professor Kukui', [
    'Are you looking for some rare Pokémon? Maybe I can help with that. Ask away!',
    'Ultra Beast? Never heard of it. I have no idea what that is. As far as I know they simply do not exist.',
    'Meltan? What\'s a Meltan? Nope, don\'t know about that one either.',
    'You seem very sure about this. Look, if you\'re so certain that these things you are talking about are real, I\'m sure they will show up sooner or later. If you\'re patient...',
    'You got me all excited. We\'ll WAIT FOR these new rare Pokémon together. Hold on, let me just UPDATE my calendar. Just to be sure I\'m free to investigate these new Pokémon that only you know about when they show up. I wouldn\'t miss this for the world.',
]);
const IkiKahuna = new NPC('Kahuna Hala', [
    'Welcome to Alola!',
    'Here we don\'t have gyms. We have the Island Challenge. On each of our four islands you will complete one or more trials.',
    'After completing all of an island\'s trials you will battle that island\'s Kahuna in a Grand trial.',
    'This island only has one trial: Captain Ilima\'s trial in Verdant Cavern, below the Melemele Woods. Come back here after clearing that challenge for your Grand trial battle.',
]);
const HeaheaCafeOwner = new NPC('Café Owner', [
    'Akala Island has three trials.',
    'Captain Lana\'s trial in Brooklet Hill, Captain Kiawe\'s trial in Wela Volcano Park and Captain Mallow\'s trial in Lush Jungle.',
    'For what it\'s worth, I say don\'t go to any of those places. Too wet, too hot and too... jungly. Why not stay here? Have a coffee! Enjoy the city!',
    'Or go to Konikoni City down south. You might even meet our Kahuna there!',
]);
const PaniolaTownActor = new NPC('Actor Meredith', [
    'I love Oricorio. I can tell you all about it!',
    'Each of the four islands in Alola has its own meadow, and each meadow has its own form of Oricorio. Each island, except for Akala Island. So you\'d think there\'s only three forms of Oricorio, right?',
    'Wrong! There is a fourth! Did you know you can find all of the Oricorio forms on the farm? One of them doesn\'t appear anywhere else!',
    'Each Oricorio form is attracted to the berry color that matches its own style. Red for Baile style, yellow for Pom-Pom style, pink for Pa\'u style and purple for Sensu style.',
    'You want to know which one can only be found on the farm? I\'m sure you can figure that out yourself. Simple process of elimination really.',
]);
const RoyalAvenueSpectator = new NPC('Spectator', [
    'I think battles in the Battle Royal Dome are more like games of chance. But Battle Royals are nothing compared to trying to evolve an Alolan Raichu with a Thunderstone.',
    'Evolving Pikachu or Exeggcute in Alola can result in a new form! Sometimes.',
]);
const KonikoniKahuna = new NPC('Kahuna Olivia', [
    'What do you mean Grand trials are just like gym battles? It\'s a totally different thing!',
    'Come fight me in our very special and unique brand new Pokémon League and see if you still think our Island Challenge is nothing special!',
]);
const MalieKahuna = new NPC('Kahuna Nanu', [
    'A trial-goer, huh? Figures.',
    'Just go clear Captain Sophocles\' trial at the Hokulani Observatory and Captain Acerola\'s Trial at the Thrifty Megamart. And take care of those Team Skull punks in Po Town while you\'re at it.',
    'Then come back here so we can get this Grand trial over with.',
]);
const TapuWorker = new NPC('Worker', [
    'Yesterday was my first day working on Mount Lanakila. I was up there maintaining the paths to the new Pokémon League.',
    'My trusty Crabrawler was with me. He was smashing some rocks that were blocking the path, having a grand ol\' time like usual, when suddenly we were attacked by a wild pokémon!',
    'After the battle Crabrawler evolved! I didn\'t even know he could do that. He\'s so different now. But I still love him. He\'s my best friend, and he\'s even better at rock smashing now!',
]);
const SeafolkCaptain = new NPC('Captain Mina', [
    'My trial is in this town. Right there, inside my very own houseboat. However, I want you to clear the trial in Vast Poni Canyon first. It has no Captain, so you\'ll be all on your own. Be careful.',
    'If you can clear my trial you\'ll find our Kahuna on Exeggutor Island.',
]);
const AetherParadiseAlolaRoamerNPC = new RoamerNPC('Assistant Branch Chief Wicke', [
    'Some very rare Pokémon have been sighted on {ROUTE_NAME}. I hope we can learn more about them.',
], GameConstants.Region.alola);
const ProfKukui = new ProfNPC('Prof. Kukui',
    GameConstants.Region.alola,
    'TODO',
    'TODO');

//Alola Towns

TownList['Iki Town Outskirts'] = new Town(
    'Iki Town Outskirts',
    GameConstants.Region.alola,
    [IkiTownOutskirtsShop],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)],
        npcs: [IkiOutskirtsMom],
    }
);
TownList['Iki Town'] = new Town(
    'Iki Town',
    GameConstants.Region.alola,
    [],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 1)],
        npcs: [IkiKahuna],
    }
);
TownList['Professor Kukui\'s Lab'] = new Town(
    'Professor Kukui\'s Lab',
    GameConstants.Region.alola,
    [],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 18)],
        npcs: [KukuisLabProfessor/*ProfKukui*/], // TODO: replace the NPC when all pokemons are catchable
    }
);
TownList['Hau\'oli City'] = new Town(
    'Hau\'oli City',
    GameConstants.Region.alola,
    [HauoliCityShop],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Trainers\' School'))],
    }
);
TownList['Melemele Woods'] = new Town(
    'Melemele Woods',
    GameConstants.Region.alola,
    [new MoveToDungeon(dungeonList['Verdant Cavern']), new MoveToDungeon(dungeonList['Melemele Meadow']), new MoveToDungeon(dungeonList['Ruins of Conflict'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 2)],
    }
);
//TODO: Change requirement when UB questline is merged.
TownList['Roadside Motel'] = new Town(
    'Roadside Motel',
    GameConstants.Region.alola,
    [],
    {
        // requirements: [new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)],
        requirements: [new NullRequirement()],
    }
);
TownList['Heahea City'] = new Town(
    'Heahea City',
    GameConstants.Region.alola,
    [HeaheaCityShop, new DockTownContent()],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.FightiniumZ)],
        npcs: [HeaheaCafeOwner],
    }
);
TownList['Paniola Town'] = new Town(
    'Paniola Town',
    GameConstants.Region.alola,
    [PaniolaTownShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 4)],
        npcs: [PaniolaTownActor],
    }
);
TownList['Royal Avenue'] = new Town(
    'Royal Avenue',
    GameConstants.Region.alola,
    [DepartmentStoreShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 6)],
        npcs: [RoyalAvenueSpectator],
    }
);
TownList['Konikoni City'] = new Town(
    'Konikoni City',
    GameConstants.Region.alola,
    [KonikoniCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 9)],
        npcs: [KonikoniKahuna],
    }
);
TownList['Aether Paradise'] = new Town(
    'Aether Paradise',
    GameConstants.Region.alola,
    [TemporaryBattleList['Ultra Wormhole'], AetherParadiseShop, new MoveToDungeon(dungeonList['Aether Foundation'])],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.RockiumZ)],
        npcs: [AetherParadiseAlolaRoamerNPC],
    }
);
TownList['Malie City'] = new Town(
    'Malie City',
    GameConstants.Region.alola,
    [MalieCityShop, new DockTownContent()],
    {
        requirements: [new TemporaryBattleRequirement('Ultra Wormhole')],
        npcs: [MalieKahuna],
    }
);
TownList['Tapu Village'] = new Town(
    'Tapu Village',
    GameConstants.Region.alola,
    [TapuVillageShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 13)],
        npcs: [TapuWorker],
    }
);
TownList['Seafolk Village'] = new Town(
    'Seafolk Village',
    GameConstants.Region.alola,
    [SeafolkVillageShop, new MoveToDungeon(dungeonList['Mina\'s Houseboat'])],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Aether Foundation'))],
        npcs: [SeafolkCaptain],
    }
);
TownList['Exeggutor Island'] = new Town(
    'Exeggutor Island',
    GameConstants.Region.alola,
    [ExeggutorIslandShop, new MoveToDungeon(dungeonList['Exeggutor Island Hill'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 25)],
    }
);
TownList['Altar of the Sunne and Moone'] = new Town(
    'Altar of the Sunne and Moone',
    GameConstants.Region.alola,
    [TemporaryBattleList['Ultra Megalopolis'], AltaroftheSunneandMooneShop],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Vast Poni Canyon'))],
    }
);
TownList['Pokémon League Alola'] = new Town(
    'Pokémon League Alola',
    GameConstants.Region.alola,
    [GymList['Elite Molayne'], GymList['Elite Olivia'], GymList['Elite Acerola'], GymList['Elite Kahili'], GymList['Champion Hau'], pokeLeagueShop()],
    {
        requirements:[
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mount Lanakila')),
        ],
    }
);

//Alola Dungeons
TownList['Trainers\' School'] = new DungeonTown(
    'Trainers\' School',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 18)]
);
TownList['Hau\'oli Cemetery'] = new DungeonTown(
    'Hau\'oli Cemetery',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 2)]
);
TownList['Verdant Cavern'] = new DungeonTown(
    'Verdant Cavern',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 2)]
);
TownList['Melemele Meadow'] = new DungeonTown(
    'Melemele Meadow',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 3)]
);
TownList['Seaward Cave'] = new DungeonTown(
    'Seaward Cave',
    GameConstants.Region.alola,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Melemele Meadow'))]
);
TownList['Ten Carat Hill'] = new DungeonTown(
    'Ten Carat Hill',
    GameConstants.Region.alola,
    [new GymBadgeRequirement(BadgeEnums.FightiniumZ)]
);
TownList['Pikachu Valley'] = new DungeonTown(
    'Pikachu Valley',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 4)]
);
TownList['Paniola Ranch'] = new DungeonTown(
    'Paniola Ranch',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 4)]
);
TownList['Brooklet Hill'] = new DungeonTown(
    'Brooklet Hill',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 5)]
);
TownList['Wela Volcano Park'] = new DungeonTown(
    'Wela Volcano Park',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 7)]
);
TownList['Lush Jungle'] = new DungeonTown(
    'Lush Jungle',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 8)]
);
TownList['Diglett\'s Tunnel'] = new DungeonTown(
    'Diglett\'s Tunnel',
    GameConstants.Region.alola,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Lush Jungle'))]
);
TownList['Memorial Hill'] = new DungeonTown(
    'Memorial Hill',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 9)]
);
TownList['Malie Garden'] = new DungeonTown(
    'Malie Garden',
    GameConstants.Region.alola,
    [new TemporaryBattleRequirement('Ultra Wormhole')] //Replace with Ather Paradise 1 if implemented
);
TownList['Hokulani Observatory'] = new DungeonTown(
    'Hokulani Observatory',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 22)]
);
TownList['Thrifty Megamart'] = new DungeonTown(
    'Thrifty Megamart',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 14)]
);
TownList['Ula\'ula Meadow'] = new DungeonTown(
    'Ula\'ula Meadow',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 16)]
);
TownList['Po Town'] = new DungeonTown(
    'Po Town',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 17)]
);
TownList['Aether Foundation'] = new DungeonTown(
    'Aether Foundation',
    GameConstants.Region.alola,
    [new GymBadgeRequirement(BadgeEnums.DarkiniumZ)]
);
TownList['Exeggutor Island Hill'] = new DungeonTown(
    'Exeggutor Island Hill',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 25)]
);
TownList['Vast Poni Canyon'] = new DungeonTown(
    'Vast Poni Canyon',
    GameConstants.Region.alola,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Exeggutor Island Hill'))]
);
TownList['Mina\'s Houseboat'] = new DungeonTown(
    'Mina\'s Houseboat',
    GameConstants.Region.alola,
    [new TemporaryBattleRequirement('Ultra Megalopolis')]
);
TownList['Mount Lanakila'] = new DungeonTown(
    'Mount Lanakila',
    GameConstants.Region.alola,
    [new GymBadgeRequirement(BadgeEnums.GroundiumZ)]
);
TownList['Lake of the Sunne and Moone'] = new DungeonTown(
    'Lake of the Sunne and Moone',
    GameConstants.Region.alola,
    [new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)]
);
TownList['Ruins of Conflict'] = new DungeonTown(
    'Ruins of Conflict',
    GameConstants.Region.alola,
    [new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)]
);
TownList['Ruins of Life'] = new DungeonTown(
    'Ruins of Life',
    GameConstants.Region.alola,
    [
        new RouteKillRequirement(10, GameConstants.Region.alola, 21),
        new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion),
    ]
);
TownList['Ruins of Abundance'] = new DungeonTown(
    'Ruins of Abundance',
    GameConstants.Region.alola,
    [
        new RouteKillRequirement(10, GameConstants.Region.alola, 23),
        new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion),
    ]
);
TownList['Ruins of Hope'] = new DungeonTown(
    'Ruins of Hope',
    GameConstants.Region.alola,
    [
        new RouteKillRequirement(10, GameConstants.Region.alola, 26),
        new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion),
    ]
);
TownList['Poni Meadow'] = new DungeonTown(
    'Poni Meadow',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 28)]
);
//TODO: Change requirement when UB questline is merged.
TownList['Resolution Cave'] = new DungeonTown(
    'Resolution Cave',
    GameConstants.Region.alola,
    //[new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Poni Meadow'))]
    [new NullRequirement()]
);
//Galar Shops


const PostwickShop = new Shop([
    ItemList['Pokeball'],
]);
const WedgehurstShop = new Shop([
    ItemList['Greatball'],
    ItemList['Mystery_egg'],
]);
const CirchesterShop = new Shop([
    ItemList['Friendship_Digimental'],
]);
const TurffieldShop = new Shop([
    ItemList['Plant_egg'],
]);
const HulburyShop = new Shop([
    ItemList['Water_egg'],
    ItemList['Toxel'],
]);
const MotostokeShop = new Shop([
    ItemList['Fire_egg'],
]);
const HammerlockeShop = new Shop([
    ItemList['Wind_egg'],
    ItemList['Eternatus'],
]);
const StowonSideShop: Shop = new Shop([
    ItemList['Earth_egg'],
]);
const SpikemuthShop = new Shop([
    ItemList['Electric_egg'],
]);
const WyndonShop = new Shop([
    ItemList['Pokeball'],
    ItemList['Greatball'],
    ItemList['Ultraball'],
    ItemList['SmallRestore'],
    ItemList['MediumRestore'],
    ItemList['LargeRestore'],
    ItemList['xAttack'],
    ItemList['xClick'],
    ItemList['Lucky_pill'],
    ItemList['Intel_floppy'],
    ItemList['Item_magnet'],
    ItemList['Lucky_floppy'],
]);


//Galar NPC


const Mom = new NPC('Mom', [
    'Don\'t go too far into the Slumbering Weald.',
    'I\'ve heard there are some very strong Pokemon in there.',
    'Only those who beat the champion are strong enough to face them!',
]);
const TrainStationGuy = new NPC('Train Station Guy', [
    'There are some areas around Galar that you can only reach after beating the Champion.',
    'One is sparsely populated, but the other is teeming with Pokemon.',
    'There are plenty of unique, powerful ones there, too!',
]);
const ProfMagnolia = new ProfNPC('Prof. Magnolia',
    GameConstants.Region.galar,
    'TODO: Add text before Galar is released',
    'TODO: Add text before Galar is released');


//Galar towns

TownList['Postwick'] = new Town(
    'Postwick',
    GameConstants.Region.galar,
    [PostwickShop],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)],
        npcs: [ProfMagnolia, Mom],
    }
);
TownList['Wedgehurst'] = new Town(
    'Wedgehurst',
    GameConstants.Region.galar,
    [WedgehurstShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 1)],
        npcs: [TrainStationGuy],
    }
);
TownList['Motostoke'] = new Town(
    'Motostoke',
    GameConstants.Region.galar,
    [MotostokeShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 6)],
    }
);
TownList['Turffield'] = new Town(
    'Turffield',
    GameConstants.Region.galar,
    [TurffieldShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 11)],
    }
);
TownList['Hulbury'] = new Town(
    'Hulbury',
    GameConstants.Region.galar,
    [HulburyShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 12)],
    }
);
TownList['Stow-on-Side'] = new Town(
    'Stow-on-Side',
    GameConstants.Region.galar,
    [GymList['Stow-on-Side1'], GymList['Stow-on-Side2'], StowonSideShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 15)],
    }
);
TownList['Ballonlea'] = new Town(
    'Ballonlea',
    GameConstants.Region.galar,
    [],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Glimwood Tangle'))],
    }
);
TownList['Hammerlocke'] = new Town(
    'Hammerlocke',
    GameConstants.Region.galar,
    [HammerlockeShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 14)],
    }
);
TownList['Circhester'] = new Town(
    'Circhester',
    GameConstants.Region.galar,
    [GymList['Circhester1'], GymList['Circhester2'], CirchesterShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 18)],
    }
);
TownList['Spikemuth'] = new Town(
    'Spikemuth',
    GameConstants.Region.galar,
    [SpikemuthShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 22)],
    }
);
TownList['Wyndon'] = new Town(
    'Wyndon',
    GameConstants.Region.galar,
    [WyndonShop, new MoveToDungeon(dungeonList['Rose Tower'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 24)],
    }
);
TownList['Wyndon Stadium'] = new Town(
    'Wyndon Stadium',
    GameConstants.Region.galar,
    [GymList['Trainer Marnie'], GymList['Gym Leader Bede'], GymList['Trainer Hop'], GymList['Champion Leon'], pokeLeagueShop()],
    {
        requirements: [
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Rose Tower')),
        ],
    }
);
//Isle of Armor towns

TownList['Master Dojo'] = new Town(
    'Master Dojo',
    GameConstants.Region.galar,
    [new MoveToDungeon(dungeonList['Master Dojo Trial'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 1)],
    }
);
TownList['Master Dojo Battlefield'] = new Town(
    'Master Dojo Battlefield',
    GameConstants.Region.galar,
    [GymList['Gym Leader Klara'], GymList['Gym Leader Avery'], GymList['Dojo Master Mustard'], pokeLeagueShop()],
    {
        requirements: [
            new MultiRequirement([
                new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Tower of Darkness')),
                new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Tower of Water')),
            ]),
        ],
    }
);

//Crown Tundra Towns
TownList['Freezington'] = new Town(
    'Freezington',
    GameConstants.Region.galar,
    [],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 1)],
    }
);


//Galar Dungeons


TownList['Slumbering Weald'] = new DungeonTown(
    'Slumbering Weald',
    GameConstants.Region.galar,
    [new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)]
);
TownList['Inner Slumbering Weald'] = new DungeonTown(
    'Inner Slumbering Weald',
    GameConstants.Region.galar,
    [new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)]
);
TownList['Galar Mine'] = new DungeonTown(
    'Galar Mine',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 10)]
);
TownList['Galar Mine No. 2'] = new DungeonTown(
    'Galar Mine No. 2',
    GameConstants.Region.galar,
    [new GymBadgeRequirement(BadgeEnums.Galar_Water)]
);
TownList['Glimwood Tangle'] = new DungeonTown(
    'Glimwood Tangle',
    GameConstants.Region.galar,
    [
        new MultiRequirement([
            new GymBadgeRequirement(BadgeEnums.Galar_Rock),
            new GymBadgeRequirement(BadgeEnums.Galar_Ice),
        ]),
    ]
);
TownList['Rose Tower'] = new DungeonTown(
    'Rose Tower',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 24)]
);
TownList['Watchtower Ruins'] = new DungeonTown(
    'Watchtower Ruins',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 4)]
);
TownList['Dusty Bowl'] = new DungeonTown(
    'Dusty Bowl',
    GameConstants.Region.galar,
    [new GymBadgeRequirement(BadgeEnums.Galar_Fire)]
);
TownList['Lake of Outrage'] = new DungeonTown(
    'Lake of Outrage',
    GameConstants.Region.galar,
    [new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)]
);
TownList['Master Dojo Trial'] = new DungeonTown(
    'Master Dojo Trial',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 25)]
);
TownList['Tower of Darkness'] = new DungeonTown(
    'Tower of Darkness',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 34)]
);
TownList['Tower of Water'] = new DungeonTown(
    'Tower of Water',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 28)]
);
TownList['Rock Peak Ruins'] = new DungeonTown(
    'Rock Peak Ruins',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 43)]
);
TownList['Iron Ruins'] = new DungeonTown(
    'Iron Ruins',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 43)]
);
TownList['Iceberg Ruins'] = new DungeonTown(
    'Iceberg Ruins',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 51)]
);
TownList['Split-Decision Ruins'] = new DungeonTown(
    'Split-Decision Ruins',
    GameConstants.Region.galar,
    [
        new MultiRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 48),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Iron Ruins')),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Iceberg Ruins')),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Rock Peak Ruins')),
        ]),
    ]
);
TownList['Dyna Tree Hill'] = new DungeonTown(
    'Dyna Tree Hill',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 50)]
);
TownList['Crown Shrine'] = new DungeonTown(
    'Crown Shrine',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 53)]
);
const Ohakadamon = new Shop([
    ItemList['Ohakadamon'],
], 'Ohakadamon');
const Botamon = new Shop([
    ItemList['Koromon'],
    ItemList['Wanyamon'],
], 'Botamon');
const Punimon = new Shop([
    ItemList['Tunomon'],
], 'Punimon');
const Koromon = new Shop([
    ItemList['Agumon'],
    ItemList['Agumon Hakase'],
], 'Koromon');
const Tunomon = new Shop([
    ItemList['Elecmon'],
    ItemList['Gabumon'],
], 'Tunomon');
const Agumon = new Shop([
    ItemList['Agumon X-Antibody'],
    ItemList['Centalmon'],
    ItemList['Greymon'],
], 'Agumon');
const Betamon = new Shop([
    ItemList['Betamon X-Antibody'],
    ItemList['Dinohumon'],
    ItemList['Seadramon'],
], 'Betamon');
const DamemonCmon = new Shop([
    ItemList['Botamon'],
], 'Damemon Cmon');
const Elecmon = new Shop([
    ItemList['Leomon'],
], 'Elecmon');
const Gabumon = new Shop([
    ItemList['Gabumon X-Antibody'],
    ItemList['Garurumon'],
], 'Gabumon');
const Airdramon = new Shop([
    ItemList['Metal Greymon Virus'],
    ItemList['Megadramon'],
], 'Airdramon');
const Angemon = new Shop([
    ItemList['Blue Meramon'],
    ItemList['Garudamon'],
    ItemList['Holy Angemon'],
], 'Angemon');
const Birdramon = new Shop([
    ItemList['Garudamon'],
    ItemList['Tyilinmon'],
], 'Birdramon');
const Devimon = new Shop([
    ItemList['Ice Devimon'],
    ItemList['Neo Devimon'],
    ItemList['Skull Satamon'],
], 'Devimon');
const Garurumon = new Shop([
    ItemList['Garurumon X-Antibody'],
    ItemList['Were Garurumon'],
    ItemList['Zudomon'],
], 'Garurumon');
const Greymon = new Shop([
    ItemList['Greymon X-Antibody'],
    ItemList['Mamemon'],
    ItemList['Metal Greymon'],
    ItemList['Skull Greymon'],
], 'Greymon');
const Kabuterimon = new Shop([
    ItemList['Atlur Kabuterimon Blue'],
    ItemList['Atlur Kabuterimon Red'],
    ItemList['Kongoumon'],
], 'Kabuterimon');
const Meramon = new Shop([
    ItemList['Blue Meramon'],
    ItemList['Death Meramon'],
    ItemList['Meramon X-Antibody'],
], 'Meramon');
const Numemon = new Shop([
    ItemList['Karatuki Numemon'],
    ItemList['Monzaemon'],
    ItemList['Numemon X-Antibody'],
    ItemList['Platinum Numemon'],
], 'Numemon');
const Seadramon = new Shop([
    ItemList['Mega Seadramon'],
    ItemList['Seadramon X-Antibody'],
    ItemList['Waru Seadramon'],
], 'Seadramon');
const Tyranomon = new Shop([
    ItemList['Master Tyranomon'],
    ItemList['Metal Tyranomon'],
    ItemList['Skull Greymon'],
    ItemList['Tyranomon X-Antibody'],
], 'Tyranomon');
const Vegimon = new Shop([
    ItemList['Red Vegimon'],
    ItemList['Vademon'],
], 'Vegimon');
const Whamon = new Shop([
    ItemList['Whamon Perfect'],
], 'Whamon');
const Yukidarumon = new Shop([
    ItemList['Zudomon'],
], 'Yukidarumon');
const Mamemon = new Shop([
    ItemList['Catch Mamemon'],
    ItemList['Mamemon X-Antibody'],
    ItemList['Prince Mamemon'],
], 'Mamemon');
const MetalGreymonVirus = new Shop([
    ItemList['Black War Greymon'],
    ItemList['Blitz Greymon'],
    ItemList['Metal Greymon Virus X-Antibody'],
], 'Metal Greymon Virus');
const MetalMamemon = new Shop([
    ItemList['Metal Mamemon X-Antibody'],
    ItemList['Mugendramon'],
], 'Metal Mamemon');
const Monzaemon = new Shop([
    ItemList['Monzaemon X-Antibody'],
    ItemList['Waru Monzaemon'],
], 'Monzaemon');
const SkullGreymon = new Shop([
    ItemList['Chimairamon'],
    ItemList['Mugendramon'],
], 'Skull Greymon');
const Vademon = new Shop([
    ItemList['Ebemon'],
    ItemList['Vademon X-Antibody'],
], 'Vademon');
const DeathmonCmon = new Shop([
    ItemList['Ohakadamon'],
], 'Deathmon Cmon');
const Bubbmon = new Shop([
    ItemList['Mochimon'],
], 'Bubbmon');
const Pitchmon = new Shop([
    ItemList['Pukamon'],
], 'Pitchmon');
const Poyomon = new Shop([
    ItemList['Tokomon'],
], 'Poyomon');
const Yuramon = new Shop([
    ItemList['Tanemon'],
], 'Yuramon');
const Zurumon = new Shop([
    ItemList['Pagumon'],
], 'Zurumon');
const Mochimon = new Shop([
    ItemList['Tentomon'],
    ItemList['Gottsumon'],
    ItemList['Hagurumon'],
], 'Mochimon');
const Pagumon = new Shop([
    ItemList['Gazimon'],
    ItemList['Gizamon'],
    ItemList['Pico Devimon'],
], 'Pagumon');
const Pukamon = new Shop([
    ItemList['Betamon'],
    ItemList['Gomamon'],
    ItemList['Shakomon'],
], 'Pukamon');
const Tanemon = new Shop([
    ItemList['Lalamon'],
    ItemList['Palmon'],
], 'Tanemon');
const Tokomon = new Shop([
    ItemList['Falcomon 2006'],
    ItemList['Lucemon'],
    ItemList['Patamon'],
], 'Tokomon');
const Ganimon = new Shop([
    ItemList['Coelamon'],
    ItemList['Ganimon X-Antibody'],
], 'Ganimon');
const Gazimon = new Shop([
    ItemList['Gazimon X-Antibody'],
    ItemList['Hanumon'],
    ItemList['Leomon'],
], 'Gazimon');
const Gizamon = new Shop([
    ItemList['Devidramon'],
], 'Gizamon');
const Gomamon = new Shop([
    ItemList['Gomamon X-Antibody'],
    ItemList['Ikkakumon'],
    ItemList['Seadramon'],
    ItemList['Whamon'],
], 'Gomamon');
const Gottsumon = new Shop([
    ItemList['Golemon'],
    ItemList['Gottsumon X-Antibody'],
    ItemList['Icemon'],
    ItemList['Monochromon'],
], 'Gottsumon');
const Kunemon = new Shop([
    ItemList['Flymon'],
    ItemList['Kuwagamon'],
], 'Kunemon');
const Otamamon = new Shop([
    ItemList['Gekomon'],
    ItemList['Otamamon X-Antibody'],
    ItemList['Tonosama Gekomon'],
], 'Otamamon');
const Palmon = new Shop([
    ItemList['Palmon X-Antibody'],
    ItemList['Red Vegimon'],
    ItemList['Togemon'],
    ItemList['Woodmon'],
], 'Palmon');
const Patamon = new Shop([
    ItemList['Angemon'],
    ItemList['Unimon'],
], 'Patamon');
const Piyomon = new Shop([
    ItemList['Birdramon'],
    ItemList['Cockatrimon'],
], 'Piyomon');
const Shakomon = new Shop([
    ItemList['Gesomon'],
    ItemList['Octmon'],
    ItemList['Seadramon'],
    ItemList['Shakomon X-Antibody'],
], 'Shakomon');
const Tentomon = new Shop([
    ItemList['Kabuterimon'],
    ItemList['Kuwagamon'],
    ItemList['Waspmon'],
], 'Tentomon');
const Tyumon = new Shop([
    ItemList['Numemon'],
    ItemList['Scumon'],
], 'Tyumon');
const Bakemon = new Shop([
    ItemList['Fantomon'],
    ItemList['Giromon'],
    ItemList['Lady Devimon'],
], 'Bakemon');
const Centalmon = new Shop([
    ItemList['Sagittarimon'],
], 'Centalmon');
const Cockatrimon = new Shop([
    ItemList['Megadramon'],
    ItemList['Parrotmon'],
], 'Cockatrimon');
const Coelamon = new Shop([
    ItemList['Dagomon'],
    ItemList['Mega Seadramon'],
    ItemList['Whamon Perfect'],
], 'Coelamon');
const Cyclomon = new Shop([
    ItemList['Megadramon'],
], 'Cyclomon');
const DarkTyranomon = new Shop([
    ItemList['Dark Tyranomon X-Antibody'],
    ItemList['Metal Tyranomon'],
], 'Dark Tyranomon');
const Deltamon = new Shop([
    ItemList['Chimairamon'],
    ItemList['Gigadramon'],
], 'Deltamon');
const Devidramon = new Shop([
    ItemList['Gigadramon'],
], 'Devidramon');
const Drimogemon = new Shop([
    ItemList['Digmon'],
], 'Drimogemon');
const Ebidramon = new Shop([
    ItemList['Gusokumon'],
], 'Ebidramon');
const Evilmon = new Shop([
    ItemList['Lady Devimon'],
    ItemList['Mephismon'],
], 'Evilmon');
const Flymon = new Shop([
    ItemList['Ookuwamon'],
], 'Flymon');
const Gekomon = new Shop([
    ItemList['Mega Seadramon'],
    ItemList['Tonosama Gekomon'],
    ItemList['Whamon Perfect'],
], 'Gekomon');
const Gesomon = new Shop([
    ItemList['Dagomon'],
    ItemList['Gesomon X-Antibody'],
    ItemList['Marin Devimon'],
], 'Gesomon');
const Gokimon = new Shop([
    ItemList['Archnemon'],
], 'Gokimon');
const Gorimon = new Shop([
    ItemList['Mammon'],
], 'Gorimon');
const Ikkakumon = new Shop([
    ItemList['Whamon Perfect'],
    ItemList['Zudomon'],
], 'Ikkakumon');
const Kuwagamon = new Shop([
    ItemList['Kuwagamon X-Antibody'],
    ItemList['Megadramon'],
    ItemList['Ookuwamon'],
], 'Kuwagamon');
const Leomon = new Shop([
    ItemList['Grappu Leomon'],
    ItemList['Leomon X-Antibody'],
    ItemList['Mad Leomon'],
    ItemList['Saber Leomon'],
], 'Leomon');
const Mechanorimon = new Shop([
    ItemList['Metal Mamemon'],
    ItemList['Valvemon'],
], 'Mechanorimon');
const Minotaurmon = new Shop([
    ItemList['Vikemon'],
], 'Minotaurmon');
const Mojyamon = new Shop([
    ItemList['Mammon'],
], 'Mojyamon');
const Monochromon = new Shop([
    ItemList['Monochromon X-Antibody'],
    ItemList['Triceramon'],
    ItemList['Vermillimon'],
], 'Monochromon');
const Nanimon = new Shop([
    ItemList['Digitamamon'],
    ItemList['Etemon'],
], 'Nanimon');
const Octmon = new Shop([
    ItemList['Dagomon'],
    ItemList['Marin Devimon'],
], 'Octmon');
const Orgemon = new Shop([
    ItemList['Digitamamon'],
    ItemList['Minotaurmon'],
    ItemList['Orgemon X-Antibody'],
    ItemList['Rebellimon'],
], 'Orgemon');
const Raremon = new Shop([
    ItemList['Ex-Tyranomon'],
    ItemList['Rare Raremon'],
], 'Raremon');
const Rukamon = new Shop([
    ItemList['Hangyomon'],
    ItemList['Whamon Perfect'],
], 'Rukamon');
const Scumon = new Shop([
    ItemList['Etemon'],
    ItemList['Great King Scumon'],
    ItemList['Vademon'],
], 'Scumon');
const Shellmon = new Shop([
    ItemList['Tonosama Gekomon'],
], 'Shellmon');
const Starmon = new Shop([
    ItemList['Starmon X-Antibody'],
    ItemList['Superstarmon'],
    ItemList['Triceramon'],
], 'Starmon');
const Tailmon = new Shop([
    ItemList['Angewomon'],
    ItemList['Bastemon'],
    ItemList['Tailmon X-Antibody'],
], 'Tailmon');
const Tortamon = new Shop([
    ItemList['Jyagamon'],
], 'Tortamon');
const Tuskmon = new Shop([
    ItemList['Metal Tyranomon'],
    ItemList['Triceramon'],
], 'Tuskmon');
const Unimon = new Shop([
    ItemList['Hippogriffomon'],
    ItemList['Piccolomon'],
], 'Unimon');
const Vdramon = new Shop([
    ItemList['Aero V-dramon'],
    ItemList['Cyberdramon'],
    ItemList['Metal Tyranomon'],
    ItemList['Red V-dramon'],
], 'V-dramon');
const Andromon = new Shop([
    ItemList['Guardromon'],
    ItemList['Orgemon'],
    ItemList['Tankmon'],
], 'Andromon');
const Angewomon = new Shop([
    ItemList['Holydramon'],
    ItemList['Lovely Angemon'],
    ItemList['Ofanimon'],
], 'Angewomon');
const Anomalocarimon = new Shop([
    ItemList['Anomalocarimon X-Antibody'],
    ItemList['Metal Seadramon'],
    ItemList['Pukumon'],
], 'Anomalocarimon');
const AtlurKabuterimonBlue = new Shop([
    ItemList['Herakle Kabuterimon'],
], 'Atlur Kabuterimon Blue');
const Dagomon = new Shop([
    ItemList['Leviamon'],
    ItemList['Neptunemon'],
    ItemList['Plesiomon'],
], 'Dagomon');
const Digitamamon = new Shop([
    ItemList['Devitamamon'],
    ItemList['Minervamon'],
    ItemList['Titamon'],
], 'Digitamamon');
const Etemon = new Shop([
    ItemList['King Etemon'],
    ItemList['Metal Etemon'],
], 'Etemon');
const ExTyranomon = new Shop([
    ItemList['Holydramon'],
], 'Ex-Tyranomon');
const Giromon = new Shop([
    ItemList['Hi Andromon'],
    ItemList['Metal Etemon'],
], 'Giromon');
const HolyAngemon = new Shop([
    ItemList['Dominimon'],
    ItemList['Goddramon'],
    ItemList['Holy Angemon Priest Mode'],
    ItemList['Seraphimon'],
], 'Holy Angemon');
const Jyagamon = new Shop([
    ItemList['Spinomon'],
], 'Jyagamon');
const LadyDevimon = new Shop([
    ItemList['Lilithmon'],
    ItemList['Lady Devimon X-Antibody'],
], 'Lady Devimon');
const Mammon = new Shop([
    ItemList['Mammon X-Antibody'],
    ItemList['Skull Mammon'],
], 'Mammon');
const MarinDevimon = new Shop([
    ItemList['Leviamon'],
    ItemList['Pukumon'],
], 'Marin Devimon');
const MegaSeadramon = new Shop([
    ItemList['Marin Angemon'],
    ItemList['Mega Seadramon X-Antibody'],
    ItemList['Metal Seadramon'],
    ItemList['Plesiomon'],
], 'Mega Seadramon');
const Megadramon = new Shop([
    ItemList['Deathmon'],
    ItemList['Goddramon'],
    ItemList['Mugendramon'],
], 'Megadramon');
const MetalTyranomon = new Shop([
    ItemList['Metal Tyranomon X-Antibody'],
    ItemList['Mugendramon'],
    ItemList['Rust Tyranomon'],
], 'Metal Tyranomon');
const Nanomon = new Shop([
    ItemList['Metal Etemon'],
], 'Nanomon');
const Ookuwamon = new Shop([
    ItemList['Gran Kuwagamon'],
    ItemList['Herakle Kabuterimon'],
    ItemList['Ookuwamon X-Antibody'],
], 'Ookuwamon');
const Piccolomon = new Shop([
    ItemList['Bacchusmon'],
    ItemList['Marin Angemon'],
], 'Piccolomon');
const TonosamaGekomon = new Shop([
    ItemList['Leviamon'],
    ItemList['Plesiomon'],
    ItemList['Vikemon'],
], 'Tonosama Gekomon');
const Triceramon = new Shop([
    ItemList['Dinorexmon'],
    ItemList['Triceramon X-Antibody'],
], 'Triceramon');
const WhamonPerfect = new Shop([
    ItemList['King Whamon'],
    ItemList['Marin Angemon'],
    ItemList['Metal Seadramon'],
], 'Whamon Perfect');
const Zudomon = new Shop([
    ItemList['Marin Angemon'],
    ItemList['Plesiomon'],
    ItemList['Vikemon'],
], 'Zudomon');
const HerakleKabuterimon = new Shop([
    ItemList['Herakle Kabuterimon X-Antibody'],
], 'Herakle Kabuterimon');
const Holydramon = new Shop([
    ItemList['Holydramon X-Antibody'],
], 'Holydramon');
const MarinAngemon = new Shop([
    ItemList['Pitchmon'],
], 'Marin Angemon');
const MetalEtemon = new Shop([
    ItemList['Pagumon'],
], 'Metal Etemon');
const MetalSeadramon = new Shop([
    ItemList['Giga Seadramon'],
], 'Metal Seadramon');
const Pukumon = new Shop([
    ItemList['Pitchmon'],
], 'Pukumon');
const SaberLeomon = new Shop([
    ItemList['Dinotigermon'],
], 'Saber Leomon');
const HolyAngemonPriestMode = new Shop([
    ItemList['Holy Angemon'],
    ItemList['Seraphimon'],
], 'Holy Angemon Priest Mode');
const Choromon = new Shop([
    ItemList['Caprimon'],
    ItemList['Pagumon'],
], 'Choromon');
const Mokumon = new Shop([
    ItemList['Peti Meramon'],
    ItemList['Koromon'],
], 'Mokumon');
const Nyokimon = new Shop([
    ItemList['Budmon'],
    ItemList['Pyocomon'],
    ItemList['Tanemon'],
], 'Nyokimon');
const YukimiBotamon = new Shop([
    ItemList['Hiyarimon'],
    ItemList['Nyaromon'],
], 'Yukimi Botamon');
const Caprimon = new Shop([
    ItemList['Hagurumon'],
    ItemList['Kokuwamon'],
    ItemList['Toy Agumon'],
], 'Caprimon');
const Nyaromon = new Shop([
    ItemList['Bearmon'],
    ItemList['Elecmon'],
    ItemList['Plotmon'],
], 'Nyaromon');
const PetiMeramon = new Shop([
    ItemList['Bakumon'],
    ItemList['Candmon'],
    ItemList['Pico Devimon'],
    ItemList['Vorvomon'],
], 'Peti Meramon');
const Pyocomon = new Shop([
    ItemList['Elecmon'],
    ItemList['Mushmon'],
    ItemList['Piyomon'],
], 'Pyocomon');
const Alraumon = new Shop([
    ItemList['Kiwimon'],
    ItemList['Red Vegimon'],
    ItemList['Vegimon'],
    ItemList['Zassoumon'],
], 'Alraumon');
const Bakumon = new Shop([
    ItemList['Boarmon'],
    ItemList['Hanumon'],
    ItemList['Monochromon'],
], 'Bakumon');
const Candmon = new Shop([
    ItemList['Bakemon'],
    ItemList['Meramon'],
    ItemList['Wizarmon'],
], 'Candmon');
const ClearAgumon = new Shop([
    ItemList['Guardromon'],
    ItemList['Revolmon'],
], 'Clear Agumon');
const Dokunemon = new Shop([
    ItemList['Dokugumon'],
    ItemList['Snimon'],
], 'Dokunemon');
const Floramon = new Shop([
    ItemList['Kiwimon'],
    ItemList['Vegimon'],
], 'Floramon');
const Goburimon = new Shop([
    ItemList['Nanimon'],
    ItemList['Orgemon'],
], 'Goburimon');
const Hagurumon = new Shop([
    ItemList['Clockmon'],
    ItemList['Guardromon'],
    ItemList['Hagurumon X-Antibody'],
], 'Hagurumon');
const Kokuwamon = new Shop([
    ItemList['Guardromon'],
    ItemList['Kokuwamon X-Antibody'],
], 'Kokuwamon');
const ModokiBetamon = new Shop([
    ItemList['Gesomon'],
    ItemList['Shellmon'],
], 'Modoki Betamon');
const Muchomon = new Shop([
    ItemList['Akatorimon'],
], 'Muchomon');
const Mushmon = new Shop([
    ItemList['Red Vegimon'],
    ItemList['Vegimon'],
    ItemList['Woodmon'],
], 'Mushmon');
const Penmon = new Shop([
    ItemList['Cockatrimon'],
    ItemList['Daipenmon'],
    ItemList['Rukamon'],
], 'Penmon');
const PicoDevimon = new Shop([
    ItemList['Devimon'],
    ItemList['Ice Devimon'],
], 'Pico Devimon');
const Plotmon = new Shop([
    ItemList['Plotmon X-Antibody'],
    ItemList['Tailmon'],
], 'Plotmon');
const Psychemon = new Shop([
    ItemList['Porcupamon'],
    ItemList['Gururumon'],
], 'Psychemon');
const Shamamon = new Shop([
    ItemList['Fugamon'],
    ItemList['Hanumon'],
], 'Shamamon');
const SnowGoburimon = new Shop([
    ItemList['Hyougamon'],
    ItemList['Yukidarumon'],
], 'Snow Goburimon');
const ToyAgumon = new Shop([
    ItemList['Greymon'],
    ItemList['Guardromon'],
    ItemList['Tankmon'],
], 'Toy Agumon');
const Tukaimon = new Shop([
    ItemList['Devimon'],
    ItemList['Saberdramon'],
], 'Tukaimon');
const YukiAgumon = new Shop([
    ItemList['Yukidarumon'],
], 'Yuki Agumon');
const Akatorimon = new Shop([
    ItemList['Garudamon'],
    ItemList['Sinduramon'],
], 'Akatorimon');
const Clockmon = new Shop([
    ItemList['Blikmon'],
    ItemList['Knightmon'],
], 'Clockmon');
const DarkLizamon = new Shop([
    ItemList['Gigadramon'],
    ItemList['Skull Satamon'],
], 'Dark Lizamon');
const Dokugumon = new Shop([
    ItemList['Archnemon'],
    ItemList['Lady Devimon'],
], 'Dokugumon');
const FlareLizarmon = new Shop([
    ItemList['Gigadramon'],
    ItemList['Metal Tyranomon'],
], 'Flare Lizarmon');
const Fugamon = new Shop([
    ItemList['Etemon'],
    ItemList['Garudamon'],
], 'Fugamon');
const Geremon = new Shop([
    ItemList['Etemon'],
    ItemList['Metal Mamemon'],
    ItemList['Superstarmon'],
], 'Geremon');
const Golemon = new Shop([
    ItemList['Gogmamon'],
    ItemList['Insekimon'],
], 'Golemon');
const GolemonPS = new Shop([
    ItemList['Valvemon'],
], 'Golemon PS');
const Guardromon = new Shop([
    ItemList['Andromon'],
    ItemList['Nanomon'],
], 'Guardromon');
const Gururumon = new Shop([
    ItemList['Blue Meramon'],
], 'Gururumon');
const Hanumon = new Shop([
    ItemList['Mammon'],
    ItemList['Were Garurumon'],
], 'Hanumon');
const Hyougamon = new Shop([
    ItemList['Blue Meramon'],
    ItemList['Panjyamon'],
], 'Hyougamon');
const IceDevimon = new Shop([
    ItemList['Blue Meramon'],
    ItemList['Lady Devimon'],
    ItemList['Vamdemon'],
], 'Ice Devimon');
const Icemon = new Shop([
    ItemList['Insekimon'],
    ItemList['Zudomon'],
], 'Icemon');
const Igamon = new Shop([
    ItemList['Asuramon'],
], 'Igamon');
const JungleMojyamon = new Shop([
    ItemList['Etemon'],
    ItemList['Waru Monzaemon'],
], 'Jungle Mojyamon');
const KaratukiNumemon = new Shop([
    ItemList['Black King Numemon'],
    ItemList['Mega Seadramon'],
], 'Karatuki Numemon');
const Kiwimon = new Shop([
    ItemList['Blossomon'],
    ItemList['Delumon'],
], 'Kiwimon');
const MoriShellmon = new Shop([
    ItemList['Digitamamon'],
    ItemList['Triceramon'],
], 'Mori Shellmon');
const Musyamon = new Shop([
    ItemList['Asuramon'],
    ItemList['Zanbamon'],
], 'Musyamon');
const NiseDrimogemon = new Shop([
    ItemList['Digitamamon'],
    ItemList['Insekimon'],
], 'Nise Drimogemon');
const Pidmon = new Shop([
    ItemList['Fantomon'],
    ItemList['Holy Angemon'],
], 'Pidmon');
const PlatinumScumon = new Shop([
    ItemList['Metal Mamemon'],
    ItemList['Vademon'],
], 'Platinum Scumon');
const RedVegimon = new Shop([
    ItemList['Jyureimon'],
    ItemList['Lilimon'],
], 'Red Vegimon');
const Revolmon = new Shop([
    ItemList['Andromon'],
    ItemList['Metal Mamemon'],
], 'Revolmon');
const Saberdramon = new Shop([
    ItemList['Megadramon'],
    ItemList['Parrotmon'],
], 'Saberdramon');
const SandYanmamon = new Shop([
    ItemList['Ookuwamon'],
], 'Sand Yanmamon');
const ShimaUnimon = new Shop([
    ItemList['Mammon'],
], 'Shima Unimon');
const Snimon = new Shop([
    ItemList['Archnemon'],
    ItemList['Ookuwamon'],
], 'Snimon');
const Soulmon = new Shop([
    ItemList['Metal Fantomon'],
    ItemList['Mummymon'],
], 'Soulmon');
const Tankmon = new Shop([
    ItemList['Blikmon'],
    ItemList['Gigadramon'],
    ItemList['Tankdramon'],
], 'Tankmon');
const Thunderballmon = new Shop([
    ItemList['Mamemon'],
    ItemList['Thunderballmon X-Antibody'],
], 'Thunderballmon');
const Togemon = new Shop([
    ItemList['Lilimon'],
    ItemList['Ponchomon'],
    ItemList['Togemon X-Antibody'],
], 'Togemon');
const Tuchidarumon = new Shop([
    ItemList['Insekimon'],
    ItemList['Jyagamon'],
], 'Tuchidarumon');
const Wizarmon = new Shop([
    ItemList['Mistymon'],
    ItemList['Vamdemon'],
    ItemList['Wizarmon X-Antibody'],
], 'Wizarmon');
const Woodmon = new Shop([
    ItemList['Jyureimon'],
    ItemList['Pumpmon'],
], 'Woodmon');
const Yanmamon = new Shop([
    ItemList['Atlur Kabuterimon Red'],
    ItemList['Ookuwamon'],
], 'Yanmamon');
const Zassoumon = new Shop([
    ItemList['Blossomon'],
], 'Zassoumon');
const AeroVdramon = new Shop([
    ItemList['Ulforce V-dramon'],
    ItemList['Ulforce V-dramon Future Mode'],
], 'Aero V-dramon');
const Asuramon = new Shop([
    ItemList['Vulcanusmon'],
    ItemList['Zanbamon'],
], 'Asuramon');
const AtlurKabuterimonRed = new Shop([
    ItemList['Herakle Kabuterimon'],
    ItemList['Gran Kuwagamon'],
], 'Atlur Kabuterimon Red');
const BigMamemon = new Shop([
    ItemList['Prince Mamemon'],
    ItemList['Tonosama Mamemon'],
], 'Big Mamemon');
const Blikmon = new Shop([
    ItemList['Boltmon'],
], 'Blikmon');
const Blossomon = new Shop([
    ItemList['Hydramon'],
    ItemList['Rosemon'],
], 'Blossomon');
const BlueMeramon = new Shop([
    ItemList['Boltmon'],
    ItemList['Death Meramon'],
], 'Blue Meramon');
const Brachimon = new Shop([
    ItemList['Mugendramon'],
    ItemList['Ultimate Brachimon'],
], 'Brachimon');
const Chimairamon = new Shop([
    ItemList['Millenniumon'],
], 'Chimairamon');
const DeathMeramon = new Shop([
    ItemList['Beelzebumon'],
    ItemList['Boltmon'],
    ItemList['Gankoomon'],
], 'Death Meramon');
const Delumon = new Shop([
    ItemList['Griffomon'],
    ItemList['Hououmon'],
], 'Delumon');
const Fantomon = new Shop([
    ItemList['Metal Fantomon'],
    ItemList['Venom Vamdemon'],
], 'Fantomon');
const Garudamon = new Shop([
    ItemList['Garudamon X-Antibody'],
    ItemList['Hououmon'],
    ItemList['Ravmon'],
], 'Garudamon');
const Gerbemon = new Shop([
    ItemList['Platinum Numemon'],
], 'Gerbemon');
const Gigadramon = new Shop([
    ItemList['Darkdramon'],
    ItemList['Metal Seadramon'],
    ItemList['Mugendramon'],
], 'Gigadramon');
const GreatKingScumon = new Shop([
    ItemList['King Etemon'],
], 'Great King Scumon');
const Hangyomon = new Shop([
    ItemList['Pukumon'],
    ItemList['Vikemon'],
], 'Hangyomon');
const Insekimon = new Shop([
    ItemList['Metal Etemon'],
    ItemList['Bancho Golemon'],
    ItemList['Dianamon'],
], 'Insekimon');
const Jijimon = new Shop([
    ItemList['Punimon'],
], 'Jijimon');
const Jyureimon = new Shop([
    ItemList['Deathmon'],
    ItemList['Pinochimon'],
], 'Jyureimon');
const Knightmon = new Shop([
    ItemList['Duftmon'],
    ItemList['Lord Knightmon'],
], 'Knightmon');
const Lilimon = new Shop([
    ItemList['Bancho Lilimon'],
    ItemList['Lilimon X-Antibody'],
    ItemList['Rosemon'],
], 'Lilimon');
const MasterTyranomon = new Shop([
    ItemList['Gaioumon'],
    ItemList['War Greymon'],
], 'Master Tyranomon');
const MetalGreymon = new Shop([
    ItemList['Blitz Greymon'],
    ItemList['Metal Greymon X-Antibody'],
    ItemList['Metal Greymon Alterous Mode'],
    ItemList['War Greymon'],
], 'Metal Greymon');
const Panjyamon = new Shop([
    ItemList['Panjyamon X-Antibody'],
    ItemList['Regulumon'],
], 'Panjyamon');
const Parrotmon = new Shop([
    ItemList['Crossmon'],
], 'Parrotmon');
const Pumpmon = new Shop([
    ItemList['Noble Pumpmon'],
    ItemList['Pinochimon'],
], 'Pumpmon');
const SkullSatamon = new Shop([
    ItemList['Beelzebumon'],
    ItemList['Demon'],
], 'Skull Satamon');
const Tekkamon = new Shop([
    ItemList['Boltmon'],
    ItemList['Gokumon'],
], 'Tekkamon');
const Vamdemon = new Shop([
    ItemList['Belial Vamdemon'],
    ItemList['Vamdemon X-Antibody'],
    ItemList['Venom Vamdemon'],
], 'Vamdemon');
const Vermillimon = new Shop([
    ItemList['Skull Mammon'],
], 'Vermillimon');
const WaruMonzaemon = new Shop([
    ItemList['Demon'],
    ItemList['Metal Etemon'],
], 'Waru Monzaemon');
const WaruSeadramon = new Shop([
    ItemList['Leviamon'],
], 'Waru Seadramon');
const WereGarurumon = new Shop([
    ItemList['Cres Garurumon'],
    ItemList['Metal Garurumon'],
    ItemList['Were Garurumon X-Antibody'],
    ItemList['Were Garurumon Sagittarius Mode'],
], 'Were Garurumon');
const Apocalymon = new Shop([
    ItemList['Kuramon'],
], 'Apocalymon');
const Babamon = new Shop([
    ItemList['Yuramon'],
], 'Babamon');
const Boltmon = new Shop([
    ItemList['Zurumon'],
], 'Boltmon');
const Demon = new Shop([
    ItemList['Demon Super Ultimate'],
    ItemList['Demon X-Antibody'],
], 'Demon');
const Diablomon = new Shop([
    ItemList['Armagemon'],
    ItemList['Diablomon X-Antibody'],
], 'Diablomon');
const Goddramon = new Shop([
    ItemList['Goddramon X-Antibody'],
], 'Goddramon');
const Griffomon = new Shop([
    ItemList['Poyomon'],
], 'Griffomon');
const Hououmon = new Shop([
    ItemList['Hououmon X-Antibody'],
], 'Hououmon');
const KingEtemon = new Shop([
    ItemList['Bubbmon'],
], 'King Etemon');
const MetalGarurumon = new Shop([
    ItemList['Metal Garurumon X-Antibody'],
    ItemList['Omegamon'],
], 'Metal Garurumon');
const Millenniumon = new Shop([
    ItemList['Moon Millenniumon'],
    ItemList['Zeed Millenniumon'],
], 'Millenniumon');
const Mugendramon = new Shop([
    ItemList['Chaosdramon'],
    ItemList['Millenniumon'],
], 'Mugendramon');
const Omegamon = new Shop([
    ItemList['Omegamon X-Antibody'],
    ItemList['Omegamon Alter-S'],
], 'Omegamon');
const Piemon = new Shop([
    ItemList['Voltobautamon'],
], 'Piemon');
const Pinochimon = new Shop([
    ItemList['Nyokimon'],
], 'Pinochimon');
const Plesiomon = new Shop([
    ItemList['Aegisdramon'],
    ItemList['Plesiomon X-Antibody'],
], 'Plesiomon');
const Rosemon = new Shop([
    ItemList['Babamon'],
    ItemList['Rosemon Burst Mode'],
    ItemList['Rosemon X-Antibody'],
], 'Rosemon');
const SkullMammon = new Shop([
    ItemList['Skull Mammon X-Antibody'],
], 'Skull Mammon');
const VenomVamdemon = new Shop([
    ItemList['Belial Vamdemon'],
], 'Venom Vamdemon');
const WarGreymon = new Shop([
    ItemList['Omegamon'],
    ItemList['War Greymon X-Antibody'],
], 'War Greymon');
const Chicomon = new Shop([
    ItemList['Chibimon'],
], 'Chicomon');
const Cocomon = new Shop([
    ItemList['Chocomon'],
], 'Cocomon');
const Kuramon = new Shop([
    ItemList['Pagumon'],
    ItemList['Tsumemon'],
], 'Kuramon');
const Leafmon = new Shop([
    ItemList['Kodokugumon Child'],
    ItemList['Minomon'],
], 'Leafmon');
const Pururumon = new Shop([
    ItemList['Poromon'],
], 'Pururumon');
const Tsubumon = new Shop([
    ItemList['Tokomon'],
    ItemList['Upamon'],
], 'Tsubumon');
const Zerimon = new Shop([
    ItemList['Gummymon'],
], 'Zerimon');
const ArkadimonBaby = new Shop([
    ItemList['Arkadimon Child'],
], 'Arkadimon Baby');
const Chibimon = new Shop([
    ItemList['V-mon'],
], 'Chibimon');
const Chocomon = new Shop([
    ItemList['Lopmon'],
], 'Chocomon');
const Gummymon = new Shop([
    ItemList['Terriermon'],
], 'Gummymon');
const Minomon = new Shop([
    ItemList['Kokuwamon'],
    ItemList['Wormmon'],
], 'Minomon');
const Poromon = new Shop([
    ItemList['Falcomon 2006'],
    ItemList['Hawkmon'],
], 'Poromon');
const Tsumemon = new Shop([
    ItemList['Agumon Black'],
    ItemList['Dracumon'],
    ItemList['Keramon'],
], 'Tsumemon');
const Upamon = new Shop([
    ItemList['Armadimon'],
], 'Upamon');
const AgumonBlack = new Shop([
    ItemList['Cyclomon'],
    ItemList['Dark Tyranomon'],
    ItemList['Monochromon'],
    ItemList['Greymon Blue'],
], 'Agumon Black');
const Armadimon = new Shop([
    ItemList['Ankylomon'],
    ItemList['Tortamon'],
], 'Armadimon');
const ElecmonViolet = new Shop([
    ItemList['Shima Unimon'],
    ItemList['Thunderballmon'],
    ItemList['Tuskmon'],
], 'Elecmon Violet');
const GabumonBlack = new Shop([
    ItemList['Garurumon Black'],
    ItemList['Kyubimon Silver'],
], 'Gabumon Black');
const Hawkmon = new Shop([
    ItemList['Aquilamon'],
    ItemList['Cockatrimon'],
    ItemList['Peckmon'],
], 'Hawkmon');
const Keramon = new Shop([
    ItemList['Chrysalimon'],
    ItemList['Keramon X-Antibody'],
    ItemList['Wizarmon'],
], 'Keramon');
const Lopmon = new Shop([
    ItemList['Black Tailmon'],
    ItemList['Lopmon X-Antibody'],
    ItemList['Turuiemon'],
    ItemList['Wendimon'],
], 'Lopmon');
const OtamamonRed = new Shop([
    ItemList['Gekomon'],
    ItemList['Octmon'],
], 'Otamamon Red');
const Solarmon = new Shop([
    ItemList['Clockmon'],
    ItemList['Geremon'],
    ItemList['Guardromon Gold'],
    ItemList['Starmon'],
], 'Solarmon');
const Terriermon = new Shop([
    ItemList['Black Galgomon'],
    ItemList['Galgomon'],
    ItemList['Terriermon X-Antibody'],
    ItemList['Turuiemon'],
], 'Terriermon');
const ToyAgumonBlack = new Shop([
    ItemList['Deltamon'],
    ItemList['Guardromon'],
], 'Toy Agumon Black');
const Vmon = new Shop([
    ItemList['V-dramon'],
    ItemList['XV-mon'],
    ItemList['XV-mon Black'],
], 'V-mon');
const Wormmon = new Shop([
    ItemList['Hudiemon'],
    ItemList['Kuwagamon'],
    ItemList['Stingmon'],
], 'Wormmon');
const Ankylomon = new Shop([
    ItemList['Brachimon'],
    ItemList['Shakkoumon'],
    ItemList['Triceramon'],
    ItemList['Vermillimon'],
], 'Ankylomon');
const Aquilamon = new Shop([
    ItemList['Aero V-dramon'],
    ItemList['Garudamon'],
    ItemList['Silphymon'],
    ItemList['Yatagaramon 2006'],
], 'Aquilamon');
const BlackTailmon = new Shop([
    ItemList['Black Tailmon Uver'],
    ItemList['Lady Devimon'],
    ItemList['Waru Monzaemon'],
], 'Black Tailmon');
const BomberNanimon = new Shop([
    ItemList['Giromon'],
    ItemList['Metal Mamemon'],
], 'Bomber Nanimon');
const Chrysalimon = new Shop([
    ItemList['Cyberdramon'],
    ItemList['Infermon'],
    ItemList['Taomon'],
], 'Chrysalimon');
const Galgomon = new Shop([
    ItemList['Andiramon Deva'],
    ItemList['Rapidmon Perfect'],
], 'Galgomon');
const GarurumonBlack = new Shop([
    ItemList['Blue Meramon'],
    ItemList['Mammon'],
    ItemList['Were Garurumon Black'],
], 'Garurumon Black');
const GreymonBlue = new Shop([
    ItemList['Metal Greymon Virus'],
    ItemList['Skull Greymon'],
    ItemList['Vermillimon'],
], 'Greymon Blue');
const RedVdramon = new Shop([
    ItemList['Aero V-dramon'],
    ItemList['Atlur Kabuterimon Red'],
    ItemList['Metal Tyranomon'],
], 'Red V-dramon');
const Sorcerimon = new Shop([
    ItemList['Panjyamon'],
    ItemList['Wisemon'],
], 'Sorcerimon');
const Stingmon = new Shop([
    ItemList['Dinobeemon'],
    ItemList['Jewelbeemon'],
    ItemList['Ookuwamon'],
], 'Stingmon');
const Wendimon = new Shop([
    ItemList['Andiramon'],
    ItemList['Bastemon'],
], 'Wendimon');
const XVmon = new Shop([
    ItemList['Aero V-dramon'],
    ItemList['Paildramon'],
    ItemList['Wingdramon'],
], 'XV-mon');
const Andiramon = new Shop([
    ItemList['Cherubimon Vice'],
    ItemList['Mercurymon'],
], 'Andiramon');
const Archnemon = new Shop([
    ItemList['Lilithmon'],
    ItemList['Parasimon'],
], 'Archnemon');
const Cyberdramon = new Shop([
    ItemList['Cyberdramon X-Antibody'],
    ItemList['Justimon Blitz Arm'],
    ItemList['Zeed Millenniumon'],
], 'Cyberdramon');
const Dinobeemon = new Shop([
    ItemList['Gran Kuwagamon'],
    ItemList['Imperialdramon Dragon Mode'],
], 'Dinobeemon');
const Infermon = new Shop([
    ItemList['Diablomon'],
    ItemList['Venom Vamdemon'],
], 'Infermon');
const Mummymon = new Shop([
    ItemList['Deathmon'],
    ItemList['Pharaohmon'],
], 'Mummymon');
const Paildramon = new Shop([
    ItemList['Gundramon'],
    ItemList['Imperialdramon Dragon Mode'],
], 'Paildramon');
const Shakkoumon = new Shop([
    ItemList['Slash Angemon'],
    ItemList['Vikemon'],
], 'Shakkoumon');
const Silphymon = new Shop([
    ItemList['Ornismon'],
    ItemList['Valkyrimon'],
], 'Silphymon');
const Superstarmon = new Shop([
    ItemList['Gankoomon'],
    ItemList['Prince Mamemon'],
], 'Superstarmon');
const Volcamon = new Shop([
    ItemList['Ancient Volcamon'],
    ItemList['Pile Volcamon'],
], 'Volcamon');
const WereGarurumonBlack = new Shop([
    ItemList['Bancho Leomon'],
    ItemList['Metal Garurumon Black'],
    ItemList['Minervamon'],
], 'Were Garurumon Black');
const Baihumon = new Shop([
    ItemList['Huanglongmon'],
], 'Baihumon');
const BelialVamdemon = new Shop([
    ItemList['Peti Meramon'],
], 'Belial Vamdemon');
const BlackWarGreymon = new Shop([
    ItemList['Black War Greymon X-Antibody'],
    ItemList['Omegamon Zwart'],
], 'Black War Greymon');
const ChaosGreymon = new Shop([
    ItemList['Botamon'],
], 'Chaos Greymon');
const ChaosLord = new Shop([
    ItemList['Bombmon'],
], 'Chaos Lord');
const ChaosPiemon = new Shop([
    ItemList['Bubbmon'],
], 'Chaos Piemon');
const ChaosSeadramon = new Shop([
    ItemList['Pitchmon'],
], 'Chaos Seadramon');
const CherubimonVice = new Shop([
    ItemList['Cherubimon Vice X-Antibody'],
    ItemList['Cherubimon Virtue'],
], 'Cherubimon Vice');
const CherubimonVirtue = new Shop([
    ItemList['Cherubimon Vice'],
    ItemList['Cherubimon Virtue X-Antibody'],
], 'Cherubimon Virtue');
const Crossmon = new Shop([
    ItemList['Puwamon'],
], 'Crossmon');
const Deathmon = new Shop([
    ItemList['Kuramon'],
], 'Deathmon');
const DeathmonBlack = new Shop([
    ItemList['Kuramon'],
], 'Deathmon Black');
const Devitamamon = new Shop([
    ItemList['Mokumon'],
], 'Devitamamon');
const Ebemon = new Shop([
    ItemList['Ebemon X-Antibody'],
], 'Ebemon');
const GranKuwagamon = new Shop([
    ItemList['Grandis Kuwagamon'],
], 'Gran Kuwagamon');
const HiAndromon = new Shop([
    ItemList['Choromon'],
], 'Hi Andromon');
const ImperialdramonDragonMode = new Shop([
    ItemList['Imperialdramon Fighter Mode'],
], 'Imperialdramon Dragon Mode');
const ImperialdramonDragonModeBlack = new Shop([
    ItemList['Imperialdramon Fighter Mode Black'],
], 'Imperialdramon Dragon Mode Black');
const ImperialdramonFighterMode = new Shop([
    ItemList['Imperialdramon Paladin Mode'],
], 'Imperialdramon Fighter Mode');
const Lampmon = new Shop([
    ItemList['Zurumon'],
], 'Lampmon');
const MetalGarurumonBlack = new Shop([
    ItemList['Omegamon Zwart'],
], 'Metal Garurumon Black');
const MoonMillenniumon = new Shop([
    ItemList['Zeed Millenniumon'],
], 'Moon Millenniumon');
const Pharaohmon = new Shop([
    ItemList['Mokumon'],
], 'Pharaohmon');
const PrinceMamemon = new Shop([
    ItemList['Prince Mamemon X-Antibody'],
], 'Prince Mamemon');
const Qinglongmon = new Shop([
    ItemList['Huanglongmon'],
], 'Qinglongmon');
const Seraphimon = new Shop([
    ItemList['Zurumon'],
], 'Seraphimon');
const Valkyrimon = new Shop([
    ItemList['Pururumon'],
], 'Valkyrimon');
const Vikemon = new Shop([
    ItemList['Pitchmon'],
], 'Vikemon');
const Xuanwumon = new Shop([
    ItemList['Huanglongmon'],
], 'Xuanwumon');
const Zanbamon = new Shop([
    ItemList['Punimon'],
], 'Zanbamon');
const Zhuqiaomon = new Shop([
    ItemList['Huanglongmon'],
], 'Zhuqiaomon');
const Allomon = new Shop([
    ItemList['Allomon X-Antibody'],
    ItemList['Megalo Growmon'],
], 'Allomon');
const Archelomon = new Shop([
    ItemList['Hangyomon'],
    ItemList['Zudomon'],
], 'Archelomon');
const Baromon = new Shop([
    ItemList['Mephismon'],
], 'Baromon');
const Bitmon = new Shop([
    ItemList['Andiramon Deva'],
], 'Bitmon');
const Boarmon = new Shop([
    ItemList['Mammon'],
    ItemList['Vikaralamon'],
], 'Boarmon');
const Bullmon = new Shop([
    ItemList['Vajramon'],
], 'Bullmon');
const Butterflamon = new Shop([
    ItemList['Atlur Kabuterimon Blue'],
], 'Butterflamon');
const Chamelemon = new Shop([
    ItemList['Brachimon'],
], 'Chamelemon');
const Coatlmon = new Shop([
    ItemList['Majiramon'],
    ItemList['Sandiramon'],
], 'Coatlmon');
const Depthmon = new Shop([
    ItemList['Dagomon'],
    ItemList['Divemon'],
    ItemList['Marin Devimon'],
], 'Depthmon');
const Digmon = new Shop([
    ItemList['Scorpiomon'],
    ItemList['Triceramon'],
], 'Digmon');
const Elephamon = new Shop([
    ItemList['Master Tyranomon'],
    ItemList['Mammon'],
], 'Elephamon');
const Fladramon = new Shop([
    ItemList['Aero V-dramon'],
    ItemList['Volcamon'],
], 'Fladramon');
const Flybeemon = new Shop([
    ItemList['Dinobeemon'],
], 'Flybeemon');
const Frogmon = new Shop([
    ItemList['Tonosama Gekomon'],
], 'Frogmon');
const Gargomon = new Shop([
    ItemList['Cyberdramon'],
    ItemList['Skull Greymon'],
], 'Gargomon');
const Goatmon = new Shop([
    ItemList['Mephismon'],
    ItemList['Mephismon'],
], 'Goatmon');
const GoldVdramon = new Shop([
    ItemList['Aero V-dramon'],
    ItemList['Mega Seadramon'],
    ItemList['Metal Greymon'],
], 'Gold V-dramon');
const Harpymon = new Shop([
    ItemList['Parrotmon'],
    ItemList['Silphymon'],
], 'Harpymon');
const Holsmon = new Shop([
    ItemList['Garudamon'],
    ItemList['Mihiramon'],
], 'Holsmon');
const Honeybeemon = new Shop([
    ItemList['Archnemon'],
], 'Honeybeemon');
const Kabukimon = new Shop([
    ItemList['Jyureimon'],
    ItemList['Zanbamon'],
], 'Kabukimon');
const Kangarumon = new Shop([
    ItemList['Taomon'],
    ItemList['Vajramon'],
], 'Kangarumon');
const Kongoumon = new Shop([
    ItemList['Atlur Kabuterimon Blue'],
    ItemList['Atlur Kabuterimon Red'],
], 'Kongoumon');
const Lighdramon = new Shop([
    ItemList['Caturamon'],
    ItemList['Were Garurumon'],
], 'Lighdramon');
const Lynxmon = new Shop([
    ItemList['Apollomon'],
    ItemList['Mihiramon'],
], 'Lynxmon');
const Magnamon = new Shop([
    ItemList['Magnamon X-Antibody'],
], 'Magnamon');
const Maildramon = new Shop([
    ItemList['Hippogriffomon'],
    ItemList['Silphymon'],
], 'Maildramon');
const Manbomon = new Shop([
    ItemList['Hangyomon'],
    ItemList['Mega Seadramon'],
], 'Manbomon');
const Mantaraymon = new Shop([
    ItemList['Mantaraymon X-Antibody'],
    ItemList['Marin Devimon'],
], 'Mantaraymon');
const Moosemon = new Shop([
    ItemList['Panjyamon'],
], 'Moosemon');
const Mothmon = new Shop([
    ItemList['Atlur Kabuterimon Red'],
    ItemList['Blossomon'],
], 'Mothmon');
const Nefertimon = new Shop([
    ItemList['Angewomon'],
    ItemList['Nefertimon X-Antibody'],
], 'Nefertimon');
const Nohemon = new Shop([
    ItemList['Jyagamon'],
    ItemList['Yatagaramon'],
], 'Nohemon');
const Opossummon = new Shop([
    ItemList['Cho·Hakkaimon'],
    ItemList['Caturamon'],
], 'Opossummon');
const Orcamon = new Shop([
    ItemList['Marin Devimon'],
    ItemList['Mermaimon'],
], 'Orcamon');
const Owlmon = new Shop([
    ItemList['Parrotmon'],
    ItemList['Yatagaramon 2006'],
], 'Owlmon');
const Peacockmon = new Shop([
    ItemList['Aero V-dramon'],
    ItemList['Cyberdramon'],
], 'Peacockmon');
const Pegasmon = new Shop([
    ItemList['Holy Angemon'],
    ItemList['Pegasmon X-Antibody'],
], 'Pegasmon');
const Pipismon = new Shop([
    ItemList['Venom Vamdemon'],
], 'Pipismon');
const Ponchomon = new Shop([
    ItemList['Fantomon'],
    ItemList['Pumpmon'],
], 'Ponchomon');
const Prairiemon = new Shop([
    ItemList['Kumbhiramon'],
    ItemList['Monzaemon'],
], 'Prairiemon');
const Pteranomon = new Shop([
    ItemList['Pteranomon X-Antibody'],
], 'Pteranomon');
const Pucchiemon = new Shop([
    ItemList['Bancho Stingmon'],
    ItemList['Phelesmon'],
], 'Pucchiemon');
const PucchiemonGreen = new Shop([
    ItemList['Ookuwamon'],
    ItemList['Lilimon'],
], 'Pucchiemon Green');
const RapidmonArmor = new Shop([
    ItemList['Rapidmon X-Antibody'],
    ItemList['Saint Galgomon'],
], 'Rapidmon Armor');
const Rhinomon = new Shop([
    ItemList['Rhinomon X-Antibody'],
], 'Rhinomon');
const Rinkmon = new Shop([
    ItemList['Andromon'],
    ItemList['Cyberdramon'],
], 'Rinkmon');
const Sagittarimon = new Shop([
    ItemList['Tyilinmon'],
], 'Sagittarimon');
const Seahomon = new Shop([
    ItemList['Sirenmon'],
    ItemList['Vajramon'],
], 'Seahomon');
const Searchmon = new Shop([
    ItemList['Assaultmon'],
    ItemList['Atlur Kabuterimon Blue'],
], 'Searchmon');
const Sepikmon = new Shop([
    ItemList['Vademon'],
], 'Sepikmon');
const Sethmon = new Shop([
    ItemList['Megalo Growmon'],
], 'Sethmon');
const Shadramon = new Shop([
    ItemList['Karatenmon'],
    ItemList['Volcamon'],
], 'Shadramon');
const Sheepmon = new Shop([
    ItemList['Pajramon'],
], 'Sheepmon');
const Shurimon = new Shop([
    ItemList['Karatenmon'],
], 'Shurimon');
const Stegomon = new Shop([
    ItemList['Orochimon'],
], 'Stegomon');
const Submarimon = new Shop([
    ItemList['Gusokumon'],
    ItemList['Piranimon'],
], 'Submarimon');
const Swanmon = new Shop([
    ItemList['Holy Angemon'],
    ItemList['Sinduramon'],
], 'Swanmon');
const Tocanmon = new Shop([
    ItemList['Digitamamon'],
    ItemList['Griffomon'],
], 'Tocanmon');
const Togemogumon = new Shop([
    ItemList['Panjyamon'],
], 'Togemogumon');
const Tylomon = new Shop([
    ItemList['Mega Seadramon'],
    ItemList['Tylomon X-Antibody'],
], 'Tylomon');
const Yaksamon = new Shop([
    ItemList['Asuramon'],
    ItemList['Kyukimon'],
], 'Yaksamon');
const Jyarimon = new Shop([
    ItemList['Gigimon'],
], 'Jyarimon');
const Ketomon = new Shop([
    ItemList['Hopmon'],
], 'Ketomon');
const Paomon = new Shop([
    ItemList['Xiaomon'],
], 'Paomon');
const Pipimon = new Shop([
    ItemList['Tanemon'],
], 'Pipimon');
const Relemon = new Shop([
    ItemList['Pokomon'],
], 'Relemon');
const Gigimon = new Shop([
    ItemList['Agumon'],
    ItemList['Goburimon'],
    ItemList['Guilmon'],
], 'Gigimon');
const Hopmon = new Shop([
    ItemList['Jazamon'],
    ItemList['Monodramon'],
    ItemList['V-mon'],
], 'Hopmon');
const Pokomon = new Shop([
    ItemList['Plotmon'],
    ItemList['Renamon'],
], 'Pokomon');
const Xiaomon = new Shop([
    ItemList['Labramon'],
], 'Xiaomon');
const ArkadimonChild = new Shop([
    ItemList['Arkadimon Adult'],
    ItemList['Chrysalimon'],
], 'Arkadimon Child');
const Guilmon = new Shop([
    ItemList['Growmon'],
    ItemList['Guilmon X-Antibody'],
    ItemList['Tyranomon'],
], 'Guilmon');
const Impmon = new Shop([
    ItemList['Bakemon'],
    ItemList['Black Tailmon'],
    ItemList['Devimon'],
    ItemList['Impmon X-Antibody'],
], 'Impmon');
const Labramon = new Shop([
    ItemList['Dobermon'],
    ItemList['Siesamon'],
], 'Labramon');
const Lucemon = new Shop([
    ItemList['Angemon'],
    ItemList['Devimon'],
    ItemList['Lucemon Falldown Mode'],
], 'Lucemon');
const Monodramon = new Shop([
    ItemList['Airdramon'],
    ItemList['Raptordramon'],
    ItemList['Strikedramon'],
], 'Monodramon');
const PetitMamon = new Shop([
    ItemList['Devimon'],
    ItemList['Igamon'],
], 'Petit Mamon');
const Renamon = new Shop([
    ItemList['Kyubimon'],
    ItemList['Renamon X-Antibody'],
    ItemList['Youkomon'],
], 'Renamon');
const ArkadimonAdult = new Shop([
    ItemList['Arkadimon Perfect'],
    ItemList['Infermon'],
], 'Arkadimon Adult');
const BlackGalgomon = new Shop([
    ItemList['Assaultmon'],
    ItemList['Black Rapidmon'],
], 'Black Galgomon');
const BlackGrowmon = new Shop([
    ItemList['Black Megalo Growmon'],
    ItemList['Skull Greymon'],
], 'Black Growmon');
const Dobermon = new Shop([
    ItemList['Cerberumon'],
    ItemList['Dobermon X-Antibody'],
], 'Dobermon');
const Dogmon = new Shop([
    ItemList['Cerberumon'],
], 'Dogmon');
const Growmon = new Shop([
    ItemList['Growmon X-Antibody'],
    ItemList['Megalo Growmon'],
    ItemList['Skull Greymon'],
], 'Growmon');
const GrowmonOrange = new Shop([
    ItemList['Gigadramon'],
    ItemList['Megalo Growmon Data'],
], 'Growmon Orange');
const Kyubimon = new Shop([
    ItemList['Monzaemon'],
    ItemList['Taomon'],
], 'Kyubimon');
const KyubimonSilver = new Shop([
    ItemList['Taomon Silver'],
    ItemList['Waru Monzaemon'],
], 'Kyubimon Silver');
const Siesamon = new Shop([
    ItemList['Cerberumon'],
    ItemList['Siesamon X-Antibody'],
], 'Siesamon');
const Strikedramon = new Shop([
    ItemList['Cyberdramon'],
    ItemList['Megadramon'],
    ItemList['Metal Greymon'],
], 'Strikedramon');
const Turuiemon = new Shop([
    ItemList['Andiramon Deva'],
    ItemList['Monzaemon'],
], 'Turuiemon');
const VdramonBlack = new Shop([
    ItemList['Aero V-dramon'],
    ItemList['Cyberdramon'],
    ItemList['Metal Greymon Virus'],
], 'V-dramon Black');
const Youkomon = new Shop([
    ItemList['Doumon'],
    ItemList['Kyukimon'],
], 'Youkomon');
const AndiramonDeva = new Shop([
    ItemList['Cherubimon Virtue'],
    ItemList['Duftmon'],
    ItemList['Minervamon'],
], 'Andiramon Deva');
const ArkadimonPerfect = new Shop([
    ItemList['Arkadimon Ultimate'],
    ItemList['Demon'],
    ItemList['Diablomon'],
], 'Arkadimon Perfect');
const BlackMegaloGrowmon = new Shop([
    ItemList['Black War Greymon'],
    ItemList['Chaos Dukemon'],
    ItemList['Darkdramon'],
], 'Black Megalo Growmon');
const BlackRapidmon = new Shop([
    ItemList['Black Saint Galgomon'],
    ItemList['Justimon Accel Arm'],
], 'Black Rapidmon');
const Caturamon = new Shop([
    ItemList['Baihumon'],
    ItemList['Saber Leomon'],
], 'Caturamon');
const Cerberumon = new Shop([
    ItemList['Anubimon'],
    ItemList['Cerberumon Werewolf Mode'],
    ItemList['Cerberumon X-Antibody'],
], 'Cerberumon');
const Doumon = new Shop([
    ItemList['Kuzuhamon'],
    ItemList['Metal Garurumon Black'],
], 'Doumon');
const GrappuLeomon = new Shop([
    ItemList['Bancho Leomon'],
    ItemList['Duftmon'],
    ItemList['Heavy Leomon'],
    ItemList['Marsmon'],
    ItemList['Saber Leomon'],
], 'Grappu Leomon');
const Indaramon = new Shop([
    ItemList['Belial Vamdemon'],
    ItemList['Murmukusmon'],
], 'Indaramon');
const Karatenmon = new Shop([
    ItemList['Ravmon'],
    ItemList['Valdurmon'],
], 'Karatenmon');
const Kumbhiramon = new Shop([
    ItemList['Xuanwumon'],
], 'Kumbhiramon');
const Majiramon = new Shop([
    ItemList['Qinglongmon'],
], 'Majiramon');
const Makuramon = new Shop([
    ItemList['Metal Etemon'],
    ItemList['King Etemon'],
], 'Makuramon');
const MegaloGrowmon = new Shop([
    ItemList['Dukemon'],
    ItemList['Megidramon'],
    ItemList['Megalo Growmon X-Antibody'],
], 'Megalo Growmon');
const MegaloGrowmonData = new Shop([
    ItemList['Dukemon'],
    ItemList['Victory Greymon'],
    ItemList['War Greymon'],
], 'Megalo Growmon Data');
const Mephismon = new Shop([
    ItemList['Gulfmon'],
    ItemList['Mephismon X-Antibody'],
], 'Mephismon');
const Mihiramon = new Shop([
    ItemList['Baihumon'],
    ItemList['Metal Garurumon'],
], 'Mihiramon');
const Orochimon = new Shop([
    ItemList['Nidhoggmon'],
    ItemList['Xuanwumon'],
], 'Orochimon');
const Pajramon = new Shop([
    ItemList['Cherubimon Virtue'],
    ItemList['Cherubimon Vice'],
    ItemList['Saint Galgomon'],
], 'Pajramon');
const Pandamon = new Shop([
    ItemList['Jijimon'],
    ItemList['Metal Garurumon Black'],
    ItemList['Mercurymon'],
], 'Pandamon');
const RapidmonPerfect = new Shop([
    ItemList['Saint Galgomon'],
    ItemList['Sleipmon'],
], 'Rapidmon Perfect');
const Sandiramon = new Shop([
    ItemList['Megidramon'],
    ItemList['Qinglongmon'],
], 'Sandiramon');
const Scorpiomon = new Shop([
    ItemList['Lilithmon'],
    ItemList['Nidhoggmon'],
], 'Scorpiomon');
const Sinduramon = new Shop([
    ItemList['Crossmon'],
    ItemList['Valdurmon'],
    ItemList['Zhuqiaomon'],
], 'Sinduramon');
const Taomon = new Shop([
    ItemList['Ofanimon'],
    ItemList['Sakuyamon'],
    ItemList['Valkyrimon'],
], 'Taomon');
const TaomonSilver = new Shop([
    ItemList['Kuzuhamon'],
    ItemList['Sakuyamon'],
], 'Taomon Silver');
const Vajramon = new Shop([
    ItemList['Zanbamon'],
], 'Vajramon');
const Vikaralamon = new Shop([
    ItemList['Platinum Numemon'],
    ItemList['Xuanwumon'],
], 'Vikaralamon');
const Anubimon = new Shop([
    ItemList['Chicomon'],
], 'Anubimon');
const ArkadimonUltimate = new Shop([
    ItemList['Arkadimon Super Ultimate'],
], 'Arkadimon Ultimate');
const Armagemon = new Shop([
    ItemList['Kuramon'],
], 'Armagemon');
const Beelzebumon = new Shop([
    ItemList['Beelzebumon X-Antibody'],
    ItemList['Beelzebumon Blast Mode'],
], 'Beelzebumon');
const BeelzebumonBlastMode = new Shop([
    ItemList['Keemon'],
], 'Beelzebumon Blast Mode');
const BlackSaintGalgomon = new Shop([
    ItemList['Cocomon'],
], 'Black Saint Galgomon');
const ChaosDukemon = new Shop([
    ItemList['Jyarimon'],
], 'Chaos Dukemon');
const Dukemon = new Shop([
    ItemList['Dukemon X-Antibody'],
    ItemList['Dukemon Crimson Mode'],
    ItemList['Medieval Dukemon'],
], 'Dukemon');
const DukemonCrimsonMode = new Shop([
    ItemList['Jyarimon'],
], 'Dukemon Crimson Mode');
const Gokumon = new Shop([
    ItemList['Mokumon'],
], 'Gokumon');
const Gulfmon = new Shop([
    ItemList['Zurumon'],
], 'Gulfmon');
const ImperialdramonFighterModeBlack = new Shop([
    ItemList['Chicomon'],
], 'Imperialdramon Fighter Mode Black');
const ImperialdramonPaladinMode = new Shop([
    ItemList['Chicomon'],
], 'Imperialdramon Paladin Mode');
const JustimonAccelArm = new Shop([
    ItemList['Justimon Blitz Arm'],
    ItemList['Justimon Critical Arm'],
    ItemList['Justimon X-Antibody'],
], 'Justimon Accel Arm');
const JustimonBlitzArm = new Shop([
    ItemList['Justimon Accel Arm'],
    ItemList['Justimon Critical Arm'],
    ItemList['Justimon X-Antibody'],
], 'Justimon Blitz Arm');
const JustimonCriticalArm = new Shop([
    ItemList['Justimon Accel Arm'],
    ItemList['Justimon Blitz Arm'],
    ItemList['Justimon X-Antibody'],
], 'Justimon Critical Arm');
const Kuzuhamon = new Shop([
    ItemList['Kuzuhamon Miko Mode'],
], 'Kuzuhamon');
const Megidramon = new Shop([
    ItemList['Chaos Dukemon'],
    ItemList['Megidramon X-Antibody'],
], 'Megidramon');
const Ofanimon = new Shop([
    ItemList['Ofanimon X-Antibody'],
    ItemList['Ofanimon Falldown Mode'],
], 'Ofanimon');
const Parallelmon = new Shop([
    ItemList['Kuramon'],
], 'Parallelmon');
const SaintGalgomon = new Shop([
    ItemList['Zerimon'],
], 'Saint Galgomon');
const Sakuyamon = new Shop([
    ItemList['Sakuyamon X-Antibody'],
    ItemList['Sakuyamon Miko Mode'],
], 'Sakuyamon');
const SakuyamonMikoMode = new Shop([
    ItemList['Relemon'],
], 'Sakuyamon Miko Mode');
const ZeedMillenniumon = new Shop([
    ItemList['Zurumon'],
], 'Zeed Millenniumon');
const Culumon = new Shop([
    ItemList['Yukimi Botamon'],
], 'Culumon');
const Keemon = new Shop([
    ItemList['Yarmon'],
], 'Keemon');
const Puttimon = new Shop([
    ItemList['Cupimon'],
], 'Puttimon');
const Cupimon = new Shop([
    ItemList['Lucemon'],
    ItemList['Patamon'],
    ItemList['Plotmon'],
], 'Cupimon');
const TorikaraBallmon = new Shop([
    ItemList['Burgamon'],
    ItemList['Ebi Burgamon'],
], 'Torikara Ballmon');
const Yarmon = new Shop([
    ItemList['Agumon Black'],
    ItemList['Impmon'],
], 'Yarmon');
const Bearmon = new Shop([
    ItemList['Garurumon'],
    ItemList['Gryzmon'],
    ItemList['Leomon'],
], 'Bearmon');
const Bemmon = new Shop([
    ItemList['Snatchmon'],
], 'Bemmon');
const Bokomon = new Shop([
    ItemList['Galgomon'],
    ItemList['Mojyamon'],
], 'Bokomon');
const Burgamon = new Shop([
    ItemList['Burgamon Adult'],
], 'Burgamon');
const CardmonC1 = new Shop([
    ItemList['Dokimon'],
], 'Cardmon C1');
const EbiBurgamon = new Shop([
    ItemList['Burgamon Adult'],
], 'Ebi Burgamon');
const Koemon = new Shop([
    ItemList['Gorimon'],
    ItemList['Hanumon'],
    ItemList['Targetmon'],
], 'Koemon');
const Kotemon = new Shop([
    ItemList['Dinohumon'],
    ItemList['Gladimon'],
    ItemList['Musyamon'],
], 'Kotemon');
const Neamon = new Shop([
    ItemList['Kangarumon'],
    ItemList['Prairiemon'],
], 'Neamon');
const Blimpmon = new Shop([
    ItemList['Valvemon'],
], 'Blimpmon');
const Boogiemon = new Shop([
    ItemList['Death Meramon'],
    ItemList['Mephismon'],
    ItemList['Phelesmon'],
], 'Boogiemon');
const BurgamonAdult = new Shop([
    ItemList['Digitamamon'],
    ItemList['Jyagamon'],
    ItemList['Pumpmon'],
], 'Burgamon Adult');
const Darcmon = new Shop([
    ItemList['Angewomon'],
    ItemList['Hippogriffomon'],
    ItemList['Murmukusmon'],
], 'Darcmon');
const Dinohumon = new Shop([
    ItemList['Knightmon'],
    ItemList['Orochimon'],
    ItemList['Zanbamon'],
], 'Dinohumon');
const Fangmon = new Shop([
    ItemList['Cerberumon'],
    ItemList['Were Garurumon'],
], 'Fangmon');
const Gladimon = new Shop([
    ItemList['Knightmon'],
    ItemList['Metal Mamemon'],
    ItemList['Tekkamon'],
], 'Gladimon');
const Gryzmon = new Shop([
    ItemList['Callismon'],
    ItemList['Cerberumon'],
    ItemList['Grappu Leomon'],
], 'Gryzmon');
const Hookmon = new Shop([
    ItemList['Captain Hookmon'],
    ItemList['Mermaimon'],
    ItemList['Shawujinmon'],
], 'Hookmon');
const Kougamon = new Shop([
    ItemList['Giromon'],
    ItemList['Karatenmon'],
], 'Kougamon');
const Mikemon = new Shop([
    ItemList['Bastemon'],
    ItemList['Betsumon'],
], 'Mikemon');
const Snatchmon = new Shop([
    ItemList['Destromon'],
], 'Snatchmon');
const TrailmonWorm = new Shop([
    ItemList['Locomon'],
], 'Trailmon Worm');
const Witchmon = new Shop([
    ItemList['Bastemon'],
    ItemList['Lady Devimon'],
    ItemList['Neo Devimon'],
], 'Witchmon');
const XVmonBlack = new Shop([
    ItemList['Megadramon'],
    ItemList['Paildramon'],
], 'XV-mon Black');
const Assaultmon = new Shop([
    ItemList['Cannondramon'],
    ItemList['Chaosdramon'],
    ItemList['Darkdramon'],
], 'Assaultmon');
const Bastemon = new Shop([
    ItemList['Babamon'],
    ItemList['Kuzuhamon'],
    ItemList['Lilithmon'],
], 'Bastemon');
const Betsumon = new Shop([
    ItemList['Holydramon'],
    ItemList['King Etemon'],
], 'Betsumon');
const BlackKingNumemon = new Shop([
    ItemList['Metal Etemon'],
    ItemList['Platinum Numemon'],
    ItemList['Prince Mamemon'],
], 'Black King Numemon');
const Destromon = new Shop([
    ItemList['Ragnamon'],
], 'Destromon');
const Hippogriffomon = new Shop([
    ItemList['Griffomon'],
    ItemList['Murmukusmon'],
    ItemList['Valdurmon'],
], 'Hippogriffomon');
const Jewelbeemon = new Shop([
    ItemList['Ancient Beatmon'],
    ItemList['Bancho Stingmon'],
    ItemList['Grandis Kuwagamon'],
], 'Jewelbeemon');
const Kyukimon = new Shop([
    ItemList['Gokumon'],
    ItemList['Sakuyamon'],
    ItemList['Slash Angemon'],
], 'Kyukimon');
const Locomon = new Shop([
    ItemList['Grand Locomon'],
    ItemList['Heavy Leomon'],
], 'Locomon');
const LucemonFalldownMode = new Shop([
    ItemList['Lucemon X-Antibody'],
    ItemList['Lucemon Larva'],
    ItemList['Lucemon Satan Mode'],
], 'Lucemon Falldown Mode');
const Mermaimon = new Shop([
    ItemList['Ancient Mermaimon'],
    ItemList['Leviamon'],
    ItemList['Neptunemon'],
    ItemList['Regalecusmon'],
], 'Mermaimon');
const Mistymon = new Shop([
    ItemList['Dynasmon'],
    ItemList['Lord Knightmon'],
    ItemList['Pharaohmon'],
], 'Mistymon');
const NeoDevimon = new Shop([
    ItemList['Done Devimon'],
    ItemList['Demon'],
    ItemList['Neo Vamdemon'],
], 'Neo Devimon');
const Phelesmon = new Shop([
    ItemList['Belial Vamdemon'],
    ItemList['Murmukusmon'],
    ItemList['Piemon'],
], 'Phelesmon');
const Valvemon = new Shop([
    ItemList['Breakdramon'],
    ItemList['Chaosdramon'],
], 'Valvemon');
const Wisemon = new Shop([
    ItemList['Ancient Wisemon'],
    ItemList['Jijimon'],
    ItemList['Piemon'],
], 'Wisemon');
const AncientBeatmon = new Shop([
    ItemList['Yuramon'],
], 'Ancient Beatmon');
const AncientGarurumon = new Shop([
    ItemList['Punimon'],
], 'Ancient Garurumon');
const AncientGreymon = new Shop([
    ItemList['Botamon'],
], 'Ancient Greymon');
const AncientIrismon = new Shop([
    ItemList['Puwamon'],
], 'Ancient Irismon');
const AncientMegatheriumon = new Shop([
    ItemList['Yukimi Botamon'],
], 'Ancient Megatheriumon');
const AncientMermaimon = new Shop([
    ItemList['Pitchmon'],
], 'Ancient Mermaimon');
const AncientSphinxmon = new Shop([
    ItemList['Zurumon'],
], 'Ancient Sphinxmon');
const AncientTroiamon = new Shop([
    ItemList['Leafmon'],
], 'Ancient Troiamon');
const AncientVolcamon = new Shop([
    ItemList['Mokumon'],
], 'Ancient Volcamon');
const AncientWisemon = new Shop([
    ItemList['Choromon'],
], 'Ancient Wisemon');
const BlackSeraphimon = new Shop([
    ItemList['Keemon'],
], 'Black Seraphimon');
const Callismon = new Shop([
    ItemList['Botamon'],
], 'Callismon');
const Cannondramon = new Shop([
    ItemList['Petitmon'],
], 'Cannondramon');
const Chaosdramon = new Shop([
    ItemList['Chaosdramon X-Antibody'],
], 'Chaosdramon');
const Dominimon = new Shop([
    ItemList['Poyomon'],
], 'Dominimon');
const Dynasmon = new Shop([
    ItemList['Dynasmon X-Antibody'],
], 'Dynasmon');
const Fujinmon = new Shop([
    ItemList['Choromon'],
], 'Fujinmon');
const GrandLocomon = new Shop([
    ItemList['Choromon'],
], 'Grand Locomon');
const Huanglongmon = new Shop([
    ItemList['Mokumon'],
], 'Huanglongmon');
const Lilithmon = new Shop([
    ItemList['Lilithmon X-Antibody'],
], 'Lilithmon');
const LordKnightmon = new Shop([
    ItemList['Lord Knightmon X-Antibody'],
], 'Lord Knightmon');
const LucemonSatanMode = new Shop([
    ItemList['Lucemon Larva'],
], 'Lucemon Satan Mode');
const Marsmon = new Shop([
    ItemList['Punimon'],
], 'Marsmon');
const Metamormon = new Shop([
    ItemList['Mokumon'],
], 'Metamormon');
const Murmukusmon = new Shop([
    ItemList['Keemon'],
], 'Murmukusmon');
const Ornismon = new Shop([
    ItemList['Pururumon'],
], 'Ornismon');
const Parasimon = new Shop([
    ItemList['Yuramon'],
], 'Parasimon');
const PileVolcamon = new Shop([
    ItemList['Mokumon'],
], 'Pile Volcamon');
const Ragnamon = new Shop([
    ItemList['Pitchmon'],
], 'Ragnamon');
const Raidenmon = new Shop([
    ItemList['Choromon'],
], 'Raidenmon');
const Raijinmon = new Shop([
    ItemList['Choromon'],
], 'Raijinmon');
const Regulumon = new Shop([
    ItemList['Zurumon'],
], 'Regulumon');
const SlashAngemon = new Shop([
    ItemList['Tsubumon'],
], 'Slash Angemon');
const Suijinmon = new Shop([
    ItemList['Choromon'],
], 'Suijinmon');
const Susanoomon = new Shop([
    ItemList['Mokumon'],
], 'Susanoomon');
const UlforceVdramon = new Shop([
    ItemList['Ulforce V-dramon Future Mode'],
    ItemList['Ulforce V-dramon X-Antibody'],
], 'Ulforce V-dramon');
const FlaWizarmon = new Shop([
    ItemList['Mistymon'],
    ItemList['Wisemon'],
], 'Fla Wizarmon');
const Kenkimon = new Shop([
    ItemList['Andromon'],
    ItemList['Valvemon'],
], 'Kenkimon');
const Salamandamon = new Shop([
    ItemList['Megalo Growmon'],
    ItemList['Volcamon'],
], 'Salamandamon');
const Thunderbirmon = new Shop([
    ItemList['Bio Thunderbirmon'],
    ItemList['Hippogriffomon'],
    ItemList['Parrotmon'],
], 'Thunderbirmon');
const Agnimon = new Shop([
    ItemList['Aldamon'],
    ItemList['Vritramon'],
], 'Agnimon');
const Aldamon = new Shop([
    ItemList['Bryweludramon'],
    ItemList['Kaiser Greymon'],
], 'Aldamon');
const Arbormon = new Shop([
    ItemList['Jyureimon'],
    ItemList['Petaldramon'],
], 'Arbormon');
const Beowolfmon = new Shop([
    ItemList['Magna Garurumon'],
    ItemList['Metal Garurumon'],
], 'Beowolfmon');
const Blitzmon = new Shop([
    ItemList['Bolgmon'],
    ItemList['Rhino Kabuterimon'],
], 'Blitzmon');
const Blizzarmon = new Shop([
    ItemList['Ancient Megatheriumon'],
], 'Blizzarmon');
const Bolgmon = new Shop([
    ItemList['Ancient Beatmon'],
], 'Bolgmon');
const Calamaramon = new Shop([
    ItemList['Ancient Mermaimon'],
], 'Calamaramon');
const Chackmon = new Shop([
    ItemList['Blizzarmon'],
    ItemList['Daipenmon'],
], 'Chackmon');
const Daipenmon = new Shop([
    ItemList['Fros Velgrmon'],
], 'Daipenmon');
const Duskmon = new Shop([
    ItemList['Velgrmon'],
], 'Duskmon');
const Fairimon = new Shop([
    ItemList['Jet Silphymon'],
    ItemList['Shutumon'],
], 'Fairimon');
const Flamon = new Shop([
    ItemList['Agnimon'],
    ItemList['Flare Lizarmon'],
], 'Flamon');
const Garummon = new Shop([
    ItemList['Magna Garurumon'],
], 'Garummon');
const Gigasmon = new Shop([
    ItemList['Ancient Volcamon'],
], 'Gigasmon');
const Grottomon = new Shop([
    ItemList['Gigasmon'],
], 'Grottomon');
const JetSilphymon = new Shop([
    ItemList['Junomon'],
], 'Jet Silphymon');
const KaiserGreymon = new Shop([
    ItemList['Susanoomon'],
], 'Kaiser Greymon');
const KaiserLeomon = new Shop([
    ItemList['Ancient Sphinxmon'],
], 'Kaiser Leomon');
const Löwemon = new Shop([
    ItemList['Kaiser Leomon'],
    ItemList['Raihimon'],
], 'Löwemon');
const MagnaGarurumon = new Shop([
    ItemList['Susanoomon'],
], 'Magna Garurumon');
const Mercuremon = new Shop([
    ItemList['Black Seraphimon'],
    ItemList['Sephirothmon'],
], 'Mercuremon');
const Petaldramon = new Shop([
    ItemList['Ancient Troiamon'],
], 'Petaldramon');
const Raihimon = new Shop([
    ItemList['Ancient Sphinxmon'],
], 'Raihimon');
const Ranamon = new Shop([
    ItemList['Ancient Mermaimon'],
], 'Ranamon');
const RhinoKabuterimon = new Shop([
    ItemList['Ancient Beatmon'],
], 'Rhino Kabuterimon');
const Sephirothmon = new Shop([
    ItemList['Chimairamon'],
    ItemList['Deathmon'],
], 'Sephirothmon');
const Shutumon = new Shop([
    ItemList['Ancient Irismon'],
], 'Shutumon');
const Strabimon = new Shop([
    ItemList['Wendimon'],
    ItemList['Wolfmon'],
], 'Strabimon');
const Velgrmon = new Shop([
    ItemList['Gulfmon'],
], 'Velgrmon');
const Vritramon = new Shop([
    ItemList['Ancient Greymon'],
    ItemList['Kaiser Greymon'],
], 'Vritramon');
const Wolfmon = new Shop([
    ItemList['Beowolfmon'],
    ItemList['Garummon'],
], 'Wolfmon');
const Būmon = new Shop([
    ItemList['Boarmon'],
    ItemList['Burpmon'],
], 'Būmon');
const Dodomon = new Shop([
    ItemList['Dorimon'],
    ItemList['Wanyamon'],
], 'Dodomon');
const Fufumon = new Shop([
    ItemList['Kyokyomon'],
], 'Fufumon');
const Pupumon = new Shop([
    ItemList['Puroromon'],
], 'Pupumon');
const Dorimon = new Shop([
    ItemList['Bearmon'],
    ItemList['DORUmon'],
    ItemList['Gazimon'],
], 'Dorimon');
const Kyokyomon = new Shop([
    ItemList['Ryudamon'],
], 'Kyokyomon');
const Puroromon = new Shop([
    ItemList['Funbeemon'],
], 'Puroromon');
const AgumonXAntibody = new Shop([
    ItemList['Greymon X-Antibody'],
    ItemList['Igamon'],
    ItemList['Tyranomon X-Antibody'],
], 'Agumon X-Antibody');
const BetamonXAntibody = new Shop([
    ItemList['Airdramon'],
    ItemList['Raremon'],
    ItemList['Seadramon X-Antibody'],
], 'Betamon X-Antibody');
const DORUmon = new Shop([
    ItemList['Death-X-DORUgamon'],
    ItemList['DORUgamon'],
    ItemList['Raptordramon'],
], 'DORUmon');
const Funbeemon = new Shop([
    ItemList['Omekamon'],
    ItemList['Stingmon'],
    ItemList['Waspmon'],
], 'Funbeemon');
const GabumonXAntibody = new Shop([
    ItemList['Garurumon X-Antibody'],
    ItemList['Kyubimon Silver'],
    ItemList['Turuiemon'],
], 'Gabumon X-Antibody');
const GanimonXAntibody = new Shop([
    ItemList['Coelamon'],
    ItemList['Gesomon X-Antibody'],
    ItemList['Shellmon'],
], 'Ganimon X-Antibody');
const GazimonXAntibody = new Shop([
    ItemList['Garurumon X-Antibody'],
    ItemList['Lynxmon'],
], 'Gazimon X-Antibody');
const GomamonXAntibody = new Shop([
    ItemList['Gesomon X-Antibody'],
    ItemList['Ikkakumon'],
    ItemList['Octmon'],
], 'Gomamon X-Antibody');
const GottsumonXAntibody = new Shop([
    ItemList['Ankylomon'],
    ItemList['Icemon'],
    ItemList['Knight Chessmon Black'],
], 'Gottsumon X-Antibody');
const GuilmonXAntibody = new Shop([
    ItemList['Black Growmon'],
    ItemList['Growmon X-Antibody'],
    ItemList['Monochromon X-Antibody'],
], 'Guilmon X-Antibody');
const KokuwamonXAntibody = new Shop([
    ItemList['Clockmon'],
    ItemList['Guardromon'],
    ItemList['Kuwagamon X-Antibody'],
    ItemList['Mechanorimon'],
], 'Kokuwamon X-Antibody');
const OtamamonXAntibody = new Shop([
    ItemList['Blimpmon'],
    ItemList['Gekomon'],
    ItemList['Seadramon X-Antibody'],
], 'Otamamon X-Antibody');
const PalmonXAntibody = new Shop([
    ItemList['Dokugumon'],
    ItemList['Sunflowmon'],
    ItemList['Togemon X-Antibody'],
], 'Palmon X-Antibody');
const PlotmonXAntibody = new Shop([
    ItemList['Pidmon'],
    ItemList['Reppamon'],
    ItemList['Tailmon X-Antibody'],
    ItemList['Tobucatmon'],
], 'Plotmon X-Antibody');
const Ryudamon = new Shop([
    ItemList['Ginryumon'],
    ItemList['Greymon'],
    ItemList['Raptordramon'],
], 'Ryudamon');
const ShakomonXAntibody = new Shop([
    ItemList['Coelamon'],
    ItemList['Ebidramon'],
    ItemList['Seadramon X-Antibody'],
    ItemList['Shellmon'],
], 'Shakomon X-Antibody');
const AllomonXAntibody = new Shop([
    ItemList['Hisyaryumon'],
    ItemList['Mametyramon'],
    ItemList['Skull Baluchimon'],
], 'Allomon X-Antibody');
const DeathXDORUgamon = new Shop([
    ItemList['Death-X-DORUguremon'],
    ItemList['Hisyaryumon'],
    ItemList['Metal Greymon Virus'],
], 'Death-X-DORUgamon');
const DobermonXAntibody = new Shop([
    ItemList['Cerberumon X-Antibody'],
    ItemList['Were Garurumon X-Antibody'],
], 'Dobermon X-Antibody');
const DORUgamon = new Shop([
    ItemList['DORUguremon'],
    ItemList['Death-X-DORUguremon'],
    ItemList['Tyilinmon'],
], 'DORUgamon');
const GarurumonXAntibody = new Shop([
    ItemList['Cerberumon X-Antibody'],
    ItemList['Panjyamon X-Antibody'],
    ItemList['Were Garurumon X-Antibody'],
], 'Garurumon X-Antibody');
const GesomonXAntibody = new Shop([
    ItemList['Dagomon'],
    ItemList['Marin Devimon'],
    ItemList['Mega Seadramon X-Antibody'],
], 'Gesomon X-Antibody');
const Ginryumon = new Shop([
    ItemList['Grademon'],
    ItemList['Hisyaryumon'],
    ItemList['Mametyramon'],
], 'Ginryumon');
const GreymonXAntibody = new Shop([
    ItemList['DORUguremon'],
    ItemList['Metal Greymon X-Antibody'],
    ItemList['Skull Greymon'],
], 'Greymon X-Antibody');
const GrowmonXAntibody = new Shop([
    ItemList['Groundramon'],
    ItemList['Megalo Growmon X-Antibody'],
    ItemList['Orochimon'],
], 'Growmon X-Antibody');
const KuwagamonXAntibody = new Shop([
    ItemList['Ookuwamon X-Antibody'],
    ItemList['Scorpiomon'],
], 'Kuwagamon X-Antibody');
const LeomonXAntibody = new Shop([
    ItemList['Grappu Leomon'],
    ItemList['Panjyamon X-Antibody'],
], 'Leomon X-Antibody');
const MantaraymonXAntibody = new Shop([
    ItemList['Anomalocarimon X-Antibody'],
    ItemList['Hangyomon'],
], 'Mantaraymon X-Antibody');
const MonochromonXAntibody = new Shop([
    ItemList['Hisyaryumon'],
    ItemList['Metal Tyranomon X-Antibody'],
    ItemList['Triceramon X-Antibody'],
], 'Monochromon X-Antibody');
const NefertimonXAntibody = new Shop([
    ItemList['Angewomon'],
    ItemList['Hippogriffomon'],
    ItemList['Shakkoumon'],
    ItemList['Taomon'],
], 'Nefertimon X-Antibody');
const Omekamon = new Shop([
    ItemList['Knightmon'],
    ItemList['Superstarmon'],
], 'Omekamon');
const PteranomonXAntibody = new Shop([
    ItemList['Andromon'],
    ItemList['Metal Greymon 2010'],
], 'Pteranomon X-Antibody');
const Raptordramon = new Shop([
    ItemList['Grademon'],
    ItemList['Hisyaryumon'],
    ItemList['Megalo Growmon Data'],
], 'Raptordramon');
const RhinomonXAntibody = new Shop([
    ItemList['Grademon'],
    ItemList['Knightmon'],
], 'Rhinomon X-Antibody');
const SeadramonXAntibody = new Shop([
    ItemList['Anomalocarimon X-Antibody'],
    ItemList['Mega Seadramon X-Antibody'],
], 'Seadramon X-Antibody');
const StarmonXAntibody = new Shop([
    ItemList['Mamemon X-Antibody'],
    ItemList['Superstarmon'],
], 'Starmon X-Antibody');
const TailmonXAntibody = new Shop([
    ItemList['Angewomon X-Antibody'],
    ItemList['Betsumon'],
    ItemList['Silphymon'],
], 'Tailmon X-Antibody');
const Tobucatmon = new Shop([
    ItemList['Skull Baluchimon'],
    ItemList['Were Garurumon X-Antibody'],
], 'Tobucatmon');
const TogemonXAntibody = new Shop([
    ItemList['Blossomon'],
    ItemList['Lilimon X-Antibody'],
    ItemList['Pumpmon'],
], 'Togemon X-Antibody');
const TylomonXAntibody = new Shop([
    ItemList['Marin Devimon'],
    ItemList['Mega Seadramon'],
], 'Tylomon X-Antibody');
const Waspmon = new Shop([
    ItemList['Atlur Kabuterimon Red'],
    ItemList['Cannonbeemon'],
], 'Waspmon');
const AnomalocarimonXAntibody = new Shop([
    ItemList['Leviamon'],
    ItemList['Plesiomon X-Antibody'],
], 'Anomalocarimon X-Antibody');
const Cannonbeemon = new Shop([
    ItemList['Ebemon X-Antibody'],
    ItemList['Tiger Vespamon'],
], 'Cannonbeemon');
const CerberumonXAntibody = new Shop([
    ItemList['Anubimon'],
    ItemList['Sakuyamon X-Antibody'],
], 'Cerberumon X-Antibody');
const DeathXDORUguremon = new Shop([
    ItemList['Death-X-DORUgoramon'],
    ItemList['Gaioumon'],
], 'Death-X-DORUguremon');
const DORUguremon = new Shop([
    ItemList['Alphamon'],
    ItemList['DORUgoramon'],
    ItemList['Gaioumon'],
], 'DORUguremon');
const GarudamonXAntibody = new Shop([
    ItemList['Hououmon X-Antibody'],
    ItemList['Ornismon'],
    ItemList['Valkyrimon'],
], 'Garudamon X-Antibody');
const Grademon = new Shop([
    ItemList['Alphamon'],
    ItemList['Victory Greymon'],
], 'Grademon');
const Hisyaryumon = new Shop([
    ItemList['Gaioumon'],
    ItemList['Goddramon'],
    ItemList['Ouryumon'],
], 'Hisyaryumon');
const LilimonXAntibody = new Shop([
    ItemList['Bancho Lilimon'],
    ItemList['Beel Starmon X-Antibody'],
    ItemList['Rosemon X-Antibody'],
], 'Lilimon X-Antibody');
const Mametyramon = new Shop([
    ItemList['Dinorexmon'],
    ItemList['Megidramon'],
    ItemList['Ouryumon'],
], 'Mametyramon');
const MammonXAntibody = new Shop([
    ItemList['Metal Garurumon Black'],
    ItemList['Skull Mammon X-Antibody'],
], 'Mammon X-Antibody');
const MegaSeadramonXAntibody = new Shop([
    ItemList['Giga Seadramon'],
    ItemList['Metal Piranimon'],
    ItemList['Metal Seadramon'],
], 'Mega Seadramon X-Antibody');
const MegaloGrowmonXAntibody = new Shop([
    ItemList['Dukemon X-Antibody'],
    ItemList['Megidramon X-Antibody'],
], 'Megalo Growmon X-Antibody');
const MetalFantomon = new Shop([
    ItemList['Demon'],
    ItemList['Gokumon'],
], 'Metal Fantomon');
const MetalGreymonXAntibody = new Shop([
    ItemList['Ancient Greymon'],
    ItemList['Gaioumon'],
    ItemList['War Greymon X-Antibody'],
], 'Metal Greymon X-Antibody');
const MetalTyranomonXAntibody = new Shop([
    ItemList['Cannondramon'],
    ItemList['Mugendramon'],
    ItemList['Rust Tyranomon'],
], 'Metal Tyranomon X-Antibody');
const OokuwamonXAntibody = new Shop([
    ItemList['Grandis Kuwagamon'],
    ItemList['Herakle Kabuterimon X-Antibody'],
], 'Ookuwamon X-Antibody');
const PanjyamonXAntibody = new Shop([
    ItemList['Saber Leomon'],
    ItemList['Were Garurumon Sagittarius Mode'],
], 'Panjyamon X-Antibody');
const SkullBaluchimon = new Shop([
    ItemList['Dinotigermon'],
    ItemList['Ultimate Brachimon'],
], 'Skull Baluchimon');
const TriceramonXAntibody = new Shop([
    ItemList['Dinorexmon'],
    ItemList['Ultimate Brachimon'],
], 'Triceramon X-Antibody');
const VademonXAntibody = new Shop([
    ItemList['Ebemon X-Antibody'],
], 'Vademon X-Antibody');
const WereGarurumonXAntibody = new Shop([
    ItemList['Baihumon'],
    ItemList['Metal Garurumon X-Antibody'],
], 'Were Garurumon X-Antibody');
const Alphamon = new Shop([
    ItemList['Alphamon Ouryuken'],
], 'Alphamon');
const AlphamonOuryuken = new Shop([
    ItemList['Dodomon'],
], 'Alphamon Ouryuken');
const ArkadimonSuperUltimate = new Shop([
    ItemList['Arkadimon Baby'],
], 'Arkadimon Super Ultimate');
const Barbamon = new Shop([
    ItemList['Barbamon X-Antibody'],
], 'Barbamon');
const DeathXDORUgoramon = new Shop([
    ItemList['Death-X-mon'],
], 'Death-X-DORUgoramon');
const DeathXmon = new Shop([
    ItemList['Dodomon'],
], 'Death-X-mon');
const DemonSuperUltimate = new Shop([
    ItemList['Bubbmon'],
], 'Demon Super Ultimate');
const Dinorexmon = new Shop([
    ItemList['Ketomon'],
], 'Dinorexmon');
const Dinotigermon = new Shop([
    ItemList['Punimon'],
], 'Dinotigermon');
const DORUgoramon = new Shop([
    ItemList['Dodomon'],
], 'DORUgoramon');
const DukemonXAntibody = new Shop([
    ItemList['Jyarimon'],
], 'Dukemon X-Antibody');
const DynasmonXAntibody = new Shop([
    ItemList['Keemon'],
], 'Dynasmon X-Antibody');
const EbemonXAntibody = new Shop([
    ItemList['Yuramon'],
], 'Ebemon X-Antibody');
const Gaioumon = new Shop([
    ItemList['Gaioumon Invincible Sword'],
], 'Gaioumon');
const GigaSeadramon = new Shop([
    ItemList['Pitchmon'],
], 'Giga Seadramon');
const GoddramonXAntibody = new Shop([
    ItemList['Poyomon'],
], 'Goddramon X-Antibody');
const GrandisKuwagamon = new Shop([
    ItemList['Leafmon'],
], 'Grandis Kuwagamon');
const HolydramonXAntibody = new Shop([
    ItemList['Yukimi Botamon'],
], 'Holydramon X-Antibody');
const Leviamon = new Shop([
    ItemList['Leviamon X-Antibody'],
], 'Leviamon');
const LucemonLarva = new Shop([
    ItemList['Poyomon'],
], 'Lucemon Larva');
const MagnamonXAntibody = new Shop([
    ItemList['Chicomon'],
], 'Magnamon X-Antibody');
const MedievalDukemon = new Shop([
    ItemList['Dukemon X-Antibody'],
], 'Medieval Dukemon');
const MegidramonXAntibody = new Shop([
    ItemList['Jyarimon'],
], 'Megidramon X-Antibody');
const MetalGarurumonXAntibody = new Shop([
    ItemList['Omegamon X-Antibody'],
], 'Metal Garurumon X-Antibody');
const MetalPiranimon = new Shop([
    ItemList['Pitchmon'],
], 'Metal Piranimon');
const OmegamonXAntibody = new Shop([
    ItemList['Botamon'],
    ItemList['Punimon'],
], 'Omegamon X-Antibody');
const Ouryumon = new Shop([
    ItemList['Fufumon'],
], 'Ouryumon');
const PlesiomonXAntibody = new Shop([
    ItemList['Pitchmon'],
], 'Plesiomon X-Antibody');
const RosemonXAntibody = new Shop([
    ItemList['Nyokimon'],
], 'Rosemon X-Antibody');
const SkullMammonXAntibody = new Shop([
    ItemList['Botamon'],
], 'Skull Mammon X-Antibody');
const TigerVespamon = new Shop([
    ItemList['Pupumon'],
], 'Tiger Vespamon');
const UlforceVdramonXAntibody = new Shop([
    ItemList['Chicomon'],
], 'Ulforce V-dramon X-Antibody');
const UlforceVdramonFutureMode = new Shop([
    ItemList['Chicomon'],
], 'Ulforce V-dramon Future Mode');
const UltimateBrachimon = new Shop([
    ItemList['Tsubumon'],
], 'Ultimate Brachimon');
const WarGreymonXAntibody = new Shop([
    ItemList['Omegamon X-Antibody'],
], 'War Greymon X-Antibody');
const BlackGuilmon = new Shop([
    ItemList['Black Growmon'],
], 'Black Guilmon');
const HagurumonXAntibody = new Shop([
    ItemList['Mechanorimon'],
    ItemList['Thunderballmon X-Antibody'],
], 'Hagurumon X-Antibody');
const Phascomon = new Shop([
    ItemList['Porcupamon'],
    ItemList['Troopmon'],
], 'Phascomon');
const Porcupamon = new Shop([
    ItemList['Astamon'],
    ItemList['Monzaemon'],
], 'Porcupamon');
const ThunderballmonXAntibody = new Shop([
    ItemList['Big Mamemon'],
    ItemList['Metal Mamemon X-Antibody'],
], 'Thunderballmon X-Antibody');
const Astamon = new Shop([
    ItemList['Beelzebumon'],
    ItemList['Belphemon Sleep Mode'],
], 'Astamon');
const MamemonXAntibody = new Shop([
    ItemList['Ebemon X-Antibody'],
    ItemList['Prince Mamemon X-Antibody'],
], 'Mamemon X-Antibody');
const MetalMamemonXAntibody = new Shop([
    ItemList['Lampmon'],
    ItemList['Prince Mamemon X-Antibody'],
], 'Metal Mamemon X-Antibody');
const BelphemonRageMode = new Shop([
    ItemList['Belphemon X-Antibody'],
    ItemList['Belphemon Sleep Mode'],
], 'Belphemon Rage Mode');
const BelphemonSleepMode = new Shop([
    ItemList['Belphemon Rage Mode'],
], 'Belphemon Sleep Mode');
const ChaosdramonXAntibody = new Shop([
    ItemList['Botamon'],
], 'Chaosdramon X-Antibody');
const PrinceMamemonXAntibody = new Shop([
    ItemList['Choromon'],
], 'Prince Mamemon X-Antibody');
const Bommon = new Shop([
    ItemList['Missimon'],
], 'Bommon');
const Pafumon = new Shop([
    ItemList['Kyaromon'],
], 'Pafumon');
const Popomon = new Shop([
    ItemList['Frimon'],
    ItemList['Tanemon'],
], 'Popomon');
const Puwamon = new Shop([
    ItemList['Chapmon'],
    ItemList['Pinamon'],
], 'Puwamon');
const Frimon = new Shop([
    ItemList['Bearmon'],
    ItemList['Liollmon'],
], 'Frimon');
const Kyaromon = new Shop([
    ItemList['Elecmon'],
    ItemList['Falcomon 2006'],
    ItemList['Kudamon'],
], 'Kyaromon');
const Missimon = new Shop([
    ItemList['Commandramon'],
    ItemList['Hagurumon'],
], 'Missimon');
const Pinamon = new Shop([
    ItemList['Falcomon'],
    ItemList['Falcomon 2006'],
], 'Pinamon');
const TokomonXAntibody = new Shop([
    ItemList['Renamon X-Antibody'],
    ItemList['Sistermon Blanc'],
], 'Tokomon X-Antibody');
const Agumon2006 = new Shop([
    ItemList['Geo Greymon'],
    ItemList['Greymon'],
    ItemList['Tyranomon'],
], 'Agumon 2006 ');
const Commandramon = new Shop([
    ItemList['Monochromon'],
    ItemList['Sealsdramon'],
], 'Commandramon');
const Dracumon = new Shop([
    ItemList['Sangloupmon'],
    ItemList['Yaksamon'],
], 'Dracumon');
const Falcomon = new Shop([
    ItemList['Aquilamon'],
    ItemList['Diatrymon'],
], 'Falcomon');
const Kokabuterimon = new Shop([
    ItemList['Blade Kuwagamon'],
    ItemList['Kabuterimon'],
    ItemList['Kuwagamon'],
], 'Kokabuterimon');
const Kudamon = new Shop([
    ItemList['Reppamon'],
    ItemList['Tailmon'],
], 'Kudamon');
const Liollmon = new Shop([
    ItemList['Leomon'],
    ItemList['Liamon'],
], 'Liollmon');
const Swimmon = new Shop([
    ItemList['Tobiumon'],
    ItemList['Tylomon'],
], 'Swimmon');
const BladeKuwagamon = new Shop([
    ItemList['Metallife Kuwagamon'],
    ItemList['Tankmon'],
    ItemList['Tekkamon'],
], 'Blade Kuwagamon');
const Diatrymon = new Shop([
    ItemList['Delumon'],
    ItemList['Sinduramon'],
    ItemList['Yatagaramon'],
], 'Diatrymon');
const Liamon = new Shop([
    ItemList['Firamon'],
    ItemList['Grappu Leomon'],
    ItemList['Loader Leomon'],
], 'Liamon');
const Reppamon = new Shop([
    ItemList['Piccolomon'],
    ItemList['Rapidmon Perfect'],
    ItemList['Tyilinmon'],
], 'Reppamon');
const Sangloupmon = new Shop([
    ItemList['Astamon'],
    ItemList['Matadrmon'],
    ItemList['Were Garurumon Black'],
], 'Sangloupmon');
const Sealsdramon = new Shop([
    ItemList['Andromon'],
    ItemList['Tankdramon'],
], 'Sealsdramon');
const LoaderLeomon = new Shop([
    ItemList['Baihumon'],
    ItemList['Bancho Leomon'],
    ItemList['Heavy Leomon'],
], 'Loader Leomon');
const Matadrmon = new Shop([
    ItemList['Grand Dracumon'],
    ItemList['Piemon'],
], 'Matadrmon');
const MetallifeKuwagamon = new Shop([
    ItemList['Herakle Kabuterimon'],
    ItemList['Tyrant Kabuterimon'],
], 'Metallife Kuwagamon');
const Tankdramon = new Shop([
    ItemList['Darkdramon'],
    ItemList['Gundramon'],
    ItemList['Mugendramon'],
], 'Tankdramon');
const Tyilinmon = new Shop([
    ItemList['Junomon'],
    ItemList['Mitamamon'],
    ItemList['Sleipmon'],
], 'Tyilinmon');
const Volcdramon = new Shop([
    ItemList['Bryweludramon'],
    ItemList['Megidramon'],
    ItemList['Spinomon'],
], 'Volcdramon');
const Yatagaramon = new Shop([
    ItemList['Minervamon'],
    ItemList['Valdurmon'],
], 'Yatagaramon');
const BanchoLeomon = new Shop([
    ItemList['Chaosmon'],
], 'Bancho Leomon');
const BeelzebumonXAntibody = new Shop([
    ItemList['Keemon'],
], 'Beelzebumon X-Antibody');
const BlackWarGreymonXAntibody = new Shop([
    ItemList['Botamon'],
], 'Black War Greymon X-Antibody');
const Chaosmon = new Shop([
    ItemList['Ultimate Chaosmon'],
], 'Chaosmon');
const ClavisAngemon = new Shop([
    ItemList['Poyomon'],
], 'Clavis Angemon');
const Craniummon = new Shop([
    ItemList['Craniummon X-Antibody'],
], 'Craniummon');
const Darkdramon = new Shop([
    ItemList['Chaosmon'],
], 'Darkdramon');
const GrandDracumon = new Shop([
    ItemList['Kuramon'],
], 'Grand Dracumon');
const HerakleKabuterimonXAntibody = new Shop([
    ItemList['Bubbmon'],
], 'Herakle Kabuterimon X-Antibody');
const Mercurymon = new Shop([
    ItemList['Punimon'],
], 'Mercurymon');
const Minervamon = new Shop([
    ItemList['Minervamon X-Antibody'],
], 'Minervamon');
const Neptunemon = new Shop([
    ItemList['Pitchmon'],
], 'Neptunemon');
const Sleipmon = new Shop([
    ItemList['Sleipmon X-Antibody'],
], 'Sleipmon');
const Spinomon = new Shop([
    ItemList['Fufumon'],
], 'Spinomon');
const TyrantKabuterimon = new Shop([
    ItemList['Choromon'],
], 'Tyrant Kabuterimon');
const UltimateChaosmon = new Shop([
    ItemList['Pafumon'],
], 'Ultimate Chaosmon');
const Valdurmon = new Shop([
    ItemList['Chaosmon Valdur Arm'],
], 'Valdurmon');
const Budmon = new Shop([
    ItemList['Lalamon'],
    ItemList['Piyomon'],
    ItemList['Woodmon'],
], 'Budmon');
const Chapmon = new Shop([
    ItemList['Betamon'],
    ItemList['Falcomon'],
    ItemList['Kamemon'],
], 'Chapmon');
const Wanyamon = new Shop([
    ItemList['Bearmon'],
    ItemList['Gaomon'],
    ItemList['Morphomon'],
], 'Wanyamon');
const AgumonBlack2006 = new Shop([
    ItemList['Black Growmon'],
    ItemList['Geo Greymon'],
], 'Agumon Black 2006');
const AgumonHakase = new Shop([
    ItemList['Geo Greymon'],
    ItemList['Starmon'],
], 'Agumon Hakase');
const BushiAgumon = new Shop([
    ItemList['Dinohumon'],
    ItemList['Musyamon'],
], 'Bushi Agumon');
const Falcomon2006 = new Shop([
    ItemList['Birdramon'],
    ItemList['Peckmon'],
    ItemList['Saberdramon'],
], 'Falcomon 2006 ');
const Gaomon = new Shop([
    ItemList['Black Gaogamon'],
    ItemList['Gaogamon'],
    ItemList['Garurumon'],
], 'Gaomon');
const Kamemon = new Shop([
    ItemList['Gawappamon'],
    ItemList['Tortamon'],
], 'Kamemon');
const Kudamon2006 = new Shop([
    ItemList['Angemon'],
    ItemList['Pidmon'],
    ItemList['Reppamon'],
], 'Kudamon 2006 ');
const Lalamon = new Shop([
    ItemList['Sunflowmon'],
    ItemList['Togemon'],
    ItemList['Woodmon'],
], 'Lalamon');
const Minidekachimon = new Shop([
    ItemList['Atamadekachimon'],
    ItemList['Greymon'],
], 'Minidekachimon');
const NiseAgumonHakase = new Shop([
    ItemList['Greymon Blue'],
], 'Nise Agumon Hakase');
const PawnChessmonBlack = new Shop([
    ItemList['Guardromon'],
    ItemList['Knight Chessmon Black'],
], 'Pawn Chessmon Black');
const PawnChessmonWhite = new Shop([
    ItemList['Ankylomon'],
    ItemList['Knight Chessmon White'],
], 'Pawn Chessmon White');
const ProtoGizmon = new Shop([
    ItemList['Gizmon AT'],
], 'Proto Gizmon');
const SantaAgumon = new Shop([
    ItemList['Greymon'],
], 'Santa Agumon');
const YukiAgumon2006 = new Shop([
    ItemList['Hyougamon'],
    ItemList['Mojyamon'],
    ItemList['Yukidarumon'],
], 'Yuki Agumon 2006 ');
const Atamadekachimon = new Shop([
    ItemList['Skull Greymon'],
    ItemList['Vritramon'],
], 'Atamadekachimon');
const BlackGaogamon = new Shop([
    ItemList['Black Mach Gaogamon'],
    ItemList['Were Garurumon Black'],
], 'Black Gaogamon');
const Gaogamon = new Shop([
    ItemList['Mach Gaogamon'],
    ItemList['Panjyamon'],
    ItemList['Were Garurumon'],
], 'Gaogamon');
const Gawappamon = new Shop([
    ItemList['Shawujinmon'],
    ItemList['Tonosama Gekomon'],
], 'Gawappamon');
const GeoGreymon = new Shop([
    ItemList['Gigadramon'],
    ItemList['Rize Greymon'],
    ItemList['Skull Greymon'],
], 'Geo Greymon');
const GizmonAT = new Shop([
    ItemList['Gizmon XT'],
], 'Gizmon AT');
const GoldNumemon = new Shop([
    ItemList['Black King Numemon'],
    ItemList['Platinum Numemon'],
], 'Gold Numemon');
const KnightChessmonBlack = new Shop([
    ItemList['Rook Chessmon Black'],
], 'Knight Chessmon Black');
const KnightChessmonWhite = new Shop([
    ItemList['Bishop Chessmon White'],
], 'Knight Chessmon White');
const Peckmon = new Shop([
    ItemList['Karatenmon'],
    ItemList['Yatagaramon'],
    ItemList['Yatagaramon 2006'],
], 'Peckmon');
const Sunflowmon = new Shop([
    ItemList['Blossomon'],
    ItemList['Jyureimon'],
    ItemList['Lilamon'],
], 'Sunflowmon');
const YoxtuYoxtumon = new Shop([
    ItemList['Monzaemon'],
], 'Yoxtu!Yoxtu!mon');
const AlgomonPerfect = new Shop([
    ItemList['Algomon Ultimate'],
    ItemList['Babamon'],
    ItemList['Piemon'],
], 'Algomon Perfect');
const BishopChessmonWhite = new Shop([
    ItemList['King Chessmon'],
], 'Bishop Chessmon White');
const GizmonXT = new Shop([
    ItemList['Diablomon'],
    ItemList['Parallelmon'],
], 'Gizmon XT');
const Lilamon = new Shop([
    ItemList['Babamon'],
    ItemList['Lotusmon'],
    ItemList['Mervamon'],
], 'Lilamon');
const MachGaogamon = new Shop([
    ItemList['Bancho Leomon'],
    ItemList['Mirage Gaogamon'],
    ItemList['Saint Galgomon'],
], 'Mach Gaogamon');
const RizeGreymon = new Shop([
    ItemList['Gaioumon'],
    ItemList['Rize Greymon X-Antibody'],
    ItemList['Shine Greymon'],
    ItemList['Victory Greymon'],
], 'Rize Greymon');
const RookChessmonBlack = new Shop([
    ItemList['Queen Chessmon'],
], 'Rook Chessmon Black');
const Shawujinmon = new Shop([
    ItemList['El Doradimon'],
    ItemList['Jumbo Gamemon'],
], 'Shawujinmon');
const Yatagaramon2006 = new Shop([
    ItemList['Kuzuhamon'],
    ItemList['Ravmon'],
    ItemList['Valdurmon'],
], 'Yatagaramon 2006 ');
const AlgomonUltimate = new Shop([
    ItemList['Algomon Baby I'],
], 'Algomon Ultimate');
const BioDarkdramon = new Shop([
    ItemList['Bommon'],
], 'Bio Darkdramon');
const BioLotusmon = new Shop([
    ItemList['Popomon'],
], 'Bio Lotusmon');
const BioSpinomon = new Shop([
    ItemList['Botamon'],
], 'Bio Spinomon');
const ChronomonDestroyMode = new Shop([
    ItemList['Chicchimon'],
], 'Chronomon Destroy Mode');
const ChronomonHolyMode = new Shop([
    ItemList['Chicchimon'],
], 'Chronomon Holy Mode');
const ElDoradimon = new Shop([
    ItemList['Yuramon'],
], 'El Doradimon');
const JumboGamemon = new Shop([
    ItemList['Pitchmon'],
], 'Jumbo Gamemon');
const KingChessmon = new Shop([
    ItemList['Puttimon'],
], 'King Chessmon');
const MirageGaogamon = new Shop([
    ItemList['Mirage Gaogamon Burst Mode'],
], 'Mirage Gaogamon');
const MirageGaogamonBurstMode = new Shop([
    ItemList['Botamon'],
], 'Mirage Gaogamon Burst Mode');
const PlatinumNumemon = new Shop([
    ItemList['Zurumon'],
], 'Platinum Numemon');
const QueenChessmon = new Shop([
    ItemList['Mokumon'],
], 'Queen Chessmon');
const Ravmon = new Shop([
    ItemList['Ravmon Burst Mode'],
], 'Ravmon');
const RavmonBurstMode = new Shop([
    ItemList['Puwamon'],
], 'Ravmon Burst Mode');
const ShineGreymon = new Shop([
    ItemList['Shine Greymon Burst Mode'],
    ItemList['Shine Greymon Ruin Mode'],
], 'Shine Greymon');
const ShineGreymonBurstMode = new Shop([
    ItemList['Botamon'],
], 'Shine Greymon Burst Mode');
const ShineGreymonRuinMode = new Shop([
    ItemList['Botamon'],
], 'Shine Greymon Ruin Mode');
const TonosamaMamemon = new Shop([
    ItemList['Choromon'],
], 'Tonosama Mamemon');
const BioCoatlmon = new Shop([
    ItemList['Leafmon'],
], 'Bio Coatlmon');
const BioStegomon = new Shop([
    ItemList['Bubbmon'],
], 'Bio Stegomon');
const BioThunderbirmon = new Shop([
    ItemList['Puwamon'],
], 'Bio Thunderbirmon');
const Petitmon = new Shop([
    ItemList['Babydmon'],
], 'Petitmon');
const Babydmon = new Shop([
    ItemList['Betamon'],
    ItemList['Dracomon'],
], 'Babydmon');
const Chicchimon = new Shop([
    ItemList['Falcomon'],
    ItemList['Hyokomon'],
    ItemList['Muchomon'],
], 'Chicchimon');
const Moonmon = new Shop([
    ItemList['Lopmon'],
    ItemList['Lunamon'],
], 'Moonmon');
const Sunmon = new Shop([
    ItemList['Coronamon'],
    ItemList['Guilmon'],
], 'Sunmon');
const Coronamon = new Shop([
    ItemList['Firamon'],
    ItemList['Leomon'],
    ItemList['Lynxmon'],
    ItemList['Meramon'],
], 'Coronamon');
const Dracomon = new Shop([
    ItemList['Coredramon Blue'],
    ItemList['Coredramon Green'],
    ItemList['Ginryumon'],
], 'Dracomon');
const Lunamon = new Shop([
    ItemList['Lekismon'],
    ItemList['Sistermon Ciel'],
    ItemList['Tailmon'],
], 'Lunamon');
const CoredramonBlue = new Shop([
    ItemList['Blue Meramon'],
    ItemList['Cyberdramon 2010'],
    ItemList['Wingdramon'],
], 'Coredramon Blue');
const CoredramonGreen = new Shop([
    ItemList['Cyberdramon'],
    ItemList['Groundramon'],
    ItemList['Triceramon'],
], 'Coredramon Green');
const Firamon = new Shop([
    ItemList['Flaremon'],
    ItemList['Monzaemon'],
], 'Firamon');
const Grimmon = new Shop([
    ItemList['Chaos Grimmon'],
], 'Grimmon');
const Lekismon = new Shop([
    ItemList['Bastemon'],
    ItemList['Crescemon'],
], 'Lekismon');
const CatchMamemon = new Shop([
    ItemList['Justimon Accel Arm'],
    ItemList['Prince Mamemon'],
], 'Catch Mamemon');
const ChaosGrimmon = new Shop([
    ItemList['Exo Grimmon'],
], 'Chaos Grimmon');
const Crescemon = new Shop([
    ItemList['Dianamon'],
    ItemList['Surfymon'],
    ItemList['Valkyrimon'],
], 'Crescemon');
const DarkSuperstarmon = new Shop([
    ItemList['Darkdramon'],
    ItemList['Metal Garurumon Black'],
], 'Dark Superstarmon');
const Flaremon = new Shop([
    ItemList['Apollomon'],
    ItemList['Holydramon'],
    ItemList['Marsmon'],
], 'Flaremon');
const Groundramon = new Shop([
    ItemList['Breakdramon'],
    ItemList['Cannondramon'],
    ItemList['Mugendramon'],
], 'Groundramon');
const Wingdramon = new Shop([
    ItemList['Dynasmon'],
    ItemList['Slayerdramon'],
    ItemList['Ulforce V-dramon'],
], 'Wingdramon');
const Apollomon = new Shop([
    ItemList['Grace Novamon'],
], 'Apollomon');
const Breakdramon = new Shop([
    ItemList['Examon'],
], 'Breakdramon');
const Dianamon = new Shop([
    ItemList['Grace Novamon'],
], 'Dianamon');
const Duftmon = new Shop([
    ItemList['Duftmon Leopard Mode'],
    ItemList['Duftmon X-Antibody'],
], 'Duftmon');
const DuftmonXAntibody = new Shop([
    ItemList['Choromon'],
], 'Duftmon X-Antibody');
const DuftmonLeopardMode = new Shop([
    ItemList['Duftmon'],
], 'Duftmon Leopard Mode');
const Examon = new Shop([
    ItemList['Examon X-Antibody'],
], 'Examon');
const ExoGrimmon = new Shop([
    ItemList['Zurumon'],
], 'Exo Grimmon');
const Lotusmon = new Shop([
    ItemList['Budmon'],
], 'Lotusmon');
const Ogudomon = new Shop([
    ItemList['Ogudomon X-Antibody'],
], 'Ogudomon');
const RosemonBurstMode = new Shop([
    ItemList['Rosemon'],
], 'Rosemon Burst Mode');
const Slayerdramon = new Shop([
    ItemList['Examon'],
], 'Slayerdramon');
const Surfymon = new Shop([
    ItemList['Pitchmon'],
], 'Surfymon');
const VictoryGreymon = new Shop([
    ItemList['Botamon'],
], 'Victory Greymon');
const ZdGarurumon = new Shop([
    ItemList['Punimon'],
], 'Zd Garurumon');
const Burpmon = new Shop([
    ItemList['Poyomon'],
], 'Burpmon');
const Bombmon = new Shop([
    ItemList['Gaossmon'],
], 'Bombmon');
const Chibickmon = new Shop([
    ItemList['Pickmon'],
], 'Chibickmon');
const Monimon = new Shop([
    ItemList['Monitamon'],
], 'Monimon');
const Pickmon = new Shop([
    ItemList['Starmons'],
], 'Pickmon');
const Chikurimon = new Shop([
    ItemList['Nanimon'],
    ItemList['Troopmon'],
], 'Chikurimon');
const Cutemon = new Shop([
    ItemList['Bitmon'],
    ItemList['Pucchiemon'],
    ItemList['Unimon'],
], 'Cutemon');
const Dondokomon = new Shop([
    ItemList['Don Shoutmon'],
    ItemList['Dorulumon'],
], 'Dondokomon');
const Gaossmon = new Shop([
    ItemList['Greymon 2010'],
    ItemList['Coredramon Blue'],
], 'Gaossmon');
const Hyokomon = new Shop([
    ItemList['Buraimon'],
], 'Hyokomon');
const Monitamon = new Shop([
    ItemList['Hi-Vision Monitamon'],
    ItemList['Shonitamon'],
], 'Monitamon');
const Shoutmon = new Shop([
    ItemList['Omega Shoutmon'],
    ItemList['Shoutmon-Dorulu Cannon'],
    ItemList['Shoutmon-Jet Sparrow'],
    ItemList['Shoutmon King Ver'],
    ItemList['Shoutmon-Star Sword'],
    ItemList['Shoutmon X2'],
], 'Shoutmon');
const ShoutmonDoruluCannon = new Shop([
    ItemList['Shoutmon X3'],
], 'Shoutmon-Dorulu Cannon');
const ShoutmonJetSparrow = new Shop([
    ItemList['Shoutmon X3'],
], 'Shoutmon-Jet Sparrow');
const ShoutmonStarSword = new Shop([
    ItemList['Shoutmon X3'],
], 'Shoutmon-Star Sword');
const Spadamon = new Shop([
    ItemList['Rinkmon'],
    ItemList['Armamon'],
], 'Spadamon');
const Sparrowmon = new Shop([
    ItemList['Raptor Sparrowmon'],
], 'Sparrowmon');
const Starmons = new Shop([
    ItemList['Shooting Starmon'],
    ItemList['Starmon'],
], 'Starmons');
const Tyutyumon = new Shop([
    ItemList['Damemon'],
], 'Tyutyumon');
const Ballistamon = new Shop([
    ItemList['Atlur Ballistamon'],
    ItemList['Dark Volumon'],
], 'Ballistamon');
const Buraimon = new Shop([
    ItemList['Butenmon'],
    ItemList['Grademon'],
], 'Buraimon');
const Damemon = new Shop([
    ItemList['Tuwarmon'],
], 'Damemon');
const DeadlyAxemon = new Shop([
    ItemList['Dark Knightmon'],
    ItemList['Deadly Tuwarmon'],
], 'Deadly Axemon');
const Deckerdramon = new Shop([
    ItemList['Decker Greymon'],
], 'Deckerdramon');
const DonShoutmon = new Shop([
    ItemList['Omega Shoutmon'],
], 'Don Shoutmon');
const Dorulumon = new Shop([
    ItemList['Yaeger Dorulumon'],
], 'Dorulumon');
const Greymon2010 = new Shop([
    ItemList['Decker Greymon'],
    ItemList['Metal Greymon 2010'],
], 'Greymon 2010 ');
const MadLeomon = new Shop([
    ItemList['Baalmon'],
    ItemList['Mad Leomon Armed Mode'],
], 'Mad Leomon');
const MadLeomonArmedMode = new Shop([
    ItemList['Mad Leomon'],
], 'Mad Leomon Armed Mode');
const MailBirdramon = new Shop([
    ItemList['Decker Greymon'],
    ItemList['Metal Greymon 2010'],
], 'Mail Birdramon');
const Shonitamon = new Shop([
    ItemList['Omega Shoutmon'],
], 'Shonitamon');
const Shortmon = new Shop([
    ItemList['Weddinmon'],
], 'Shortmon');
const ShoutmonX2 = new Shop([
    ItemList['Shoutmon X3'],
], 'Shoutmon X2');
const ShoutmonX3 = new Shop([
    ItemList['Shoutmon X3GM'],
    ItemList['Shoutmon X3SD'],
    ItemList['Shoutmon X4'],
], 'Shoutmon X3');
const ShoutmonX4 = new Shop([
    ItemList['Shoutmon X4B'],
    ItemList['Shoutmon X4K'],
    ItemList['Shoutmon X4S'],
    ItemList['Shoutmon X5'],
], 'Shoutmon X4');
const SkullKnightmon = new Shop([
    ItemList['Dark Knightmon'],
    ItemList['Skull Knightmon Big Axe Mode'],
    ItemList['Skull Knightmon Cavalier Mode'],
], 'Skull Knightmon');
const SkullKnightmonBigAxeMode = new Shop([
    ItemList['Dark Knightmon'],
], 'Skull Knightmon Big Axe Mode');
const SkullKnightmonCavalierMode = new Shop([
    ItemList['Dark Knightmon'],
], 'Skull Knightmon Cavalier Mode');
const Troopmon = new Shop([
    ItemList['Assaultmon'],
    ItemList['Ginkakumon'],
    ItemList['Gravimon'],
], 'Troopmon');
const Baalmon = new Shop([
    ItemList['Beelzebumon 2010'],
    ItemList['Neo Vamdemon'],
], 'Baalmon');
const Butenmon = new Shop([
    ItemList['Chronomon Holy Mode'],
    ItemList['Chronomon Destroy Mode'],
], 'Butenmon');
const Cyberdramon2010 = new Shop([
    ItemList['Metal Greymon-Cyber Launcher'],
    ItemList['Justimon Critical Arm'],
], 'Cyberdramon 2010 ');
const DarkKnightmon = new Shop([
    ItemList['Dark Knightmon X-Antibody'],
    ItemList['Grey Knightsmon'],
    ItemList['Musou Knightmon'],
], 'Dark Knightmon');
const DeckerGreymon = new Shop([
    ItemList['Imperialdramon Dragon Mode'],
], 'Decker Greymon');
const MetalGreymon2010 = new Shop([
    ItemList['Metal Greymon-Cyber Launcher'],
    ItemList['Zeke Greymon'],
], 'Metal Greymon 2010 ');
const MetalGreymonCyberLauncher = new Shop([
    ItemList['Zeke Greymon'],
], 'Metal Greymon-Cyber Launcher');
const ShoutmonX4B = new Shop([
    ItemList['Shoutmon X5B'],
], 'Shoutmon X4B');
const ShoutmonX4K = new Shop([
    ItemList['Shoutmon X5'],
], 'Shoutmon X4K');
const ShoutmonX5 = new Shop([
    ItemList['Shoutmon X5B'],
    ItemList['Shoutmon X5S'],
    ItemList['Shoutmon X7'],
], 'Shoutmon X5');
const Weddinmon = new Shop([
    ItemList['Junomon'],
    ItemList['Venusmon'],
], 'Weddinmon');
const Aegisdramon = new Shop([
    ItemList['Fufumon'],
], 'Aegisdramon');
const Bagramon = new Shop([
    ItemList['Darkness Bagramon'],
], 'Bagramon');
const Beelzebumon2010 = new Shop([
    ItemList['Keemon'],
], 'Beelzebumon 2010 ');
const Blastmon = new Shop([
    ItemList['Sunamon'],
], 'Blastmon');
const ChaosmonValdurArm = new Shop([
    ItemList['Puwamon'],
], 'Chaosmon Valdur Arm');
const KingWhamon = new Shop([
    ItemList['Pitchmon'],
], 'King Whamon');
const ShoutmonX5B = new Shop([
    ItemList['Shoutmon X7'],
], 'Shoutmon X5B');
const Tactimon = new Shop([
    ItemList['Mokumon'],
], 'Tactimon');
const Panbachimon = new Shop([
    ItemList['Namakemon'],
    ItemList['Gryzmon'],
], 'Panbachimon');
const Kozenimon = new Shop([
    ItemList['Zenimon'],
], 'Kozenimon');
const Bacomon = new Shop([
    ItemList['Mimicmon'],
    ItemList['Omekamon'],
], 'Bacomon');
const Ekakimon = new Shop([
    ItemList['Omekamon'],
], 'Ekakimon');
const Gumdramon = new Shop([
    ItemList['Arresterdramon'],
    ItemList['V-dramon'],
], 'Gumdramon');
const Iguneetmon = new Shop([
    ItemList['Kinkakumon'],
    ItemList['Ginkakumon'],
], 'Iguneetmon');
const Soundbirdmon = new Shop([
    ItemList['Boogiemon'],
    ItemList['Pipismon'],
    ItemList['Shademon'],
], 'Soundbirdmon');
const Tinkermon = new Shop([
    ItemList['Fairimon'],
    ItemList['Petermon'],
], 'Tinkermon');
const Zenimon = new Shop([
    ItemList['Ganemon'],
], 'Zenimon');
const Arresterdramon = new Shop([
    ItemList['Arresterdramon Superior Mode'],
    ItemList['Rize Greymon'],
    ItemList['Wingdramon'],
], 'Arresterdramon');
const Ganemon = new Shop([
    ItemList['Superstarmon'],
    ItemList['Olegmon'],
], 'Ganemon');
const Ginkakumon = new Shop([
    ItemList['Ginkakumon Promote'],
    ItemList['Kaiser Leomon'],
], 'Ginkakumon');
const GinkakumonPromote = new Shop([
    ItemList['Skull Baluchimon'],
], 'Ginkakumon Promote');
const HiVisionMonitamon = new Shop([
    ItemList['Andromon'],
    ItemList['Cyberdramon'],
], 'Hi-Vision Monitamon');
const Kinkakumon = new Shop([
    ItemList['Bastemon'],
    ItemList['Mihiramon'],
], 'Kinkakumon');
const Petermon = new Shop([
    ItemList['Aegiochusmon Green'],
    ItemList['Entmon'],
], 'Petermon');
const RaptorSparrowmon = new Shop([
    ItemList['Parrotmon'],
    ItemList['Sinduramon'],
], 'Raptor Sparrowmon');
const Shademon = new Shop([
    ItemList['Luminamon'],
    ItemList['Megadramon'],
], 'Shademon');
const ShootingStarmon = new Shop([
    ItemList['Insekimon'],
    ItemList['Piccolomon'],
    ItemList['Superstarmon'],
], 'Shooting Starmon');
const ShoutmonKingVer = new Shop([
    ItemList['Omega Shoutmon'],
    ItemList['Shoutmon X4'],
], 'Shoutmon King Ver');
const Targetmon = new Shop([
    ItemList['Etemon'],
    ItemList['Footmon'],
], 'Targetmon');
const Tuwarmon = new Shop([
    ItemList['Deadly Tuwarmon'],
    ItemList['Musou Knightmon'],
], 'Tuwarmon');
const AtlurBallistamon = new Shop([
    ItemList['Grand Locomon'],
    ItemList['Mugendramon'],
], 'Atlur Ballistamon');
const BlackMachGaogamon = new Shop([
    ItemList['Zd Garurumon'],
], 'Black Mach Gaogamon');
const CaptainHookmon = new Shop([
    ItemList['Avenge Kidmon'],
    ItemList['Leviamon'],
], 'Captain Hookmon');
const Cho·Hakkaimon = new Shop([
    ItemList['Beel Starmon'],
    ItemList['Lovely Angemon'],
    ItemList['Mervamon'],
], 'Cho·Hakkaimon');
const Footmon = new Shop([
    ItemList['Achillesmon'],
    ItemList['Fujinmon'],
], 'Footmon');
const Gokuwmon = new Shop([
    ItemList['Gankoomon'],
    ItemList['Vulcanusmon'],
], 'Gokuwmon');
const Gravimon = new Shop([
    ItemList['Bagramon'],
], 'Gravimon');
const MusouKnightmon = new Shop([
    ItemList['Beelzebumon'],
], 'Musou Knightmon');
const OmegaShoutmon = new Shop([
    ItemList['Omega Shoutmon X-Antibody'],
    ItemList['Shoutmon DX'],
    ItemList['Shoutmon EX6'],
], 'Omega Shoutmon');
const Sagomon = new Shop([
    ItemList['Xuanwumon'],
], 'Sagomon');
const Sanzomon = new Shop([
    ItemList['Junomon'],
    ItemList['Shakamon'],
], 'Sanzomon');
const Splashmon = new Shop([
    ItemList['Splashmon Darkness Mode'],
], 'Splashmon');
const SplashmonDarknessMode = new Shop([
    ItemList['Splashmon'],
], 'Splashmon Darkness Mode');
const YaegerDorulumon = new Shop([
    ItemList['Mercurymon'],
    ItemList['Zd Garurumon'],
], 'Yaeger Dorulumon');
const Zamielmon = new Shop([
    ItemList['Pinochimon'],
    ItemList['Titamon'],
], 'Zamielmon');
const DarknessBagramon = new Shop([
    ItemList['Zurumon'],
], 'Darkness Bagramon');
const Dorbickmon = new Shop([
    ItemList['Grand Generamon'],
], 'Dorbickmon');
const JetMervamon = new Shop([
    ItemList['Botamon'],
], 'Jet Mervamon');
const Mervamon = new Shop([
    ItemList['Jet Mervamon'],
], 'Mervamon');
const NeoVamdemon = new Shop([
    ItemList['Mokumon'],
], 'Neo Vamdemon');
const OfanimonFalldownMode = new Shop([
    ItemList['Ofanimon Falldown Mode X-Antibody'],
    ItemList['Ordinemon'],
], 'Ofanimon Falldown Mode');
const Olegmon = new Shop([
    ItemList['Kozenimon'],
], 'Olegmon');
const OmegamonZwart = new Shop([
    ItemList['Omegamon Zwart Defeat'],
], 'Omegamon Zwart');
const Shakamon = new Shop([
    ItemList['Yukimi Botamon'],
], 'Shakamon');
const ShoutmonDX = new Shop([
    ItemList['Shoutmon X7'],
], 'Shoutmon DX');
const ShoutmonEX6 = new Shop([
    ItemList['Shoutmon X7'],
], 'Shoutmon EX6');
const ShoutmonX7 = new Shop([
    ItemList['Shoutmon X7 Superior Mode'],
], 'Shoutmon X7');
const ShoutmonX7SuperiorMode = new Shop([
    ItemList['Botamon'],
], 'Shoutmon X7 Superior Mode');
const Venusmon = new Shop([
    ItemList['Yukimi Botamon'],
], 'Venusmon');
const Vulcanusmon = new Shop([
    ItemList['Mokumon'],
], 'Vulcanusmon');
const ZekeGreymon = new Shop([
    ItemList['Botamon'],
], 'Zeke Greymon');
const Armamon = new Shop([
    ItemList['Omega Armamon BM'],
], 'Armamon');
const DarkVolumon = new Shop([
    ItemList['Atlur Ballistamon'],
], 'Dark Volumon');
const DeadlyTuwarmon = new Shop([
    ItemList['Gokumon'],
], 'Deadly Tuwarmon');
const GrandGeneramon = new Shop([
    ItemList['Tunomon'],
], 'Grand Generamon');
const GreyKnightsmon = new Shop([
    ItemList['Choromon'],
], 'Grey Knightsmon');
const OmegaArmamonBM = new Shop([
    ItemList['Tunomon'],
], 'Omega Armamon BM');
const ShoutmonX3GM = new Shop([
    ItemList['Shoutmon X4'],
], 'Shoutmon X3GM');
const ShoutmonX3SD = new Shop([
    ItemList['Shoutmon X4'],
], 'Shoutmon X3SD');
const ShoutmonX4S = new Shop([
    ItemList['Shoutmon X5S'],
], 'Shoutmon X4S');
const ShoutmonX5S = new Shop([
    ItemList['Shoutmon X7'],
], 'Shoutmon X5S');
const Huckmon = new Shop([
    ItemList['Bao Huckmon'],
    ItemList['Geo Greymon'],
    ItemList['Monochromon'],
], 'Huckmon');
const Pillomon = new Shop([
    ItemList['Sheepmon'],
], 'Pillomon');
const SistermonBlanc = new Shop([
    ItemList['Sistermon Blanc Awaken'],
    ItemList['Sistermon Ciel'],
    ItemList['Sistermon Noir'],
], 'Sistermon Blanc');
const SistermonNoir = new Shop([
    ItemList['Sistermon Noir Awaken'],
    ItemList['Lady Devimon'],
], 'Sistermon Noir');
const Yakiimon = new Shop([
    ItemList['Jyagamon'],
], 'Yakiimon');
const ArresterdramonSuperiorMode = new Shop([
    ItemList['Megidramon'],
], 'Arresterdramon Superior Mode');
const Jokermon = new Shop([
    ItemList['Noble Pumpmon'],
    ItemList['Piemon'],
], 'Jokermon');
const Luminamon = new Shop([
    ItemList['Luminamon Nene Version'],
    ItemList['Marin Angemon'],
], 'Luminamon');
const LuminamonNeneVersion = new Shop([
    ItemList['Marin Angemon'],
    ItemList['Ofanimon'],
], 'Luminamon Nene Version');
const Gankoomon = new Shop([
    ItemList['Gankoomon X-Antibody'],
], 'Gankoomon');
const Quartzmon = new Shop([
    ItemList['Zurumon'],
], 'Quartzmon');
const SistermonBlancAwaken = new Shop([
    ItemList['Sistermon Noir Awaken'],
    ItemList['Sistermon Ciel Awaken'],
], 'Sistermon Blanc Awaken');
const Aegiomon = new Shop([
    ItemList['Aegiochusmon'],
    ItemList['Aegiochusmon Blue'],
    ItemList['Aegiochusmon Dark'],
    ItemList['Aegiochusmon Green'],
    ItemList['Aegiochusmon Holy'],
], 'Aegiomon');
const SistermonNoirAwaken = new Shop([
    ItemList['Angewomon'],
    ItemList['Lady Devimon'],
], 'Sistermon Noir Awaken');
const Aegiochusmon = new Shop([
    ItemList['Apollomon'],
    ItemList['Marsmon'],
    ItemList['Vulcanusmon'],
], 'Aegiochusmon');
const AegiochusmonBlue = new Shop([
    ItemList['Dianamon'],
    ItemList['Neptunemon'],
], 'Aegiochusmon Blue');
const AegiochusmonGreen = new Shop([
    ItemList['Bacchusmon'],
    ItemList['Ceresmon'],
    ItemList['Mercurymon'],
], 'Aegiochusmon Green');
const CerberumonWerewolfMode = new Shop([
    ItemList['Cherubimon Vice'],
    ItemList['Plutomon'],
], 'Cerberumon Werewolf Mode');
const Sirenmon = new Shop([
    ItemList['Ancient Mermaimon'],
    ItemList['Ceresmon'],
    ItemList['Marin Angemon'],
], 'Sirenmon');
const AvengeKidmon = new Shop([
    ItemList['Zerimon'],
], 'Avenge Kidmon');
const Bacchusmon = new Shop([
    ItemList['Poyomon'],
], 'Bacchusmon');
const BeelStarmon = new Shop([
    ItemList['Keemon'],
], 'Beel Starmon');
const Ceresmon = new Shop([
    ItemList['Ceresmon Medium'],
], 'Ceresmon');
const CeresmonMedium = new Shop([
    ItemList['Ceresmon'],
], 'Ceresmon Medium');
const Jupitermon = new Shop([
    ItemList['Jupitermon Wrath Mode'],
], 'Jupitermon');
const KuzuhamonMikoMode = new Shop([
    ItemList['Kuzuhamon'],
], 'Kuzuhamon Miko Mode');
const MagnaKidmon = new Shop([
    ItemList['Botamon'],
], 'Magna Kidmon');
const Plutomon = new Shop([
    ItemList['Paomon'],
], 'Plutomon');
const RustTyranomon = new Shop([
    ItemList['Botamon'],
], 'Rust Tyranomon');
const Titamon = new Shop([
    ItemList['Punimon'],
], 'Titamon');
const BaoHuckmon = new Shop([
    ItemList['Rize Greymon'],
    ItemList['Savior Huckmon'],
    ItemList['Skull Greymon'],
], 'Bao Huckmon');
const AegiochusmonDark = new Shop([
    ItemList['Minervamon'],
    ItemList['Plutomon'],
], 'Aegiochusmon Dark');
const AegiochusmonHoly = new Shop([
    ItemList['Junomon'],
    ItemList['Jupitermon'],
    ItemList['Venusmon'],
], 'Aegiochusmon Holy');
const SaviorHuckmon = new Shop([
    ItemList['Jesmon'],
    ItemList['Megidramon'],
    ItemList['Slayerdramon'],
], 'Savior Huckmon');
const BanchoGolemon = new Shop([
    ItemList['Sunamon'],
], 'Bancho Golemon');
const BanchoLilimon = new Shop([
    ItemList['Yuramon'],
], 'Bancho Lilimon');
const BanchoMamemon = new Shop([
    ItemList['Choromon'],
], 'Bancho Mamemon');
const BanchoStingmon = new Shop([
    ItemList['Leafmon'],
], 'Bancho Stingmon');
const Gundramon = new Shop([
    ItemList['Choromon'],
], 'Gundramon');
const Jesmon = new Shop([
    ItemList['Jesmon X-Antibody'],
    ItemList['Jesmon GX'],
], 'Jesmon');
const Junomon = new Shop([
    ItemList['Junomon Hysteric Mode'],
], 'Junomon');
const JunomonHystericMode = new Shop([
    ItemList['Junomon'],
], 'Junomon Hysteric Mode');
const JupitermonWrathMode = new Shop([
    ItemList['Jupitermon'],
], 'Jupitermon Wrath Mode');
const Vorvomon = new Shop([
    ItemList['Birdramon'],
    ItemList['Lavorvomon'],
    ItemList['Meramon'],
], 'Vorvomon');
const GuardromonGold = new Shop([
    ItemList['Duramon'],
    ItemList['Grademon'],
    ItemList['Rapidmon Armor'],
], 'Guardromon Gold');
const Meicoomon = new Shop([
    ItemList['Meicrackmon'],
    ItemList['Meicrackmon Vicious Mode'],
], 'Meicoomon');
const MeicrackmonViciousMode = new Shop([
    ItemList['Junomon'],
    ItemList['Ofanimon'],
    ItemList['Raguelmon'],
], 'Meicrackmon Vicious Mode');
const Mastemon = new Shop([
    ItemList['Botamon'],
    ItemList['Yukimi Botamon'],
], 'Mastemon');
const OmegamonAlterB = new Shop([
    ItemList['Botamon'],
    ItemList['Punimon'],
], 'Omegamon Alter-B');
const OmegamonZwartDefeat = new Shop([
    ItemList['Botamon'],
    ItemList['Punimon'],
], 'Omegamon Zwart Defeat');
const Volcanicdramon = new Shop([
    ItemList['Mokumon'],
], 'Volcanicdramon');
const Sakumon = new Shop([
    ItemList['Sakuttomon'],
], 'Sakumon');
const Sakuttomon = new Shop([
    ItemList['Huckmon'],
    ItemList['Ryudamon'],
    ItemList['Zubamon'],
], 'Sakuttomon');
const Ludomon = new Shop([
    ItemList['Guardromon'],
    ItemList['Tia Ludomon'],
], 'Ludomon');
const Zubamon = new Shop([
    ItemList['Bao Huckmon'],
    ItemList['Ginryumon'],
    ItemList['Zubaeagermon'],
], 'Zubamon');
const Hudiemon = new Shop([
    ItemList['Archnemon'],
    ItemList['Jewelbeemon'],
    ItemList['Lilimon'],
], 'Hudiemon');
const Lavorvomon = new Shop([
    ItemList['Lavogaritamon'],
    ItemList['Volcamon'],
    ItemList['Vritramon'],
], 'Lavorvomon');
const SistermonCiel = new Shop([
    ItemList['Cho·Hakkaimon'],
    ItemList['Eosmon Perfect'],
    ItemList['Sistermon Ciel Awaken'],
], 'Sistermon Ciel');
const SistermonCielAwaken = new Shop([
    ItemList['Angewomon'],
    ItemList['Eosmon Perfect'],
], 'Sistermon Ciel Awaken');
const Zubaeagermon = new Shop([
    ItemList['Duramon'],
    ItemList['Groundramon'],
    ItemList['Jyagamon'],
], 'Zubaeagermon');
const Duramon = new Shop([
    ItemList['Cres Garurumon'],
    ItemList['Durandamon'],
    ItemList['Jesmon'],
], 'Duramon');
const Lavogaritamon = new Shop([
    ItemList['Bryweludramon'],
    ItemList['Megidramon'],
    ItemList['Volcanicdramon'],
], 'Lavogaritamon');
const Meicrackmon = new Shop([
    ItemList['Holydramon'],
    ItemList['Junomon'],
    ItemList['Meicrackmon Vicious Mode'],
    ItemList['Rasielmon'],
], 'Meicrackmon');
const BlitzGreymon = new Shop([
    ItemList['Omegamon Alter-S'],
], 'Blitz Greymon');
const CresGarurumon = new Shop([
    ItemList['Omegamon Alter-S'],
], 'Cres Garurumon');
const Durandamon = new Shop([
    ItemList['Ragna Lordmon'],
], 'Durandamon');
const GraceNovamon = new Shop([
    ItemList['Moonmon'],
    ItemList['Sunmon'],
], 'Grace Novamon');
const OmegamonAlterS = new Shop([
    ItemList['Botamon'],
    ItemList['Punimon'],
], 'Omegamon Alter-S');
const Ordinemon = new Shop([
    ItemList['Yukimi Botamon'],
], 'Ordinemon');
const Raguelmon = new Shop([
    ItemList['Ordinemon'],
], 'Raguelmon');
const Rasielmon = new Shop([
    ItemList['Yukimi Botamon'],
], 'Rasielmon');
const Voltobautamon = new Shop([
    ItemList['Zurumon'],
], 'Voltobautamon');
const Cotsucomon = new Shop([
    ItemList['Kakkinmon'],
], 'Cotsucomon');
const Pusumon = new Shop([
    ItemList['Pusurimon'],
], 'Pusumon');
const Kakkinmon = new Shop([
    ItemList['Junkmon'],
    ItemList['Ludomon'],
], 'Kakkinmon');
const Pusurimon = new Shop([
    ItemList['Herissmon'],
    ItemList['Plotmon'],
], 'Pusurimon');
const Bulucomon = new Shop([
    ItemList['Hyougamon'],
    ItemList['Paledramon'],
    ItemList['Yukidarumon'],
], 'Bulucomon');
const DracomonXAntibody = new Shop([
    ItemList['Groundramon'],
    ItemList['Growmon X-Antibody'],
    ItemList['Wingdramon'],
], 'Dracomon X-Antibody');
const Herissmon = new Shop([
    ItemList['Filmon'],
    ItemList['Sangloupmon'],
], 'Herissmon');
const RenamonXAntibody = new Shop([
    ItemList['Kyubimon'],
    ItemList['Kyubimon Silver'],
    ItemList['Leomon X-Antibody'],
], 'Renamon X-Antibody');
const TerriermonAssistant = new Shop([
    ItemList['Galgomon'],
    ItemList['Terriermon X-Antibody'],
], 'Terriermon Assistant');
const Filmon = new Shop([
    ItemList['Bulkmon'],
    ItemList['Stiffilmon'],
], 'Filmon');
const Paledramon = new Shop([
    ItemList['Crys Paledramon'],
    ItemList['Frozomon'],
    ItemList['Panjyamon'],
], 'Paledramon');
const TiaLudomon = new Shop([
    ItemList['Megadramon'],
    ItemList['Metal Greymon'],
    ItemList['Raiji Ludomon'],
], 'Tia Ludomon');
const TyranomonXAntibody = new Shop([
    ItemList['Metal Greymon X-Antibody'],
    ItemList['Metal Tyranomon X-Antibody'],
], 'Tyranomon X-Antibody');
const CrysPaledramon = new Shop([
    ItemList['Decker Greymon'],
    ItemList['Fros Velgrmon'],
    ItemList['Hexeblaumon'],
], 'Crys Paledramon');
const RaijiLudomon = new Shop([
    ItemList['Blitz Greymon'],
    ItemList['Bryweludramon'],
    ItemList['Dukemon'],
], 'Raiji Ludomon');
const Stiffilmon = new Shop([
    ItemList['Bagramon'],
    ItemList['Rasenmon'],
    ItemList['Rasenmon Fury Mode'],
], 'Stiffilmon');
const BeelStarmonXAntibody = new Shop([
    ItemList['Keemon'],
], 'Beel Starmon X-Antibody');
const Bryweludramon = new Shop([
    ItemList['Ragna Lordmon'],
], 'Bryweludramon');
const CraniummonXAntibody = new Shop([
    ItemList['Bommon'],
], 'Craniummon X-Antibody');
const DiablomonXAntibody = new Shop([
    ItemList['Kuramon'],
], 'Diablomon X-Antibody');
const JesmonXAntibody = new Shop([
    ItemList['Sakumon'],
], 'Jesmon X-Antibody');
const LordKnightmonXAntibody = new Shop([
    ItemList['Choromon'],
], 'Lord Knightmon X-Antibody');
const MinervamonXAntibody = new Shop([
    ItemList['Yuramon'],
], 'Minervamon X-Antibody');
const OmegamonMercifulMode = new Shop([
    ItemList['Botamon'],
    ItemList['Bubbmon'],
    ItemList['Nyokimon'],
    ItemList['Pitchmon'],
    ItemList['Poyomon'],
    ItemList['Punimon'],
    ItemList['Yukimi Botamon'],
    ItemList['Yuramon'],
], 'Omegamon Merciful Mode');
const Rafflesimon = new Shop([
    ItemList['Nyokimon'],
], 'Rafflesimon');
const RagnaLordmon = new Shop([
    ItemList['Cotsucomon'],
    ItemList['Sakumon'],
], 'Ragna Lordmon');
const SakuyamonXAntibody = new Shop([
    ItemList['Relemon'],
], 'Sakuyamon X-Antibody');
const SleipmonXAntibody = new Shop([
    ItemList['Pafumon'],
], 'Sleipmon X-Antibody');
const AgumonBlackXAntibody = new Shop([
    ItemList['Allomon X-Antibody'],
    ItemList['Dark Tyranomon X-Antibody'],
], 'Agumon Black X-Antibody');
const ImpmonXAntibody = new Shop([
    ItemList['Meramon'],
    ItemList['Orgemon X-Antibody'],
    ItemList['Wizarmon'],
], 'Impmon X-Antibody');
const Jazamon = new Shop([
    ItemList['Jazardmon'],
    ItemList['Pteranomon'],
], 'Jazamon');
const KeramonXAntibody = new Shop([
    ItemList['Bakemon'],
    ItemList['Bomber Nanimon'],
    ItemList['Chrysalimon'],
    ItemList['Meicoomon'],
], 'Keramon X-Antibody');
const LopmonXAntibody = new Shop([
    ItemList['Black Tailmon'],
    ItemList['Tailmon X-Antibody'],
    ItemList['Turuiemon'],
], 'Lopmon X-Antibody');
const TerriermonXAntibody = new Shop([
    ItemList['Dogmon'],
    ItemList['Galgomon'],
    ItemList['Minotaurmon'],
    ItemList['Siesamon X-Antibody'],
], 'Terriermon X-Antibody');
const DarkTyranomonXAntibody = new Shop([
    ItemList['Mametyramon'],
    ItemList['Metal Greymon Virus'],
    ItemList['Triceramon X-Antibody'],
], 'Dark Tyranomon X-Antibody');
const Jazardmon = new Shop([
    ItemList['Jazarichmon'],
    ItemList['Megadramon'],
    ItemList['Vulturemon'],
], 'Jazardmon');
const MeramonXAntibody = new Shop([
    ItemList['Death Meramon'],
    ItemList['Garudamon X-Antibody'],
], 'Meramon X-Antibody');
const NumemonXAntibody = new Shop([
    ItemList['Black King Numemon'],
    ItemList['Monzaemon'],
    ItemList['Vamdemon X-Antibody'],
], 'Numemon X-Antibody');
const OrgemonXAntibody = new Shop([
    ItemList['Rebellimon'],
    ItemList['Skull Satamon'],
    ItemList['Vamdemon X-Antibody'],
], 'Orgemon X-Antibody');
const PegasmonXAntibody = new Shop([
    ItemList['Garummon'],
    ItemList['Grademon'],
    ItemList['Hippogriffomon'],
], 'Pegasmon X-Antibody');
const SiesamonXAntibody = new Shop([
    ItemList['Bastemon'],
    ItemList['Caturamon'],
    ItemList['Mihiramon'],
], 'Siesamon X-Antibody');
const WizarmonXAntibody = new Shop([
    ItemList['Baalmon'],
    ItemList['Mistymon'],
    ItemList['Vamdemon X-Antibody'],
], 'Wizarmon X-Antibody');
const AngewomonXAntibody = new Shop([
    ItemList['Holydramon X-Antibody'],
    ItemList['Ofanimon X-Antibody'],
], 'Angewomon X-Antibody');
const CyberdramonXAntibody = new Shop([
    ItemList['Ebemon X-Antibody'],
    ItemList['Gaioumon'],
    ItemList['Justimon X-Antibody'],
], 'Cyberdramon X-Antibody');
const Jazarichmon = new Shop([
    ItemList['Metallicdramon'],
    ItemList['Hououmon'],
    ItemList['Shoutmon X3GM'],
], 'Jazarichmon');
const LadyDevimonXAntibody = new Shop([
    ItemList['Beel Starmon X-Antibody'],
    ItemList['Ofanimon Falldown Mode X-Antibody'],
], 'Lady Devimon X-Antibody');
const MephismonXAntibody = new Shop([
    ItemList['Barbamon'],
    ItemList['Cherubimon Vice'],
    ItemList['Gulfmon'],
], 'Mephismon X-Antibody');
const MetalGreymonVirusXAntibody = new Shop([
    ItemList['Black War Greymon X-Antibody'],
    ItemList['Skull Mammon X-Antibody'],
    ItemList['Ultimate Brachimon'],
], 'Metal Greymon Virus X-Antibody');
const MonzaemonXAntibody = new Shop([
    ItemList['Cherubimon Virtue X-Antibody'],
    ItemList['Holydramon'],
    ItemList['Waru Monzaemon'],
], 'Monzaemon X-Antibody');
const OmegaShoutmonXAntibody = new Shop([
    ItemList['Shoutmon DX'],
    ItemList['Shoutmon EX6'],
    ItemList['Rapidmon X-Antibody'],
], 'Omega Shoutmon X-Antibody');
const RizeGreymonXAntibody = new Shop([
    ItemList['Bryweludramon'],
    ItemList['Gankoomon X-Antibody'],
    ItemList['Jupitermon'],
    ItemList['Shine Greymon'],
], 'Rize Greymon X-Antibody');
const VamdemonXAntibody = new Shop([
    ItemList['Belial Vamdemon'],
    ItemList['Cherubimon Vice X-Antibody'],
    ItemList['Venom Vamdemon'],
], 'Vamdemon X-Antibody');
const BarbamonXAntibody = new Shop([
    ItemList['Mokumon'],
], 'Barbamon X-Antibody');
const BelphemonXAntibody = new Shop([
    ItemList['Kuramon'],
], 'Belphemon X-Antibody');
const CherubimonViceXAntibody = new Shop([
    ItemList['Cocomon'],
], 'Cherubimon Vice X-Antibody');
const CherubimonVirtueXAntibody = new Shop([
    ItemList['Zerimon'],
], 'Cherubimon Virtue X-Antibody');
const DarkKnightmonXAntibody = new Shop([
    ItemList['Cotsucomon'],
], 'Dark Knightmon X-Antibody');
const DemonXAntibody = new Shop([
    ItemList['Zurumon'],
], 'Demon X-Antibody');
const ExamonXAntibody = new Shop([
    ItemList['Petitmon'],
], 'Examon X-Antibody');
const GankoomonXAntibody = new Shop([
    ItemList['Bubbmon'],
], 'Gankoomon X-Antibody');
const Hexeblaumon = new Shop([
    ItemList['Yukimi Botamon'],
], 'Hexeblaumon');
const HououmonXAntibody = new Shop([
    ItemList['Puwamon'],
], 'Hououmon X-Antibody');
const JesmonGX = new Shop([
    ItemList['Sakumon'],
], 'Jesmon GX');
const JustimonXAntibody = new Shop([
    ItemList['Sakumon'],
], 'Justimon X-Antibody');
const LeviamonXAntibody = new Shop([
    ItemList['Pitchmon'],
], 'Leviamon X-Antibody');
const LilithmonXAntibody = new Shop([
    ItemList['Botamon'],
], 'Lilithmon X-Antibody');
const LucemonXAntibody = new Shop([
    ItemList['Poyomon'],
], 'Lucemon X-Antibody');
const Metallicdramon = new Shop([
    ItemList['Ketomon'],
], 'Metallicdramon');
const NoblePumpmon = new Shop([
    ItemList['Nyokimon'],
], 'Noble Pumpmon');
const OfanimonXAntibody = new Shop([
    ItemList['Yukimi Botamon'],
], 'Ofanimon X-Antibody');
const OfanimonFalldownModeXAntibody = new Shop([
    ItemList['Yukimi Botamon'],
], 'Ofanimon Falldown Mode X-Antibody');
const OgudomonXAntibody = new Shop([
    ItemList['Keemon'],
], 'Ogudomon X-Antibody');
const RapidmonXAntibody = new Shop([
    ItemList['Zerimon'],
], 'Rapidmon X-Antibody');
const Rasenmon = new Shop([
    ItemList['Rasenmon Fury Mode'],
], 'Rasenmon');
const RasenmonFuryMode = new Shop([
    ItemList['Rasenmon'],
], 'Rasenmon Fury Mode');
const AlgomonBabyI = new Shop([
    ItemList['Algomon Baby II'],
], 'Algomon Baby I');
const Dokimon = new Shop([
    ItemList['Bibimon'],
], 'Dokimon');
const AlgomonBabyII = new Shop([
    ItemList['Algomon Child'],
    ItemList['Ghostmon'],
    ItemList['Wormmon'],
], 'Algomon Baby II');
const Bibimon = new Shop([
    ItemList['Betamon'],
    ItemList['Patamon'],
    ItemList['Pulsemon'],
], 'Bibimon');
const AlgomonChild = new Shop([
    ItemList['Algomon Adult'],
    ItemList['Eosmon Adult'],
    ItemList['Mojyamon'],
], 'Algomon Child');
const Ghostmon = new Shop([
    ItemList['Bakemon'],
    ItemList['Devimon'],
    ItemList['Witchmon'],
    ItemList['Wizarmon'],
], 'Ghostmon');
const Junkmon = new Shop([
    ItemList['Komondomon'],
    ItemList['Minotaurmon'],
    ItemList['Raremon'],
], 'Junkmon');
const Morphomon = new Shop([
    ItemList['Eosmon Adult'],
    ItemList['Gokimon'],
    ItemList['Hudiemon'],
], 'Morphomon');
const Pomumon = new Shop([
    ItemList['Cockatrimon'],
    ItemList['Parasaurmon'],
    ItemList['Zassoumon'],
], 'Pomumon');
const Pulsemon = new Shop([
    ItemList['Bulkmon'],
    ItemList['Exermon'],
    ItemList['Namakemon'],
    ItemList['Runnermon'],
], 'Pulsemon');
const Sangomon = new Shop([
    ItemList['Hookmon'],
    ItemList['Octmon'],
    ItemList['Shellmon'],
    ItemList['Tobiumon'],
], 'Sangomon');
const Sunarizamon = new Shop([
    ItemList['Baboongamon'],
    ItemList['Golemon'],
    ItemList['Tortamon'],
], 'Sunarizamon');
const AlgomonAdult = new Shop([
    ItemList['Algomon Perfect'],
    ItemList['Big Mamemon'],
    ItemList['Valvemon'],
], 'Algomon Adult');
const Baboongamon = new Shop([
    ItemList['Gogmamon'],
    ItemList['Jyagamon'],
], 'Baboongamon');
const Baluchimon = new Shop([
    ItemList['Manticoremon'],,
    ItemList['Skull Baluchimon'],
], 'Baluchimon');
const Bulkmon = new Shop([
    ItemList['Boutmon'],
    ItemList['Climbmon'],
    ItemList['Divemon'],
    ItemList['Pistmon'],
    ItemList['Tempomon'],
], 'Bulkmon');
const DarkMaildramon = new Shop([
    ItemList['Metal Greymon Virus'],
    ItemList['Metal Tyranomon'],
], 'Dark Maildramon');
const EosmonAdult = new Shop([
    ItemList['Eosmon Perfect'],
    ItemList['Sistermon Ciel Awaken'],
    ItemList['Sistermon Noir Awaken'],
], 'Eosmon Adult');
const Exermon = new Shop([
    ItemList['Archnemon'],
    ItemList['Climbmon'],
    ItemList['Pistmon'],
], 'Exermon');
const Eyesmon = new Shop([
    ItemList['Eyesmon Scatter Mode'],
    ItemList['Orochimon'],
], 'Eyesmon');
const EyesmonScatterMode = new Shop([
    ItemList['Eyesmon'],
    ItemList['Dagomon'],
], 'Eyesmon Scatter Mode');
const Machmon = new Shop([
    ItemList['Locomon'],
    ItemList['Trailmon Worm'],
], 'Machmon');
const Mimicmon = new Shop([
    ItemList['Manticoremon'],
    ItemList['Piranimon'],
], 'Mimicmon');
const Namakemon = new Shop([
    ItemList['Boutmon'],
    ItemList['Tempomon'],
], 'Namakemon');
const Parasaurmon = new Shop([
    ItemList['Ajatarmon'],
    ItemList['Entmon'],
    ItemList['Toropiamon'],
], 'Parasaurmon');
const Runnermon = new Shop([
    ItemList['Pistmon'],
    ItemList['Shootmon'],
], 'Runnermon');
const Tobiumon = new Shop([
    ItemList['Gusokumon'],
    ItemList['Marin Chimairamon'],
    ItemList['Mermaimon'],
    ItemList['Piranimon'],
], 'Tobiumon');
const Boutmon = new Shop([
    ItemList['Achillesmon'],
    ItemList['Kazuchimon'],
    ItemList['Shroudmon'],
], 'Boutmon');
const Entmon = new Shop([
    ItemList['Babamon'],
    ItemList['Xuanwumon'],
], 'Entmon');
const EosmonPerfect = new Shop([
    ItemList['Ancient Wisemon'],
    ItemList['Eosmon Ultimate'],
], 'Eosmon Perfect');
const Gogmamon = new Shop([
    ItemList['Ancient Volcamon'],
    ItemList['Blastmon'],
    ItemList['Pharaohmon'],
], 'Gogmamon');
const Gusokumon = new Shop([
    ItemList['Decker Greymon'],
    ItemList['Metal Seadramon'],
    ItemList['Plesiomon'],
    ItemList['Regalecusmon'],
], 'Gusokumon');
const Manticoremon = new Shop([
    ItemList['Qinglongmon'],
    ItemList['Slash Angemon'],
], 'Manticoremon');
const MarinChimairamon = new Shop([
    ItemList['Marin Angemon'],
    ItemList['Neptunemon'],
    ItemList['Regalecusmon'],
], 'Marin Chimairamon');
const MetalGreymonAlterousMode = new Shop([
    ItemList['Blitz Greymon'],
    ItemList['Mugendramon'],
    ItemList['War Greymon'],
], 'Metal Greymon Alterous Mode');
const Piranimon = new Shop([
    ItemList['Leviamon'],
    ItemList['Metal Piranimon'],
], 'Piranimon');
const Rebellimon = new Shop([
    ItemList['Gundramon'],
    ItemList['Titamon'],
], 'Rebellimon');
const Toropiamon = new Shop([
    ItemList['Bloom Lordmon'],
    ItemList['Hydramon'],
    ItemList['Spinomon'],
], 'Toropiamon');
const WereGarurumonSagittariusMode = new Shop([
    ItemList['Cres Garurumon'],
    ItemList['Mercurymon'],
    ItemList['Metal Garurumon'],
], 'Were Garurumon Sagittarius Mode');
const AgumonYukinoKizuna = new Shop([
    ItemList['Botamon'],
], 'Agumon -Yuki no Kizuna-');
const DoneDevimon = new Shop([
    ItemList['Mokumon'],
], 'Done Devimon');
const EosmonUltimate = new Shop([
    ItemList['Pupumon'],
], 'Eosmon Ultimate');
const GabumonYujonoKizuna = new Shop([
    ItemList['Punimon'],
], 'Gabumon -Yujo no Kizuna-');
const HeavyLeomon = new Shop([
    ItemList['Punimon'],
], 'Heavy Leomon');
const Kazuchimon = new Shop([
    ItemList['Dokimon'],
], 'Kazuchimon');
const Mitamamon = new Shop([
    ItemList['Pafumon'],
], 'Mitamamon');
const Nidhoggmon = new Shop([
    ItemList['Kuramon'],
], 'Nidhoggmon');
const Omedamon = new Shop([
    ItemList['Choromon'],
], 'Omedamon');
const Regalecusmon = new Shop([
    ItemList['Pitchmon'],
], 'Regalecusmon');
const Curimon = new Shop([
    ItemList['Gurimon'],
], 'Curimon');
const Hiyarimon = new Shop([
    ItemList['Bulucomon'],
    ItemList['Snow Goburimon'],
], 'Hiyarimon');
const Puyomon = new Shop([
    ItemList['Puyoyomon'],
], 'Puyomon');
const Pyonmon = new Shop([
    ItemList['Bosamon'],
], 'Pyonmon');
const Sunamon = new Shop([
    ItemList['Goromon'],
], 'Sunamon');
const Bosamon = new Shop([
    ItemList['Angoramon'],
    ItemList['Plotmon'],
], 'Bosamon');
const Goromon = new Shop([
    ItemList['Gottsumon'],
    ItemList['Sunarizamon'],
], 'Goromon');
const Gurimon = new Shop([
    ItemList['Gammamon'],
    ItemList['Huckmon'],
], 'Gurimon');
const Puyoyomon = new Shop([
    ItemList['Jellymon'],
    ItemList['Otamamon'],
    ItemList['Sangomon'],
    ItemList['Shakomon'],
], 'Puyoyomon');
const Negamon = new Shop([
    ItemList['Keramon'],
], 'Negamon');
const Angoramon = new Shop([
    ItemList['Komondomon'],
    ItemList['Porcupamon'],
    ItemList['Symbare Angoramon'],
], 'Angoramon');
const Gammamon = new Shop([
    ItemList['Betel Gammamon'],
    ItemList['Gulus Gammamon'],
    ItemList['Kaus Gammamon'],
    ItemList['Wezen Gammamon'],
], 'Gammamon');
const Jellymon = new Shop([
    ItemList['Gesomon'],
    ItemList['Rukamon'],
    ItemList['Tesla Jellymon'],
], 'Jellymon');
const KodokugumonChild = new Shop([
    ItemList['Dokugumon'],
    ItemList['Stingmon'],
    ItemList['Sand Yanmamon'],
], 'Kodokugumon Child');
const BetelGammamon = new Shop([
    ItemList['Brachimon'],
    ItemList['Canoweissmon'],
    ItemList['Tankdramon'],
], 'Betel Gammamon');
const GulusGammamon = new Shop([
    ItemList['Chimairamon'],
    ItemList['Canoweissmon'],
    ItemList['Kaiser Leomon'],
], 'Gulus Gammamon');
const KausGammamon = new Shop([
    ItemList['Canoweissmon'],
    ItemList['Garummon'],
], 'Kaus Gammamon');
const Komondomon = new Shop([
    ItemList['Loader Leomon'],
    ItemList['Locomon'],
    ItemList['Waru Monzaemon'],
], 'Komondomon');
const Potamon = new Shop([
    ItemList['Jyagamon'],
], 'Potamon');
const SymbareAngoramon = new Shop([
    ItemList['Grappu Leomon'],
    ItemList['Lamortmon'],
    ItemList['Waru Monzaemon'],
], 'Symbare Angoramon');
const TeslaJellymon = new Shop([
    ItemList['Marin Devimon'],
    ItemList['Thetismon'],
    ItemList['Whamon Perfect'],
], 'Tesla Jellymon');
const WezenGammamon = new Shop([
    ItemList['Canoweissmon'],
    ItemList['Groundramon'],
    ItemList['Triceramon'],
], 'Wezen Gammamon');
const BlackTailmonUver = new Shop([
    ItemList['Betsumon'],
    ItemList['Lady Devimon'],
    ItemList['Waru Monzaemon'],
], 'Black Tailmon Uver');
const Canoweissmon = new Shop([
    ItemList['Aegisdramon'],
    ItemList['Chaosdramon'],
    ItemList['Megidramon'],
], 'Canoweissmon');
const Climbmon = new Shop([
    ItemList['Shivamon'],
    ItemList['Shroudmon'],
], 'Climbmon');
const Divemon = new Shop([
    ItemList['Pukumon'],
    ItemList['Surfymon'],
], 'Divemon');
const Frozomon = new Shop([
    ItemList['Decker Greymon'],
    ItemList['Fros Velgrmon'],
    ItemList['Skull Mammon'],
], 'Frozomon');
const Lamortmon = new Shop([
    ItemList['Anubimon'],
    ItemList['Griffomon'],
    ItemList['Saber Leomon'],
], 'Lamortmon');
const Pistmon = new Shop([
    ItemList['Achillesmon'],
    ItemList['Bloom Lordmon'],
    ItemList['Lord Knightmon'],
], 'Pistmon');
const RareRaremon = new Shop([
    ItemList['Boltmon'],
    ItemList['Metamormon'],
    ItemList['Nidhoggmon'],
], 'Rare Raremon');
const Shootmon = new Shop([
    ItemList['Magna Kidmon'],
    ItemList['Shroudmon'],
], 'Shootmon');
const Tempomon = new Shop([
    ItemList['Daipenmon'],
    ItemList['Ravmon'],
    ItemList['Ornismon'],
], 'Tempomon');
const Thetismon = new Shop([
    ItemList['Ancient Mermaimon'],
    ItemList['Marin Angemon'],
    ItemList['Pukumon'],
], 'Thetismon');
const Vulturemon = new Shop([
    ItemList['Hououmon'],
    ItemList['Zhuqiaomon'],
], 'Vulturemon');
const Abbadomon = new Shop([
    ItemList['Abbadomon Core'],
], 'Abbadomon');
const AbbadomonCore = new Shop([
    ItemList['Kuramon'],
], 'Abbadomon Core');
const Achillesmon = new Shop([
    ItemList['Dokimon'],
], 'Achillesmon');
const Ajatarmon = new Shop([
    ItemList['Nyokimon'],
], 'Ajatarmon');
const BloomLordmon = new Shop([
    ItemList['Yuramon'],
], 'Bloom Lordmon');
const FrosVelgrmon = new Shop([
    ItemList['Yukimi Botamon'],
], 'Fros Velgrmon');
const GaioumonInvincibleSword = new Shop([
    ItemList['Botamon'],
], 'Gaioumon Invincible Sword');
const Hydramon = new Shop([
    ItemList['Nyokimon'],
], 'Hydramon');
const LovelyAngemon = new Shop([
    ItemList['Yukimi Botamon'],
], 'Lovely Angemon');
const Shivamon = new Shop([
    ItemList['Dokimon'],
], 'Shivamon');
const Shroudmon = new Shop([
    ItemList['Mokumon'],
], 'Shroudmon');
