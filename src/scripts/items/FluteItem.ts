///<reference path="Item.ts"/>
class FluteItem extends Item {
    name: GameConstants.FluteItemType;

    constructor(
        name: GameConstants.FluteItemType,
        description: string,
        public gemTypes: (keyof typeof PokemonType)[],
        public multiplierType: keyof typeof MultiplierType,
        public multiplyBy: number
    ) {
        super(name, Infinity, undefined, { maxAmount : 1 }, undefined, description, undefined, 'fluteItem');
    }

    use(): boolean {
        FluteEffectRunner.toggleEffect(this.name);
        return true;
    }

    getDescription(): string {
        const multiplier = ((this.getMultiplier() - 1) * 100).toFixed(2);
        return `+${multiplier}% bonus to ${this.description}`;
    }

    public getMultiplier() {
        return (this.multiplyBy - 1) * (AchievementHandler.achievementBonus() + 1) + 1;
    }

    isSoldOut(): boolean {
        return player.itemList[this.name]() > 0 || FluteEffectRunner.isActive(GameConstants.FluteItemType[this.name])();
    }

    checkCanUse(): boolean {
        if (App.game.challenges.list.disableGems.active()) {
            Notifier.notify({
                title: 'Challenge Mode',
                message: 'Gems are Disabled',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        if (App.game.challenges.list.disableBattleItems.active()) {
            Notifier.notify({
                title: 'Challenge Mode',
                message: 'Battle Items are Disabled',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        if (!FluteEffectRunner.isActive(GameConstants.FluteItemType[this.name])() && !player.itemList[this.name]()) {
            Notifier.notify({
                message: `You don't have any ${this.displayName}s...`,
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        if (FluteEffectRunner.getLowestGem(this.name) <= FluteEffectRunner.numActiveFlutes() + 1) {
            Notifier.notify({
                message: 'You don\'t have enough gems to use this Flute',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        return true;
    }

}

ItemList['H_Fire_Spirit']        = new FluteItem(GameConstants.FluteItemType.H_Fire_Spirit, 'Click Attack', ['Fighting', 'Fire', 'Poison'], 'clickAttack', 1.02);
ItemList['H_Light_Spirit']       = new FluteItem(GameConstants.FluteItemType.H_Light_Spirit, 'Exp Yield', ['Normal', 'Bug', 'Rock'], 'exp', 1.02);
ItemList['H_Wind_Spirit']        = new FluteItem(GameConstants.FluteItemType.H_Wind_Spirit, 'Item Drop Rate', ['Normal', 'Flying', 'Poison'], undefined, 1.02);
ItemList['H_Steel_Spirit']       = new FluteItem(GameConstants.FluteItemType.H_Steel_Spirit, 'Digidollar Yield', ['Dark', 'Electric', 'Steel'], 'money', 1.02);
ItemList['H_Water_Spirit']       = new FluteItem(GameConstants.FluteItemType.H_Water_Spirit, 'Scan Coin Yield', ['Dark', 'Ghost', 'Ice'], 'dungeonToken', 1.02);
ItemList['H_Thunder_Spirit']     = new FluteItem(GameConstants.FluteItemType.H_Thunder_Spirit, 'Digimon Attack', ['Fighting', 'Ice', 'Fairy'], 'pokemonAttack', 1.02);
ItemList['Azure_Flute']          = new FluteItem(GameConstants.FluteItemType.Azure_Flute, 'Shiny Chance', ['Dragon', 'Ghost', 'Steel'], 'shiny', 1.02);
ItemList['CH_Dark_Spirit']       = new FluteItem(GameConstants.FluteItemType.CH_Dark_Spirit, 'Roaming Chance', ['Flying', 'Dragon', 'Psychic'], 'roaming', 1.02);
ItemList['H_Dark_Spirit']        = new FluteItem(GameConstants.FluteItemType.H_Dark_Spirit, 'Egg Steps', ['Fire', 'Ground', 'Water'], 'eggStep', 1.02);
ItemList['H_Earth_Spirit']       = new FluteItem(GameConstants.FluteItemType.H_Earth_Spirit, 'Mining Energy Regeneration Yield and Time', ['Rock', 'Ground', 'Electric'], undefined, 1.02);
ItemList['H_Ice_Spirit']         = new FluteItem(GameConstants.FluteItemType.H_Ice_Spirit, 'Dungeon Timer', ['Grass', 'Psychic', 'Water'], undefined, 1.02);
ItemList['H_Wood_Spirit']        = new FluteItem(GameConstants.FluteItemType.H_Wood_Spirit, 'Farm Replant and Growth Multipliers', ['Grass', 'Bug', 'Fairy'], undefined, 1.02);
