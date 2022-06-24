/// <reference path="Item.ts"/>
/// <reference path="../../declarations/enums/MulchType.d.ts"/>

class MulchItem extends Item {
    type: MulchType;

    constructor(type: MulchType, basePrice: number, displayName: string, description: string) {
        super(MulchType[type], basePrice, GameConstants.Currency.farmPoint, { multiplierDecreaser: MultiplierDecreaser.Berry }, undefined, displayName, description, 'farm');
        this.type = type;
    }

    gain(amt: number) {
        GameHelper.incrementObservable(App.game.farming.mulchList[this.type], amt);
    }

}

ItemList['Speed_Boost']   = new MulchItem(MulchType.Boost_Mulch, 50, 'Speed Boost', 'Increases Disk burn speed.');
ItemList['Space_Boost']  = new MulchItem(MulchType.Rich_Mulch, 100, 'Space Boost', 'Increases Disk production.');
ItemList['Surprise_Boost']  = new MulchItem(MulchType.Surprise_Mulch, 150, 'Surprise Boost', 'Increases disk modification rate.');
ItemList['Quality_Boost'] = new MulchItem(MulchType.Amaze_Mulch, 200, 'Quality Boost', 'Increases all boost effects.');
