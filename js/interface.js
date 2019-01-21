var interface = [];
interface.previous = [];

interface.pickClass = function() {
	$("select.classSelector").html(function() {
		var fullStr = "<option value='random'>(randomize)</option>";
		for (cl in world.classes) {
			fullStr += "<option value='"+world.classes[cl].class+"'>"+world.classes[cl].class+"</option>";
		}

		return fullStr;
	});
}
interface.pickLevel = function() {
	$("select.levelSelector").html(function() {
		var fullStr = "<option value='random'>(randomize)</option>";
		for (var i = 1; i <= 20; i++) {
			fullStr += "<option value='"+i+"'>"+i+"</option>";
		}

		return fullStr;
	});
}

interface.pickRace = function() {
	$("select.raceSelector").html(function() {
		var fullStr = "<option value='random'>(randomize)</option>";
		for (r in world.races) {
			fullStr += "<option value='"+world.races[r].name+"'>"+world.races[r].name+"</option>";
		}

		return fullStr;
	});
}

$(".genStuff").submit(function(e) {
	e.preventDefault();
	var lev = $(".levelSelector").val();
	var r = $(".raceSelector").val();
	var cl = $(".classSelector").val();
	var myClass = ""; var myRace = ""; var myLevel = 0;

	if (lev == "random") {
		myLevel = random.integer(1, 20);
	}
	else {
		myLevel = lev;
	}

	if (r == "random") {
		myRace = random.pick(world.races);
	}
	else {
		for (var i = 0; i < world.races.length; i++) {
			world.races[i].reset();
			if (world.races[i].name == r) {
				myRace = world.races[i];
				break;
				// world.races[i].reset();
				// person.buildPerson(r, world.races[i]);
				// return;
			}
		}
	}
	// randomize classes
	if (cl == "random") {
		var myClass = random.pick(world.classes);
	}
	// test a specific class
	else {
		for (var i = 0; i < world.classes.length; i++) {
			// world.classes[i].reset();
			if (world.classes[i].class == cl) {
				myClass = world.classes[i];
				break;
				// world.classes[i].reset();
				// person.buildPerson(r, world.classes[i]);
				// return;
			}
		}
	}

	person.buildPerson(myLevel, myRace, myClass);
})

interface.printRace = function(r, base, title) {
	$(base + " .basics h3").text(title+": "+r.name);
	if ("features" in r && r.features.length > 1) {
		$(base + " .feats p").show();
		$(base + " .feats p").text(r.features.join(", "));
	}
	else if ("features" in r && r.features.length == 1) {
		$(base + " .feats p").show();
		$(base + " .feats p").text(r.features.toString());
	}
	else
		$(base + " .feats p").hide();

	// console.log("pirnted all ye features");
	
	if ("skills" in r && r.skills.length > 0) {
		$(base + " .skills").show();
		$(base + " .skills p").html(makeSkillText(r.skills));
	}
	else {
		$(base + " .skills").hide();
	}

	// console.log("pirnted all ye skills");

	interface.showMagic(r, base);

	// console.log("pirnted all ye spells");

	if (interface.areProficienciesEmpty(r)) {
		var profs = makeProfText(r.proficiencies);
		$(base + " .profs").show();
		$(base + " .profs p").html(profs);
	}
	else {
		$(base + " .profs").hide();
	}

	// console.log("pirnted all ye proficiencies");
}

interface.areProficienciesEmpty = function(p) {
	var isEmpty = true;

	if (!"proficiencies" in p)
		return false;

	if ("weapons" in p.proficiencies && p.proficiencies.weapons.length > 0)
		return true;
	else if ("armor" in p.proficiencies && p.proficiencies.armor.length > 0)
		return true;
	else if ("other" in p.proficiencies && p.proficiencies.other.length > 0)
		return true;
	else {
		return false;
	}
}

interface.showMagic = function(r, base) {
	if ("spells" in r && r.spells.length > 0) {
		$(base + " .magic").show();
		$(base + " .magic .spells").html(makeSpellText(r.spells));
		return;
	}
	else if ("magic" in r && "spells" in r.magic && r.magic.spells.length > 0) {
		$(base + " .magic").show();
		$(base + " .magic .spells").html(makeSpellText(r.magic.spells));
		if ("slots" in r.magic) {
			$(base + " .magic .slots").html(printSpellSlots(r.magic.slots));
		}
		return;
	}
	else {
		$(base + " .magic").hide();
	}
}

$(document).ready(function() {
	interface.pickClass();
	interface.pickRace();
	interface.pickLevel();
	var r = random.pick(world.races);
	var cl = random.pick(world.classes);
	var lev = 1;
	person.buildPerson(lev, r, cl);
});
