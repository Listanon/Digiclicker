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
    new PokeballItem(GameConstants.Pokeball.Masterball, 3000    , GameConstants.Currency.questPoint  , { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.questPoint]}` }),
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
    ItemList['Water_stone'],
    ItemList['xAttack'],
    ItemList['Water_egg'],
]);
const VermilionCityShop = new Shop([
    ItemList['Thunder_stone'],
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
    ItemList['Moon_stone'],
    ItemList['xClick'],
    ItemList['Leaf_stone'],
    ItemList['Earth_egg'],
]);
const FuchsiaCityShop = new Shop([
    ItemList['Ultraball'],
    ItemList['Trade_stone'],
    ItemList['Lucky_pill'],
    ItemList['Wind_egg'],
]);
const CinnabarIslandShop = new Shop([
    ItemList['Fire_stone'],
    ItemList['Fire_egg'],
    ItemList['SmallRestore'],
    ItemList['Explorer_kit'],
    ItemList['Explosive_Charge'],
    ItemList['Treasure_Scanner'],
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

const PalletProfOak = new ProfNPC('Prof. Oak',
    GameConstants.Region.kanto,
    'Congratulations on completing your Kanto Pokédex!',
    'Your journey isn\'t over yet, a whole world awaits you! Onwards to Johto!',
    'assets/images/oak.png');

const ViridianCityOldMan = new NPC('Old Man', [
    'In order to reduce server costs a caching system is in place.',
    'Sometimes when you venture in dungeons you might encounter hostile cached echos of tamers who were there before you.',
]);

const PewterBattleItemRival = new NPC('Battle Item Master', [
    'Hey kid, you look new! Let me offer some advice, Battle Items like xAttack can be acquired along Routes, inside Dungeons and in Shops!',
    'Use them to help you out whenever you feel like time is against you!',
]);

const Route3ShadySalesman = new NPC('Shady Salesman', [
    'Have I got a deal just for you!',
    'I\'ll let you have a super secret Pokémon. For the right price!',
]);

const CeruleanKantoBerryMaster = new KantoBerryMasterNPC('Berry Master', [
    'Bah! You younglings have no appreciation of the art of Berry farming!',
    'Come back when you are ready to learn!',
]);

const VermilionFanClubChairman = new NPC('Fan Club Chairman', [
    'You won’t find a Pokémon as wonderful as my favorite Rapidash in those Typed Eggs in the shops, but they might hatch rare Pokémon you can’t find anywhere else!',
]);

const LavenderMrFuji = new NPC('Mr. Fuji', [
    'Welcome. In our Volunteer House here we take in all kinds of Pokémon to care for them.',
    'Did you know that sparkling Pokémon are more often found in Dungeons, on Farms, from Eggs, and even from Shops, the Safari Zone, and Evolutions from Items?',
]);

const BigSpender = new NPC('Big Spender', [
    'I love shopping! When I come in, the cashiers know I want tons of items.',
    'You can use the Shop Amount Button settings to make it easy for big purchases, too!',
]);

const SaffronBattleItemRival = new NPC('Battle Item Master', [
    'Do I know you? Wait... Have you met my worthless rival? Ha! Let me guess, he gave you some unwanted advice?',
    'I bet he forget to tell you that although all Battle Items only last for 30 seconds they can stack and last for days! Now scram!',
]);

const FuchsiaKantoRoamerNPC = new RoamerNPC('Youngster Wendy', [
    'There\'s been some recent sightings of roaming Pokémon on {ROUTE_NAME}!',
], GameConstants.Region.kanto);

const CinnabarIslandResearcher = new NPC('Researcher', [
    'They were trying to clone an ancient Pokémon in the mansion, I wonder if they succeeded.',
    'Apparently the ancient Pokémon escaped, And can be found roaming around Kanto!',
]);

//Kanto Towns
TownList['Pallet Town'] = new Town(
    'Pallet Town',
    GameConstants.Region.kanto,
    [],
    {
        npcs: [PalletProfOak],
    }
);
TownList['Pewter City'] = new Town(
    'Pewter City',
    GameConstants.Region.kanto,
    [PewterCityShop],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.kanto, 2),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Viridian Forest')),
        ],
        npcs: [PewterBattleItemRival],
    }
);
TownList['Route 3 Pokémon Center'] = new Town(
    'Route 3 Pokémon Center',
    GameConstants.Region.kanto,
    [Route3Shop],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.kanto, 3),
        ],
        npcs: [Route3ShadySalesman],
    }
);
TownList['Cerulean City'] = new Town(
    'Cerulean City',
    GameConstants.Region.kanto,
    [CeruleanCityShop, new MoveToDungeon(dungeonList['Cerulean Cave'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kanto, 4)],
        npcs: [CeruleanKantoBerryMaster],
    }
);
TownList['Vermilion City'] = new Town(
    'Vermilion City',
    GameConstants.Region.kanto,
    [VermilionCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kanto, 6)],
        npcs: [VermilionFanClubChairman],
    }
);
TownList['Lavender Town'] = new Town(
    'Lavender Town',
    GameConstants.Region.kanto,
    [LavenderTownShop, new MoveToDungeon(dungeonList['Pokemon Tower'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kanto, 10)],
        npcs: [LavenderMrFuji],
    }
);
TownList['Celadon City'] = new Town(
    'Celadon City',
    GameConstants.Region.kanto,
    [CeladonDepartmentStoreShop, CeladonCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kanto, 7)],
        npcs: [BigSpender],
    }
);
TownList['Saffron City'] = new Town(
    'Saffron City',
    GameConstants.Region.kanto,
    [SaffronCityShop],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Rainbow)],
        npcs: [SaffronBattleItemRival],
    }
);
TownList['Fuchsia City'] = new Town(
    'Fuchsia City',
    GameConstants.Region.kanto,
    [FuchsiaCityShop],
    {
        requirements: [new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.kanto, 18),
            new RouteKillRequirement(10, GameConstants.Region.kanto, 15),
        ])],
        npcs: [FuchsiaKantoRoamerNPC],
    }
);
TownList['Cinnabar Island'] = new Town(
    'Cinnabar Island',
    GameConstants.Region.kanto,
    [CinnabarIslandShop, new MoveToDungeon(dungeonList['Pokemon Mansion'])],
    {
        requirements: [new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.kanto, 20),
            new RouteKillRequirement(10, GameConstants.Region.kanto, 21),
        ])],
        npcs: [CinnabarIslandResearcher],
    }
);
TownList['Viridian City'] = new Town(
    'Viridian City',
    GameConstants.Region.kanto,
    [ViridianCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kanto, 1)],
        npcs: [ViridianCityOldMan],
    }
);
TownList['Indigo Plateau Kanto'] = new Town(
    'Indigo Plateau Kanto',
    GameConstants.Region.kanto,
    [GymList['Elite Lorelei'], GymList['Elite Bruno'], GymList['Elite Agatha'], GymList['Elite Lance'], GymList['Champion Blue'], pokeLeagueShop()],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.kanto, 23),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road')),
        ],
    }

);

//Kanto Dungeons
TownList['Viridian Forest'] = new DungeonTown(
    'Viridian Forest',
    GameConstants.Region.kanto,
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 2)]
);
TownList['Mt. Moon'] = new DungeonTown(
    'Mt. Moon',
    GameConstants.Region.kanto,
    [new RouteKillRequirement(10, GameConstants.Region.kanto,3)]
);
TownList['Digletts Cave'] = new DungeonTown(
    'Digletts Cave',
    GameConstants.Region.kanto,
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 6)]
);
TownList['Rock Tunnel'] = new DungeonTown(
    'Rock Tunnel',
    GameConstants.Region.kanto,
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 9),
        new GymBadgeRequirement(BadgeEnums.Cascade),
    ]
);
TownList['Power Plant'] = new DungeonTown(
    'Power Plant',
    GameConstants.Region.kanto,
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 9),
        new GymBadgeRequirement(BadgeEnums.Soul),
    ]
);
TownList['Pokemon Tower'] = new DungeonTown(
    'Pokemon Tower',
    GameConstants.Region.kanto,
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 10),
        new GymBadgeRequirement(BadgeEnums.Rainbow),
    ]
);
TownList['Seafoam Islands'] = new DungeonTown(
    'Seafoam Islands',
    GameConstants.Region.kanto,
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 19)]
);
TownList['Pokemon Mansion'] = new DungeonTown(
    'Pokemon Mansion',
    GameConstants.Region.kanto,
    [new OneFromManyRequirement([
        new RouteKillRequirement(10, GameConstants.Region.kanto, 20),
        new RouteKillRequirement(10, GameConstants.Region.kanto, 21),
    ])]
);
TownList['Victory Road'] = new DungeonTown(
    'Victory Road',
    GameConstants.Region.kanto,
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 23)]
);
TownList['Cerulean Cave'] = new DungeonTown(
    'Cerulean Cave',
    GameConstants.Region.kanto,
    [new GymBadgeRequirement(BadgeEnums.Elite_KantoChampion)]
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
    ItemList['Leaf_stone'],
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
    ItemList['Fire_stone'],
]);
const OlivineCityShop = new Shop([
    ItemList['Metal_coat'],
    ItemList['Water_egg'],
    ItemList['Electric_egg'],
    ItemList['Water_stone'],
    ItemList['Thunder_stone'],
    ItemList['HatcheryHelperCarey'],
]);
const CianwoodCityShop = new Shop([
    ItemList['Ultraball'],
    ItemList['Earth_egg'],
    ItemList['Sun_stone'],
]);
const MahoganyTownShop = new Shop([
    ItemList['Upgrade'],
    ItemList['Trade_stone'],
    ItemList['HatcheryHelperDakota'],
]);
const BlackthornCityShop = new Shop([
    ItemList['LargeRestore'],
    ItemList['Dragon_scale'],
    ItemList['Wind_egg'],
]);

// Johto NPCs

const JohtoBerryMaster = new BerryMasterShop([
    ItemList['Boost_Mulch'],
    ItemList['Rich_Mulch'],
    ItemList['Surprise_Mulch'],
    ItemList['Amaze_Mulch'],
    ItemList['Berry_Shovel'],
    ItemList['Mulch_Shovel'],
    ItemList['Squirtbottle'],
    ItemList['FarmHandBailey'],
    ItemList['ChopleBerry'],
    ItemList['KebiaBerry'],
    ItemList['ShucaBerry'],
    ItemList['ChartiBerry'],
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
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_KantoChampion)],
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
    ItemList['Trade_stone'],
]);
const MauvilleCityShop = new Shop([
    ItemList['Electric_egg'],
    ItemList['Thunder_stone'],
    ItemList['Metal_coat'],
    ItemList['HatcheryHelperJasmine'],
]);
const VerdanturfTownShop = new Shop([
    ItemList['Plant_egg'],
    ItemList['Soothe_bell'],
]);
const LavaridgeTownShop = new Shop([
    ItemList['Fire_egg'],
    ItemList['Fire_stone'],
]);
const FallarborTownShop = new Shop([
    ItemList['Moon_stone'],
    ItemList['Sun_stone'],
]);
const FortreeCityShop = new Shop([
    ItemList['Ultraball'],
    ItemList['Leaf_stone'],
]);
const MossdeepCityShop = new Shop([
    ItemList['Burpmon'],
    ItemList['Prism_scale'],
    ItemList['Upgrade'],
]);
const SootopolisCityShop = new Shop([
    ItemList['Water_stone'],
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
    ItemList['Boost_Mulch'],
    ItemList['Rich_Mulch'],
    ItemList['Surprise_Mulch'],
    ItemList['Amaze_Mulch'],
    ItemList['Berry_Shovel'],
    ItemList['Mulch_Shovel'],
    ItemList['Sprinklotad'],
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
    ItemList['Moon_stone'],
    ItemList['Sun_stone'],
]);
const OreburghCityShop = new Shop([
    ItemList['Mystery_egg'],
]);
const FloaromaTownShop = new Shop([
    ItemList['Kings_rock'],
    ItemList['Trade_stone'],
]);
const EternaCityShop = new Shop([
    ItemList['Plant_egg'],
    ItemList['Leaf_stone'],
]);
const HearthomeCityShop = new Shop([
    ItemList['Greatball'],
    ItemList['Soothe_bell'],
    ItemList['Fire_egg'],
    ItemList['Fire_stone'],
]);
const SolaceonTownShop = new Shop([
    ItemList['Dawn_stone'],
    ItemList['Dusk_stone'],
    ItemList['Shiny_stone'],
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
    ItemList['Thunder_stone'],
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
    ItemList['Water_stone'],
    ItemList['Prism_scale'],
]);

//Sinnoh Berry Master
const SinnohBerryMaster = new BerryMasterShop([
    ItemList['Boost_Mulch'],
    ItemList['Rich_Mulch'],
    ItemList['Surprise_Mulch'],
    ItemList['Amaze_Mulch'],
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
    ItemList['Trade_stone'],
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
    ItemList['Thunder_stone'],
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
    ItemList['Moon_stone'],
    ItemList['Sun_stone'],
]);
const NacreneCityShop = new Shop([
    ItemList['Soothe_bell'],
]);
const StriatonCityShop = new Shop([
    ItemList['Leaf_stone'],
    ItemList['Water_stone'],
    ItemList['Fire_stone'],
]);
const AccumulaTownShop = new Shop([
    ItemList['Dusk_stone'],
    ItemList['Shiny_stone'],
    ItemList['Dawn_stone'],
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
        new ObtainedPokemonRequirement(pokemonMap.Keldeo),
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
        new ObtainedPokemonRequirement(pokemonMap.Tornadus),
        new ObtainedPokemonRequirement(pokemonMap.Thundurus),
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
        new ObtainedPokemonRequirement(pokemonMap.Cobalion),
        new ObtainedPokemonRequirement(pokemonMap.Terrakion),
        new ObtainedPokemonRequirement(pokemonMap.Virizion),
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
    ItemList['Thunder_stone'],
    ItemList['Electric_egg'],
]);
const AmbretteTownShop = new Shop([
    ItemList['Water_egg'],
    ItemList['Water_stone'],
]);
const GeosengeTownShop = new Shop([
    ItemList['Fire_egg'],
    ItemList['Fire_stone'],
    ItemList['Kings_rock'],
]);
const ShalourCityShop = new Shop([
    ItemList['Earth_egg'],
    ItemList['Metal_coat'],
    ItemList['Trade_stone'],
]);
const CoumarineCityShop = new Shop([
    ItemList['Ultraball'],
    ItemList['Plant_egg'],
    ItemList['Leaf_stone'],
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
    ItemList['Dusk_stone'],
    ItemList['Shiny_stone'],
    ItemList['Dawn_stone'],
    ItemList['Upgrade'],
]);
const AnistarCityShop = new Shop([
    ItemList['Sun_stone'],
    ItemList['Moon_stone'],
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
    ItemList['Shiny_stone'],
    ItemList['Dusk_stone'],
    ItemList['Dawn_stone'],
]);
const HeaheaCityShop = new Shop([
    ItemList['Greatball'],
    ItemList['Water_stone'],
    ItemList['Metal_coat'],
    ItemList['Kings_rock'],
]);
const PaniolaTownShop = new Shop([
    ItemList['Plant_egg'],
    ItemList['Fire_egg'],
    ItemList['Water_egg'],
]);
const KonikoniCityShop = new Shop([
    ItemList['Fire_stone'],
    ItemList['Soothe_bell'],
    ItemList['Trade_stone'],
]);
const AetherParadiseShop = new Shop([
    ItemList['Type: Null'],
    ItemList['Upgrade'],
]);
const MalieCityShop = new Shop([
    ItemList['Ultraball'],
    ItemList['Thunder_stone'],
    ItemList['Electric_egg'],
    ItemList['Magmarizer'],
    ItemList['Electirizer'],
]);
const TapuVillageShop = new Shop([
    ItemList['Ice_stone'],
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
    ItemList['Leaf_stone'],
    ItemList['Dragon_scale'],
    ItemList['Protector'],
    ItemList['Dubious_disc'],
    ItemList['Reaper_cloth'],
]);
const AltaroftheSunneandMooneShop = new Shop([
    ItemList['Poipole'],
    ItemList['Sun_stone'],
    ItemList['Moon_stone'],
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
    ItemList['Ice_stone'],
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
const Botamon = new Shop([
    ItemList['Burpmon'],
], 'Botamon');
const Punimon = new Shop([
    ItemList['Burpmon'],
], 'Punimon');
const Koromon = new Shop([
    ItemList['Burpmon'],
], 'Koromon');
const Tunomon = new Shop([
    ItemList['Burpmon'],
], 'Tunomon');
const Agumon = new Shop([
    ItemList['Burpmon'],
], 'Agumon');
const Betamon = new Shop([
    ItemList['Burpmon'],
], 'Betamon');
const DamemonCmon = new Shop([
    ItemList['Burpmon'],
], 'Damemon Cmon');
const Elecmon = new Shop([
    ItemList['Burpmon'],
], 'Elecmon');
const Gabumon = new Shop([
    ItemList['Burpmon'],
], 'Gabumon');
const Airdramon = new Shop([
    ItemList['Burpmon'],
], 'Airdramon');
const Angemon = new Shop([
    ItemList['Burpmon'],
], 'Angemon');
const Birdramon = new Shop([
    ItemList['Burpmon'],
], 'Birdramon');
const Devimon = new Shop([
    ItemList['Burpmon'],
], 'Devimon');
const Garurumon = new Shop([
    ItemList['Burpmon'],
], 'Garurumon');
const Greymon = new Shop([
    ItemList['Burpmon'],
], 'Greymon');
const Kabuterimon = new Shop([
    ItemList['Burpmon'],
], 'Kabuterimon');
const Meramon = new Shop([
    ItemList['Burpmon'],
], 'Meramon');
const Numemon = new Shop([
    ItemList['Burpmon'],
], 'Numemon');
const Seadramon = new Shop([
    ItemList['Burpmon'],
], 'Seadramon');
const Tyranomon = new Shop([
    ItemList['Burpmon'],
], 'Tyranomon');
const Vegimon = new Shop([
    ItemList['Burpmon'],
], 'Vegimon');
const Whamon = new Shop([
    ItemList['Burpmon'],
], 'Whamon');
const Yukidarumon = new Shop([
    ItemList['Burpmon'],
], 'Yukidarumon');
const Mamemon = new Shop([
    ItemList['Burpmon'],
], 'Mamemon');
const MetalGreymonVirus = new Shop([
    ItemList['Burpmon'],
], 'Metal Greymon Virus');
const MetalMamemon = new Shop([
    ItemList['Burpmon'],
], 'Metal Mamemon');
const Monzaemon = new Shop([
    ItemList['Burpmon'],
], 'Monzaemon');
const SkullGreymon = new Shop([
    ItemList['Burpmon'],
], 'Skull Greymon');
const Vademon = new Shop([
    ItemList['Burpmon'],
], 'Vademon');
const DeathmonCmon = new Shop([
    ItemList['Burpmon'],
], 'Deathmon Cmon');
const Bubbmon = new Shop([
    ItemList['Burpmon'],
], 'Bubbmon');
const Pitchmon = new Shop([
    ItemList['Burpmon'],
], 'Pitchmon');
const Poyomon = new Shop([
    ItemList['Burpmon'],
], 'Poyomon');
const Yuramon = new Shop([
    ItemList['Burpmon'],
], 'Yuramon');
const Zurumon = new Shop([
    ItemList['Burpmon'],
], 'Zurumon');
const Mochimon = new Shop([
    ItemList['Burpmon'],
], 'Mochimon');
const Pagumon = new Shop([
    ItemList['Burpmon'],
], 'Pagumon');
const Pukamon = new Shop([
    ItemList['Burpmon'],
], 'Pukamon');
const Tanemon = new Shop([
    ItemList['Burpmon'],
], 'Tanemon');
const Tokomon = new Shop([
    ItemList['Burpmon'],
], 'Tokomon');
const Ganimon = new Shop([
    ItemList['Burpmon'],
], 'Ganimon');
const Gazimon = new Shop([
    ItemList['Burpmon'],
], 'Gazimon');
const Gizamon = new Shop([
    ItemList['Burpmon'],
], 'Gizamon');
const Gomamon = new Shop([
    ItemList['Burpmon'],
], 'Gomamon');
const Gottsumon = new Shop([
    ItemList['Burpmon'],
], 'Gottsumon');
const Kunemon = new Shop([
    ItemList['Burpmon'],
], 'Kunemon');
const Otamamon = new Shop([
    ItemList['Burpmon'],
], 'Otamamon');
const Palmon = new Shop([
    ItemList['Burpmon'],
], 'Palmon');
const Patamon = new Shop([
    ItemList['Burpmon'],
], 'Patamon');
const Piyomon = new Shop([
    ItemList['Burpmon'],
], 'Piyomon');
const Shakomon = new Shop([
    ItemList['Burpmon'],
], 'Shakomon');
const Tentomon = new Shop([
    ItemList['Burpmon'],
], 'Tentomon');
const Tyumon = new Shop([
    ItemList['Burpmon'],
], 'Tyumon');
const Bakemon = new Shop([
    ItemList['Burpmon'],
], 'Bakemon');
const Centalmon = new Shop([
    ItemList['Burpmon'],
], 'Centalmon');
const Cockatrimon = new Shop([
    ItemList['Burpmon'],
], 'Cockatrimon');
const Coelamon = new Shop([
    ItemList['Burpmon'],
], 'Coelamon');
const Cyclomon = new Shop([
    ItemList['Burpmon'],
], 'Cyclomon');
const DarkTyranomon = new Shop([
    ItemList['Burpmon'],
], 'Dark Tyranomon');
const Deltamon = new Shop([
    ItemList['Burpmon'],
], 'Deltamon');
const Devidramon = new Shop([
    ItemList['Burpmon'],
], 'Devidramon');
const Drimogemon = new Shop([
    ItemList['Burpmon'],
], 'Drimogemon');
const Ebidramon = new Shop([
    ItemList['Burpmon'],
], 'Ebidramon');
const Evilmon = new Shop([
    ItemList['Burpmon'],
], 'Evilmon');
const Flymon = new Shop([
    ItemList['Burpmon'],
], 'Flymon');
const Gekomon = new Shop([
    ItemList['Burpmon'],
], 'Gekomon');
const Gesomon = new Shop([
    ItemList['Burpmon'],
], 'Gesomon');
const Gokimon = new Shop([
    ItemList['Burpmon'],
], 'Gokimon');
const Gorimon = new Shop([
    ItemList['Burpmon'],
], 'Gorimon');
const Ikkakumon = new Shop([
    ItemList['Burpmon'],
], 'Ikkakumon');
const Kuwagamon = new Shop([
    ItemList['Burpmon'],
], 'Kuwagamon');
const Leomon = new Shop([
    ItemList['Burpmon'],
], 'Leomon');
const Mechanorimon = new Shop([
    ItemList['Burpmon'],
], 'Mechanorimon');
const Minotaurmon = new Shop([
    ItemList['Burpmon'],
], 'Minotaurmon');
const Mojyamon = new Shop([
    ItemList['Burpmon'],
], 'Mojyamon');
const Monochromon = new Shop([
    ItemList['Burpmon'],
], 'Monochromon');
const Nanimon = new Shop([
    ItemList['Burpmon'],
], 'Nanimon');
const Octmon = new Shop([
    ItemList['Burpmon'],
], 'Octmon');
const Orgemon = new Shop([
    ItemList['Burpmon'],
], 'Orgemon');
const Raremon = new Shop([
    ItemList['Burpmon'],
], 'Raremon');
const Rukamon = new Shop([
    ItemList['Burpmon'],
], 'Rukamon');
const Scumon = new Shop([
    ItemList['Burpmon'],
], 'Scumon');
const Shellmon = new Shop([
    ItemList['Burpmon'],
], 'Shellmon');
const Starmon = new Shop([
    ItemList['Burpmon'],
], 'Starmon');
const Tailmon = new Shop([
    ItemList['Burpmon'],
], 'Tailmon');
const Tortamon = new Shop([
    ItemList['Burpmon'],
], 'Tortamon');
const Tuskmon = new Shop([
    ItemList['Burpmon'],
], 'Tuskmon');
const Unimon = new Shop([
    ItemList['Burpmon'],
], 'Unimon');
const V-dramon = new Shop([
    ItemList['Burpmon'],
], 'V-dramon');
const Andromon = new Shop([
    ItemList['Burpmon'],
], 'Andromon');
const Angewomon = new Shop([
    ItemList['Burpmon'],
], 'Angewomon');
const Anomalocarimon = new Shop([
    ItemList['Burpmon'],
], 'Anomalocarimon');
const AtlurKabuterimonBlue = new Shop([
    ItemList['Burpmon'],
], 'Atlur Kabuterimon Blue');
const Dagomon = new Shop([
    ItemList['Burpmon'],
], 'Dagomon');
const Digitamamon = new Shop([
    ItemList['Burpmon'],
], 'Digitamamon');
const Etemon = new Shop([
    ItemList['Burpmon'],
], 'Etemon');
const Ex-Tyranomon = new Shop([
    ItemList['Burpmon'],
], 'Ex-Tyranomon');
const Giromon = new Shop([
    ItemList['Burpmon'],
], 'Giromon');
const HolyAngemon = new Shop([
    ItemList['Burpmon'],
], 'Holy Angemon');
const Jyagamon = new Shop([
    ItemList['Burpmon'],
], 'Jyagamon');
const LadyDevimon = new Shop([
    ItemList['Burpmon'],
], 'Lady Devimon');
const Mammon = new Shop([
    ItemList['Burpmon'],
], 'Mammon');
const MarinDevimon = new Shop([
    ItemList['Burpmon'],
], 'Marin Devimon');
const MegaSeadramon = new Shop([
    ItemList['Burpmon'],
], 'Mega Seadramon');
const Megadramon = new Shop([
    ItemList['Burpmon'],
], 'Megadramon');
const MetalTyranomon = new Shop([
    ItemList['Burpmon'],
], 'Metal Tyranomon');
const Nanomon = new Shop([
    ItemList['Burpmon'],
], 'Nanomon');
const Ookuwamon = new Shop([
    ItemList['Burpmon'],
], 'Ookuwamon');
const Piccolomon = new Shop([
    ItemList['Burpmon'],
], 'Piccolomon');
const TonosamaGekomon = new Shop([
    ItemList['Burpmon'],
], 'Tonosama Gekomon');
const Triceramon = new Shop([
    ItemList['Burpmon'],
], 'Triceramon');
const WhamonPerfect = new Shop([
    ItemList['Burpmon'],
], 'Whamon Perfect');
const Zudomon = new Shop([
    ItemList['Burpmon'],
], 'Zudomon');
const HerakleKabuterimon = new Shop([
    ItemList['Burpmon'],
], 'Herakle Kabuterimon');
const Holydramon = new Shop([
    ItemList['Burpmon'],
], 'Holydramon');
const MarinAngemon = new Shop([
    ItemList['Burpmon'],
], 'Marin Angemon');
const MetalEtemon = new Shop([
    ItemList['Burpmon'],
], 'Metal Etemon');
const MetalSeadramon = new Shop([
    ItemList['Burpmon'],
], 'Metal Seadramon');
const Pukumon = new Shop([
    ItemList['Burpmon'],
], 'Pukumon');
const SaberLeomon = new Shop([
    ItemList['Burpmon'],
], 'Saber Leomon');
const HolyAngemonPriestMode = new Shop([
    ItemList['Burpmon'],
], 'Holy Angemon Priest Mode');
const Choromon = new Shop([
    ItemList['Burpmon'],
], 'Choromon');
const Mokumon = new Shop([
    ItemList['Burpmon'],
], 'Mokumon');
const Nyokimon = new Shop([
    ItemList['Burpmon'],
], 'Nyokimon');
const YukimiBotamon = new Shop([
    ItemList['Burpmon'],
], 'Yukimi Botamon');
const Caprimon = new Shop([
    ItemList['Burpmon'],
], 'Caprimon');
const Nyaromon = new Shop([
    ItemList['Burpmon'],
], 'Nyaromon');
const PetiMeramon = new Shop([
    ItemList['Burpmon'],
], 'Peti Meramon');
const Pyocomon = new Shop([
    ItemList['Burpmon'],
], 'Pyocomon');
const Alraumon = new Shop([
    ItemList['Burpmon'],
], 'Alraumon');
const Bakumon = new Shop([
    ItemList['Burpmon'],
], 'Bakumon');
const Candmon = new Shop([
    ItemList['Burpmon'],
], 'Candmon');
const ClearAgumon = new Shop([
    ItemList['Burpmon'],
], 'Clear Agumon');
const Dokunemon = new Shop([
    ItemList['Burpmon'],
], 'Dokunemon');
const Floramon = new Shop([
    ItemList['Burpmon'],
], 'Floramon');
const Goburimon = new Shop([
    ItemList['Burpmon'],
], 'Goburimon');
const Hagurumon = new Shop([
    ItemList['Burpmon'],
], 'Hagurumon');
const Kokuwamon = new Shop([
    ItemList['Burpmon'],
], 'Kokuwamon');
const ModokiBetamon = new Shop([
    ItemList['Burpmon'],
], 'Modoki Betamon');
const Muchomon = new Shop([
    ItemList['Burpmon'],
], 'Muchomon');
const Mushmon = new Shop([
    ItemList['Burpmon'],
], 'Mushmon');
const Penmon = new Shop([
    ItemList['Burpmon'],
], 'Penmon');
const PicoDevimon = new Shop([
    ItemList['Burpmon'],
], 'Pico Devimon');
const Plotmon = new Shop([
    ItemList['Burpmon'],
], 'Plotmon');
const Psychemon = new Shop([
    ItemList['Burpmon'],
], 'Psychemon');
const Shamamon = new Shop([
    ItemList['Burpmon'],
], 'Shamamon');
const SnowGoburimon = new Shop([
    ItemList['Burpmon'],
], 'Snow Goburimon');
const ToyAgumon = new Shop([
    ItemList['Burpmon'],
], 'Toy Agumon');
const Tukaimon = new Shop([
    ItemList['Burpmon'],
], 'Tukaimon');
const YukiAgumon = new Shop([
    ItemList['Burpmon'],
], 'Yuki Agumon');
const Akatorimon = new Shop([
    ItemList['Burpmon'],
], 'Akatorimon');
const Clockmon = new Shop([
    ItemList['Burpmon'],
], 'Clockmon');
const DarkLizamon = new Shop([
    ItemList['Burpmon'],
], 'Dark Lizamon');
const Dokugumon = new Shop([
    ItemList['Burpmon'],
], 'Dokugumon');
const FlareLizarmon = new Shop([
    ItemList['Burpmon'],
], 'Flare Lizarmon');
const Fugamon = new Shop([
    ItemList['Burpmon'],
], 'Fugamon');
const Geremon = new Shop([
    ItemList['Burpmon'],
], 'Geremon');
const Golemon = new Shop([
    ItemList['Burpmon'],
], 'Golemon');
const GolemonPS = new Shop([
    ItemList['Burpmon'],
], 'Golemon PS');
const Guardromon = new Shop([
    ItemList['Burpmon'],
], 'Guardromon');
const Gururumon = new Shop([
    ItemList['Burpmon'],
], 'Gururumon');
const Hanumon = new Shop([
    ItemList['Burpmon'],
], 'Hanumon');
const Hyougamon = new Shop([
    ItemList['Burpmon'],
], 'Hyougamon');
const IceDevimon = new Shop([
    ItemList['Burpmon'],
], 'Ice Devimon');
const Icemon = new Shop([
    ItemList['Burpmon'],
], 'Icemon');
const Igamon = new Shop([
    ItemList['Burpmon'],
], 'Igamon');
const JungleMojyamon = new Shop([
    ItemList['Burpmon'],
], 'Jungle Mojyamon');
const KaratukiNumemon = new Shop([
    ItemList['Burpmon'],
], 'Karatuki Numemon');
const Kiwimon = new Shop([
    ItemList['Burpmon'],
], 'Kiwimon');
const MoriShellmon = new Shop([
    ItemList['Burpmon'],
], 'Mori Shellmon');
const Musyamon = new Shop([
    ItemList['Burpmon'],
], 'Musyamon');
const NiseDrimogemon = new Shop([
    ItemList['Burpmon'],
], 'Nise Drimogemon');
const Pidmon = new Shop([
    ItemList['Burpmon'],
], 'Pidmon');
const PlatinumScumon = new Shop([
    ItemList['Burpmon'],
], 'Platinum Scumon');
const RedVegimon = new Shop([
    ItemList['Burpmon'],
], 'Red Vegimon');
const Revolmon = new Shop([
    ItemList['Burpmon'],
], 'Revolmon');
const Saberdramon = new Shop([
    ItemList['Burpmon'],
], 'Saberdramon');
const SandYanmamon = new Shop([
    ItemList['Burpmon'],
], 'Sand Yanmamon');
const ShimaUnimon = new Shop([
    ItemList['Burpmon'],
], 'Shima Unimon');
const Snimon = new Shop([
    ItemList['Burpmon'],
], 'Snimon');
const Soulmon = new Shop([
    ItemList['Burpmon'],
], 'Soulmon');
const Tankmon = new Shop([
    ItemList['Burpmon'],
], 'Tankmon');
const Thunderballmon = new Shop([
    ItemList['Burpmon'],
], 'Thunderballmon');
const Togemon = new Shop([
    ItemList['Burpmon'],
], 'Togemon');
const Tuchidarumon = new Shop([
    ItemList['Burpmon'],
], 'Tuchidarumon');
const Wizarmon = new Shop([
    ItemList['Burpmon'],
], 'Wizarmon');
const Woodmon = new Shop([
    ItemList['Burpmon'],
], 'Woodmon');
const Yanmamon = new Shop([
    ItemList['Burpmon'],
], 'Yanmamon');
const Zassoumon = new Shop([
    ItemList['Burpmon'],
], 'Zassoumon');
const AeroV-dramon = new Shop([
    ItemList['Burpmon'],
], 'Aero V-dramon');
const Asuramon = new Shop([
    ItemList['Burpmon'],
], 'Asuramon');
const AtlurKabuterimonRed = new Shop([
    ItemList['Burpmon'],
], 'Atlur Kabuterimon Red');
const BigMamemon = new Shop([
    ItemList['Burpmon'],
], 'Big Mamemon');
const Blikmon = new Shop([
    ItemList['Burpmon'],
], 'Blikmon');
const Blossomon = new Shop([
    ItemList['Burpmon'],
], 'Blossomon');
const BlueMeramon = new Shop([
    ItemList['Burpmon'],
], 'Blue Meramon');
const Brachimon = new Shop([
    ItemList['Burpmon'],
], 'Brachimon');
const Chimairamon = new Shop([
    ItemList['Burpmon'],
], 'Chimairamon');
const DeathMeramon = new Shop([
    ItemList['Burpmon'],
], 'Death Meramon');
const Delumon = new Shop([
    ItemList['Burpmon'],
], 'Delumon');
const Fantomon = new Shop([
    ItemList['Burpmon'],
], 'Fantomon');
const Garudamon = new Shop([
    ItemList['Burpmon'],
], 'Garudamon');
const Gerbemon = new Shop([
    ItemList['Burpmon'],
], 'Gerbemon');
const Gigadramon = new Shop([
    ItemList['Burpmon'],
], 'Gigadramon');
const GreatKingScumon = new Shop([
    ItemList['Burpmon'],
], 'Great King Scumon');
const Hangyomon = new Shop([
    ItemList['Burpmon'],
], 'Hangyomon');
const Insekimon = new Shop([
    ItemList['Burpmon'],
], 'Insekimon');
const Jijimon = new Shop([
    ItemList['Burpmon'],
], 'Jijimon');
const Jyureimon = new Shop([
    ItemList['Burpmon'],
], 'Jyureimon');
const Knightmon = new Shop([
    ItemList['Burpmon'],
], 'Knightmon');
const Lilimon = new Shop([
    ItemList['Burpmon'],
], 'Lilimon');
const MasterTyranomon = new Shop([
    ItemList['Burpmon'],
], 'Master Tyranomon');
const MetalGreymon = new Shop([
    ItemList['Burpmon'],
], 'Metal Greymon');
const Panjyamon = new Shop([
    ItemList['Burpmon'],
], 'Panjyamon');
const Parrotmon = new Shop([
    ItemList['Burpmon'],
], 'Parrotmon');
const Pumpmon = new Shop([
    ItemList['Burpmon'],
], 'Pumpmon');
const SkullSatamon = new Shop([
    ItemList['Burpmon'],
], 'Skull Satamon');
const Tekkamon = new Shop([
    ItemList['Burpmon'],
], 'Tekkamon');
const Vamdemon = new Shop([
    ItemList['Burpmon'],
], 'Vamdemon');
const Vermillimon = new Shop([
    ItemList['Burpmon'],
], 'Vermillimon');
const WaruMonzaemon = new Shop([
    ItemList['Burpmon'],
], 'Waru Monzaemon');
const WaruSeadramon = new Shop([
    ItemList['Burpmon'],
], 'Waru Seadramon');
const WereGarurumon = new Shop([
    ItemList['Burpmon'],
], 'Were Garurumon');
const Apocalymon = new Shop([
    ItemList['Burpmon'],
], 'Apocalymon');
const Babamon = new Shop([
    ItemList['Burpmon'],
], 'Babamon');
const Boltmon = new Shop([
    ItemList['Burpmon'],
], 'Boltmon');
const Demon = new Shop([
    ItemList['Burpmon'],
], 'Demon');
const Diablomon = new Shop([
    ItemList['Burpmon'],
], 'Diablomon');
const Goddramon = new Shop([
    ItemList['Burpmon'],
], 'Goddramon');
const Griffomon = new Shop([
    ItemList['Burpmon'],
], 'Griffomon');
const Hououmon = new Shop([
    ItemList['Burpmon'],
], 'Hououmon');
const KingEtemon = new Shop([
    ItemList['Burpmon'],
], 'King Etemon');
const MetalGarurumon = new Shop([
    ItemList['Burpmon'],
], 'Metal Garurumon');
const Millenniumon = new Shop([
    ItemList['Burpmon'],
], 'Millenniumon');
const Mugendramon = new Shop([
    ItemList['Burpmon'],
], 'Mugendramon');
const Omegamon = new Shop([
    ItemList['Burpmon'],
], 'Omegamon');
const Piemon = new Shop([
    ItemList['Burpmon'],
], 'Piemon');
const Pinochimon = new Shop([
    ItemList['Burpmon'],
], 'Pinochimon');
const Plesiomon = new Shop([
    ItemList['Burpmon'],
], 'Plesiomon');
const Rosemon = new Shop([
    ItemList['Burpmon'],
], 'Rosemon');
const SkullMammon = new Shop([
    ItemList['Burpmon'],
], 'Skull Mammon');
const VenomVamdemon = new Shop([
    ItemList['Burpmon'],
], 'Venom Vamdemon');
const WarGreymon = new Shop([
    ItemList['Burpmon'],
], 'War Greymon');
const Chicomon = new Shop([
    ItemList['Burpmon'],
], 'Chicomon');
const Cocomon = new Shop([
    ItemList['Burpmon'],
], 'Cocomon');
const Kuramon = new Shop([
    ItemList['Burpmon'],
], 'Kuramon');
const Leafmon = new Shop([
    ItemList['Burpmon'],
], 'Leafmon');
const Pururumon = new Shop([
    ItemList['Burpmon'],
], 'Pururumon');
const Tsubumon = new Shop([
    ItemList['Burpmon'],
], 'Tsubumon');
const Zerimon = new Shop([
    ItemList['Burpmon'],
], 'Zerimon');
const ArkadimonBaby = new Shop([
    ItemList['Burpmon'],
], 'Arkadimon Baby');
const Chibimon = new Shop([
    ItemList['Burpmon'],
], 'Chibimon');
const Chocomon = new Shop([
    ItemList['Burpmon'],
], 'Chocomon');
const Gummymon = new Shop([
    ItemList['Burpmon'],
], 'Gummymon');
const Minomon = new Shop([
    ItemList['Burpmon'],
], 'Minomon');
const Poromon = new Shop([
    ItemList['Burpmon'],
], 'Poromon');
const Tsumemon = new Shop([
    ItemList['Burpmon'],
], 'Tsumemon');
const Upamon = new Shop([
    ItemList['Burpmon'],
], 'Upamon');
const AgumonBlack = new Shop([
    ItemList['Burpmon'],
], 'Agumon Black');
const Armadimon = new Shop([
    ItemList['Burpmon'],
], 'Armadimon');
const ElecmonViolet = new Shop([
    ItemList['Burpmon'],
], 'Elecmon Violet');
const GabumonBlack = new Shop([
    ItemList['Burpmon'],
], 'Gabumon Black');
const Hawkmon = new Shop([
    ItemList['Burpmon'],
], 'Hawkmon');
const Keramon = new Shop([
    ItemList['Burpmon'],
], 'Keramon');
const Lopmon = new Shop([
    ItemList['Burpmon'],
], 'Lopmon');
const OtamamonRed = new Shop([
    ItemList['Burpmon'],
], 'Otamamon Red');
const Solarmon = new Shop([
    ItemList['Burpmon'],
], 'Solarmon');
const Terriermon = new Shop([
    ItemList['Burpmon'],
], 'Terriermon');
const ToyAgumonBlack = new Shop([
    ItemList['Burpmon'],
], 'Toy Agumon Black');
const V-mon = new Shop([
    ItemList['Burpmon'],
], 'V-mon');
const Wormmon = new Shop([
    ItemList['Burpmon'],
], 'Wormmon');
const Ankylomon = new Shop([
    ItemList['Burpmon'],
], 'Ankylomon');
const Aquilamon = new Shop([
    ItemList['Burpmon'],
], 'Aquilamon');
const BlackTailmon = new Shop([
    ItemList['Burpmon'],
], 'Black Tailmon');
const BomberNanimon = new Shop([
    ItemList['Burpmon'],
], 'Bomber Nanimon');
const Chrysalimon = new Shop([
    ItemList['Burpmon'],
], 'Chrysalimon');
const Galgomon = new Shop([
    ItemList['Burpmon'],
], 'Galgomon');
const GarurumonBlack = new Shop([
    ItemList['Burpmon'],
], 'Garurumon Black');
const GreymonBlue = new Shop([
    ItemList['Burpmon'],
], 'Greymon Blue');
const RedV-dramon = new Shop([
    ItemList['Burpmon'],
], 'Red V-dramon');
const Sorcerimon = new Shop([
    ItemList['Burpmon'],
], 'Sorcerimon');
const Stingmon = new Shop([
    ItemList['Burpmon'],
], 'Stingmon');
const Wendimon = new Shop([
    ItemList['Burpmon'],
], 'Wendimon');
const XV-mon = new Shop([
    ItemList['Burpmon'],
], 'XV-mon');
const Andiramon = new Shop([
    ItemList['Burpmon'],
], 'Andiramon');
const Archnemon = new Shop([
    ItemList['Burpmon'],
], 'Archnemon');
const Cyberdramon = new Shop([
    ItemList['Burpmon'],
], 'Cyberdramon');
const Dinobeemon = new Shop([
    ItemList['Burpmon'],
], 'Dinobeemon');
const Infermon = new Shop([
    ItemList['Burpmon'],
], 'Infermon');
const Mummymon = new Shop([
    ItemList['Burpmon'],
], 'Mummymon');
const Paildramon = new Shop([
    ItemList['Burpmon'],
], 'Paildramon');
const Shakkoumon = new Shop([
    ItemList['Burpmon'],
], 'Shakkoumon');
const Silphymon = new Shop([
    ItemList['Burpmon'],
], 'Silphymon');
const Superstarmon = new Shop([
    ItemList['Burpmon'],
], 'Superstarmon');
const Volcamon = new Shop([
    ItemList['Burpmon'],
], 'Volcamon');
const WereGarurumonBlack = new Shop([
    ItemList['Burpmon'],
], 'Were Garurumon Black');
const Baihumon = new Shop([
    ItemList['Burpmon'],
], 'Baihumon');
const BelialVamdemon = new Shop([
    ItemList['Burpmon'],
], 'Belial Vamdemon');
const BlackWarGreymon = new Shop([
    ItemList['Burpmon'],
], 'Black War Greymon');
const ChaosGreymon = new Shop([
    ItemList['Burpmon'],
], 'Chaos Greymon');
const ChaosLord = new Shop([
    ItemList['Burpmon'],
], 'Chaos Lord');
const ChaosPiemon = new Shop([
    ItemList['Burpmon'],
], 'Chaos Piemon');
const ChaosSeadramon = new Shop([
    ItemList['Burpmon'],
], 'Chaos Seadramon');
const CherubimonVice = new Shop([
    ItemList['Burpmon'],
], 'Cherubimon Vice');
const CherubimonVirtue = new Shop([
    ItemList['Burpmon'],
], 'Cherubimon Virtue');
const Crossmon = new Shop([
    ItemList['Burpmon'],
], 'Crossmon');
const Deathmon = new Shop([
    ItemList['Burpmon'],
], 'Deathmon');
const DeathmonBlack = new Shop([
    ItemList['Burpmon'],
], 'Deathmon Black');
const Devitamamon = new Shop([
    ItemList['Burpmon'],
], 'Devitamamon');
const Ebemon = new Shop([
    ItemList['Burpmon'],
], 'Ebemon');
const GranKuwagamon = new Shop([
    ItemList['Burpmon'],
], 'Gran Kuwagamon');
const HiAndromon = new Shop([
    ItemList['Burpmon'],
], 'Hi Andromon');
const ImperialdramonDragonMode = new Shop([
    ItemList['Burpmon'],
], 'Imperialdramon Dragon Mode');
const ImperialdramonDragonModeBlack = new Shop([
    ItemList['Burpmon'],
], 'Imperialdramon Dragon Mode Black');
const ImperialdramonFighterMode = new Shop([
    ItemList['Burpmon'],
], 'Imperialdramon Fighter Mode');
const Lampmon = new Shop([
    ItemList['Burpmon'],
], 'Lampmon');
const MetalGarurumonBlack = new Shop([
    ItemList['Burpmon'],
], 'Metal Garurumon Black');
const Moon=Millenniumon = new Shop([
    ItemList['Burpmon'],
], 'Moon=Millenniumon');
const Pharaohmon = new Shop([
    ItemList['Burpmon'],
], 'Pharaohmon');
const PrinceMamemon = new Shop([
    ItemList['Burpmon'],
], 'Prince Mamemon');
const Qinglongmon = new Shop([
    ItemList['Burpmon'],
], 'Qinglongmon');
const Seraphimon = new Shop([
    ItemList['Burpmon'],
], 'Seraphimon');
const Valkyrimon = new Shop([
    ItemList['Burpmon'],
], 'Valkyrimon');
const Vikemon = new Shop([
    ItemList['Burpmon'],
], 'Vikemon');
const Xuanwumon = new Shop([
    ItemList['Burpmon'],
], 'Xuanwumon');
const Zanbamon = new Shop([
    ItemList['Burpmon'],
], 'Zanbamon');
const Zhuqiaomon = new Shop([
    ItemList['Burpmon'],
], 'Zhuqiaomon');
const Allomon = new Shop([
    ItemList['Burpmon'],
], 'Allomon');
const Archelomon = new Shop([
    ItemList['Burpmon'],
], 'Archelomon');
const Baromon = new Shop([
    ItemList['Burpmon'],
], 'Baromon');
const Bitmon = new Shop([
    ItemList['Burpmon'],
], 'Bitmon');
const Boarmon = new Shop([
    ItemList['Burpmon'],
], 'Boarmon');
const Bullmon = new Shop([
    ItemList['Burpmon'],
], 'Bullmon');
const Butterflamon = new Shop([
    ItemList['Burpmon'],
], 'Butterflamon');
const Chamelemon = new Shop([
    ItemList['Burpmon'],
], 'Chamelemon');
const Coatlmon = new Shop([
    ItemList['Burpmon'],
], 'Coatlmon');
const Depthmon = new Shop([
    ItemList['Burpmon'],
], 'Depthmon');
const Digmon = new Shop([
    ItemList['Burpmon'],
], 'Digmon');
const Elephamon = new Shop([
    ItemList['Burpmon'],
], 'Elephamon');
const Fladramon = new Shop([
    ItemList['Burpmon'],
], 'Fladramon');
const Flybeemon = new Shop([
    ItemList['Burpmon'],
], 'Flybeemon');
const Frogmon = new Shop([
    ItemList['Burpmon'],
], 'Frogmon');
const Gargomon = new Shop([
    ItemList['Burpmon'],
], 'Gargomon');
const Goatmon = new Shop([
    ItemList['Burpmon'],
], 'Goatmon');
const GoldV-dramon = new Shop([
    ItemList['Burpmon'],
], 'Gold V-dramon');
const Harpymon = new Shop([
    ItemList['Burpmon'],
], 'Harpymon');
const Holsmon = new Shop([
    ItemList['Burpmon'],
], 'Holsmon');
const Honeybeemon = new Shop([
    ItemList['Burpmon'],
], 'Honeybeemon');
const Kabukimon = new Shop([
    ItemList['Burpmon'],
], 'Kabukimon');
const Kangarumon = new Shop([
    ItemList['Burpmon'],
], 'Kangarumon');
const Kongoumon = new Shop([
    ItemList['Burpmon'],
], 'Kongoumon');
const Lighdramon = new Shop([
    ItemList['Burpmon'],
], 'Lighdramon');
const Lynxmon = new Shop([
    ItemList['Burpmon'],
], 'Lynxmon');
const Magnamon = new Shop([
    ItemList['Burpmon'],
], 'Magnamon');
const Maildramon = new Shop([
    ItemList['Burpmon'],
], 'Maildramon');
const Manbomon = new Shop([
    ItemList['Burpmon'],
], 'Manbomon');
const Mantaraymon = new Shop([
    ItemList['Burpmon'],
], 'Mantaraymon');
const Moosemon = new Shop([
    ItemList['Burpmon'],
], 'Moosemon');
const Mothmon = new Shop([
    ItemList['Burpmon'],
], 'Mothmon');
const Nefertimon = new Shop([
    ItemList['Burpmon'],
], 'Nefertimon');
const Nohemon = new Shop([
    ItemList['Burpmon'],
], 'Nohemon');
const Opossummon = new Shop([
    ItemList['Burpmon'],
], 'Opossummon');
const Orcamon = new Shop([
    ItemList['Burpmon'],
], 'Orcamon');
const Owlmon = new Shop([
    ItemList['Burpmon'],
], 'Owlmon');
const Peacockmon = new Shop([
    ItemList['Burpmon'],
], 'Peacockmon');
const Pegasmon = new Shop([
    ItemList['Burpmon'],
], 'Pegasmon');
const Pipismon = new Shop([
    ItemList['Burpmon'],
], 'Pipismon');
const Ponchomon = new Shop([
    ItemList['Burpmon'],
], 'Ponchomon');
const Prairiemon = new Shop([
    ItemList['Burpmon'],
], 'Prairiemon');
const Pteranomon = new Shop([
    ItemList['Burpmon'],
], 'Pteranomon');
const Pucchiemon = new Shop([
    ItemList['Burpmon'],
], 'Pucchiemon');
const PucchiemonGreen = new Shop([
    ItemList['Burpmon'],
], 'Pucchiemon Green');
const RapidmonArmor = new Shop([
    ItemList['Burpmon'],
], 'Rapidmon Armor');
const Rhinomon = new Shop([
    ItemList['Burpmon'],
], 'Rhinomon');
const Rinkmon = new Shop([
    ItemList['Burpmon'],
], 'Rinkmon');
const Sagittarimon = new Shop([
    ItemList['Burpmon'],
], 'Sagittarimon');
const Seahomon = new Shop([
    ItemList['Burpmon'],
], 'Seahomon');
const Searchmon = new Shop([
    ItemList['Burpmon'],
], 'Searchmon');
const Sepikmon = new Shop([
    ItemList['Burpmon'],
], 'Sepikmon');
const Sethmon = new Shop([
    ItemList['Burpmon'],
], 'Sethmon');
const Shadramon = new Shop([
    ItemList['Burpmon'],
], 'Shadramon');
const Sheepmon = new Shop([
    ItemList['Burpmon'],
], 'Sheepmon');
const Shurimon = new Shop([
    ItemList['Burpmon'],
], 'Shurimon');
const Stegomon = new Shop([
    ItemList['Burpmon'],
], 'Stegomon');
const Submarimon = new Shop([
    ItemList['Burpmon'],
], 'Submarimon');
const Swanmon = new Shop([
    ItemList['Burpmon'],
], 'Swanmon');
const Tocanmon = new Shop([
    ItemList['Burpmon'],
], 'Tocanmon');
const Togemogumon = new Shop([
    ItemList['Burpmon'],
], 'Togemogumon');
const Tylomon = new Shop([
    ItemList['Burpmon'],
], 'Tylomon');
const Yaksamon = new Shop([
    ItemList['Burpmon'],
], 'Yaksamon');
const Jyarimon = new Shop([
    ItemList['Burpmon'],
], 'Jyarimon');
const Ketomon = new Shop([
    ItemList['Burpmon'],
], 'Ketomon');
const Paomon = new Shop([
    ItemList['Burpmon'],
], 'Paomon');
const Pipimon = new Shop([
    ItemList['Burpmon'],
], 'Pipimon');
const Relemon = new Shop([
    ItemList['Burpmon'],
], 'Relemon');
const Gigimon = new Shop([
    ItemList['Burpmon'],
], 'Gigimon');
const Hopmon = new Shop([
    ItemList['Burpmon'],
], 'Hopmon');
const Pokomon = new Shop([
    ItemList['Burpmon'],
], 'Pokomon');
const Xiaomon = new Shop([
    ItemList['Burpmon'],
], 'Xiaomon');
const ArkadimonChild = new Shop([
    ItemList['Burpmon'],
], 'Arkadimon Child');
const Guilmon = new Shop([
    ItemList['Burpmon'],
], 'Guilmon');
const Impmon = new Shop([
    ItemList['Burpmon'],
], 'Impmon');
const Labramon = new Shop([
    ItemList['Burpmon'],
], 'Labramon');
const Lucemon = new Shop([
    ItemList['Burpmon'],
], 'Lucemon');
const Monodramon = new Shop([
    ItemList['Burpmon'],
], 'Monodramon');
const PetitMamon = new Shop([
    ItemList['Burpmon'],
], 'Petit Mamon');
const Renamon = new Shop([
    ItemList['Burpmon'],
], 'Renamon');
const ArkadimonAdult = new Shop([
    ItemList['Burpmon'],
], 'Arkadimon Adult');
const BlackGalgomon = new Shop([
    ItemList['Burpmon'],
], 'Black Galgomon');
const BlackGrowmon = new Shop([
    ItemList['Burpmon'],
], 'Black Growmon');
const Dobermon = new Shop([
    ItemList['Burpmon'],
], 'Dobermon');
const Dogmon = new Shop([
    ItemList['Burpmon'],
], 'Dogmon');
const Growmon = new Shop([
    ItemList['Burpmon'],
], 'Growmon');
const GrowmonOrange = new Shop([
    ItemList['Burpmon'],
], 'Growmon Orange');
const Kyubimon = new Shop([
    ItemList['Burpmon'],
], 'Kyubimon');
const KyubimonSilver = new Shop([
    ItemList['Burpmon'],
], 'Kyubimon Silver');
const Siesamon = new Shop([
    ItemList['Burpmon'],
], 'Siesamon');
const Strikedramon = new Shop([
    ItemList['Burpmon'],
], 'Strikedramon');
const Turuiemon = new Shop([
    ItemList['Burpmon'],
], 'Turuiemon');
const V-dramonBlack = new Shop([
    ItemList['Burpmon'],
], 'V-dramon Black');
const Youkomon = new Shop([
    ItemList['Burpmon'],
], 'Youkomon');
const AndiramonDeva = new Shop([
    ItemList['Burpmon'],
], 'Andiramon Deva');
const ArkadimonPerfect = new Shop([
    ItemList['Burpmon'],
], 'Arkadimon Perfect');
const BlackMegaloGrowmon = new Shop([
    ItemList['Burpmon'],
], 'Black Megalo Growmon');
const BlackRapidmon = new Shop([
    ItemList['Burpmon'],
], 'Black Rapidmon');
const Caturamon = new Shop([
    ItemList['Burpmon'],
], 'Caturamon');
const Cerberumon = new Shop([
    ItemList['Burpmon'],
], 'Cerberumon');
const Doumon = new Shop([
    ItemList['Burpmon'],
], 'Doumon');
const GrappuLeomon = new Shop([
    ItemList['Burpmon'],
], 'Grappu Leomon');
const Indaramon = new Shop([
    ItemList['Burpmon'],
], 'Indaramon');
const Karatenmon = new Shop([
    ItemList['Burpmon'],
], 'Karatenmon');
const Kumbhiramon = new Shop([
    ItemList['Burpmon'],
], 'Kumbhiramon');
const Majiramon = new Shop([
    ItemList['Burpmon'],
], 'Majiramon');
const Makuramon = new Shop([
    ItemList['Burpmon'],
], 'Makuramon');
const MegaloGrowmon = new Shop([
    ItemList['Burpmon'],
], 'Megalo Growmon');
const MegaloGrowmonData = new Shop([
    ItemList['Burpmon'],
], 'Megalo Growmon Data');
const Mephismon = new Shop([
    ItemList['Burpmon'],
], 'Mephismon');
const Mihiramon = new Shop([
    ItemList['Burpmon'],
], 'Mihiramon');
const Orochimon = new Shop([
    ItemList['Burpmon'],
], 'Orochimon');
const Pajramon = new Shop([
    ItemList['Burpmon'],
], 'Pajramon');
const Pandamon = new Shop([
    ItemList['Burpmon'],
], 'Pandamon');
const RapidmonPerfect = new Shop([
    ItemList['Burpmon'],
], 'Rapidmon Perfect');
const Sandiramon = new Shop([
    ItemList['Burpmon'],
], 'Sandiramon');
const Scorpiomon = new Shop([
    ItemList['Burpmon'],
], 'Scorpiomon');
const Sinduramon = new Shop([
    ItemList['Burpmon'],
], 'Sinduramon');
const Taomon = new Shop([
    ItemList['Burpmon'],
], 'Taomon');
const TaomonSilver = new Shop([
    ItemList['Burpmon'],
], 'Taomon Silver');
const Vajramon = new Shop([
    ItemList['Burpmon'],
], 'Vajramon');
const Vikaralamon = new Shop([
    ItemList['Burpmon'],
], 'Vikaralamon');
const Anubimon = new Shop([
    ItemList['Burpmon'],
], 'Anubimon');
const ArkadimonUltimate = new Shop([
    ItemList['Burpmon'],
], 'Arkadimon Ultimate');
const Armagemon = new Shop([
    ItemList['Burpmon'],
], 'Armagemon');
const Beelzebumon = new Shop([
    ItemList['Burpmon'],
], 'Beelzebumon');
const BeelzebumonBlastMode = new Shop([
    ItemList['Burpmon'],
], 'Beelzebumon Blast Mode');
const BlackSaintGalgomon = new Shop([
    ItemList['Burpmon'],
], 'Black Saint Galgomon');
const ChaosDukemon = new Shop([
    ItemList['Burpmon'],
], 'Chaos Dukemon');
const Dukemon = new Shop([
    ItemList['Burpmon'],
], 'Dukemon');
const DukemonCrimsonMode = new Shop([
    ItemList['Burpmon'],
], 'Dukemon Crimson Mode');
const Gokumon = new Shop([
    ItemList['Burpmon'],
], 'Gokumon');
const Gulfmon = new Shop([
    ItemList['Burpmon'],
], 'Gulfmon');
const ImperialdramonFighterModeBlack = new Shop([
    ItemList['Burpmon'],
], 'Imperialdramon Fighter Mode Black');
const ImperialdramonPaladinMode = new Shop([
    ItemList['Burpmon'],
], 'Imperialdramon Paladin Mode');
const JustimonAccelArm = new Shop([
    ItemList['Burpmon'],
], 'Justimon Accel Arm');
const JustimonBlitzArm = new Shop([
    ItemList['Burpmon'],
], 'Justimon Blitz Arm');
const JustimonCriticalArm = new Shop([
    ItemList['Burpmon'],
], 'Justimon Critical Arm');
const Kuzuhamon = new Shop([
    ItemList['Burpmon'],
], 'Kuzuhamon');
const Megidramon = new Shop([
    ItemList['Burpmon'],
], 'Megidramon');
const Ofanimon = new Shop([
    ItemList['Burpmon'],
], 'Ofanimon');
const Parallelmon = new Shop([
    ItemList['Burpmon'],
], 'Parallelmon');
const SaintGalgomon = new Shop([
    ItemList['Burpmon'],
], 'Saint Galgomon');
const Sakuyamon = new Shop([
    ItemList['Burpmon'],
], 'Sakuyamon');
const SakuyamonMikoMode = new Shop([
    ItemList['Burpmon'],
], 'Sakuyamon Miko Mode');
const ZeedMillenniumon = new Shop([
    ItemList['Burpmon'],
], 'Zeed Millenniumon');
const Culumon = new Shop([
    ItemList['Burpmon'],
], 'Culumon');
const Keemon = new Shop([
    ItemList['Burpmon'],
], 'Keemon');
const Puttimon = new Shop([
    ItemList['Burpmon'],
], 'Puttimon');
const Cupimon = new Shop([
    ItemList['Burpmon'],
], 'Cupimon');
const TorikaraBallmon = new Shop([
    ItemList['Burpmon'],
], 'Torikara Ballmon');
const Yarmon = new Shop([
    ItemList['Burpmon'],
], 'Yarmon');
const Bearmon = new Shop([
    ItemList['Burpmon'],
], 'Bearmon');
const Bemmon = new Shop([
    ItemList['Burpmon'],
], 'Bemmon');
const Bokomon = new Shop([
    ItemList['Burpmon'],
], 'Bokomon');
const Burgamon = new Shop([
    ItemList['Burpmon'],
], 'Burgamon');
const CardmonC1 = new Shop([
    ItemList['Burpmon'],
], 'Cardmon C1');
const EbiBurgamon = new Shop([
    ItemList['Burpmon'],
], 'Ebi Burgamon');
const Koemon = new Shop([
    ItemList['Burpmon'],
], 'Koemon');
const Kotemon = new Shop([
    ItemList['Burpmon'],
], 'Kotemon');
const Neamon = new Shop([
    ItemList['Burpmon'],
], 'Neamon');
const Blimpmon = new Shop([
    ItemList['Burpmon'],
], 'Blimpmon');
const Boogiemon = new Shop([
    ItemList['Burpmon'],
], 'Boogiemon');
const BurgamonAdult = new Shop([
    ItemList['Burpmon'],
], 'Burgamon Adult');
const Darcmon = new Shop([
    ItemList['Burpmon'],
], 'Darcmon');
const Dinohumon = new Shop([
    ItemList['Burpmon'],
], 'Dinohumon');
const Fangmon = new Shop([
    ItemList['Burpmon'],
], 'Fangmon');
const Gladimon = new Shop([
    ItemList['Burpmon'],
], 'Gladimon');
const Gryzmon = new Shop([
    ItemList['Burpmon'],
], 'Gryzmon');
const Hookmon = new Shop([
    ItemList['Burpmon'],
], 'Hookmon');
const Kougamon = new Shop([
    ItemList['Burpmon'],
], 'Kougamon');
const Mikemon = new Shop([
    ItemList['Burpmon'],
], 'Mikemon');
const Snatchmon = new Shop([
    ItemList['Burpmon'],
], 'Snatchmon');
const TrailmonWorm = new Shop([
    ItemList['Burpmon'],
], 'Trailmon Worm');
const Witchmon = new Shop([
    ItemList['Burpmon'],
], 'Witchmon');
const XV-monBlack = new Shop([
    ItemList['Burpmon'],
], 'XV-mon Black');
const Assaultmon = new Shop([
    ItemList['Burpmon'],
], 'Assaultmon');
const Bastemon = new Shop([
    ItemList['Burpmon'],
], 'Bastemon');
const Betsumon = new Shop([
    ItemList['Burpmon'],
], 'Betsumon');
const BlackKingNumemon = new Shop([
    ItemList['Burpmon'],
], 'Black King Numemon');
const Destromon = new Shop([
    ItemList['Burpmon'],
], 'Destromon');
const Hippogriffomon = new Shop([
    ItemList['Burpmon'],
], 'Hippogriffomon');
const Jewelbeemon = new Shop([
    ItemList['Burpmon'],
], 'Jewelbeemon');
const Kyukimon = new Shop([
    ItemList['Burpmon'],
], 'Kyukimon');
const Locomon = new Shop([
    ItemList['Burpmon'],
], 'Locomon');
const LucemonFalldownMode = new Shop([
    ItemList['Burpmon'],
], 'Lucemon Falldown Mode');
const Mermaimon = new Shop([
    ItemList['Burpmon'],
], 'Mermaimon');
const Mistymon = new Shop([
    ItemList['Burpmon'],
], 'Mistymon');
const NeoDevimon = new Shop([
    ItemList['Burpmon'],
], 'Neo Devimon');
const Phelesmon = new Shop([
    ItemList['Burpmon'],
], 'Phelesmon');
const Valvemon = new Shop([
    ItemList['Burpmon'],
], 'Valvemon');
const Wisemon = new Shop([
    ItemList['Burpmon'],
], 'Wisemon');
const AncientBeatmon = new Shop([
    ItemList['Burpmon'],
], 'Ancient Beatmon');
const AncientGarurumon = new Shop([
    ItemList['Burpmon'],
], 'Ancient Garurumon');
const AncientGreymon = new Shop([
    ItemList['Burpmon'],
], 'Ancient Greymon');
const AncientIrismon = new Shop([
    ItemList['Burpmon'],
], 'Ancient Irismon');
const AncientMegatheriumon = new Shop([
    ItemList['Burpmon'],
], 'Ancient Megatheriumon');
const AncientMermaimon = new Shop([
    ItemList['Burpmon'],
], 'Ancient Mermaimon');
const AncientSphinxmon = new Shop([
    ItemList['Burpmon'],
], 'Ancient Sphinxmon');
const AncientTroiamon = new Shop([
    ItemList['Burpmon'],
], 'Ancient Troiamon');
const AncientVolcamon = new Shop([
    ItemList['Burpmon'],
], 'Ancient Volcamon');
const AncientWisemon = new Shop([
    ItemList['Burpmon'],
], 'Ancient Wisemon');
const BlackSeraphimon = new Shop([
    ItemList['Burpmon'],
], 'Black Seraphimon');
const Callismon = new Shop([
    ItemList['Burpmon'],
], 'Callismon');
const Cannondramon = new Shop([
    ItemList['Burpmon'],
], 'Cannondramon');
const Chaosdramon = new Shop([
    ItemList['Burpmon'],
], 'Chaosdramon');
const Dominimon = new Shop([
    ItemList['Burpmon'],
], 'Dominimon');
const Dynasmon = new Shop([
    ItemList['Burpmon'],
], 'Dynasmon');
const Fujinmon = new Shop([
    ItemList['Burpmon'],
], 'Fujinmon');
const GrandLocomon = new Shop([
    ItemList['Burpmon'],
], 'Grand Locomon');
const Huanglongmon = new Shop([
    ItemList['Burpmon'],
], 'Huanglongmon');
const Lilithmon = new Shop([
    ItemList['Burpmon'],
], 'Lilithmon');
const LordKnightmon = new Shop([
    ItemList['Burpmon'],
], 'Lord Knightmon');
const LucemonSatanMode = new Shop([
    ItemList['Burpmon'],
], 'Lucemon Satan Mode');
const Marsmon = new Shop([
    ItemList['Burpmon'],
], 'Marsmon');
const Metamormon = new Shop([
    ItemList['Burpmon'],
], 'Metamormon');
const Murmukusmon = new Shop([
    ItemList['Burpmon'],
], 'Murmukusmon');
const Ornismon = new Shop([
    ItemList['Burpmon'],
], 'Ornismon');
const Parasimon = new Shop([
    ItemList['Burpmon'],
], 'Parasimon');
const PileVolcamon = new Shop([
    ItemList['Burpmon'],
], 'Pile Volcamon');
const Ragnamon = new Shop([
    ItemList['Burpmon'],
], 'Ragnamon');
const Raidenmon = new Shop([
    ItemList['Burpmon'],
], 'Raidenmon');
const Raijinmon = new Shop([
    ItemList['Burpmon'],
], 'Raijinmon');
const Regulumon = new Shop([
    ItemList['Burpmon'],
], 'Regulumon');
const SlashAngemon = new Shop([
    ItemList['Burpmon'],
], 'Slash Angemon');
const Suijinmon = new Shop([
    ItemList['Burpmon'],
], 'Suijinmon');
const Susanoomon = new Shop([
    ItemList['Burpmon'],
], 'Susanoomon');
const UlforceV-dramon = new Shop([
    ItemList['Burpmon'],
], 'Ulforce V-dramon');
const FlaWizarmon = new Shop([
    ItemList['Burpmon'],
], 'Fla Wizarmon');
const Kenkimon = new Shop([
    ItemList['Burpmon'],
], 'Kenkimon');
const Salamandamon = new Shop([
    ItemList['Burpmon'],
], 'Salamandamon');
const Thunderbirmon = new Shop([
    ItemList['Burpmon'],
], 'Thunderbirmon');
const Agnimon = new Shop([
    ItemList['Burpmon'],
], 'Agnimon');
const Aldamon = new Shop([
    ItemList['Burpmon'],
], 'Aldamon');
const Arbormon = new Shop([
    ItemList['Burpmon'],
], 'Arbormon');
const Beowolfmon = new Shop([
    ItemList['Burpmon'],
], 'Beowolfmon');
const Blitzmon = new Shop([
    ItemList['Burpmon'],
], 'Blitzmon');
const Blizzarmon = new Shop([
    ItemList['Burpmon'],
], 'Blizzarmon');
const Bolgmon = new Shop([
    ItemList['Burpmon'],
], 'Bolgmon');
const Calamaramon = new Shop([
    ItemList['Burpmon'],
], 'Calamaramon');
const Chackmon = new Shop([
    ItemList['Burpmon'],
], 'Chackmon');
const Daipenmon = new Shop([
    ItemList['Burpmon'],
], 'Daipenmon');
const Duskmon = new Shop([
    ItemList['Burpmon'],
], 'Duskmon');
const Fairimon = new Shop([
    ItemList['Burpmon'],
], 'Fairimon');
const Flamon = new Shop([
    ItemList['Burpmon'],
], 'Flamon');
const Garummon = new Shop([
    ItemList['Burpmon'],
], 'Garummon');
const Gigasmon = new Shop([
    ItemList['Burpmon'],
], 'Gigasmon');
const Grottomon = new Shop([
    ItemList['Burpmon'],
], 'Grottomon');
const JetSilphymon = new Shop([
    ItemList['Burpmon'],
], 'Jet Silphymon');
const KaiserGreymon = new Shop([
    ItemList['Burpmon'],
], 'Kaiser Greymon');
const KaiserLeomon = new Shop([
    ItemList['Burpmon'],
], 'Kaiser Leomon');
const Löwemon = new Shop([
    ItemList['Burpmon'],
], 'Löwemon');
const MagnaGarurumon = new Shop([
    ItemList['Burpmon'],
], 'Magna Garurumon');
const Mercuremon = new Shop([
    ItemList['Burpmon'],
], 'Mercuremon');
const Petaldramon = new Shop([
    ItemList['Burpmon'],
], 'Petaldramon');
const Raihimon = new Shop([
    ItemList['Burpmon'],
], 'Raihimon');
const Ranamon = new Shop([
    ItemList['Burpmon'],
], 'Ranamon');
const RhinoKabuterimon = new Shop([
    ItemList['Burpmon'],
], 'Rhino Kabuterimon');
const Sephirothmon = new Shop([
    ItemList['Burpmon'],
], 'Sephirothmon');
const Shutumon = new Shop([
    ItemList['Burpmon'],
], 'Shutumon');
const Strabimon = new Shop([
    ItemList['Burpmon'],
], 'Strabimon');
const Velgrmon = new Shop([
    ItemList['Burpmon'],
], 'Velgrmon');
const Vritramon = new Shop([
    ItemList['Burpmon'],
], 'Vritramon');
const Wolfmon = new Shop([
    ItemList['Burpmon'],
], 'Wolfmon');
const Būmon = new Shop([
    ItemList['Burpmon'],
], 'Būmon');
const Dodomon = new Shop([
    ItemList['Burpmon'],
], 'Dodomon');
const Fufumon = new Shop([
    ItemList['Burpmon'],
], 'Fufumon');
const Pupumon = new Shop([
    ItemList['Burpmon'],
], 'Pupumon');
const Dorimon = new Shop([
    ItemList['Burpmon'],
], 'Dorimon');
const Kyokyomon = new Shop([
    ItemList['Burpmon'],
], 'Kyokyomon');
const Puroromon = new Shop([
    ItemList['Burpmon'],
], 'Puroromon');
const AgumonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Agumon X-Antibody');
const BetamonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Betamon X-Antibody');
const DORUmon = new Shop([
    ItemList['Burpmon'],
], 'DORUmon');
const Funbeemon = new Shop([
    ItemList['Burpmon'],
], 'Funbeemon');
const GabumonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Gabumon X-Antibody');
const GanimonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Ganimon X-Antibody');
const GazimonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Gazimon X-Antibody');
const GomamonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Gomamon X-Antibody');
const GottsumonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Gottsumon X-Antibody');
const GuilmonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Guilmon X-Antibody');
const KokuwamonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Kokuwamon X-Antibody');
const OtamamonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Otamamon X-Antibody');
const PalmonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Palmon X-Antibody');
const PlotmonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Plotmon X-Antibody');
const Ryudamon = new Shop([
    ItemList['Burpmon'],
], 'Ryudamon');
const ShakomonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Shakomon X-Antibody');
const AllomonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Allomon X-Antibody');
const Death-X-DORUgamon = new Shop([
    ItemList['Burpmon'],
], 'Death-X-DORUgamon');
const DobermonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Dobermon X-Antibody');
const DORUgamon = new Shop([
    ItemList['Burpmon'],
], 'DORUgamon');
const GarurumonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Garurumon X-Antibody');
const GesomonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Gesomon X-Antibody');
const Ginryumon = new Shop([
    ItemList['Burpmon'],
], 'Ginryumon');
const GreymonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Greymon X-Antibody');
const GrowmonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Growmon X-Antibody');
const KuwagamonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Kuwagamon X-Antibody');
const LeomonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Leomon X-Antibody');
const MantaraymonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Mantaraymon X-Antibody');
const MonochromonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Monochromon X-Antibody');
const NefertimonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Nefertimon X-Antibody');
const Omekamon = new Shop([
    ItemList['Burpmon'],
], 'Omekamon');
const PteranomonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Pteranomon X-Antibody');
const Raptordramon = new Shop([
    ItemList['Burpmon'],
], 'Raptordramon');
const RhinomonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Rhinomon X-Antibody');
const SeadramonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Seadramon X-Antibody');
const StarmonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Starmon X-Antibody');
const TailmonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Tailmon X-Antibody');
const Tobucatmon = new Shop([
    ItemList['Burpmon'],
], 'Tobucatmon');
const TogemonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Togemon X-Antibody');
const TylomonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Tylomon X-Antibody');
const Waspmon = new Shop([
    ItemList['Burpmon'],
], 'Waspmon');
const AnomalocarimonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Anomalocarimon X-Antibody');
const Cannonbeemon = new Shop([
    ItemList['Burpmon'],
], 'Cannonbeemon');
const CerberumonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Cerberumon X-Antibody');
const Death-X-DORUguremon = new Shop([
    ItemList['Burpmon'],
], 'Death-X-DORUguremon');
const DORUguremon = new Shop([
    ItemList['Burpmon'],
], 'DORUguremon');
const GarudamonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Garudamon X-Antibody');
const Grademon = new Shop([
    ItemList['Burpmon'],
], 'Grademon');
const Hisyaryumon = new Shop([
    ItemList['Burpmon'],
], 'Hisyaryumon');
const LilimonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Lilimon X-Antibody');
const Mametyramon = new Shop([
    ItemList['Burpmon'],
], 'Mametyramon');
const MammonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Mammon X-Antibody');
const MegaSeadramonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Mega Seadramon X-Antibody');
const MegaloGrowmonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Megalo Growmon X-Antibody');
const MetalFantomon = new Shop([
    ItemList['Burpmon'],
], 'Metal Fantomon');
const MetalGreymonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Metal Greymon X-Antibody');
const MetalTyranomonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Metal Tyranomon X-Antibody');
const OokuwamonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Ookuwamon X-Antibody');
const PanjyamonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Panjyamon X-Antibody');
const SkullBaluchimon = new Shop([
    ItemList['Burpmon'],
], 'Skull Baluchimon');
const TriceramonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Triceramon X-Antibody');
const VademonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Vademon X-Antibody');
const WereGarurumonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Were Garurumon X-Antibody');
const Alphamon = new Shop([
    ItemList['Burpmon'],
], 'Alphamon');
const AlphamonOuryuken = new Shop([
    ItemList['Burpmon'],
], 'Alphamon Ouryuken');
const ArkadimonSuperUltimate = new Shop([
    ItemList['Burpmon'],
], 'Arkadimon Super Ultimate');
const Barbamon = new Shop([
    ItemList['Burpmon'],
], 'Barbamon');
const Death-X-DORUgoramon = new Shop([
    ItemList['Burpmon'],
], 'Death-X-DORUgoramon');
const Death-X-mon = new Shop([
    ItemList['Burpmon'],
], 'Death-X-mon');
const DemonSuperUltimate = new Shop([
    ItemList['Burpmon'],
], 'Demon Super Ultimate');
const Dinorexmon = new Shop([
    ItemList['Burpmon'],
], 'Dinorexmon');
const Dinotigermon = new Shop([
    ItemList['Burpmon'],
], 'Dinotigermon');
const DORUgoramon = new Shop([
    ItemList['Burpmon'],
], 'DORUgoramon');
const DukemonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Dukemon X-Antibody');
const DynasmonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Dynasmon X-Antibody');
const EbemonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Ebemon X-Antibody');
const Gaioumon = new Shop([
    ItemList['Burpmon'],
], 'Gaioumon');
const GigaSeadramon = new Shop([
    ItemList['Burpmon'],
], 'Giga Seadramon');
const GoddramonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Goddramon X-Antibody');
const GrandisKuwagamon = new Shop([
    ItemList['Burpmon'],
], 'Grandis Kuwagamon');
const HolydramonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Holydramon X-Antibody');
const Leviamon = new Shop([
    ItemList['Burpmon'],
], 'Leviamon');
const LucemonLarva = new Shop([
    ItemList['Burpmon'],
], 'Lucemon Larva');
const MagnamonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Magnamon X-Antibody');
const MedievalDukemon = new Shop([
    ItemList['Burpmon'],
], 'Medieval Dukemon');
const MegidramonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Megidramon X-Antibody');
const MetalGarurumonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Metal Garurumon X-Antibody');
const MetalPiranimon = new Shop([
    ItemList['Burpmon'],
], 'Metal Piranimon');
const OmegamonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Omegamon X-Antibody');
const Ouryumon = new Shop([
    ItemList['Burpmon'],
], 'Ouryumon');
const PlesiomonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Plesiomon X-Antibody');
const RosemonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Rosemon X-Antibody');
const SkullMammonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Skull Mammon X-Antibody');
const TigerVespamon = new Shop([
    ItemList['Burpmon'],
], 'Tiger Vespamon');
const UlforceV-dramonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Ulforce V-dramon X-Antibody');
const UlforceV-dramonFutureMode = new Shop([
    ItemList['Burpmon'],
], 'Ulforce V-dramon Future Mode');
const UltimateBrachimon = new Shop([
    ItemList['Burpmon'],
], 'Ultimate Brachimon');
const WarGreymonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'War Greymon X-Antibody');
const BlackGuilmon = new Shop([
    ItemList['Burpmon'],
], 'Black Guilmon');
const HagurumonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Hagurumon X-Antibody');
const Phascomon = new Shop([
    ItemList['Burpmon'],
], 'Phascomon');
const Porcupamon = new Shop([
    ItemList['Burpmon'],
], 'Porcupamon');
const ThunderballmonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Thunderballmon X-Antibody');
const Astamon = new Shop([
    ItemList['Burpmon'],
], 'Astamon');
const MamemonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Mamemon X-Antibody');
const MetalMamemonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Metal Mamemon X-Antibody');
const BelphemonRageMode = new Shop([
    ItemList['Burpmon'],
], 'Belphemon Rage Mode');
const BelphemonSleepMode = new Shop([
    ItemList['Burpmon'],
], 'Belphemon Sleep Mode');
const ChaosdramonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Chaosdramon X-Antibody');
const PrinceMamemonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Prince Mamemon X-Antibody');
const Bommon = new Shop([
    ItemList['Burpmon'],
], 'Bommon');
const Pafumon = new Shop([
    ItemList['Burpmon'],
], 'Pafumon');
const Popomon = new Shop([
    ItemList['Burpmon'],
], 'Popomon');
const Puwamon = new Shop([
    ItemList['Burpmon'],
], 'Puwamon');
const Frimon = new Shop([
    ItemList['Burpmon'],
], 'Frimon');
const Kyaromon = new Shop([
    ItemList['Burpmon'],
], 'Kyaromon');
const Missimon = new Shop([
    ItemList['Burpmon'],
], 'Missimon');
const Pinamon = new Shop([
    ItemList['Burpmon'],
], 'Pinamon');
const TokomonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Tokomon X-Antibody');
const Agumon2006 = new Shop([
    ItemList['Burpmon'],
], 'Agumon 2006 ');
const Commandramon = new Shop([
    ItemList['Burpmon'],
], 'Commandramon');
const Dracumon = new Shop([
    ItemList['Burpmon'],
], 'Dracumon');
const Falcomon = new Shop([
    ItemList['Burpmon'],
], 'Falcomon');
const Kokabuterimon = new Shop([
    ItemList['Burpmon'],
], 'Kokabuterimon');
const Kudamon = new Shop([
    ItemList['Burpmon'],
], 'Kudamon');
const Liollmon = new Shop([
    ItemList['Burpmon'],
], 'Liollmon');
const Swimmon = new Shop([
    ItemList['Burpmon'],
], 'Swimmon');
const BladeKuwagamon = new Shop([
    ItemList['Burpmon'],
], 'Blade Kuwagamon');
const Diatrymon = new Shop([
    ItemList['Burpmon'],
], 'Diatrymon');
const Liamon = new Shop([
    ItemList['Burpmon'],
], 'Liamon');
const Reppamon = new Shop([
    ItemList['Burpmon'],
], 'Reppamon');
const Sangloupmon = new Shop([
    ItemList['Burpmon'],
], 'Sangloupmon');
const Sealsdramon = new Shop([
    ItemList['Burpmon'],
], 'Sealsdramon');
const LoaderLiomon = new Shop([
    ItemList['Burpmon'],
], 'Loader Liomon');
const Matadrmon = new Shop([
    ItemList['Burpmon'],
], 'Matadrmon');
const MetallifeKuwagamon = new Shop([
    ItemList['Burpmon'],
], 'Metallife Kuwagamon');
const Tankdramon = new Shop([
    ItemList['Burpmon'],
], 'Tankdramon');
const Tyilinmon = new Shop([
    ItemList['Burpmon'],
], 'Tyilinmon');
const Volcdramon = new Shop([
    ItemList['Burpmon'],
], 'Volcdramon');
const Yatagaramon = new Shop([
    ItemList['Burpmon'],
], 'Yatagaramon');
const BanchoLeomon = new Shop([
    ItemList['Burpmon'],
], 'Bancho Leomon');
const BeelzebumonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Beelzebumon X-Antibody');
const BlackWarGreymonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Black War Greymon X-Antibody');
const Chaosmon = new Shop([
    ItemList['Burpmon'],
], 'Chaosmon');
const ClavisAngemon = new Shop([
    ItemList['Burpmon'],
], 'Clavis Angemon');
const Craniummon = new Shop([
    ItemList['Burpmon'],
], 'Craniummon');
const Darkdramon = new Shop([
    ItemList['Burpmon'],
], 'Darkdramon');
const GrandDracumon = new Shop([
    ItemList['Burpmon'],
], 'Grand Dracumon');
const HerakleKabuterimonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Herakle Kabuterimon X-Antibody');
const Mercurymon = new Shop([
    ItemList['Burpmon'],
], 'Mercurymon');
const Minervamon = new Shop([
    ItemList['Burpmon'],
], 'Minervamon');
const Neptunemon = new Shop([
    ItemList['Burpmon'],
], 'Neptunemon');
const Sleipmon = new Shop([
    ItemList['Burpmon'],
], 'Sleipmon');
const Spinomon = new Shop([
    ItemList['Burpmon'],
], 'Spinomon');
const TyrantKabuterimon = new Shop([
    ItemList['Burpmon'],
], 'Tyrant Kabuterimon');
const UltimateChaosmon = new Shop([
    ItemList['Burpmon'],
], 'Ultimate Chaosmon');
const Valdurmon = new Shop([
    ItemList['Burpmon'],
], 'Valdurmon');
const Budmon = new Shop([
    ItemList['Burpmon'],
], 'Budmon');
const Chapmon = new Shop([
    ItemList['Burpmon'],
], 'Chapmon');
const Wanyamon = new Shop([
    ItemList['Burpmon'],
], 'Wanyamon');
const AgumonBlack2006 = new Shop([
    ItemList['Burpmon'],
], 'Agumon Black 2006');
const AgumonHakase = new Shop([
    ItemList['Burpmon'],
], 'Agumon Hakase');
const BushiAgumon = new Shop([
    ItemList['Burpmon'],
], 'Bushi Agumon');
const Falcomon2006 = new Shop([
    ItemList['Burpmon'],
], 'Falcomon 2006 ');
const Gaomon = new Shop([
    ItemList['Burpmon'],
], 'Gaomon');
const Kamemon = new Shop([
    ItemList['Burpmon'],
], 'Kamemon');
const Kudamon2006 = new Shop([
    ItemList['Burpmon'],
], 'Kudamon 2006 ');
const Lalamon = new Shop([
    ItemList['Burpmon'],
], 'Lalamon');
const Minidekachimon = new Shop([
    ItemList['Burpmon'],
], 'Minidekachimon');
const NiseAgumonHakase = new Shop([
    ItemList['Burpmon'],
], 'Nise Agumon Hakase');
const PawnChessmonBlack = new Shop([
    ItemList['Burpmon'],
], 'Pawn Chessmon Black');
const PawnChessmonWhite = new Shop([
    ItemList['Burpmon'],
], 'Pawn Chessmon White');
const ProtoGizmon = new Shop([
    ItemList['Burpmon'],
], 'Proto Gizmon');
const SantaAgumon = new Shop([
    ItemList['Burpmon'],
], 'Santa Agumon');
const YukiAgumon2006 = new Shop([
    ItemList['Burpmon'],
], 'Yuki Agumon 2006 ');
const Atamadekachimon = new Shop([
    ItemList['Burpmon'],
], 'Atamadekachimon');
const BlackGaogamon = new Shop([
    ItemList['Burpmon'],
], 'Black Gaogamon');
const Gaogamon = new Shop([
    ItemList['Burpmon'],
], 'Gaogamon');
const Gawappamon = new Shop([
    ItemList['Burpmon'],
], 'Gawappamon');
const GeoGreymon = new Shop([
    ItemList['Burpmon'],
], 'Geo Greymon');
const GizmonAT = new Shop([
    ItemList['Burpmon'],
], 'Gizmon AT');
const GoldNumemon = new Shop([
    ItemList['Burpmon'],
], 'Gold Numemon');
const KnightChessmonBlack = new Shop([
    ItemList['Burpmon'],
], 'Knight Chessmon Black');
const KnightChessmonWhite = new Shop([
    ItemList['Burpmon'],
], 'Knight Chessmon White');
const Peckmon = new Shop([
    ItemList['Burpmon'],
], 'Peckmon');
const Sunflowmon = new Shop([
    ItemList['Burpmon'],
], 'Sunflowmon');
const Yoxtu!Yoxtu!mon = new Shop([
    ItemList['Burpmon'],
], 'Yoxtu!Yoxtu!mon');
const AlgomonPerfect = new Shop([
    ItemList['Burpmon'],
], 'Algomon Perfect');
const BishopChessmonWhite = new Shop([
    ItemList['Burpmon'],
], 'Bishop Chessmon White');
const GizmonXT = new Shop([
    ItemList['Burpmon'],
], 'Gizmon XT');
const Lilamon = new Shop([
    ItemList['Burpmon'],
], 'Lilamon');
const MachGaogamon = new Shop([
    ItemList['Burpmon'],
], 'Mach Gaogamon');
const RizeGreymon = new Shop([
    ItemList['Burpmon'],
], 'Rize Greymon');
const RookChessmonBlack = new Shop([
    ItemList['Burpmon'],
], 'Rook Chessmon Black');
const Shawujinmon = new Shop([
    ItemList['Burpmon'],
], 'Shawujinmon');
const Yatagaramon2006 = new Shop([
    ItemList['Burpmon'],
], 'Yatagaramon 2006 ');
const AlgomonUltimate = new Shop([
    ItemList['Burpmon'],
], 'Algomon Ultimate');
const BioDarkdramon = new Shop([
    ItemList['Burpmon'],
], 'Bio Darkdramon');
const BioLotusmon = new Shop([
    ItemList['Burpmon'],
], 'Bio Lotusmon');
const BioSpinomon = new Shop([
    ItemList['Burpmon'],
], 'Bio Spinomon');
const ChronomonDestroyMode = new Shop([
    ItemList['Burpmon'],
], 'Chronomon Destroy Mode');
const ChronomonHolyMode = new Shop([
    ItemList['Burpmon'],
], 'Chronomon Holy Mode');
const ElDoradimon = new Shop([
    ItemList['Burpmon'],
], 'El Doradimon');
const JumboGamemon = new Shop([
    ItemList['Burpmon'],
], 'Jumbo Gamemon');
const KingChessmon = new Shop([
    ItemList['Burpmon'],
], 'King Chessmon');
const MirageGaogamon = new Shop([
    ItemList['Burpmon'],
], 'Mirage Gaogamon');
const MirageGaogamonBurstMode = new Shop([
    ItemList['Burpmon'],
], 'Mirage Gaogamon Burst Mode');
const PlatinumNumemon = new Shop([
    ItemList['Burpmon'],
], 'Platinum Numemon');
const QueenChessmon = new Shop([
    ItemList['Burpmon'],
], 'Queen Chessmon');
const Ravmon = new Shop([
    ItemList['Burpmon'],
], 'Ravmon');
const RavmonBurstMode = new Shop([
    ItemList['Burpmon'],
], 'Ravmon Burst Mode');
const ShineGreymon = new Shop([
    ItemList['Burpmon'],
], 'Shine Greymon');
const ShineGreymonBurstMode = new Shop([
    ItemList['Burpmon'],
], 'Shine Greymon Burst Mode');
const ShineGreymonRuinMode = new Shop([
    ItemList['Burpmon'],
], 'Shine Greymon Ruin Mode');
const TonosamaMamemon = new Shop([
    ItemList['Burpmon'],
], 'Tonosama Mamemon');
const BioCoatlmon = new Shop([
    ItemList['Burpmon'],
], 'Bio Coatlmon');
const BioStegomon = new Shop([
    ItemList['Burpmon'],
], 'Bio Stegomon');
const BioThunderbirmon = new Shop([
    ItemList['Burpmon'],
], 'Bio Thunderbirmon');
const Petitmon = new Shop([
    ItemList['Burpmon'],
], 'Petitmon');
const Babydmon = new Shop([
    ItemList['Burpmon'],
], 'Babydmon');
const Chicchimon = new Shop([
    ItemList['Burpmon'],
], 'Chicchimon');
const Moonmon = new Shop([
    ItemList['Burpmon'],
], 'Moonmon');
const Sunmon = new Shop([
    ItemList['Burpmon'],
], 'Sunmon');
const Coronamon = new Shop([
    ItemList['Burpmon'],
], 'Coronamon');
const Dracomon = new Shop([
    ItemList['Burpmon'],
], 'Dracomon');
const Lunamon = new Shop([
    ItemList['Burpmon'],
], 'Lunamon');
const CoredramonBlue = new Shop([
    ItemList['Burpmon'],
], 'Coredramon Blue');
const CoredramonGreen = new Shop([
    ItemList['Burpmon'],
], 'Coredramon Green');
const Firamon = new Shop([
    ItemList['Burpmon'],
], 'Firamon');
const Grimmon = new Shop([
    ItemList['Burpmon'],
], 'Grimmon');
const Lekismon = new Shop([
    ItemList['Burpmon'],
], 'Lekismon');
const CatchMamemon = new Shop([
    ItemList['Burpmon'],
], 'Catch Mamemon');
const ChaosGrimmon = new Shop([
    ItemList['Burpmon'],
], 'Chaos Grimmon');
const Crescemon = new Shop([
    ItemList['Burpmon'],
], 'Crescemon');
const DarkSuperstarmon = new Shop([
    ItemList['Burpmon'],
], 'Dark Superstarmon');
const Flaremon = new Shop([
    ItemList['Burpmon'],
], 'Flaremon');
const Groundramon = new Shop([
    ItemList['Burpmon'],
], 'Groundramon');
const Wingdramon = new Shop([
    ItemList['Burpmon'],
], 'Wingdramon');
const Apollomon = new Shop([
    ItemList['Burpmon'],
], 'Apollomon');
const Breakdramon = new Shop([
    ItemList['Burpmon'],
], 'Breakdramon');
const Dianamon = new Shop([
    ItemList['Burpmon'],
], 'Dianamon');
const Duftmon = new Shop([
    ItemList['Burpmon'],
], 'Duftmon');
const DuftmonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Duftmon X-Antibody');
const DuftmonLeopardMode = new Shop([
    ItemList['Burpmon'],
], 'Duftmon Leopard Mode');
const Examon = new Shop([
    ItemList['Burpmon'],
], 'Examon');
const ExoGrimmon = new Shop([
    ItemList['Burpmon'],
], 'Exo Grimmon');
const Lotusmon = new Shop([
    ItemList['Burpmon'],
], 'Lotusmon');
const Ogudomon = new Shop([
    ItemList['Burpmon'],
], 'Ogudomon');
const RosemonBurstMode = new Shop([
    ItemList['Burpmon'],
], 'Rosemon Burst Mode');
const Slayerdramon = new Shop([
    ItemList['Burpmon'],
], 'Slayerdramon');
const Surfymon = new Shop([
    ItemList['Burpmon'],
], 'Surfymon');
const VictoryGreymon = new Shop([
    ItemList['Burpmon'],
], 'Victory Greymon');
const ZdGarurumon = new Shop([
    ItemList['Burpmon'],
], 'Zd Garurumon');
const Burpmon = new Shop([
    ItemList['Burpmon'],
], 'Burpmon');
const Bombmon = new Shop([
    ItemList['Burpmon'],
], 'Bombmon');
const Chibickmon = new Shop([
    ItemList['Burpmon'],
], 'Chibickmon');
const Monimon = new Shop([
    ItemList['Burpmon'],
], 'Monimon');
const Pickmon = new Shop([
    ItemList['Burpmon'],
], 'Pickmon');
const Chikurimon = new Shop([
    ItemList['Burpmon'],
], 'Chikurimon');
const Cutemon = new Shop([
    ItemList['Burpmon'],
], 'Cutemon');
const Dondokomon = new Shop([
    ItemList['Burpmon'],
], 'Dondokomon');
const Gaossmon = new Shop([
    ItemList['Burpmon'],
], 'Gaossmon');
const Hyokomon = new Shop([
    ItemList['Burpmon'],
], 'Hyokomon');
const Monitamon = new Shop([
    ItemList['Burpmon'],
], 'Monitamon');
const Shoutmon = new Shop([
    ItemList['Burpmon'],
], 'Shoutmon');
const Shoutmon+DoruluCannon = new Shop([
    ItemList['Burpmon'],
], 'Shoutmon + Dorulu Cannon');
const Shoutmon+JetSparrow = new Shop([
    ItemList['Burpmon'],
], 'Shoutmon + Jet Sparrow');
const Shoutmon+StarSword = new Shop([
    ItemList['Burpmon'],
], 'Shoutmon + Star Sword');
const Spadamon = new Shop([
    ItemList['Burpmon'],
], 'Spadamon');
const Sparrowmon = new Shop([
    ItemList['Burpmon'],
], 'Sparrowmon');
const Starmons = new Shop([
    ItemList['Burpmon'],
], 'Starmons');
const Tyutyumon = new Shop([
    ItemList['Burpmon'],
], 'Tyutyumon');
const Ballistamon = new Shop([
    ItemList['Burpmon'],
], 'Ballistamon');
const Buraimon = new Shop([
    ItemList['Burpmon'],
], 'Buraimon');
const Damemon = new Shop([
    ItemList['Burpmon'],
], 'Damemon');
const DeadlyAxemon = new Shop([
    ItemList['Burpmon'],
], 'Deadly Axemon');
const Deckerdramon = new Shop([
    ItemList['Burpmon'],
], 'Deckerdramon');
const DonShoutmon = new Shop([
    ItemList['Burpmon'],
], 'Don Shoutmon');
const Dorulumon = new Shop([
    ItemList['Burpmon'],
], 'Dorulumon');
const Greymon2010 = new Shop([
    ItemList['Burpmon'],
], 'Greymon 2010 ');
const MadLeomon = new Shop([
    ItemList['Burpmon'],
], 'Mad Leomon');
const MadLeomonArmedMode = new Shop([
    ItemList['Burpmon'],
], 'Mad Leomon Armed Mode');
const MailBirdramon = new Shop([
    ItemList['Burpmon'],
], 'Mail Birdramon');
const Shonitamon = new Shop([
    ItemList['Burpmon'],
], 'Shonitamon');
const Shortmon = new Shop([
    ItemList['Burpmon'],
], 'Shortmon');
const ShoutmonX2 = new Shop([
    ItemList['Burpmon'],
], 'Shoutmon X2');
const ShoutmonX3 = new Shop([
    ItemList['Burpmon'],
], 'Shoutmon X3');
const ShoutmonX4 = new Shop([
    ItemList['Burpmon'],
], 'Shoutmon X4');
const SkullKnightmon = new Shop([
    ItemList['Burpmon'],
], 'Skull Knightmon');
const SkullKnightmonBigAxeMode = new Shop([
    ItemList['Burpmon'],
], 'Skull Knightmon Big Axe Mode');
const SkullKnightmonCavalierMode = new Shop([
    ItemList['Burpmon'],
], 'Skull Knightmon Cavalier Mode');
const Troopmon = new Shop([
    ItemList['Burpmon'],
], 'Troopmon');
const Baalmon = new Shop([
    ItemList['Burpmon'],
], 'Baalmon');
const Butenmon = new Shop([
    ItemList['Burpmon'],
], 'Butenmon');
const Cyberdramon2010 = new Shop([
    ItemList['Burpmon'],
], 'Cyberdramon 2010 ');
const DarkKnightmon = new Shop([
    ItemList['Burpmon'],
], 'Dark Knightmon');
const DeckerGreymon = new Shop([
    ItemList['Burpmon'],
], 'Decker Greymon');
const MetalGreymon2010 = new Shop([
    ItemList['Burpmon'],
], 'Metal Greymon 2010 ');
const MetalGreymon+CyberLauncher = new Shop([
    ItemList['Burpmon'],
], 'Metal Greymon + Cyber Launcher');
const ShoutmonX4B = new Shop([
    ItemList['Burpmon'],
], 'Shoutmon X4B');
const ShoutmonX4K = new Shop([
    ItemList['Burpmon'],
], 'Shoutmon X4K');
const ShoutmonX5 = new Shop([
    ItemList['Burpmon'],
], 'Shoutmon X5');
const Weddinmon = new Shop([
    ItemList['Burpmon'],
], 'Weddinmon');
const Aegisdramon = new Shop([
    ItemList['Burpmon'],
], 'Aegisdramon');
const Bagramon = new Shop([
    ItemList['Burpmon'],
], 'Bagramon');
const Beelzebumon2010 = new Shop([
    ItemList['Burpmon'],
], 'Beelzebumon 2010 ');
const Blastmon = new Shop([
    ItemList['Burpmon'],
], 'Blastmon');
const ChaosmonValdurArm = new Shop([
    ItemList['Burpmon'],
], 'Chaosmon Valdur Arm');
const KingWhamon = new Shop([
    ItemList['Burpmon'],
], 'King Whamon');
const ShoutmonX5B = new Shop([
    ItemList['Burpmon'],
], 'Shoutmon X5B');
const Tactimon = new Shop([
    ItemList['Burpmon'],
], 'Tactimon');
const Panbachimon = new Shop([
    ItemList['Burpmon'],
], 'Panbachimon');
const Kozenimon = new Shop([
    ItemList['Burpmon'],
], 'Kozenimon');
const Bacomon = new Shop([
    ItemList['Burpmon'],
], 'Bacomon');
const Ekakimon = new Shop([
    ItemList['Burpmon'],
], 'Ekakimon');
const Gumdramon = new Shop([
    ItemList['Burpmon'],
], 'Gumdramon');
const Iguneetmon = new Shop([
    ItemList['Burpmon'],
], 'Iguneetmon');
const Soundbirdmon = new Shop([
    ItemList['Burpmon'],
], 'Soundbirdmon');
const Tinkermon = new Shop([
    ItemList['Burpmon'],
], 'Tinkermon');
const Zenimon = new Shop([
    ItemList['Burpmon'],
], 'Zenimon');
const Arresterdramon = new Shop([
    ItemList['Burpmon'],
], 'Arresterdramon');
const Ganemon = new Shop([
    ItemList['Burpmon'],
], 'Ganemon');
const Ginkakumon = new Shop([
    ItemList['Burpmon'],
], 'Ginkakumon');
const GinkakumonPromote = new Shop([
    ItemList['Burpmon'],
], 'Ginkakumon Promote');
const Hi-VisionMonitamon = new Shop([
    ItemList['Burpmon'],
], 'Hi-Vision Monitamon');
const Kinkakumon = new Shop([
    ItemList['Burpmon'],
], 'Kinkakumon');
const Petermon = new Shop([
    ItemList['Burpmon'],
], 'Petermon');
const RaptorSparrowmon = new Shop([
    ItemList['Burpmon'],
], 'Raptor Sparrowmon');
const Shademon = new Shop([
    ItemList['Burpmon'],
], 'Shademon');
const ShootingStarmon = new Shop([
    ItemList['Burpmon'],
], 'Shooting Starmon');
const ShoutmonKingVer. = new Shop([
    ItemList['Burpmon'],
], 'Shoutmon King Ver.');
const Targetmon = new Shop([
    ItemList['Burpmon'],
], 'Targetmon');
const Tuwarmon = new Shop([
    ItemList['Burpmon'],
], 'Tuwarmon');
const AtlurBallistamon = new Shop([
    ItemList['Burpmon'],
], 'Atlur Ballistamon');
const BlackMachGaogamon = new Shop([
    ItemList['Burpmon'],
], 'Black Mach Gaogamon');
const CaptainHookmon = new Shop([
    ItemList['Burpmon'],
], 'Captain Hookmon');
const Cho·Hakkaimon = new Shop([
    ItemList['Burpmon'],
], 'Cho·Hakkaimon');
const Footmon = new Shop([
    ItemList['Burpmon'],
], 'Footmon');
const Gokuwmon = new Shop([
    ItemList['Burpmon'],
], 'Gokuwmon');
const Gravimon = new Shop([
    ItemList['Burpmon'],
], 'Gravimon');
const MusouKnightmon = new Shop([
    ItemList['Burpmon'],
], 'Musou Knightmon');
const OmegaShoutmon = new Shop([
    ItemList['Burpmon'],
], 'Omega Shoutmon');
const Sagomon = new Shop([
    ItemList['Burpmon'],
], 'Sagomon');
const Sanzomon = new Shop([
    ItemList['Burpmon'],
], 'Sanzomon');
const Splashmon = new Shop([
    ItemList['Burpmon'],
], 'Splashmon');
const SplashmonDarknessMode = new Shop([
    ItemList['Burpmon'],
], 'Splashmon Darkness Mode');
const YaegerDorulumon = new Shop([
    ItemList['Burpmon'],
], 'Yaeger Dorulumon');
const Zamielmon = new Shop([
    ItemList['Burpmon'],
], 'Zamielmon');
const DarknessBagramon = new Shop([
    ItemList['Burpmon'],
], 'Darkness Bagramon');
const Dorbickmon = new Shop([
    ItemList['Burpmon'],
], 'Dorbickmon');
const JetMervamon = new Shop([
    ItemList['Burpmon'],
], 'Jet Mervamon');
const Mervamon = new Shop([
    ItemList['Burpmon'],
], 'Mervamon');
const NeoVamdemon = new Shop([
    ItemList['Burpmon'],
], 'Neo Vamdemon');
const OfanimonFalldownMode = new Shop([
    ItemList['Burpmon'],
], 'Ofanimon Falldown Mode');
const Olegmon = new Shop([
    ItemList['Burpmon'],
], 'Olegmon');
const OmegamonZwart = new Shop([
    ItemList['Burpmon'],
], 'Omegamon Zwart');
const Shakamon = new Shop([
    ItemList['Burpmon'],
], 'Shakamon');
const ShoutmonDX = new Shop([
    ItemList['Burpmon'],
], 'Shoutmon DX');
const ShoutmonEX6 = new Shop([
    ItemList['Burpmon'],
], 'Shoutmon EX6');
const ShoutmonX7 = new Shop([
    ItemList['Burpmon'],
], 'Shoutmon X7');
const ShoutmonX7SuperiorMode = new Shop([
    ItemList['Burpmon'],
], 'Shoutmon X7 Superior Mode');
const Venusmon = new Shop([
    ItemList['Burpmon'],
], 'Venusmon');
const Vulcanusmon = new Shop([
    ItemList['Burpmon'],
], 'Vulcanusmon');
const ZekeGreymon = new Shop([
    ItemList['Burpmon'],
], 'Zeke Greymon');
const Armamon = new Shop([
    ItemList['Burpmon'],
], 'Armamon');
const DarkVolumon = new Shop([
    ItemList['Burpmon'],
], 'Dark Volumon');
const DeadlyTuwarmon = new Shop([
    ItemList['Burpmon'],
], 'Deadly Tuwarmon');
const GrandGeneramon = new Shop([
    ItemList['Burpmon'],
], 'Grand Generamon');
const GreyKnightsmon = new Shop([
    ItemList['Burpmon'],
], 'Grey Knightsmon');
const OmegaArmamonBM = new Shop([
    ItemList['Burpmon'],
], 'Omega Armamon BM');
const ShoutmonX3GM = new Shop([
    ItemList['Burpmon'],
], 'Shoutmon X3GM');
const ShoutmonX3SD = new Shop([
    ItemList['Burpmon'],
], 'Shoutmon X3SD');
const ShoutmonX4S = new Shop([
    ItemList['Burpmon'],
], 'Shoutmon X4S');
const ShoutmonX5S = new Shop([
    ItemList['Burpmon'],
], 'Shoutmon X5S');
const Huckmon = new Shop([
    ItemList['Burpmon'],
], 'Huckmon');
const Pillomon = new Shop([
    ItemList['Burpmon'],
], 'Pillomon');
const SistermonBlanc = new Shop([
    ItemList['Burpmon'],
], 'Sistermon Blanc');
const SistermonNoir = new Shop([
    ItemList['Burpmon'],
], 'Sistermon Noir');
const Yakiimon = new Shop([
    ItemList['Burpmon'],
], 'Yakiimon');
const ArresterdramonSuperiorMode = new Shop([
    ItemList['Burpmon'],
], 'Arresterdramon Superior Mode');
const Jokermon = new Shop([
    ItemList['Burpmon'],
], 'Jokermon');
const Luminamon = new Shop([
    ItemList['Burpmon'],
], 'Luminamon');
const LuminamonNeneVersion = new Shop([
    ItemList['Burpmon'],
], 'Luminamon Nene Version');
const Gankoomon = new Shop([
    ItemList['Burpmon'],
], 'Gankoomon');
const Quartzmon = new Shop([
    ItemList['Burpmon'],
], 'Quartzmon');
const SistermonBlancAwaken = new Shop([
    ItemList['Burpmon'],
], 'Sistermon Blanc Awaken');
const Aegiomon = new Shop([
    ItemList['Burpmon'],
], 'Aegiomon');
const SistermonNoirAwaken = new Shop([
    ItemList['Burpmon'],
], 'Sistermon Noir Awaken');
const Aegiochusmon = new Shop([
    ItemList['Burpmon'],
], 'Aegiochusmon');
const AegiochusmonBlue = new Shop([
    ItemList['Burpmon'],
], 'Aegiochusmon Blue');
const AegiochusmonGreen = new Shop([
    ItemList['Burpmon'],
], 'Aegiochusmon Green');
const CerberumonWerewolfMode = new Shop([
    ItemList['Burpmon'],
], 'Cerberumon Werewolf Mode');
const Sirenmon = new Shop([
    ItemList['Burpmon'],
], 'Sirenmon');
const AvengeKidmon = new Shop([
    ItemList['Burpmon'],
], 'Avenge Kidmon');
const Bacchusmon = new Shop([
    ItemList['Burpmon'],
], 'Bacchusmon');
const BeelStarmon = new Shop([
    ItemList['Burpmon'],
], 'Beel Starmon');
const Ceresmon = new Shop([
    ItemList['Burpmon'],
], 'Ceresmon');
const CeresmonMedium = new Shop([
    ItemList['Burpmon'],
], 'Ceresmon Medium');
const Jupitermon = new Shop([
    ItemList['Burpmon'],
], 'Jupitermon');
const KuzuhamonMikoMode = new Shop([
    ItemList['Burpmon'],
], 'Kuzuhamon Miko Mode');
const MagnaKidmon = new Shop([
    ItemList['Burpmon'],
], 'Magna Kidmon');
const Plutomon = new Shop([
    ItemList['Burpmon'],
], 'Plutomon');
const RustTyranomon = new Shop([
    ItemList['Burpmon'],
], 'Rust Tyranomon');
const Titamon = new Shop([
    ItemList['Burpmon'],
], 'Titamon');
const BaoHuckmon = new Shop([
    ItemList['Burpmon'],
], 'Bao Huckmon');
const AegiochusmonDark = new Shop([
    ItemList['Burpmon'],
], 'Aegiochusmon Dark');
const AegiochusmonHoly = new Shop([
    ItemList['Burpmon'],
], 'Aegiochusmon Holy');
const SaviorHuckmon = new Shop([
    ItemList['Burpmon'],
], 'Savior Huckmon');
const BanchoGolemon = new Shop([
    ItemList['Burpmon'],
], 'Bancho Golemon');
const BanchoLilimon = new Shop([
    ItemList['Burpmon'],
], 'Bancho Lilimon');
const BanchoMamemon = new Shop([
    ItemList['Burpmon'],
], 'Bancho Mamemon');
const BanchoStingmon = new Shop([
    ItemList['Burpmon'],
], 'Bancho Stingmon');
const Gundramon = new Shop([
    ItemList['Burpmon'],
], 'Gundramon');
const Jesmon = new Shop([
    ItemList['Burpmon'],
], 'Jesmon');
const Junomon = new Shop([
    ItemList['Burpmon'],
], 'Junomon');
const JunomonHystericMode = new Shop([
    ItemList['Burpmon'],
], 'Junomon Hysteric Mode');
const JupitermonWrathMode = new Shop([
    ItemList['Burpmon'],
], 'Jupitermon Wrath Mode');
const Vorvomon = new Shop([
    ItemList['Burpmon'],
], 'Vorvomon');
const GuardromonGold = new Shop([
    ItemList['Burpmon'],
], 'Guardromon Gold');
const Meicoomon = new Shop([
    ItemList['Burpmon'],
], 'Meicoomon');
const MeicrackmonViciousMode = new Shop([
    ItemList['Burpmon'],
], 'Meicrackmon Vicious Mode');
const Mastemon = new Shop([
    ItemList['Burpmon'],
], 'Mastemon');
const OmegamonAlter-B = new Shop([
    ItemList['Burpmon'],
], 'Omegamon Alter-B');
const OmegamonZwartDefeat = new Shop([
    ItemList['Burpmon'],
], 'Omegamon Zwart Defeat');
const Volcanicdramon = new Shop([
    ItemList['Burpmon'],
], 'Volcanicdramon');
const Sakumon = new Shop([
    ItemList['Burpmon'],
], 'Sakumon');
const Sakuttomon = new Shop([
    ItemList['Burpmon'],
], 'Sakuttomon');
const Ludomon = new Shop([
    ItemList['Burpmon'],
], 'Ludomon');
const Zubamon = new Shop([
    ItemList['Burpmon'],
], 'Zubamon');
const Hudiemon = new Shop([
    ItemList['Burpmon'],
], 'Hudiemon');
const Lavorvomon = new Shop([
    ItemList['Burpmon'],
], 'Lavorvomon');
const SistermonCiel = new Shop([
    ItemList['Burpmon'],
], 'Sistermon Ciel');
const SistermonCielAwaken = new Shop([
    ItemList['Burpmon'],
], 'Sistermon Ciel Awaken');
const Zubaeagermon = new Shop([
    ItemList['Burpmon'],
], 'Zubaeagermon');
const Duramon = new Shop([
    ItemList['Burpmon'],
], 'Duramon');
const Lavogaritamon = new Shop([
    ItemList['Burpmon'],
], 'Lavogaritamon');
const Meicrackmon = new Shop([
    ItemList['Burpmon'],
], 'Meicrackmon');
const BlitzGreymon = new Shop([
    ItemList['Burpmon'],
], 'Blitz Greymon');
const CresGarurumon = new Shop([
    ItemList['Burpmon'],
], 'Cres Garurumon');
const Durandamon = new Shop([
    ItemList['Burpmon'],
], 'Durandamon');
const GraceNovamon = new Shop([
    ItemList['Burpmon'],
], 'Grace Novamon');
const OmegamonAlter-S = new Shop([
    ItemList['Burpmon'],
], 'Omegamon Alter-S');
const Ordinemon = new Shop([
    ItemList['Burpmon'],
], 'Ordinemon');
const Raguelmon = new Shop([
    ItemList['Burpmon'],
], 'Raguelmon');
const Rasielmon = new Shop([
    ItemList['Burpmon'],
], 'Rasielmon');
const Voltobautamon = new Shop([
    ItemList['Burpmon'],
], 'Voltobautamon');
const Cotsucomon = new Shop([
    ItemList['Burpmon'],
], 'Cotsucomon');
const Pusumon = new Shop([
    ItemList['Burpmon'],
], 'Pusumon');
const Kakkinmon = new Shop([
    ItemList['Burpmon'],
], 'Kakkinmon');
const Pusurimon = new Shop([
    ItemList['Burpmon'],
], 'Pusurimon');
const Bulucomon = new Shop([
    ItemList['Burpmon'],
], 'Bulucomon');
const DracomonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Dracomon X-Antibody');
const Herissmon = new Shop([
    ItemList['Burpmon'],
], 'Herissmon');
const RenamonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Renamon X-Antibody');
const TerriermonAssistant = new Shop([
    ItemList['Burpmon'],
], 'Terriermon Assistant');
const Filmon = new Shop([
    ItemList['Burpmon'],
], 'Filmon');
const Paledramon = new Shop([
    ItemList['Burpmon'],
], 'Paledramon');
const TiaLudomon = new Shop([
    ItemList['Burpmon'],
], 'Tia Ludomon');
const TyranomonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Tyranomon X-Antibody');
const CrysPaledramon = new Shop([
    ItemList['Burpmon'],
], 'Crys Paledramon');
const RaijiLudomon = new Shop([
    ItemList['Burpmon'],
], 'Raiji Ludomon');
const Stiffilmon = new Shop([
    ItemList['Burpmon'],
], 'Stiffilmon');
const BeelStarmonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Beel Starmon X-Antibody');
const Bryweludramon = new Shop([
    ItemList['Burpmon'],
], 'Bryweludramon');
const CraniummonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Craniummon X-Antibody');
const DiablomonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Diablomon X-Antibody');
const JesmonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Jesmon X-Antibody');
const LordKnightmonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Lord Knightmon X-Antibody');
const MinervamonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Minervamon X-Antibody');
const OmegamonMercifulMode = new Shop([
    ItemList['Burpmon'],
], 'Omegamon Merciful Mode');
const Rafflesimon = new Shop([
    ItemList['Burpmon'],
], 'Rafflesimon');
const RagnaLordmon = new Shop([
    ItemList['Burpmon'],
], 'Ragna Lordmon');
const SakuyamonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Sakuyamon X-Antibody');
const SleipmonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Sleipmon X-Antibody');
const AgumonBlackX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Agumon Black X-Antibody');
const ImpmonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Impmon X-Antibody');
const Jazamon = new Shop([
    ItemList['Burpmon'],
], 'Jazamon');
const KeramonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Keramon X-Antibody');
const LopmonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Lopmon X-Antibody');
const TerriermonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Terriermon X-Antibody');
const DarkTyranomonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Dark Tyranomon X-Antibody');
const Jazardmon = new Shop([
    ItemList['Burpmon'],
], 'Jazardmon');
const MeramonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Meramon X-Antibody');
const NumemonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Numemon X-Antibody');
const OrgemonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Orgemon X-Antibody');
const PegasmonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Pegasmon X-Antibody');
const SiesamonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Siesamon X-Antibody');
const WizarmonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Wizarmon X-Antibody');
const AngewomonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Angewomon X-Antibody');
const CyberdramonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Cyberdramon X-Antibody');
const Jazarichmon = new Shop([
    ItemList['Burpmon'],
], 'Jazarichmon');
const LadyDevimonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Lady Devimon X-Antibody');
const MephismonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Mephismon X-Antibody');
const MetalGreymonVirusX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Metal Greymon Virus X-Antibody');
const MonzaemonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Monzaemon X-Antibody');
const OmegaShoutmonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Omega Shoutmon X-Antibody');
const RizeGreymonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Rize Greymon X-Antibody');
const VamdemonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Vamdemon X-Antibody');
const BarbamonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Barbamon X-Antibody');
const BelphemonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Belphemon X-Antibody');
const CherubimonViceX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Cherubimon Vice X-Antibody');
const CherubimonVirtueX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Cherubimon Virtue X-Antibody');
const DarkKnightmonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Dark Knightmon X-Antibody');
const DemonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Demon X-Antibody');
const ExamonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Examon X-Antibody');
const GankoomonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Gankoomon X-Antibody');
const Hexeblaumon = new Shop([
    ItemList['Burpmon'],
], 'Hexeblaumon');
const HououmonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Hououmon X-Antibody');
const JesmonGX = new Shop([
    ItemList['Burpmon'],
], 'Jesmon GX');
const JustimonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Justimon X-Antibody');
const LeviamonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Leviamon X-Antibody');
const LilithmonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Lilithmon X-Antibody');
const LucemonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Lucemon X-Antibody');
const Metallicdramon = new Shop([
    ItemList['Burpmon'],
], 'Metallicdramon');
const NoblePumpmon = new Shop([
    ItemList['Burpmon'],
], 'Noble Pumpmon');
const OfanimonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Ofanimon X-Antibody');
const OfanimonFalldownModeX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Ofanimon Falldown Mode X-Antibody');
const OgudomonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Ogudomon X-Antibody');
const RapidmonX-Antibody = new Shop([
    ItemList['Burpmon'],
], 'Rapidmon X-Antibody');
const Rasenmon = new Shop([
    ItemList['Burpmon'],
], 'Rasenmon');
const RasenmonFuryMode = new Shop([
    ItemList['Burpmon'],
], 'Rasenmon Fury Mode');
const AlgomonBabyI = new Shop([
    ItemList['Burpmon'],
], 'Algomon Baby I');
const Dokimon = new Shop([
    ItemList['Burpmon'],
], 'Dokimon');
const AlgomonBabyII = new Shop([
    ItemList['Burpmon'],
], 'Algomon Baby II');
const Bibimon = new Shop([
    ItemList['Burpmon'],
], 'Bibimon');
const AlgomonChild = new Shop([
    ItemList['Burpmon'],
], 'Algomon Child');
const Ghostmon = new Shop([
    ItemList['Burpmon'],
], 'Ghostmon');
const Junkmon = new Shop([
    ItemList['Burpmon'],
], 'Junkmon');
const Morphomon = new Shop([
    ItemList['Burpmon'],
], 'Morphomon');
const Pomumon = new Shop([
    ItemList['Burpmon'],
], 'Pomumon');
const Pulsemon = new Shop([
    ItemList['Burpmon'],
], 'Pulsemon');
const Sangomon = new Shop([
    ItemList['Burpmon'],
], 'Sangomon');
const Sunarizamon = new Shop([
    ItemList['Burpmon'],
], 'Sunarizamon');
const AlgomonAdult = new Shop([
    ItemList['Burpmon'],
], 'Algomon Adult');
const Baboongamon = new Shop([
    ItemList['Burpmon'],
], 'Baboongamon');
const Baluchimon = new Shop([
    ItemList['Burpmon'],
], 'Baluchimon');
const Bulkmon = new Shop([
    ItemList['Burpmon'],
], 'Bulkmon');
const DarkMaildramon = new Shop([
    ItemList['Burpmon'],
], 'Dark Maildramon');
const EosmonAdult = new Shop([
    ItemList['Burpmon'],
], 'Eosmon Adult');
const Exermon = new Shop([
    ItemList['Burpmon'],
], 'Exermon');
const Eyesmon = new Shop([
    ItemList['Burpmon'],
], 'Eyesmon');
const EyesmonScatterMode = new Shop([
    ItemList['Burpmon'],
], 'Eyesmon Scatter Mode');
const Machmon = new Shop([
    ItemList['Burpmon'],
], 'Machmon');
const Mimicmon = new Shop([
    ItemList['Burpmon'],
], 'Mimicmon');
const Namakemon = new Shop([
    ItemList['Burpmon'],
], 'Namakemon');
const Parasaurmon = new Shop([
    ItemList['Burpmon'],
], 'Parasaurmon');
const Runnermon = new Shop([
    ItemList['Burpmon'],
], 'Runnermon');
const Tobiumon = new Shop([
    ItemList['Burpmon'],
], 'Tobiumon');
const Boutmon = new Shop([
    ItemList['Burpmon'],
], 'Boutmon');
const Entmon = new Shop([
    ItemList['Burpmon'],
], 'Entmon');
const EosmonPerfect = new Shop([
    ItemList['Burpmon'],
], 'Eosmon Perfect');
const Gogmamon = new Shop([
    ItemList['Burpmon'],
], 'Gogmamon');
const Gusokumon = new Shop([
    ItemList['Burpmon'],
], 'Gusokumon');
const Manticoremon = new Shop([
    ItemList['Burpmon'],
], 'Manticoremon');
const MarinChimairamon = new Shop([
    ItemList['Burpmon'],
], 'Marin Chimairamon');
const MetalGreymonAlterousMode = new Shop([
    ItemList['Burpmon'],
], 'Metal Greymon Alterous Mode');
const Piranimon = new Shop([
    ItemList['Burpmon'],
], 'Piranimon');
const Rebellimon = new Shop([
    ItemList['Burpmon'],
], 'Rebellimon');
const Toropiamon = new Shop([
    ItemList['Burpmon'],
], 'Toropiamon');
const WereGarurumonSagittariusMode = new Shop([
    ItemList['Burpmon'],
], 'Were Garurumon Sagittarius Mode');
const Agumon-YukinoKizuna- = new Shop([
    ItemList['Burpmon'],
], 'Agumon -Yuki no Kizuna-');
const DoneDevimon = new Shop([
    ItemList['Burpmon'],
], 'Done Devimon');
const EosmonUltimate = new Shop([
    ItemList['Burpmon'],
], 'Eosmon Ultimate');
const Gabumon-YujonoKizuna- = new Shop([
    ItemList['Burpmon'],
], 'Gabumon -Yujo no Kizuna-');
const HeavyLeomon = new Shop([
    ItemList['Burpmon'],
], 'Heavy Leomon');
const Kazuchimon = new Shop([
    ItemList['Burpmon'],
], 'Kazuchimon');
const Mitamamon = new Shop([
    ItemList['Burpmon'],
], 'Mitamamon');
const Nidhoggmon = new Shop([
    ItemList['Burpmon'],
], 'Nidhoggmon');
const Omedamon = new Shop([
    ItemList['Burpmon'],
], 'Omedamon');
const Regalecusmon = new Shop([
    ItemList['Burpmon'],
], 'Regalecusmon');
const Curimon = new Shop([
    ItemList['Burpmon'],
], 'Curimon');
const Hiyarimon = new Shop([
    ItemList['Burpmon'],
], 'Hiyarimon');
const Puyomon = new Shop([
    ItemList['Burpmon'],
], 'Puyomon');
const Pyonmon = new Shop([
    ItemList['Burpmon'],
], 'Pyonmon');
const Sunamon = new Shop([
    ItemList['Burpmon'],
], 'Sunamon');
const Bosamon = new Shop([
    ItemList['Burpmon'],
], 'Bosamon');
const Goromon = new Shop([
    ItemList['Burpmon'],
], 'Goromon');
const Gurimon = new Shop([
    ItemList['Burpmon'],
], 'Gurimon');
const Puyoyomon = new Shop([
    ItemList['Burpmon'],
], 'Puyoyomon');
const Negamon = new Shop([
    ItemList['Burpmon'],
], 'Negamon');
const Angoramon = new Shop([
    ItemList['Burpmon'],
], 'Angoramon');
const Gammamon = new Shop([
    ItemList['Burpmon'],
], 'Gammamon');
const Jellymon = new Shop([
    ItemList['Burpmon'],
], 'Jellymon');
const KodokugumonChild = new Shop([
    ItemList['Burpmon'],
], 'Kodokugumon Child');
const BetelGammamon = new Shop([
    ItemList['Burpmon'],
], 'Betel Gammamon');
const GulusGammamon = new Shop([
    ItemList['Burpmon'],
], 'Gulus Gammamon');
const KausGammamon = new Shop([
    ItemList['Burpmon'],
], 'Kaus Gammamon');
const Komondomon = new Shop([
    ItemList['Burpmon'],
], 'Komondomon');
const Potamon = new Shop([
    ItemList['Burpmon'],
], 'Potamon');
const SymbareAngoramon = new Shop([
    ItemList['Burpmon'],
], 'Symbare Angoramon');
const TeslaJellymon = new Shop([
    ItemList['Burpmon'],
], 'Tesla Jellymon');
const WezenGammamon = new Shop([
    ItemList['Burpmon'],
], 'Wezen Gammamon');
const BlackTailmonUver. = new Shop([
    ItemList['Burpmon'],
], 'Black Tailmon Uver.');
const Canoweissmon = new Shop([
    ItemList['Burpmon'],
], 'Canoweissmon');
const Climbmon = new Shop([
    ItemList['Burpmon'],
], 'Climbmon');
const Divemon = new Shop([
    ItemList['Burpmon'],
], 'Divemon');
const Frozomon = new Shop([
    ItemList['Burpmon'],
], 'Frozomon');
const Lamortmon = new Shop([
    ItemList['Burpmon'],
], 'Lamortmon');
const Pistmon = new Shop([
    ItemList['Burpmon'],
], 'Pistmon');
const RareRaremon = new Shop([
    ItemList['Burpmon'],
], 'Rare Raremon');
const Shootmon = new Shop([
    ItemList['Burpmon'],
], 'Shootmon');
const Tempomon = new Shop([
    ItemList['Burpmon'],
], 'Tempomon');
const Tethismon = new Shop([
    ItemList['Burpmon'],
], 'Tethismon');
const Vulturemon = new Shop([
    ItemList['Burpmon'],
], 'Vulturemon');
const Abbadomon = new Shop([
    ItemList['Burpmon'],
], 'Abbadomon');
const AbbadomonCore = new Shop([
    ItemList['Burpmon'],
], 'Abbadomon Core');
const Achillesmon = new Shop([
    ItemList['Burpmon'],
], 'Achillesmon');
const Ajatarmon = new Shop([
    ItemList['Burpmon'],
], 'Ajatarmon');
const BloomLordmon = new Shop([
    ItemList['Burpmon'],
], 'Bloom Lordmon');
const FrosVelgrmon = new Shop([
    ItemList['Burpmon'],
], 'Fros Velgrmon');
const GaioumonInvincibleSword  = new Shop([
    ItemList['Burpmon'],
], 'Gaioumon Invincible Sword ');
const Hydramon = new Shop([
    ItemList['Burpmon'],
], 'Hydramon');
const LovelyAngemon = new Shop([
    ItemList['Burpmon'],
], 'Lovely Angemon');
const Shivamon = new Shop([
    ItemList['Burpmon'],
], 'Shivamon');
const Shroudmon = new Shop([
    ItemList['Burpmon'],
], 'Shroudmon');
