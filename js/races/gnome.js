var gnm = {};
gnm.name = "Gnome";
gnm.rSize = "Small";
gnm.extraHP = 0;
gnm.speed = 25;
gnm.features = [];
gnm.statMods = [0,0,0,0,0,0];
gnm.languages = ["Common", "Gnomish"];
gnm.skills = [];
gnm.spells = [];
gnm.castAbility = 3;
gnm.proficiencies = {};
gnm.proficiencies.weapons = [];
gnm.proficiencies.armor = [];
gnm.proficiencies.other = [];
gnm.types = ["Forest Gnome","Rock Gnome","Deep Gnome"];

gnm.reset = function() {
	gnm.name = "Gnome";
	gnm.extraHP = 0;
	gnm.features = [];
	gnm.statMods = [0,0,0,0,0,0];
	gnm.spells = [];
	gnm.proficiencies = {};
	gnm.proficiencies.weapons = [];
	gnm.proficiencies.armor = [];
	gnm.proficiencies.other = [];
}

gnm.generateRace = function(person) {
	race = gnm.types[randInt(0, gnm.types.length)];
	gnm.name = race;

	gnm.addStatMods(race);
	gnm.addFeatures(race, person.level);
	gnm.spells = gnm.addSpells(race, person.spells);
}

gnm.printRace = function() {
	$(".rBasics p").text(gnm.name);
	$("div.rFeat p").text(gnm.features.join(", "));
	// $("div.rSkills p").text(gnm.skills + "");
	$("div.rSpells p").html(makeSpellText(gnm.spells));
	$("div.rProfs p").html(makeProfText(gnm.proficiencies));
}

gnm.addStatMods = function(race) {
	gnm.statMods[3] += 2;
	if (race == "Forest Gnome") {
		gnm.statMods[1] += 1;
	}
	else if (race == "Rock Gnome") {
		gnm.statMods[2] += 1;
	}
	else if (race == "Deep Gnome") {
		gnm.statMods[1] += 1;
	}
}

gnm.addFeatures = function(race, level) {
	gnm.features.push("Darkvision","Gnome Cunning");

	if (race == "Forest Gnome") {
		gnm.features.push("Natural Illusionist","Speak with Small Beasts");
	}
	else if (race == "Rock Gnome") {
		gnm.features.push("Artificer's Lore", "Tinker");
		gnm.proficiencies.other = ["Tinker's tools"];
	}
	else if (race == "Deep Gnome") {
		gnm.features.push("Stone Camouflage","Extra Language","Svirfneblin Magic");
		gnm.languages.push("Undercommon");
	}
}

gnm.addSpells = function(race, knownSpells) {
	spells = [];
	if (race == "Forest Gnome") {
		spells[0] = ["Minor Illusion"];
	}

	return spells;
}

