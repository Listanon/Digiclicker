/// <reference path="../Quest.ts" />

class HarvestBerriesQuest extends Quest implements QuestInterface {

    private berryType: BerryType;

    constructor(amount: number, reward: number, berryType: BerryType) {
        super(amount, reward);
        this.berryType = berryType;
        this.focus = App.game.statistics.disksBurned[this.berryType];
    }

    public static canComplete() {
        return App.game.farming.canAccess();
    }

    public static generateData(): any[] {
        // Getting available Berries (always include Gen 1 Berries)
        const availableBerries = App.game.farming.berryData.filter(berry => App.game.farming.unlockedBerries[berry.type]() || berry.type < BerryType.Games);
        const berry = SeededRand.fromArray(availableBerries);

        const maxAmt = Math.min(300, Math.ceil(432000 / berry.growthTime[3]));
        const minAmt = Math.min(10, Math.ceil(maxAmt / 2));

        const amount = SeededRand.intBetween(minAmt, maxAmt);
        const reward = this.calcReward(amount, berry.type);
        return [amount, reward, berry.type];
    }

    private static calcReward(amount: number, berryType: BerryType): number {
        const harvestTime = App.game.farming.berryData[berryType].growthTime[3];
        const harvestAmt = Math.max(4, Math.ceil(App.game.farming.berryData[berryType].harvestAmount));
        const plantAmt = amount / harvestAmt;
        const fieldAmt = plantAmt / App.game.farming.plotList.length;
        const reward = Math.ceil(fieldAmt * Math.pow(harvestTime, .7) * 10);
        return super.randomizeReward(reward);
    }

    get description(): string {
        return `Burn ${this.amount.toLocaleString('en-US')} ${BerryType[this.berryType]} disks at the shop.`;
    }

    toJSON() {
        const json = super.toJSON();
        json['name'] = this.constructor.name;
        json['data'].push(this.berryType);
        return json;
    }
}
