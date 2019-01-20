aasm = {};
aasm.name = "Aasimar";
aasm.reset = function() { 
	aasm.name = "Aasimar";
	raceReset(aasm);
}
aasm.generateRace = function(person) {
	aasm.rSize = "Medium";
	aasm.speed = 30;
	aasm.features = ["Darkvision","Celestial Resistance","Healing Hands","Light Bearer"];
	aasm.statMods = [0,0,0,0,0,2];
	aasm.languages = ["Common", "Celestial"];
	aasm.spells = [];
	aasm.spells[0] = ["Light"];
	aasm.castAbility = 5;
	aasm.resistance = ["radiant","necrotic"];
	aasm.types = ["Protector Aasmiar","Scourge Aasimar","Fallen Aasimar"];

	var race = aasm.types[randInt(0, aasm.types.length)];
	aasm.name = race;

	if (race == "Protector Aasimar") {
		aasm.statMods[4] = 1;
		if (person.level >= 3)
			aasm.features.push("Radiant Soul");
	}
	else if (race == "Scourge Aasimar") {
		aasm.statMods[2] = 1;
		if (person.level >= 3)
			aasm.features.push("Radiant Consumption");
	}
	else if (race == "Fallen Aasimar") {
		aasm.statMods[0] = 1;
		if (person.level >= 3)
			aasm.features.push("Necrotic Shroud");
	}
}

drgb = {};
drgb.name = "Dragonborn";
drgb.reset = function() { raceReset(drgb); }
drgb.generateRace = function(person) {
	drgb.rSize = "Medium";
	drgb.speed = 30;
	drgb.statMods = [2,0,0,0,0,1];
	drgb.languages = ["Common","Draconic"];
	var types = ["Black","Blue","Brass","Bronze","Copper","Gold","Green","Red","Silver","White"];
	var t = types[randInt(0, types.length)];

	var elem = drgb.breathType(t);
	drgb.resistance = [elem];
	var dmg = "2d6";
	if (person.level >= 6)
		dmg = "3d6";
	if (person.level >= 11)
		dmg = "4d6";
	if (person.level >= 16)
		dmg = "5d6";

	drgb.features = ["Draconic Ancestry ("+t+")", elem + " Breath Weapon ("+dmg+")"];
}

drgb.breathType = function(type) {
	switch(type) {
		case "Black":
		case "Copper":
			return "Acid";
		case "Blue":
		case "Bronze":
			return "Lightning";
		case "Brass":
		case "Gold":
		case "Red":
			return "Fire";
		case "Green":
			return "Poison";
		case "Silver":
		case "White":
			return "Cold";
	}
}

horc = {};
horc.name = "Half-Orc";
horc.reset = function() { raceReset(horc); }
horc.generateRace = function(person) {
	horc.rSize = "Medium";
	horc.speed = 30;
	horc.statMods = [2,0,1,0,0,0];
	horc.languages = ["Common","Orc"];
	horc.skills = [7];
	horc.features = ["Darkvision","Menacing","Relentless Endurance","Savage Attacks"];
}

humn = {};
humn.name = "Human";
humn.reset = function() { raceReset(humn); }
humn.generateRace = function(person) {
	humn.rSize = "Medium";
	humn.speed = 30;
	humn.statMods = [1,1,1,1,1,1];
	humn.languages = ["Common"];
	humn.extraLangs = 1;
}

tief = {};
tief.name = "Tiefling";
tief.reset = function() { raceReset(tief); }
tief.generateRace = function(person) {
	tief.rSize = "Medium";
	tief.speed = 30;
	tief.features = ["Darkvision","Hellish Resistance","Infernal Legacy"];
	tief.statMods = [0,0,0,1,0,2];
	tief.languages = ["Common","Infernal"];
	tief.spells = [];
	tief.spells[0] = ["Thaumaturgy"];
	if (person.level >= 3) {
		tief.spells[1] = ["Hellish Rebuke"];
	}
	if (person.level >= 5) {
		tief.spells[2] = ["Darkness"];
	}
	tief.resistance = ["fire"];
}