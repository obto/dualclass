var interface = [];
interface.previous = [];

interface.pickClass = function() {
	$("select.classSelector").html(function() {
		var fullStr = "<option value='random'>(random class)</option>";
		for (cl in world.classes) {
			fullStr += "<option value='"+world.classes[cl].class+"'>"+world.classes[cl].class+"</option>";
		}

		return fullStr;
	});
}
interface.pickLevel = function() {
	$("select.levelSelector").html(function() {
		var fullStr = "<option value='random'>(random level)</option>";
		for (var i = 1; i <= 20; i++) {
			fullStr += "<option value='"+i+"'>"+i+"</option>";
		}

		return fullStr;
	});
}

interface.pickRace = function() {
	$("select.raceSelector").html(function() {
		var fullStr = "<option value='random'>(random race)</option>";
		for (r in world.races) {
			fullStr += "<option value='"+world.races[r].name+"'>"+world.races[r].name+"</option>";
		}

		return fullStr;
	});
}

interface.books = [];
interface.titles = [];

// Regen class/race info when books are selected
$(".bookCheck").change(function() {
	var x = $(this).val();
	var b = [];

	$(".bookCheck").each(function(key) {
		if (this.checked)
			b.push($(this).val());
	});

	interface.books = books.getRequestedBooks(b);

	var r = interface.regenRaces();
	interface.classOptions = interface.regenClasses();
});

interface.regenRaces = function() {
	var races = world.baseRaces.slice(0);
	for (b in interface.books) {
		if ('races' in interface.books[b])
			races = races.slice(0).concat(interface.books[b].races.slice(0));
	}

	world.races = Array.from(new Set(races));
	interface.pickRace(); //refresh the list
	return races;
}

interface.regenClasses = function() {
	var classOptions = [];
	for (var i in interface.books) {
		for (var c in world.classNames) {
			var n = world.classNames[c];
			if ("classes" in interface.books[i] && n in interface.books[i].classes) {
				if (typeof classOptions[n] == 'undefined')
					classOptions[n] = [];
				classOptions[n] = classOptions[n].slice(0).concat(interface.books[i].classes[n].slice(0));
			}
		}
	}
	return classOptions;
}

// "Go" button any time after the first generation
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
				console.log(world.races);
				myRace = world.races[i];
				break;
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

	person.buildPerson(myLevel, myRace, myClass, interface.classOptions);
})

interface.printRace = function(r, base, title) {
	if (!r) {
		// So we can use this same function to clear all the text
		r = {
			name: '',
			features: [],
			skills: [],
			proficiencies: {},
		};
	}

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
	// interface.genBooks();
	interface.pickClass();
	interface.pickRace();
	interface.pickLevel();
	var r = random.pick(world.races);
	var cl = random.pick(world.classes);
	var lev = 1;
	person.buildPerson(lev, r, cl);
});
