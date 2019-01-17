wrl = {};
wrl.class = "Warlock";
wrl.level = 1;
wrl.hDie = 8;
wrl.magic = {};
wrl.features = [];
wrl.skills = [];
wrl.invocations = [];
wrl.proficiencies = {};
wrl.proficiencies.weapons = ["Simple"];
wrl.proficiencies.armor = ["Light"];
wrl.proficiencies.other = [];
wrl.saves = ["Wisdom", "Charisma"];
wrl.statMods = [0,0,0,0,0,0];
wrl.subclass = "";
wrl.extraHP = 0;
wrl.hasHex = false;
wrl.hasEldritch = false;

wrl.generateClass = function(level, person) {
	wrl.level = level;
	wrl.addFeatures(level);

	// newSpells = wrl.addSpells(level, person.spells);
	// person.spells = person.spells.concat(newSpells);

	if (level >= 2) {
		wrl.chooseInvocations(level, person.skills.slice(0), person.spells.slice(0));
	}

	newSkills = wrl.addSkills(level, person.skills.slice(0));
	person.skills = person.skills.concat(newSkills);
}

wrl.printClass = function() {
	console.log("Level " + wrl.level + " Warlock in the " + wrl.subclass);
	console.log("Features:");
	console.log(wrl.features);
	console.log("Skills:");
	console.log(wrl.skills);
	// console.log("Expertise:");
	// console.log(wrl.expertise);
	// console.log("Spells:");
	// console.log(wrl.magic.spells);
	console.log("Proficiencies:");
	console.log(wrl.proficiencies);
	$(".basics p").text("Level " + wrl.level + " Warlock (" + wrl.subclass + ")");
	$("div.feat p").text(wrl.features + "");
	$("div.skills p").html(makeSkillText(wrl.skills));
	$("div.profs p").html(makeProfText(wrl.proficiencies));
	// $("div.spells p").text(wrl.magic.spells + "");
}

// -------------- FEATURES ----------
wrl.addFeatures = function(level) {
	wrl.chooseSubclass(level);
	wrl.features.push("Pact Magic");

	if (level >= 2) {
		wrl.features.push("Eldritch Invocations");
	} 

	if (level >= 3) {
		var pacts = ["Pact of the Chain","Pact of the Blade","Pact of the Tome"];
		if (wrl.subclass == "Seeker")
			pacts.push("Pact of the Star Chain");
		var p = pacts[randInt(0,pacts.length)];
		wrl.features.push("Pact Boon - "+p);
		wrl.boon = p;
	}

	if (level >= 11)
		wrl.features.push("Mystic Arcanum");
	if (level >= 20)
		wrl.features.push("Eldritch Master");
}

wrl.chooseSubclass = function(level) {
	var patr = ["Archfey","Celestial","Fiend","Ghost in the Machine","Great Old One","Hexblade","Raven Queen","Seeker","Undying"];
	var p = patr[randInt(0,patr.length)];
	wrl.subclass = p;
	wrl.features.push("Otherworldly Patron - The "+p);

	patr["Archfey"] = [["Fey Presence"],"Misty Escape","Beguiling Defenses","Dark Delirium"];
	patr["Celestial"] = [["Bonus Cantrips"],"Healing Light","Radiant Soul","Celestial Resilience","Searing Vengeance"];
	patr["Fiend"] = [["Dark One's Blessing"],"Dark One's Own Luck","Fiendish Resilience","Hurl Through Hell"];
	// patr["Ghost in the Machine"] = []
	patr["Great Old One"] = [["Awakened Mind"],"Entropic Ward","Thought Shield","Create Thrall"];
	patr["Hexblade"] = [["Hex Warrior","Hexblade's Curse"],"Accursed Specter","Armor of Hexes","Master of Hexes"];
	patr["Raven Queen"] = [["Sentinel Raven"],"Soul of the Raven","Raven's Shield","Queen's Right Hand"];
	patr["Seeker"] = [["Shielding Aurora"],"Astral Refuge","Far Wanderer","Astral Sequestration"];
	patr["Undying"] = [["Among the Dead"],"Defy Death","Undying Nature","Indestructible Life"];

	for (var i = 0; i < patr[p][0].length; i++) {
		wrl.features.push(patr[p][0][i]);
	}

	if (level >= 6)
		wrl.features.push(patr[p][1]);
	if (level >= 10)
		wrl.features.push(patr[p][2]);
	if (level >= 14)
		wrl.features.push(patr[p][3]);

	if (p == "Hexblade")
		wrl.hasHex = true;
}

wrl.chooseInvocations = function(level, knownSkills, knownSpells) {
	var invos = [];
	var myInvos = [];
	invos = ["Armor of Shadows","Beast Speech","Devil's Sight","Eldritch Sight","Eyes of the Rune Keeper","Fiendish Vigor","Gaze of Two Minds","Mask of Many Faces","Misty Visions","Thief of Five Fates"];

	if (knownSkills.indexOf(4) == -1 && knownSkills.indexOf(13) == -1)
		invos.push("Beguiling Influence");

	if (wrl.hasEldritch) {
	invos.push("Agonizing Blast","Eldritch Spear","Grasp of Hadar","Lance of Lethargy","Repelling Blast");
		if (wrl.subclass == "Raven Queen")
			invos.push("Raven Queen's Blessing");
	}

	if (wrl.subclass == "Seeker")
		invos.push("Seeker's Speech");
	
	// Pick 2 at level 2
	myInvos = skillChunk(invos, 2, []);
// 2 at 2, 3 at 5, 4 at 7, 5 at 9, 6 at 12, 7 at 15, 8 at 18

	if (wrl.pact == "Pact of the Tome") {
		invos.push("Aspect of the Moon","Book of Ancient Secrets");
		if (wrl.subclass == "Raven Queen")
			invos.push("Chronicle of the Raven Queen");
	}
	else if (wrl.pact == "Pact of the Chain")
		invos.push("Gift of the Ever-Living Ones","Voice of the Chain Master");
	else if (wrl.pact == "Pact of the Blade")
		invos.push("Improved Pact Weapon");

	if (level >= 5) {
		invos.push("Cloak of Flies","Gift of the Depths","Mire the Mind","One with Shadows","Sign of Ill Omen","Tomb of Levistus");
		if (wrl.pact == "Pact of the Blade")
			invos.push("Eldritch Smite","Thirsting Blade");
		if (wrl.hasHex)
			invos.push("Maddening Hex");
		if (wrl.subclass == "Fiend" && wrl.hasEldritch)
			invos.push("Kiss of Mephistopheles");

		myInvos = wrl.levelInvocations(myInvos, invos);
	}

	if (level >= 7) {
		invos.push("Bewitching Whispers","Dreadful Word","Ghostly Gaze","Sculptor of Flesh","Trickster's Escape");
		if (wrl.hasHex)
			invos.push("Relentless Hex");

		myInvos = wrl.levelInvocations(myInvos, invos);
	}

	if (level >= 9) {
		invos.push("Ascendant Step","Minions of Chaos","Otherworldly Leap","Whispers of the Grave");
		wrl.levelInvocations(myInvos, invos);
	}
	if (level >= 12) {
		if (wrl.pact == "Pact of the Blade")
			invos.push("Lifedrinker");

		myInvos = wrl.levelInvocations(myInvos, invos);
	}
	if (level >= 15) {
		invos.push("Master of Myriad Forms","Shroud of Shadow","Visions of Distant Realms","Witch Sight");
		if (wrl.pact == "Pact of the Chain")
			invos.push("Chains of Carceri");

		myInvos = wrl.levelInvocations(myInvos, invos);
	}
	if (level >= 18)
		myInvos = wrl.levelInvocations(myInvos, invos);

	wrl.invocations = myInvos;
}

wrl.levelInvocations = function(myInvos, invoList) {
	// maybe replace 1 invocation
	var r = Math.random();
	if (r < 0.3) {
		var x = randInt(0, myInvos.length);
		myInvos[x] = skillChunk(invoList, 1 myInvos);
	}

	// Add new ones
	myInvos = myInvos.concat(skillChunk(invoList, 1, myInvos));
	return myInvos;
}

wrl.addSkills = function(level, knownSkills) {
	var mySkills = [];

	// we already know we don't have this one
	if (!"Beguiling Influence" in wrl.invocations)
		mySkills = mySkills.concat([4, 13]);
	for (x=2;x > 0;x--) {
		mySkills.push(pickSome([2,4,5,7,8,10,14]));
	}
	break;

}

wrl.magic.list = [];
wrl.magic.list[0] = ["Create Bonfire","Frostbite","Magic Stone","Thunderclap","Blade Ward","Chill Touch","Eldritch Blast","Friends","Mage Hand","Minor Illusion","Poison Spray","Prestidigitation","True Strike"];
wrl.magic.list[1] = ["Armor of Agathys","Arms of Hadar","Charm Person","Comprehend Languages","Expeditious Retreat","Hellish Rebuke","Hex","Illusory Script","Protection from Good and Evil","Unseen Servant","Witch Bolt"];
wrl.magic.list[2] = ["Earthbind","Cloud of Daggers","Crown of Madness","Darkness","Enthrall","Hold Person","Invisibility","Mirror Image","Misty Step","Ray of Enfeeblement","Shatter","Spider Climb","Suggestion"];
wrl.magic.list[3] = ["Counterspell","Dispel Magic","Fear","Fly","Gaseous Form","Hunger of Hadar","Hypnotic Pattern","Magic Circle","Major Image","Remove Curse","Tongues","Vampiric Touch"];
wrl.magic.list[4] = ["Elemental Bane","Banishment","Blight","Dimension Door","Hallucinatory Terrain"];
wrl.magic.list[5] = ["Contact Other Plane","Dream","Hold Monster","Scrying"];

// var tomeRituals = ["Illusory Script","Identify","Identify","Identify","Find Familiar","Detect Disease and Poison","Detect Magic","Detect Magic","Detect Magic","Comprehend Languages","Unseen Servant","Tenser's Floating Disk","Speak with Animals","Speak with Animals","Purify Food and Drink","Alarm","Alarm"];

wrl.spellsfromInvo = function(tempAr) {
// SPELLS BASED ON INVOCATIONS
	waSpells = [0,1,2,3,4,5];
	if (tempAr.indexOf("Eldritch Sight") > -1) {
		waSpells[1].push("Detect Magic");
	}	
	if (tempAr.indexOf("Armor of Shadows") > -1) {
		waSpells[1].push("Mage Armor");
	}	
	if (tempAr.indexOf("Beast Speech") > -1) {
		waSpells[1].push("Speak with Animals");
	}	
	if (tempAr.indexOf("Fiendish Vigor") > -1) {
		waSpells[1].push("False Life");
	}	
	if (tempAr.indexOf("Mask of Many Faces") > -1) {
		waSpells[1].push("Disguise Self");
	}	
	if (tempAr.indexOf("Misty Visions") > -1) {
		waSpells[1].push("Silent Image");
	}	
	if (tempAr.indexOf("Thief of Five Fates") > -1) {
		waSpells[1].push("Bane");
	}	

	if (tempAr.indexOf("Otherworldly Leap") > -1) {
		waSpells[1].push("Jump");
	}
	if (tempAr.indexOf("Ascendant Step") > -1) {
		waSpells[2].push("Levitate");
	}
	if (tempAr.indexOf("Master of Myriad Forms") > -1) {
		waSpells[2].push("Alter Self");
	}
	if (tempAr.indexOf("Shroud of Shadow") > -1) {
		waSpells[2].push("Invisibility");
	}
	if (tempAr.indexOf("Visions of Distant Realms") > -1) {
		waSpells[4].push("Arcane Eye");
	}

	if (tempAr.indexOf("Mire the Mind") > -1) {
		waSpells[3].push("Slow");
	}	
	if (tempAr.indexOf("Whispers of the Grave") > -1) {
		waSpells[3].push("Speak with Dead");
	}
	if (tempAr.indexOf("Sign of Ill Omen") > -1) {
		waSpells[3].push("Bestow Curse");
	}	
	if (tempAr.indexOf("Bewitching Whispers") > -1) {
		waSpells[4].push("Compulsion");
	}	
	if (tempAr.indexOf("Dreadful Word") > -1) {
		waSpells[4].push("Confusion");
	}	
	if (tempAr.indexOf("Sculptor of Flesh") > -1) {
		waSpells[4].push("Polymorph");
	}
	if (tempAr.indexOf("Trickster's Escape") > -1) {
		waSpells[4].push("Freedom of Movement");
	}	
	if (tempAr.indexOf("Minions of Chaos") > -1) {
		waSpells[5].push("Conjure Elemental");
	}
	if (tempAr.indexOf("Chains of Carceri") > -1) {
		waSpells[5].push("Hold Monster");
	}

	return waSpells;
}

wrl.spellsfromPatron = function(p, allP) {
	allP["Archfey"] = [[],["Faerie Fire","Sleep"],["Calm Emotions","Phantasmal Force"],["Blink","Plant Growth"],["Dominate Beast"],["Greater Invisibility"],["Dominate Person","Seeming"]];
	allP["Celestial"] = [[],["Guiding Bolt","Cure Wounds"],["Flaming Sphere","Lesser Restoration"],["Daylight","Revivify"],["Guardian of Faith","Wall of Fire"],["Flame Strike","Greater Restoration"]];
	allP["Fiend"] = [[],["Burning Hands","Command"],["Blindness/Deafness","Scorching Ray"],["Fireball","Stinking Cloud"],["Fire Shield","Wall of Fire"],["Flame Strike","Hallow"]];
	allP["Great Old One"] = [[],["Dissonant Whispers","Tasha's Hideous Laughter"],["Detect Thoughts","Phantasmal Force"],["Clairvoyance","Sending"],["Dominate Beast","Evard's Black Tentacles"],["Dominate Person","Telekinesis"]];
	allP["Hexblade"] = [[],["Shield","Wrathful Smite"],["Blur","Branding Smite"],["Blink","Elemental Weapon"],["Phantasmal Killer","Staggering Smite"],["Banishing Smite","Cone of Cold"]];
	allP["Raven Queen"] = [[],["False Life","Sanctuary"],["Silence","Spiritual Weapon"],["Feign Death","Speak with Dead"],["Ice Storm","Locate Creature"],["Commune","Cone of Cold"]];
	allP["Seeker"] = [[],["Feather Fall","Jump"],["Levitate","Locate Object"],["Clairvoyance","Sending"],["Arcane Eye","Locate Creature"],["Legend Lore","Passwall"]];
	allP["Undying"] = [[],["False Life","Ray of Sickness"],["Blindness/Deafness","Silence"],["Feign Death","Speak with Dead"],["Aura of Life","Death Ward"],["Contagion","Legend Lore"]];

	return allP[p];
}

wrl.addSpells = function(level, knownSpells) {
	if ("Celestial")
		["Sacred Flame","Light"]
	if ("Undying")
		["Spare the Dying"]
}

//WARLOCKS
if (cl==14) {
	ss1=1;
	if (level>1)
		ss1=2;
	sp=level+1;
	if (level > 8)
		sp=10;

	sp1=2;
	sp2=0;
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
		sp2 = y;
		sp3 = sp-x-y;
	} else if (level < 9) {
		x = Math.floor(sp * .28);
		y = Math.floor(sp * .28);
		z = Math.floor(sp * .28);

		sum = sp - x-y-z;
		sp1 = sum;
		sp2 = y;
		sp3 = z;
		sp4 = x;

	} else {
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
	x=2;
	if (level >3)
		x=3;
	if (level >9)
		x=4;

	if (eblast==true) {
		myCantrips.push("Eldritch Blast")
		x--;
	}

	while (x > 0) {
		tempAr = waCantrip;

		if (Math.random() < 0.66)
			tempAr= ["Blade Ward","Chill Touch","Eldritch Blast","Eldritch Blast","Minor Illusion","Poison Spray","True Strike"];

		temp = tempAr[Math.floor(Math.random() * tempAr.length)];


// check if we already know spell
		if ((myCantrips.indexOf(temp) == -1) && (raceSpells.indexOf(temp) == -1)) {
			// add cantrip
			myCantrips.push(temp);							
			x--;
			} 

		}		
	//put in alphabetical order
	myCantrips.wrlt();


	//tome spells
	if (tome == true) {
		z=3;
		while (z> 0) {
			y=Math.floor(Math.random() * 5);
			if (y==0) {
				
				temp = baCantrip[Math.floor(Math.random() * baCantrip.length)];
			// check if we already know spell
					if ((myCantrips.indexOf(temp) == -1) && (waTome.indexOf(temp) == -1) && (raceSpells.indexOf(temp) == -1)) {
				// add cantrip
						waTome.push(temp);				
						z--;
						}
			}
			if (y==1) {
			
				temp = clCantrip[Math.floor(Math.random() * clCantrip.length)];
				// check if we already know spell
						if ((myCantrips.indexOf(temp) == -1) && (waTome.indexOf(temp) == -1) && (raceSpells.indexOf(temp) == -1)) {
					// add cantrip
							waTome.push(temp);				
							z--;
							}
					
					
			}
				if (y==2) {
					temp = drCantrip[Math.floor(Math.random() * drCantrip.length)];
				// check if we already know spell
						if ((myCantrips.indexOf(temp) == -1) && (waTome.indexOf(temp) == -1)  && (raceSpells.indexOf(temp) == -1)) {
					// add cantrip
							waTome.push(temp);				
							z--;
							}
					
					
				}
				if (y==3) {
					temp = soCantrip[Math.floor(Math.random() * soCantrip.length)];
				// check if we already know spell
						if ((myCantrips.indexOf(temp) == -1) && (waTome.indexOf(temp) == -1) && (raceSpells.indexOf(temp) == -1)) {
					// add cantrip
							waTome.push(temp);				
							z--;
							}
					
				}
				if (y==4) {
					temp = wiCantrip[Math.floor(Math.random() * wiCantrip.length)];
				// check if we already know spell
						if ((myCantrips.indexOf(temp) == -1) && (waTome.indexOf(temp) == -1) && (raceSpells.indexOf(temp) == -1)) {
					// add cantrip
							waTome.push(temp);				
							z--;
							}
					
					
				}
		}
		waTome.wrlt();
		
		// if you have invocation for pact of tome
		if (abOutput.indexOf("Ancient Secrets") > -1) {

			xx=2;
			while (xx>0) {
				temp = tomeRituals[Math.floor(Math.random() * tomeRituals.length)];
				if ((mySpells.indexOf(temp) == -1) && (waTomeRituals.indexOf(temp) == -1)) {
			// add ritual
					waTomeRituals.push(temp);				
					xx--;
				}
			}

			xx=0;	
			if (upgradeUncommon() == true) {
				xx += Math.floor((Math.random() * 2) +1);
			}
			if (upgradeRare() == true) {
				xx += Math.floor((Math.random() * 2) +1);
			}
			console.log("Tome has " + (2+xx) + " rituals");

			if (level > 3) {
				tomeRituals.push("Magic Mouth");
				tomeRituals.push("Magic Mouth");
				tomeRituals.push("Silence");
				tomeRituals.push("Augury");
				tomeRituals.push("Beast Sense");
				tomeRituals.push("Gentle Repose");
				tomeRituals.push("Locate Animals or Plants");
				tomeRituals.push("Animal Messenger");
				tomeRituals.push("Animal Messenger");
			}
			if (level > 5) {
				tomeRituals.push("Meld into Stone");
				tomeRituals.push("Feign Death");
				tomeRituals.push("Meld into Stone");
				tomeRituals.push("Leomund’s Tiny Hut");
				tomeRituals.push("Leomund’s Tiny Hut");
				tomeRituals.push("Water Breathing");
				tomeRituals.push("Phantom Steed");
				tomeRituals.push("Water Walk");
				tomeRituals.push("Water Breathing");
				tomeRituals.push("Phantom Steed");
				tomeRituals.push("Water Walk");

			}
			if (level > 7) {
				tomeRituals.push("Divination");
				
			}
			if (level > 9) {
				tomeRituals.push("Contact Other Plane");
				tomeRituals.push("Commune");
				tomeRituals.push("Contact Other Plane");
				tomeRituals.push("Commune with Nature");
				tomeRituals.push("Rary's Telepathic Bond");
			}

			while (xx>0) {
				temp = tomeRituals[Math.floor(Math.random() * tomeRituals.length)];
				if ((mySpells.indexOf(temp) == -1) && (waTomeRituals.indexOf(temp) == -1)) {
			// add ritual
					waTomeRituals.push(temp);				
					xx--;
				}
			}
		}
		waTomeRituals.wrlt();
		
	}
	

	//1st
	tempSpells=[];
	x=sp1;
	while (x > 0) {
		tempAr = wa1;
		if (Math.random() < 0.66)
			tempAr=["Armor of Agathys","Arms of Hadar","Charm Person","Hellish Rebuke","Hex","Witch Bolt"];

		tempAr = tempAr.concat(patronSpells1);
		temp = tempAr[Math.floor(Math.random() * tempAr.length)];

	// check if we already know spell
			if (tempSpells.indexOf(temp) == -1) {
				tempSpells.push(temp);				
				x--;
			}
	}
	tempSpells.wrlt();
	mySpells = mySpells.concat(tempSpells);


	//2nd level
	tempSpells=[];
	x=sp2;
	
	while (x > 0) {
	tempAr = wa2;

	if (Math.random() < 0.66)
		tempAr=["Cloud of Daggers","Crown of Madness","Hold Person","Invisibility","Mirror Image","Misty Step","Ray of Enfeeblement","Shatter","Suggestion"];

	tempAr = tempAr.concat(patronSpells2);
	temp = tempAr[Math.floor(Math.random() * tempAr.length)];

// check if we already know spell
		if (tempSpells.indexOf(temp) == -1) {
			tempSpells.push(temp);				
			x--;
		}
	}
	tempSpells.wrlt();
	mySpells = mySpells.concat(tempSpells);

//3rd level
	tempSpells=[];
	x=sp3;
	while (x > 0) {
		tempAr = wa3;
		if (Math.random() < 0.66)
			tempAr=["Counterspell","Dispel Magic","Fear","Fear","Fly","Gaseous Form","Hunger of Hadar","Hunger of Hadar","Hypnotic Pattern","Magic Circle","Major Image","Vampiric Touch","Vampiric Touch"];

		tempAr = tempAr.concat(patronSpells3);
		temp = tempAr[Math.floor(Math.random() * tempAr.length)];


// check if we already know spell
		if (tempSpells.indexOf(temp) == -1) {
			tempSpells.push(temp);				
			x--;
			}
			
	}	
	tempSpells.wrlt();
	mySpells = mySpells.concat(tempSpells);





//4th
	tempSpells=[];
	x=sp4;
	while (x > 0) {
		tempAr = wa4;
		if (Math.random() < 0.5)
			tempAr=["Banishment","Blight","Dimension Door"];

		tempAr = tempAr.concat(patronSpells4);
		temp = tempAr[Math.floor(Math.random() * tempAr.length)];


// check if we already know spell
		if (tempSpells.indexOf(temp) == -1) {
			tempSpells.push(temp);				
			x--;
			}
			
	}	
	tempSpells.wrlt();
	mySpells = mySpells.concat(tempSpells);




//5th
	tempSpells=[];
	x=sp5;
	while (x > 0) {
		tempAr = wa5;
		tempAr = tempAr.concat(patronSpells5);
		temp = tempAr[Math.floor(Math.random() * tempAr.length)];


// check if we already know spell
		if (tempSpells.indexOf(temp) == -1) {
			tempSpells.push(temp);				
			x--;
			}
			
	}	
	tempSpells.wrlt();
	mySpells = mySpells.concat(tempSpells);
}


