///<reference path="Item.ts"/>
class BattleItem extends Item {

    type: GameConstants.BattleItemType;

    constructor(
        type: GameConstants.BattleItemType,
        description: string,
        basePrice: number,
        currency: GameConstants.Currency = GameConstants.Currency.money,
        displayName?: string,
        public multiplierType?: keyof typeof MultiplierType,
        public multiplyBy?: number
    ) {
        super(GameConstants.BattleItemType[type], basePrice, currency, undefined, undefined, displayName, description, 'battleItem');
        this.type = type;
    }

    use(): boolean {
        EffectEngineRunner.addEffect(this.name, ItemHandler.amountToUse);
        return true;
    }

    checkCanUse(): boolean {
        if (App.game.challenges.list.disableBattleItems.active()) {
            Notifier.notify({
                title: 'Challenge Mode',
                message: 'Battle Items are disabled',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        if (!player.itemList[this.name]()) {
            Notifier.notify({
                message: `You don't have any ${ItemList[this.name].displayName}s left...`,
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        return true;
    }
}

ItemList['xAttack']         = new BattleItem(GameConstants.BattleItemType.xAttack, '+50% Bonus to Pokémon attack for 30 seconds', 600, undefined, undefined, 'pokemonAttack', 1.5);
ItemList['xClick']          = new BattleItem(GameConstants.BattleItemType.xClick, '+50% Bonus to click attack for 30 seconds', 400, undefined, undefined, 'clickAttack', 1.5);
ItemList['Lucky_pill']       = new BattleItem(GameConstants.BattleItemType.Lucky_pill, '+50% Bonus to experience gained for 30 seconds', 800, undefined, 'Lucky Pill', 'exp', 1.5);
ItemList['Intel_floppy'] = new BattleItem(GameConstants.BattleItemType.Intel_floppy, '+50% Bonus to scan coins gained for 30 seconds', 1000, undefined, 'Intel Floppy', 'explorecoin', 1.5);
ItemList['Item_magnet']     = new BattleItem(GameConstants.BattleItemType.Item_magnet, 'Increased chance of gaining extra items for 30 seconds', 1500, undefined, 'Item Magnet');
ItemList['Lucky_floppy']   = new BattleItem(GameConstants.BattleItemType.Lucky_floppy, '+50% Bonus to money gained for 30 seconds', 2000, undefined, 'Lucky Floppy', 'money', 1.5);
