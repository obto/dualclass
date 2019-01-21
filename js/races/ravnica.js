var centa = {};
centa.name = "Centaur";
centa.reset = function() { raceReset(centa); }
centa.generateRace = function(person) {
	centa.rSize = "Medium";
	centa.speed = 40;
	centa.features = ["Fey","Charge","Hooves","Equine Build"];
	centa.statMods = [2,0,0,0,1,0];
	centa.languages = ["Common", "Sylvan"];
	centa.skills = skillChunk([1,9,10,17], 1, person.skills);
}

var loxo = {};
loxo.name = "Loxodon";
loxo.reset = function() { raceReset(loxo); }
loxo.generateRace = function(person) {
	loxo.rSize = "Medium";
	loxo.speed = 30;
	loxo.features = ["Powerful Build","Loxodon Serenity","Natural Armor","Trunk","Keen Smell"];
	loxo.statMods = [0,0,2,0,1,0];
	loxo.languages = ["Common", "Loxodon"];
	loxo.advantage = ["saves/charm","saves/fear","Perception (smell)","Survival (smell)","Investigation (smell)"];
}

loxo.getAC = function(shield) {
	return 12 + person.modifiers[2] + shield;
}

var mino = {};
mino.name = "Minotaur";
mino.reset = function() { raceReset(mino); }
mino.generateRace = function(person) {
	mino.rSize = "Medium";
	mino.speed = 30;
	mino.features = ["Horns","Goring Rush","Hammering Horns","Imposing Presence"];
	mino.statMods = [2,0,1,0,0,0];
	mino.languages = ["Common", "Minotaur"];
	mino.skills = skillChunk([7, 13], 1, person.skills);
}

var hybr = {};
hybr.name = "Magic Hybrid";
hybr.reset = function() { 
	hybr.acBonus = 0;
	hybr.adapts = [];
	raceReset(hybr);
}
hybr.generateRace = function(person) {
	hybr.rSize = "Medium";
	hybr.speed = 30;
	hybr.adapts = [];
	hybr.features = ["Darkvision"];
	hybr.statMods = hybr.pickMod([0,0,2,0,0,0]);
	hybr.languages = ["Common"];
	hybr.languages.push(random.pick(["Elven","Vedalken"]));
	hybr.first = ["Manta Glide","Nimble Climber","Underwater Adaptation"];
	hybr.second = ["Grappling Appendages","Carapace","Acid Spit"];	
	hybr.pickAdapts(person.level);
}

hybr.pickMod = function(mods) {
	var x = random.integer(0, 5);
	while (x == 2) {
		x = random.integer(0, 5);
	}
	mods[x] = 1;
	return mods;
}

hybr.pickAdapts = function(level) {
	var str = "";
	hybr.adapts = skillChunk(hybr.first.slice(0), 1, []);
	str += "Animal Enhancement (" + hybr.addAdapts(hybr.adapts[0]);
	if (level >= 5) {
		hybr.adapts = skillChunk(hybr.first.slice(0).concat(hybr.second.slice(0)), 1, hybr.adapts.slice(0));
		str += ", "+hybr.addAdapts(hybr.adapts[0]);
	}
	str += ")";
	hybr.features.push(str);
}

hybr.addAdapts = function(ad, level) {
	if (ad == "Manta Glide") {

	}
	else if (ad == "Nimble Climber") {
		hybr.climbSpeed = hybr.speed;
	}
	else if (ad == "Underwater Adaptation") {
		hybr.swimSpeed = hybr.speed;
	}
	else if (ad == "Grappling Appendages") {
		// var x = Math.random();
		if (random.bool())
			t = "Tentacles";
		else
			t = "Claws";

		return "Grappling Appendages - "+t;
	}
	else if (ad == "Carapace") {
		hybr.acBonus = 1;
	}
	else if (ad == "Acid Spit") {
		var dmg = "2d10";
		if (level >= 11)
			dmg = "3d10";
		if (level >= 17)
			dmg = "4d10";

		return "Acid Spit ("+dmg+"dmg)";
	}
	return ad;
}

var veda = {};
veda.name = "Vedalken";
veda.reset = function() { raceReset(veda); }
veda.generateRace = function(person) {
	veda.rSize = "Medium";
	veda.speed = 30;
	veda.features = ["Vedalken Dispassion","Tireless Precision","Partially Amphibious"];
	veda.statMods = [0,0,0,2,1,0];
	veda.languages = ["Common", "Vedalken"];
	veda.extraLangs = 1;
	veda.advantage = ["Intelligence saves","Wisdom saves","Charisma saves"];
	veda.skills = skillChunk([2,5,8,9,12,15], 1, person.skills);
	veda.proficiencies = [];
	veda.proficiencies.other = skillChunk(world.tools, 1, person.proficiencies.other);
}


