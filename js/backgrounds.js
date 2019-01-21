bgs = {};
bgs.name = "";
bgs.features = [];
bgs.skills = [];
bgs.extraLang = 0;
bgs.proficiencies = [];
bgs.proficiencies.other = [];
bgs.specialty = "";

bgs.reset = function() {
	bgs.name = "";
	bgs.features = [];
	bgs.skills = [];
	bgs.extraLang = 0;
	bgs.proficiencies = [];
	bgs.proficiencies.weapons = [];
	bgs.proficiencies.armor = [];
	bgs.proficiencies.other = [];
	bgs.specialty = "";
}

bgs.chooseBg = function(person) {
	bgs.reset();

	var list = ["Acolyte","Charlatan","Criminal","Entertainer","Folk Hero","Guild Artisan","Hermit","Noble","Outlander","Sage","Sailor","Soldier","Urchin"];
	var bg = random.pick(list);
	
	bgs.name = bg;
	bgs.addFeatures(bg);

	// person.skills = person.skills.concat(bgs.skills.slice(0));

	// person.proficiencies.other = bgs.proficiencies.other.slice(0);
	// person.extraLangs += bgs.extraLang;

	if (bgs.specialty) {
		bgs.name = bgs.name + " - " + bgs.specialty;
	}

	return bgs;
}

bgs.printBg = function() {
	$(".bg p").html(person.bg + "<br />"+
		makeProfText(bgs.proficiencies) + "<br />" +
		bgs.features.toString() + "<br />" +
		makeSkillText(bgs.skills)
	);
}

bgs.addFeatures = function(bg) {
	switch(bg){
		case "Acolyte":
			bgs.skills = [6, 14];
			bgs.features.push("Shelter of the Faithful");
			
			bgs.extraLang = 2;
			break;
		case "Charlatan":
			bgs.skills = [4, 15];
			bgs.features.push("False Identity");
			
			bgs.proficiencies.other = ["Disguise kit", "Forgery kit"];
			break;
		case "Criminal":
			bgs.skills = [4, 16];
			bgs.features.push("Criminal Contact");
			
			var game = random.pick(world.games);
			bgs.proficiencies.other = ["Thieves' tools", game];
			
			var specials = ["Blackmailer","Burglar","Enforcer","Fence","Highway robber","Hired killer","Pickpocket","Smuggler"];
			bgs.specialty = random.pick(specials);
			break;
		case "Entertainer":
			bgs.skills = [0, 12];
			bgs.features.push("By Popular Demand");

			var inst = random.pick(world.instruments);
			bgs.proficiencies.other = ["Disguise kit", inst];

			var specials = ["Actor","Dancer","Fire-eater","Jester","Juggler","Instrumentalist","Poet","Singer","Storyteller","Tumbler"];
			bgs.specialty = random.pick(specials);
			break;
		case "Folk Hero":
			bgs.skills = [1, 17];
			bgs.features.push("Rustic Hospitality");

			var art = random.pick(world.artisan);
			bgs.proficiencies.other = ["Vehicles (land)", art + "'s tools"];
			
			specials = ["Stood up to tyrant","Natural disaster","Terrible monster","Robin Hood","Led militia","Armed the people","Trained peasants","Symbolic protest","Fey blessing","Army leadership"];
			bgs.specialty = random.pick(specials);
			break;
		case "Guild Artisan":
			bgs.skills = [6, 13];
			bgs.features.push("Guild Membership");

			var art = random.pick(world.artisan);
			bgs.proficiencies.other = [art];
			
			bgs.extraLang = 1;
			break;
		case "Hermit":
			bgs.skills = [9, 14];
			bgs.features.push("Discovery");
			bgs.proficiencies.other = ["Herbalism kit"];

			var specials = ["Seeking enlightenment","Communal living","Exiled unfairly","Retreated","Silence for art","Love of nature","Ruins caretaker","Pilgrim"];
			bgs.specialty = random.pick(specials);

			bgs.extraLang = 1;
			
			break;
		case "Noble":
			bgs.skills = [5, 13];
			bgs.features.push("Position of Privilege");

			var game = random.pick(world.games);
			bgs.proficiencies.other = [game];

			bgs.extraLang = 1;

			break;
		case "Outlander":
			bgs.skills = [3, 17];
			bgs.features.push("Wanderer");

			var inst = random.pick(world.instruments);
			bgs.proficiencies.other = [inst];

			bgs.extraLang = 1;

			var specials = ["Forester","Trapper","Homesteader","Guide","Exile/outcast","Bounty hunter","Pilgrim","Tribal nomad","Hunter-gatherer","Tribal marauder"];
			bgs.specialty = random.pick(specials);
			break;
		case "Sage":
			bgs.skills = [2, 5];
			bgs.features.push("Researcher");

			bgs.extraLang = 2;

			var specials = ["Alchemist","Astronomer","Discredited academic","Librarian","Professor","Researcher","Wizard's apprentice","Scribe"];
			bgs.specialty = random.pick(specials);
			break;
		case "Sailor":
			bgs.skills = [3, 11];
			bgs.features.push("Ship's Passage");
			bgs.proficiencies.other = ["Navigator's tools","Vehicles (water)"];
			break;
		case "Soldier":
			bgs.skills = [3, 7];
			bgs.features.push("Military Rank");

			var game = random.pick(world.games);
			bgs.proficiencies.other = [game, "Vehicles (land)"];

			var specials = ["Officer","Scout","Infantry","Cavalry","Healer","Quartermaster","Standard bearer","Support staff"];
			bgs.specialty = random.pick(specials);
			break;
		case "Urchin":
			bgs.skills = [15, 16];
			bgs.features.push("City Secrets");

			bgs.proficiencies.other = ["Disguise kit", "Thieves' tools"];
			break
	}
}