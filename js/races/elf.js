elf = {};
elf.name = "Elf";
elf.rSize = "Medium";
elf.speed = 30;
elf.features = [];
elf.statMods = [0,0,0,0,0,0];
elf.languages = ["Common","Elvish"];
elf.extraLangs = 0;
elf.skills = [];
elf.spells = [];
elf.castAbility = 0;
elf.proficiencies = [];
elf.proficiencies.weapons = [];
elf.proficiencies.armor = [];
elf.proficiencies.other = [];
elf.types = ["Dark Elf","High Elf","Wood Elf"];

elf.reset = function() {
	elf.name = "Elf";
	elf.features = [];
	elf.statMods = [0,0,0,0,0,0];
	elf.extraLangs = 0;
	elf.skills = [];
	elf.spells = [];
	elf.castAbility = 0;
	elf.proficiencies = {};
	elf.proficiencies.weapons = [];
	elf.proficiencies.armor = [];
	elf.proficiencies.other = [];
}

elf.generateRace = function(person) {
	race = elf.types[randInt(0, elf.types.length)];
	elf.name = race;

	elf.addFeatures(race);
	statMods = elf.addStatMods(race);
	elf.skills = [11];

	profs = elf.addProficiencies(race);
	spells = elf.addSpells(race, person.level, person.spells.slice(0));

	// person.skills = person.skills.concat(elf.skills.slice(0));
}

// elf.printRace = function(person) {
// 	$(".rBasics p").text(elf.name);
// 	$("div.rFeat p").text(elf.features.join(", "));
// 	$("div.rSkills p").html(makeSkillText(elf.skills));
// 	$("div.rSpells p").html(makeSpellText(elf.spells));
// 	$("div.rProfs p").html(makeProfText(elf.proficiencies));
// }

elf.addStatMods = function(race) {
	elf.statMods[2] += 2;

	switch(race){
		case "Dark Elf":
			elf.statMods[5] += 1;
			break;

		case "High Elf":
			elf.statMods[3] += 1;
			break;

		case "Wood Elf":
			elf.statMods[4] += 1;
			break;
	}

	return elf.statMods;
}

elf.addFeatures = function(race) {
	baseElf = ["Darkvision", "Fey Ancestry"];
	fullElf = baseElf.concat(["Keen Senses", "Trance"]);
	
	switch(race){
		case "Dark Elf":
			f = fullElf.indexOf("Darkvision");
			fullElf[f] = "Superior Darkvision";
			fullElf = fullElf.concat(["Sunlight Sensitivity","Drow Magic","Drow Weapon Training"]);
			break;
		case "High Elf":
			fullElf = fullElf.concat(["Elf Weapon Training", "Cantrip","Extra Language"]);
			elf.extraLangs += 1;
			break;
		case "Wood Elf":
			fullElf = fullElf.concat(["Elf Weapon Training", "Fleet of Foot", "Mask of the Wild"]);
			elf.speed = 35;
			break;
	}

	elf.features = fullElf;
}

// elf.addLanguages = function(race, knownLangs) {
// 	switch(race) {
// 		case "Half-Elf":
// 		case "High Elf":
// 			person.extraLangs += 1;
// 			break;
// 		case "Elf":
// 		case "Dark Elf":
// 		case "Wood Elf":
// 			break;
// 	}

// 	// return langs;
// }

// elf.addSkills = function(race, knownSkills) {
// 	var newSkills = [11]; //perception
	
// 	switch(race) {
// 		case "Elf":
// 		case "Dark Elf":
// 		case "High Elf":
// 		case "Wood Elf":
// 			elf.skills = newSkills;
// 			break;
// 		case "Half-Elf":
// 			newSkills = skillChunk(world.skills, 2, knownSkills);
// 			elf.skills = newSkills;
// 			break;
// 	}
// 	console.log("elf skills");
// 	console.log(newSkills);
// 	return newSkills;
// }

elf.addSpells = function(race, level, knownSpells) {
	var newSpells = [];
	switch(race) {
		case "Dark Elf":
			elf.castAbility = 5;
			newSpells[0] = ["Dancing Lights"];
			if (level >= 3)
				newSpells[1] = ["Faerie Fire"];
			if (level >= 5)
				newSpells[2] = ["Darkness"];
			break;
		case "High Elf":
			elf.castAbility = 3;
			newSpells[0] = skillChunk(wiz.magic.list[0], 1, knownSpells);
			break;
	}

	elf.spells = newSpells;
	return newSpells;
}

elf.addProficiencies = function(race) {
	var newProfs = [];
	switch(race) {
		case "Dark Elf":
			newProfs.weapons = ["Rapier","Shortsword","Crossbow"];
			elf.proficiencies.weapons = (newProfs.weapons);
			break;
		case "High Elf":
		case "Wood Elf":
			newProfs.weapons = ["Longsword","Shortsword","Shortbow","Longbow"];
			elf.proficiencies.weapons = (newProfs.weapons);
			break;
	}
	return newProfs;
}

helf = [];
helf.name = "Half-Elf";
helf.reset = function() { raceReset(helf); }
helf.generateRace = function(person) {
	helf.rSize = "Medium";
	helf.speed = 30;
	helf.features = ["Darkvision","Fey Ancestry","Skill Versatility"];
	helf.statMods = helf.rollStats([0,0,0,0,0,2]);
	helf.languages = ["Common","Elvish"];
	helf.extraLangs = 1;
	helf.skills = skillChunk(world.skills, 2, person.skills.slice(0));
}

helf.rollStats = function(mods) {
	// elf.statMods[5] += 2;
	x = randInt(0, 5);
	y = randInt(0, 5);
	while (x == y)
		y = randInt(0, 5);
	helf.statMods[x] = 1;
	helf.statMods[y] = 1;
	return helf.statMods;
}
