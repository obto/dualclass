pal = {};
pal.class = "Paladin";
pal.level = 1;
pal.hDie = 10;
pal.features = [];
pal.auraLength = 10;
pal.skills = [];
pal.magic = [];
pal.resistance = [];
pal.proficiencies = [];
pal.proficiencies.weapons = ["Simple", "Martial"];
pal.proficiencies.armor = ["Light","Medium","Heavy","Shields"];
pal.proficiencies.other = [];
pal.saves = ["Charisma", "Wisdom"];
pal.subclass = "";

pal.magic.list = [];
pal.magic.list[1] = ["Bless","Command","Compelled Duel","Cure Wounds","Detect Evil and Good","Detect Magic","Detect Poison and Disease","Divine Favor","Heroism","Protection from Evil and Good","Purify Food and Drink","Searing Smite","Shield of Faith","Thunderous Smite","Wrathful Smite"];
pal.magic.list[2] = ["Aid","Branding Smite","Find Steed","Lesser Restoration","Locate Object","Magic Weapon","Protection from Poison","Zone of Truth"];
pal.magic.list[3] = ["Aura of Vitality","Blinding Smite","Create Food and Water","Crusader's Mantle","Daylight","Dispel Magic","Elemental Weapon"];
pal.magic.list[4] = ["Aura of Life","Aura of Purity","Banishment","Banishment","Death Ward","Dimension Door","Freedom of Movement","Guardian of Faith","Ice Storm","Locate Creature","Staggering Smite","Stoneskin"];
pal.magic.list[5] = ["Banishing Smite","Circle of Power","Commune","Commune with Nature","Destructive Smite/Wave?","Dispel Evil and Good","Flame Strike","Geas","Hold Monster","Raise Dead","Scrying","Tree Stride"];

pal.reset = function(classes) {
	pal.name = "Paladin";
	pal.level = 1;
	pal.features = [];
	pal.auraLength = 10;
	pal.skills = [];
	pal.magic.slots = [];
	pal.magic.spells = [];
	pal.resistance = [];
	pal.proficiencies = {};
	pal.proficiencies.weapons = ["Simple", "Martial"];
	pal.proficiencies.armor = ["Light","Medium","Heavy","Shields"];
	pal.proficiencies.other = [];
	pal.saves = ["Charisma", "Wisdom"];
	pal.subclass = "";

	var list = ["Devotion","Ancients","Vengeance"];
	if (typeof classes != 'undefined')
		pal.subclassList = list.slice(0).concat(classes.slice(0));
	else
		pal.subclassList = list;
}

pal.generateClass = function(level, person) {
	pal.level = level;
	pal.addFeatures(level);

	newSkills = pal.addSkills(level, person.skills.slice(0));
	// person.skills = person.skills.concat(newSkills);

	if (level >= 2)
		newSpells = pal.addSpells(level, person.spells.slice(0));
	
	pal.name = "Level " + pal.level + " Paladin (Oath of " + pal.subclass+")";
	if (pal.subclass == "Oathbreaker")
		pal.name = "Level "+pal.level+" Paladin (Oathbreaker)";
}
pal.printClass = function(){
	$(".basics p").text("Level " + pal.level + " Paladin (" + pal.subclass + " Domain)");
	$("div.feat p").text(pal.features.join(", "));
	$("div.skills p").html(makeSkillText(pal.skills));
	$("div.profs p").html(makeProfText(pal.proficiencies));
	if ("spells" in pal.magic) {
		$("div.spells p").html(makeSpellText(pal.magic.oathspells));
		$("div.slots").html(printSpellSlots(pal.magic.slots));
	}
}
pal.addFeatures = function(level) {
	pal.features.push("Divine Sense", "Lay on Hands (" +(level * 5)+ " hp)");	
	
	if (level >= 2) {
		var styles = ["Defense","Dueling","Great Weapon Fighting","Protection"];
		var s = random.pick(styles);
		pal.features.push("Fighting Style - "+s, "Spellcasting", "Divine Smite");
	}
	if (level >= 3) {
		pal.features.push("Divine Health");
		pal.chooseSubclass(level);
	}
	if (level >= 5)
		pal.features.push("Extra Attack");
	if (level >= 6) {
		pal.auraLength = 10;
		if (level >= 18) pal.auraLength = 30

		pal.features.push("Aura of Protection ("+pal.auraLength+"ft)");
	}
	if (level >= 10) {
		pal.features.push("Aura of Courage ("+pal.auraLength+"ft)");
	}
	if (level >= 11)
		pal.features.push("Improved Divine Smite");
	if (level >= 14)
		pal.features.push("Cleansing Touch");
}

pal.chooseSubclass = function(level) {
	var archs = pal.subclassList.slice(0);
	var x = random.pick(archs);
	pal.subclass = x;
	pal.features.push("Sacred Oath - "+pal.subclass);
	
	archs["Ancients"] = ["Channel Divinity (Nature's Wrath, Turn the Faithless)","Aura of Warding","Undying Sentinel","Elder Champion"];
	archs["Conquest"] = ["Channel Divinity (Conquering Presence, Guided Strike)","Aura of Conquest","Scornful Rebuke","Invincible Conqueror"];
	archs["Devotion"] = ["Channel Divinity (Sacred Weapon, Turn the Unholy)", "Aura of Devotion","Purity of Spirit","Holy Nimbus"];
	archs["Oathbreaker"] = ["Channel Divinity (Control Undead, Dreadful Aspect)","Aura of Hate","Supernatural Resistance","Dread Lord"];
	archs["Redemption"] = ["Channel Divinity (Emissary of Peace, Rebuke the Violent)", "Aura of the Guardian","Protective Spirit","Emissary of Redemption"];
	archs["Vengeance"] = ["Channel Divinity (Abjure Enemy, Vow of Enmity)", "Relentless Avenger", "Soul of Vengeance","Avenging Angel"];

	pal.features.push(archs[x][0]);
	if (level >= 7)
		pal.features.push(archs[x][1]);
	if (level >= 15) {
		pal.features.push(archs[x][2]);
		if (x == "Oathbreaker") {
			pal.resistance.push("nonmagical bludgeoning/piercing/slashing");
		}
	}
	if (level >= 20)
		pal.features.push(archs[x][3]);
}

pal.addSkills = function(level, knownSkills) {
	var mySkills = skillChunk([0,6,7,9,13,14], 2, knownSkills);
	pal.skills = mySkills;
	return mySkills;
}

pal.addSpells = function(level, knownSpells) {
	pal.magic.slots = pal.getSpellSlots(level);
	// var numCants = drd.getNumSpellsKnown(level);
	var spells = pal.getSpells(level, knownSpells.slice(0));
	pal.magic.spells = spells;

	return spells;
}

pal.getSpellSlots = function(level) {
	var slots = [];
	if (level >= 2)
		slots[1] = 2;
	if (level >= 3)
		slots[1]++;
	if (level >= 5)  {
		slots[1]++;
		slots[2] = 2;
	}
	if (level >= 7)
		slots[2]++;
	if (level >= 9)
		slots[3] = 2;
	if (level >= 11)
		slots[3]++;
	if (level >= 13)
		slots[4] = 1;
	if (level >= 15)
		slots[4]++;
	if (level >= 17) {
		slots[4]++;
		slots[5] = 1;
	}
	if (level >= 19)
		slots[5]++;

	return slots;
}

pal.getNumSpellsToday = function(level) {
	return Math.max(parseInt(level) + person.modifiers[5], 1);
}

pal.getSpells = function(level, knownSpells) {
	var oaths = [];
	oaths["Ancients"] = [[],["Ensnaring Strike","Speak with Animals"],["Moonbeam","Misty Step"],["Plant Growth","Protection from Energy"],["Ice Storm","Stoneskin"],["Commune with Nature","Tree Stride"]];
	oaths["Conquest"] = [[],["Armor of Agathys","Command"],["Hold Person","Spiritual Weapon"],["Bestow Curse","Fear"],["Dominate Beast","Stoneskin"],["Cloudkill","Dominate Person"]];
	oaths["Devotion"] = [[],["Protection from Evil and Good","Sanctuary"],["Lesser Restoration","Zone of Truth"],["Beacon of Hope","Dispel Magic"],["Freedom of Movement","Guardian of Faith"],["Commune","Flame Strike"]];
	oaths["Oathbreaker"] = [[],["Hellish Rebuke","Inflict Wounds"],["Crown of Madness","Darkness"],["Animate Dead","Bestow Curse"],["Blight","Confusion"],["Contagion","Dominate Person"]];
	oaths["Redemption"] = [[],["Sanctuary","Sleep"],["Calm Emotions","Hold Person"],["Counterspell","Hypnotic Pattern"],["Otiluke's Resilient Sphere","Stoneskin"],["Hold Monster","Wall of Force"]];
	oaths["Vengeance"] = [[],["Bane","Hunter's Mark"],["Hold Person","Misty Step"],["Haste","Protection from Energy"],["Banishment","Dimension Door"],["Hold Monster","Scrying"]];
	
	// var oSpell = [];
	var x = pal.subclass;
	var beforeList = pal.magic.list.slice(0);

	if (x != "") {	
		pal.magic.list = world.combineSpellLists(pal.magic.list.slice(0), oaths[x].slice(0));
	}
	// var spells = pickAllSpells(2, level, pal, knownSpells.slice(0), false);
	var spells = pickSpellsAgnostic(level, pal, knownSpells.slice(0));
	pal.magic.list = beforeList.slice(0);
	return spells;
}

