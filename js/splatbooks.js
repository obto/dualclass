var books = [];

books.ravnica = [];
books.ravnica.name = "Guildmasters Guide to Ravnica";
books.ravnica.races = [centa,gobl,loxo,hybr,veda,mino];

books.ravnica.classes = {
	"Druid": ["Spores"],
	"Cleric": ["Order"]
};

books.volo = [];
books.volo.name = "Volos Guide to Monsters";
books.volo.races = [aasm,bugb,frbl,gobl,glth,hobl,kenk,kobl,lzrd,orc,tbxi,trit,ynti];
//["Aasimar","Bugbear","Firbolg","Goblin","Hobgoblin","Kenku","Kobold","Lizardfolk","Orc","Tabaxi","Triton","Yuan-ti Pureblood"];

books.evil = [];
books.evil.name = "Elemental Evil";
books.evil.races = [gnsi,glth]; //aarakocra

books.mord = [];
books.mord.name = "Mordenkainens Tome of Foes";
// books.mord.races = [gith];
books.mord.raceOptions = {
	"Dwarf": ["Gray Dwarf"],
	"Elf": ["Eladrin","Sea Elf","Shadar-kai"],
	"Gnome": ["Deep Gnome"],
	"Tiefling": ["Asmodeus","Baalzebul","Dispater","Fierna","Glasya","Levistus","Mammon","Mephistopheles","Zariel"],
};

books.sword = [];
books.sword.name = "Sword Coast Adventurers Guide";
books.sword.raceOptions = {
	"Halfling": ["Ghostwise Halfling"],
	"Dwarf": ["Gray Dwarf"],
	"Gnome": ["Deep Gnome"]
};

books.sword.classes = {
	"Barbarian": ["Battlerager","Totem Warrior"],
	"Cleric": ["Arcana"],
	"Fighter": ["Purple Dragon Knight"],
	"Monk": ["Long Death","Sun Soul"],
	"Paladin": ["Crown"],
	"Rogue": ["Mastermind","Swashbuckler"],
	"Sorceror": ["Storm Sorcery"],
	"Warlock": ["Undying"],
	"Wizard": ["Bladesinger"]
};

books.xanth = [];
books.xanth.name = "Xanathars Guide to Everything";
books.xanth.classes = {
	"Barbarian": ["Ancestral Guardian","Storm Herald","Zealot"],
	"Bard": ["Glamour","Swords","Whispers"],
	"Cleric": ["Forge","Grave"],
	"Druid": ["Dreams","Shepherd"],
	"Fighter": ["Arcane Archer","Cavalier"],
	"Monk": ["Drunken Master","Kensei","Sun Soul"],
	"Paladin": ["Conquest","Redemption"],
	"Ranger": ["Horizon Walker","Monster Slayer","Gloom Stalker"],
	"Rogue": ["Mastermind","Swashbuckler","Inquisitive","Scout"],
	"Sorceror": ["Storm Sorcery","Divine Soul","Shadow Magic"],
	"Warlock": ["Celestial","Hexblade"],
	"Wizard": ["War Magic"]
};

books.ua = [];
books.ua.name = "Unearthed Arcana";
books.ua.classes = {
	"Bard": ["Satire"],
	"Cleric": ["Protection"],
	"Druid": ["Twilight"],
	"Fighter": ["Scout","Monster Hunter","Sharpshooter","Brute"],
	"Ranger": ["Primeval Guardian"],
	"Paladin": ["Treachery"],
	"Sorceror": ["Phoenix Soul","Stone Sorcery","Sea Sorcery","Giant Soul"],
	"Warlock": ["Seeker","Raven Queen"],
	"Wizard": ["Artificer","Theurgy","Lore Mastery","Invention"]
};

books.dmg = [];
books.dmg.name = "Dungeon Masters Guide";
books.dmg.classes = {
	"Cleric": ["Death"],
	"Paladin": ["Oathbreaker"],
};

books.dmg.raceOptions = {
	"Elf": ["Eladrin"]
};

books.list = [books.ravnica, books.volo, books.evil, books.mord, books.sword, books.xanth, books.ua, books.dmg];

books.getBookByName = function(n) {
	for (var i = 0; i < books.list.length; i++) {
		if (books.list[i].name == n)
			return books.list[i];
	}
	return [];
}

books.showBookList = function() {
	var b = [];
	for (var i = 0; i < books.list.length; i++)
		b.push(books.list[i].name);

	console.log(b);

	return b;
}

books.getRequestedBooks = function(list) {
	var l = [];
	for (var i = 0; i < list.length; i++) {
		var x = books.getBookByName(list[i]);
		// if (x !== [])
		l.push(x);
	}
	return l;
}
