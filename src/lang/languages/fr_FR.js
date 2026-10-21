/*  Check out https://vue-i18n.intlify.dev/guide/essentials/syntax for a syntax guide.

    This export will be directly included in the main structure, with the relevant language flag, all
    that needs to be worried about here are the messages, and any applicable language modifiers.

    Note, this file is for English (British)

    I'm being as verbose as possible with the strings, while there are a lot of common answers for things
    like buttons (Yes, No, Ok, Cancel, etc), I'm a little paranoid some languages may need more contextual
    answers, so they're all individually labelled here.

    If you're editing, or creating a new language, everything inside quotation marks ("text") is translatable,
    Anything wrapped in curly brackets ({text}) is a variable, do NOT translate that!

    Also, feel free to leave your name as a contributor:
 */

///
/// Authors:
/// Github: kwandegeulel
///


export default {
    message: {
        // For these, the keys map directly to their GoXLR Channel Names
        channels: {
            All: "Tous",
            Mic: "Microphone",
            Chat: "Discussion vocale",
            Music: "Musique",
            Game: "Jeu",
            Console: "Console",
            LineIn: "Entrée audio",
            System: "Système",
            Sample: "Sons enregistrés",
            LineOut: "Sortie audio",
            Headphones: "Casque/Écouteur",
            MicMonitor: "Écoute du micro",
            StreamMix: "Mélangeur de diffusion",
            ChatMic: "Micro de discussion",
            Sampler: "Sons/Sampler",
            VOD: "VOD",
        },

        faders: {
            A: "Canal 1",
            B: "Canal 2",
            C: "Canal 3",
            D: "Canal 4"
        },

        suffixes: {
            decibels: "dB",
            percentage: "%",
            milliseconds: "ms",
            hertz: "Hz",
            kilohertz: "KHz",
            ratio: ":{value}",
            beatsPerMinute: "BPM",
        },

        modalButtons: {
            ok: "Ok",
            yes: "Oui",
            no: "Non",
            cancel: "Annuler"
        },

        // These Strings appear in the tabs throughout the pages
        navigation: {
            // Tabs at the top of the Page
            profiles: "Profils",
            presets: "Préréglages",
            samples: "Sons",

            // Main Navigation Tabs
            microphone: "Micro",
            mixer: "Mixer",
            configuration: "Configuration",
            effects: "Effets",
            sampler: "Sampler",
            lighting: "Éclairage",
            routing: "Routage",
            system: "Système",
            library: "Bibliothèque",
            application: "Application",

            // Navigation Sections on the Lighting Page
            lightingGlobal: "Global",
            lightingMixer: "Mixer",
            lightingEffects: "Effets",
            lightingSampler: "Sampler",
            lightingCough: "Toux/Bip",

            // Accessibility Messages (these are announced to screen readers)
            accessibilityProfileSection: "Profils et Fichiers",
            accessibilityDeviceSection: "Réglages de l'appareil",
            accessibilityLightingSection: "Paramètres d'éclairage",
        },

        // Strings that appear in the Mic tab, note that the Profile Strings are handled in 'profileManager'
        microphone: {
            chain: {
                title: "Chaîne de traitement",
                input: "Entrée",
                gate: "Gate",
                gateToggle: "Suppression de bruit activée",
                threshold: "Seuil",
                equaliser: "Égaliseur",
                bands: "{count} bandes",
                flat: "Plat",
                eqPeak: "{gain} dB à {freq}",
                compressor: "Compresseur",
                compressorDetail: "Seuil {threshold} dB",
                curveHintFine: "tirer un point vers le haut ou le bas pour son niveau, sur le côté pour sa fréquence",
                fineTune: "Ajuster les fréquences",
                bandLabel: "Bande à {freq}",
                curveHint: "tirer un point pour régler sa bande",
            },
            profiles: {
                title: "Profils de Micro"
            },

            setup: {
                button: "Configuration du Gain",
                title: "Configuration du Gain",
                type: "Type de Micro",
                gain: "Gain",

                // Microphone Types
                xlr: "Microphone XLR",
                phantom: "XLR + Phantom (+{voltage}V)",
                jack: "3.5mm",
            },

            waveform: {
                loud: "Trop Fort",
                good: "Bien",
                gate_estimated: "Bas"
            },

            gate: {
                title: "Supression de bruit",
                threshold: "Seuil",
                attenuation: "Atténuation",
                attack: "Attaque",
                release: "Relâchement",
            },

            equaliser: {
                title: "Égaliseur",
                reset: "Réinitialiser",
                enableFineTune: "Changer la fréquence",
                bass: "Basse",
                mid: "Médium",
                treble: "Aigu",
            },

            compressor: {
                title: "Compresseur",
                amount: "Quantité",
                threshold: "Seuil",
                ratio: "Ratio",
                attack: "Attaque",
                release: "Relâchement",
                makeUpGain: "Gain de Compensation",
            },

            extras: {
                title: "Suppléments",
                deEsser: "De-Esser",
                bleep: "Bip",
            }
        },

        mixer: {
            // Box Headers
            inputs: "Entrées",
            outputs: "Sorties",
            otherInputs: "Autres entrées",
            strip: {
                source: "Source",
                mute: "Couper",
                muteFunction: "Coupe vers",
                lighting: "Éclairage de {channel}",
                lightingTitle: "Éclairage · {channel}",
            },
            mixAssignment: "Assignation de mixage",

            // Submix Checkbox
            submix: "Sous-mixages",
            submixHint: "Un second mix (Mix B) pour chaque canal, faders compris, pour envoyer des niveaux différents vers certaines sorties.",

            // Mix Assignment
            channelA: "A",
            channelB: "B"
        },

        // Strings in the Configuration Tab
        configuration: {
            // This is common between Faders and Cough Buttons
            mute_behaviour: {
                all: "Muet vers @:message.channels.All",
                stream: "Muet vers @:message.channels.StreamMix",
                chatMic: "Muet vers @:message.channels.ChatMic",
                headphones: "Muet vers @:message.channels.Headphones",
                lineOut: "Muet vers @:message.channels.LineOut",
            },
            muteBehaviourTitle: "Comportement de mise en sourdine",
            muteBehaviourLabel: "Comportement de mise en sourdine pour {channel}",

            // Config for the Faders
            faders: {
                title: "Faders",
                channelTitle: "Canal",
                sourceTitle: "Source",
                sourceLabel: "Source pour {channel}",
            },

            // Configuration for the Cough Button
            cough: {
                lighting: "Éclairage",
                lightingTitle: "Éclairage de Toux et Bip",
                behaviour: {
                    hold: "Maintenir",
                    toggle: "Basculer",
                },

                title: "Paramètres du Bouton Sourdine",
                behaviourTitle: "Options Bouton Sourdine",
            }
        },

        effects: {
            lighting: {
                customise: "Personnaliser la couleur",
                title: "Éclairage des effets",
                presetButton: "Bouton du préréglage · {name}",
                applyPresets: "Appliquer à tous les préréglages",
                encoders: "Molettes",
                applyEncoders: "Appliquer à toutes les molettes",
                buttons: "Boutons d'effet",
                applyButtons: "Appliquer à tous les boutons d'effet",
            },
            face: {
                label: "Effets",
                master: "Effets",
                enabled: "Activé",
                on: "marche",
                off: "arrêt",
                power: "Allumer ou éteindre {effect}",
            },
            preset: {
                name: "Nom",
                title: "Préréglages",
                group: "Groupe",

                menuLoad: "Charger",
                menuRename: "Renommer",
                menuSave: "Sauvegarder",


                loadPreset: "Chargement des Préréglages",

                renamePresetTitle: "Renommer le préréglage",
                renamePresetPlaceholder: "Nouveau nom de préréglage",
                renamePresetOk: "@:message.modalButtons.ok",
                renamePresetCancel: "@:message.modalButtons.cancel",

                noPresets: "Il n'y a actuellement aucun préréglage dans la bibliothèque, enregistrez ou copiez-en pour qu'ils apparaissent ici.",
                loadPresetOk: "@:message.modalButtons.ok",

                confirmTitle: "Confirmer le préréglage",
                confirmMessage: "Le chargement de ce préréglage remplacera toutes les modifications non enregistrées sur cette banque d'effets, souhaitez-vous continuer ?",
                confirmOk: "@:message.modalButtons.ok",
                confirmCancel: "@:message.modalButtons.cancel",

                overwriteTitle: "Confirm Preset Overwrite",
                overwriteMessage: "Le préréglage {current} existe déjà dans votre bibliothèque. Souhaitez-vous l'écraser ?",
                overwriteConfirm: "Écraser",
                overwriteCancel: "@:message.modalButtons.cancel",

                accessibilityOpenPresetDirectory: "Ouvrir le répertoire des préréglages",
                accessibilityPresetLoaded: "Préréglage {name} chargé dans {bank}",
                accessibilityPresetSaved: "Préréglage {name} Enregistrer sous Library",
            },
            reverb: {
                title: "Réverbération",
                style: "Style",

                styles: {
                    library: "Bibliothèque",
                    darkBloom: "Dark Bloom",
                    musicClub: "Club de Musique",
                    realPlate: "Real Plate",
                    chapel: "Chapelle",
                    hockeyArena: "Salle de hockey"
                },

                amount: "Quantité",
                decay: "Décalé",
                earlyLevel: "Niveau",
                tailLevel: "Niveau de Reverb",
                preDelay: "Pre-Décalé",
                lowColour: "Basse",
                highColour: "Basse Haute",
                highFactor: "Facteur de haute fréquence",
                diffuse: "Dispersé",
                modSpeed: "ModSpeed",
                modDepth: "ModDepth"
            },

            echo: {
                title: "Echo",

                style: "Style",
                styles: {
                    quarter: "Quart",
                    eighth: "Huitième",
                    triplet: "Triplet",
                    pingPong: "Ping Pong",
                    classicSlap: "Claquement classique",
                    multiTap: "MultiTap"
                },

                amount: "Quantité",
                feedback: "Retour d'echo",
                tempo: "Tempo",
                delayLeft: "Delay L",
                delayRight: "Delay R",
                feedbackLeft: "Feedback L",
                feedbackRight: "Feedback R",
                xfbLeftToRight: "XFB L to R",
                xfbRightToLeft: "XFB R to L",
            },

            pitch: {
                title: "Changeur de voix",

                style: "Style",
                styles: {
                    narrow: "Étroit",
                    wide: "Large"
                },

                amount: "Quantité",
                character: "Character"
            },

            gender: {
                title: "Genre",

                style: "Style",
                styles: {
                    narrow: "Étroit",
                    medium: "Moyen",
                    wide: "Large"
                },

                amount: "Quantité"
            },

            megaphone: {
                title: "Mégaphone",

                style: "Style",
                styles: {
                    megaphone: "Mégaphone",
                    radio: "Radio",
                    onThePhone: "Téléphone",
                    overdrive: "Surmultiplié",
                    buzzCutt: "Buzz Cutt",
                    tweed: "Tweed"
                },

                amount: "Quantité",
                postGain: "Gain d'après"
            },

            robot: {
                title: "Robot",

                style: "Style",
                styles: {
                    robot1: "Robot 1",
                    robot2: "Robot 2",
                    robot3: "Robot 3",
                },

                lowGain: "Gain bas",
                lowFrequency: "Fréquence basse",
                lowWidth: "Largeur basse",
                midGain: "Gain Moyen",
                midFrequency: "Fréquence moyenne",
                midWidth: "Largeur moyenne",
                highGain: "Gain élevé",
                highFrequency: "Haute fréquence",
                highWidth: "Largeur haute",
                waveform: "Forme d'onde",
                pulseWidth: "Largeur d'impulsion",
                threshold: "Seuil",
                dryMix: "Mix Sec",
            },

            hardTune: {
                title: "Autotune",

                style: "Style",
                styles: {
                    natural: "Naturel",
                    medium: "Moyen",
                    hard: "Fort"
                },

                amount: "Quantité",
                rate: "Rythme",
                window: "Fenêtre",

                source: "Source"
            }
        },

        sampler: {
            lighting: {
                label: "Éclairage",
                customise: "Personnaliser la couleur",
                title: "Éclairage du sampler",
                bank: "Boutons de la banque {bank}",
                note: "La GoXLR règle ces couleurs pour toute la banque : les quatre boutons les partagent.",
                applyBanks: "Appliquer à toutes les banques",
            },
            bankTitle: "Banque",
            pads: {
                title: "Boutons",
                empty: "Vide",
                count: "{count} son(s)",
                dropHere: "Déposer pour affecter",
            },
            banks: {
                bankTitle: "Banque",
                bank: {
                    a: "A",
                    b: "B",
                    c: "C"
                },
                buttonTitle: "Bouton",
                buttonLabel: "Bouton de Banque {activeBank}",
                buttons: {
                    topLeft: "En haut à gauche",
                    topRight: "En haut à droite",
                    bottomLeft: "En bas à gauche",
                    bottomRight: "En bas à droite",
                },

                functionTitle: "Fonction",
                functionLabel: "Fonction pour {activeButton} le bouton dans la banque {activeBank}",
                functions: {
                    playNext: "Lecture / Suivant",
                    playStop: "Lecture / Stop",
                    playFade: "Lecture / Fondu en sortie",
                    stopOnRelease: "Arrêt lors du relâchement",
                    fadeOnRelease: "Fondu lors du relâchement",
                    loop: "Boucle"
                },

                playOrderTitle: "Ordre de lecture",
                playOrderLabel: "Ordre de lecture pour {activeButton} le bouton dans la banque {activeBank}",
                playOrders: {
                    sequential: "Sequentiel",
                    random: "Aléatoire",
                },
            },

            samplesTitle: "Sons",
            samples: {
                samplesTitle: "Sons",
                samplesLabel: "Son pour {activeButton} le bouton dans la banque {activeBank}",

                // Button at the bottom of the Sample List
                addSample: "+",
                addSampleLabel: "Ajouter un son",
                sampleSelector: {
                    parentDirectory: "Répertoire parent",
                    addButton: "Ajouter",

                    noSamples: "Il n'y a actuellement aucun son dans le dossier des son. Copiez-en quelques-uns pour qu'ils puissent être sélectionnés ici !",

                    // Used with Screen Readers
                    directories: "Dossiers",
                    samples: "Sons",
                },

                gain: "Gain",
                waveform: {
                    title: "Forme d'onde",

                    // These are primarily for accessibility, but are labels on the various buttons.
                    text: "Forme d'onde pour {sample}",

                    // The Play / Stop button before the waveform
                    playbackSample: "Lancer le son",
                    stopSample: "Arrêter le son",

                    // Labels for the draggable 'Handles'
                    sampleStart: "Début de son",
                    sampleEnd: "Fin de son",

                    sampleDeleted: "Son {sampleName} a été supprimé de {activeButton} la banque {activeBank}",
                    zoomLevel: "Niveau de zoom: {level}",
                },

                addSampleWaitTitle: "Veuillez patienter",
                addSampleAnalysing: "Veuillez patienter pendant que le son est analysé",
                addSampleProgress: "Progression: {progress}@:message.suffixes.percentage",

                errorTitle: "Erreur lors de l'ajout du son",
                errorText: "Une erreur s'est produite lors de l'ajout du son a la banque:",

                accessibilityOpenSamplesDirectory: "Ouvrir le répertoire de son",
                accessibilityAnalysing: "Veuillez patienter, analyse de sons en cours. Ce processus peut prendre quelques minutes.",
                accessibilityAdded: "Son {name} ajouté au bouton {activeButton} de la banque {activeBank}."
            }
        },

        lighting: {
            channel: {
                applyFaders: "Appliquer à tous les faders",
                applyMutes: "Appliquer à tous les boutons muet",
                openIcons: "Ouvrir le dossier des icônes",
                display: "Affichage",
                preview: "Aperçu",
                previewFader: "fader",
                previewMeter: "vumètre",
                hintTwoColour: "Sous le fader : couleur basse. Au-dessus : couleur haute.",
                hintGradient: "Sous le fader : dégradé de la couleur basse vers la haute. Au-dessus : éteint.",
                hintMeter: "Les LED suivent le niveau du son du canal, et non la position du fader.",
                hintGradientMeter: "Les LED suivent le niveau du son du canal, en dégradé de la couleur basse vers la haute.",
                previewScreen: "écran",
                previewActive: "actif",
                previewRest: "au repos",
            },
            // These are some common strings that are used in multiple places
            common: {
                colour: "Couleur",

                activeColour: "Actif",
                inactiveColour: "Inactif",

                inactiveOption: "Option d'inactivité",
                inactiveOptions: {
                    dimActiveColour: "Couleur active atténuée",
                    inactiveColour: "Couleur inactive",
                    dimInactiveColour: "Couleur inactive atténuée"

                },

                applyToAll: "Appliquer à tout",
                pickColour: "choisir une couleur",
                restLabel: "Au repos",
                restColour: "Couleur au repos",
                restDimmedHint: "Le bouton reprend sa couleur active, en moins lumineux : pas de couleur à choisir.",
                brightness: "Luminosité",
            },

            global: {
                areas: {
                    title: "Zones",

                    area: "Zone",
                    areas: {
                        global: "Global",
                        accent: "Accent",
                    },

                    colour: "@:message.lighting.common.colour",
                },

                animations: {
                    title: "Animations",

                    mode: "Mode d'Animation",
                    modes: {
                        none: "Aucun",
                        rainbowRetro: "Rétroréglage arc-en-ciel",
                        rainbowBright: "Arc-en-ciel vif",
                        rainbowDark: "Arc-en-ciel sombre",
                        simple: "Simple",
                        ripple: "Ondulation",
                    },

                    mod1: "Modulation de dégradé 1",
                    mod2: "Modulation de dégradé 2",

                    waterfall: "Paramètres de cascade",
                    waterfallOff: "Éteint",
                }
            },

            mixer: {
                faders: {
                    title: "@:message.configuration.faders.title",
                    channelTitle: "@:message.configuration.faders.channel",
                },

                fader: {
                    title: "Fader",

                    style: "Style",
                    styles: {
                        gradient: "Dégradé",
                        meter: "Mètre",
                    },

                    bottomColour: "Couleur basse",
                    topColour: "Couleur haute",

                    accessibilityTitle: "Paramètres du fader pour {channel}",
                },

                screen: {
                    title: "écran",
                    backgroundColour: "Couleur de fond",
                    icons: "Icônes",
                    iconNone: "-- Éteint --",

                    optionsTitle: "Options",
                    options: {
                        showNumber: "Afficher le numéro",
                        invertDisplay: "Inverser l'affichage",
                        text: "Texte",

                        accessibilityText: "Texte à afficher sur l'écran GoXLR"
                    }
                },

                mute: {
                    // Pretty much all other fields for this area come from 'Common'
                    title: "Muet",
                    accessibilityTitle: "Paramètres de sourdine pour {channel}"
                }
            },

            effects: {
                preset: {
                    title: "Boutons de préréglage",
                    presetTitle: "Préréglage"
                },

                encoders: {
                    title: "Encoders",

                    encoder: "Encoder",
                    encoders: {
                        reverb: "Reverbération",
                        echo: "Echo",
                        pitch: "Hauteur",
                        gender: "Genre",
                    },

                    leftColour: "Couleur de gauche",
                    rightColour: "Couleur de droite",
                    knobColour: "Couleur du bouton rotatif"
                },

                buttons: {
                    title: "Boutons d'effet",

                    effectTitle: "Effet",
                    effect: {
                        megaphone: "Mégaphone",
                        robot: "Robot",
                        hardTune: "Autotune",
                        fx: "Effet",
                    }
                },
            },
            sampler: {
                title: "Banque",

                buttonsTitle: "Boutons",
                buttons: {
                    a: "A",
                    b: "B",
                    c: "C"
                },

                active: "Actif / Chargé",
                empty: "Son vide",
                inactive: "Banque Inactive",
            },

            cough: {
                title: "Boutons de Toux/Bip",

                buttonsTitle: "Buttons",
                buttons: {
                    bleep: "Bip",
                    cough: "Toux",
                }
            },
        },

        routing: {
            // There are (frustratingly) some minor differences between how channels appear in the routing table,
            // and how they appear in the Mixer, these changes also fall under the hood at the Utility level, so
            // we'll define all the channels here, and 'fix' anything which needs adjustment.
            title: "Cheminement",

            input: "Entrées",
            inputs: {
                Microphone: "@:message.channels.Mic",
                Chat: "Chat",
                Music: "@:message.channels.Music",
                Game: "@:message.channels.Game",
                Console: "@:message.channels.Console",
                LineIn: "@:message.channels.LineIn",
                System: "@:message.channels.System",
                Samples: "@:message.channels.Sample",
            },

            output: "Sorties",
            outputs: {
                Headphones: "@:message.channels.Headphones",
                BroadcastMix: "@:message.channels.StreamMix",
                ChatMic: "@:message.channels.ChatMic",
                Sampler: "@:message.channels.Sampler",
                LineOut: "@:message.channels.LineOut",
                VOD: "@:message.channels.VOD",
            }
        },

        system: {
            networkAccess: {
                title: "Accès depuis le réseau",
                explain: "Sur un autre appareil de votre réseau (tablette, téléphone, ordinateur), ouvrez une fois l'un de ces liens. L'accès est ensuite mémorisé.",
                restart: "Redémarrez GoXLR Utility pour y accéder depuis votre réseau. Les liens s'afficheront alors ici.",
                noAddress: "Aucune adresse réseau n'a été trouvée pour cet ordinateur.",
                copy: "Copier",
                copied: "Copié",
                regenerate: "Nouveau lien (les liens précédents ne marchent plus)",
            },
            firmwareUpdate: {
                noInfo: "Les serveurs de mise à jour n'ont pas répondu : la dernière version n'est pas connue. Cette GoXLR est en {currentVersion}.",
                updateTo: "Mettre à jour vers {version}",
                reinstall: "Réinstaller {version}",
                customButton: "Firmware personnalisé…",
                confirmTitle: "Flasher le firmware ?",
                confirmText: "La GoXLR redémarre pendant la mise à jour. Ne la débranchez pas et ne fermez pas l'utilitaire avant la fin.",
                confirmCustom: "Vous allez choisir un fichier de firmware (.bin). N'utilisez qu'un fichier de confiance : un mauvais fichier peut rendre la GoXLR inutilisable. Ne la débranchez pas pendant la mise à jour.",
            },
            title: "Système",
            menu: {
                firmware: "Mise à jour du firmware",
            },

            powerButton: "Actions d'alimentation",
            power: {
                shutdownTitle: "Actions d'arrêt",
                shutdownDescription: "Ces actions seront exécutées lorsque l'utilitaire GoXLR sera arrêté en toute sécurité.",

                sleepTitle: "Actions de mise en veille.",
                sleepDescription: "Ces actions seront exécutées lorsque votre système va entrer en mode veille.",

                wakeTitle: "Actions de réveil.",
                wakeDescription: "Ces actions seront exécutées lorsque votre système se réveille de la mise en veille.",

                settingsError: "La configuration semble avoir été modifiée manuellement. Pour éviter tout dommage, l'interface utilisateur ici ne fonctionnera pas. Pour réinitialiser complètement les actions d'arrêt, appuyez sur le bouton ci-dessous.",
                settingsReset: "Réinitialiser les actions d'arrêt.",

                power_options: {
                    reload: "Recharger les paramètres.",
                    saveProfile: "Enregistrer le profil.",
                    loadProfile: "Charger le profil complet.",
                    loadColourProfile: "Charger le profil de couleur.",
                    saveMicProfile: "Sauvegarder le profil du microphone.",
                    loadMicProfile: "Charger le profil du microphone",
                }
            },

            deviceButton: "Paramètres de l'appareil",
            device: {
                holdDuration: "Durée du maintien du bouton de sourdine pour mettre en sourdine tout.",
                holdDurationAccessibility: "La durée en millisecondes pendant laquelle le bouton de sourdine doit être maintenu enfoncé pour mettre en sourdine tous les canaux.",

                sampleBuffer: "Tampon de pré-enregistrement du son (en secondes)",
                sampleBufferAccessibility: "La durée en secondes pendant laquelle le son enregistrera avant que le bouton ne soit pressé.",

                voiceDeafen: "Mettre en sourdine tout dans le chat vocal met également en sourdine le micro pour le chat vocal.",
                voiceDeafenAccessibility: "Lors de la mise en sourdine de tous les canaux, mettez également en sourdine le micro pour le chat vocal.",

                monitorWithFx: "Activer ou désactiver l'état de surveillance du microphone avec effets.",
                monitorWithFxAccessibility: "Active la surveillance du micro lorsque les effets sont activés.",

                resetSampleFunctionOnClear: "Réinitialiser la fonction d'exemple lors de l'effacement.",
                resetSampleFunctionOnClearAccessibility: "Réinitialise la fonction d'exemple à Démarrer / Suivant lorsqu'elle est effacée.",

                lockFaders: "Verrouiller les positions des curseurs lors de la mise en sourdine générale.",
                lockFadersAccessibility: "Empêche les curseurs de descendre lorsque la mise en sourdine générale est activée.",
            },

            settingsButton: "Paramètres de l'Utilitaire",
            settings: {
                language: "Langue",
                useSystem: "Utiliser la langue du système (si disponible)",

                uiHandler: "Gestionnaire d'interface utilisateur",
                uiHandlers: {
                    browser: "Navigateur",
                    app: "Application",
                    custom: "Personnalisé"
                },


                logLevel: "Niveau de journalisation (nécessite un redémarrage)",
                logLevels: {
                    off: "Éteint",
                    error: "Erreur",
                    warn: "Avertissement",
                    info: "Information",
                    debug: "Débogage",
                    trace: "Trace"

                    // OFF / ERROR / WARN / INFO / DEBUG / TRACE
                },

                allowNetworkAccess: "Autoriser l'accès réseau de l'interface utilisateur (nécessite un redémarrage)",
                allowNetworkAccessAccessibility: "Autoriser l'accès à l'interface utilisateur depuis d'autres appareils sur le réseau",

                autoStart: "Démarrage automatique à la connexion",
                autoStartAccessibility: "Démarrer l'utilitaire GoXLR lorsque l'utilisateur se connecte",

                showOnLaunch: "Afficher l'interface utilisateur au lancement",
                showOnLaunchAccessibility: "Lance automatiquement l'interface utilisateur au démarrage",

                showTray: "Afficher l'icône dans la barre d'état système (nécessite un redémarrage)",
                showTrayAccessibility: "Afficher l'icône de l'utilitaire GoXLR dans la zone de notification du système",

                ttsOnButton: "Synthèse vocale lors de l'appui sur le bouton",
                ttsOnButtonAccessibility: "Lire à voix haute l'état du bouton lorsqu'il est pressé, soit via un lecteur d'écran soit via la synthèse vocale du système",

                recoverDefaults: "Restaurer les paramètres par défaut",
                recoverOptions: {
                    profiles: "Profiles",
                    micProfiles: "Profils microphone",
                    icons: "icônes",
                    presets: "Préréglages"
                },

                shutdownUtility: "Arrêter l'utilitaire GoXLR"
            },

            aboutButton: "À propos de GoXLR",
            about: {
                serial: "Série",
                utilityVersion: "Version Utilitaire",
                driverVersion: "Version du pilote",
                hardwareVersion: "Version Matérielle",

                firmware: "Firmware",
                dice: "DICE",
                fpga: "FPGA"
            },

            licenses: "Licences",
            help: "Aide",
        },

        // Strings used in Profile and Microphone Profile Management.
        theme: {
            label: "Thème de couleurs",
            dark: "Sombre",
            light: "Clair",
            system: "Auto",
        },
        topBar: {
            loadTitle: "Charger {name} ?",
            loadQuestion: "Les réglages de {current} qui n'ont pas été enregistrés seront perdus.",
            loadMicQuestion: "Les réglages du profil micro {current} qui n'ont pas été enregistrés seront perdus.",
            load: "Charger",
            saveThenLoad: "Enregistrer, puis charger",
            lighting: "Éclairage global",
            lightingTitle: "Éclairage global",
            profile: "Profil",
            profileLabel: "Profil actif",
            micProfile: "Micro",
            micProfileLabel: "Profil micro actif",
            save: "Enregistrer",
            showDevice: "Afficher la GoXLR",
            hideDevice: "Masquer la GoXLR",
        },
        sampleAssign: {
            title: "Affecter à {bank} · {button}",
            bank: "Banque",
            empty: "Ce bouton n'a pas encore de son.",
            current: "Ce bouton contient déjà {count} son(s) :",
            add: "Ajouter",
            replace: "Remplacer",
            removing: "Retrait des sons actuels…",
            adding: "Ajout {index} sur {total} : {name}…",
            done: "{count} son(s) affecté(s) à {bank} · {button}",
            timeoutRemove: "Le daemon a mis trop de temps à retirer les sons actuels",
            timeout: "{name} : le daemon a mis trop de temps à ajouter ce son",
        },
        sampleManager: {
            newFolder: "Nouveau dossier",
            openFolder: "Ouvrir le dossier des sons",
            rename: "Renommer",
            renameFolder: "Renommer le dossier",
            renameFolderLabel: "Renommer le dossier {name}",
            renameSample: "Renommer le son",
            moveTo: "Déplacer vers...",
            moveTitle: "Déplacer {name}",
            moveDestination: "Dossier de destination",
            rootFolder: "(Dossier des sons)",
            move: "Déplacer",
            namePlaceholder: "Nom",
            extensionKept: "L'extension {extension} est conservée.",
            invalidName: "Un nom ne peut pas contenir / ou \\.",
            ok: "OK",
            cancel: "Annuler",
            edit: "Éditer",
            listen: "Écouter",
            playPreview: "Écouter {name}",
            stopPreview: "Arrêter {name}",
            delete: "Supprimer",
            deleteFolderLabel: "Supprimer le dossier {name}",
            deleteSampleTitle: "Supprimer le son",
            deleteSampleQuestion: "Mettre {name} à la corbeille ?",
            deleteFolderTitle: "Supprimer le dossier",
            deleteFolderQuestion: "Mettre à la corbeille le dossier {name} et les {count} son(s) qu'il contient ?",
            deleteEmptyFolderQuestion: "Mettre le dossier vide {name} à la corbeille ?",
            usedByProfiles: "Utilisé par ces profils :",
            usedByProfilesHint: "Les boutons du sampler qui l'utilisent ne joueront plus rien.",
            editTitle: "Éditer {name}",
            editHelp: "Faites glisser sur la forme d'onde pour sélectionner une partie, puis gardez-la (rogner) ou supprimez-la. Les parties supprimées apparaissent en rouge.",
            originalLength: "Durée : {length}",
            resultLength: "Après édition : {length}",
            selectionRange: "Sélection : {start} - {end}",
            playSelection: "Écouter la sélection",
            playResult: "Écouter le résultat",
            stop: "Arrêter",
            keepSelection: "Garder la sélection",
            removeSelection: "Supprimer la sélection",
            undo: "Annuler",
            saveAs: "Enregistrer",
            replaceFile: "Remplacer le fichier",
            convertedToWav: "Il sera enregistré en WAV : {name}",
            saveCopy: "Enregistrer dans un nouveau fichier",
            copyName: "Nom du nouveau fichier",
            copyHint: "Enregistré en WAV dans le même dossier.",
            copySuffix: "(modifié)",
            save: "Enregistrer",
            saving: "Enregistrement...",
            nothingLeft: "Cela supprimerait tout le son.",
            breadcrumb: "Dossier courant",
            rootName: "Sons",
            search: "Rechercher",
            selectedCount: "{count} sélectionné(s)",
            selectAll: "Tout sélectionner",
            done: "Terminer",
            selectSample: "Sélectionner {name}",
            usedByActiveProfile: "Utilisé par le profil actuel",
            sizeKb: "{size} Ko",
            sizeMb: "{size} Mo",
            noResults: "Aucun son ne correspond à cette recherche.",
            emptyFolder: "Ce dossier est vide.",
            dropHint: "Déposez des fichiers audio ici pour les importer dans ce dossier.",
            duplicate: "Dupliquer",
            import: "Importer des sons",
            importing: "Importation...",
            multiSelect: "Sélection multiple",
            trash: "Corbeille",
            trashCount: "Corbeille ({count})",
            moveManyTitle: "Déplacer {count} sons",
            deleteSamplesQuestion: "Mettre ces {count} sons à la corbeille ?",
            trashHint: "Vous pourrez le restaurer depuis la corbeille pendant 30 jours.",
            moveToTrash: "Mettre à la corbeille",
            trashEmpty: "La corbeille est vide.",
            folderCount: "{count} son(s)",
            restore: "Restaurer",
            deleteForever: "Supprimer",
            trashRetention: "Les éléments sont supprimés définitivement après 30 jours.",
            emptyTrash: "Vider la corbeille",
            emptyTrashConfirm: "Cliquez encore pour tout supprimer",
            close: "Fermer",
            trimSilence: "Couper les silences",
            normalize: "Normaliser le volume (pic le plus fort à -1 dB)",
            onlySilence: "Ce son ne contient que du silence.",
            noSilence: "Il n'y a pas de silence à couper au début ou à la fin.",
            errorTitle: "Impossible d'effectuer cette action",
        },

        profileManager: {
            // Accessibility Titles for the buttons at the bottom of the Profile List
            saveProfileName: "Sauvegarder profil {profileName}",
            createProfile: "Crée un profil",

            // Dialog Popup when clicking 'Create Profile' Button
            newTitle: "Nouvelle Source de Profil",
            newQuestion: "Souhaitez-vous créer un nouveau profil à partir de la configuration par défaut ou de la configuration actuelle ?",
            newDefaultButton: "Par défaut",
            newCurrentButton: "Actuelle",
            newCancelButton: "@:message.modalButtons.cancel",

            // Dialog Popup when hitting the 'Save Profile' button
            overwriteTitle: "Confirmation d'écrasement",
            overwriteQuestion: "Êtes-vous sûr de vouloir écraser le profil ? {activeProfile}?",
            overwriteYes: "@:message.modalButtons.yes",
            overwriteNo: "@:message.modalButtons.no",

            // Dialog Popup when clicking the 'Delete' Menu Item
            deleteTitle: "Confirmation de suppression",
            deleteQuestion: "Supprimer le profil {profileName} ? Il est gardé 30 jours dans la corbeille, d'où il peut être restauré (Bibliothèque > Profils).",
            trashTitle: "Profils supprimés",
            trashEmpty: "Aucun profil supprimé. Les profils supprimés sont gardés ici 30 jours.",
            trashProfile: "Profil",
            trashMic: "Profil micro",
            deleteYes: "@:message.modalButtons.yes",
            deleteNo: "@:message.modalButtons.no",

            // Dialog prompting for a new Profile Name
            newNameTitle: "Entrez le nouveau nom de profil",
            newNamePlaceHolder: "Nouveau nom de profil",
            newNameOk: "@:message.modalButtons.ok",
            newNameCancel: "@:message.modalButtons.cancel",

            // Dialog Popup when attempting to delete the active profile
            deleteCurrentErrorTitle: "Impossible de supprimer",
            deleteCurrentErrorMessage: "Il n'est pas possible de supprimer le profil actif.",

            // Items in the Popup Menu on Profiles
            menuLoadProfile: "Charger le profil",
            menuLoadProfileColours: "Charger seulement les couleurs",
            menuDeleteProfile: "Supprimer le profil",


            // Accessibility Messages (these are announced to screen readers)
            accessibilityLoadedProfile: "Profil {profileName} charger",
            accessibilityLoadedColours: "Profil {profileName} Couleur chargée",
            accessibilityCreatedProfile: "Profil créé {profileName}",
            accessibilitySavedProfile: "Profile {profileName} Saved",
            accessibilitySavedProfileAs: "Profil {profileName} Enregistrer sous {newProfileName}",
            accessibilityProfileDeleted: "Profil {profileName} Supprimé",
            accessibilityActiveProfile: "Profil actif",
            accessibilityDropMenuTitle: "{profileName} options",
            accessibilityOpenProfileDirectory: "Ouvrir le répertoire des profils",
            accessibilityOpenMicProfileDirectory: "Ouvrir le répertoire des profils de microphone",
        },
    }
}
