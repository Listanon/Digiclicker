export type LogBookType = {
    display: string;
    label: string;
};

export const LogBookTypes: Record<string, LogBookType> = {
    NEW: {
        display: 'primary',
        label: 'NEW',
    },
    SHINY: {
        display: 'warning',
        label: 'DOT',
    },
    CAUGHT: {
        display: 'success',
        label: 'SCANNED',
    },
    ESCAPED: {
        display: 'danger',
        label: 'ESCAPED',
    },
    FOUND: {
        display: 'primary',
        label: 'FOUND',
    },
    ACHIEVE: {
        display: 'warning',
        label: 'ACHIEVE',
    },
    QUEST: {
        display: 'info',
        label: 'QUEST',
    },
    WANDER: {
        display: 'primary',
        label: 'WANDER',
    },
    OTHER: {
        display: 'dark',
        label: 'OTHER',
    },
};
