import { Observable as KnockoutObservable } from 'knockout';
import getRouteKillsProxy from './getRouteKillsProxy';
import { Saveable } from '../common/Saveable';
import '../../koExtenders';

const failedSetValue = () => 0;

export default class Statistics implements Saveable {
    saveKey = 'statistics';

    defaults: Record<string, any> = {};

    selectedPokemonID = ko.observable(1);

    selectedBerryID = ko.observable(0).extend({ numeric: 0 });

    /*
     * observables
     */
    // Other
    secondsPlayed: KnockoutObservable<number>;
    clickAttacks: KnockoutObservable<number>;
    questsCompleted: KnockoutObservable<number>;
    totalChipsGained: KnockoutObservable<number>;
    totalProteinsObtained: KnockoutObservable<number>;
    // Currency
    totalMoney: KnockoutObservable<number>;
    totalDungeonTokens: KnockoutObservable<number>;
    totalQuestPoints: KnockoutObservable<number>;
    totalDiamonds: KnockoutObservable<number>;
    totalFarmPoints: KnockoutObservable<number>;
    totalBattlePoints: KnockoutObservable<number>;
    totalExploreCoins: KnockoutObservable<number>;
    totalHealthCoins: KnockoutObservable<number>;
    totalAttackCoins: KnockoutObservable<number>;
    totalDefenceCoins: KnockoutObservable<number>;
    totalSpeedCoins: KnockoutObservable<number>;
    totalIntCoins: KnockoutObservable<number>;
    totalMagicCoins: KnockoutObservable<number>;
    // Pokemon
    totalDigimonScanned: KnockoutObservable<number>;
    totalDigimonDefeated: KnockoutObservable<number>;
    totalDigimonEncountered: KnockoutObservable<number>;
    totalDigimonHatched: KnockoutObservable<number>;
    totalDotDigimonScanned: KnockoutObservable<number>;
    totalDotDigimonDefeated: KnockoutObservable<number>;
    totalDotDigimonEncountered: KnockoutObservable<number>;
    totalDotDigimonHatched: KnockoutObservable<number>;
    // Underground
    junkyardItemsFound: KnockoutObservable<number>;
    junkyardLayersMined: KnockoutObservable<number>;
    junkyardDailyDealTrades: KnockoutObservable<number>;
    // Farm
    totalManualBurns: KnockoutObservable<number>;
    totalDisksObtained: KnockoutObservable<number>;
    totalDisksBurned: KnockoutObservable<number>;
    totalDisksReplaced: KnockoutObservable<number>;
    totalDisksModified: KnockoutObservable<number>;
    totalBoostsUsed: KnockoutObservable<number>;
    totalDiscardsUsed: KnockoutObservable<number>;
    diskDailyDealTrades: KnockoutObservable<number>;
    // Battle Frontier
    colosseumTotalStagesCompleted: KnockoutObservable<number>;
    colosseumHighestStageCompleted: KnockoutObservable<number>;

    /*
     * arrayObservables
     */
    digiscansUsed: Array<KnockoutObservable<number>>;
    digiscansBought: Array<KnockoutObservable<number>>;
    digiscansObtained: Array<KnockoutObservable<number>>;
    // Other
    chipsGained: Array<KnockoutObservable<number>>;
    hinaItemUses: Array<KnockoutObservable<number>>;
    // Farm
    disksBurned: Array<KnockoutObservable<number>>;
    disksObtained: KnockoutObservable<number>;
    boostsUsed: Array<KnockoutObservable<number>>;
    // Battle
    routeKills: Record<string, Record<string, KnockoutObservable<number>>>;
    challengesDefeated: Array<KnockoutObservable<number>>;
    dungeonsCleared: Array<KnockoutObservable<number>>;
    temporaryBattleDefeated: Array<KnockoutObservable<number>>;

    /*
     * objectObservables
     */
    digimonScanned: any;
    digimonDefeated: any;
    digimonEncountered: any;
    digimonHatched: any;
    dotDigimonScanned: any;
    dotDigimonDefeated: any;
    dotDigimonEncountered: any;
    dotDigimonHatched: any;

    observables = [
        'secondsPlayed',
        'clickAttacks',
        'questsCompleted',
        'totalChipsGained',
        'totalProteinsObtained',
        'totalMoney',
        'totalDungeonTokens',
        'totalQuestPoints',
        'totalDiamonds',
        'totalFarmPoints',
        'totalBattlePoints',
        'totalExploreCoins',
        'totalHealthCoins',
        'totalAttackCoins',
        'totalDefenceCoins',
        'totalSpeedCoins',
        'totalIntCoins',
        'totalMagicCoins',
        'totalDigimonScanned',
        'totalDigimonDefeated',
        'totalDigimonEncountered',
        'totalDigimonHatched',
        'totalDotDigimonScanned',
        'totalDotDigimonDefeated',
        'totalDotDigimonEncountered',
        'totalDotDigimonHatched',
        'junkyardItemsFound',
        'junkyardLayersMined',
        'junkyardDailyDealTrades',
        'totalManualBurns',
        'totalDisksBurned',
        'totalDisksObtained',
        'totalDisksReplaced',
        'totalDisksModified',
        'totalBoostsUsed',
        'totalDiscardsUsed',
        'diskDailyDealTrades',
        'colisseumTotalStagesCompleted',
        'colisseumHighestStageCompleted',
    ];
    arrayObservables = [
        'challengesDefeated',
        'dungeonsCleared',
        'digiscansUsed',
        'digiscansBought',
        'digiscansObtained',
        'chipsGained',
        'hinaItemUses',
        'disksBurned',
        'disksObtained',
        'boostsUsed',
        'temporaryBattleDefeated',
    ];
    // These will allow negative values (special events etc)
    objectObservables = [
        'digimonScanned',
        'digimonDefeated',
        'digimonEncountered',
        'digimonHatched',
        'dotDigimonCaptured',
        'dotDigimonDefeated',
        'dotDigimonEncountered',
        'dotDigimonHatched',
    ];
    // Observables that can be automatically generated
    autogeneratedObservables = [
        'routeKills',
    ];

    constructor() {
        this.observables.forEach((prop) => {
            this[prop] = ko.observable<number>(0).extend({ numeric: 0 });
        });

        this.arrayObservables.forEach((array) => {
            // We use a proxy to generate new array observables on the fly.
            this[array] = new Proxy([], {
                get: (statistics, prop: string) => {
                    if (typeof statistics[prop] !== 'undefined') {
                        return statistics[prop];
                    }

                    // If it's not an int or less than zero, we do not want to set it
                    const id: number = Math.floor(Number(prop));
                    if (Number.isNaN(id) || id < 0 || id !== Number(prop)) {
                        if (Number.isNaN(id)) {
                            // eslint-disable-next-line no-console
                            console.trace(`[Statistics] [${array}] Invalid property requested:`, prop);
                        }
                        return failedSetValue;
                    }

                    // eslint-disable-next-line no-param-reassign
                    statistics[id] = ko.observable<number>(0).extend({ numeric: 0 });
                    return statistics[id];
                },

                // This makes it so the stats observable can't be accidently changed
                set: (
                    obj: Array<KnockoutObservable<number>>,
                    prop: number,
                    value: number,
                ): boolean => {
                    const result = obj[prop](value);
                    return result === failedSetValue;
                },

                // This is needed for map, forEach etc to work,
                // because they want to check if target.hasOwnProperty("0") first.
                // The ko function doesn't seem to have any OwnProperties anyway,
                // so no harm here (don't quote me)
                // eslint-disable-next-line func-names
                has: (target: any, prop: string) => Reflect.has(target, prop),
            });
        });

        this.objectObservables.forEach((object) => {
            this[object] = new Proxy({}, {
                get: (statistics, prop: string) => {
                    if (typeof statistics[prop] !== 'undefined') {
                        return statistics[prop];
                    }

                    if (prop === 'highestID') {
                        let highestID = 0;
                        Object.entries(statistics).forEach(([key, val]: [string, () => number]) => {
                            const numKey = Number(key);
                            if (!Number.isNaN(numKey) && numKey > highestID && val() > 0) {
                                highestID = numKey;
                            }
                        });
                        return highestID;
                    }

                    // If it's not an int, we do not want to set it
                    const id = Number(prop);
                    if (Number.isNaN(id)) {
                        // eslint-disable-next-line no-console
                        console.trace(`[Statistics] [${object}] Invalid property requested:`, prop);
                        return () => 0;
                    }

                    // eslint-disable-next-line no-param-reassign
                    statistics[id] = ko.observable<number>(0).extend({ numeric: 0 });
                    return statistics[id];
                },

                // This makes it so the stats observable can't be accidently changed
                set: (obj: any, prop: number, value: number): boolean => {
                    const result = obj[prop](value);
                    return result === failedSetValue;
                },

                // This is needed for map, forEach etc to work,
                // because they want to check if target.hasOwnProperty("0") first.
                // The ko function doesn't seem to have any OwnProperties anyway,
                // so no harm here (don't quote me)
                // eslint-disable-next-line func-names
                has: (target: any, prop: string) => Reflect.has(target, prop),
            });
        });

        // We use a proxy to generate new array observables on the fly.
        this.routeKills = getRouteKillsProxy();
    }

    toJSON(): Record<string, any> {
        const saveObject = {};

        const getSaveDataValue = (rawInput) => {
            // Unwrap the value immediately, so we are always working with JS types
            const input = ko.unwrap(rawInput);

            if (Array.isArray(input)) {
                // Recurse arrays through getSaveDataValue, to get any observable values
                return input.map(getSaveDataValue);
            }

            if (typeof input === 'object' && !ko.isObservable(input)) {
                // Recurse objects through getSaveDataValue, to get any observable values
                return Object.entries(input).reduce((acc, [nextKey, nextValue]) => {
                    if (nextValue === 0) {
                        return acc;
                    }
                    acc[nextKey] = getSaveDataValue(nextValue);
                    return acc;
                }, {});
            }

            // If we get here, it isn't an array or object, so it must be a value.
            return input;
        };

        // Since we're able to flatten arrays/objects/values with a single function,
        // process all of them together
        [].concat(
            this.observables,
            this.arrayObservables,
            this.objectObservables,
            this.autogeneratedObservables,
        ).forEach((prop) => { saveObject[prop] = getSaveDataValue(this[prop]); });

        return saveObject;
    }

    fromJSON(json: Record<string, any>): void {
        if (!json) {
            return;
        }

        this.observables.forEach((prop) => { this[prop](json[prop] || 0); });

        this.arrayObservables.forEach((array) => {
            json[array]?.forEach((el, index) => {
                if (this[array] && this[array][index] && !Number.isNaN(Number(el))) {
                    this[array][index](Number(el));
                }
            });
        });

        this.objectObservables.forEach((object) => {
            if (!json[object]) { return; }

            Object.entries(json[object]).forEach(([key, val]) => {
                const num = Number(val);
                if (!Number.isNaN(num) && num) {
                    this[object][key](num);
                }
            });
        });

        const setAutogeneratedObservable = (objSet, objGet, key) => {
            // Don't try to process a null value. We should retain the defaults
            if (objGet[key] === null) {
                return;
            }

            if (typeof objSet[key] === 'undefined') {
                // Skip any values that are not allowed to be set
                // eslint-disable-next-line no-console
                console.trace('[Statistics] Could not set:', key);
            } else if (Array.isArray(objGet[key])) {
                // If we've found an array, loop into it
                for (let i = 0; i < objGet[key].length; i += 1) {
                    setAutogeneratedObservable(objSet[key], objGet[key], i);
                }
            } else if (typeof objGet[key] === 'object') {
                // If we've found an object, nest into it
                Object.keys(objGet[key]).forEach((nestedKey) => {
                    setAutogeneratedObservable(objSet[key], objGet[key], nestedKey);
                });
            } else if (ko.isObservable(objSet[key])) {
                // If we've found an observable, set it
                objSet[key](objGet[key]);
            } else {
                // eslint-disable-next-line no-console
                console.trace('[Statistics] Could not determine action to take for set:', key);
            }
        };
        this.autogeneratedObservables.forEach((object) => {
            if (!json[object]) { return; }
            setAutogeneratedObservable(this, json, object);
        });
    }
}
