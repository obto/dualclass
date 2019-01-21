var hlf = {};
hlf.name = "Halfling";
hlf.rSize = "Small";
hlf.extraHP = 0;
hlf.speed = 25;
hlf.features = [];
hlf.statMods = [0,0,0,0,0,0];
hlf.languages = ["Common", "Halfling"];
hlf.skills = [];
hlf.spells = [];
hlf.castAbility = 0;
hlf.proficiencies = [];
hlf.proficiencies.weapons = [];
hlf.proficiencies.armor = [];
hlf.proficiencies.other = [];
hlf.types = ["Ghostwise Halfling","Lightfoot Halfling","Stout Halfling"];

hlf.reset = function() {
	hlf.name = "Halfling";
	hlf.extraHP = 0;
	hlf.features = [];
	hlf.statMods = [0,0,0,0,0,0];
	// hlf.skills = [];
	// hlf.spells = [];
}

hlf.generateRace = function(person) {
	var race = random.pick(hlf.types);
	hlf.name = race;

	hlf.addStatMods(race);
	hlf.addFeatures(race, person.level);
}

hlf.printRace = function() {
	$(".rBasics p").text(hlf.name);
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
	hlf.advantage = ["saves/fear"];

	if (race == "Ghostwise Halfling") {
		hlf.features.push("Silent Speech");
	}
	else if (race == "Lightfoot Halfling") {
		hlf.features.push("Naturally Stealthy");
	}
	else if (race == "Stout Halfling") {
		hlf.features.push("Stout Resilience");
		hlf.resistence = ["poison"];
		hlf.advantage.push("saves/poison");
	}
}

