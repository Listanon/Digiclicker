import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class TokenRequirement extends AchievementRequirement {
    constructor(value: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType.Token);
    }

    public getProgress() {
        return Math.min(App.game.statistics.totalExploreCoins(), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} Scan Coins need to be obtained.`;
    }
}
