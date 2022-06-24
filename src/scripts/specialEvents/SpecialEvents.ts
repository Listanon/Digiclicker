/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/DataStore/common/Feature.d.ts" />

class SpecialEvents implements Feature {
    name = 'Events';
    saveKey = 'events';
    defaults: Record<string, any>;

    static events: SpecialEvent[] = [];

    static newEvent(title: string, description: string, startTime: Date, startFunction: EmptyCallback, endTime: Date, endFunction: EmptyCallback) {
        // Check if the event exist before adding it again
        if (!SpecialEvents.events.find(event => event.title == title)) {
            SpecialEvents.events.push(new SpecialEvent(title, description, startTime, startFunction, endTime, endFunction));
        }
    }

    initialize(): void {
        SpecialEvents.events.forEach(event => event.initialize());
    }

    fromJSON(json: any): void {
        if (!json) {
            return;
        }
    }

    toJSON() {
        return {
            // no data to save yet
        };
    }

    canAccess(): boolean {
        return true;
    }

    update(delta: number): void {}  // This method intentionally left blank
}

// TODO: Fetch events from a server each 1/2/3/6/12/24 hours?
// Create our events here for now (yearly)

// Lunar New Year
SpecialEvents.newEvent('Lunar New Year', 'Placeholder Message Map 6.',
    // Start
    new Date(new Date().getFullYear(), 0, 24, 1), () => {
        RoamingPokemonList.add(GameConstants.Region.kalos, new RoamingPokemon('Burpmon'));
    },
    // End
    new Date(new Date().getFullYear(), 1, 7, 23), () => {
        RoamingPokemonList.remove(GameConstants.Region.kalos, 'Burpmon');
    }
);
// Easter
SpecialEvents.newEvent('Easter', 'Placeholder Message Map 1-2-3.',
    // Start
    new Date(new Date().getFullYear(), 3, 8, 1), () => {
        const togepiEggHuntQuestLine = App.game.quests.getQuestLine('Burpmon');
        if (togepiEggHuntQuestLine.state() == QuestLineState.inactive) {
            App.game.quests.getQuestLine('Burpmon').beginQuest();
        }
    },
    // End
    new Date(new Date().getFullYear(), 3, 29, 23), () => {
        // do not end questline, so ppl can finish it
    }
);
// First Event
SpecialEvents.newEvent('One Lost Digimon', 'Placeholder Message Map 1.',
    // Start
    new Date(new Date().getFullYear(), 6, 6, 1), () => {
        RoamingPokemonList.add(GameConstants.Region.kanto, new RoamingPokemon('Damemon Cmon'));
    },
    // End
    new Date(new Date().getFullYear(), 6, 12, 23), () => {
        RoamingPokemonList.remove(GameConstants.Region.kanto, 'Damemon Cmon');
    }
);
// Pokemon the first movie release date
SpecialEvents.newEvent('Odaiba Memorial Day!', 'Placeholder Message Map 1.',
    // Start
    new Date(new Date().getFullYear(), 6, 1, 1), () => {
        dungeonList['Cerulean Cave'].bossList.push(new DungeonBossPokemon('Burpmon', 1000000, 80));
        RoamingPokemonList.add(GameConstants.Region.kanto, new RoamingPokemon('Burpmon'));
        RoamingPokemonList.add(GameConstants.Region.kanto, new RoamingPokemon('Burpmon'));
        RoamingPokemonList.add(GameConstants.Region.kanto, new RoamingPokemon('Burpmon'));
    },
    // End
    new Date(new Date().getFullYear(), 6, 24, 23), () => {
        dungeonList['Cerulean Cave'].bossList = dungeonList['Cerulean Cave'].bossList.filter(boss => boss.name != 'Burpmon');
        RoamingPokemonList.list[GameConstants.Region.kanto] = RoamingPokemonList.list[GameConstants.Region.kanto].filter(r => !['Burpmon', 'Burpmon', ''].includes(r.pokemon.name));
    }
);
// Halloween
SpecialEvents.newEvent('Halloween!', 'Placeholder Message Map 1-2-3.',
    // Start
    new Date(new Date().getFullYear(), 9, 30, 1), () => {
        SeededRand.seed(new Date().getFullYear());
        Routes.getRoutesByRegion(GameConstants.Region.kanto).forEach(route => {
            SeededRand.boolean() ? route.pokemon.land.push('Burpmon') : null;
            SeededRand.boolean() ? route.pokemon.land.push('Burpmon') : null;
        });
        Routes.getRoutesByRegion(GameConstants.Region.johto).forEach(route => {
            SeededRand.boolean() ? route.pokemon.land.push('Burpmon') : null;
            SeededRand.boolean() ? route.pokemon.land.push('Burpmon') : null;
        });
        Routes.getRoutesByRegion(GameConstants.Region.hoenn).forEach(route => {
            SeededRand.boolean() ? route.pokemon.land.push('Burpmon') : null;
            SeededRand.boolean() ? route.pokemon.land.push('Burpmon') : null;
            SeededRand.boolean() ? route.pokemon.land.push('Burpmon') : null;
        });
    },
    // End
    new Date(new Date().getFullYear(), 10, 5, 23), () => {
        Routes.getRoutesByRegion(GameConstants.Region.kanto).forEach(route => route.pokemon.land = route.pokemon.land.filter(p => !['Spooky Bulbasaur', 'Gastly'].includes(p)));
        Routes.getRoutesByRegion(GameConstants.Region.johto).forEach(route => route.pokemon.land = route.pokemon.land.filter(p => !['Spooky Togepi', 'Misdreavus'].includes(p)));
        Routes.getRoutesByRegion(GameConstants.Region.hoenn).forEach(route => route.pokemon.land = route.pokemon.land.filter(p => !['Pikachu (Gengar)', 'Shuppet', 'Duskull'].includes(p)));
    }
);
// Let's Go P/E release date
SpecialEvents.newEvent('Survive!', 'Placeholder Message Map 1.',
    // Start
    new Date(new Date().getFullYear(), 10, 16, 1), () => {
        RoamingPokemonList.add(GameConstants.Region.kanto, new RoamingPokemon('Burpmon'));
        RoamingPokemonList.add(GameConstants.Region.kanto, new RoamingPokemon('Burpmon'));
    },
    // End
    new Date(new Date().getFullYear(), 10, 23, 23), () => {
        RoamingPokemonList.remove(GameConstants.Region.kanto, 'Burpmon');
        RoamingPokemonList.remove(GameConstants.Region.kanto, 'Burpmon');
    }
);
// Christmas
SpecialEvents.newEvent('Merry Christmas!', 'Encounter a special Agumon roaming the Adventure02 map.',
    // Start
    new Date(new Date().getFullYear(), 11, 24, 1), () => {
        // Add to every region excluding None
        GameHelper.enumNumbers(GameConstants.Region).filter(i => i != GameConstants.Region.none).forEach(region => {
            RoamingPokemonList.add(region, new RoamingPokemon('Santa Agumon'));
        });
        dungeonList['Ilex Forest'].bossList.push(new DungeonBossPokemon('Santa Agumon', 1600000, 100, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion)}));
    },
    // End
    new Date(new Date().getFullYear(), 11, 30, 23), () => {
        // Remove from every region excluding None
        GameHelper.enumNumbers(GameConstants.Region).filter(i => i != GameConstants.Region.none).forEach(region => {
            RoamingPokemonList.remove(region, 'Burpmon');
        });
        dungeonList['Ilex Forest'].bossList = dungeonList['Ilex Forest'].bossList.filter(boss => boss.name != 'Burpmon');
    }
);
// Golden Week
SpecialEvents.newEvent('Golden Week', 'Placeholder Message Map 4.',
    // Start
    new Date(new Date().getFullYear(), 3, 29, 1), () => {
        dungeonList['Flower Paradise'].bossList.push(new DungeonBossPokemon('Burpmon', 1600000, 100, {requirement: new ClearDungeonRequirement(10, GameConstants.getDungeonIndex('Flower Paradise'))}));
    },
    // End
    new Date(new Date().getFullYear(), 4, 6, 23), () => {
        dungeonList['Flower Paradise'].bossList = dungeonList['Flower Paradise'].bossList.filter(boss => boss.name != 'Burpmon');
    }
);
