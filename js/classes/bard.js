bard = {};
bard.class = "Bard";
bard.short = "bard";
bard.level = 1;
bard.hDie = 8;
bard.magic = [];
bard.magic.spells = [];
bard.features = [];
bard.skills = [];
bard.expertise = [];
bard.hasJOAT = false;
bard.proficiencies = [];
bard.proficiencies.weapons = ["Simple", "Crossbow", "Longsword", "Rapier", "Shortsword"];
bard.proficiencies.armor = ["Light"];
bard.proficiencies.other = [];
bard.saves = ["Dexterity", "Charisma"];
bard.subclass = "";

bard.magic.list = [];
bard.magic.list[0] = ["Blade Ward","Dancing Lights","Friends","Light","Mage Hand","Mending","Message","Minor Illusion","Prestidigitation","Thunderclap","True Strike","Vicious Mockery"];
bard.magic.list[1] = ["Animal Friendship","Bane","Charm Person","Comprehend Languages","Cure Wounds","Detect Magic","Disguise Self","Dissonant Whispers","Earth Tremor","Faerie Fire","Feather Fall","Healing Word","Heroism","Identify","Illusory Script","Longstrider","Silent Image","Sleep","Speak with Animals","Tasha's Hideous Laughter","Thunderwave","Unseen Servant"];
bard.magic.list[2] = ["Animal Messenger","Blindness/Deafness","Calm Emotions","Cloud of Daggers","Crown of Madness","Detect Thoughts","Enhance Ability","Enthrall","Heat Metal","Hold Person","Invisibility","Knock","Lesser Restoration","Locate Animals or Plants","Locate Object","Magic Mouth","Phantasmal Force","Pyrotechnics","See Invisibility","Shatter","Silence","Skywrite","Suggestion","Warding Wind","Zone of Truth"];
bard.magic.list[3] = ["Bestow Curse","Clairvoyance","Dispel Magic","Fear","Feign Death","Glyph of Warding","Hypnotic Pattern","Leomund’s Tiny Hut","Major Image","Nondetection","Plant Growth","Sending","Speak with Dead","Speak with Plants","Stinking Cloud","Tongues"];
bard.magic.list[4] = ["Compulsion","Confusion","Dimension Door","Freedom of Movement","Greater Invisibility","Hallucinatory Terrain","Locate Creature","Polymorph"];
bard.magic.list[5] = ["Animate Objects","Awaken","Dominate Person","Dream","Geas","Greater Restoration","Hold Monster","Legend Lore","Mass Cure Wounds","Mislead","Modify Memory","Planar Binding","Raise Dead","Scrying","Seeming","Teleportation Circle"];
bard.magic.list[6] = ["Eyebite","Find the Path","Guards and Wards","Mass Suggestion","Otto's Irresistible Dance","Programmed Illusion","True Seeing"];
bard.magic.list[7] = ["Etherealness","Forcecage","Mirage Arcane","Mordenkainen's Magnificient Mansion","Mordenkainen's Sword","Project Image","Regenerate","Resurrection","Symbol","Teleport"];
bard.magic.list[8] = ["Dominate Monster","Feeblemind","Glibness","Mind Blank","Power Word Stun"];
bard.magic.list[9] = ["Foresight","Mass Polymorph","Power Word Heal","Power Word Kill","Psychic Scream","True Polymorph"];

bard.reset = function(classes) {
	bard.name = "Bard";
	bard.level = 1;
	bard.magic.spells = [];
	bard.magic.slots = [];
	bard.features = [];
	bard.skills = [];
	bard.expertise = [];
	bard.proficiencies = {};
	bard.proficiencies.weapons = ["Simple", "Crossbow", "Longsword", "Rapier", "Shortsword"];
	bard.proficiencies.armor = ["Light"];
	bard.proficiencies.other = [];
	bard.saves = ["Dexterity", "Charisma"];
	bard.subclass = "";
	bard.hasJOAT = false;

	var list = ["Lore","Valor"];
	if (typeof classes != 'undefined')
		bard.subclassList = list.slice(0).concat(classes.slice(0));
	else
		bard.subclassList = list;
}

bard.generateClass = function(level, person) {
	bard.level = level;
	bard.addFeatures(level, person.proficiencies.other.slice(0));

	newSkills = bard.addSkills(level, person.skills.slice(0));
	// person.skills = person.skills.concat(newSkills);

	newSpells = bard.addSpells(level, person.spells);
	bard.name = "Level " + bard.level + " Bard (" + bard.subclass + ")";
	// person.spells = person.spells.concat(newSpells);
}

bard.printClass = function() {
	$(".class .basics p").text("Level " + bard.level + " Bard (" + bard.subclass + ")");
	$(".class .feat p").text(bard.features.join(", "));
	$(".class .skills p").html(makeSkillText(bard.skills) + "<br />Expertise: "+makeSkillText(bard.expertise));
	$(".class .spells p").html(makeSpellText(bard.magic.spells));
	$(".class .profs p").html(makeProfText(bard.proficiencies));
	$("div.slots").html(printSpellSlots(bard.magic.slots));
}

bard.getAC = function() {
	return 0;
}

bard.getSpellDC = function(mods, prof) {
	return 8 + mods[5] + prof;
}

// -------------- FEATURES ----------
bard.addFeatures = function(level, knownProfs) {
	console.log("Now we're adding features!");
	var inspiration = bard.bardicInspiration(level);
	bard.features.push("Spellcasting", inspiration);

	var inst = skillChunk(world.instruments, 3, knownProfs);
	bard.proficiencies.other = inst;

	if (level >= 2) {
		var restdie = "";
		if (level >= 9) {
			restdie = "(d8)";
		} else {
			restdie = "(d6)";
		}

		bard.features.push("Jack of All Trades", "Song of Rest " + restdie);
		bard.hasJOAT = true;
	}

	if (level >= 3) {
		bard.chooseSubclass(level);
		bard.features.push("Expertise");
	}

	if (level >= 5) {
		bard.features.push("Font of Inspiration");
	}
	if (level >= 6) {
		bard.features.push("Countercharm");
	}
	if (level >= 10) {
		bard.features.push("Magical Secrets");
	}
	if (level == 20) {
		bard.features.push("Superior Inspiration");
	}
	console.log("done with features!");
}

bard.chooseSubclass = function(level) {
	var colleges = bard.subclassList.slice(0);
	var x = random.pick(colleges);
	// var x = colleges[randInt(0, colleges.length)];
	// x = "Lore"; // TODO CHANGE ME BACK
	bard.subclass = "College of " + x;
	
	colleges["Glamour"] = [["Mantle of Inspiration", "Enthralling Performance"], "Mantle of Magesty", "Unbreakable Majesty"];
	colleges["Lore"] = [["Bonus Proficiencies", "Cutting Words"], "Additional Magical Secrets", "Peerless Skill"];
	colleges["Swords"] = [["Bonus Proficiencies", "Fighting Style", "Blade Flourish"], "Extra Attack", "Master's Flourish"];
	colleges["Valor"] = [["Bonus Proficiencies", "Combat Inspiration"], "Extra Attack", "Battle Magic"];
	colleges["Whispers"] = [["Psychic Blades", "Words of Terror"], "Mantle of Whispers", "Shadow Lore"];

	for (i = 0; i < colleges[x].length; i++) {
		bard.features.push(colleges[x][0][i]);
	}
	if (level >= 6)
		bard.features.push(colleges[x][1]);
	if (level >= 14)
		bard.features.push(colleges[x][2]);

	if (x == "Swords") {
		bard.proficiencies.armor.push("Medium");
		bard.proficiencies.weapons.push("Scimitar");

		var f = bard.features.indexOf("Fighting Style");
		// var y = Math.random();
		var style = "";
		if (random.bool())
			style = "Dueling";
		else
			style = "Two-Weapon Fighting";

		bard.features[f] = "Fighting Style - " + style;
	}
	else if (x == "Valor") {
		bard.proficiencies.armor.push("Medium", "Shields");
		bard.proficiencies.weapons.push("Martial");
	}
}

bard.bardicInspiration = function(level) {
	var inspo = "(d6)";

	if (level > 9) {
		inspo = "(d10)";
	}
	else if (level > 4) {
		inspo = "(d8)";
	}
	else {
		inspo = "(d6)";
	}

	var inspirFull = "Bardic Inspiration " + inspo;
	return inspirFull;
}

// -------------- SKILLS ------------

bard.addSkills = function(level, knownSkills) {
	var k = knownSkills.valueOf();
	var skillCap = 3;
	var newSkills = [];
	var skills = [0,4,7,9,11,12,13,15,16];

	newSkills = skillChunk(skills, skillCap, knownSkills.slice(0));
	bard.skills = newSkills;
	console.log(bard.skills.toString());
	
	if (bard.subclass == "College of Lore") {
		var loreskills = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
		var toCheck = newSkills.slice(0).concat(knownSkills.slice(0));
		newSkills = skillChunk(loreskills, skillCap, toCheck);
		bard.skills = bard.skills.concat(newSkills.slice(0));
		console.log(bard.skills.toString());
	}

	// pick expertises
	if (level >= 3) {
		var allSkills = bard.skills.slice(0).concat(knownSkills.slice(0));
		bard.addExpertise(level, allSkills.slice(0));
	}

	// console.log("HOW ABOUT NOW");
	return bard.skills.slice(0);
}

bard.halfProfSkills = function(level, skills) {

}

bard.addExpertise = function(level, allSkills) {
	// console.log("start exprs");
	var expCap = 2;
	if (level >= 10) {
		expCap += 2
	}

	expers = skillChunk(allSkills, expCap, []);
	bard.expertise = expers;
	// console.log("stop exprs");
}

// -------------- SPELLS ------------

bard.addSpells = function(level, personSpells) {
	bard.magic.slots = bard.getSpellSlots(level);
	var numSpellsKnown = bard.getNumSpellsKnown(level);
	bard.magic.spells = bard.getSpells(level, personSpells);
	return bard.magic.spells;
}

bard.getSpellSlots = function(level) {
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

bard.getNumSpellsKnown = function(level) {
	var sp = level + 3;
	if (level >= 12)
		sp--;
	if (level >= 16)
		sp--;
	if (level >= 19)
		sp--;
	if (level >= 20)
		sp--;

	return sp;
}

bard.getNumCantripsKnown = function(level) {
	var cants = 2;

	if (level >= 4)
		cants++;
	if (level >= 10)
		cants++;

	return cants;
}

bard.magicalSecrets = function(level, knownSpells) {
	var secrets = [];
	var total = 0;

	while (total < 2) {
		var slots = bard.getSpellSlots(level);
		var cl = random.pick(world.casters);
		// var spLev = randInt(0, slots.length+1);
		var spLev = random.integer(0, slots.length);
		// console.log("Taking "+spLev+"th level from "+cl.class);

		if (typeof cl.magic.list[spLev] == 'undefined')
			continue;
		if (typeof bard.magic.spells[spLev] == 'undefined')
			bard.magic.spells[spLev] = [];
		if (typeof knownSpells[spLev] == 'undefined')
			knownSpells[spLev] = [];
		if (typeof secrets[spLev] == 'undefined')
			secrets[spLev] = [];

		var toCheck = world.combineSpellLists(knownSpells[spLev].slice(0), bard.magic.spells[spLev].slice(0));
		var spell = skillChunk(cl.magic.list[spLev], 1, toCheck);
		// console.log("It's "+spell+"!");
		secrets[spLev] = secrets[spLev].slice(0).concat(spell);
		total++;
	}

	return secrets;
}

bard.getSpells = function(level, knownSpells) {
	// var bardSpells = [];
	var bardSpells = pickAllSpells(1, level, bard, knownSpells, true);

	if (typeof knownSpells[0] == 'undefined')
		knownSpells[0] = [];
	var cants = bard.getNumCantripsKnown(level);
	bardSpells[0] = skillChunk(bard.magic.list[0].slice(0), cants, knownSpells[0].slice(0));
	// console.log(bardSpells);
	
	var secrets = [];
	var toCheck = world.combineSpellLists(knownSpells.slice(0), bardSpells.slice(0));

	if (level >= 10) {
		secrets = bard.magicalSecrets(10, toCheck);
		toCheck = world.combineSpellLists(secrets.slice(0), toCheck.slice(0));
	}
	if (level >= 14) {
		secrets = world.combineSpellLists(bard.magicalSecrets(14, toCheck), secrets);
		toCheck = world.combineSpellLists(secrets.slice(0), toCheck.slice(0));
	}
	if (level >= 18) {
		secrets = world.combineSpellLists(bard.magicalSecrets(18, toCheck), secrets);
		toCheck = world.combineSpellLists(secrets.slice(0), toCheck.slice(0));
	}
	if (level >= 6 && bard.subclass == "College of Lore") {
		secrets = world.combineSpellLists(bard.magicalSecrets(6, toCheck), secrets);
		toCheck = world.combineSpellLists(secrets.slice(0), toCheck.slice(0));	
	}

	// console.log(secrets);
	bardSpells = world.combineSpellLists(bardSpells, secrets);

	bard.magic.spells = bardSpells;
	return bardSpells;
}

