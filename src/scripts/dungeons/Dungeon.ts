///<reference path="../../declarations/enums/Badges.d.ts"/>
///<reference path="DungeonBossPokemon.ts"/>
///<reference path="../../declarations/requirements/GymBadgeRequirement.d.ts"/>
///<reference path="../../declarations/requirements/MultiRequirement.d.ts"/>
///<reference path="../../declarations/requirements/SeededDateRequirement.d.ts"/>
///<reference path="../../declarations/utilities/SeededDateRand.d.ts"/>
///<reference path="../achievements/ObtainedPokemonRequirement.ts"/>
///<reference path="./DungeonTrainer.ts"/>
///<reference path="../gym/GymPokemon.ts"/>

interface EnemyOptions {
    weight?: number,
    requirement?: MultiRequirement | OneFromManyRequirement | Requirement,
    reward?: Amount,
    hide?: boolean,
}

interface DetailedPokemon {
    pokemon: PokemonNameType,
    options: EnemyOptions
}

interface Loot {
    loot: ItemNameType | PokemonNameType | UndergroundItemNameType | BerryNameType,
    weight?: number,
    requirement?: MultiRequirement | OneFromManyRequirement | Requirement,
    amount?: number,
}

type Enemy = PokemonNameType | DetailedPokemon | DungeonTrainer;

type Boss = DungeonBossPokemon | DungeonTrainer;

interface EncounterInfo {
    image: string,
    shiny: boolean,
    hide: boolean,
    hidden: boolean,
    locked: boolean,
    lockMessage: string,
}

// Gain a gym badge after first completion of a dungeon
const DungeonGainGymBadge = (gym: Gym, badge: BadgeEnums) => {
    // Check that the player hasn't already obtained the badge
    if (!App.game.badgeCase.hasBadge(badge)) {
        // Set the set to our expected gym
        // This updates our modal values
        GymRunner.gymObservable(gym);
        GymBattle.gym = gym;
        // Give the player the badge
        App.game.badgeCase.gainBadge(badge);
        // Show the modal
        $('#receiveBadgeModal').modal('show');
    }
};

/**
 * Gym class.
 */
class Dungeon {

    constructor(
        public name: string,
        public enemyList: Enemy[],
        public itemList: Loot[],
        public baseHealth: number,
        public bossList: Boss[],
        public tokenCost: number,
        public difficultyRoute: number, // Closest route in terms of difficulty, used for egg steps, dungeon tokens etc.
        public rewardFunction = () => {}
    ) { }

    public isUnlocked(): boolean {
        // Player requires the Dungeon Ticket to access the dungeons
        if (!App.game.keyItems.hasKeyItem(KeyItemType.Dungeon_ticket)) {
            Notifier.notify({
                message: 'You need the Dungeon ticket to access dungeons',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        return true;
    }

    /**
     * Finds the possible Bosses in the dungeon
     * @param includeTrainers Whether to include Trainer Bosses. Defaults to true
     * @param ignoreRequirement Whether to check if requirements are met. Defaults to false
     */
    public availableBosses(includeTrainers = true, ignoreRequirement = false): Boss[] {
        // TODO: HLXII - We need this check as this method is called somewhere during initialization when App isn't initialized yet
        // the requirement.isCompleted call can sometimes use the App object, which will cause this to crash
        // Once App is moved to modules, this check might be able to be removed.
        if (!App.game) {
            return [];
        }
        if (includeTrainers) {
            return this.bossList.filter(boss => {
                return (!ignoreRequirement && boss.options?.requirement) ? boss.options.requirement.isCompleted() : true;
            });
        } else {
            return this.bossList.filter(b => {
                if (b instanceof DungeonBossPokemon) {
                    return (!ignoreRequirement && b.options?.requirement) ? b.options.requirement.isCompleted() : true;
                }
                return false;
            }).map(b => <DungeonBossPokemon>b);
        }
    }

    /**
     * Retreives the weights for all the possible bosses
     */
    get bossWeightList(): number[] {
        return this.availableBosses().map((boss) => {
            return boss.options?.weight ?? 1;
        });
    }

    /**
     * Returns the possible enemies in the dungeon.
     * @param ignoreRequirement Whether to check if requirements are met. Defaults to false
     */
    public availableMinions(ignoreRequirement = false): Enemy[] {
        return this.enemyList.filter((enemy) => {
            if (typeof enemy === 'string') {
                return true;
            } else {
                return (!ignoreRequirement && enemy.options?.requirement) ? enemy.options.requirement.isCompleted() : true;
            }
        });
    }

    /**
     * Gets all available Pokemon in the dungeon
     */
    public allAvailablePokemon(): PokemonNameType[] {
        const encounterInfo = [];

        // Handling minions
        this.enemyList.forEach((enemy) => {
            // Handling Pokemon
            if (typeof enemy === 'string' || enemy.hasOwnProperty('pokemon')) {
                let pokemonName: PokemonNameType;
                if (enemy.hasOwnProperty('pokemon')) {
                    // Check if requirements have been met
                    if ((enemy as DetailedPokemon).options?.requirement) {
                        if (!(enemy as DetailedPokemon).options.requirement.isCompleted()) {
                            return;
                        }
                    }
                    pokemonName = (<DetailedPokemon>enemy).pokemon;
                } else {
                    pokemonName = <PokemonNameType>enemy;
                }
                encounterInfo.push(pokemonName);
            // Handling Trainers
            } else { /* We don't include Trainers */ }
        });

        // Handling Bosses
        this.bossList.forEach((boss) => {
            // Handling Pokemon
            if (boss instanceof DungeonBossPokemon) {
                if (boss.options?.requirement) {
                    if (!boss.options.requirement.isCompleted()) {
                        return;
                    }
                }
                const pokemonName = boss.name;
                encounterInfo.push(pokemonName);
            // Handling Trainer
            } else { /* We don't include Trainers */ }
        });

        return encounterInfo;
    }

    /**
     * Retrieves the weights for all the possible enemies
     */
    get weightList(): number[] {
        return this.availableMinions().map((enemy) => {
            if (typeof enemy === 'string') {
                return 1;
            } else if (enemy.hasOwnProperty('pokemon')) {
                return (<DetailedPokemon>enemy).options.weight ?? 1;
            } else {
                return (<DungeonTrainer>enemy).options?.weight ?? 1;
            }
        });
    }

    /**
     * Retrieves the weights for all the possible Loot, weight values are utilized as 10^Weight. Should use values in Dungeon Initialization from 0 (least likely) to 4 (most likely), anything > 4 is probably too much
     */
    get lootWeightList(): number[] {
        return this.itemList.map((loot) => {
            if (loot.requirement && !loot.requirement.isCompleted()) {
                return 0;
            }
            if (loot.weight < 2 && GameConstants.getDungeonRegion(this.name) < player.highestRegion() - 2) {
                return 0.1 * Math.max(0.5,loot.weight);
            }
            // Minimum of 1 times cleared for division
            const timesCleared = Math.min(500, Math.max(1, App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex(this.name)]()));
            // Calculate total weight based on times cleared, minimum weight being original number specified
            return Math.max(loot.weight, Math.pow(15, loot.weight) / timesCleared) + 1 || 1;
        });
    }

    /**
     * Returns the possible minion Pokemon in the dungeon.
     * Filters out Trainers and collapses DetailedPokemon
     */
    get pokemonList(): PokemonNameType[] {
        // Filtering out Trainers
        return this.enemyList.filter((enemy) => {
            return !enemy.hasOwnProperty('name');
        }).map((enemy) => {
            // Collapsing DetailedPokemon
            if (typeof enemy === 'string') {
                return enemy;
            } else if (enemy.hasOwnProperty('pokemon')) {
                return (<DetailedPokemon>enemy).pokemon;
            }
        });
    }

    /**
     * Returns the possible boss Pokemon in the dungeon.
     * Filters out Trainers
     */
    get bossPokemonList(): PokemonNameType[] {
        // Filtering out Trainers
        return this.bossList.filter((enemy) => {
            return enemy instanceof DungeonBossPokemon;
        }).map((enemy) => {
            return enemy.name as PokemonNameType;
        });
    }

    /**
     * Gets all possible Pokemon in the dungeon
     */
    get allPokemon(): PokemonNameType[] {
        return this.pokemonList.concat(this.bossPokemonList);
    }


    /**
     * Gets all non-boss Pokemon encounters in the dungeon
     * Used for generating the dungeon encounter list view
     */
    get normalEncounterList(): EncounterInfo[] {
        const encounterInfo = [];

        // Handling minions
        this.enemyList.forEach((enemy) => {
            // Handling Pokemon
            if (typeof enemy === 'string' || enemy.hasOwnProperty('pokemon')) {
                let pokemonName: PokemonNameType;
                if (enemy.hasOwnProperty('pokemon')) {
                    pokemonName = (<DetailedPokemon>enemy).pokemon;
                } else {
                    pokemonName = <PokemonNameType>enemy;
                }
                const encounter = {
                    image: `assets/images/${(App.game.party.alreadyCaughtPokemonByName(pokemonName, true) ? 'dot' : '')}digidex/${pokemonMap[pokemonName].id}.png`,
                    shiny:  App.game.party.alreadyCaughtPokemonByName(pokemonName, true),
                    hidden: !App.game.party.alreadyCaughtPokemonByName(pokemonName),
                    lock: false,
                    lockMessage: '',
                };
                encounterInfo.push(encounter);
            // Handling Trainers
            } else { /* We don't display minion Trainers */ }
        });

        return encounterInfo;
    }


    /**
     * Gets all boss encounters in the dungeon
     * Used for generating the dungeon encounter list view
     */
    get bossEncounterList(): EncounterInfo[] {
        const encounterInfo = [];

        // Handling Bosses
        this.bossList.forEach((boss) => {
            // Handling Pokemon
            if (boss instanceof DungeonBossPokemon) {
                const pokemonName = boss.name;
                const encounter = {
                    image: `assets/images/${(App.game.party.alreadyCaughtPokemonByName(pokemonName, true) ? 'dot' : '')}digidex/${pokemonMap[pokemonName].id}.png`,
                    shiny:  App.game.party.alreadyCaughtPokemonByName(pokemonName, true),
                    hide: boss.options?.hide ? (boss.options?.requirement ? !boss.options?.requirement.isCompleted() : boss.options?.hide) : false,
                    hidden: !App.game.party.alreadyCaughtPokemonByName(pokemonName),
                    lock: boss.options?.requirement ? !boss.options?.requirement.isCompleted() : false,
                    lockMessage: boss.options?.requirement ? boss.options?.requirement.hint() : '',
                };
                encounterInfo.push(encounter);
            // Handling Trainer
            } else {
                const encounter = {
                    image: boss.image,
                    shiny:  false,
                    hide: boss.options?.hide ? (boss.options?.requirement ? !boss.options?.requirement.isCompleted() : boss.options?.hide) : false,
                    hidden: false,
                    lock: boss.options?.requirement ? !boss.options?.requirement.isCompleted() : false,
                    lockMessage: boss.options?.requirement ? boss.options?.requirement.hint() : '',
                };
                encounterInfo.push(encounter);
            }
        });

        return encounterInfo;
    }
}

/**
 * Data list that contains all dungeons, accessible by name.
 */

const dungeonList: { [dungeonName: string]: Dungeon } = {};

// Kanto Dungeons

dungeonList['Coelamon Beach'] = new Dungeon('Coelamon Beach',
    [
        {pokemon: 'Tanemon', options: { weight: 2.67 }},
        {pokemon: 'Alraumon', options: { weight: 2.67 }},
        {pokemon: 'Betamon', options: { weight: 2.67 }},
        {pokemon: 'Ganimon', options: { weight: 2.67 }},
        {pokemon: 'Kunemon', options: { weight: 2.67 }},
        {pokemon: 'Mushmon', options: { weight: 2.67 }},
        new DungeonTrainer('Bug Catcher',
            [
                new GymPokemon('Dokunemon', 52, 6),
                new GymPokemon('Dokunemon', 52, 6),
            ], { weight: 1 }, 'Rick'),
        new DungeonTrainer('Bug Catcher',
            [
                new GymPokemon('Kokuwamon', 52, 7),
                new GymPokemon('Kokuwamon', 52, 7),
                new GymPokemon('Mushmon', 52, 7),
            ], { weight: 1 }, 'Doug'),
        new DungeonTrainer('Bug Catcher',
            [
                new GymPokemon('Mushmon', 52, 7),
                new GymPokemon('Betamon', 52, 8),
            ], { weight: 1 }, 'Anthony'),
        new DungeonTrainer('Bug Catcher',
            [
                new GymPokemon('Mushmon', 52, 7),
                new GymPokemon('Kokuwamon', 52, 7),
                new GymPokemon('Dokunemon', 52, 7),
            ], { weight: 1 }, 'Charlie'),
    ],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Health', weight: 3.5},
        {loot: 'Pokeball', weight: 3},
        {loot: 'SmallRestore', weight: 1.75},
        {loot: 'Plant_egg', weight: 1, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Coelamon Beach'))},
        {loot: 'Leaf_stone', weight: 0},
    ],
    116,
    [
        new DungeonBossPokemon('Shellmon', 522, 7),
        new DungeonTrainer('Bug Catcher',
            [new GymPokemon('Mori Shellmon', 522, 9)],
            { weight: 1 }, 'Sammy'),
    ],
    50, 2);

dungeonList['Lost Colosseum'] = new Dungeon('Lost Colosseum',
    [
        {pokemon: 'Fugamon', options: { weight: 2.67 }},
        {pokemon: 'Drimogemon', options: { weight: 2.67 }},
        {pokemon: 'Minotaurmon', options: { weight: 2.67 }},
        {pokemon: 'Ganimon', options: { weight: 2.67 }},
        {pokemon: 'Golemon', options: { weight: 2.67 }},
        {pokemon: 'Meramon', options: { weight: 2.67 }},
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Fugamon', 2487, 26),
                new GymPokemon('Minotaurmon', 2487, 26),
            ], { weight: 1 }, 'Mac'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Meramon', 2487, 25),
                new GymPokemon('Meramon', 2487, 25),
                new GymPokemon('Golemon', 2487, 25),
            ], { weight: 1 }, 'Zane'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Flare Lizarmon', 2487, 26),
                new GymPokemon('Drimogemon', 2487, 26),
            ], { weight: 1 }, 'Joseph'),
        new DungeonTrainer('Lass',
            [
                new GymPokemon('Drimogemon', 2487, 25),
                new GymPokemon('Drimogemon', 2487, 25),
                new GymPokemon('Nise Drimogemon', 2487, 25),
            ], { weight: 1 }, 'Nina'),
    ],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'Lucky_floppy', weight: 4},
        {loot: 'Mystery_egg', weight: 1, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Lost Colosseum'))},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Backup', weight: 0},
    ],
    5527,
    [new DungeonBossPokemon('Skull Greymon', 24871, 27)],
    650, 11);

dungeonList['Mugendramon\'s Mill'] = new Dungeon('Mugendramon\'s Mill',
    ['Megadramon', 'Mamemon', 'Giromon', 'Gigadramon', 'Big Mamemon', 'Andromon', 'Thunderballmon', 'Tankmon', 'Monochromon', 'Mechanorimon'],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Security', weight: 3.5},
        {loot: 'Revive', weight: 1.75},
        {loot: 'Earth_egg', weight: 1, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Mugendramon\'s Mill'))},
        {loot: 'Ultraball', weight: 1},
        {loot: 'Leaf_stone', weight: 0},
    ],
    30196,
    [
        new DungeonBossPokemon('Metal Greymon Virus', 100130, 39),
        new DungeonBossPokemon('Mugendramon', 135882, 52),
    ],
    1250, 21);

dungeonList['Andromon\'s Factory'] = new Dungeon('Andromon\'s Factory',
    [
        {pokemon: 'Toy Agumon', options: { weight: 8.8 }},
        {pokemon: 'Kokuwamon', options: { weight: 8.8 }},
        {pokemon: 'Hagurumon', options: { weight: 8.8 }},
        {pokemon: 'Goburimon', options: { weight: 8.8 }},
        {pokemon: 'Clear Agumon', options: { weight: 8.8 }},
        new DungeonTrainer('Bug Catcher',
            [
                new GymPokemon('Goburimon', 231, 12),
                new GymPokemon('Shamamon', 231, 12),
            ], { weight: 1 }, 'Kent'),
        new DungeonTrainer('Lass',
            [new GymPokemon('Candmon', 231, 13)],
            { weight: 1 }, 'Iris'),
        new DungeonTrainer('Super Nerd',
            [
                new GymPokemon('Clear Agumon', 231, 12),
                new GymPokemon('Clockmon', 231, 12),
            ], { weight: 1 }, 'Jovan'),
        new DungeonTrainer('Bug Catcher',
            [
                new GymPokemon('Mechanorimon', 231, 11),
                new GymPokemon('Hagurumon', 231, 11),
                new GymPokemon('Hagurumon', 231, 11),
            ], { weight: 1 }, 'Robby'),
        new DungeonTrainer('Lass',
            [
                new GymPokemon('Clockmon', 231, 12),
                new GymPokemon('Gottsumon', 231, 12),
            ], { weight: 1 }, 'Miriam'),
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Gottsumon', 231, 11),
                new GymPokemon('Gottsumon', 231, 11),
                new GymPokemon('Gottsumon', 231, 11),
            ], { weight: 1 }, 'Josh'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Guardromon', 231, 11),
                new GymPokemon('Gottsumon', 231, 11),
                new GymPokemon('Hagurumon', 231, 11),
            ], { weight: 1 }, 'Marcos'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Hagurumon', 231, 11),
                new GymPokemon('Goburimon', 231, 11),
                new GymPokemon('Goburimon', 231, 11),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Hagurumon', 231, 12),
                new GymPokemon('Goburimon', 231, 12),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Goburimon', 231, 12),
                new GymPokemon('Goburimon', 231, 12),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Toy Agumon', 231, 12),
                new GymPokemon('Toy Agumon', 231, 12),
            ], { weight: 1 }, undefined, '(male)'),
    ],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'Item_magnet', weight: 4},
        {loot: 'SmallRestore', weight: 1.75},
        {loot: 'Greatball', weight: 1},
        {loot: 'Star Piece', weight: 1},
        {loot: 'Hono Fossil', weight: 0, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Andromon\'s Factory'))},
        {loot: 'Hikari Fossil', weight: 0, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Andromon\'s Factory'))},
        {loot: 'Moon_stone', weight: 0},
    ],
    514,
    [
        new DungeonBossPokemon('Andromon', 2313, 15),
        new DungeonBossPokemon('Guardromon', 2313, 14),
    ],
    75, 4,
    () => {
        if (App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Mt. Moon')]() <= 1) {
            /*const item = Rand.boolean() ? 'Hikari Fossil' : 'Hono Fossil';
            Underground.gainMineItem(Underground.getMineItemByName(item).id, 1);
            Notifier.notify({
                message: `You were awarded a ${GameConstants.humanifyString(item)} for defeating the Super Nerd`,
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.Items.dungeon_item_found,
            });*/
        }
    });

dungeonList['Digivice Temple'] = new Dungeon('Digivice Temple',
    [
        {pokemon: 'Shamamon', options: { weight: 20 }},
        {pokemon: 'Minotaurmon', options: { weight: 20 }},
        {pokemon: 'Monochromon', options: { weight: 20 }},
        new DungeonTrainer('PokéManiac',
            [
                new GymPokemon('Kokuwamon', 843, 18),
                new GymPokemon('Kokuwamon', 843, 18),
            ], { weight: 1 }, 'Ashton'),
        new DungeonTrainer('PokéManiac',
            [new GymPokemon('Leomon', 843, 19)],
            { weight: 1 }, 'Winston'),
        new DungeonTrainer('Picnicker',
            [
                new GymPokemon('Goburimon', 843, 18),
                new GymPokemon('Shamamon', 843, 18),
            ], { weight: 1 }, 'Martha'),
        new DungeonTrainer('PokéManiac',
            [
                new GymPokemon('Dokunemon', 843, 18),
                new GymPokemon('Dokunemon', 843, 18),
            ], { weight: 1 }, 'Steve'),
        new DungeonTrainer('Hiker',
            [new GymPokemon('Orgemon', 843, 19)],
            { weight: 1 }, 'Allen'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Hagurumon', 843, 18),
                new GymPokemon('Hagurumon', 843, 18),
            ], { weight: 1 }, 'Eric'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Kunemon', 843, 17),
                new GymPokemon('Kunemon', 843, 17),
                new GymPokemon('Numemon', 843, 17),
                new GymPokemon('Numemon', 843, 17),
            ], { weight: 1 }, 'Lenny'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Betamon', 843, 17),
                new GymPokemon('Betamon', 843, 17),
                new GymPokemon('Betamon', 843, 17),
            ], { weight: 1 }, 'Oliver'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Mushmon', 843, 18),
                new GymPokemon('Mushmon', 843, 18),
            ], { weight: 1 }, 'Lucas'),
        new DungeonTrainer('Picnicker',
            [
                new GymPokemon('Geremon', 843, 17),
                new GymPokemon('Mushmon', 843, 17),
                new GymPokemon('Geremon', 843, 17),
            ], { weight: 1 }, 'Sofia'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Geremon', 843, 17),
                new GymPokemon('Jungle Mojyamon', 843, 17),
                new GymPokemon('Geremon', 843, 17),
            ], { weight: 1 }, 'Dudley'),
        new DungeonTrainer('PokéManiac',
            [
                new GymPokemon('Toy Agumon', 843, 17),
                new GymPokemon('Shamamon', 843, 17),
                new GymPokemon('Shakomon', 843, 17),
            ], { weight: 1 }, 'Cooper'),
        new DungeonTrainer('Picnicker',
            [
                new GymPokemon('Shakomon', 843, 18),
                new GymPokemon('Shakomon', 843, 18),
            ], { weight: 1 }, 'Leah'),
        new DungeonTrainer('Picnicker',
            [
                new GymPokemon('Palmon', 843, 17),
                new GymPokemon('Alraumon', 843, 17),
                new GymPokemon('Alraumon', 843, 17),
            ], { weight: 1 }, 'Dana'),
    ],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'eBook', weight: 3.5},
        {loot: 'Pokeball', weight: 3},
        {loot: 'Greatball', weight: 2},
        {loot: 'Revive', weight: 1.75},
        {loot: 'MediumRestore', weight: 1},
        {loot: 'Oval Stone', weight: 1},
        {loot: 'Heart Scale', weight: 0},
        {loot: 'Star Piece', weight: 0},
    ],
    1874,
    [
        new DungeonBossPokemon('Centalmon', 8433, 19),
        new DungeonTrainer('Picnicker',
            [
                new GymPokemon('Dokunemon', 2100, 19),
                new GymPokemon('Dokunemon', 2100, 19),
                new GymPokemon('Goburimon', 2100, 19),
                new GymPokemon('Goburimon', 2100, 19),
            ], { weight: 1 }, 'Ariana'),
    ],
    500, 7);

dungeonList['Etemon\'s Pyramid'] = new Dungeon('Etemon\'s Pyramid',
    [
        {pokemon: 'Insekimon', options: { weight: 20 }},
        {pokemon: 'Scumon', options: { weight: 20 }},
        {pokemon: 'Sand Yanmamon', options: { weight: 20 }},
        new DungeonTrainer('PokéManiac',
            [
                new GymPokemon('Tortamon', 3731, 30),
                new GymPokemon('Tortamon', 3731, 30),
            ], { weight: 1 }, 'Duke'),
        new DungeonTrainer('PokéManiac',
            [new GymPokemon('Starmon', 3731, 31)],
            { weight: 1 }, 'Cliff'),
        new DungeonTrainer('Picnicker',
            [
                new GymPokemon('Revolmon', 3731, 30),
                new GymPokemon('Tyranomon', 3731, 30),
            ], { weight: 1 }, 'Clyde'),
        new DungeonTrainer('PokéManiac',
            [
                new GymPokemon('Andromon', 3731, 30),
                new GymPokemon('Blikmon', 3731, 30),
            ], { weight: 1 }, 'Vinny'),
        new DungeonTrainer('Hiker',
            [new GymPokemon('Nise Drimogemon', 3731, 31)],
            { weight: 1 }, 'Greyson'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Monochromon', 3731, 30),
                new GymPokemon('Monochromon', 3731, 30),
            ], { weight: 1 }, 'Vlad'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Guardromon', 3731, 29),
                new GymPokemon('Guardromon', 3731, 29),
                new GymPokemon('Guardromon', 3731, 29),
                new GymPokemon('Hyougamon', 3731, 29),
            ], { weight: 1 }, 'Luke'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Greymon', 3731, 30),
                new GymPokemon('Yanmamon', 3731, 30),
                new GymPokemon('Yanmamon', 3731, 30),
            ], { weight: 1 }, 'Carlos'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Yukidarumon', 3731, 30),
                new GymPokemon('Yukidarumon', 3731, 30),
            ], { weight: 1 }, 'Jan'),
        new DungeonTrainer('Picnicker',
            [
                new GymPokemon('Unimon', 3731, 29),
                new GymPokemon('Unimon', 3731, 29),
                new GymPokemon('Unimon', 3731, 29),
            ], { weight: 1 }, 'Kathrin'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Geremon', 3731, 29),
                new GymPokemon('Jungle Mojyamon', 3731, 29),
                new GymPokemon('Geremon', 3731, 29),
            ], { weight: 1 }, 'Dudley'),
        new DungeonTrainer('PokéManiac',
            [
                new GymPokemon('Toy Agumon', 3731, 29),
                new GymPokemon('Monochromon', 3731, 29),
                new GymPokemon('Monochromon', 3731, 29),
            ], { weight: 1 }, 'Douglas'),
    ],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'eBook', weight: 3.5},
        {loot: 'Pokeball', weight: 3},
        {loot: 'Greatball', weight: 2},
        {loot: 'Revive', weight: 1.75},
        {loot: 'MediumRestore', weight: 1},
        {loot: 'Oval Stone', weight: 1},
        {loot: 'Heart Scale', weight: 0},
        {loot: 'Star Piece', weight: 0},
    ],
    8292,
    [
        new DungeonBossPokemon('Nanomon', 37314, 32),
        new DungeonBossPokemon('Etemon', 41314, 34), 
    ],
    1300, 13);

dungeonList['Metal Seadramon\'s Lair'] = new Dungeon('Metal Seadramon\'s Lair',
    ['Gesomon', 'Hangyomon', 'Rukamon', 'Whamon', 'Anomalocarimon', 'Waru Seadramon', 'Mega Seadramon', 'Seadramon'],
    [
        {loot: 'Lucky_floppy', weight: 4},
        {loot: 'Games', weight: 3.5},
        {loot: 'Burpmon', weight: 3.5},
        {loot: 'Water_egg', weight: 1, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Metal Seadramon\'s Lair'))},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Water_stone', weight: 0},
        {loot: 'Metal_coat', weight: 0, requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Metal Seadramon\'s Lair'))},
        {loot: 'Electirizer', weight: 0, requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Metal Seadramon\'s Lair'))},
    ],
    23860,
    [
        new DungeonBossPokemon('Whamon Perfect', 100000, 43),
        new DungeonBossPokemon('Metal Seadramon', 10737, 45),
    ],
    1000, 20);

dungeonList['Devimon Battle'] = new Dungeon('Devimon Battle',
    [
        {pokemon: 'Tukaimon', options: { weight: 21.3 }},
        {pokemon: 'Bakemon', options: { weight: 21.3 }},
        {pokemon: 'Goburimon', options: { weight: 21.3 }},
        new DungeonTrainer('Channeler',
            [new GymPokemon('Bakemon', 1157, 21)],
            { weight: 1 }, 'Hope'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Bakemon', 1157, 21)],
            { weight: 1 }, 'Patricia'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Soulmon', 1157, 21)],
            { weight: 1 }, 'Carly'),
        new DungeonTrainer('Channeler',
            [
                new GymPokemon('Bakemon', 1157, 20),
                new GymPokemon('Soulmon', 1157, 20),
            ], { weight: 1 }, 'Laurel'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Bakemon', 1157, 21)],
            { weight: 1 }, 'Jody'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Bakemon', 1157, 21)],
            { weight: 1 }, 'Paula'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Soulmon', 1157, 21)],
            { weight: 1 }, 'Ruth'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Bakemon', 1157, 21)],
            { weight: 1 }, 'Tammy'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Bakemon', 1157, 21)],
            { weight: 1 }, 'Karina'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Bakemon', 1157, 21)],
            { weight: 1 }, 'Janae'),
        new DungeonTrainer('Channeler',
            [
                new GymPokemon('Tukaimon', 1157, 19),
                new GymPokemon('Tukaimon', 1157, 19),
                new GymPokemon('Goburimon', 1157, 19),
            ], { weight: 1 }, 'Angelica'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Bakemon', 1157, 21)],
            { weight: 1 }, 'Jennifer'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Bakemon', 1157, 21)],
            { weight: 1 }, 'Emilia'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Tukaimon', 1157, 19),
                new GymPokemon('Tukaimon', 1157, 19),
                new GymPokemon('Tukaimon', 1157, 19),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Soulmon', 1157, 20),
                new GymPokemon('Soulmon', 1157, 20),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Soulmon', 1157, 18),
                new GymPokemon('Soulmon', 1157, 18),
                new GymPokemon('Tukaimon', 1157, 19),
                new GymPokemon('Tukaimon', 1157, 19),
            ], { weight: 1 }, undefined, '(male)'),
    ],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Security', weight: 3.5},
        {loot: 'Greatball', weight: 2.5},
        {loot: 'Earth_egg', weight: 1, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Devimon Battle'))},
        {loot: 'MediumRestore', weight: 0.5},
        {loot: 'Star Piece', weight: 0.5},
        {loot: 'Revive', weight: 0.5},
        {loot: 'Rare Bone', weight: 0},
        {loot: 'Ultraball', weight: 0},
        {loot: 'LargeRestore', weight: 0},
        {loot: 'Soothe_bell', weight: 0, requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Devimon Battle'))},
        {loot: 'Trade_stone', weight: 0, requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Devimon Battle'))},
    ],
    2572,
    [new DungeonBossPokemon('Devimon', 11574, 23)],
    750, 10);

dungeonList['VenomVamdemon Rampage'] = new Dungeon('VenomVamdemon Rampage',
    ['Saberdramon', 'Tuskmon', 'Tyranomon', 'Wizarmon', 'Blue Meramon', 'Fantomon', 'Gigadramon', 'Parrotmon', 'Skull Satamon', 'Metal Tyranomon'],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Light', weight: 3.5},
        {loot: 'Revive', weight: 1.75},
        {loot: 'Water_egg', weight: 1, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('VenomVamdemon Rampage'))},
        {loot: 'Ultraball', weight: 1},
        {loot: 'Water_stone', weight: 0},
    ],
    21024,
    [
        new DungeonBossPokemon('Skull Mammon', 86130, 43),
        new DungeonBossPokemon('Venom Vamdemon', 94608, 47),
    ],
    1250, 19);

dungeonList['Pinochimon\'s House'] = new Dungeon('Pinochimon\'s House',
    ['Jyagamon', 'Ookuwamon', 'Pumpmon', 'Gerbemon', 'Vermillimon', 'Ex-Tyranomon', 'Delumon', 'Kiwimon', 'Floramon', 'Woodmon'],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Light', weight: 3.5},
        {loot: 'Revive', weight: 1.75},
        {loot: 'Plant_egg', weight: 1, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Pinochimon\'s House'))},
        {loot: 'Ultraball', weight: 1},
        {loot: 'Leaf_stone', weight: 0},
    ],
    26916,
    [
        new DungeonBossPokemon('Jyureimon', 111111, 47),
        new DungeonBossPokemon('Pinochimon', 121122, 50),
    ],
    1250, 21);

dungeonList['Vamdemon\'s Castle'] = new Dungeon('Vamdemon\'s Castle',
    [
        {pokemon: 'Saberdramon', options: { weight: 3.5 }},
        {pokemon: 'Soulmon', options: { weight: 3.5 }},
        {pokemon: 'Musyamon', options: { weight: 3.5 }},
        {pokemon: 'Minotaurmon', options: { weight: 3.5 }},
        {pokemon: 'Igamon', options: { weight: 3.5 }},
        {pokemon: 'Numemon', options: { weight: 3.5 }},
        {pokemon: 'Gorimon', options: { weight: 3.5 }},
        {pokemon: 'Geremon', options: { weight: 3.5 }},
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Musyamon', 7195, 37),
                new GymPokemon('Numemon', 7195, 37),
                new GymPokemon('Numemon', 7195, 37),
            ], { weight: 1 }, 'Johnson'),
        new DungeonTrainer('Burglar',
            [
                new GymPokemon('Saberdramon', 7195, 38),
                new GymPokemon('Saberdramon', 7195, 38),
            ], { weight: 1 }, 'Arnie'),
        new DungeonTrainer('Burglar',
            [new GymPokemon('Igamon', 7195, 39)],
            { weight: 1 }, 'Simon'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Gorimon', 7195, 37),
                new GymPokemon('Fugamon', 7195, 37),
                new GymPokemon('Hanumon', 7195, 37),
            ], { weight: 1 }, 'Braydon', '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Geremon', 7195, 38),
                new GymPokemon('Numemon', 7195, 38),
            ], { weight: 1 }, 'Ted', '(male)'),
        new DungeonTrainer('Burglar',
            [
                new GymPokemon('Scumon', 7195, 38),
                new GymPokemon('Scumon', 7195, 38),
            ], { weight: 1 }, 'Lewis'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Igamon', 7195, 38),
                new GymPokemon('Blue Meramon', 7195, 38),
            ], { weight: 1 }, 'Ivan', '(male)'),
    ],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Step', weight: 3.5},
        {loot: 'Music', weight: 3},
        {loot: 'Ultraball', weight: 1.75},
        {loot: 'Mystery_egg', weight: 1.5, requirement: new ClearDungeonRequirement(50, GameConstants.getDungeonIndex('Vamdemon\'s Castle'))},
        {loot: 'Fire_egg', weight: 0.5, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Vamdemon\'s Castle'))},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Moon_stone', weight: 0},
        {loot: 'Fire_stone', weight: 0},
        {loot: 'Magmarizer', weight: 0, requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Vamdemon\'s Castle'))},
    ],
    15989,
    [new DungeonBossPokemon('Vamdemon', 71950, 40)],
    1500, 16);

dungeonList['Piemon\'s Observatory'] = new Dungeon('Piemon\'s Observatory',
    [
        {pokemon: 'Waru Monzaemon', options: { weight: 8.8 }},
        {pokemon: 'Waru Seadramon', options: { weight: 8.8 }},
        {pokemon: 'Boltmon', options: { weight: 8.8 }},
        {pokemon: 'Skull Mammon', options: { weight: 8.8 }},
        {pokemon: 'Master Tyranomon', options: { weight: 8.8 }},
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Megadramon', 15168, 48),
                new GymPokemon('Mammon', 15168, 48),
                new GymPokemon('Mammon', 15168, 48),
                new GymPokemon('Waru Seadramon', 15168, 48),
                new GymPokemon('Waru Seadramon', 15168, 48),
            ], { weight: 1 }, 'Naomi', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Ookuwamon', 15168, 48),
                new GymPokemon('Pumpmon', 15168, 48),
                new GymPokemon('Skull Satamon', 15168, 48),
                new GymPokemon('Triceramon', 15168, 48),
                new GymPokemon('Metal Mamemon', 15168, 48),
            ], { weight: 1 }, 'Rolando', '(male)'),
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Metal Mamemon', 15168, 49),
                new GymPokemon('Mamemon', 15168, 49),
                new GymPokemon('Tyranomon', 15168, 49),
            ], { weight: 1 }, 'Daisuke'),
        new DungeonTrainer('Juggler',
            [
                new GymPokemon('Tyranomon', 15168, 48),
                new GymPokemon('Tyranomon', 15168, 48),
                new GymPokemon('Metal Tyranomon', 15168, 48),
                new GymPokemon('Metal Tyranomon', 15168, 48),
            ], { weight: 1 }, 'Nelson'),
        new DungeonTrainer('Tamer',
            [
                new GymPokemon('Lady Devimon', 15168, 50),
                new GymPokemon('Jyureimon', 15168, 50),
            ], { weight: 1 }, 'Vincent'),
        new DungeonTrainer('Juggler',
            [new GymPokemon('Boltmon', 15168, 50)],
            { weight: 1 }, 'Gregory'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Etemon', 15168, 48),
                new GymPokemon('Etemon', 15168, 48),
                new GymPokemon('Fantomon', 15168, 48),
                new GymPokemon('Fantomon', 15168, 48),
                new GymPokemon('Digitamamon', 15168, 48),
            ], { weight: 1 }, 'George', '(male)'),
        new DungeonTrainer('PokéManiac',
            [
                new GymPokemon('Brachimon', 15168, 48),
                new GymPokemon('Atlur Kabuterimon Blue', 15168, 48),
                new GymPokemon('Atlur Kabuterimon Red', 15168, 48),
            ], { weight: 1 }, 'Dawson'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Anomalocarimon', 15168, 48),
                new GymPokemon('Anomalocarimon', 15168, 48),
                new GymPokemon('Dagomon', 15168, 48),
                new GymPokemon('Dagomon', 15168, 48),
                new GymPokemon('Gesomon', 15168, 48),
            ], { weight: 1 }, 'Alexa', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Gigadramon', 15168, 48),
                new GymPokemon('Gigadramon', 15168, 48),
                new GymPokemon('Megadramon', 15168, 48),
                new GymPokemon('Megadramon', 15168, 48),
                new GymPokemon('Master Tyranomon', 15168, 48),
            ], { weight: 1 }, 'Colby', '(male)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Monzaemon', 15168, 48),
                new GymPokemon('Monzaemon', 15168, 48),
                new GymPokemon('Monzaemon', 15168, 48),
                new GymPokemon('Waru Monzaemon', 15168, 48),
                new GymPokemon('Waru Monzaemon', 15168, 48),
            ], { weight: 1 }, 'Caroline', '(female)'),
    ],
    [
        {loot: 'xClick', weight: 3.75},
        {loot: 'Lucky_pill', weight: 3.75},
        {loot: 'Ultraball', weight: 1.75},
        {loot: 'SmallRestore', weight: 1.75},
        {loot: 'Star Piece', weight: 1},
        {loot: 'Wind_egg', weight: 1, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Piemon\'s Observatory'))},
        {loot: 'Leaf_stone', weight: 0},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Heart Scale', weight: 0},
    ],
    33708,
    [
        new DungeonBossPokemon('King Etemon', 122975, 45),
        new DungeonBossPokemon('Piemon', 151686, 51),
        new DungeonTrainer('Backpacker (female)',
            [
                new GymPokemon('Angewomon', 61488, 45),
                new GymPokemon('Lady Devimon', 61488, 45),
            ], { weight: 1 }, 'Tyra'),
    ],
    2000, 23);

dungeonList['Our War Game'] = new Dungeon('Our War Game',
    ['Kuramon', 'Tsumemon', 'Keramon', 'Chrysalimon'],
    [
        {loot: 'Pokeball', weight: 4},
        {loot: 'Intel_floppy', weight: 4},
        {loot: 'Lucky_floppy', weight: 4},
        {loot: 'Greatball', weight: 3},
        {loot: 'Ultraball', weight: 2},
        {loot: 'LargeRestore', weight: 1},
        {loot: 'Gold Digizoid', weight: 0, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Our War Game'))},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(500, GameConstants.getDungeonIndex('Our War Game'))},
        {loot: 'Dusk_stone', weight: 0, requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Our War Game'))},
    ],
    39421,
    [
        new DungeonBossPokemon('Infermon', 177394, 54),
        new DungeonBossPokemon('Diablomon', 255512, 100),
    ],
    2500, 23);

// Johto Dungeons

dungeonList['Sprout Tower'] = new Dungeon('Sprout Tower',
    [
        {pokemon: 'Burpmon', options: { weight: 8 }},
        {pokemon: 'Burpmon', options: { weight: 8 }},
        {pokemon: 'Burpmon', options: { weight: 8 }},
        new DungeonTrainer('Sage',
            [
                new GymPokemon('Burpmon', 2500, 3),
                new GymPokemon('Burpmon', 2500, 3),
                new GymPokemon('Burpmon', 2500, 3),
            ], { weight: 1 }, 'Nico'),
        new DungeonTrainer('Sage',
            [
                new GymPokemon('Burpmon', 2500, 3),
                new GymPokemon('Burpmon', 2500, 3),
                new GymPokemon('Burpmon', 2500, 3),
            ], { weight: 1 }, 'Chow'),
        new DungeonTrainer('Sage',
            [
                new GymPokemon('Burpmon', 2500, 3),
                new GymPokemon('Burpmon', 2500, 3),
                new GymPokemon('Burpmon', 2500, 3),
            ], { weight: 1 }, 'Edmond'),
        new DungeonTrainer('Sage',
            [new GymPokemon('Burpmon', 2500, 6)],
            { weight: 1 }, 'Jin'),
        new DungeonTrainer('Sage',
            [new GymPokemon('Burpmon', 2500, 6)],
            { weight: 1 }, 'Neal'),
        new DungeonTrainer('Sage',
            [
                new GymPokemon('Burpmon', 2500, 7),
                new GymPokemon('Burpmon', 2500, 7),
            ], { weight: 1 }, 'Troy'),
    ],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'Lucky_floppy', weight: 3.5},
        {loot: 'Lucky_pill', weight: 3.5},
        {loot: 'Jungle Plate', weight: 2},
        {loot: 'SmallRestore', weight: 1.75},
        {loot: 'Plant_egg', weight: 1},
    ],
    56735,
    [
        new DungeonTrainer('Sage',
            [
                new GymPokemon('Burpmon', 86000, 7),
                new GymPokemon('Burpmon', 86000, 7),
                new GymPokemon('Burpmon', 87000, 10),
            ],
            { weight: 1 }, 'Li'),
    ],
    2500, 31);

// All Unown except "E?!"
SeededRand.seed(1337);
const AlphUnownList = SeededRand.shuffleArray('ABCDFGHIJKLMNOPQRSTUVWXYZ'.split(''));

dungeonList['Ruins of Alph'] = new Dungeon('Ruins of Alph',
    [
        {pokemon: 'Burpmon', options: { weight: 0.6 }},
        {pokemon: 'Burpmon', options: { weight: 0.6 }},
        {pokemon: 'Burpmon', options: { weight: 0.6 }},
        {pokemon: 'Burpmon', options: { weight: 0.6 }},
        {pokemon: 'Burpmon', options: { weight: 0.6 }},
        {pokemon: 'Burpmon', options: { weight: 0.6 }},
        {pokemon: 'Burpmon', options: { weight: 0.6 }},
        new DungeonTrainer('Psychic',
            [new GymPokemon('Burpmon', 3000, 26)],
            { weight: 1 }, 'Nathan', '(male)'),
    ],
    [
        {loot: 'Chat', weight: 4},
        {loot: 'Greatball', weight: 3.5},
        {loot: 'Health', weight: 3.5},
        {loot: 'Finance', weight: 3.5},
        {loot: 'eBook', weight: 2.5},
        {loot: 'SmallRestore', weight: 1.75},
        {loot: 'Star Piece', weight: 1},
        {loot: 'Moon Stone', weight: 0.5},
        {loot: 'LargeRestore', weight: 0},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Gold Digizoid', weight: 0},
        {loot: 'Hono Fossil', weight: 0},
        {loot: 'Hikari Fossil', weight: 0},
    ],
    60600,
    [
        new DungeonBossPokemon('Burpmon', 800000, 50, {
            hide: true,
            requirement: new ObtainedPokemonRequirement(pokemonMap['Burpmon'], true),
        }),
        ...AlphUnownList.map((char) => new DungeonBossPokemon(`Unown (${char})` as PokemonNameType, 280000, 14, {
            hide: true,
            requirement: new SeededDateRequirement(() => SeededDateRand.fromArray(AlphUnownList) == char),
        })),
    ],
    3000, 32);

dungeonList['Union Cave'] = new Dungeon('Union Cave',
    [
        {pokemon: 'Burpmon', options: { weight: 1.5 }},
        {pokemon: 'Burpmon', options: { weight: 1.5 }},
        {pokemon: 'Burpmon', options: { weight: 1.5 }},
        {pokemon: 'Burpmon', options: { weight: 1.5 }},
        {pokemon: 'Burpmon', options: { weight: 1.5 }},
        {pokemon: 'Burpmon', options: { weight: 1.5 }},
        {pokemon: 'Burpmon', options: { weight: 1.5 }},
        {pokemon: 'Burpmon', options: { weight: 1.5 }},
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Burpmon', 2000, 4),
                new GymPokemon('Burpmon', 3000, 6),
                new GymPokemon('Burpmon', 4000, 8),
            ], { weight: 1 }, 'Russell'),
        new DungeonTrainer('Firebreather',
            [
                new GymPokemon('Burpmon', 3000, 6),
                new GymPokemon('Burpmon', 3000, 6),
            ], { weight: 1 }, 'Bill'),
        new DungeonTrainer('PokéManiac',
            [new GymPokemon('Burpmon', 3000, 10)],
            { weight: 1 }, 'Larry'),
    ],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'xClick', weight: 4},
        {loot: 'Burpmon', weight: 3.5},
        {loot: 'Greatball', weight: 3},
        {loot: 'SmallRestore', weight: 1.75},
        {loot: 'Revive', weight: 1.75},
        {loot: 'LargeRestore', weight: 1},
        {loot: 'Ultraball', weight: 0},
    ],
    63600,
    [
        new DungeonTrainer('Hiker',
            [new GymPokemon('Burpmon', 300000, 11)],
            { weight: 1 }, 'Daniel'),
        new DungeonTrainer('Firebreather',
            [new GymPokemon('Burpmon', 300000, 9)],
            { weight: 1 }, 'Ray'),
    ],
    3000, 32);

dungeonList['Burpmon Well'] = new Dungeon('Burpmon Well',
    [
        {pokemon: 'Burpmon', options: { weight: 6 }},
        {pokemon: 'Burpmon', options: { weight: 6 }},
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Burpmon', 3500, 9),
                new GymPokemon('Burpmon', 3500, 9),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Burpmon', 3500, 9),
                new GymPokemon('Burpmon', 3500, 11),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Burpmon', 3500, 7),
                new GymPokemon('Burpmon', 3500, 9),
                new GymPokemon('Burpmon', 3500, 9),
            ], { weight: 1 }, undefined, '(male)'),
    ],
    [
        {loot: 'Intel_floppy', weight: 4},
        {loot: 'Item_magnet', weight: 3.75},
        {loot: 'Greatball', weight: 2},
        {loot: 'Deep Plate', weight: 2},
        {loot: 'Kings_rock', weight: 1, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Burpmon Well'))},
        {loot: 'Water_egg', weight: 0.5},
        {loot: 'MediumRestore', weight: 0.5},
    ],
    67900,
    [
        new DungeonTrainer('Rocket Executive',
            [new GymPokemon('Burpmon', 320000, 14)],
            { weight: 1 }, 'Proton', '(proton)'),
    ],
    3500, 33);

dungeonList['Ilex Forest'] = new Dungeon('Ilex Forest',
    [
        {pokemon: 'Burpmon', options: { weight: 0.5 }},
        {pokemon: 'Burpmon', options: { weight: 0.5 }},
        {pokemon: 'Burpmon', options: { weight: 0.5 }},
        {pokemon: 'Burpmon', options: { weight: 0.5 }},
        {pokemon: 'Burpmon', options: { weight: 0.5 }},
        {pokemon: 'Burpmon', options: { weight: 0.5 }},
        {pokemon: 'Burpmon', options: { weight: 0.5 }},
        {pokemon: 'Burpmon', options: { weight: 0.5 }},
        new DungeonTrainer('Bug Catcher',
            [
                new GymPokemon('Burpmon', 4000, 8),
                new GymPokemon('Burpmon', 4000, 10),
            ], { weight: 1 }, 'Wayne'),
    ],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Lucky_pill', weight: 3.75},
        {loot: 'Code Plate', weight: 2},
        {loot: 'Revive', weight: 1.75},
        {loot: 'MediumRestore', weight: 1},
        {loot: 'Empire Plate', weight: 0},
    ],
    82200,
    [
        new DungeonBossPokemon('Burpmon', 340000, 30),
        new DungeonBossPokemon('Burpmon', 340000, 30),
        new DungeonBossPokemon('Burpmon', 340000, 30),
        new DungeonBossPokemon('Burpmon', 800000, 50, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion)}),
    ],
    4000, 34);

dungeonList['Burned Tower'] = new Dungeon('Burned Tower',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [
        {loot: 'Item_magnet', weight: 4},
        {loot: 'xAttack', weight: 3.75},
        {loot: 'Roar Plate', weight: 2},
        {loot: 'Ultraball', weight: 1.75},
        {loot: 'Revive', weight: 1.25},
        {loot: 'Electric_egg', weight: 0},
        {loot: 'Water_egg', weight: 0},
        {loot: 'Fire_egg', weight: 0},
    ],
    88500,
    [new DungeonBossPokemon('Burpmon', 360000, 35), new DungeonBossPokemon('Burpmon', 320000, 35), new DungeonBossPokemon('Burpmon', 610000, 50)],
    4500, 37);

dungeonList['Tin Tower'] = new Dungeon('Tin Tower',
    ['Burpmon', 'Burpmon'],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'Intel_floppy', weight: 4},
        {loot: 'Ultraball', weight: 2},
        {loot: 'Nightmare Plate', weight: 2},
        {loot: 'Roar Plate', weight: 2},
        {loot: 'Guardian Plate', weight: 2},
        {loot: 'MediumRestore', weight: 1.75},
        {loot: 'Fire_egg', weight: 1},
        {loot: 'Max Revive', weight: 0},
    ],
    88500,
    [
        new DungeonBossPokemon('Burpmon', 380000, 35),
        new DungeonBossPokemon('Burpmon', 380000, 35),
        new DungeonBossPokemon('Burpmon', 1410000, 100, {requirement: new MultiRequirement([
            new ObtainedPokemonRequirement(pokemonMap.Burpmon),
            new ObtainedPokemonRequirement(pokemonMap.Burpmon),
            new ObtainedPokemonRequirement(pokemonMap.Burpmon),
        ])}),
    ],
    4500, 37);

dungeonList['Whirl Islands'] = new Dungeon('Whirl Islands',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [
        {loot: 'Lucky_floppy', weight: 4},
        {loot: 'Intel_floppy', weight: 4},
        {loot: 'Ultraball', weight: 2},
        {loot: 'Trojan Plate', weight: 2},
        {loot: 'Guardian Plate', weight: 2},
        {loot: 'Revive', weight: 1.75},
        {loot: 'Water_egg', weight: 1},
        {loot: 'Max Revive', weight: 0},
    ],
    92800,
    [new DungeonBossPokemon('Burpmon', 400000, 40), new DungeonBossPokemon('Burpmon', 400000, 40), new DungeonBossPokemon('Burpmon', 1410000, 100)],
    5000, 41);

dungeonList['Mt Mortar'] = new Dungeon('Mt Mortar',
    [
        {pokemon: 'Burpmon', options: { weight: 0.5 }},
        {pokemon: 'Burpmon', options: { weight: 0.5 }},
        {pokemon: 'Burpmon', options: { weight: 0.5 }},
        {pokemon: 'Burpmon', options: { weight: 0.5 }},
        {pokemon: 'Burpmon', options: { weight: 0.5 }},
        {pokemon: 'Burpmon', options: { weight: 0.5 }},
        {pokemon: 'Burpmon', options: { weight: 0.5 }},
        new DungeonTrainer('PokéManiac',
            [
                new GymPokemon('Burpmon', 5500, 17),
                new GymPokemon('Burpmon', 5500, 17),
            ], { weight: 1 }, 'Miller'),
        new DungeonTrainer('Super Nerd',
            [new GymPokemon('Burpmon', 5500, 19)],
            { weight: 1 }, 'Markus'),
        new DungeonTrainer('Super Nerd',
            [new GymPokemon('Burpmon', 5500, 39)],
            { weight: 1 }, 'Hugh'),
    ],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Burpmon', weight: 3.25},
        {loot: 'Simple Plate', weight: 2},
        {loot: 'Nature Plate', weight: 2},
        {loot: 'Nature Plate', weight: 2},
        {loot: 'Nightmare Plate', weight: 2},
        {loot: 'Ultraball', weight: 1.75},
        {loot: 'LargeRestore', weight: 1.75},
        {loot: 'Revive', weight: 1.75},
        {loot: 'Earth_egg', weight: 1},
        {loot: 'Dragon_scale', weight: 0.75, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Mt Mortar'))},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Protector', weight: 0, requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Mt Mortar'))},
    ],
    104100,
    [
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Burpmon', 210000, 34),
                new GymPokemon('Burpmon', 210000, 34),
            ], { weight: 1 }, 'Kiyo'),
        new DungeonBossPokemon('Burpmon', 420000, 45, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mt Mortar'))}),
    ],
    5500, 42);

dungeonList['Team Rockets Hideout'] = new Dungeon('Team Rockets Hideout',
    [
        {pokemon: 'Burpmon', options: { weight: 0.5 }},
        {pokemon: 'Burpmon', options: { weight: 0.5 }},
        {pokemon: 'Burpmon', options: { weight: 0.5 }},
        {pokemon: 'Burpmon', options: { weight: 0.5 }},
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Burpmon', 5500, 16),
                new GymPokemon('Burpmon', 5500, 16),
                new GymPokemon('Burpmon', 5500, 16),
                new GymPokemon('Burpmon', 5500, 16),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Burpmon', 5500, 20),
                new GymPokemon('Burpmon', 5500, 20),
                new GymPokemon('Burpmon', 5500, 20),
            ], { weight: 1 }, 'Jed', '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Burpmon', 5500, 17),
                new GymPokemon('Burpmon', 5500, 19),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Burpmon', 5500, 16),
                new GymPokemon('Burpmon', 5500, 17),
                new GymPokemon('Burpmon', 5500, 18),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Burpmon', 5500, 18),
                new GymPokemon('Burpmon', 5500, 18),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [new GymPokemon('Burpmon', 5500, 18)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Burpmon', 5500, 17),
                new GymPokemon('Burpmon', 5500, 17),
                new GymPokemon('Burpmon', 5500, 17),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Burpmon', 5500, 18),
                new GymPokemon('Burpmon', 5500, 18),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Rocket Grunt',
            [new GymPokemon('Burpmon', 5500, 19)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Burpmon', 5500, 22),
                new GymPokemon('Burpmon', 5500, 22),
            ], { weight: 1 }, 'Ross', '(male)'),
        new DungeonTrainer('Scientist',
            [new GymPokemon('Burpmon', 5500, 24)],
            { weight: 1 }, 'Mitch', '(male)'),
    ],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Intel_floppy', weight: 4},
        {loot: 'Burpmon', weight: 3.5},
        {loot: 'Release Plate', weight: 2},
        {loot: 'Deep Plate', weight: 2},
        {loot: 'Ultraball', weight: 1.75},
        {loot: 'Revive', weight: 1.75},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(400, GameConstants.getDungeonIndex('Team Rockets Hideout'))},
    ],
    104100,
    [
        new DungeonTrainer('Rocket Executive',
            [
                new GymPokemon('Burpmon', 140000, 22),
                new GymPokemon('Burpmon', 140000, 22),
                new GymPokemon('Burpmon', 140000, 24),
            ], { weight: 1 }, 'Petrel', '(petrel)'),
        new DungeonTrainer('Rocket Executive',
            [
                new GymPokemon('Burpmon', 140000, 23),
                new GymPokemon('Burpmon', 140000, 23),
                new GymPokemon('Burpmon', 140000, 25),
            ], { weight: 1 }, 'Ariana', '(ariana)'),
    ],
    5500, 43);

dungeonList['Radio Tower'] = new Dungeon('Radio Tower',
    [
        new DungeonTrainer('Team Rocket Grunt',
            [new GymPokemon('Burpmon', 5750, 27)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Burpmon', 5750, 23),
                new GymPokemon('Burpmon', 5750, 23),
                new GymPokemon('Burpmon', 5750, 25),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Burpmon', 5750, 24),
                new GymPokemon('Burpmon', 5750, 24),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Burglar',
            [
                new GymPokemon('Burpmon', 5500, 26),
                new GymPokemon('Burpmon', 5500, 24),
            ], { weight: 1 }, 'Eddie'),
        new DungeonTrainer('Burglar',
            [
                new GymPokemon('Burpmon', 5500, 23),
                new GymPokemon('Burpmon', 5500, 25),
                new GymPokemon('Burpmon', 5500, 23),
            ], { weight: 1 }, 'Duncan'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Burpmon', 5750, 25),
                new GymPokemon('Burpmon', 5750, 25),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Burpmon', 5750, 24),
                new GymPokemon('Burpmon', 5750, 24),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Burpmon', 5750, 26),
                new GymPokemon('Burpmon', 5750, 23),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Burpmon', 5750, 25),
                new GymPokemon('Burpmon', 5750, 25),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Burpmon', 5750, 24),
                new GymPokemon('Burpmon', 5750, 24),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [new GymPokemon('Burpmon', 5750, 26)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Burpmon', 5750, 21),
                new GymPokemon('Burpmon', 5750, 21),
                new GymPokemon('Burpmon', 5750, 21),
                new GymPokemon('Burpmon', 5750, 21),
                new GymPokemon('Burpmon', 5750, 21),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Burpmon', 5750, 23),
                new GymPokemon('Burpmon', 5750, 23),
                new GymPokemon('Burpmon', 5750, 25),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Burpmon', 5750, 26),
                new GymPokemon('Burpmon', 5750, 26),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Burpmon', 5750, 23),
                new GymPokemon('Burpmon', 5750, 23),
                new GymPokemon('Burpmon', 5750, 23),
                new GymPokemon('Burpmon', 5750, 23),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Burpmon', 5500, 27),
                new GymPokemon('Burpmon', 5500, 27),
                new GymPokemon('Burpmon', 5500, 27),
            ], { weight: 1 }, 'Marc', '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [new GymPokemon('Burpmon', 5750, 26)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Burpmon', 5750, 24),
                new GymPokemon('Burpmon', 5750, 26),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Burpmon', 5750, 22),
                new GymPokemon('Burpmon', 5750, 24),
                new GymPokemon('Burpmon', 5750, 22),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Scientist',
            [new GymPokemon('Burpmon', 5750, 30)],
            { weight: 1 }, 'Rich', '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Burpmon', 5750, 21),
                new GymPokemon('Burpmon', 5750, 23),
                new GymPokemon('Burpmon', 5750, 21),
                new GymPokemon('Burpmon', 5750, 24),
            ], { weight: 1 }, undefined, '(female)'),
    ],
    [
        {loot: 'xClick', weight: 3.75},
        {loot: 'Lucky_pill', weight: 3.75},
        {loot: 'Games', weight: 2},
        {loot: 'Security', weight: 2},
        {loot: 'Step', weight: 2},
        {loot: 'eBook', weight: 2},
        {loot: 'Health', weight: 2},
        {loot: 'Light', weight: 2},
        {loot: 'Music', weight: 2},
        {loot: 'Backup', weight: 2},
        {loot: 'Sleep', weight: 2},
        {loot: 'Calendar', weight: 2},
        {loot: 'Weather', weight: 2},
        {loot: 'Ultraball', weight: 1.75},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Hacking', weight: 0, requirement: new ClearDungeonRequirement(250, GameConstants.getDungeonIndex('Radio Tower'))},
    ],
    112000,
    [
        new DungeonTrainer('Rocket Executive',
            [
                new GymPokemon('Burpmon', 143000, 33),
                new GymPokemon('Burpmon', 143000, 32),
                new GymPokemon('Burpmon', 144000, 35),
            ], { weight: 1 }, 'Archer', '(archer)'),
        new DungeonTrainer('Rocket Executive',
            [new GymPokemon('Burpmon', 430000, 36)],
            { weight: 1 }, 'Proton', '(proton)'),
        new DungeonTrainer('Rocket Executive',
            [
                new GymPokemon('Burpmon', 71000, 30),
                new GymPokemon('Burpmon', 71000, 30),
                new GymPokemon('Burpmon', 71000, 30),
                new GymPokemon('Burpmon', 71000, 30),
                new GymPokemon('Burpmon', 72000, 32),
                new GymPokemon('Burpmon', 71000, 30),
            ], { weight: 1 }, 'Petrel', '(petrel)'),
        new DungeonTrainer('Rocket Executive',
            [
                new GymPokemon('Burpmon', 143000, 32),
                new GymPokemon('Burpmon', 143000, 32),
                new GymPokemon('Burpmon', 144000, 32),
            ], { weight: 1 }, 'Ariana', '(ariana)'),
    ],
    5750, 43);

dungeonList['Ice Path'] = new Dungeon('Ice Path',
    ['Burpmon', 'Burpmon', 'Burpmon'],
    [
        {loot: 'xClick', weight: 3.5},
        {loot: 'Lucky_pill', weight: 3.5},
        {loot: 'Intel_floppy', weight: 3.5},
        {loot: 'Guardian Plate', weight: 2},
        {loot: 'Revive', weight: 1},
        {loot: 'Wind_egg', weight: 0.5},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(450, GameConstants.getDungeonIndex('Ice Path'))},
    ],
    120400,
    [new DungeonBossPokemon('Burpmon', 440000, 50)],
    6000, 44);

dungeonList['Dark Cave'] = new Dungeon('Dark Cave',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [
        {loot: 'Pokeball', weight: 4},
        {loot: 'Item_magnet', weight: 4},
        {loot: 'Release Plate', weight: 2},
        {loot: 'SmallRestore', weight: 1.5},
        {loot: 'Revive', weight: 1},
        {loot: 'Star Piece', weight: 1},
        {loot: 'LargeRestore', weight: 0.5},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Heart Scale', weight: 0},
    ],
    127000,
    [new DungeonBossPokemon('Burpmon', 460000, 55)],
    6500, 45);

dungeonList['Victory Road Johto'] = new Dungeon('Victory Road Johto',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [
        {loot: 'Item_magnet', weight: 4},
        {loot: 'Burpmon', weight: 3.25},
        {loot: 'Nature Plate', weight: 2},
        {loot: 'Ultraball', weight: 1.75},
        {loot: 'SmallRestore', weight: 1.5},
        {loot: 'LargeRestore', weight: 1},
        {loot: 'Dragon_scale', weight: 0},
        {loot: 'Max Revive', weight: 0},
    ],
    128500,
    [
        new DungeonBossPokemon('Burpmon', 500000, 55),
        new DungeonBossPokemon('Burpmon', 500000, 55),
    ],
    7000, 46);

dungeonList['Mt Silver'] = new Dungeon('Mt Silver',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [
        {loot: 'Intel_floppy', weight: 3.75},
        {loot: 'Lucky_pill', weight: 3.75},
        {loot: 'Cure Plate', weight: 2},
        {loot: 'Empire Plate', weight: 2},
        {loot: 'Ultraball', weight: 1.75},
        {loot: 'LargeRestore', weight: 1.75},
        {loot: 'Revive', weight: 1.5},
        {loot: 'Star Piece', weight: 1},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Heart Scale', weight: 0},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(450, GameConstants.getDungeonIndex('Mt Silver'))},
        {loot: 'Dawn_stone', weight: 0, requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Mt Silver'))},
    ],
    130500,
    [new DungeonBossPokemon('Burpmon', 840000, 60)],
    10000, 28);

// Hoenn Dungeons

dungeonList['Petalburg Woods'] = new Dungeon('Petalburg Woods',
    [
        {pokemon: 'Burpmon', options: { weight: 1.33 }},
        {pokemon: 'Burpmon', options: { weight: 1.33 }},
        {pokemon: 'Burpmon', options: { weight: 1.33 }},
        {pokemon: 'Burpmon', options: { weight: 1.33 }},
        {pokemon: 'Burpmon', options: { weight: 1.33 }},
        {pokemon: 'Burpmon', options: { weight: 1.33 }},
        new DungeonTrainer('Bug Catcher',
            [
                new GymPokemon('Burpmon', 12000, 3),
                new GymPokemon('Burpmon', 12000, 3),
                new GymPokemon('Burpmon', 12000, 3),
                new GymPokemon('Burpmon', 12000, 3),
            ], { weight: 1 }, 'Lyle'),
        new DungeonTrainer('Bug Catcher',
            [
                new GymPokemon('Burpmon', 12000, 6),
                new GymPokemon('Burpmon', 12000, 6),
            ], { weight: 1 }, 'James'),
    ],
    [
        {loot: 'Pokeball', weight: 3.75},
        {loot: 'Intel_floppy', weight: 3.75},
        {loot: 'Greatball', weight: 3},
        {loot: 'Jungle Plate', weight: 2},
        {loot: 'Code Plate', weight: 2},
        {loot: 'Simple Plate', weight: 2},
        {loot: 'SmallRestore', weight: 1.75},
        {loot: 'Plant_egg', weight: 1},
    ],
    380000,
    [
        new DungeonBossPokemon('Burpmon', 860000, 10, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Petalburg Woods'))}),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Burpmon', 860000, 9)],
            { weight: 1 }, undefined, '(male)'),
    ],
    12000, 101);

dungeonList['Rusturf Tunnel'] = new Dungeon('Rusturf Tunnel',
    [
        {pokemon: 'Burpmon', options: { weight: 4 }},
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Burpmon', 14000, 16),
                new GymPokemon('Burpmon', 14000, 16),
                new GymPokemon('Burpmon', 14000, 16),
            ], { weight: 1 }, 'Mike'),
    ],
    [
        {loot: 'xClick', weight: 3.75},
        {loot: 'Pokeball', weight: 3.75},
        {loot: 'Lucky_pill', weight: 3.75},
        {loot: 'Nature Plate', weight: 2},
        {loot: 'Simple Plate', weight: 2},
        {loot: 'Nature Plate', weight: 2},
        {loot: 'Revive', weight: 1},
        {loot: 'Star Piece', weight: 0.5},
        {loot: 'Hard Stone', weight: 0.5},
        {loot: 'Heart Scale', weight: 0},
    ],
    400000,
    [
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Burpmon', 900000, 11)],
            { weight: 1 }, undefined, '(male)'),
    ],
    14000, 101);

dungeonList['Granite Cave'] = new Dungeon('Granite Cave',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [
        {loot: 'Pokeball', weight: 3.75},
        {loot: 'xAttack', weight: 3.75},
        {loot: 'Lucky_pill', weight: 3.75},
        {loot: 'Simple Plate', weight: 2},
        {loot: 'Nature Plate', weight: 2},
        {loot: 'Everstone', weight: 1.75},
        {loot: 'Revive', weight: 1.75},
        {loot: 'MediumRestore', weight: 1},
        {loot: 'Star Piece', weight: 1},
        {loot: 'Hard Stone', weight: 1},
        {loot: 'Heart Scale', weight: 0},
    ],
    410000,
    [new DungeonBossPokemon('Burpmon', 960000, 20), new DungeonBossPokemon('Burpmon', 660000, 20)],
    16000, 101);

dungeonList['Fiery Path'] = new Dungeon('Fiery Path',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [
        {loot: 'xAttack', weight: 3.75},
        {loot: 'Item_magnet', weight: 3.75},
        {loot: 'Roar Plate', weight: 2},
        {loot: 'Nightmare Plate', weight: 2},
        {loot: 'Wind_egg', weight: 1.5},
        {loot: 'Fire_egg', weight: 1.5},
        {loot: 'Fire_stone', weight: 1},
    ],
    424000,
    [new DungeonBossPokemon('Burpmon', 1200000, 20)],
    17000, 101);

dungeonList['Meteor Falls'] = new Dungeon('Meteor Falls',
    [
        {pokemon: 'Burpmon', options: { weight: 0.8 }},
        {pokemon: 'Burpmon', options: { weight: 0.8 }},
        {pokemon: 'Burpmon', options: { weight: 0.8 }},
        {pokemon: 'Burpmon', options: { weight: 0.8 }},
        {pokemon: 'Burpmon', options: { weight: 0.8 }},
        new DungeonTrainer('Old Couple',
            [
                new GymPokemon('Burpmon', 18000, 39),
                new GymPokemon('Burpmon', 18000, 39),
            ], { weight: 1 }, 'John and Jay'),
    ],
    [
        {loot: 'Lucky_floppy', weight: 4},
        {loot: 'Pokeball', weight: 3.5},
        {loot: 'Greatball', weight: 3},
        {loot: 'Nature Plate', weight: 2},
        {loot: 'Simple Plate', weight: 2},
        {loot: 'Guardian Plate', weight: 2},
        {loot: 'Nightmare Plate', weight: 2},
        {loot: 'Mystery_egg', weight: 1.5},
        {loot: 'Star Piece', weight: 1},
        {loot: 'Moon_stone', weight: 0},
    ],
    443000,
    [
        new DungeonBossPokemon('Burpmon', 1240000, 20),
        new DungeonBossPokemon('Burpmon', 1240000, 20),
        new DungeonTrainer('Dragon Tamer',
            [
                new GymPokemon('Burpmon', 640000, 37),
                new GymPokemon('Burpmon', 640000, 37),
            ], { weight: 1 }, 'Nicolas'),
    ],
    18000, 101);

dungeonList['Mt. Chimney Crater'] = new Dungeon('Mt. Chimney Crater',
    [
        new DungeonTrainer('Team Magma Grunt',
            [new GymPokemon('Burpmon', 20000, 20)],
            { weight: 2 }, undefined, '(female)'),
        new DungeonTrainer('Team Magma Grunt',
            [new GymPokemon('Burpmon', 20000, 20)],
            { weight: 2 }, undefined, '(male)'),
        new DungeonTrainer('Magma Admin',
            [
                new GymPokemon('Burpmon', 18000, 18),
                new GymPokemon('Burpmon', 20000, 20),
                new GymPokemon('Burpmon', 22000, 22),
                new GymPokemon('Burpmon', 22000, 22),
            ], { weight: 1 }, 'Tabitha'),
    ],
    [
        {loot: 'xAttack', weight: 3.75},
        {loot: 'Intel_floppy', weight: 3.5},
        {loot: 'Roar Plate', weight: 2},
        {loot: 'Fire_egg', weight: 1.5},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(400, GameConstants.getDungeonIndex('Mt. Chimney Crater'))},
    ],
    460000,
    [
        new DungeonTrainer('Magma Leader',
            [
                new GymPokemon('Burpmon', 450000, 24),
                new GymPokemon('Burpmon', 450000, 24),
                new GymPokemon('Burpmon', 470000, 25),
            ], { weight: 1 }, 'Maxie'),
    ],
    20000, 101);

dungeonList['Jagged Pass'] = new Dungeon('Jagged Pass',
    [
        {pokemon: 'Burpmon', options: { weight: 0.8 }},
        {pokemon: 'Burpmon', options: { weight: 0.8 }},
        {pokemon: 'Burpmon', options: { weight: 0.8 }},
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Burpmon', 22000, 20),
                new GymPokemon('Burpmon', 22000, 20),
            ], { weight: 1 }, 'Eric'),
        new DungeonTrainer('Picnicker',
            [
                new GymPokemon('Burpmon', 22000, 19),
                new GymPokemon('Burpmon', 22000, 19),
                new GymPokemon('Burpmon', 22000, 19),
            ], { weight: 1 }, 'Diana'),
        new DungeonTrainer('Picnicker',
            [new GymPokemon('Burpmon', 22000, 21)],
            { weight: 1 }, 'Autumn'),
        new DungeonTrainer('Triathlete',
            [new GymPokemon('Burpmon', 22000, 21)],
            { weight: 1 }, 'Julio', '(malecycling)'),
        new DungeonTrainer('Camper',
            [
                new GymPokemon('Burpmon', 22000, 20),
                new GymPokemon('Burpmon', 22000, 20),
            ], { weight: 1 }, 'Ethan'),
    ],
    [
        {loot: 'xClick', weight: 3.5},
        {loot: 'Lucky_pill', weight: 3.5},
        {loot: 'Greatball', weight: 2.5},
        {loot: 'Release Plate', weight: 2},
        {loot: 'Nature Plate', weight: 2},
        {loot: 'Moon_stone', weight: 1},
    ],
    460000,
    [
        new DungeonTrainer('Team Magma Grunt',
            [
                new GymPokemon('Burpmon', 700000, 22),
                new GymPokemon('Burpmon', 700000, 22),
            ], { weight: 1 }, undefined, '(male)'),
    ],
    22000, 101);

dungeonList['New Mauville'] = new Dungeon('New Mauville',
    ['Burpmon', 'Burpmon'],
    [
        {loot: 'Lucky_floppy', weight: 4},
        {loot: 'Games', weight: 3.75},
        {loot: 'Burpmon', weight: 3.25},
        {loot: 'Security', weight: 3},
        {loot: 'Ultraball', weight: 3},
        {loot: 'Empire Plate', weight: 2.5},
        {loot: 'Thunder_stone', weight: 2},
        {loot: 'Metal_coat', weight: 2},
        {loot: 'Electric_egg', weight: 1.5},
    ],
    460000,
    [
        new DungeonBossPokemon('Burpmon', 1650000, 20),
        new DungeonBossPokemon('Burpmon', 1650000, 20),
    ],
    24000, 101);

dungeonList['Weather Institute'] = new Dungeon('Weather Institute',
    [
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Burpmon', 39000, 28)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Aqua Grunt',
            [
                new GymPokemon('Burpmon', 39000, 27),
                new GymPokemon('Burpmon', 39000, 27),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [
                new GymPokemon('Burpmon', 39000, 27),
                new GymPokemon('Burpmon', 39000, 27),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [
                new GymPokemon('Burpmon', 39000, 27),
                new GymPokemon('Burpmon', 39000, 27),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Aqua Grunt',
            [
                new GymPokemon('Burpmon', 39000, 26),
                new GymPokemon('Burpmon', 39000, 26),
                new GymPokemon('Burpmon', 39000, 26),
            ], { weight: 1 }, undefined, '(male)'),
    ],
    [
        {loot: 'xAttack', weight: 3.75},
        {loot: 'Lucky_pill', weight: 3.5},
        {loot: 'Rage Digizoid', weight: 2.25},
        {loot: 'Rush Digizoid', weight: 2.25},
        {loot: 'Vigor Digizoid', weight: 2.25},
        {loot: 'Guard Digizoid', weight: 2.25},
        {loot: 'Deep Plate', weight: 2},
        {loot: 'Sun Stone', weight: 1},
    ],
    470000,
    [
        new DungeonTrainer('Aqua Admin',
            [
                new GymPokemon('Burpmon', 910000, 28),
                new GymPokemon('Burpmon', 910000, 28),
            ], { weight: 1 }, 'Shelly', '(shelly)'),
        new DungeonBossPokemon('Burpmon', 1820000, 20, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Weather Institute'))}),
    ],
    26000, 101);
//TODO
dungeonList['Mt. Pyre'] = new Dungeon('Mt. Pyre',
    [
        {pokemon: 'Burpmon', options: { weight: 12 }},
        {pokemon: 'Burpmon', options: { weight: 12 }},
        {pokemon: 'Burpmon', options: { weight: 12 }},
        {pokemon: 'Burpmon', options: { weight: 12 }},
        {pokemon: 'Burpmon', options: { weight: 12 }},
        new DungeonTrainer('PokéManiac',
            [new GymPokemon('Burpmon', 28000, 31)],
            { weight: 1 }, 'Mark'),
        new DungeonTrainer('Hex Maniac',
            [new GymPokemon('Burpmon', 28000, 31)],
            { weight: 1 }, 'Leah', '(hoenn)'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Burpmon', 28000, 31)],
            { weight: 1 }, 'Zander'),
        new DungeonTrainer('Young Couple',
            [
                new GymPokemon('Burpmon', 28000, 31),
                new GymPokemon('Burpmon', 28000, 31),
            ],
            { weight: 1 }, 'Dez & Luke'),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Burpmon', 28000, 26),
                new GymPokemon('Burpmon', 28000, 26),
                new GymPokemon('Burpmon', 28000, 26),
            ],
            { weight: 1 }, 'Kayla', '(female)'),
        new DungeonTrainer('Pokémon Breeder',
            [
                new GymPokemon('Burpmon', 15000, 26),
                new GymPokemon('Burpmon', 15000, 26),
                new GymPokemon('Burpmon', 15000, 26),
                new GymPokemon('Burpmon', 15000, 26),
                new GymPokemon('Burpmon', 15000, 26),
                new GymPokemon('Burpmon', 15000, 26),
            ],
            { weight: 1 }, 'Gabrielle', '(female)'),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Burpmon', 28000, 26),
                new GymPokemon('Burpmon', 28000, 26),
                new GymPokemon('Burpmon', 28000, 26),
            ],
            { weight: 1 }, 'William', '(male)'),
        new DungeonTrainer('Hex Maniac',
            [new GymPokemon('Burpmon', 28000, 32)],
            { weight: 1 }, 'Tasha', '(hoenn)'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Burpmon', 28000, 32)],
            { weight: 1 }, 'Atsushi'),
        new DungeonTrainer('Hex Maniac',
            [new GymPokemon('Burpmon', 28000, 32)],
            { weight: 1 }, 'Valerie', '(hoenn)'),
        new DungeonTrainer('Psychic',
            [new GymPokemon('Burpmon', 28000, 32)],
            { weight: 1 }, 'Cedric', '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Burpmon', 28000, 32)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Burpmon', 28000, 32)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [
                new GymPokemon('Burpmon', 28000, 30),
                new GymPokemon('Burpmon', 28000, 30),
            ],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [
                new GymPokemon('Burpmon', 28000, 30),
                new GymPokemon('Burpmon', 28000, 30),
            ],
            { weight: 1 }, undefined, '(female)'),
    ],
    [
        {loot: 'xAttack', weight: 3.75},
        {loot: 'Lucky_floppy', weight: 3.75},
        {loot: 'Ultraball', weight: 2.5},
        {loot: 'Nightmare Plate', weight: 2},
        {loot: 'Cure Plate', weight: 2},
        {loot: 'Trojan Plate', weight: 2},
        {loot: 'Dusk_stone', weight: 0.5, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Mt. Pyre'))},
        {loot: 'Shiny_stone', weight: 0.5, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Mt. Pyre'))},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(400, GameConstants.getDungeonIndex('Mt. Pyre'))},
    ],
    480000,
    [
        new DungeonBossPokemon('Burpmon', 1880000, 20),
        new DungeonBossPokemon('Burpmon', 1890000, 20),
        new DungeonBossPokemon('Burpmon', 1880000, 20),
    ],
    28000, 101);

dungeonList['Magma Hideout'] = new Dungeon('Magma Hideout',
    [
        {pokemon: 'Burpmon', options: { weight: 12 }},
        {pokemon: 'Burpmon', options: { weight: 12 }},
        {pokemon: 'Burpmon', options: { weight: 12 }},
        new DungeonTrainer('Team Magma Grunt',
            [new GymPokemon('Burpmon', 29000, 29)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Magma Grunt',
            [new GymPokemon('Burpmon', 29000, 29)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Magma Grunt',
            [new GymPokemon('Burpmon', 29000, 29)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Magma Grunt',
            [
                new GymPokemon('Burpmon', 29000, 28),
                new GymPokemon('Burpmon', 29000, 28),
            ],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Magma Grunt',
            [new GymPokemon('Burpmon', 29000, 29)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Magma Grunt',
            [new GymPokemon('Burpmon', 29000, 29)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Magma Grunt',
            [new GymPokemon('Burpmon', 29000, 29)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Magma Grunt',
            [new GymPokemon('Burpmon', 29000, 29)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Magma Grunt',
            [new GymPokemon('Burpmon', 29000, 29)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Magma Admin',
            [
                new GymPokemon('Burpmon', 6000, 26),
                new GymPokemon('Burpmon', 8000, 28),
                new GymPokemon('Burpmon', 10000, 30),
                new GymPokemon('Burpmon', 13000, 33),
            ],
            { weight: 1 }, 'Tabitha'),
    ],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Music', weight: 3.5},
        {loot: 'Light', weight: 3},
        {loot: 'Fire_egg', weight: 0.5},
    ],
    490000,
    [
        new DungeonTrainer('Magma Leader',
            [
                new GymPokemon('Burpmon', 630000, 37),
                new GymPokemon('Burpmon', 640000, 38),
                new GymPokemon('Burpmon', 650000, 39),
            ],
            { weight: 1 }, 'Maxie'),
    ],
    29000, 101);

dungeonList['Aqua Hideout'] = new Dungeon('Aqua Hideout',
    [
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Burpmon', 30000, 32)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Burpmon', 30000, 32)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Aqua Grunt',
            [
                new GymPokemon('Burpmon', 30000, 31),
                new GymPokemon('Burpmon', 30000, 31),
            ],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [
                new GymPokemon('Burpmon', 30000, 31),
                new GymPokemon('Burpmon', 30000, 31),
            ],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Burpmon', 30000, 32)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Burpmon', 30000, 32)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Burpmon', 30000, 32)],
            { weight: 1 }, undefined, '(female)'),
    ],
    [
        {loot: 'Intel_floppy', weight: 3.75},
        {loot: 'Pokeball', weight: 3.5},
        {loot: 'Burpmon', weight: 3.25},
        {loot: 'Release Plate', weight: 2.5},
        {loot: 'Deep Plate', weight: 2.5},
        {loot: 'Duskball', weight: 2},
        {loot: 'Max Revive', weight: 0},
    ],
    490000,
    [
        new DungeonTrainer('Aqua Admin',
            [
                new GymPokemon('Burpmon', 900000, 34),
                new GymPokemon('Burpmon', 900000, 34),
            ],
            { weight: 1 }, 'Matt', '(matt)'),
    ],
    30000, 101);

dungeonList['Shoal Cave'] = new Dungeon('Shoal Cave',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'Lucky_floppy', weight: 3.75},
        {loot: 'Revive', weight: 2},
        {loot: 'Star Piece', weight: 2},
        {loot: 'Water_egg', weight: 2},
        {loot: 'Guardian Plate', weight: 2},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Heart Scale', weight: 0},
    ],
    490000,
    [new DungeonBossPokemon('Burpmon', 1900000, 20)],
    30000, 101);

dungeonList['Cave of Origin'] = new Dungeon('Cave of Origin',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [
        {loot: 'xAttack', weight: 3.75},
        {loot: 'Travel', weight: 3.25},
        {loot: 'Alarm', weight: 3.25},
        {loot: 'Revive', weight: 2},
        {loot: 'Mystery_egg', weight: 1},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(400, GameConstants.getDungeonIndex('Cave of Origin'))},
        {loot: 'Hacking', weight: 0, requirement: new ClearDungeonRequirement(150, GameConstants.getDungeonIndex('Cave of Origin'))},
        {loot: 'Monitoring', weight: 0, requirement: new ClearDungeonRequirement(1500, GameConstants.getDungeonIndex('Cave of Origin'))},
        {loot: 'MindControl', weight: 0, requirement: new ClearDungeonRequirement(1500, GameConstants.getDungeonIndex('Cave of Origin'))},
    ],
    590000,
    [
        new DungeonBossPokemon('Burpmon', 2000000, 50),
        new DungeonBossPokemon('Burpmon', 4700000, 100, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)}),
        new DungeonBossPokemon('Burpmon', 4700000, 100, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)}),
    ],
    34000, 101);

dungeonList['Seafloor Cavern'] = new Dungeon('Seafloor Cavern',
    [
        {pokemon: 'Burpmon', options: { weight: 4.8 }},
        {pokemon: 'Burpmon', options: { weight: 4.8 }},
        {pokemon: 'Burpmon', options: { weight: 4.8 }},
        {pokemon: 'Burpmon', options: { weight: 4.8 }},
        {pokemon: 'Burpmon', options: { weight: 4.8 }},
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Burpmon', 32000, 36)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Burpmon', 32000, 36)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Burpmon', 32000, 36)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Burpmon', 32000, 36)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Aqua Grunt',
            [
                new GymPokemon('Burpmon', 32000, 35),
                new GymPokemon('Burpmon', 32000, 35),
            ],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Aqua Admin',
            [
                new GymPokemon('Burpmon', 32000, 37),
                new GymPokemon('Burpmon', 32000, 37),
            ], { weight: 1 }, 'Shelly', '(shelly)'),
    ],
    [
        {loot: 'Item_magnet', weight: 4},
        {loot: 'Intel_floppy', weight: 4},
        {loot: 'Step', weight: 3},
        {loot: 'Wallpaper', weight: 2.5},
        {loot: 'Deep Plate', weight: 2},
        {loot: 'Nature Plate', weight: 2},
        {loot: 'Heart Scale', weight: 0},
    ],
    530000,
    [
        new DungeonTrainer('Aqua Leader',
            [
                new GymPokemon('Burpmon', 700000, 41),
                new GymPokemon('Burpmon', 700000, 41),
                new GymPokemon('Burpmon', 900000, 43),
            ],
            { weight: 1 }, 'Archie'),
    ],
    32000, 101);

dungeonList['Sky Pillar'] = new Dungeon('Sky Pillar',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Greatball', weight: 3.5},
        {loot: 'Ultraball', weight: 2.5},
        {loot: 'Nightmare Plate', weight: 2},
        {loot: 'Guardian Plate', weight: 2},
        {loot: 'Trojan Plate', weight: 2},
        {loot: 'Dragon_scale', weight: 2},
        {loot: 'Simulation', weight: 0, requirement: new ClearDungeonRequirement(1750, GameConstants.getDungeonIndex('Sky Pillar'))},
    ],
    720000,
    [
        new DungeonBossPokemon('Burpmon', 3200000, 20),
        new DungeonBossPokemon('Burpmon', 5824002, 100),
    ],
    34000, 101);

dungeonList['Sealed Chamber'] = new Dungeon('Sealed Chamber',
    ['Burpmon', 'Burpmon', 'Burpmon'],
    [
        {loot: 'xClick', weight: 3.5},
        {loot: 'Intel_floppy', weight: 3.5},
        {loot: 'Nature Plate', weight: 2},
        {loot: 'Guardian Plate', weight: 2},
        {loot: 'Simple Plate', weight: 2},
        {loot: 'Hard Stone', weight: 1},
        {loot: 'Tsuchi Fossil', weight: 0, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Sealed Chamber'))},
        {loot: 'Kori Fossil', weight: 0, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Sealed Chamber'))},
    ],
    500000,
    [
        new DungeonBossPokemon('Burpmon', 4500000, 20),
        new DungeonBossPokemon('Burpmon', 4500000, 20),
        new DungeonBossPokemon('Burpmon', 4500000, 20),
    ],
    36000, 101);

dungeonList['Victory Road Hoenn'] = new Dungeon('Victory Road Hoenn',
    [
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Burpmon', 37000, 43),
                new GymPokemon('Burpmon', 37000, 43),
            ], { weight: 1 }, 'Albert', '(male)'),
        new DungeonTrainer('Cooltrainer',
            [new GymPokemon('Burpmon', 37000, 45)],
            { weight: 1 }, 'Hope', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [new GymPokemon('Burpmon', 37000, 45)],
            { weight: 1 }, 'Shannon', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Burpmon', 37000, 42),
                new GymPokemon('Burpmon', 37000, 42),
                new GymPokemon('Burpmon', 37000, 42),
            ], { weight: 1 }, 'Samuel', '(male)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Burpmon', 37000, 42),
                new GymPokemon('Burpmon', 37000, 42),
                new GymPokemon('Burpmon', 37000, 42),
            ], { weight: 1 }, 'Julie', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Burpmon', 37000, 43),
                new GymPokemon('Burpmon', 37000, 43),
            ], { weight: 1 }, 'Dianne', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Burpmon', 37000, 43),
                new GymPokemon('Burpmon', 37000, 43),
            ], { weight: 1 }, 'Felix', '(male)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Burpmon', 37000, 43),
                new GymPokemon('Burpmon', 37000, 43),
            ], { weight: 1 }, 'Caroline', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Burpmon', 30000, 42),
                new GymPokemon('Burpmon', 30000, 42),
                new GymPokemon('Burpmon', 30000, 42),
                new GymPokemon('Burpmon', 30000, 42),
            ], { weight: 1 }, 'Vito', '(male)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Burpmon', 37000, 42),
                new GymPokemon('Burpmon', 37000, 42),
                new GymPokemon('Burpmon', 37000, 42),
            ], { weight: 1 }, 'Michelle', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Burpmon', 37000, 43),
                new GymPokemon('Burpmon', 37000, 43),
            ], { weight: 1 }, 'Mitchell', '(male)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Burpmon', 37000, 43),
                new GymPokemon('Burpmon', 37000, 43),
            ], { weight: 1 }, 'Halle', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Burpmon', 37000, 43),
                new GymPokemon('Burpmon', 37000, 43),
            ], { weight: 1 }, 'Edgar', '(male)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Burpmon', 37000, 43),
                new GymPokemon('Burpmon', 37000, 43),
            ], { weight: 1 }, 'Katelynn', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Burpmon', 37000, 43),
                new GymPokemon('Burpmon', 37000, 43),
            ], { weight: 1 }, 'Quincy', '(male)'),
    ],
    [
        {loot: 'xAttack', weight: 3.75},
        {loot: 'Lucky_pill', weight: 3.75},
        {loot: 'Ultraball', weight: 2.5},
        {loot: 'Trojan Plate', weight: 2},
        {loot: 'Roar Plate', weight: 2},
        {loot: 'Dawn_stone', weight: 0, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Victory Road Hoenn'))},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(400, GameConstants.getDungeonIndex('Victory Road Hoenn'))},
    ],
    560000,
    [
        new DungeonTrainer('PKMN Trainer',
            [
                new GymPokemon('Burpmon', 680000, 44),
                new GymPokemon('Burpmon', 670000, 43),
                new GymPokemon('Burpmon', 680000, 44),
                new GymPokemon('Burpmon', 650000, 41),
                new GymPokemon('Burpmon', 690000, 45),
            ], { weight: 1 }, 'Wally', '(wally)'),
    ],
    37000, 101);

// Sinnoh

dungeonList['Oreburgh Gate'] = new Dungeon('Oreburgh Gate',
    [
        {pokemon: 'Burpmon', options: { weight: 1.1 }},
        {pokemon: 'Burpmon', options: { weight: 1.1 }},
        {pokemon: 'Burpmon', options: { weight: 1.1 }},
        {pokemon: 'Burpmon', options: { weight: 1.1 }},
        {pokemon: 'Burpmon', options: { weight: 1.1 }},
        {pokemon: 'Burpmon', options: { weight: 1.1 }},
        {pokemon: 'Burpmon', options: { weight: 1.1 }},
        new DungeonTrainer('Camper',
            [
                new GymPokemon('Burpmon', 720600, 7),
                new GymPokemon('Burpmon', 720600, 7),
            ], { weight: 1 }, 'Curtis'),
        new DungeonTrainer('Picnicker',
            [new GymPokemon('Burpmon', 720600, 9)],
            { weight: 1 }, 'Diana'),
    ],
    [
        {loot: 'xAttack', weight: 3.75},
        {loot: 'Item_magnet', weight: 3.5},
        {loot: 'Nature Plate', weight: 2.5},
        {loot: 'Cure Plate', weight: 2.5},
        {loot: 'Exercise', weight: 1, requirement: new ClearDungeonRequirement(50, GameConstants.getDungeonIndex('Oreburgh Gate'))},
        {loot: 'Puzzle', weight: 0, requirement: new ClearDungeonRequirement(150, GameConstants.getDungeonIndex('Oreburgh Gate'))},
    ],
    720600,
    [
        new DungeonBossPokemon('Burpmon', 3703000, 14),
        new DungeonBossPokemon('Burpmon', 3703000, 14),
    ],
    39000, 203);

dungeonList['Valley Windworks'] = new Dungeon('Valley Windworks',
    [
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Burpmon', 756000, 13)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Burpmon', 756000, 13)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Burpmon', 756000, 11),
                new GymPokemon('Burpmon', 756000, 11),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Burpmon', 756000, 13)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Burpmon', 756000, 11),
                new GymPokemon('Burpmon', 756000, 11),
            ], { weight: 1 }, undefined, '(male)'),
    ],
    [
        {loot: 'Lucky_floppy', weight: 4},
        {loot: 'Pokeball', weight: 3.5},
        {loot: 'Greatball', weight: 3.5},
        {loot: 'Nature Plate', weight: 2.75},
        {loot: 'SmallRestore', weight: 1.75},
        {loot: 'Library', weight: 0, requirement: new ClearDungeonRequirement(50, GameConstants.getDungeonIndex('Ravaged Path'))},
    ],
    756000,
    [
        new DungeonTrainer('Commander',
            [
                new GymPokemon('Burpmon', 1901500, 15),
                new GymPokemon('Burpmon', 1901500, 17),
            ], { weight: 1 }, 'Mars', '(mars)'),
        new DungeonBossPokemon('Burpmon', 3803000, 14, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Valley Windworks'))}),
    ],
    43000, 204);

dungeonList['Eterna Forest'] = new Dungeon('Eterna Forest',
    [
        {pokemon: 'Burpmon', options: { weight: 1.8 }},
        {pokemon: 'Burpmon', options: { weight: 1.8 }},
        {pokemon: 'Burpmon', options: { weight: 1.8 }},
        {pokemon: 'Burpmon', options: { weight: 1.8 }},
        {pokemon: 'Burpmon', options: { weight: 1.8 }},
        {pokemon: 'Burpmon', options: { weight: 1.8 }},
        {pokemon: 'Burpmon', options: { weight: 1.8 }},
        {pokemon: 'Burpmon', options: { weight: 1.8 }},
        {pokemon: 'Burpmon', options: { weight: 1.8 }},
        new DungeonTrainer('Bookworms',
            [
                new GymPokemon('Burpmon', 812000, 9),
                new GymPokemon('Burpmon', 812000, 11),
                new GymPokemon('Burpmon', 812000, 13),
                new GymPokemon('Burpmon', 812000, 14),
            ], { weight: 1 }, 'Jack & Briana'),
        new DungeonTrainer('Melded Minds',
            [
                new GymPokemon('Burpmon', 812000, 15),
                new GymPokemon('Burpmon', 812000, 15),
            ], { weight: 1 }, 'Linsey & Elijah', '(both)'),
        new DungeonTrainer('Bug Buds',
            [
                new GymPokemon('Burpmon', 812000, 9),
                new GymPokemon('Burpmon', 812000, 11),
                new GymPokemon('Burpmon', 812000, 13),
                new GymPokemon('Burpmon', 812000, 12),
                new GymPokemon('Burpmon', 812000, 12),
            ], { weight: 1 }, 'Philip & Donald'),
        new DungeonTrainer('Melded Minds',
            [
                new GymPokemon('Burpmon', 812000, 15),
                new GymPokemon('Burpmon', 812000, 15),
            ], { weight: 1 }, 'Kody & Rachael', '(both)'),
    ],
    [
        {loot: 'Games', weight: 4},
        {loot: 'Chat', weight: 4},
        {loot: 'Greatball', weight: 3.5},
        {loot: 'Security', weight: 3},
        {loot: 'Step', weight: 3},
        {loot: 'Code Plate', weight: 2.75},
        {loot: 'Jungle Plate', weight: 2.75},
        {loot: 'SmallRestore', weight: 1.75},
        {loot: 'Soothe_bell', weight: 0},
    ],
    812000,
    [
        new DungeonBossPokemon('Burpmon', 3950000, 30),
        new DungeonBossPokemon('Burpmon', 3950000, 30),
    ],
    48000, 205);

dungeonList['Old Chateau'] = new Dungeon('Old Chateau',
    ['Burpmon', 'Burpmon', 'Burpmon'],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'Item_magnet', weight: 4},
        {loot: 'Release Plate', weight: 2.75},
        {loot: 'Nightmare Plate', weight: 2.75},
        {loot: 'Empire Plate', weight: 2.75},
        {loot: 'Action', weight: 2, requirement: new ClearDungeonRequirement(50, GameConstants.getDungeonIndex('Old Chateau'))},
        {loot: 'Odd Keystone', weight: 1.75},
    ],
    853000,
    [new DungeonBossPokemon('Burpmon', 4200000, 100)],
    52500, 205);

dungeonList['Team Galactic Eterna Building'] = new Dungeon('Team Galactic Eterna Building',
    [
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Burpmon', 877000, 17),
                new GymPokemon('Burpmon', 877000, 17),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Burpmon', 877000, 16),
                new GymPokemon('Burpmon', 877000, 18),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Burpmon', 877000, 19)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Burpmon', 877000, 19)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Burpmon', 877000, 16),
                new GymPokemon('Burpmon', 877000, 16),
                new GymPokemon('Burpmon', 877000, 16),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Scientist',
            [new GymPokemon('Burpmon', 877000, 20)],
            { weight: 1 }, 'Travon', '(male)'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    877000,
    [
        new DungeonTrainer('Commander',
            [
                new GymPokemon('Burpmon', 2150000, 21),
                new GymPokemon('Burpmon', 2150000, 23),
            ], { weight: 1 }, 'Jupiter', '(jupiter)'),
        new DungeonBossPokemon('Burpmon', 4300000, 100, {requirement: new MultiRequirement([
            new ObtainedPokemonRequirement(pokemonMap.Burpmon),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Galactic Eterna Building')),
        ])}),
        new DungeonBossPokemon('Burpmon', 4300000, 100, {requirement: new MultiRequirement([
            new ObtainedPokemonRequirement(pokemonMap.Burpmon),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Galactic Eterna Building')),
        ])}),
        new DungeonBossPokemon('Burpmon', 4300000, 100, {requirement: new MultiRequirement([
            new ObtainedPokemonRequirement(pokemonMap.Burpmon),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Galactic Eterna Building')),
        ])}),
        new DungeonBossPokemon('Burpmon', 4300000, 100, {requirement: new MultiRequirement([
            new ObtainedPokemonRequirement(pokemonMap.Burpmon),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Galactic Eterna Building')),
        ])}),
        new DungeonBossPokemon('Burpmon', 4300000, 100, {requirement: new MultiRequirement([
            new ObtainedPokemonRequirement(pokemonMap.Burpmon),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Galactic Eterna Building')),
        ])}),
    ],
    54250, 205);

dungeonList['Wayward Cave'] = new Dungeon('Wayward Cave',
    [
        {pokemon: 'Burpmon', options: { weight: 6.7 }},
        {pokemon: 'Burpmon', options: { weight: 6.7 }},
        {pokemon: 'Burpmon', options: { weight: 6.7 }},
        new DungeonTrainer('Mountain Men',
            [
                new GymPokemon('Burpmon', 903000, 20),
                new GymPokemon('Burpmon', 903000, 20),
                new GymPokemon('Burpmon', 903000, 22),
            ], { weight: 1 }, 'Reginald & Lorenzo'),
        new DungeonTrainer('Siblings',
            [
                new GymPokemon('Burpmon', 903000, 22),
                new GymPokemon('Burpmon', 903000, 17),
                new GymPokemon('Burpmon', 903000, 20),
                new GymPokemon('Burpmon', 903000, 20),
            ], { weight: 1 }, 'Cassidy & Wayne'),
        new DungeonTrainer('Burpmonre Friends',
            [
                new GymPokemon('Burpmon', 903000, 22),
                new GymPokemon('Burpmon', 903000, 22),
            ], { weight: 1 }, 'Tori & Diego'),
        new DungeonTrainer('Burpmonre Friends',
            [
                new GymPokemon('Burpmon', 903000, 22),
                new GymPokemon('Burpmon', 903000, 20),
                new GymPokemon('Burpmon', 903000, 20),
            ], { weight: 1 }, 'Ana & Parker'),
        new DungeonTrainer('Amateur Archaeologists',
            [
                new GymPokemon('Burpmon', 903000, 22),
                new GymPokemon('Burpmon', 903000, 19),
                new GymPokemon('Burpmon', 903000, 21),
            ], { weight: 1 }, 'Terry & Gerald'),
    ],
    [
        {loot: 'Intel_floppy', weight: 4},
        {loot: 'Step', weight: 3.75},
        {loot: 'Security', weight: 3.5},
        {loot: 'Greatball', weight: 3},
        {loot: 'Nature Plate', weight: 2.75},
        {loot: 'Nightmare Plate', weight: 2.75},
        {loot: 'Revive', weight: 2},
        {loot: 'SmallRestore', weight: 2},
        {loot: 'MediumRestore', weight: 1.75},
        {loot: 'Dusk_stone', weight: 0},
    ],
    903000,
    [new DungeonBossPokemon('Burpmon', 4400000, 100)],
    56500, 206);

dungeonList['Mt. Coronet South'] = new Dungeon('Mt. Coronet South',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [
        {loot: 'xAttack', weight: 3.75},
        {loot: 'Lucky_floppy', weight: 3.5},
        {loot: 'Nature Plate', weight: 2.5},
        {loot: 'Revive', weight: 2},
        {loot: 'Dawn_stone', weight: 0},
        {loot: 'Moon_stone', weight: 0},
    ],
    951500,
    [
        new DungeonBossPokemon('Burpmon', 4000000, 35),
        new DungeonBossPokemon('Burpmon', 4000000, 50),
        new DungeonBossPokemon('Burpmon', 4000000, 50),
    ],
    60500, 207);

// All Unown except "FHP?!"
SeededRand.seed(420);
const SolaceonUnownList = SeededRand.shuffleArray('ABCDEGIJKLMNOQRSTUVWXYZ'.split(''));

dungeonList['Solaceon Ruins'] = new Dungeon('Solaceon Ruins',
    [
        {pokemon: 'Burpmon', options: { weight: 0.8 }},
        {pokemon: 'Burpmon', options: { weight: 0.8 }},
        {pokemon: 'Burpmon', options: { weight: 0.8 }},
        {pokemon: 'Burpmon', options: { weight: 0.8 }},
        {pokemon: 'Burpmon', options: { weight: 0.8 }},
        new DungeonTrainer('Ruin Maniac',
            [
                new GymPokemon('Burpmon', 960000, 19),
                new GymPokemon('Burpmon', 960000, 21),
                new GymPokemon('Burpmon', 960000, 23),
            ], { weight: 1 }, 'Karl'),
    ],
    [
        {loot: 'Lucky_floppy', weight: 3.75},
        {loot: 'Games', weight: 3.25},
        {loot: 'Trojan Plate', weight: 2.5},
        {loot: 'Guardian Plate', weight: 2.5},
        {loot: 'Fire_stone', weight: 0},
        {loot: 'Water_stone', weight: 0},
        {loot: 'Thunder_stone', weight: 0},
    ],
    960000,
    [
        ...SolaceonUnownList.map((char) => new DungeonBossPokemon(`Unown (${char})` as PokemonNameType, 4100000, 30, {
            hide: true,
            requirement: new SeededDateRequirement(() => SeededDateRand.fromArray(SolaceonUnownList) == char),
        })),
    ],
    62500, 209);

dungeonList['Iron Island'] = new Dungeon('Iron Island',
    [
        {pokemon: 'Burpmon', options: { weight: 3.3 }},
        {pokemon: 'Burpmon', options: { weight: 3.3 }},
        {pokemon: 'Burpmon', options: { weight: 3.3 }},
        {pokemon: 'Burpmon', options: { weight: 3.3 }},
        {pokemon: 'Burpmon', options: { weight: 3.3 }},
        {pokemon: 'Burpmon', options: { weight: 3.3 }},
        {pokemon: 'Burpmon', options: { weight: 3.3 }},
        {pokemon: 'Burpmon', options: { weight: 3.3 }},
        {pokemon: 'Burpmon', options: { weight: 3.3 }},
        {pokemon: 'Burpmon', options: { weight: 3.3 }},
        {pokemon: 'Burpmon', options: { weight: 3.3 }},
        new DungeonTrainer('Camper',
            [
                new GymPokemon('Burpmon', 983000, 34),
                new GymPokemon('Burpmon', 983000, 36),
            ], { weight: 1 }, 'Lawrence'),
        new DungeonTrainer('Picnicker',
            [new GymPokemon('Burpmon', 983000, 37)],
            { weight: 1 }, 'Summer'),
        new DungeonTrainer('Worker',
            [
                new GymPokemon('Burpmon', 983000, 34),
                new GymPokemon('Burpmon', 983000, 36),
            ], { weight: 1 }, 'Noel'),
        new DungeonTrainer('Worker',
            [new GymPokemon('Burpmon', 983000, 37)],
            { weight: 1 }, 'Braden'),
        new DungeonTrainer('Mountain Men',
            [
                new GymPokemon('Burpmon', 983000, 35),
                new GymPokemon('Burpmon', 983000, 33),
                new GymPokemon('Burpmon', 983000, 34),
                new GymPokemon('Burpmon', 983000, 35),
                new GymPokemon('Burpmon', 983000, 35),
            ], { weight: 1 }, 'Damon & Maurice'),
        new DungeonTrainer('Crush Kin',
            [
                new GymPokemon('Burpmon', 983000, 38),
                new GymPokemon('Burpmon', 983000, 38),
            ], { weight: 1 }, 'Kendal & Tyler'),
        new DungeonTrainer('Co-workers',
            [
                new GymPokemon('Burpmon', 983000, 33),
                new GymPokemon('Burpmon', 983000, 33),
                new GymPokemon('Burpmon', 983000, 36),
                new GymPokemon('Burpmon', 983000, 34),
                new GymPokemon('Burpmon', 983000, 34),
                new GymPokemon('Burpmon', 983000, 34),
            ], { weight: 1 }, 'Brendon & Quentin'),
        new DungeonTrainer('Ace Duo',
            [
                new GymPokemon('Burpmon', 983000, 35),
                new GymPokemon('Burpmon', 983000, 36),
                new GymPokemon('Burpmon', 983000, 38),
                new GymPokemon('Burpmon', 983000, 38),
                new GymPokemon('Burpmon', 983000, 35),
                new GymPokemon('Burpmon', 983000, 36),
            ], { weight: 1 }, 'Jonah & Brenda'),
    ],
    [
        {loot: 'Item_magnet', weight: 3.75},
        {loot: 'Pokeball', weight: 3.5},
        {loot: 'Simple Plate', weight: 2.5},
        {loot: 'Ultraball', weight: 2.25},
        {loot: 'Revive', weight: 2},
        {loot: 'Duskball', weight: 1.75},
        {loot: 'Star Piece', weight: 1.5},
        {loot: 'Shiny_stone', weight: 0},
        {loot: 'Metal_coat', weight: 0},
        {loot: 'Protector', weight: 0},
    ],
    983000,
    [
        new DungeonTrainer('Galactic Grunts',
            [
                new GymPokemon('Burpmon', 701667, 34),
                new GymPokemon('Burpmon', 701667, 34),
                new GymPokemon('Burpmon', 701667, 34),
                new GymPokemon('Burpmon', 701667, 34),
                new GymPokemon('Burpmon', 701667, 34),
                new GymPokemon('Burpmon', 701667, 34),
            ], { weight: 1 }, undefined, '(male)'),
    ],
    66500, 218);

dungeonList['Lake Valor'] = new Dungeon('Lake Valor',
    [
        {pokemon: 'Burpmon', options: { weight: 2 }},
        {pokemon: 'Burpmon', options: { weight: 2 }},
        {pokemon: 'Burpmon', options: { weight: 2 }},
        {pokemon: 'Burpmon', options: { weight: 2 }},
        {pokemon: 'Burpmon', options: { weight: 2 }},
        {pokemon: 'Burpmon', options: { weight: 2 }},
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Burpmon', 1015000, 35),
                new GymPokemon('Burpmon', 1015000, 35),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Burpmon', 1015000, 37)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Burpmon', 1015000, 33),
                new GymPokemon('Burpmon', 1015000, 33),
                new GymPokemon('Burpmon', 1015000, 33),
                new GymPokemon('Burpmon', 1015000, 33),
            ], { weight: 1 }, undefined, '(male)'),
    ],
    [
        {loot: 'Intel_floppy', weight: 4},
        {loot: 'Finance', weight: 3.75},
        {loot: 'Trojan Plate', weight: 2.5},
        {loot: 'Electric_egg', weight: 1},
        {loot: 'Thunder_stone', weight: 0},
    ],
    1015000,
    [
        new DungeonTrainer('Commander',
            [
                new GymPokemon('Burpmon', 1533334, 38),
                new GymPokemon('Burpmon', 1533334, 38),
                new GymPokemon('Burpmon', 1533334, 40),
            ], { weight: 1 }, 'Saturn', '(saturn)'),
        new DungeonBossPokemon('Burpmon', 10060000, 50, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Distortion World'))}),
    ],
    69500, 218);

dungeonList['Lake Verity'] = new Dungeon('Lake Verity',
    [
        {pokemon: 'Burpmon', options: { weight: 2.7 }},
        {pokemon: 'Burpmon', options: { weight: 2.7 }},
        {pokemon: 'Burpmon', options: { weight: 2.7 }},
        {pokemon: 'Burpmon', options: { weight: 2.7 }},
        {pokemon: 'Burpmon', options: { weight: 2.7 }},
        {pokemon: 'Burpmon', options: { weight: 2.7 }},
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Burpmon', 1068735, 33),
                new GymPokemon('Burpmon', 1068735, 33),
                new GymPokemon('Burpmon', 1068735, 36),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Burpmon', 1068735, 37)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Burpmon', 1068735, 35),
                new GymPokemon('Burpmon', 1068735, 35),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Burpmon', 1068735, 34),
                new GymPokemon('Burpmon', 1068735, 36),
            ], { weight: 1 }, undefined, '(female)'),
    ],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Finance', weight: 3.75},
        {loot: 'Trojan Plate', weight: 2.5},
        {loot: 'Fire_egg', weight: 1},
        {loot: 'Fire_stone', weight: 0},
    ],
    1068735,
    [
        new DungeonTrainer('Commander',
            [
                new GymPokemon('Burpmon', 1606667, 38),
                new GymPokemon('Burpmon', 1606667, 38),
                new GymPokemon('Burpmon', 1606667, 40),
            ], { weight: 1 }, 'Mars', '(mars)'),
    ],
    72500, 218);

dungeonList['Mt. Coronet North'] = new Dungeon('Mt. Coronet North',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'Greatball', weight: 3.5},
        {loot: 'Nature Plate', weight: 2.5},
        {loot: 'Nightmare Plate', weight: 2.5},
        {loot: 'Ultraball', weight: 2},
        {loot: 'Light Clay', weight: 1.75},
        {loot: 'LargeRestore', weight: 1.75},
        {loot: 'Star Piece', weight: 1.5},
        {loot: 'Sun_stone', weight: 0},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(350, GameConstants.getDungeonIndex('Mt. Coronet North'))},
        {loot: 'Max Revive', weight: 0},
    ],
    1111500,
    [
        new DungeonBossPokemon('Burpmon', 4960000, 35),
        new DungeonBossPokemon('Burpmon', 4960000, 50),
        new DungeonBossPokemon('Burpmon', 4960000, 50),
    ],
    74500, 218);

dungeonList['Lake Acuity'] = new Dungeon('Lake Acuity',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [
        {loot: 'Lucky_pill', weight: 4},
        {loot: 'Finance', weight: 3.75},
        {loot: 'Guardian Plate', weight: 2.5},
        {loot: 'Trojan Plate', weight: 2.5},
    ],
    1261800,
    [
        new DungeonTrainer('Commander',
            [
                new GymPokemon('Burpmon', 1690000, 38),
                new GymPokemon('Burpmon', 1690000, 38),
                new GymPokemon('Burpmon', 1690000, 40),
            ], { weight: 1 }, 'Jupiter', '(jupiter)'),
        new DungeonBossPokemon('Burpmon', 10070000, 50, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Distortion World'))}),
    ],
    78000, 217);

dungeonList['Team Galactic HQ'] = new Dungeon('Team Galactic HQ',
    [
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Burpmon', 1295400, 41)],
            { weight: 2 }, undefined, '(female)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Burpmon', 1295400, 37),
                new GymPokemon('Burpmon', 1295400, 38),
                new GymPokemon('Burpmon', 1295400, 39),
            ], { weight: 2 }, undefined, '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Burpmon', 1295400, 40),
                new GymPokemon('Burpmon', 1295400, 40),
            ], { weight: 2 }, 'Frederick', '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Burpmon', 1295400, 41)],
            { weight: 2 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Burpmon', 1295400, 41),
                new GymPokemon('Burpmon', 1295400, 41),
            ], { weight: 2 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Burpmon', 1295400, 40),
                new GymPokemon('Burpmon', 1295400, 38),
            ], { weight: 2 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Burpmon', 1295400, 39),
                new GymPokemon('Burpmon', 1295400, 39),
            ], { weight: 2 }, undefined, '(female)'),
        new DungeonTrainer('Scientist',
            [new GymPokemon('Burpmon', 1295400, 42)],
            { weight: 2 }, 'Darrius', '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Burpmon', 1295400, 38),
                new GymPokemon('Burpmon', 1295400, 40),
            ], { weight: 2 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Burpmon', 1295400, 38),
                new GymPokemon('Burpmon', 1295400, 38),
                new GymPokemon('Burpmon', 1295400, 38),
            ], { weight: 2 }, undefined, '(female)'),
        new DungeonTrainer('Commander',
            [
                new GymPokemon('Burpmon', 1295400, 42),
                new GymPokemon('Burpmon', 1295400, 42),
                new GymPokemon('Burpmon', 1295400, 42),
            ], { weight: 1 }, 'Saturn', '(saturn)'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    1295400,
    [
        new DungeonTrainer('Galactic Boss',
            [
                new GymPokemon('Burpmon', 1725000, 44),
                new GymPokemon('Burpmon', 1725000, 44),
                new GymPokemon('Burpmon', 1725000, 46),
            ], { weight: 1 }, 'Cyrus', '(cyrus)'),
    ],
    82500, 217);

dungeonList['Spear Pillar'] = new Dungeon('Spear Pillar',
    [
        {pokemon: 'Burpmon', options: { weight: 3 }},
        {pokemon: 'Burpmon', options: { weight: 3 }},
        {pokemon: 'Burpmon', options: { weight: 3 }},
        {pokemon: 'Burpmon', options: { weight: 3 }},
        {pokemon: 'Burpmon', options: { weight: 3 }},
        {pokemon: 'Burpmon', options: { weight: 3 }},
        {pokemon: 'Burpmon', options: { weight: 3 }},
        {pokemon: 'Burpmon', options: { weight: 3 }},
        {pokemon: 'Burpmon', options: { weight: 3 }},
        {pokemon: 'Burpmon', options: { weight: 3 }},
        {pokemon: 'Burpmon', options: { weight: 3 }},
        {pokemon: 'Burpmon', options: { weight: 3 }},
        {pokemon: 'Burpmon', options: { weight: 3 }},
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Burpmon', 1322100, 43)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Burpmon', 1322100, 43)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Burpmon', 1322100, 40),
                new GymPokemon('Burpmon', 1322100, 40),
                new GymPokemon('Burpmon', 1322100, 40),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Burpmon', 1322100, 42),
                new GymPokemon('Burpmon', 1322100, 40),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Burpmon', 1322100, 43)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Burpmon', 1322100, 39),
                new GymPokemon('Burpmon', 1322100, 42),
                new GymPokemon('Burpmon', 1322100, 39),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Burpmon', 1322100, 38),
                new GymPokemon('Burpmon', 1322100, 42),
                new GymPokemon('Burpmon', 1322100, 40),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Burpmon', 1322100, 40),
                new GymPokemon('Burpmon', 1322100, 42),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Burpmon', 1322100, 41),
                new GymPokemon('Burpmon', 1322100, 41),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Burpmon', 1322100, 39),
                new GymPokemon('Burpmon', 1322100, 40),
                new GymPokemon('Burpmon', 1322100, 41),
            ], { weight: 1 }, undefined, '(female)'),
    ],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'Item_magnet', weight: 3.75},
        {loot: 'Simple Plate', weight: 2.5},
        {loot: 'Nightmare Plate', weight: 2.5},
        {loot: 'Deep Plate', weight: 2.5},
    ],
    1322100,
    [
        new DungeonTrainer('Commanders',
            [
                new GymPokemon('Burpmon', 880000, 44),
                new GymPokemon('Burpmon', 880000, 44),
                new GymPokemon('Burpmon', 880000, 46),
                new GymPokemon('Burpmon', 880000, 44),
                new GymPokemon('Burpmon', 880000, 44),
                new GymPokemon('Burpmon', 880000, 46),
            ], { weight: 1 }, 'Mars & Jupiter', '(marsjupiter)'),
        new DungeonBossPokemon('Burpmon', 11880000, 100, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)}),
        new DungeonBossPokemon('Burpmon', 11880000, 100, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)}),
    ],
    84500, 217);

dungeonList['Distortion World'] = new Dungeon('Distortion World',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'Ultraball', weight: 3.5},
        {loot: 'Burpmon', weight: 3},
        {loot: 'Nightmare Plate', weight: 2.5},
        {loot: 'Nightmare Plate', weight: 2.5},
        {loot: 'Rare Bone', weight: 1.75},
        {loot: 'Odd Keystone', weight: 1.75},
        {loot: 'Reaper_cloth', weight: 0},
    ],
    1350400,
    [
        new DungeonTrainer('Galactic Boss',
            [
                new GymPokemon('Burpmon', 1128000, 45),
                new GymPokemon('Burpmon', 1128000, 47),
                new GymPokemon('Burpmon', 1128000, 46),
                new GymPokemon('Burpmon', 1128000, 46),
                new GymPokemon('Burpmon', 1128000, 47),
            ], { weight: 1 }, 'Cyrus', '(cyrus)'),
        new DungeonBossPokemon('Burpmon', 11880000, 45, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)}),
    ],
    86500, 217);

dungeonList['Victory Road Sinnoh'] = new Dungeon('Victory Road Sinnoh',
    [
        {pokemon: 'Burpmon', options: { weight: 9.3 }},
        {pokemon: 'Burpmon', options: { weight: 9.3 }},
        {pokemon: 'Burpmon', options: { weight: 9.3 }},
        {pokemon: 'Burpmon', options: { weight: 9.3 }},
        {pokemon: 'Burpmon', options: { weight: 9.3 }},
        {pokemon: 'Burpmon', options: { weight: 9.3 }},
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Burpmon', 1503000, 43),
                new GymPokemon('Burpmon', 1503000, 46),
                new GymPokemon('Burpmon', 1503000, 46),
            ], { weight: 1 }, 'Bryce', '(male)'),
        new DungeonTrainer('Bird Keeper',
            [
                new GymPokemon('Burpmon', 1503000, 45),
                new GymPokemon('Burpmon', 1503000, 47),
            ], { weight: 1 }, 'Hana'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 1503000, 45),
                new GymPokemon('Burpmon', 1503000, 46),
                new GymPokemon('Burpmon', 1503000, 48),
            ], { weight: 1 }, 'Mariah', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 1503000, 45),
                new GymPokemon('Burpmon', 1503000, 46),
                new GymPokemon('Burpmon', 1503000, 48),
            ], { weight: 1 }, 'Omar', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 1503000, 47),
                new GymPokemon('Burpmon', 1503000, 48),
            ], { weight: 1 }, 'Sydney', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Burpmon', 1503000, 47),
                new GymPokemon('Burpmon', 1503000, 47),
            ], { weight: 1 }, 'Clayton', '(male)'),
        new DungeonTrainer('Double Team',
            [
                new GymPokemon('Burpmon', 1503000, 50),
                new GymPokemon('Burpmon', 1503000, 50),
            ], { weight: 1 }, 'Al & Kay'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Burpmon', 1503000, 48)],
            { weight: 1 }, 'Miles'),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Burpmon', 1503000, 44),
                new GymPokemon('Burpmon', 1503000, 45),
                new GymPokemon('Burpmon', 1503000, 46),
            ], { weight: 1 }, 'Valencia', '(female)'),
        new DungeonTrainer('Double Team',
            [
                new GymPokemon('Burpmon', 1503000, 50),
                new GymPokemon('Burpmon', 1503000, 50),
            ], { weight: 1 }, 'Pat & Jo'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 1503000, 47),
                new GymPokemon('Burpmon', 1503000, 48),
            ], { weight: 1 }, 'Henry', '(male)'),
        new DungeonTrainer('Dragon Tamer',
            [
                new GymPokemon('Burpmon', 1503000, 45),
                new GymPokemon('Burpmon', 1503000, 47),
            ], { weight: 1 }, 'Ondrej'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Burpmon', 1503000, 46),
                new GymPokemon('Burpmon', 1503000, 46),
                new GymPokemon('Burpmon', 1503000, 46),
            ], { weight: 1 }, 'Edgar', '(male)'),
        new DungeonTrainer('Dragon Tamer',
            [
                new GymPokemon('Burpmon', 1503000, 43),
                new GymPokemon('Burpmon', 1503000, 45),
                new GymPokemon('Burpmon', 1503000, 47),
            ], { weight: 1 }, 'Clinton'),
    ],
    [
        {loot: 'Lucky_floppy', weight: 4},
        {loot: 'Chat', weight: 3.75},
        {loot: 'Burpmon', weight: 3.25},
        {loot: 'Ultraball', weight: 2},
        {loot: 'Razor_claw', weight: 0},
        {loot: 'Dusk_stone', weight: 0},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(350, GameConstants.getDungeonIndex('Victory Road Sinnoh'))},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Heart Scale', weight: 0},
    ],
    1503000,
    [
        new DungeonBossPokemon('Burpmon', 7000000, 100),
        new DungeonBossPokemon('Burpmon', 7000000, 100),
    ],
    89500, 223);

dungeonList['Sendoff Spring'] = new Dungeon('Sendoff Spring',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2603000,
    [
        new DungeonBossPokemon('Burpmon', 10000000, 100),
        new DungeonBossPokemon('Burpmon', 10000000, 100),
        new DungeonBossPokemon('Burpmon', 10000000, 100),
    ],
    96500, 230);

dungeonList['Hall of Origin'] = new Dungeon('Hall of Origin',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [
        {loot: 'Item_magnet', weight: 4},
        {loot: 'Games', weight: 3.75},
        {loot: 'Burpmon', weight: 3.5},
        {loot: 'Nightmare Plate', weight: 2.5},
        {loot: 'Release Plate', weight: 2.5},
        {loot: 'Nature Plate', weight: 2.5},
        {loot: 'Cure Plate', weight: 2.5},
        {loot: 'Roar Plate', weight: 2.5},
        {loot: 'Guardian Plate', weight: 2.5},
        {loot: 'Code Plate', weight: 2.5},
        {loot: 'Simple Plate', weight: 2.5},
        {loot: 'Jungle Plate', weight: 2.5},
        {loot: 'Trojan Plate', weight: 2.5},
        {loot: 'Buster Plate', weight: 2.5},
        {loot: 'Guardian Plate', weight: 2.5},
        {loot: 'Deep Plate', weight: 2.5},
        {loot: 'Nightmare Plate', weight: 2.5},
        {loot: 'Nature Plate', weight: 2.5},
        {loot: 'Jungle Plate', weight: 2.5},
        {loot: 'Empire Plate', weight: 2.5},
    ],
    2653000,
    [
        new DungeonBossPokemon('Burpmon', 13000000, 100),
        new DungeonBossPokemon('Burpmon', 10000000, 100),
        new DungeonBossPokemon('Burpmon', 10000000, 100),
        new DungeonBossPokemon('Burpmon', 10000000, 100),
        new DungeonBossPokemon('Burpmon', 10000000, 100),
    ],
    106500, 230);

dungeonList['Fullmoon Island'] = new Dungeon('Fullmoon Island',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'eBook', weight: 3.75},
        {loot: 'Trojan Plate', weight: 2.5},
        {loot: 'Dawn_stone', weight: 0},
    ],
    2603000,
    [new DungeonBossPokemon('Burpmon', 11000000, 100)],
    96500, 230);

dungeonList['Newmoon Island'] = new Dungeon('Newmoon Island',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [
        {loot: 'Lucky_pill', weight: 4},
        {loot: 'eBook', weight: 3.75},
        {loot: 'Release Plate', weight: 2.5},
        {loot: 'Dusk_stone', weight: 0},
    ],
    2603000,
    [new DungeonBossPokemon('Burpmon', 11000000, 100)],
    96500, 230);

dungeonList['Flower Paradise'] = new Dungeon('Flower Paradise',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Sleep', weight: 3.5},
        {loot: 'Calendar', weight: 3.5},
        {loot: 'Jungle Plate', weight: 2.5},
        {loot: 'Guardian Plate', weight: 2.25},
        {loot: 'Plant_egg', weight: 1},
        {loot: 'Leaf_stone', weight: 0},
    ],
    2603000,
    [
        new DungeonBossPokemon('Burpmon', 9900000, 50),
        new DungeonBossPokemon('Burpmon', 11000000, 50),
        new DungeonBossPokemon('Burpmon', 11000000, 50),
        new DungeonBossPokemon('Burpmon', 11000000, 50, {requirement: new ObtainedPokemonRequirement(pokemonMap['Burpmon'])}),
    ],
    96500, 230);

dungeonList['Snowpoint Temple'] = new Dungeon('Snowpoint Temple',
    ['Burpmon', 'Burpmon', 'Burpmon'],
    [
        {loot: 'Intel_floppy', weight: 4},
        {loot: 'Light', weight: 3.75},
        {loot: 'Guardian Plate', weight: 2.5},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(350, GameConstants.getDungeonIndex('Snowpoint Temple'))},
    ],
    2603000,
    [
        new DungeonBossPokemon('Burpmon', 10000000, 100),
        new DungeonBossPokemon('Burpmon', 11000000, 100),
    ],
    96500, 230);

dungeonList['Stark Mountain'] = new Dungeon('Stark Mountain',
    [
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        new DungeonTrainer('Dragon Tamer',
            [new GymPokemon('Burpmon', 2603000, 60)],
            { weight: 1 }, 'Darien'),
        new DungeonTrainer('Commander',
            [
                new GymPokemon('Burpmon', 2603000, 58),
                new GymPokemon('Burpmon', 2603000, 58),
                new GymPokemon('Burpmon', 2603000, 60),
            ], { weight: 1 }, 'Mars', '(mars)'),
        new DungeonTrainer('Commander',
            [
                new GymPokemon('Burpmon', 2603000, 58),
                new GymPokemon('Burpmon', 2603000, 58),
                new GymPokemon('Burpmon', 2603000, 60),
            ], { weight: 1 }, 'Jupiter', '(jupiter)'),
        new DungeonTrainer('Ace Duo',
            [
                new GymPokemon('Burpmon', 2603000, 58),
                new GymPokemon('Burpmon', 2603000, 59),
                new GymPokemon('Burpmon', 2603000, 58),
                new GymPokemon('Burpmon', 2603000, 58),
                new GymPokemon('Burpmon', 2603000, 59),
                new GymPokemon('Burpmon', 2603000, 58),
            ], { weight: 1 }, 'Keenan & Kassandra'),
        new DungeonTrainer('Ace Duo',
            [
                new GymPokemon('Burpmon', 2603000, 58),
                new GymPokemon('Burpmon', 2603000, 61),
                new GymPokemon('Burpmon', 2603000, 61),
            ], { weight: 1 }, 'Stefan & Jasmin'),
        new DungeonTrainer('Fight & Flight',
            [
                new GymPokemon('Burpmon', 2603000, 55),
                new GymPokemon('Burpmon', 2603000, 57),
                new GymPokemon('Burpmon', 2603000, 59),
                new GymPokemon('Burpmon', 2603000, 58),
                new GymPokemon('Burpmon', 2603000, 58),
            ], { weight: 1 }, 'Krystal & Ray'),
        new DungeonTrainer('Ace Duo',
            [
                new GymPokemon('Burpmon', 2603000, 59),
                new GymPokemon('Burpmon', 2603000, 60),
                new GymPokemon('Burpmon', 2603000, 58),
                new GymPokemon('Burpmon', 2603000, 59),
                new GymPokemon('Burpmon', 2603000, 58),
            ], { weight: 1 }, 'Abel & Monique'),
        new DungeonTrainer('Melded Minds',
            [
                new GymPokemon('Burpmon', 2603000, 57),
                new GymPokemon('Burpmon', 2603000, 59),
                new GymPokemon('Burpmon', 2603000, 57),
                new GymPokemon('Burpmon', 2603000, 59),
            ], { weight: 1 }, 'Chelsey & Sterling', '(both)'),
        new DungeonTrainer('Dragon Warriors',
            [
                new GymPokemon('Burpmon', 2603000, 57),
                new GymPokemon('Burpmon', 2603000, 58),
                new GymPokemon('Burpmon', 2603000, 59),
                new GymPokemon('Burpmon', 2603000, 57),
                new GymPokemon('Burpmon', 2603000, 57),
                new GymPokemon('Burpmon', 2603000, 57),
            ], { weight: 1 }, 'Harlan & Kenny'),
        new DungeonTrainer('Ace Duo',
            [
                new GymPokemon('Burpmon', 2603000, 58),
                new GymPokemon('Burpmon', 2603000, 59),
                new GymPokemon('Burpmon', 2603000, 58),
                new GymPokemon('Burpmon', 2603000, 58),
                new GymPokemon('Burpmon', 2603000, 59),
                new GymPokemon('Burpmon', 2603000, 58),
            ], { weight: 1 }, 'Skylar & Narasha'),
        new DungeonTrainer('Hidden Dragons',
            [
                new GymPokemon('Burpmon', 2603000, 57),
                new GymPokemon('Burpmon', 2603000, 57),
                new GymPokemon('Burpmon', 2603000, 57),
                new GymPokemon('Burpmon', 2603000, 60),
            ], { weight: 1 }, 'Drake & Jarrett'),
    ],
    [
        {loot: 'Intel_floppy', weight: 4},
        {loot: 'Step', weight: 3.75},
        {loot: 'Roar Plate', weight: 2.5},
        {loot: 'Simple Plate', weight: 2.5},
        {loot: 'Ultraball', weight: 2},
        {loot: 'Revive', weight: 2},
        {loot: 'Star Piece', weight: 1.75},
        {loot: 'LargeRestore', weight: 1.25},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Fire_stone', weight: 0},
        {loot: 'Kaze Fossil', weight: 0, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Stark Mountain'))},
        {loot: 'Hagane Fossil', weight: 0, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Stark Mountain'))},
    ],
    2603000,
    [
        new DungeonBossPokemon('Burpmon', 10000000, 100),
        new DungeonBossPokemon('Burpmon', 11000000, 100),
    ],
    96500, 230);

// Unova
// TODO: Balancing of dungeon Pokemon HP & rewards.

dungeonList['Floccesy Ranch'] = new Dungeon('Floccesy Ranch',
    [
        {pokemon: 'Burpmon', options: { weight: 2 }},
        {pokemon: 'Burpmon', options: { weight: 2 }},
        {pokemon: 'Burpmon', options: { weight: 2 }},
        {pokemon: 'Burpmon', options: { weight: 2 }},
        {pokemon: 'Burpmon', options: { weight: 2 }},
        {pokemon: 'Burpmon', options: { weight: 2 }},
        new DungeonTrainer('Lass',
            [
                new GymPokemon('Burpmon', 126500, 6),
                new GymPokemon('Burpmon', 126500, 6),
            ], { weight: 1 }, 'Molly'),
        new DungeonTrainer('Janitor',
            [
                new GymPokemon('Burpmon', 126500, 6),
                new GymPokemon('Burpmon', 126500, 6),
            ], { weight: 1 }, 'Orville'),
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Burpmon', 126500, 6),
                new GymPokemon('Burpmon', 126500, 6),
            ], { weight: 1 }, 'Kenny'),
    ],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Pokeball', weight: 4},
        {loot: 'Games', weight: 3.5},
        {loot: 'eBook', weight: 2.5},
        {loot: 'Health', weight: 2.5},
    ],
    2503000,
    [new DungeonBossPokemon('Burpmon', 13000000, 100)],
    126500, 20);

dungeonList['Liberty Garden'] = new Dungeon('Liberty Garden',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [
        {loot: 'Intel_floppy', weight: 4},
        {loot: 'Music', weight: 3.75},
        {loot: 'Greatball', weight: 3},
        {loot: 'Roar Plate', weight: 2.5},
        {loot: 'Trojan Plate', weight: 2.5},
        {loot: 'Ultraball', weight: 2},
        {loot: 'Fire_egg', weight: 1},
    ],
    2703000,
    [
        new DungeonBossPokemon('Burpmon', 14000000, 100),
        new DungeonBossPokemon('Burpmon', 14000000, 100),
        new DungeonBossPokemon('Burpmon', 14000000, 100),
    ],
    136500, 20);

dungeonList['Castelia Sewers'] = new Dungeon('Castelia Sewers',
    [
        {pokemon: 'Burpmon', options: { weight: 5.6 }},
        {pokemon: 'Burpmon', options: { weight: 5.6 }},
        {pokemon: 'Burpmon', options: { weight: 5.6 }},
        {pokemon: 'Burpmon', options: { weight: 5.6 }},
        {pokemon: 'Burpmon', options: { weight: 5.6 }},
        new DungeonTrainer('Janitor',
            [
                new GymPokemon('Burpmon', 146500, 16),
                new GymPokemon('Burpmon', 146500, 16),
            ], { weight: 1 }, 'Felix'),
        new DungeonTrainer('Doctor',
            [new GymPokemon('Burpmon', 146500, 17)],
            { weight: 1 }, 'Heath'),
        new DungeonTrainer('Worker',
            [new GymPokemon('Burpmon', 146500, 17)],
            { weight: 1 }, 'Zack'),
        new DungeonTrainer('Worker',
            [new GymPokemon('Burpmon', 146500, 17)],
            { weight: 1 }, 'Scott'),
        new DungeonTrainer('Scientist',
            [new GymPokemon('Burpmon', 146500, 17)],
            { weight: 1 }, 'Caroline', '(female)'),
        new DungeonTrainer('Scientist',
            [new GymPokemon('Burpmon', 146500, 17)],
            { weight: 1 }, 'Clarke', '(male)'),
        new DungeonTrainer('Janitor',
            [
                new GymPokemon('Burpmon', 146500, 31),
                new GymPokemon('Burpmon', 146500, 31),
            ], { weight: 1 }, 'Brady'),
    ],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'xAttack', weight: 3.75},
        {loot: 'Jungle Plate', weight: 2.5},
        {loot: 'Trojan Plate', weight: 2.5},
        {loot: 'SmallRestore', weight: 2},
        {loot: 'Ultraball', weight: 2},
        {loot: 'Revive', weight: 2},
        {loot: 'MediumRestore', weight: 1.75},
        {loot: 'Rare Bone', weight: 1.5},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Heart Scale', weight: 0},
    ],
    2603000,
    [
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Burpmon', 15000000, 16)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Burpmon', 15000000, 16)],
            { weight: 1 }, undefined, '(female)'),
    ],
    146500, 4);

dungeonList['Relic Passage'] = new Dungeon('Relic Passage',
    [
        {pokemon: 'Burpmon', options: { weight: 8 }},
        {pokemon: 'Burpmon', options: { weight: 8 }},
        {pokemon: 'Burpmon', options: { weight: 8 }},
        {pokemon: 'Burpmon', options: { weight: 8 }},
        {pokemon: 'Burpmon', options: { weight: 8 }},
        new DungeonTrainer('Scientist',
            [new GymPokemon('Burpmon', 176500, 18)],
            { weight: 1 }, 'Terrance', '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Burpmon', 176500, 17),
                new GymPokemon('Burpmon', 176500, 17),
            ], { weight: 1 }, 'Hackingina', '(female)'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Burpmon', 176500, 18)],
            { weight: 1 }, 'Kendall', '(male)'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Burpmon', 176500, 32)],
            { weight: 1 }, 'Eileen', '(female)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Burpmon', 176500, 31),
                new GymPokemon('Burpmon', 176500, 31),
            ], { weight: 1 }, 'Keith'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Burpmon', 176500, 32)],
            { weight: 1 }, 'Randall', '(male)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Burpmon', 176500, 31),
                new GymPokemon('Burpmon', 176500, 31),
            ], { weight: 1 }, 'Tobias'),
        new DungeonTrainer('Psychic',
            [new GymPokemon('Burpmon', 176500, 33)],
            { weight: 1 }, 'Tully', '(male)'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Burpmon', 176500, 32)],
            { weight: 1 }, 'Annie', '(female)'),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Burpmon', 176500, 32),
                new GymPokemon('Burpmon', 176500, 32),
            ], { weight: 1 }, 'Ena', '(female)'),
    ],
    [
        {loot: 'Lucky_pill', weight: 4},
        {loot: 'Item_magnet', weight: 3.75},
        {loot: 'Nature Plate', weight: 2.5},
        {loot: 'Ultraball', weight: 2},
        {loot: 'Hard Stone', weight: 2},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(300, GameConstants.getDungeonIndex('Relic Passage'))},
    ],
    3203000,
    [
        new DungeonBossPokemon('Burpmon', 21000000, 100),
        new DungeonBossPokemon('Burpmon', 21000000, 100),
    ],
    156500, 5);

dungeonList['Relic Castle'] = new Dungeon('Relic Castle',
    [
        {pokemon: 'Burpmon', options: { weight: 1.33 }},
        {pokemon: 'Burpmon', options: { weight: 1.33 }},
        {pokemon: 'Burpmon', options: { weight: 1.33 }},
        {pokemon: 'Burpmon', options: { weight: 1.33 }},
        {pokemon: 'Burpmon', options: { weight: 1.33 }},
        {pokemon: 'Burpmon', options: { weight: 1.33 }},
        new DungeonTrainer('Psychic',
            [new GymPokemon('Burpmon', 156500, 23)],
            { weight: 1 }, 'Dua', '(female)'),
        new DungeonTrainer('Psychic',
            [new GymPokemon('Burpmon', 156500, 23)],
            { weight: 1 }, 'Low', '(male)'),
    ],
    [
        {loot: 'Intel_floppy', weight: 4},
        {loot: 'Sleep', weight: 3.75},
        {loot: 'Greatball', weight: 3.25},
        {loot: 'Nature Plate', weight: 2.5},
        {loot: 'Code Plate', weight: 2.25},
        {loot: 'Roar Plate', weight: 2.25},
        {loot: 'Revive', weight: 2},
        {loot: 'Ultraball', weight: 2},
        {loot: 'MediumRestore', weight: 1.75},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Sun_stone', weight: 0},
        {loot: 'Heart Scale', weight: 0},
        {loot: 'Burpmon', weight: 0, requirement: new ClearDungeonRequirement(50, GameConstants.getDungeonIndex('Relic Castle'))},
        {loot: 'Mizu Fossil', weight: 0, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Relic Castle'))},
        {loot: 'Ikazuchi Fossil', weight: 0, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Relic Castle'))},
    ],
    2803000,
    [
        new DungeonTrainer('Psychic',
            [new GymPokemon('Burpmon', 16000000, 23)],
            { weight: 1 }, 'Perry', '(male)'),
        new DungeonBossPokemon('Burpmon', 21000000, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Relic Passage'))}),
    ],
    166500, 25);

dungeonList['Lostlorn Forest'] = new Dungeon('Lostlorn Forest',
    [
        {pokemon: 'Burpmon', options: { weight: 2.67 }},
        {pokemon: 'Burpmon', options: { weight: 2.67 }},
        {pokemon: 'Burpmon', options: { weight: 2.67 }},
        {pokemon: 'Burpmon', options: { weight: 2.67 }},
        {pokemon: 'Burpmon', options: { weight: 2.67 }},
        {pokemon: 'Burpmon', options: { weight: 2.67 }},
        new DungeonTrainer('Pokémon Breeder',
            [
                new GymPokemon('Burpmon', 166500, 24),
                new GymPokemon('Burpmon', 166500, 24),
            ], { weight: 1 }, 'Galen', '(male)'),
        new DungeonTrainer('Pokémon Ranger',
            [new GymPokemon('Burpmon', 166500, 26)],
            { weight: 1 }, 'Serenity', '(female)'),
        new DungeonTrainer('Pokémon Ranger',
            [new GymPokemon('Burpmon', 166500, 26)],
            { weight: 1 }, 'Forrest', '(male)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Burpmon', 166500, 51),
                new GymPokemon('Burpmon', 166500, 51),
                new GymPokemon('Burpmon', 166500, 51),
                new GymPokemon('Burpmon', 166500, 51),
                new GymPokemon('Burpmon', 166500, 51),
            ], { weight: 1 }, 'Murphy', '(male)'),
    ],
    [
        {loot: 'Weather', weight: 4},
        {loot: 'xClick', weight: 3.75},
        {loot: 'Greatball', weight: 3.75},
        {loot: 'Burpmon', weight: 3.5},
        {loot: 'Ultraball', weight: 2},
        {loot: 'Plant_egg', weight: 1},
        {loot: 'Leaf_stone', weight: 0},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(300, GameConstants.getDungeonIndex('Lostlorn Forest'))},
        {loot: 'Burpmon', weight: 0, requirement: new ClearDungeonRequirement(50, GameConstants.getDungeonIndex('Lostlorn Forest'))},
    ],
    3003000,
    [
        new DungeonBossPokemon('Burpmon', 18000000, 100),
        new DungeonBossPokemon('Burpmon', 18000000, 100),
        new DungeonBossPokemon('Burpmon', 19000000, 100),
    ],
    176500, 16);

dungeonList['Chargestone Cave'] = new Dungeon('Chargestone Cave',
    [
        {pokemon: 'Burpmon', options: { weight: 8.8 }},
        {pokemon: 'Burpmon', options: { weight: 8.8 }},
        {pokemon: 'Burpmon', options: { weight: 8.8 }},
        {pokemon: 'Burpmon', options: { weight: 8.8 }},
        {pokemon: 'Burpmon', options: { weight: 8.8 }},
        new DungeonTrainer('Guitarist',
            [new GymPokemon('Burpmon', 186500, 30)],
            { weight: 1 }, 'Anna'),
        new DungeonTrainer('Scientist',
            [new GymPokemon('Burpmon', 186500, 30)],
            { weight: 1 }, 'Ronald', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 186500, 33),
                new GymPokemon('Burpmon', 186500, 33),
                new GymPokemon('Burpmon', 186500, 33),
            ], { weight: 1 }, 'Corky', '(male)'),
        new DungeonTrainer('Pokémon Ranger',
            [new GymPokemon('Burpmon', 186500, 34)],
            { weight: 1 }, 'Louis', '(male)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Burpmon', 186500, 32),
                new GymPokemon('Burpmon', 186500, 32),
            ], { weight: 1 }, 'Otto'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Burpmon', 186500, 33),
                new GymPokemon('Burpmon', 186500, 33),
            ], { weight: 1 }, 'Briana', '(female)'),
        new DungeonTrainer('Doctor',
            [
                new GymPokemon('Burpmon', 186500, 32),
                new GymPokemon('Burpmon', 186500, 32),
            ], { weight: 1 }, 'Kit'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Burpmon', 186500, 32),
                new GymPokemon('Burpmon', 186500, 32),
            ], { weight: 1 }, 'Hackingi', '(female)'),
        new DungeonTrainer('Guitarist',
            [new GymPokemon('Burpmon', 186500, 33)],
            { weight: 1 }, 'Beverly'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Burpmon', 186500, 32),
                new GymPokemon('Burpmon', 186500, 32),
            ], { weight: 1 }, 'Jeremy'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 186500, 33),
                new GymPokemon('Burpmon', 186500, 33),
                new GymPokemon('Burpmon', 186500, 33),
            ], { weight: 1 }, 'Vicki', '(female)'),
    ],
    [
        {loot: 'Lucky_pill', weight: 4},
        {loot: 'Item_magnet', weight: 4},
        {loot: 'Calendar', weight: 3.75},
        {loot: 'Empire Plate', weight: 2.5},
        {loot: 'Revive', weight: 2},
        {loot: 'Star Piece', weight: 1.75},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Electric_egg', weight: 1},
        {loot: 'Thunder_stone', weight: 0},
        {loot: 'Metal_coat', weight: 0},
    ],
    3403000,
    [
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 12000000, 34),
                new GymPokemon('Burpmon', 12000000, 34),
            ], { weight: 1 }, 'Mary', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 12000000, 34),
                new GymPokemon('Burpmon', 12000000, 34),
            ], { weight: 1 }, 'Shaye', '(male)'),
        new DungeonBossPokemon('Burpmon', 22000000, 100),
        new DungeonBossPokemon('Burpmon', 22000000, 100),
    ],
    186500, 6);

dungeonList['Mistralton Cave'] = new Dungeon('Mistralton Cave',
    [
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        new DungeonTrainer('Hiker',
            [new GymPokemon('Burpmon', 196500, 32)],
            { weight: 1 }, 'Shelby'),
        new DungeonTrainer('Hiker',
            [new GymPokemon('Burpmon', 196500, 32)],
            { weight: 1 }, 'Jebediah'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 196500, 33),
                new GymPokemon('Burpmon', 196500, 33),
            ], { weight: 1 }, 'Geoff', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 196500, 33),
                new GymPokemon('Burpmon', 196500, 33),
            ], { weight: 1 }, 'Belle', '(female)'),
    ],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'Greatball', weight: 3.75},
        {loot: 'Nightmare Plate', weight: 2.5},
        {loot: 'Cure Plate', weight: 2.5},
        {loot: 'Simple Plate', weight: 2.5},
        {loot: 'Ultraball', weight: 2},
        {loot: 'Revive', weight: 2},
        {loot: 'Hard Stone', weight: 2},
        {loot: 'Duskball', weight: 2},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Dusk_stone', weight: 0},
    ],
    3603000,
    [
        new DungeonBossPokemon('Burpmon', 23000000, 100),
        new DungeonBossPokemon('Burpmon', 24000000, 100),
        new DungeonBossPokemon('Burpmon', 25000000, 100),
    ],
    196500, 6);

dungeonList['Celestial Tower'] = new Dungeon('Celestial Tower',
    [
        {pokemon: 'Burpmon', options: { weight: 8 }},
        {pokemon: 'Burpmon', options: { weight: 8 }},
        {pokemon: 'Burpmon', options: { weight: 8 }},
        {pokemon: 'Burpmon', options: { weight: 8 }},
        new DungeonTrainer('Psychic',
            [new GymPokemon('Burpmon', 206500, 36)],
            { weight: 1 }, 'Joyce', '(female)'),
        new DungeonTrainer('School Kid',
            [new GymPokemon('Burpmon', 206500, 35)],
            { weight: 1 }, 'Alberta', '(female)'),
        new DungeonTrainer('Pokéfan',
            [new GymPokemon('Burpmon', 206500, 35)],
            { weight: 1 }, 'Jude', '(male)'),
        new DungeonTrainer('Pokéfan',
            [new GymPokemon('Burpmon', 206500, 35)],
            { weight: 1 }, 'Georgia', '(female)'),
        new DungeonTrainer('Psychic',
            [new GymPokemon('Burpmon', 206500, 36)],
            { weight: 1 }, 'Micki', '(male)'),
        new DungeonTrainer('Nurse',
            [new GymPokemon('Burpmon', 206500, 35)],
            { weight: 1 }, 'Dixie'),
        new DungeonTrainer('Socialite',
            [new GymPokemon('Burpmon', 206500, 35)],
            { weight: 1 }, 'Grace'),
        new DungeonTrainer('Gentleman',
            [new GymPokemon('Burpmon', 206500, 35)],
            { weight: 1 }, 'Daniel'),
    ],
    [
        {loot: 'Lucky_pill', weight: 4},
        {loot: 'Intel_floppy', weight: 3.75},
        {loot: 'Nightmare Plate', weight: 2.5},
        {loot: 'Trojan Plate', weight: 2.5},
        {loot: 'Revive', weight: 2},
        {loot: 'LargeRestore', weight: 1.5},
    ],
    3803000,
    [
        new DungeonBossPokemon('Burpmon', 25000000, 100),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Burpmon', 14000000, 35),
                new GymPokemon('Burpmon', 14000000, 35),
            ], { weight: 1 }, 'Bryce', '(male)'),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Burpmon', 14000000, 35),
                new GymPokemon('Burpmon', 14000000, 35),
            ], { weight: 1 }, 'Sarah', '(female)'),
    ],
    206500, 7);

dungeonList['Reversal Mountain'] = new Dungeon('Reversal Mountain',
    [
        {pokemon: 'Burpmon', options: { weight: 5.2 }},
        {pokemon: 'Burpmon', options: { weight: 5.2 }},
        {pokemon: 'Burpmon', options: { weight: 5.2 }},
        {pokemon: 'Burpmon', options: { weight: 5.2 }},
        {pokemon: 'Burpmon', options: { weight: 5.2 }},
        {pokemon: 'Burpmon', options: { weight: 5.2 }},
        {pokemon: 'Burpmon', options: { weight: 5.2 }},
        {pokemon: 'Burpmon', options: { weight: 5.2 }},
        {pokemon: 'Burpmon', options: { weight: 5.2 }},
        {pokemon: 'Burpmon', options: { weight: 5.2 }},
        new DungeonTrainer('Cyclist',
            [new GymPokemon('Burpmon', 226500, 37)],
            { weight: 1 }, 'Jeremiah', '(male)'),
        new DungeonTrainer('Cyclist',
            [new GymPokemon('Burpmon', 226500, 37)],
            { weight: 1 }, 'Adalaide', '(female)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Burpmon', 226500, 37),
                new GymPokemon('Burpmon', 226500, 37),
            ], { weight: 1 }, 'Markus'),
        new DungeonTrainer('Backpacker',
            [
                new GymPokemon('Burpmon', 226500, 37),
                new GymPokemon('Burpmon', 226500, 37),
            ], { weight: 1 }, 'Kiyo', '(male)'),
        new DungeonTrainer('Doctor',
            [new GymPokemon('Burpmon', 226500, 38)],
            { weight: 1 }, 'Derek'),
        new DungeonTrainer('Backpacker',
            [
                new GymPokemon('Burpmon', 226500, 37),
                new GymPokemon('Burpmon', 226500, 37),
            ], { weight: 1 }, 'Kumiko', '(female)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Burpmon', 226500, 37),
                new GymPokemon('Burpmon', 226500, 37),
            ], { weight: 1 }, 'Jared'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 226500, 39),
                new GymPokemon('Burpmon', 226500, 39),
            ], { weight: 1 }, 'Ray', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 226500, 37),
                new GymPokemon('Burpmon', 226500, 37),
            ], { weight: 1 }, 'Cora', '(female)'),
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Burpmon', 226500, 37),
                new GymPokemon('Burpmon', 226500, 37),
                new GymPokemon('Burpmon', 226500, 37),
            ], { weight: 1 }, 'Corey'),
        new DungeonTrainer('Battle Girl',
            [
                new GymPokemon('Burpmon', 226500, 37),
                new GymPokemon('Burpmon', 226500, 37),
                new GymPokemon('Burpmon', 226500, 37),
            ], { weight: 1 }, 'Chan'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Burpmon', 226500, 38),
                new GymPokemon('Burpmon', 226500, 38),
            ], { weight: 1 }, 'Eliza', '(female)'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Burpmon', 226500, 38),
                new GymPokemon('Burpmon', 226500, 38),
            ], { weight: 1 }, 'Lewis', '(male)'),
    ],
    [
        {loot: 'Item_magnet', weight: 4},
        {loot: 'Games', weight: 3.75},
        {loot: 'Ultraball', weight: 3},
        {loot: 'Simple Plate', weight: 2.5},
        {loot: 'Roar Plate', weight: 2.5},
        {loot: 'Revive', weight: 2},
        {loot: 'LargeRestore', weight: 1.75},
        {loot: 'Star Piece', weight: 1.75},
        {loot: 'Fire_egg', weight: 1},
    ],
    4003000,
    [
        new DungeonBossPokemon('Burpmon', 24000000, 100),
        new DungeonBossPokemon('Burpmon', 26000000, 100),
        new DungeonBossPokemon('Burpmon', 30000000, 100, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)}),
    ],
    226500, 14);

dungeonList['Team Plasma Assault'] = new Dungeon('Team Plasma Assault',
    [
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Burpmon', 241500, 44),
                new GymPokemon('Burpmon', 241500, 44),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Burpmon', 241500, 44),
                new GymPokemon('Burpmon', 241500, 44),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Burpmon', 241500, 44),
                new GymPokemon('Burpmon', 241500, 44),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma',
            [
                new GymPokemon('Burpmon', 241500, 46),
                new GymPokemon('Burpmon', 241500, 46),
                new GymPokemon('Burpmon', 241500, 46),
            ], { weight: 1 }, 'Shadow', '(shadow)'),
    ],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'Greatball', weight: 3.75},
        {loot: 'Nightmare Plate', weight: 2.5},
        {loot: 'Guardian Plate', weight: 2.5},
        {loot: 'Ultraball', weight: 2},
    ],
    4603000,
    [
        new DungeonTrainer('Team Plasma',
            [
                new GymPokemon('Burpmon', 11000000, 46),
                new GymPokemon('Burpmon', 11000000, 46),
                new GymPokemon('Burpmon', 12000000, 48),
            ], { weight: 1 }, 'Zinzolin', '(zinzolin)'),
    ],
    241500, 20);

dungeonList['Seaside Cave'] = new Dungeon('Seaside Cave',
    [
        {pokemon: 'Burpmon', options: { weight: 3.5 }},
        {pokemon: 'Burpmon', options: { weight: 3.5 }},
        {pokemon: 'Burpmon', options: { weight: 3.5 }},
        {pokemon: 'Burpmon', options: { weight: 3.5 }},
        {pokemon: 'Burpmon', options: { weight: 3.5 }},
        {pokemon: 'Burpmon', options: { weight: 3.5 }},
        {pokemon: 'Burpmon', options: { weight: 3.5 }},
        {pokemon: 'Burpmon', options: { weight: 3.5 }},
        new DungeonTrainer('Battle Girl',
            [new GymPokemon('Burpmon', 246500, 47)],
            { weight: 1 }, 'Tia'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Burpmon', 246500, 46),
                new GymPokemon('Burpmon', 246500, 46),
            ], { weight: 1 }, 'Johan', '(male)'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Burpmon', 246500, 46),
                new GymPokemon('Burpmon', 246500, 46),
            ], { weight: 1 }, 'Mikiko', '(female)'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Burpmon', 246500, 47)],
            { weight: 1 }, 'Drago'),
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Burpmon', 246500, 44),
                new GymPokemon('Burpmon', 246500, 44),
                new GymPokemon('Burpmon', 246500, 44),
                new GymPokemon('Burpmon', 246500, 44),
            ], { weight: 1 }, 'Rocky'),
        new DungeonTrainer('Battle Girl',
            [new GymPokemon('Burpmon', 246500, 47)],
            { weight: 1 }, 'Maki'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Burpmon', 246500, 47)],
            { weight: 1 }, 'Rich'),
    ],
    [
        {loot: 'Intel_floppy', weight: 4},
        {loot: 'Lucky_pill', weight: 4},
        {loot: 'Games', weight: 3.75},
        {loot: 'Code Plate', weight: 2.5},
        {loot: 'Nature Plate', weight: 2.5},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(300, GameConstants.getDungeonIndex('Seaside Cave'))},
        {loot: 'Heart Scale', weight: 0},
    ],
    4203000,
    [
        new DungeonBossPokemon('Burpmon', 28000000, 100),
        new DungeonBossPokemon('Burpmon', 28000000, 100),
    ],
    246500, 21);

dungeonList['Plasma Frigate'] = new Dungeon('Plasma Frigate',
    [
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Burpmon', 257500, 46),
                new GymPokemon('Burpmon', 257500, 46),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Burpmon', 257500, 46),
                new GymPokemon('Burpmon', 257500, 46),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Burpmon', 257500, 46),
                new GymPokemon('Burpmon', 257500, 46),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Burpmon', 257500, 47)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Burpmon', 257500, 47)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Burpmon', 257500, 47)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Burpmon', 257500, 46),
                new GymPokemon('Burpmon', 257500, 46),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Burpmon', 257500, 45),
                new GymPokemon('Burpmon', 257500, 45),
                new GymPokemon('Burpmon', 257500, 45),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Burpmon', 257500, 46),
                new GymPokemon('Burpmon', 257500, 46),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Burpmon', 257500, 47)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Burpmon', 257500, 46),
                new GymPokemon('Burpmon', 257500, 46),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Burpmon', 257500, 45),
                new GymPokemon('Burpmon', 257500, 45),
                new GymPokemon('Burpmon', 257500, 45),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Burpmon', 257500, 45),
                new GymPokemon('Burpmon', 257500, 45),
                new GymPokemon('Burpmon', 257500, 45),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Burpmon', 257500, 47)],
            { weight: 1 }, undefined, '(female)'),
    ],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Pokeball', weight: 4},
        {loot: 'Simple Plate', weight: 2.5},
        {loot: 'Empire Plate', weight: 2.5},
        {loot: 'Guardian Plate', weight: 2.5},
        {loot: 'Revive', weight: 2},
        {loot: 'Magmarizer', weight: 0},
        {loot: 'Electirizer', weight: 0},
        {loot: 'Max Revive', weight: 0},
    ],
    4603000,
    [
        new DungeonTrainer('Team Plasma',
            [
                new GymPokemon('Burpmon', 12000000, 48),
                new GymPokemon('Burpmon', 12000000, 48),
                new GymPokemon('Burpmon', 13000000, 50),
            ], { weight: 1 }, 'Zinzolin', '(zinzolin)'),
    ],
    257500, 20);

dungeonList['Giant Chasm'] = new Dungeon('Giant Chasm',
    [
        {pokemon: 'Burpmon', options: { weight: 5.33 }},
        {pokemon: 'Burpmon', options: { weight: 5.33 }},
        {pokemon: 'Burpmon', options: { weight: 5.33 }},
        {pokemon: 'Burpmon', options: { weight: 5.33 }},
        {pokemon: 'Burpmon', options: { weight: 5.33 }},
        {pokemon: 'Burpmon', options: { weight: 5.33 }},
        {pokemon: 'Burpmon', options: { weight: 5.33 }},
        {pokemon: 'Burpmon', options: { weight: 5.33 }},
        {pokemon: 'Burpmon', options: { weight: 5.33 }},
        {pokemon: 'Burpmon', options: { weight: 5.33 }},
        {pokemon: 'Burpmon', options: { weight: 5.33 }},
        {pokemon: 'Burpmon', options: { weight: 5.33 }},
        {pokemon: 'Burpmon', options: { weight: 5.33 }},
        {pokemon: 'Burpmon', options: { weight: 5.33 }},
        {pokemon: 'Burpmon', options: { weight: 5.33 }},
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Burpmon', 266500, 46),
                new GymPokemon('Burpmon', 266500, 46),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Burpmon', 266500, 46),
                new GymPokemon('Burpmon', 266500, 46),
                new GymPokemon('Burpmon', 266500, 46),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Burpmon', 266500, 46),
                new GymPokemon('Burpmon', 266500, 46),
                new GymPokemon('Burpmon', 266500, 46),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Burpmon', 266500, 45),
                new GymPokemon('Burpmon', 266500, 45),
                new GymPokemon('Burpmon', 266500, 45),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Burpmon', 266500, 47)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Doctor',
            [new GymPokemon('Burpmon', 266500, 49)],
            { weight: 1 }, 'Julius'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Burpmon', 266500, 47)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Burpmon', 266500, 47)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Burpmon', 266500, 46),
                new GymPokemon('Burpmon', 266500, 46),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Burpmon', 266500, 46),
                new GymPokemon('Burpmon', 266500, 46),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Burpmon', 266500, 47),
                new GymPokemon('Burpmon', 266500, 47),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Burpmon', 266500, 47),
                new GymPokemon('Burpmon', 266500, 47),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Burpmon', 266500, 47)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Burpmon', 266500, 45),
                new GymPokemon('Burpmon', 266500, 45),
                new GymPokemon('Burpmon', 266500, 45),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Burpmon', 266500, 46),
                new GymPokemon('Burpmon', 266500, 46),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma',
            [
                new GymPokemon('Burpmon', 266500, 49),
                new GymPokemon('Burpmon', 266500, 49),
                new GymPokemon('Burpmon', 266500, 51),
            ], { weight: 1 }, 'Zinzolin', '(zinzolin)'),
        new DungeonTrainer('Team Plasma',
            [
                new GymPokemon('Burpmon', 266500, 50),
                new GymPokemon('Burpmon', 266500, 50),
                new GymPokemon('Burpmon', 266500, 50),
                new GymPokemon('Burpmon', 266500, 50),
                new GymPokemon('Burpmon', 266500, 52),
            ], { weight: 1 }, 'Colress', '(colress)'),
        new DungeonTrainer('Team Plasma',
            [
                new GymPokemon('Burpmon', 266500, 49),
                new GymPokemon('Burpmon', 266500, 49),
                new GymPokemon('Burpmon', 266500, 51),
            ], { weight: 1 }, 'Shadow', '(shadow)'),
        new DungeonTrainer('Team Plasma',
            [
                new GymPokemon('Burpmon', 266500, 49),
                new GymPokemon('Burpmon', 266500, 49),
                new GymPokemon('Burpmon', 266500, 51),
            ], { weight: 1 }, 'Shadow', '(shadow)'),
        new DungeonTrainer('Team Plasma',
            [
                new GymPokemon('Burpmon', 266500, 49),
                new GymPokemon('Burpmon', 266500, 49),
                new GymPokemon('Burpmon', 266500, 51),
            ], { weight: 1 }, 'Shadow', '(shadow)'),
    ],
    [
        {loot: 'Lucky_floppy', weight: 4},
        {loot: 'Light', weight: 3.75},
        {loot: 'Burpmon', weight: 3.25},
        {loot: 'Guardian Plate', weight: 2.5},
        {loot: 'Nightmare Plate', weight: 2.25},
        {loot: 'Release Plate', weight: 2.25},
        {loot: 'Ultraball', weight: 2},
        {loot: 'Star Piece', weight: 1.75},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Razor_claw', weight: 0},
        {loot: 'Moon_stone', weight: 0},
        {loot: 'Sun_stone', weight: 0},
    ],
    4403000,
    [
        new DungeonTrainer('Team Plasma',
            [
                new GymPokemon('Burpmon', 6000000, 50),
                new GymPokemon('Burpmon', 6000000, 50),
                new GymPokemon('Burpmon', 6000000, 50),
                new GymPokemon('Burpmon', 6000000, 50),
                new GymPokemon('Burpmon', 6000000, 50),
                new GymPokemon('Burpmon', 6500000, 52),
            ], { weight: 1 }, 'Ghetsis', '(ghetsis)'),
        new DungeonBossPokemon('Burpmon', 30000000, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Giant Chasm'))}),
        new DungeonBossPokemon('Burpmon', 32000000, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Giant Chasm'))}),
        new DungeonBossPokemon('Burpmon', 32000000, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Giant Chasm'))}),
        new DungeonBossPokemon('Burpmon', 35000000, 100, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)}),
    ],
    266500, 22);

dungeonList['Cave of Being'] = new Dungeon('Cave of Being',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'xAttack', weight: 4},
        {loot: 'Lucky_pill', weight: 4},
        {loot: 'Intel_floppy', weight: 4},
        {loot: 'Item_magnet', weight: 4},
        {loot: 'Lucky_floppy', weight: 4},
        {loot: 'Trojan Plate', weight: 2.5},
        {loot: 'Fire_egg', weight: 1},
        {loot: 'Water_egg', weight: 1},
        {loot: 'Plant_egg', weight: 1},
        {loot: 'Electric_egg', weight: 1},
        {loot: 'Earth_egg', weight: 1},
        {loot: 'Wind_egg', weight: 1},
    ],
    4603000,
    [
        new DungeonBossPokemon('Burpmon', 35000000, 100),
        new DungeonBossPokemon('Burpmon', 35000000, 100),
        new DungeonBossPokemon('Burpmon', 35000000, 100),
    ],
    286500, 20);

dungeonList['Abundant Shrine'] = new Dungeon('Abundant Shrine',
    [
        {pokemon: 'Burpmon', options: { weight: 1.45 }},
        {pokemon: 'Burpmon', options: { weight: 1.45 }},
        {pokemon: 'Burpmon', options: { weight: 1.45 }},
        {pokemon: 'Burpmon', options: { weight: 1.45 }},
        {pokemon: 'Burpmon', options: { weight: 1.45 }},
        {pokemon: 'Burpmon', options: { weight: 1.45 }},
        {pokemon: 'Burpmon', options: { weight: 1.45 }},
        {pokemon: 'Burpmon', options: { weight: 1.45 }},
        {pokemon: 'Burpmon', options: { weight: 1.45 }},
        {pokemon: 'Burpmon', options: { weight: 1.45 }},
        {pokemon: 'Burpmon', options: { weight: 1.45 }},
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Burpmon', 306500, 39),
                new GymPokemon('Burpmon', 306500, 39),
            ], { weight: 1 }, 'Wes'),
        new DungeonTrainer('Twins',
            [
                new GymPokemon('Burpmon', 306500, 38),
                new GymPokemon('Burpmon', 306500, 38),
            ], { weight: 1 }, 'Rae & Ula'),
        new DungeonTrainer('Lass',
            [
                new GymPokemon('Burpmon', 306500, 39),
                new GymPokemon('Burpmon', 306500, 39),
            ], { weight: 1 }, 'Lurleen'),
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Burpmon', 306500, 37),
                new GymPokemon('Burpmon', 306500, 37),
                new GymPokemon('Burpmon', 306500, 37),
                new GymPokemon('Burpmon', 306500, 37),
            ], { weight: 1 }, 'Jaye'),
    ],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'Sleep', weight: 3.75},
        {loot: 'Ultraball', weight: 3.5},
        {loot: 'Burpmon', weight: 3.5},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Earth_egg', weight: 1},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Razor_fang', weight: 0},
        {loot: 'Shiny_stone', weight: 0},
    ],
    4803000,
    [
        new DungeonBossPokemon('Burpmon', 38000000, 100),
        new DungeonBossPokemon('Burpmon', 38000000, 100),
        new DungeonBossPokemon('Burpmon', 42000000, 100),
    ],
    306500, 14);

dungeonList['Victory Road Unova'] = new Dungeon('Victory Road Unova',
    [
        {pokemon: 'Burpmon', options: { weight: 6.67 }},
        {pokemon: 'Burpmon', options: { weight: 6.67 }},
        {pokemon: 'Burpmon', options: { weight: 6.67 }},
        {pokemon: 'Burpmon', options: { weight: 6.67 }},
        {pokemon: 'Burpmon', options: { weight: 6.67 }},
        {pokemon: 'Burpmon', options: { weight: 6.67 }},
        {pokemon: 'Burpmon', options: { weight: 6.67 }},
        {pokemon: 'Burpmon', options: { weight: 6.67 }},
        {pokemon: 'Burpmon', options: { weight: 6.67 }},
        {pokemon: 'Burpmon', options: { weight: 6.67 }},
        {pokemon: 'Burpmon', options: { weight: 6.67 }},
        {pokemon: 'Burpmon', options: { weight: 6.67 }},
        {pokemon: 'Burpmon', options: { weight: 6.67 }},
        {pokemon: 'Burpmon', options: { weight: 6.67 }},
        {pokemon: 'Burpmon', options: { weight: 6.67 }},
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 326500, 55),
                new GymPokemon('Burpmon', 326500, 55),
            ], { weight: 1 }, 'Billy', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 326500, 55),
                new GymPokemon('Burpmon', 326500, 55),
            ], { weight: 1 }, 'Jamie', '(female)'),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Burpmon', 326500, 54),
                new GymPokemon('Burpmon', 326500, 54),
            ], { weight: 1 }, 'Alia', '(female)'),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Burpmon', 326500, 54),
                new GymPokemon('Burpmon', 326500, 54),
            ], { weight: 1 }, 'Al', '(male)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Burpmon', 326500, 55),
                new GymPokemon('Burpmon', 326500, 55),
            ], { weight: 1 }, 'Claude', '(male)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Burpmon', 326500, 55),
                new GymPokemon('Burpmon', 326500, 55),
            ], { weight: 1 }, 'Cecile', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 326500, 55),
                new GymPokemon('Burpmon', 326500, 55),
            ], { weight: 1 }, 'Chandra', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 326500, 55),
                new GymPokemon('Burpmon', 326500, 55),
            ], { weight: 1 }, 'Beckett', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 326500, 55),
                new GymPokemon('Burpmon', 326500, 55),
            ], { weight: 1 }, 'Shelly', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Burpmon', 326500, 55),
                new GymPokemon('Burpmon', 326500, 55),
            ], { weight: 1 }, 'Cathy', '(female)'),
        new DungeonTrainer('Doctor',
            [new GymPokemon('Burpmon', 326500, 54)],
            { weight: 1 }, 'Logan'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Burpmon', 326500, 54)],
            { weight: 1 }, 'Mae', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 326500, 55),
                new GymPokemon('Burpmon', 326500, 55),
            ], { weight: 1 }, 'Pierce', '(male)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Burpmon', 326500, 55),
                new GymPokemon('Burpmon', 326500, 55),
            ], { weight: 1 }, 'Burpmonham', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 326500, 55),
                new GymPokemon('Burpmon', 326500, 55),
            ], { weight: 1 }, 'Shanta', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 326500, 55),
                new GymPokemon('Burpmon', 326500, 55),
            ], { weight: 1 }, 'Webster', '(male)'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Burpmon', 326500, 54),
                new GymPokemon('Burpmon', 326500, 54),
            ], { weight: 1 }, 'Eddie', '(male)'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Burpmon', 326500, 54),
                new GymPokemon('Burpmon', 326500, 54),
            ], { weight: 1 }, 'Elle', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Burpmon', 326500, 54),
                new GymPokemon('Burpmon', 326500, 54),
                new GymPokemon('Burpmon', 326500, 54),
            ], { weight: 1 }, 'Hugo', '(male)'),
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Burpmon', 326500, 54),
                new GymPokemon('Burpmon', 326500, 54),
            ], { weight: 1 }, 'Martell'),
        new DungeonTrainer('Battle Girl',
            [
                new GymPokemon('Burpmon', 326500, 54),
                new GymPokemon('Burpmon', 326500, 54),
            ], { weight: 1 }, 'Chalina'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 326500, 55),
                new GymPokemon('Burpmon', 326500, 55),
            ], { weight: 1 }, 'Elmer', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 326500, 55),
                new GymPokemon('Burpmon', 326500, 55),
            ], { weight: 1 }, 'Caroll', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Burpmon', 326500, 54),
                new GymPokemon('Burpmon', 326500, 54),
                new GymPokemon('Burpmon', 326500, 54),
            ], { weight: 1 }, 'Portia', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Burpmon', 326500, 54),
                new GymPokemon('Burpmon', 326500, 54),
                new GymPokemon('Burpmon', 326500, 54),
            ], { weight: 1 }, 'Sterling', '(male)'),
    ],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'xAttack', weight: 4},
        {loot: 'Burpmon', weight: 3.25},
        {loot: 'Ultraball', weight: 2},
        {loot: 'Star Piece', weight: 1.75},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Dusk_stone', weight: 0},
        {loot: 'Dragon_scale', weight: 0},
        {loot: 'Max Revive', weight: 0},
    ],
    5003000,
    [
        new DungeonBossPokemon('Burpmon', 44000000, 100),
        new DungeonBossPokemon('Burpmon', 45000000, 100),
        new DungeonBossPokemon('Burpmon', 45000000, 100),
        new DungeonBossPokemon('Burpmon', 44000000, 100),
    ],
    326500, 23);

dungeonList['Twist Mountain'] = new Dungeon('Twist Mountain',
    [
        {pokemon: 'Burpmon', options: { weight: 10.4 }},
        {pokemon: 'Burpmon', options: { weight: 10.4 }},
        {pokemon: 'Burpmon', options: { weight: 10.4 }},
        {pokemon: 'Burpmon', options: { weight: 10.4 }},
        {pokemon: 'Burpmon', options: { weight: 10.4 }},
        new DungeonTrainer('Worker',
            [
                new GymPokemon('Burpmon', 356500, 60),
                new GymPokemon('Burpmon', 356500, 60),
                new GymPokemon('Burpmon', 356500, 60),
            ], { weight: 1 }, 'Cairn'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Burpmon', 356500, 64),
                new GymPokemon('Burpmon', 356500, 64),
                new GymPokemon('Burpmon', 356500, 64),
            ], { weight: 1 }, 'Carter', '(male)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Burpmon', 356500, 63),
                new GymPokemon('Burpmon', 356500, 63),
                new GymPokemon('Burpmon', 356500, 63),
                new GymPokemon('Burpmon', 356500, 63),
            ], { weight: 1 }, 'Julia', '(female)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Burpmon', 356500, 61),
                new GymPokemon('Burpmon', 356500, 61),
            ], { weight: 1 }, 'Wade'),
        new DungeonTrainer('Worker',
            [
                new GymPokemon('Burpmon', 356500, 60),
                new GymPokemon('Burpmon', 356500, 60),
                new GymPokemon('Burpmon', 356500, 60),
            ], { weight: 1 }, 'Gus'),
        new DungeonTrainer('Worker',
            [
                new GymPokemon('Burpmon', 356500, 61),
                new GymPokemon('Burpmon', 356500, 61),
            ], { weight: 1 }, 'Patton', '(ice)'),
        new DungeonTrainer('Nurse',
            [new GymPokemon('Burpmon', 356500, 62)],
            { weight: 1 }, 'Carol'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Burpmon', 356500, 64),
                new GymPokemon('Burpmon', 356500, 64),
                new GymPokemon('Burpmon', 356500, 64),
            ], { weight: 1 }, 'Chloris', '(female)'),
        new DungeonTrainer('Worker',
            [new GymPokemon('Burpmon', 356500, 62)],
            { weight: 1 }, 'Cliff'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Burpmon', 356500, 61),
                new GymPokemon('Burpmon', 356500, 61),
            ], { weight: 1 }, 'Hunter'),
        new DungeonTrainer('Worker',
            [
                new GymPokemon('Burpmon', 356500, 61),
                new GymPokemon('Burpmon', 356500, 61),
            ], { weight: 1 }, 'Victor', '(ice)'),
        new DungeonTrainer('Worker',
            [
                new GymPokemon('Burpmon', 356500, 60),
                new GymPokemon('Burpmon', 356500, 60),
                new GymPokemon('Burpmon', 356500, 60),
            ], { weight: 1 }, 'Ryan', '(ice)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Burpmon', 356500, 63),
                new GymPokemon('Burpmon', 356500, 63),
                new GymPokemon('Burpmon', 356500, 63),
                new GymPokemon('Burpmon', 356500, 63),
            ], { weight: 1 }, 'Zach', '(male)'),
    ],
    [
        {loot: 'Intel_floppy', weight: 4},
        {loot: 'Lucky_floppy', weight: 4},
        {loot: 'Greatball', weight: 3.75},
        {loot: 'Revive', weight: 2},
        {loot: 'Ultraball', weight: 2},
        {loot: 'Duskball', weight: 2},
        {loot: 'Rare Bone', weight: 1.75},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Hono Fossil', weight: 0},
        {loot: 'Hikari Fossil', weight: 0},
        {loot: 'Gold Digizoid', weight: 0},
        {loot: 'Tsuchi Fossil', weight: 0},
        {loot: 'Kori Fossil', weight: 0},
        {loot: 'Kaze Fossil', weight: 0},
        {loot: 'Hagane Fossil', weight: 0},
        {loot: 'Moon_stone', weight: 0},
        {loot: 'Dusk_stone', weight: 0},
        {loot: 'Metal_coat', weight: 0},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(300, GameConstants.getDungeonIndex('Twist Mountain'))},
    ],
    5203000,
    [
        new DungeonBossPokemon('Burpmon', 48000000, 100),
        new DungeonBossPokemon('Burpmon', 48000000, 100),
        new DungeonBossPokemon('Burpmon', 48000000, 100),
        new DungeonBossPokemon('Burpmon', 50000000, 100),
    ],
    356500, 7);

dungeonList['Dragonspiral Tower'] = new Dungeon('Dragonspiral Tower',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Security', weight: 3.5},
        {loot: 'Light', weight: 3.5},
        {loot: 'Nightmare Plate', weight: 2.5},
        {loot: 'Empire Plate', weight: 2.5},
        {loot: 'Roar Plate', weight: 2.5},
        {loot: 'Guardian Plate', weight: 2},
        {loot: 'Nightmare Plate', weight: 2},
        {loot: 'Deep Plate', weight: 2},
        {loot: 'Simple Plate', weight: 2},
        {loot: 'Star Piece', weight: 1.75},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Electric_egg', weight: 1},
        {loot: 'Fire_egg', weight: 1},
        {loot: 'Shiny_stone', weight: 0},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(300, GameConstants.getDungeonIndex('Dragonspiral Tower'))},
        {loot: 'Heart Scale', weight: 0},
    ],
    5203000,
    [
        new DungeonBossPokemon('Burpmon', 48000000, 100),
        new DungeonBossPokemon('Burpmon', 48000000, 100),
        new DungeonBossPokemon('Burpmon', 50000000, 100),
    ],
    356500, 7);

dungeonList['Moor of Icirrus'] = new Dungeon('Moor of Icirrus',
    [
        {pokemon: 'Burpmon', options: { weight: 2.67 }},
        {pokemon: 'Burpmon', options: { weight: 2.67 }},
        {pokemon: 'Burpmon', options: { weight: 2.67 }},
        {pokemon: 'Burpmon', options: { weight: 2.67 }},
        {pokemon: 'Burpmon', options: { weight: 2.67 }},
        {pokemon: 'Burpmon', options: { weight: 2.67 }},
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Burpmon', 356500, 62),
                new GymPokemon('Burpmon', 356500, 62),
                new GymPokemon('Burpmon', 356500, 62),
            ], { weight: 1 }, 'Elaine', '(female)'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Burpmon', 356500, 62),
                new GymPokemon('Burpmon', 356500, 62),
                new GymPokemon('Burpmon', 356500, 62),
            ], { weight: 1 }, 'Parker', '(male)'),
        new DungeonTrainer('Fisherman',
            [
                new GymPokemon('Burpmon', 356500, 60),
                new GymPokemon('Burpmon', 356500, 60),
                new GymPokemon('Burpmon', 356500, 60),
            ], { weight: 1 }, 'Eustace'),
        new DungeonTrainer('Fisherman',
            [
                new GymPokemon('Burpmon', 356500, 60),
                new GymPokemon('Burpmon', 356500, 60),
                new GymPokemon('Burpmon', 356500, 60),
            ], { weight: 1 }, 'Arnold'),
    ],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Lucky_pill', weight: 4},
        {loot: 'Greatball', weight: 3},
        {loot: 'Ultraball', weight: 2},
        {loot: 'Revive', weight: 2},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Hacking', weight: 0, requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Moor of Icirrus'))},
        {loot: 'Heart Scale', weight: 0},
        {loot: 'Dawn_stone', weight: 0},
    ],
    5203000,
    [
        new DungeonBossPokemon('Burpmon', 50000000, 100),
        new DungeonBossPokemon('Burpmon', 48000000, 100),
        new DungeonBossPokemon('Burpmon', 48000000, 100),
    ],
    356500, 8);

dungeonList['Pledge Grove'] = new Dungeon('Pledge Grove',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Lucky_pill', weight: 3.75},
        {loot: 'Ultraball', weight: 3.5},
        {loot: 'Deep Plate', weight: 2.5},
        {loot: 'Cure Plate', weight: 2.5},
        {loot: 'Fire_stone', weight: 0},
        {loot: 'Water_stone', weight: 0},
        {loot: 'Leaf_stone', weight: 0},
        {loot: 'Thunder_stone', weight: 0},
        {loot: 'Trade_stone', weight: 0},
        {loot: 'Sun_stone', weight: 0},
        {loot: 'Soothe_bell', weight: 0},
    ],
    5203000,
    [new DungeonBossPokemon('Burpmon', 52000000, 100)],
    356500, 8);

dungeonList['Pinwheel Forest'] = new Dungeon('Pinwheel Forest',
    [
        {pokemon: 'Burpmon', options: { weight: 6.57 }},
        {pokemon: 'Burpmon', options: { weight: 6.57 }},
        {pokemon: 'Burpmon', options: { weight: 6.57 }},
        {pokemon: 'Burpmon', options: { weight: 6.57 }},
        {pokemon: 'Burpmon', options: { weight: 6.57 }},
        {pokemon: 'Burpmon', options: { weight: 6.57 }},
        {pokemon: 'Burpmon', options: { weight: 6.57 }},
        {pokemon: 'Burpmon', options: { weight: 6.57 }},
        {pokemon: 'Burpmon', options: { weight: 6.57 }},
        {pokemon: 'Burpmon', options: { weight: 6.57 }},
        {pokemon: 'Burpmon', options: { weight: 6.57 }},
        {pokemon: 'Burpmon', options: { weight: 6.57 }},
        {pokemon: 'Burpmon', options: { weight: 6.57 }},
        {pokemon: 'Burpmon', options: { weight: 6.57 }},
        new DungeonTrainer('Preschooler',
            [
                new GymPokemon('Burpmon', 356500, 60),
                new GymPokemon('Burpmon', 356500, 60),
            ], { weight: 1 }, 'Jojo', '(male)'),
        new DungeonTrainer('Nursery Aide',
            [
                new GymPokemon('Burpmon', 356500, 61),
                new GymPokemon('Burpmon', 356500, 61),
            ], { weight: 1 }, 'Ethel'),
        new DungeonTrainer('Preschooler',
            [
                new GymPokemon('Burpmon', 356500, 59),
                new GymPokemon('Burpmon', 356500, 59),
                new GymPokemon('Burpmon', 356500, 59),
            ], { weight: 1 }, 'Samantha', '(female)'),
        new DungeonTrainer('Preschooler',
            [
                new GymPokemon('Burpmon', 356500, 59),
                new GymPokemon('Burpmon', 356500, 59),
                new GymPokemon('Burpmon', 356500, 59),
            ], { weight: 1 }, 'José', '(male)'),
        new DungeonTrainer('Twins',
            [
                new GymPokemon('Burpmon', 356500, 60),
                new GymPokemon('Burpmon', 356500, 60),
            ], { weight: 1 }, 'Ally & Amy'),
        new DungeonTrainer('Nursery Aide',
            [
                new GymPokemon('Burpmon', 356500, 61),
                new GymPokemon('Burpmon', 356500, 61),
            ], { weight: 1 }, 'Rosalyn'),
        new DungeonTrainer('Preschooler',
            [
                new GymPokemon('Burpmon', 356500, 60),
                new GymPokemon('Burpmon', 356500, 60),
            ], { weight: 1 }, 'Ike', '(male)'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Burpmon', 356500, 62),
                new GymPokemon('Burpmon', 356500, 62),
                new GymPokemon('Burpmon', 356500, 62),
            ], { weight: 1 }, 'Hillary', '(female)'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Burpmon', 356500, 62),
                new GymPokemon('Burpmon', 356500, 62),
                new GymPokemon('Burpmon', 356500, 62),
            ], { weight: 1 }, 'Dwayne', '(male)'),
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Burpmon', 356500, 60),
                new GymPokemon('Burpmon', 356500, 60),
                new GymPokemon('Burpmon', 356500, 60),
            ], { weight: 1 }, 'Keita'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Burpmon', 356500, 62),
                new GymPokemon('Burpmon', 356500, 62),
                new GymPokemon('Burpmon', 356500, 62),
            ], { weight: 1 }, 'Ralph', '(male)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Burpmon', 356500, 64),
                new GymPokemon('Burpmon', 356500, 64),
                new GymPokemon('Burpmon', 356500, 64),
            ], { weight: 1 }, 'Rosaline', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Burpmon', 356500, 64),
                new GymPokemon('Burpmon', 356500, 64),
                new GymPokemon('Burpmon', 356500, 64),
            ], { weight: 1 }, 'Sinan', '(male)'),
        new DungeonTrainer('Lass',
            [
                new GymPokemon('Burpmon', 356500, 60),
                new GymPokemon('Burpmon', 356500, 60),
                new GymPokemon('Burpmon', 356500, 60),
            ], { weight: 1 }, 'Helia'),
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Burpmon', 356500, 60),
                new GymPokemon('Burpmon', 356500, 60),
                new GymPokemon('Burpmon', 356500, 60),
            ], { weight: 1 }, 'Henley'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Burpmon', 356500, 62),
                new GymPokemon('Burpmon', 356500, 62),
                new GymPokemon('Burpmon', 356500, 62),
            ], { weight: 1 }, 'Melita', '(female)'),
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Burpmon', 356500, 60),
                new GymPokemon('Burpmon', 356500, 60),
                new GymPokemon('Burpmon', 356500, 60),
            ], { weight: 1 }, 'Nicholas'),
        new DungeonTrainer('School Kid',
            [
                new GymPokemon('Burpmon', 356500, 60),
                new GymPokemon('Burpmon', 356500, 60),
                new GymPokemon('Burpmon', 356500, 60),
            ], { weight: 1 }, 'Millie', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 356500, 63),
                new GymPokemon('Burpmon', 356500, 63),
                new GymPokemon('Burpmon', 356500, 63),
            ], { weight: 1 }, 'Kelsey', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 356500, 63),
                new GymPokemon('Burpmon', 356500, 63),
                new GymPokemon('Burpmon', 356500, 63),
            ], { weight: 1 }, 'Kathrine', '(female)'),
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Burpmon', 356500, 61),
                new GymPokemon('Burpmon', 356500, 61),
                new GymPokemon('Burpmon', 356500, 61),
            ], { weight: 1 }, 'Kentaro'),
        new DungeonTrainer('Battle Girl',
            [
                new GymPokemon('Burpmon', 356500, 61),
                new GymPokemon('Burpmon', 356500, 61),
                new GymPokemon('Burpmon', 356500, 61),
            ], { weight: 1 }, 'Lee'),
        new DungeonTrainer('School Kid',
            [
                new GymPokemon('Burpmon', 356500, 60),
                new GymPokemon('Burpmon', 356500, 60),
                new GymPokemon('Burpmon', 356500, 60),
            ], { weight: 1 }, 'Keston', '(male)'),
    ],
    [
        {loot: 'Security', weight: 4},
        {loot: 'Health', weight: 4},
        {loot: 'Finance', weight: 4},
        {loot: 'Burpmon', weight: 3.5},
        {loot: 'Greatball', weight: 3.5},
        {loot: 'Jungle Plate', weight: 2.5},
        {loot: 'Cure Plate', weight: 2.5},
        {loot: 'Ultraball', weight: 2},
        {loot: 'MediumRestore', weight: 1.75},
        {loot: 'Star Piece', weight: 1.75},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Moon_stone', weight: 0},
        {loot: 'Upgrade', weight: 0},
        {loot: 'Sun_stone', weight: 0},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Protein', weight: 0},
        {loot: 'Hacking', weight: 0, requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Pinwheel Forest'))},
    ],
    5203000,
    [
        new DungeonBossPokemon('Burpmon', 48000000, 100),
        new DungeonBossPokemon('Burpmon', 48000000, 100),
        new DungeonBossPokemon('Burpmon', 48000000, 100),
    ],
    356500, 3);

dungeonList['Dreamyard'] = new Dungeon('Dreamyard',
    [
        {pokemon: 'Burpmon', options: { weight: 4.67 }},
        {pokemon: 'Burpmon', options: { weight: 4.67 }},
        {pokemon: 'Burpmon', options: { weight: 4.67 }},
        {pokemon: 'Burpmon', options: { weight: 4.67 }},
        {pokemon: 'Burpmon', options: { weight: 4.67 }},
        {pokemon: 'Burpmon', options: { weight: 4.67 }},
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Burpmon', 356500, 62),
                new GymPokemon('Burpmon', 356500, 62),
            ], { weight: 1 }, 'Nandor', '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Burpmon', 356500, 63),
                new GymPokemon('Burpmon', 356500, 63),
            ], { weight: 1 }, 'Athena', '(female)'),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Burpmon', 356500, 62),
                new GymPokemon('Burpmon', 356500, 62),
            ], { weight: 1 }, 'Olesia', '(female)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Burpmon', 356500, 63),
                new GymPokemon('Burpmon', 356500, 63),
            ], { weight: 1 }, 'Franklin', '(male)'),
        new DungeonTrainer('School Kid',
            [
                new GymPokemon('Burpmon', 356500, 63),
                new GymPokemon('Burpmon', 356500, 63),
            ], { weight: 1 }, 'William', '(male)'),
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Burpmon', 356500, 63),
                new GymPokemon('Burpmon', 356500, 63),
            ], { weight: 1 }, 'Keita'),
        new DungeonTrainer('School Kid',
            [
                new GymPokemon('Burpmon', 356500, 63),
                new GymPokemon('Burpmon', 356500, 63),
            ], { weight: 1 }, 'Rita', '(female)'),
    ],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'Pokeball', weight: 4},
        {loot: 'Trojan Plate', weight: 2.75},
        {loot: 'Nightmare Plate', weight: 2.5},
        {loot: 'SmallRestore', weight: 2},
        {loot: 'Ultraball', weight: 2},
        {loot: 'Revive', weight: 2},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Reaper_cloth', weight: 0},
        {loot: 'Moon_stone', weight: 0},
        {loot: 'Dawn_stone', weight: 0},
    ],
    5203000,
    [
        new DungeonBossPokemon('Burpmon', 48000000, 100),
        new DungeonBossPokemon('Burpmon', 48000000, 100),
        new DungeonBossPokemon('Burpmon', 48000000, 100),
        new DungeonBossPokemon('Burpmon', 48000000, 100),
    ],
    356500, 3);

dungeonList['P2 Laboratory'] = new Dungeon('P2 Laboratory',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'xAttack', weight: 3.5},
        {loot: 'Intel_floppy', weight: 3.5},
        {loot: 'Burpmon', weight: 3.25},
        {loot: 'Simple Plate', weight: 2.75},
        {loot: 'Code Plate', weight: 2.75},
        {loot: 'Empire Plate', weight: 2.5},
        {loot: 'Revive', weight: 2},
        {loot: 'Dubious_disc', weight: 0},
    ],
    5403000,
    [
        new DungeonBossPokemon('Burpmon', 58000000, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('P2 Laboratory'))}),
        new DungeonBossPokemon('Burpmon', 62000000, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('P2 Laboratory'))}),
        new DungeonBossPokemon('Burpmon', 62000000, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('P2 Laboratory'))}),
        new DungeonBossPokemon('Burpmon', 62000000, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('P2 Laboratory'))}),
        new DungeonBossPokemon('Burpmon', 62000000, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('P2 Laboratory'))}),
        new DungeonBossPokemon('Burpmon', 58000000, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('P2 Laboratory'))}),
        new DungeonBossPokemon('Burpmon', 62000000, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('P2 Laboratory'))}),
        new DungeonTrainer('Team Plasma',
            [
                new GymPokemon('Burpmon', 10000000, 72),
                new GymPokemon('Burpmon', 10000000, 72),
                new GymPokemon('Burpmon', 10000000, 72),
                new GymPokemon('Burpmon', 10000000, 72),
                new GymPokemon('Burpmon', 10000000, 72),
                new GymPokemon('Burpmon', 11000000, 74),
            ], { weight: 1 }, 'Colress', '(colress)'),
    ],
    396500, 18);

// Kalos
// TODO: Balancing of dungeon Pokemon HP & rewards.
dungeonList['Santalune Forest'] = new Dungeon('Santalune Forest',
    [
        {pokemon: 'Burpmon', options: { weight: 0.88 }},
        {pokemon: 'Burpmon', options: { weight: 0.88 }},
        {pokemon: 'Burpmon', options: { weight: 0.88 }},
        {pokemon: 'Burpmon', options: { weight: 0.88}},
        {pokemon: 'Burpmon', options: { weight: 0.88 }},
        {pokemon: 'Burpmon', options: { weight: 0.88 }},
        {pokemon: 'Burpmon', options: { weight: 0.88 }},
        {pokemon: 'Burpmon', options: { weight: 0.88 }},
        {pokemon: 'Burpmon', options: { weight: 0.88 }},
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Burpmon', 5803000, 3),
                new GymPokemon('Burpmon', 5803000, 3),
            ], { weight: 1 }, 'Joey'),
        new DungeonTrainer('Lass',
            [new GymPokemon('Burpmon', 5803000, 5)],
            { weight: 1 }, 'Anna'),
    ],
    [

        {loot: 'Pokeball', weight: 4},
        {loot: 'Lucky_floppy', weight: 3.75},
        {loot: 'Code Plate', weight: 2.75},
        {loot: 'Cure Plate', weight: 2.5},
        {loot: 'SmallRestore', weight: 2},
        {loot: 'Earth_egg', weight: 1},
    ],
    5803020,
    [
        new DungeonTrainer('Lass',
            [
                new GymPokemon('Burpmon', 24303000, 2),
                new GymPokemon('Burpmon', 27303000, 4),
            ], { weight: 1 }, 'Lise'),
        new DungeonBossPokemon('Burpmon', 51738600, 4),
    ],
    400000, 2
);

dungeonList['Parfum Palace'] = new Dungeon('Parfum Palace',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [
        {loot: 'Chat', weight: 4},
        {loot: 'Lucky_floppy', weight: 4},
        {loot: 'xAttack', weight: 4},
        {loot: 'Revive', weight: 2},
        {loot: 'MediumRestore', weight: 1.75},
    ],
    6303405,
    [new DungeonBossPokemon('Burpmon', 56375930, 50)],
    445000, 6);

dungeonList['Connecting Cave'] = new Dungeon('Connecting Cave',
    [
        {pokemon: 'Burpmon', options: { weight: 1.33 }},
        {pokemon: 'Burpmon', options: { weight: 1.33 }},
        {pokemon: 'Burpmon', options: { weight: 1.33 }},
    ],
    [
        {loot: 'Item_magnet', weight: 4},
        {loot: 'Pokeball', weight: 3.75},
        {loot: 'Health', weight: 3},
        {loot: 'Jungle Plate', weight: 2.75},
        {loot: 'Guardian Plate', weight: 2.75},
        {loot: 'Hard Stone', weight: 2},
        {loot: 'Rage Digizoid', weight: 2},
    ],
    6503370,
    [
        new DungeonTrainer('Pokémon Breeder',
            [
                new GymPokemon('Burpmon', 13374965, 12),
                new GymPokemon('Burpmon', 14465837, 12),
                new GymPokemon('Burpmon', 17438602, 12),
                new GymPokemon('Burpmon', 19365784, 12),
            ],
            { weight: 1 }, 'Mercy', '(female)'),
        new DungeonBossPokemon('Burpmon', 59867590, 20),
    ],
    475000, 7);

dungeonList['Glittering Cave'] = new Dungeon('Glittering Cave',
    [
        {pokemon: 'Burpmon', options: { weight: .88 }},
        {pokemon: 'Burpmon', options: { weight: .88 }},
        {pokemon: 'Burpmon', options: { weight: .88 }},
        {pokemon: 'Burpmon', options: { weight: .88 }},
        {pokemon: 'Burpmon', options: { weight: .88 }},
        new DungeonTrainer('Team Flare Grunt',
            [
                new GymPokemon('Burpmon', 7037592, 18),
                new GymPokemon('Burpmon', 7037592, 18),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Grunt',
            [
                new GymPokemon('Burpmon', 7037592, 18),
                new GymPokemon('Burpmon', 7037592, 18),
            ], { weight: 1 }, undefined, '(female)'),
    ],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'xAttack', weight: 4},
        {loot: 'Hard Stone', weight: 2},
        {loot: 'Revive', weight: 2},
        {loot: 'Gold Digizoid', weight: 0.5},
        {loot: 'Kaze Fossil', weight: 0.5},
        {loot: 'Hagane Fossil', weight: 0.5},
        {loot: 'Hikari Fossil', weight: 0.5},
        {loot: 'Hono Fossil', weight: 0.5},
        {loot: 'Mizu Fossil', weight: 0.5},
        {loot: 'Ikazuchi Fossil', weight: 0.5},
        {loot: 'Kori Fossil', weight: 0.5},
        {loot: 'Tsuchi Fossil', weight: 0.5},
        {loot: 'Yami Fossil', weight: 0, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Glittering Cave'))},
        {loot: 'Ki Fossil', weight: 0, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Glittering Cave'))},
    ],
    7037500,
    [
        new DungeonTrainer('Team Flare Grunt Duo',
            [
                new GymPokemon('Burpmon', 33084827, 20),
                new GymPokemon('Burpmon', 31937395, 20),
            ], { weight: 1 }, undefined),
        new DungeonBossPokemon('Burpmon', 63749659, 20),
        new DungeonBossPokemon('Burpmon', 61285398, 20),
    ],
    505000, 9);

dungeonList['Reflection Cave'] = new Dungeon('Reflection Cave',
    [
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Burpmon', 7353000, 26)],
            { weight: 1 }, 'Lane', '(male)'),
        new DungeonTrainer('Battle Girl',
            [
                new GymPokemon('Burpmon', 7353000, 25),
                new GymPokemon('Burpmon', 7353000, 26),
            ], { weight: 1 }, 'Hedvig'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Burpmon', 7353000, 23),
                new GymPokemon('Burpmon', 7353000, 23),
                new GymPokemon('Burpmon', 7353000, 24),
            ], { weight: 1 }, 'Dunstan'),
        new DungeonTrainer('Tourist',
            [new GymPokemon('Burpmon', 7353000, 26)],
            { weight: 1 }, 'Monami', '(female)'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Burpmon', 7353000, 28)],
            { weight: 1 }, 'Igor'),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Burpmon', 7353000, 24),
                new GymPokemon('Burpmon', 7353000, 24),
            ], { weight: 1 }, 'Franz', '(male)'),
        new DungeonTrainer('Tourist',
            [new GymPokemon('Burpmon', 7353000, 26)],
            { weight: 1 }, 'Haruto', '(male)'),
        new DungeonTrainer('Honeymooners',
            [
                new GymPokemon('Burpmon', 7353000, 26),
                new GymPokemon('Burpmon', 7353000, 26),
            ], { weight: 1 }, 'Yuu & Ami'),
    ],
    [
        {loot: 'Intel_floppy', weight: 4},
        {loot: 'Lucky_pill', weight: 4},
        {loot: 'Cure Plate', weight: 2.75},
        {loot: 'Nature Plate', weight: 2.75},
        {loot: 'Trojan Plate', weight: 2.75},
        {loot: 'Revive', weight: 2},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Moon_stone', weight: 0},
    ],
    7353000,
    [
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 33468400, 26),
                new GymPokemon('Burpmon', 37474200, 25),
            ], { weight: 1 }, 'Emil', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 20365400, 24),
                new GymPokemon('Burpmon', 23366400, 24),
                new GymPokemon('Burpmon', 25476400, 25),
            ], { weight: 1 }, 'Monique', '(female)'),
        new DungeonBossPokemon('Burpmon', 69694200, 100, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)}),
    ],
    555000, 11);

//Tower of Mastery?

dungeonList['Kalos Power Plant'] = new Dungeon('Kalos Power Plant',
    [
        new DungeonTrainer('Team Flare Grunt',
            [
                new GymPokemon('Burpmon', 7903570, 32),
                new GymPokemon('Burpmon', 7903570, 32),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Grunt',
            [
                new GymPokemon('Burpmon', 7903570, 32),
                new GymPokemon('Burpmon', 7903570, 32),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Grunt',
            [new GymPokemon('Burpmon', 7903570, 34)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Grunt',
            [
                new GymPokemon('Burpmon', 7903570, 32),
                new GymPokemon('Burpmon', 7903570, 32),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Grunt',
            [
                new GymPokemon('Burpmon', 7903570, 33),
                new GymPokemon('Burpmon', 7903570, 31),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Grunt',
            [
                new GymPokemon('Burpmon', 7903570, 31),
                new GymPokemon('Burpmon', 7903570, 31),
                new GymPokemon('Burpmon', 7903570, 31),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Grunt',
            [new GymPokemon('Burpmon', 7903570, 34)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Grunt',
            [
                new GymPokemon('Burpmon', 7903570, 31),
                new GymPokemon('Burpmon', 7903570, 33),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Admin',
            [new GymPokemon('Burpmon', 7903570, 36)],
            { weight: 8 }, undefined, '(male)'),
    ],
    [
        {loot: 'Item_magnet', weight: 4},
        {loot: 'xAttack', weight: 4},
        {loot: 'Empire Plate', weight: 2.75},
        {loot: 'Release Plate', weight: 2.5},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Thunder_stone', weight: 0},
    ],
    7903570,
    [
        new DungeonTrainer('Team Flare Aliana',
            [new GymPokemon('Burpmon', 75384400, 38)], { weight: 1 }),
        new DungeonBossPokemon('Burpmon', 83945700, 100,
            {
                requirement: new MultiRequirement([
                    new ClearDungeonRequirement(5, GameConstants.getDungeonIndex('Kalos Power Plant')),
                    new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion),
                ])}),
    ],
    575000, 13);

dungeonList['Sea Spirit\'s Den'] = new Dungeon('Sea Spirit\'s Den',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'Step', weight: 3.75},
        {loot: 'Roar Plate', weight: 2.75},
        {loot: 'Guardian Plate', weight: 2.75},
        {loot: 'Guardian Plate', weight: 2.75},
        {loot: 'Empire Plate', weight: 2.75},
        {loot: 'Trojan Plate', weight: 2.75},
        {loot: 'Hard Stone', weight: 2},
        {loot: 'Rage Digizoid', weight: 2},
        {loot: 'Fire_egg', weight: 1},
        {loot: 'Electric_egg', weight: 1},
    ],
    7543000,
    [new DungeonBossPokemon('Burpmon', 92375000, 100)],
    600000, 23);

dungeonList['Pokéball Factory'] = new Dungeon('Pokéball Factory',
    [
        new DungeonTrainer('Team Flare Grunt',
            [new GymPokemon('Burpmon', 8173950, 37)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Grunt',
            [
                new GymPokemon('Burpmon', 8173950, 36),
                new GymPokemon('Burpmon', 8173950, 36),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Grunt',
            [
                new GymPokemon('Burpmon', 8173950, 36),
                new GymPokemon('Burpmon', 8173950, 36),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Grunt',
            [new GymPokemon('Burpmon', 8173950, 37)], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Admin',
            [
                new GymPokemon('Burpmon', 8173950, 37),
                new GymPokemon('Burpmon', 8173950, 38),
            ],
            { weight: 4 }, undefined, '(female)'),
    ],
    [
        {loot: 'Pokeball', weight: 4},
        {loot: 'Greatball', weight: 3.5},
        {loot: 'Ultraball', weight: 2.5},
        {loot: 'Duskball', weight: 2},
        {loot: 'Quickball', weight: 2},
        {loot: 'Fastball', weight: 2},
        {loot: 'Timerball', weight: 2},
        {loot: 'Luxuryball', weight: 2},
    ],
    8173950,
    [
        new DungeonTrainer('Team Flare Celosia',
            [new GymPokemon('Burpmon', 79385030, 41)],
            { weight: 1 }),
        new DungeonTrainer('Team Flare Bryony',
            [new GymPokemon('Burpmon', 79284730, 41)],
            { weight: 1 }),
    ],
    615000, 14);

dungeonList['Lost Hotel'] = new Dungeon('Lost Hotel',
    [
        {pokemon: 'Burpmon', options: { weight: 2.6 }},
        {pokemon: 'Burpmon', options: { weight: 2.6 }},
        {pokemon: 'Burpmon', options: { weight: 2.6 }},
        {pokemon: 'Burpmon', options: { weight: 2.6 }},
        {pokemon: 'Burpmon', options: { weight: 2.6 }},
        new DungeonTrainer('Punk Guy',
            [
                new GymPokemon('Burpmon', 8375300, 39),
                new GymPokemon('Burpmon', 8375300, 39),
                new GymPokemon('Burpmon', 8375300, 39),
            ],
            { weight: 1 }, 'Sid'),
        new DungeonTrainer('Punk Guy',
            [
                new GymPokemon('Burpmon', 8375300, 40),
                new GymPokemon('Burpmon', 8375300, 40),
            ], { weight: 1 }, 'Jacques'),
        new DungeonTrainer('Punk Guy',
            [new GymPokemon('Burpmon', 8375300, 42)],
            { weight: 1 }, 'Slater'),
        new DungeonTrainer('Punk Girl',
            [
                new GymPokemon('Burpmon', 8375300, 40),
                new GymPokemon('Burpmon', 8375300, 40),
            ],
            { weight: 1 }, 'Jeanne'),
        new DungeonTrainer('Punk Girl',
            [
                new GymPokemon('Burpmon', 8375300, 40),
                new GymPokemon('Burpmon', 8375300, 40),
            ],
            { weight: 1 }, 'Cecile'),
    ],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'Lucky_floppy', weight: 4},
        {loot: 'Burpmon', weight: 3.5},
        {loot: 'Release Plate', weight: 2.75},
        {loot: 'Burpmon', weight: 2.5},
        {loot: 'Burpmon', weight: 0},
        {loot: 'Burpmon', weight: 0},
        {loot: 'Burpmon', weight: 0},
        {loot: 'Burpmon', weight: 0},
        {loot: 'Burpmon', weight: 0},
        {loot: 'Protector', weight: 0},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(250, GameConstants.getDungeonIndex('Lost Hotel'))},
    ],
    8375300,
    [
        new DungeonTrainer('Punk Couple',
            [
                new GymPokemon('Burpmon', 42664500, 42),
                new GymPokemon('Burpmon', 42765500, 42),
            ], { weight: 2 }, 'Zoya & Asa'),
        new DungeonBossPokemon('Burpmon', 82376500, 38),
    ],
    635000, 15);

dungeonList['Frost Cavern'] = new Dungeon('Frost Cavern',
    [
        {pokemon: 'Burpmon', options: { weight: 4.61 }},
        {pokemon: 'Burpmon', options: { weight: 4.61 }},
        {pokemon: 'Burpmon', options: { weight: 4.61 }},
        {pokemon: 'Burpmon', options: { weight: 4.61 }},
        {pokemon: 'Burpmon', options: { weight: 4.61 }},
        {pokemon: 'Burpmon', options: { weight: 4.61 }},
        {pokemon: 'Burpmon', options: { weight: 4.61 }},
        {pokemon: 'Burpmon', options: { weight: 4.61 }},
        {pokemon: 'Burpmon', options: { weight: 4.61 }},
        {pokemon: 'Burpmon', options: { weight: 4.61 }},
        {pokemon: 'Burpmon', options: { weight: 4.61 }},
        {pokemon: 'Burpmon', options: { weight: 4.61 }},
        {pokemon: 'Burpmon', options: { weight: 4.61 }},
        new DungeonTrainer('Hiker',
            [new GymPokemon('Burpmon', 8537490, 44)],
            { weight: 1 }, 'Ross'),
        new DungeonTrainer('Sky Trainer',
            [
                new GymPokemon('Burpmon', 8537490, 41),
                new GymPokemon('Burpmon', 8537490, 44),
            ], { weight: 1 }, 'Celso', '(male)'),
        new DungeonTrainer('Sky Trainer',
            [new GymPokemon('Burpmon', 8537490, 45)],
            { weight: 1 }, 'Era', '(female)'),
        new DungeonTrainer('Artist',
            [new GymPokemon('Burpmon', 8537490, 44)],
            { weight: 1 }, 'Salvador', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [new GymPokemon('Burpmon', 8537490, 46)],
            { weight: 1 }, 'Cordelia', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 8537490, 42),
                new GymPokemon('Burpmon', 8537490, 42),
                new GymPokemon('Burpmon', 8537490, 43),
            ],
            { weight: 1 }, 'Neil', '(male)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Burpmon', 8537490, 40),
                new GymPokemon('Burpmon', 8537490, 41),
                new GymPokemon('Burpmon', 8537490, 42),
            ], { weight: 1 }, 'Alain'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Burpmon', 8537490, 42),
                new GymPokemon('Burpmon', 8537490, 42),
            ],
            { weight: 1 }, 'Delmon'),
        new DungeonTrainer('Brains & Brawn',
            [
                new GymPokemon('Burpmon', 8537490, 44),
                new GymPokemon('Burpmon', 8537490, 46),
            ],
            { weight: 1 }, 'Eoin & Wolf'),
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Burpmon', 8537490, 43),
                new GymPokemon('Burpmon', 8537490, 44),
            ],
            { weight: 1 }, 'Alonzo'),
        new DungeonTrainer('Battle Girl',
            [
                new GymPokemon('Burpmon', 8537490, 43),
                new GymPokemon('Burpmon', 8537490, 44),
            ],
            { weight: 1 }, 'Kinsey'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Burpmon', 8537490, 46)], { weight: 1 }, 'Kenji'),
        new DungeonTrainer('Hiker',
            [new GymPokemon('Burpmon', 8537490, 44)],
            { weight: 1 }, 'Brent'),
        new DungeonTrainer('Battle Girl',
            [new GymPokemon('Burpmon', 8537490, 46)],
            { weight: 1 }, 'Gabrielle'),
        new DungeonTrainer('Team Flare Grunt',
            [
                new GymPokemon('Burpmon', 8537490, 42),
                new GymPokemon('Burpmon', 8537490, 42),
            ],
            { weight: 1 }, undefined, '(female)'),
    ],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'xClick', weight: 4},
        {loot: 'Chat', weight: 4},
        {loot: 'Guardian Plate', weight: 2.75},
        {loot: 'Jungle Plate', weight: 2.5},
        {loot: 'Code Plate', weight: 2.25},
        {loot: 'Simple Plate', weight: 2.25},
        {loot: 'Duskball', weight: 2},
        {loot: 'MediumRestore', weight: 1.75},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Heart Scale', weight: 0},
    ],
    8537490,
    [
        new DungeonTrainer('Team Flare Mable',
            [new GymPokemon('Burpmon', 87365830, 48)],
            { weight: 1 }),
        new DungeonBossPokemon('Burpmon', 85376500, 50),
    ],
    665500, 15);

dungeonList['Team Flare Secret HQ'] = new Dungeon('Team Flare Secret HQ',
    [
        new DungeonTrainer('Team Flare Admin',
            [new GymPokemon('Burpmon', 8739480, 50)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Grunt',
            [new GymPokemon('Burpmon', 8739480, 48)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Admin',
            [new GymPokemon('Burpmon', 8739480, 50)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Grunt',
            [new GymPokemon('Burpmon', 8739480, 48)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Admin',
            [new GymPokemon('Burpmon', 8739480, 50)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Grunt',
            [new GymPokemon('Burpmon', 8739480, 48)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Admin',
            [
                new GymPokemon('Burpmon', 8739480, 47),
                new GymPokemon('Burpmon', 8739480, 48),
            ], { weight: 2 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Admin',
            [
                new GymPokemon('Burpmon', 8739480, 47),
                new GymPokemon('Burpmon', 8739480, 48),
            ], { weight: 2 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Admin',
            [new GymPokemon('Burpmon', 8739480, 50)],
            { weight: 2 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Admin',
            [new GymPokemon('Burpmon', 8739480, 50)],
            { weight: 2 }, undefined, '(male)'),
    ],
    [
        {loot: 'Item_magnet', weight: 4},
        {loot: 'xAttack', weight: 4},
        {loot: 'Buster Plate', weight: 2.75},
        {loot: 'Release Plate', weight: 2.75},
        {loot: 'Guardian Plate', weight: 2.75},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(250, GameConstants.getDungeonIndex('Team Flare Secret HQ'))},
    ],
    8739480,
    [
        new DungeonTrainer('Team Flare Lysandre',
            [
                new GymPokemon('Burpmon', 22464940, 49),
                new GymPokemon('Burpmon', 22564950, 49),
                new GymPokemon('Burpmon', 23375580, 51),
                new GymPokemon('Burpmon', 27385730, 53),
            ],
            { weight: 2 }),
        new DungeonBossPokemon('Burpmon', 93659460, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Flare Secret HQ'))}),
        new DungeonBossPokemon('Burpmon', 93659450, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Flare Secret HQ'))}),
    ],
    675000, 16);

dungeonList['Terminus Cave'] = new Dungeon('Terminus Cave',
    [
        {pokemon: 'Burpmon', options: { weight: 3.27 }},
        {pokemon: 'Burpmon', options: { weight: 3.27 }},
        {pokemon: 'Burpmon', options: { weight: 3.27 }},
        {pokemon: 'Burpmon', options: { weight: 3.27 }},
        {pokemon: 'Burpmon', options: { weight: 3.27 }},
        {pokemon: 'Burpmon', options: { weight: 3.27 }},
        {pokemon: 'Burpmon', options: { weight: 3.27 }},
        {pokemon: 'Burpmon', options: { weight: 3.27 }},
        new DungeonTrainer('Worker',
            [
                new GymPokemon('Burpmon', 8924330, 46),
                new GymPokemon('Burpmon', 8924330, 47),
                new GymPokemon('Burpmon', 8924330, 48),
            ],
            { weight: 1 }, 'Narek'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Burpmon', 8924330, 48),
                new GymPokemon('Burpmon', 8924330, 48),
            ], { weight: 1 }, 'Bergin'),
        new DungeonTrainer('Hiker',
            [new GymPokemon('Burpmon', 8924330, 50)],
            { weight: 1 }, 'Aaron'),
        new DungeonTrainer('Worker',
            [new GymPokemon('Burpmon', 8924330, 50)],
            { weight: 1 }, 'Dimitri'),
        new DungeonTrainer('Worker',
            [new GymPokemon('Burpmon', 8924330, 50)],
            { weight: 1 }, 'Yusif'),
        new DungeonTrainer('Battle Girl',
            [
                new GymPokemon('Burpmon', 8924330, 49),
                new GymPokemon('Burpmon', 8924330, 50),
            ], { weight: 1 }, 'Andrea'),
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Burpmon', 8924330, 49),
                new GymPokemon('Burpmon', 8924330, 50),
            ], { weight: 1 }, 'Gunnar'),
        new DungeonTrainer('Battle Girl',
            [
                new GymPokemon('Burpmon', 8924330, 48),
                new GymPokemon('Burpmon', 8924330, 51),
            ], { weight: 1 }, 'Hailey'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Burpmon', 8924330, 52)],
            { weight: 1 }, 'Ricardo'),
    ],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Pokeball', weight: 3.75},
        {loot: 'Simple Plate', weight: 2.75},
        {loot: 'Nature Plate', weight: 2.75},
        {loot: 'Nightmare Plate', weight: 2.75},
        {loot: 'Duskball', weight: 2},
        {loot: 'Vigor Digizoid', weight: 2},
        {loot: 'Star Piece', weight: 1.75},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Dragon_scale', weight: 0},
        {loot: 'Moon_stone', weight: 0},
        {loot: 'Dusk_stone', weight: 0},
        {loot: 'Reaper_cloth', weight: 0},
    ],
    8924330,
    [
        new DungeonTrainer('Pokémon Rangers',
            [
                new GymPokemon('Burpmon', 46659450, 51),
                new GymPokemon('Burpmon', 46654990, 51),
            ], { weight: 3 }, 'Fern & Lee'),
        new DungeonBossPokemon('Burpmon', 92485360, 70, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)}),
    ],
    700000, 18);

dungeonList['Pokémon Village'] = new Dungeon('Pokémon Village',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [
        {loot: 'Intel_floppy', weight: 4},
        {loot: 'Step', weight: 3.5},
        {loot: 'Security', weight: 3.5},
        {loot: 'Burpmon', weight: 3.25},
        {loot: 'Burpmon', weight: 3.25},
        {loot: 'Calendar', weight: 3},
        {loot: 'Backup', weight: 3},
        {loot: 'Buster Plate', weight: 2.75},
        {loot: 'LargeRestore', weight: 1.5},
    ],
    9003000,
    [
        new DungeonBossPokemon('Burpmon', 94836530, 50),
        new DungeonBossPokemon('Burpmon', 95743340, 50),
    ],
    725000, 20);

dungeonList['Victory Road Kalos'] = new Dungeon('Victory Road Kalos',
    [
        {pokemon: 'Burpmon', options: { weight: 3.27 }},
        {pokemon: 'Burpmon', options: { weight: 3.27 }},
        {pokemon: 'Burpmon', options: { weight: 3.27 }},
        {pokemon: 'Burpmon', options: { weight: 3.27 }},
        {pokemon: 'Burpmon', options: { weight: 3.27 }},
        {pokemon: 'Burpmon', options: { weight: 3.27 }},
        {pokemon: 'Burpmon', options: { weight: 3.27 }},
        {pokemon: 'Burpmon', options: { weight: 3.27 }},
        {pokemon: 'Burpmon', options: { weight: 3.27 }},
        {pokemon: 'Burpmon', options: { weight: 3.27 }},
        {pokemon: 'Burpmon', options: { weight: 3.27 }},
        {pokemon: 'Burpmon', options: { weight: 3.27 }},
        {pokemon: 'Burpmon', options: { weight: 3.27 }},
        {pokemon: 'Burpmon', options: { weight: 3.27 }},
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 3500000, 56),
                new GymPokemon('Burpmon', 3500000, 56),
                new GymPokemon('Burpmon', 3500000, 57),
            ],
            { weight: 1 }, 'Robbie', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [new GymPokemon('Burpmon', 3500000, 60)], { weight: 1 }, 'Alanza', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 3500000, 56),
                new GymPokemon('Burpmon', 3500000, 56),
                new GymPokemon('Burpmon', 3500000, 57),
            ],
            { weight: 1 }, 'Bence', '(male)'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Burpmon', 3500000, 60)],
            { weight: 1 }, 'Markus'),
        new DungeonTrainer('Battle Girl',
            [
                new GymPokemon('Burpmon', 3500000, 57),
                new GymPokemon('Burpmon', 3500000, 58),
            ],
            { weight: 1 }, 'Veronique'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Burpmon', 3500000, 58)], { weight: 1 }, 'Farid', '(male)'),
        new DungeonTrainer('Battle Girl',
            [new GymPokemon('Burpmon', 3500000, 60)], { weight: 1 }, 'Sigrid'),
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Burpmon', 3500000, 57),
                new GymPokemon('Burpmon', 3500000, 58),
            ], { weight: 1 }, 'Ander'),
        new DungeonTrainer('Psychic',
            [new GymPokemon('Burpmon', 3500000, 58)],
            { weight: 1 }, 'William', '(male)'),
        new DungeonTrainer('Brains & Brawn',
            [
                new GymPokemon('Burpmon', 3500000, 58),
                new GymPokemon('Burpmon', 3500000, 60),
            ],
            { weight: 1 }, 'Arman & Hugo'),
        new DungeonTrainer('Fairy Tale Girl',
            [
                new GymPokemon('Burpmon', 3500000, 56),
                new GymPokemon('Burpmon', 3500000, 56),
            ], { weight: 1 }, 'Corinne'),
        new DungeonTrainer('Hex Maniac',
            [new GymPokemon('Burpmon', 3500000, 58)],
            { weight: 1 }, 'Raziah', '(kalos)'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Burpmon', 3500000, 57),
                new GymPokemon('Burpmon', 3500000, 57),
            ],
            { weight: 1 }, 'Petra', '(female)'),
        new DungeonTrainer('Veteran',
            [new GymPokemon('Burpmon', 3500000, 61)],
            { weight: 1 }, 'Inga', '(female)'),
        new DungeonTrainer('Pokémon Ranger',
            [new GymPokemon('Burpmon', 3500000, 59)], { weight: 1 }, 'Ralf', '(male)'),
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Burpmon', 3500000, 57),
                new GymPokemon('Burpmon', 3500000, 59),
            ], { weight: 1 }, 'Gerard'),
        new DungeonTrainer('Artist',
            [new GymPokemon('Burpmon', 3500000, 58)], { weight: 1 }, 'Vincent', '(male)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Burpmon', 3500000, 56),
                new GymPokemon('Burpmon', 3500000, 56),
            ],
            { weight: 1 }, 'Corwin'),
    ],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'xClick', weight: 4},
        {loot: 'Ultraball', weight: 2},
        {loot: 'Rush Digizoid', weight: 2},
        {loot: 'Revive', weight: 2},
        {loot: 'Duskball', weight: 2},
        {loot: 'Hard Stone', weight: 2},
        {loot: 'Rage Digizoid', weight: 2},
        {loot: 'Star Piece', weight: 1.75},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(250, GameConstants.getDungeonIndex('Victory Road Kalos'))},
        {loot: 'Heart Scale', weight: 0},
    ],
    9003000,
    [
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 48593850, 57),
                new GymPokemon('Burpmon', 49355840, 58),
            ],
            { weight: 1 }, 'Michele', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Burpmon', 48329640, 57),
                new GymPokemon('Burpmon', 49355820, 59),
            ], { weight: 1 }, 'Timeo', '(male)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Burpmon', 48395740, 57),
                new GymPokemon('Burpmon', 49265840, 59),
            ], { weight: 1 }, 'Catrina', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Burpmon', 32395730, 55),
                new GymPokemon('Burpmon', 33254840, 55),
                new GymPokemon('Burpmon', 35385940, 57),
            ], { weight: 1 }, 'Gilles', '(male)'),
    ],
    750500, 21);

//Unknown Dungeon? Contains Burpmon.



// Alola
// TODO: Balancing of dungeon Pokemon HP & rewards.
dungeonList['Trainers\' School'] = new Dungeon('Trainers\' School',
    [
        {pokemon: 'Burpmon', options: { weight: 2 }},
        {pokemon: 'Burpmon', options: { weight: 2 }},
        {pokemon: 'Burpmon', options: { weight: 2 }},
        {pokemon: 'Burpmon', options: { weight: 2 }},
        {pokemon: 'Burpmon', options: { weight: 2 }},
        {pokemon: 'Burpmon', options: { weight: 2 }},
        {pokemon: 'Burpmon', options: { weight: 2 }},
        {pokemon: 'Burpmon', options: { weight: 2 }},
        new DungeonTrainer('Youth Athlete',
            [new GymPokemon('Burpmon', 11407338, 7)], { weight: 1 }, 'Hiromi', '(female)'),
        new DungeonTrainer('Preschooler',
            [new GymPokemon('Burpmon', 11407338, 7)], { weight: 1 }, 'Mia', '(female)'),
        new DungeonTrainer('Youngster',
            [new GymPokemon('Burpmon', 11407338, 7)], { weight: 1 }, 'Joey'),
        new DungeonTrainer('Rising Star',
            [new GymPokemon('Burpmon', 11407338, 8)], { weight: 1 }, 'Joseph', '(male)'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    11407338,
    [
        new DungeonTrainer('Teacher',
            [
                new GymPokemon('Burpmon', 19012230, 10),
                new GymPokemon('Burpmon', 19012230, 10),
                new GymPokemon('Burpmon', 19012230, 10),
            ], { weight: 1 }, 'Emily'),
    ],
    757500, 18);

dungeonList['Hau\'oli Cemetery'] = new Dungeon('Hau\'oli Cemetery',
    [
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        new DungeonTrainer('Pokémon Breeder',
            [new GymPokemon('Burpmon', 11587450, 9)], { weight: 1 }, 'Ikue', '(female)'),
        new DungeonTrainer('Office Worker',
            [new GymPokemon('Burpmon', 11587450, 9)], { weight: 1 }, 'Jeremy', '(male)'),
        new DungeonTrainer('Preschooler',
            [new GymPokemon('Burpmon', 11587450, 8)], { weight: 1 }, 'Malia', '(female)'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    11587450,
    [
        new DungeonBossPokemon('Burpmon', 28968625, 9),
        new DungeonBossPokemon('Burpmon', 28968625, 9),
    ],
    800000, 2);

dungeonList['Verdant Cavern'] = new Dungeon('Verdant Cavern',
    [
        {pokemon: 'Burpmon', options: { weight: 0.8 }},
        {pokemon: 'Burpmon', options: { weight: 0.8 }},
        {pokemon: 'Burpmon', options: { weight: 0.8 }},
        {pokemon: 'Burpmon', options: { weight: 0.8 }},
        {pokemon: 'Burpmon', options: { weight: 0.8 }},
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Burpmon', 11595673, 11)], { weight: 1 }, undefined, '(male)'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    11595673,
    [
        new DungeonBossPokemon('Burpmon', 57978365, 12),
        new DungeonBossPokemon('Burpmon', 57978365, 12),
        new DungeonBossPokemon('Burpmon', 82543791, 70, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
        new DungeonBossPokemon('Burpmon', 82543791, 70, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
    ],
    805000, 2,
    () => DungeonGainGymBadge(GymList['Ilima\'s Trial'], BadgeEnums.NormaliumZ));

dungeonList['Melemele Meadow'] = new Dungeon('Melemele Meadow',
    [
        {pokemon: 'Burpmon', options: { weight: 0.66 }},
        {pokemon: 'Burpmon', options: { weight: 0.66 }},
        {pokemon: 'Burpmon', options: { weight: 0.66 }},
        {pokemon: 'Burpmon', options: { weight: 0.66 }},
        {pokemon: 'Burpmon', options: { weight: 0.66 }},
        {pokemon: 'Burpmon', options: { weight: 0.66 }},
        new DungeonTrainer('Actor',
            [new GymPokemon('Burpmon', 11769270, 12)], { weight: 1 }, 'Meredith'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    11769270,
    [
        new DungeonBossPokemon('Burpmon', 58846350, 12),
        new DungeonBossPokemon('Burpmon', 58846350, 12),
    ],
    825000, 3);

dungeonList['Seaward Cave'] = new Dungeon('Seaward Cave',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    11845338,
    [
        new DungeonBossPokemon('Burpmon', 59226690, 12),
        new DungeonBossPokemon('Burpmon', 59226690, 17),
    ],
    830000, 3);

dungeonList['Ten Carat Hill'] = new Dungeon('Ten Carat Hill',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    11897821,
    [
        new DungeonBossPokemon('Burpmon', 59489105, 14),
        new DungeonBossPokemon('Burpmon', 59489105, 14),
        new DungeonBossPokemon('Burpmon', 59489105, 14),
    ],
    835000, 3);


dungeonList['Burpmon Valley'] = new Dungeon('Burpmon Valley',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    11952804,
    [
        new DungeonBossPokemon('Burpmon', 59764020, 15),
        new DungeonBossPokemon('Burpmon', 59764020, 15),
        new DungeonBossPokemon('Burpmon', 59764020, 15),
        new DungeonBossPokemon('Burpmon', 59764020, 15),
        new DungeonBossPokemon('Burpmon', 59764020, 15),
        new DungeonBossPokemon('Burpmon', 59764020, 15),
    ],
    850000, 4);

dungeonList['Paniola Ranch'] = new Dungeon('Paniola Ranch',
    [
        {pokemon: 'Burpmon', options: { weight: 6.66 }},
        {pokemon: 'Burpmon', options: { weight: 6.66 }},
        {pokemon: 'Burpmon', options: { weight: 6.66 }},
        new DungeonTrainer('Madame',
            [new GymPokemon('Burpmon', 12161328, 15)], { weight: 1 }, 'Elizabeth'),
        new DungeonTrainer('Pokémon Breeder',
            [new GymPokemon('Burpmon', 12161328, 15)], { weight: 1 }, 'Wesley', '(male)'),
        new DungeonTrainer('Pokémon Breeder',
            [new GymPokemon('Burpmon', 12161328, 15)], { weight: 1 }, 'Glenn', '(male)'),
        new DungeonTrainer('Gentleman',
            [new GymPokemon('Burpmon', 12161328, 15)], { weight: 1 }, 'Gerald'),
        new DungeonTrainer('Rising Star',
            [
                new GymPokemon('Burpmon', 12161328, 15),
                new GymPokemon('Burpmon', 12161328, 16),
            ], { weight: 1 }, 'Micah', '(male)'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    12111328,
    [
        new DungeonBossPokemon('Burpmon', 30278320, 15),
        new DungeonBossPokemon('Burpmon', 30278320, 15),
    ],
    855000, 4);

dungeonList['Brooklet Hill'] = new Dungeon('Brooklet Hill',
    [
        {pokemon: 'Burpmon', options: { weight: 1.43 }},
        {pokemon: 'Burpmon', options: { weight: 1.43 }},
        {pokemon: 'Burpmon', options: { weight: 1.43 }},
        {pokemon: 'Burpmon', options: { weight: 1.43 }},
        {pokemon: 'Burpmon', options: { weight: 1.43 }},
        {pokemon: 'Burpmon', options: { weight: 1.43 }},
        {pokemon: 'Burpmon', options: { weight: 1.43 }},
        {pokemon: 'Burpmon', options: { weight: 1.43 }},
        {pokemon: 'Burpmon', options: { weight: 1.43 }},
        {pokemon: 'Burpmon', options: { weight: 1.43 }},
        {pokemon: 'Burpmon', options: { weight: 1.43 }},
        {pokemon: 'Burpmon', options: { weight: 1.43 }},
        {pokemon: 'Burpmon', options: { weight: 1.43 }},
        {pokemon: 'Burpmon', options: { weight: 1.43 }},
        new DungeonTrainer('Fisherman',
            [new GymPokemon('Burpmon', 12138060, 16)], { weight: 1 }, 'Hal'),
        new DungeonTrainer('Fisherman',
            [
                new GymPokemon('Burpmon', 12138060, 16),
                new GymPokemon('Burpmon', 12138060, 16),
            ], { weight: 1 }, 'Ernest'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Burpmon', 12138060, 16)], { weight: 1 }, 'Mikiko', '(female)'),
        new DungeonTrainer('Fisherman',
            [new GymPokemon('Burpmon', 12138060, 16)], { weight: 1 }, 'Herbert'),
        new DungeonTrainer('Fisherman',
            [
                new GymPokemon('Burpmon', 12138060, 16),
                new GymPokemon('Burpmon', 12138060, 16),
                new GymPokemon('Burpmon', 12138060, 16),
            ], { weight: 1 }, 'Carl'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    12138060,
    [
        new DungeonBossPokemon('Burpmon', 60690300, 20),
        new DungeonBossPokemon('Burpmon', 60690300, 20),
        new DungeonBossPokemon('Burpmon', 82543791, 60, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
        new DungeonBossPokemon('Burpmon', 82543791, 60, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
    ],
    875000, 5,
    () => DungeonGainGymBadge(GymList['Lana\'s Trial'], BadgeEnums.WateriumZ));

dungeonList['Wela Volcano Park'] = new Dungeon('Wela Volcano Park',
    [
        {pokemon: 'Burpmon', options: { weight: 2 }},
        {pokemon: 'Burpmon', options: { weight: 2 }},
        {pokemon: 'Burpmon', options: { weight: 2 }},
        {pokemon: 'Burpmon', options: { weight: 2 }},
        {pokemon: 'Burpmon', options: { weight: 2 }},
        {pokemon: 'Burpmon', options: { weight: 2 }},
        new DungeonTrainer('Sightseer',
            [new GymPokemon('Burpmon', 12896392, 19)], { weight: 1 }, 'Mariah', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 12896392, 20),
                new GymPokemon('Burpmon', 12896392, 21),
            ], { weight: 1 }, 'Jim', '(male)'),
        new DungeonTrainer('Hiker',
            [new GymPokemon('Burpmon', 12896392, 19)], { weight: 1 }, 'Calhoun'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    12896392,
    [
        new DungeonBossPokemon('Burpmon', 64481960, 22),
        new DungeonBossPokemon('Burpmon', 64481960, 22),
        new DungeonBossPokemon('Burpmon', 82543791, 60, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
        new DungeonBossPokemon('Burpmon', 82543791, 60, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
    ],
    900000, 7,
    () => DungeonGainGymBadge(GymList['Kiawe\'s Trial'], BadgeEnums.FiriumZ));

dungeonList['Lush Jungle'] = new Dungeon('Lush Jungle',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    13090332,
    [
        new DungeonBossPokemon('Burpmon', 65451660, 24),
        new DungeonBossPokemon('Burpmon', 82543791, 60, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
    ],
    925000, 8,
    () => DungeonGainGymBadge(GymList['Mallow\'s Trial'], BadgeEnums.GrassiumZ));

dungeonList['Burpmon\'s Tunnel'] = new Dungeon('Burpmon\'s Tunnel',
    [
        {pokemon: 'Burpmon', options: { weight: 10 }},
        {pokemon: 'Burpmon', options: { weight: 10 }},
        new DungeonTrainer('Worker',
            [new GymPokemon('Burpmon', 13215839, 22)], { weight: 1 }, 'Frank'),
        new DungeonTrainer('Worker',
            [
                new GymPokemon('Burpmon', 13215839, 22),
                new GymPokemon('Burpmon', 13215839, 22),
            ], { weight: 1 }, 'Jeff'),
        new DungeonTrainer('Worker',
            [new GymPokemon('Burpmon', 13215839, 22)], { weight: 1 }, 'Vaclav'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Burpmon', 13215839, 23)], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Burpmon', 13215839, 23)], { weight: 1 }, undefined, '(male)'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    13215839,
    [new DungeonBossPokemon('Burpmon', 66079195, 23)],
    930000, 8);

dungeonList['Memorial Hill'] = new Dungeon('Memorial Hill',
    [
        {pokemon: 'Burpmon', options: { weight: 10 }},
        {pokemon: 'Burpmon', options: { weight: 10 }},
        {pokemon: 'Burpmon', options: { weight: 10 }},
        new DungeonTrainer('Preschooler',
            [
                new GymPokemon('Burpmon', 13286024, 23),
                new GymPokemon('Burpmon', 13286024, 23),
            ], { weight: 1 }, 'Liam', '(male)'),
        new DungeonTrainer('Gentleman',
            [new GymPokemon('Burpmon', 13286024, 24)], { weight: 1 }, 'Smith'),
        new DungeonTrainer('Madame',
            [
                new GymPokemon('Burpmon', 13286024, 24),
                new GymPokemon('Burpmon', 13286024, 24),
            ], { weight: 1 }, 'Sayuri'),
        new DungeonTrainer('Punk Girl',
            [new GymPokemon('Burpmon', 13286024, 24)], { weight: 1 }, 'Melissa'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    13286024,
    [
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Burpmon', 66430120, 24)], { weight: 1 }, undefined, '(male)'),
    ],
    950000, 9);

dungeonList['Malie Garden'] = new Dungeon('Malie Garden',
    [
        {pokemon: 'Burpmon', options: { weight: 1.14 }},
        {pokemon: 'Burpmon', options: { weight: 1.14 }},
        {pokemon: 'Burpmon', options: { weight: 1.14 }},
        {pokemon: 'Burpmon', options: { weight: 1.14 }},
        {pokemon: 'Burpmon', options: { weight: 1.14 }},
        {pokemon: 'Burpmon', options: { weight: 1.14 }},
        {pokemon: 'Burpmon', options: { weight: 1.14 }},
        {pokemon: 'Burpmon', options: { weight: 1.14 }},
        {pokemon: 'Burpmon', options: { weight: 1.14 }},
        {pokemon: 'Burpmon', options: { weight: 1.14 }},
        {pokemon: 'Burpmon', options: { weight: 1.14 }},
        {pokemon: 'Burpmon', options: { weight: 1.14 }},
        {pokemon: 'Burpmon', options: { weight: 1.14 }},
        {pokemon: 'Burpmon', options: { weight: 1.14 }},
        new DungeonTrainer('Sightseer',
            [new GymPokemon('Burpmon', 13483476, 28)], { weight: 1 }, 'Mitch', '(male)'),
        new DungeonTrainer('Preschooler',
            [new GymPokemon('Burpmon', 13483476, 27)], { weight: 1 }, 'Nancy', '(female)'),
        new DungeonTrainer('Sightseer',
            [new GymPokemon('Burpmon', 13483476, 28)], { weight: 1 }, 'Akali', '(female)'),
        new DungeonTrainer('Tourist Couple',
            [
                new GymPokemon('Burpmon', 13483476, 28),
                new GymPokemon('Burpmon', 13483476, 28),
            ], { weight: 1 }, 'Landon and Yukiro'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    13483476,
    [
        new DungeonTrainer('Team Skull Boss',
            [
                new GymPokemon('Burpmon', 33708690, 34),
                new GymPokemon('Burpmon', 33708690, 34),
            ],
            { weight: 1 }, 'Guzma', '(guzma)'),
    ],
    975000, 21);

dungeonList['Hokulani Observatory'] = new Dungeon('Hokulani Observatory',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    13883676,
    [
        new DungeonBossPokemon('Burpmon', 69418380, 29),
        new DungeonBossPokemon('Burpmon', 69418380, 33),
        new DungeonBossPokemon('Burpmon', 82543791, 60, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
        new DungeonBossPokemon('Burpmon', 82543791, 60, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
    ],
    1000000, 22,
    () => DungeonGainGymBadge(GymList['Sophocles\' Trial'], BadgeEnums.ElectriumZ));

dungeonList['Thrifty Megamart'] = new Dungeon('Thrifty Megamart',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    14705422,
    [
        new DungeonBossPokemon('Burpmon', 73527110, 35),
        new DungeonBossPokemon('Burpmon', 82543791, 60, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
    ],
    1025000, 14,
    () => DungeonGainGymBadge(GymList['Acerola\'s Trial'], BadgeEnums.GhostiumZ));

dungeonList['Ula\'ula Meadow'] = new Dungeon('Ula\'ula Meadow',
    [
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        new DungeonTrainer('Dancer',
            [new GymPokemon('Burpmon', 15127052, 36)], { weight: 1 }, 'Mireille', '(female)'),
        new DungeonTrainer('Office Worker',
            [
                new GymPokemon('Burpmon', 15127052, 36),
                new GymPokemon('Burpmon', 15127052, 36),
            ], { weight: 1 }, 'Michelle', '(female)'),
        new DungeonTrainer('Lass',
            [
                new GymPokemon('Burpmon', 15127052, 35),
                new GymPokemon('Burpmon', 15127052, 35),
            ], { weight: 1 }, 'Rylee'),
        new DungeonTrainer('Golfer',
            [
                new GymPokemon('Burpmon', 15127052, 39),
                new GymPokemon('Burpmon', 15127052, 39),
            ], { weight: 1 }, 'Dean', '(male)'),
        new DungeonTrainer('Actor',
            [new GymPokemon('Burpmon', 15127052, 36)], { weight: 1 }, 'Meredith'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    15127052,
    [
        new DungeonBossPokemon('Burpmon', 75635260, 36),
        new DungeonBossPokemon('Burpmon', 75635260, 36),
    ],
    1050000, 16);

dungeonList['Po Town'] = new Dungeon('Po Town',
    [
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Burpmon', 15340576, 36)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Burpmon', 15340576, 36)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Burpmon', 15340576, 37)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Skull Grunt',
            [
                new GymPokemon('Burpmon', 15340576, 37),
                new GymPokemon('Burpmon', 15340576, 37),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Skull Grunt',
            [
                new GymPokemon('Burpmon', 15340576, 37),
                new GymPokemon('Burpmon', 15340576, 37),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Skull Grunt',
            [
                new GymPokemon('Burpmon', 15340576, 37),
                new GymPokemon('Burpmon', 15340576, 37),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Burpmon', 15340576, 40)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Office Worker',
            [
                new GymPokemon('Burpmon', 15340576, 40),
                new GymPokemon('Burpmon', 15340576, 40),
            ], { weight: 1 }, 'Royce', '(male)'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Burpmon', 15340576, 38)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Skull Grunt',
            [
                new GymPokemon('Burpmon', 15340576, 38),
                new GymPokemon('Burpmon', 15340576, 38),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Skull Grunt',
            [
                new GymPokemon('Burpmon', 15340576, 38),
                new GymPokemon('Burpmon', 15340576, 38),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Burpmon', 15340576, 38)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Burpmon', 15340576, 38)], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Burpmon', 15340576, 38)], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Skull Grunt',
            [
                new GymPokemon('Burpmon', 15340576, 38),
                new GymPokemon('Burpmon', 15340576, 38),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Skull Grunt',
            [
                new GymPokemon('Burpmon', 15340576, 38),
                new GymPokemon('Burpmon', 15340576, 38),
                new GymPokemon('Burpmon', 15340576, 38),
            ], { weight: 1 }, undefined, '(female)'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    15340576,
    [
        new DungeonTrainer('Team Skull Boss',
            [
                new GymPokemon('Burpmon', 25567627, 41),
                new GymPokemon('Burpmon', 25567627, 41),
                new GymPokemon('Burpmon', 25567627, 41),
            ], { weight: 1 }, 'Guzma', '(guzma)'),
    ],
    1075000, 17);

dungeonList['Aether Foundation'] = new Dungeon('Aether Foundation',
    [
        new DungeonTrainer('Aether Foundation Employee',
            [
                new GymPokemon('Burpmon', 15619682, 40),
                new GymPokemon('Burpmon', 15619682, 40),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Aether Foundation Employee',
            [
                new GymPokemon('Burpmon', 15619682, 40),
                new GymPokemon('Burpmon', 15619682, 40),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Aether Foundation Employee',
            [
                new GymPokemon('Burpmon', 15619682, 40),
                new GymPokemon('Burpmon', 15619682, 40),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Aether Foundation Employee',
            [
                new GymPokemon('Burpmon', 15619682, 40),
                new GymPokemon('Burpmon', 15619682, 40),
                new GymPokemon('Burpmon', 15619682, 40),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Aether Foundation Employee',
            [new GymPokemon('Burpmon', 15619682, 40)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Aether Foundation Employee',
            [new GymPokemon('Burpmon', 15619682, 41)], { weight: 1 }, undefined, '(masked)'),
        new DungeonTrainer('Aether Foundation Employees',
            [
                new GymPokemon('Burpmon', 15619682, 41),
                new GymPokemon('Burpmon', 15619682, 41),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Aether Foundation Employees',
            [
                new GymPokemon('Burpmon', 15619682, 42),
                new GymPokemon('Burpmon', 15619682, 42),
                new GymPokemon('Burpmon', 15619682, 42),
                new GymPokemon('Burpmon', 15619682, 42),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Aether Branch Chief',
            [
                new GymPokemon('Burpmon', 15619682, 44),
                new GymPokemon('Burpmon', 15619682, 44),
                new GymPokemon('Burpmon', 15619682, 44),
            ], { weight: 1 }, 'Faba', '(faba)'),
        new DungeonTrainer('Aether Foundation Employee',
            [new GymPokemon('Burpmon', 15619682, 41)], { weight: 1 }, undefined, '(masked)'),
        new DungeonTrainer('Aether Foundation Employee',
            [new GymPokemon('Burpmon', 15619682, 41)], { weight: 1 }, undefined, '(masked)'),
        new DungeonTrainer('Aether Foundation Employee',
            [new GymPokemon('Burpmon', 15619682, 41)], { weight: 1 }, undefined, '(masked)'),
        new DungeonTrainer('Aether Foundation Employees',
            [
                new GymPokemon('Burpmon', 15619682, 41),
                new GymPokemon('Burpmon', 15619682, 41),
            ], { weight: 1 }, undefined, '(both)'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Burpmon', 15619682, 42)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Burpmon', 15619682, 42)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Skull Boss',
            [
                new GymPokemon('Burpmon', 15619682, 45),
                new GymPokemon('Burpmon', 15619682, 45),
                new GymPokemon('Burpmon', 15619682, 45),
                new GymPokemon('Burpmon', 15619682, 45),
            ], { weight: 1 }, 'Guzma', '(guzma)'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    15619682,
    [
        new DungeonTrainer('Aether President',
            [
                new GymPokemon('Burpmon', 15619682, 47),
                new GymPokemon('Burpmon', 15619682, 47),
                new GymPokemon('Burpmon', 15619682, 47),
                new GymPokemon('Burpmon', 15619682, 47),
                new GymPokemon('Burpmon', 15619682, 47),
            ], { weight: 1 }, 'Lusamine', '(lusamine)'),
    ],
    1080000, 17);

dungeonList['Burpmon Island Hill'] = new Dungeon('Burpmon Island Hill',
    ['Burpmon', 'Burpmon', 'Burpmon'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    15773066,
    [
        new DungeonBossPokemon('Burpmon', 78865330, 45),
        new DungeonBossPokemon('Burpmon', 78865330, 45),
    ],
    1100000, 24);

dungeonList['Vast Poni Canyon'] = new Dungeon('Vast Poni Canyon',
    [
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Burpmon', 15992044, 47),
                new GymPokemon('Burpmon', 15992044, 47),
            ], { weight: 1 }, 'Harry', '(male)'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Burpmon', 15992044, 45)], { weight: 1 }, 'Perdy', '(female)'),
        new DungeonTrainer('Ace Duo',
            [
                new GymPokemon('Burpmon', 15992044, 47),
                new GymPokemon('Burpmon', 15992044, 47),
            ], { weight: 1 }, 'Kent and Aimee'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Burpmon', 15992044, 46),
                new GymPokemon('Burpmon', 15992044, 46),
            ], { weight: 1 }, 'Zachary'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Burpmon', 15992044, 48),
                new GymPokemon('Burpmon', 15992044, 48),
                new GymPokemon('Burpmon', 15992044, 48),
            ], { weight: 1 }, 'Lynn', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 15992044, 47),
                new GymPokemon('Burpmon', 15992044, 47),
            ], { weight: 1 }, 'Junko', '(female)'),
        new DungeonTrainer('Scientist',
            [new GymPokemon('Burpmon', 15992044, 46)], { weight: 1 }, 'Ikaika', '(male)'),
        new DungeonTrainer('Punk Girl',
            [new GymPokemon('Burpmon', 15992044, 46)], { weight: 1 }, 'Anna'),
        new DungeonTrainer('Punk Guy',
            [
                new GymPokemon('Burpmon', 15992044, 46),
                new GymPokemon('Burpmon', 15992044, 46),
            ], { weight: 1 }, 'Adam'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Burpmon', 15992044, 47)], { weight: 1 }, 'Curtis'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Burpmon', 15992044, 46)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 15992044, 47),
                new GymPokemon('Burpmon', 15992044, 48),
            ], { weight: 1 }, 'Hiroshi', '(male)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Burpmon', 15992044, 48),
                new GymPokemon('Burpmon', 15992044, 48),
                new GymPokemon('Burpmon', 15992044, 48),
            ], { weight: 1 }, 'Heather', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Burpmon', 15992044, 48),
                new GymPokemon('Burpmon', 15992044, 48),
                new GymPokemon('Burpmon', 15992044, 48),
                new GymPokemon('Burpmon', 15992044, 48),
            ], { weight: 1 }, 'Eric', '(male)'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Burpmon', 15992044, 47)], { weight: 1 }, 'Terry'),
        new DungeonTrainer('Surfer',
            [new GymPokemon('Burpmon', 15992044, 47)], { weight: 1 }, 'Joshah'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    15992044,
    [
        new DungeonBossPokemon('Burpmon', 79960220, 49),
        new DungeonBossPokemon('Burpmon', 82543791, 60, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
    ],
    1125000, 25,
    () => DungeonGainGymBadge(GymList['Vast Poni Canyon Trial'], BadgeEnums.DragoniumZ));

dungeonList['Mina\'s Houseboat'] = new Dungeon('Mina\'s Houseboat',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    16217412,
    [new DungeonBossPokemon('Burpmon', 81087060, 55)],
    1150000, 25,
    () => DungeonGainGymBadge(GymList['Mina\'s Trial'], BadgeEnums.FairiumZ));

dungeonList['Mount Lanakila'] = new Dungeon('Mount Lanakila',
    [
        {pokemon: 'Burpmon', options: { weight: 8.67 }},
        {pokemon: 'Burpmon', options: { weight: 8.67 }},
        {pokemon: 'Burpmon', options: { weight: 8.67 }},
        {pokemon: 'Burpmon', options: { weight: 8.67 }},
        {pokemon: 'Burpmon', options: { weight: 8.67 }},
        {pokemon: 'Burpmon', options: { weight: 8.67 }},
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 16212850, 51),
                new GymPokemon('Burpmon', 16212850, 52),
            ], { weight: 1 }, 'Seth', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 16212850, 51),
                new GymPokemon('Burpmon', 16212850, 52),
            ], { weight: 1 }, 'Kailee', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Burpmon', 16212850, 52),
                new GymPokemon('Burpmon', 16212850, 52),
            ], { weight: 1 }, 'Alonsa', '(female)'),
        new DungeonTrainer('Worker',
            [new GymPokemon('Burpmon', 16212850, 50)], { weight: 1 }, 'Ovid'),
        new DungeonTrainer('Sparring Partners',
            [
                new GymPokemon('Burpmon', 16212850, 51),
                new GymPokemon('Burpmon', 16212850, 51),
                new GymPokemon('Burpmon', 16212850, 51),
            ], { weight: 1 }, 'Alon and Eimar'),
        new DungeonTrainer('Sparring Partners',
            [
                new GymPokemon('Burpmon', 16212850, 51),
                new GymPokemon('Burpmon', 16212850, 51),
                new GymPokemon('Burpmon', 16212850, 51),
            ], { weight: 1 }, 'Craig and Jason'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Burpmon', 16212850, 51)], { weight: 1 }, 'Peren', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Burpmon', 16212850, 53),
                new GymPokemon('Burpmon', 16212850, 53),
                new GymPokemon('Burpmon', 16212850, 53),
            ], { weight: 1 }, 'Ella', '(female)'),
        new DungeonTrainer('Collector',
            [new GymPokemon('Burpmon', 16212850, 51)], { weight: 1 }, 'Minty'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Burpmon', 16212850, 52),
                new GymPokemon('Burpmon', 16212850, 53),
            ], { weight: 1 }, 'Jada', '(female)'),
        new DungeonTrainer('Master & Apprentice',
            [
                new GymPokemon('Burpmon', 16212850, 52),
                new GymPokemon('Burpmon', 16212850, 53),
                new GymPokemon('Burpmon', 16212850, 53),
                new GymPokemon('Burpmon', 16212850, 53),
                new GymPokemon('Burpmon', 16212850, 53),
            ], { weight: 1 }, 'Breon and Kaimana'),
        new DungeonTrainer('Hiker',
            [new GymPokemon('Burpmon', 16212850, 51)], { weight: 1 }, 'Anuhea'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Burpmon', 16212850, 65),
                new GymPokemon('Burpmon', 16212850, 65),
                new GymPokemon('Burpmon', 16212850, 65),
                new GymPokemon('Burpmon', 16212850, 65),
                new GymPokemon('Burpmon', 16212850, 65),
            ], { weight: 1 }, 'Aristo', '(male)'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    16312850,
    [
        new DungeonBossPokemon('Burpmon', 81064250, 50),
        new DungeonBossPokemon('Burpmon', 81064250, 50),
        new DungeonBossPokemon('Burpmon', 81064250, 50),
        new DungeonBossPokemon('Burpmon', 83527125, 65),
    ],
    1175000, 26);

dungeonList['Lake of the Sunne and Moone'] = new Dungeon('Lake of the Sunne and Moone',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    16435490,
    [
        new DungeonBossPokemon('Burpmon', 82177450, 70),
        new DungeonBossPokemon('Burpmon', 90673816, 100, {requirement: new ObtainedPokemonRequirement(pokemonMap.Burpmon)}),
        new DungeonBossPokemon('Burpmon', 90673816, 100, {requirement: new ObtainedPokemonRequirement(pokemonMap.Burpmon)}),
    ],
    1200000, 27);

dungeonList['Ruins of Conflict'] = new Dungeon('Ruins of Conflict',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    16435490,
    [
        new DungeonBossPokemon('Burpmon', 82177450, 55),
        new DungeonBossPokemon('Burpmon', 82177450, 55),
        new DungeonBossPokemon('Burpmon', 82543791, 60),
    ],
    1200000, 27);

dungeonList['Ruins of Life'] = new Dungeon('Ruins of Life',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    16435490,
    [
        new DungeonBossPokemon('Burpmon', 82177450, 55),
        new DungeonBossPokemon('Burpmon', 82177450, 55),
        new DungeonBossPokemon('Burpmon', 82543791, 60),
    ],
    1200000, 27);

dungeonList['Ruins of Abundance'] = new Dungeon('Ruins of Abundance',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    16435490,
    [
        new DungeonBossPokemon('Burpmon', 82177450, 55),
        new DungeonBossPokemon('Burpmon', 82177450, 55),
        new DungeonBossPokemon('Burpmon', 82543791, 60),
    ],
    1200000, 27);

dungeonList['Ruins of Hope'] = new Dungeon('Ruins of Hope',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    16435490,
    [
        new DungeonBossPokemon('Burpmon', 82177450, 55),
        new DungeonBossPokemon('Burpmon', 82177450, 55),
        new DungeonBossPokemon('Burpmon', 82543791, 60),
    ],
    1200000, 27);

dungeonList['Poni Meadow'] = new Dungeon('Poni Meadow',
    [
        {pokemon: 'Burpmon', options: { weight: 0.57 }},
        {pokemon: 'Burpmon', options: { weight: 0.57 }},
        {pokemon: 'Burpmon', options: { weight: 0.57 }},
        {pokemon: 'Burpmon', options: { weight: 0.57 }},
        {pokemon: 'Burpmon', options: { weight: 0.57 }},
        {pokemon: 'Burpmon', options: { weight: 0.57 }},
        {pokemon: 'Burpmon', options: { weight: 0.57 }},
        new DungeonTrainer('Actor',
            [new GymPokemon('Burpmon', 16659968, 57)], { weight: 1 }, 'Meredith'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    16659968,
    [
        new DungeonBossPokemon('Burpmon', 83299840, 70),
        new DungeonBossPokemon('Burpmon', 83299840, 70),
    ],
    1225000, 28);

dungeonList['Resolution Cave'] = new Dungeon('Resolution Cave',
    [
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        {pokemon: 'Burpmon', options: { weight: 4 }},
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Burpmon', 17114462, 61),
                new GymPokemon('Burpmon', 17114462, 61),
            ], { weight: 1 }, 'Leticia', '(female)'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Burpmon', 17114462, 59)], { weight: 1 }, 'Maria', '(female)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Burpmon', 17114462, 59),
                new GymPokemon('Burpmon', 17114462, 59),
            ], { weight: 1 }, 'Travis'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    17114462,
    [
        new DungeonBossPokemon('Burpmon', 85572310, 59),
        new DungeonBossPokemon('Burpmon', 85572310, 59),
        new DungeonBossPokemon('Burpmon', 90673816, 70),
    ],
    1250000, 30);




//Galar Dungeons

dungeonList['SHackingbering Weald'] = new Dungeon('SHackingbering Weald',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [new DungeonBossPokemon('Burpmon', 8000000, 70)],
    96500, 201);

dungeonList['Inner SHackingbering Weald'] = new Dungeon('Inner SHackingbering Weald',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [
        new DungeonBossPokemon('Burpmon', 8000000, 70),
        new DungeonBossPokemon('Burpmon', 8000000, 70),
    ],
    96500, 201);

dungeonList['Galar Mine'] = new Dungeon('Galar Mine',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [
        new DungeonBossPokemon('Burpmon', 8000000, 70),
        new DungeonBossPokemon('Burpmon', 8000000, 70),
    ],
    96500, 201);

dungeonList['Galar Mine No. 2'] = new Dungeon('Galar Mine No. 2',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [
        new DungeonBossPokemon('Burpmon', 8000000, 70),
        new DungeonBossPokemon('Burpmon', 8000000, 70),
        new DungeonBossPokemon('Burpmon', 8000000, 70),
    ],
    96500, 201);

dungeonList['Rose Tower'] = new Dungeon('Rose Tower',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [
        new DungeonBossPokemon('Burpmon', 8000000, 70),
        new DungeonBossPokemon('Burpmon', 8000000, 70),
        new DungeonBossPokemon('Burpmon', 8000000, 70),
        new DungeonBossPokemon('Burpmon', 8000000, 70),
        new DungeonBossPokemon('Burpmon', 8000000, 70),
    ],
    96500, 201);

dungeonList['Glimwood Tangle'] = new Dungeon('Glimwood Tangle',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [
        new DungeonBossPokemon('Burpmon', 8000000, 70),
        new DungeonBossPokemon('Burpmon', 8000000, 70),
        new DungeonBossPokemon('Burpmon', 8000000, 70),
    ],
    96500, 201);

dungeonList['Watchtower Ruins'] = new Dungeon('Watchtower Ruins',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [
        new DungeonBossPokemon('Burpmon', 8000000, 70),
        new DungeonBossPokemon('Burpmon', 8000000, 70),
        new DungeonBossPokemon('Burpmon', 8000000, 70),
        new DungeonBossPokemon('Burpmon', 8000000, 70),
    ],
    96500, 201);

dungeonList['Lake of Outrage'] = new Dungeon('Lake of Outrage',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [
        new DungeonBossPokemon('Burpmon', 8000000, 70),
        new DungeonBossPokemon('Burpmon', 8000000, 70),
        new DungeonBossPokemon('Burpmon', 8000000, 70),
        new DungeonBossPokemon('Burpmon', 8000000, 70),
    ],
    96500, 201);

dungeonList['Dusty Bowl'] = new Dungeon('Dusty Bowl',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [
        new DungeonBossPokemon('Burpmon', 8000000, 70),
        new DungeonBossPokemon('Burpmon', 8000000, 70),
        new DungeonBossPokemon('Burpmon', 8000000, 70),
        new DungeonBossPokemon('Burpmon', 8000000, 70),
    ],
    96500, 201);



//Isle of Armor
dungeonList['Master Dojo Trial'] = new Dungeon('Master Dojo Trial',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [new DungeonBossPokemon('Burpmon', 8000000, 70)],
    96500, 201);

dungeonList['Tower of Darkness'] = new Dungeon('Tower of Darkness',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [new DungeonBossPokemon('Burpmon', 8000000, 70)],
    96500, 201);

dungeonList['Tower of Water'] = new Dungeon('Tower of Water',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [new DungeonBossPokemon('Burpmon', 8000000, 70)],
    96500, 201);


//Crown Tundra
dungeonList['Rock Peak Ruins'] = new Dungeon('Rock Peak Ruins',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [
        new DungeonBossPokemon('Burpmon', 8000000, 70),
        new DungeonBossPokemon('Burpmon', 8000000, 70),
    ],
    96500, 201);

dungeonList['Iron Ruins'] = new Dungeon('Iron Ruins',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [
        new DungeonBossPokemon('Burpmon', 8000000, 70),
        new DungeonBossPokemon('Burpmon', 8000000, 70),
    ],
    96500, 201);

dungeonList['Iceberg Ruins'] = new Dungeon('Iceberg Ruins',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [
        new DungeonBossPokemon('Burpmon', 8000000, 70),
        new DungeonBossPokemon('Burpmon', 8000000, 70),
    ],
    96500, 201);

dungeonList['Split-Decision Ruins'] = new Dungeon('Split-Decision Ruins',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [
        new DungeonBossPokemon('Burpmon', 8000000, 70),
        new DungeonBossPokemon('Burpmon', 8000000, 70),
        new DungeonBossPokemon('Burpmon', 8000000, 70),
        new DungeonBossPokemon('Burpmon', 8000000, 70),
    ],
    96500, 201);

dungeonList['Dyna Tree Hill'] = new Dungeon('Dyna Tree Hill',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [new DungeonBossPokemon('Burpmon', 8000000, 70)],
    96500, 201);

dungeonList['Crown Shrine'] = new Dungeon('Crown Shrine',
    ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [
        new DungeonBossPokemon('Burpmon', 8000000, 70),
        new DungeonBossPokemon('Burpmon', 8000000, 70, {
            requirement: new MultiRequirement([
                new ObtainedPokemonRequirement(pokemonMap.Burpmon),
                new ObtainedPokemonRequirement(pokemonMap.Burpmon),
            ])}),
    ],
    96500, 201);
