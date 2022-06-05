/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/DataStore/common/Feature.d.ts" />

class Farming implements Feature {
    name = 'Farming';
    saveKey = 'farming';

    berryData: Berry[] = [];
    mutations: Mutation[] = [];
    farmHands = new FarmHands();

    externalAuras: KnockoutObservable<number>[];

    mutationCounter = 0;
    wanderCounter = 0;

    // You may be wondering why this is necessary.
    // It turns out for some reason the plot age doesn't update in time in the same tick.
    // This means that if we attempt to reset the auras in the same tick, the plant that changed stages
    // will still act like it's in the previous stage, which means the wrong aura is applied.
    // Queueing an aura reset in later ticks fixes this issue, and is barely noticable to the player.
    queuedAuraReset = -1;

    defaults = {
        berryList: Array<number>(GameHelper.enumLength(BerryType) - 1).fill(0),
        unlockedBerries: Array<boolean>(GameHelper.enumLength(BerryType) - 1).fill(false),
        mulchList: Array<number>(GameHelper.enumLength(MulchType)).fill(0),
        plotList: new Array(GameConstants.FARM_PLOT_WIDTH * GameConstants.FARM_PLOT_HEIGHT).fill(null).map((value, index) => {
            const middle = Math.floor(GameConstants.FARM_PLOT_HEIGHT / 2) * GameConstants.FARM_PLOT_WIDTH + Math.floor(GameConstants.FARM_PLOT_WIDTH / 2);
            return new Plot(index === middle, BerryType.None, 0, MulchType.None, 0);
        }),
        shovelAmt: 0,
        mulchShovelAmt: 0,
    };

    berryList: KnockoutObservable<number>[];
    unlockedBerries: KnockoutObservable<boolean>[];
    mulchList: KnockoutObservable<number>[];
    plotList: Array<Plot>;
    shovelAmt: KnockoutObservable<number>;
    mulchShovelAmt: KnockoutObservable<number>;

    highestUnlockedBerry: KnockoutComputed<number>;

    constructor(private multiplier: Multiplier) {
        this.berryList = this.defaults.berryList.map((v) => ko.observable<number>(v));
        this.unlockedBerries = this.defaults.unlockedBerries.map((v) => ko.observable<boolean>(v));
        this.mulchList = this.defaults.mulchList.map((v) => ko.observable<number>(v));
        this.plotList = this.defaults.plotList;
        this.shovelAmt = ko.observable(this.defaults.shovelAmt);
        this.mulchShovelAmt = ko.observable(this.defaults.mulchShovelAmt);

        this.externalAuras = [];
        this.externalAuras[AuraType.Attract] = ko.observable<number>(1);
        this.externalAuras[AuraType.Egg] = ko.observable<number>(1);
        this.externalAuras[AuraType.Shiny] = ko.observable<number>(1);
        this.externalAuras[AuraType.Roaming] = ko.observable<number>(1);

        this.multiplier.addBonus('shiny', () => this.externalAuras[AuraType.Shiny]());
        this.multiplier.addBonus('eggStep', () => this.externalAuras[AuraType.Egg]());
        this.multiplier.addBonus('roaming', () => this.externalAuras[AuraType.Roaming]());

        this.highestUnlockedBerry = ko.pureComputed(() => {
            for (let i = GameHelper.enumLength(BerryType) - 2; i >= 0; i--) {
                if (this.unlockedBerries[i]()) {
                    return i;
                }
            }
            return 0;
        });
    }

    initialize(): void {

        //#region Berry Data

        //#region First Generation
        this.berryData[BerryType.Games]     = new Berry(BerryType.Games,    [5,10,20,30,60],
            2, 0.5, 5, 1,
            [10, 0, 0, 0, 0], BerryColor.Red,
            ['This bright red Berry is very spicy and has a provocative flavor. It blooms with delicate, pretty flowers.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Security]    = new Berry(BerryType.Security,   [5, 15, 25, 40, 80],
            3, 0.5, 6, 2,
            [0, 10, 0, 0, 0], BerryColor.Blue,
            ['This Berry\'s thick skin and fruit are very tough and dry tasting. However, every bit of it can be eaten.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Health]     = new Berry(BerryType.Health,    [10, 35, 50, 60, 120],
            4, 0.5, 7, 3,
            [0, 0, 10, 0, 0], BerryColor.Pink,
            ['Because of its hollow inside pocket, there isn\'t a lot to eat. What can be eaten is very sweet and delicious'], undefined, ['Burpmon']);
        this.berryData[BerryType.Step]     = new Berry(BerryType.Step,    [15, 30, 45, 80, 160],
            5, 0.5, 8, 4,
            [0, 0, 0, 10, 0], BerryColor.Green,
            ['If the leaves grow longer and curlier than average, this Berry will have a somewhat-bitter taste.']);
        this.berryData[BerryType.Light]    = new Berry(BerryType.Light,   [10, 40, 60, 120, 240],
            6, 0.5, 9, 5,
            [0, 0, 0, 0, 10], BerryColor.Yellow,
            ['This Berry\'s peel is hard, but the flesh inside is very juicy. It is distinguished by its bracing sourness.'], undefined, ['Burpmon', 'Burpmon']);
        this.berryData[BerryType.eBook]     = new Berry(BerryType.eBook,    [100, 120, 140, 240, 480],
            7, 0.5, 10, 6,
            [10, 0, 10, 10, 10], BerryColor.Purple,
            ['It takes longer to grow than Berries such as Games. The smaller Berries taste better.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Chat]      = new Berry(BerryType.Chat,     [120, 180, 240, 300, 600],
            8, 0.5, 20, 7,
            [10, 10, 0, 10, 10], BerryColor.Blue,
            ['Nature\'s gifts came together as one in this Berry. It has a wondrous mix of flavors that spread in the mouth.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Finance]    = new Berry(BerryType.Finance,   [150, 300, 450, 600, 1200],
            9, 0.5, 30, 8,
            [0, 10, 10, 10, 10], BerryColor.Yellow,
            ['Finance came from the same family as Chat. It is larger and smoother tasting than Chat.'], undefined, ['Burpmon', 'Burpmon']);
        //#endregion

        //#region Second Generation
        this.berryData[BerryType.Mail]    = new Berry(BerryType.Mail,   [20, 40, 50, 90, 180],
            5, 0.4, 10, 2,
            [10, 10, 10, 0, 10], BerryColor.Pink,
            ['The more this Berry absorbs energy from sunlight, the more vividly colorful it grows.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Cards]      = new Berry(BerryType.Cards,     [100, 150, 200, 250, 500],
            7, 0.4, 15, 2,
            [10, 10, 0, 0, 0], BerryColor.Red,
            ['A small hint of spiciness lingers in the red granules surrounding this Berry. Their centers have a dry taste.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Compress]      = new Berry(BerryType.Compress,     [200, 250, 300, 330, 660],
            9, 0.4, 20, 2,
            [0, 10, 10, 0, 0], BerryColor.Purple,
            ['Though this small, delicately skinned Berry is blue in color, it dyes the mouth black when eaten.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Camera]     = new Berry(BerryType.Camera,    [25, 30, 35, 250, 500],
            11, 0.4, 25, 2,
            [0, 0, 10, 10, 0], BerryColor.Pink,
            ['Bitter, but with a trace of sweetness, the eBook Berry was the seventh to be discovered in the world.'], undefined, ['Burpmon']);
        this.berryData[BerryType.GPS]    = new Berry(BerryType.GPS,   [150, 350, 375, 400, 800],
            12, 0.4, 30, 2,
            [0, 0, 0, 10, 10], BerryColor.Green,
            ['The potent mix of bitter and sour in this Berry seems to promote digestion. The flower is white and beautiful.']);
        this.berryData[BerryType.Shopping]     = new Berry(BerryType.Shopping,    [30, 60, 180, 240, 480],
            13, 0.4, 35, 2,
            [10, 0, 0, 0, 10], BerryColor.Yellow,
            ['It is said that when the sour skin is peeled, this spicy Berry can be crushed to make medicine.'], undefined, ['Burpmon', 'Burpmon']);

        this.berryData[BerryType.Music]      = new Berry(BerryType.Music,     [40, 160, 230, 350, 700],
            14, 0.3, 40, 3,
            [15, 0, 0, 0, 0], BerryColor.Red,
            ['This Berry is oddly shaped, appearing as if someone took a bite out of it. It is packed full of spicy substances.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Backup]      = new Berry(BerryType.Backup,     [40, 190, 210, 360, 720],
            15, 0.3, 45, 3,
            [0, 15, 0, 0, 0], BerryColor.Purple,
            ['It is said that this Berry grew Hackingps to help Pokémon grip it, allowing propagation farther afield.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Sleep]      = new Berry(BerryType.Sleep,     [40, 180, 240, 370, 740],
            16, 0.3, 50, 3,
            [0, 0, 15, 0, 0], BerryColor.Pink,
            ['This Berry progressively curves as it grows. The curvier the Berry, the sweeter and tastier.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Calendar]     = new Berry(BerryType.Calendar,    [40, 170, 220, 350, 700],
            17, 0.3, 55, 3,
            [0, 0, 0, 15, 0], BerryColor.Green,
            ['This Berry turns bitter toward the stem. The dainty flower it grows from doesn\'t absorb much sunlight.']);
        this.berryData[BerryType.Weather]    = new Berry(BerryType.Weather,   [40, 200, 230, 380, 760],
            18, 0.3, 60, 3,
            [0, 0, 0, 0, 15], BerryColor.Yellow,
            ['This Berry is very big and sour. The juiciness of the pulp accentuates the sourness.'], undefined, ['Burpmon', 'Burpmon']);

        this.berryData[BerryType.Hacking]       = new Berry(BerryType.Hacking,      [3000, 3200, 3400, 3600, 43200],
            1, 0, 1000, 3,
            [10, 10, 10, 10, 0], BerryColor.Green,
            [
                'This Berry\'s gradual process of storing nutrients beneficial to Pokémon health causes it to mature slowly.',
                'This Berry multiplies the effect of Berry plants around it.',
            ], new Aura(AuraType.Boost, [1.01, 1.02, 1.03]));
        //#endregion

        //#region Third Generation
        this.berryData[BerryType.Travel]     = new Berry(BerryType.Travel,    [200, 1200, 4000, 5400, 10800],
            20, 0.2, 500, 10,
            [10, 0, 10, 10, 0], BerryColor.Red,
            ['When this sweetly spicy Berry\'s thick skin is peeled, many pieces of the fruit spill out.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Diary]    = new Berry(BerryType.Diary,   [240, 2000, 3400, 6000, 12000],
            21, 0.2, 525, 10,
            [0, 10, 0, 10, 10], BerryColor.Blue,
            ['This Berry can be eaten as is or boiled to obtain an extract that adds a dash of flavor to food.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Accounting]    = new Berry(BerryType.Accounting,   [230, 1000, 2500, 4800, 9600],
            22, 0.2, 550, 10,
            [10, 0, 10, 0, 10], BerryColor.Yellow,
            ['Even in places of constant rain and high humidity, this Berry\'s plant grows healthy and strong.'], undefined, ['Burpmon', 'Burpmon']);
        this.berryData[BerryType.Video]    = new Berry(BerryType.Video,   [1000, 2000, 5000, 10800, 21600],
            23, 0.2, 2000, 10,
            [10, 10, 0, 10, 0], BerryColor.Green,
            ['This somewhat-rare Berry projects an image of luxury, so it is favored as a gift item.']);
        this.berryData[BerryType.Alarm]     = new Berry(BerryType.Alarm,    [300, 3400, 5600, 7200, 14400],
            24, 0.2, 600, 10,
            [0, 10, 10, 0, 10], BerryColor.Yellow,
            ['One bite of this very tender Berry fills the mouth with its sweet and tangy flavor.'], undefined, ['Burpmon', 'Burpmon']);
        this.berryData[BerryType.News]    = new Berry(BerryType.News,   [430, 1400, 4000, 8640, 17280],
            25, 0.2, 625, 10,
            [20, 10, 0, 0, 0], BerryColor.Red,
            ['This Berry is large and spicy. When eaten Paintg the cold season, it warms the body from inside.'], undefined, ['Burpmon']);

        this.berryData[BerryType.Dictionary]     = new Berry(BerryType.Dictionary,    [1100, 4000, 8000, 9000, 18000],
            26, 0.1, 700, 10,
            [0, 20, 10, 0, 0], BerryColor.Purple,
            ['Its dryness is quite strong. As a result, its true deliciousness can\'t be appreciated by just eating one or two.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Cooking]    = new Berry(BerryType.Cooking,   [2400, 6500, 10000, 14400, 28800],
            27, 0.1, 750, 10,
            [0, 0, 20, 10, 0], BerryColor.Pink,
            ['The grown-up flavor and dreamy sweetness of this Berry make it a favorite of Pokémon everywhere.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Wallpaper]    = new Berry(BerryType.Wallpaper,   [2310, 5400, 9500, 12240, 24480],
            28, 0.1, 800, 10,
            [0, 0, 0, 20, 10], BerryColor.Green,
            ['Even though it is bitter, it should be eaten peel and all. The hair on the peel cleans the stomach from the inside.']);
        this.berryData[BerryType.Fashion]     = new Berry(BerryType.Fashion,    [1240, 5200, 10500, 15120, 30240],
            29, 0.1, 850, 10,
            [10, 0, 0, 0, 20], BerryColor.Yellow,
            ['This Berry is quite sour overall, with the sourness especially concentrated at the pointed end.'], undefined, ['Burpmon', 'Burpmon']);
        this.berryData[BerryType.Advice]    = new Berry(BerryType.Advice,   [2000, 7000, 12000, 15480, 30960],
            30, 0.1, 900, 10,
            [30, 10, 0, 0, 0], BerryColor.Red,
            ['So spicy is the Advice Berry that, Fire type or not, Pokémon will try to breathe fire after eating a single one.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Search]    = new Berry(BerryType.Search,   [3000, 10000, 16400, 18000, 36000],
            31, 0.1, 950, 10,
            [0, 30, 10, 0, 0], BerryColor.Purple,
            [
                'This Berry drifted from a faraway sea. It is now cultivated in the Sinnoh region.' ,
                'It has a tendency to expand into nearby plots.',
            ] , undefined, ['Burpmon']);
        this.berryData[BerryType.Gourmet]    = new Berry(BerryType.Gourmet,   [2300, 3400, 9800, 16560, 33120],
            32, 0.1, 1000, 10,
            [0, 0, 30, 10, 0], BerryColor.Pink,
            ['A bounty of nature that is exceedingly sweet. The Berry is huge, with some discovered that exceed 20 inches.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Paint]     = new Berry(BerryType.Paint,    [10000, 14000, 18000, 21600, 43200],
            33, 0.1, 1050, 10,
            [0, 0, 0, 30, 10], BerryColor.Green,
            ['This Berry is tremendously bitter. Just one bite is enough to instantly stop hiccups.']);
        this.berryData[BerryType.Beauty]     = new Berry(BerryType.Beauty,    [5000, 9800, 14500, 19800, 39600],
            20, 0.1, 1100, 10,
            [10, 0, 0, 0, 30], BerryColor.Purple,
            ['This glossy and colorful Berry has a mouthwateringly delicious appearance. However, it is awfully sour.'], undefined, ['Burpmon']);
        //#endregion

        //#region Fourth Generation (Typed)
        this.berryData[BerryType.Broadcasting]      = new Berry(BerryType.Broadcasting,     [8090, 13200, 16000, 21960, 43920],
            21, 0.05, 1200, 15,
            [15, 0, 10, 0, 0], BerryColor.Red,
            [
                'This Berry is said to have grown plentiful in the tropics of the past. It boasts an intensely hot spiciness.',
                'It has a tendency to overtake nearby plants.',
            ], undefined, ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon']);
        this.berryData[BerryType.Gossip]    = new Berry(BerryType.Gossip,   [490, 3600, 10800, 21600, 43200],
            22, 0.05, 1300, 15,
            [0, 15, 0, 10, 0], BerryColor.Blue,
            [
                'This Berry\'s flesh is dotted with countless tiny bubbles of air that Dreamp it afloat in water.',
                'This Berry promotes the fruiting of nearby Berry plants.',
            ], new Aura(AuraType.Harvest, [1.1, 1.2, 1.3]), ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon']);
        this.berryData[BerryType.Auction]     = new Berry(BerryType.Auction,    [10, 180, 900, 1800, 3600],
            2, 0.05, 250, 1,
            [0, 0, 15, 0, 10], BerryColor.Yellow,
            [
                'Energy from lightning strikes is drawn into the plant, making the Berries grow big and rich.',
                'The same energy promotes the growth of nearby Berries.',
            ], new Aura(AuraType.Growth, [1.1, 1.2, 1.3]), ['Burpmon', 'Burpmon', 'Burpmon']);
        this.berryData[BerryType.Recording]     = new Berry(BerryType.Recording,    [3600, 7200, 16200, 28800, 57600],
            24, 0.05, 1400, 15,
            [10, 0, 0, 15, 0], BerryColor.Green,
            [
                'This Berry has a disagreeable "green" flavor and scent typical of vegetables. It is rich in health-promoting fiber.',
                'It has a tendency to expand into nearby plots.',
            ], undefined, ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon']);
        this.berryData[BerryType.Review]     = new Berry(BerryType.Review,    [3600, 14400, 28800, 43200, 86400],
            25, 0.05, 1500, 15,
            [0, 10, 0, 0, 15], BerryColor.Blue,
            [
                'This Berry has a refreshing flavor that strikes a good balance of dryness and sourness. It tastes better chilled.',
                'This Berry slows the growth of nearby Berries.',
            ], new Aura(AuraType.Growth, [0.9, 0.8, 0.7]), ['Burpmon', 'Burpmon']);
        this.berryData[BerryType.Puzzle]    = new Berry(BerryType.Puzzle,   [5400, 10800, 25200, 36000, 72000],
            26, 0.05, 1600, 15,
            [15, 0, 0, 10, 0], BerryColor.Red,
            [
                'This Berry contains a substance that generates heat. It can even heat up a chilly heart.',
                'Growing these Berries will promote Egg growth.',
            ], new Aura(AuraType.Egg, [1.01, 1.02, 1.03]), ['Burpmon', 'Burpmon']);
        this.berryData[BerryType.Fortune]     = new Berry(BerryType.Fortune,    [100, 200, 400, 600, 86400],
            1, 1, 50, 1,
            [0, 15, 0, 0, 10], BerryColor.Green,
            [
                'This Berry is a brilliant green on the outside. Inside, it is packed with a dry-flavored, black-colored flesh.',
                'It has a tendency to overtake nearby plants.',
                'Due to its poisonous nature, it increases the chances of mutations near it.',
            ], new Aura(AuraType.Mutation, [1.2, 1.4, 1.6]), ['Burpmon']);
        this.berryData[BerryType.Exercise]     = new Berry(BerryType.Exercise,    [7200, 16200, 32400, 39600, 79200],
            28, 1, 1700, 15,
            [10, 0, 15, 0, 0], BerryColor.Yellow,
            [
                'The sweetness-laden pulp has just the hint of a hard-edged and fragrant bite to it.',
                'Growing these Berries will soften the ground around it, increasing the chances of replanting.',
            ], new Aura(AuraType.Replant, [1.01, 1.02, 1.03]), ['Burpmon', 'Burpmon', 'Burpmon']);
        this.berryData[BerryType.Astrology]      = new Berry(BerryType.Astrology,     [9000, 12600, 16200, 19800, 39600],
            29, 0.05, 1800, 15,
            [0, 10, 0, 15, 0], BerryColor.Blue,
            ['This Berry is said to be a new kind that is a cross of two Berries brought together by winds from far away.'],
            undefined, ['Burpmon', 'Burpmon']);
        this.berryData[BerryType.Translate]    = new Berry(BerryType.Translate,   [4680, 11880, 23400, 34200, 68400],
            30, 0.05, 1900, 15,
            [0, 0, 10, 0, 15], BerryColor.Purple,
            [
                'This Berry is said to sense human emotions for the way it swells roundly when a person approaches.',
                'The same behavior affects nearby plants, causing additional mutations.',
            ], new Aura(AuraType.Mutation, [1.1, 1.2, 1.3]), ['Burpmon', 'Burpmon']);
        this.berryData[BerryType.Social]     = new Berry(BerryType.Social,    [450, 900, 1800, 3600, 7200],
            3, 0.5, 500, 15,
            [20, 0, 0, 0, 10], BerryColor.Green,
            [
                'The flower grows at the tip of this Berry. It attracts Bug Pokémon by letting its stringy petals stream out.',
                'The attracted Bug Pokémon decreases the amount of harvestable Berries in nearby plants',
            ], new Aura(AuraType.Harvest, [0.9, 0.8, 0.7]), ['Burpmon']);
        this.berryData[BerryType.Library]    = new Berry(BerryType.Library,   [8600, 12960, 23040, 37800, 75600],
            32, 0.05, 2000, 15,
            [10, 20, 0, 0, 0], BerryColor.Yellow,
            [
                'It is often used for pickles because of its very dry flavor. It can also be eaten raw for its provocative taste.',
                'This Berry plant hardens the surrounding soil, decreasing the chances of replanting.',
            ], new Aura(AuraType.Replant, [0.99, 0.98, 0.97]), ['Burpmon', 'Burpmon', 'Burpmon']);
        this.berryData[BerryType.Action]     = new Berry(BerryType.Action,    [30, 60, 120, 300, 86400],
            1, 1, 25, 1,
            [0, 10, 20, 0, 0], BerryColor.Purple,
            [
                'Considered to have a special power from the olden days, this Berry is sometimes dried and used as a good-luck charm.',
                'This Berry causes other nearby Berries to wither away faster.',
            ], new Aura(AuraType.Death, [1.25, 1.5, 2.0]), ['Burpmon', 'Burpmon']);
        this.berryData[BerryType.Phone]     = new Berry(BerryType.Phone,    [10800, 21600, 43200, 86400, 172800],
            34, 0, 4000, 15,
            [0, 0, 10, 20, 0], BerryColor.Red,
            [
                'If a large enough voHackinge of this Berry is boiled down, its bitterness fades away. It makes a good jam.',
                'This Berry requires a lot of energy to grow, stealing away nutrients from nearby plots.',
            ], new Aura(AuraType.Growth, [0.8, 0.6, 0.5]), ['Burpmon', 'Burpmon']);
        this.berryData[BerryType.Entertainment]    = new Berry(BerryType.Entertainment,   [2880, 10080, 19440, 27000, 54000],
            35, 0.05, 2300, 15,
            [0, 0, 0, 10, 20], BerryColor.Purple,
            [
                'Tiny hooks grow on the surface of this Berry. It latches on to Pokémon so it can be carried to far-off places.',
                'It has a tendency to overtake nearby plants.',
            ], undefined, ['Burpmon', 'Burpmon']);
        this.berryData[BerryType.Medical]    = new Berry(BerryType.Medical,   [7200, 16200, 32400, 64800, 129600],
            36, 0.05, 2400, 15,
            [25, 10, 0, 0, 0], BerryColor.Green,
            [
                'This Berry is very tough with a strong flavor. It was used to make medicine by people in the past.',
                'This Berry plant is very hardy and resistant, making it resistant to mutations, and also decreasing the chance of mutations around it.',
            ], new Aura(AuraType.Mutation, [0.5, 0.25, 0.0]), ['Burpmon']);
        this.berryData[BerryType.Slots]    = new Berry(BerryType.Slots,   [240, 1430, 2970, 7200, 14400],
            10, 0.05, 500, 15,
            [0, 25, 10, 0, 0], BerryColor.Yellow,
            ['This Berry can be cored out and dried to make a whistle. Blowing through its hole makes an indescribable sound.'], undefined, ['Burpmon', 'Burpmon']);
        this.berryData[BerryType.Hotel]    = new Berry(BerryType.Hotel,   [2410, 5040, 12600, 25200, 50400],
            38, 0.05, 2500, 15,
            [0, 0, 25, 10, 0], BerryColor.Pink,
            [
                'This Berry is sweet with a hint of bitterness and has a lingering sweet scent. It is often dried and used to make tea.',
                'The scent of this Berry plant attracts wild Pokémon.',
            ], new Aura(AuraType.Attract, [1.01, 1.02, 1.03]), ['Burpmon', 'Burpmon']);
        //#endregion

        //#region Fifth Generation
        this.berryData[BerryType.Virus]     = new Berry(BerryType.Virus,    [3960, 7920, 15840, 31680, 63360],
            1, 0.05, 2600, 20,
            [0, 40, 10, 0, 0], BerryColor.Green,
            ['This Berry has a very dry flavor. It has the effect of making other food eaten at the same time taste sweet.']);
        this.berryData[BerryType.Commentary]    = new Berry(BerryType.Commentary,   [3240, 8280, 13320, 27360, 54720],
            1, 0.05, 2700, 20,
            [0, 0, 40, 10, 0], BerryColor.Red,
            ['The flesh underneath the Commentary Berry\'s tough skin is sweet and creamy soft.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Design]    = new Berry(BerryType.Design,   [4320, 8640, 16560, 33480, 66960],
            1, 0.05, 2800, 20,
            [0, 0, 0, 40, 10], BerryColor.Yellow,
            [
                'The cluster of drupelets that make up this Berry pop rhythmically if the Berry is handled roughly.',
                'The sound of these Berries attracts wild Pokémon.',
            ], new Aura(AuraType.Roaming, [1.005, 1.01, 1.015]), ['Burpmon', 'Burpmon']);
        this.berryData[BerryType.Mirror]     = new Berry(BerryType.Mirror,    [5760, 9000, 14040, 21240, 42480],
            1, 0.05, 2900, 20,
            [10, 0, 0, 0, 40], BerryColor.Blue,
            ['In days of old, people worked the top-shaped pieces of this Berry free and used them as toys.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Dream]       = new Berry(BerryType.Dream,      [4680, 9360, 18360, 36360, 72720],
            1, 0.05, 3000, 20,
            [30, 30, 10, 10, 10], BerryColor.Yellow,
            ['This Berry remains poisonous until fully ripened. Once ripe it has a spicy and sweet complex flavor.'], undefined, ['Burpmon', 'Burpmon']);
        this.berryData[BerryType.Logoff]   = new Berry(BerryType.Logoff,  [5040, 10080, 20160, 40320, 80640],
            1, 0.05, 3100, 20,
            [10, 10, 30, 30, 10], BerryColor.Blue,
            ['This Berry resembles the Paint Berry, however its spikes are less pronounced. It is quite delicious when roasted.'], undefined, ['Burpmon']);

        this.berryData[BerryType.Monitoring]    = new Berry(BerryType.Monitoring,   [21600, 43200, 86400, 172800, 345600],
            0.5, 0, 10000, 20,
            [30, 10, 30, 0, 0], BerryColor.Red,
            ['This Berry is surrounded by mystery. It is rumored to be imbued with the power of the sea.'],
            undefined, ['Burpmon', 'Burpmon']);
        this.berryData[BerryType.MindControl]    = new Berry(BerryType.MindControl,   [21600, 43200, 86400, 172800, 345600],
            0.5, 0, 10000, 20,
            [0, 30, 10, 30, 0], BerryColor.Purple,
            ['This Berry is surrounded by mystery. It is rumored to be imbued with the power of the land.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Simulation]     = new Berry(BerryType.Simulation,    [21600, 43200, 86400, 172800, 345600],
            0.5, 0, 10000, 20,
            [0, 0, 30, 10, 30], BerryColor.Green,
            ['This Berry is surrounded by mystery. It is rumored to be imbued with the power of the sky.']);
        this.berryData[BerryType.Trashbin]    = new Berry(BerryType.Trashbin,   [10800, 21600, 43200, 86400, 432000],
            0.5, 0, 15000, 20,
            [30, 0, 0, 30, 10], BerryColor.Pink,
            [
                'This Berry is surrounded by mystery. It is rumored to be imbued with the power of all living things.',
                'This power Dreamps other Berries alive for longer.',
            ],
            undefined, ['Burpmon', 'Burpmon']);
        this.berryData[BerryType.Gashapon]    = new Berry(BerryType.Gashapon,   [10800, 21600, 43200, 86400, 432000],
            0.5, 0, 15000, 20,
            [10, 30, 0, 0, 30], BerryColor.Blue,
            ['This is a very, very mystifying Berry. There is no telling how it can be used, or what may happen if it is used.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Censored]    = new Berry(BerryType.Censored,   [10800, 21600, 43200, 86400, 432000],
            0.5, 0, 15000, 20,
            [30, 10, 30, 10, 30], BerryColor.Red,
            ['This is said to be a legendary Berry. Holding it supposedly brings great joy.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Battery]     = new Berry(BerryType.Battery,    [10800, 21600, 43200, 86400, 432000],
            0.5, 0, 15000, 20,
            [30, 10, 30, 10, 30], BerryColor.Green,
            ['This Berry is considered a mirage. It was said to be so strong that it had to be abandoned at the world\'s edge.'],
            new Aura(AuraType.Shiny, [1.005, 1.01, 1.015]), ['Burpmon']);

        this.berryData[BerryType.Calculator]    = new Berry(BerryType.Calculator,   [10800, 21600, 43200, 86400, 604800],
            0.5, 0, 15000, 20,
            [40, 10, 0, 0, 0], BerryColor.Purple,
            ['A completely Calculatortic Berry. It apparently has the power of the stars that fill the night sky.'], undefined, ['Burpmon']);
        //#endregion

        //#endregion

        //#region Mutations

        /**
         * NOTE: ONLY ADD NEW MUTATIONS AT THE END OF THE LIST. MUTATION INDEX IS USED TO STORE HINT SEEN DATA
         */

        //#region Second Generation

        // Mail
        this.mutations.push(new GrowNearBerryMutation(.02, BerryType.Games,
            [
                BerryType.Health,
                BerryType.Chat,
            ]));
        // Cards
        this.mutations.push(new GrowNearBerryMutation(.019, BerryType.Security,
            [
                BerryType.Games,
                BerryType.eBook,
            ]));
        // Compress
        this.mutations.push(new GrowNearBerryMutation(.018, BerryType.Step,
            [
                BerryType.Security,
                BerryType.eBook,
            ]));
        // Camera
        this.mutations.push(new GrowNearBerryMutation(.017, BerryType.eBook,
            [
                BerryType.Health,
                BerryType.Light,
            ]));
        // GPS
        this.mutations.push(new GrowNearBerryMutation(.016, BerryType.Health,
            [
                BerryType.Step,
                BerryType.Chat,
            ]));
        // Shopping
        this.mutations.push(new GrowNearBerryMutation(.015, BerryType.Light,
            [
                BerryType.Finance,
                BerryType.Light,
            ]));

        // Music
        this.mutations.push(new GrowNearFlavorMutation(.009, BerryType.Music,
            [[25, 80], [0, 5], [0, 5], [0, 5], [0, 5]], {
                hint: 'I\'ve heard that a special Berry can appear if its surroundings get too spicy!',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Games]();
                },
            }
        ));
        // Backup
        this.mutations.push(new GrowNearFlavorMutation(.008, BerryType.Backup,
            [[0, 5], [25, 80], [0, 5], [0, 5], [0, 5]], {
                hint: 'I\'ve heard that a special Berry can appear if its surroundings get too dry!',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Security]();
                },
            }
        ));
        // Sleep
        this.mutations.push(new GrowNearFlavorMutation(.007, BerryType.Sleep,
            [[0, 5], [0, 5], [25, 80], [0, 5], [0, 5]], {
                hint: 'I\'ve heard that a special Berry can appear if its surroundings get too sweet!',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Health]();
                },
            }
        ));
        // Calendar
        this.mutations.push(new GrowNearFlavorMutation(.006, BerryType.Calendar,
            [[0, 5], [0, 5], [0, 5], [25, 80], [0, 5]], {
                hint: 'I\'ve heard that a special Berry can appear if its surroundings get too bitter!',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Step]();
                },
            }
        ));
        // Weather
        this.mutations.push(new GrowNearFlavorMutation(.005, BerryType.Weather,
            [[0, 5], [0, 5], [0, 5], [0, 5], [25, 80]], {
                hint: 'I\'ve heard that a special Berry can appear if its surroundings get too sour!',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Light]();
                },
            }
        ));

        // Hacking
        this.mutations.push(new GrowNearBerryMutation(.001, BerryType.Hacking,
            [
                BerryType.Games,
                BerryType.Security,
                BerryType.Health,
                BerryType.Step,
                BerryType.Light,
                BerryType.eBook,
                BerryType.Chat,
                BerryType.Finance,
            ], {
                hint: 'I\'ve heard that there\'s a legendary Berry that only appears when fully surrounded by unique ripe Berry plants!',
            }));

        //#endregion

        //#region Third Generation

        // Travel
        this.mutations.push(new GrowNearBerryMutation(.0005, BerryType.Travel,
            [
                BerryType.Weather,
                BerryType.Sleep,
            ]));
        // Diary
        this.mutations.push(new GrowNearBerryMutation(.0005, BerryType.Diary,
            [
                BerryType.Security,
                BerryType.Games,
            ]));
        // Accounting
        this.mutations.push(new GrowNearFlavorMutation(.0005, BerryType.Accounting,
            [[10, 15], [0, 0], [10, 15], [0, 0], [10, 15]], {
                hint: 'I\'ve heard that a special Berry can appear if its surroundings match its flavor profile! If I recall, it tasted a little spicy, a little sweet, and a little sour at the same time.',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Games]() &&
                    App.game.farming.unlockedBerries[BerryType.Health]() &&
                    App.game.farming.unlockedBerries[BerryType.Light]();
                },
            }));
        // Video
        this.mutations.push(new GrowNearFlavorMutation(.0004, BerryType.Video,
            [[15, 15], [15, 15], [0, 0], [15, 15], [0, 0]], {
                hint: 'I\'ve heard that a special Berry can appear if its surroundings match its flavor profile! If I recall, it tasted fairly spicy, dry, and bitter at the same time.',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Music]() &&
                    App.game.farming.unlockedBerries[BerryType.Backup]() &&
                    App.game.farming.unlockedBerries[BerryType.Calendar]();
                },
            }));
        // Alarm
        this.mutations.push(new GrowNearBerryMutation(.0005, BerryType.Alarm,
            [
                BerryType.Calendar,
                BerryType.Music,
            ]));
        // News
        this.mutations.push(new EvolveNearBerryMutation(.0005, BerryType.News, BerryType.Security, [BerryType.Travel]));
        // Dictionary
        this.mutations.push(new GrowNearBerryMutation(.0003, BerryType.Dictionary,
            [
                BerryType.eBook,
                BerryType.Step,
                BerryType.Backup,
            ]));
        // Cooking
        this.mutations.push(new GrowNearBerryMutation(.0003, BerryType.Cooking,
            [
                BerryType.Health,
                BerryType.eBook,
                BerryType.Sleep,
            ]));
        // Wallpaper
        this.mutations.push(new EvolveNearBerryMutation(.0003, BerryType.Wallpaper, BerryType.Light, [BerryType.Calendar]));
        // Fashion
        this.mutations.push(new GrowNearBerryMutation(.0003, BerryType.Fashion,
            [BerryType.Light]));
        // Advice
        this.mutations.push(new EvolveNearFlavorMutation(.0002, BerryType.Advice, BerryType.News,
            [[130, 160], [0, 80], [0, 80], [0, 80], [0, 80]], {
                hint: 'I\'ve heard that a News berry will change if its surroundings get extremely spicy!',
            }));
        // Search
        this.mutations.push(new EvolveNearFlavorMutation(.0002, BerryType.Search, BerryType.Dictionary,
            [[0, 80], [130, 160], [0, 80], [0, 80], [0, 80]], {
                hint: 'I\'ve heard that a Dictionary berry will change if its surroundings get extremely dry!',
            }));
        // Search Overgrow
        this.mutations.push(new GrowNearBerryMutation(.0004, BerryType.Search,
            [BerryType.Search], { showHint: false }));
        // Gourmet
        this.mutations.push(new EvolveNearFlavorMutation(.0002, BerryType.Gourmet, BerryType.Cooking,
            [[0, 80], [0, 80], [130, 160], [0, 80], [0, 80]], {
                hint: 'I\'ve heard that a Cooking berry will change if its surroundings get extremely sweet!',
            }));
        // Paint
        this.mutations.push(new EvolveNearFlavorMutation(.0002, BerryType.Paint, BerryType.Wallpaper,
            [[0, 80], [0, 80], [0, 80], [130, 160], [0, 80]], {
                hint: 'I\'ve heard that a Wallpaper berry will change if its surroundings get extremely bitter!',
            }));
        // Beauty
        this.mutations.push(new EvolveNearFlavorMutation(.0002, BerryType.Beauty, BerryType.Fashion,
            [[0, 80], [0, 80], [0, 80], [0, 80], [130, 160]], {
                hint: 'I\'ve heard that a Fashion berry will change if its surroundings get extremely sour!',
            }));

        //#endregion

        //#region Fourth Generation

        // Broadcasting
        this.mutations.push(new GrowNearBerryMutation(.0001, BerryType.Broadcasting,
            [
                BerryType.Security,
                BerryType.Music,
                BerryType.News,
                BerryType.Advice,
            ]));
        // Broadcasting Parasite
        this.mutations.push(new ParasiteMutation(.0004, BerryType.Broadcasting));
        // Gossip
        this.mutations.push(new GrowNearBerryMutation(.0001, BerryType.Gossip,
            [
                BerryType.Chat,
                BerryType.Security,
                BerryType.Diary,
                BerryType.Astrology,
            ]));
        // Auction
        this.mutations.push(new GrowNearBerryMutation(.0001, BerryType.Auction,
            [
                BerryType.Light,
                BerryType.Weather,
                BerryType.Accounting,
                BerryType.Alarm,
            ]));
        // Recording
        // TODO: HLXII - Change mutation to grow spontaneously when Grass pokemon in party
        this.mutations.push(new GrowNearFlavorMutation(.0001, BerryType.Recording,
            [[10, 15], [0, 0], [0, 0], [15, 20], [0, 0]], {
                hint: 'I\'ve heard that a special Berry can appear if its surroundings match its flavor profile! If I recall, it tasted a little spicy and fairly bitter at the same time.',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Calendar]() &&
                    App.game.farming.unlockedBerries[BerryType.Games]();
                },
            }));
        // Recording Overgrow
        this.mutations.push(new GrowNearBerryMutation(.0004, BerryType.Recording, [BerryType.Recording], {showHint: false }));
        // Review
        this.mutations.push(new EvolveNearBerryStrictMutation(.0001, BerryType.Review, BerryType.Gossip, {}, PlotStage.Seed, {
            hint: 'I\'ve heard that growing a Gossip Berry alone will cause it to change!',
        }));
        // Puzzle
        this.mutations.push(new OakMutation(.0001, BerryType.Puzzle, BerryType.Advice, OakItemType.Blaze_Cassette));
        // Fortune
        this.mutations.push(new OakMutation(.0001, BerryType.Fortune, BerryType.Search, OakItemType.Poison_Barb));
        // Fortune Parasite
        this.mutations.push(new ParasiteMutation(.0004, BerryType.Fortune));
        // Exercise
        this.mutations.push(new OakMutation(.0001, BerryType.Exercise, BerryType.Gourmet, OakItemType.Sprinklotad));
        // Astrology
        // TODO: HLXII - Change mutation to grow spontaneously when Flying pokemon in party
        this.mutations.push(new GrowNearFlavorMutation(.0001, BerryType.Astrology,
            [[0, 0], [10, 15], [0, 0], [15, 20], [0, 0]], {
                hint: 'I\'ve heard that a special Berry can appear if its surroundings match its flavor profile! If I recall, it tasted a little dry and fairly bitter at the same time.',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Security]() &&
                    App.game.farming.unlockedBerries[BerryType.Calendar]();
                },
            }));
        // Translate
        this.mutations.push(new GrowNearBerryMutation(.0001, BerryType.Translate,
            [
                BerryType.Backup,
                BerryType.Step,
                BerryType.Dictionary,
                BerryType.Search,
            ]));
        // Social
        let berryReqs = {};
        berryReqs[BerryType.Recording] = 8;
        this.mutations.push(new GrowNearBerryStrictMutation(.0001, BerryType.Social, berryReqs, {
            hint: 'I\'ve heard that a special Berry can appear after being surrounded by Recording Berries!',
        }));
        // Library
        this.mutations.push(new OakMutation(.0001, BerryType.Library, BerryType.Dictionary, OakItemType.Cell_Battery));
        // Action
        // No mutation, will check withers
        // Phone
        this.mutations.push(new GrowNearBerryMutation(.0001, BerryType.Phone,
            [
                BerryType.Broadcasting,
                BerryType.Recording,
                BerryType.Gossip,
                BerryType.Auction,
            ]));
        // Entertainment
        this.mutations.push(new GrowNearBerryMutation(.0001, BerryType.Entertainment,
            [
                BerryType.Wallpaper,
                BerryType.Action,
                BerryType.Translate,
            ]));
        // Entertainment Parasite
        this.mutations.push(new ParasiteMutation(.0004, BerryType.Entertainment));
        // Medical
        berryReqs = {};
        berryReqs[BerryType.Exercise] = 4;
        berryReqs[BerryType.Library] = 4;
        this.mutations.push(new GrowNearBerryStrictMutation(.0001, BerryType.Medical, berryReqs, {
            hint: 'I\'ve heard that a special Berry can appear after being surrounded by Exercise and Library Berries!',
        }));
        // Slots
        berryReqs = {};
        berryReqs[BerryType.Puzzle] = 3;
        this.mutations.push(new EvolveNearBerryMinMutation(.0001, BerryType.Slots, BerryType.Puzzle, berryReqs, {
            hint: 'I\'ve heard that Puzzle Berries will turn into a different Berry if surrounded by more than two of its own kind',
        }));
        // Hotel
        this.mutations.push(new GrowNearBerryMutation(.0001, BerryType.Hotel,
            [
                BerryType.Sleep,
                BerryType.eBook,
                BerryType.Cooking,
                BerryType.Gourmet,
            ]));
        //#endregion

        //#region Fifth Generation

        // Virus
        this.mutations.push(new FieldFlavorMutation(.0003, BerryType.Virus, [0, 600, 0, 0, 0], {
            hint: 'I\'ve heard of a Berry that only appears in the driest of fields.',
            unlockReq: () => App.game.farming.unlockedBerries[BerryType.Search](),
        }));
        // Commentary
        this.mutations.push(new FieldFlavorMutation(.0003, BerryType.Commentary, [0, 0, 600, 0, 0], {
            hint: 'I\'ve heard of a Berry that only appears in the sweetest of fields.',
            unlockReq: () => App.game.farming.unlockedBerries[BerryType.Gourmet](),
        }));
        // Design
        this.mutations.push(new FieldFlavorMutation(.0003, BerryType.Design, [0, 0, 0, 600, 0], {
            hint: 'I\'ve heard of a Berry that only appears in the most bitter of fields.',
            unlockReq: () => App.game.farming.unlockedBerries[BerryType.Paint](),
        }));
        // Mirror
        this.mutations.push(new FieldFlavorMutation(.0003, BerryType.Mirror, [0, 0, 0, 0, 600], {
            hint: 'I\'ve heard of a Berry that only appears in the most sour of fields.',
            unlockReq: () => App.game.farming.unlockedBerries[BerryType.Beauty](),
        }));
        // Dream
        this.mutations.push(new GrowNearBerryMutation(.0003, BerryType.Dream,
            [
                BerryType.Monitoring,
                BerryType.MindControl,
            ]));
        // Logoff
        this.mutations.push(new GrowNearBerryMutation(.0003, BerryType.Logoff,
            [
                BerryType.Simulation,
                BerryType.Trashbin,
            ]));

        // Monitoring
        this.mutations.push(new FieldMutation(.00001, BerryType.Monitoring, BerryType.Gossip, undefined, {
            unlockReq: () => App.game?.statistics?.pokemonCaptured[PokemonHelper.getPokemonByName('Burpmon').id](),
        }));
        // MindControl
        this.mutations.push(new FieldMutation(.00001, BerryType.MindControl, BerryType.Exercise, undefined, {
            unlockReq: () => App.game?.statistics?.pokemonCaptured[PokemonHelper.getPokemonByName('Burpmon').id](),
        }));
        // Simulation
        this.mutations.push(new FieldMutation(.00001, BerryType.Simulation, BerryType.Astrology, undefined, {
            unlockReq: () => App.game?.statistics?.pokemonCaptured[PokemonHelper.getPokemonByName('Burpmon').id](),
        }));
        // Trashbin
        this.mutations.push(new PetayaMutation(.00001));
        // Gashapon
        this.mutations.push(new FieldMutation(.00001, BerryType.Gashapon, BerryType.Slots, undefined, {
            unlockReq: () => App.game?.statistics?.pokemonCaptured[PokemonHelper.getPokemonByName('Burpmon').id](),
        }));
        // Censored
        // TODO: HLXII - Add Mutation to evolve Translate when Milotic, Gardevoir, Blissey, and Togekiss in party.
        this.mutations.push(new FieldMutation(.00001, BerryType.Censored, BerryType.Hotel, undefined, {
            unlockReq: () => App.game?.statistics?.pokemonCaptured[PokemonHelper.getPokemonByName('Burpmon').id](),
        }));

        // Battery
        // No mutation, obtained by wandering shiny pokemon
        // Calculator
        this.mutations.push(new EnigmaMutation(.0001));
        // Calculator Mutations
        this.mutations.push(new EvolveNearBerryMutation(.0004, BerryType.Monitoring, BerryType.Gossip, [BerryType.Calculator], {
            showHint: false,
            unlockReq: () => App.game.farming.unlockedBerries[BerryType.Monitoring](),
        }));
        this.mutations.push(new EvolveNearBerryMutation(.0004, BerryType.MindControl, BerryType.Exercise, [BerryType.Calculator], {
            showHint: false,
            unlockReq: () => App.game.farming.unlockedBerries[BerryType.MindControl](),
        }));
        this.mutations.push(new EvolveNearBerryMutation(.0004, BerryType.Simulation, BerryType.Astrology, [BerryType.Calculator], {
            showHint: false,
            unlockReq: () => App.game.farming.unlockedBerries[BerryType.Simulation](),
        }));
        this.mutations.push(new EvolveNearBerryMutation(.0004, BerryType.Trashbin, BerryType.Translate, [BerryType.Calculator], {
            showHint: false,
            unlockReq: () => App.game.farming.unlockedBerries[BerryType.Trashbin](),
        }));
        this.mutations.push(new EvolveNearBerryMutation(.0004, BerryType.Gashapon, BerryType.Slots, [BerryType.Calculator], {
            showHint: false,
            unlockReq: () => App.game.farming.unlockedBerries[BerryType.Gashapon](),
        }));
        this.mutations.push(new EvolveNearBerryMutation(.0004, BerryType.Censored, BerryType.Hotel, [BerryType.Calculator], {
            showHint: false,
            unlockReq: () => App.game.farming.unlockedBerries[BerryType.Censored](),
        }));
        this.mutations.push(new EvolveNearBerryMutation(.0004, BerryType.Battery, BerryType.Phone, [BerryType.Calculator], {
            showHint: false,
            unlockReq: () => App.game.farming.unlockedBerries[BerryType.Battery](),
        }));

        // Empty Mutations for hints

        // Action
        this.mutations.push(new BlankMutation(0, BerryType.Action,
            {
                hint: 'I\'ve heard of a Berry that only appears after a Berry plant has withered, but is repelled by Entertainment Plants.',
                unlockReq: () => App.game.farming.highestUnlockedBerry() >= BerryType.Broadcasting,
            }));

        // Battery
        this.mutations.push(new BlankMutation(0, BerryType.Battery,
            {
                hint: 'I\'ve heard of a Berry that only appears after a Shiny Pokémon wanders near open soil.',
                unlockReq: () => App.game.farming.highestUnlockedBerry() >= BerryType.Broadcasting,
            }));

        //#endregion

        //#endregion

    }

    getGrowthMultiplier(): number {
        let multiplier = 1;
        multiplier *= App.game.oakItems.calculateBonus(OakItemType.Sprayduck) * FluteEffectRunner.getFluteMultiplier(GameConstants.FluteItemType.H_Wood_Spirit);
        return multiplier;
    }

    getReplantMultiplier(): number {
        let multiplier = 1;
        multiplier *= App.game.oakItems.calculateBonus(OakItemType.Sprinklotad) * FluteEffectRunner.getFluteMultiplier(GameConstants.FluteItemType.H_Wood_Spirit);
        return multiplier;
    }

    getMutationMultiplier(): number {
        let multiplier = 1;
        multiplier *= App.game.oakItems.calculateBonus(OakItemType.Squirtbottle);
        return multiplier;
    }

    update(delta: number): void {
        const timeToReduce = delta;

        const notifications = new Set<FarmNotificationType>();

        let change = false;

        // Handle updating auras
        if (this.queuedAuraReset >= 0) {
            this.queuedAuraReset -= 1;
            if (this.queuedAuraReset === 0) {
                this.resetAuras();
            }
        }

        // Updating Berries
        this.plotList.forEach(plot => {
            if (plot.update(timeToReduce)) {
                change = true;
            }
            if (plot.notifications) {
                plot.notifications.forEach(n => notifications.add(n));
                plot.notifications = [];
            }
        });

        // Running Mutations
        this.mutationCounter += GameConstants.TICK_TIME;
        if (this.mutationCounter >= GameConstants.MUTATION_TICK) {
            this.mutations.forEach(mutation => {
                if (mutation.mutate()) {
                    GameHelper.incrementObservable(App.game.statistics.totalBerriesMutated, 1);
                    notifications.add(FarmNotificationType.Mutated);
                    change = true;
                }
            });
            this.mutationCounter = 0;
        }

        // Wandering Pokemon
        this.wanderCounter += GameConstants.TICK_TIME;
        let wanderPokemon: any;
        if (this.wanderCounter >= GameConstants.WANDER_TICK) {
            for (let i = 0; i < App.game.farming.plotList.length; i++) {
                const plot = App.game.farming.plotList[i];
                wanderPokemon = plot.generateWanderPokemon();
                if (wanderPokemon !== undefined) {
                    // TODO: HLXII Handle other bonus (DT?)
                    notifications.add(FarmNotificationType.Wander);
                    break;
                }
            }
            this.wanderCounter = 0;

        }

        // Handle queueing aura reset
        if (change) {
            this.queuedAuraReset = 2;
        }

        if (notifications.size) {
            notifications.forEach((n) => this.handleNotification(n, wanderPokemon));
        }

        this.farmHands.tick();
    }

    handleNotification(farmNotiType: FarmNotificationType, wander?: any): void {
        let message = '';
        let type = NotificationConstants.NotificationOption.success;
        let sound = NotificationConstants.NotificationSound.Farming.ready_to_harvest;
        let setting = NotificationConstants.NotificationSetting.Farming.ready_to_harvest;

        switch (farmNotiType) {
            case FarmNotificationType.Ripe:
                message = 'A Berry is ready to harvest!';
                break;
            case FarmNotificationType.AboutToWither:
                message = 'A Berry plant is about to wither!';
                type = NotificationConstants.NotificationOption.warning;
                sound = NotificationConstants.NotificationSound.Farming.berry_wither;
                setting = NotificationConstants.NotificationSetting.Farming.about_to_wither;
                break;
            case FarmNotificationType.Withered:
                message = 'A Berry plant has withered!';
                type = NotificationConstants.NotificationOption.warning;
                sound = NotificationConstants.NotificationSound.Farming.berry_wither;
                setting = NotificationConstants.NotificationSetting.Farming.berry_withered;
                break;
            case FarmNotificationType.Mutated:
                message = 'A Berry plant has mutated!';
                sound = NotificationConstants.NotificationSound.Farming.berry_mutated;
                setting = NotificationConstants.NotificationSetting.Farming.berry_mutated;
                break;
            case FarmNotificationType.Replanted:
                message = 'A Berry has been replanted!';
                sound = NotificationConstants.NotificationSound.Farming.berry_replanted;
                setting = NotificationConstants.NotificationSetting.Farming.berry_replanted;
                break;
            case FarmNotificationType.Dropped:
                message = 'A Berry has been dropped!';
                sound = NotificationConstants.NotificationSound.Farming.berry_dropped;
                setting = NotificationConstants.NotificationSetting.Farming.berry_dropped;
                break;
            case FarmNotificationType.MulchRanOut:
                message = 'A plot has run out of mulch!';
                type = NotificationConstants.NotificationOption.warning;
                sound = NotificationConstants.NotificationSound.Farming.mulch_ran_out;
                setting = NotificationConstants.NotificationSetting.Farming.mulch_ran_out;
                break;
            case FarmNotificationType.Wander:
                const pokemon = wander?.shiny ? `shiny ${wander?.pokemon}` : wander?.pokemon;
                message = `A wild ${pokemon} has wandered onto the farm!`;
                type = wander?.shiny ? NotificationConstants.NotificationOption.warning : NotificationConstants.NotificationOption.success;
                sound = NotificationConstants.NotificationSound.Farming.wandering_pokemon;
                setting = NotificationConstants.NotificationSetting.Farming.wandering_pokemon;
                break;
        }

        Notifier.notify({
            message,
            type,
            sound,
            setting,
        });
    }

    resetAuras() {
        this.externalAuras[AuraType.Attract](1);
        this.externalAuras[AuraType.Egg](1);
        this.externalAuras[AuraType.Shiny](1);
        this.externalAuras[AuraType.Roaming](1);
        this.plotList.forEach(plot => plot.clearAuras());

        // Handle Boost Auras first
        this.plotList.forEach((plot, idx) => {
            if (plot.berryData?.aura && plot.berryData?.aura.auraType === AuraType.Boost) {
                plot.emitAura(idx);
            }
        });

        // Handle rest of Auras
        this.plotList.forEach((plot, idx) => {
            if (!plot.berryData?.aura || plot.berryData?.aura.auraType !== AuraType.Boost) {
                plot.emitAura(idx);
            }
        });
    }

    //#region Plot Unlocking

    static unlockMatrix = [
        BerryType.Diary, BerryType.Sleep, BerryType.Games, BerryType.Health, BerryType.Accounting,
        BerryType.Backup, BerryType.Light, BerryType.Games, BerryType.eBook, BerryType.Calendar,
        BerryType.eBook, BerryType.Step, BerryType.None, BerryType.Security, BerryType.Security,
        BerryType.Travel, BerryType.Finance, BerryType.Health, BerryType.Chat, BerryType.Light,
        BerryType.Alarm, BerryType.Music, BerryType.Step, BerryType.Weather, BerryType.Video,
    ]

    unlockPlot(index: number) {
        if (this.allPlotsUnlocked()) {
            return;
        }
        if (this.canBuyPlot(index)) {
            const berryData = this.plotBerryCost(index);
            GameHelper.incrementObservable(this.berryList[berryData.type], -berryData.amount);
            const cost = this.plotFPCost(index);
            App.game.wallet.loseAmount(new Amount(cost, GameConstants.Currency.farmPoint));
            this.plotList[index].isUnlocked = true;
        }
    }

    allPlotsUnlocked() {
        return this.plotList.every(plot => plot.isUnlocked);
    }

    canBuyPlot(index: number): boolean {
        const berryData = this.plotBerryCost(index);
        if (App.game.farming.berryList[berryData.type]() < berryData.amount) {
            return false;
        }
        const cost = this.plotFPCost(index);
        if (!App.game.wallet.hasAmount(new Amount(cost, GameConstants.Currency.farmPoint))) {
            return false;
        }
        return true;
    }

    plotFPCost(index: number): number {
        const berryType = Farming.unlockMatrix[index];
        return 10 * Math.floor(Math.pow(berryType + 1, 2));
    }

    plotBerryCost(index: number): {type: BerryType, amount: number} {
        const berryType = Farming.unlockMatrix[index];
        return { type: berryType, amount: 10 * (berryType + 1) };
    }

    //#endregion

    plant(index: number, berry: BerryType, suppressResetAura = false) {
        const plot = this.plotList[index];
        if (!plot.isEmpty() || !plot.isUnlocked || !this.hasBerry(berry)) {
            return;
        }

        GameHelper.incrementObservable(this.berryList[berry], -1);
        plot.plant(berry);

        if (!suppressResetAura) {
            this.resetAuras();
        }
    }

    plantAll(berry: BerryType) {
        this.plotList.forEach((plot, index) => {
            this.plant(index, berry, true);
        });
        this.resetAuras();
    }

    /**
     * Harvest a plot at the given index
     * @param index The index of the plot to harvest
     */
    harvest(index: number, suppressResetAura = false): void {
        const plot = this.plotList[index];
        if (plot.berry === BerryType.None || plot.stage() != PlotStage.Berry) {
            return;
        }

        App.game.wallet.gainFarmPoints(this.berryData[plot.berry].farmValue);

        const amount = plot.harvestAmount();

        this.gainBerry(plot.berry, amount);

        App.game.oakItems.use(OakItemType.Sprayduck, this.berryData[plot.berry].exp);
        GameHelper.incrementObservable(App.game.statistics.totalManualHarvests, 1);

        player.lowerItemMultipliers(MultiplierDecreaser.Berry, this.berryData[plot.berry].exp);

        plot.die(true);

        if (!suppressResetAura) {
            this.resetAuras();
        }
    }

    /**
     * Try to harvest all plots
     */
    public harvestAll() {
        this.plotList.forEach((plot, index) => {
            this.harvest(index, true);
        });
        this.resetAuras();
    }

    /**
     * Handles using the Berry Shovel to remove a Berry plant
     * @param index The plot index
     */
    public shovel(index: number): void {
        const plot = this.plotList[index];
        if (!plot.isUnlocked) {
            return;
        }
        if (plot.isEmpty()) {
            return;
        }
        if (plot.stage() == PlotStage.Berry) {
            this.harvest(index);
            return;
        }
        if (this.shovelAmt() <= 0) {
            return;
        }
        plot.die(true);
        GameHelper.incrementObservable(this.shovelAmt, -1);
        GameHelper.incrementObservable(App.game.statistics.totalShovelsUsed, 1);

        this.resetAuras();
    }

    /**
     * Handles using the Mulch Shovel to remove mulch from a plot
     * @param index The plot index
     */
    public shovelMulch(index: number): void {
        const plot = this.plotList[index];
        if (!plot.isUnlocked) {
            return;
        }
        if (this.mulchShovelAmt() <= 0) {
            return;
        }

        if (plot.clearMulch()) {
            GameHelper.incrementObservable(this.mulchShovelAmt, -1);
            GameHelper.incrementObservable(App.game.statistics.totalShovelsUsed, 1);
        }

        this.resetAuras();
    }

    /**
     * Adds mulch to a plot
     * @param index The plot index
     * @param mulch The MulchType to be added
     * @param amount The amount of mulch to apply. Defaults to 1
     */
    public addMulch(index: number, mulch: MulchType, amount = 1) {
        const plot = this.plotList[index];
        if (!this.canMulch(index, mulch)) {
            return;
        }

        amount = Math.min(this.mulchList[mulch](), amount);

        GameHelper.incrementObservable(this.mulchList[mulch], -amount);
        GameHelper.incrementObservable(App.game.statistics.totalMulchesUsed, amount);
        GameHelper.incrementObservable(App.game.statistics.mulchesUsed[mulch], amount);

        plot.mulch = +mulch;
        plot.mulchTimeLeft += GameConstants.MULCH_USE_TIME * amount;
    }

    /**
     * Attempts to add mulch to all plots
     * @param mulch The MulchType to be added
     * @param amount The amount of mulch to apply to each plot. Defaults to 1
     */
    public mulchAll(mulch: MulchType, amount = 1) {
        const mulchPlots = this.plotList.filter((_, index) => this.canMulch(index, mulch));
        amount *= mulchPlots.length;
        amount = Math.min(this.mulchList[mulch](), amount);

        const sharedMulch = Math.floor(amount / mulchPlots.length);
        if (sharedMulch <= 0) {
            return;
        }

        this.plotList.forEach((_, index) => {
            this.addMulch(index, mulch, sharedMulch);
        });
    }

    private canMulch(index: number, mulch: MulchType) {
        const plot = this.plotList[index];
        if (!plot.isUnlocked || !this.hasMulch(mulch)) {
            return false;
        }
        if (plot.mulch != MulchType.None && plot.mulch != mulch) {
            return false;
        }
        return true;
    }

    /**
     * Gives the player a random Berry from the first 8 types
     * @param amount Amount of berries to give. Defaults to 1.
     * @param disableNotification Set to true to not notify the player. Defaults to false.
     */
    gainRandomBerry(amount = 1, disableNotification = false) {
        const berry = GameHelper.getIndexFromDistribution(GameConstants.BerryDistribution);
        if (!disableNotification) {
            Notifier.notify({
                message: `You got a ${BerryType[berry]} berry!`,
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.Items.route_item_found,
            });
        }
        this.gainBerry(berry, amount, false);
    }

    gainBerry(berry: BerryType, amount = 1, farming = true) {
        GameHelper.incrementObservable(this.berryList[berry], Math.floor(amount));

        if (amount > 0) {
            this.unlockBerry(berry);
            GameHelper.incrementObservable(App.game.statistics.totalBerriesObtained, amount);
            GameHelper.incrementObservable(App.game.statistics.berriesObtained[berry], amount);
            if (farming === true) {
                GameHelper.incrementObservable(App.game.statistics.totalBerriesHarvested, amount);
                GameHelper.incrementObservable(App.game.statistics.berriesHarvested[berry], amount);
            }
        }
    }

    hasBerry(berry: BerryType) {
        return this.berryList[berry]() > 0;
    }

    hasMulch(mulch: MulchType) {
        return this.mulchList[mulch]() > 0;
    }

    canAccess(): boolean {
        return MapHelper.accessToRoute(14, 0) && App.game.keyItems.hasKeyItem(KeyItemType.Wailmer_pail);
    }

    unlockBerry(berry: BerryType) {
        if (!this.unlockedBerries[berry]()) {
            Notifier.notify({
                message: `You've discovered a ${BerryType[berry]} Berry!`,
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.Items.route_item_found,
            });
            this.unlockedBerries[berry](true);
        }
    }

    /**
     * Checks whether a Berry plant exists on the farm
     * @param berry The Berry type
     * @param stage The stage of the Berry plant. Defaults to PlotStage.Berry
     */
    berryInFarm(berry: BerryType, stage = PlotStage.Berry) {
        return this.plotList.some(plot => plot.berry == berry && plot.stage() >= stage);
    }

    toJSON(): Record<string, any> {
        return {
            berryList: this.berryList.map(ko.unwrap),
            unlockedBerries: this.unlockedBerries.map(ko.unwrap),
            mulchList: this.mulchList.map(ko.unwrap),
            plotList: this.plotList.map(plot => plot.toJSON()),
            shovelAmt: this.shovelAmt(),
            mulchShovelAmt: this.mulchShovelAmt(),
            mutations: this.mutations.map(mutation => mutation.toJSON()),
            farmHands: this.farmHands.toJSON(),
        };
    }

    fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }

        const savedBerries = json['berryList'];
        if (savedBerries == null) {
            this.berryList = this.defaults.berryList.map((v) => ko.observable<number>(v));
        } else {
            (savedBerries as number[]).forEach((value: number, index: number) => {
                this.berryList[index](value);
            });
        }

        const savedUnlockedBerries = json['unlockedBerries'];
        if (savedUnlockedBerries == null) {
            this.unlockedBerries = this.defaults.unlockedBerries.map((v) => ko.observable<boolean>(v));
        } else {
            (savedUnlockedBerries as boolean[]).forEach((value: boolean, index: number) => {
                this.unlockedBerries[index](value);
            });
        }

        const savedMulches = json['mulchList'];
        if (savedMulches == null) {
            this.mulchList = this.defaults.mulchList.map((v) => ko.observable<number>(v));
        } else {
            (savedMulches as number[]).forEach((value: number, index: number) => {
                this.mulchList[index](value);
            });
        }

        const savedPlots = json['plotList'];
        if (savedPlots == null) {
            this.plotList = this.defaults.plotList;
        } else {
            (savedPlots as Record<string, any>[]).forEach((value: Record<string, any>, index: number) => {
                const plot: Plot = new Plot(false, BerryType.None, 0, MulchType.None, 0);
                plot.fromJSON(value);
                this.plotList[index] = plot;
            });
        }

        const shovelAmt = json['shovelAmt'];
        if (shovelAmt == null) {
            this.shovelAmt = ko.observable(this.defaults.shovelAmt);
        } else {
            this.shovelAmt(shovelAmt);
        }

        const mulchShovelAmt = json['mulchShovelAmt'];
        if (mulchShovelAmt == null) {
            this.mulchShovelAmt = ko.observable(this.defaults.mulchShovelAmt);
        } else {
            this.mulchShovelAmt(mulchShovelAmt);
        }

        const mutations = json['mutations'];
        if (mutations) {
            this.mutations.forEach((mutation, i) => mutation.fromJSON(mutations[i]));
        }

        this.farmHands.fromJSON(json.farmHands);
    }

    public static genBounds = [8, 20, 35, 53, Infinity];
    public static getGeneration(gen: number): BerryType[] {
        const genBounds = Farming.genBounds;
        const minBound = genBounds[gen - 1] || 0;
        const maxBound = genBounds[gen] || Infinity;
        return App.game.farming.berryData.filter(berry => berry.type >= minBound && berry.type < maxBound).map(berry => berry.type);
    }

    public static getColor(color: BerryColor): BerryType[] {
        return App.game.farming.berryData.filter(berry => berry.color === color).map(berry => berry.type);
    }
}
