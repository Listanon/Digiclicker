/*
To update this type when adding new pokemon:

Change the type of `PokemonListData -> name` to `string` and add your new pokemon

Open the game, and run the following code in the browser console
copy(`export type PokemonNameType
    = ${pokemonList.map(p => `'${p.name.replace(/'/g, "\\'")}'`).join('\n    | ')};`);

Replace the everything in this file (except for this comment) with what was copied

Change the type of `PokemonListData -> name` back to `PokemonNameType`
*/

export type PokemonNameType
    = 'Ohakadamon'
    | 'Botamon'
    | 'Punimon'
    | 'Koromon'
    | 'Tunomon'
    | 'Agumon'
    | 'Betamon'
    | 'Damemon Cmon'
    | 'Elecmon'
    | 'Gabumon'
    | 'Airdramon'
    | 'Angemon'
    | 'Birdramon'
    | 'Devimon'
    | 'Garurumon'
    | 'Greymon'
    | 'Kabuterimon'
    | 'Meramon'
    | 'Numemon'
    | 'Seadramon'
    | 'Tyranomon'
    | 'Vegimon'
    | 'Whamon'
    | 'Yukidarumon'
    | 'Mamemon'
    | 'Metal Greymon Virus'
    | 'Metal Mamemon'
    | 'Monzaemon'
    | 'Skull Greymon'
    | 'Vademon'
    | 'Deathmon Cmon'
    | 'Bubbmon'
    | 'Pitchmon'
    | 'Poyomon'
    | 'Yuramon'
    | 'Zurumon'
    | 'Mochimon'
    | 'Pagumon'
    | 'Pukamon'
    | 'Tanemon'
    | 'Tokomon'
    | 'Ganimon'
    | 'Gazimon'
    | 'Gizamon'
    | 'Gomamon'
    | 'Gottsumon'
    | 'Kunemon'
    | 'Otamamon'
    | 'Palmon'
    | 'Patamon'
    | 'Piyomon'
    | 'Shakomon'
    | 'Tentomon'
    | 'Tyumon'
    | 'Bakemon'
    | 'Centalmon'
    | 'Cockatrimon'
    | 'Coelamon'
    | 'Cyclomon'
    | 'Dark Tyranomon'
    | 'Deltamon'
    | 'Devidramon'
    | 'Drimogemon'
    | 'Ebidramon'
    | 'Evilmon'
    | 'Flymon'
    | 'Gekomon'
    | 'Gesomon'
    | 'Gokimon'
    | 'Gorimon'
    | 'Ikkakumon'
    | 'Kuwagamon'
    | 'Leomon'
    | 'Mechanorimon'
    | 'Minotaurmon'
    | 'Mojyamon'
    | 'Monochromon'
    | 'Nanimon'
    | 'Octmon'
    | 'Orgemon'
    | 'Raremon'
    | 'Rukamon'
    | 'Scumon'
    | 'Shellmon'
    | 'Starmon'
    | 'Tailmon'
    | 'Tortamon'
    | 'Tuskmon'
    | 'Unimon'
    | 'V-dramon'
    | 'Andromon'
    | 'Angewomon'
    | 'Anomalocarimon'
    | 'Atlur Kabuterimon Blue'
    | 'Dagomon'
    | 'Digitamamon'
    | 'Etemon'
    | 'Ex-Tyranomon'
    | 'Giromon'
    | 'Holy Angemon'
    | 'Jyagamon'
    | 'Lady Devimon'
    | 'Mammon'
    | 'Marin Devimon'
    | 'Mega Seadramon'
    | 'Megadramon'
    | 'Metal Tyranomon'
    | 'Nanomon'
    | 'Ookuwamon'
    | 'Piccolomon'
    | 'Tonosama Gekomon'
    | 'Triceramon'
    | 'Whamon Perfect'
    | 'Zudomon'
    | 'Herakle Kabuterimon'
    | 'Holydramon'
    | 'Marin Angemon'
    | 'Metal Etemon'
    | 'Metal Seadramon'
    | 'Pukumon'
    | 'Saber Leomon'
    | 'Holy Angemon Priest Mode'
    | 'Choromon'
    | 'Mokumon'
    | 'Nyokimon'
    | 'Yukimi Botamon'
    | 'Caprimon'
    | 'Nyaromon'
    | 'Peti Meramon'
    | 'Pyocomon'
    | 'Alraumon'
    | 'Bakumon'
    | 'Candmon'
    | 'Clear Agumon'
    | 'Dokunemon'
    | 'Floramon'
    | 'Goburimon'
    | 'Hagurumon'
    | 'Kokuwamon'
    | 'Modoki Betamon'
    | 'Muchomon'
    | 'Mushmon'
    | 'Penmon'
    | 'Pico Devimon'
    | 'Plotmon'
    | 'Psychemon'
    | 'Shamamon'
    | 'Snow Goburimon'
    | 'Toy Agumon'
    | 'Tukaimon'
    | 'Yuki Agumon'
    | 'Akatorimon'
    | 'Clockmon'
    | 'Dark Lizamon'
    | 'Dokugumon'
    | 'Flare Lizarmon'
    | 'Fugamon'
    | 'Geremon'
    | 'Golemon'
    | 'Golemon PS'
    | 'Guardromon'
    | 'Gururumon'
    | 'Hanumon'
    | 'Hyougamon'
    | 'Ice Devimon'
    | 'Icemon'
    | 'Igamon'
    | 'Jungle Mojyamon'
    | 'Karatuki Numemon'
    | 'Kiwimon'
    | 'Mori Shellmon'
    | 'Musyamon'
    | 'Nise Drimogemon'
    | 'Pidmon'
    | 'Platinum Scumon'
    | 'Red Vegimon'
    | 'Revolmon'
    | 'Saberdramon'
    | 'Sand Yanmamon'
    | 'Shima Unimon'
    | 'Snimon'
    | 'Soulmon'
    | 'Tankmon'
    | 'Thunderballmon'
    | 'Togemon'
    | 'Tuchidarumon'
    | 'Wizarmon'
    | 'Woodmon'
    | 'Yanmamon'
    | 'Zassoumon'
    | 'Aero V-dramon'
    | 'Asuramon'
    | 'Atlur Kabuterimon Red'
    | 'Big Mamemon'
    | 'Blikmon'
    | 'Blossomon'
    | 'Blue Meramon'
    | 'Brachimon'
    | 'Chimairamon'
    | 'Death Meramon'
    | 'Delumon'
    | 'Fantomon'
    | 'Garudamon'
    | 'Gerbemon'
    | 'Gigadramon'
    | 'Great King Scumon'
    | 'Hangyomon'
    | 'Insekimon'
    | 'Jijimon'
    | 'Jyureimon'
    | 'Knightmon'
    | 'Lilimon'
    | 'Master Tyranomon'
    | 'Metal Greymon'
    | 'Panjyamon'
    | 'Parrotmon'
    | 'Pumpmon'
    | 'Skull Satamon'
    | 'Tekkamon'
    | 'Vamdemon'
    | 'Vermillimon'
    | 'Waru Monzaemon'
    | 'Waru Seadramon'
    | 'Were Garurumon'
    | 'Apocalymon'
    | 'Babamon'
    | 'Boltmon'
    | 'Demon'
    | 'Diablomon'
    | 'Goddramon'
    | 'Griffomon'
    | 'Hououmon'
    | 'King Etemon'
    | 'Metal Garurumon'
    | 'Millenniumon'
    | 'Mugendramon'
    | 'Omegamon'
    | 'Piemon'
    | 'Pinochimon'
    | 'Plesiomon'
    | 'Rosemon'
    | 'Skull Mammon'
    | 'Venom Vamdemon'
    | 'War Greymon'
    | 'Chicomon'
    | 'Cocomon'
    | 'Kuramon'
    | 'Leafmon'
    | 'Pururumon'
    | 'Tsubumon'
    | 'Zerimon'
    | 'Arkadimon Baby'
    | 'Chibimon'
    | 'Chocomon'
    | 'Gummymon'
    | 'Minomon'
    | 'Poromon'
    | 'Tsumemon'
    | 'Upamon'
    | 'Agumon Black'
    | 'Armadimon'
    | 'Elecmon Violet'
    | 'Gabumon Black'
    | 'Hawkmon'
    | 'Keramon'
    | 'Lopmon'
    | 'Otamamon Red'
    | 'Solarmon'
    | 'Terriermon'
    | 'Toy Agumon Black'
    | 'V-mon'
    | 'Wormmon'
    | 'Ankylomon'
    | 'Aquilamon'
    | 'Black Tailmon'
    | 'Bomber Nanimon'
    | 'Chrysalimon'
    | 'Galgomon'
    | 'Garurumon Black'
    | 'Greymon Blue'
    | 'Red V-dramon'
    | 'Sorcerimon'
    | 'Stingmon'
    | 'Wendimon'
    | 'XV-mon'
    | 'Andiramon'
    | 'Archnemon'
    | 'Cyberdramon'
    | 'Dinobeemon'
    | 'Infermon'
    | 'Mummymon'
    | 'Paildramon'
    | 'Shakkoumon'
    | 'Silphymon'
    | 'Superstarmon'
    | 'Volcamon'
    | 'Were Garurumon Black'
    | 'Baihumon'
    | 'Belial Vamdemon'
    | 'Black War Greymon'
    | 'Chaos Greymon'
    | 'Chaos Lord'
    | 'Chaos Piemon'
    | 'Chaos Seadramon'
    | 'Cherubimon Vice'
    | 'Cherubimon Virtue'
    | 'Crossmon'
    | 'Deathmon'
    | 'Deathmon Black'
    | 'Devitamamon'
    | 'Ebemon'
    | 'Gran Kuwagamon'
    | 'Hi Andromon'
    | 'Imperialdramon Dragon Mode'
    | 'Imperialdramon Dragon Mode Black'
    | 'Imperialdramon Fighter Mode'
    | 'Lampmon'
    | 'Metal Garurumon Black'
    | 'Moon Millenniumon'
    | 'Pharaohmon'
    | 'Prince Mamemon'
    | 'Qinglongmon'
    | 'Seraphimon'
    | 'Valkyrimon'
    | 'Vikemon'
    | 'Xuanwumon'
    | 'Zanbamon'
    | 'Zhuqiaomon'
    | 'Allomon'
    | 'Archelomon'
    | 'Baromon'
    | 'Bitmon'
    | 'Boarmon'
    | 'Bullmon'
    | 'Butterflamon'
    | 'Chamelemon'
    | 'Coatlmon'
    | 'Depthmon'
    | 'Digmon'
    | 'Elephamon'
    | 'Fladramon'
    | 'Flybeemon'
    | 'Frogmon'
    | 'Gargomon'
    | 'Goatmon'
    | 'Gold V-dramon'
    | 'Harpymon'
    | 'Holsmon'
    | 'Honeybeemon'
    | 'Kabukimon'
    | 'Kangarumon'
    | 'Kongoumon'
    | 'Lighdramon'
    | 'Lynxmon'
    | 'Magnamon'
    | 'Maildramon'
    | 'Manbomon'
    | 'Mantaraymon'
    | 'Moosemon'
    | 'Mothmon'
    | 'Nefertimon'
    | 'Nohemon'
    | 'Opossummon'
    | 'Orcamon'
    | 'Owlmon'
    | 'Peacockmon'
    | 'Pegasmon'
    | 'Pipismon'
    | 'Ponchomon'
    | 'Prairiemon'
    | 'Pteranomon'
    | 'Pucchiemon'
    | 'Pucchiemon Green'
    | 'Rapidmon Armor'
    | 'Rhinomon'
    | 'Rinkmon'
    | 'Sagittarimon'
    | 'Seahomon'
    | 'Searchmon'
    | 'Sepikmon'
    | 'Sethmon'
    | 'Shadramon'
    | 'Sheepmon'
    | 'Shurimon'
    | 'Stegomon'
    | 'Submarimon'
    | 'Swanmon'
    | 'Tocanmon'
    | 'Togemogumon'
    | 'Tylomon'
    | 'Yaksamon'
    | 'Jyarimon'
    | 'Ketomon'
    | 'Paomon'
    | 'Pipimon'
    | 'Relemon'
    | 'Gigimon'
    | 'Hopmon'
    | 'Pokomon'
    | 'Xiaomon'
    | 'Arkadimon Child'
    | 'Guilmon'
    | 'Impmon'
    | 'Labramon'
    | 'Lucemon'
    | 'Monodramon'
    | 'Petit Mamon'
    | 'Renamon'
    | 'Arkadimon Adult'
    | 'Black Galgomon'
    | 'Black Growmon'
    | 'Dobermon'
    | 'Dogmon'
    | 'Growmon'
    | 'Growmon Orange'
    | 'Kyubimon'
    | 'Kyubimon Silver'
    | 'Siesamon'
    | 'Strikedramon'
    | 'Turuiemon'
    | 'V-dramon Black'
    | 'Youkomon'
    | 'Andiramon Deva'
    | 'Arkadimon Perfect'
    | 'Black Megalo Growmon'
    | 'Black Rapidmon'
    | 'Caturamon'
    | 'Cerberumon'
    | 'Doumon'
    | 'Grappu Leomon'
    | 'Indaramon'
    | 'Karatenmon'
    | 'Kumbhiramon'
    | 'Majiramon'
    | 'Makuramon'
    | 'Megalo Growmon'
    | 'Megalo Growmon Data'
    | 'Mephismon'
    | 'Mihiramon'
    | 'Orochimon'
    | 'Pajramon'
    | 'Pandamon'
    | 'Rapidmon Perfect'
    | 'Sandiramon'
    | 'Scorpiomon'
    | 'Sinduramon'
    | 'Taomon'
    | 'Taomon Silver'
    | 'Vajramon'
    | 'Vikaralamon'
    | 'Anubimon'
    | 'Arkadimon Ultimate'
    | 'Armagemon'
    | 'Beelzebumon'
    | 'Beelzebumon Blast Mode'
    | 'Black Saint Galgomon'
    | 'Chaos Dukemon'
    | 'Dukemon'
    | 'Dukemon Crimson Mode'
    | 'Gokumon'
    | 'Gulfmon'
    | 'Imperialdramon Fighter Mode Black'
    | 'Imperialdramon Paladin Mode'
    | 'Justimon Accel Arm'
    | 'Justimon Blitz Arm'
    | 'Justimon Critical Arm'
    | 'Kuzuhamon'
    | 'Megidramon'
    | 'Ofanimon'
    | 'Parallelmon'
    | 'Saint Galgomon'
    | 'Sakuyamon'
    | 'Sakuyamon Miko Mode'
    | 'Zeed Millenniumon'
    | 'Culumon'
    | 'Keemon'
    | 'Puttimon'
    | 'Cupimon'
    | 'Torikara Ballmon'
    | 'Yarmon'
    | 'Bearmon'
    | 'Bemmon'
    | 'Bokomon'
    | 'Burgamon'
    | 'Cardmon C1'
    | 'Ebi Burgamon'
    | 'Koemon'
    | 'Kotemon'
    | 'Neamon'
    | 'Blimpmon'
    | 'Boogiemon'
    | 'Burgamon Adult'
    | 'Darcmon'
    | 'Dinohumon'
    | 'Fangmon'
    | 'Gladimon'
    | 'Gryzmon'
    | 'Hookmon'
    | 'Kougamon'
    | 'Mikemon'
    | 'Snatchmon'
    | 'Trailmon Worm'
    | 'Witchmon'
    | 'XV-mon Black'
    | 'Assaultmon'
    | 'Bastemon'
    | 'Betsumon'
    | 'Black King Numemon'
    | 'Destromon'
    | 'Hippogriffomon'
    | 'Jewelbeemon'
    | 'Kyukimon'
    | 'Locomon'
    | 'Lucemon Falldown Mode'
    | 'Mermaimon'
    | 'Mistymon'
    | 'Neo Devimon'
    | 'Phelesmon'
    | 'Valvemon'
    | 'Wisemon'
    | 'Ancient Beatmon'
    | 'Ancient Garurumon'
    | 'Ancient Greymon'
    | 'Ancient Irismon'
    | 'Ancient Megatheriumon'
    | 'Ancient Mermaimon'
    | 'Ancient Sphinxmon'
    | 'Ancient Troiamon'
    | 'Ancient Volcamon'
    | 'Ancient Wisemon'
    | 'Black Seraphimon'
    | 'Callismon'
    | 'Cannondramon'
    | 'Chaosdramon'
    | 'Dominimon'
    | 'Dynasmon'
    | 'Fujinmon'
    | 'Grand Locomon'
    | 'Huanglongmon'
    | 'Lilithmon'
    | 'Lord Knightmon'
    | 'Lucemon Satan Mode'
    | 'Marsmon'
    | 'Metamormon'
    | 'Murmukusmon'
    | 'Ornismon'
    | 'Parasimon'
    | 'Pile Volcamon'
    | 'Ragnamon'
    | 'Raidenmon'
    | 'Raijinmon'
    | 'Regulumon'
    | 'Slash Angemon'
    | 'Suijinmon'
    | 'Susanoomon'
    | 'Ulforce V-dramon'
    | 'Fla Wizarmon'
    | 'Kenkimon'
    | 'Salamandamon'
    | 'Thunderbirmon'
    | 'Agnimon'
    | 'Aldamon'
    | 'Arbormon'
    | 'Beowolfmon'
    | 'Blitzmon'
    | 'Blizzarmon'
    | 'Bolgmon'
    | 'Calamaramon'
    | 'Chackmon'
    | 'Daipenmon'
    | 'Duskmon'
    | 'Fairimon'
    | 'Flamon'
    | 'Garummon'
    | 'Gigasmon'
    | 'Grottomon'
    | 'Jet Silphymon'
    | 'Kaiser Greymon'
    | 'Kaiser Leomon'
    | 'Löwemon'
    | 'Magna Garurumon'
    | 'Mercuremon'
    | 'Petaldramon'
    | 'Raihimon'
    | 'Ranamon'
    | 'Rhino Kabuterimon'
    | 'Sephirothmon'
    | 'Shutumon'
    | 'Strabimon'
    | 'Velgrmon'
    | 'Vritramon'
    | 'Wolfmon'
    | 'Būmon'
    | 'Dodomon'
    | 'Fufumon'
    | 'Pupumon'
    | 'Dorimon'
    | 'Kyokyomon'
    | 'Puroromon'
    | 'Agumon X-Antibody'
    | 'Betamon X-Antibody'
    | 'DORUmon'
    | 'Funbeemon'
    | 'Gabumon X-Antibody'
    | 'Ganimon X-Antibody'
    | 'Gazimon X-Antibody'
    | 'Gomamon X-Antibody'
    | 'Gottsumon X-Antibody'
    | 'Guilmon X-Antibody'
    | 'Kokuwamon X-Antibody'
    | 'Otamamon X-Antibody'
    | 'Palmon X-Antibody'
    | 'Plotmon X-Antibody'
    | 'Ryudamon'
    | 'Shakomon X-Antibody'
    | 'Allomon X-Antibody'
    | 'Death-X-DORUgamon'
    | 'Dobermon X-Antibody'
    | 'DORUgamon'
    | 'Garurumon X-Antibody'
    | 'Gesomon X-Antibody'
    | 'Ginryumon'
    | 'Greymon X-Antibody'
    | 'Growmon X-Antibody'
    | 'Kuwagamon X-Antibody'
    | 'Leomon X-Antibody'
    | 'Mantaraymon X-Antibody'
    | 'Monochromon X-Antibody'
    | 'Nefertimon X-Antibody'
    | 'Omekamon'
    | 'Pteranomon X-Antibody'
    | 'Raptordramon'
    | 'Rhinomon X-Antibody'
    | 'Seadramon X-Antibody'
    | 'Starmon X-Antibody'
    | 'Tailmon X-Antibody'
    | 'Tobucatmon'
    | 'Togemon X-Antibody'
    | 'Tylomon X-Antibody'
    | 'Waspmon'
    | 'Anomalocarimon X-Antibody'
    | 'Cannonbeemon'
    | 'Cerberumon X-Antibody'
    | 'Death-X-DORUguremon'
    | 'DORUguremon'
    | 'Garudamon X-Antibody'
    | 'Grademon'
    | 'Hisyaryumon'
    | 'Lilimon X-Antibody'
    | 'Mametyramon'
    | 'Mammon X-Antibody'
    | 'Mega Seadramon X-Antibody'
    | 'Megalo Growmon X-Antibody'
    | 'Metal Fantomon'
    | 'Metal Greymon X-Antibody'
    | 'Metal Tyranomon X-Antibody'
    | 'Ookuwamon X-Antibody'
    | 'Panjyamon X-Antibody'
    | 'Skull Baluchimon'
    | 'Triceramon X-Antibody'
    | 'Vademon X-Antibody'
    | 'Were Garurumon X-Antibody'
    | 'Alphamon'
    | 'Alphamon Ouryuken'
    | 'Arkadimon Super Ultimate'
    | 'Barbamon'
    | 'Death-X-DORUgoramon'
    | 'Death-X-mon'
    | 'Demon Super Ultimate'
    | 'Dinorexmon'
    | 'Dinotigermon'
    | 'DORUgoramon'
    | 'Dukemon X-Antibody'
    | 'Dynasmon X-Antibody'
    | 'Ebemon X-Antibody'
    | 'Gaioumon'
    | 'Giga Seadramon'
    | 'Goddramon X-Antibody'
    | 'Grandis Kuwagamon'
    | 'Holydramon X-Antibody'
    | 'Leviamon'
    | 'Lucemon Larva'
    | 'Magnamon X-Antibody'
    | 'Medieval Dukemon'
    | 'Megidramon X-Antibody'
    | 'Metal Garurumon X-Antibody'
    | 'Metal Piranimon'
    | 'Omegamon X-Antibody'
    | 'Ouryumon'
    | 'Plesiomon X-Antibody'
    | 'Rosemon X-Antibody'
    | 'Skull Mammon X-Antibody'
    | 'Tiger Vespamon'
    | 'Ulforce V-dramon X-Antibody'
    | 'Ulforce V-dramon Future Mode'
    | 'Ultimate Brachimon'
    | 'War Greymon X-Antibody'
    | 'Black Guilmon'
    | 'Hagurumon X-Antibody'
    | 'Phascomon'
    | 'Porcupamon'
    | 'Thunderballmon X-Antibody'
    | 'Astamon'
    | 'Mamemon X-Antibody'
    | 'Metal Mamemon X-Antibody'
    | 'Belphemon Rage Mode'
    | 'Belphemon Sleep Mode'
    | 'Chaosdramon X-Antibody'
    | 'Prince Mamemon X-Antibody'
    | 'Bommon'
    | 'Pafumon'
    | 'Popomon'
    | 'Puwamon'
    | 'Frimon'
    | 'Kyaromon'
    | 'Missimon'
    | 'Pinamon'
    | 'Tokomon X-Antibody'
    | 'Agumon 2006'
    | 'Commandramon'
    | 'Dracumon'
    | 'Falcomon'
    | 'Kokabuterimon'
    | 'Kudamon'
    | 'Liollmon'
    | 'Swimmon'
    | 'Blade Kuwagamon'
    | 'Diatrymon'
    | 'Liamon'
    | 'Reppamon'
    | 'Sangloupmon'
    | 'Sealsdramon'
    | 'Loader Leomon'
    | 'Matadrmon'
    | 'Metallife Kuwagamon'
    | 'Tankdramon'
    | 'Tyilinmon'
    | 'Volcdramon'
    | 'Yatagaramon'
    | 'Bancho Leomon'
    | 'Beelzebumon X-Antibody'
    | 'Black War Greymon X-Antibody'
    | 'Chaosmon'
    | 'Clavis Angemon'
    | 'Craniummon'
    | 'Darkdramon'
    | 'Grand Dracumon'
    | 'Herakle Kabuterimon X-Antibody'
    | 'Mercurymon'
    | 'Minervamon'
    | 'Neptunemon'
    | 'Sleipmon'
    | 'Spinomon'
    | 'Tyrant Kabuterimon'
    | 'Ultimate Chaosmon'
    | 'Valdurmon'
    | 'Budmon'
    | 'Chapmon'
    | 'Wanyamon'
    | 'Agumon Black 2006'
    | 'Agumon Hakase'
    | 'Bushi Agumon'
    | 'Falcomon 2006'
    | 'Gaomon'
    | 'Kamemon'
    | 'Kudamon 2006'
    | 'Lalamon'
    | 'Minidekachimon'
    | 'Nise Agumon Hakase'
    | 'Pawn Chessmon Black'
    | 'Pawn Chessmon White'
    | 'Proto Gizmon'
    | 'Santa Agumon'
    | 'Yuki Agumon 2006'
    | 'Atamadekachimon'
    | 'Black Gaogamon'
    | 'Gaogamon'
    | 'Gawappamon'
    | 'Geo Greymon'
    | 'Gizmon AT'
    | 'Gold Numemon'
    | 'Knight Chessmon Black'
    | 'Knight Chessmon White'
    | 'Peckmon'
    | 'Sunflowmon'
    | 'Yoxtu!Yoxtu!mon'
    | 'Algomon Perfect'
    | 'Bishop Chessmon White'
    | 'Gizmon XT'
    | 'Lilamon'
    | 'Mach Gaogamon'
    | 'Rize Greymon'
    | 'Rook Chessmon Black'
    | 'Shawujinmon'
    | 'Yatagaramon 2006'
    | 'Algomon Ultimate'
    | 'Bio Darkdramon'
    | 'Bio Lotusmon'
    | 'Bio Spinomon'
    | 'Chronomon Destroy Mode'
    | 'Chronomon Holy Mode'
    | 'El Doradimon'
    | 'Jumbo Gamemon'
    | 'King Chessmon'
    | 'Mirage Gaogamon'
    | 'Mirage Gaogamon Burst Mode'
    | 'Platinum Numemon'
    | 'Queen Chessmon'
    | 'Ravmon'
    | 'Ravmon Burst Mode'
    | 'Shine Greymon'
    | 'Shine Greymon Burst Mode'
    | 'Shine Greymon Ruin Mode'
    | 'Tonosama Mamemon'
    | 'Bio Coatlmon'
    | 'Bio Stegomon'
    | 'Bio Thunderbirmon'
    | 'Petitmon'
    | 'Babydmon'
    | 'Chicchimon'
    | 'Moonmon'
    | 'Sunmon'
    | 'Coronamon'
    | 'Dracomon'
    | 'Lunamon'
    | 'Coredramon Blue'
    | 'Coredramon Green'
    | 'Firamon'
    | 'Grimmon'
    | 'Lekismon'
    | 'Catch Mamemon'
    | 'Chaos Grimmon'
    | 'Crescemon'
    | 'Dark Superstarmon'
    | 'Flaremon'
    | 'Groundramon'
    | 'Wingdramon'
    | 'Apollomon'
    | 'Breakdramon'
    | 'Dianamon'
    | 'Duftmon'
    | 'Duftmon X-Antibody'
    | 'Duftmon Leopard Mode'
    | 'Examon'
    | 'Exo Grimmon'
    | 'Lotusmon'
    | 'Ogudomon'
    | 'Rosemon Burst Mode'
    | 'Slayerdramon'
    | 'Surfymon'
    | 'Victory Greymon'
    | 'Zd Garurumon'
    | 'Burpmon'
    | 'Bombmon'
    | 'Chibickmon'
    | 'Monimon'
    | 'Pickmon'
    | 'Chikurimon'
    | 'Cutemon'
    | 'Dondokomon'
    | 'Gaossmon'
    | 'Hyokomon'
    | 'Monitamon'
    | 'Shoutmon'
    | 'Shoutmon-Dorulu Cannon'
    | 'Shoutmon-Jet Sparrow'
    | 'Shoutmon-Star Sword'
    | 'Spadamon'
    | 'Sparrowmon'
    | 'Starmons'
    | 'Tyutyumon'
    | 'Ballistamon'
    | 'Buraimon'
    | 'Damemon'
    | 'Deadly Axemon'
    | 'Deckerdramon'
    | 'Don Shoutmon'
    | 'Dorulumon'
    | 'Greymon 2010'
    | 'Mad Leomon'
    | 'Mad Leomon Armed Mode'
    | 'Mail Birdramon'
    | 'Shonitamon'
    | 'Shortmon'
    | 'Shoutmon X2'
    | 'Shoutmon X3'
    | 'Shoutmon X4'
    | 'Skull Knightmon'
    | 'Skull Knightmon Big Axe Mode'
    | 'Skull Knightmon Cavalier Mode'
    | 'Troopmon'
    | 'Baalmon'
    | 'Butenmon'
    | 'Cyberdramon 2010'
    | 'Dark Knightmon'
    | 'Decker Greymon'
    | 'Metal Greymon 2010'
    | 'Metal Greymon-Cyber Launcher'
    | 'Shoutmon X4B'
    | 'Shoutmon X4K'
    | 'Shoutmon X5'
    | 'Weddinmon'
    | 'Aegisdramon'
    | 'Bagramon'
    | 'Beelzebumon 2010'
    | 'Blastmon'
    | 'Chaosmon Valdur Arm'
    | 'King Whamon'
    | 'Shoutmon X5B'
    | 'Tactimon'
    | 'Panbachimon'
    | 'Kozenimon'
    | 'Bacomon'
    | 'Ekakimon'
    | 'Gumdramon'
    | 'Iguneetmon'
    | 'Soundbirdmon'
    | 'Tinkermon'
    | 'Zenimon'
    | 'Arresterdramon'
    | 'Ganemon'
    | 'Ginkakumon'
    | 'Ginkakumon Promote'
    | 'Hi-Vision Monitamon'
    | 'Kinkakumon'
    | 'Petermon'
    | 'Raptor Sparrowmon'
    | 'Shademon'
    | 'Shooting Starmon'
    | 'Shoutmon King Ver'
    | 'Targetmon'
    | 'Tuwarmon'
    | 'Atlur Ballistamon'
    | 'Black Mach Gaogamon'
    | 'Captain Hookmon'
    | 'Cho·Hakkaimon'
    | 'Footmon'
    | 'Gokuwmon'
    | 'Gravimon'
    | 'Musou Knightmon'
    | 'Omega Shoutmon'
    | 'Sagomon'
    | 'Sanzomon'
    | 'Splashmon'
    | 'Splashmon Darkness Mode'
    | 'Yaeger Dorulumon'
    | 'Zamielmon'
    | 'Darkness Bagramon'
    | 'Dorbickmon'
    | 'Jet Mervamon'
    | 'Mervamon'
    | 'Neo Vamdemon'
    | 'Ofanimon Falldown Mode'
    | 'Olegmon'
    | 'Omegamon Zwart'
    | 'Shakamon'
    | 'Shoutmon DX'
    | 'Shoutmon EX6'
    | 'Shoutmon X7'
    | 'Shoutmon X7 Superior Mode'
    | 'Venusmon'
    | 'Vulcanusmon'
    | 'Zeke Greymon'
    | 'Armamon'
    | 'Dark Volumon'
    | 'Deadly Tuwarmon'
    | 'Grand Generamon'
    | 'Grey Knightsmon'
    | 'Omega Armamon BM'
    | 'Shoutmon X3GM'
    | 'Shoutmon X3SD'
    | 'Shoutmon X4S'
    | 'Shoutmon X5S'
    | 'Huckmon'
    | 'Pillomon'
    | 'Sistermon Blanc'
    | 'Sistermon Noir'
    | 'Yakiimon'
    | 'Arresterdramon Superior Mode'
    | 'Jokermon'
    | 'Luminamon'
    | 'Luminamon Nene Version'
    | 'Gankoomon'
    | 'Quartzmon'
    | 'Sistermon Blanc Awaken'
    | 'Aegiomon'
    | 'Sistermon Noir Awaken'
    | 'Aegiochusmon'
    | 'Aegiochusmon Blue'
    | 'Aegiochusmon Green'
    | 'Cerberumon Werewolf Mode'
    | 'Sirenmon'
    | 'Avenge Kidmon'
    | 'Bacchusmon'
    | 'Beel Starmon'
    | 'Ceresmon'
    | 'Ceresmon Medium'
    | 'Jupitermon'
    | 'Kuzuhamon Miko Mode'
    | 'Magna Kidmon'
    | 'Plutomon'
    | 'Rust Tyranomon'
    | 'Titamon'
    | 'Bao Huckmon'
    | 'Aegiochusmon Dark'
    | 'Aegiochusmon Holy'
    | 'Savior Huckmon'
    | 'Bancho Golemon'
    | 'Bancho Lilimon'
    | 'Bancho Mamemon'
    | 'Bancho Stingmon'
    | 'Gundramon'
    | 'Jesmon'
    | 'Junomon'
    | 'Junomon Hysteric Mode'
    | 'Jupitermon Wrath Mode'
    | 'Vorvomon'
    | 'Guardromon Gold'
    | 'Meicoomon'
    | 'Meicrackmon Vicious Mode'
    | 'Mastemon'
    | 'Omegamon Alter-B'
    | 'Omegamon Zwart Defeat'
    | 'Volcanicdramon'
    | 'Sakumon'
    | 'Sakuttomon'
    | 'Ludomon'
    | 'Zubamon'
    | 'Hudiemon'
    | 'Lavorvomon'
    | 'Sistermon Ciel'
    | 'Sistermon Ciel Awaken'
    | 'Zubaeagermon'
    | 'Duramon'
    | 'Lavogaritamon'
    | 'Meicrackmon'
    | 'Blitz Greymon'
    | 'Cres Garurumon'
    | 'Durandamon'
    | 'Grace Novamon'
    | 'Omegamon Alter-S'
    | 'Ordinemon'
    | 'Raguelmon'
    | 'Rasielmon'
    | 'Voltobautamon'
    | 'Cotsucomon'
    | 'Pusumon'
    | 'Kakkinmon'
    | 'Pusurimon'
    | 'Bulucomon'
    | 'Dracomon X-Antibody'
    | 'Herissmon'
    | 'Renamon X-Antibody'
    | 'Terriermon Assistant'
    | 'Filmon'
    | 'Paledramon'
    | 'Tia Ludomon'
    | 'Tyranomon X-Antibody'
    | 'Crys Paledramon'
    | 'Raiji Ludomon'
    | 'Stiffilmon'
    | 'Beel Starmon X-Antibody'
    | 'Bryweludramon'
    | 'Craniummon X-Antibody'
    | 'Diablomon X-Antibody'
    | 'Jesmon X-Antibody'
    | 'Lord Knightmon X-Antibody'
    | 'Minervamon X-Antibody'
    | 'Omegamon Merciful Mode'
    | 'Rafflesimon'
    | 'Ragna Lordmon'
    | 'Sakuyamon X-Antibody'
    | 'Sleipmon X-Antibody'
    | 'Agumon Black X-Antibody'
    | 'Impmon X-Antibody'
    | 'Jazamon'
    | 'Keramon X-Antibody'
    | 'Lopmon X-Antibody'
    | 'Terriermon X-Antibody'
    | 'Dark Tyranomon X-Antibody'
    | 'Jazardmon'
    | 'Meramon X-Antibody'
    | 'Numemon X-Antibody'
    | 'Orgemon X-Antibody'
    | 'Pegasmon X-Antibody'
    | 'Siesamon X-Antibody'
    | 'Wizarmon X-Antibody'
    | 'Angewomon X-Antibody'
    | 'Cyberdramon X-Antibody'
    | 'Jazarichmon'
    | 'Lady Devimon X-Antibody'
    | 'Mephismon X-Antibody'
    | 'Metal Greymon Virus X-Antibody'
    | 'Monzaemon X-Antibody'
    | 'Omega Shoutmon X-Antibody'
    | 'Rize Greymon X-Antibody'
    | 'Vamdemon X-Antibody'
    | 'Barbamon X-Antibody'
    | 'Belphemon X-Antibody'
    | 'Cherubimon Vice X-Antibody'
    | 'Cherubimon Virtue X-Antibody'
    | 'Dark Knightmon X-Antibody'
    | 'Demon X-Antibody'
    | 'Examon X-Antibody'
    | 'Gankoomon X-Antibody'
    | 'Hexeblaumon'
    | 'Hououmon X-Antibody'
    | 'Jesmon GX'
    | 'Justimon X-Antibody'
    | 'Leviamon X-Antibody'
    | 'Lilithmon X-Antibody'
    | 'Lucemon X-Antibody'
    | 'Metallicdramon'
    | 'Noble Pumpmon'
    | 'Ofanimon X-Antibody'
    | 'Ofanimon Falldown Mode X-Antibody'
    | 'Ogudomon X-Antibody'
    | 'Rapidmon X-Antibody'
    | 'Rasenmon'
    | 'Rasenmon Fury Mode'
    | 'Algomon Baby I'
    | 'Dokimon'
    | 'Algomon Baby II'
    | 'Bibimon'
    | 'Algomon Child'
    | 'Ghostmon'
    | 'Junkmon'
    | 'Morphomon'
    | 'Pomumon'
    | 'Pulsemon'
    | 'Sangomon'
    | 'Sunarizamon'
    | 'Algomon Adult'
    | 'Baboongamon'
    | 'Baluchimon'
    | 'Bulkmon'
    | 'Dark Maildramon'
    | 'Eosmon Adult'
    | 'Exermon'
    | 'Eyesmon'
    | 'Eyesmon Scatter Mode'
    | 'Machmon'
    | 'Mimicmon'
    | 'Namakemon'
    | 'Parasaurmon'
    | 'Runnermon'
    | 'Tobiumon'
    | 'Boutmon'
    | 'Entmon'
    | 'Eosmon Perfect'
    | 'Gogmamon'
    | 'Gusokumon'
    | 'Manticoremon'
    | 'Marin Chimairamon'
    | 'Metal Greymon Alterous Mode'
    | 'Piranimon'
    | 'Rebellimon'
    | 'Toropiamon'
    | 'Were Garurumon Sagittarius Mode'
    | 'Agumon -Yuki no Kizuna-'
    | 'Done Devimon'
    | 'Eosmon Ultimate'
    | 'Gabumon -Yujo no Kizuna-'
    | 'Heavy Leomon'
    | 'Kazuchimon'
    | 'Mitamamon'
    | 'Nidhoggmon'
    | 'Omedamon'
    | 'Regalecusmon'
    | 'Bosamon'
    | 'Curimon'
    | 'Goromon'
    | 'Gurimon'
    | 'Hiyarimon'
    | 'Negamon'
    | 'Puyomon'
    | 'Puyoyomon'
    | 'Pyonmon'
    | 'Sunamon'
    | 'Angoramon'
    | 'Gammamon'
    | 'Jellymon'
    | 'Kodokugumon Child'
    | 'Betel Gammamon'
    | 'Gulus Gammamon'
    | 'Kaus Gammamon'
    | 'Komondomon'
    | 'Potamon'
    | 'Symbare Angoramon'
    | 'Tesla Jellymon'
    | 'Wezen Gammamon'
    | 'Black Tailmon Uver'
    | 'Canoweissmon'
    | 'Climbmon'
    | 'Divemon'
    | 'Frozomon'
    | 'Lamortmon'
    | 'Pistmon'
    | 'Rare Raremon'
    | 'Shootmon'
    | 'Tempomon'
    | 'Thetismon'
    | 'Vulturemon'
    | 'Abbadomon'
    | 'Abbadomon Core'
    | 'Achillesmon'
    | 'Ajatarmon'
    | 'Bloom Lordmon'
    | 'Fros Velgrmon'
    | 'Gaioumon Invincible Sword '
    | 'Hydramon'
    | 'Lovely Angemon'
    | 'Shivamon'
    | 'Shroudmon'
    | '???';
