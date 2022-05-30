/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { Observable as KnockoutObservable } from 'knockout';
import { Feature } from '../DataStore/common/Feature';
import GameHelper from '../GameHelper';
import { Currency } from '../GameConstants';
import Multiplier from '../multiplier/Multiplier';
import Amount from './Amount';
import { animateCurrency } from '../utilities/UI';

export default class Wallet implements Feature {
    name = 'Wallet';
    saveKey = 'wallet';
    currencies: Array<KnockoutObservable<number>>;

    defaults = {
        currencies: new Array(GameHelper.enumLength(Currency)).fill(0),
    };

    constructor(private multiplier: Multiplier) {
        this.currencies = this.defaults.currencies.map((v) => ko.observable(v));
    }

    public gainMoney(base: number, ignoreBonus = false): Amount {
        return this.addAmount(new Amount(base, Currency.money), ignoreBonus);
    }

    public gainDungeonTokens(base: number, ignoreBonus = false): Amount {
        return this.addAmount(new Amount(base, Currency.dungeonToken), ignoreBonus);
    }

    public gainQuestPoints(base: number, ignoreBonus = false): Amount {
        return this.addAmount(new Amount(base, Currency.questPoint), ignoreBonus);
    }

    public gainDiamonds(base: number, ignoreBonus = false): Amount {
        return this.addAmount(new Amount(base, Currency.diamond), ignoreBonus);
    }

    public gainFarmPoints(base: number, ignoreBonus = false): Amount {
        return this.addAmount(new Amount(base, Currency.farmPoint), ignoreBonus);
    }

    public gainBattlePoints(base: number, ignoreBonus = false): Amount {
        return this.addAmount(new Amount(base, Currency.battlePoint), ignoreBonus);
    }
    
    public gainExplorecoin(base: number, ignoreBonus = false): Amount {
        return this.addAmount(new Amount(base, Currency.explorecoin), ignoreBonus);
    }
    
    public gainAttackcoin(base: number, ignoreBonus = false): Amount {
        return this.addAmount(new Amount(base, Currency.attackcoin), ignoreBonus);
    }
    
    public gainDefencecoin(base: number, ignoreBonus = false): Amount {
        return this.addAmount(new Amount(base, Currency.defencecoin), ignoreBonus);
    }
    
    public gainSpeedcoin(base: number, ignoreBonus = false): Amount {
        return this.addAmount(new Amount(base, Currency.speedcoin), ignoreBonus);
    }
    
    public gainHealthcoin(base: number, ignoreBonus = false): Amount {
        return this.addAmount(new Amount(base, Currency.healthcoin), ignoreBonus);
    }
    
    public gainMagiccoin(base: number, ignoreBonus = false): Amount {
        return this.addAmount(new Amount(base, Currency.magiccoin), ignoreBonus);
    }
    
    public gainIntcoin(base: number, ignoreBonus = false): Amount {
        return this.addAmount(new Amount(base, Currency.intcoin), ignoreBonus);
    }

    public calcBonus(amount: Amount) {
        switch (amount.currency) {
            case Currency.money:
                return this.multiplier.getBonus('money', true);
            case Currency.dungeonToken:
                return this.multiplier.getBonus('dungeonToken', true);
            case Currency.questPoint:
            case Currency.diamond:
            case Currency.farmPoint:
            case Currency.battlePoint:
            case Currency.explorecoin:
            case Currency.attackcoin:
            case Currency.defencecoin:
            case Currency.speedcoin:
            case Currency.healthcoin:
            case Currency.magiccoin:
            case Currency.intcoin:
            default:
                return 1;
        }
    }

    public addAmount(amount: Amount, ignoreBonus = false) {
        if (Number.isNaN(amount.amount) || amount.amount <= 0) {
            console.trace('Could not add amount:', amount);
            amount.amount = 1;
        }

        // Calculate the bonuses
        if (!ignoreBonus) {
            amount.amount = Math.floor(amount.amount * this.calcBonus(amount));
        }

        GameHelper.incrementObservable(this.currencies[amount.currency], amount.amount);
        animateCurrency(amount);

        switch (amount.currency) {
            case Currency.money:
                GameHelper.incrementObservable(App.game.statistics.totalMoney, amount.amount);
                break;
            case Currency.dungeonToken:
                GameHelper.incrementObservable(App.game.statistics.totalDungeonTokens, amount.amount);
                break;
            case Currency.questPoint:
                GameHelper.incrementObservable(App.game.statistics.totalQuestPoints, amount.amount);
                break;
            case Currency.diamond:
                GameHelper.incrementObservable(App.game.statistics.totalDiamonds, amount.amount);
                break;
            case Currency.farmPoint:
                GameHelper.incrementObservable(App.game.statistics.totalFarmPoints, amount.amount);
                break;
            case Currency.battlePoint:
                GameHelper.incrementObservable(App.game.statistics.totalBattlePoints, amount.amount);
                break;
            case Currency.explorecoin:
                GameHelper.incrementObservable(App.game.statistics.totalExploreCoins, amount.amount);
                break;
            case Currency.attackcoin:
                GameHelper.incrementObservable(App.game.statistics.totalAttackCoins, amount.amount);
                break;
            case Currency.defencecoin:
                GameHelper.incrementObservable(App.game.statistics.totalDefenceCoins, amount.amount);
                break;
            case Currency.speedcoin:
                GameHelper.incrementObservable(App.game.statistics.totalSpeedCoins, amount.amount);
                break;
            case Currency.healthcoin:
                GameHelper.incrementObservable(App.game.statistics.totalHealthCoins, amount.amount);
                break;
            case Currency.magiccoin:
                GameHelper.incrementObservable(App.game.statistics.totalMagicCoins, amount.amount);
                break;
            case Currency.intcoin:
                GameHelper.incrementObservable(App.game.statistics.totalIntCoins, amount.amount);
                break;
            default:
                break;
        }

        return amount;
    }

    public hasAmount(amount: Amount) {
        return this.currencies[amount.currency]() >= amount.amount;
    }

    public loseAmount(amount: Amount): boolean {
        if (Number.isNaN(amount.amount) || amount.amount <= 0) {
            console.trace('Could not remove amount:', amount);
            amount.amount = 1;
        }

        // If the player doesn't have enough, return false (we shouldn't be able to go negative)
        if (!this.hasAmount(amount)) {
            return false;
        }

        GameHelper.incrementObservable(this.currencies[amount.currency], -amount.amount);
        return true;
    }

    initialize(): void {
    }

    canAccess(): boolean {
        return true;
    }

    fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }

        this.currencies = this.defaults.currencies.map((v) => ko.observable(v));
        if (json.currencies !== null) {
            const currenciesJson = json.currencies;
            currenciesJson.forEach((value, index) => {
                this.currencies[index](value || 0);
            });
        }
    }

    toJSON(): Record<string, any> {
        return {
            currencies: this.currencies.map(ko.unwrap),
        };
    }

    update(): void {
        // This method intentionally left blank
    }
}
