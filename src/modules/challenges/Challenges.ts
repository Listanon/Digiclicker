import { Saveable } from '../DataStore/common/Saveable';
import Challenge from './Challenge';

export default class Challenges implements Saveable {
    saveKey = 'challenges';

    defaults: Record<string, any> = {};

    list: Record<string, Challenge> = {
        regionalAttackDebuff: new Challenge('Regional Attack Debuff (recommended)', 'Lowers Digimon attack based on native map and highest reached map', true),
        requireCompletePokedex: new Challenge('Require Complete Digidex', 'Requires a complete regional digidex before moving on to the next map', true),
        disableClickAttack: new Challenge('No Click Attack', 'Disables the ability to use Click Attacks'),
        disableBattleItems: new Challenge('No Battle Item', 'Disables the usage of Battle Items'),
        disableMasterballs: new Challenge('No Masterscan', 'Disables the usage of Masterscans'),
        disableOakItems: new Challenge('No Hina Item', 'Disables the usage of all Hina Items'),
        disableGems: new Challenge('No Chip', 'Disables the usage of Chips for increasing damage multipliers'),
        disableProteins: new Challenge('No Protein', 'Disables the usage of Proteins'),
    };

    fromJSON(json): void {
        if (!json || !json.list) {
            return;
        }

        Object.entries(json.list).forEach(([challenge, value]) => {
            this.list[challenge]?.active(!!value);
        });
    }

    toJSON(): Record<string, any> {
        const list = {};
        Object.entries(this.list).forEach(([c, v]) => {
            list[c] = v.active();
        });
        return {
            list,
        };
    }
}
