/**
 * Static class used to handle Quest Lines
 */
class QuestLineHelper {

    public static createTutorial() {
        const tutorial = new QuestLine('Tutorial Quests', 'A short set of quests to get you going');

        //Defeat Starter
        const defeatStarter = new CustomQuest(1, 10,
            'Defeat the Digimon. Click to deal damage',
            () => App.game.statistics.totalDigimonDefeated(),
            0 // Initial of 0 so it auto completes if bugged
        );
        tutorial.addQuest(defeatStarter);

        //Capture 1 pokemon
        const captureOne = new CustomQuest(1, 20,
            'Scan 1 Digimon. When you defeat a Digimon, a Scan module is used. When the Scanner reaches 100% the digimon will join your party.',
            () => App.game.statistics.totalDigimonScanned(),
            1 // Initial of 1 so it auto completes if bugged
        );
        tutorial.addQuest(captureOne);

        //Kill 5 on route 2
        const routeTwo = new CustomQuest(10, 20,
            'Defeat 10 Digimon on route 2. Click route 2 on the map to move there and begin fighting.',
            () => App.game.statistics.routeKills[GameConstants.Region.adventure01]['2'](),
            0 // Initial of 0 so it auto completes if bugged
        );
        tutorial.addQuest(routeTwo);

        //Buy pokeballs
        const buyPokeballs = new CustomQuest(10, 50,
            'Buy 10 Basic Scanners. You can find these in the Primary Village Shop.',
            () => App.game.statistics.digiscansBought[GameConstants.Pokeball.Pokeball](),
            0 // Initial of 0 so it auto completes if bugged
        );
        tutorial.addQuest(buyPokeballs);

        //Buy Dungeon ticket
        const buyDungeonTicket = new CustomQuest(1, 50,
            'Buy the Dungeon ticket from the Primary Village Shop.',
            () => +App.game.keyItems.hasKeyItem(KeyItemType.Dungeon_ticket),
            0
        );
        tutorial.addQuest(buyDungeonTicket);

        //Clear Viridian Forest
        const clearViridianForest = new CustomQuest(1, 50,
            'Gather 50 Scan Coins by (re)scaning Digimon, then clear the Coelamon Beach dungeon.',
            () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Viridian Forest')](),
            0
        );
        tutorial.addQuest(clearViridianForest);

        //Defeat Pewter Gym
        const pewterReward = () => {
            Notifier.notify({ message: 'Tutorial completed!', type: NotificationConstants.NotificationOption.success });
            Information.show({
                steps: [
                    {
                        element: document.getElementById('questDisplayContainer'),
                        intro: 'Click "List" to see the current quests that can be completed for <img title="Farm points" src="assets/images/currency/farmPoint.svg" height="25px"> Quest Points.',
                    },
                    {
                        element: document.getElementById('startMenu'),
                        intro: 'See the keepsakes you\'ve earned in the Keepsake Case. Keepsakes influence the max level of your Digimon.',
                    },
                ],
            });
        };
        const pewter = new CustomQuest(1, pewterReward,
            'Gather 50 Scan Coins by (re)scaning Digimon, then clear the Coelamon Beach dungeon.',
            () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Viridian Forest')](),
            0
        );
        tutorial.addQuest(pewter);

        App.game.quests.questLines().push(tutorial);
    }

    public static createDeoxysQuestLine() {
        const deoxysQuestLine = new QuestLine('Mystery of Deoxys', 'Discover the mystery of Deoxys');

        // Defeat 50 Pokemon on route 129
        const route129 = new DefeatPokemonsQuest(50, 0, 129, GameConstants.Region.hoenn);
        deoxysQuestLine.addQuest(route129);

        // Defeat 500 Virus type Pokemon
        const psychicGemReward = () => {
            App.game.gems.gainGems(500, PokemonType.Virus);
            Notifier.notify({
                title: deoxysQuestLine.name,
                message: 'You have gained 500 Virus chips',
                type: NotificationConstants.NotificationOption.success,
            });
        };
        const defeatPsychic = new CustomQuest(500, psychicGemReward, 'Defeat 500 Virus type Digimon', () => {
            return pokemonMap.filter(p => p.type.includes(PokemonType.Virus)).map(p => App.game.statistics.pokemonDefeated[p.id]()).reduce((a,b) => a + b, 0);
        });
        deoxysQuestLine.addQuest(defeatPsychic);

        // Capture 200 Virus type Pokemon
        const mindPlateReward = () => {
            const mindPlate = UndergroundItem.list.find(item => item.name == 'Mind Plate');
            if (!mindPlate) {
                return console.error('Unable to find item Mind Plate');
            }
            Underground.gainMineItem(mindPlate.id, 20);
            Notifier.notify({
                title: deoxysQuestLine.name,
                message: `You have gained 20 ${mindPlate.name}s`,
                type: NotificationConstants.NotificationOption.success,
            });
        };
        const catchPsychic = new CustomQuest(200, mindPlateReward, 'Capture 200 Virus type Digimon', () => {
            return pokemonMap.filter(p => p.type.includes(PokemonType.Virus)).map(p => App.game.statistics.digimonScanned[p.id]()).reduce((a,b) => a + b, 0);
        });
        deoxysQuestLine.addQuest(catchPsychic);

        // Reach stage 100 in battle frontier
        const reachStage100Reward = () => {
            Notifier.notify({
                title: deoxysQuestLine.name,
                message: 'Quest line completed!\n<i>You have uncovered the Mystery of Deoxys</i>',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        };
        const reachStage100 = new CustomQuest(100, reachStage100Reward, 'Defeat stage 100 in the Battle Frontier', App.game.statistics.battleFrontierHighestStageCompleted, 0);
        deoxysQuestLine.addQuest(reachStage100);

        App.game.quests.questLines().push(deoxysQuestLine);
    }

    public static createUndergroundQuestLine() {
        const undergroundQuestLine = new QuestLine('Mining Expedition', 'Explore the underground');

        //Buy Explorer Kit (no reward)
        const buyExplorerKit = new CustomQuest(1, () => {}, 'Buy the Explorer Kit from Cinnabar Island Shop', () => +App.game.keyItems.hasKeyItem(KeyItemType.Explorer_kit), 0);
        undergroundQuestLine.addQuest(buyExplorerKit);

        // Mine 5 layers in the Unerground
        const oldAmberReward = () => {
            // Gain an Old Amber
            const oldAmber = UndergroundItem.list.find(item => item.name == 'Old Amber');
            if (!oldAmber) {
                return console.error('Unable to find item Old Amber');
            }
            Underground.gainMineItem(oldAmber.id);
            Notifier.notify({
                title: undergroundQuestLine.name,
                message: 'You have gained an Old Amber fossil!\n<i>You can breed this in the hatchery.</i>',
                type: NotificationConstants.NotificationOption.success,
                timeout: GameConstants.MINUTE,
            });
        };
        const mineLayers = new CustomQuest(5, oldAmberReward, 'Dig 5 layers in the Junkyard', App.game.statistics.undergroundLayersMined);
        undergroundQuestLine.addQuest(mineLayers);

        App.game.quests.questLines().push(undergroundQuestLine);
    }

    public static createVivillonQuestLine() {
        const vivillonQuestLine = new QuestLine('The Great Vivillon Hunt!', 'Discover the beauty of Vivillon');

        const createVivillonQuest = (type: PokemonType, vivillon: PokemonNameType, dungeons: Array<string>, hint: string) => {
            // Capture 100 Water type Pokemon
            const catchType = new CustomQuest(100, undefined, `Capture 100 ${PokemonType[type]} type Pokémon`, () => {
                return pokemonMap.filter(p => p.type.includes(type)).map(p => App.game.statistics.digimonScanned[p.id]()).reduce((a,b) => a + b, 0);
            });
            vivillonQuestLine.addQuest(catchType);

            // Capture Vivillon in a dungeon
            const vivillonAdd = () => {
                dungeons.forEach(dungeon => {
                    dungeonList[dungeon].bossList.push(new DungeonBossPokemon(vivillon, 93659450, 80));
                });
                Notifier.notify({
                    title: vivillonQuestLine.name,
                    message: `A Vivillon is hiding somewhere.\n${hint}`,
                    type: NotificationConstants.NotificationOption.info,
                });
            };
            const vivillonRemove = () => {
                dungeons.forEach(dungeon => {
                    dungeonList[dungeon].bossList = dungeonList[dungeon].bossList.filter(boss => boss.name != vivillon);
                });
                Notifier.notify({
                    title: vivillonQuestLine.name,
                    message: `You caught the rare ${vivillon}`,
                    type: NotificationConstants.NotificationOption.success,
                });
            };
            const catchVivillon = new CustomQuest(
                1,
                vivillonRemove,
                `Find and capture the rare Vivillon!\nHint: ${hint}`,
                App.game.statistics.digimonScanned[pokemonMap[vivillon].id],
                undefined,
                vivillonAdd
            );
            vivillonQuestLine.addQuest(catchVivillon);
        };

        createVivillonQuest(PokemonType.Water, 'Burpmon', ['Lake Verity', 'Lake Valor', 'Lake Acuity'], 'It has been spotted at some Lakes.');
        createVivillonQuest(PokemonType.Virus, 'Burpmon', ['Cerulean Cave'], 'It\'s surrounded by strong Pokémon.');
        createVivillonQuest(PokemonType.Free, 'Burpmon', ['Dark Cave'], 'It\'s hiding at a dark place.');
        createVivillonQuest(PokemonType.Neutral, 'Burpmon', ['Pokéball Factory'], 'It flew into a factory.');
        createVivillonQuest(PokemonType.Fire, 'Burpmon', ['Mt. Chimney Crater'], 'It seems to like hot places.');
        createVivillonQuest(PokemonType.Vaccine, 'Burpmon', ['Sprout Tower'], 'It\'s sitting on a swaying pillar.');
        createVivillonQuest(PokemonType.Light, 'Burpmon', ['Dreamyard'], 'It\'s flying around an overgrown place full of dreams.');
        createVivillonQuest(PokemonType.Electric, 'Burpmon', ['New Mauville'], 'It\'s currently in a City full of Electric type Pokémon.');
        createVivillonQuest(PokemonType.Data, 'Burpmon', ['Eterna Forest'], 'It hides in a dark Forest.');
        createVivillonQuest(PokemonType.Wind, 'Burpmon', ['Sky Pillar'], 'It\'s high up in the sky.');
        createVivillonQuest(PokemonType.Earth, 'Burpmon', ['Relic Castle'], 'It got lost in the desert sand.');
        createVivillonQuest(PokemonType.Plant, 'Burpmon', ['Flower Paradise'], 'It only shows up amongst the most beautiful flowers.');
        createVivillonQuest(PokemonType.Dark, 'Burpmon', ['Dragonspiral Tower'], 'It\'s surrounded by dragons.');

        // Capture 200 Normal type Pokemon
        const catchNormal = new CustomQuest(200, undefined, 'Capture 200 Neutral type Digimon', () => {
            return pokemonMap.filter(p => p.type.includes(PokemonType.Neutral)).map(p => App.game.statistics.digimonScanned[p.id]()).reduce((a,b) => a + b, 0);
        });
        vivillonQuestLine.addQuest(catchNormal);

        // Capture Vivillon (Pokéball)
        const viviBallAdd = () => {
            BattleFrontierMilestones.addMilestone(new BattleFrontierMilestonePokemon(666, 'Vivillon (Pokéball)'));
            Notifier.notify({
                title: vivillonQuestLine.name,
                message: 'A Vivillon is hiding somewhere.\nOnly the strongest Challengers can reach it.',
                type: NotificationConstants.NotificationOption.success,
            });
        };
        const viviBalldone = () => {
            Notifier.notify({
                title: vivillonQuestLine.name,
                message: 'You caught the last rare Vivillon (Pokéball).\nCongratulations!',
                type: NotificationConstants.NotificationOption.success,
            });
        };
        const catchBall = new CustomQuest(
            1,
            viviBalldone,
            'Find and capture the rare Vivillon!\nHint: Only the strongest Challengers can reach it.',
            App.game.statistics.digimonScanned[666.01],
            undefined,
            viviBallAdd
        );
        vivillonQuestLine.addQuest(catchBall);

        // Add quest to quest line
        App.game.quests.questLines().push(vivillonQuestLine);
    }

    public static createRocketJohtoQuestLine() {
        const rocketJohtoQuestLine = new QuestLine('Team Rocket Again', 'Team Rocket is up to no good again!');

        const clearTeamRocketHideout = new CustomQuest(1, 0, 'Clear the Team Rockets Hideout dungeon in Mahogany Town', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Team Rockets Hideout')]());
        rocketJohtoQuestLine.addQuest(clearTeamRocketHideout);

        const radioTowerReward = () => {
            App.game.pokeballs.gainPokeballs(GameConstants.Pokeball.Masterball, 1, false);
            Notifier.notify({
                title: rocketJohtoQuestLine.name,
                message: 'The grateful radio director gave you a Masterball!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        };

        const clearRadioTower = new CustomQuest(1, radioTowerReward, 'Clear the Radio Tower dungeon in Goldenrod City', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Radio Tower')]());
        rocketJohtoQuestLine.addQuest(clearRadioTower);

        App.game.quests.questLines().push(rocketJohtoQuestLine);
    }

    public static createAquaMagmaHoennQuestLine() {
        const aquaMagmaHoennQuestLine = new QuestLine('Land vs Water', 'Put a stop to the schemes of Team Aqua and Team Magma');

        const clearMtChimney = new CustomQuest(1, 0, 'Stop Team Magma at Mt. Chimney Crater', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Mt. Chimney Crater')]());
        aquaMagmaHoennQuestLine.addQuest(clearMtChimney);

        const clearWeatherInstitute = new CustomQuest(1, 0, 'Stop Team Aqua at the Weather Institute', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Weather Institute')]());
        aquaMagmaHoennQuestLine.addQuest(clearWeatherInstitute);

        const clearMagmaHideout = new CustomQuest(1, 0, 'Raid the Team Magma hideout', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Magma Hideout')]());
        aquaMagmaHoennQuestLine.addQuest(clearMagmaHideout);

        const clearAquaHideout = new CustomQuest(1, 0, 'Raid the Team Aqua hideout', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Aqua Hideout')]());
        aquaMagmaHoennQuestLine.addQuest(clearAquaHideout);

        const seafloorCavernReward = () => {
            App.game.pokeballs.gainPokeballs(GameConstants.Pokeball.Masterball, 1, false);
            Notifier.notify({
                title: aquaMagmaHoennQuestLine.name,
                message: 'You found a Masterball!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        };

        const clearSeafloorCavern = new CustomQuest(1, seafloorCavernReward, 'Team Aqua\'s leader Archie escaped from their hideout. Find him in the Seafloor Cavern and put a stop to this once and for all', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Seafloor Cavern')]());
        aquaMagmaHoennQuestLine.addQuest(clearSeafloorCavern);

        App.game.quests.questLines().push(aquaMagmaHoennQuestLine);
    }

    public static createPlasmaUnovaQuestLine() {
        const plasmaUnovaQuestLine = new QuestLine('Quest for the DNA Splicers', 'Prevent Team Plasma from using these dangerous SplNeutralrs');

        const clearOpelucidGym = new CustomQuest(1, 0, 'Defeat the Opelucid City gym leader to obtain the DNA Splicers', () => App.game.statistics.gymsDefeated[GameConstants.getGymIndex('Opelucid City')]());
        plasmaUnovaQuestLine.addQuest(clearOpelucidGym);

        const clearTeamPlasmaAssault = new CustomQuest(1, 0, 'Zinzolin has stolen the DNA Splicers and is assaulting the city with his army of grunts and shadows! Defend against the Team Plasma Assault in Opelucid City!', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Team Plasma Assault')]());
        plasmaUnovaQuestLine.addQuest(clearTeamPlasmaAssault);

        const clearPlasmaFrigate = new CustomQuest(1, 0, 'Zinzolin has fled the scene with the stolen DNA Splicers. Find and clear out the Plasma Frigate', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Plasma Frigate')]());
        plasmaUnovaQuestLine.addQuest(clearPlasmaFrigate);

        const giantChasmReward = () => {
            App.game.pokeballs.gainPokeballs(GameConstants.Pokeball.Masterball, 1, false);
            Notifier.notify({
                title: plasmaUnovaQuestLine.name,
                message: 'You found a Masterball!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        };

        const clearGiantChasm = new CustomQuest(1, giantChasmReward, 'Team Plasma\'s leader Ghetsis plans on using the DNA Splicers on Kyurem in Giant Chasm. Clear the dungeon to end his evil plans.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Giant Chasm')]());
        plasmaUnovaQuestLine.addQuest(clearGiantChasm);

        App.game.quests.questLines().push(plasmaUnovaQuestLine);
    }

    public static createFindSurpriseTogepiForEasterQuestLine() {
        const findSurpriseTogepiForEasterQuestLine = new QuestLine('Togepi Egg Hunt', 'A strange Togepi has been spotted but cannot be found!');

        const surpriseTogepi = pokemonMap['Burpmon'];

        const togepiInKantoSetup = () => {
            dungeonList['Viridian Forest'].bossList.push(new DungeonTrainer('Egg Hunter', [new GymPokemon('Burpmon', 300000, 100)], { weight: 1, requirement: new GymBadgeRequirement(BadgeEnums.Apocalymon_Data) }));
            App.game.statistics.pokemonDefeated[surpriseTogepi.id](0);
        };
        const afterDefeatingTogepiInKanto = () => {
            Notifier.notify({
                title: findSurpriseTogepiForEasterQuestLine.name,
                message: 'Seems like this was just an Easter egg after all..',
                image: `assets/images/profile/trainer-${App.game.profile.trainer() || 0}.png`,
                type: NotificationConstants.NotificationOption.info,
                timeout: 3e4,
            });

            dungeonList['Viridian Forest'].bossList = dungeonList['Viridian Forest'].bossList.filter(boss => boss.name != 'Egg Hunter');
        };
        const defeatTogepiInKanto = new CustomQuest(1, afterDefeatingTogepiInKanto, 'Erika reported that a strange Togepi has been seen around Kanto. Go look for it!', App.game.statistics.pokemonDefeated[surpriseTogepi.id], 0, togepiInKantoSetup);
        findSurpriseTogepiForEasterQuestLine.addQuest(defeatTogepiInKanto);

        const togepiInJohtoSetup = () => {
            dungeonList['Ilex Forest'].bossList.push(new DungeonTrainer('Egg Hunter', [new GymPokemon('Burpmon', 900000, 100)], { weight: 1, requirement: new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion) }));
        };
        const afterDefeatingTogepiInJohto = () => {
            Notifier.notify({
                title: findSurpriseTogepiForEasterQuestLine.name,
                message: 'I swear that was a Togepi.. well maybe not.',
                image: `assets/images/profile/trainer-${App.game.profile.trainer() || 0}.png`,
                type: NotificationConstants.NotificationOption.info,
                timeout: 3e4,
            });
            dungeonList['Ilex Forest'].bossList = dungeonList['Ilex Forest'].bossList.filter(boss => boss.name != 'Egg Hunter');
        };
        const encounterSurpriseTogepiInJohto = new CustomQuest(1, afterDefeatingTogepiInJohto, 'Another report just came in, stating that they saw a strange egg boarding the ferry to Johto!', App.game.statistics.pokemonDefeated[surpriseTogepi.id], 1, togepiInJohtoSetup);
        findSurpriseTogepiForEasterQuestLine.addQuest(encounterSurpriseTogepiInJohto);

        const togepiInHoennSetup = () => {
            dungeonList['Petalburg Woods'].bossList.push(new DungeonTrainer('Egg Hunter', [new GymPokemon('Burpmon', 2700000, 100)], { weight: 1, requirement: new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion) }));
        };
        const afterDefeatingTogepiInHoenn = () => {
            App.game.party.gainPokemonById(surpriseTogepi.id);
            Notifier.notify({
                title: findSurpriseTogepiForEasterQuestLine.name,
                message: 'You found the special Togepi!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
            dungeonList['Petalburg Woods'].bossList = dungeonList['Petalburg Woods'].bossList.filter(boss => boss.name != 'Egg Hunter');
        };
        const encounterTogepiInHoenn = new CustomQuest(1, afterDefeatingTogepiInHoenn, 'There is a big Egg Hunt going on in Petalburg Woods right now, maybe I should take a look?', App.game.statistics.pokemonDefeated[surpriseTogepi.id], 2, togepiInHoennSetup);
        findSurpriseTogepiForEasterQuestLine.addQuest(encounterTogepiInHoenn);

        App.game.quests.questLines().push(findSurpriseTogepiForEasterQuestLine);
    }

    public static createSkullAetherAlolaQuestLine() {
        const skullAetherAlolaQuestLine = new QuestLine('Eater of Light', 'A dangerous Pokémon from another world threatens the Alola region.');

        const clearUltraWormhole = new CustomQuest(1, 0, 'A strange creature has appeared in Aether Paradise. Make it go away. Clear the Ultra Wormhole.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Ultra Wormhole')]());
        skullAetherAlolaQuestLine.addQuest(clearUltraWormhole);

        const clearMalieGarden = new CustomQuest(1, 0, 'Team Skull are being annoying. Get rid of them. Clear the Malie Garden dungeon.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Malie Garden')]());
        skullAetherAlolaQuestLine.addQuest(clearMalieGarden);

        const clearPoTown = new CustomQuest(1, 0, 'Team Skull have stolen a child\'s Yungoos. Raid their base. Clear the Po Town dungeon.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Po Town')]());
        skullAetherAlolaQuestLine.addQuest(clearPoTown);

        const clearAetherFoundation = new CustomQuest(1, 0, 'Aether president Lusamine has recruited Team Skull in her own plan to stop the Eater of Light. She\'s an idiot. Stop her. Clear the Aether Foundation dungeon.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Aether Foundation')]());
        skullAetherAlolaQuestLine.addQuest(clearAetherFoundation);

        const UltraMegalopolisReward = () => {
            App.game.pokeballs.gainPokeballs(GameConstants.Pokeball.Masterball, 1, false);
            Notifier.notify({
                title: skullAetherAlolaQuestLine.name,
                message: 'You found a Masterball!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        };

        const clearUltraMegalopolis = new CustomQuest(1, UltraMegalopolisReward, 'Stop the Eater of Light from absorbing all light in Alola. Clear Ultra Megalopolis at the Altar of the Sunne and Moone.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Ultra Megalopolis')]());
        skullAetherAlolaQuestLine.addQuest(clearUltraMegalopolis);

        App.game.quests.questLines().push(skullAetherAlolaQuestLine);
    }

    public static createGalacticSinnohQuestLine() {
        const galacticSinnohQuestLine = new QuestLine('A new world', 'End Team Galactic\'s plan to destroy the world and create a new one in its place.');

        const clearValleyWindworks = new CustomQuest(1, 0, 'Team Galactic is stealing energy. Clear Valley Windworks.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Valley Windworks')]());
        galacticSinnohQuestLine.addQuest(clearValleyWindworks);

        const clearTeamGalacticEternaBuilding = new CustomQuest(1, 0, 'Team Galactic is kidnapping Pokémon now. Clear Team Galactic Eterna Building in Eterna City.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Team Galactic Eterna Building')]());
        galacticSinnohQuestLine.addQuest(clearTeamGalacticEternaBuilding);

        const clearVeilstoneCityGym = new CustomQuest(1, 0, 'All is quiet. Team Galactic isn\'t doing anything. Guess they learned their lesson. Just keep traveling I guess. Clear the Veilstone City Gym.', () => App.game.statistics.gymsDefeated[GameConstants.getGymIndex('Veilstone City')]());
        galacticSinnohQuestLine.addQuest(clearVeilstoneCityGym);

        const clearCanalaveCityGym = new CustomQuest(1, 0, 'That sure is a strange building in Veilstone City. Oh well, no use worrying about that now. Adventure awaits! Clear the Canalave City Gym.', () => App.game.statistics.gymsDefeated[GameConstants.getGymIndex('Canalave City')]());
        galacticSinnohQuestLine.addQuest(clearCanalaveCityGym);

        const clearLakeValor = new CustomQuest(1, 0, 'A commotion was heard at Lake Valor. You must protect the lake\'s guardian! Clear Lake Valor.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Lake Valor')]());
        galacticSinnohQuestLine.addQuest(clearLakeValor);

        const clearLakeVerity = new CustomQuest(1, 0, 'Lake Valor\'s guardian was taken. Better try again at the next lake. Clear Lake Verity.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Lake Verity')]());
        galacticSinnohQuestLine.addQuest(clearLakeVerity);

        const clearLakeAcuity = new CustomQuest(1, 0, 'Lake Verity\'s guardian was also taken. Only one lake remains. Clear Lake Acuity.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Lake Acuity')]());
        galacticSinnohQuestLine.addQuest(clearLakeAcuity);

        const clearTeamGalacticHQ = new CustomQuest(1, 0, 'You failed to protect any of the lake guardians. They have been taken to Veilstone City. So that\'s what that strange building was. Clear Team Galactic HQ in Veilstone City.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Team Galactic HQ')]());
        galacticSinnohQuestLine.addQuest(clearTeamGalacticHQ);

        const clearSpearPillar = new CustomQuest(1, 0, 'The lake guardians have been rescued, but Cyrus has used them to forge the Red Chain. He is taking it to the top of Mount Coronet. Follow him! Clear Spear Pillar.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Spear Pillar')]());
        galacticSinnohQuestLine.addQuest(clearSpearPillar);

        const DistortionWorldReward = () => {
            App.game.pokeballs.gainPokeballs(GameConstants.Pokeball.Masterball, 1, false);
            Notifier.notify({
                title: galacticSinnohQuestLine.name,
                message: 'You found a Masterball!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        };

        const clearDistortionWorld = new CustomQuest(1, DistortionWorldReward, 'Cyrus planned to use the Red Chain to enslave Dialga and Palkia, but he accidentally angered Giratina and has been taken to its realm. A portal has appeared on top of Mount Coronet. Use it to follow Cyrus and end his threat once and for all. Clear Distortion World.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Distortion World')]());
        galacticSinnohQuestLine.addQuest(clearDistortionWorld);

        App.game.quests.questLines().push(galacticSinnohQuestLine);
    }

    public static isQuestLineCompleted(name: string) {
        return App.game.quests.getQuestLine(name)?.state() == QuestLineState.ended;
    }

    public static loadQuestLines() {
        this.createTutorial();
        this.createDeoxysQuestLine();
        this.createUndergroundQuestLine();
        this.createVivillonQuestLine();
        this.createRocketJohtoQuestLine();
        this.createAquaMagmaHoennQuestLine();
        this.createPlasmaUnovaQuestLine();
        this.createSkullAetherAlolaQuestLine();
        this.createFindSurpriseTogepiForEasterQuestLine();
        this.createGalacticSinnohQuestLine();
    }
}
