var wrl = {};
wrl.class = "Warlock";
wrl.level = 1;
wrl.hDie = 8;
wrl.magic = [];
wrl.magic.arcanum = [];
wrl.features = [];
wrl.skills = [];
wrl.invocations = [];
wrl.proficiencies = [];
wrl.proficiencies.weapons = ["Simple"];
wrl.proficiencies.armor = ["Light"];
wrl.proficiencies.other = [];
wrl.saves = ["Wisdom", "Charisma"];
wrl.statMods = [0,0,0,0,0,0];
wrl.subclass = "";
wrl.extraHP = 0;
wrl.hasHex = false;
wrl.hasEldritch = false;

wrl.magic.list = [];
wrl.magic.list[0] = ["Create Bonfire","Frostbite","Magic Stone","Thunderclap","Blade Ward","Chill Touch","Eldritch Blast","Friends","Mage Hand","Minor Illusion","Poison Spray","Prestidigitation","True Strike"];
wrl.magic.list[1] = ["Armor of Agathys","Arms of Hadar","Burning Hands","Charm Person","Command","Comprehend Languages","Dissonant Whispers","Expeditious Retreat","Faerie Fire","Find Familiar","Hellish Rebuke","Hex","Illusory Script","Protection from Evil and Good","Sleep","Tasha's Hideous Laughter","Unseen Servant","Witch Bolt"];
wrl.magic.list[2] = ["Blindness/Deafness","Calm Emotions","Cloud of Daggers","Crown of Madness","Darkness","Detect Thoughts","Enthrall","Hold Person","Invisibility","Mirror Image","Misty Step","Phantasmal Force","Phantasmal Force","Ray of Enfeeblement","Scorching Ray","Shatter","Spider Climb","Suggestion"];
wrl.magic.list[3] = ["Blink","Clairvoyance","Counterspell","Dispel Magic","Fear","Fireball","Fly","Gaseous Form","Hunger of Hadar","Hypnotic Pattern","Magic Circle","Major Image","Plant Growth","Remove Curse","Sending","Stinking Cloud","Tongues","Vampiric Touch"];
wrl.magic.list[4] = ["Banishment","Blight","Dimension Door","Dominate Beast","Dominate Beast","Evard's Black Tentacles","Fire Shield","Greater Invisibility","Hallucinatory Terrain","Wall of Fire"];
wrl.magic.list[5] = ["Contact Other Plane","Dominate Person","Dominate Person","Dream","Flame Strike","Hallow","Hold Monster","Scrying","Seeming","Telekinesis"];
wrl.magic.list[6] = ["Arcane Gate","Circle of Death","Conjure Fey","Create Undead","Eyebite","Flesh to Stone","Mass Suggestion","True Seeing"];
wrl.magic.list[7] = ["Etherealness","Finger of Death","Forcecage","Plane Shift"];
wrl.magic.list[8] = ["Demiplane","Dominate Monster","Feeblemind","Glibness","Power Word Stun"];
wrl.magic.list[9] = ["Astral Projection","Foresight","Imprisonment","Power Word Kill","True Polymorph"];

wrl.reset = function() {
	wrl.name = "";
	wrl.level = 1;
	wrl.magic.spells = [];
	wrl.magic.arcanum = [];
	wrl.magic.slots = [];
	wrl.features = [];
	wrl.skills = [];
	wrl.invocations = [];
	wrl.pact = "";
	wrl.familiar = "";
	wrl.proficiencies = {};
	wrl.proficiencies.weapons = ["Simple"];
	wrl.proficiencies.armor = ["Light"];
	wrl.proficiencies.other = [];
	wrl.saves = ["Wisdom", "Charisma"];
	wrl.statMods = [0,0,0,0,0,0];
	wrl.subclass = "";
	wrl.extraHP = 0;
	wrl.hasHex = false;
	wrl.hasEldritch = false;
}

wrl.generateClass = function(level, person) {
	wrl.level = level;
	wrl.addFeatures(level);

	var newSpells = wrl.addSpells(level, person.spells.slice(0));
	// person.spells = person.spells.concat(newSpells);

	var newSkills = wrl.addSkills(level, person.skills.slice(0));
	// person.skills = person.skills.concat(newSkills);

	wrl.name = "Level " + wrl.level + " Warlock (" + wrl.subclass + ")";
}

wrl.printClass = function() {
	$(".basics p").text("Level " + wrl.level + " Warlock (" + wrl.subclass + ")");
	$("div.feat p").text(wrl.features.join(", "));
	$("div.skills p").html(makeSkillText(wrl.skills));
	$("div.profs p").html(makeProfText(wrl.proficiencies));
	$(".class .spells p").html(makeSpellText(wrl.magic.spells));
	$("div.slots").html("Invocations: "+wrl.invocations.join(", "));
	$("div.spells .spellnotes").text("Spells of 6th and above are from your Mystic Arcanum. This list includes spells from your invocations, but note that they might not use your spell slots.");
}

// -------------- FEATURES ----------
wrl.addFeatures = function(level) {
	wrl.chooseSubclass(level);
	wrl.features.push("Pact Magic");

	if (level >= 2) {
		wrl.features.push("Eldritch Invocations");
	} 

	if (level >= 3) {
		var pacts = ["Pact of the Chain","Pact of the Blade","Pact of the Tome"];
		if (wrl.subclass == "Seeker")
			pacts.push("Pact of the Star Chain");
		var p = pacts[randInt(0,pacts.length)];
		wrl.pact = p;

		if (p == "Pact of the Chain") {
			var f = ["bat","cat","crab","toad","hawk","lizard","octopus","owl","poisonous snake","fish","rat","raven","sea horse","spider","weasel","imp","pseudodragon","quasit","sprite"];
			wrl.familiar = f[randInt(0, f.length)];
			wrl.features.push("Pact Boon - "+p+" ("+wrl.familiar+")");
		}
		else
			wrl.features.push("Pact Boon - "+p);
	}

	if (level >= 11) {
		wrl.features.push("Mystic Arcanum");
	}
	if (level >= 20) 
		wrl.features.push("Eldritch Master");
}

wrl.chooseSubclass = function(level) {
	var patr = ["Archfey","Celestial","Fiend","Great Old One","Hexblade","Raven Queen","Seeker","Undying"];
	var p = patr[randInt(0,patr.length)];
	wrl.subclass = p;
	wrl.features.push("Otherworldly Patron - The "+p);

	patr["Archfey"] = [["Fey Presence"],"Misty Escape","Beguiling Defenses","Dark Delirium"];
	patr["Celestial"] = [["Bonus Cantrips"],"Healing Light","Radiant Soul","Celestial Resilience","Searing Vengeance"];
	patr["Fiend"] = [["Dark One's Blessing"],"Dark One's Own Luck","Fiendish Resilience","Hurl Through Hell"];
	// patr["Ghost in the Machine"] = []
	patr["Great Old One"] = [["Awakened Mind"],"Entropic Ward","Thought Shield","Create Thrall"];
	patr["Hexblade"] = [["Hex Warrior","Hexblade's Curse"],"Accursed Specter","Armor of Hexes","Master of Hexes"];
	patr["Raven Queen"] = [["Sentinel Raven"],"Soul of the Raven","Raven's Shield","Queen's Right Hand"];
	patr["Seeker"] = [["Shielding Aurora"],"Astral Refuge","Far Wanderer","Astral Sequestration"];
	patr["Undying"] = [["Among the Dead"],"Defy Death","Undying Nature","Indestructible Life"];

	for (var i = 0; i < patr[p][0].length; i++) {
		wrl.features.push(patr[p][0][i]);
	}

	if (level >= 6)
		wrl.features.push(patr[p][1]);
	if (level >= 10)
		wrl.features.push(patr[p][2]);
	if (level >= 14)
		wrl.features.push(patr[p][3]);

	if (p == "Hexblade")
		wrl.hasHex = true;
}

wrl.chooseInvocations = function(level, knownSpells) {
	var invos = [];
	var myInvos = [];
	invos = ["Armor of Shadows","Beast Speech","Devil's Sight","Eldritch Sight","Eyes of the Rune Keeper","Fiendish Vigor","Gaze of Two Minds","Mask of Many Faces","Misty Visions","Thief of Five Fates"];

	if (person.skills.indexOf(4) == -1 && person.skills.indexOf(13) == -1)
		invos.push("Beguiling Influence");

	if (wrl.hasEldritch) {
		invos.push("Agonizing Blast","Eldritch Spear","Grasp of Hadar","Lance of Lethargy","Repelling Blast");
		if (wrl.subclass == "Raven Queen")
			invos.push("Raven Queen's Blessing");
	}

	if (wrl.subclass == "Seeker")
		invos.push("Seeker's Speech");
	
	// Pick 2 at level 2
	myInvos = skillChunk(invos.slice(0), 2, []);
// 2 at 2, 3 at 5, 4 at 7, 5 at 9, 6 at 12, 7 at 15, 8 at 18

	if (wrl.pact == "Pact of the Tome") {
		invos.push("Aspect of the Moon","Book of Ancient Secrets");
		if (wrl.subclass == "Raven Queen")
			invos.push("Chronicle of the Raven Queen");
	}
	else if (wrl.pact == "Pact of the Chain")
		invos.push("Gift of the Ever-Living Ones","Voice of the Chain Master");
	else if (wrl.pact == "Pact of the Blade")
		invos.push("Improved Pact Weapon");

	if (level >= 5) {
		invos.push("Cloak of Flies","Gift of the Depths","Mire the Mind","One with Shadows","Sign of Ill Omen","Tomb of Levistus");
		if (wrl.pact == "Pact of the Blade")
			invos.push("Eldritch Smite","Thirsting Blade");
		if (wrl.hasHex)
			invos.push("Maddening Hex");
		if (wrl.subclass == "Fiend" && wrl.hasEldritch)
			invos.push("Kiss of Mephistopheles");

		myInvos = wrl.levelInvocations(myInvos.slice(0), invos.slice(0));
	}

	if (level >= 7) {
		invos.push("Bewitching Whispers","Dreadful Word","Ghostly Gaze","Sculptor of Flesh","Trickster's Escape");
		if (wrl.hasHex)
			invos.push("Relentless Hex");

		myInvos = wrl.levelInvocations(myInvos.slice(0), invos.slice(0));
	}

	if (level >= 9) {
		invos.push("Ascendant Step","Minions of Chaos","Otherworldly Leap","Whispers of the Grave");
		wrl.levelInvocations(myInvos, invos);
	}
	if (level >= 12) {
		if (wrl.pact == "Pact of the Blade")
			invos.push("Lifedrinker");

		myInvos = wrl.levelInvocations(myInvos.slice(0), invos.slice(0));
	}
	if (level >= 15) {
		invos.push("Master of Myriad Forms","Shroud of Shadow","Visions of Distant Realms","Witch Sight");
		if (wrl.pact == "Pact of the Chain")
			invos.push("Chains of Carceri");

		myInvos = wrl.levelInvocations(myInvos.slice(0), invos.slice(0));
	}
	if (level >= 18)
		myInvos = wrl.levelInvocations(myInvos.slice(0), invos.slice(0));

	console.log(invos);
	return myInvos;
}

wrl.levelInvocations = function(myInvos, invoList) {
	// maybe replace 1 invocation

	var r = Math.random();
	if (r < 0.25) {
		var x = randInt(0, myInvos.length);
		myInvos[x] = skillChunk(invoList.slice(0), 1, myInvos.slice(0))[0];
		console.log("we replaced something with "+myInvos[x]);
	}

	if (myInvos.includes("Sign of Ill Omen")) {
		console.log("We can hex because of Sign of Ill Omen!");
		wrl.hasHex = true;
	}
	// Add new ones
	myInvos = myInvos.concat(skillChunk(invoList.slice(0), 1, myInvos.slice(0)));
	// console.log(myInvos.join(", "));
	return myInvos;
}

wrl.addSkills = function(level, knownSkills) {
	var mySkills = [];
	var oSkills = [];

	// we already know we don't have this one
	if (wrl.invocations.includes("Beguiling Influence"))
		oSkills = [4, 13];
	
	mySkills = skillChunk([2,4,5,7,8,10,14], 2, oSkills.slice(0));
	mySkills = mySkills.concat(oSkills);
	wrl.skills = mySkills;
	return mySkills;
}

// var tomeRituals = ["Illusory Script","Identify","Identify","Identify","Find Familiar","Detect Disease and Poison","Detect Magic","Detect Magic","Detect Magic","Comprehend Languages","Unseen Servant","Tenser's Floating Disk","Speak with Animals","Speak with Animals","Purify Food and Drink","Alarm","Alarm"];

wrl.spellsfromInvo = function(tempAr) {
// SPELLS BASED ON INVOCATIONS
	console.log("Inside of spellsFromInvo: ");
	console.log(tempAr);
	console.log(wrl.invocations);
	var waSpells = [];
	waSpells[1] = [];
	if (tempAr.indexOf("Eldritch Sight") > -1) {
		waSpells[1].push("Detect Magic");
	}	
	if (tempAr.indexOf("Armor of Shadows") > -1) {
		waSpells[1].push("Mage Armor");
	}	
	if (tempAr.indexOf("Beast Speech") > -1) {
		waSpells[1].push("Speak with Animals");
	}	
	if (tempAr.indexOf("Fiendish Vigor") > -1) {
		waSpells[1].push("False Life");
	}	
	if (tempAr.indexOf("Mask of Many Faces") > -1) {
		waSpells[1].push("Disguise Self");
	}	
	if (tempAr.indexOf("Misty Visions") > -1) {
		waSpells[1].push("Silent Image");
	}	
	if (tempAr.indexOf("Thief of Five Fates") > -1) {
		waSpells[1].push("Bane");
	}	

	if (tempAr.indexOf("Otherworldly Leap") > -1) {
		waSpells[1].push("Jump");
	}
	waSpells[2] = [];
	waSpells[3] = [];
	waSpells[4] = [];
	waSpells[5] = [];
	if (tempAr.indexOf("Ascendant Step") > -1) {
		waSpells[2].push("Levitate");
	}
	if (tempAr.indexOf("Master of Myriad Forms") > -1) {
		waSpells[2].push("Alter Self");
	}
	if (tempAr.indexOf("Shroud of Shadow") > -1) {
		waSpells[2].push("Invisibility");
	}
	if (tempAr.indexOf("Visions of Distant Realms") > -1) {
		waSpells[4].push("Arcane Eye");
	}

	if (tempAr.indexOf("Mire the Mind") > -1) {
		waSpells[3].push("Slow");
	}	
	if (tempAr.indexOf("Whispers of the Grave") > -1) {
		waSpells[3].push("Speak with Dead");
	}
	if (tempAr.indexOf("Sign of Ill Omen") > -1) {
		waSpells[3].push("Bestow Curse");
	}	
	if (tempAr.indexOf("Bewitching Whispers") > -1) {
		waSpells[4].push("Compulsion");
	}	
	if (tempAr.indexOf("Dreadful Word") > -1) {
		waSpells[4].push("Confusion");
	}	
	if (tempAr.indexOf("Sculptor of Flesh") > -1) {
		waSpells[4].push("Polymorph");
	}
	if (tempAr.indexOf("Trickster's Escape") > -1) {
		waSpells[4].push("Freedom of Movement");
	}	
	if (tempAr.indexOf("Minions of Chaos") > -1) {
		waSpells[5].push("Conjure Elemental");
	}
	if (tempAr.indexOf("Chains of Carceri") > -1) {
		waSpells[5].push("Hold Monster");
	}

	return waSpells;
}



wrl.addSpells = function(level, knownSpells) {
	wrl.magic.slots = wrl.realSpellSlots(level);
	var spells = wrl.getSpells(level, knownSpells);
	wrl.magic.spells = spells;
	return spells;
}

wrl.getSpells = function(level, knownSpells) {
	var origSpells = [];
	origSpells[0] = [];
	if (typeof knownSpells == 'undefined')
		knownSpells = [];
	if (typeof knownSpells[0] == 'undefined')
		knownSpells[0] = [];
	if (typeof knownSpells[7] == 'undefined')
		knownSpells[7] = [];


	if (wrl.subclass == "Celestial") {
		origSpells[0] = ["Sacred Flame","Light"];
	}
	else if (wrl.subclass == "Raven Queen" && level >= 14) {
		origSpells[7] = ["Finger of Death"];
	}
	else if (wrl.subclass == "Undying") {
		origSpells[0] = ["Spare the Dying"];
	}

	if (wrl.pact == "Pact of the Tome") {
		var tomeSpells = wrl.tomeSpells(origSpells[0].slice(0));
		origSpells[0] = origSpells[0].concat(tomeSpells);
	}
	else if (wrl.pact == "Pact of the Chain") {
		origSpells[1] = ["Find Familiar"];
	}

	wrl.magic.list = world.combineSpellLists(wrl.magic.list.slice(0), wrl.spellsfromPatron(wrl.subclass));
	knownSpells = world.combineSpellLists(knownSpells.slice(0), origSpells.slice(0));
	var spells = pickAllSpells(1, level, wrl, knownSpells, true);

	var cants = wrl.getNumCantripsKnown(level);
	spells[0] = skillChunk(wrl.magic.list[0].slice(0), cants, knownSpells[0].slice(0));
	// console.log("new cantrips: "+spells[0].join(", "));
	spells = world.combineSpellLists(spells.slice(0), origSpells.slice(0));

	if (spells[0].includes("Eldritch Blast"))
		wrl.hasEldritch = true;
	if (spells[1].includes("Hex"))
		wrl.hasHex = true;

	if (level >= 2) {
		wrl.invocations = wrl.chooseInvocations(level, knownSpells);

		var invoSpells = wrl.spellsfromInvo(wrl.invocations.slice(0));
		spells = world.combineSpellLists(spells.slice(0), invoSpells.slice(0));
		// console.log("Your invocation spells are: " + invoSpells.join(", "));
	}
	if (level >= 11) {
		var arcSpells = wrl.arcanumSpells(level);
		spells = world.combineSpellLists(spells.slice(0), arcSpells.slice(0));
	}

	return spells;
}

wrl.tomeSpells = function(level, knownSpells) {
	var secrets = [];
	var total = 0;

	while (total < 3) {
		// var slots = bard.getSpellSlots(level);
		var cl = [bard,drd,clr,wiz,wrl,sor];
		var randCl = cl[randInt(0, cl.length)];
		console.log("Taking from "+randCl.class);

		if (typeof knownSpells == 'undefined')
			knownSpells = [];
		if (typeof knownSpells[0] == 'undefined')
			knownSpells[0] = [];

		// var toCheck = world.combineSpellLists(knownSpells[0].slice(0), bard.magic.spells[spLev].slice(0));
		var spell = skillChunk(randCl.magic.list[0], 1, knownSpells[0]);
		console.log("It's "+spell+"!");
		secrets = secrets.slice(0).concat(spell);
		total++;
	}

	return secrets;
}

wrl.arcanumSpells = function(level) {
	var spells = [];
	if (level >= 11)
		spells[6] = skillChunk(wrl.magic.list[6], 1, []);
	if (level >= 13)
		spells[7] = skillChunk(wrl.magic.list[7], 1, []);
	if (level >= 15)
		spells[8] = skillChunk(wrl.magic.list[8], 1, []);
	if (level >= 17)
		spells[9] = skillChunk(wrl.magic.list[9], 1, []);

	return spells;
}

wrl.spellsfromPatron = function(p) {
	var allP = ["Archfey","Celestial","Fiend","Great Old One","Hexblade","Raven Queen","Seeker","Undying"];
	
	allP["Archfey"] = [[],["Faerie Fire","Sleep"],["Calm Emotions","Phantasmal Force"],["Blink","Plant Growth"],["Dominate Beast"],["Greater Invisibility"],["Dominate Person","Seeming"]];
	allP["Celestial"] = [[],["Guiding Bolt","Cure Wounds"],["Flaming Sphere","Lesser Restoration"],["Daylight","Revivify"],["Guardian of Faith","Wall of Fire"],["Flame Strike","Greater Restoration"]];
	allP["Fiend"] = [[],["Burning Hands","Command"],["Blindness/Deafness","Scorching Ray"],["Fireball","Stinking Cloud"],["Fire Shield","Wall of Fire"],["Flame Strike","Hallow"]];
	allP["Great Old One"] = [[],["Dissonant Whispers","Tasha's Hideous Laughter"],["Detect Thoughts","Phantasmal Force"],["Clairvoyance","Sending"],["Dominate Beast","Evard's Black Tentacles"],["Dominate Person","Telekinesis"]];
	allP["Hexblade"] = [[],["Shield","Wrathful Smite"],["Blur","Branding Smite"],["Blink","Elemental Weapon"],["Phantasmal Killer","Staggering Smite"],["Banishing Smite","Cone of Cold"]];
	allP["Raven Queen"] = [[],["False Life","Sanctuary"],["Silence","Spiritual Weapon"],["Feign Death","Speak with Dead"],["Ice Storm","Locate Creature"],["Commune","Cone of Cold"]];
	allP["Seeker"] = [[],["Feather Fall","Jump"],["Levitate","Locate Object"],["Clairvoyance","Sending"],["Arcane Eye","Locate Creature"],["Legend Lore","Passwall"]];
	allP["Undying"] = [[],["False Life","Ray of Sickness"],["Blindness/Deafness","Silence"],["Feign Death","Speak with Dead"],["Aura of Life","Death Ward"],["Contagion","Legend Lore"]];

	return allP[p];
}

wrl.getSpellSlots = function(level) {
	var slots = [];
	slots[1] = 1;
	if (level >= 3)
		slots[2] = 1;
	if (level >= 5)
		slots[3] = 1;
	if (level >= 7)
		slots[4] = 1;
	if (level >= 9)
		slots[5] = 1;

	return slots;
}

wrl.realSpellSlots = function(level) {
	console.log("what?");
	var sp = 1;
	if (level >= 2)
		sp++;
	if (level >= 11)
		sp++;
	if (level >= 17)
		sp++;

	return sp;
}

wrl.getNumSpellsKnown = function(level) {
	var sp = Math.min(level + 1, 10);

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

wrl.getNumCantripsKnown = function(level) {
	var cant = 2;
	if (level >= 4)
		cant++;
	if (level >= 10)
		cant++;

	return cant;
}

