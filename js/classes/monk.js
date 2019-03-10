mnk = {};
mnk.class = "Monk";
mnk.level = 1;
mnk.hDie = 8;
mnk.features = [];
mnk.skills = [];
mnk.ki = 0;
mnk.proficiencies = [];
mnk.proficiencies.weapons = ["Simple", "Shortsword"];
mnk.proficiencies.armor = [];
mnk.proficiencies.other = [];
mnk.saves = ["Strength", "Dexterity"];
mnk.subclass = "";
mnk.speed = 0;
mnk.languages = [];
mnk.immunity = [];

mnk.reset = function(classes) {
	mnk.name = "Monk";
	mnk.level = 1;
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

	var list = ["Open Hand","Shadow","Four Elements"];
	if (typeof classes != 'undefined')
		mnk.subclassList = list.slice(0).concat(classes.slice(0));
	else
		mnk.subclassList = list;
}

mnk.generateClass = function(level, person) {
	mnk.level = level;
	mnk.addFeatures(level, person.proficiencies.other.slice(0));

	newSkills = mnk.addSkills(level, person.skills.slice(0));
	// person.skills = person.skills.concat(newSkills);

	mnk.name = "Level " + mnk.level + " Monk (" + mnk.subclass + ")";
}

mnk.printClass = function() {
	$(".basics p").text("Level " + mnk.level + " Monk (" + mnk.subclass + ")");
	$("div.feat p").text(mnk.features.join(", "));
	$("div.skills p").html(makeSkillText(mnk.skills));
	$("div.profs p").html(makeProfText(mnk.proficiencies));
	// $("div.spells p").text(mnk.magic.spells + "");
}

mnk.getAC = function(mods) {
	return 10 + mods[1] + mods[4];
}

mnk.addFeatures = function(level, knownProfs) {
	if (random.bool()) {
		var inst = skillChunk(world.instruments, 1, knownProfs);
		mnk.proficiencies.other = inst;
	}
	else {
		var art = skillChunk(world.artisan, 1, knownProfs);
		mnk.proficiencies.other = [art[0] + "'s tools"];
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
		mnk.chooseSubclass(level, knownProfs.slice(0).concat(mnk.proficiencies.other.slice(0)));
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

mnk.chooseSubclass = function(level, knownProfs) {
	var archs = mnk.subclassList.slice(0);
	var x = random.pick(archs);
	mnk.subclass = "Way of the " + x;
	mnk.features.push("Monastic Tradition - "+mnk.subclass);
	
	archs["Shadow"] = ["Shadow Arts","Shadow Step","Cloak of Shadows","Opportunist"];
	archs["Four Elements"] = ["Disciple of the Elements","","",""];
	archs["Open Hand"] = ["Open Hand Technique","Wholeness of Body","Tranquility","Quivering Palm"];
	archs["Sun Soul"] = ["Radiant Sun Bolt","Searing Arc Strike","Searing Sunburst","Sun Shield"];
	archs["Drunken Master"] = ["Drunken Technique","Tipsy Sway","Drunkard's Luck","Intoxicated Frenzy"];
	archs["Kensei"] = ["Path of the Kensei","One with the Blade","Sharpen the Blade","Unerring Accuracy"];

	mnk.features.push(archs[x][0]);
	if (level >= 6 && x != "Four Elements")
		mnk.features.push(archs[x][1]);
	if (level >= 11 && x != "Four Elements")
		mnk.features.push(archs[x][2]);
	if (level >= 17 && x != "Four Elements")
		mnk.features.push(archs[x][3]);

	if (x == "Four Elements") {
		mnk.features.push("Elemental Attunement");
		var fe = [];
		fe[0] = ["Fangs of the Fire Snake","Fist of Four Thunders","Fist of Unbroken Air","Rush of the Gale Spirits","Shape the Flowing River","Sweeping Cinder Strike","Water Whip"];
		fe[1] = ["Clench of the North Wind","Gong of the Summit"];
		fe[2] = ["Flames of the Phoenix","Mist Stance","Ride the Wind"];
		fe[3] = ["Breath of Winter","Eternal Mountain Defense","River of Hungry Flame","Wave of Rolling Earth"];

		mnk.features.push(random.pick(fe[0]));

		full = [];
		if (level >= 6) {
			full = fe[0].concat(fe[1].slice(0));
			mnk.features.push(random.pick(full));
		}
		if (level >= 11) {
			full = full.concat(fe[2].slice(0));
			mnk.features.push(random.pick(full));
		}
		if (level >= 17) {
			full = full.concat(fe[3].slice(0));
			mnk.features.push(random.pick(full));
		}
	}
	else if (x == "Kensei") {
		var kens = mnk.kenseiWeaponFilter();
		mnk.proficiencies.weapons.push(kens[0].name);
		mnk.proficiencies.weapons.push(kens[1].name);
		mnk.features.push("Kensei Weapons - "+kens[0].name+", "+kens[1].name);
		var artist = skillChunk(["Calligrapher","Painter"], 1, knownProfs);
		mnk.proficiencies.other.push(artist + "'s tools");
	}
}

mnk.kenseiWeaponFilter = function() {
	var melee = gear.weapons.filter(function(item) {
		// var item = gear.weapons[key];
		if (item.type == "Melee" && !("Heavy" in item.tags) && !("Special" in item.tags)) {
			return item;
		}
	});
	var ranged = gear.weapons.filter(function(item) {
		// var item = gear.weapons[key];
		if (item.type == "Ranged" && !("Heavy" in item.tags) && !("Special" in item.tags)) {
			return item;
		}
		else if (item.name == "Longbow")
			return item;
	});

	var m = random.pick(melee);
	var r = random.pick(ranged);

	return [m, r];
}

mnk.addSkills = function(level, knownSkills) {
	var clskills = [];
	if (mnk.subclass == "Drunken Master"){
		clskills = skillChunk(12, 1, knownSkills);
		// clr.expertise = domainSkills;
	}
	var toCheck = clskills.concat(knownSkills);

	var newSkills = skillChunk([0,3,5,6,14,16], 2, toCheck).concat(clskills);
	// var mySkills = skillChunk([0,3,5,6,14,16], 2, knownSkills);
	mnk.skills = newSkills;
	return newSkills;
}

