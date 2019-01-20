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

person.restart = function() {
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
}

person.buildPerson = function(lev, r, cl) {
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

	var myClass = cl;
	cl.reset();
	myClass.generateClass(classLevel, person);
	interface.printRace(myClass, ".class", "Class");
	person.roundUp(myClass);
	console.log("------------------------------");

	var myClass2 = world.classes[randInt(0, world.classes.length)];
	while (myClass2.name == myClass.name)
		var myClass2 = world.classes[randInt(0, world.classes.length)];
	myClass2.reset();
	myClass2.generateClass(classLevel, person);
	interface.printRace(myClass2, ".class2", "Class 2");
	person.roundUp(myClass2);

	person.buildStats(myRace, myClass, myClass2, classLevel);

	// person.languages = person.languages.concat(myRace.languages
	// console.log("we've got "+person.extraLangs+" langs to add");
	var newLangs = world.pickLanguages(person.languages.slice(0), [], person.extraLangs);
	person.languages = person.languages.concat(newLangs);

	$.uniqueSort(person.skills);
	person.printPerson();
}

person.printPerson = function() {
	$(".person .stats p").html(makeStatText(person.stats, person.modifiers));
	$(".person .skills p").html(function() {
		var str = "";
		str += makeSkillText(person.skills);
		if ("expertise" in person && person.expertise.length > 0) {
			str += "<br />Expertise: "+makeSkillText(person.expertise);
		}
		str += "<br />Languages: "+person.languages.join(", ");
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
	if ("languages" in recent) {
		person.languages = person.languages.concat(recent.languages.slice(0));
	}
	if ("extraLangs" in recent) {
		person.extraLangs += recent.extraLangs;
	}
	if ("expertise" in recent) {
		person.expertise = person.expertise.concat(recent.expertise.slice(0));
	}
}

person.buildStats = function(race, cl, cl2, level) {
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

	// HP
	person.hp = world.rollHealth(cl.hDie, level, mods[2]);
	if ("extraHP" in race)
		person.hp += race["extraHP"];
	if ("extraHP" in cl)
		person.hp += cl["extraHP"];
	if ("extraHP" in cl2)
		person.hp += cl2["extraHP"];

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

person.abilityScoreIncrease = function(level, stats) {
	isFair = false;
	
	levs = [4, 8, 12, 14, 16, 19];
	for (i = 0; i < levs.length; i++) {
		if (level >= levs[i]) {
			isFair = false;

			split = Math.random();

			while(!isFair) {
				isFair = false;
				if (split > 0.3) { // both points in one stat
					s = randInt(0, stats.length);
					if (stats[s] + 2 <= 20) {
						stats[s] += 2;
						isFair = true;
					}
				}
				else { // split between two stats
					s = randInt(0, stats.length);
					t = randInt(0, stats.length);
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




// person.buildPerson();





