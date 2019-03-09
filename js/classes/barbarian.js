var bbn = {};
bbn.class = "Barbarian";
bbn.short = "bbn";
bbn.level = 1;
bbn.hDie = 12;
bbn.features = [];
bbn.skills = [];
bbn.proficiencies = [];
bbn.proficiencies.weapons = ["Simple", "Martial"];
bbn.proficiencies.armor = ["Light", "Medium", "Shields"];
bbn.proficiencies.other = [];
bbn.saves = ["Strength", "Constitution"];
// bbn.stipulations = ["no heavy armor"];
bbn.subclass = "";
bbn.speed = 0;
bbn.advantage = [];
bbn.resistance = [];
bbn.statMods = [0,0,0,0,0,0];

bbn.reset = function(classes) {
	bbn.name = "";
	bbn.level = 1;
	bbn.features = [];
	bbn.skills = [];
	bbn.proficiencies = {};
	bbn.proficiencies.weapons = ["Simple", "Martial"];
	bbn.proficiencies.armor = ["Light", "Medium", "Shields"];
	bbn.proficiencies.other = [];
	bbn.saves = ["Strength", "Constitution"];
	bbn.subclass = "";
	bbn.subclassType = "";
	bbn.speed = 0;
	bbn.swimSpeed = 0;
	bbn.advantage = [];
	bbn.resistance = [];
	bbn.extraTotem = false;

	var list = ["Berzerker","Totem Warrior"];
	if (typeof classes != 'undefined')
		bbn.subclassList = list.slice(0).concat(classes.slice(0));
	else
		bbn.subclassList = list;

	if (typeof classes != 'undefined') {
		if (classes.includes("Totem Warrior")){
			bbn.extraTotem = true;
			bbn.subclassList = Array.from(new Set(list.slice(0).concat(classes)));
		}
	}
	else {
		bbn.subclassList = list;
	}
}
// -------------- FEATURES ----------

bbn.generateClass = function(level, person) {
	bbn.level = level;
	bbn.addFeatures(level);

	newSkills = bbn.addSkills(level, person.skills.slice(0));
	// person.skills = person.skills.concat(newSkills);

	bbn.name = "Level " + bbn.level + " Barbarian (" + bbn.subclass + ")";
	// newSpells = addSpells(level, person.spells);
	// person.spells.push(newSpells);
}

bbn.printClass = function() {
	$(".basics p").text("Level " + bbn.level + " Barbarian (" + bbn.subclass + ")");
	$("div.feat p").text(bbn.features.join(", "));
	$("div.skills p").html(makeSkillText(bbn.skills));
	$("div.profs p").html(makeProfText(bbn.proficiencies));
	// $("div.spells p").text(bbn.magic.spells + "");
}

bbn.getAC = function(mods) {
	return 10 + mods[1] + mods[2];
}

bbn.addFeatures = function(level) {	
	bbn.features.push(bbn.rages(level), "Unarmored Defense");

	if (level >= 2) {
		bbn.features.push("Reckless Attack", "Danger Sense");
		bbn.advantage.push("Dexterity saves/visible traps, spells");
	}
	if (level >= 3) {
		bbn.chooseSubclass(level);
	}
	if (level >= 5) {
		bbn.features.push("Extra Attack", "Fast Movement");
		bbn.speedMod += 10;
	}
	if (level >= 7) {
		bbn.features.push("Feral Instinct");
		bbn.advantage.push("Initiative");
	}
	if (level >= 9)
		bbn.features.push("Brutal Critical");
	if (level >= 11) 
		bbn.features.push("Relentless Rage");
	if (level >= 15)
		bbn.features.push("Persistent Rage");
	if (level >= 18)
		bbn.features.push("Indomitable Might");
	if (level >= 20) {
		bbn.features.push("Primal Champion");
		// person.statsMax[0] = 24;
		// person.statsMax[2] = 24;
		person.stats[0] += 4;
		person.stats[2] += 4;
	}
}

bbn.rages = function(level) {
	var x = 2;
	
	if (level >= 3)
		x = 3;
	if (level >= 6)
		x = 4;
	if (level >= 12)
		x = 5;
	if (level >= 17)
		x = 6;
	if (level >= 20)
		x = "unlimited";

	y = 2;

	if (level >= 9)
		y = 3;
	if (level >= 16)
		y = 4;


	return "Rage " + x + "/day, +" + y + " Rage Damage";
}

bbn.chooseSubclass = function(level) {
	var paths = bbn.subclassList.slice(0);
	var x = random.pick(paths);
	bbn.subclass = x;

	paths["Ancestral Guardian"] = ["Ancestral Protectors", "Spirit Shield", "Consult the Spirits", "Vengeful Ancestors"];
	paths["Berzerker"] = ["Frenzy", "Mindless Rage", "Intimidating Presence", "Retaliation"];
	paths["Storm Herald"] = ["Storm Aura", "Storm Soul", "Shielding Storm", "Raging Storm"];
	paths["Totem Warrior"] = [["Spirit Seeker", "Totem Spirit"], "Aspect of the Beast", "Spirit Walker", "Totemic Attunement"];
	paths["Zealot"] = [["Divine Fury", "Warrior of the Gods"], "Fanatical Focus", "Zealous Presence", "Rage Beyond Death"];
	
	if (paths[x][1]) {
		if (paths[x][1] instanceof Array) {
			bbn.features.push(paths[x][0][0], paths[x][0][1]);
		}
		else {
			bbn.features.push(paths[x][0]);
		}
	}

	if (level >= 6)
		bbn.features.push(paths[x][1]);
	if (level >= 10)
		bbn.features.push(paths[x][2]);
	if (level >= 14)
		bbn.features.push(paths[x][3]);

	if (x == "Totem Warrior") {
		var totes = ["Bear","Eagle","Wolf"];
		if (bbn.extraTotem)
			totes.push("Elk","Tiger");

		var path = random.pick(totes);

		bbn.subclassType = path;
		bbn.subclass = "Path of the Totem Warrior - " + bbn.subclassType;
		if (path == "Bear" && level >= 6) {
			bbn.advantage.push("Strength/pull,push,lift,break");
		}
	}
	if (x == "Storm Herald") {
		// var types = ["Desert","Sea","Storm"];
		var t = random.pick(["Desert","Sea","Tundra"]);
		bbn.subclass = "Path of the Storm Herald - "+t;
		bbn.subclassType = t;

		if (level >= 6) {
			switch(t) {
				case "Desert":
					bbn.resistance.push("fire");
					break;
				case "Sea":
					bbn.resistance.push("lightning");
					bbn.swimSpeed = 30;
					break;
				case "Tundra":
					bbn.resistance.push("cold");
			}
		}
	}
}

// skills
bbn.addSkills = function(level, knownSkills) {
	var newSkills = skillChunk([1,3,7,10,11,17], 2, knownSkills);

	bbn.skills = newSkills;
	return newSkills;
}


