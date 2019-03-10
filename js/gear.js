var gear = {};
gear.weapons = [
   // "Club": {
   {
      "name": "Club",
      "category": "Simple",
      "type": "Melee",
      "cost": 0.1,
      "damage": "1d4 bludgeoning",
      "weight": 2,
      "tags": ["Light"]
   },
   // "Dagger": {
   {
      "name": "Dagger",
      "category": "Simple",
      "type": "Melee",
      "cost": 2,
      "damage": "1d4 piercing",
      "weight": 1,
      "tags": ["Finesse", "Light", "Thrown (range 20/60)"]
   },
   {
      "name": "Greatclub",
   // "Greatclub": {
      "category": "Simple",
      "type": "Melee",
      "cost": 0.2,
      "damage": "1d8 bludgeoning",
      "weight": 10,
      "tags": ["Two-handed"]
   },
   {
      "name": "Handaxe",
      "category": "Simple",
      "type": "Melee",
      "cost": 5,
      "damage": "1d6 slashing",
      "weight": 2,
      "tags": ["Light", "Thrown (range 20/60)"]
   },
   {
      "name": "Javelin",
      "category": "Simple",
      "type": "Melee",
      "cost": 0.5,
      "damage": "1d6 piercing",
      "weight": 2,
      "tags": ["Thrown (range 30/120)"]
   },
   {
      "name": "Light hammer",
      "category": "Simple",
      "type": "Melee",
      "cost": 2,
      "damage": "1d4 bludgeoning",
      "weight": 2,
      "tags": ["Light", "Thrown (range 20/60)"]
   },
   {
      "name": "Mace",
      "category": "Simple",
      "type": "Melee",
      "cost": 5,
      "damage": "1d6 bludgeoning",
      "weight": 4,
      "tags": []
   },
   {
      "name": "Quarterstaff",
      "category": "Simple",
      "type": "Melee",
      "cost": 0.2,
      "damage": "1d6 bludgeoning",
      "weight": 4,
      "tags": ["Versatile (1d8)"]
   },
   {
      "name": "Sickle",
      "category": "Simple",
      "type": "Melee",
      "cost": 1,
      "damage": "1d4 slashing",
      "weight": 2,
      "tags": ["Light"]
   },
   {
      "name": "Spear",
      "category": "Simple",
      "type": "Melee",
      "cost": 1,
      "damage": "1d6 piercing",
      "weight": 3,
      "tags": ["Thrown (range 20/60)", "Versatile (1d8)"]
   },
   {
      "name": "Yklwa",
      "category": "Simple",
      "type": "Melee",
      "cost": 1,
      "damage": "1d8 piercing",
      "weight": 3,
      "tags": ["Special", "Thrown (range 10/30)"]
   },
   {
      "name": "Light crossbow",
      "category": "Simple",
      "type": "Ranged",
      "cost": 25,
      "damage": "1d8 piercing",
      "weight": 5,
      "tags": ["Ammunition (range 80/320)", "Loading", "Two-handed"]
   },
   {
      "name": "Dart",
      "category": "Simple",
      "type": "Ranged",
      "cost": 0.05,
      "damage": "1d4 piercing",
      "weight": 0.25,
      "tags": ["Finesse", "Thrown (range 20/60)"]
   },
   {
      "name": "Shortbow",
      "category": "Simple",
      "type": "Ranged",
      "cost": 25,
      "damage": "1d6 piercing",
      "weight": 2,
      "tags": ["Ammunition (range 80/320)", "Two-handed"]
   },
   {
      "name": "Sling",
      "category": "Simple",
      "type": "Ranged",
      "cost": 0.1,
      "damage": "1d4 bludgeoning",
      "weight": 0,
      "tags": ["Ammunition (range 30/120)"]
   },
   {
      "name": "Battleaxe",
      "category": "Martial",
      "type": "Melee",
      "cost": 10,
      "damage": "1d8 slashing",
      "weight": 4,
      "tags": ["Versatile (1d10)"]
   },
   {
      "name": "Double-bladed scimitar",
      "category": "Martial",
      "type": "Melee",
      "cost": 100,
      "damage": "2d4 slashing",
      "weight": 6,
      "tags": ["Special", "Two-handed"]
   },
   {
      "name": "Flail",
      "category": "Martial",
      "type": "Melee",
      "cost": 10,
      "damage": "1d8 bludgeoning",
      "weight": 2,
      "tags": []
   },
   {
      "name": "Glaive",
      "category": "Martial",
      "type": "Melee",
      "cost": 20,
      "damage": "1d10 slashing",
      "weight": 6,
      "tags": ["Heavy", "Reach", "Two-handed"]
   },
   {
      "name": "Greataxe",
      "category": "Martial",
      "type": "Melee",
      "cost": 30,
      "damage": "1d12 slashing",
      "weight": 7,
      "tags": ["Heavy", "Two-handed"]
   },
   {
      "name": "Greatsword",
      "category": "Martial",
      "type": "Melee",
      "cost": 50,
      "damage": "2d6 slashing",
      "weight": 6,
      "tags": ["Heavy", "Two-handed"]
   },
   {
      "name": "Halberd",
      "category": "Martial",
      "type": "Melee",
      "cost": 20,
      "damage": "1d10 slashing",
      "weight": 6,
      "tags": ["Heavy", "Reach", "Two-handed"]
   },
   {
      "name": "Lance",
      "category": "Martial",
      "type": "Melee",
      "cost": 10,
      "damage": "1d12 piercing",
      "weight": 6,
      "tags": ["Reach", "Special"]
   },
   {
      "name": "Longsword",
      "category": "Martial",
      "type": "Melee",
      "cost": 15,
      "damage": "1d8 slashing",
      "weight": 3,
      "tags": ["Versatile (1d10)"]
   },
   {
      "name": "Maul",
      "category": "Martial",
      "type": "Melee",
      "cost": 10,
      "damage": "2d6 bludgeoning",
      "weight": 10,
      "tags": ["Heavy", "Two-handed"]
   },
   {
      "name": "Morningstar",
      "category": "Martial",
      "type": "Melee",
      "cost": 15,
      "damage": "1d8 piercing",
      "weight": 4,
      "tags": []
   },
   {
      "name": "Pike",
      "category": "Martial",
      "type": "Melee",
      "cost": 5,
      "damage": "1d10 piercing",
      "weight": 18,
      "tags": ["Heavy", "Reach", "Two-handed"]
   },
   {
      "name": "Rapier",
      "category": "Martial",
      "type": "Melee",
      "cost": 25,
      "damage": "1d8 piercing",
      "weight": 2,
      "tags": ["Finesse"]
   },
   {
      "name": "Scimitar",
      "category": "Martial",
      "type": "Melee",
      "cost": 25,
      "damage": "1d6 slashing",
      "weight": 3,
      "tags": ["Finesse", "Light"]
   },
   {
      "name": "Shortsword",
      "category": "Martial",
      "type": "Melee",
      "cost": 10,
      "damage": "1d6 piercing",
      "weight": 2,
      "tags": ["Finesse", "Light"]
   },
   {
      "name": "Trident",
      "category": "Martial",
      "type": "Melee",
      "cost": 5,
      "damage": "1d6 piercing",
      "weight": 4,
      "tags": ["Thrown (range 20/60)", "Versatile (1d8)"]
   },
   {
      "name": "War pick",
      "category": "Martial",
      "type": "Melee",
      "cost": 5,
      "damage": "1d8 piercing",
      "weight": 2,
      "tags": []
   },
   {
      "name": "Warhammer",
      "category": "Martial",
      "type": "Melee",
      "cost": 15,
      "damage": "1d8 bludgeoning",
      "weight": 2,
      "tags": ["Versatile (1d10)"]
   },
   {
      "name": "Whip",
      "category": "Martial",
      "type": "Melee",
      "cost": 2,
      "damage": "1d4 slashing",
      "weight": 3,
      "tags": ["Finesse", "Reach"]
   },
   {
      "name": "Blowgun",
      "category": "Martial",
      "type": "Ranged",
      "cost": 10,
      "damage": "1 piercing",
      "weight": "1 ",
      "tags": ["Ammunition (range 25/100)", "Loading"]
   },
   {
      "name": "Hand crossbow",
      "category": "Martial",
      "type": "Ranged",
      "cost": 75,
      "damage": "1d6 piercing",
      "weight": 3,
      "tags": ["Ammunition (range 30/120)", "Light", "Loading"]
   },
   {
      "name": "Heavy crossbow",
      "category": "Martial",
      "type": "Ranged",
      "cost": 50,
      "damage": "1d10 piercing",
      "weight": 18,
      "tags": ["Ammunition (range 100/400)", "Heavy", "Loading", "Two-handed"]
   },
   {
      "name": "Longbow",
      "category": "Martial",
      "type": "Ranged",
      "cost": 50,
      "damage": "1d8 piercing",
      "weight": 2,
      "tags": ["Ammunition (range 150/600)", "Heavy", "Two-handed"]
   },
   {
      "name": "Net",
      "category": "Martial",
      "type": "Ranged",
      "cost": 1,
      "damage": 0,
      "weight": 3,
      "tags": ["Special", "Thrown (range 5/15)"]
   }
];

gear.armor = [];
gear.armor.light = {
   "Padded": {
      "cost": 5,
      "Base AC": 11,
      // "Armor Class": "11 + Dex modifier",
      "Stealth": "Disadvantage",
      "weight": 8
   },
   "Leather": {
      "cost": 10,
      // "Armor Class": "11 + Dex modifier",
      "Base AC": 11,
      "Stealth": "",
      "weight": 10
   },
   "Studded Leather": {
      "cost": 45,
      // "Armor Class": "12 + Dex modifier",
      "Base AC": 12,
      "Stealth": "",
      "weight": 13
   }
};

gear.armor.medium = {
   "Hide": {
      "cost": 10,
      "Base AC": 12,
      "Max Dex": 2,
      // "Armor Class": "12 + Dex modifier (max 2)",
      "Stealth": "",
      "weight": 12
   },
   "Chain Shirt": {
      "cost": 50,
      "Base AC": 13,
      "Max Dex": 2,
      // "Armor Class": "13 + Dex modifier (max 2)",
      "Stealth": "",
      "weight": 20
   },
   "Scale Mail": {
      "cost": 50,
      "Base AC": 14,
      "Max Dex": 2,
      // "Armor Class": "14 + Dex modifier (max 2)",
      "Stealth": "Disadvantage",
      "weight": 45
   },
   "Breastplate": {
      "cost": 400,
      "Base AC": 14,
      "Max Dex": 2,
      // "Armor Class": "14 + Dex modifier (max 2)",
      "Stealth": "",
      "weight": 20
   },
   "Half Plate": {
      "cost": 750,
      "Base AC": 15,
      "Max Dex": 2,
      // "Armor Class": "15 + Dex modifier (max 2)",
      "Stealth": "Disadvantage",
      "weight": 40
   },
   "Spiked Armor*": {
      "cost": 75,
      "Base AC": 14,
      "Max Dex": 2,
      // "Armor Class": "14 + Dex modifier (max 2)",
      "Stealth": "Disadvantage",
      "weight": 40
   }
};

gear.armor.heavy = {
   "Ring Mail": {
      "cost": 30,
      "Armor Class": 14,
      "Min Str": 0,
      "Stealth": "Disadvantage",
      "weight": 40
   },
   "Chain Mail": {
      "cost": 75,
      "Armor Class": 16,
      "Min Strength": "Str 13",
      "Stealth": "Disadvantage",
      "weight": 55
   },
   "Splint": {
      "cost": 200,
      "Armor Class": 17,
      "Min Strength": "Str 15",
      "Stealth": "Disadvantage",
      "weight": 60
   },
   "Plate": {
      "cost": 1500,
      "Armor Class": 18,
      "Min Strength": "Str 15",
      "Stealth": "Disadvantage",
      "weight": 65
   }
};

gear.tools = {
   "Alchemist’s supplies": {
      "Item cost": 50,
      "weight": 8,
      "type": "Artisan"
   },
   "Brewer’s supplies": {
      "Item cost": 20,
      "weight": 9,
      "type": "Artisan"
   },
   "Calligrapher's supplies": {
      "Item cost": 10,
      "weight": 5,
      "type": "Artisan"
   },
   "Carpenter’s tools": {
      "Item cost": 8,
      "weight": 6,
      "type": "Artisan"
   },
   "Cartographer’s tools": {
      "Item cost": 15,
      "weight": 6,
      "type": "Artisan"
   },
   "Cobbler’s tools": {
      "Item cost": 5,
      "weight": 5,
      "type": "Artisan"
   },
   "Cook’s utensils": {
      "Item cost": 1,
      "weight": 8,
      "type": "Artisan"
   },
   "Glassblower’s tools": {
      "Item cost": 30,
      "weight": 5,
      "type": "Artisan"
   },
   "Jeweler’s tools": {
      "Item cost": 25,
      "weight": 2,
      "type": "Artisan"
   },
   "Leatherworker’s tools": {
      "Item cost": 5,
      "weight": 5,
      "type": "Artisan"
   },
   "Mason’s tools": {
      "Item cost": 10,
      "weight": 8,
      "type": "Artisan"
   },
   "Painter’s supplies": {
      "Item cost": 10,
      "weight": 5,
      "type": "Artisan"
   },
   "Potter’s tools": {
      "Item cost": 10,
      "weight": 3,
      "type": "Artisan"
   },
   "Smith’s tools": {
      "Item cost": 20,
      "weight": 8,
      "type": "Artisan"
   },
   "Tinker’s tools": {
      "Item cost": 50,
      "weight": 10,
      "type": "Artisan"
   },
   "Weaver’s tools": {
      "Item cost": 1,
      "weight": 5,
      "type": "Artisan"
   },
   "Woodcarver's tools": {
      "Item cost": 1,
      "weight": 5,
      "type": "Artisan"
   },
   "Disguise kit": {
      "Item cost": 25,
      "weight": 3,
      
   },
   "Forgery kit": {
      "Item cost": 15,
      "weight": 5,
      
   },
   "Dice set": {
      "Item cost": 0.1,
      "weight": 0,
      "type": "Game"
   },
   "Dragonchess set": {
      "Item cost": 1,
      "weight": 0.5,
      "type": "Game"
   },
   "Playing card set": {
      "Item cost": 0.5,
      "weight": 0,
      "type": "Game"
   },
   "Three-Dragon Ante set": {
      "Item cost": 1,
      "weight": 0,
      "type": "Game"
   },
   "Herbalism kit": {
      "Item cost": 5,
      "weight": 3,  
   },
   "Bagpipes": {
      "Item cost": 30,
      "weight": 6,
      "type": "Instrument"
   },
   "Drum": {
      "Item cost": 6,
      "weight": 3,
      "type": "Instrument"
   },
   "Dulcimer": {
      "Item cost": 25,
      "weight": 10,
      "type": "Instrument"
   },
   "Flute": {
      "Item cost": 2,
      "weight": 1,
      "type": "Instrument"
   },
   "Lute": {
      "Item cost": 35,
      "weight": 2,
      "type": "Instrument"
   },
   "Lyre": {
      "Item cost": 30,
      "weight": 2,
      "type": "Instrument"
   },
   "Horn": {
      "Item cost": 3,
      "weight": 2,
      "type": "Instrument"
   },
   "Pan flute": {
      "Item cost": 12,
      "weight": 2,
      "type": "Instrument"
   },
   "Shawm": {
      "Item cost": 2,
      "weight": 1,
      "type": "Instrument"
   },
   "Viol": {
      "Item cost": 30,
      "weight": 1,
      "type": "Instrument"
   },
   "Navigator’s tools": {
      "Item cost": 25,
      "weight": 2,
      
   },
   "Poisoner’s kit": {
      "Item cost": 50,
      "weight": 2,
      
   },
   "Thieves’ tools": {
      "Item cost": 25,
      "weight": 1,
      
   }
};