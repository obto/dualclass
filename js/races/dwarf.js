drf = {};
drf.rName = "Dwarf";
drf.rSize = "Medium";
drf.extraHP = 0;
drf.speed = 25;
drf.features = [];
drf.statMods = [0,0,0,0,0,0];
drf.languages = ["Common", "Dwarvish"];
drf.skills = [];
drf.spells = [];
drf.castAbility = 0;
drf.proficiencies = {};
drf.proficiencies.weapons = [];
drf.proficiencies.armor = [];
drf.proficiencies.other = [];
drf.types = ["Hill Dwarf","Mountain Dwarf"];

drf.generateRace = function(person) {
	race = drf.types[randInt(0, drf.types.length)];
	drf.rName = race;

	drf.addStatMods(race);
	drf.addFeatures(race, person.level);
}

drf.printRace = function() {
	$(".rBasics p").text(drf.rName);
	$("div.rFeat p").text(drf.features.join(", "));
	// $("div.rSkills p").text(drf.skills + "");
	// $("div.rSpells p").text(elf.spells + "");
	$("div.rProfs p").html(makeProfText(drf.proficiencies));
}

drf.addStatMods = function(race) {
	drf.statMods[2] += 2;
	if (race == "Hill Dwarf") {
		drf.statMods[4] += 1;
	}
	else if (race == "Mountain Dwarf") {
		drf.statMods[0] += 1;
	}
}

drf.addFeatures = function(race, level) {
	drf.features.push("Darkvision","Dwarven Resilience","Dwarven Combat Training","Tool Proficiency","Stonecunning");
	drf.proficiencies.weapons = ["Battleaxe","Handaxe","Light hammer","Warhammer"];

	tools = ["Smith's tools", "Brewer's supplies", "Mason's tools"];
	drf.proficiencies.other.push(tools[randInt(0, tools.length)]);

	if (race == "Hill Dwarf") {
		drf.features.push("Dwarven Toughness");
		drf.extraHP = level;
	}
	else if (race == "Mountain Dwarf") {
		drf.features.push("Dwarven Armor Training");
		drf.proficiencies.armor = ["Light", "Medium"];
	}
}

