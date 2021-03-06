import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class DefeatedRequirement extends AchievementRequirement {
    constructor(value: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType.Defeated);
    }

    public getProgress() {
        return Math.min(App.game.statistics.totalDigimonDefeated(), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} Digimon need to be defeated.`;
    }
}
