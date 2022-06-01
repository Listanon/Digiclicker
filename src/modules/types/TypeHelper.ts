import PokemonType from '../enums/PokemonType';
import { TypeEffectiveness, TypeEffectivenessValue, GEM_UPGRADE_STEP } from '../GameConstants';

export default class TypeHelper {
    public static readonly typeColors = [
        '4a6b84', // Free
        'b54a4a', // Vaccine
        '8cb521', // Data
        'ce6363', // Virus
        '4a944a', // Plant
        'b10818', // Fire   
        '294a94', // Water
        '946b4a', // Earth
        '218cb5', // Wind
        'b57b31', // Electric
        'd694ce', // Light
        '8c424a', // Dark
        '737373', // Neutral        
        '605a72', // Ghost
        '595c3b', // Normal
        '42a59c', // Ice
        '7b42c6', // Poison
        'a58c4a', // Rock
    ];

    public static readonly typeColorsLocked = [
        'bcccdc', // Free
        'f1bba7', // Vaccine
        'dbf99f', // Data
        'ffb5ad', // Virus
        'aff1a7', // Plant
        'fb9d9d', // Fire
        '99b6ff', // Water
        'e3d1b5', // Earth
        '99dfff', // Wind
        'ffda99', // Electric
        'ffc6e7', // Light
        'e7b1b1', // Dark
        'cccccc', // Neutral
        'c8c3d5', // Ghost
        'd3d4c4', // Normal
        'b5efef', // Ice
        'e7ccff', // Poison
        'e3d1b5', // Rock    
    ];

    public static typeMatrix: Array<Array<number>> = (() => {
        const imm = TypeEffectivenessValue.Immune;
        const not = TypeEffectivenessValue.NotVery;
        const nrm = TypeEffectivenessValue.Normal;
        const vry = TypeEffectivenessValue.Very;
        return [
            //                                               E
            //       V                                       L              N
            //       A                                       E              E         N         P
            //       C         V    P         W    E         C    L         U    G    O         O       <- Defending type
            //  F    C    D    I    L    F    A    A    W    T    I    D    T    H    R         I    R
            //  R    I    A    R    A    I    T    R    I    R    G    A    R    O    M    I    S    O   Attack type
            //  E    N    T    U    N    R    E    T    N    I    H    R    A    S    A    C    O    C        |
            //  E    E    A    S    T    E    R    H    D    C    T    K    L    T    L    E    N    K        v
            [vry, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm], // FREE
            [nrm, not, nrm, vry, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm], // VACCINE
            [nrm, vry, not, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm], // DATA
            [nrm, nrm, vry, not, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm], // VIRUS
            [nrm, nrm, nrm, nrm, not, nrm, vry, vry, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm], // PLANT
            [nrm, nrm, nrm, nrm, vry, not, nrm, nrm, nrm, nrm, nrm, vry, nrm, nrm, nrm, nrm, nrm, nrm], // FIRE
            [nrm, nrm, nrm, nrm, nrm, vry, not, nrm, vry, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm], // WATER
            [nrm, nrm, nrm, nrm, nrm, vry, nrm, not, nrm, vry, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm], // EARTH
            [nrm, nrm, nrm, nrm, vry, nrm, nrm, vry, not, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm], // WIND
            [nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, vry, not, vry, nrm, nrm, nrm, nrm, nrm, nrm, nrm], // ELECTRIC
            [nrm, nrm, nrm, nrm, nrm, nrm, vry, nrm, nrm, nrm, not, vry, nrm, nrm, nrm, nrm, nrm, nrm], // LIGHT
            [nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, vry, vry, not, nrm, nrm, nrm, nrm, nrm, nrm], // DARK
            [nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, not, nrm, nrm, nrm, nrm, nrm], // NEUTRAL
            [nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, not, nrm, nrm, nrm, nrm], // GHOST
            [nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, not, nrm, nrm, nrm], // NORMAL
            [nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, not, nrm, nrm], // ICE
            [nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, not, nrm], // POISON
            [nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, not], // ROCK
        ];
    })();

    public static getAttackModifier(a1: PokemonType, a2: PokemonType, d1: PokemonType, d2: PokemonType): number {
        if (a1 === PokemonType.None || d1 === PokemonType.None) {
            return 1;
        }

        // Apply second type as the first type when None
        // eslint-disable-next-line no-param-reassign
        a2 = a2 !== PokemonType.None ? a2 : a1;
        // eslint-disable-next-line no-param-reassign
        d2 = d2 !== PokemonType.None ? d2 : d1;

        let m1 = TypeHelper.typeMatrix[a1][d1];
        let m2 = TypeHelper.typeMatrix[a1][d2];
        let m3 = TypeHelper.typeMatrix[a2][d1];
        let m4 = TypeHelper.typeMatrix[a2][d2];

        if (!App.game.challenges.list.disableGems.active()) {
            m1 += (App.game.gems.getGemUpgrade(a1, this.valueToType(m1)) * GEM_UPGRADE_STEP);
            m2 += (App.game.gems.getGemUpgrade(a1, this.valueToType(m2)) * GEM_UPGRADE_STEP);
            m3 += (App.game.gems.getGemUpgrade(a2, this.valueToType(m3)) * GEM_UPGRADE_STEP);
            m4 += (App.game.gems.getGemUpgrade(a2, this.valueToType(m4)) * GEM_UPGRADE_STEP);
        }

        return Math.max(m1 * m2, m3 * m4);
    }

    public static typeToValue(type: TypeEffectiveness): TypeEffectivenessValue {
        return TypeEffectivenessValue[TypeEffectivenessValue[type]];
    }

    public static valueToType(value: TypeEffectivenessValue): TypeEffectiveness {
        switch (value) {
            case TypeEffectivenessValue.Immune:
                return TypeEffectiveness.Immune;
            case TypeEffectivenessValue.NotVery:
                return TypeEffectiveness.NotVery;
            case TypeEffectivenessValue.Very:
                return TypeEffectiveness.Very;
            case TypeEffectivenessValue.Normal:
            default:
                return TypeEffectiveness.Normal;
        }
    }
}
