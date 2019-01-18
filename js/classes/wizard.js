wiz = {};
wiz.class = "Wizard";
wiz.level = 1;
wiz.hDie = 6;
wiz.magic = [];
wiz.magic.spells = [];
wiz.features = [];
wiz.skills = [];
wiz.expertise = [];
wiz.proficiencies = {};
wiz.proficiencies.weapons = ["Dagger","Darts","Sling","Quarterstaff","Light crossbow"];
wiz.proficiencies.armor = [];
wiz.proficiencies.other = [];
wiz.saves = ["Intelligence", "Wisdom"];
wiz.statMods = [0,0,0,0,0,0];
wiz.subclass = "";
wiz.extraHP = 0;

wiz.generateClass = function(level, person) {
	wiz.level = level;
	wiz.addFeatures(level);

	newSkills = wiz.addSkills(level, person.skills.slice(0));
	person.skills = person.skills.concat(newSkills);

	newSpells = wiz.addSpells(level, person.spells.slice(0));
}

wiz.printClass = function() {
	$(".basics p").text("Level " + wiz.level + " Wizard (" + wiz.subclass + ")");
	$("div.feat p").text(wiz.features.join(", "));
	$("div.skills p").html(makeSkillText(wiz.skills));
	$("div.profs p").html(makeProfText(wiz.proficiencies));
	$(".class .spells p").html(makeSpellText(wiz.magic.spells));
	$("div.slots").html(printSpellSlots(wiz.magic.slots));
}

wiz.addFeatures = function(level) {
	wiz.features.push("Spellcasting","Arcane Recovery");

	if (level >= 2)
		wiz.chooseSubclass(level);
	if (level >= 18)
		wiz.features.push("Spell Mastery");
	if (level >= 20)
		wiz.features.push("Signature Spells"); //TODO choose these 4 spells
}

wiz.chooseSubclass = function(level) {
	var types = ["Abjuration","Conjuration","Divination","Enchantment","Evocation","Illusion","Necromancy","Transmutation","War Magic"];
	var t = types[randInt(0, types.length)];
	wiz.subclass = t;
	wiz.features.push("Arcane Tradition - School of "+wiz.subclass);

	types["Abjuration"] = [["Abjuration Savant","Arcane Ward"],"Projected Ward","Improved Abjuration","Spell Resistance"];
	types["Conjuration"] = [["Conjuration Savant","Minor Conjuration"],"Benign Transposition","Focused Conjuration","Durable Summons"];
	types["Divination"] = [["Divination Savant","Portent"],"Expert Divination","The Third Eye","Greater Portent"];
	types["Enchantment"] = [["Enchantment Savant","Hypnotic Gaze"],"Instinctive Charm","Split Enchantment","Alter Memories"];
	types["Evocation"] = [["Evocation Savant","Sculpt Spells"],"Potent Cantrip","Empowered Evocation","Overchannel"];
	types["Illusion"] = [["Illusion Savant","Improved Minor Illusion"],"Malleable Illusions","Illusory Self","Illusory Reality"];
	types["Necromancy"] = [["Necromancy Savant","Grim Harvest"],"Undead Thralls","Inured to Undeath","Command Undead"];
	types["Transmutation"] = [["Transmutation Savant","Minor Alchemy"],"Transmuter's Stone","Shapechanger","Master Transmuter"];
	types["War Magic"] = [["Arcane Deflection","Tactical Wit"],"Power Surge","Durable Magic","Deflecting Shroud"];

	for (var i = 0; i < types[t][0].length; i++) {
		wiz.features.push(types[t][0][i]);
	}

	if (level >= 6)
		wiz.features.push(types[t][1]);
	if (level >= 10)
		wiz.features.push(types[t][2]);
	if (level >= 14)
		wiz.features.push(types[t][3]);
}

wiz.addSkills = function(level, knownSkills) {
	var mySkills = skillChunk([2,5,6,8,9,14], 2, []);
	wiz.skills = mySkills;
	return mySkills;
}

wiz.addSpells = function(level, knownSpells) {
	wiz.magic.slots = wiz.getSpellSlots(level);
	var spells = wiz.getSpells(level, knownSpells);
	wiz.magic.spells = spells;
	return spells;
}

wiz.getSpells = function(level, knownSpells) {
	var origSpells = [];
	origSpells[0] = [];
	if (typeof knownSpells == 'undefined')
		knownSpells = [];
	if (typeof knownSpells[0] == 'undefined')
		knownSpells[0] = [];
	if (typeof knownSpells[3] == 'undefined')
		knownSpells[3] = [];
	if (typeof knownSpells[4] == 'undefined')
		knownSpells[4] = [];

	if (level >= 2 && wiz.subclass !== "War Magic") {
		console.log("You're a "+wiz.subclass);
		console.log(wiz.magic[wiz.subclass]);
		wiz.magic.list = world.combineSpellLists(wiz.magic.list.slice(0), wiz.magic[wiz.subclass].slice(0));
	}
	if (wiz.subclass == "Illusion" && level >= 2) {
		if (!knownSpells[0].includes("Minor Illusion")) {
			origSpells[0] = ["Minor Illusion"];
		}
		else {
			origSpells[0] = skillChunk(wiz.magic.list[0].slice(0), 1, knownSpells[0].slice(0));
		}
	}
	else if (wiz.subclass == "Necromancy" && level >= 6 && !knownSpells[3].includes("Animate Dead")) {
		origSpells[3] = ["Animate Dead"];
	}
	else if (wiz.subclass == "Transmutation" && level >= 10 && !knownSpells[4].includes("Polymorph")) {
		origSpells[4] = ["Polymorph"];
	}

	knownSpells = world.combineSpellLists(knownSpells.slice(0), origSpells.slice(0));
	var spells = pickAllSpells(1, level, wiz, knownSpells, false);

	var cants = wiz.getNumCantripsKnown(level);
	spells[0] = skillChunk(wiz.magic.list[0].slice(0), cants, knownSpells[0].slice(0));
	console.log("new cantrips: "+spells[0].join(", "));
	spells = world.combineSpellLists(spells.slice(0), origSpells.slice(0));
	console.log(spells);

	return spells;
}

wiz.getSpellSlots = function(level) {
	var slots = [];

	slots[1] = Math.min(level+1, 4);
	if (level >= 3)
		slots[2] = Math.min(level-1, 3);
	if (level >= 5)
		slots[3] = Math.min(level-3, 3);
	if (level >= 7)
		slots[4] = Math.min(level-6, 3);
	if (level >= 9) {
		slots[5] = Math.min(level-8, 2);
		if (level >= 18)
			slots[5] = 3;
	}
	if (level >= 11) {
		slots[6] = 1;
		if (level >= 19)
			slots[6] = 2;
	}
	if (level >= 13) {
		slots[7] = 1;
		if (level >= 20)
			slots[7] = 2;
	}
	if (level >= 15)
		slots[8] = 1;
	if (level >= 17)
		slots[9] = 1;

	return slots;
}

wiz.getNumSpellsKnown = function(level) {
	var sp = 6;
	if (level > 1)
		sp += ((level-1) * 2);

	return sp;
}

wiz.getNumCantripsKnown = function(level) {
	var cants = 3;

	if (level >= 4)
		cants++;
	if (level >= 10)
		cants++;

	return cants;
}


wiz.magic.list = [];

wiz.magic.list[0] = ["Create Bonfire","Control Flames","Frostbite","Gust","Mold Earth","Shape Water","Thunderclap","Acid Splash","Blade Ward","Chill Touch","Dancing Lights","Fire Bolt","Friends","Light","Mage Hand","Mending","Message","Minor Illusion","Poison Spray","Prestidigitation","Ray of Frost","Shocking Grasp","True Strike"];
wiz.magic.list[1] = ["Abwizb Elements","Catapult","Ice Knife","Earth Tremor","Alarm","Burning Hands","Charm Person","Chromatic Orb","Color Spray","Comprehend Languages","Detect Magic","Disguise Self","Expeditious Retreat","False Life","Feather Fall","Find Familiar","Find Familiar","Fog Cloud","Grease","Identify","Illuwizy Script","Jump","Longstrider","Mage Armor","Magic Missile","Protection from Good and Evil","Ray of Sickness","Shield","Silent Image","Sleep","Tasha's Hideous Laughter","Tenser's Floating Disk","Thunderwave","Unseen Servant","Witch Bolt"];
wiz.magic.list[2] = ["Aganazzar's Scorcher","Dust Devil","Earthbind","Maximilian's Earthen Grap","Pyrotechnics","Skywrite","Snilloc's Snowball Swarm","Alter Self","Arcane Lock","Blindness/Deafness","Blur","Cloud of Daggers","Continual Flame","Crown of Madness","Darkness","Darkvision","Detect Thoughts","Enlarge/Reduce","Flaming Sphere","Gentle Repose","Gust of Wind","Hold Person","Invisibility","Knock","Levitate","Locate Object","Magic Mouth","Magic Weapon","Melf's Acid Arrow","Mirror Image","Misty Step","Nystul's Magic Aura","Phantasmal Force","Ray of Enfeeblement","Rope Trick","Scorching Ray","See Invisibility","Shatter","Spider Climb","Suggestion","Web"];
wiz.magic.list[3] = ["Erupting Earth","Flame Arrows","Melf's Minute Meteors","Tidal Wave","Wall of Sand","Wall of Water","Animate Dead","Bestow Curse","Blink","Clairvoyance","Counterspell","Dispel Magic","Fear","Feign Death","Fireball","Fly","Gaseous Form","Glyph of Warding","Haste","Hypnotic Pattern","Leomund’s Tiny Hut","Lightning Bolt","Magic Circle","Major Image","Nondetection","Phantom Steed","Protection from Energy","Remove Curse","Sending","Sleet Storm","Slow","Stinking Cloud","Tongues","Vampiric Touch","Water Breathing"];
wiz.magic.list[4] = ["Elemental Bane","Storm Sphere","Vitriolic Sphere","Watery Sphere","Arcane Eye","Banishment","Blight","Confusion","Conjure Minor Elementals","Control Water","Dimension Door","Evard's Black Tentacles","Fabricate","Fire Shield","Greater Invisibility","Hallucinatory Terrain","Ice Storm","Leomund’s Secret Chest","Locate Creature","Mordenkainen’s Faithful Hound","Mordenkainen’s Private Sanctum","Otiluke’s Resilient Sphere","Phantasmal Killer","Polymorph","Stone Shape","Stoneskin","Wall of Fire"];
wiz.magic.list[5] = ["Control Winds","Immolation","Transmute Rock","Animate Objects","Bigby’s Hand","CloudkilI","Cone of Cold","Conjure Elemental","Contact Other Plane","Creation","Dominate Person","Dream","Geas","Hold Monster","Legend Lore","Mislead","Modify Memory","Passwall","Planar Binding","Rary’s Telepathic Bond","Scrying","Seeming","Telekinesis","Teleportation Circle","Wall of Force","Wall of Stone"];
wiz.magic.list[6] = ["Arcane Gate","Chain Lightning","Circle of Death","Contingency","Create Homunculus","Create Undead","Disintegrate","Drawmij's Instant Summons","Eyebite","Flesh to Stone","Globe of Invulnerability","Guards and Wards","Investiture of Flame","Investiture of Ice","Investiture of Stone","Investiture of Wind","Magic Jar","Mass Suggestion","Mental Prison","Move Earth","Otiluke’s Freezing Sphere","Otto's Irresistible Dance","Programmed Illusion","Scatter","Soul Cage","Sunbeam","Tenser's Transformation","True Seeing","Wall of Ice"];
wiz.magic.list[7] = ["Crown of Stars","Delayed Blast Fireball","Etherealness","Finger of Death","Forcecage","Mirage Arcane","Mordenkainen's Magnificient Mansion","Mordenkainen's Sword","Plane Shift","Power Word Pain","Prismatic Spray","Project Image","Reverse Gravity","Sequester","Simulacrum","Symbol","Teleport","Whirlwind"];
wiz.magic.list[8] = ["Antimagic Field","Antipathy/Sympathy","Clone","Control Weather","Demiplane","Dominate Monster","Feeblemind","Incendiary Cloud","Maze","Mind Blank","Power Word Stun","Sunburst","Telepathy","Trap the Soul"];
wiz.magic.list[9] = ["Astral Projection","Foresight","Gate","Imprisonment","Meteor Swarm","Power Word Kill","Prismatic Wall","Shapechange","Time Stop","True Polymorph","Weird","Wish"];

wiz.magic["Abjuration"] = [];

wiz.magic["Abjuration"][0] = ["Blade Ward"];
wiz.magic["Abjuration"][1] = ["Alarm","Mage Armor","Protection from Evil and Good","Shield"];
wiz.magic["Abjuration"][2] = ["Arcane Lock"]
wiz.magic["Abjuration"][3] = ["Counterspell","Dispel Magic","Glyph of Warding","Magic Circle","Nondetection","Protection from Energy","Remove Curse"];
wiz.magic["Abjuration"][4] = ["Banishment","Mordenkainen's Private Sanctum"];
wiz.magic["Abjuration"][5] = ["Planar Binding"];
wiz.magic["Abjuration"][6] = ["Globe of Invulnerability","Guards and Wards"];
wiz.magic["Abjuration"][7] = ["Symbol"];
wiz.magic["Abjuration"][8] = ["Antimagic Field","Mind Blank"];
wiz.magic["Abjuration"][9] = ["Imprisonment","Prismatic Wall"];

wiz.magic["Conjuration"] = [];
wiz.magic["Conjuration"][0] = ["Acid Splash","Mage Hand","Poison Spray"];
wiz.magic["Conjuration"][1] = ["Find Familiar","Fog Cloud","Grease","Tenser's Floating Disk","Unseen Servant"];
wiz.magic["Conjuration"][2] = ["Cloud of Daggers","Flaming Sphere","Misty Step","Web"];
wiz.magic["Conjuration"][3] = ["Sleet Storm","Stinking Cloud"];
wiz.magic["Conjuration"][4] = ["Conjure Minor Elementals","Dimension Door","Evard's Black Tentacles","Leomund's Secret Chest","Mordenkainen's Faithful Hound"];
wiz.magic["Conjuration"][5] = ["Cloudkill","Conjure Elemental","Teleportation Circle"];
wiz.magic["Conjuration"][6] = ["Arcane Gate","Drawmij's Instant Summons"];
wiz.magic["Conjuration"][7] = ["Mordenkainen's Magnificent Mansion","Plane Shift","Teleport"];
wiz.magic["Conjuration"][8] = ["Demiplane","Incendiary Cloud","Maze"];
wiz.magic["Conjuration"][9] = [,"Gate","Wish"];

wiz.magic["Divination"] = [];
wiz.magic["Divination"][0] = ["True Strike"];
wiz.magic["Divination"][1] = ["Comprehend Languages","Detect Magic","Identify"];
wiz.magic["Divination"][2] = ["Detect Thoughts", "Locate Object", "See Invisibility"  ];
wiz.magic["Divination"][3] = ["Clairvoyance","Tongues"  ];
wiz.magic["Divination"][4] = ["Arcane Eye", "Locate Creature"  ];
wiz.magic["Divination"][5] = ["Contact Other Plane","Legend Lore","Rary's Telepathic Bond", "Scrying"];
wiz.magic["Divination"][6] = ["True Seeing"  ]
wiz.magic["Divination"][9] = ["Foresight"  ];

wiz.magic["Enchantment"] = [];
wiz.magic["Enchantment"][0] = ["Friends"];
wiz.magic["Enchantment"][1] = ["Charm Person","Sleep","Tasha's Hideous Laughter"];
wiz.magic["Enchantment"][2] = ["Crown of Madness","Hold Person","Suggestion"];
wiz.magic["Enchantment"][4] = ["Confusion"];
wiz.magic["Enchantment"][5] = ["Dominate Person","Geas","Hold Monster","Modify Memory"];
wiz.magic["Enchantment"][6] = ["Mass Suggestion","Otto's Irresistible Dance"];
wiz.magic["Enchantment"][8] = ["Antipathy/Sympathy","Dominate Monster","Feeblemind","Power Word Stun"];
wiz.magic["Enchantment"][9] = ["Power Word Kill"]

wiz.magic["Evocation"] = [];
wiz.magic["Evocation"][0] = ["Dancing Lights","Fire Bolt","Light","Ray of Frost","Shocking Grasp"];
wiz.magic["Evocation"][1] = ["Burning Hands","Chromatic Orb","Magic Missile","Thunderwave","Witch Bolt"];
wiz.magic["Evocation"][2] = ["Continual Flame","Darkness","Gust of Wind","Melf's Acid Arrow","Scorching Ray","Shatter"];
wiz.magic["Evocation"][3] = ["Fireball","Leomund's Tiny Hut","Lightning Bolt","Sending"];
wiz.magic["Evocation"][4] = ["Fire Shield","Ice Storm","Otiluke's Resilient Sphere","Wall of Fire"];
wiz.magic["Evocation"][5] = ["Bigby's Hand","Cone of Cold","Wall of Force","Wall of Stone"];
wiz.magic["Evocation"][6] = ["Chain Lightning","Contingency","Otiluke's Freezing Sphere","Sunbeam","Wall of Ice"];
wiz.magic["Evocation"][7] = ["Delayed Blast Fireball","Forcecage","Mordenkainen's Sword","Prismatic Spray"];
wiz.magic["Evocation"][8] = ["Sunburst","Telepathy"];
wiz.magic["Evocation"][9] = ["Meteor Swarm"];

wiz.magic["Illusion"] = [];
wiz.magic["Illusion"][0] = ["Minor Illusion"];
wiz.magic["Illusion"][1] = ["Color Spray","Disguise Self","Illusory Script","Silent Image"];
wiz.magic["Illusion"][2] = ["Blur","Invisibility","Magic Mouth","Mirror Image","Nystul's Magic Aura","Phantasmal Force"];
wiz.magic["Illusion"][3] = ["Fear","Hypnotic Pattern","Major Image","Phantom Steed"];
wiz.magic["Illusion"][4] = ["Greater Invisibility","Hallucinatory Terrain","Phantasmal Killer"];
wiz.magic["Illusion"][5] = ["Creation","Dream","Mislead","Seeming"];
wiz.magic["Illusion"][6] = ["Programmed Illusion"];
wiz.magic["Illusion"][7] = ["Mirage Arcane","Project Image","Simulacrum"];
wiz.magic["Illusion"][9] = ["Weird"];

wiz.magic["Necromancy"] = [];
wiz.magic["Necromancy"][0] = ["Chill Touch"];
wiz.magic["Necromancy"][1] = ["False Life","Ray of Sickness"];
wiz.magic["Necromancy"][2] = ["Blindness/Deafness","Gentle Repose","Ray of Enfeeblement"];
wiz.magic["Necromancy"][3] = ["Animate Dead","Bestow Curse","Feign Death","Vampiric Touch"];
wiz.magic["Necromancy"][4] = ["Blight"];
wiz.magic["Necromancy"][6] = ["Circle of Death","Create Undead","Eyebite","Magic Jar"];
wiz.magic["Necromancy"][7] = ["Finger of Death"];
wiz.magic["Necromancy"][8] = ["Clone"];
wiz.magic["Necromancy"][9] = ["Astral Projection"];

wiz.magic["Transmutation"] = [];
wiz.magic["Transmutation"][0] = ["Mending","Message","Prestidigitation"];
wiz.magic["Transmutation"][1] = ["Expeditious Retreat","Feather Fall","Jump","Longstrider"];
wiz.magic["Transmutation"][2] = ["Alter Self","Darkvision","Enlarge/Reduce","Knock","Levitate","Magic Weapon","Rope Trick","Spider Climb"];
wiz.magic["Transmutation"][3] = ["Blink","Fly","Gaseous Form","Haste","Slow","Water Breathing"];
wiz.magic["Transmutation"][4] = ["Control Water","Fabricate","Polymorph","Stone Shape","Stoneskin"];
wiz.magic["Transmutation"][5] = ["Animate Objects","Passwall","Telekinesis"];
wiz.magic["Transmutation"][6] = ["Disintegrate","Flesh to Stone","Move Earth"];
wiz.magic["Transmutation"][7] = ["Etherealness","Reverse Gravity","Sequester"]
wiz.magic["Transmutation"][8] = ["Control Weather"];
wiz.magic["Transmutation"][9] = ["Shapechange","Time Stop","True Polymorph"];