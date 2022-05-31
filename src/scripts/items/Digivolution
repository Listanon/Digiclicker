/// <reference path="CaughtIndicatingItem.ts" />

class DigimonItem extends CaughtIndicatingItem {

    type: PokemonNameType;

    constructor(pokemon: PokemonNameType,
                 basePrice: number, currency: GameConstants.Currency = GameConstants.Currency.healthcoin, 
                 basePrice: number, currency: GameConstants.Currency = GameConstants.Currency.attackcoin, 
                 basePrice: number, currency: GameConstants.Currency = GameConstants.Currency.defencecoin,
                 basePrice: number, currency: GameConstants.Currency = GameConstants.Currency.speedcoin,
                 basePrice: number, currency: GameConstants.Currency = GameConstants.Currency.intcoin,
                 basePrice: number, currency: GameConstants.Currency = GameConstants.Currency.magiccoin) {
        super(pokemon, basePrice, currency, undefined, undefined, undefined, 'DigimonItem');
        this.type = pokemon;
    }

    gain(amt: number) {
        let shiny = false;
        for (let i = 0; i < amt; i++) {
            shiny = shiny || PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_SHOP);
        }
        const pokemonName = this.name as PokemonNameType;
        if (shiny) {
            Notifier.notify({
                message: `✨ You obtained a shiny ${pokemonName}! ✨`,
                type: NotificationConstants.NotificationOption.warning,
            });
        }
        App.game.party.gainPokemonById(PokemonHelper.getPokemonByName(pokemonName).id, shiny, true);
    }

    getCaughtStatus(): CaughtStatus {
        return PartyController.getCaughtStatusByName(this.name as PokemonNameType);
    }

    get image() {
        const subDirectory = this.imageDirectory ? `${this.imageDirectory}/` : '';
        return `assets/images/items/${subDirectory}${this.name.replace(/[^\s\w.()-]/g, '')}.png`;
    }
}

ItemList['Eevee']                = new DigimonItem('Eevee', 4000);
ItemList['Porygon']              = new DigimonItem('Porygon', 2000);
ItemList['Jynx']                 = new DigimonItem('Jynx', 2000);
ItemList['Mr. Mime']             = new DigimonItem('Mr. Mime', 1000);
ItemList['Lickitung']            = new DigimonItem('Lickitung', 1000);
ItemList['Magikarp']             = new DigimonItem('Magikarp', 50000, Currency.money);
ItemList['Togepi']               = new DigimonItem('Togepi', 15000);
ItemList['Beldum']               = new DigimonItem('Beldum', 22500);
ItemList['Skorupi']              = new DigimonItem('Skorupi', 6750);
ItemList['Combee']               = new DigimonItem('Combee', 6750);
ItemList['Burmy (plant)']        = new DigimonItem('Burmy (plant)', 6750);
ItemList['Cherubi']              = new DigimonItem('Cherubi', 6750);
ItemList['Spiritomb']            = new DigimonItem('Spiritomb', 6750);
ItemList['Zorua']                = new DigimonItem('Zorua', 50625);
ItemList['Meloetta (pirouette)'] = new DigimonItem('Meloetta (pirouette)', 200000);
ItemList['Furfrou (Debutante)']  = new DigimonItem('Furfrou (Debutante)', 1, Currency.money, 1, Currency.healthcoin, 1, Currency.attackcoin, 1, Currency.defencecoin);
ItemList['Furfrou (Diamond)']    = new DigimonItem('Furfrou (Diamond)', 1, Currency.speedcoin, 1, Currency.intcoin, 1, Currency.magiccoin);
ItemList['Furfrou (Matron)']     = new DigimonItem('Furfrou (Matron)', 1500000, Currency.farmPoint);
ItemList['Furfrou (Dandy)']      = new DigimonItem('Furfrou (Dandy)', 250000);
ItemList['Furfrou (Kabuki)']     = new DigimonItem('Furfrou (Kabuki)', 75000, Currency.battlePoint);
ItemList['Furfrou (Pharaoh)']    = new DigimonItem('Furfrou (Pharaoh)', 300000000, Currency.dungeonToken);
ItemList['Type: Null']           = new DigimonItem('Type: Null', 114000);
ItemList['Poipole']              = new DigimonItem('Poipole', 90000);
ItemList['Eternatus']            = new DigimonItem('Eternatus', 50000);
ItemList['Toxel']                = new DigimonItem('Toxel', 30000);
