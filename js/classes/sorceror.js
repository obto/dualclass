sor = {};
sor.class = "Sorceror";
sor.level = 1;
sor.hDie = 6;
sor.magic = [];
sor.features = [];
sor.skills = [];
sor.expertise = [];
sor.proficiencies = {};
sor.proficiencies.weapons = ["Dagger","Darts","Sling","Quarterstaff","Light crossbow"];
sor.proficiencies.armor = [];
sor.proficiencies.other = [];
sor.saves = ["Constitution", "Charisma"];
sor.statMods = [0,0,0,0,0,0];
sor.subclass = "";
sor.extraHP = 0;

sor.magic.list = [];
sor.magic.list[0] = ["Create Bonfire","Control Flames","Frostbite","Gust","Mold Earth","Shape Water","Thunderclap","Acid Splash","Blade Ward","Chill Touch","Dancing Lights","Fire Bolt","Friends","Light","Mage Hand","Mending","Message","Minor Illusion","Poison Spray","Prestidigitation","Ray of Frost","Shocking Grasp","True Strike"];
sor.magic.list[1] = ["Catapult","Ice Knife","Earth Tremor","Burning Hands","Burning Hands","Charm Person","Chromatic Orb","Color Spray","Comprehend Languages","Detect Magic","Disguise Self","Expeditious Retreat","False Life","Feather Fall","Fog Cloud","Jump","Magic Missile","Magic Missile","Mage Armor","Ray of Sickness","Shield","Silent Image","Sleep","Thunderwave","Witch Bolt"];
sor.magic.list[2] = ["Aganazzar's Scorcher","Dust Devil","Earthbind","Maximilian's Earthen Grasp","Pyrotechnics","Snilloc's Snowball Swarm","Warding Wind","Alter Self","Blindness/Deafness","Blur","Cloud of Daggers","Crown of Madness","Darkness","Darkvision","Detect Thoughts","Enhance Ability","Enlarge/Reduce","Gust of Wind","Hold Person","Invisibility","Knock","Levitate","Mirror Image","Misty Step","Phantasmal Force","Scorching Ray","See Invisibility","Shatter","Spider Climb","Suggestion","Web"];
sor.magic.list[3] = ["Erupting Earth","Flame Arrows","Melf's Minute Meteors","Wall of Water","Blink","Clairvoyance","Counterspell","Daylight","Dispel Magic","Fear","Fireball","Fly","Gaseous Form","Haste","Hypnotic Pattern","Lightning Bolt","Major Image","Protection from Energy","Sleet Storm","Slow","Stinking Cloud","Tongues","Water Breathing","Water Walk"];
sor.magic.list[4] = ["Storm Sphere","Vitriolic Sphere","Watery Sphere","Banishment","Blight","Confusion","Dimension Door","Dominate Beast","Greater Invisibility","Ice Storm","Polymorph","Stoneskin","Wall of Fire"];
sor.magic.list[5] = ["Control Winds","Immolation","Animate Objects","Cloudkill","Cone of Cold","Creation","Dominate Person","Hold Monster","Insect Plague","Seeming","Telekinesis","Teleportation Circle","Wall of Stone"];
sor.magic.list[6] = ["Arcane Gate","Chain Lightning","Circle of Death","Disintegrate","Eyebite","Globe of Invulnerability","Investiture of Flame","Investiture of Ice","Investiture of Stone","Investiture of Wind","Mass Suggestion","Mental Prison","Move Earth","Scatter","Sunbeam","True Seeing"];
sor.magic.list[7] = ["Crown of Stars","Delayed Blast Fireball","Etherealness","Finger of Death","Fire Storm","Plane Shift","Power Word Pain","Prismatic Spray","Reverse Gravity","Teleport","Whirlwind"];
sor.magic.list[8] = ["Abi-Dalzim's Horrid Writing","Dominate Monster","Earthquake","Incendiary Cloud","Power Word Stun","Sunburst"];
sor.magic.list[9] = ["Gate","Mass Polymorph","Meteor Swarm","Power Word Kill","Psychic Scream","Time Stop","Wish"];

sor.generateClass = function(level, person) {
	sor.level = level;
	sor.addFeatures(level);

	newSkills = sor.addSkills(level, person.skills.slice(0));
	person.skills = person.skills.concat(newSkills);

	newSpells = sor.addSpells(level, person.spells.slice(0));
	// person.spells = person.spells.concat(newSpells);
}

sor.printClass = function() {
	$(".basics p").text("Level " + sor.level + " Sorceror (" + sor.subclass + ")");
	$("div.feat p").text(sor.features.join(", "));
	$("div.skills p").html(makeSkillText(sor.skills));
	$("div.profs p").html(makeProfText(sor.proficiencies));
	$(".class .spells p").html(makeSpellText(sor.magic.spells));
	$("div.slots").html(printSpellSlots(sor.magic.slots));
}

// -------------- FEATURES ----------
sor.addFeatures = function(level) {
	sor.features.push("Spellcasting");
	sor.chooseSubclass(level);

	if (level >= 2) {
		sor.features.push("Font of Magic ("+level+" sorcery points/day)");
	}
	if (level >= 3) {
		var x = 2;
		if (level >= 10)
			x += 1;
		if (level >= 17)
			x += 1;

		var metas = ["Careful","Distant","Empowered","Extended","Heightened","Quickened","Subtle","Twinned"];
		var m = skillChunk(metas, x, []);
		sor.features.push("Metamagic - "+m.toString());
	}
	if (level >= 20)
		sor.features.push("Sorcerous Restoration");
}

sor.chooseSubclass = function(level) {
	var orig = ["Divine Soul","Draconic Blood","Giant Soul","Phoenix Sorcery","Shadow Magic","Stone Sorcery","Storm Sorcery","Wild Magic"];
	var c = orig[randInt(0,orig.length)];
	sor.subclass = c;
	sor.features.push("Sorcerous Origin - "+c);

	orig["Divine Soul"] = [["Divine Magic","Favored by the Gods"],"Empowered Healing","Otherwordly Wings","Unearthly Recovery"];
	orig["Draconic Blood"] = [["Dragon Ancestor","Draconic Resilience"],"Elemental Affinity","Dragon Wings","Draconic Presence"];
	orig["Giant Soul"] = [["Jotun Resilience","Mark of the Ordning"],"Soul of Lost Ostoria","Rage of Fallen Ostoria","Blessing of the All Father"];
	orig["Phoenix Sorcery"] = [["Ignite","Mantle of Flame"],"Phoenix Spark","Nourishing Fire","Form of the Phoenix"];
	orig["Shadow Magic"] = [["Eyes of the Dark","Strength of the Grave"],"Hound of Ill Omen","Shadow Walk","Umbral Form"];
	orig["Stone Sorcery"] = [["Bonus Proficiencies","Metal Magic","Stone's Durability"],"Stone Aegis","Stone's Edge","Earth Master's Aegis"];
	orig["Storm Sorcery"] = [["Wind Speaker","Tempestuous Magic"],["Heart of the Storm","Storm Guide"],"Storm's Fury","Wind Soul"];
	orig["Wild Magic"] = [["Wild Magic Surge","Tides of Chaos"],"Bend Luck","Controlled Chaos","Spell Bombardment"];

	for (var i = 0; i < orig[c][0].length; i++) {
		sor.features.push(orig[c][0][i]);
	}

	if (level >= 6)
		sor.features.push(orig[c][1]);
	if (level >= 14)
		sor.features.push(orig[c][2]);
	if (level >= 18)
		sor.features.push(orig[c][3]);

	if (c == "Divine Soul") {
		var types = ["Good","Evil","Law","Chaos","Neutrality"];
		sor.subclassType = sor.subclassTypeGen(c, types);
	}

	if (c == "Draconic Bloodline") {
		var types = ["Black","Blue","Brass","Bronze","Copper","Gold","Green","Red","Silver","White"];
		sor.subclassType = sor.subclassTypeGen(c, types);
		sor.extraHP = level;
		sor.languages = ["Draconic"];
	}

	if (c == "Giant Soul") {
		var types = ["Cloud","Fire","Frost","Hill","Stone","Storm"];
		sor.subclassType = sor.subclassTypeGen(c, types);
		sor.extraHP = level;

		if (level >= 18)
			sor.statMods[2] += 2;
	}

	if (c == "Shadow Magic")
		sor.features.push("Darkvision (120 ft)");

	if (c == "Stone Sorcery") {
		sor.proficiencies.armor.push("Shields");
		sor.proficiencies.weapons.push("Simple","Martial");
		sor.extraHP = level;
	}

	if (c == "Wind Speaker") {
		sor.languages = ["Primordial"];
	}
}

sor.subclassTypeGen = function(c, types) {
	var t = types[randInt(0,types.length)];

	sor.subclassType = t;
	f = sor.features.indexOf("Sorcerous Origin - "+c);
	sor.features[f] = "Sorcerous Origin - "+c+" ("+f+")";

	return t;
}

sor.addSkills = function(level, knownSkills) {
	var mySkills = skillChunk([2,4,6,7,13,14], 2, knownSkills);
	// rog.addExpertise(level, mySkills.concat(knownSkills.slice(0)));
	sor.skills = mySkills;
	return mySkills;
}

sor.addSpells = function(level, knownSpells) {
	sor.magic.slots = sor.getSpellSlots(level);
	var spells = sor.getSpells(level, knownSpells);
	sor.magic.spells = spells;
	return spells;
}

sor.getSpells = function(level, knownSpells) {
	var origSpells = [];
	origSpells[0] = [];

	if (sor.subclass == "Divine Soul") {
		sor.magic.list = world.combineSpellLists(sor.magic.list.slice(0), clr.magic.list.slice(0));
		var types = [];
		types["Good"] = ["Cure Wounds"];
		types["Evil"] = ["Inflict Wounds"];
		types["Law"] = ["Bless"];
		types["Chaos"] = ["Bane"];
		types["Neutrality"] = ["Protection from Evil and Good"];

		origSpells[1] = [types[sor.subclassType]];
	}
	else if (sor.subclass == "Shadow Magic") {
		origSpells[2] = ["Darkness"];
	}
	else if (sor.subclass == "Stone Sorcery") {
		var more = [[],["Compelled Duel","Searing Smite","Thunderous Smite","Wrathful Smite"],["Branding Smite","Magic Weapon"],["Blinding Smite","Elemental Weapon"],["Staggering Smite"]];
		sor.magic.list = world.combineSpellLists(sor.magic.list.slice(0), more);
	}
	else if (sor.subclass == "Giant Soul") {
		var types = [];
		types["Cloud"] = [["Minor Illusion"],["Fog Cloud"],["Invisibility"]];
		types["Fire"] = [["Fire Bolt"],["Burning Hands"],["Flaming Sphere"]];
		types["Frost"] = [["Ray of Frost"],["Armor of Agathys"],["Hold Person"]];
		types["Hill"] = [["Shillelagh"],["Heroism"],["Enlarge/Reduce"]];
		types["Stone"] = [["Resistance"],["Entangle"],["Spike Growth"]];
		types["Storm"] = [["Thunderwave"],["Shocking Grasp"],["Gust of Wind"]];
		origSpells = types[sor.subclassType];
	}

	knownSpells = world.combineSpellLists(knownSpells.slice(0), origSpells.slice(0));

	var spells = pickAllSpells(1, level, sor, knownSpells, true);
	spells = world.combineSpellLists(spells.slice(0), origSpells.slice(0));

	if (typeof knownSpells[0] == 'undefined')
		knownSpells[0] = [];
	var cants = sor.getNumCantripsKnown(level);
	spells[0] = skillChunk(sor.magic.list[0].slice(0), cants, knownSpells[0].slice(0));
	spells[0] = spells[0].slice(0).concat(origSpells[0].slice(0));	
	console.log(spells);

	return spells;
}

sor.getSpellSlots = function(level) {
	var slots = [];

	slots[1] = Math.min(level+1, 4);
	if (level >= 3)
		slots[2] = Math.min(level-1, 3);
	if (level >= 5)
		slots[3] = Math.min(level-3, 3);
	if (level >= 7)
		slots[4] = Math.min(level-6, 3);
	if (level >= 9) {
		slots[5] = Math.min(level-8, 2);
		if (level >= 18)
			slots[5] = 3;
	}
	if (level >= 11) {
		slots[6] = 1;
		if (level >= 19)
			slots[6] = 2;
	}
	if (level >= 13) {
		slots[7] = 1;
		if (level >= 20)
			slots[7] = 2;
	}
	if (level >= 15)
		slots[8] = 1;
	if (level >= 17)
		slots[9] = 1;

	return slots;
}

sor.getNumSpellsKnown = function(level) {
	var sp = level + 1;
	if (level >= 11)
		sp = 12;
	if (level >= 13)
		sp = 13;
	if (level >= 15)
		sp = 14;
	if (level >= 17)
		sp = 15;

	return sp;
}

sor.getNumCantripsKnown = function(level) {
	var cants = 4;

	if (level >= 4)
		cants++;
	if (level >= 10)
		cants++;

	return cants;
}

/*
	case 13:
		classtxt = "Sorcerer (";
		ab1=5;
		spellAbility = 5;
		ab2=2;
		bg=6;
		hd=6;
		st=[5,2];
		abOutput += "Spellcasting";
		soOrigin=Math.floor(Math.random() * 2);

		if (forceSorc > -1) {
			soOrigin=forceSorc;
		} 
		
		switch (soOrigin) {
			case 0:
				classtxt += "Draconic Bloodline)";
				// don't erase our ancestry if we already determined it
				if (racetxt != "Dragonborn") {
					tempAr = dragon();
					dragType = tempAr[0];
					elemType = tempAr[1];
					abOutput += ", Draconic Ancestry (" + dragType + ", " + elemType + " damage)";
				}
				abOutput += ", Draconic Resilience";
				languageOutput += ", Draconic";
				if (level > 5) {
					abOutput += ", Elemental Affinity";
				}
				break;
			case 1:
				classtxt += "Wild Magic)";
				abOutput += ", Wild Magic Surge, Tides of Chaos";				
				if (level > 5) {
					abOutput += ", Bend Luck";
				}
				break;
		}
		if (level >1)
			abOutput += ", Font of Magic";
		if (level >2) {
			abOutput += ", Metamagic ";
			pickMeta();
			}
		if (level >1)
			abOutput += ", " + level + " sorcery points";				
		break;


		if (cl==13) {
	ss1=level +1;
	ss2=0;
	if (level>2)
		ss2=2;
	if (level>3) {
		ss1=4;
		ss2=3;
	}
	if (level==5) 
		ss3 = 2;
	if (level > 5)
		ss3=3;
	if (level > 6)
		ss4=(level - 6);
	if (level > 8) {
		ss4=3;
		ss5=level-8;
	}



	sp = level + 1;		


	sp3=0;
	sp4=0;
	sp5=0;
	if (level <3) {
		sp1 = sp;
		sp2 =0;
	} else if (level <5) {
		x= 	Math.floor(sp * .7);
		sp1 = x;
		sp2 = (sp -x);
	} else if (level < 7) {
		x = Math.ceil(sp * .35);
		y = Math.floor(sp * .35);

		sp1 = x;
		z = sp-x-y;
		sp2 = y;
		sp3 = z;

	} else if (level < 9) {
		x = Math.floor(sp * .28);
		y = Math.floor(sp * .28);
		z = Math.floor(sp * .28);

		sum = sp - x-y-z;
		sp1 = sum;
		sp2 = y;
		sp3 = z;
		sp4 = x;

	} else if (level > 8) {
		x = Math.floor(sp * .21);
		y = Math.ceil(sp * .18);
		z = Math.ceil(sp * .18);
		xx = Math.floor(sp * .21);

		sum = sp - x-y-z-xx;
		sp1 = sum;
		sp2 = y;
		sp3 = z;
		sp4 = xx;
		sp5 = x;


	}
	console.log("Spells known:  "+sp1 +"/ " + sp2+"/ " + sp3 +"/ " + sp4+"/ " + sp5+" / Total = "+sp);




	//cantrips
	x=4;
	if (level >3)
		x=5;
	if (level >9)
		x=6;

	while (x > 0) {
		tempAr = soCantrip;
		if (Math.random() < 0.66)
			tempAr=["Acid Splash","Blade Ward","Chill Touch","Fire Bolt","Minor Illusion","Poison Spray","Ray of Frost","Shocking Grasp","True Strike"];
		temp = tempAr[Math.floor(Math.random() * tempAr.length)];
// check if we already know spell
		if ((myCantrips.indexOf(temp) == -1) && (raceSpells.indexOf(temp) == -1)) {
			// add cantrip
			myCantrips.push(temp);							
			x--;
			} 
		}		
	//put in alphabetical order
	myCantrips.sort();
	
	tempSpells=[];


//level 1
	x=sp1;
	tempSpells=[];
	while (x > 0) {
		tempAr = so1;
		if (Math.random() < 0.66)
			tempAr=["Burning Hands","Charm Person","Chromatic Orb","Color Spray","False Life","Mage Armor","Magic Missile","Ray of Sickness","Shield","Sleep","Thunderwave","Witch Bolt"];


		temp = tempAr[Math.floor(Math.random() * tempAr.length)];

// check if we already know spell
		if (tempSpells.indexOf(temp) > -1) {
			} 
		else {
	// add it
			tempSpells.push(temp);				
			x--;
			}
		}	
	tempSpells.sort();
	mySpells = mySpells.concat(tempSpells);

//2nd level
	tempSpells=[];
	x=sp2;
	
	while (x > 0) {
		tempAr = so2;
		if (Math.random() < 0.66)
			tempAr=["Blindness/Deafness","Blur","Cloud of Daggers","Crown of Madness","Enhance Ability","Enlarge/Reduce","Hold Person","Invisibility","Mirror Image","Phantasmal Force","Scorching Ray","Shatter","Suggestion","Web"];

		temp = tempAr[Math.floor(Math.random() * tempAr.length)];

// check if we already know spell
		if (tempSpells.indexOf(temp) > -1) {
			} 
		else {
	// add it
			tempSpells.push(temp);				
			x--;
			}
			
		}	
	tempSpells.sort();
	mySpells = mySpells.concat(tempSpells);

//3rd level
	tempSpells=[];
	x=sp3;
	while (x > 0) {
		tempAr = so3;
		if (Math.random() < 0.5)
			tempAr=["Blink","Counterspell","Dispel Magic","Fear","Fireball","Fireball","Fly","Gaseous Form","Haste","Hypnotic Pattern","Lightning Bolt","Lightning Bolt","Lightning Bolt","Major Image","Protection from Energy","Slow","Stinking Cloud"];

		temp = tempAr[Math.floor(Math.random() * tempAr.length)];


// check if we already know spell
		if (tempSpells.indexOf(temp) == -1) {
			tempSpells.push(temp);				
			x--;
			}
			
		}	
	tempSpells.sort();
	mySpells = mySpells.concat(tempSpells);



//4th level
	tempSpells=[];
	x=sp4;
	while (x > 0) {
		tempAr = so4;

		temp = tempAr[Math.floor(Math.random() * tempAr.length)];


// check if we already know spell
		if (tempSpells.indexOf(temp) == -1) {
			tempSpells.push(temp);				
			x--;
			}
			
		}	
	tempSpells.sort();
	mySpells = mySpells.concat(tempSpells);



//5th level
	tempSpells=[];
	x=sp5;
	while (x > 0) {
		tempAr = so5;
		
		temp = tempAr[Math.floor(Math.random() * tempAr.length)];


// check if we already know spell
		if (tempSpells.indexOf(temp) == -1) {
			tempSpells.push(temp);				
			x--;
			}
			
		}	
	tempSpells.sort();
	mySpells = mySpells.concat(tempSpells);

}
*/