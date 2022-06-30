import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class CapturedRequirement extends AchievementRequirement {
    constructor(value: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType.Captured);
    }

    public getProgress() {
        return Math.min(App.game.statistics.totalDigimonScanned(), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} Digimon need to be captured.`;
    }
}
