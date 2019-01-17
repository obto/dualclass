bgs = {};
bgs.bName = "";
bgs.features = [];
bgs.skills = [];
bgs.extraLang = 0;
bgs.proficiencies = [];
bgs.proficiencies.other = [];
bgs.specialty = "";

bgs.chooseBg = function(person) {
	list = ["Acolyte","Charlatan","Criminal","Entertainer","Folk Hero","Guild Artisan","Hermit","Noble","Outlander","Sage","Sailor","Soldier","Urchin"];
	bg = list[randInt(0, list.length)];
	bgs.bName = bg;

	bgs.addFeatures(bg);

	// console.log("BG SKILLS");
	person.skills = person.skills.concat(bgs.skills.slice(0));
	// console.log(bgs.skills);
	// console.log(person.skills);

	person.proficiencies.other = bgs.proficiencies.other.slice(0);
	person.extraLangs += bgs.extraLang;

	if (bgs.specialty)
		person.bg = bgs.bName + " - " + bgs.specialty;
	else
		person.bg = bgs.bName;
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
			
			game = world.games[randInt(0, world.games.length)];
			bgs.proficiencies.other = ["Thieves' tools", game];
			
			specials = ["Blackmailer","Burglar","Enforcer","Fence","Highway robber","Hired killer","Pickpocket","Smuggler"];
			bgs.specialty = specials[randInt(0, specials.length)];
			break;
		case "Entertainer":
			bgs.skills = [0, 12];
			bgs.features.push("By Popular Demand");

			inst = world.instruments[randInt(0, world.instruments.length)];
			bgs.proficiencies.other = ["Disguise kit", inst];

			specials = ["Actor","Dancer","Fire-eater","Jester","Juggler","Instrumentalist","Poet","Singer","Storyteller","Tumbler"];
			bgs.specialty = specials[randInt(0, specials.length)];
			break;
		case "Folk Hero":
			bgs.skills = [1, 17];
			bgs.features.push("Rustic Hospitality");

			art = world.artisan[randInt(0, world.artisan.length)];
			bgs.proficiencies.other = ["Vehicles (land)", art + "'s tools"];
			
			specials = ["Stood up to tyrant","Natural disaster","Terrible monster","Robin Hood","Led militia","Armed the people","Trained peasants","Symbolic protest","Fey blessing","Army leadership"];
			bgs.specialty = specials[randInt(0, specials.length)];
			break;
		case "Guild Artisan":
			bgs.skills = [6, 13];
			bgs.features.push("Guild Membership");

			art = world.artisan[randInt(0, world.artisan.length)];
			bgs.proficiencies.other = [art];
			
			bgs.extraLang = 1;
			break;
		case "Hermit":
			bgs.skills = [9, 14];
			bgs.features.push("Discovery");
			bgs.proficiencies.other = ["Herbalism kit"];

			bgs.extraLang = 1;

			specials = ["Seeking enlightenment","Communal living","Exiled unfairly","Retreated","Silence for art","Love of nature","Ruins caretaker","Pilgrim"];
			bgs.specialty = specials[randInt(0, specials.length)];
			break;
		case "Noble":
			bgs.skills = [5, 13];
			bgs.features.push("Position of Privilege");

			game = world.games[randInt(0, world.games.length)];
			bgs.proficiencies.other = [game];

			bgs.extraLang = 1;

			break;
		case "Outlander":
			bgs.skills = [3, 17];
			bgs.features.push("Wanderer");

			inst = world.instruments[randInt(0, world.instruments.length)];
			bgs.proficiencies.other = [inst];

			bgs.extraLang = 1;

			specials = ["Forester","Trapper","Homesteader","Guide","Exile/outcast","Bounty hunter","Pilgrim","Tribal nomad","Hunter-gatherer","Tribal marauder"];
			bgs.specialty = specials[randInt(0, specials.length)];
			break;
		case "Sage":
			bgs.skills = [2, 5];
			bgs.features.push("Researcher");

			bgs.extraLang = 2;

			specials = ["Alchemist","Astronomer","Discredited academic","Librarian","Professor","Researcher","Wizard's apprentice","Scribe"];
			bgs.specialty = specials[randInt(0, specials.length)];
			break;
		case "Sailor":
			bgs.skills = [3, 11];
			bgs.features.push("Ship's Passage");
			bgs.proficiencies.other = ["Navigator's tools","Vehicles (water)"];
			break;
		case "Soldier":
			bgs.skills = [3, 7];
			bgs.features.push("Military Rank");

			game = world.games[randInt(0, world.games.length)];
			bgs.proficiencies.other = [game, "Vehicles (land)"];

			specials = ["Officer","Scout","Infantry","Cavalry","Healer","Quartermaster","Standard bearer","Support staff"];
			bgs.specialty = specials[randInt(0, specials.length)];
			break;
		case "Urchin":
			bgs.skills = [15, 16];
			bgs.features.push("City Secrets");

			bgs.proficiencies.other = ["Disguise kit", "Thieves' tools"];
			break
	}
}