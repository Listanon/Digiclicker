enum BaitType {
    Bait = 0,
}


class Bait {

    constructor(
        public type: BaitType,
        public name: string,
        public useName: string,
        public image: string,
        public amount: () => string | number,
        public use: (pokemon: SafariPokemon) => void
    ) { }


    get btnName(): string {
        return `${this.name} (${this.amount()})`;
    }

}

const BaitList: { [name: string]: Bait } = {};

BaitList['Bait'] = new Bait(BaitType.Bait, 'Bait', 'some bait', 'assets/images/safari/bait.png',
    () => '∞',
    (pokemon: SafariPokemon) => {
        pokemon.eatingBait = BaitType.Bait;
        pokemon.eating = Math.max(pokemon.eating, Rand.intBetween(2, 6));
        pokemon.angry = 0;

    });
