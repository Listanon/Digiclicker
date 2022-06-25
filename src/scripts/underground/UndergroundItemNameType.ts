/*
To update this type when adding new items:

Open the game, and run the following code in the browser console

copy(`type ItemNameType
    = ${[...new Set(Object.values(ItemList).map(i => i.name))].map(i => `'${i.replace(/'/g, "\\'")}'`).join('\n    | ')};`);

Replace the everything in this file (except for this comment) with what was copied
*/

type UndergroundItemNameType
    = 'Black Digitron'
    | 'Evil Mark'
    | 'Guilmon Bread'
    | 'Broken Digivice'
    | 'Black Gear'
    | 'Digicores'
    | 'Holy Ring'
    | 'XAntibody'
    | 'Empty Tag'
    | 'Dreamy Digizoid'
    | 'Rush Digizoid'
    | 'Vigor Digizoid'
    | 'Sage Digizoid'
    | 'Guard Digizoid'
    | 'Rage Digizoid'
    | 'Gold Digizoid'
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
    | 'Hikari Fossil'
    | 'Yami Fossil'
    | 'Tsuchi Fossil'
    | 'Hono Fossil'
    | 'Mizu Fossil'
    | 'Kaze Fossil'
    | 'Hagane Fossil'
    | 'Kori Fossil'
    | 'Ikazuchi Fossil'
    | 'Ki Fossil'
    | 'Courage_Digimental'
    | 'Sincerity_Digimental'
    | 'Knowledge_Digimental'
    | 'Purity_Digimental'
    | 'Hope_Digimental'
    | 'Love_Digimental'
    | 'Friendship_Digimental'
    | 'Light_Digimental'
    | 'Fate_Digimental'
    | 'Miracles_Digimental'
    | 'Kindness_Digimental';
