/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="Item.ts" />

class PokeballItem extends Item {
    type: GameConstants.Pokeball;

    constructor(type: GameConstants.Pokeball, basePrice: number, currency: GameConstants.Currency = GameConstants.Currency.money, options?: ShopOptions, displayName?: string) {
        super(GameConstants.Pokeball[type], basePrice, currency, options, undefined, displayName, undefined, 'pokeball');
        this.type = type;
    }

    gain(amt: number) {
        App.game.pokeballs.gainPokeballs(this.type, amt);
    }

}

ItemList['Pokeball']   = new PokeballItem(GameConstants.Pokeball.Pokeball, 100, undefined, undefined, 'Digiscan');
ItemList['Greatball']  = new PokeballItem(GameConstants.Pokeball.Greatball, 500, undefined, undefined, 'Greatscan');
ItemList['Ultraball']  = new PokeballItem(GameConstants.Pokeball.Ultraball, 2000, undefined, undefined, 'Ultrascan');
ItemList['Masterball'] = new PokeballItem(GameConstants.Pokeball.Masterball, 2500, GameConstants.Currency.farmPoint, undefined, 'Masterscan');
// Not sold in shops
ItemList['Fastball'] = new PokeballItem(GameConstants.Pokeball.Fastball, Infinity, GameConstants.Currency.farmPoint, undefined, 'Fastscan');
ItemList['Quickball'] = new PokeballItem(GameConstants.Pokeball.Quickball, Infinity, GameConstants.Currency.farmPoint, undefined, 'Quickscan');
ItemList['Timerball'] = new PokeballItem(GameConstants.Pokeball.Timerball, Infinity, GameConstants.Currency.farmPoint, undefined, 'Timescan');
ItemList['Duskball'] = new PokeballItem(GameConstants.Pokeball.Duskball, Infinity, GameConstants.Currency.farmPoint, undefined, 'Duskscan');
ItemList['Luxuryball'] = new PokeballItem(GameConstants.Pokeball.Luxuryball, Infinity, GameConstants.Currency.farmPoint, undefined, 'Luxuryscan');
ItemList['Diveball'] = new PokeballItem(GameConstants.Pokeball.Diveball, Infinity, GameConstants.Currency.battlePoint, undefined, 'Divescan');
ItemList['Lureball'] = new PokeballItem(GameConstants.Pokeball.Lureball, Infinity, GameConstants.Currency.battlePoint, undefined, 'Lurescan');
ItemList['Nestball'] = new PokeballItem(GameConstants.Pokeball.Nestball, Infinity, GameConstants.Currency.battlePoint, undefined, 'Nestscan');
ItemList['Repeatball'] = new PokeballItem(GameConstants.Pokeball.Repeatball, Infinity, GameConstants.Currency.battlePoint, undefined, 'Repeatscan');
