drd = {};
drd = {};
drd.class = "Druid";
drd.subclass = "";
drd.level = 1;
drd.hDie = 8;
drd.magic = [];
drd.features = [];
drd.skills = [];
drd.expertise = [];
drd.proficiencies = {};
drd.proficiencies.weapons = ["Club", "Dagger", "Darts", "Javelin", "Mace", "Quarterstaff", "Scimitar", "Sickle", "Sling", "Spear"];
drd.proficiencies.armor = ["Light", "Medium", "Shields"];
drd.proficiencies.other = ["Herbalism kit"];
drd.saves = ["Wisdom", "Intelligence"];
drd.languages = ["Druidic"];




drd.magic.list = [];
drd.magic.list[0] = ["Create Bonfire","Control Flames","Druidcraft","Frostbite","Guidance","Gust","Magic Stone","Mending","Mold earth","Poison Spray","Produce Flame","Resistance","Shillelagh","Shape Water","Thorn Whip","Thunderclap"];
drd.magic.list[1] = ["Absorb Elements","Beast Bond","Ice Knife","Earth Tremor","Animal Friendship","Charm Person","Create or Destroy Water","Cure Wounds","Detect Magic","Detect Poison and Disease","Entangle","Faerie Fire","Fog Cloud","Goodberry","Healing Word","Jump","Longstrider","Purify Food and Drink","Speak with Animals","Thunderwave"];
drd.magic.list[2] = ["Dust Devil","Earthbind","Skywrite","Warding Wind","Animal Messenger","Barkskin","Beast Sense", "Darkvision", "Enhance Ability", "Find Traps", "Flame Blade", "Flaming Sphere", "Gust of Wind", "Heat Metal", "Hold Person","Lesser Restoration","Locate Object", "Moonbeam", "Pass without Trace", "Protection from Poison","Spike Growth"];
drd.magic.list[3] = ["Erupting Earth","Flame Arrows","Tidal Wave","Wall of Water","Call Lightning","Conjure Animals","Daylight","Dispel Magic","Feign Death","Meld into Stone","Plant Growth","Protection from Energy","Sleet Storm","Speak with Plants","Water Breathing","Water Walk","Wind Wall"];
drd.magic.list[4] = ["Elemental Bane","Watery Sphere","Blight","Confusion","Conjure Minor Elementals","Conjure Woodland Beings","Control Water","Dominate Beast","Freedom of Movement","Giant Insect","Grasping Vine","Hallucinatory Terrain","Ice Storm","Locate Creature","Polymorph","Stone Shape","Stoneskin","Wall of Fire"];
drd.magic.list[5] = ["Control Winds","Maelstrom","Transmute Rock","Antilife Shell","Awaken","Commune with Nature","Conjure Elemental","Contagion","Geas","Greater Restoration","Insect Plague","Mass Cure Wounds","Planar Binding","Reincarnate","Scrying","Tree Stride","Wall of Stone"];

drd.generateClass = function(level, person) {
	drd.level = level;
	drd.addFeatures(level);

	var newSkills = drd.addSkills(level, person.skills.slice(0));
	person.skills = person.skills.concat(newSkills);

	var newSpells = drd.addSpells(level, person.spells.slice(0));
	// person.spells.push(newSpells);
}

drd.printClass = function() {
	// console.log("Level " + drd.level + " Cleric in the " + drd.subclass + " Domain");
	// console.log("Features:");
	// console.log(drd.features);
	// console.log("Skills:");
	// console.log(drd.skills);
	// console.log("Expertise:");
	// console.log(drd.expertise);
	// console.log("Spells:");
	// console.log(drd.magic.spells);
	// console.log("Proficiencies:");
	// console.log(drd.proficiencies);
	$(".basics p").text("Level " + drd.level + " Druid (" + drd.subclass + ")");
	$("div.feat p").text(drd.features.join(", "));
	$("div.skills p").html(makeSkillText(drd.skills));
	$("div.profs p").html(makeProfText(drd.proficiencies));
	$("div.spells .spellnotes").text("All druids cast from the full druid spell list. The above are circle spells and cantrips.");
	$("div.spells p").html(makeSpellText(drd.magic.spells));
	$("div.slots").html(printSpellSlots(drd.magic.slots));
}

// -------------- FEATURES ----------

drd.addFeatures = function(level) {
	drd.features.push("Druidic","Spellcasting");

	if (level >= 2) {
		drd.features.push("Wild Shape");
		drd.chooseSubclass(level);
	}

	if (level >= 18) {
		drd.features.push("Timeless Body", "Beast Spells");
	}

	if (level >= 20) {
		drd.features.push("Archdruid");
	}
}

drd.chooseSubclass = function(level) {
	var orig = ["Dreams","Land","Moon","Shepherd","Spores","Twilight"];
	var c = orig[randInt(0,orig.length)];
	drd.subclass = c;

	orig["Dreams"] = [["Balm of the Summer Court"],"Hearth of Moonlight and Shadow","Hidden Paths","Walker in Dreams"];
	orig["Land"] = [["Bonus Cantrip","Natural Recovery","Circle Spells"],"Land's Stride","Nature's Ward","Nature's Sanctuary"];
	orig["Moon"] = [["Combat Wild Shape","Circle Forms"],"Primal Strike","Elemental Wild Shape","Thousand Forms"];
	orig["Shepherd"] = [["Speech of the Woods","Spirit Totem"],"Mighty Summoner","Guardian Spirit","Faithful Summons"];
	orig["Spores"] = [["Circle Spells","Halo of Spores","Symbiotic Entity"],"Fungal Infestation","Spreading Spores","Fungal Body"];
	orig["Twilight"] = [["Harvest's Scythe"],"Speech Beyond the Grave","Watcher at the Threshold","Paths of the Dead"];

	var toPrint = ""
	if (c == "Moon" || c == "Shepherd") {
		toPrint = "Circle of the "+c;
	}
	else if (c == "Land") {
		var lands = ["Arctic","Coast","Desert","Forest","Grassland","Mountain","Swamp","Underdark"];
		drd.subcircle = lands[randInt(0,lands.length)];
		toPrint = "Circle of the "+c+" - "+drd.subcircle;
	}
	else {
		toPrint = "Circle of "+c;
	}

	drd.features.push("Druidic Circle - "+toPrint);

	for (var i = 0; i < orig[c][0].length; i++) {
		drd.features.push(orig[c][0][i]);
	}
	if (level >= 6)
		drd.features.push(orig[c][1]);
	if (level >= 10)
		drd.features.push(orig[c][2]);
	if (level >= 14)
		drd.features.push(orig[c][3]);

	if (c == "Shepherd")
		drd.languages.push("Sylvan");
}

drd.addSkills = function(level, knownSkills) {
	var newSkills = skillChunk([1,6,9,10,11,14,17], 2, knownSkills);

	drd.skills = newSkills;
	return newSkills;
}

drd.addSpells = function(level, knownSpells) {
	drd.magic.slots = drd.getSpellSlots(level);
	var numCants = drd.getNumSpellsKnown(level);
	var spells = drd.getSpells(level, numCants, knownSpells.slice(0));
	// console.log("Trying spells still");
	// console.log(spells);
	drd.magic.spells = spells;
	return spells;
}

drd.getSpellSlots = function(level) {
	var slots = [];
	slots[1] = 2;
	// ss2=0;
	if (level >= 2)
		slots[1]++;
	if (level >= 3) {
		slots[1]++;
		slots[2] = 2;
	}
	if (level >= 4)
		slots[2]++;
	if (level >= 5) 
		slots[3] = 2;
	if (level >= 6)
		slots[3]++;
	if (level >= 7)
		slots[4] = 1;
	if (level >= 8)
		slots[4]++;
	if (level >= 9) {
		slots[4]++;
		slots[5] = 1;
	}
	if (level >= 10)
		slots[5]++;
	if (level >= 11)
		slots[6] = 1;
	if (level >= 13)
		slots[7] = 1;
	if (level >= 15)
		slots[8] = 1;
	if (level >= 17)
		slots[9] = 1;
	if (level >= 19)
		slots[6]++;
	if (level >= 20)
		slots[7]++;

	return slots;
}

/*

	sp = level + mod[4];		
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
*/
drd.getNumSpellsKnown = function(level) {
	//cantrips
	var x = 2;
	if (level >= 4)
		x++;
	if (level >= 10)
		x++;

	// bonus cantrip for circle of land
	if (drd.subclass == "Land") 
		x++;

	return x;
}

drd.getSpells = function(level, numCants, knownSpells) {
	var newSpells = [];
	newSpells[0] = [];

	if (drd.subclass == "Spores")
		newSpells = [["Chill Touch"],["Blindness/Deafness","Gentle Repose"],["Animate Dead","Gaseous Form"],["Bligh","Confusion"],["Cloudkill","Contagion"]];

	var cantos = skillChunk(drd.magic.list[0], numCants, newSpells.slice(0));
	newSpells[0] = newSpells[0].concat(cantos);

	if (drd.subclass == "Land") {
		var c = drd.subcircle;
		var lands = [];
		lands["Arctic"] = [[],["Hold Person","Spike Growth"],["Sleet Storm","Slow"],["Freedom of Movement","Ice Storm"],["Commune with Nature","Cone of Cold"]];
		lands["Coast"] = [[],["Mirror Image","Misty Step"],["Water Breathing","Water Walk"],["Control Water","Freedom of Movement"],["Conjure Elemental","Scrying"]];
		lands["Desert"] = [[],["Blur","Silence"],["Create Food and Water","Protection from Energy"],["Blight","Hallucinatory Terrain"],["Insect Plague","Wall of Stone"]];
		lands["Forest"] = [[],["Barkskin","Spider Climb"],["Call Lightning","Plant Growth"],["Divination","Freedom of Movement"],["Commune with Nature","Tree Stride"]];
		lands["Grassland"] = [[],["Invisibility","Pass without Trace"],["Daylight","Haste"],["Divination","Freedom of Movement"],["Dream","Insect Plague"]];
		lands["Mountain"] = [[],["Spider Climb","Spike Growth"],["Lightning Bolt","Meld into Stone"],["Stone Shape","Stoneskin"],["Passwall","Wall of Stone"]];
		lands["Swamp"] = [[],["Darkness","Melf's Acid Arrow"],["Water Walk","Stinking Cloud"],["Freedom of Movement","Locate Creature"],["Insect Plague","Scrying"]];
		lands["Underdark"] = [[],["Spider Climb","Web"],["Gaseous Form","Stinking Cloud"],["Greater Invisibility","Stone Shape"],["Cloudkill","Insect Plague"]];

		newSpells = [cantos, lands[c][1], lands[c][2], lands[c][3], lands[c][4]];
	}

	// var allSpells = drd.magic.list;
	// allSpells[0] = newSpells;
	return newSpells;
}
/*


	while (x > 0) {
		tempAr = drCantrip;
		if (Math.random() < 0.66)
			tempAr=["Guidance","Poison Spray","Resistance","Shillelagh","Thorn Whip"];
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
	
//1st level
	x=sp1;
	while (x > 0) {
		tempAr = dr1;
		if (Math.random() < 0.66)
			tempAr=["Charm Person","Cure Wounds","Cure Wounds","Cure Wounds","Entangle","Fog Cloud","Healing Word","Healing Word","Thunderwave","Thunderwave"];
		temp = tempAr[Math.floor(Math.random() * tempAr.length)];
// check if we already know spell
		if ((tempSpells.indexOf(temp) == -1) && (ciSpells.indexOf(temp) == -1)) {
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
		tempAr = dr2;
		if (Math.random() < 0.66) {
			tempAr=["Barkskin","Barkskin","Barkskin","Enhance Ability","Flame Blade", "Flaming Sphere", "Heat Metal","Heat Metal","Hold Person","Lesser Restoration","Moonbeam", "Pass without Trace", "Spike Growth"];
		}

		//add circle spells twice to make them more likely
		// if (ciSpells.length > 0) {

		// 	tempAr.unshift(ciSpells[0]);
		// 	tempAr.unshift(ciSpells[1]);
		// 	tempAr.unshift(ciSpells[0]);
		// 	tempAr.unshift(ciSpells[1]);

		// }

		

		temp = tempAr[Math.floor(Math.random() * tempAr.length)];
		
// check if we already know spell
		if ((tempSpells.indexOf(temp) == -1) && (ciSpells.indexOf(temp) == -1)) {
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
		tempAr = dr3;
		if (Math.random() < 0.66)
			tempAr= ["Call Lightning","Conjure Animals","Dispel Magic","Meld into Stone","Protection from Energy","Sleet Storm","Speak with Plants","Wind Wall"];
		temp = tempAr[Math.floor(Math.random() * tempAr.length)];


// check if we already know spell
		if ((tempSpells.indexOf(temp) == -1) && (ciSpells.indexOf(temp) == -1)) {
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
		tempAr = dr4;
		if (Math.random() < 0.5)
			tempAr= ["Blight","Confusion","Conjure Minor Elementals","Conjure Woodland Beings","Control Water","Dominate Beast","Giant Insect","Grasping Vine","Ice Storm","Locate Creature","Polymorph","Stone Shape","Stoneskin","Wall of Fire"];
		temp = tempAr[Math.floor(Math.random() * tempAr.length)];


// check if we already know spell
		if ((tempSpells.indexOf(temp) == -1) && (ciSpells.indexOf(temp) == -1)) {
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
		tempAr = dr5;
		if (Math.random() < 0.5)
			tempAr= ["Antilife Shell","Commune with Nature","Conjure Elemental","Contagion","Geas","Greater Restoration","Insect Plague","Mass Cure Wounds","Mass Cure Wounds","Planar Binding","Reincarnate","Tree Stride","Wall of Stone"];

		temp = tempAr[Math.floor(Math.random() * tempAr.length)];


// check if we already know spell
		if ((tempSpells.indexOf(temp) == -1) && (ciSpells.indexOf(temp) == -1)) {
			tempSpells.push(temp);				
			x--;
			}
			
	}	
	tempSpells.sort();
	mySpells = mySpells.concat(tempSpells);

}
*/