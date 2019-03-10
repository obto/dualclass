var person = {};
person.bg = "";
person.level = 1;
person.race = "";
person.stats = [];
person.modifiers = [];
person.hp = 0;
person.profBonus = 2;
person.initiative = 0;
person.saves = [];
person.languages = [];
person.extraLangs = 0;
person.classes = [];
person.spells = [];
person.skills = [];
person.expertise = [];
person.speed = 0;
person.proficiencies = {};
person.proficiencies.weapons = [];
person.proficiencies.armor = [];
person.proficiencies.other = [];
person.immunity = [];
person.resistance = [];
person.advantage = [];
person.statsMax = [20,20,20,20,20,20];

person.restart = function() {
	person.bg = "";
	person.level = 1;
	person.stats = [];
	person.modifiers = [];
	person.hp = 0;
	person.profBonus = 2;
	person.initiative = 0;
	person.saves = [];
	person.languages = [];
	person.extraLangs = 0;
	person.classes = [];
	person.spells = [];
	person.skills = [];
	person.expertise = [];
	person.speed = 0;
	person.proficiencies = {};
	person.proficiencies.weapons = [];
	person.proficiencies.armor = [];
	person.proficiencies.other = [];
	person.immunity = [];
	person.resistance = [];
	person.advantage = [];
	person.statsMax = [20,20,20,20,20,20];
	person.class1 = [];
	person.class2 = [];
	person.race = [];
}

person.buildPerson = function(lev, r, cl, opt) {
	console.log("WHAT ARE MY OPTIONS?");
	console.log(opt);
	person.restart();

	var classLevel = lev;
	person.level = classLevel;

	var myBg = bgs.chooseBg(person);
	person.roundUp(myBg);
	interface.printRace(myBg, ".bg", "Background");
	
	var myRace = r;
	r.reset();
	myRace.generateRace(person);
	person.roundUp(myRace);
	interface.printRace(myRace, ".race", "Race");

	person.buildStats(myRace, classLevel);

	var myClass = cl;
	console.log(myClass);
	if (typeof opt != 'undefined' && myClass.class in opt) {
		myClass.reset(opt[myClass.class]);
	}
	else
		myClass.reset();

	myClass.generateClass(classLevel, person);
	interface.printRace(myClass, ".class", "Class 1");
	person.roundUp(myClass);
	person.class1 = myClass;
	console.log("class 1 complete------------------------------");

	var myClass2 = random.pick(world.classes);
	while (myClass2.name == myClass.name)
		var myClass2 = random.pick(world.classes);

	if (typeof opt != 'undefined' && myClass2.class in opt)
		myClass2.reset(opt[myClass2.class]);
	else
		myClass2.reset();
	myClass2.generateClass(classLevel, person);
	interface.printRace(myClass2, ".class2", "Class 2");
	person.roundUp(myClass2);
	person.class2 = myClass2;
	console.log("class 2 complete------------------------------");

	person.getHP(myRace, myClass, myClass2, classLevel);

	var newLangs = world.pickLanguages(person.languages.slice(0), [], person.extraLangs);
	person.languages = person.languages.concat(newLangs);

	$.uniqueSort(person.skills);
	person.printPerson();
}

person.printPerson = function() {
	$(".person .stats").html(function() {
		var str = makeStatText(person.stats, person.modifiers);
		str += makeSaveText(person.saves, person.modifiers, person.profBonus);
		str += makeSkillTextNew(person.skills, person.expertise, person.modifiers, person.profBonus);
		return str;

	});
	$(".person .skills p").html(function() {
		var str = "";
		str += makeSkillText(person.skills);
		if ("expertise" in person && person.expertise.length > 0) {
			str += "<br />Expertise: "+makeSkillText(person.expertise);
		}
		str += "<br />Languages: "+Array.from(new Set(person.languages)).join(", ");
		str += printAdvantages(person.immunity, person.advantage, person.resistance);
		return str;
	});
	$(".person .profs p").html(makeProfText(person.proficiencies));
	if (person.spells.length > 0) {
		$(".person .spells").show();
		$(".person .spells p").html(makeSpellText(person.spells));
	}
	else {
		$(".person .spells").hide();
	}
	
	// $("div.rSpells p").text(elf.spells + "");
	// $("div.rProfs p").text(person.proficiencies.weapons.toString() + person.proficiencies.armor.toString());
}

person.roundUp = function(r) {
	var recent = $.extend({}, r);
	console.log(recent.name);
	console.log(recent);
	if ("proficiencies" in recent) {
		// console.log(recent.proficiencies);
		person.proficiencies = world.combineProficiencies(recent.proficiencies, person.proficiencies);
	}
	
	if ("skills" in recent) {
		person.skills = person.skills.slice(0).concat(recent.skills.slice(0));
	}

	if ("spells" in recent) {
		person.spells = recent.spells;
		// person.spells = world.combineSpellLists(person.spells.slice(0), recent.spells.slice(0));
	}
	else if ("magic" in recent && "spells" in recent.magic) {
		person.spells = world.combineSpellLists(person.spells.slice(0), recent.magic.spells.slice(0));
	}

	if ("speed" in recent) {
		person.speed += recent.speed;
	}
	if ("saves" in recent) {
		person.saves = person.saves.slice(0).concat(recent.saves.slice(0));
		person.saves = Array.from(new Set(person.saves));
	}
	if ("languages" in recent) {
		person.languages = person.languages.concat(recent.languages.slice(0));
	}
	if ("extraLangs" in recent) {
		person.extraLangs += recent.extraLangs;
	}
	if ("expertise" in recent) {
		person.expertise = person.expertise.concat(recent.expertise.slice(0));
	}
	if ("immunity" in recent) {
		person.immunity = person.immunity.concat(recent.immunity.slice(0));
	} 
	if ("advantage" in recent) {
		person.advantage = person.advantage.concat(recent.advantage.slice(0));
	}
	if ("resistance" in recent) {
		person.resistance = person.resistance.concat(recent.resistance.slice(0));
	}
	// if ("statsMax" in recent) {
	// 	person.statsMax = recent.statsMax.slice(0);
	// }
}

person.buildStats = function(race, level) {
	// ability scores
	// var statMods = [];
	var stats = world.rollStats(5, race.statMods);
	person.stats = person.abilityScoreIncrease(level,stats);

	// ability score modifiers
	var mods = [];
	for (i = 0; i < stats.length; i++) {
		mods[i] = world.getModifier(stats[i]);
	}
	person.modifiers = mods;

	// proficiency bonus
	if (level >= 5)
		person.profBonus = 3;
	if (level >= 9)
		person.profBonus = 4;
	if (level >= 13)
		person.profBonus = 5;
	if (level >= 17)
		person.profBonus = 6;
}

person.getHP = function(race, cl, cl2, level) {
	var mod = person.modifiers[2];
	person.hp = world.rollHealth(cl.hDie, level, mod);
	// console.log("health from cl1: "+person.hp);
	person.hp += world.rollHealth(cl2.hDie, level, mod);
	// console.log("health from cl2: "+person.hp);
	if ("extraHP" in race)
		person.hp += parseInt(race["extraHP"]);
	if ("extraHP" in cl)
		person.hp += parseInt(cl["extraHP"]);
	if ("extraHP" in cl2)
		person.hp += parseInt(cl2["extraHP"]);
}

person.abilityScoreIncrease = function(level, stats) {
	isFair = false;
	
	levs = [4, 8, 12, 14, 16, 19];
	for (i = 0; i < levs.length; i++) {
		if (level >= levs[i]) {
			isFair = false;

			// split = Math.random();

			while(!isFair) {
				isFair = false;
				if (random.bool(0.3)) { // both points in one stat
					// s = randInt(0, stats.length);
					s = random.integer(0, stats.length-1);
					if (stats[s] + 2 <= 20) {
						stats[s] += 2;
						isFair = true;
					}
				}
				else { // split between two stats
					s = random.integer(0, stats.length-1);
					t = random.integer(0, stats.length-1);
					if (stats[s] + 1 <= 20 && stats[t] + 1 <= 20 && s != t) {
						stats[s] += 1; stats[t] += 1;
						isFair = true;
					}
				}
			}
		}
	}

	return stats;
}


