/// <reference path="../../declarations/routes/Routes.d.ts"/>
/// <reference path="../../declarations/enums/Badges.d.ts"/>
/// <reference path="../../declarations/weather/WeatherType.d.ts"/>
/// <reference path="../../declarations/requirements/WeatherRequirement.d.ts"/>
/// <reference path="../../declarations/subRegion/SubRegions.d.ts"/>
/*
KANTO
*/
Routes.add(new RegionRoute(
    'Primary Path', GameConstants.Region.kanto, 1,
    new RoutePokemon({
        land: ['Pitchmon', 'Yuramon', 'Nyokimon'],
    })
));
Routes.add(new RegionRoute(
    'Digital Forest', GameConstants.Region.kanto, 22,
    new RoutePokemon({
        land: ['Triceramon', 'Vermillimon', 'Metal Etemon', 'Blossomon', 'Zassoumon'],
        water: ['Mega Seadramon', 'Seadramon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Pinochimon\'s House')),],
));
Routes.add(new RegionRoute(
    'Rookie Woods', GameConstants.Region.kanto, 2,
    new RoutePokemon({
        land: ['Tanemon', 'Mochimon', 'Pukamon', 'Pyocomon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 1)]
));
Routes.add(new RegionRoute(
    'Trolley Lake', GameConstants.Region.kanto, 3,
    new RoutePokemon({
        land: ['Numemon', 'Mushmon', 'Betamon', 'Kunemon'],
        water: ['Ganimon', 'Betamon'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 2),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Coelamon Beach')),
    ]
));
Routes.add(new RegionRoute(
    'PowerLine Sands', GameConstants.Region.kanto, 4,
    new RoutePokemon({
        land: ['Gottsumon', 'Modoki Betamon', 'Betamon', 'Numemon'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 3),
    ]
));
Routes.add(new RegionRoute(
    'Numemon Sewers', GameConstants.Region.kanto, 5,
    new RoutePokemon({
        land: ['Numemon', 'Betamon', 'Otamamon', 'Tyumon'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 4),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Andromon\'s Factory')),
    ]
));
Routes.add(new RegionRoute(
    'Infinity Climb', GameConstants.Region.kanto, 6,
    new RoutePokemon({
        land: ['Gottsumon', 'Modoki Betamon', 'Mushmon', 'Cyclomon', 'Drimogemon', 'Goburimon'],
        water: ['Modoki Betamon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 5)]
));
Routes.add(new RegionRoute(
    'Desert Oasis', GameConstants.Region.kanto, 11,
    new RoutePokemon({
        land: ['Drimogemon', 'Golemon', 'Meramon', 'Minotaurmon', 'Sand Yanmamon'],
        water: ['Karatuki Numemon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 10)],
));
Routes.add(new RegionRoute(
    'Infinity Cliffs', GameConstants.Region.kanto, 9,
    new RoutePokemon({
        land: ['Elecmon', 'Toy Agumon', 'Mushmon', 'Kuwagamon', 'Monochromon', 'Tyranomon'],
        water: ['Seadramon', 'Gizamon', 'Otamamon', 'Shakomon'],
    }),
    [
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Devimon Battle')),
        new RouteKillRequirement(10, GameConstants.Region.kanto, 8),
    ]
));
Routes.add(new RegionRoute(
    'Net Ocean', GameConstants.Region.kanto, 10,
    new RoutePokemon({
        land: ['Otamamon', 'Karatuki Numemon'],
        water: ['Shakomon', 'Coelamon', 'Ebidramon', 'Octmon'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 9),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Devimon Battle')),
    ]
));
Routes.add(new RegionRoute(
    'Bakemon Church', GameConstants.Region.kanto, 8,
    new RoutePokemon({
        land: ['Bakemon', 'Dokunemon', 'Candmon', 'Tukaimon', 'Numemon', 'Gokimon', 'Woodmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Digivice Temple'))],
));
Routes.add(new RegionRoute(
    'Frozen Tundra', GameConstants.Region.kanto, 7,
    new RoutePokemon({
        land: ['Yukidarumon', 'Mojyamon', 'Betamon', 'Icemon', 'Yuki Agumon', 'Penmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 6)],
));
Routes.add(new RegionRoute(
    'Cockatrimon\'s Ship', GameConstants.Region.kanto, 12,
    new RoutePokemon({
        land: ['Drimogemon', 'Meramon', 'Monochromon', 'Orgemon', 'Birdramon', 'Sand Yanmamon', 'Togemon', 'Cockatrimon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Lost Colosseum'))]
));
Routes.add(new RegionRoute(
    'Vast Desert', GameConstants.Region.kanto, 13,
    new RoutePokemon({
        land: ['Drimogemon', 'Meramon', 'Birdramon', 'Flare Lizarmon', 'Monochromon', 'Sand Yanmamon', 'Insekimon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 12)]
));
Routes.add(new RegionRoute(
    'Digitamamon\'s Diner', GameConstants.Region.kanto, 14,
    new RoutePokemon({
        land: ['Yanmamon', 'Vegimon', 'Jyagamon', 'Scumon', 'Red Vegimon', 'Digitamamon', 'Triceramon'],
        water: ['Rukamon', 'Seadramon', 'Octmon'],
    }),
    [
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Etemon\'s Pyramid')),
    ]
));
Routes.add(new RegionRoute(
    'Castle Way', GameConstants.Region.kanto, 15,
    new RoutePokemon({
        land: ['Otamamon', 'Gekomon', 'Jungle Mojyamon', 'Karatuki Numemon', 'Mega Seadramon', 'Vermillimon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Thunder)]
));
Routes.add(new RegionRoute(
    'Army Grounds', GameConstants.Region.kanto, 16,
    new RoutePokemon({
        land: ['Waru Monzaemon', 'Mamemon', 'Giromon', 'Fantomon', 'Death Meramon', 'Evilmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Soul)]
));
Routes.add(new RegionRoute(
    'Road\'s End', GameConstants.Region.kanto, 17,
    new RoutePokemon({
        land: ['Snimon', 'Yanmamon', 'Unimon', 'Ookuwamon'],
        water: ['Seadramon', 'Mega Seadramon', 'Octmon', 'Coelamon', 'Shakomon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 16)]
));
Routes.add(new RegionRoute(
    'Tokyo Pier', GameConstants.Region.kanto, 18,
    new RoutePokemon({
        land: ['Gokimon', 'Vermillimon', 'Scumon', 'Minotaurmon', 'Death Meramon'],
        water: ['Ebidramon', 'Gesomon', 'Karatuki Numemon', 'Raremon'],
    }),
    [
       new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Vamdemon\'s Castle')),
    ]
));
Routes.add(new RegionRoute(
    'Tokyo Streets', GameConstants.Region.kanto, 19,
    new RoutePokemon({
        water: ['Pumpmon', 'Gottsumon', 'Geremon', 'Gerbemon', 'Mammon', 'Parrotmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Marsh)]
));
Routes.add(new RegionRoute(
    'Digital Ocean', GameConstants.Region.kanto, 20,
    new RoutePokemon({
        water: ['Marin Devimon', 'Hangyomon', 'Whamon', 'Dagomon', 'Waru Seadramon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('VenomVamdemon Rampage'))]
));
Routes.add(new RegionRoute(
    'Whamon\'s Rest', GameConstants.Region.kanto, 21,
    new RoutePokemon({
        land: ['Vermillimon', 'Triceramon', 'Ookuwamon', 'Jyureimon', 'Jyagamon'],
        water: ['Waru Seadramon', 'Mega Seadramon', 'Anomalocarimon', 'Dagomon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Metal Seadramon\'s Lair'))]
));
Routes.add(new RegionRoute(
    'Digital Wasteland', GameConstants.Region.kanto, 23,
    new RoutePokemon({
        land: ['Death Meramon', 'Skull Satamon', 'Boltmon', 'Skull Mammon', 'Metal Tyranomon'],
        water: ['Dagomon', 'Marin Devimon'],
    }),
    [
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mugendramon\'s Mill')),
        new GymBadgeRequirement(BadgeEnums.Volcano),
    ]
));

/*
JOHTO
*/
Routes.add(new RegionRoute(
    'Johto Route 29', GameConstants.Region.johto, 29,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        headbutt: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_KantoChampion)]
));
Routes.add(new RegionRoute(
    'Johto Route 30', GameConstants.Region.johto, 30,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon'],
        headbutt: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.johto, 29)]
));
Routes.add(new RegionRoute(
    'Johto Route 31', GameConstants.Region.johto, 31,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon'],
        headbutt: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.johto, 30)]
));
Routes.add(new RegionRoute(
    'Johto Route 32', GameConstants.Region.johto, 32,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        headbutt: ['Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Zephyr)]
));
Routes.add(new RegionRoute(
    'Johto Route 33', GameConstants.Region.johto, 33,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        headbutt: ['Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Union Cave'))]
));
Routes.add(new RegionRoute(
    'Johto Route 34', GameConstants.Region.johto, 34,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        headbutt: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Ilex Forest'))]
));
Routes.add(new RegionRoute(
    'Johto Route 35', GameConstants.Region.johto, 35,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        headbutt: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.johto, 34)]
));
Routes.add(new RegionRoute(
    'Johto Route 36', GameConstants.Region.johto, 36,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        headbutt: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Plain)]
));
Routes.add(new RegionRoute(
    'Johto Route 37', GameConstants.Region.johto, 37,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        headbutt: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.johto, 36)]
));
Routes.add(new RegionRoute(
    'Johto Route 38', GameConstants.Region.johto, 38,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        headbutt: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.johto, 37)]
));
Routes.add(new RegionRoute(
    'Johto Route 39', GameConstants.Region.johto, 39,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        headbutt: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.johto, 38)]
));
Routes.add(new RegionRoute(
    'Johto Route 40', GameConstants.Region.johto, 40,
    new RoutePokemon({
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.johto, 39),
        new GymBadgeRequirement(BadgeEnums.Fog),
    ]
));
Routes.add(new RegionRoute(
    'Johto Route 41', GameConstants.Region.johto, 41,
    new RoutePokemon({
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.johto, 40)]
));
Routes.add(new RegionRoute(
    'Johto Route 42', GameConstants.Region.johto, 42,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon'],
        headbutt: ['Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Fog)]
));
Routes.add(new RegionRoute(
    'Johto Route 43', GameConstants.Region.johto, 43,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon'],
        headbutt: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [
        new OneFromManyRequirement([
            new MultiRequirement([
                new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mt Mortar')),
                new GymBadgeRequirement(BadgeEnums.Fog),
            ]),
            new RouteKillRequirement(10, GameConstants.Region.johto, 42),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Johto Route 44', GameConstants.Region.johto, 44,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        headbutt: ['Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Radio Tower'))]
));
Routes.add(new RegionRoute(
    'Johto Route 45', GameConstants.Region.johto, 45,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon'],
        headbutt: ['Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Ice Path'))]
));
Routes.add(new RegionRoute(
    'Johto Route 46', GameConstants.Region.johto, 46,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon'],
        headbutt: ['Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.johto, 29)],
    29.1
));
Routes.add(new RegionRoute(
    'Johto Route 47', GameConstants.Region.johto, 47,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        headbutt: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Mineral)]
));
Routes.add(new RegionRoute(
    'Johto Route 48', GameConstants.Region.johto, 48,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        headbutt: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.johto, 47)]
));
Routes.add(new RegionRoute(
    'Johto Route 26', GameConstants.Region.johto, 26,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        headbutt: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.johto, 27)],
    50
));
Routes.add(new RegionRoute(
    'Johto Route 27', GameConstants.Region.johto, 27,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        headbutt: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Rising)],
    49
));
Routes.add(new RegionRoute(
    'Johto Route 28', GameConstants.Region.johto, 28,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon'],
        headbutt: ['Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion)],
    51
));

/*
HOENN
*/
Routes.add(new RegionRoute(
    'Hoenn Route 101', GameConstants.Region.hoenn, 101,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 102', GameConstants.Region.hoenn, 102,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 101)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 103', GameConstants.Region.hoenn, 103,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 101)],
    101.1
));
Routes.add(new RegionRoute(
    'Hoenn Route 104', GameConstants.Region.hoenn, 104,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 102)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 105', GameConstants.Region.hoenn, 105,
    new RoutePokemon({
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Balance)],
    115.1
));
Routes.add(new RegionRoute(
    'Hoenn Route 106', GameConstants.Region.hoenn, 106,
    new RoutePokemon({
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.hoenn, 105),
            new RouteKillRequirement(10, GameConstants.Region.hoenn, 107),
        ]),
    ],
    115.2
));
Routes.add(new RegionRoute(
    'Hoenn Route 107', GameConstants.Region.hoenn, 107,
    new RoutePokemon({
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.hoenn, 106),
            new RouteKillRequirement(10, GameConstants.Region.hoenn, 108),
        ]),
    ],
    115.3
));
Routes.add(new RegionRoute(
    'Hoenn Route 108', GameConstants.Region.hoenn, 108,
    new RoutePokemon({
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.hoenn, 107),
            new RouteKillRequirement(10, GameConstants.Region.hoenn, 109),
        ]),
    ],
    115.4
));
Routes.add(new RegionRoute(
    'Hoenn Route 109', GameConstants.Region.hoenn, 109,
    new RoutePokemon({
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Balance)],
    115.5
));
Routes.add(new RegionRoute(
    'Hoenn Route 110', GameConstants.Region.hoenn, 110,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Granite Cave')),
        new GymBadgeRequirement(BadgeEnums.Knuckle),
    ]
));
Routes.add(new RegionRoute(
    'Hoenn Route 111', GameConstants.Region.hoenn, 111,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        headbutt: ['Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Dynamo)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 112', GameConstants.Region.hoenn, 112,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 111)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 113', GameConstants.Region.hoenn, 113,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Fiery Path'))]
));
Routes.add(new RegionRoute(
    'Hoenn Route 114', GameConstants.Region.hoenn, 114,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        headbutt: ['Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 113)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 115', GameConstants.Region.hoenn, 115,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Meteor Falls'))]
));
Routes.add(new RegionRoute(
    'Hoenn Route 116', GameConstants.Region.hoenn, 116,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Petalburg Woods'))],
    104.1
));
Routes.add(new RegionRoute(
    'Hoenn Route 117', GameConstants.Region.hoenn, 117,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 110)],
    110.1
));
Routes.add(new RegionRoute(
    'Hoenn Route 118', GameConstants.Region.hoenn, 118,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Balance)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 119', GameConstants.Region.hoenn, 119,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon'], new MultiRequirement([
              new ObtainedPokemonRequirement(pokemonMap.Burpmon),
              new WeatherRequirement([WeatherType.Sunny]),
          ])),
          new SpecialRoutePokemon(['Burpmon'], new MultiRequirement([
              new ObtainedPokemonRequirement(pokemonMap.Burpmon),
              new WeatherRequirement([WeatherType.Rain, WeatherType.Thunderstorm]),
          ])),
          new SpecialRoutePokemon(['Burpmon'], new MultiRequirement([
              new ObtainedPokemonRequirement(pokemonMap.Burpmon),
              new WeatherRequirement([WeatherType.Snow, WeatherType.Blizzard, WeatherType.Hail, WeatherType.Fog]),
          ])),
      ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 118)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 120', GameConstants.Region.hoenn, 120,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.hoenn, 119),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Weather Institute')),
    ]
));
Routes.add(new RegionRoute(
    'Hoenn Route 121', GameConstants.Region.hoenn, 121,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 120)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 122', GameConstants.Region.hoenn, 122,
    new RoutePokemon({
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.hoenn, 121),
        new GymBadgeRequirement(BadgeEnums.Feather),
    ]
));
Routes.add(new RegionRoute(
    'Hoenn Route 123', GameConstants.Region.hoenn, 123,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 122)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 124', GameConstants.Region.hoenn, 124,
    new RoutePokemon({
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Aqua Hideout'))]
));
Routes.add(new RegionRoute(
    'Hoenn Route 125', GameConstants.Region.hoenn, 125,
    new RoutePokemon({
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 124)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 126', GameConstants.Region.hoenn, 126,
    new RoutePokemon({
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 124)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 127', GameConstants.Region.hoenn, 127,
    new RoutePokemon({
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.hoenn, 125),
            new RouteKillRequirement(10, GameConstants.Region.hoenn, 126),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Hoenn Route 128', GameConstants.Region.hoenn, 128,
    new RoutePokemon({
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 127)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 129', GameConstants.Region.hoenn, 129,
    new RoutePokemon({
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 128)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 130', GameConstants.Region.hoenn, 130,
    new RoutePokemon({
        land: ['Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 129)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 131', GameConstants.Region.hoenn, 131,
    new RoutePokemon({
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 130)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 132', GameConstants.Region.hoenn, 132,
    new RoutePokemon({
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 131)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 133', GameConstants.Region.hoenn, 133,
    new RoutePokemon({
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 132)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 134', GameConstants.Region.hoenn, 134,
    new RoutePokemon({
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 133)]
));

/*
SINNOH
*/
Routes.add(new RegionRoute(
    'Sinnoh Route 201', GameConstants.Region.sinnoh, 201,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 202', GameConstants.Region.sinnoh, 202,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 201)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 203', GameConstants.Region.sinnoh, 203,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 202)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 204', GameConstants.Region.sinnoh, 204,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 202)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 205', GameConstants.Region.sinnoh, 205,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Valley Windworks'))]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 206', GameConstants.Region.sinnoh, 206,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Galactic Eterna Building'))]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 207', GameConstants.Region.sinnoh, 207,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 206)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 208', GameConstants.Region.sinnoh, 208,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mt. Coronet South'))]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 209', GameConstants.Region.sinnoh, 209,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Relic)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 210', GameConstants.Region.sinnoh, 210,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 209)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 215', GameConstants.Region.sinnoh, 215,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 210)],
    210.1
));
Routes.add(new RegionRoute(
    'Sinnoh Route 214', GameConstants.Region.sinnoh, 214,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 215)],
    210.2
));
Routes.add(new RegionRoute(
    'Sinnoh Route 213', GameConstants.Region.sinnoh, 213,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 214)],
    210.3
));
Routes.add(new RegionRoute(
    'Sinnoh Route 212', GameConstants.Region.sinnoh, 212,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 213)],
    210.4
));
Routes.add(new RegionRoute(
    'Sinnoh Route 211', GameConstants.Region.sinnoh, 211,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Fen)],
    210.5
));
Routes.add(new RegionRoute(
    'Sinnoh Route 218', GameConstants.Region.sinnoh, 218,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Fen)],
    210.6
));
Routes.add(new RegionRoute(
    'Sinnoh Route 216', GameConstants.Region.sinnoh, 216,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mt. Coronet North'))]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 217', GameConstants.Region.sinnoh, 217,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 216)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 219', GameConstants.Region.sinnoh, 219,
    new RoutePokemon({
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Fen)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 220', GameConstants.Region.sinnoh, 220,
    new RoutePokemon({
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 219)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 221', GameConstants.Region.sinnoh, 221,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 220)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 222', GameConstants.Region.sinnoh, 222,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Distortion World'))]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 223', GameConstants.Region.sinnoh, 223,
    new RoutePokemon({
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Beacon)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 224', GameConstants.Region.sinnoh, 224,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 225', GameConstants.Region.sinnoh, 225,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 226', GameConstants.Region.sinnoh, 226,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 225)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 227', GameConstants.Region.sinnoh, 227,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 226)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 228', GameConstants.Region.sinnoh, 228,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 226)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 229', GameConstants.Region.sinnoh, 229,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 228)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 230', GameConstants.Region.sinnoh, 230,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 229)]
));

/*
UNOVA
*/
Routes.add(new RegionRoute(
    'Unova Route 19', GameConstants.Region.unova, 19,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)],
    0.1
));
Routes.add(new RegionRoute(
    'Unova Route 20', GameConstants.Region.unova, 20,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.unova, 19)],
    0.2
));
Routes.add(new RegionRoute(
    'Unova Route 4', GameConstants.Region.unova, 4,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Toxic)]
));
Routes.add(new RegionRoute(
    'Desert Resort', GameConstants.Region.unova, 25,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: [],
    }),
    [
        new MultiRequirement([
            new RouteKillRequirement(10, GameConstants.Region.unova, 4),
            new GymBadgeRequirement(BadgeEnums.Insect),
        ]),
    ],
    4
));
Routes.add(new RegionRoute(
    'Unova Route 5', GameConstants.Region.unova, 5,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.unova, 4),
        new GymBadgeRequirement(BadgeEnums.Insect),
    ]
));
Routes.add(new RegionRoute(
    'Unova Route 16', GameConstants.Region.unova, 16,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [

        new RouteKillRequirement(10, GameConstants.Region.unova, 4),
        new GymBadgeRequirement(BadgeEnums.Insect),
    ],
    5
));
Routes.add(new RegionRoute(
    'Unova Route 6', GameConstants.Region.unova, 6,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.unova, 5),
        new GymBadgeRequirement(BadgeEnums.Bolt),
    ]
));
Routes.add(new RegionRoute(
    'Unova Route 7', GameConstants.Region.unova, 7,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Chargestone Cave')),
        new GymBadgeRequirement(BadgeEnums.Quake),
    ]
));
Routes.add(new RegionRoute(
    'Unova Route 13', GameConstants.Region.unova, 13,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Reversal Mountain'))]
));
Routes.add(new RegionRoute(
    'Undella Bay', GameConstants.Region.unova, 24,
    new RoutePokemon({
        land: [],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Reversal Mountain'))],
    13
));
Routes.add(new RegionRoute(
    'Unova Route 14', GameConstants.Region.unova, 14,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Reversal Mountain'))],
    13
));
Routes.add(new RegionRoute(
    'Unova Route 12', GameConstants.Region.unova, 12,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.unova, 13)],
    13.1
));
Routes.add(new RegionRoute(
    'Unova Route 11', GameConstants.Region.unova, 11,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.unova, 12)],
    13.2
));
Routes.add(new RegionRoute(
    'Unova Route 9', GameConstants.Region.unova, 9,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.unova, 11)],
    13.3
));
Routes.add(new RegionRoute(
    'Unova Route 21', GameConstants.Region.unova, 21,
    new RoutePokemon({
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Seaside Cave'))]
));
Routes.add(new RegionRoute(
    'Unova Route 22', GameConstants.Region.unova, 22,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.unova, 21)]
));
Routes.add(new RegionRoute(
    'Unova Route 23', GameConstants.Region.unova, 23,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Giant Chasm'))]
));
Routes.add(new RegionRoute(
    'Unova Route 8', GameConstants.Region.unova, 8,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [
        new OneFromManyRequirement([
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Twist Mountain')),
            new MultiRequirement([
                new RouteKillRequirement(10, GameConstants.Region.unova, 9),
                new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion),
            ]),
        ]),
    ],
    23.1
));
Routes.add(new RegionRoute(
    'Unova Route 15', GameConstants.Region.unova, 15,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.unova, 14),
            new RouteKillRequirement(10, GameConstants.Region.unova, 16),
        ]),
        new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion),
    ],
    23.1
));
Routes.add(new RegionRoute(
    'Unova Route 3', GameConstants.Region.unova, 3,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Pinwheel Forest'))],
    23.1
));
Routes.add(new RegionRoute(
    'Unova Route 2', GameConstants.Region.unova, 2,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.unova, 3)],
    23.2
));
Routes.add(new RegionRoute(
    'Unova Route 1', GameConstants.Region.unova, 1,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.unova, 2)],
    23.3
));
Routes.add(new RegionRoute(
    'Unova Route 17', GameConstants.Region.unova, 17,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.unova, 1)],
    23.4
));
Routes.add(new RegionRoute(
    'Unova Route 18', GameConstants.Region.unova, 18,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.unova, 17)],
    23.5
));

/*
KALOS
*/
Routes.add(new RegionRoute(
    'Kalos Route 1', GameConstants.Region.kalos, 1,
    new RoutePokemon({
        land: ['Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)]
));
Routes.add(new RegionRoute(
    'Kalos Route 2', GameConstants.Region.kalos, 2,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 1)]
));
Routes.add(new RegionRoute(
    'Kalos Route 3', GameConstants.Region.kalos, 3,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Santalune Forest'))]
));
Routes.add(new RegionRoute(
    'Kalos Route 22', GameConstants.Region.kalos, 22,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 3)],
    3.1
));
Routes.add(new RegionRoute(
    'Kalos Route 4', GameConstants.Region.kalos, 4,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Bug)]
));
Routes.add(new RegionRoute(
    'Kalos Route 5', GameConstants.Region.kalos, 5,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 4)]
));
Routes.add(new RegionRoute(
    'Kalos Route 6', GameConstants.Region.kalos, 6,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 5)]
));
Routes.add(new RegionRoute(
    'Kalos Route 7', GameConstants.Region.kalos, 7,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Parfum Palace'))]
));
Routes.add(new RegionRoute(
    'Kalos Route 8', GameConstants.Region.kalos, 8,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Connecting Cave'))]
));
Routes.add(new RegionRoute(
    'Kalos Route 9', GameConstants.Region.kalos, 9,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 8)]
));
Routes.add(new RegionRoute(
    'Kalos Route 10', GameConstants.Region.kalos, 10,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Glittering Cave'))]
));
Routes.add(new RegionRoute(
    'Kalos Route 11', GameConstants.Region.kalos, 11,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [
        new GymBadgeRequirement(BadgeEnums.Cliff),
        new RouteKillRequirement(10, GameConstants.Region.kalos, 10),
    ]
));
Routes.add(new RegionRoute(
    'Kalos Route 12', GameConstants.Region.kalos, 12,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Rumble)]
    // Replace req with Tower of Mastery dungeon if implemented.
));
Routes.add(new RegionRoute(
    'Kalos Route 13', GameConstants.Region.kalos, 13,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 12)]
));
Routes.add(new RegionRoute(
    'Kalos Route 14', GameConstants.Region.kalos, 14,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Voltage)]
));
Routes.add(new RegionRoute(
    'Kalos Route 15', GameConstants.Region.kalos, 15,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Pokéball Factory'))]
    // Replace req with Pokéball Factory dungeon if implemented.
));
Routes.add(new RegionRoute(
    'Kalos Route 16', GameConstants.Region.kalos, 16,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 15)]
));
Routes.add(new RegionRoute(
    'Kalos Route 17', GameConstants.Region.kalos, 17,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Frost Cavern'))]
));
Routes.add(new RegionRoute(
    'Kalos Route 18', GameConstants.Region.kalos, 18,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Flare Secret HQ'))]
));
Routes.add(new RegionRoute(
    'Kalos Route 19', GameConstants.Region.kalos, 19,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 18)]
));
Routes.add(new RegionRoute(
    'Kalos Route 20', GameConstants.Region.kalos, 20,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 19)]
));
Routes.add(new RegionRoute(
    'Kalos Route 21', GameConstants.Region.kalos, 21,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 19)]
));
Routes.add(new RegionRoute(
    'Azure Bay', GameConstants.Region.kalos, 23,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 12)], 12
));

// From here down :
// - No named routes
// - Missing numbered route
// - No requirements
/*
ALOLA
*/
Routes.add(new RegionRoute(
    'Alola Route 1', GameConstants.Region.alola, 1,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)],
    undefined,
    AlolaSubRegions.MelemeleIsland
));
Routes.add(new RegionRoute(
    'Route 1 Hau\'oli Outskirts', GameConstants.Region.alola, 18,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 1)],
    1.1,
    AlolaSubRegions.MelemeleIsland
));
Routes.add(new RegionRoute(
    'Alola Route 2', GameConstants.Region.alola, 2,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Trainers\' School'))],
    undefined,
    AlolaSubRegions.MelemeleIsland
));
Routes.add(new RegionRoute(
    'Alola Route 3', GameConstants.Region.alola, 3,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Verdant Cavern'))],
    undefined,
    AlolaSubRegions.MelemeleIsland
));
Routes.add(new RegionRoute(
    'Melemele Sea', GameConstants.Region.alola, 19,
    new RoutePokemon({
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Brooklet Hill'))],
    5.1,
    AlolaSubRegions.MelemeleIsland
));
Routes.add(new RegionRoute(
    'Kala\'e Bay', GameConstants.Region.alola, 20,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Seaward Cave')),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Brooklet Hill')),
    ],
    5.2,
    AlolaSubRegions.MelemeleIsland
));
Routes.add(new RegionRoute(
    'Alola Route 4', GameConstants.Region.alola, 4,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.FightiniumZ)],
    undefined,
    AlolaSubRegions.AkalaIsland
));
Routes.add(new RegionRoute(
    'Alola Route 5', GameConstants.Region.alola, 5,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Paniola Ranch'))],
    undefined,
    AlolaSubRegions.AkalaIsland
));
Routes.add(new RegionRoute(
    'Alola Route 6', GameConstants.Region.alola, 6,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Brooklet Hill'))],
    undefined,
    AlolaSubRegions.AkalaIsland
));
Routes.add(new RegionRoute(
    'Alola Route 7', GameConstants.Region.alola, 7,
    new RoutePokemon({
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 6)],
    undefined,
    AlolaSubRegions.AkalaIsland
));
Routes.add(new RegionRoute(
    'Alola Route 8', GameConstants.Region.alola, 8,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Wela Volcano Park'))],
    undefined,
    AlolaSubRegions.AkalaIsland
));
Routes.add(new RegionRoute(
    'Alola Route 9', GameConstants.Region.alola, 9,
    new RoutePokemon({
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Burpmon\'s Tunnel'))],
    undefined,
    AlolaSubRegions.AkalaIsland
));
Routes.add(new RegionRoute(
    'Akala Outskirts', GameConstants.Region.alola, 21,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Memorial Hill'))],
    9.1,
    AlolaSubRegions.AkalaIsland
));
Routes.add(new RegionRoute(
    'Alola Route 10', GameConstants.Region.alola, 10,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Malie Garden'))],
    undefined,
    AlolaSubRegions.UlaulaAndPoniIslands
));
Routes.add(new RegionRoute(
    'Mount Hokulani', GameConstants.Region.alola, 22,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 10)],
    10.1,
    AlolaSubRegions.UlaulaAndPoniIslands
));
Routes.add(new RegionRoute(
    'Alola Route 11', GameConstants.Region.alola, 11,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Malie Garden'))],
    undefined,
    AlolaSubRegions.UlaulaAndPoniIslands
));
Routes.add(new RegionRoute(
    'Alola Route 12', GameConstants.Region.alola, 12,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.alola, 11),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Hokulani Observatory')),
    ],
    undefined,
    AlolaSubRegions.UlaulaAndPoniIslands
));
Routes.add(new RegionRoute(
    'Alola Route 13', GameConstants.Region.alola, 13,
    new RoutePokemon({
        water: ['Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 12)],
    undefined,
    AlolaSubRegions.UlaulaAndPoniIslands
));
Routes.add(new RegionRoute(
    'Alola Route 14', GameConstants.Region.alola, 14,
    new RoutePokemon({
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 13)],
    undefined,
    AlolaSubRegions.UlaulaAndPoniIslands
));
Routes.add(new RegionRoute(
    'Haina Desert', GameConstants.Region.alola, 23,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Thrifty Megamart'))],
    undefined,
    AlolaSubRegions.UlaulaAndPoniIslands
));
Routes.add(new RegionRoute(
    'Alola Route 15', GameConstants.Region.alola, 15,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Thrifty Megamart'))],
    undefined,
    AlolaSubRegions.UlaulaAndPoniIslands
));
Routes.add(new RegionRoute(
    'Alola Route 16', GameConstants.Region.alola, 16,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 15)],
    undefined,
    AlolaSubRegions.UlaulaAndPoniIslands
));
Routes.add(new RegionRoute(
    'Alola Route 17', GameConstants.Region.alola, 17,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Ula\'ula Meadow'))],
    undefined,
    AlolaSubRegions.UlaulaAndPoniIslands
));
Routes.add(new RegionRoute(
    'Poni Wilds', GameConstants.Region.alola, 24,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Aether Foundation'))],
    undefined,
    AlolaSubRegions.UlaulaAndPoniIslands
));
Routes.add(new RegionRoute(
    'Ancient Poni Path', GameConstants.Region.alola, 25,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 24)],
    undefined,
    AlolaSubRegions.UlaulaAndPoniIslands
));
Routes.add(new RegionRoute(
    'Poni Breaker Coast', GameConstants.Region.alola, 26,
    new RoutePokemon({
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 25)],
    undefined,
    AlolaSubRegions.UlaulaAndPoniIslands
));
Routes.add(new RegionRoute(
    'Poni Grove', GameConstants.Region.alola, 27,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)],
    undefined,
    AlolaSubRegions.UlaulaAndPoniIslands
));
Routes.add(new RegionRoute(
    'Poni Plains', GameConstants.Region.alola, 28,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 27)],
    undefined,
    AlolaSubRegions.UlaulaAndPoniIslands
));
Routes.add(new RegionRoute(
    'Poni Coast', GameConstants.Region.alola, 29,
    new RoutePokemon({
        land: ['Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 28)],
    undefined,
    AlolaSubRegions.UlaulaAndPoniIslands
));
Routes.add(new RegionRoute(
    'Poni Gauntlet', GameConstants.Region.alola, 30,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 29)],
    undefined,
    AlolaSubRegions.UlaulaAndPoniIslands
));

/*
GALAR
*/
Routes.add(new RegionRoute(
    'Galar Route 1', GameConstants.Region.galar, 1,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Slumbering Weald'))]
));
Routes.add(new RegionRoute(
    'Galar Route 2', GameConstants.Region.galar, 2,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 1)]
));
Routes.add(new RegionRoute(
    'Rolling Fields', GameConstants.Region.galar, 3,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        headbutt: ['Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 2)]
));
Routes.add(new RegionRoute(
    'Dappled Grove', GameConstants.Region.galar, 4,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        headbutt: ['Burpmon', 'Burpmon'],
        special:
      [

          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 3)]
));
Routes.add(new RegionRoute(
    'West Lake Axwell', GameConstants.Region.galar, 5,
    new RoutePokemon({
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 3)]
));
Routes.add(new RegionRoute(
    'East Lake Axwell', GameConstants.Region.galar, 6,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon','Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 5)]
));
Routes.add(new RegionRoute(
    'Giant\'s Seat', GameConstants.Region.galar, 7,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        headbutt: ['Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 3)]
));
Routes.add(new RegionRoute(
    'South Lake Miloch', GameConstants.Region.galar, 8,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon','Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 3)]
));
Routes.add(new RegionRoute(
    'North Lake Miloch', GameConstants.Region.galar, 9,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        headbutt: ['Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 7)]
));
Routes.add(new RegionRoute(
    'Galar Route 3', GameConstants.Region.galar, 10,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon','Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 6)]
));
Routes.add(new RegionRoute(
    'Galar Route 4', GameConstants.Region.galar, 11,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Galar Mine'))]
));
Routes.add(new RegionRoute(
    'Galar Route 5', GameConstants.Region.galar, 12,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Galar_Grass)]
));
Routes.add(new RegionRoute(
    'Motostoke Outskirts', GameConstants.Region.galar, 13,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Galar Mine No. 2'))]
));
Routes.add(new RegionRoute(
    'Hammerlocke Hills', GameConstants.Region.galar, 14,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Dusty Bowl'))]
));
Routes.add(new RegionRoute(
    'Galar Route 6', GameConstants.Region.galar, 15,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon'],
        headbutt: ['Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Galar_Fire)]
));
Routes.add(new RegionRoute(
    'Galar Route 7', GameConstants.Region.galar, 16,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        headbutt: ['Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Galar_Fairy)]
));
Routes.add(new RegionRoute(
    'Galar Route 8', GameConstants.Region.galar, 17,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon','Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 16)]
));
Routes.add(new RegionRoute(
    'Steamdrift Way', GameConstants.Region.galar, 18,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 17)]
));
Routes.add(new RegionRoute(
    'Galar Route 2 Lakeside', GameConstants.Region.galar, 19,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon','Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon','Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [
        new MultiRequirement([
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Tower of Darkness')),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Tower of Water')),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Galar Route 9', GameConstants.Region.galar, 20,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [
        new MultiRequirement([
            new GymBadgeRequirement(BadgeEnums.Galar_Rock),
            new GymBadgeRequirement(BadgeEnums.Galar_Ice),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Circhester Bay', GameConstants.Region.galar, 21,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        headbutt: ['Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 20)]
));
Routes.add(new RegionRoute(
    'Outer Spikemuth', GameConstants.Region.galar, 22,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon','Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon','Burpmon', 'Burpmon', 'Burpmon'],
        headbutt: ['Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 21)]
));
Routes.add(new RegionRoute(
    'Galar Route 10 Station', GameConstants.Region.galar, 23,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon','Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Galar_Dragon)]
));
Routes.add(new RegionRoute(
    'Galar Route 10 North', GameConstants.Region.galar, 24,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon','Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 23)]
));

/*
ISLE OF ARMOR
*/
Routes.add(new RegionRoute(
    'Fields of Honor', GameConstants.Region.galar, 25,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Fog])),
      ],
        headbutt: ['Burpmon', 'Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)]
));
Routes.add(new RegionRoute(
    'Soothing Wetlands', GameConstants.Region.galar, 26,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Fog])),
      ],
        headbutt: ['Burpmon', 'Burpmon'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 25),
            new RouteKillRequirement(10, GameConstants.Region.galar, 27),
            new RouteKillRequirement(10, GameConstants.Region.galar, 28),
            new RouteKillRequirement(10, GameConstants.Region.galar, 29),
            new RouteKillRequirement(10, GameConstants.Region.galar, 35),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Forest of Focus', GameConstants.Region.galar, 27,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Fog])),
      ],
        headbutt: ['Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 26),
            new RouteKillRequirement(10, GameConstants.Region.galar, 28),
            new RouteKillRequirement(10, GameConstants.Region.galar, 31),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Challenge Beach', GameConstants.Region.galar, 28,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Fog])),
      ],
        headbutt: ['Burpmon', 'Burpmon'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 26),
            new RouteKillRequirement(10, GameConstants.Region.galar, 27),
            new RouteKillRequirement(10, GameConstants.Region.galar, 39),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Courageous Cavern', GameConstants.Region.galar, 29,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon'],  new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 25),
            new RouteKillRequirement(10, GameConstants.Region.galar, 26),
            new RouteKillRequirement(10, GameConstants.Region.galar, 28),
            new RouteKillRequirement(10, GameConstants.Region.galar, 30),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Loop Lagoon', GameConstants.Region.galar, 30,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Fog])),
      ],
        headbutt: ['Burpmon', 'Burpmon'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 29),
            new RouteKillRequirement(10, GameConstants.Region.galar, 37),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Training Lowlands', GameConstants.Region.galar, 31,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Fog])),
      ],
        headbutt: ['Burpmon', 'Burpmon'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 26),
            new RouteKillRequirement(10, GameConstants.Region.galar, 34),
            new RouteKillRequirement(10, GameConstants.Region.galar, 39),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Warm-Up Tunnel', GameConstants.Region.galar, 32,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Burpmon'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Burpmon'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Burpmon'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Burpmon'], new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 31)]
));
Routes.add(new RegionRoute(
    'Potbottom Desert', GameConstants.Region.galar, 9,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 32)]
));
Routes.add(new RegionRoute(
    'Challenge Road', GameConstants.Region.galar, 34,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Fog])),
      ],
        headbutt: ['Burpmon', 'Burpmon'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 31),
            new RouteKillRequirement(10, GameConstants.Region.galar, 35),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Brawlers Cave', GameConstants.Region.galar, 35,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 26),
            new RouteKillRequirement(10, GameConstants.Region.galar, 34),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Workout Sea', GameConstants.Region.galar, 36,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Fog])),
      ],
        headbutt: ['Burpmon', 'Burpmon'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 25),
            new RouteKillRequirement(10, GameConstants.Region.galar, 35),
            new RouteKillRequirement(10, GameConstants.Region.galar, 37),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Stepping-Stone Sea', GameConstants.Region.galar, 37,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Fog])),
      ],
        headbutt: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 28),
            new RouteKillRequirement(10, GameConstants.Region.galar, 30),
            new RouteKillRequirement(10, GameConstants.Region.galar, 36),
            new RouteKillRequirement(10, GameConstants.Region.galar, 38),
            new RouteKillRequirement(10, GameConstants.Region.galar, 39),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Insular Sea', GameConstants.Region.galar, 38,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Fog])),
      ],
        headbutt: ['Burpmon', 'Burpmon'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 37),
            new RouteKillRequirement(10, GameConstants.Region.galar, 39),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Honeycalm Sea', GameConstants.Region.galar, 39,
    new RoutePokemon({
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 28),
            new RouteKillRequirement(10, GameConstants.Region.galar, 31),
            new RouteKillRequirement(10, GameConstants.Region.galar, 37),
            new RouteKillRequirement(10, GameConstants.Region.galar, 39),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Honeycalm Island', GameConstants.Region.galar, 40,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'], new WeatherRequirement([WeatherType.Fog])),
      ],
        headbutt: ['Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 39)]
));

//Crown Tundra
Routes.add(new RegionRoute(
    'Slippery Slope', GameConstants.Region.galar, 41,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Fog])),
      ],
        headbutt: ['Burpmon', 'Burpmon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)]
));
Routes.add(new RegionRoute(
    'Frostpoint Field', GameConstants.Region.galar, 42,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Fog])),
      ],
        headbutt: ['Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 41)]
));
Routes.add(new RegionRoute(
    'Giants Bed', GameConstants.Region.galar, 43,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Fog])),
      ],
        headbutt: ['Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 42)]
));
Routes.add(new RegionRoute(
    'Old Cemetery', GameConstants.Region.galar, 44,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 43)]
));
Routes.add(new RegionRoute(
    'Giants Foot', GameConstants.Region.galar, 45,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon' , 'Burpmon'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Fog])),
      ],
        headbutt: ['Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 43)]
));
Routes.add(new RegionRoute(
    'Roaring-Sea Caves', GameConstants.Region.galar, 46,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon'],  new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Burpmon'],  new WeatherRequirement([WeatherType.Blizzard])),
      ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 45)]
));
Routes.add(new RegionRoute(
    'Frigid Sea', GameConstants.Region.galar, 47,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 46)]
));
Routes.add(new RegionRoute(
    'Three-Point Pass', GameConstants.Region.galar, 48,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 47)]
));
Routes.add(new RegionRoute(
    'Lakeside Cave', GameConstants.Region.galar, 49,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 50)]
));
Routes.add(new RegionRoute(
    'Ballimere Lake', GameConstants.Region.galar, 50,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Fog])),
      ],
        headbutt: ['Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 43)]
));
Routes.add(new RegionRoute(
    'Snowslide Slope', GameConstants.Region.galar, 51,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        water: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 43)]
));
Routes.add(new RegionRoute(
    'Tunnel to the Top', GameConstants.Region.galar, 52,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 51)]
));
Routes.add(new RegionRoute(
    'Path to the Peak', GameConstants.Region.galar, 53,
    new RoutePokemon({
        land: ['Burpmon', 'Burpmon','Burpmon'],
        special:
      [
          new SpecialRoutePokemon(['Burpmon'],  new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Burpmon'],  new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Burpmon', 'Burpmon', 'Burpmon'],  new WeatherRequirement([WeatherType.Sunny])),
      ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 52)]
));
