/// <reference path="../Quest.ts" />

class UseOakItemQuest extends Quest implements QuestInterface {

    private item: OakItemType;

    constructor(amount: number, reward: number, item: OakItemType) {
        super(amount, reward);
        this.item = item;
        this.focus = App.game.statistics.hinaItemUses[this.item];
    }

    public static canComplete() {
        return App.game.oakItems.canAccess() && !App.game.challenges.list.disableOakItems.active();
    }

    public static generateData(): any[] {
        const possibleItems = [
            OakItemType.Memory_Stick,
            OakItemType.Topaz,
            // OakItemType.Fancy_Cursor,
            OakItemType.Millionaire_USB,
            // OakItemType.Megabyte,
            // OakItemType.Pixel_Stone,
            // OakItemType.Egg_Holder,
            // OakItemType.Full_Battery,
            // OakItemType.Demo_Disk,
            // OakItemType.Failure_Prevent,
            // OakItemType.Golden_DVD,
            // OakItemType.Shiny_Mirror,
        ];
        const oakItem = SeededRand.fromArray(possibleItems);
        const amount = SeededRand.intBetween(100, 500);
        const reward = this.calcReward(amount, oakItem);
        return [amount, reward, oakItem];
    }

    private static calcReward(amount: number, item: OakItemType) {
        const reward = amount * GameConstants.USE_OAK_ITEM_BASE_REWARD;
        return super.randomizeReward(reward);
    }

    get description(): string {
        const desc = [];
        desc.push(`Equip the ${GameConstants.humanifyString(OakItemType[this.item])} and`);
        if (this.item == OakItemType.Memory_Stick) {
            desc.push(`scan ${this.amount.toLocaleString('en-US')} wild Digimon.`);
        } else if (this.item == OakItemType.Topaz) {
            desc.push(`earn DigiDollars ${this.amount.toLocaleString('en-US')} times.`);
        } else if (this.item == OakItemType.Millionaire_USB) {
            desc.push(`defeat ${this.amount.toLocaleString('en-US')} Digimon.`);
        } else {
            desc.push(`gain it\'s benefit ${this.amount.toLocaleString('en-US')} times.`);
        }
        return desc.join(' ');
    }

    toJSON() {
        const json = super.toJSON();
        json['name'] = this.constructor.name;
        json['data'].push(this.item);
        return json;
    }
}
