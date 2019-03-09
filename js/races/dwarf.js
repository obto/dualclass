drf = {};
drf.name = "Dwarf";
drf.rSize = "Medium";
drf.extraHP = 0;
drf.speed = 25;
drf.features = [];
drf.skills = [];
drf.statMods = [0,0,0,0,0,0];
drf.languages = ["Common", "Dwarvish"];
drf.proficiencies = [];
drf.proficiencies.weapons = [];
drf.proficiencies.armor = [];
drf.proficiencies.other = [];
drf.types = ["Hill Dwarf","Mountain Dwarf"];

drf.reset = function() {
	drf.name = "Dwarf";
	drf.features = [];
	drf.statMods = [0,0,0,0,0,0];
	drf.languages = ["Common", "Dwarvish"];
	drf.proficiencies = {};
	drf.proficiencies.weapons = [];
	drf.proficiencies.armor = [];
	drf.proficiencies.other = [];
	drf.skills = [];
	drf.spells = [];
	drf.extraHP = 0;
}

drf.generateRace = function(person) {
	race = random.pick(drf.types);
	drf.name = race;

	drf.addStatMods(race);
	drf.addFeatures(race, person.level);
}

drf.printRace = function() {
	$(".rBasics h2").text("Race: "+drf.name);
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
	drf.resistance = ["poison"];
	drf.advantage = ["saves/poison"];

	tools = ["Smith's tools", "Brewer's supplies", "Mason's tools"];
	drf.proficiencies.other = skillChunk(tools, 1, person.proficiencies.other);

	if (race == "Hill Dwarf") {
		drf.features.push("Dwarven Toughness");
		drf.extraHP = level;
	}
	else if (race == "Mountain Dwarf") {
		drf.features.push("Dwarven Armor Training");
		drf.proficiencies.armor = ["Light", "Medium"];
	}
}

