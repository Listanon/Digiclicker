///<reference path="Item.ts"/>

class ShovelItem extends Item {

    constructor(basePrice: number, displayName: string, description: string) {
        super('Berry_Shovel', basePrice, GameConstants.Currency.farmPoint, { multiplierDecreaser: MultiplierDecreaser.Berry }, undefined, displayName, description, 'farm');
    }

    gain(amt: number) {
        GameHelper.incrementObservable(App.game.farming.shovelAmt, amt);
    }

}

ItemList['Berry_Shovel']   = new ShovelItem(300, 'Uninstaller', 'Stops the burning process for disks.');

class MulchShovelItem extends Item {

    constructor(basePrice: number, displayName: string, description: string) {
        super('Mulch_Shovel', basePrice, GameConstants.Currency.farmPoint, { multiplierDecreaser: MultiplierDecreaser.Berry }, undefined, displayName, description, 'farm');
    }

    gain(amt: number) {
        GameHelper.incrementObservable(App.game.farming.mulchShovelAmt, amt);
    }

}

ItemList['Mulch_Shovel'] = new MulchShovelItem(300, 'Unbooster', 'Removes Boosts from a spot in the disk tray.');
