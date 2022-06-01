type GemCost = {
    gemType: PokemonType,
    amount: number,
}

class GemDeal {
    public gems: GemCost[];
    public item: { itemType: Item, amount: number};
    public static list: Record<GameConstants.Region, KnockoutObservableArray<GemDeal>> = {};

    constructor(gemCosts: GemCost[], item: Item, itemAmount: number) {
        this.gems = gemCosts;
        this.item = {itemType: item, amount: itemAmount};
    }

    public static generateDeals() {
        const gemMasterRegions = [GameConstants.Region.hoenn, GameConstants.Region.unova];

        for (const region of gemMasterRegions) {
            if (!GemDeal.list[region]) {
                GemDeal.list[region] = ko.observableArray();
            } else {
                GemDeal.list[region].removeAll();
            }
        }

        GemDeal.list[GameConstants.Region.hoenn].push(...this.generateHoennFluteDeals());
        GemDeal.list[GameConstants.Region.unova].push(...this.generateUnovaFluteDeals());
    }

    private static generateHoennFluteDeals() {
        const list = [];

        list.push(new GemDeal(
            [
                {gemType: PokemonType['Fire'], amount: 50000},
                {gemType: PokemonType['Fighting'], amount: 50000},
                {gemType: PokemonType['Poison'], amount: 50000},
            ],
            ItemList['H_Fire_Spirit'],
            1
        ));
        list.push(new GemDeal(
            [
                {gemType: PokemonType['Normal'], amount: 10000},
                {gemType: PokemonType['Bug'], amount: 10000},
                {gemType: PokemonType['Rock'], amount: 10000},
            ],
            ItemList['H_Light_Spirit'],
            1
        ));
        list.push(new GemDeal(
            [
                {gemType: PokemonType['Normal'], amount: 10000},
                {gemType: PokemonType['Flying'], amount: 10000},
                {gemType: PokemonType['Poison'], amount: 10000},
            ],
            ItemList['H_Wind_Spirit'],
            1
        ));
        list.push(new GemDeal(
            [
                {gemType: PokemonType['Dark'], amount: 10000},
                {gemType: PokemonType['Electric'], amount: 10000},
                {gemType: PokemonType['Steel'], amount: 10000},
            ],
            ItemList['H_Steel_Spirit'],
            1
        ));
        list.push(new GemDeal(
            [
                {gemType: PokemonType['Dark'], amount: 10000},
                {gemType: PokemonType['Ghost'], amount: 10000},
                {gemType: PokemonType['Ice'], amount: 10000},
            ],
            ItemList['H_Water_Spirit'],
            1
        ));
        list.push(new GemDeal(
            [
                {gemType: PokemonType['Fighting'], amount: 10000},
                {gemType: PokemonType['Ice'], amount: 10000},
                {gemType: PokemonType['Fairy'], amount: 10000},
            ],
            ItemList['H_Thunder_Spirit'],
            1
        ));
        return list;
    }

    private static generateUnovaFluteDeals() {
        const list = [];

        list.push(new GemDeal(
            [
                {gemType: PokemonType['Dragon'], amount: 50000},
                {gemType: PokemonType['Ghost'], amount: 50000},
                {gemType: PokemonType['Psychic'], amount: 50000},
            ],
            ItemList['Azure_Flute'],
            1
        ));
        list.push(new GemDeal(
            [
                {gemType: PokemonType['Flying'], amount: 50000},
                {gemType: PokemonType['Dragon'], amount: 50000},
                {gemType: PokemonType['Psychic'], amount: 50000},
            ],
            ItemList['CH_Dark_Spirit'],
            1
        ));
        list.push(new GemDeal(
            [
                {gemType: PokemonType['Fire'], amount: 50000},
                {gemType: PokemonType['Ground'], amount: 50000},
                {gemType: PokemonType['Water'], amount: 50000},
            ],
            ItemList['H_Dark_Spirit'],
            1
        ));
        list.push(new GemDeal(
            [
                {gemType: PokemonType['Rock'], amount: 50000},
                {gemType: PokemonType['Ground'], amount: 50000},
                {gemType: PokemonType['Electric'], amount: 50000},
            ],
            ItemList['H_Earth_Spirit'],
            1
        ));
        list.push(new GemDeal(
            [
                {gemType: PokemonType['Grass'], amount: 50000},
                {gemType: PokemonType['Psychic'], amount: 50000},
                {gemType: PokemonType['Water'], amount: 50000},
            ],
            ItemList['H_Ice_Spirit'],
            1
        ));
        list.push(new GemDeal(
            [
                {gemType: PokemonType['Grass'], amount: 50000},
                {gemType: PokemonType['Bug'], amount: 50000},
                {gemType: PokemonType['Fairy'], amount: 50000},
            ],
            ItemList['H_Wood_Spirit'],
            1
        ));
        return list;
    }

    public static getDeals(region: GameConstants.Region) {
        return GemDeal.list[region];
    }

    public static canUse(region: GameConstants.Region, i: number): boolean {
        const deal = GemDeal.list[region].peek()[i];
        if (ItemList[deal.item.itemType.name].isSoldOut()) {
            return false;
        } else {
            return deal.gems.every((value) => App.game.gems.gemWallet[value.gemType]() >= value.amount);
        }
    }

    public static use(region: GameConstants.Region, i: number, tradeTimes = 1) {
        const deal = GemDeal.list[region].peek()[i];
        if (GemDeal.canUse(region, i)) {
            const trades = deal.gems.map(gem => {
                const amt = App.game.gems.gemWallet[gem.gemType]();
                const maxTrades = Math.floor(amt / gem.amount);
                return maxTrades;
            });
            const maxTrades = trades.reduce((a,b) => Math.min(a,b), tradeTimes);
            deal.gems.forEach((value) =>
                GameHelper.incrementObservable(App.game.gems.gemWallet[value.gemType], -value.amount * maxTrades));
            deal.item.itemType.gain(deal.item.amount * maxTrades);
        }
    }

    public static isFluteDeal(region: GameConstants.Region, i: number): boolean {
        const deal = GemDeal.list[region].peek()[i];
        return deal.item.itemType instanceof FluteItem;
    }
}
