///<reference path="../../declarations/requirements/MaxRegionRequirement.d.ts"/>
///<reference path="StoneUnlockedRequirement.ts"/>

class UndergroundItem {
    public space: Array<Array<any>>;

    public static list: Array<UndergroundItem> = [];

    constructor(
        public name: string,
        public id: number,
        space: Array<Array<number>>,
        public value = 1,
        public valueType = 'Diamond',
        public requirement?: Requirement
    ) {
        this.space = space.map((r, y) => r.map((v, x) => ({
            sizeX: r.length,
            sizeY: space.length,
            x,
            y,
            value: v ? this.id : 0,
            rotations: 0,
        })));
    }

    public static addItem(
        name: string,
        id: number,
        space: Array<Array<number>>,
        value = 1,
        valueType = 'Diamond',
        requirement?: Requirement
    ) {
        UndergroundItem.list.push(new UndergroundItem(name, id, space, value, valueType, requirement));
    }

    // Returns a random unlocked item
    public static getRandomItem(): UndergroundItem {
        const unlockedItems = UndergroundItem.list.filter(i => i.isUnlocked());
        return Rand.fromArray(unlockedItems) || UndergroundItem.list[0];
    }

    public static getFullResourceName(valuetype: string, amt: number): string {
        if (valuetype != 'Diamond' && amt >= 50) {
            valuetype += ' gem';
        }
        if (amt > 1) {
            valuetype += 's';
        }
        return GameConstants.humanifyString(valuetype);
    }

    public isUnlocked(): boolean {
        return this.requirement ? this.requirement.isCompleted() : true;
    }

    public isStone(): boolean {
        return ItemList[this.valueType] instanceof EvolutionStone;
    }

    get displayName() {
        return this.name;
    }

    get image() {
        // Have to add extra logic here since images are all over the place in location and naming standards
        // Maybe one day we refactor the item system to be cleaner
        if (this.isStone()) {
            const evostone: EvolutionStone = (ItemList[this.valueType] as EvolutionStone);
            return evostone.image;
        } else if (this.valueType == 'Mine Egg') {
            return `assets/images/breeding/${this.name}.png`;
        } else {
            return `assets/images/items/underground/${this.name}.png`;
        }
    }

    get undergroundImage() {
        return `assets/images/underground/${this.name}.png`;
    }

}

// Diamond Items
UndergroundItem.addItem('Rare Bone',    1, [[1,0,0,0,0,1], [1,1,1,1,1,1], [1,0,0,0,0,1]], 3);
UndergroundItem.addItem('Evil Mark',   2, [[0,1,0], [1,1,1], [0,1,0]], 5);
UndergroundItem.addItem('Revive',       3, [[0,1,0], [1,1,1], [0,1,0]], 2);
UndergroundItem.addItem('Broken Digivice',   4, [[1,1,1], [1,1,1], [1,1,1]], 4);
UndergroundItem.addItem('Black Gear',    5, [[1,1,1], [1,1,1], [1,1,1]], 2);
UndergroundItem.addItem('Digicores',  6, [[1,1], [1,0]], 10);
UndergroundItem.addItem('Holy Ring', 8, [[1,1,1], [1,1,1], 6);
UndergroundItem.addItem('XAntibody',   9, [[1,1],[1,1]], 4);
UndergroundItem.addItem('Empty Tag',    11, [[1,1,1,1], [1,1,1,1]], 3);
UndergroundItem.addItem('Dreamy Digizoid',  12, [[0,0,1,0], [1,1,1,0], [0,1,1,1], [0,1,0,0]], 2);
UndergroundItem.addItem('Rush Digizoid',  12, [[0,1,0,0], [0,1,1,1], [1,1,1,0], [0,0,1,0]], 2);
UndergroundItem.addItem('Vigor Digizoid',    13, [[1,0,1,0], [1,1,1,1], [1,1,1,1]], 2);
UndergroundItem.addItem('Sage Digizoid',    13, [[0,1,0,1], [1,1,1,1], [1,1,1,1]], 2);
UndergroundItem.addItem('Guard Digizoid',     14, [[0,1,1,0], [1,1,1,1], [1,1,1,1], [1,0,0,1]], 2);
UndergroundItem.addItem('Rage Digizoid',     14, [[0,1,1,0], [1,1,1,1], [1,1,1,1], [1,0,0,1]], 2);
UndergroundItem.addItem('Gold Digizoid',    15, [[1,1,1], [1,1,1], [1,0,1]], 2);

// Gem Plates
UndergroundItem.addItem('Nightmare Plate',  100, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], 100, 'dark');
UndergroundItem.addItem('Release Plate',  101, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], 100, 'free');
UndergroundItem.addItem('Nature Plate',  102, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], 100, 'earth');
UndergroundItem.addItem('Cure Plate',   103, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], 100, 'vaccine');
UndergroundItem.addItem('Roar Plate',  104, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], 100, 'fire');
UndergroundItem.addItem('Code Plate', 106, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], 100, 'data');
UndergroundItem.addItem('Simple Plate',   107, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], 100, 'neutral');
UndergroundItem.addItem('Jungle Plate', 108, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], 100, 'plant');
UndergroundItem.addItem('Trojan Plate',   109, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], 100, 'virus');
UndergroundItem.addItem('Guardian Plate',    110, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], 100, 'wind');
UndergroundItem.addItem('Deep Plate', 111, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], 100, 'water');
UndergroundItem.addItem('Empire Plate',    115, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], 100, 'electric');
UndergroundItem.addItem('Buster Plate',  116, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], 100, 'light');

// Fossils
UndergroundItem.addItem('Hikari Fossil', 200, [[0,1,1,1], [1,1,1,1], [1,1,1,1], [1,1,1,0]], 0, 'Mine Egg', new MaxRegionRequirement(GameConstants.Region.hoenn));
UndergroundItem.addItem('Yami Fossil',  201, [[1,1,1,1,1], [1,1,1,1,1], [1,1,1,1,1], [0,1,1,1,0]], 0, 'Mine Egg', new MaxRegionRequirement(GameConstants.Region.sinnoh));
UndergroundItem.addItem('Tsuchi Fossil',  203, [[0,1,1,1], [0,1,1,1], [1,0,1,1], [1,1,1,1], [0,1,1,1]], 0, 'Mine Egg', new MaxRegionRequirement(GameConstants.Region.hoenn));
UndergroundItem.addItem('Hono Fossil',  204, [[1,1,1,0,0], [1,1,1,1,0], [0,1,1,1,1], [0,0,1,1,1]], 0, 'Mine Egg', new MaxRegionRequirement(GameConstants.Region.hoenn));
UndergroundItem.addItem('Mizu Fossil', 205, [[0,1,1,1,0], [1,1,1,1,0], [0,1,1,1,1], [0,1,1,1,0]], 0, 'Mine Egg', new MaxRegionRequirement(GameConstants.Region.sinnoh));
UndergroundItem.addItem('Kaze Fossil', 206, [[1,1,1,1], [1,1,1,1], [1,1,1,1], [0,1,1,0]], 0, 'Mine Egg', new MaxRegionRequirement(GameConstants.Region.sinnoh));
UndergroundItem.addItem('Hagane Fossil', 207, [[1,1,1,1,0], [1,1,1,1,1], [1,1,1,1,1], [1,1,1,1,1], [0,1,1,1,1]], 0, 'Mine Egg', new MaxRegionRequirement(GameConstants.Region.unova));
UndergroundItem.addItem('Kori Fossil', 208, [[0,0,1,1,1], [0,1,1,1,1], [1,1,1,1,0], [1,1,1,1,0], [1,1,1,0,0]], 0, 'Mine Egg', new MaxRegionRequirement(GameConstants.Region.unova));
UndergroundItem.addItem('Ikazuchi Fossil',   209, [[0,0,1,1,1], [0,1,1,1,1], [1,1,1,1,1], [1,1,1,1,0]], 0, 'Mine Egg', new MaxRegionRequirement(GameConstants.Region.kalos));
UndergroundItem.addItem('Ki Fossil',  210, [[1,1,1,0,0], [1,1,1,1,1], [0,1,1,1,1], [0,1,1,1,0]], 0, 'Mine Egg', new MaxRegionRequirement(GameConstants.Region.kalos));

// Evolution Stones
UndergroundItem.addItem('Courage Digimental',    300, [[0,1,1], [1,1,1], [1,1,1], [1,1,1]], 1, GameConstants.StoneType[GameConstants.StoneType.Courage_Digimental]);
UndergroundItem.addItem('Sincerity Digimental',   301, [[0,1,1], [1,1,1], [1,1,1], [1,1,1]], 1, GameConstants.StoneType[GameConstants.StoneType.Sincerity_Digimental]);
UndergroundItem.addItem('Knowledge Digimental', 302, [[1,1,1], [1,1,1], [1,1,1], [1,1,1]], 1, GameConstants.StoneType[GameConstants.StoneType.Knowledge_Digimental]);
UndergroundItem.addItem('Purity Digimental',    303, [[0,1,1,1,0], [0,1,1,1,0], [0,1,1,1,0], [1,1,1,1,1], [0,0,0,1]], 1, GameConstants.StoneType[GameConstants.StoneType.Purity_Digimental]);
UndergroundItem.addItem('Hope Digimental',    304, [[1,1,1], [1,1,1], [1,1,1], [1,1,1]], 1, GameConstants.StoneType[GameConstants.StoneType.Hope_Digimental]);
UndergroundItem.addItem('Love Digimental',     305, [[1,1,1,1], [1,1,1,1], [1,1,1,1], [1,1,1,1], [1,1,1,1]], 1, GameConstants.StoneType[GameConstants.StoneType.Love_Digimental]);
UndergroundItem.addItem('Friendship Digimental',     306, [[0,0,1,1], [1,1,1,1], [1,1,1,1], [1,1,1,0]], 1, GameConstants.StoneType[GameConstants.StoneType.Friendship_Digimental]);
UndergroundItem.addItem('Light Digimental',    307, [[0,1,0], [1,1,1], [1,1,1], [1,1,1]], 1, GameConstants.StoneType[GameConstants.StoneType.Light_Digimental]);
UndergroundItem.addItem('Fate Digimental',    308, [[0,1,1], [1,1,1], [1,1,0], [1,1,0]], 1, GameConstants.StoneType[GameConstants.StoneType.Fate_Digimental]);
UndergroundItem.addItem('Miracles Digimental',   309, [[0,1,0], [1,1,1], [1,1,1], [1,1,1]], 1, GameConstants.StoneType[GameConstants.StoneType.Miracles_Digimental]);
UndergroundItem.addItem('Kindness Digimental',   310, [[0,1,1,1,0], [0,1,1,1,0], [0,1,1,1,0], [1,1,1,1,1], [0,0,0,1]], 1, GameConstants.StoneType[GameConstants.StoneType.Kindness_Digimental]);
