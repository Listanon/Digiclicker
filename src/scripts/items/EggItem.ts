/// <reference path="CaughtIndicatingItem.ts" />

class EggItem extends CaughtIndicatingItem {

    type: GameConstants.EggItemType;

    constructor(type: GameConstants.EggItemType, basePrice: number, currency: GameConstants.Currency = GameConstants.Currency.farmPoint, displayName?: string) {
        super(GameConstants.EggItemType[type], basePrice, currency, undefined, undefined, displayName, 'An egg. Can be hatched in the Day Care.', 'egg');
        this.type = type;
    }

    use(): boolean {
        if (player.itemList[this.name]() <= 0) {
            return false;
        }

        let success: boolean;
        if (this.type === GameConstants.EggItemType.Pokemon_egg) {
            success = App.game.breeding.gainPokemonEgg(pokemonMap.randomRegion(player.highestRegion()));
        } else if (this.type === GameConstants.EggItemType.Mystery_egg) {
            success = App.game.breeding.gainRandomEgg();
        } else {
            const etype = EggType[GameConstants.EggItemType[this.type].split('_')[0]];
            success = App.game.breeding.gainEgg(App.game.breeding.createTypedEgg(etype));
        }

        if (success) {
            player.loseItem(this.name, 1);
        }
        return success;
    }

    getCaughtStatus(): CaughtStatus {
        switch (this.type) {
            case (GameConstants.EggItemType.Pokemon_egg): {
                // random pokemon
                return CaughtStatus.NotCaught;
            }
            case (GameConstants.EggItemType.Mystery_egg): {
                return App.game.breeding.getAllCaughtStatus();
            }
            default: {
                const etype = EggType[GameConstants.EggItemType[this.type].split('_')[0]];
                return App.game.breeding.getTypeCaughtStatus(etype);
            }
        }
    }

}


ItemList['Fire_egg']     = new EggItem(GameConstants.EggItemType.Fire_egg, 1000, undefined, 'Fire Egg');
ItemList['Water_egg']    = new EggItem(GameConstants.EggItemType.Water_egg, 1000, undefined, 'Water Egg');
ItemList['Plant_egg']    = new EggItem(GameConstants.EggItemType.Plant_egg, 1000, undefined, 'Plant Egg');
ItemList['Earth_egg'] = new EggItem(GameConstants.EggItemType.Earth_egg, 1000, undefined, 'Earth egg');
ItemList['Electric_egg'] = new EggItem(GameConstants.EggItemType.Electric_egg, 1000, undefined, 'Electric Egg');
ItemList['Wind_egg']   = new EggItem(GameConstants.EggItemType.Wind_egg, 1000, undefined, 'Wind_egg');
ItemList['Pokemon_egg']  = new EggItem(GameConstants.EggItemType.Pokemon_egg, 1000, undefined, 'Digimon Egg');
ItemList['Mystery_egg']  = new EggItem(GameConstants.EggItemType.Mystery_egg, 700, undefined, 'Mystery Egg');
