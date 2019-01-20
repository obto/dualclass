// var race = {};
function raceReset(me) {
	me.features = [];
	me.statMods = [0,0,0,0,0,0];
	me.languages = [];
	me.skills = [];
	me.spells = [];
	me.proficiencies = [];
	me.resistance = [];
	me.extraLangs = 0;
}

var frbl = {};
frbl.name = "Firbolg";
frbl.reset = function() { raceReset(frbl); }
frbl.generateRace = function(person) {
	frbl.rSize = "Medium";
	frbl.speed = 30;
	frbl.features = ["Firbolg Magic","Hidden Step","Powerful Build","Speech of Beast and Leaf"];
	frbl.statMods = [1,0,0,0,2,0];
	frbl.languages = ["Common", "Elvish","Giant"];
	frbl.spells = [];
	frbl.spells[1] = ["Detect Magic","Disguise Self"];
	frbl.castAbility = 4;
}

var bugb = {};
bugb.name = "Bugbear";
bugb.reset = function() { raceReset(bugb); }
bugb.generateRace = function(person) {
	bugb.rSize = "Medium";
	bugb.speed = 30;
	bugb.features = ["Darkvision","Long-Limbed","Powerful Build","Sneaky","Surprise Attack"];
	bugb.statMods = [2,1,0,0,0,0];
	bugb.languages = ["Common", "Goblin"];
	bugb.skills = [16];
}

var gnsi = {};
gnsi.name = "Genasi";
gnsi.reset = function() { 
	gnsi.name = "Genasi";
	raceReset(gnsi);
}
gnsi.generateRace = function(person) {
	gnsi.rSize = "Medium";
	gnsi.extraHP = 0;
	gnsi.speed = 30;
	gnsi.features = [];
	gnsi.statMods = [0,0,2,0,0,0];
	gnsi.languages = ["Common", "Primordial"];
	gnsi.spells = [];
	gnsi.castAbility = 2;
	gnsi.types = ["Air Genasi","Earth Genasi","Fire Genasi","Water Genasi"];

	var race = gnsi.types[randInt(0,gnsi.types.length)];
	gnsi.name = race;
	if (race == "Air Genasi") {
		gnsi.statMods[1] = 1;
		gnsi.features = ["Unending Breath","Mingle with the Wind"];
		gnsi.spells[2] = ["Levitate"];
	}
	else if (race == "Earth Genasi") {
		gnsi.statMods[0] = 1;
		gnsi.features = ["Earth Walk","Merge with Stone"];
		gnsi.spells[2] = ["Pass without Trace"];
	}
	else if (race == "Fire Genasi") {
		gnsi.statMods[3] = 1;
		gnsi.features = ["Darkvision","Fire Resistance","Reach to the Blaze"];
		gnsi.spells[0] = ["Produce Flame"];
		gnsi.resistance = ["fire"];
		if (person.level >= 3) {
			gnsi.spells[1] = ["Burning Hands"];
		}
	}
	else if (race == "Water Genasi") {
		gnsi.statMods[4] = 1;
		gnsi.features = ["Acid Resistance","Amphibious","Swim","Call to the Wave"];
		gnsi.spells[0] = ["Shape Water"];
		gnsi.swimSpeed = 30;
		gnsi.resistance = ["acid"];
		if (person.level >= 3) {
			gnsi.spells[2] = ["Create or Destroy Water"];
		}
	}
}

var gobl = {};
gobl.name = "Goblin";
gobl.reset = function() { raceReset(gobl); }
gobl.generateRace = function(person) {
	gobl.rSize = "Small";
	gobl.speed = 25;
	gobl.features = ["Darkvision","Fury of the Small","Nimble Escape"];
	gobl.statMods = [0,2,1,0,0,0];
	gobl.languages = ["Common", "Goblin"];
}

var hobl = {};
hobl.name = "Hobgoblin";
hobl.reset = function() { raceReset(hobl); }
hobl.generateRace = function(person) {
	hobl.rSize = "Medium";
	hobl.speed = 30;
	hobl.features = ["Darkvision","Martial Training","Saving Face"];
	hobl.statMods = [0,2,1,0,0,0];
	hobl.languages = ["Common", "Goblin"];
	hobl.proficiencies = {};
	hobl.proficiencies.armor = ["Light"];
	hobl.proficiencies.weapons = skillChunk(world.weapons.martial, 2, []);
}

var glth = {};
glth.name = "Goliath";
glth.reset = function() { raceReset(glth); }
glth.generateRace = function(person) {
	glth.rSize = "Medium";
	glth.speed = 30;
	glth.features = ["Natural Athlete","Stone's Endurance","Powerful Build","Mountain Born"];
	glth.statMods = [0,0,2,1,0,0];
	glth.languages = ["Common", "Giant"];
	glth.skills = [3];
	glth.resistance = ["cold"];
}

var kenk = {};
kenk.name = "Kenku";
kenk.reset = function() { raceReset(kenk); }
kenk.generateRace = function(person) {
	kenk.rSize = "Medium";
	kenk.speed = 30;
	kenk.features = ["Expert Forgery","Kenku Training","Mimicry"];
	kenk.statMods = [0,2,0,0,1,0];
	kenk.languages = ["Common*", "Auran*"];
	kenk.skills = skillChunk([0,4,15,16], 2, []);
}

var kobl = {};
kobl.name = "Kobold";
kobl.reset = function() { raceReset(kobl); }
kobl.generateRace = function(person) {
	kobl.rSize = "Small";
	kobl.speed = 30;
	kobl.features = ["Darkvision","Grovel, Cower, and Beg","Pack Tactics","Sunlight Sensitivity"];
	kobl.statMods = [-2,0,2,0,0,0];
	kobl.languages = ["Common", "Draconic"];
}

var lzrd = {};
lzrd.name = "Lizardfolk";
lzrd.reset = function() { raceReset(lzrd); }
lzrd.generateRace = function(person) {
	lzrd.rSize = "Medium";
	lzrd.speed = 30;
	lzrd.swimSpeed = 30;
	lzrd.features = ["Bite","Cunning Artisan","Hold Breath","Hunter's Lore","Natural Armor","Hungry Jaws"];
	lzrd.statMods = [0,0,2,0,1,0];
	lzrd.languages = ["Common", "Draconic"];
	lzrd.skills = skillChunk([1,10,11,16,17], 2, []);
}
lzrd.getAC = function() {
	return 13 + person.modifiers[1];
}

var orc = {};
orc.name = "Orc";
orc.reset = function() { raceReset(orc); }
orc.generateRace = function(person) {
	orc.rSize = "Medium";
	orc.speed = 30;
	orc.features = ["Darkvision","Aggressive","Menacing","Powerful Build"];
	orc.statMods = [2,0,1,-2,0,0];
	orc.languages = ["Common", "Orc"];
	orc.skills = [7];
}

var tbxi = {};
tbxi.name = "Tabaxi";
tbxi.reset = function() { raceReset(tbxi); }
tbxi.generateRace = function(person) {
	tbxi.rSize = "Medium";
	tbxi.speed = 30;
	tbxi.climbSpeed = 20;
	tbxi.features = ["Darkvision","Feline Agility","Cat's Claws"];
	tbxi.statMods = [0,2,0,0,0,1];
	tbxi.languages = ["Common"];
	tbxi.extraLangs = 1;
	tbxi.skills = [11, 16];
}

var trit = {};
trit.name = "Triton";
trit.reset = function() { raceReset(trit); }
trit.generateRace = function(person) {
	trit.rSize = "Medium";
	trit.speed = 30;
	trit.swimSpeed = 30;
	trit.features = ["Amphibious","Control Air and Water","Emissary of the Sea","Guardians of the Depths"];
	trit.statMods = [1,0,1,0,0,1];
	trit.languages = ["Common","Primordial"];
	trit.spells = [];
	trit.spells[1] = ["Fog Cloud"];
	if (person.level >= 3)
		trit.spells[2] = ["Gust of Wind"];
	if (person.level >= 5)
		trit.spells[3] = ["Wall of Water"];
	trit.resistance = ["cold"];
}

var ynti = {};
ynti.name = "Yuan-Ti Pureblood";
ynti.reset = function() { raceReset(ynti); }
ynti.generateRace = function(person) {
	ynti.rSize = "Medium";
	ynti.speed = 30;
	ynti.features = ["Darkvision","Innate Spellcasting","Magic Resistance","Poison Immunity"];
	ynti.statMods = [0,0,0,1,0,2];
	ynti.languages = ["Common","Abyssal","Draconic"];
	ynti.spells = [];
	ynti.spells[0] = ["Poison Spray"];
	ynti.spells[1] = ["Animal Friendship (snakes)"];
	if (person.level >= 3)
		ynti.spells[2] = ["Suggestion"];
	// ynti.resistance = ["magic"];
	ynti.immunity = ["poison"];
}

