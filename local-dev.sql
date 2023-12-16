CREATE TABLE IF NOT EXISTS `Bosses` (
`boss_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
`boss_name` text NOT NULL,
`boss_optional` numeric,
`boss_dlc` numeric,
`boss_game` integer NOT NULL, boss_image string,
FOREIGN KEY (`boss_dlc`) REFERENCES `DLC`(`dlc_id`) ON UPDATE no action ON DELETE no action,
FOREIGN KEY (`boss_game`) REFERENCES `Games`(`game_id`) ON UPDATE no action ON DELETE no action
);
INSERT INTO Bosses VALUES(1,'Phalanx',0,NULL,1,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/demonsouls/phalanx.webp');
INSERT INTO Bosses VALUES(2,'Tower Knight',0,NULL,1,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/demonsouls/towerknight.webp?t=2023-12-13T11%3A27%3A17.199Z');
INSERT INTO Bosses VALUES(3,'Armor Spider',0,NULL,1,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/demonsouls/armorspider.webp');
INSERT INTO Bosses VALUES(4,'Flamelurker',0,NULL,1,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/demonsouls/flamelurker.webp?t=2023-12-13T11%3A26%3A03.787Z');
INSERT INTO Bosses VALUES(5,'Adjudicator',0,NULL,1,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/demonsouls/adjudicator.webp');
INSERT INTO Bosses VALUES(6,'Fool''s Idol',0,NULL,1,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/demonsouls/foolsidol.webp?t=2023-12-13T11%3A26%3A06.143Z');
INSERT INTO Bosses VALUES(7,'Dragon God',0,NULL,1,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/demonsouls/dragongod.webp?t=2023-12-13T11%3A26%3A02.395Z');
INSERT INTO Bosses VALUES(8,'Leechmonger',0,NULL,1,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/demonsouls/leechmonger.webp?t=2023-12-13T11%3A26%3A12.383Z');
INSERT INTO Bosses VALUES(9,'Old Hero',0,NULL,1,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/demonsouls/oldhero.webp?t=2023-12-13T11%3A26%3A34.395Z');
INSERT INTO Bosses VALUES(10,'Maneater',0,NULL,1,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/demonsouls/maneater.webp?t=2023-12-13T11%3A26%3A26.932Z');
INSERT INTO Bosses VALUES(11,'Penetrator',0,NULL,1,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/demonsouls/penetrator.webp?t=2023-12-13T11%3A26%3A52.970Z');
INSERT INTO Bosses VALUES(12,'Storm King',0,NULL,1,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/demonsouls/stormking.webp?t=2023-12-13T11%3A27%3A08.393Z');
INSERT INTO Bosses VALUES(13,'Old Monk',0,NULL,1,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/demonsouls/oldmonk.webp?t=2023-12-13T11%3A26%3A47.745Z');
INSERT INTO Bosses VALUES(14,'Dirty Colossus',0,NULL,1,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/demonsouls/dirtycolossus.webp?t=2023-12-13T11%3A25%3A53.152Z');
INSERT INTO Bosses VALUES(15,'Maiden Astraea',0,NULL,1,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/demonsouls/maidenastraea.webp?t=2023-12-13T11%3A26%3A25.253Z');
INSERT INTO Bosses VALUES(16,'Old King Allant',0,NULL,1,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/demonsouls/oldkingallant.webp?t=2023-12-13T11%3A26%3A33.984Z');
INSERT INTO Bosses VALUES(17,'Asylum Demon',0,NULL,2,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds1/asylumdemon.webp');
INSERT INTO Bosses VALUES(18,'Taurus Demon',0,NULL,2,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds1/straydemon.webp?t=2023-12-13T12%3A47%3A24.945Z');
INSERT INTO Bosses VALUES(19,'Bell Gargoyle',0,NULL,2,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds1/bellgargoyle.webp?t=2023-12-13T12%3A45%3A00.602Z');
INSERT INTO Bosses VALUES(20,'Capra Demon',0,NULL,2,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds1/blackdragonkalameet.webp?t=2023-12-13T12%3A45%3A07.512Z');
INSERT INTO Bosses VALUES(21,'Gaping Dragon',0,NULL,2,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds1/gapingdragon.webp?t=2023-12-13T12%3A45%3A52.950Z');
INSERT INTO Bosses VALUES(22,'Quelaag',0,NULL,2,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds1/quelaag.webp');
INSERT INTO Bosses VALUES(23,'Iron Golem',0,NULL,2,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds1/irongolem.webp?t=2023-12-13T12%3A46%3A10.324Z');
INSERT INTO Bosses VALUES(24,'Ornstein and Smough',0,NULL,2,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds1/ornsteinandsmough.webp?t=2023-12-13T12%3A46%3A35.877Z');
INSERT INTO Bosses VALUES(25,'Sif',0,NULL,2,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds1/sanctuaryguardian.webp?t=2023-12-13T12%3A47%3A04.379Z');
INSERT INTO Bosses VALUES(26,'Four Kings',0,NULL,2,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds1/fourkings.webp');
INSERT INTO Bosses VALUES(27,'Seath the Scaleless',0,NULL,2,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds1/sanctuaryguardian.webp?t=2023-12-13T12%3A47%3A04.379Z');
INSERT INTO Bosses VALUES(28,'Gravelord Nito',0,NULL,2,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds1/gravelordnito.webp?t=2023-12-13T12%3A46%3A00.485Z');
INSERT INTO Bosses VALUES(29,'Bed of Chaos',0,NULL,2,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds1/bedofchaos.webp?t=2023-12-13T12%3A44%3A54.468Z');
INSERT INTO Bosses VALUES(30,'Gwyn, Lord of Cinder',0,NULL,2,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds1/gwyn.webp?t=2023-12-13T12%3A46%3A05.179Z');
INSERT INTO Bosses VALUES(31,'Moonlight Butterfly',1,NULL,2,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds1/moonlightbutterfly.webp?t=2023-12-13T12%3A46%3A32.670Z');
INSERT INTO Bosses VALUES(32,'Stray Demon',1,NULL,2,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds1/straydemon.webp?t=2023-12-13T12%3A47%3A24.945Z');
INSERT INTO Bosses VALUES(33,'Dark Sun Gwyndolin',1,NULL,2,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds1/darksungwyndolin.webp?t=2023-12-13T12%3A45%3A32.927Z');
INSERT INTO Bosses VALUES(34,'Crossbreed Priscilla',1,NULL,2,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds1/crossbreedpriscilla.webp?t=2023-12-13T12%3A45%3A26.363Z');
INSERT INTO Bosses VALUES(35,'Ceaseless Discharge',1,NULL,2,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds1/ceaselessdischarge.webp?t=2023-12-13T12%3A45%3A13.787Z');
INSERT INTO Bosses VALUES(36,'Centipede Demon',1,NULL,2,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds1/centipededemon.webp?t=2023-12-13T12%3A45%3A20.818Z');
INSERT INTO Bosses VALUES(37,'Demon Firesage',1,NULL,2,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds1/demonfiresage.webp?t=2023-12-13T12%3A45%3A36.985Z');
INSERT INTO Bosses VALUES(38,'Knight Artorias',0,1,2,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds1/knightartorias.webp?t=2023-12-13T12%3A46%3A17.666Z');
INSERT INTO Bosses VALUES(39,'Sanctuary Guardian',0,1,2,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds1/sanctuaryguardian.webp?t=2023-12-13T12%3A47%3A04.379Z');
INSERT INTO Bosses VALUES(40,'Manus, Father of the Abyss',0,1,2,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds1/manusfatheroftheabyss.webp?t=2023-12-13T12%3A46%3A23.452Z');
INSERT INTO Bosses VALUES(41,'Black Dragon Kalameet',0,1,2,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds1/bellgargoyle.webp?t=2023-12-13T12%3A45%3A00.602Z');
INSERT INTO Bosses VALUES(42,'Last Giant',1,NULL,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/lastgiant.webp?t=2023-12-13T14%3A06%3A40.058Z');
INSERT INTO Bosses VALUES(43,'The Pursuer',1,NULL,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/thepursuer.webp?t=2023-12-13T14%3A10%3A15.861Z');
INSERT INTO Bosses VALUES(44,'Dragonrider',1,NULL,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/dragonrider.webp');
INSERT INTO Bosses VALUES(45,'Ruin Sentinels',1,NULL,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/ruinsentinels.webp?t=2023-12-13T14%3A09%3A12.628Z');
INSERT INTO Bosses VALUES(46,'Lost Sinner',1,NULL,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/lostsinner.webp?t=2023-12-13T14%3A06%3A59.031Z');
INSERT INTO Bosses VALUES(47,'Old Dragonslayer',1,NULL,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/olddragonslayer.webp?t=2023-12-13T14%3A07%3A42.124Z');
INSERT INTO Bosses VALUES(48,'Executioner''s Chariot',1,NULL,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/executionerschariot.webp?t=2023-12-13T14%3A06%3A07.175Z');
INSERT INTO Bosses VALUES(49,'Skeleton Lords',1,NULL,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/skeletonlords.webp?t=2023-12-13T14%3A09%3A45.293Z');
INSERT INTO Bosses VALUES(50,'Covetous Demon',1,NULL,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/covetousdemon.webp?t=2023-12-13T14%3A05%3A38.399Z');
INSERT INTO Bosses VALUES(51,'Mytha, the Baneful Queen',1,NULL,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/mytha.webp?t=2023-12-13T14%3A07%3A15.357Z');
INSERT INTO Bosses VALUES(52,'Smelter Demon',1,NULL,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/skeletonlords.webp?t=2023-12-13T14%3A09%3A45.293Z');
INSERT INTO Bosses VALUES(53,'Old Iron King',1,NULL,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/oldironking.webp?t=2023-12-13T14%3A07%3A43.542Z');
INSERT INTO Bosses VALUES(54,'Flexile Sentry',1,NULL,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/flexilesentry.webp?t=2023-12-13T14%3A06%3A12.509Z');
INSERT INTO Bosses VALUES(55,'Belfry Gargoyles',1,NULL,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/belfrygargoyles.webp?t=2023-12-13T14%3A05%3A16.622Z');
INSERT INTO Bosses VALUES(56,'Royal Rat Vanguard',1,NULL,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/royalratvanguard.webp?t=2023-12-13T14%3A08%3A07.616Z');
INSERT INTO Bosses VALUES(57,'The Rotten',1,NULL,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/therotten.webp?t=2023-12-13T14%3A10%3A20.801Z');
INSERT INTO Bosses VALUES(58,'Scorpioness Najka',1,NULL,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/scorpionessnajka.webp?t=2023-12-13T14%3A09%3A20.003Z');
INSERT INTO Bosses VALUES(59,'Royal Rat Authority',1,NULL,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/royalratauthority.webp?t=2023-12-13T14%3A07%3A53.744Z');
INSERT INTO Bosses VALUES(61,'The Duke''s Dear Freja',1,NULL,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/thedukesdearfreja.webp?t=2023-12-13T14%3A10%3A03.503Z');
INSERT INTO Bosses VALUES(62,'Dragonrider x2',1,NULL,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/dragonrider2.webp?t=2023-12-13T14%3A05%3A57.728Z');
INSERT INTO Bosses VALUES(63,'Looking Glass Knight',0,NULL,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/lookingglassknight.webp?t=2023-12-13T14%3A06%3A45.236Z');
INSERT INTO Bosses VALUES(64,'Demon of Song',0,NULL,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/demonofsong.webp?t=2023-12-13T14%3A05%3A46.601Z');
INSERT INTO Bosses VALUES(65,'Vestaldt, the Royal Aegis',0,NULL,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/thronewatcherthronedefender.webp?t=2023-12-13T14%3A10%3A27.305Z');
INSERT INTO Bosses VALUES(66,'Guardian Dragon',0,NULL,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/guardiandragon.webp?t=2023-12-13T14%3A06%3A29.552Z');
INSERT INTO Bosses VALUES(67,'Ancient Dragon',0,NULL,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/ancientdragon.webp?t=2023-12-13T14%3A05%3A10.547Z');
INSERT INTO Bosses VALUES(68,'Giant Lord',0,NULL,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/giantlord.webp?t=2023-12-13T14%3A06%3A24.431Z');
INSERT INTO Bosses VALUES(69,'Elana, the Squalid Queen',1,3,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/elana.webp?t=2023-12-13T14%3A06%3A02.102Z');
INSERT INTO Bosses VALUES(70,'Sinh, the Slumbering Dragon',1,3,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/sinh.webp?t=2023-12-13T14%3A09%3A32.910Z');
INSERT INTO Bosses VALUES(71,'The Graverobber, Varg, and Cerah',1,3,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/thegraverobbervargcerah.webp?t=2023-12-13T14%3A10%3A08.901Z');
INSERT INTO Bosses VALUES(73,'Fume Knight',1,4,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/fumeknight.webp?t=2023-12-13T14%3A06%3A17.988Z');
INSERT INTO Bosses VALUES(74,'Sir Alonne',1,4,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/siralonne.webp?t=2023-12-13T14%3A09%3A38.960Z');
INSERT INTO Bosses VALUES(75,'Smelter Demon (Blue)',1,4,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/smelterdemonblue.webp?t=2023-12-13T14%3A09%3A57.648Z');
INSERT INTO Bosses VALUES(76,'Aava, the King''s Pet',1,5,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/aava.webp?t=2023-12-13T14%3A04%3A56.302Z');
INSERT INTO Bosses VALUES(77,'Burnt Ivory King',1,5,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/belfrygargoyles.webp?t=2023-12-13T14%3A05%3A16.622Z');
INSERT INTO Bosses VALUES(78,'Lud and Zallen, The King''s Pets',1,5,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/ludandzallen.webp?t=2023-12-13T14%3A07%3A06.722Z');
INSERT INTO Bosses VALUES(79,'Darklurker',1,NULL,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/darklurker.webp?t=2023-12-13T14%3A05%3A48.705Z');
INSERT INTO Bosses VALUES(80,'King Vendrick',0,NULL,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/kingvendrick.webp?t=2023-12-13T14%3A06%3A36.039Z');
INSERT INTO Bosses VALUES(81,'Throne Watcher & Throne Defender',0,NULL,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/thronewatcherthronedefender.webp?t=2023-12-13T14%3A10%3A27.305Z');
INSERT INTO Bosses VALUES(82,'Nashandra',0,NULL,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/nashandra.webp');
INSERT INTO Bosses VALUES(83,'Aldia, Scholar of the First Sin',1,NULL,3,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds2/aldia.webp?t=2023-12-13T14%3A05%3A03.152Z');
INSERT INTO Bosses VALUES(84,'Iudex Gundyr',0,NULL,4,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds3/iudexgundyr.webp?t=2023-12-13T15%3A06%3A26.736Z');
INSERT INTO Bosses VALUES(85,'Vordt of the Boreal Valley',0,NULL,4,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds3/vordtoftheborealvalley.webp?t=2023-12-13T15%3A07%3A36.845Z');
INSERT INTO Bosses VALUES(86,'Curse-rotted Greatwood',1,NULL,4,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds3/curserottedgreatwood.webp?t=2023-12-13T15%3A05%3A17.563Z');
INSERT INTO Bosses VALUES(87,'Crystal Sage',0,NULL,4,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds3/crystalsage.webp');
INSERT INTO Bosses VALUES(88,'Abyss Watchers',0,NULL,4,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds3/abysswatchers.webp?t=2023-12-13T15%3A03%3A24.780Z');
INSERT INTO Bosses VALUES(89,'Deacons of the Deep',0,NULL,4,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds3/deaconsofthedeep.webp?t=2023-12-13T15%3A06%3A09.144Z');
INSERT INTO Bosses VALUES(90,'High Lord Wolnir',0,NULL,4,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds3/highlordwolnir.webp?t=2023-12-13T15%3A06%3A22.643Z');
INSERT INTO Bosses VALUES(91,'Old Demon King',1,NULL,4,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds3/olddemonking.webp?t=2023-12-13T15%3A06%3A39.152Z');
INSERT INTO Bosses VALUES(92,'Pontiff Sulyvahn',0,NULL,4,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds3/pontiffsulyvahn.webp?t=2023-12-13T15%3A06%3A52.547Z');
INSERT INTO Bosses VALUES(93,'Aldrich, Devourer of Gods',0,NULL,4,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds3/aldrichdevourerofgods.webp?t=2023-12-13T15%3A03%3A30.725Z');
INSERT INTO Bosses VALUES(94,'Yhorm the Giant',0,NULL,4,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds3/yhormthegiant.webp?t=2023-12-13T15%3A07%3A34.561Z');
INSERT INTO Bosses VALUES(95,'Dancer of the Boreal Valley',0,NULL,4,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds3/danceroftheborealvalley.webp?t=2023-12-13T15%3A05%3A59.288Z');
INSERT INTO Bosses VALUES(96,'Oceiros, the Consumed King',1,NULL,4,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds3/lothricyoungerprince.webp?t=2023-12-13T15%3A06%3A30.740Z');
INSERT INTO Bosses VALUES(97,'Champion Gundyr',1,NULL,4,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds3/championgundyr.webp');
INSERT INTO Bosses VALUES(98,'Lothric, Younger Prince',0,NULL,4,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds3/lothricyoungerprince.webp?t=2023-12-13T15%3A06%3A30.740Z');
INSERT INTO Bosses VALUES(99,'Ancient Wyvern',1,NULL,4,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds3/ancientwyvern.webp?t=2023-12-13T15%3A04%3A11.021Z');
INSERT INTO Bosses VALUES(100,'The Nameless King',1,NULL,4,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds3/thenamelessking.webp?t=2023-12-13T15%3A07%3A13.114Z');
INSERT INTO Bosses VALUES(101,'Soul of Cinder',0,NULL,4,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds3/soulofcinder.webp?t=2023-12-13T15%3A07%3A02.268Z');
INSERT INTO Bosses VALUES(102,'Champion''s Gravetender and Gravetender Greatwolf',1,6,4,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds3/championsgravetender.webp?t=2023-12-13T15%3A05%3A01.520Z');
INSERT INTO Bosses VALUES(103,'Sister Friede',0,6,4,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds3/sisterfriede.webp?t=2023-12-13T15%3A06%3A48.559Z');
INSERT INTO Bosses VALUES(104,'Demon in Pain & Demon from Below',0,7,4,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds3/demoninpainanddemonfrombelow.webp?t=2023-12-13T15%3A06%3A12.852Z');
INSERT INTO Bosses VALUES(105,'Halflight, Spear of the Church',0,7,4,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds3/halflightspearofthechurch.webp?t=2023-12-13T15%3A06%3A19.251Z');
INSERT INTO Bosses VALUES(106,'Darkeater Midir',1,7,4,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds3/darkeatermidir.webp?t=2023-12-13T15%3A06%3A06.642Z');
INSERT INTO Bosses VALUES(107,'Slave Knight Gael',0,7,4,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds3/slaveknightgael.webp?t=2023-12-13T15%3A06%3A53.792Z');
INSERT INTO Bosses VALUES(108,'Cleric Beast',1,NULL,5,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/bloodborne/clericbeast.webp');
INSERT INTO Bosses VALUES(109,'Father Gascoigne',0,NULL,5,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/bloodborne/fathergascoigne.webp?t=2023-12-13T19%3A16%3A08.227Z');
INSERT INTO Bosses VALUES(110,'Blood-starved Beast',1,NULL,5,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/bloodborne/bloodstarvedbeast.webp?t=2023-12-13T19%3A15%3A40.337Z');
INSERT INTO Bosses VALUES(111,'Witches of Hemwick',1,NULL,5,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/bloodborne/witchesofhemwick.webp?t=2023-12-13T19%3A18%3A19.806Z');
INSERT INTO Bosses VALUES(112,'Darkbeast Paarl',1,NULL,5,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/bloodborne/clericbeast.webp');
INSERT INTO Bosses VALUES(113,'Vicar Amelia',0,NULL,5,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/bloodborne/vicaramelia.webp?t=2023-12-13T19%3A18%3A13.654Z');
INSERT INTO Bosses VALUES(114,'Shadows of Yharnam',0,NULL,5,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/bloodborne/shadowsofyharnam.webp?t=2023-12-13T19%3A18%3A01.637Z');
INSERT INTO Bosses VALUES(115,'Rom, the Vacuous Spider',0,NULL,5,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/bloodborne/romthevacuousspier.webp?t=2023-12-13T19%3A17%3A57.311Z');
INSERT INTO Bosses VALUES(116,'The One Reborn',0,NULL,5,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/bloodborne/theonereborn.webp?t=2023-12-13T19%3A18%3A06.240Z');
INSERT INTO Bosses VALUES(117,'Micolash, Host of the Nightmare',0,NULL,5,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/bloodborne/micolash.webp?t=2023-12-13T19%3A17%3A45.211Z');
INSERT INTO Bosses VALUES(118,'Martyr Logarius',1,NULL,5,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/bloodborne/martyrlogarius.webp?t=2023-12-13T19%3A16%3A38.712Z');
INSERT INTO Bosses VALUES(119,'Celestial Emissary',1,NULL,5,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/bloodborne/celestialemissary.webp');
INSERT INTO Bosses VALUES(120,'Ebrietas, Daughter of the Cosmos',1,NULL,5,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/bloodborne/ebrietas.webp?t=2023-12-13T19%3A16%3A04.098Z');
INSERT INTO Bosses VALUES(121,'Mergo''s Wet Nurse',0,NULL,5,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/bloodborne/mergoswetnurse.webp?t=2023-12-13T19%3A17%3A40.110Z');
INSERT INTO Bosses VALUES(122,'Gehrman, the First Hunter',1,NULL,5,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/bloodborne/gehrman.webp?t=2023-12-13T19%3A16%3A14.032Z');
INSERT INTO Bosses VALUES(123,'Moon Presence',1,NULL,5,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/bloodborne/moonpresence.webp?t=2023-12-13T19%3A17%3A49.656Z');
INSERT INTO Bosses VALUES(124,'Amygdala',1,NULL,5,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/bloodborne/amygdala.webp?t=2023-12-13T19%3A15%3A35.896Z');
INSERT INTO Bosses VALUES(125,'Ludwig, the Accursed & Holy Blade',0,2,5,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/bloodborne/ludwig.webp?t=2023-12-13T19%3A16%3A33.114Z');
INSERT INTO Bosses VALUES(126,'Laurence, the First Vicar',1,2,5,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/bloodborne/lawrence.webp?t=2023-12-13T19%3A16%3A23.137Z');
INSERT INTO Bosses VALUES(127,'Living Failures',0,2,5,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/bloodborne/livingfailures.webp?t=2023-12-13T19%3A16%3A27.843Z');
INSERT INTO Bosses VALUES(128,'Lady Maria of the Astral Clocktower',0,2,5,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/bloodborne/ladymaria.webp?t=2023-12-13T19%3A16%3A18.247Z');
INSERT INTO Bosses VALUES(129,'Orphan of Kos',0,2,5,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/bloodborne/orphanofkos.webp?t=2023-12-13T19%3A17%3A53.989Z');
INSERT INTO Bosses VALUES(130,'Gyoubu Masataka Oniwa',NULL,NULL,6,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/sekiro/gyoubu.webp?t=2023-12-13T19%3A56%3A45.673Z');
INSERT INTO Bosses VALUES(131,'Lady Butterfly',NULL,NULL,6,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/sekiro/ladybutterfly.webp?t=2023-12-13T21%3A01%3A52.475Z');
INSERT INTO Bosses VALUES(132,'Genichiro Ashina',NULL,NULL,6,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/sekiro/genichiroashina.webp?t=2023-12-13T19%3A56%3A25.769Z');
INSERT INTO Bosses VALUES(133,'Folding Screen Monkeys',NULL,NULL,6,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/sekiro/foldingscreenmonkeys.webp?t=2023-12-13T19%3A56%3A16.449Z');
INSERT INTO Bosses VALUES(134,'Guardian Ape',NULL,NULL,6,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/sekiro/guarianape.webp?t=2023-12-13T19%3A56%3A38.974Z');
INSERT INTO Bosses VALUES(135,'Headless Ape',NULL,NULL,6,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/sekiro/headlessape.webp?t=2023-12-13T19%3A56%3A50.533Z');
INSERT INTO Bosses VALUES(136,'Corrupted Monk',NULL,NULL,6,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/sekiro/corruptedmonk.webp?t=2023-12-13T19%3A56%3A03.003Z');
INSERT INTO Bosses VALUES(137,'Isshin Ashina',NULL,NULL,6,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/sekiro/isshinashina.webp?t=2023-12-13T19%3A58%3A21.552Z');
INSERT INTO Bosses VALUES(138,'Great Shinobi Owl',NULL,NULL,6,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/sekiro/greatshinobiowl.webp?t=2023-12-13T19%3A56%3A31.339Z');
INSERT INTO Bosses VALUES(139,'True Corrupted Monk',NULL,NULL,6,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/sekiro/truecorruptedmonk.webp?t=2023-12-13T19%3A58%3A29.878Z');
INSERT INTO Bosses VALUES(140,'Divine Dragon',NULL,NULL,6,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/sekiro/divinedragon.webp?t=2023-12-13T19%3A56%3A12.317Z');
INSERT INTO Bosses VALUES(141,'Owl (Father)',NULL,NULL,6,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/sekiro/owlfather.webp?t=2023-12-13T19%3A58%3A24.011Z');
INSERT INTO Bosses VALUES(142,'Demon of Hatred',NULL,NULL,6,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/sekiro/demonofhatred.webp?t=2023-12-13T19%3A56%3A06.877Z');
INSERT INTO Bosses VALUES(143,'Isshin, the Sword Saint',NULL,NULL,6,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/sekiro/isshinswordsaint.webp?t=2023-12-13T21%3A01%3A59.262Z');
INSERT INTO Bosses VALUES(144,'Inner Father',NULL,NULL,6,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/sekiro/innerfather.webp?t=2023-12-13T19%3A57%3A46.545Z');
INSERT INTO Bosses VALUES(145,'Inner Genichiro',NULL,NULL,6,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/sekiro/innergenichiro.webp?t=2023-12-13T19%3A56%3A59.660Z');
INSERT INTO Bosses VALUES(146,'Inner Isshin',NULL,NULL,6,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/sekiro/innerisshin.webp?t=2023-12-13T21%3A02%3A11.947Z');
INSERT INTO Bosses VALUES(147,'Margit the Fell Omen',NULL,NULL,7,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/eldenring/margit.webp?t=2023-12-13T23%3A35%3A58.614Z');
INSERT INTO Bosses VALUES(148,'Godrick the Grafted',NULL,NULL,7,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/eldenring/godrick.webp');
INSERT INTO Bosses VALUES(149,'Red Wolf of Radagon',NULL,NULL,7,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/eldenring/redwolfofradagon.webp?t=2023-12-13T23%3A36%3A47.787Z');
INSERT INTO Bosses VALUES(150,'Rennala, Queen of the Full Moon',NULL,NULL,7,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/eldenring/rennala.webp?t=2023-12-13T23%3A37%3A00.645Z');
INSERT INTO Bosses VALUES(151,'Leonine Misbegotten (Castle Morne)',NULL,NULL,7,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/eldenring/leoninemisbegotten.webp?t=2023-12-13T23%3A35%3A30.180Z');
INSERT INTO Bosses VALUES(152,'Ancestor Spirit',NULL,NULL,7,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/eldenring/ancestorspirit.webp?t=2023-12-13T23%3A34%3A15.549Z');
INSERT INTO Bosses VALUES(153,'Starscourge Radahn',NULL,NULL,7,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/eldenring/starscourgeradahn.webp?t=2023-12-13T23%3A37%3A19.919Z');
INSERT INTO Bosses VALUES(154,'Magma Wyrm Makar',NULL,NULL,7,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/eldenring/magmawyrmmakar.webp?t=2023-12-13T23%3A35%3A46.746Z');
INSERT INTO Bosses VALUES(155,'Mimic Tear (Nokron, Eternal City)',NULL,NULL,7,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/eldenring/mimictear.webp?t=2023-12-13T23%3A36%3A03.708Z');
INSERT INTO Bosses VALUES(156,'Royal Knight Loretta',NULL,NULL,7,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/eldenring/royalknightloretta.webp?t=2023-12-13T23%3A37%3A06.479Z');
INSERT INTO Bosses VALUES(157,'Regal Ancestor Spirit',NULL,NULL,7,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/eldenring/regalancestorspirit.webp');
INSERT INTO Bosses VALUES(158,'Dragonkin Soldier of Nokstella',NULL,NULL,7,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/eldenring/dragonkinsoldierofnokstella.webp?t=2023-12-13T23%3A34%3A27.005Z');
INSERT INTO Bosses VALUES(159,'Valiant Gargoyles',NULL,NULL,7,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/eldenring/valiantgargoyles.webp?t=2023-12-13T23%3A37%3A25.490Z');
INSERT INTO Bosses VALUES(160,'Astel, Naturalborn of the Void',NULL,NULL,7,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/eldenring/astel.webp?t=2023-12-13T23%3A34%3A18.953Z');
INSERT INTO Bosses VALUES(161,'Godskin Noble (Volcano Manor)',NULL,NULL,7,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/eldenring/godskinnoble.webp?t=2023-12-13T23%3A35%3A20.791Z');
INSERT INTO Bosses VALUES(162,'Rykard, Lord of Blasphemy',NULL,NULL,7,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/eldenring/rykard.webp?t=2023-12-13T23%3A37%3A15.310Z');
INSERT INTO Bosses VALUES(163,'Elemer of the Briar',NULL,NULL,7,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/eldenring/elemerofthebriar.webp?t=2023-12-13T23%3A34%3A35.502Z');
INSERT INTO Bosses VALUES(164,'Godfrey, First Elden Lord (Golden Shade)',NULL,NULL,7,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/eldenring/godfreygoldenshade.webp?t=2023-12-13T23%3A34%3A44.977Z');
INSERT INTO Bosses VALUES(165,'Morgott the Omen King',NULL,NULL,7,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/eldenring/morgott.webp?t=2023-12-13T23%3A36%3A38.162Z');
INSERT INTO Bosses VALUES(166,'Mohg, the Omen',NULL,NULL,7,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/eldenring/moghtheomen.webp?t=2023-12-13T23%3A36%3A26.340Z');
INSERT INTO Bosses VALUES(167,'Commander Niall',NULL,NULL,7,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/eldenring/commanderniall.webp?t=2023-12-13T23%3A34%3A22.666Z');
INSERT INTO Bosses VALUES(168,'Fire Giant',NULL,NULL,7,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/eldenring/firegiant.webp?t=2023-12-13T23%3A34%3A40.596Z');
INSERT INTO Bosses VALUES(169,'Loretta, Knight of the Haligtree',NULL,NULL,7,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/eldenring/lorettaknightofthehaligtree.webp?t=2023-12-13T23%3A35%3A42.489Z');
INSERT INTO Bosses VALUES(170,'Malenia, Blade of Miquella',NULL,NULL,7,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/eldenring/malenia.webp?t=2023-12-13T23%3A35%3A50.466Z');
INSERT INTO Bosses VALUES(171,'Godskin Duo',NULL,NULL,7,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/eldenring/godskinduo.webp?t=2023-12-13T23%3A35%3A15.168Z');
INSERT INTO Bosses VALUES(172,'Dragonlord Placidusax',NULL,NULL,7,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/eldenring/dragonlordplacidusax.webp?t=2023-12-13T23%3A34%3A30.849Z');
INSERT INTO Bosses VALUES(173,'Maliketh, the Black Blade',NULL,NULL,7,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/eldenring/maliketh.webp?t=2023-12-13T23%3A35%3A54.720Z');
INSERT INTO Bosses VALUES(174,'Lichdragon Fortissax',NULL,NULL,7,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/eldenring/lichdragonfortisasax.webp?t=2023-12-13T23%3A35%3A37.422Z');
INSERT INTO Bosses VALUES(175,'Mohg, Lord of Blood',NULL,NULL,7,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/eldenring/mohglordofblood.webp?t=2023-12-13T23%3A36%3A19.759Z');
INSERT INTO Bosses VALUES(176,'Hoarah Loux, Warrior',NULL,NULL,7,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/eldenring/hoarahloux.webp?t=2023-12-13T23%3A35%3A25.055Z');
INSERT INTO Bosses VALUES(177,'Radagon of the Golden Order / Elden Beast',0,NULL,7,'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/eldenring/radagon.webp?t=2023-12-13T23%3A36%3A42.366Z');
CREATE TABLE IF NOT EXISTS `DLC` (
`dlc_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
`dlc_title` text NOT NULL,
`dlc_order` integer NOT NULL,
`dlc_game` integer NOT NULL,
FOREIGN KEY (`dlc_game`) REFERENCES `Games`(`game_id`) ON UPDATE no action ON DELETE no action
);
INSERT INTO DLC VALUES(1,'Artorias of the Abyss',1,2);
INSERT INTO DLC VALUES(2,'Old Hunters',1,5);
INSERT INTO DLC VALUES(3,'Crown of the Sunken King',1,3);
INSERT INTO DLC VALUES(4,'Crown of the Old Iron King',2,3);
INSERT INTO DLC VALUES(5,'Crown of the Ivory King',3,3);
INSERT INTO DLC VALUES(6,'Ashes of Ariandel',1,4);
INSERT INTO DLC VALUES(7,'The Ringed City',2,4);
INSERT INTO DLC VALUES(8,'Shadow Of The Erdtree',1,7);
CREATE TABLE IF NOT EXISTS `Games` (
`game_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
`game_title` text NOT NULL
);
INSERT INTO Games VALUES(1,'Demon''s Souls');
INSERT INTO Games VALUES(2,'Dark Souls');
INSERT INTO Games VALUES(3,'Dark Souls II');
INSERT INTO Games VALUES(4,'Dark Souls III');
INSERT INTO Games VALUES(5,'Bloodborne');
INSERT INTO Games VALUES(6,'Sekiro: Shadows Die Twice');
INSERT INTO Games VALUES(7,'Elden Ring');
CREATE TABLE IF NOT EXISTS `User` (
	`uid` text NOT NULL,
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`display_name` text NOT NULL
, `profile_picture` text);
INSERT INTO User VALUES('53c74a12-9db0-4358-bc59-3ec024703554',3,'connorcam123@gmail.com','connorcam123','https://lh3.googleusercontent.com/a/ACg8ocLhaNSeF2INg9f5GjV8DpoDhKuyooB-a5L5NE4Ct0dgJw=s96-c');
INSERT INTO User VALUES('d0e6a427-454a-47b1-b138-da5f0f11b4db',4,'summersongld@gmail.com','summersongld','https://lh3.googleusercontent.com/a/ACg8ocINMfSg52wkwK5Fuy2BWgj0xZDxCuu_-olciLuJyDuo=s96-c');
INSERT INTO User VALUES('256fde8d-2e6b-4251-b678-44dfecec76f6',5,'connorcam302@gmail.com','connorcam302','https://lh3.googleusercontent.com/a/ACg8ocLMCkkskKCJ5CScPNhLWELBsBaG5JS18spw8uwsyowl=s96-c');
INSERT INTO User VALUES('9c2d57df-76bf-411b-b2d1-0be24ac010b6',10,'conziecam@gmail.com','conziecam','https://lh3.googleusercontent.com/a/ACg8ocK3A34vxg0fZEu7aS2z1hmJRVS-QZ2DH6FkRUKiQENR=s96-c');
INSERT INTO User VALUES('778bd31e-83c0-405d-b64e-9865f74196e2',11,'callumrandall1@gmail.com','callumrandall1','https://lh3.googleusercontent.com/a/ACg8ocJWzmxLsp21iuGy1QCVZgeOo3AYgIcQZD914r42buW81w=s96-c');
CREATE TABLE IF NOT EXISTS `Runs` (
`run_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
`game_id` integer NOT NULL,
`run_start_date` integer NOT NULL,
`run_end_date` integer,
`run_user` integer NOT NULL,
`experience` integer NOT NULL,
`run_name` string NOT NULL,
FOREIGN KEY (`game_id`) REFERENCES `Games`(`game_id`) ON UPDATE no action ON DELETE no action,
FOREIGN KEY (`run_user`) REFERENCES `User`(`id`) ON UPDATE no action ON DELETE no action
);
INSERT INTO Runs VALUES(3,6,1702081524611,NULL,3,2,'Rival Brown Kingfisher');
INSERT INTO Runs VALUES(4,7,1702081552805,NULL,3,2,'Rival Red Cod');
INSERT INTO Runs VALUES(5,6,1702081595018,NULL,3,2,'Obnoxious Tan Tick');
INSERT INTO Runs VALUES(6,4,1702086403472,NULL,3,2,'Spatial Gold Zebra');
INSERT INTO Runs VALUES(7,4,1702121869877,NULL,3,0,'Homeless Maroon Termite');
INSERT INTO Runs VALUES(8,3,1702171173970,NULL,3,2,'Convenient Jade Mouse');
INSERT INTO Runs VALUES(9,4,1702219969251,NULL,3,3,'Constant Orange Skink');
INSERT INTO Runs VALUES(10,1,1702424253350,NULL,10,1,'Resonant Brown Shark');
INSERT INTO Runs VALUES(11,5,1702427743566,NULL,3,2,'Disciplinary Copper Woodpecker');
INSERT INTO Runs VALUES(12,5,1702487225975,NULL,11,3,'Some boy you like');
CREATE TABLE IF NOT EXISTS `BossDeathsInRun` (
`death_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
`run_id` integer NOT NULL,
`boss_id` integer NOT NULL,
`death_count` integer NOT NULL,
`death_date` integer,
FOREIGN KEY (`run_id`) REFERENCES `Runs`(`run_id`) ON UPDATE no action ON DELETE no action,
FOREIGN KEY (`boss_id`) REFERENCES `Bosses`(`boss_id`) ON UPDATE no action ON DELETE no action
);
INSERT INTO BossDeathsInRun VALUES(1,3,130,0,1702382937516);
INSERT INTO BossDeathsInRun VALUES(2,4,147,0,1702383572575);
INSERT INTO BossDeathsInRun VALUES(3,4,148,0,1702383904546);
INSERT INTO BossDeathsInRun VALUES(4,4,149,0,1702383974733);
INSERT INTO BossDeathsInRun VALUES(5,4,150,0,1702383985902);
INSERT INTO BossDeathsInRun VALUES(6,4,151,6,1702384425869);
INSERT INTO BossDeathsInRun VALUES(7,4,152,0,1702384610058);
INSERT INTO BossDeathsInRun VALUES(8,4,153,1,1702384616059);
INSERT INTO BossDeathsInRun VALUES(9,4,159,0,1702384860326);
INSERT INTO BossDeathsInRun VALUES(10,4,157,0,1702384888694);
INSERT INTO BossDeathsInRun VALUES(11,4,158,0,1702384891315);
INSERT INTO BossDeathsInRun VALUES(12,4,164,0,1702389374318);
INSERT INTO BossDeathsInRun VALUES(13,3,140,0,1702390280069);
INSERT INTO BossDeathsInRun VALUES(14,3,146,0,1702390421157);
INSERT INTO BossDeathsInRun VALUES(15,3,144,0,1702390879634);
INSERT INTO BossDeathsInRun VALUES(16,3,139,0,1702390920516);
INSERT INTO BossDeathsInRun VALUES(17,3,138,0,1702390923366);
INSERT INTO BossDeathsInRun VALUES(18,3,136,0,1702390925833);
INSERT INTO BossDeathsInRun VALUES(19,7,107,0,1702391034817);
INSERT INTO BossDeathsInRun VALUES(20,7,101,0,1702391039788);
INSERT INTO BossDeathsInRun VALUES(21,7,84,4,NULL);
INSERT INTO BossDeathsInRun VALUES(22,7,106,0,1702394096285);
INSERT INTO BossDeathsInRun VALUES(23,7,95,0,1702397396439);
INSERT INTO BossDeathsInRun VALUES(24,7,96,0,1702397490343);
INSERT INTO BossDeathsInRun VALUES(25,7,86,27,NULL);
INSERT INTO BossDeathsInRun VALUES(26,7,98,1,1702418533224);
INSERT INTO BossDeathsInRun VALUES(27,7,97,0,1702418645897);
INSERT INTO BossDeathsInRun VALUES(28,7,102,0,1702418655426);
INSERT INTO BossDeathsInRun VALUES(29,7,103,0,1702418917364);
INSERT INTO BossDeathsInRun VALUES(30,11,108,3,1702427769718);
INSERT INTO BossDeathsInRun VALUES(31,11,129,0,1702427857107);
INSERT INTO BossDeathsInRun VALUES(33,12,108,0,1702487636622);
INSERT INTO BossDeathsInRun VALUES(34,12,109,0,1702487326934);
INSERT INTO BossDeathsInRun VALUES(35,10,1,100000000000000000000000000000000000000000000000000000000000000000000,NULL);
INSERT INTO BossDeathsInRun VALUES(36,4,154,1,NULL);
INSERT INTO BossDeathsInRun VALUES(37,6,87,0,1702567595610);
INSERT INTO BossDeathsInRun VALUES(38,6,96,0,1702567621822);
INSERT INTO BossDeathsInRun VALUES(39,3,143,4,1702580295907);
CREATE TABLE IF NOT EXISTS `BossesCopy` (
`boss_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
`boss_name` text NOT NULL,
`boss_optional` numeric,
`boss_dlc` numeric,
`boss_game` integer NOT NULL,
FOREIGN KEY (`boss_dlc`) REFERENCES `DLC`(`dlc_id`) ON UPDATE no action ON DELETE no action,
FOREIGN KEY (`boss_game`) REFERENCES `Games`(`game_id`) ON UPDATE no action ON DELETE no action
);
INSERT INTO BossesCopy VALUES(1,'Phalanx',0,NULL,1);
INSERT INTO BossesCopy VALUES(2,'Tower Knight',0,NULL,1);
INSERT INTO BossesCopy VALUES(3,'Armor Spider',0,NULL,1);
INSERT INTO BossesCopy VALUES(4,'Flamelurker',0,NULL,1);
INSERT INTO BossesCopy VALUES(5,'Adjudicator',0,NULL,1);
INSERT INTO BossesCopy VALUES(6,'Fool''s Idol',0,NULL,1);
INSERT INTO BossesCopy VALUES(7,'Dragon God',0,NULL,1);
INSERT INTO BossesCopy VALUES(8,'Leechmonger',0,NULL,1);
INSERT INTO BossesCopy VALUES(9,'Old Hero',0,NULL,1);
INSERT INTO BossesCopy VALUES(10,'Maneater',0,NULL,1);
INSERT INTO BossesCopy VALUES(11,'Penetrator',0,NULL,1);
INSERT INTO BossesCopy VALUES(12,'Storm King',0,NULL,1);
INSERT INTO BossesCopy VALUES(13,'Old Monk',0,NULL,1);
INSERT INTO BossesCopy VALUES(14,'Dirty Colossus',0,NULL,1);
INSERT INTO BossesCopy VALUES(15,'Maiden Astraea',0,NULL,1);
INSERT INTO BossesCopy VALUES(16,'Old King Allant',0,NULL,1);
INSERT INTO BossesCopy VALUES(17,'Asylum Demon',0,NULL,2);
INSERT INTO BossesCopy VALUES(18,'Taurus Demon',0,NULL,2);
INSERT INTO BossesCopy VALUES(19,'Bell Gargoyle',0,NULL,2);
INSERT INTO BossesCopy VALUES(20,'Capra Demon',0,NULL,2);
INSERT INTO BossesCopy VALUES(21,'Gaping Dragon',0,NULL,2);
INSERT INTO BossesCopy VALUES(22,'Quelaag',0,NULL,2);
INSERT INTO BossesCopy VALUES(23,'Iron Golem',0,NULL,2);
INSERT INTO BossesCopy VALUES(24,'Ornstein and Smough',0,NULL,2);
INSERT INTO BossesCopy VALUES(25,'Sif',0,NULL,2);
INSERT INTO BossesCopy VALUES(26,'Four Kings',0,NULL,2);
INSERT INTO BossesCopy VALUES(27,'Seath the Scaleless',0,NULL,2);
INSERT INTO BossesCopy VALUES(28,'Gravelord Nito',0,NULL,2);
INSERT INTO BossesCopy VALUES(29,'Bed of Chaos',0,NULL,2);
INSERT INTO BossesCopy VALUES(30,'Gwyn, Lord of Cinder',0,NULL,2);
INSERT INTO BossesCopy VALUES(31,'Moonlight Butterfly',1,NULL,2);
INSERT INTO BossesCopy VALUES(32,'Stray Demon',1,NULL,2);
INSERT INTO BossesCopy VALUES(33,'Dark Sun Gwyndolin',1,NULL,2);
INSERT INTO BossesCopy VALUES(34,'Crossbreed Priscilla',1,NULL,2);
INSERT INTO BossesCopy VALUES(35,'Ceaseless Discharge',1,NULL,2);
INSERT INTO BossesCopy VALUES(36,'Centipede Demon',1,NULL,2);
INSERT INTO BossesCopy VALUES(37,'Demon Firesage',1,NULL,2);
INSERT INTO BossesCopy VALUES(38,'Knight Artorias',0,1,2);
INSERT INTO BossesCopy VALUES(39,'Sanctuary Guardian',0,1,2);
INSERT INTO BossesCopy VALUES(40,'Manus, Father of the Abyss',0,1,2);
INSERT INTO BossesCopy VALUES(41,'Black Dragon Kalameet',0,1,2);
INSERT INTO BossesCopy VALUES(42,'Last Giant',1,NULL,3);
INSERT INTO BossesCopy VALUES(43,'The Pursuer',1,NULL,3);
INSERT INTO BossesCopy VALUES(44,'Dragonrider',1,NULL,3);
INSERT INTO BossesCopy VALUES(45,'Ruin Sentinels',1,NULL,3);
INSERT INTO BossesCopy VALUES(46,'Lost Sinner',1,NULL,3);
INSERT INTO BossesCopy VALUES(47,'Old Dragonslayer',1,NULL,3);
INSERT INTO BossesCopy VALUES(48,'Executioner''s Chariot',1,NULL,3);
INSERT INTO BossesCopy VALUES(49,'Skeleton Lords',1,NULL,3);
INSERT INTO BossesCopy VALUES(50,'Covetous Demon',1,NULL,3);
INSERT INTO BossesCopy VALUES(51,'Mytha, the Baneful Queen',1,NULL,3);
INSERT INTO BossesCopy VALUES(52,'Smelter Demon',1,NULL,3);
INSERT INTO BossesCopy VALUES(53,'Old Iron King',1,NULL,3);
INSERT INTO BossesCopy VALUES(54,'Flexile Sentry',1,NULL,3);
INSERT INTO BossesCopy VALUES(55,'Belfry Gargoyles',1,NULL,3);
INSERT INTO BossesCopy VALUES(56,'Royal Rat Vanguard',1,NULL,3);
INSERT INTO BossesCopy VALUES(57,'The Rotten',1,NULL,3);
INSERT INTO BossesCopy VALUES(58,'Scorpioness Najka',1,NULL,3);
INSERT INTO BossesCopy VALUES(59,'Royal Rat Authority',1,NULL,3);
INSERT INTO BossesCopy VALUES(60,'Covetous Demon',1,NULL,3);
INSERT INTO BossesCopy VALUES(61,'The Duke''s Dear Freja',1,NULL,3);
INSERT INTO BossesCopy VALUES(62,'Dragonrider x2',1,NULL,3);
INSERT INTO BossesCopy VALUES(63,'Looking Glass Knight',0,NULL,3);
INSERT INTO BossesCopy VALUES(64,'Demon of Song',0,NULL,3);
INSERT INTO BossesCopy VALUES(65,'Vestaldt, the Royal Aegis',0,NULL,3);
INSERT INTO BossesCopy VALUES(66,'Guardian Dragon',0,NULL,3);
INSERT INTO BossesCopy VALUES(67,'Ancient Dragon',0,NULL,3);
INSERT INTO BossesCopy VALUES(68,'Giant Lord',0,NULL,3);
INSERT INTO BossesCopy VALUES(69,'Elana, the Squalid Queen',1,3,3);
INSERT INTO BossesCopy VALUES(70,'Sinh, the Slumbering Dragon',1,3,3);
INSERT INTO BossesCopy VALUES(71,'The Graverobber, Varg, and Cerah',1,3,3);
INSERT INTO BossesCopy VALUES(73,'Fume Knight',1,4,3);
INSERT INTO BossesCopy VALUES(74,'Sir Alonne',1,4,3);
INSERT INTO BossesCopy VALUES(75,'Smelter Demon (Blue)',1,4,3);
INSERT INTO BossesCopy VALUES(76,'Aava, the King''s Pet',1,5,3);
INSERT INTO BossesCopy VALUES(77,'Burnt Ivory King',1,5,3);
INSERT INTO BossesCopy VALUES(78,'Lud and Zallen, The King''s Pets',1,5,3);
INSERT INTO BossesCopy VALUES(79,'Darklurker',1,NULL,3);
INSERT INTO BossesCopy VALUES(80,'King Vendrick',0,NULL,3);
INSERT INTO BossesCopy VALUES(81,'Throne Watcher & Throne Defender',0,NULL,3);
INSERT INTO BossesCopy VALUES(82,'Nashandra',0,NULL,3);
INSERT INTO BossesCopy VALUES(83,'Aldia, Scholar of the First Sin',1,NULL,3);
INSERT INTO BossesCopy VALUES(84,'Iudex Gundyr',0,NULL,4);
INSERT INTO BossesCopy VALUES(85,'Vordt of the Boreal Valley',0,NULL,4);
INSERT INTO BossesCopy VALUES(86,'Curse-rotted Greatwood',1,NULL,4);
INSERT INTO BossesCopy VALUES(87,'Crystal Sage',0,NULL,4);
INSERT INTO BossesCopy VALUES(88,'Abyss Watchers',0,NULL,4);
INSERT INTO BossesCopy VALUES(89,'Deacons of the Deep',0,NULL,4);
INSERT INTO BossesCopy VALUES(90,'High Lord Wolnir',0,NULL,4);
INSERT INTO BossesCopy VALUES(91,'Old Demon King',1,NULL,4);
INSERT INTO BossesCopy VALUES(92,'Pontiff Sulyvahn',0,NULL,4);
INSERT INTO BossesCopy VALUES(93,'Aldrich, Devourer of Gods',0,NULL,4);
INSERT INTO BossesCopy VALUES(94,'Yhorm the Giant',0,NULL,4);
INSERT INTO BossesCopy VALUES(95,'Dancer of the Boreal Valley',0,NULL,4);
INSERT INTO BossesCopy VALUES(96,'Oceiros, the Consumed King',1,NULL,4);
INSERT INTO BossesCopy VALUES(97,'Champion Gundyr',1,NULL,4);
INSERT INTO BossesCopy VALUES(98,'Lothric, Younger Prince',0,NULL,4);
INSERT INTO BossesCopy VALUES(99,'Ancient Wyvern',1,NULL,4);
INSERT INTO BossesCopy VALUES(100,'The Nameless King',1,NULL,4);
INSERT INTO BossesCopy VALUES(101,'Soul of Cinder',0,NULL,4);
INSERT INTO BossesCopy VALUES(102,'Champion''s Gravetender and Gravetender Greatwolf',1,6,4);
INSERT INTO BossesCopy VALUES(103,'Sister Friede',0,6,4);
INSERT INTO BossesCopy VALUES(104,'Demon in Pain & Demon from Below',0,7,4);
INSERT INTO BossesCopy VALUES(105,'Halflight, Spear of the Church',0,7,4);
INSERT INTO BossesCopy VALUES(106,'Darkeater Midir',1,7,4);
INSERT INTO BossesCopy VALUES(107,'Slave Knight Gael',0,7,4);
INSERT INTO BossesCopy VALUES(108,'Cleric Beast',1,NULL,5);
INSERT INTO BossesCopy VALUES(109,'Father Gascoigne',0,NULL,5);
INSERT INTO BossesCopy VALUES(110,'Blood-starved Beast',1,NULL,5);
INSERT INTO BossesCopy VALUES(111,'Witches of Hemwick',1,NULL,5);
INSERT INTO BossesCopy VALUES(112,'Darkbeast Paarl',1,NULL,5);
INSERT INTO BossesCopy VALUES(113,'Vicar Amelia',0,NULL,5);
INSERT INTO BossesCopy VALUES(114,'Shadows of Yharnam',0,NULL,5);
INSERT INTO BossesCopy VALUES(115,'Rom, the Vacuous Spider',0,NULL,5);
INSERT INTO BossesCopy VALUES(116,'The One Reborn',0,NULL,5);
INSERT INTO BossesCopy VALUES(117,'Micolash, Host of the Nightmare',0,NULL,5);
INSERT INTO BossesCopy VALUES(118,'Martyr Logarius',1,NULL,5);
INSERT INTO BossesCopy VALUES(119,'Celestial Emissary',1,NULL,5);
INSERT INTO BossesCopy VALUES(120,'Ebrietas, Daughter of the Cosmos',1,NULL,5);
INSERT INTO BossesCopy VALUES(121,'Mergo''s Wet Nurse',0,NULL,5);
INSERT INTO BossesCopy VALUES(122,'Gehrman, the First Hunter',1,NULL,5);
INSERT INTO BossesCopy VALUES(123,'Moon Presence',1,NULL,5);
INSERT INTO BossesCopy VALUES(124,'Amygdala',1,NULL,5);
INSERT INTO BossesCopy VALUES(125,'Ludwig, the Accursed & Holy Blade',0,2,5);
INSERT INTO BossesCopy VALUES(126,'Laurence, the First Vicar',1,2,5);
INSERT INTO BossesCopy VALUES(127,'Living Failures',0,2,5);
INSERT INTO BossesCopy VALUES(128,'Lady Maria of the Astral Clocktower',0,2,5);
INSERT INTO BossesCopy VALUES(129,'Orphan of Kos',0,2,5);
INSERT INTO BossesCopy VALUES(130,'Gyoubu Masataka Oniwa',NULL,NULL,6);
INSERT INTO BossesCopy VALUES(131,'Lady Butterfly',NULL,NULL,6);
INSERT INTO BossesCopy VALUES(132,'Genichiro Ashina',NULL,NULL,6);
INSERT INTO BossesCopy VALUES(133,'Folding Screen Monkeys',NULL,NULL,6);
INSERT INTO BossesCopy VALUES(134,'Guardian Ape',NULL,NULL,6);
INSERT INTO BossesCopy VALUES(135,'Headless Ape',NULL,NULL,6);
INSERT INTO BossesCopy VALUES(136,'Corrupted Monk',NULL,NULL,6);
INSERT INTO BossesCopy VALUES(137,'Isshin Ashina',NULL,NULL,6);
INSERT INTO BossesCopy VALUES(138,'Great Shinobi Owl',NULL,NULL,6);
INSERT INTO BossesCopy VALUES(139,'True Corrupted Monk',NULL,NULL,6);
INSERT INTO BossesCopy VALUES(140,'Divine Dragon',NULL,NULL,6);
INSERT INTO BossesCopy VALUES(141,'Owl (Father)',NULL,NULL,6);
INSERT INTO BossesCopy VALUES(142,'Demon of Hatred',NULL,NULL,6);
INSERT INTO BossesCopy VALUES(143,'Isshin, the Sword Saint',NULL,NULL,6);
INSERT INTO BossesCopy VALUES(144,'Inner Father',NULL,NULL,6);
INSERT INTO BossesCopy VALUES(145,'Inner Genichiro',NULL,NULL,6);
INSERT INTO BossesCopy VALUES(146,'Inner Isshin',NULL,NULL,6);
INSERT INTO BossesCopy VALUES(147,'Margit the Fell Omen',NULL,NULL,7);
INSERT INTO BossesCopy VALUES(148,'Godrick the Grafted',NULL,NULL,7);
INSERT INTO BossesCopy VALUES(149,'Red Wolf of Radagon',NULL,NULL,7);
INSERT INTO BossesCopy VALUES(150,'Rennala, Queen of the Full Moon',NULL,NULL,7);
INSERT INTO BossesCopy VALUES(151,'Leonine Misbegotten (Castle Morne)',NULL,NULL,7);
INSERT INTO BossesCopy VALUES(152,'Ancestor Spirit',NULL,NULL,7);
INSERT INTO BossesCopy VALUES(153,'Starscourge Radahn',NULL,NULL,7);
INSERT INTO BossesCopy VALUES(154,'Magma Wyrm Makar',NULL,NULL,7);
INSERT INTO BossesCopy VALUES(155,'Mimic Tear (Nokron, Eternal City)',NULL,NULL,7);
INSERT INTO BossesCopy VALUES(156,'Royal Knight Loretta',NULL,NULL,7);
INSERT INTO BossesCopy VALUES(157,'Regal Ancestor Spirit',NULL,NULL,7);
INSERT INTO BossesCopy VALUES(158,'Dragonkin Soldier of Nokstella',NULL,NULL,7);
INSERT INTO BossesCopy VALUES(159,'Valiant Gargoyles',NULL,NULL,7);
INSERT INTO BossesCopy VALUES(160,'Astel, Naturalborn of the Void',NULL,NULL,7);
INSERT INTO BossesCopy VALUES(161,'Godskin Noble (Volcano Manor)',NULL,NULL,7);
INSERT INTO BossesCopy VALUES(162,'Rykard, Lord of Blasphemy',NULL,NULL,7);
INSERT INTO BossesCopy VALUES(163,'Elemer of the Briar',NULL,NULL,7);
INSERT INTO BossesCopy VALUES(164,'Godfrey, First Elden Lord (Golden Shade)',NULL,NULL,7);
INSERT INTO BossesCopy VALUES(165,'Morgott the Omen King',NULL,NULL,7);
INSERT INTO BossesCopy VALUES(166,'Mohg, the Omen',NULL,NULL,7);
INSERT INTO BossesCopy VALUES(167,'Commander Niall',NULL,NULL,7);
INSERT INTO BossesCopy VALUES(168,'Fire Giant',NULL,NULL,7);
INSERT INTO BossesCopy VALUES(169,'Loretta, Knight of the Haligtree',NULL,NULL,7);
INSERT INTO BossesCopy VALUES(170,'Malenia, Blade of Miquella',NULL,NULL,7);
INSERT INTO BossesCopy VALUES(171,'Godskin Duo',NULL,NULL,7);
INSERT INTO BossesCopy VALUES(172,'Dragonlord Placidusax',NULL,NULL,7);
INSERT INTO BossesCopy VALUES(173,'Maliketh, the Black Blade',NULL,NULL,7);
INSERT INTO BossesCopy VALUES(174,'Lichdragon Fortissax',NULL,NULL,7);
INSERT INTO BossesCopy VALUES(175,'Mohg, Lord of Blood',NULL,NULL,7);
INSERT INTO BossesCopy VALUES(176,'Hoarah Loux, Warrior',NULL,NULL,7);
INSERT INTO BossesCopy VALUES(177,'Radagon of the Golden Order / Elden Beast',0,NULL,7);
CREATE TABLE IF NOT EXISTS `BossRatings` (
`rating_id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
`user_id` INTEGER NOT NULL,
`boss_id` INTEGER NOT NULL,
`enjoyment_rating` INTEGER NOT NULL,
`difficulty_rating` INTEGER NOT NULL, `timestamp` TEXT,
FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON UPDATE NO ACTION ON DELETE NO ACTION,
FOREIGN KEY (`boss_id`) REFERENCES `Bosses`(`boss_id`) ON UPDATE NO ACTION ON DELETE NO ACTION
);
INSERT INTO BossRatings VALUES(1,3,1,10,10,'1702584941');
INSERT INTO BossRatings VALUES(2,4,1,5,5,'1702584941');
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('User',11);
INSERT INTO sqlite_sequence VALUES('Games',7);
INSERT INTO sqlite_sequence VALUES('DLC',16);
INSERT INTO sqlite_sequence VALUES('Bosses',177);
INSERT INTO sqlite_sequence VALUES('Runs',12);
INSERT INTO sqlite_sequence VALUES('BossDeathsInRun',39);
INSERT INTO sqlite_sequence VALUES('BossesCopy',177);
INSERT INTO sqlite_sequence VALUES('BossRatings',2);
