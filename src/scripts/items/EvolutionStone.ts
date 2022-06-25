///<reference path="Item.ts"/>
class EvolutionStone extends CaughtIndicatingItem {

    type: GameConstants.StoneType;
    public unlockedRegion: GameConstants.Region;

    constructor(type: GameConstants.StoneType, basePrice: number, currency: GameConstants.Currency = GameConstants.Currency.diamond, displayName: string, unlockedRegion?: GameConstants.Region) {
        super(GameConstants.StoneType[type], basePrice, currency, undefined, undefined, displayName, 'An evolution item. See your itembag for more information.', 'evolution');
        this.type = type;
        this.unlockedRegion = unlockedRegion;
    }

    public gain(n: number) {
        player.gainItem(GameConstants.StoneType[this.type], n);
    }

    public use(pokemon?: PokemonNameType): boolean {
        const partyPokemon: PartyPokemon = App.game.party.getPokemon(PokemonHelper.getPokemonByName(pokemon).id);
        const shiny = partyPokemon.useStone(this.type);
        return shiny;
    }

    getCaughtStatus = ko.pureComputed((): CaughtStatus => {
        // Only include Pokémon which have evolutions
        const unlockedEvolutions = pokemonList.filter((p: PokemonListData) => p.evolutions)
            // only include base Pokémon we have caught
            .filter(p => PartyController.getCaughtStatusByName(p.name))
            // Map to the evolution which uses this stone type
            .map((p: PokemonListData) => p.evolutions.filter(e => e.type.includes(EvolutionType.Stone) && (e as StoneEvolution).stone === this.type))
            // Flatten the array (in case of multiple evolutions)
            .flat()
            // Ensure the we actually found an evolution
            .filter(evolution => evolution)
            // Filter out any Pokémon which can't be obtained yet (future region)
            .filter(evolution => PokemonHelper.calcNativeRegion(evolution.getEvolvedPokemon()) <= player.highestRegion())
            // Finally get the evolution
            .map(evolution => evolution.getEvolvedPokemon());

        if (unlockedEvolutions.length == 0) {
            return undefined;
        }

        // Calculate the lowest caught status
        return unlockedEvolutions.reduce((status: CaughtStatus, pokemonName: PokemonNameType) => {
            return Math.min(status, PartyController.getCaughtStatusByName(pokemonName));
        }, CaughtStatus.CaughtShiny);
    });
}

// TODO: Set prices for different kinds of stones
ItemList['Purity_Digimental']        = new EvolutionStone(GameConstants.StoneType.Purity_Digimental, 250, undefined, 'Purity Digimental');
ItemList['Courage_Digimental']        = new EvolutionStone(GameConstants.StoneType.Courage_Digimental, 250, undefined, 'Courage Digimental');
ItemList['Sincerity_Digimental']       = new EvolutionStone(GameConstants.StoneType.Sincerity_Digimental, 250, undefined, 'Sincerity Digimental');
ItemList['Knowledge_Digimental']     = new EvolutionStone(GameConstants.StoneType.Knowledge_Digimental, 250, undefined, 'Knowledge Digimental');
ItemList['Hope_Digimental']        = new EvolutionStone(GameConstants.StoneType.Hope_Digimental, 250, undefined, 'Hope Digimental');
ItemList['Kindness_Digimental']       = new EvolutionStone(GameConstants.StoneType.Kindness_Digimental, 250, undefined, 'Kindness Digimental');
ItemList['Love_Digimental']         = new EvolutionStone(GameConstants.StoneType.Love_Digimental, 250, undefined, 'Love Digimental');
ItemList['Soothe_bell']       = new EvolutionStone(GameConstants.StoneType.Soothe_bell, 250, undefined , 'Soothe Bell');
ItemList['Metal_coat']        = new EvolutionStone(GameConstants.StoneType.Metal_coat, 250, undefined , 'Metal Coat');
ItemList['Kings_rock']        = new EvolutionStone(GameConstants.StoneType.Kings_rock, 250, undefined , 'King\'s Rock');
ItemList['Upgrade']           = new EvolutionStone(GameConstants.StoneType.Upgrade, 250, undefined , 'Upgrade');
ItemList['Dragon_scale']      = new EvolutionStone(GameConstants.StoneType.Dragon_scale, 250, undefined, 'Dragon Scale');
ItemList['Prism_scale']       = new EvolutionStone(GameConstants.StoneType.Prism_scale, 250, undefined , 'Prism Scale');
ItemList['Deepsea_tooth']     = new EvolutionStone(GameConstants.StoneType.Deepsea_tooth, 250, undefined , 'Deep Sea Tooth');
ItemList['Deepsea_scale']     = new EvolutionStone(GameConstants.StoneType.Deepsea_scale, 250, undefined , 'Deep Sea Scale');
ItemList['Miracles_Digimental']       = new EvolutionStone(GameConstants.StoneType.Miracles_Digimental, 250, undefined , 'Miracles Digimental');
ItemList['Fate_Digimental']        = new EvolutionStone(GameConstants.StoneType.Fate_Digimental, 250, undefined , 'Fate Digimental');
ItemList['Light_Digimental']        = new EvolutionStone(GameConstants.StoneType.Light_Digimental, 250, undefined , 'Light Digimental');
ItemList['Razor_claw']        = new EvolutionStone(GameConstants.StoneType.Razor_claw, 250, undefined , 'Razor Claw');
ItemList['Razor_fang']        = new EvolutionStone(GameConstants.StoneType.Razor_fang, 250, undefined , 'Razor Fang');
ItemList['Electirizer']       = new EvolutionStone(GameConstants.StoneType.Electirizer, 250, undefined , 'Electirizer');
ItemList['Magmarizer']        = new EvolutionStone(GameConstants.StoneType.Magmarizer, 250, undefined , 'Magmarizer');
ItemList['Protector']         = new EvolutionStone(GameConstants.StoneType.Protector, 250, undefined , 'Protector');
ItemList['Dubious_disc']      = new EvolutionStone(GameConstants.StoneType.Dubious_disc, 250, undefined , 'Dubious Disc');
ItemList['Reaper_cloth']      = new EvolutionStone(GameConstants.StoneType.Reaper_cloth, 250, undefined , 'Reaper Cloth');
ItemList['Black_DNA']         = new EvolutionStone(GameConstants.StoneType.Black_DNA, 250, undefined, 'Black DNA');
ItemList['White_DNA']         = new EvolutionStone(GameConstants.StoneType.White_DNA, 250, undefined, 'White DNA');
ItemList['Sachet']            = new EvolutionStone(GameConstants.StoneType.Sachet, 250, undefined , 'Sachet');
ItemList['Whipped_dream']     = new EvolutionStone(GameConstants.StoneType.Whipped_dream, 250, undefined , 'Whipped Dream');
ItemList['Friendship_Digimental']         = new EvolutionStone(GameConstants.StoneType.Friendship_Digimental, 250, undefined , 'Friendship Digimental');
