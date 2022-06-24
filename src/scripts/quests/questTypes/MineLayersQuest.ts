/// <reference path="../Quest.ts" />

class MineLayersQuest extends Quest implements QuestInterface {

    constructor(amount: number, reward: number) {
        super(amount, reward);
        this.focus = App.game.statistics.junkyardLayersMined;
    }

    public static canComplete() {
        return App.game.underground.canAccess();
    }

    public static generateData(): any[] {
        const amount = SeededRand.intBetween(1, 3);
        const reward = this.calcReward(amount);
        return [amount, reward];
    }

    private static calcReward(amount: number): number {
        const reward = Math.ceil(amount * GameConstants.MINE_LAYERS_BASE_REWARD);
        return super.randomizeReward(reward);
    }

    get description(): string {
        const suffix = this.amount > 1 ? 's' : '';
        return `Dig ${this.amount.toLocaleString('en-US')} layer${suffix} in the Junkyard.`;
    }

    toJSON() {
        const json = super.toJSON();
        json['name'] = this.constructor.name;
        return json;
    }
}
