
const GymList: { [townName: string]: Gym } = {};

// Kanto Gyms
GymList['Pewter City'] = new Gym(
    'Brock',
    'Pewter City',
    [
        new GymPokemon('Burpmon', 770, 10),
        new GymPokemon('Burpmon', 1554, 12),
    ],
    BadgeEnums.Boulder,
    250,
    'I took you for granted. As proof of your victory, here\'s the Boulder Badge!',
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 2)]
);
GymList['Cerulean City'] = new Gym(
    'Misty',
    'Cerulean City',
    [
        new GymPokemon('Burpmon', 4000, 18),
        new GymPokemon('Burpmon', 6800, 21),
    ],
    BadgeEnums.Cascade,
    500,
    'I can\'t believe I lost! All right! You can have the Cascade Badge to show you beat me!',
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 4)]
);
GymList['Vermilion City'] = new Gym(
    'Lt. Surge',
    'Vermilion City',
    [new GymPokemon('Burpmon', 37000, 28)],
    BadgeEnums.Thunder,
    1000,
    'Whoa! You\'re the real deal, kid! Fine then, take the Thunder Badge!',
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 6),
        new GymBadgeRequirement(BadgeEnums.Cascade),
    ]
);
GymList['Celadon City'] = new Gym(
    'Erika',
    'Celadon City',
    [
        new GymPokemon('Burpmon', 38810, 30),
        new GymPokemon('Burpmon', 30340, 32),
        new GymPokemon('Burpmon', 36400, 32),
    ],
    BadgeEnums.Rainbow,
    1500,
    'Oh! I concede defeat. You are remarkably strong. I must confer you the Rainbow Badge.',
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 7)]
);
GymList['Saffron City'] = new Gym(
    'Sabrina',
    'Saffron City',
    [
        new GymPokemon('Burpmon', 23040, 50),
        new GymPokemon('Burpmon', 25600, 50),
        new GymPokemon('Burpmon', 28400, 50),
    ],
    BadgeEnums.Marsh,
    2500,
    'I\'m shocked! But a loss is a loss. I admit I didn\'t work hard enough to win! You earned the Marsh Badge!',
    [new GymBadgeRequirement(BadgeEnums.Rainbow)]
);
GymList['Fuchsia City'] = new Gym(
    'Koga',
    'Fuchsia City',
    [
        new GymPokemon('Burpmon', 30780, 44),
        new GymPokemon('Burpmon', 32460, 46),
        new GymPokemon('Burpmon', 36540, 48),
        new GymPokemon('Burpmon', 37430, 50),
    ],
    BadgeEnums.Soul,
    3500,
    'Humph! You have proven your worth! Here! Take the Soul Badge!',
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.kanto, 18),
            new RouteKillRequirement(10, GameConstants.Region.kanto, 15),
        ]),
    ],
    () => {
        App.game.keyItems.gainKeyItem(KeyItemType.Safari_ticket, true);
        App.game.quests.getQuestLine('Mining Expedition').beginQuest();
    }
);
GymList['Cinnabar Island'] = new Gym(
    'Blaine',
    'Cinnabar Island',
    [
        new GymPokemon('Burpmon', 37430, 48),
        new GymPokemon('Burpmon', 45230, 50),
        new GymPokemon('Burpmon', 50290, 54),
    ],
    BadgeEnums.Volcano,
    5000,
    'I\'ve burnt out! You have earned the Volcano Badge!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Pokemon Mansion'))]
);
GymList['Viridian City'] = new Gym(
    'Giovanni',
    'Viridian City',
    [
        new GymPokemon('Burpmon', 45230, 50),
        new GymPokemon('Burpmon', 47530, 53),
        new GymPokemon('Burpmon', 48740, 53),
        new GymPokemon('Burpmon', 48350, 55),
        new GymPokemon('Burpmon', 55000, 55),
    ],
    BadgeEnums.Earth,
    6000,
    'Ha! That was a truly intense fight! You have won! As proof, here is the Earth Badge!',
    [
        new GymBadgeRequirement(BadgeEnums.Volcano),
        new GymBadgeRequirement(BadgeEnums.Marsh),
        new GymBadgeRequirement(BadgeEnums.Thunder),
    ],
    () => {
        App.game.keyItems.gainKeyItem(KeyItemType.Gem_case, true);
    }
);

// Kanto Elite 4
GymList['Elite Lorelei'] = new Gym(
    'Lorelei',
    'Elite Lorelei',
    [
        new GymPokemon('Burpmon', 45330, 54),
        new GymPokemon('Burpmon', 48300, 53),
        new GymPokemon('Burpmon', 52000, 54),
        new GymPokemon('Burpmon', 57000, 56),
        new GymPokemon('Burpmon', 60250, 56),
    ],
    BadgeEnums.Elite_Lorelei,
    7500,
    'You\'re better than I thought! Go on ahead! You only got a taste of Pokémon League power!',
    [new GymBadgeRequirement(BadgeEnums.Earth)]
);
GymList['Elite Bruno'] = new Gym(
    'Bruno',
    'Elite Bruno',
    [
        new GymPokemon('Burpmon', 45330, 53),
        new GymPokemon('Burpmon', 48300, 55),
        new GymPokemon('Burpmon', 52000, 55),
        new GymPokemon('Burpmon', 57000, 56),
        new GymPokemon('Burpmon', 60250, 58),
    ],
    BadgeEnums.Elite_Bruno,
    7500,
    'My job is done! Go face your next challenge!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Lorelei)]
);
GymList['Elite Agatha'] = new Gym(
    'Agatha',
    'Elite Agatha',
    [
        new GymPokemon('Burpmon', 45330, 56),
        new GymPokemon('Burpmon', 48300, 56),
        new GymPokemon('Burpmon', 52000, 55),
        new GymPokemon('Burpmon', 57000, 58),
        new GymPokemon('Burpmon', 60250, 60),
    ],
    BadgeEnums.Elite_Agatha,
    7500,
    'You win! I see what the old duff sees in you now. I\'ve nothing else to say. Run along now, child!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Bruno)]
);
GymList['Elite Lance'] = new Gym(
    'Lance',
    'Elite Lance',
    [
        new GymPokemon('Burpmon', 48300, 58),
        new GymPokemon('Burpmon', 52000, 56),
        new GymPokemon('Burpmon', 57000, 56),
        new GymPokemon('Burpmon', 60250, 60),
        new GymPokemon('Burpmon', 66000, 62),
    ],
    BadgeEnums.Elite_Lance,
    7500,
    'I still can’t believe my dragons lost to you! You’re now the Pokémon League champion! …Or, you would have been, but you have one more challenge ahead. You have to face another trainer!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Agatha)]
);
// Kanto Champion
GymList['Champion Blue'] = new Champion(
    'Blue',
    'Champion Blue',
    [
        new GymPokemon('Burpmon', 52340, 59),
        new GymPokemon('Burpmon', 56320, 57),
        new GymPokemon('Burpmon', 58340, 59),
    ],
    BadgeEnums.Elite_KantoChampion,
    10000,
    'Why? Why did I lose? I never made any mistakes raising my Pokémon… Darn it! You\'re the new Pokémon League Champion! Although I don\'t like to admit it…',
    [new GymBadgeRequirement(BadgeEnums.Elite_Lance)],
    // Burpmon
    [
        new GymPokemon('Burpmon', 57520, 59),
        new GymPokemon('Burpmon', 63040, 61),
        new GymPokemon('Burpmon', 70000, 63),
    ],
    // Burpmon
    [
        new GymPokemon('Burpmon', 65340, 59),
        new GymPokemon('Burpmon', 57520, 61),
        new GymPokemon('Burpmon', 70000, 63),
    ],
    // Burpmon/Burpmon
    [
        new GymPokemon('Burpmon', 63040, 59),
        new GymPokemon('Burpmon', 65340, 61),
        new GymPokemon('Burpmon', 70000, 63),
    ]
);

//Johto Gyms
GymList['Violet City'] = new Gym(
    'Falkner',
    'Violet City',
    [
        new GymPokemon('Burpmon', 108000, 7),
        new GymPokemon('Burpmon', 112000, 9),
    ],
    BadgeEnums.Zephyr,
    250,
    '...Darn! My Dad\'s cherished bird Pokémon... All right. Take this. It\'s the official Pokémon League Zephyr Badge.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Sprout Tower'))]
);
GymList['Azalea Town'] = new Gym(
    'Bugsy',
    'Azalea Town',
    [
        new GymPokemon('Burpmon', 103000, 14),
        new GymPokemon('Burpmon', 101500, 14),
        new GymPokemon('Burpmon', 119000, 16),
    ],
    BadgeEnums.Hive,
    500,
    'Whoa, amazing! You\'re an expert on Pokémon! My research isn\'t complete yet. Ok, you win. Take this Badge.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Burpmon Well'))]
);
GymList['Goldenrod City'] = new Gym(
    'Whitney',
    'Goldenrod City',
    [
        new GymPokemon('Burpmon', 130000, 18),
        new GymPokemon('Burpmon', 170000, 20),
    ],
    BadgeEnums.Plain,
    1000,
    '...Sniff... What? What do you want? A badge? Oh, right. I forgot. Here\'s Plain Badge.',
    [new RouteKillRequirement(10, GameConstants.Region.johto, 34)]
);
GymList['Ecruteak City'] = new Gym(
    'Morty',
    'Ecruteak City',
    [
        new GymPokemon('Burpmon', 127000, 21),
        new GymPokemon('Burpmon', 128000, 21),
        new GymPokemon('Burpmon', 132000, 25),
        new GymPokemon('Burpmon', 130000, 23),
    ],
    BadgeEnums.Fog,
    1500,
    'I\'m not good enough yet... All right. This Badge is yours.',
    [new GymBadgeRequirement(BadgeEnums.Plain)],
    () => {
        App.game.quests.getQuestLine('Team Rocket Again').beginQuest();
    }
);
GymList['Cianwood City'] = new Gym(
    'Chuck',
    'Cianwood City',
    [
        new GymPokemon('Burpmon', 177000, 27),
        new GymPokemon('Burpmon', 183000, 30),
    ],
    BadgeEnums.Storm,
    2500,
    'Wha? Huh? I lost? How about that! You\'re worthy of Storm Badge!',
    [new GymBadgeRequirement(BadgeEnums.Fog)]
);
GymList['Olivine City'] = new Gym(
    'Jasmine',
    'Olivine City',
    [
        new GymPokemon('Burpmon', 177000, 30),
        new GymPokemon('Burpmon', 178000, 30),
        new GymPokemon('Burpmon', 182000, 35),
    ],
    BadgeEnums.Mineral,
    3500,
    '...You are a better trainer than me, in both skill and kindness. In accordance with League rules, I confer upon you this Badge.',
    [new GymBadgeRequirement(BadgeEnums.Storm)]
);
GymList['Mahogany Town'] = new Gym(
    'Pryce',
    'Mahogany Town',
    [
        new GymPokemon('Burpmon', 190000, 27),
        new GymPokemon('Burpmon', 192500, 29),
        new GymPokemon('Burpmon', 196000, 31),
    ],
    BadgeEnums.Glacier,
    4000,
    'Ah, I am impressed by your prowess. With your strong will, I know you will overcome all life\'s obstacles. You are worthy of this Badge!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Rockets Hideout'))]
);
GymList['Blackthorn City'] = new Gym(
    'Clair',
    'Blackthorn City',
    [
        new GymPokemon('Burpmon', 205000, 37),
        new GymPokemon('Burpmon', 205000, 37),
        new GymPokemon('Burpmon', 218000, 37),
        new GymPokemon('Burpmon', 220000, 40),
    ],
    BadgeEnums.Rising,
    5000,
    'Here, this is the Rising Badge... Hurry up! Take it!',
    [new GymBadgeRequirement(BadgeEnums.Glacier)]
);

//Johto Elite 4
GymList['Elite Will'] = new Gym(
    'Will',
    'Elite Will',
    [
        new GymPokemon('Burpmon', 245330, 40),
        new GymPokemon('Burpmon', 248300, 41),
        new GymPokemon('Burpmon', 252000, 41),
        new GymPokemon('Burpmon', 257000, 41),
        new GymPokemon('Burpmon', 260250, 42),
    ],
    BadgeEnums.Elite_Will,
    7500,
    'Even though I was defeated, I won\'t change my course. I will continue battling until I stand above all Trainers! Now move on and experience the true ferocity of the Elite Four.',
    [new GymBadgeRequirement(BadgeEnums.Rising)]
);
GymList['Elite Koga'] = new Gym(
    'Koga2',
    'Elite Koga',
    [
        new GymPokemon('Burpmon', 245330, 40),
        new GymPokemon('Burpmon', 248300, 41),
        new GymPokemon('Burpmon', 252000, 43),
        new GymPokemon('Burpmon', 257000, 42),
        new GymPokemon('Burpmon', 260250, 44),
    ],
    BadgeEnums.Elite_Koga,
    7500,
    'I subjected you to everything I could muster. But my efforts failed. I must hone my skills. Go on to the next room, and put your abilities to the test!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Will)]
);
GymList['Elite Bruno2'] = new Gym(
    'Bruno2',
    'Elite Bruno2',
    [
        new GymPokemon('Burpmon', 245330, 42),
        new GymPokemon('Burpmon', 248300, 42),
        new GymPokemon('Burpmon', 252000, 42),
        new GymPokemon('Burpmon', 257000, 43),
        new GymPokemon('Burpmon', 260250, 46),
    ],
    BadgeEnums.Elite_Bruno2,
    7500,
    'Having lost, I have no right to say anything… Go face your next challenge!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Koga)]
);
GymList['Elite Karen'] = new Gym(
    'Karen',
    'Elite Karen',
    [
        new GymPokemon('Burpmon', 248300, 42),
        new GymPokemon('Burpmon', 252000, 42),
        new GymPokemon('Burpmon', 257000, 44),
        new GymPokemon('Burpmon', 260250, 45),
        new GymPokemon('Burpmon', 266000, 47),
    ],
    BadgeEnums.Elite_Karen,
    7500,
    'Strong Pokémon. Weak Pokémon. That is only the selfish perception of people. Truly skilled Trainers should try to win with the Pokémon they love best. I like your style. You understand what\'s important. Go on — — the Champion is waiting.',
    [new GymBadgeRequirement(BadgeEnums.Elite_Bruno2)]
);
// Johto Champion
GymList['Champion Lance'] = new Champion(
    'Lance2',
    'Champion Lance',
    [
        new GymPokemon('Burpmon', 258300, 44),
        new GymPokemon('Burpmon', 262000, 47),
        new GymPokemon('Burpmon', 264000, 46),
        new GymPokemon('Burpmon', 260250, 46),
        new GymPokemon('Burpmon', 270000, 47),
        new GymPokemon('Burpmon', 270000, 50),
    ],
    BadgeEnums.Elite_JohtoChampion,
    7500,
    '…It\'s over. But it\'s an odd feeling. I\'m not angry that I lost. In fact, I feel happy. Happy that I witnessed the rise of a great new Champion!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Karen)]
);

// Hoenn Gyms
GymList['Rustboro City'] = new Gym(
    'Roxanne',
    'Rustboro City',
    [
        new GymPokemon('Burpmon', 382900, 12),
        new GymPokemon('Burpmon', 382900, 12),
        new GymPokemon('Burpmon', 410200, 15),
    ],
    BadgeEnums.Stone,
    1000,
    'So… I lost… It seems that I still have much more to learn… I understand. The Pokémon League\'s rules state that Trainers are to be given this if they defeat a Gym Leader. Please accept the official Pokémon League Stone Badge.',
    [new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion)]
);
GymList['Dewford Town'] = new Gym(
    'Brawly',
    'Dewford Town',
    [
        new GymPokemon('Burpmon', 424000, 16),
        new GymPokemon('Burpmon', 424000, 16),
        new GymPokemon('Burpmon', 444000, 19),
    ],
    BadgeEnums.Knuckle,
    2000,
    'Whoah, wow! You made a much bigger splash than I expected! You swamped me! Okay, you\'ve got me. Take this Gym Badge!'
);
GymList['Mauville City'] = new Gym(
    'Wattson',
    'Mauville City',
    [
        new GymPokemon('Burpmon', 452000, 20),
        new GymPokemon('Burpmon', 448000, 20),
        new GymPokemon('Burpmon', 483000, 22),
        new GymPokemon('Burpmon', 448000, 24),
    ],
    BadgeEnums.Dynamo,
    3000,
    'Wahahahah! Fine, I lost! You ended up giving me a thrill! Take this Badge!',
    [new GymBadgeRequirement(BadgeEnums.Knuckle)],
    () => {
        App.game.quests.getQuestLine('Land vs Water').beginQuest();
    }
);
GymList['Lavaridge Town'] = new Gym(
    'Flannery',
    'Lavaridge Town',
    [
        new GymPokemon('Burpmon', 472000, 24),
        new GymPokemon('Burpmon', 472000, 24),
        new GymPokemon('Burpmon', 492000, 26),
        new GymPokemon('Burpmon', 524000, 29),
    ],
    BadgeEnums.Heat,
    4000,
    'Oh... I guess I was trying too hard... I... I\'ve only recently become a Gym Leader. I tried too hard to be someone I\'m not. I have to do things my natural way. If I don\'t, my Pokémon will be confused. Thanks for teaching me that. For that, you deserve this.'
);
GymList['Petalburg City'] = new Gym(
    'Norman',
    'Petalburg City',
    [
        new GymPokemon('Burpmon', 490000, 27),
        new GymPokemon('Burpmon', 530000, 27),
        new GymPokemon('Burpmon', 560000, 29),
        new GymPokemon('Burpmon', 596000, 31),
    ],
    BadgeEnums.Balance,
    5000,
    '… I… I can\'t… I can\'t believe it. I lost to you? But, rules are rules! Here, take this.',
    [new GymBadgeRequirement(BadgeEnums.Heat)]
);
GymList['Fortree City'] = new Gym(
    'Winona',
    'Fortree City',
    [
        new GymPokemon('Burpmon', 605000, 29),
        new GymPokemon('Burpmon', 650000, 29),
        new GymPokemon('Burpmon', 630000, 30),
        new GymPokemon('Burpmon', 667000, 31),
        new GymPokemon('Burpmon', 669000, 33),
    ],
    BadgeEnums.Feather,
    6000,
    'Never before have I seen a Trainer command Pokémon with more grace than I... In recognition of your prowess, I present to you this Gym Badge.'
);
GymList['Mossdeep City'] = new Gym(
    'Tate & Liza',
    'Mossdeep City',
    [
        new GymPokemon('Burpmon', 702000, 41),
        new GymPokemon('Burpmon', 703000, 41),
        new GymPokemon('Burpmon', 702000, 42),
        new GymPokemon('Burpmon', 703000, 42),
    ],
    BadgeEnums.Mind,
    8000,
    'What? Our combination... Was shattered! It can\'t be helped. You\'ve won... So, in recognition, take this Gym Badge.'
);
GymList['Sootopolis City'] = new Gym(
    'Juan',
    'Sootopolis City',
    [
        new GymPokemon('Burpmon', 798000, 41),
        new GymPokemon('Burpmon', 813000, 41),
        new GymPokemon('Burpmon', 823400, 43),
        new GymPokemon('Burpmon', 842000, 43),
        new GymPokemon('Burpmon', 865000, 46),
    ],
    BadgeEnums.Rain,
    10000,
    'Ahahaha, excellent! Very well, you are the winner. From you, I sense the brilliant shine of skill that will overcome all. However, compared with me or even Wallace, you are lacking in elegance. Perhaps I should make you a loan of my outfit? ... Hahaha, I merely jest! Rather than my clothes, I shall reward you with this, the Rain Badge.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Sky Pillar'))]
);

// Hoenn Elite 4
GymList['Elite Sidney'] = new Gym(
    'Sidney',
    'Elite Sidney',
    [
        new GymPokemon('Burpmon', 972000, 46),
        new GymPokemon('Burpmon', 980000, 48),
        new GymPokemon('Burpmon', 1002000, 46),
        new GymPokemon('Burpmon', 1015000, 48),
        new GymPokemon('Burpmon', 1020000, 49),
    ],
    BadgeEnums.Elite_Sidney,
    15000,
    'Well, listen to what this loser has to say. You\'ve got what it takes to go far. Now, go on to the next room and enjoy your next battle!',
    [new GymBadgeRequirement(BadgeEnums.Rain)]
);
GymList['Elite Phoebe'] = new Gym(
    'Phoebe',
    'Elite Phoebe',
    [
        new GymPokemon('Burpmon', 1036700, 48),
        new GymPokemon('Burpmon', 1038000, 49),
        new GymPokemon('Burpmon', 1052000, 50),
        new GymPokemon('Burpmon', 1038000, 49),
        new GymPokemon('Burpmon', 1063000, 51),
    ],
    BadgeEnums.Elite_Phoebe,
    15000,
    'There\'s a definite bond between you and your Pokémon, too. I didn\'t recognize it, so it\'s only natural that I lost. Yup, I\'d like to see how far your bond will carry you. Go ahead, move to the next room.',
    [new GymBadgeRequirement(BadgeEnums.Elite_Sidney)]
);
GymList['Elite Glacia'] = new Gym(
    'Glacia',
    'Elite Glacia',
    [
        new GymPokemon('Burpmon', 1082000, 50),
        new GymPokemon('Burpmon', 1072000, 50),
        new GymPokemon('Burpmon', 1086000, 52),
        new GymPokemon('Burpmon', 1076000, 52),
        new GymPokemon('Burpmon', 1100000, 53),
    ],
    BadgeEnums.Elite_Glacia,
    15000,
    'Advance to the next room. And there, confirm the truly fearsome side of the Pokémon League.',
    [new GymBadgeRequirement(BadgeEnums.Elite_Phoebe)]
);
GymList['Elite Drake'] = new Gym(
    'Drake',
    'Elite Drake',
    [
        new GymPokemon('Burpmon', 1064000, 52),
        new GymPokemon('Burpmon', 1072000, 54),
        new GymPokemon('Burpmon', 1076000, 53),
        new GymPokemon('Burpmon', 1076000, 53),
        new GymPokemon('Burpmon', 1157000, 55),
    ],
    BadgeEnums.Elite_Drake,
    15000,
    'You deserve every credit for coming this far as a Trainer of Pokémon. You do seem to know what is needed. Yes, what a Trainer needs is a virtuous heart. Pokémon touch the good hearts of Trainers and learn good from wrong. They touch the good hearts of Trainers and grow strong. Go! Go onwards! The Champion is waiting!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Glacia)]
);

// Hoenn Champion
GymList['Champion Wallace'] = new Champion(
    'Wallace',
    'Champion Wallace',
    [
        new GymPokemon('Burpmon', 1202000, 57),
        new GymPokemon('Burpmon', 1164000, 55),
        new GymPokemon('Burpmon', 1184000, 56),
        new GymPokemon('Burpmon', 1172000, 56),
        new GymPokemon('Burpmon', 1163000, 56),
        new GymPokemon('Burpmon', 1182000, 58),
    ],
    BadgeEnums.Elite_HoennChampion,
    16000,
    'I, the Champion, fall in defeat… That was wonderful work. You were elegant, infuriatingly so. And yet it was utterly glorious! Kudos to you! You are a truly noble Pokémon Trainer!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Drake)],
    undefined,
    undefined,
    undefined,
    () => {
        App.game.quests.getQuestLine('Mystery of Burpmon').beginQuest();
    }
);

//Sinnoh Gyms
GymList['Oreburgh City'] = new Gym(
    'Roark',
    'Oreburgh City',
    [
        new GymPokemon('Burpmon', 1338000, 12),
        new GymPokemon('Burpmon', 1342000, 12),
        new GymPokemon('Burpmon', 1342000, 14),
    ],
    BadgeEnums.Coal,
    250,
    'This is embarrassing... I went and lost to a Trainer who didn\'t have a single Gym Badge... But that\'s tough. You were strong, and I was weak. That\'s all there is. According to Pokémon League rules, I have to give you our Gym Badge since you\'ve beaten me, the Leader. Heres your official Pokémon League Coal Badge.',
    [new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)],
    () => {
        App.game.quests.getQuestLine('A new world').beginQuest();
    }
);
GymList['Eterna City'] = new Gym(
    'Gardenia',
    'Eterna City',
    [
        new GymPokemon('Burpmon', 1433000, 20),
        new GymPokemon('Burpmon', 1437500, 20),
        new GymPokemon('Burpmon', 1439000, 22),
    ],
    BadgeEnums.Forest,
    400,
    'I might\'ve said it before, but you\'re really tough! Wasn\'t it hard for you to raise your Pokémon to be so good? I guess that\'s a measure of how much you love your Pokémon. In recognition of that, I proudly grant you this!"',
    [new GymBadgeRequirement(BadgeEnums.Coal)]
);
GymList['Hearthome City'] = new Gym(
    'Fantina',
    'Hearthome City',
    [
        new GymPokemon('Burpmon', 1450000, 24),
        new GymPokemon('Burpmon', 1480000, 24),
        new GymPokemon('Burpmon', 1480000, 26),
    ],
    BadgeEnums.Relic,
    740,
    'I am dumbfounded! So very, very strong! You, your Pokémon, so strong! Your power is admirable! I shall honor it with this Gym Badge!"',
    [new GymBadgeRequirement(BadgeEnums.Forest)]
);
GymList['Veilstone City'] = new Gym(
    'Maylene',
    'Veilstone City',
    [
        new GymPokemon('Burpmon', 1537000, 28),
        new GymPokemon('Burpmon', 1538000, 29),
        new GymPokemon('Burpmon', 1540000, 32),
    ],
    BadgeEnums.Cobble,
    1200,
    '...OK. You win. That was a tough loss. I learned a lot from it. Please, accept this Gym Badge.',
    [new GymBadgeRequirement(BadgeEnums.Relic)]
);
GymList['Pastoria City'] = new Gym(
    'Crasher Wake',
    'Pastoria City',
    [
        new GymPokemon('Burpmon', 1687000, 33),
        new GymPokemon('Burpmon', 1693000, 34),
        new GymPokemon('Burpmon', 1693000, 37),
    ],
    BadgeEnums.Fen,
    2500,
    'It seems the undertow pulled me under... But I had a great time battling with you! You\'ve earned this!',
    [new GymBadgeRequirement(BadgeEnums.Cobble)]
);
GymList['Canalave City'] = new Gym(
    'Byron',
    'Canalave City',
    [
        new GymPokemon('Burpmon', 1767000, 37),
        new GymPokemon('Burpmon', 1772000, 38),
        new GymPokemon('Burpmon', 1768000, 41),
    ],
    BadgeEnums.Mine,
    4800,
    'You were strong enough to take down my prized team of Pokémon. In recognition of that power, I give you this: the Mine Badge!',
    [new GymBadgeRequirement(BadgeEnums.Fen)]
);
GymList['Snowpoint City'] = new Gym(
    'Candice',
    'Snowpoint City',
    [
        new GymPokemon('Burpmon', 1872500, 40),
        new GymPokemon('Burpmon', 1876000, 40),
        new GymPokemon('Burpmon', 1870000, 42),
        new GymPokemon('Burpmon', 1870000, 44),
    ],
    BadgeEnums.Icicle,
    8000,
    'Wow! You\'re great! You\'ve earned my respect! I think your focus and will bowled us over totally. Oh, that\'s right! I\'m supposed to give you this!',
    [new GymBadgeRequirement(BadgeEnums.Mine)]
);
GymList['Sunyshore City'] = new Gym(
    'Volkner',
    'Sunyshore City',
    [
        new GymPokemon('Burpmon', 1965000, 46),
        new GymPokemon('Burpmon', 1965000, 46),
        new GymPokemon('Burpmon', 1978000, 48),
        new GymPokemon('Burpmon', 1980000, 50),
    ],
    BadgeEnums.Beacon,
    12000,
    '...Hehehe. Hahahah! ...That was the most fun I\'ve had in a battle since...I don\'t know when! It\'s also made me excited to know you and your team will keep battling to greater heights! This is your eighth Gym Badge. You\'ve earned this!',
    [new GymBadgeRequirement(BadgeEnums.Icicle)]
);

//Sinnoh Elite 4
GymList['Elite Aaron'] = new Gym(
    'Aaron',
    'Elite Aaron',
    [
        new GymPokemon('Burpmon', 2545330, 49),
        new GymPokemon('Burpmon', 2548300, 49),
        new GymPokemon('Burpmon', 2552000, 50),
        new GymPokemon('Burpmon', 2557000, 51),
        new GymPokemon('Burpmon', 2560250, 53),
    ],
    BadgeEnums.Elite_Aaron,
    18000,
    'I lost with the most beautiful and toughest of the bug Pokémon... We lost because I wasn\'t good enough... That\'s it! Back to training camp! Let\'s hear it for me! No... That was wrong... Anyway... Go on to the next room! Three Trainers are waiting for you. They are all tougher than me.',
    [new GymBadgeRequirement(BadgeEnums.Beacon)]
);
GymList['Elite Bertha'] = new Gym(
    'Bertha',
    'Elite Bertha',
    [
        new GymPokemon('Burpmon', 2645330, 50),
        new GymPokemon('Burpmon', 2648300, 53),
        new GymPokemon('Burpmon', 2652000, 52),
        new GymPokemon('Burpmon', 2657000, 52),
        new GymPokemon('Burpmon', 2660250, 55),
    ],
    BadgeEnums.Elite_Bertha,
    18000,
    'You\'re quite something, youngster. I like how you and your Pokémon earned the win by working as one. That\'s what makes you so strong. Ahahaha! I think that you can go as far as you want.',
    [new GymBadgeRequirement(BadgeEnums.Elite_Aaron)]
);
GymList['Elite Flint'] = new Gym(
    'Flint',
    'Elite Flint',
    [
        new GymPokemon('Burpmon', 2845330, 52),
        new GymPokemon('Burpmon', 2848300, 55),
        new GymPokemon('Burpmon', 2852000, 53),
        new GymPokemon('Burpmon', 2857000, 55),
        new GymPokemon('Burpmon', 2860250, 57),
    ],
    BadgeEnums.Elite_Flint,
    18000,
    '.........Keep going...I know your spirit burns hot. Your whole team does.',
    [new GymBadgeRequirement(BadgeEnums.Elite_Bertha)]
);
GymList['Elite Lucian'] = new Gym(
    'Lucian',
    'Elite Lucian',
    [
        new GymPokemon('Burpmon', 3048300, 53),
        new GymPokemon('Burpmon', 3052000, 55),
        new GymPokemon('Burpmon', 3057000, 54),
        new GymPokemon('Burpmon', 3060250, 56),
        new GymPokemon('Burpmon', 3066000, 59),
    ],
    BadgeEnums.Elite_Lucian,
    18000,
    'Congratulations. You have beaten the Elite Four. However, that doesn\'t mean you\'re done with the Pokémon league. There remains the Champion. I should warn you—the Champion is far stronger than the Elite Four. Now, go on. Step through the doorway to your final battle.',
    [new GymBadgeRequirement(BadgeEnums.Elite_Flint)]
);

// Sinnoh Champion
GymList['Champion Cynthia'] = new Champion(
    'Cynthia',
    'Champion Cynthia',
    [
        new GymPokemon('Burpmon', 3458300, 58),
        new GymPokemon('Burpmon', 3462000, 58),
        new GymPokemon('Burpmon', 3464000, 60),
        new GymPokemon('Burpmon', 3460250, 60),
        new GymPokemon('Burpmon', 3470000, 58),
        new GymPokemon('Burpmon', 3570000, 62),
    ],
    BadgeEnums.Elite_SinnohChampion,
    32000,
    'That was excellent. Truly, an outstanding battle. You gave the support your Pokémon needed to maximize their power. And you guided them with certainty to secure victory. You have both passion and calculating coolness. Together, you and your Pokémon can overcome any challenge that may come your way. Those are the impressions I got from our battle. I\'m glad I got to take part in the crowning of Sinnoh\'s new Champion! Come with me. We\'ll take the lift.',
    [new GymBadgeRequirement(BadgeEnums.Elite_Lucian)]
);

//Unova Gyms
//TODO: Balancing of gym Pokemon HP & rewards.
GymList['Aspertia City'] = new Gym(
    'Cheren',
    'Aspertia City',
    [
        new GymPokemon('Burpmon', 3458300, 58),
        new GymPokemon('Burpmon', 3462000, 58),
        new GymPokemon('Burpmon', 3464000, 58),
    ],
    BadgeEnums.Basic,
    500,
    'That battle has made me feel really glad you were my first challenger as a Gym Leader… I give you this in honor of the strength you and your Pokémon showed!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Floccesy Ranch'))]
);
GymList['Virbank City'] = new Gym(
    'Roxie',
    'Virbank City',
    [
        new GymPokemon('Burpmon', 3658300, 58),
        new GymPokemon('Burpmon', 3662000, 58),
        new GymPokemon('Burpmon', 3664000, 58),
    ],
    BadgeEnums.Toxic,
    800,
    'Sigh! What are you doing losing, Roxie?! Well…I guess that means you\'re strong! This stinks, but I gave it everything I had, and I feel revitalized and refreshed now! Here! Proof that you beat me!',
    [new GymBadgeRequirement(BadgeEnums.Basic)]
);
GymList['Castelia City'] = new Gym(
    'Burgh',
    'Castelia City',
    [
        new GymPokemon('Burpmon', 3858300, 58),
        new GymPokemon('Burpmon', 3862000, 58),
        new GymPokemon('Burpmon', 3964000, 58),
        new GymPokemon('Burpmon', 4064000, 58),
    ],
    BadgeEnums.Insect,
    1500,
    'Oh hoo… You are very strong indeed! I guess it\'s no surprise I lost. Here! Take this Insect Badge! I think it\'ll suit you!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Castelia Sewers'))]
);
GymList['Nimbasa City'] = new Gym(
    'Elesa',
    'Nimbasa City',
    [
        new GymPokemon('Burpmon', 4258300, 58),
        new GymPokemon('Burpmon', 4262000, 58),
        new GymPokemon('Burpmon', 4464000, 58),
        new GymPokemon('Burpmon', 4464000, 58),
    ],
    BadgeEnums.Bolt,
    2600,
    'Well… Now you… you\'re an even more wonderful Trainer than I expected. Your sweet fighting style swept me off my feet! Take this!',
    [new GymBadgeRequirement(BadgeEnums.Insect)]
);
GymList['Driftveil City'] = new Gym(
    'Clay',
    'Driftveil City',
    [
        new GymPokemon('Burpmon', 4658300, 58),
        new GymPokemon('Burpmon', 4662000, 58),
        new GymPokemon('Burpmon', 4864000, 58),
        new GymPokemon('Burpmon', 5064000, 58),
    ],
    BadgeEnums.Quake,
    4800,
    'Phew… You\'re really somethin\'! Li\'l whippersnapper Trainers who pack a real punch keep showin\' up one after another. Mrmph. Here! Take this!',
    [new GymBadgeRequirement(BadgeEnums.Bolt)]
);
GymList['Mistralton City'] = new Gym(
    'Skyla',
    'Mistralton City',
    [
        new GymPokemon('Burpmon', 5458300, 58),
        new GymPokemon('Burpmon', 6062000, 58),
        new GymPokemon('Burpmon', 5664000, 58),
        new GymPokemon('Burpmon', 5864000, 58),
    ],
    BadgeEnums.Jet,
    7600,
    'You\'re an amazing Pokémon Trainer. My Pokémon and I are happy because for the first time in quite a while--about two years, I\'d say--we could fight with our full strength. This is an official League Gym Badge. But this is just a stepping-stone.',
    [new GymBadgeRequirement(BadgeEnums.Quake)],
    () => {
        App.game.quests.getQuestLine('Quest for the DNA Splicers').beginQuest();
    }
);
GymList['Opelucid City'] = new Gym(
    'Drayden',
    'Opelucid City',
    [
        new GymPokemon('Burpmon', 6558300, 58),
        new GymPokemon('Burpmon', 6662000, 58),
        new GymPokemon('Burpmon', 6464000, 58),
        new GymPokemon('Burpmon', 6964000, 58),
    ],
    BadgeEnums.Legend,
    14000,
    'Wonderful. I\'m grateful that we had a chance to meet and battle. It reminded me that Pokémon battles are about working with others to meet our challenges together.',
    [new GymBadgeRequirement(BadgeEnums.Jet)]
);
GymList['Humilau City'] = new Gym(
    'Marlon',
    'Humilau City',
    [
        new GymPokemon('Burpmon', 7458300, 58),
        new GymPokemon('Burpmon', 7262000, 58),
        new GymPokemon('Burpmon', 7064000, 58),
        new GymPokemon('Burpmon', 7464000, 58),
    ],
    BadgeEnums.Wave,
    27000,
    'You don\'t just look strong, you\'re strong fo\' reals! Eh, I was swept away, too! Oh yeah, yo. I was so surprised that I forgot! I gotta give this to you!',
    [new GymBadgeRequirement(BadgeEnums.Legend)]
);

//Unova Elite 4
//TODO: Balancing of elite Pokemon HP & rewards.
GymList['Elite Shauntal'] = new Gym(
    'Shauntal',
    'Elite Shauntal',
    [
        new GymPokemon('Burpmon', 8945330, 49),
        new GymPokemon('Burpmon', 8948300, 49),
        new GymPokemon('Burpmon', 8952000, 50),
        new GymPokemon('Burpmon', 8957000, 51),
        new GymPokemon('Burpmon', 8960250, 53),
        new GymPokemon('Burpmon', 8960250, 53),
    ],
    BadgeEnums.Elite_Shauntal,
    32000,
    'My Pokémon and the challenger\'s Pokémon. Everyone battled even though they were hurt... Thank you.',
    [new GymBadgeRequirement(BadgeEnums.Wave)]
);
GymList['Elite Marshal'] = new Gym(
    'Marshal',
    'Elite Marshal',
    [
        new GymPokemon('Burpmon', 9945330, 49),
        new GymPokemon('Burpmon', 9948300, 49),
        new GymPokemon('Burpmon', 9952000, 50),
        new GymPokemon('Burpmon', 9957000, 51),
        new GymPokemon('Burpmon', 9957000, 51),
        new GymPokemon('Burpmon', 9960250, 53),
    ],
    BadgeEnums.Elite_Marshal,
    32000,
    'Whew! Well done! As your battles continue, aim for even greater heights!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Shauntal)]
);
GymList['Elite Grimsley'] = new Gym(
    'Grimsley',
    'Elite Grimsley',
    [
        new GymPokemon('Burpmon', 10945330, 49),
        new GymPokemon('Burpmon', 10948300, 49),
        new GymPokemon('Burpmon', 10952000, 50),
        new GymPokemon('Burpmon', 10957000, 51),
        new GymPokemon('Burpmon', 10957000, 51),
        new GymPokemon('Burpmon', 10960250, 53),
    ],
    BadgeEnums.Elite_Grimsley,
    32000,
    'Whether or not you get to fight at full strength, whether or not luck smiles on you--none of that matters. Only results matter. And a loss is a loss. See, victory shines like a bright light. And right now, you and your Pokémon are shining brilliantly.',
    [new GymBadgeRequirement(BadgeEnums.Elite_Marshal)]
);
GymList['Elite Caitlin'] = new Gym(
    'Caitlin',
    'Elite Caitlin',
    [
        new GymPokemon('Burpmon', 11945330, 49),
        new GymPokemon('Burpmon', 11948300, 49),
        new GymPokemon('Burpmon', 11957000, 51),
        new GymPokemon('Burpmon', 11957000, 51),
        new GymPokemon('Burpmon', 11952000, 50),
        new GymPokemon('Burpmon', 11960250, 53),
    ],
    BadgeEnums.Elite_Caitlin,
    32000,
    'You and your Pokémon are both excellent and elegant. To have been able to battle against such a splendid team... My Pokémon and I learned a lot! I offer you my thanks',
    [new GymBadgeRequirement(BadgeEnums.Elite_Grimsley)]
);

// Unova Champion
GymList['Champion Iris'] = new Champion(
    'Iris',
    'Champion Iris',
    [
        new GymPokemon('Burpmon', 12458300, 58),
        new GymPokemon('Burpmon', 12462000, 58),
        new GymPokemon('Burpmon', 12464000, 58),
        new GymPokemon('Burpmon', 12460250, 60),
        new GymPokemon('Burpmon', 12470000, 58),
        new GymPokemon('Burpmon', 14570000, 62),
    ],
    BadgeEnums.Elite_UnovaChampion,
    64000,
    'I\'m upset I couldn\'t win! But you know what? More than that, I\'m happy! I mean, come on. By having a serious battle, you and your Pokémon, and me and my Pokémon, we all got to know one another better than before! Yep, we sure did! OK, let\'s go!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Caitlin)]
);

//Kalos Gyms
//TODO: Balancing of gym Pokemon HP & rewards.
GymList['Santalune City'] = new Gym(
    'Viola',
    'Santalune City',
    [
        new GymPokemon('Burpmon', 13737400, 10),
        new GymPokemon('Burpmon', 17395730, 12),
    ],
    BadgeEnums.Bug,
    800,
    'Young Trainer, you... No, it wasn\'t you alone. You and your Pokémon have shown me a whole new depth of field! Fantastic! Just fantastic!',
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 3)]
);
GymList['Cyllage City'] = new Gym(
    'Grant',
    'Cyllage City',
    [
        new GymPokemon('Burpmon', 16937530, 25),
        new GymPokemon('Burpmon', 19837400, 25),
    ],
    BadgeEnums.Cliff,
    1700,
    'There are some things that seem out of reach no matter how hard you try. However, it\'s important that you never give up--no matter the opponent or the odds. I could tell from our battle that you and your Pokémon understand that. To commemorate such an impressive show of teamwork, please accept the Cliff Badge!',
    [new GymBadgeRequirement(BadgeEnums.Bug)]
);
GymList['Shalour City'] = new Gym(
    'Korrina',
    'Shalour City',
    [
        new GymPokemon('Burpmon', 21558300, 29),
        new GymPokemon('Burpmon', 22062000, 28),
        new GymPokemon('Burpmon', 22362000, 32),
    ],
    BadgeEnums.Rumble,
    3800,
    'Oh! I have been defeated! Alack, alay! Lady Korrina gave a terrible display! This is it. I must give up my title and admit that your strength far exceeds-- Just teasing! But here\'s your Badge. Boy, you\'ll be rolling in \'em soon!',
    [new GymBadgeRequirement(BadgeEnums.Cliff)]
);
GymList['Coumarine City'] = new Gym(
    'Ramos',
    'Coumarine City',
    [
        new GymPokemon('Burpmon', 25508300, 30),
        new GymPokemon('Burpmon', 27562000, 31),
        new GymPokemon('Burpmon', 29502000, 34),
    ],
    BadgeEnums.Plant,
    5500,
    'Yeh believe in yer Pokémon... And they believe in yeh, too... Mighty oaks from acorns grow. Go on, then. Yeh\'ve earned it. Here\'s yer own Plant Badge, sprout.',
    [new GymBadgeRequirement(BadgeEnums.Rumble)]
);
GymList['Lumiose City'] = new Gym(
    'Clemont',
    'Lumiose City',
    [
        new GymPokemon('Burpmon', 30058300, 35),
        new GymPokemon('Burpmon', 31062000, 35),
        new GymPokemon('Burpmon', 32062000, 37),
    ],
    BadgeEnums.Voltage,
    9000,
    'Oh, Bonnie... When will you learn there\'s no shame in losing? I\'m glad whenever I get to learn something new thanks to strong challengers like you here.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Kalos Power Plant'))]
);
GymList['Laverre City'] = new Gym(
    'Valerie',
    'Laverre City',
    [
        new GymPokemon('Burpmon', 33058300, 38),
        new GymPokemon('Burpmon', 36462000, 38),
        new GymPokemon('Burpmon', 38062000, 42),
    ],
    BadgeEnums.Fairy,
    16000,
    'Yes... That was a fine battle. I shall reward you for this great victory. This is the Fairy Badge. It is yours now. Its beauty is captivating, is it not? ... ... ... ... ... ... Ah... Do forgive me. I was so captivated, I forgot for a moment that it is yours.',
    [new GymBadgeRequirement(BadgeEnums.Voltage)]
);
GymList['Anistar City'] = new Gym(
    'Olympia',
    'Anistar City',
    [
        new GymPokemon('Burpmon', 40058300, 44),
        new GymPokemon('Burpmon', 42062000, 45),
        new GymPokemon('Burpmon', 44462000, 48),
    ],
    BadgeEnums.Psychic,
    30000,
    'Now, the Psychic Badge. A testament to your skill. Proof of your power.',
    [new GymBadgeRequirement(BadgeEnums.Fairy)]
);
GymList['Snowbelle City'] = new Gym(
    'Wulfric',
    'Snowbelle City',
    [
        new GymPokemon('Burpmon', 46558300, 56),
        new GymPokemon('Burpmon', 47654830, 55),
        new GymPokemon('Burpmon', 50062000, 59),
    ],
    BadgeEnums.Iceberg,
    52000,
    'Impressive! Your Pokémon fought with great courage. I can tell that you\'ve trained your Pokémon well.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Pokémon Village'))],
    () => {
        App.game.quests.getQuestLine('The Great Vivillon Hunt!').beginQuest();
    }
);
//Kalos Elite 4
//TODO: Balancing of elite Pokemon HP & rewards.
GymList['Elite Malva'] = new Gym(
    'Malva',
    'Elite Malva',
    [
        new GymPokemon('Burpmon', 54696969, 63),
        new GymPokemon('Burpmon', 55048300, 63),
        new GymPokemon('Burpmon', 55052000, 63),
        new GymPokemon('Burpmon', 55557000, 65),
    ],
    BadgeEnums.Elite_Malva,
    64000,
    'What news... So a new challenger has defeated Malva of the Elite Four!',
    [new GymBadgeRequirement(BadgeEnums.Iceberg)]
);
GymList['Elite Siebold'] = new Gym(
    'Siebold',
    'Elite Siebold',
    [
        new GymPokemon('Burpmon', 54696969, 63),
        new GymPokemon('Burpmon', 55405330, 63),
        new GymPokemon('Burpmon', 55405330, 63),
        new GymPokemon('Burpmon', 55557000, 65),
    ],
    BadgeEnums.Elite_Siebold,
    64000,
    'I shall store my memory of you and your Pokémon forever away within my heart.',
    [new GymBadgeRequirement(BadgeEnums.Elite_Malva)]
);
GymList['Elite Wikstrom'] = new Gym(
    'Wikstrom',
    'Elite Wikstrom',
    [
        new GymPokemon('Burpmon', 54696969, 63),
        new GymPokemon('Burpmon', 55405330, 63),
        new GymPokemon('Burpmon', 55405330, 63),
        new GymPokemon('Burpmon', 55557000, 65),
    ],
    BadgeEnums.Elite_Wikstrom,
    64000,
    'Glorious! The trust that you share with your honorable Pokémon surpasses even mine!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Siebold)]
);
GymList['Elite Drasna'] = new Gym(
    'Drasna',
    'Elite Drasna',
    [
        new GymPokemon('Burpmon', 54696969, 63),
        new GymPokemon('Burpmon', 55405330, 63),
        new GymPokemon('Burpmon', 55405330, 63),
        new GymPokemon('Burpmon', 55557000, 65),
    ],
    BadgeEnums.Elite_Drasna,
    64000,
    'Oh, dear me. That sure was a quick battle... I do hope you\'ll come back again sometime!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Wikstrom)]
);

// Kalos Champion
GymList['Champion Diantha'] = new Champion(
    'Diantha',
    'Champion Diantha',
    [
        new GymPokemon('Burpmon', 60083000, 64),
        new GymPokemon('Burpmon', 62057000, 65),
        new GymPokemon('Burpmon', 62057000, 65),
        new GymPokemon('Burpmon', 62557000, 65),
        new GymPokemon('Burpmon', 62170000, 66),
        new GymPokemon('Burpmon', 63070000, 68),
    ],
    BadgeEnums.Elite_KalosChampion,
    128000,
    'Witnessing the noble spirits of you and your Pokémon in battle has really touched my heart...',
    [new GymBadgeRequirement(BadgeEnums.Elite_Drasna)]
);

//Alola Gyms
//TODO: Balancing of gym Pokemon HP & rewards.
GymList['Iki Town'] = new Gym(
    'Hala',
    'Iki Town',
    [
        new GymPokemon('Burpmon', 62058739, 15),
        new GymPokemon('Burpmon', 62058739, 15),
        new GymPokemon('Burpmon', 63069612, 16),
    ],
    BadgeEnums.FightiniumZ,
    128000,
    'The results come as no surprise to me. What a fine Trainer...and what fine Pokémon, too!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Melemele Meadow'))]
);
GymList['Konikoni City'] = new Gym(
    'Olivia',
    'Konikoni City',
    [
        new GymPokemon('Burpmon', 66147743, 27),
        new GymPokemon('Burpmon', 66147743, 27),
        new GymPokemon('Burpmon', 67478674, 28),
    ],
    BadgeEnums.RockiumZ,
    128000,
    'How lovely.',
    [new RouteKillRequirement(10, GameConstants.Region.alola, 9)],
    () => {
        App.game.quests.getQuestLine('Eater of Light').beginQuest();
    }
);
GymList['Malie City'] = new Gym(
    'Nanu',
    'Malie City',
    [
        new GymPokemon('Burpmon', 70650480, 43),
        new GymPokemon('Burpmon', 70650480, 43),
        new GymPokemon('Burpmon', 71735104, 44),
    ],
    BadgeEnums.DarkiniumZ,
    128000,
    'Hmph...',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Po Town'))]
);
GymList['Burpmon Island'] = new Gym(
    'Hapu',
    'Burpmon Island',
    [
        new GymPokemon('Burpmon', 76658268, 53),
        new GymPokemon('Burpmon', 76658268, 53),
        new GymPokemon('Burpmon', 76658268, 53),
        new GymPokemon('Burpmon', 77747374, 54),
    ],
    BadgeEnums.GroundiumZ,
    128000,
    'You have succeeded in your final grand trial!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mina\'s Houseboat'))]
);
//trials
GymList['Ilima\'s Trial'] = new Gym(
    'Ilima',
    'Verdant Cavern',
    [
        new GymPokemon('Burpmon', 2458300, 51),
        new GymPokemon('Burpmon', 2462000, 51),
        new GymPokemon('Burpmon', 2462000, 51),
    ],
    BadgeEnums.NormaliumZ,
    128000,
    'You have received the Normalium-Z!',
    undefined,
    undefined,
    {
        quest: false,
        achievement: false,
    }
);
GymList['Lana\'s Trial'] = new Gym(
    'Lana',
    'Brooklet Hill',
    [
        new GymPokemon('Burpmon', 2458300, 51),
        new GymPokemon('Burpmon', 2462000, 51),
        new GymPokemon('Burpmon', 2462000, 51),
    ],
    BadgeEnums.WateriumZ,
    128000,
    'You have received the Waterium-Z!',
    undefined,
    undefined,
    {
        quest: false,
        achievement: false,
    }
);
GymList['Kiawe\'s Trial'] = new Gym(
    'Kiawe',
    'Wela Volcano Park',
    [
        new GymPokemon('Burpmon', 2458300, 51),
        new GymPokemon('Burpmon', 2462000, 51),
        new GymPokemon('Burpmon', 2462000, 51),
    ],
    BadgeEnums.FiriumZ,
    128000,
    'You have received the Firium-Z!',
    undefined,
    undefined,
    {
        quest: false,
        achievement: false,
    }
);
GymList['Mallow\'s Trial'] = new Gym(
    'Mallow',
    'Lush Jungle',
    [
        new GymPokemon('Burpmon', 2458300, 51),
        new GymPokemon('Burpmon', 2462000, 51),
        new GymPokemon('Burpmon', 2462000, 51),
    ],
    BadgeEnums.GrassiumZ,
    128000,
    'You have received the Grassium-Z!',
    undefined,
    undefined,
    {
        quest: false,
        achievement: false,
    }
);
GymList['Sophocles\' Trial'] = new Gym(
    'Sophocles',
    'Hokulani Observatory',
    [
        new GymPokemon('Burpmon', 2458300, 51),
        new GymPokemon('Burpmon', 2462000, 51),
        new GymPokemon('Burpmon', 2462000, 51),
    ],
    BadgeEnums.ElectriumZ,
    128000,
    'You have received the Electrium-Z!',
    undefined,
    undefined,
    {
        quest: false,
        achievement: false,
    }
);
GymList['Acerola\'s Trial'] = new Gym(
    'Acerola',
    'Thrifty Megamart',
    [
        new GymPokemon('Burpmon', 2458300, 51),
        new GymPokemon('Burpmon', 2462000, 51),
        new GymPokemon('Burpmon', 2462000, 51),
    ],
    BadgeEnums.GhostiumZ,
    128000,
    'You have received the Ghostium-Z!',
    undefined,
    undefined,
    {
        quest: false,
        achievement: false,
    }
);
GymList['Vast Poni Canyon Trial'] = new Gym(
    'Burpmon',
    'Vast Poni Canyon',
    [
        new GymPokemon('Burpmon', 2458300, 51),
        new GymPokemon('Burpmon', 2462000, 51),
        new GymPokemon('Burpmon', 2462000, 51),
    ],
    BadgeEnums.DragoniumZ,
    128000,
    'You have received the Dragonium-Z!',
    undefined,
    undefined,
    {
        quest: false,
        achievement: false,
    }
);
GymList['Mina\'s Trial'] = new Gym(
    'Mina',
    'Mina\'s Houseboat',
    [
        new GymPokemon('Burpmon', 2458300, 51),
        new GymPokemon('Burpmon', 2462000, 51),
        new GymPokemon('Burpmon', 2462000, 51),
    ],
    BadgeEnums.FairiumZ,
    128000,
    'You have received the Fairium-Z!',
    undefined,
    undefined,
    {
        quest: false,
        achievement: false,
    }
);

//Alola Elite 4
//TODO: Balancing of elite Pokemon HP & rewards.
GymList['Elite Molayne'] = new Gym(
    'Molayne',
    'Elite Molayne',
    [
        new GymPokemon('Burpmon', 85547357, 56),
        new GymPokemon('Burpmon', 85547357, 56),
        new GymPokemon('Burpmon', 85547357, 56),
        new GymPokemon('Burpmon', 85547357, 56),
        new GymPokemon('Burpmon', 86456446, 57),
    ],
    BadgeEnums.Elite_Molayne,
    64000,
    'That Kukui... He certainly found an interesting Trainer for me to face!',
    [new GymBadgeRequirement(BadgeEnums.GroundiumZ)]
);
GymList['Elite Olivia'] = new Gym(
    'Olivia',
    'Elite Olivia',
    [
        new GymPokemon('Burpmon', 85547357, 56),
        new GymPokemon('Burpmon', 85547357, 56),
        new GymPokemon('Burpmon', 85547357, 56),
        new GymPokemon('Burpmon', 85547357, 56),
        new GymPokemon('Burpmon', 86456446, 57),
    ],
    BadgeEnums.Elite_Olivia,
    64000,
    'I don\'t see the same look in your eyes that I saw when we first met on Akala Island. Have you had some experiences that you\'ll carry with you in your heart forever? Well, it\'s time for you to move on.',
    [new GymBadgeRequirement(BadgeEnums.Elite_Molayne)]
);
GymList['Elite Acerola'] = new Gym(
    'Acerola',
    'Elite Acerola',
    [
        new GymPokemon('Burpmon', 85547357, 56),
        new GymPokemon('Burpmon', 85547357, 56),
        new GymPokemon('Burpmon', 85547357, 56),
        new GymPokemon('Burpmon', 85547357, 56),
        new GymPokemon('Burpmon', 86456446, 57),
    ],
    BadgeEnums.Elite_Acerola,
    64000,
    'I\'m...I\'m speechless! You\'ve done me in!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Olivia)]
);
GymList['Elite Kahili'] = new Gym(
    'Kahili',
    'Elite Kahili',
    [
        new GymPokemon('Burpmon', 85547357, 56),
        new GymPokemon('Burpmon', 85547357, 56),
        new GymPokemon('Burpmon', 85547357, 56),
        new GymPokemon('Burpmon', 85547357, 56),
        new GymPokemon('Burpmon', 86456446, 57),
    ],
    BadgeEnums.Elite_Kahili,
    64000,
    'It\'s frustrating to me as a member of the Elite Four, but it seems your strength is the real deal.',
    [new GymBadgeRequirement(BadgeEnums.Elite_Acerola)]
);

// Alola Champion
// TODO: Balancing - Set HP
GymList['Champion Hau'] = new Champion(
    'Hau',
    'Champion Hau',
    [
        new GymPokemon('Burpmon', 91545555, 59),
        new GymPokemon('Burpmon', 89636471, 58),
        new GymPokemon('Burpmon', 89636471, 58),
        new GymPokemon('Burpmon', 91545555, 59),
    ],
    BadgeEnums.Elite_AlolaChampion,
    100000,
    'We\'re gonna keep moving forward, by staying at full power all the time!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Kahili)],
    // Burpmon
    [
        new GymPokemon('Burpmon', 89636471, 58),
        new GymPokemon('Burpmon', 96725389, 60),
    ],
    // Burpmon
    [
        new GymPokemon('Burpmon', 89636471, 58),
        new GymPokemon('Burpmon', 96725389, 60),
    ],
    // Burpmon/Burpmon
    [
        new GymPokemon('Burpmon', 89636471, 58),
        new GymPokemon('Burpmon', 96725389, 60),
    ]
);


//Galar Leaders
//TODO Addition of G-Max forms?
GymList['Turffield'] = new Gym(
    'Milo',
    'Turffield',
    [
        new GymPokemon('Burpmon', 40466361, 19),
        new GymPokemon('Burpmon', 42596169, 20),
    ],
    BadgeEnums.Galar_Grass,
    40000,
    'The power of Grass has wilted... What an incredible Gym Challenger!',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 4)]
);
GymList['Hulbury'] = new Gym(
    'Nessa',
    'Hulbury',
    [
        new GymPokemon('Burpmon', 47607484, 22),
        new GymPokemon('Burpmon', 48108615, 23),
        new GymPokemon('Burpmon', 50113141, 24),
    ],
    BadgeEnums.Galar_Water,
    60000,
    'I may proudly be the strongest member of this Gym, but I was totally washed away!',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 5)]
);
GymList['Motostoke'] = new Gym(
    'Kabu',
    'Motostoke',
    [
        new GymPokemon('Burpmon', 56008804, 25),
        new GymPokemon('Burpmon', 56008804, 25),
        new GymPokemon('Burpmon', 58936636, 27),
    ],
    BadgeEnums.Galar_Fire,
    60000,
    'I\'m often regarded as the first real roadblock of the Gym Challenge, and yet you defeated me! Clearly, your talent surpassed my many years of experience. I still have much to learn!',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 13)]
);
GymList['Stow-on-Side1'] = new Gym(
    'Bea',
    'Stow-on-Side1',
    [
        new GymPokemon('Burpmon', 65892712, 34),
        new GymPokemon('Burpmon', 65892712, 34),
        new GymPokemon('Burpmon', 66586319, 35),
        new GymPokemon('Burpmon', 69360749, 36),
    ],
    BadgeEnums.Galar_Fighting,
    80000,
    'Your strength nearly made me want to turn and run in my bare feet',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 15)]
);
GymList['Stow-on-Side2'] = new Gym(
    'Allister',
    'Stow-on-Side2',
    [
        new GymPokemon('Burpmon', 65892712, 34),
        new GymPokemon('Burpmon', 65892712, 34),
        new GymPokemon('Burpmon', 66586319, 35),
        new GymPokemon('Burpmon', 69360749, 36),
    ],
    BadgeEnums.Galar_Ghost,
    80000,
    'Maybe my mask... kept me from seeing just how strong you really are...',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 15)]
);
GymList['Ballonlea'] = new Gym(
    'Opal',
    'Ballonlea',
    [
        new GymPokemon('Burpmon', 71622513, 36),
        new GymPokemon('Burpmon', 71622513, 36),
        new GymPokemon('Burpmon', 73130355, 37),
        new GymPokemon('Burpmon', 75392119, 38),
    ],
    BadgeEnums.Galar_Fairy,
    80000,
    'Your pink is still lacking, but you\'re an excellent Trainer with some excellent Pokémon.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Glimwood Tangle'))]
);
GymList['Circhester1'] = new Gym(
    'Gordie',
    'Circhester1',
    [
        new GymPokemon('Burpmon', 84261781, 40),
        new GymPokemon('Burpmon', 84261781, 40),
        new GymPokemon('Burpmon', 86035713, 41),
        new GymPokemon('Burpmon', 88696611, 42),
    ],
    BadgeEnums.Galar_Rock,
    80000,
    'I just want to climb into a hole... Well, I guess it\'d be more like falling from here.',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 18)]
);
GymList['Circhester2'] = new Gym(
    'Melony',
    'Circhester2',
    [
        new GymPokemon('Burpmon', 84261781, 40),
        new GymPokemon('Burpmon', 84261781, 40),
        new GymPokemon('Burpmon', 86035713, 41),
        new GymPokemon('Burpmon', 88696611, 42),
    ],
    BadgeEnums.Galar_Ice,
    80000,
    'I think you took breaking the ice a little too literally...',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 18)]
);
GymList['Spikemuth'] = new Gym(
    'Piers',
    'Spikemuth',
    [
        new GymPokemon('Burpmon', 99141007, 44),
        new GymPokemon('Burpmon', 100184597, 45),
        new GymPokemon('Burpmon', 100184597, 45),
        new GymPokemon('Burpmon', 104348955, 46),
    ],
    BadgeEnums.Galar_Dark,
    96000,
    'Me an\' my team gave it our best. Let\'s meet up again for a battle some time...',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 22)]
);
GymList['Hammerlocke'] = new Gym(
    'Raihan',
    'Hammerlocke',
    [
        new GymPokemon('Burpmon', 111645278, 46),
        new GymPokemon('Burpmon', 112820492, 47),
        new GymPokemon('Burpmon', 111645278, 46),
        new GymPokemon('Burpmon', 117521346, 48),
    ],
    BadgeEnums.Galar_Dragon,
    128000,
    'I might have lost, but I still look good. Maybe I should snap a quick selfie...',
    [
        new RouteKillRequirement(10, GameConstants.Region.galar, 22),
        new GymBadgeRequirement(BadgeEnums.Galar_Dark),
    ]
);
GymList['Trainer Marnie'] = new Gym(
    'Marnie',
    'Trainer Marnie',
    [
        new GymPokemon('Burpmon', 117521346, 47),
        new GymPokemon('Burpmon', 117521346, 47),
        new GymPokemon('Burpmon', 117521346, 47),
        new GymPokemon('Burpmon', 127967688, 48),
        new GymPokemon('Burpmon', 130579274, 49),
    ],
    BadgeEnums.Elite_Marnie,
    150000,
    'I mean, If you\'re gonna win, you could at least win in a way that makes me look good, right?',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Rose Tower'))]
);
GymList['Gym Leader Bede'] = new Gym(
    'Bede',
    'Gym Leader Bede',
    [
        new GymPokemon('Burpmon', 117521346, 51),
        new GymPokemon('Burpmon', 117521346, 51),
        new GymPokemon('Burpmon', 117521346, 51),
        new GymPokemon('Burpmon', 127967688, 52),
        new GymPokemon('Burpmon', 130579274, 53),
    ],
    BadgeEnums.Elite_Bede,
    150000,
    'I couldn\'t win, but at least I was able to show everyone how great Fairy types are.',
    [new GymBadgeRequirement(BadgeEnums.Elite_Marnie)]
);
GymList['Trainer Hop'] = new Gym(
    'Hop',
    'Trainer Hop',
    [
        new GymPokemon('Burpmon', 130579274, 59),
        new GymPokemon('Burpmon', 117521346, 58),
        new GymPokemon('Burpmon', 117521346, 58),
        new GymPokemon('Burpmon', 117521346, 58),
        new GymPokemon('Burpmon', 130579274, 59),
        new GymPokemon('Burpmon', 137833678, 60),
    ],
    BadgeEnums.Elite_Hop,
    200000,
    'Thanks, mate. I\'m really glad you were the one here with me.',
    [new GymBadgeRequirement(BadgeEnums.Elite_Bede)]
    // TODO: Add ability to change gym leaders pokemon based on your starter
    // Burpmon
    // [new GymPokemon('Burpmon', 137833678, 60)],
    // Burpmon
    // [new GymPokemon('Burpmon', 137833678, 60)],
    // Burpmon/Burpmon
    // [new GymPokemon('Burpmon', 137833678, 60)]
);
// Galar Champion
//TODO: rewards/hp rebalance
GymList['Champion Leon'] = new Champion(
    'Leon',
    'Champion Leon',
    [
        new GymPokemon('Burpmon', 130579274, 62),
        new GymPokemon('Burpmon', 130579274, 62),
        new GymPokemon('Burpmon', 130579274, 63),
    ],
    BadgeEnums.Elite_GalarChampion,
    250000,
    'My time as Champion is over... But what a champion time it\'s been! Thank you for the greatest battle I\'ve ever had!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Hop)],
    // Burpmon
    [
        new GymPokemon('Burpmon', 133481036, 64),
        new GymPokemon('Burpmon', 137833678, 64),
        new GymPokemon('Burpmon', 145088083, 65),
    ],
    // Burpmon
    [
        new GymPokemon('Burpmon', 133481036, 64),
        new GymPokemon('Burpmon', 137833678, 64),
        new GymPokemon('Burpmon', 145088083, 65),
    ],
    // Burpmon/Burpmon
    [
        new GymPokemon('Burpmon', 133481036, 64),
        new GymPokemon('Burpmon', 137833678, 64),
        new GymPokemon('Burpmon', 145088083, 65),
    ]
);

// Armor + crown gyms
GymList['Gym Leader Klara'] = new Gym(
    'Klara',
    'Gym Leader Klara',
    [
        new GymPokemon('Burpmon', 144036193, 68),
        new GymPokemon('Burpmon', 144036193, 68),
        new GymPokemon('Burpmon', 144036193, 68),
        new GymPokemon('Burpmon', 147068434, 69),
        new GymPokemon('Burpmon', 151617045, 70),
    ],
    BadgeEnums.Elite_ArmorPoison,
    150000,
    'Aww, come on! What a drag! But...I guess it was also kinda fun!',
    [
        new MultiRequirement([
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Tower of Darkness')),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Tower of Water')),
        ]),
    ]
);
GymList['Gym Leader Avery'] = new Gym(
    'Avery',
    'Gym Leader Avery',
    [
        new GymPokemon('Burpmon', 144036193, 68),
        new GymPokemon('Burpmon', 144036193, 68),
        new GymPokemon('Burpmon', 144036193, 68),
        new GymPokemon('Burpmon', 147068434, 69),
        new GymPokemon('Burpmon', 151617045, 70),
    ],
    BadgeEnums.Elite_ArmorPsychic,
    150000,
    'More! I require more! Show me your Stored Power!',
    [new GymBadgeRequirement(BadgeEnums.Elite_ArmorPoison)]
);
GymList['Dojo Master Mustard'] = new Gym(
    'Mustard',
    'Dojo Master Mustard',
    [
        new GymPokemon('Burpmon', 151617046, 73),
        new GymPokemon('Burpmon', 151617046, 73),
        new GymPokemon('Burpmon', 154808984, 75),
        new GymPokemon('Burpmon', 154808984, 75),
        new GymPokemon('Burpmon', 159596891, 75),
        new GymPokemon('Burpmon', 159596891, 75),
    ],
    BadgeEnums.Elite_ArmorChampion,
    250000,
    'That strength of yours doesn\'t bend easily!',
    [new GymBadgeRequirement(BadgeEnums.Elite_ArmorPsychic)]
);
GymList['Trainer Peony'] = new Gym(
    'Freezington',
    'Trainer Peony',
    [
        new GymPokemon('Burpmon', 197029616, 74),
        new GymPokemon('Burpmon', 192967150, 73),
        new GymPokemon('Burpmon', 192967150, 73),
        new GymPokemon('Burpmon', 197029616, 74),
        new GymPokemon('Burpmon', 203123316, 74),
    ],
    BadgeEnums.Elite_CrownChampion,
    250000,
    'Gone and got stronger again, have you? Ah well! Hats off to you-in more ways than one!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Crown Shrine'))]
);
