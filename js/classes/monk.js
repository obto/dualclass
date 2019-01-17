mnk = {};
mnk.class = "Monk";
mnk.level = 1;
mnk.hDie = 8;
mnk.features = [];
mnk.skills = [];
mnk.ki = 0;
mnk.proficiencies = {};
mnk.proficiencies.weapons = ["Simple", "Shortsword"];
mnk.proficiencies.armor = [];
mnk.proficiencies.other = [];
mnk.saves = ["Strength", "Dexterity"];
mnk.subclass = "";
mnk.speed = 0;
mnk.languages = [];
mnk.immunity = [];
mnk.resistance = [];

mnk.generateClass = function(level, person) {
	mnk.level = level;
	mnk.addFeatures(level);

	newSkills = mnk.addSkills(level, person.skills.slice(0));
	person.skills = person.skills.concat(newSkills);
}

mnk.printClass = function() {
	// console.log("Level " + mnk.level + " Monk in the " + mnk.subclass);
	// console.log("Features:");
	// console.log(mnk.features);
	// console.log("Skills:");
	// console.log(mnk.skills);
	// // console.log("Spells:");
	// // console.log(mnk.magic.spells);
	// console.log("Proficiencies:");
	// console.log(mnk.proficiencies);
	$(".basics p").text("Level " + mnk.level + " Monk (" + mnk.subclass + ")");
	$("div.feat p").text(mnk.features.join(", "));
	$("div.skills p").html(makeSkillText(mnk.skills));
	$("div.profs p").html(makeProfText(mnk.proficiencies));
	// $("div.spells p").text(mnk.magic.spells + "");
}

mnk.addFeatures = function(level) {
	if (Math.random() > 0.5) {
		inst = world.instruments[randInt(0, world.instruments.length)];
		mnk.proficiencies.other.push(inst);
	}
	else {
		art = world.artisan[randInt(0, world.artisan.length)];
		mnk.proficiencies.other.push(art + "'s tools");
	}

	die = 4;
	if (level >= 5)
		die = 6
	if (level >= 11)
		die = 8
	if (level >= 17)
		die = 10

	mnk.features.push("Unarmored Defense", "Martial Arts (1d"+die+")");

	if (level >= 2) {
		mnk.ki = level;
		
		spd = 10;
		if (level >= 6)
			spd += 5
		if (level >= 10)
			spd += 5
		if (level >= 14)
			spd += 5
		if (level >= 18)
			spd += 5

		mnk.speed = spd;
		mnk.features.push("Ki ("+mnk.ki+" points)", "Unarmored Movement (+"+spd+"ft)");
	}

	if (level >= 3) {
		mnk.chooseSubclass(level);
		mnk.features.push("Deflect Missiles");
	}
	if (level >= 4)
		mnk.features.push("Slow Fall");
	if (level >= 5)
		mnk.features.push("Extra Attack", "Stunning Strike");
	if (level >= 6)
		mnk.features.push("Ki-empowered Strikes");
	if (level >= 7)
		mnk.features.push("Evasion", "Stillness of Mind");			
	if (level >= 10) {
		mnk.features.push("Purity of Body");
		mnk.immunity.push("disease, poison");
	}
	if (level >= 13) {
		mnk.features.push("Tongue of the Sun and Moon");
		mnk.languages = ["All"];
	}
	if (level >= 14) {
		mnk.features.push("Diamond Soul");
		mnk.saves = ["Strength","Dexterity","Constitution","Intelligence","Wisdom","Charisma"];
	}
	if (level >= 15) {
		mnk.features.push("Timeless Body");
		mnk.immunity.push("hunger","thirst");
	}
	if (level >= 18)
		mnk.features.push("Empty Body");
	if (level >= 20)
		mnk.features.push("Perfect Self");
}

mnk.chooseSubclass = function(level) {
	archs = {};
	archs = ["Shadow","Four Elements","Open Hand","Sun Soul"];
	x = archs[randInt(0, archs.length)];
	mnk.subclass = "Way of the " + x;
	mnk.features.push("Monastic Tradition - "+mnk.subclass);
	
	archs["Shadow"] = ["Shadow Arts","Shadow Step","Cloak of Shadows","Opportunist"];
	archs["Four Elements"] = ["Disciple of the Elements","","",""];
	archs["Open Hand"] = ["Open Hand Technique","Wholeness of Body","Tranquility","Quivering Palm"];
	archs["Sun Soul"] = ["Radiant Sun Bolt","Searing Arc Strike","Searing Sunburst","Sun Shield"];

	mnk.features.push(archs[x][0]);
	if (level >= 6 && x != "Four Elements")
		mnk.features.push(archs[x][1]);
	if (level >= 11 && x != "Four Elements")
		mnk.features.push(archs[x][2]);
	if (level >= 17 && x != "Four Elements")
		mnk.features.push(archs[x][3]);

	if (x == "Four Elements") {
		mnk.features.push("Elemental Attunement");
		fe = [];
		fe[0] = ["Fangs of the Fire Snake","Fist of Four Thunders","Fist of Unbroken Air","Rush of the Gale Spirits","Shape the Flowing River","Sweeping Cinder Strike","Water Whip"];
		fe[1] = ["Clench of the North Wind","Gong of the Summit"];
		fe[2] = ["Flames of the Phoenix","Mist Stance","Ride the Wind"];
		fe[3] = ["Breath of Winter","Eternal Mountain Defense","River of Hungry Flame","Wave of Rolling Earth"];

		mnk.features.push(fe[0][randInt(0,fe[0].length)]);

		full = [];
		if (level >= 6) {
			full = fe[0].concat(fe[1]);
			mnk.features.push(full[randInt(0,full.length)]);
		}
		if (level >= 11) {
			full = full.concat(fe[2]);
			mnk.features.push(full[randInt(0,full.length)]);
		}
		if (level >= 17) {
			full = full.concat(fe[3]);
			mnk.features.push(full[randInt(0,full.length)]);
		}
	}
}

mnk.addSkills = function(level, knownSkills) {
	var mySkills = skillChunk([0,3,5,6,14,16], 2, knownSkills);
	mnk.skills = mySkills;
	return mySkills;
}

