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
        scenes: {
            title: "Scènes",
            runHint: "Appliquer la scène {name} (volumes, mutes, routage, effets)",
            update: "Remplacer {name} par les réglages actuels",
            delete: "Supprimer la scène {name}",
            empty: "Enregistrez les volumes, mutes, routage et effets actuels pour les retrouver en un clic.",
            new: "Nouvelle scène à partir des réglages actuels…",
            newTitle: "Nouvelle scène",
            create: "Créer",
            saved: "Scène {name} enregistrée",
            ran: "Scène {name} appliquée",
            deleted: "Scène {name} supprimée",
            updateTitle: "Remplacer {name} ?",
            updateQuestion: "La scène {name} prendra les volumes, mutes, routage et effets actuels à la place des siens.",
            updateYes: "Remplacer",
            deleteTitle: "Supprimer {name} ?",
            deleteQuestion: "La scène {name} sera supprimée. Ce n'est pas annulable.",
            deleteYes: "Supprimer",
        },
        integrations: {
            title: "Intégrations",
            intro: "Stream Deck, OBS, Touch Portal ou vos propres scripts peuvent piloter la GoXLR par l'API HTTP de l'utilitaire, celle qu'utilise cette interface.",
            commandUrl: "Envoyer une commande",
            statusUrl: "Lire l'état complet",
            websocketUrl: "Suivre les changements (WebSocket)",
            format: "Une commande est un objet JSON dont l'entrée « Command » contient le numéro de série de l'appareil et la commande, comme dans les exemples ci-dessous. Les noms et arguments sont ceux de GoXLRCommand dans le code de l'utilitaire (ipc/src/lib.rs).",
            examples: "Exemples pour cet appareil",
            copyCurl: "Copier curl",
            copyJson: "Copier le JSON",
            more: "Depuis un autre ordinateur, l'accès réseau doit être activé et le lien doit porter le jeton d'accès (voir Accès réseau ci-dessus).",
            networkTitle: "Accès réseau",
            exampleMicMute: "Couper le micro",
            exampleVolume: "Mettre le volume Musique à moitié",
            exampleProfile: "Charger le profil {name}",
            exampleScene: "Appliquer la scène {name}",
            copyFailed: "Impossible de copier dans le presse-papiers",
            recordTitle: "N'importe quel contrôle en commande API",
            recordIntro: "Activez l'enregistrement, puis utilisez le contrôle voulu (un fader, un bouton, un effet) : la commande qu'il a envoyée apparaît ici, prête à copier. L'enregistrement s'arrête à la fermeture de l'interface.",
            record: "Enregistrer les commandes envoyées par cette interface",
            recordEmpty: "Rien pour l'instant : modifiez quelque chose dans l'interface.",
            clear: "Effacer",
            schemaTitle: "Schéma",
            schemaIntro: "Toutes les commandes et leurs arguments, en JSON Schema (pour les éditeurs et les générateurs de code).",
            schemaUrl: "JSON Schema des requêtes",
        },
        setupWizard: {
            menu: "Assistant de configuration",
            title: "Premiers pas ({step} sur {count})",
            micTitle: "Votre micro",
            micText: "Choisissez le type de micro, puis montez le gain jusqu'à ce que votre voix normale atteigne le milieu du vumètre, sans aller dans le rouge.",
            routingTitle: "Où va le son",
            routingText: "La GoXLR ajoute des périphériques audio à l'ordinateur. Envoyez chaque application vers son périphérique pour la régler avec les faders :",
            openRouting: "Ouvrir la table de routage",
            saveTitle: "Garder ces réglages",
            saveText: "Enregistrez le profil et le profil micro : ils sont rechargés à chaque démarrage de la GoXLR.",
            saveButton: "Enregistrer le profil et le profil micro",
            skip: "Ne plus afficher",
            back: "Retour",
            next: "Suivant",
            finish: "Terminer",
        },
        common: {
            close: "Fermer",
            lighting: "Éclairage",
            clear: "Effacer",
            collapseSection: "Replier la section",
            expandSection: "Déplier la section",
            activeProfile: "Profil actif",
            switchDevice: "Changer d'appareil",
            removeSample: "Retirer le son",
            waterfallAnimationUp: "Animation cascade vers le haut",
            waterfallAnimationDown: "Animation cascade vers le bas",
            unknown: "Inconnu",
            tabList: "Liste des onglets",
        },
        versionCheck: {
            updateAvailable: "Mise à jour disponible",
            firmwareDirectionAvailable: "{direction} du firmware disponible",
            firmwareDirections: {
                update: "Mise à jour",
                downgrade: "Rétrogradation",
                unknown: "INCONNU",
            },
            incompatibleDriver: "Les pilotes installés sont incompatibles avec ce firmware, cliquez ici pour télécharger le dernier pilote.",
        },
        micMute: {
            mute: "Couper le micro",
            muted: "Micro coupé",
            hint: "Coupe le micro comme le bouton Mute de l'appareil (M)",
            holdMode: "Le bouton Mute est en mode maintien : il ne coupe que tant qu'on le maintient sur l'appareil",
        },
        shortcuts: {
            undo: "Annuler la dernière modification (volumes, mutes, routage, égaliseur, couleurs)",
            undone: "Modification annulée",
            title: "Raccourcis clavier",
            save: "Enregistrer le profil et le profil micro",
            micMute: "Couper ou rétablir le micro",
            sections: "Aller à une section de la barre latérale",
            presets: "Préréglages d'effets 1 à 6",
            banks: "Banques du sampler A, B et C",
            help: "Afficher ces raccourcis",
        },
        deviceSelector: {
            deviceLabel: "{model} · {serial}",
            helpCable: "Vérifiez que la GoXLR est allumée et que son câble USB est branché (essayez un autre port USB, de préférence à l'arrière de l'ordinateur).",
            helpLinux: "Sous Linux, les règles udev (50-goxlr.rules) doivent être installées dans /etc/udev/rules.d ; rechargez-les (udevadm control --reload) puis débranchez et rebranchez la GoXLR.",
            helpWindows: "Sous Windows, le pilote GoXLR de TC-Helicon doit être installé ; redémarrez l'ordinateur après l'installation.",
            helpMacos: "Sous macOS, branchez la GoXLR directement plutôt que sur un hub, et autorisez l'utilitaire si le système le demande.",
            title: "Sélectionner un appareil",
            connecting: "Connexion à l'utilitaire GoXLR en cours…",
            disconnected: "Impossible de se connecter à l'utilitaire GoXLR, vérifiez qu'il est bien lancé.\n\nCette page tentera de se reconnecter automatiquement…",
            noDevices: "Aucun appareil GoXLR trouvé",
            reconnecting: "Connexion au GoXLR Utility perdue, reconnexion…",
        },
        // For these, the keys map directly to their GoXLR Channel Names
        channels: {
            StreamMix1: "Stream Mix 1",
            StreamMix2: "Stream Mix 2",
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
            kilohertz: "kHz",
            ratio: ":{value}",
            beatsPerMinute: "BPM",
        },

        modalButtons: {
            continue: "Continuer",
            close: "Fermer",
            ok: "Ok",
            yes: "Oui",
            no: "Non",
            cancel: "Annuler"
        },

        // These Strings appear in the tabs throughout the pages
        navigation: {
            // Tabs at the top of the Page
            profiles: "Profils",
            samples: "Sons",

            // Main Navigation Tabs
            microphone: "Micro",
            mixer: "Mixer",
            effects: "Effets",
            sampler: "Sampler",
            routing: "Routage",
            system: "Système",
            library: "Bibliothèque",
            application: "Application",

            // Navigation Sections on the Lighting Page

            // Accessibility Messages (these are announced to screen readers)
            accessibilityDeviceSection: "Réglages de l'appareil",
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
                phantomTitle: "Activer l'alimentation fantôme (+{voltage} V) ?",
                phantomWarning: "Seulement pour les micros à condensateur qui en ont besoin. Baissez d'abord le casque et le stream : l'activation peut provoquer un fort « pop ».",
                phantomEnable: "Activer",
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
                resetTitle: "Réinitialiser l'égaliseur ?",
                resetQuestion: "Toutes les bandes reviennent à 0 dB et à leur fréquence par défaut. Avant / Après permet de retrouver l'égaliseur enregistré tant que vous n'enregistrez pas.",
                compare: "Comparer avec l'égaliseur enregistré",
                before: "Avant",
                after: "Après",
                save: "Enregistrer",
                saveHint: "Enregistre l'égaliseur dans le profil micro {profile}",
                savedNotice: "Égaliseur enregistré dans le profil micro {profile}",
                title: "Égaliseur",
                reset: "Réinitialiser",
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
            outputs: "Sorties",
            otherInputs: "Autres entrées",
            strip: {
                muteAllHint: "Clic droit ou appui long : couper pour tout le monde",
                notMuted: "Non coupé",
                mutedAll: "Coupé pour tout le monde",
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
                base: "Muet vers {channel}",
                all: "Muet vers @:message.channels.All",
            },
            muteBehaviourTitle: "Comportement de mise en sourdine",
            muteBehaviourLabel: "Comportement de mise en sourdine pour {channel}",

            // Config for the Faders
            faders: {
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
                accessibilityPresetSaved: "Préréglage {name} enregistré dans la bibliothèque",
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
                title: "Éclairage du sampler",
                bank: "Boutons de la banque {bank}",
                note: "La GoXLR règle ces couleurs pour toute la banque : les quatre boutons les partagent.",
                applyBanks: "Appliquer à toutes les banques",
            },
            pads: {
                record: "Enregistrer dans {button}",
                stopRecording: "Arrêter l'enregistrement de {button}",
                play: "Jouer {button}",
                stop: "Arrêter {button}",
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
                genericError: "Une erreur inconnue s'est produite.",
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
                previewMute: "MUET",
                previewRest: "au repos",
            },
            // These are some common strings that are used in multiple places
            common: {

                activeColour: "Actif",

                inactiveOption: "Option d'inactivité",
                inactiveOptions: {
                    dimActiveColour: "Couleur active atténuée",
                    inactiveColour: "Couleur inactive",
                    dimInactiveColour: "Couleur inactive atténuée"

                },

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

                fader: {
                    title: "Fader",

                    style: "Style",
                    styles: {
                        gradient: "Dégradé",
                        meter: "Mètre",
                    },

                    bottomColour: "Couleur basse",
                    topColour: "Couleur haute",

                },

                screen: {
                    title: "écran",
                    backgroundColour: "Couleur de fond",
                    icons: "Icônes",
                    iconNone: "-- Éteint --",

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
                }
            },

            effects: {

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

                    effect: {
                        megaphone: "Mégaphone",
                        robot: "Robot",
                        hardTune: "Autotune",
                        fx: "Effet",
                    }
                },
            },
            sampler: {

                buttons: {
                    a: "A",
                    b: "B",
                    c: "C"
                },

                active: "Actif / Chargé",
                empty: "Son vide",
            },

            cough: {

                buttons: {
                    bleep: "Bip",
                    cough: "Toux",
                }
            },
        },

        routing: {
            cellLabel: "{input} vers {output}",
            help: {
                title: "Où envoyer vos applications",
                obs: "OBS : capturez le périphérique « Broadcast Stream Mix », c'est ce qu'entend votre stream.",
                discord: "Discord : utilisez « Chat Mic » comme périphérique d'entrée et « Chat » comme périphérique de sortie.",
                apps: "Les jeux sur « Game », la musique sur « Music », le reste sur « System » : chacun a son fader et son routage.",
                hover: "Survolez le nom d'une ligne ou d'une colonne pour savoir à quoi elle correspond.",
                chatLoop: "Le chat vocal ne peut pas revenir vers le Chat Mic : vos interlocuteurs s'entendraient eux-mêmes.",
                inputs: {
                    Microphone: "Votre micro, après son traitement (gate, égaliseur, compresseur, effets).",
                    Chat: "Le périphérique audio « Chat » de l'ordinateur : choisissez-le comme sortie de Discord ou des autres applications de chat vocal.",
                    Music: "Le périphérique audio « Music » : choisissez-le comme sortie de votre lecteur de musique.",
                    Game: "Le périphérique audio « Game » : choisissez-le comme sortie de vos jeux.",
                    Console: "L'entrée console à l'arrière de la GoXLR.",
                    LineIn: "L'entrée ligne à l'arrière de la GoXLR.",
                    System: "Le périphérique audio « System » : la sortie par défaut de l'ordinateur (notifications, navigateur…).",
                    Samples: "Les sons joués par le sampler.",
                },
                outputs: {
                    Headphones: "Ce que vous entendez dans le casque.",
                    BroadcastMix: "Le périphérique « Broadcast Stream Mix » : ce qu'entend votre stream ou votre enregistrement (à capturer dans OBS).",
                    StreamMix2: "Un second mix de stream, par exemple pour une piste VOD sans musique.",
                    ChatMic: "Le périphérique « Chat Mic » : ce qu'entendent les personnes du chat vocal (à choisir comme entrée dans Discord).",
                    Sampler: "Ce qu'enregistre le sampler quand on maintient un pad vide.",
                    LineOut: "La sortie ligne à l'arrière de la GoXLR.",
                },
            },
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
                StreamMix2: "@:message.channels.StreamMix2",
                Headphones: "@:message.channels.Headphones",
                BroadcastMix: "@:message.channels.StreamMix",
                ChatMic: "@:message.channels.ChatMic",
                Sampler: "@:message.channels.Sampler",
                LineOut: "@:message.channels.LineOut",
                VOD: "@:message.channels.VOD",
            }
        },

        system: {
            // The System pages: intros, card titles, and the help under each setting
            pages: {
                settings: {
                    intro: "Comment l'utilitaire démarre, s'affiche et se met à jour. Ces réglages valent pour tous les appareils.",
                    startup: "Démarrage et affichage",
                    accessibility: "Accessibilité",
                    updates: "Mises à jour et diagnostic",
                    reset: "Réinitialisation",
                    autoStartHelp: "L'utilitaire se lance à l'ouverture de session.",
                    showOnLaunchHelp: "Sinon, l'utilitaire démarre discrètement dans la barre d'état.",
                    showTray: "Icône dans la barre d'état",
                    showTrayHelp: "Accès rapide aux profils, à la sourdine du micro et à l'interface.",
                    uiHandlerHelp: "L'application de bureau, ou le navigateur par défaut.",
                    ttsHelp: "Une voix lit l'action quand on appuie sur un bouton de la GoXLR.",
                    firmwareSourceHelp: "Stable pour tout le monde, Bêta pour essayer les nouveautés.",
                    logLevel: "Niveau des journaux",
                    logLevelHelp: "Plus détaillé aide à diagnostiquer un problème.",
                    openLogs: "Ouvrir les journaux",
                    downloadHelp: "Réglages, profils, profils micro, préréglages et icônes, dans un .zip.",
                    downloadButton: "Télécharger",
                    restoreHelp: "Les fichiers remplacés sont d'abord mis de côté ; les dossiers et l'accès réseau de cet ordinateur sont conservés.",
                    restoreButton: "Choisir un .zip…",
                    history: "Historique des profils",
                    historyHelp: "Chaque profil enregistré garde ses 20 dernières versions dans le dossier des sauvegardes.",
                    recoverHelp: "Remet ceux fournis avec l'utilitaire qui manquent. Vos fichiers ne sont pas modifiés.",
                    shutdownHelp: "La GoXLR garde son état actuel jusqu'au prochain démarrage."
                },
                device: {
                    intro: "Comment cette GoXLR réagit aux boutons et au sampler. Enregistré pour cet appareil ({serial}).",
                    mute: "Sourdine",
                    mic: "Micro",
                    sampler: "Sampler",
                    hold: "Maintien pour tout couper",
                    holdHelp: "Garder un bouton de sourdine appuyé aussi longtemps coupe le canal partout.",
                    voiceDeafen: "Couper le chat vocal coupe aussi le micro vers le chat",
                    voiceDeafenHelp: "Pour ne pas être entendu pendant qu'on n'écoute pas.",
                    lockFaders: "Bloquer les faders pendant une sourdine générale",
                    lockFadersHelp: "Les faders motorisés ne bougent plus tant que tout est coupé.",
                    monitorWithFx: "Retour micro avec les effets",
                    monitorWithFxHelp: "Le retour au casque fait entendre la voix avec les effets appliqués.",
                    preRecord: "Pré-enregistrement",
                    preRecordHelp: "Un enregistrement commence ce nombre de secondes avant l'appui. 0 pour désactiver.",
                    fade: "Durée du fondu",
                    fadeHelp: "Pour les modes de lecture avec fondu.",
                    resetOnClear: "Remettre le mode de lecture par défaut quand on vide un bouton",
                    resetOnClearHelp: "Sinon, le bouton garde son mode et son ordre de lecture.",
                    vodLabel: "Comportement de {channel}",
                    vodDescription: "Définit ce que transporte le canal {channel}",
                    vodRoutable: "Routable",
                    vodStreamNoMusic: "Stream Mix (sans musique)",
                },
                power: {
                    intro: "Ce que l'utilitaire fait tout seul quand il s'arrête, quand l'ordinateur se met en veille et quand il se réveille. La liste à droite ne s'active que si l'action est cochée."
                },
                firmware: {
                    intro: "Le logiciel interne de la GoXLR. Le canal (Stable ou Bêta) se choisit dans les paramètres de l'utilitaire.",
                    state: {
                        current: "Votre firmware est à jour",
                        outdated: "Une mise à jour est disponible",
                        newer: "Votre firmware est plus récent que la dernière version publiée",
                        unknown: "Pas d'information de mise à jour pour l'instant"
                    },
                    full: "GoXLR",
                    mini: "GoXLR Mini",
                    installed: "Installé",
                    latest: "Dernière version",
                    channel: "Canal",
                    hintUpdate: "Ne débranchez pas la GoXLR pendant la mise à jour.",
                    hintDowngrade: "Cette GoXLR a une version plus récente que la dernière publiée : l'installer revient à une version plus ancienne.",
                    hintReinstall: "Rien à installer. Vous pouvez réinstaller la même version si l'appareil se comporte mal."
                },
                integrations: {
                    allowNetwork: "Autoriser les autres appareils",
                    managedHere: "Se gère depuis l'ordinateur où tourne l'utilitaire : ouvrez cette page là-bas pour activer, désactiver ou changer le lien.",
                    allowNetworkHelp: "Une tablette, un téléphone ou un autre PC de votre réseau.",
                    api: "L'API"
                },
                about: {
                    intro: "Les versions à donner quand on demande de l'aide.",
                    device: "Appareil",
                    software: "Logiciel",
                    utility: "Utilitaire",
                    driver: "Pilote",
                    shareHint: "Ces informations en un clic, pour un rapport de bug ou une demande d'aide.",
                    copy: "Copier les versions"
                },
                licences: {
                    intro: "L'utilitaire et les éléments qu'il utilise, avec leur licence. Cliquez pour lire le texte complet."
                }
            },
            backup: {
                title: "Sauvegarde",
                withSamples: "Inclure les sons",
                download: "Télécharger une sauvegarde",
                restore: "Restaurer une sauvegarde",
                confirmTitle: "Restaurer cette sauvegarde ?",
                confirmMessage: "Les réglages, profils, profils micro, préréglages, icônes et sons de {name} seront restaurés. Les fichiers qui seraient remplacés sont d'abord copiés dans le dossier des sauvegardes ; les dossiers et l'accès réseau de cet ordinateur sont conservés.",
                restored: "Sauvegarde restaurée : {added} ajoutés, {replaced} remplacés, {unchanged} inchangés",
                openFolder: "Ouvrir le dossier des sauvegardes",
                history: "Chaque profil enregistré garde ses 20 dernières versions dans le dossier des sauvegardes (history).",
            },
            firmwareUpdateButton: {
                update: "Mettre à jour le firmware",
                downgrade: "Rétrograder le firmware",
                reinstall: "Réinstaller le firmware",
                custom: "Firmware personnalisé",
            },
            networkAccess: {
                restartNow: "Redémarrer l'utilitaire maintenant",
                restarting: "L'utilitaire redémarre, l'interface se reconnecte d'elle-même.",
                qr: "QR code",
                qrAlt: "QR code pour ouvrir {url}",
                title: "Accès depuis le réseau",
                explain: "Sur un autre appareil de votre réseau (tablette, téléphone, ordinateur), ouvrez une fois l'un de ces liens. L'accès est ensuite mémorisé.",
                restart: "Redémarrez GoXLR Utility pour y accéder depuis votre réseau. Les liens s'afficheront alors ici.",
                noAddress: "Aucune adresse réseau n'a été trouvée pour cet ordinateur.",
                copy: "Copier",
                copied: "Copié",
                regenerate: "Nouveau lien (les liens précédents ne marchent plus)",
                regenerateConfirm: "Cliquer encore : les liens actuels ne marcheront plus",
            },
            firmwareUpdate: {
                newVersionAvailable: "Une version plus récente du firmware ({latestVersion}) est disponible pour votre appareil.\nVoulez-vous mettre à jour l'appareil maintenant ?",
                currentVersionIsNewer: "Votre version actuelle du firmware ({currentVersion}) est plus récente que la dernière version disponible ({latestVersion}) pour votre appareil.\nVoulez-vous rétrograder vers la dernière version du firmware ?",
                currentIsUpToDate: "Votre firmware est déjà à jour.\nVoulez-vous réinstaller la version actuelle du firmware ?",
                customFirmware: "Vous êtes sur le point d'installer un firmware personnalisé.\nCe n'est pas recommandé, sauf si vous savez ce que vous faites.\nÊtes-vous sûr de vouloir continuer ?",
                warning: "Vous êtes sur le point de flasher une nouvelle version du firmware sur votre appareil.\nLes développeurs de l'utilitaire GoXLR ne sont pas responsables des dommages pouvant résulter de cette opération. ",
                warningInfo: "En savoir plus",
                betaWarning: "Vous êtes sur le point d'installer une version bêta du firmware.\nCette version ne bénéficie d'aucun support officiel et peut contenir des bugs ou des problèmes que nous ne pouvons pas corriger.",
                updatePaused: "Vous êtes sur le point d'installer la version {version} du firmware. Êtes-vous sûr de vouloir continuer ?",
                updateInProgress: "Mise à jour du firmware en cours. Veuillez patienter et ne débranchez pas votre appareil !",
                completed: "La mise à jour du firmware s'est terminée avec succès.",
                failed: "Un problème est survenu pendant la mise à jour du firmware. Veuillez réessayer.",
                changelog: "Notes de version {version} :",
                title: "Installation du firmware…",
                progress: {
                    starting: "Démarrage…",
                    manifest: "Récupération du manifeste…",
                    download: "Téléchargement du firmware…",
                    pause: "Mise à jour en pause",
                    clearNVR: "Préparation de la partition de mise à jour…",
                    uploadFirmware: "Envoi du firmware…",
                    validateUpload: "Vérification du firmware envoyé…",
                    hardwareWrite: "Écriture du firmware…",
                    hardwareValidate: "Vérification du firmware…",
                    complete: "Mise à jour terminée",
                    failed: "Échec de la mise à jour du firmware",
                },
                seeLogs: "Les journaux de l'utilitaire donnent le détail (Système, Paramètres de l'Utilitaire, Ouvrir les journaux).",
                noInfo: "Les serveurs de mise à jour n'ont pas répondu : la dernière version n'est pas connue. Cette GoXLR est en {currentVersion}.",
                updateTo: "Mettre à jour vers {version}",
                downgradeTo: "Revenir à {version}",
                confirmDowngrade: "{current} est installée : {version} est une version plus ancienne.",
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
                missing: "{name} (introuvable)",
                shutdownTitle: "À l'arrêt de l'utilitaire",
                shutdownDescription: "Ces actions seront exécutées lorsque l'utilitaire GoXLR sera arrêté en toute sécurité.",

                sleepTitle: "À la mise en veille",
                sleepDescription: "Ces actions seront exécutées lorsque votre système va entrer en mode veille.",

                wakeTitle: "Au réveil",
                wakeDescription: "Ces actions seront exécutées lorsque votre système se réveille de la mise en veille.",

                settingsError: "La configuration semble avoir été modifiée manuellement. Pour éviter tout dommage, l'interface utilisateur ici ne fonctionnera pas. Pour réinitialiser complètement les actions d'arrêt, appuyez sur le bouton ci-dessous.",
                settingsReset: "Réinitialiser ces actions",

                power_options: {
                    reload: "Recharger les réglages",
                    saveProfile: "Enregistrer le profil",
                    loadProfile: "Charger un profil",
                    loadColourProfile: "Charger les couleurs d'un profil",
                    saveMicProfile: "Enregistrer le profil micro",
                    loadMicProfile: "Charger un profil micro",
                }
            },

            deviceButton: "Paramètres de l'appareil",
            device: {
                samplerFadeDuration: "Durée du fondu du sampler",
                samplerFadeDurationAccessibility: "Durée en millisecondes du fondu de sortie du sampler à l'arrêt de la lecture",
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
                restartPill: "redémarrage",
                firmwareSource: "Canal de mise à jour du firmware",
                firmwareSources: {
                    live: "Stable",
                    beta: "Bêta",
                },
                shutdownConfirmTitle: "Êtes-vous sûr ?",
                shutdownConfirmMessage: "Êtes-vous sûr de vouloir arrêter l'utilitaire GoXLR ?",
                settingsRegionAccessibility: "paramètres",
                macosAggregateManagement: "Désactiver la gestion des périphériques agrégés MacOS (redémarrage requis)",
                macosAggregateManagementAccessibility: "Désactiver la gestion des périphériques agrégés par l'utilitaire sur MacOS (redémarrage requis)",
                recoverConfirmTitle: "Restaurer les fichiers par défaut ?",
                recoverConfirmMessage: "Les {type} par défaut qui manquent seront ajoutés. Les fichiers existants ne sont pas modifiés.",
                recoverConfirmOk: "Restaurer",
                recoverDone: "{type} par défaut restaurés",
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
                    profiles: "Profils",
                    micProfiles: "Profils microphone",
                    icons: "Icônes",
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
            unsaved: "Modifications non enregistrées",
            revert: "Revenir à la version enregistrée",
            saveBothHint: "Enregistrer le profil {profile} et le profil micro {mic} (Ctrl+S)",
            saveMore: "Autres options d'enregistrement",
            saveProfileOnly: "Enregistrer seulement le profil {profile}",
            saveMicOnly: "Enregistrer seulement le profil micro {mic}",
            savedBoth: "Profil {profile} et profil micro {mic} enregistrés",
            savedProfile: "Profil {profile} enregistré",
            savedMic: "Profil micro {mic} enregistré",
            loadTitle: "Charger {name} ?",
            loadQuestion: "Les réglages de {current} qui n'ont pas été enregistrés seront perdus.",
            loadMicQuestion: "Les réglages du profil micro {current} qui n'ont pas été enregistrés seront perdus.",
            load: "Charger",
            saveThenLoad: "Enregistrer, puis charger",
            createTitle: "Créer {name} ?",
            create: "Créer",
            saveThenCreate: "Enregistrer, puis créer",
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
            deleteForeverConfirm: "Cliquez encore pour supprimer",
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
            export: "Exporter",
            import: "Importer des fichiers de profil",
            imported: "Fichiers de profil importés : {count}",
            menuRename: "Renommer",
            menuDuplicate: "Dupliquer",
            nameLabel: "Nom",
            nameEmpty: "Saisissez un nom",
            nameInvalid: "Ce nom ne peut pas servir de nom de fichier (caractères / \\ : * ? \" < > {'|'}, nom réservé, ou point ou espace à la fin)",
            nameTaken: "{name} existe déjà",
            copyName: "{name} copie",
            renameTitle: "Renommer {name}",
            duplicateTitle: "Dupliquer {name}",
            renamed: "{name} renommé en {newName}",
            duplicated: "{name} dupliqué en {newName}",
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
            accessibilityDropMenuTitle: "{profileName} options",
            accessibilityOpenProfileDirectory: "Ouvrir le répertoire des profils",
            accessibilityOpenMicProfileDirectory: "Ouvrir le répertoire des profils de microphone",
        },
    }
}
