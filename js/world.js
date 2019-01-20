var world = {};
world.races = [aasm, drgb, drf, elf, gnm, helf, hlf, horc, humn, tief];
world.monsters = [frbl, bugb, gnsi, gobl, hobl, glth, kenk, kobl, lzrd, orc, tbxi, trit, ynti];
world.races = world.races.slice(0).concat(world.monsters.slice(0));

world.classes = [bbn, bard, clr, drd, fght, mnk, pal, rngr, rog, sor, wrl, wiz];
world.casters = [bard, clr, drd, pal, rngr, sor, wiz];
world.stats = ["Strength","Dexterity","Constitution","Intelligence","Wisdom","Charisma"];

world.languages = {};
world.languages.standard = ["Common","Dwarvish","Elvish","Giant","Gnomish","Goblin","Halfling","Orc"];
world.languages.exotic = ["Abyssal","Celestial","Draconic","Deep Speech","Infernal","Primordial","Sylvan","Undercommon","Druidic"];
world.skills = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
world.skillText = ["Acrobatics","Animal Handling","Arcana","Athletics","Deception","History","Insight","Intimidation","Investigation","Medicine","Nature","Perception","Performance","Persuasion","Religion","Sleight of Hand","Stealth","Survival"];
world.weapons = [];
world.weapons.martial = ["Battleaxe","Flail","Glaive","Greataxe","Greatsword","Halberd","Lance","Longsword","Maul","Morningstar","Pike","Rapier","Scimitar","Shortsword","Trident","War Pick","Warhammer","Blowgun","Hand crossbow","Heavy crossbow","Net"];

world.instruments = ["Lute", "Flute","Harp", "Fiddle","Pipes", "Drums", "Bagpipes","Dulcimer","Lyre","Horn","Guitar","Pan flute","Shawm","Viol"];
world.games = ["Dice games", "Dragonchess","Playing cards","Three-Dragon Ante"];
world.artisan = ["Alchemist","Armorer","Brewer","Calligrapher","Carpenter","Cartographer","Cobbler","Cook","Glassblower","Jeweler","Leatherworker","Mason","Painter","Potter","Shipwright","Smith","Tinker","Wagon-maker","Weaver","Woodcarver"];

world.rollStats = function(rollCount, mods) {
	stats = [0,0,0,0,0,0];

	// each stat
	for (i = 0; i < stats.length; i++) {
		total = 0;
		
		isFair = false;
		while (!isFair) { // will the racemod raise stat above max?
			isFair = false;
			s = world.rollOneStat(rollCount);
			if (s + mods[i] <= 20) {
				stats[i] = s + mods[i];
				isFair = true;
			}
		}
	}
	return stats;
}

world.raiseStat = function(stat, mod) {

}

world.rollOneStat = function(rollCount) {
	// roll x times
	next = [];
	for (j = 0; j < rollCount; j++) {
		next[j] = randInt(1,7);
	}

	// remove lowest x
	r = rollCount - 3;
	for (q = 0; q < r; q++){
		next = removeLowest(next);
	}

	s = Math.min(next.reduce((a, b) => a + b, 0), 20);
	return s;
}

world.getModifier = function(s) {
	var mod = 0;
	
	switch (s) {
	case 1:
		mod = -5; break;
	case 2:
	case 3:
		mod = -4; break;
	case 4:
	case 5:
		mod = -3; break;
	case 6:
	case 7:
		mod = -2; break;
	case 8:
	case 9:
		mod = -1; break;
	case 10:
	case 11:
		mod = 0; break;
	case 12:
	case 13:
		mod = 1; break;
	case 14:
	case 15:
		mod = 2; break;
	case 16:
	case 17:
		mod = 3; break;
	case 18:
	case 19:
		mod = 4; break;
	case 20:
	case 21:
		mod = 5; break;
	case 22:
	case 23:
		mod = 6; break;
	case 24:
	case 25:
		mod = 7; break;
	}

	return mod;
}

world.rollHealth = function(die, level, conMod) {
	var health = die + conMod;
	
	for (i = 1; i < level; i++) {
		min = Math.floor(die * .6666);
		h = Math.max(randInt(1, die + 1), min);
		health += h + conMod;
	}

	return health;
}

world.pickLanguages = function(knownLangs, availLangs, numToLearn) {
	// if (typeof availLangs == undefined) {
		var x = Math.random();
		if (x < 0.2)
			availLangs = world.languages.exotic;
		else
			availLangs = world.languages.standard;
	// }
	var newLangs = skillChunk(availLangs, numToLearn, knownLangs);
	return newLangs;
}

world.combineProficiencies = function(list1, list2) {
	if (typeof list1.weapons == 'undefined')
		list1.weapons = [];
	if (typeof list1.armor == 'undefined')
		list1.armor = [];
	if (typeof list1.other == 'undefined')
		list1.other = [];
	var exp = [];

	exp.weapons = concatBlock(list1.weapons.slice(0), list2.weapons.slice(0));
	exp.armor = concatBlock(list1.armor.slice(0), list2.armor.slice(0));
	exp.other = concatBlock(list1.other.slice(0), list2.other.slice(0));
	
	return exp;
}

world.combineSpellLists = function(list1, list2) {
	if (typeof list1 == 'undefined')
		list1 = [];
	if (typeof list2 == 'undefined')
		list1 = [];

	var max = Math.max(list1.length, list2.length);

	var all = [];
	for (var i = 0; i < max; i++) {
		if (typeof list1[i] == 'undefined')
			list1[i] = [];
		if (typeof list2[i] == 'undefined')
			list2[i] = [];

		all[i] = concatBlock(list1[i], list2[i]);
	}

	return all;
}

function replaceSpell(slots, beforeSpells, mySpells, guy, knownSpells) {
	// console.log("switching out a spell! Here's what we've got:");
	// console.log(beforeSpells.join(", "));
	// console.log(mySpells.join(", "));
	var areSpellsDiff = false;
	var levFrom, levTo, spellOut, spellIn, removeIndex;

	while (!areSpellsDiff) {
		// console.log("Starting the spell diff loop");
		levFrom = randInt(1, slots.length);
		levTo = randInt(1, slots.length);

		if (typeof beforeSpells[levFrom] == 'undefined')
			continue;
		if (typeof mySpells[levTo] == 'undefined')
			mySpells[levTo] = [];
		if (typeof knownSpells[levTo] == 'undefined')
			knownSpells[levTo] = [];
		
		removeIndex = randInt(0, beforeSpells[levFrom].length);
		spellOut = beforeSpells[levFrom][removeIndex];
		spellIn = skillChunk(guy.magic.list[levTo].slice(0), 1, mySpells[levTo].slice(0));
		
		if (knownSpells[levTo].includes(spellIn))
			continue;
		if (spellOut != spellIn)
			areSpellsDiff = true;
	}
	// console.log("killing "+spellOut+" at "+levFrom+" for "+spellIn+" at "+levTo);
	// console.log("we should be removing "+spellOut+" at: "+removeIndex+" from level "+levFrom);
	mySpells[levFrom].splice(removeIndex, 1);
	mySpells[levTo] = mySpells[levTo].concat(spellIn);
	// console.log(mySpells.join(", "));
	return mySpells;
}

function pickAllSpells(base, level, guy, knownSpells, replace) {
	var mySpells = [];
	var currentTotal = 0;

	// mySpells[1] = skillChunk(guy.magic.list[1].slice(0), 2, []);
	// console.log(mySpells.join(", "));
	// currentTotal = 2;

	for (var i = base; i <= level; i++) {
		var tempSlots = guy.getSpellSlots(i);
		var shouldBeTotal = guy.getNumSpellsKnown(i);
		// console.log("Slots: ");
		
		var difference = shouldBeTotal - currentTotal;
		// console.log("Level "+i+": We should have "+shouldBeTotal+" spells, have "+currentTotal+"spells");
		var beforeSpells = mySpells.slice(0);


		if (difference > 0) { // if we need to learn something new
			var x = randInt(1, tempSlots.length);
			// console.log("let's add to: "+x);
			if (typeof mySpells[x] == 'undefined')
				mySpells[x] = [];
			if (typeof knownSpells[x] == 'undefined')
				knownSpells[x] = [];

			var toCheck = mySpells[x].slice(0).concat(knownSpells[x].slice(0));

			var spell = skillChunk(guy.magic.list[x].slice(0), difference, toCheck);
			// console.log("adding "+spell);
			mySpells[x] = mySpells[x].concat(spell);
			// console.log(mySpells);
			currentTotal += difference;
			// console.log(mySpells.join(", "));
		}

		// possibly switch spells out every level
		if (replace && i >= 2) {
			var chance = Math.random();
			if (chance < 0.25) {
				mySpells = replaceSpell(tempSlots, beforeSpells.slice(0), mySpells.slice(0), guy, knownSpells.slice(0));
			}
		}
	}

	return mySpells;
}

// ------- UTILITY ------------------

// Combine two lists (they probably have the same indices, like spells/profs/etc)
function concatBlock(list1, list2) {
	var all = [];

	if (list1.length > 0 && list2.length > 0) {
		all = list1.concat(list2);
	}
	else if (list1.length == 0 && list2.length > 0) {
		all = list2;
	}
	else if (list1.length > 0 && list2.length == 0) {
		all = list1;
	}
	else {
		all = [];
	}

	return all;
}

// From a list of things, remove the lowest number (for rolling stats)
function removeLowest(list) {
	index = -1;
	lowest = 100;
	for (var i = 0; i < list.length; i++) {
		if (list[i] < lowest) {
			index = i;
			lowest = list[i]
		}
	}
	list.splice(index, 1);
	return list;
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function pickUnique(chooseFrom, checkWith) {
	shouldAdd = false;

	// if (typeof checkWith == undefined)
	// 	checkWith = [];

	while (!shouldAdd) {
		x = randInt(0, chooseFrom.length);
		if (!checkWith.includes(chooseFrom[x])) {
			return chooseFrom[x];
		}
	}
}

function skillChunk(skillList, limit, knownSkills) {
	var newSkills = [];
	// console.log(knownSkills);

	// newSkills.length = 0;
	// console.log("IN SKILLCHUNK");
	// console.log(skillList);
	// console.log(knownSkills);
	if (typeof knownSkills == undefined)
		knownSkills = [];

	for (i = 0; i < limit; i++) {
		var s = 0;
		s = pickUnique(skillList, knownSkills);
		knownSkills.push(s);
		// console.log(knownSkills);
		newSkills.push(s);
	}
	// console.log(newSkills);
	// knownSkills = [];
	return newSkills;
}

function makeStatText(stats, mods) {
	var str = "<span>" + person.hp + "HP, +"+person.profBonus+" Proficiency Bonus, Speed: "+person.speed+"ft</span><br />";
	str += "<span>";

	for (i = 0; i < stats.length; i++) {
		var modText = "";
		if (mods[i] >= 0)
			modText = "(+"+mods[i]+")";
		else
			modText = "("+mods[i]+")";

		str += world.stats[i] + ": "+ stats[i]+" "+modText+", ";
	}
	str += "</span><br />";

	return str;
}

function makeSkillText(skills) {
	var str = "<span>";
	var skillList = [];
	for (i = 0; i < skills.length; i++) {
		skillList.push(world.skillText[skills[i]]);
	}
	str += skillList.sort().join(", ");
	// str += person.languages.toString() + "</span><br />";
	str += "</span><br />";
	
	return str;
}

function makeProfText(p) {
	var str = "<ul>";
	if (p.weapons && p.weapons.length > 0)
		str += "<li>Weapons: "+p.weapons.join(", ") + "</li>";
	if (p.armor && p.armor.length > 0)
		str += "<li>Armor: "+p.armor.join(", ") + "</li>";
	if (p.other && p.other.length > 0)
		str += "<li>Other: "+p.other.join(", ") + "</li>";

	str += "</ul>";
	return str;
}

function makeSpellText(spells) {
	// console.log("spelltext");
	// console.log(spells);
	var str = "<ul>";
	for (var i = 0; i < spells.length; i++) {
		// console.log(spells[i]);
		if (spells[i]) {
			str += "<li>"+intervalHelper(i)+" level: " +spells[i].sort().join(", ")+ "</li>";
		}
	}
	str += "</ul>";
	return str;
}

function printSpellSlots(slots) {
	var str = "<span>Slots: ";
	var mySlots = [];
	// console.log("My slots are: ");
	// console.log(slots);
	for (var i = 1; i < slots.length; i++) {
		mySlots[i] = slots[i] + " of " + intervalHelper(i) + " level";
	}
	str += mySlots.join(", ");
	str += "</span>";
	return str;
}

function intervalHelper(num) {
	if (num == 1)
		return "1st";
	else if (num == 2)
		return "2nd";
	else if (num == 3)
		return "3rd";
	else
		return num + "th";
}

