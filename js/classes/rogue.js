rog = {};
rog.class = "Rogue";
rog.level = 1;
rog.hDie = 8;
rog.features = [];
rog.skills = [];
rog.proficiencies = [];
rog.proficiencies.weapons = ["Simple","Crossbow","Longsword","Rapier","Shortsword"];
rog.proficiencies.armor = ["Light"];
rog.proficiencies.other = ["Thieves' tools"];
rog.saves = ["Intelligence", "Dexterity"];
rog.subclass = "";
rog.speed = 0;
rog.extraLangs = 0;
rog.expertise = [];
rog.magic = [];

rog.reset = function(classes) {
	rog.name = "";
	rog.level = 1;
	rog.features = [];
	rog.skills = [];
	rog.proficiencies = {};
	rog.proficiencies.weapons = ["Simple","Crossbow","Longsword","Rapier","Shortsword"];
	rog.proficiencies.armor = ["Light"];
	rog.proficiencies.other = ["Thieves' tools"];
	rog.saves = ["Intelligence", "Dexterity"];
	rog.subclass = "";
	rog.speed = 0;
	rog.extraLangs = 0;
	rog.expertise = [];
	rog.magic = [];

	var list = ["Thief","Assassin","Arcane Trickster"];
	if (typeof classes != 'undefined') {
		rog.subclassList = list.slice(0).concat(classes.slice(0));
	}
	else
		rog.subclassList = list;

	console.log(rog.subclassList);
	console.log(classes);
}

rog.generateClass = function(level, person) {
	rog.level = level;
	rog.addFeatures(level);

	var newSkills = rog.addSkills(level, person.skills.slice(0));
	// person.skills = person.skills.concat(newSkills);

	if (rog.subclass == "Arcane Trickster")
		var newSpells = rog.addSpells(level, person.spells.slice(0));

	rog.name = "Level " + rog.level + " Rogue (" + rog.subclass + ")";
}

rog.printClass = function() {
	$(".basics p").text("Level " + rog.level + " Rogue (" + rog.subclass + ")");
	$("div.feat p").text(rog.features.join(", "));
	$("div.skills p").html(makeSkillText(rog.skills));
	$("div.profs p").html(makeProfText(rog.proficiencies));
	if ("spells" in rog.magic) {
		$(".class .spells p").html(makeSpellText(rog.magic.spells));
		$("div.slots").html(printSpellSlots(rog.magic.slots));
	}
}

rog.addFeatures = function(level) {
	x = Math.ceil(level / 2);
	rog.features.push("Expertise", "Sneak Attack ("+x+"d6 dmg)", "Thieves' Cant");
	
	if (level >= 2)
		rog.features.push("Cunning Action");
	if (level >= 3) {
		rog.chooseSubclass(level);
	}
	if (level >= 5)
		rog.features.push("Uncanny Dodge");
	if (level >= 7)
		rog.features.push("Evasion");
	if (level >= 11)
		rog.features.push("Reliable Talent");
	if (level >= 14)
		rog.features.push("Blindsense");
	if (level >= 15) {
		rog.features.push("Slippery Mind");
		rog.saves.push("Wisdom");
	}
	if (level >= 18)
		rog.features.push("Elusive");
	if (level >= 20)
		rog.features.push("Stroke of Luck");
}

rog.chooseSubclass = function(level) {
	var archs = rog.subclassList;
	var c = random.pick(archs);
	rog.subclass = c;
	// rog.subclass = "Arcane Trickster";
	rog.features.push("Roguish Archetype - "+c);

	archs["Arcane Trickster"] = [["Spellcasting","Mage Hand Legerdemain"],"Magical Ambush","Versatile Trickster","Spell Thief"];
	archs["Assassin"] = [["Bonus Proficiencies","Assassinate"],"Infiltration Expertise","Impostor","Death Strike"];
	archs["Mastermind"] = [["Master of Intrigue","Master of Tactics"],"Insightful Manipulator","Misdirection","Soul of Deceit"];
	archs["Scout"] = [["Skirmisher","Survivalist"],"Superior Mobility","Ambush Master","Sudden Strike"];
	archs["Swashbuckler"] = [["Fancy Footwork","Rakish Audacity"],"Panache","Elegant Maneuver","Master Duelist"];
	archs["Thief"] = [["Fast Hands","Second-Story Work"],"Supreme Sneak","Use Magic Device","Thief's Reflexes"];

	for (var i = 0; i < archs[c][0].length; i++) {
		rog.features.push(archs[c][0][i]);
	}

	if (level >= 9) {
		rog.features.push(archs[c][1]);	
		if (c == "Scout")
			rog.speed += 10;
	}
	if (level >= 13)
		rog.features.push(archs[c][2]);
	if (level >= 17)
		rog.features.push(archs[c][3]);

	if (c == "Assassin")
		rog.proficiencies.other.push("Disguise kit","Poisoner's kit");
	if (c == "Mastermind") {
		rog.proficiencies.other.push("Disguise kit","Forgery kit");
		var game = skillChunk(world.games, 1, person.proficiencies.other.slice(0));
		rog.proficiencies.other.push(game);
		rog.extraLangs += 2;
	}
}

rog.addExpertise = function(level, skills) {	
	var thief = false;
	var exp = [];

	var retval = rog.addExpInner(level, skills, thief, exp);
	exp = retval[0]; thief = retval[1];

	if (level >= 6) {
		var retsix = rog.addExpInner(level, skills, thief, exp.slice(0));
		exp = exp.concat(retsix[0]);
	}
	
	rog.expertise = exp;
}

rog.addExpInner = function(level, skills, thief, known) {
	var exp = [];
	// var r = Math.random();
	if (thief)
		r = 1;

	if (random.bool(0.3)) {
		exp = skillChunk(skills, 2, known);
	}
	else {
		exp = skillChunk(skills, 1, known);
		exp.push("Thieves' tools");
		thief = true;
	}
	return [exp, thief];
}

rog.addSkills = function(level, knownSkills) {
	// console.log("Gonna start rogue skills");
	// console.log(knownSkills);

	var mySkills = skillChunk([0,3,4,6,7,8,11,12,13,15,16], 4, knownSkills);
	rog.addExpertise(level, mySkills.concat(knownSkills.slice(0)));

	if (level >= 3 && rog.subclass == "Scout") {
		if (knownSkills.indexOf(10) == -1)
			mySkills.push(10);
		if (knownSkills.indexOf(17) == -1)
			mySkills.push(17);

		rog.expertise.push(10, 17);
	}
	
	rog.skills = mySkills;
	return mySkills;
}

rog.addSpells = function(level, knownSpells) {
	rog.magic.slots = rog.getSpellSlots(level);
	var spells = rog.getSpells(level, knownSpells.slice(0));
	rog.magic.spells = spells;
	return spells;
}

rog.getSpellSlots = function(level) {
	var slots = [];
	
	if (level >= 3)
		slots[1] = 2;
	if (level >= 4)
		slots[1] = 3;
	if (level >= 7) {
		slots[1] = 4;
		slots[2] = 2;
	}
	if (level >= 10)
		slots[2] = 3;
	if (level >= 13)
		slots[3] = 2;
	if (level >= 16)
		slots[3] = 3;
	if (level >= 19)
		slots[4] = 1;

	return slots;
}

rog.getNumSpellsKnown = function(level) {
	var sp = 2;
	var spAll = 1;
	// if (level >= 3)
	// 	sp = 3;
	if (level >= 4)
		sp++;
	if (level >= 7)
		sp++;
	if (level >= 8)
		spAll++;
	if (level >= 10)
		sp++;
	if (level >= 11)
		sp++;
	if (level >= 13)
		sp++;
	if (level >= 14)
		spAll++;
	if (level >= 16)
		sp++;
	if (level >= 19)
		sp++;
	if (level >= 20)
		spAll++;

	if (rog.magic.pickSpellsFromAll)
		return spAll;
	else
		return sp;
}

rog.getNumCantripsKnown = function(level) {
	var cants = 2;

	if (level >= 10)
		cants++;

	return cants;
}

rog.getSpells = function(level, knownSpells) {
	console.log("INSIDE ROGUE SPELLS?");
	if (typeof knownSpells == 'undefined')
		knownSpells = [];
	if (typeof knownSpells[0] == 'undefined')
		knownSpells[0] = [];

	// pick specifically from abjuration/evocation
	rog.magic.pickSpellsFromAll = false;
	rog.magic.list = world.combineSpellLists(wiz.magic["Enchantment"].slice(0),wiz.magic["Illusion"].slice(0));

	var spells = pickAllSpells(3, level, rog, knownSpells.slice(0), false);
	spells[0] = ["Mage Hand"];

	// pick from all wiz spells on certain levels
	rog.magic.pickSpellsFromAll = true;
	rog.magic.list = wiz.magic.list.slice(0);
	knownSpells = world.combineSpellLists(knownSpells.slice(0), spells.slice(0));

	var allSpells = pickAllSpells(3, level, rog, knownSpells.slice(0), true);

	spells = world.combineSpellLists(spells.slice(0), allSpells.slice(0));

	// pick cantrips
	var cants = wiz.getNumCantripsKnown(level);
	spells[0] = skillChunk(rog.magic.list[0].slice(0), cants, knownSpells[0].slice(0));
	spells[0].push("Mage Hand");
	console.log("new cantrips: "+spells[0].join(", "));
	console.log(spells);

	return spells;
}

