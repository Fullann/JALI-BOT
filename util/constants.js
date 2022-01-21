const MESSAGES = {
    COMMANDS: {
        ADMIN: {
            EVAL: {
                name: "eval",
                aliases: [],
                category: "admin",
                description: "Permet de tester du code js",
                usage: "<code>",
                args: true,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
                isActive: true,
            },
            EXECUTE: {
                name: "execute",
                aliases: ["execute", "exe"],
                category: "admin",
                description: "Permet de tester du code dans une console",
                usage: "<code>",
                args: true,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
                isActive: true,
            },
            SPAM: {
                name: "spam",
                aliases: [],
                category: "admin",
                description: "Permet de spam dans un channel",
                usage: "<nb de message> | <message>",
                args: true,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
                isActive: true,
            },
            RELOAD: {
                name: "reload",
                aliases: [],
                category: "admin",
                description: "Relance une commande",
                usage: "<nom de la commande>",
                args: true,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
                isActive: true,
            },
            RESTART: {
                name: "restart",
                aliases: [],
                category: "admin",
                description: "Relance Jali",
                usage: "",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
                isActive: true,
            },
            HELP2: {
                name: "help2",
                aliases: [],
                category: "admin",
                description: "Donne toutes les commandes ou une en spécifique",
                usage: "",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
                isActive: true,
            },
            ADDXP: {
                name: "addxp",
                aliases: [],
                category: "admin",
                description: "Donne toutes les commandes ou une en spécifique",
                usage: "",
                args: true,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
                isActive: true,
                xp: true,
                perLive: true
            },
            PING: {
                name: "ping",
                aliases: [],
                category: "admin",
                description: "Donne la latence du Jali",
                usage: "",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
            ADDMONNEY: {
                name: "addcoin",
                aliases: [],
                category: "admin",
                description: "Ajout d'argent a une personne",
                usage: "<la personne> | <le nombre d'argent à ajouter>",
                args: true,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
                isActive: true,
                coin: true,
            },
            TEST: {
                name: "test",
                aliases: [],
                category: "admin",
                description: "Test de nouvelle commande",
                usage: "",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
                isActive: true,
            },
            TEST2: {
                name: "test2",
                aliases: [],
                category: "admin",
                description: "Test de nouvelle commande",
                usage: "",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
                isActive: true,
            },
        },
        SERVPERSO: {
            VALOPERSO: {
                name: "valoperso",
                aliases: [],
                category: "servperso",
                description: "Création de 2 équipe aléatoire pour la partie Valorant perso",
                usage: "[stop]",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
            STONKS: {
                name: "stonks",
                aliases: [],
                category: "servperso",
                description: "Affiche le tete de quelqu'un avec stonks",
                usage: "[user]",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
            LOVE: {
                name: "love",
                aliases: [],
                category: "servperso",
                description: "Calcul le niveau d'amour entre vous et une autre personne",
                usage: "[user]",
                args: true,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
            ANIMALS: {
                name: "animals",
                aliases: [],
                category: "servperso",
                description: "Affiche des images d'animaux",
                usage: "",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
            DICES: {
                name: "dices",
                aliases: [],
                category: "servperso",
                description: "Lance six dès",
                usage: "",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
            ASK: {
                name: "question",
                aliases: [],
                category: "servperso",
                description: "Permet de faire une prédiction sur un question",
                usage: "<question>",
                args: true,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
            RPS: {
                name: "rps",
                aliases: ["feuille papier siceaux"],
                category: "servperso",
                description: "Permet de jouer a feuille papier siceaux",
                usage: "",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
                coin: true,
            },
        },
        FUN: {
            LEADERBOARD: {
                name: "leaderboard",
                aliases: [],
                category: "fun",
                description: "Classement par l'expérience des utilisateurs",
                usage: "",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
                xp: true,
            },
            POKEMON: {
                name: "pokemon",
                aliases: [],
                category: "fun",
                description: "Affiche un pokemon",
                usage: "<nom de votre pokemon (en anglais)>",
                args: true,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
            XP: {
                name: "xp",
                aliases: [],
                category: "fun",
                description: "Visualisation de son xp",
                usage: "",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
            DAILY: {
                name: "daily",
                aliases: [],
                category: "fun",
                description: "Ajoute de l'argent chaque jour",
                usage: "",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
                coin: true,
            },
            PAY: {
                name: "pay",
                aliases: [],
                category: "fun",
                description: "Permet de payer quelqu'un",
                usage: "<user> | <monney>",
                args: true,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
                coin: true,
            },
        },
        INFO: {
            HELP: {
                name: "help",
                aliases: [],
                category: "info",
                description: "Permet de visualiser toutes les commandes ou une en spécifique",
                usage: "",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
            H: {
                name: "h",
                aliases: [],
                category: "info",
                description: "Permet de visualiser toutes les commandes disponibles",
                usage: "",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
            GUILDINFO: {
                name: "guildinfo",
                aliases: [],
                category: "info",
                description: "Donne des informations sur votre serveur",
                usage: "",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
            BOTINFO: {
                name: "botinfo",
                aliases: [],
                category: "info",
                description: "Donne des informations sur Jali",
                usage: "",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
            USERINFO: {
                name: "userinfo",
                aliases: [],
                category: "info",
                description: "Retourne vos informations personnels ou celle d'une autre personne",
                usage: "[personne recherchée]",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
        },
        MODE: {
            ADDROLE: {
                name: "addrole",
                aliases: [],
                category: "moderation",
                description: "Permet d'ajouter un role a une personne",
                usage: "<user> | <role>",
                args: true,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
                permManage: true,
            },
            BAN: {
                name: "ban",
                aliases: [],
                category: "moderation",
                description: "Permet de ban une personne",
                usage: "<user> | <reson>",
                args: true,
                permissions: true,
                canBeAffected: true,
                cooldown: null,
            },
            CLEAR: {
                name: "clear",
                aliases: [],
                category: "moderation",
                description: "Permet d'effacer des messages",
                usage: "<nombre de message a supprimer>",
                args: true,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
                permManage: true,
            },
            LOCK: {
                name: "lock",
                aliases: [],
                category: "moderation",
                description: "Permet de bloquer un salon",
                usage: "<temps> ou [unlock (pour supprimer le lock)]",
                args: true,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
                permManage: true,
            },
            KICK: {
                name: "kick",
                aliases: [],
                category: "moderation",
                description: "Permet de kick une personne",
                usage: "<user> | <reason>",
                args: true,
                permissions: false,
                canBeAffected: true,
                cooldown: null,
            },
            EMBEDBUILD: {
                name: "embedbuild",
                aliases: [],
                category: "moderation",
                description: "Création d'embed presonnaliser",
                usage: "",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
                permManage: true,
            },
            MUTE: {
                name: "mute",
                aliases: [],
                category: "moderation",
                description: "Permet de mute quelqu'un pendans un certain temps",
                usage: "<user> | <temps>",
                args: true,
                permissions: false,
                canBeAffected: true,
                cooldown: null,
                permManage: true,
            },
            PERMS: {
                name: "perms",
                aliases: [],
                category: "moderation",
                description: "Visualisation des permission que vous possèder",
                usage: "",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
                permManage: false,
            },
            REPORT: {
                name: "report",
                aliases: [],
                category: "moderation",
                description: "Permet de report une personne",
                usage: "<user> | <reson>",
                args: true,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
            ASK: {
                name: "ask",
                aliases: [],
                category: "moderation",
                description: "Permet de faire une demande qui arrive sur un channel pour le staff de votre serveur",
                usage: "<demande>]",
                args: true,
                permissions: false,
                canBeAffected: false,
                cooldown: 86400,
            },
            RROLE: {
                name: "rrole",
                aliases: [],
                category: "moderation",
                description: "Permet d'enlever un role a une personne",
                usage: "<user> | <role>",
                args: true,
                permissions: false,
                canBeAffected: true,
                cooldown: null,
                permManage: true,
            },
            UNBAN: {
                name: "unban",
                aliases: [],
                category: "moderation",
                description: "Permet de unban une personne",
                usage: "<id du user>",
                args: true,
                permissions: true,
                canBeAffected: false,
                cooldown: null,
            },
            UNMUTE: {
                name: "unmute",
                aliases: [],
                category: "moderation",
                description: "Permet de unmute une personne",
                usage: "<user>",
                args: true,
                permissions: false,
                canBeAffected: true,
                cooldown: null,
                permManage: true,
            },
            WARN: {
                name: "warn",
                aliases: [],
                category: "moderation",
                description: "Donne un warn a une personne",
                usage: "<user> | <reson>",
                args: true,
                permissions: true,
                canBeAffected: true,
                cooldown: null,
                warn: true,
                perLive: true
            },
            UNWARN: {
                name: "unwarn",
                aliases: [],
                category: "moderation",
                description: "Enlève un warn a une perssonne",
                usage: "<user> | <reson>",
                args: true,
                permissions: true,
                canBeAffected: true,
                cooldown: null,
                warn: true,
            },
        },
        MUSIC: {
            PLAY: {
                name: "play",
                aliases: [],
                category: "music",
                description: "Lance une musique",
                usage: "<nom de la musique>",
                args: true,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
            PAUSE: {
                name: "pause",
                aliases: [],
                category: "music",
                description: "Met en pause une musique",
                usage: "",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
            CLEAR: {
                name: "clearmusic",
                aliases: [],
                category: "music",
                description: "Reset la liste des musiques",
                usage: "",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
            FILTER: {
                name: "filter",
                aliases: [],
                category: "music",
                description: "Rajout de filtre pour la recherche de la musique",
                usage: "<nom du filtre>",
                args: true,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
            BACK: {
                name: "back",
                aliases: [],
                category: "music",
                description: "Lance la musique d avant",
                usage: "<nom de la musique>",
                args: true,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
            LOOP: {
                name: "loop",
                aliases: ['loop', 'boucle'],
                category: "music",
                description: "Repette la dernière musique mise",
                usage: "",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
            QUEUELOOP: {
                name: "queueloop",
                aliases: [],
                category: "music",
                description: "Repette la dernière la liste des musiques mise",
                usage: "",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
            PLAYING: {
                name: "playing",
                aliases: [],
                category: "music",
                description: "Donne l'information de quel musique est entrain d'être jouée",
                usage: "",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
            QUEUE: {
                name: "queue",
                aliases: ['queue', 'liste'],
                category: "music",
                description: "Donne toutes les musiques qui sont en attentes",
                usage: "",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
            RESUME: {
                name: "resume",
                aliases: [],
                category: "music",
                description: "Relance le musique une fois mise en pause",
                usage: "",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
            SKIP: {
                name: "skip",
                aliases: [],
                category: "music",
                description: "Lance la prochaine musique dans la liste",
                usage: "",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
            STOP: {
                name: "stop",
                aliases: [],
                category: "music",
                description: `Stop la musique et fait quitter Jali du channel`,
                usage: "",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
            VOLUME: {
                name: "volume",
                aliases: [],
                category: "music",
                description: `Permet de changer le volume de Jali`,
                usage: "<volume>",
                args: true,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
            SEARCH: {
                name: "search",
                aliases: [],
                category: "music",
                description: "Recherche d'une musique",
                usage: "<nom de la musique>",
                args: true,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
            SHUFFLE: {
                name: "shuffle",
                aliases: ['shuffle', 'melange'],
                category: "music",
                description: "Mélange la liste d'attante des musique",
                usage: "",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
            WFILTER: {
                name: "lfilter",
                aliases: [],
                category: "music",
                description: "Affichage des filtres activées sur la musique",
                usage: "",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
        },
        QUEST: {
            POLL: {
                name: "poll",
                aliases: [],
                category: "question",
                description: "Permet de crée un sondage",
                usage: "<temps du sondage>",
                args: true,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
                permManage: true,
            },
            SAY: {
                name: "say",
                aliases: [],
                category: "question",
                description: `Permet de faire parler Jali`,
                usage: "[embed] | <text>",
                args: true,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
                permManage: true,
            },
            LIKEORDISLIKE: {
                name: "likeordislike",
                aliases: ["likeordislike", "lod"],
                category: "question",
                description: "Permet de crée un sondage",
                usage: "<temps du sondage> | <question>",
                args: true,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
                permManage: true,
            },
            OPENTICKET: {
                name: "openticket",
                aliases: [],
                category: "question",
                description: "Permet de créer un message pour créer des ticket ",
                usage: "",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
                permManage: true,
            },
        },
        UTILS: {
            SHORT: {
                name: "short",
                aliases: [],
                category: "utils",
                description: "Raccourci un url",
                usage: "<url>",
                args: true,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
                permManage: true,
            },
            MATH: {
                name: "math",
                aliases: ["math", "calcul"],
                category: "utils",
                description: "Permet de faire des calculs",
                usage: "<calcul>",
                args: true,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
            INVITE: {
                name: "invite",
                aliases: [],
                category: "utils",
                description: "Création d'une invitation pour votre serveur",
                usage: "<nombre de personne qui peuvent l'utiliser> | <temps>",
                args: true,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
            EXPAND: {
                name: "expand",
                aliases: [],
                category: "utils",
                description: "Alonge votre URL court en long",
                usage: "<URL>",
                args: true,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
            REMIND: {
                name: "remind",
                aliases: [],
                category: "utils",
                description: "Permet de se rappeller de quelque chose",
                usage: "<temps> | <text>",
                args: true,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
            },
        },
        ROLE: {
            CREATEROLE: {
                name: "crole",
                aliases: [],
                category: "role",
                description: "Création de la liste de role",
                usage: "<nom de la liste>",
                args: true,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
                permManage: true,
            },
            CEMBED: {
                name: "rembed",
                aliases: [],
                category: "role",
                description: "Création du message pour les roles",
                usage: "<nom de liste>",
                args: true,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
                permManage: true,
            },
            CLISTS: {
                name: "rlists",
                aliases: [],
                category: "role",
                description: "Affichage de tous les messages réaction de votre serveur",
                usage: "",
                args: false,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
                permManage: true,
            },
            RDELETE: {
                name: "rdelete",
                aliases: [],
                category: "role",
                description: "Supprime un message réaction",
                usage: "<nom de liste>",
                args: true,
                permissions: false,
                canBeAffected: false,
                cooldown: null,
                permManage: true,
            },
        },
    },
};

exports.MESSAGES = MESSAGES;