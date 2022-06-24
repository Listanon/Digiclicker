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
            ['You shouldn\'t be suprised to know that this is our most popular item. It\'s all about making as many of them, as quickly as possible.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Security]    = new Berry(BerryType.Security,   [5, 15, 25, 40, 80],
            3, 0.5, 6, 2,
            [0, 10, 0, 0, 0], BerryColor.Blue,
            ['A basic program to keep your device safe. Everyone needs one.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Health]     = new Berry(BerryType.Health,    [10, 35, 50, 60, 120],
            4, 0.5, 7, 3,
            [0, 0, 10, 0, 0], BerryColor.Pink,
            ['A simple diagnostics program. It won\'t fix the bugs but it will give you a form to report them.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Step]     = new Berry(BerryType.Step,    [15, 30, 45, 80, 160],
            5, 0.5, 8, 4,
            [0, 0, 0, 10, 0], BerryColor.Green,
            ['This one keeps count of your steps as you walk.']);
        this.berryData[BerryType.Light]    = new Berry(BerryType.Light,   [10, 40, 60, 120, 240],
            6, 0.5, 9, 5,
            [0, 0, 0, 0, 10], BerryColor.Yellow,
            ['Turns any light emitting component on and makes your device into a makeshift flashlight.'], undefined, ['Burpmon', 'Burpmon']);
        this.berryData[BerryType.eBook]     = new Berry(BerryType.eBook,    [100, 120, 140, 240, 480],
            7, 0.5, 10, 6,
            [10, 0, 10, 10, 10], BerryColor.Purple,
            ['More convenient that carrying a heavy book around. It can store thousands of books for reading on the go.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Chat]      = new Berry(BerryType.Chat,     [120, 180, 240, 300, 600],
            8, 0.5, 20, 7,
            [10, 10, 0, 10, 10], BerryColor.Blue,
            ['A messaging program. Make groups and talk with others.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Finance]    = new Berry(BerryType.Finance,   [150, 300, 450, 600, 1200],
            9, 0.5, 30, 8,
            [0, 10, 10, 10, 10], BerryColor.Yellow,
            ['How can our shop make a profit if our customers don\'t have a digital wallet to store their hard-earned money.'], undefined, ['Burpmon', 'Burpmon']);
        //#endregion

        //#region Second Generation
        this.berryData[BerryType.Mail]    = new Berry(BerryType.Mail,   [20, 40, 50, 90, 180],
            5, 0.4, 10, 2,
            [10, 10, 10, 0, 10], BerryColor.Pink,
            ['An email program. The latest update comes pre-subscribed to our newsletter.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Cards]      = new Berry(BerryType.Cards,     [100, 150, 200, 250, 500],
            7, 0.4, 15, 2,
            [10, 10, 0, 0, 0], BerryColor.Red,
            ['Solitaire, FreeCell, ads every other game. What\'s not to like.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Compress]      = new Berry(BerryType.Compress,     [200, 250, 300, 330, 660],
            9, 0.4, 20, 2,
            [0, 10, 10, 0, 0], BerryColor.Purple,
            ['The closest thing humans have made to real magic. You won\'t believe the memory you can save.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Camera]     = new Berry(BerryType.Camera,    [25, 30, 35, 250, 500],
            11, 0.4, 25, 2,
            [0, 0, 10, 10, 0], BerryColor.Pink,
            ['Photos, humans take a lot of them. That\'s why we charge premium for this one.'], undefined, ['Burpmon']);
        this.berryData[BerryType.GPS]    = new Berry(BerryType.GPS,   [150, 350, 375, 400, 800],
            12, 0.4, 30, 2,
            [0, 0, 0, 10, 10], BerryColor.Green,
            ['20% of the time, they\'ll use it for directions, 80% to find their house on it.']);
        this.berryData[BerryType.Shopping]     = new Berry(BerryType.Shopping,    [30, 60, 180, 240, 480],
            13, 0.4, 35, 2,
            [10, 0, 0, 0, 10], BerryColor.Yellow,
            ['If there\'s demand, there\'s someone who has scalped it.'], undefined, ['Burpmon', 'Burpmon']);

        this.berryData[BerryType.Music]      = new Berry(BerryType.Music,     [40, 160, 230, 350, 700],
            14, 0.3, 40, 3,
            [15, 0, 0, 0, 0], BerryColor.Red,
            ['Plays sounds that humans like. Nice of us to include all these tracks for free.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Backup]      = new Berry(BerryType.Backup,     [40, 190, 210, 360, 720],
            15, 0.3, 45, 3,
            [0, 15, 0, 0, 0], BerryColor.Purple,
            ['Unless you have 5 of them you don\'t have enough.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Sleep]      = new Berry(BerryType.Sleep,     [40, 180, 240, 370, 740],
            16, 0.3, 50, 3,
            [0, 0, 15, 0, 0], BerryColor.Pink,
            ['Humans use this when they have problems going to bed. It makes sounds of the sea and rain.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Calendar]     = new Berry(BerryType.Calendar,    [40, 170, 220, 350, 700],
            17, 0.3, 55, 3,
            [0, 0, 0, 15, 0], BerryColor.Green,
            ['What day is it in the human world? Use this to find out.']);
        this.berryData[BerryType.Weather]    = new Berry(BerryType.Weather,   [40, 200, 230, 380, 760],
            18, 0.3, 60, 3,
            [0, 0, 0, 0, 15], BerryColor.Yellow,
            ['Makes mostly accurate predictions of what the weather would be like in the future.'], undefined, ['Burpmon', 'Burpmon']);

        this.berryData[BerryType.Hacking]       = new Berry(BerryType.Hacking,      [3000, 3200, 3400, 3600, 43200],
            1, 0, 1000, 3,
            [10, 10, 10, 10, 0], BerryColor.Green,
            [
                'How did you get this? We are a legitimate business, we can\'t sell this. But you are free to use this yourself.',
                'This Disk multiplies the effects of Disks around it.',
            ], new Aura(AuraType.Boost, [1.01, 1.02, 1.03]));
        //#endregion

        //#region Third Generation
        this.berryData[BerryType.Travel]     = new Berry(BerryType.Travel,    [200, 1200, 4000, 5400, 10800],
            20, 0.2, 500, 10,
            [10, 0, 10, 10, 0], BerryColor.Red,
            ['Apparently, teleporting isn\'t a thing in the human world, they have to use this to plan things.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Diary]    = new Berry(BerryType.Diary,   [240, 2000, 3400, 6000, 12000],
            21, 0.2, 525, 10,
            [0, 10, 0, 10, 10], BerryColor.Blue,
            ['Keep notes, write poems, make shopping lists. Just make sure it\'s nothing too personal.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Accounting]    = new Berry(BerryType.Accounting,   [230, 1000, 2500, 4800, 9600],
            22, 0.2, 550, 10,
            [10, 0, 10, 0, 10], BerryColor.Yellow,
            ['Lines going up and down. Trade money for hopefully more money.'], undefined, ['Burpmon', 'Burpmon']);
        this.berryData[BerryType.Video]    = new Berry(BerryType.Video,   [1000, 2000, 5000, 10800, 21600],
            23, 0.2, 2000, 10,
            [10, 10, 0, 10, 0], BerryColor.Green,
            ['I don\'t get why they complain about unskippable 2 minutes ads for 30 seconds of video... it makes me money.']);
        this.berryData[BerryType.Alarm]     = new Berry(BerryType.Alarm,    [300, 3400, 5600, 7200, 14400],
            24, 0.2, 600, 10,
            [0, 10, 10, 0, 10], BerryColor.Yellow,
            ['Set 5 alarms only to snooze all of them.'], undefined, ['Burpmon', 'Burpmon']);
        this.berryData[BerryType.News]    = new Berry(BerryType.News,   [430, 1400, 4000, 8640, 17280],
            25, 0.2, 625, 10,
            [20, 10, 0, 0, 0], BerryColor.Red,
            ['You think I\'m shrewd…wait till you see what the people behind this one do to get you to click on things.'], undefined, ['Burpmon']);

        this.berryData[BerryType.Dictionary]     = new Berry(BerryType.Dictionary,    [1100, 4000, 8000, 9000, 18000],
            26, 0.1, 700, 10,
            [0, 20, 10, 0, 0], BerryColor.Purple,
            ['Who am I kidding, nobody uses this. Half the words humans use aren\'t even in it.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Cooking]    = new Berry(BerryType.Cooking,   [2400, 6500, 10000, 14400, 28800],
            27, 0.1, 750, 10,
            [0, 0, 20, 10, 0], BerryColor.Pink,
            ['It will tell you how to make some of the most delicious of meals. If you bother cooking them, that is.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Wallpaper]    = new Berry(BerryType.Wallpaper,   [2310, 5400, 9500, 12240, 24480],
            28, 0.1, 800, 10,
            [0, 0, 0, 20, 10], BerryColor.Green,
            ['We can charge people for image files. Humans will buy anything if you put a timer on it.']);
        this.berryData[BerryType.Fashion]     = new Berry(BerryType.Fashion,    [1240, 5200, 10500, 15120, 30240],
            29, 0.1, 850, 10,
            [10, 0, 0, 0, 20], BerryColor.Yellow,
            ['Humans care a lot about what they wear. They also care what others think about what they wear.'], undefined, ['Burpmon', 'Burpmon']);
        this.berryData[BerryType.Advice]    = new Berry(BerryType.Advice,   [2000, 7000, 12000, 15480, 30960],
            30, 0.1, 900, 10,
            [30, 10, 0, 0, 0], BerryColor.Red,
            ['Have a question? You\'ll find an answer. Will it be correct? You can always ask.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Search]    = new Berry(BerryType.Search,   [3000, 10000, 16400, 18000, 36000],
            31, 0.1, 950, 10,
            [0, 30, 10, 0, 0], BerryColor.Purple,
            [
                'Good luck doing anything on the internet without this. Keeping track of what you search is how the internet works.' ,
                'It has a tendency to copy itself into nearby trays.',
            ] , undefined, ['Burpmon']);
        this.berryData[BerryType.Gourmet]    = new Berry(BerryType.Gourmet,   [2300, 3400, 9800, 16560, 33120],
            32, 0.1, 1000, 10,
            [0, 0, 30, 10, 0], BerryColor.Pink,
            ['Order food you don\'t want to make yourself and get someone else to bring it to your house.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Paint]     = new Berry(BerryType.Paint,    [10000, 14000, 18000, 21600, 43200],
            33, 0.1, 1050, 10,
            [0, 0, 0, 30, 10], BerryColor.Green,
            ['From a simple doodle to a high quality portrait, this program provides a canvas for your imagination.']);
        this.berryData[BerryType.Beauty]     = new Berry(BerryType.Beauty,    [5000, 9800, 14500, 19800, 39600],
            20, 0.1, 1100, 10,
            [10, 0, 0, 0, 30], BerryColor.Purple,
            ['Make up and cosmetics. A business worth trillions. I had to get in on it.'], undefined, ['Burpmon']);
        //#endregion

        //#region Fourth Generation (Typed)
        this.berryData[BerryType.Broadcasting]      = new Berry(BerryType.Broadcasting,     [8090, 13200, 16000, 21960, 43920],
            21, 0.05, 1200, 15,
            [15, 0, 10, 0, 0], BerryColor.Red,
            [
                'Listen to this popular streamer, sponsored by Tyutyumon\'s of course.',
                'It has a tendency to overwrite nearby disks.',
            ], undefined, ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon']);
        this.berryData[BerryType.Gossip]    = new Berry(BerryType.Gossip,   [490, 3600, 10800, 21600, 43200],
            22, 0.05, 1300, 15,
            [0, 15, 0, 10, 0], BerryColor.Blue,
            [
                '27 Celebrities Who Went So Broke It\'s Embarrassing. Click now to see them!',
                'This Disk makes nearby Disks provide more copies than usual.',
            ], new Aura(AuraType.Harvest, [1.1, 1.2, 1.3]), ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon']);
        this.berryData[BerryType.Auction]     = new Berry(BerryType.Auction,    [10, 180, 900, 1800, 3600],
            2, 0.05, 250, 1,
            [0, 0, 15, 0, 10], BerryColor.Yellow,
            [
                'Going once, going twice, sold, to the human with the fat wallet.',
                'Makes nearby disks complete burning faster.',
            ], new Aura(AuraType.Growth, [1.1, 1.2, 1.3]), ['Burpmon', 'Burpmon', 'Burpmon']);
        this.berryData[BerryType.Recording]     = new Berry(BerryType.Recording,    [3600, 7200, 16200, 28800, 57600],
            24, 0.05, 1400, 15,
            [10, 0, 0, 15, 0], BerryColor.Green,
            [
                'So like, this one time, I was talking a stroll and I saw this huge like billboard with an advert for like Tyutyumon\'s…',
                'It has a tendency to expand into nearby trays.',
            ], undefined, ['Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon', 'Burpmon']);
        this.berryData[BerryType.Review]     = new Berry(BerryType.Review,    [3600, 14400, 28800, 43200, 86400],
            25, 0.05, 1500, 15,
            [0, 10, 0, 0, 15], BerryColor.Blue,
            [
                '5/5 stars. Tyutyumon\'s is the best online store I\'ve ever bought from.',
                'This Disk slows the burning of nearby Disks.',
            ], new Aura(AuraType.Growth, [0.9, 0.8, 0.7]), ['Burpmon', 'Burpmon']);
        this.berryData[BerryType.Puzzle]    = new Berry(BerryType.Puzzle,   [5400, 10800, 25200, 36000, 72000],
            26, 0.05, 1600, 15,
            [15, 0, 0, 10, 0], BerryColor.Red,
            [
                'Humans seem to enjoy filling squares with numbers for hours on end.',
                'Burning these Disks will promote Digitama growth.',
            ], new Aura(AuraType.Egg, [1.01, 1.02, 1.03]), ['Burpmon', 'Burpmon']);
        this.berryData[BerryType.Fortune]     = new Berry(BerryType.Fortune,    [100, 200, 400, 600, 86400],
            1, 1, 50, 1,
            [0, 15, 0, 0, 10], BerryColor.Green,
            [
                'I see spending a lot of money on Tyutyumon\'s in your future.',
                'It has a tendency to overwrite nearby disks.',
                'Due to its nature, it increases the chances of modifications near it.',
            ], new Aura(AuraType.Mutation, [1.2, 1.4, 1.6]), ['Burpmon']);
        this.berryData[BerryType.Exercise]     = new Berry(BerryType.Exercise,    [7200, 16200, 32400, 39600, 79200],
            28, 1, 1700, 15,
            [10, 0, 15, 0, 0], BerryColor.Yellow,
            [
                'Keep track of all the days you skipped on working out with this program.',
                'Burning these Disks will increase the chances of saving failed disks.',
            ], new Aura(AuraType.Replant, [1.01, 1.02, 1.03]), ['Burpmon', 'Burpmon', 'Burpmon']);
        this.berryData[BerryType.Astrology]      = new Berry(BerryType.Astrology,     [9000, 12600, 16200, 19800, 39600],
            29, 0.05, 1800, 15,
            [0, 10, 0, 15, 0], BerryColor.Blue,
            ['I was programmed during a full moon, that stars say that this is good for my finances.'],
            undefined, ['Burpmon', 'Burpmon']);
        this.berryData[BerryType.Translate]    = new Berry(BerryType.Translate,   [4680, 11880, 23400, 34200, 68400],
            30, 0.05, 1900, 15,
            [0, 0, 10, 0, 15], BerryColor.Purple,
            [
                'Se vi povas legi ĉi tion, vi uzas unu.',
                'Due to its nature, it increases the chances of modifications near it.',
            ], new Aura(AuraType.Mutation, [1.1, 1.2, 1.3]), ['Burpmon', 'Burpmon']);
        this.berryData[BerryType.Social]     = new Berry(BerryType.Social,    [450, 900, 1800, 3600, 7200],
            3, 0.5, 500, 15,
            [20, 0, 0, 0, 10], BerryColor.Green,
            [
                'Share your opinions with your friends. And block those who don\'t agree.',
                'It\'s toxit nature decreases the amount of disks burned on nearby trays.',
            ], new Aura(AuraType.Harvest, [0.9, 0.8, 0.7]), ['Burpmon']);
        this.berryData[BerryType.Library]    = new Berry(BerryType.Library,   [8600, 12960, 23040, 37800, 75600],
            32, 0.05, 2000, 15,
            [10, 20, 0, 0, 0], BerryColor.Yellow,
            [
                'Find books, comics, papers. All for a small price of 70 dollars a month.',
                'This Disk decreases the chances of saving overburned disks.',
            ], new Aura(AuraType.Replant, [0.99, 0.98, 0.97]), ['Burpmon', 'Burpmon', 'Burpmon']);
        this.berryData[BerryType.Action]     = new Berry(BerryType.Action,    [30, 60, 120, 300, 86400],
            1, 1, 25, 1,
            [0, 10, 20, 0, 0], BerryColor.Purple,
            [
                'Lootboxes are the single greatest invention since the texture file.',
                'This fast paced Disk causes other nearby Disks to last less.',
            ], new Aura(AuraType.Death, [1.25, 1.5, 2.0]), ['Burpmon', 'Burpmon']);
        this.berryData[BerryType.Phone]     = new Berry(BerryType.Phone,    [10800, 21600, 43200, 86400, 172800],
            34, 0, 4000, 15,
            [0, 0, 10, 20, 0], BerryColor.Red,
            [
                'A call feature program.',
                'This Disk requires a lot of energy to burn, stealing away power from nearby trays.',
            ], new Aura(AuraType.Growth, [0.8, 0.6, 0.5]), ['Burpmon', 'Burpmon']);
        this.berryData[BerryType.Entertainment]    = new Berry(BerryType.Entertainment,   [2880, 10080, 19440, 27000, 54000],
            35, 0.05, 2300, 15,
            [0, 0, 0, 10, 20], BerryColor.Purple,
            [
                'Are you familiar with the concept of memes?',
                'It has a tendency to overwrite nearby Disks.',
            ], undefined, ['Burpmon', 'Burpmon']);
        this.berryData[BerryType.Medical]    = new Berry(BerryType.Medical,   [7200, 16200, 32400, 64800, 129600],
            36, 0.05, 2400, 15,
            [25, 10, 0, 0, 0], BerryColor.Green,
            [
                'Enter your symptoms and it will give you a rare congenital disease that matches.',
                'This Disk is very hardy, making it resistant to overwriting, and also decreasing the chance of overwriting around it.',
            ], new Aura(AuraType.Mutation, [0.5, 0.25, 0.0]), ['Burpmon']);
        this.berryData[BerryType.Slots]    = new Berry(BerryType.Slots,   [240, 1430, 2970, 7200, 14400],
            10, 0.05, 500, 15,
            [0, 25, 10, 0, 0], BerryColor.Yellow,
            ['You win a free 100 spins!'], undefined, ['Burpmon', 'Burpmon']);
        this.berryData[BerryType.Hotel]    = new Berry(BerryType.Hotel,   [2410, 5040, 12600, 25200, 50400],
            38, 0.05, 2500, 15,
            [0, 0, 25, 10, 0], BerryColor.Pink,
            [
                'Hotel? Tyutyumon\'s.',
                'The data of this Disk attracts wild Digimon.',
            ], new Aura(AuraType.Attract, [1.01, 1.02, 1.03]), ['Burpmon', 'Burpmon']);
        //#endregion

        //#region Fifth Generation
        this.berryData[BerryType.Virus]     = new Berry(BerryType.Virus,    [3960, 7920, 15840, 31680, 63360],
            1, 0.05, 2600, 20,
            [0, 40, 10, 0, 0], BerryColor.Green,
            ['Why is this anti-virus program called Virus, you may ask? It\'s best not to worry about it.']);
        this.berryData[BerryType.Commentary]    = new Berry(BerryType.Commentary,   [3240, 8280, 13320, 27360, 54720],
            1, 0.05, 2700, 20,
            [0, 0, 40, 10, 0], BerryColor.Red,
            ['Your post gathered 31 votes and 456 replies.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Design]    = new Berry(BerryType.Design,   [4320, 8640, 16560, 33480, 66960],
            1, 0.05, 2800, 20,
            [0, 0, 0, 40, 10], BerryColor.Yellow,
            [
                'Build a house or 3d print a sword.',
                'The data of these Disk attracts wild Digimon.',
            ], new Aura(AuraType.Roaming, [1.005, 1.01, 1.015]), ['Burpmon', 'Burpmon']);
        this.berryData[BerryType.Mirror]     = new Berry(BerryType.Mirror,    [5760, 9000, 14040, 21240, 42480],
            1, 0.05, 2900, 20,
            [10, 0, 0, 0, 40], BerryColor.Blue,
            ['Now don\'t tell this to anyone but, you can\'t really make a mirror from a digital screen, but people will still try.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Dream]       = new Berry(BerryType.Dream,      [4680, 9360, 18360, 36360, 72720],
            1, 0.05, 3000, 20,
            [30, 30, 10, 10, 10], BerryColor.Yellow,
            ['A program that records dreams, through a complex series of algorithms that monitor your brainwaves.'], undefined, ['Burpmon', 'Burpmon']);
        this.berryData[BerryType.Logoff]   = new Berry(BerryType.Logoff,  [5040, 10080, 20160, 40320, 80640],
            1, 0.05, 3100, 20,
            [10, 10, 30, 30, 10], BerryColor.Blue,
            ['You\'ve come this far, you can turn your device off now.'], undefined, ['Burpmon']);

        this.berryData[BerryType.Monitoring]    = new Berry(BerryType.Monitoring,   [21600, 43200, 86400, 172800, 345600],
            0.5, 0, 10000, 20,
            [30, 10, 30, 0, 0], BerryColor.Red,
            ['This is for monitoring your dog when away. If you get caught spying on your neighbor it won\'t be our fault.'],
            undefined, ['Burpmon', 'Burpmon']);
        this.berryData[BerryType.MindControl]    = new Berry(BerryType.MindControl,   [21600, 43200, 86400, 172800, 345600],
            0.5, 0, 10000, 20,
            [0, 30, 10, 30, 0], BerryColor.Purple,
            ['A legendary program that allows the user to control the minds of others.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Simulation]     = new Berry(BerryType.Simulation,    [21600, 43200, 86400, 172800, 345600],
            0.5, 0, 10000, 20,
            [0, 0, 30, 10, 30], BerryColor.Green,
            ['A legendary program that allows the user to create artificial life in the digital world.']);
        this.berryData[BerryType.Trashbin]    = new Berry(BerryType.Trashbin,   [10800, 21600, 43200, 86400, 432000],
            0.5, 0, 15000, 20,
            [30, 0, 0, 30, 10], BerryColor.Pink,
            [
                'After popular demand we now offer an uninstall program. You just have to install all other programs first.',
                'It\'s data keeps other disks active for longer.',
            ],
            undefined, ['Burpmon', 'Burpmon']);
        this.berryData[BerryType.Gashapon]    = new Berry(BerryType.Gashapon,   [10800, 21600, 43200, 86400, 432000],
            0.5, 0, 15000, 20,
            [10, 30, 0, 0, 30], BerryColor.Blue,
            ['Stay away from that one. This technology is too dangerous.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Censored]    = new Berry(BerryType.Censored,   [10800, 21600, 43200, 86400, 432000],
            0.5, 0, 15000, 20,
            [30, 10, 30, 10, 30], BerryColor.Red,
            ['What? This is a business. We give the people what they want.'], undefined, ['Burpmon']);
        this.berryData[BerryType.Battery]     = new Berry(BerryType.Battery,    [10800, 21600, 43200, 86400, 432000],
            0.5, 0, 15000, 20,
            [30, 10, 30, 10, 30], BerryColor.Green,
            ['Get the most out of your battery\'s life, so you can stay on your device for longer.'],
            new Aura(AuraType.Shiny, [1.005, 1.01, 1.015]), ['Burpmon']);

        this.berryData[BerryType.Calculator]    = new Berry(BerryType.Calculator,   [10800, 21600, 43200, 86400, 604800],
            0.5, 0, 15000, 20,
            [40, 10, 0, 0, 0], BerryColor.Purple,
            ['This was supposed to be a simple calculator program, but was discontinued because it contains a backdoor for the server itself.'], undefined, ['Burpmon']);
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
                hint: 'I\'ve heard that a special Disk can appear if its surroundings get too exciting!',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Games]();
                },
            }
        ));
        // Backup
        this.mutations.push(new GrowNearFlavorMutation(.008, BerryType.Backup,
            [[0, 5], [25, 80], [0, 5], [0, 5], [0, 5]], {
                hint: 'I\'ve heard that a special Disk can appear if its surroundings get too technical!',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Security]();
                },
            }
        ));
        // Sleep
        this.mutations.push(new GrowNearFlavorMutation(.007, BerryType.Sleep,
            [[0, 5], [0, 5], [25, 80], [0, 5], [0, 5]], {
                hint: 'I\'ve heard that a special Disk can appear if its surroundings get too comforting!',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Health]();
                },
            }
        ));
        // Calendar
        this.mutations.push(new GrowNearFlavorMutation(.006, BerryType.Calendar,
            [[0, 5], [0, 5], [0, 5], [25, 80], [0, 5]], {
                hint: 'I\'ve heard that a special Disk can appear if its surroundings get too informative!',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Step]();
                },
            }
        ));
        // Weather
        this.mutations.push(new GrowNearFlavorMutation(.005, BerryType.Weather,
            [[0, 5], [0, 5], [0, 5], [0, 5], [25, 80]], {
                hint: 'I\'ve heard that a special Berry can appear if its surroundings get too practical!',
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
                hint: 'I\'ve heard that there\'s a Disk that only appears when fully surrounded by unique Disks!',
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
                hint: 'I\'ve heard that a special Disk can appear if its surroundings match its data profile! If I recall, it was a little entertaining, a little comforting, and a little practical at the same time.',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Games]() &&
                    App.game.farming.unlockedBerries[BerryType.Health]() &&
                    App.game.farming.unlockedBerries[BerryType.Light]();
                },
            }));
        // Video
        this.mutations.push(new GrowNearFlavorMutation(.0004, BerryType.Video,
            [[15, 15], [15, 15], [0, 0], [15, 15], [0, 0]], {
                hint: 'I\'ve heard that a special Disk can appear if its surroundings match its data profile! If I recall, it was fairly exciting, technical, and informative at the same time.',
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
                hint: 'I\'ve heard that a News Disk will change if its surroundings get extremely exciting!',
            }));
        // Search
        this.mutations.push(new EvolveNearFlavorMutation(.0002, BerryType.Search, BerryType.Dictionary,
            [[0, 80], [130, 160], [0, 80], [0, 80], [0, 80]], {
                hint: 'I\'ve heard that a Dictionary Disk will change if its surroundings get extremely technical!',
            }));
        // Search Overgrow
        this.mutations.push(new GrowNearBerryMutation(.0004, BerryType.Search,
            [BerryType.Search], { showHint: false }));
        // Gourmet
        this.mutations.push(new EvolveNearFlavorMutation(.0002, BerryType.Gourmet, BerryType.Cooking,
            [[0, 80], [0, 80], [130, 160], [0, 80], [0, 80]], {
                hint: 'I\'ve heard that a Cooking Disk will change if its surroundings get extremely comforting!',
            }));
        // Paint
        this.mutations.push(new EvolveNearFlavorMutation(.0002, BerryType.Paint, BerryType.Wallpaper,
            [[0, 80], [0, 80], [0, 80], [130, 160], [0, 80]], {
                hint: 'I\'ve heard that a Wallpaper Disk will change if its surroundings get extremely informative!',
            }));
        // Beauty
        this.mutations.push(new EvolveNearFlavorMutation(.0002, BerryType.Beauty, BerryType.Fashion,
            [[0, 80], [0, 80], [0, 80], [0, 80], [130, 160]], {
                hint: 'I\'ve heard that a Fashion Disk will change if its surroundings get extremely practical!',
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
                hint: 'I\'ve heard that a special Disk can appear if its surroundings match its data profile! If I recall, it was a little exciting and fairly informative at the same time.',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Calendar]() &&
                    App.game.farming.unlockedBerries[BerryType.Games]();
                },
            }));
        // Recording Overgrow
        this.mutations.push(new GrowNearBerryMutation(.0004, BerryType.Recording, [BerryType.Recording], {showHint: false }));
        // Review
        this.mutations.push(new EvolveNearBerryStrictMutation(.0001, BerryType.Review, BerryType.Gossip, {}, PlotStage.Seed, {
            hint: 'I\'ve heard that burning a Gossip Disk alone will cause it to change!',
        }));
        // Puzzle
        this.mutations.push(new OakMutation(.0001, BerryType.Puzzle, BerryType.Advice, OakItemType.Egg_Holder));
        // Fortune
        this.mutations.push(new OakMutation(.0001, BerryType.Fortune, BerryType.Search, OakItemType.Fancy_Cursor));
        // Fortune Parasite
        this.mutations.push(new ParasiteMutation(.0004, BerryType.Fortune));
        // Exercise
        this.mutations.push(new OakMutation(.0001, BerryType.Exercise, BerryType.Gourmet, OakItemType.Failure_Prevent));
        // Astrology
        // TODO: HLXII - Change mutation to grow spontaneously when Flying pokemon in party
        this.mutations.push(new GrowNearFlavorMutation(.0001, BerryType.Astrology,
            [[0, 0], [10, 15], [0, 0], [15, 20], [0, 0]], {
                hint: 'I\'ve heard that a special Disk can appear if its surroundings match its data profile! If I recall, it was a little technical and fairly informative at the same time.',
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
            hint: 'I\'ve heard that a special Disk can appear after being surrounded by Recording Disks!',
        }));
        // Library
        this.mutations.push(new OakMutation(.0001, BerryType.Library, BerryType.Dictionary, OakItemType.Full_Battery));
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
            hint: 'I\'ve heard that a special Disk can appear after being surrounded by Exercise and Library Disks!',
        }));
        // Slots
        berryReqs = {};
        berryReqs[BerryType.Puzzle] = 3;
        this.mutations.push(new EvolveNearBerryMinMutation(.0001, BerryType.Slots, BerryType.Puzzle, berryReqs, {
            hint: 'I\'ve heard that Puzzle Disks will turn into a different Disk if surrounded by more than two of its own kind',
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
            hint: 'I\'ve heard of a Disk that only appears in the most technical of setups.',
            unlockReq: () => App.game.farming.unlockedBerries[BerryType.Search](),
        }));
        // Commentary
        this.mutations.push(new FieldFlavorMutation(.0003, BerryType.Commentary, [0, 0, 600, 0, 0], {
            hint: 'I\'ve heard of a Disk that only appears in the most comforting of setups.',
            unlockReq: () => App.game.farming.unlockedBerries[BerryType.Gourmet](),
        }));
        // Design
        this.mutations.push(new FieldFlavorMutation(.0003, BerryType.Design, [0, 0, 0, 600, 0], {
            hint: 'I\'ve heard of a Disk that only appears in the most informative of setups.',
            unlockReq: () => App.game.farming.unlockedBerries[BerryType.Paint](),
        }));
        // Mirror
        this.mutations.push(new FieldFlavorMutation(.0003, BerryType.Mirror, [0, 0, 0, 0, 600], {
            hint: 'I\'ve heard of a Disk that only appears in the most practical of setups.',
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
                hint: 'I\'ve heard of a Disk that only appears after a Disk has failed, but is blocked by Entertainment Disks.',
                unlockReq: () => App.game.farming.highestUnlockedBerry() >= BerryType.Broadcasting,
            }));

        // Battery
        this.mutations.push(new BlankMutation(0, BerryType.Battery,
            {
                hint: 'I\'ve heard of a Disk that only appears after a Dot Digimon wanders near open trays.',
                unlockReq: () => App.game.farming.highestUnlockedBerry() >= BerryType.Broadcasting,
            }));

        //#endregion

        //#endregion

    }

    getGrowthMultiplier(): number {
        let multiplier = 1;
        multiplier *= App.game.oakItems.calculateBonus(OakItemType.Megabyte) * FluteEffectRunner.getFluteMultiplier(GameConstants.FluteItemType.H_Wood_Spirit);
        return multiplier;
    }

    getReplantMultiplier(): number {
        let multiplier = 1;
        multiplier *= App.game.oakItems.calculateBonus(OakItemType.Megabyte) * FluteEffectRunner.getFluteMultiplier(GameConstants.FluteItemType.H_Wood_Spirit);
        return multiplier;
    }

    getMutationMultiplier(): number {
        let multiplier = 1;
        multiplier *= App.game.oakItems.calculateBonus(OakItemType.Demo_Disk);
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

        App.game.oakItems.use(OakItemType.Megabyte, this.berryData[plot.berry].exp);
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
                message: `You got a ${BerryType[berry]} disk!`,
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
