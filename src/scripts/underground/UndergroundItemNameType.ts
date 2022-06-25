/*
To update this type when adding new items:

Open the game, and run the following code in the browser console

copy(`type ItemNameType
    = ${[...new Set(Object.values(ItemList).map(i => i.name))].map(i => `'${i.replace(/'/g, "\\'")}'`).join('\n    | ')};`);

Replace the everything in this file (except for this comment) with what was copied
*/

type UndergroundItemNameType
    = 'Rare Bone'
    | 'Star Piece'
    | 'Revive'
    | 'Max Revive'
    | 'Iron Ball'
    | 'Heart Scale'
    | 'Light Clay'
    | 'Odd Keystone'
    | 'Hard Stone'
    | 'Oval Stone'
    | 'Everstone'
    | 'Smooth Rock'
    | 'Heat Rock'
    | 'Icy Rock'
    | 'Damp Rock'
    | 'Nightmare Plate'
    | 'Release Plate'
    | 'Nature Plate'
    | 'Cure Plate'
    | 'Roar Plate'
    | 'Code Plate'
    | 'Simple Plate'
    | 'Jungle Plate'
    | 'Trojan Plate'
    | 'Guardian Plate'
    | 'Deep Plate'
    | 'Empire Plate'
    | 'Buster Plate'
    | 'Helix Fossil'
    | 'Dome Fossil'
    | 'Old Amber'
    | 'Root Fossil'
    | 'Claw Fossil'
    | 'Armor Fossil'
    | 'Skull Fossil'
    | 'Cover Fossil'
    | 'Plume Fossil'
    | 'Jaw Fossil'
    | 'Sail Fossil'
    | 'Fire Stone'
    | 'Water Stone'
    | 'Thunder Stone'
    | 'Leaf Stone'
    | 'Moon Stone'
    | 'Ice Stone'
    | 'Dusk Stone'
    | 'Dawn Stone'
    | 'Shiny Stone'
    | 'Trade Stone'
    | 'Sun Stone';
