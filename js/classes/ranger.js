rngr = {};
rngr.class = "Ranger";
rngr.level = 1;
rngr.hDie = 10;
rngr.features = [];
rngr.enemy = "";
rngr.skills = [];
rngr.magic = [];
rngr.proficiencies = {};
rngr.proficiencies.weapons = ["Simple", "Martial"];
rngr.proficiencies.armor = ["Light","Medium","Shields"];
rngr.proficiencies.other = [];
rngr.saves = ["Strength", "Dexterity"];
rngr.subclass = "";
rngr.speed = 0;
rngr.extraLangs = 0;

rngr.magic.list = [];
rngr.magic.list[1] = ["Absorb Elements","Beast Bond","Alarm","Animal Friendship","Cure Wounds","Detect Magic","Detect Poison and Disease","Ensnaring Strike","Fog Cloud","Goodberry","Hail of Thorns","Hunter's Mark","Jump","Longstrider","Speak with Animals"];
rngr.magic.list[2] = ["Animal Messenger","Barkskin","Beast Sense","Cordon of Arrows","Darkvision","Find Traps","Lesser Restoration","Locate Animals or Plants","Locate Object","Pass without Trace","Protection from Poison","Silence","Spike Growth"];
rngr.magic.list[3] = ["Flame Arrows","Conjure Animals","Conjure Barrage","Daylight","Lightning Arrow","Nondetection","Plant Growth","Protection from Energy","Speak with Plants","Water Breathing","Water Walk","Wind Wall"];
rngr.magic.list[4] = ["Conjure Woodland Beings","Freedom of Movement","Grasping Vine","Guardian of Nature","Locate Creature","Stoneskin"];
rngr.magic.list[5] = ["Commune with Nature","Conjure Volley","Steel Wind Strike","Swift Quiver","Tree Stride","Wrath of Nature"];

rngr.generateClass = function(level, person) {
	rngr.level = level;
	rngr.addFeatures(level);

	var newSkills = rngr.addSkills(level, person.skills.slice(0));
	person.skills = person.skills.concat(newSkills);

	if (level >= 2)
		var newSpells = rngr.addSpells(level, person.spells.slice(0));
}

rngr.printClass = function() {
	$(".basics p").text("Level " + rngr.level + " Ranger (" + rngr.subclass + ")");
	$("div.feat p").text(rngr.features.join(", "));
	$("div.skills p").html(makeSkillText(rngr.skills));
	$("div.profs p").html(makeProfText(rngr.proficiencies));
	if ("spells" in rngr.magic) {
		$("div.spells p").html(makeSpellText(rngr.magic.spells));
		$("div.slots").html(printSpellSlots(rngr.magic.slots));
	}
}

rngr.addFeatures = function(level) {
	x = 2;
	if (level >= 6) x = 4;
	enemies = ["Beasts","Fey","Humanoids","Monstrosities","Undead"];
	e = enemies[randInt(0,enemies.length)];
	rngr.extraLangs += 1;
	rngr.enemies = [e];

	rngr.features.push("Favored Enemy - "+e+" (+"+x+" dmg)", "Natural Explorer");

	if (level >= 2) {
		styles = ["Archery","Defense","Dueling","Two-Weapon Fighting"];
		s = styles[randInt(0,styles.length)]
		rngr.features.push("Fighting Style - "+s,"Spellcasting");
	}

	if (level >= 3) {
		rngr.features.push("Primeval Awareness");
		rngr.chooseSubclass(level);
	}

	if (level >= 6) {
		grtr = ["Aberrations","Celestials","Constructs","Dragons","Elementals","Fiends","Giants"];
		q = grtr[randInt(0,grtr.length)];
		rngr.enemies.push(q);
		rngr.extraLangs += 1;

		rngr.features.push("Greater Favored Enemy - "+q+" (+"+x+" dmg)");
	}

	if (level >= 8)
		rngr.features.push("Fleet of Foot");
	if (level >= 10)
		rngr.features.push("Hide in Plain Sight");
	if (level >= 14)
		rngr.features.push("Vanish");
	if (level >= 18)
		rngr.features.push("Feral Senses");
	if (level >= 20)
		rngr.features.push("Foe Slayer");
}

rngr.chooseSubclass = function(level) {
	concs = ["Beast Master","Gloom Stalker","Horizon Walker","Hunter","Monster Slayer"];
	c = concs[randInt(0,concs.length)];
	rngr.subclass = c;
	rngr.features.push("Ranger Conclave - "+c+" Conclave");

	concs["Beast Master"] = [["Animal Companion","Companion's Bond"],"Coordinated Attack","Beast's Defense","Storm of Claws and Fangs","Superior Beast's Defense"];
	concs["Gloom Stalker"] = [["Gloom Stalker Magic","Dread Ambusher","Umbral Sight"],"Extra Attack","Iron Mind","Stalker's Fury","Shadowy Dodge"];
	concs["Horizon Walker"] = [["Horizon Walker Magic","Detect Portal","Planar Warrior"],"Extra Attack","Ethereal Step","Distant Strike","Spectral Defense"];
	concs["Hunter"] = ["Hunter's Prey","Extra Attack","Defensive Tactics","Multi-attack","Superior Hunter's Defense"];
	concs["Monster Slayer"] = [["Monster Slayer Magic","Hunter's Sense","Slayer's Prey"],"Extra Attack","Supernatural Defense","Magic-User's Nemesis","Slayer's Counter"];

// 3 5 7 11 15
	if (c != "Hunter") {
		for (var i = 0; i < concs[c][0].length; i++) {
			rngr.features.push(concs[c][0][i]);
		}

		if (level >= 5)
			rngr.features.push(concs[c][1]);
		if (level >= 7)
			rngr.features.push(concs[c][2]);
		if (level >= 11)
			rngr.features.push(concs[c][3]);
		if (level >= 15)
			rngr.features.push(concs[c][4]);
	}

	if (c == "Beast Master") {
		beasts = ["Ape","Black bear","Boar","Giant badger","Giant weasel","Mule","Panther","Wolf"];
		b = beasts[randInt(0,beasts.length)];

		rngr.companion = [];
		rngr.companion.race = b;
		rngr.companion.skills = skillChunk(world.skills, 2, []);

		f = rngr.features.indexOf("Animal Companion");
		rngr.features[f] = "Animal Companion - "+b;
		// statmods??
	}
	else if (c == "Hunter") {
		main = concs[c];
		feats = [["Colossus Slayer","Giant Killer","Horde Breaker"],["Escape the Horde","Multi-attack Defense","Steel Will"],["Volley","Whirlwind Attack"],["Evasion","Stand Against the Tide","Uncanny Dodge"]];
		rngr.features.push(main[0] +" - "+ feats[0][randInt(0,feats[0].length)]);

		if (level >= 5)
			rngr.features.push(main[1]);
			
		if (level >= 7)
			rngr.features.push(main[2] +" - "+ feats[1][randInt(0,feats[1].length)]);
			
		if (level >= 11)
			rngr.features.push(main[3] +" - "+ feats[2][randInt(0,feats[2].length)]);
			
		if (level >= 15)
			rngr.features.push(main[4] +" - "+ feats[3][randInt(0,feats[3].length)]);		
	}
}

rngr.addSkills = function(level, knownSkills) {
	var mySkills = skillChunk([1,3,6,8,10,11,16,17], 3, knownSkills);
	rngr.skills = mySkills;
	return mySkills;
}

rngr.addSpells = function(level, knownSpells) {
	rngr.magic.slots = rngr.getSpellSlots(level);
	var toLearn = rngr.getNumSpellsKnown(level);
	var spells = rngr.getSpells(level, rngr.magic.slots, knownSpells.slice(0));
	rngr.magic.spells = spells;
	return spells;
}

rngr.getSpellSlots = function(level) {
	var slots = [];

	switch(level) {
		case 2:
			slots = [0, 2];
			break;
		case 3:
		case 4:
			slots = [0, 3];
			break;
		case 5:
		case 6:
			slots = [0, 4, 2];
			break;
		case 7:
		case 8:
			slots = [0, 4, 3];
		case 9:
		case 10:
			slots = [0, 4, 3, 2];
			break;
		case 11:
		case 12:
			slots = [0, 4, 3, 3];
			break;
		case 13:
		case 14:
			slots = [0, 4, 3, 3, 1];
			break;
		case 15:
		case 16:
			slots = [0, 4, 3, 3, 2];
			break;
		case 17:
		case 18:
			slots = [0, 4, 3, 3, 3, 1];
			break;
		case 19:
		case 20:
			slots = [0, 4, 3, 3, 3, 2];
			break;
	}

	return slots;
}

rngr.getNumSpellsKnown = function(level) {
	var sp = 0;
	if (level >= 2)
		sp = 2;
	if (level >= 3)
		sp++;
	if (level >= 5)
		sp++;
	if (level >= 7)
		sp++;
	if (level >= 9)
		sp++;
	if (level >= 11)
		sp++;
	if (level >= 13)
		sp++;
	if (level >= 15)
		sp++;
	if (level >= 17)
		sp++;
	if (level >= 19)
		sp++;

	return sp;
}

rngr.getConcSpells = function(slots) {
	var concSpell = [];
	concSpell["Gloom Stalker"] = [[],["Disguise Self"],["Rope Trick"],["Fear"],["Greater Invisibility"],["Seeming"]];
	concSpell["Horizon Walker"] = [[],["Protection from Evil and Good"],["Misty Step"],["Haste"],["Banishment"],["Teleportation Circle"]];
	concSpell["Monster Slayer"] = [[],["Protection from Evil and Good"],["Zone of Truth"],["Magic Circle"],["Banishment"],["Hold Monster"]];

	var cSpells = [];
	var c = rngr.subclass;
	if (c == "Gloom Stalker" || c == "Horizon Walker" || c == "Monster Slayer") {
		cSpells[0] = [];
		for (var i = 1; i < slots.length; i++) {
			cSpells[i] = concSpell[c][i];
		}
		// console.log("conclave spells: ");
		// console.log(cSpells);
	}

	return cSpells;
}

rngr.getSpells = function(level, slots, knownSpells) {
	var concSpells = rngr.getConcSpells(slots);
	var mySpells = pickAllSpells(2, level, rngr, knownSpells);	

	var allSpells = [];
	if (concSpells.length > 0)
		allSpells = world.combineSpellLists(mySpells, concSpells);
	else
		allSpells = mySpells;

	return allSpells;
	// return mySpells;
}

