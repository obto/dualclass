fght = {};
fght.class = "Fighter";
fght.level = 1;
fght.hDie = 10;
fght.features = [];
fght.skills = [];
fght.proficiencies = [];
fght.proficiencies.weapons = ["Simple", "Martial"];
fght.proficiencies.armor = ["Light", "Medium", "Heavy", "Shields"];
fght.proficiencies.other = [];
fght.saves = ["Strength", "Constitution"];
fght.subclass = "";
fght.magic = [];

fght.reset = function() {
	fght.name = "";
	fght.level = 1;
	fght.features = [];
	fght.skills = [];
	fght.proficiencies = {};
	fght.proficiencies.weapons = ["Simple", "Martial"];
	fght.proficiencies.armor = ["Light", "Medium", "Heavy", "Shields"];
	fght.proficiencies.other = [];
	fght.saves = ["Strength", "Constitution"];
	fght.subclass = "";
	fght.magic = [];
	fght.slots = [];
}

fght.generateClass = function(level, person) {
	fght.level = level;
	fght.addFeatures(level);

	var newSkills = fght.addSkills(level, person.skills.slice(0));
	// person.skills = person.skills.concat(newSkills);

	if (fght.subclass == "Eldritch Knight")
		var newSpells = fght.addSpells(level, person.spells.slice(0));

	fght.name = "Level " + fght.level + " Fighter (" + fght.subclass + ")";
}

fght.printClass = function() {
	$(".basics p").text("Level " + fght.level + " Fighter (" + fght.subclass + ")");
	$("div.feat p").text(fght.features.join(", "));
	$("div.skills p").html(makeSkillText(fght.skills));
	$("div.profs p").html(makeProfText(fght.proficiencies));
	if ("spells" in fght.magic) {
		$(".class .spells p").html(makeSpellText(fght.magic.spells));
		$("div.slots").html(printSpellSlots(fght.magic.slots));
	}
}

fght.addFeatures = function(level) {	
	var styles = ["Archery", "Defense", "Dueling", "Great Weapon Fighting", "Protection", "Two-Weapon Fighting"];
	fght.features.push("Fighting Style - "+styles[randInt(0, styles.length)]);
	fght.features.push("Second Wind");

	if (level >= 2) {
		var x = 1;
		if (level >= 17) x = 2;
		fght.features.push("Action Surge ("+x+"/day)");
	}

	if (level >= 3) 
		fght.chooseSubclass(level);
	
	if (level >= 5) {
		var x = 1;
		if (level >= 11) x = 2;
		if (level >= 20) x = 3;
		fght.features.push("Extra Attack ("+x+" extra)");
	}
	if (level >= 9) {
		var x = 1;
		if (level >= 13) x = 2;
		if (level >= 17) x = 3;
		fght.features.push("Indomitable ("+x+"/day)");
	}
}

fght.chooseSubclass = function(level) {
	var archs = ["Arcane Archer","Battle Master","Cavalier","Champion","Eldritch Knight"];
	var x = archs[randInt(0, archs.length)];
	// x = "Eldritch Knight";
	fght.subclass = x;

	archs["Arcane Archer"] = [["Arcane Archer Lore", "Arcane Shot"], ["Magic Arrow", "Curving Shot"], "", "Ever-Ready Shot", ""];
	archs["Battle Master"] = [["Combat Superiority", "Student of War"], "Know Your Enemy", "Improved Combat Superiority", "Relentless", ""];
	archs["Cavalier"] = [["Bonus Proficiencies", "Born to the Saddle", "Unwavering Mark"], "Warding Maneuver", "Hold the Line", "Ferocious Charger", "Vigilant Defender"];
	archs["Champion"] = ["Improved Critical", "Remarkable Athlete", "Additional Fighting Style", "Superior Critical", "Survivor"];
	archs["Eldritch Knight"] = [["Spellcasting","Weapon Bond"], "War Magic", "Eldritch Strike", "Arcane Charge", "Improved War Magic"];

	style = archs[x];

	if (style[0] instanceof Array) {
		for (i = 0; i < style[0].length; i++) {
			fght.features.push(style[0][i]);
		}
	}
	else {
		fght.features.push(style[0]);
	}

	if (level >= 7){
		if (style[1] instanceof Array) {
			for (i = 0; i < style[1].length; i++) {
				fght.features.push(style[1][i]);
			}
		}
		else {
			fght.features.push(style[2]);
		}
	}
	if (level >= 10)
		fght.features.push(style[3]);
	if (level >= 15)
		fght.features.push(style[4]);
	if (level >= 18)
		fght.features.push(style[5]);

	if (x == "Arcane Archer") {
		var y = 2;
		if (level >= 7) y = 3;
		if (level >= 10) y = 4;
		if (level >= 15) y = 5;
		if (level >= 18) y = 6;

		var shots = ["Banishing","Beguiling","Bursting","Enfeebling","Grasping","Piercing","Seeking","Shadow"];
		var s = skillChunk(shots, y, []);

		var f = fght.features.indexOf("Arcane Shot");
		fght.features[f] = "Arcane Shot ("+s.toString()+")";
		fght.shots = s;
	}
	else if (x == "Battle Master") {
		var y = 4;
		var z = 8;
		if (level >= 7) y = 5;
		if (level >= 10) z = 8;
		if (level >= 15) y = 6;
		if (level >= 18) z = 10
		var numdie = "(d"+z+", " +y+ " dice/day)";

		var maneuvs = ["Commander's", "Disarming", "Distracting", "Evasive", "Feinting", "Goading", "Lunging", "Maneuvering", "Menacing", "Parry", "Precision", "Pushing", "Rally", "Riposte", "Sweeping", "Trip"];
		var m = skillChunk(maneuvs, y, []);

		var f = fght.features.indexOf("Combat Superiority");
		fght.features[f] = "Combat Superiority " + numdie + " - " + m.join(", ");
	}

}


fght.addSkills = function(level, knownSkills) {
	var pathSkills = [];
	if (fght.subclass == "Arcane Archer") {
		pathSkills = skillChunk([2, 10], 1, knownSkills);
	}
	else if (fght.subclass == "Cavalier") { //  && fght.subclass.notLanguage
		pathSkills = skillChunk([1, 5, 6, 12, 13], 1, knownSkills);
	}

	var toCheck = pathSkills.concat(knownSkills);
	var mySkills = skillChunk([0,1,3,5,6,7,11,17], 2, toCheck);
	fght.skills = mySkills.concat(pathSkills);
	return mySkills;
}


//eldritch knight

fght.addSpells = function(level, knownSpells) {
	fght.magic.slots = fght.getSpellSlots(level);
	var spells = fght.getSpells(level, knownSpells.slice(0));
	fght.magic.spells = spells;
	return spells;
}

fght.getSpellSlots = function(level) {
	var slots = [];

	switch(level) {
		case 3:
			slots = [0, 2];
			break;
		case 4:
		case 5:
		case 6:
			slots = [0, 3];
			break;
		case 7:
		case 8:
		case 9:
			slots = [0, 4, 2];
			break;
		case 10:
		case 11:
		case 12:
			slots = [0, 4, 3];
		case 13:
		case 14:
		case 15:
			slots = [0, 4, 3, 2];
			break;
		case 16:
		case 17:
		case 18:
			slots = [0, 4, 3, 3];
			break;
		case 19:
		case 20:
			slots = [0, 4, 3, 3, 1];
			break;
	}

	return slots;
}

fght.getNumSpellsKnown = function(level) {
	var sp = 2;
	var spAll = 1;
	// if (level >= 3)
	// 	sp = 3;
	if (level >= 4)
		sp++;
	if (level >= 7)
		sp++;
	if (level >= 8)
		spAll++;
	if (level >= 10)
		sp++;
	if (level >= 11)
		sp++;
	if (level >= 13)
		sp++;
	if (level >= 14)
		spAll++;
	if (level >= 16)
		sp++;
	if (level >= 19)
		sp++;
	if (level >= 20)
		spAll++;

	if (fght.magic.pickSpellsFromAll)
		return spAll;
	else
		return sp;
}

fght.getNumCantripsKnown = function(level) {
	var cants = 2;

	if (level >= 10)
		cants++;

	return cants;
}

fght.getSpells = function(level, knownSpells) {
	if (typeof knownSpells == 'undefined')
		knownSpells = [];
	if (typeof knownSpells[0] == 'undefined')
		knownSpells[0] = [];

	// pick specifically from abjuration/evocation
	fght.magic.pickSpellsFromAll = false;
	fght.magic.list = world.combineSpellLists(wiz.magic["Abjuration"].slice(0),wiz.magic["Evocation"].slice(0));

	var spells = pickAllSpells(3, level, fght, knownSpells.slice(0), false);

	// pick from all wiz spells on certain levels
	fght.magic.pickSpellsFromAll = true;
	fght.magic.list = wiz.magic.list.slice(0);
	knownSpells = world.combineSpellLists(knownSpells.slice(0), spells.slice(0));

	var allSpells = pickAllSpells(3, level, fght, knownSpells.slice(0), false);

	spells = world.combineSpellLists(spells.slice(0), allSpells.slice(0));

	// pick cantrips
	var cants = wiz.getNumCantripsKnown(level);
	spells[0] = skillChunk(fght.magic.list[0].slice(0), cants, knownSpells[0].slice(0));
	console.log("new cantrips: "+spells[0].join(", "));
	console.log(spells);

	return spells;
}


