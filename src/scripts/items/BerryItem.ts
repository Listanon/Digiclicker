///<reference path="Item.ts"/>

class BerryItem extends Item {
    public berryName: string;

    constructor(public berry: BerryType, basePrice: number, currency = GameConstants.Currency.farmPoint, public berryReq?: BerryType) {
        super(`${BerryType[berry]}Berry`, basePrice, currency, { maxAmount: 1 } , undefined, `${BerryType[berry]} Disk`);
        this.berryName = BerryType[berry];
    }

    gain(amt: number) {
        App.game.farming.gainBerry(this.berry, amt, false);
    }

    get description(): string {
        return `Obtain a ${this.berryName}<br/><i>(No Hina Item challenge runs only)</i>`;
    }

    isAvailable(): boolean {
        const hasBerry = !!App.game.farming.berryList[this.berry]() ?? false;
        const unlockedBerryReq = App.game.farming.unlockedBerries[this.berryReq]?.() ?? false;
        const noOakItemChallenge = App.game.challenges.list.disableOakItems.active();
        return super.isAvailable() && !hasBerry && unlockedBerryReq && noOakItemChallenge;
    }

    get image() {
        return `assets/images/items/berry/${this.berryName}.png`;
    }
}

ItemList['PuzzleDisk']   = new BerryItem(BerryType.Puzzle, 10000, GameConstants.Currency.farmPoint, BerryType.Advice);
ItemList['FortuneDisk']   = new BerryItem(BerryType.Fortune, 10000, GameConstants.Currency.farmPoint, BerryType.Search);
ItemList['ExerciseDisk']   = new BerryItem(BerryType.Exercise, 10000, GameConstants.Currency.farmPoint, BerryType.Gourmet);
ItemList['LibraryDisk']   = new BerryItem(BerryType.Library, 10000, GameConstants.Currency.farmPoint, BerryType.Dictionary);
