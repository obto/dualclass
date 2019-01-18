var hlf = {};
hlf.rName = "Halfling";
hlf.rSize = "Small";
hlf.extraHP = 0;
hlf.speed = 25;
hlf.features = [];
hlf.statMods = [0,0,0,0,0,0];
hlf.languages = ["Common", "Halfling"];
hlf.skills = [];
hlf.spells = [];
hlf.castAbility = 0;
hlf.proficiencies = {};
hlf.proficiencies.weapons = [];
hlf.proficiencies.armor = [];
hlf.proficiencies.other = [];
hlf.types = ["Ghostwise Halfling","Lightfoot Halfling","Stout Halfling"];

hlf.generateRace = function(person) {
	race = hlf.types[randInt(0, hlf.types.length)];
	hlf.rName = race;

	hlf.addStatMods(race);
	hlf.addFeatures(race, person.level);
}

hlf.printRace = function() {
	$(".rBasics p").text(hlf.rName);
	$("div.rFeat p").text(hlf.features.join(", "));
}

hlf.addStatMods = function(race) {
	hlf.statMods[1] += 2;
	if (race == "Ghostwise Halfling") {
		hlf.statMods[4] += 1;
	}
	else if (race == "Lightfoot Halfling") {
		hlf.statMods[5] += 1;
	}
	else if (race == "Stout Halfling") {
		hlf.statMods[2] += 1;
	}
}

hlf.addFeatures = function(race, level) {
	hlf.features.push("Lucky","Brave","Halfling Nimbleness");

	if (race == "Ghostwise Halfling") {
		hlf.features.push("Silent Speech");
	}
	else if (race == "Lightfoot Halfling") {
		hlf.features.push("Naturally Stealthy");
	}
	else if (race == "Lightfoot Halfling") {
		hlf.features.push("Stout Resilience");
	}
}

