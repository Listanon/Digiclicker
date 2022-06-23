///<reference path="../../declarations/enums/OakItemType.d.ts"/>
class BuyOakItem extends Item {

    item: OakItemType;

    constructor(item: OakItemType, basePrice: number, currency: GameConstants.Currency = GameConstants.Currency.farmPoint) {
        super(OakItemType[item], basePrice, currency, { maxAmount: 1 }, undefined, 'Purchase to unlock this Hina Item');
        this.item = item;
    }

    totalPrice(amt: number) {
        if (amt > this.maxAmount) {
            amt = this.maxAmount;
        }
        return this.basePrice * amt;
    }

    gain(amt: number) {
        const oakItem = App.game.oakItems.itemList[this.item];
        if (oakItem instanceof BoughtOakItem) {
            oakItem.purchased = true;
        }
    }

    isAvailable(): boolean {
        const oakItem = App.game.oakItems.itemList[this.item];
        const purchased = (oakItem instanceof BoughtOakItem) ? oakItem.purchased : true;
        return super.isAvailable() && !purchased;
    }

    get image(): string {
        return `assets/images/oakitems/${this.name}.png`;
    }

}

ItemList['Demo_Disk'] = new BuyOakItem(OakItemType.Demo_Disk, 5000, Currency.farmPoint);
ItemList['Failure_Prevent'] = new BuyOakItem(OakItemType.Failure_Prevent, 10000, Currency.farmPoint);
ItemList['Golden_DVD'] = new BuyOakItem(OakItemType.Golden_DVD, 5000, Currency.farmPoint);
ItemList['Shiny_Mirror'] = new BuyOakItem(OakItemType.Shiny_Mirror, 10000, Currency.farmPoint);
