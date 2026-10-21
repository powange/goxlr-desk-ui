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
/// Tyfcho
///


export default {
    message: {
        scenes: {
            title: "Scènes",
            runHint: "Scène {name} toepassen (volumes, dempen, routing, effecten)",
            update: "{name} vervangen door de huidige instellingen",
            delete: "Scène {name} verwijderen",
            empty: "Sla de huidige volumes, demping, routing en effecten op om ze met één klik terug te halen.",
            new: "Nieuwe scène van de huidige instellingen…",
            newTitle: "Nieuwe scène",
            create: "Aanmaken",
            saved: "Scène {name} opgeslagen",
            ran: "Scène {name} toegepast",
            deleted: "Scène {name} verwijderd",
        },
        integrations: {
            title: "Integraties",
            intro: "Stream Deck, OBS, Touch Portal of je eigen scripts kunnen de GoXLR bedienen via de HTTP API van de Utility, dezelfde die deze interface gebruikt.",
            commandUrl: "Een commando sturen",
            statusUrl: "De volledige status lezen",
            websocketUrl: "Wijzigingen volgen (WebSocket)",
            format: "Een commando is een JSON-object waarvan het veld “Command” het serienummer van het apparaat en het commando bevat, zoals in de voorbeelden hieronder. De namen en argumenten zijn die van GoXLRCommand in de broncode van de Utility (ipc/src/lib.rs).",
            examples: "Voorbeelden voor dit apparaat",
            copyCurl: "curl kopiëren",
            copyJson: "JSON kopiëren",
            more: "Vanaf een andere computer moet netwerktoegang aan staan en moet de link het toegangstoken bevatten (zie Utility Instellingen).",
            exampleMicMute: "Microfoon dempen",
            exampleVolume: "Muziekvolume op de helft zetten",
            exampleProfile: "Profiel {name} laden",
            exampleScene: "Scène {name} toepassen",
            copyFailed: "Kopiëren naar het klembord is mislukt",
        },
        setupWizard: {
            menu: "Installatie-assistent",
            title: "Aan de slag ({step} van {count})",
            micTitle: "Je microfoon",
            micText: "Kies het type microfoon en verhoog dan de versterking tot je normale stem het midden van de meter bereikt, zonder in het rood te komen.",
            routingTitle: "Waar het geluid heen gaat",
            routingText: "De GoXLR voegt audioapparaten toe aan de computer. Stuur elke app naar een eigen apparaat om hem met de faders te regelen:",
            openRouting: "Routingtabel openen",
            saveTitle: "Deze instellingen bewaren",
            saveText: "Sla het profiel en het microfoonprofiel op: ze worden elke keer geladen als de GoXLR start.",
            saveButton: "Profiel en microfoonprofiel opslaan",
            skip: "Niet meer tonen",
            back: "Terug",
            next: "Volgende",
            finish: "Voltooien",
        },
        micMute: {
            mute: "Microfoon dempen",
            muted: "Microfoon gedempt",
            hint: "Dempt de microfoon zoals de Mute-knop van het apparaat (M)",
            holdMode: "De Mute-knop staat op vasthouden: hij dempt alleen zolang je hem op het apparaat ingedrukt houdt",
        },
        shortcuts: {
            undo: "Laatste wijziging ongedaan maken (volumes, dempen, routing, equalizer, kleuren)",
            undone: "Wijziging ongedaan gemaakt",
            title: "Sneltoetsen",
            save: "Profiel en microfoonprofiel opslaan",
            micMute: "Microfoon dempen of weer aanzetten",
            sections: "Naar een onderdeel van de zijbalk gaan",
            presets: "Effectpresets 1 tot 6",
            banks: "Samplerbanken A, B en C",
            help: "Deze sneltoetsen tonen",
        },
        common: {
            close: "Sluiten",
            lighting: "Verlichting",
            clear: "Wissen",
            collapseSection: "Sectie inklappen",
            expandSection: "Sectie uitklappen",
            activeProfile: "Actief profiel",
            switchDevice: "Wissel van apparaat",
            removeSample: "Sample verwijderen",
            waterfallAnimationUp: "Watervalanimatie omhoog",
            waterfallAnimationDown: "Watervalanimatie omlaag",
            unknown: "Onbekend",
            tabList: "Tabbladenlijst",
        },
        deviceSelector: {
            deviceLabel: "{model} · {serial}",
            helpCable: "Controleer of de GoXLR aan staat en de USB-kabel is aangesloten (probeer een andere USB-poort, liefst aan de achterkant van de computer).",
            helpLinux: "Op Linux moeten de udev-regels (50-goxlr.rules) in /etc/udev/rules.d geïnstalleerd zijn. Herlaad ze daarna (udevadm control --reload) en koppel de GoXLR los en weer aan.",
            helpWindows: "Op Windows moet de GoXLR-driver van TC-Helicon geïnstalleerd zijn. Herstart de computer na de installatie.",
            helpMacos: "Sluit de GoXLR op macOS direct aan in plaats van via een hub, en sta de Utility toe als het systeem daarom vraagt.",
            reconnecting: "Verbinding met GoXLR Utility verbroken, opnieuw verbinden…",
            title: "Selecteer apparaat",
            connecting: "Verbinding maken met de GoXLR Utility..",
            disconnected: "Kan geen verbinding maken met de GoXLR Utility, controleer of deze draait.\n\nDeze pagina probeert automatisch opnieuw te verbinden..",
            noDevices: "Geen GoXLR apparaten gevonden",
        },
        versionCheck: {
            updateAvailable: "Update beschikbaar",
            firmwareDirectionAvailable: "Firmware {direction} beschikbaar",
            firmwareDirections: {
                update: "Update",
                downgrade: "Downgrade",
                unknown: "ONBEKEND",
            },
            incompatibleDriver: "De geïnstalleerde stuurprogramma's zijn niet compatibel met deze firmware, klik hier om het nieuwste stuurprogramma te downloaden.",
        },
        theme: {
            label: "Kleurthema",
            dark: "Donker",
            light: "Licht",
            system: "Auto",
        },
        topBar: {
            unsaved: "Niet-opgeslagen wijzigingen",
            revert: "Terug naar de opgeslagen versie",
            saveBothHint: "Profiel {profile} en microfoonprofiel {mic} opslaan (Ctrl+S)",
            saveMore: "Meer opslagopties",
            saveProfileOnly: "Alleen profiel {profile} opslaan",
            saveMicOnly: "Alleen microfoonprofiel {mic} opslaan",
            savedBoth: "Profiel {profile} en microfoonprofiel {mic} opgeslagen",
            savedProfile: "Profiel {profile} opgeslagen",
            savedMic: "Microfoonprofiel {mic} opgeslagen",
            loadTitle: "{name} laden?",
            loadQuestion: "Niet opgeslagen instellingen van {current} gaan verloren.",
            loadMicQuestion: "Niet opgeslagen instellingen van het Mic profiel {current} gaan verloren.",
            load: "Laad",
            saveThenLoad: "Opslaan, dan laden",
            lighting: "Globale verlichting",
            lightingTitle: "Globale verlichting",
            profile: "Profiel",
            profileLabel: "Actief profiel",
            micProfile: "Mic",
            micProfileLabel: "Actief Mic profiel",
            save: "Opslaan",
            showDevice: "Toon de GoXLR",
            hideDevice: "Verberg de GoXLR",
        },
        sampleAssign: {
            title: "Toewijzen aan {bank} · {button}",
            bank: "Bank",
            empty: "Deze knop heeft nog geen samples.",
            current: "Deze knop heeft al {count} sample(s):",
            add: "Toevoegen",
            replace: "Vervangen",
            removing: "Huidige samples verwijderen…",
            adding: "{index} van {total} toevoegen: {name}…",
            done: "{count} sample(s) toegewezen aan {bank} · {button}",
            timeoutRemove: "De daemon deed er te lang over om de huidige samples te verwijderen",
            timeout: "{name}: de daemon deed er te lang over om deze sample toe te voegen",
        },
        sampleManager: {
            newFolder: "Nieuwe map",
            openFolder: "Open de Samples map",
            rename: "Naam wijzigen",
            renameFolder: "Mapnaam wijzigen",
            renameFolderLabel: "Naam van de map {name} wijzigen",
            renameSample: "Samplenaam wijzigen",
            moveTo: "Verplaatsen naar...",
            moveTitle: "{name} verplaatsen",
            moveDestination: "Doelmap",
            rootFolder: "(Samples map)",
            move: "Verplaatsen",
            namePlaceholder: "Naam",
            extensionKept: "De extensie {extension} blijft behouden.",
            invalidName: "Een naam mag geen / of \\ bevatten.",
            ok: "Ok",
            cancel: "Annuleren",
            edit: "Bewerken",
            listen: "Beluisteren",
            playPreview: "{name} afspelen",
            stopPreview: "{name} stoppen",
            delete: "Verwijderen",
            deleteFolderLabel: "Verwijder de map {name}",
            deleteSampleTitle: "Sample verwijderen",
            deleteSampleQuestion: "{name} naar de prullenbak verplaatsen?",
            deleteFolderTitle: "Map verwijderen",
            deleteFolderQuestion: "De map {name} en de {count} sample(s) die erin zitten naar de prullenbak verplaatsen?",
            deleteEmptyFolderQuestion: "De lege map {name} naar de prullenbak verplaatsen?",
            usedByProfiles: "Gebruikt door deze profielen:",
            usedByProfilesHint: "De sampler knoppen die hem gebruiken spelen dan niets meer af.",
            editTitle: "{name} bewerken",
            editHelp: "Sleep over de waveform om een deel te selecteren, en behoud het (bijsnijden) of verwijder het. Verwijderde delen worden rood weergegeven.",
            originalLength: "Lengte: {length}",
            resultLength: "Na bewerken: {length}",
            selectionRange: "Selectie: {start} - {end}",
            playSelection: "Selectie afspelen",
            playResult: "Resultaat afspelen",
            stop: "Stop",
            keepSelection: "Selectie behouden",
            removeSelection: "Selectie verwijderen",
            undo: "Ongedaan maken",
            saveAs: "Opslaan",
            replaceFile: "Het bestand vervangen",
            convertedToWav: "Het wordt opgeslagen als WAV bestand: {name}",
            saveCopy: "Opslaan als nieuw bestand",
            copyName: "Nieuwe bestandsnaam",
            copyHint: "Opgeslagen als WAV bestand in dezelfde map.",
            copySuffix: "(bewerkt)",
            save: "Opslaan",
            saving: "Opslaan...",
            nothingLeft: "Dan zou alle audio verwijderd worden.",
            breadcrumb: "Huidige map",
            rootName: "Samples",
            search: "Zoeken",
            selectedCount: "{count} geselecteerd",
            selectAll: "Alles selecteren",
            done: "Klaar",
            selectSample: "{name} selecteren",
            usedByActiveProfile: "Gebruikt door het huidige profiel",
            sizeKb: "{size} KB",
            sizeMb: "{size} MB",
            noResults: "Geen sample komt overeen met deze zoekopdracht.",
            emptyFolder: "Deze map is leeg.",
            dropHint: "Sleep audiobestanden hierheen om ze in deze map te importeren.",
            duplicate: "Dupliceren",
            import: "Samples importeren",
            importing: "Importeren...",
            multiSelect: "Meerdere selecteren",
            trash: "Prullenbak",
            trashCount: "Prullenbak ({count})",
            moveManyTitle: "{count} samples verplaatsen",
            deleteSamplesQuestion: "Deze {count} samples naar de prullenbak verplaatsen?",
            trashHint: "Het kan 30 dagen lang uit de prullenbak teruggezet worden.",
            moveToTrash: "Naar prullenbak",
            trashEmpty: "De prullenbak is leeg.",
            folderCount: "{count} sample(s)",
            restore: "Terugzetten",
            deleteForever: "Verwijderen",
            trashRetention: "Items worden na 30 dagen definitief verwijderd.",
            emptyTrash: "Prullenbak legen",
            emptyTrashConfirm: "Klik nogmaals om alles te verwijderen",
            close: "Sluiten",
            trimSilence: "Stilte wegknippen",
            normalize: "Volume normaliseren (hoogste piek op -1dB)",
            onlySilence: "Deze sample is stil.",
            noSilence: "Er is geen stilte om weg te knippen aan het begin of het einde.",
            errorTitle: "Deze actie kon niet worden voltooid",
        },
        // For these, the keys map directly to their GoXLR Channel Names
        channels: {
            StreamMix1: "Stream Mix 1",
            StreamMix2: "Stream Mix 2",
            All: "Alle",
            Mic: "Microfoon",
            Chat: "Gesprekken",
            Music: "Muziek",
            Game: "Game",
            Console: "Console",
            LineIn: "Lijn ingang",
            System: "Systeem",
            Sample: "Samples",
            LineOut: "Lijn uitgang",
            Headphones: "Koptelefoon",
            MicMonitor: "Mic Monitor",
            StreamMix: "Stream Mix",
            ChatMic: "Gesprek Mic",
            Sampler: "Sampler",
            VOD: "VOD",
        },

        faders: {
            A: "Kanaal 1",
            B: "Kanaal 2",
            C: "Kanaal 3",
            D: "Kanaal 4"
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
            continue: "Doorgaan",
            close: "Sluiten",
            ok: "Ok",
            yes: "Ja",
            no: "Nee",
            cancel: "Annuleren"
        },

        // These Strings appear in the tabs throughout the pages
        navigation: {
            library: "Bibliotheek",
            application: "Applicatie",
            // Tabs at the top of the Page
            profiles: "Profielen",
            samples: "Samples",

            // Main Navigation Tabs
            microphone: "Mic",
            mixer: "Mixer",
            effects: "Effecten",
            sampler: "Sampler",
            routing: "Routing",
            system: "Systeem",

            // Navigation Sections on the Lighting Page

            // Accessibility Messages (these are announced to screen readers)
            accessibilityDeviceSection: "Apparaatinstellingen",
        },

        // Strings that appear in the Mic tab, note that the Profile Strings are handled in 'profileManager'
        microphone: {
            chain: {
                title: "Verwerkingsketen",
                input: "Ingang",
                gate: "Gate",
                gateToggle: "Noise gate aan",
                threshold: "Drempelwaarde",
                equaliser: "Equaliser",
                bands: "{count} banden",
                flat: "Vlak",
                eqPeak: "{gain} dB op {freq}",
                compressor: "Compressor",
                compressorDetail: "Drempelwaarde {threshold} dB",
                curveHintFine: "sleep een punt omhoog of omlaag voor het niveau, opzij voor de frequentie",
                fineTune: "Frequenties aanpassen",
                bandLabel: "Band op {freq}",
                curveHint: "sleep een punt om de band in te stellen",
            },
            profiles: {
                title: "Mic Profielen"
            },

            setup: {
                phantomTitle: "Fantoomvoeding (+{voltage} V) inschakelen?",
                phantomWarning: "Alleen voor condensatormicrofoons die het nodig hebben. Zet eerst je koptelefoon en stream zachter: inschakelen kan een harde plop geven.",
                phantomEnable: "Inschakelen",
                button: "Mic Instellen",
                title: "Mic Instellen",
                type: "Mic Type",
                gain: "Versterking",

                // Microphone Types
                xlr: "XLR Microfoon",
                phantom: "XLR + Fantoom (+{voltage}V)",
                jack: "3.5mm",
            },

            waveform: {
                loud: "Te luid",
                good: "Goed",
                gate_estimated: "Gate is geschat"
            },

            gate: {
                title: "Gate",
                threshold: "Drempelwaarde",
                attenuation: "Attenuatie",
                attack: "Opkomend",
                release: "Neerkomend",
            },

            equaliser: {
                resetTitle: "Equalizer resetten?",
                resetQuestion: "Alle banden gaan terug naar 0 dB en hun standaardfrequentie. Met Voor / Na haal je de opgeslagen equalizer terug zolang je niet opslaat.",
                compare: "Vergelijk met de opgeslagen equaliser",
                before: "Voor",
                after: "Na",
                save: "Opslaan",
                saveHint: "Slaat de equaliser op in het Mic profiel {profile}",
                savedNotice: "Equaliser opgeslagen in het Mic profiel {profile}",
                title: "Equaliser",
                reset: "Reset",
            },

            compressor: {
                title: "Compressor",
                amount: "Hoeveelheid",
                threshold: "Drempelwaarde",
                ratio: "Ratio",
                attack: "Opkomend",
                release: "Neerkomend",
                makeUpGain: "Make-Up Gain",
            },

            extras: {
                title: "Extras",
                deEsser: "De-Esser",
                bleep: "Bleep",
            }
        },

        mixer: {
            otherInputs: "Andere ingangen",
            strip: {
                muteAllHint: "Rechtsklik of lang indrukken: voor iedereen dempen",
                notMuted: "Niet gedempt",
                mutedAll: "Voor iedereen gedempt",
                source: "Bron",
                mute: "Dempen",
                muteFunction: "Demp naar",
                lighting: "Verlichting {channel}",
                lightingTitle: "Verlichting · {channel}",
            },
            submixHint: "Een tweede mix (Mix B) voor elk kanaal, inclusief faders, om andere niveaus naar sommige uitgangen te sturen.",
            // Box Headers
            outputs: "Uitgangen",
            mixAssignment: "Mix Toewijzing",

            // Submix Checkbox
            submix: "Submixes",

            // Mix Assignment
            channelA: "A",
            channelB: "B"
        },

        // Strings in the Configuration Tab
        configuration: {
            // This is common between Faders and Cough Buttons
            mute_behaviour: {
                base: "Demp naar {channel}",
                all: "Demp naar @:message.channels.All",
            },
            muteBehaviourTitle: "Demping gedrag",
            muteBehaviourLabel: "Demping gedrag voor {channel}",

            // Config for the Faders
            faders: {
                sourceLabel: "Bron voor {channel}",
            },

            // Configuration for the Cough Button
            cough: {
                lighting: "Verlichting",
                lightingTitle: "Verlichting Hoest en Bleep",
                behaviour: {
                    hold: "Vasthouden",
                    toggle: "Schakelen",
                },

                title: "Hoest knop instellingen",
                behaviourTitle: "Knop gedrag",
            }
        },

        effects: {
            lighting: {
                title: "Verlichting effecten",
                presetButton: "Preset knop · {name}",
                applyPresets: "Toepassen op alle presets",
                encoders: "Encoders",
                applyEncoders: "Toepassen op alle encoders",
                buttons: "Effect knoppen",
                applyButtons: "Toepassen op alle effect knoppen",
            },
            face: {
                label: "Effecten",
                master: "Effecten",
                enabled: "Aan",
                on: "aan",
                off: "uit",
                power: "Zet {effect} aan of uit",
            },
            preset: {
                name: "Naam",
                title: "Preset",
                group: "Groep",

                menuLoad: "Laad",
                menuRename: "Naam wijzingen",
                menuSave: "Opslaan in bibliotheek",


                loadPreset: "Laad Preset",


                noPresets: "Op het moment zitten er geen presets in je bibliotheek, maak er een aan of kopieer er een. Ze zullen dan hier verschijnen",
                loadPresetOk: "@:message.modalButtons.ok",

                confirmTitle: "Bevestig het laden van de preset",
                confirmMessage: "Het laden van de preset slaat je huidige wijzingen niet op, wil je doorgaan?",
                confirmOk: "@:message.modalButtons.ok",
                confirmCancel: "@:message.modalButtons.cancel",

                overwriteTitle: "Bevestig Preset overschrijving",
                overwriteMessage: "De preset {current} bestaat al in je bibliotheek, wil je deze overschrijven?",
                overwriteConfirm: "Overschrijven",
                overwriteCancel: "@:message.modalButtons.cancel",

                accessibilityOpenPresetDirectory: "Open Presets bibliotheek",
                accessibilityPresetLoaded: "Preset {name} geladen op {bank}",
                accessibilityPresetSaved: "Preset {name} opgeslagen in bibliotheek",
            },
            reverb: {
                title: "Galm",
                style: "Stijl",

                styles: {
                    library: "Bibliotheek",
                    darkBloom: "Donkere bloei",
                    musicClub: "Discotheek",
                    realPlate: "Plaatwerk",
                    chapel: "Kapel",
                    hockeyArena: "Sporthal"
                },

                amount: "Hoeveelheid",
                decay: "Verval",
                earlyLevel: "Vroeg niveau",
                tailLevel: "Opvolgend niveau",
                preDelay: "Voorvertraging",
                lowColour: "Lage Kleur",
                highColour: "Hoge Kleur",
                highFactor: "Hoge Factor",
                diffuse: "Diffuus",
                modSpeed: "Modulatie Snelheid",
                modDepth: "Modulatie Diepte"
            },

            echo: {
                title: "Echo",

                style: "Stijl",
                styles: {
                    quarter: "Kwart",
                    eighth: "Achtste",
                    triplet: "Driedubbel",
                    pingPong: "Ping Pong",
                    classicSlap: "Klassiek",
                    multiTap: "MultiTap"
                },

                amount: "Hoeveelheid",
                feedback: "Feedback",
                tempo: "Tempo",
                delayLeft: "Vertraging L",
                delayRight: "Vertraging R",
                feedbackLeft: "Feedback L",
                feedbackRight: "Feedback R",
                xfbLeftToRight: "XFB L to R",
                xfbRightToLeft: "XFB R to L",
            },

            pitch: {
                title: "Toonhoogte",

                style: "Stijl",
                styles: {
                    narrow: "Strak",
                    wide: "Los"
                },

                amount: "Hoeveelheid",
                character: "Karakter"
            },

            gender: {
                title: "Geslacht",

                style: "Stijl",
                styles: {
                    narrow: "Strak",
                    medium: "Medium",
                    wide: "Los"
                },

                amount: "Hoeveelheid"
            },

            megaphone: {
                title: "Megafoon",

                style: "Stijl",
                styles: {
                    megaphone: "Megafoon",
                    radio: "Radio",
                    onThePhone: "Telefoongesprek",
                    overdrive: "Opgevoerd",
                    buzzCutt: "Buzz Cutt",
                    tweed: "Tweed"
                },

                amount: "Hoeveelheid",
                postGain: "Post versterking"
            },

            robot: {
                title: "Robot",

                style: "Stijl",
                styles: {
                    robot1: "Robot 1",
                    robot2: "Robot 2",
                    robot3: "Robot 3",
                },

                lowGain: "Lage Versterking",
                lowFrequency: "Lage Frequentie",
                lowWidth: "Lage Breedte",
                midGain: "Mid Versterking",
                midFrequency: "Mid Frequentie",
                midWidth: "Mid Breedte",
                highGain: "Hoge Versterking",
                highFrequency: "Hoge Frequentie",
                highWidth: "Hoge Breedte",
                waveform: "Waveform",
                pulseWidth: "Puls Breedte",
                threshold: "Drempelwaarde",
                dryMix: "Droge Mix",
            },

            hardTune: {
                title: "Hard Tune",

                style: "Stijl",
                styles: {
                    natural: "Natuurlijk",
                    medium: "Medium",
                    hard: "Hard"
                },

                amount: "Hoeveelheid",
                rate: "Waarde",
                window: "Window",

                source: "Bron"
            }
        },

        sampler: {
            lighting: {
                label: "Verlichting",
                title: "Verlichting sampler",
                bank: "Knoppen bank {bank}",
                note: "Het apparaat stelt deze kleuren in voor de hele bank, alle vier de knoppen delen ze.",
                applyBanks: "Toepassen op alle banken",
            },
            pads: {
                record: "Opnemen in {button}",
                stopRecording: "Opname van {button} stoppen",
                play: "{button} afspelen",
                stop: "{button} stoppen",
                title: "Knoppen",
                empty: "Leeg",
                count: "{count} sample(s)",
                dropHere: "Loslaten om toe te wijzen",
            },
            banks: {
                bankTitle: "Bank",
                bank: {
                    a: "A",
                    b: "B",
                    c: "C"
                },
                buttonLabel: "Knop voor bank {activeBank}",
                buttons: {
                    topLeft: "Linksboven",
                    topRight: "Rechtsboven",
                    bottomLeft: "Linksonder",
                    bottomRight: "Rechtsonder",
                },

                functionTitle: "Functie",
                functionLabel: "Functie voor knop {activeButton} in bank {activeBank}",
                functions: {
                    playNext: "Afspelen / Volgende",
                    playStop: "Afspelen / Stop",
                    playFade: "Afspelen / Uitlopen",
                    stopOnRelease: "Stop bij loslaten",
                    fadeOnRelease: "Overloop bij loslaten",
                    loop: "Loop"
                },

                playOrderTitle: "Speelvolgorde",
                playOrderLabel: "Speelvolgorde voor knop {activeButton} in bank {activeBank}",
                playOrders: {
                    sequential: "Sequentieel",
                    random: "Willekeurig",
                },
            },

            samplesTitle: "Samples",
            samples: {
                genericError: "Er is een onbekende fout opgetreden.",
                samplesTitle: "Samples",
                samplesLabel: "Sample voor knop {activeButton} in bank {activeBank}",

                // Button at the bottom of the Sample List
                addSample: "+",
                addSampleLabel: "Voeg Sample toe",
                sampleSelector: {
                    parentDirectory: "Beginfolder",
                    addButton: "Toevoegen",

                    noSamples: "Momenteel heb je geen samples, maak samples of importeer ze en ze zullen hier verschijnen.",

                    // Used with Screen Readers
                    directories: "Mappen",
                    samples: "Samples",
                },

                gain: "Gain",
                waveform: {
                    title: "Waveform",

                    // These are primarily for accessibility, but are labels on the various buttons.
                    text: "Waveform voor {sample}",

                    // The Play / Stop button before the waveform
                    playbackSample: "Sample afspelen",
                    stopSample: "Stop Sample",

                    // Labels for the draggable 'Handles'
                    sampleStart: "Sample Start",
                    sampleEnd: "Sample Einde",

                    sampleDeleted: "Sample {sampleName} is verwijderd van knop {activeButton} in bank {activeBank}",
                    zoomLevel: "Zoom Niveau: {level}",
                },

                addSampleWaitTitle: "Wacht",
                addSampleAnalysing: "Wacht tot de sample geanalyseerd is.",
                addSampleProgress: "Progressie: {progress}@:message.suffixes.percentage",

                errorTitle: "Fout bij het toevoegen van de sample",
                errorText: "Fout bij het toevoegen van de sample:",

                accessibilityOpenSamplesDirectory: "Open Samples map",
                accessibilityAnalysing: "Sample aan het analyseren, dit kan een paar minuten duren.",
                accessibilityAdded: "Sample {name} toegevoegd aan knop {activeButton} in bank {activeBank}."
            }
        },

        lighting: {
            channel: {
                applyFaders: "Toepassen op alle faders",
                applyMutes: "Toepassen op alle dempknoppen",
                openIcons: "Open de iconen map",
                display: "Weergave",
                preview: "Voorbeeld",
                previewFader: "fader",
                previewMeter: "meter",
                hintTwoColour: "Onder de fader: onderste kleur. Erboven: bovenste kleur.",
                hintGradient: "Onder de fader: een overloop van de onderste naar de bovenste kleur. Erboven: uit.",
                hintMeter: "De LEDs volgen het geluidsniveau van het kanaal in plaats van de faderpositie.",
                hintGradientMeter: "De LEDs volgen het geluidsniveau van het kanaal, met een overloop van de onderste naar de bovenste kleur.",
                previewScreen: "scherm",
                previewActive: "actief",
                previewMute: "MUTE",
                previewRest: "in rust",
            },
            // These are some common strings that are used in multiple places
            common: {
                pickColour: "kies een kleur",
                restLabel: "In rust",
                restColour: "Rustkleur",
                restDimmedHint: "De knop toont zijn actieve kleur, gedimd: er is geen kleur te kiezen.",
                brightness: "Helderheid",

                activeColour: "Actief",

                inactiveOption: "Inactieve Optie",
                inactiveOptions: {
                    dimActiveColour: "Dim actieve kleur",
                    inactiveColour: "Inactieve kleur",
                    dimInactiveColour: "Dim inactieve kleur"

                },

            },

            global: {
                areas: {
                    title: "Gebieden",

                    area: "Gebied",
                    areas: {
                        global: "Globaal",
                        accent: "Accent",
                    },

                },

                animations: {
                    title: "Animaties",

                    mode: "Animatie Modus",
                    modes: {
                        none: "Geen",
                        rainbowRetro: "Regenboog Retro",
                        rainbowBright: "Regenboog Helder",
                        rainbowDark: "Regenboog Donker",
                        simple: "Simpel",
                        ripple: "Golvend",
                    },

                    mod1: "Overloop Modulatie 1",
                    mod2: "Overloop Modulatie 2",

                    waterfall: "Waterval instellingen",
                    waterfallOff: "Uit",
                }
            },

            mixer: {

                fader: {
                    title: "Fader",

                    style: "Stijl",
                    styles: {
                        gradient: "Overloop",
                        meter: "Meting",
                    },

                    bottomColour: "Onderste kleur",
                    topColour: "Bovenste kleur",

                },

                screen: {
                    title: "Scherm",
                    backgroundColour: "Achtergrondkleur",
                    icons: "Iconen",
                    iconNone: "-- GEEN --",

                    options: {
                        showNumber: "Toon nummer",
                        invertDisplay: "Scherm omkeren",
                        text: "Tekst",

                        accessibilityText: "De tekst wat op je GoXLR Scherm komt te staan"
                    }
                },

                mute: {
                    // Pretty much all other fields for this area come from 'Common'
                    title: "Dempen",
                }
            },

            effects: {

                encoders: {
                    title: "Encoders",

                    encoder: "Encoder",
                    encoders: {
                        reverb: "Reverb",
                        echo: "Echo",
                        pitch: "Toonhoogte",
                        gender: "Geslacht",
                    },

                    leftColour: "Linker kleur",
                    rightColour: "Rechter kleur",
                    knobColour: "Draaiknop kleur"
                },

                buttons: {
                    title: "Effect knoppen",

                    effect: {
                        megaphone: "Megafoon",
                        robot: "Robot",
                        hardTune: "Hardtune",
                        fx: "Fx"
                    }
                },
            },
            sampler: {

                buttons: {
                    a: "A",
                    b: "B",
                    c: "C"
                },

                active: "Actief / Ingeladen",
                empty: "Leeg",
            },

            cough: {

                buttons: {
                    bleep: "Bleep",
                    cough: "Hoest",
                }
            },
        },

        routing: {
            cellLabel: "{input} naar {output}",
            help: {
                title: "Waar je apps naartoe sturen",
                obs: "OBS: neem het apparaat “Broadcast Stream Mix” op, dat is wat je stream hoort.",
                discord: "Discord: gebruik “Chat Mic” als invoerapparaat en “Chat” als uitvoerapparaat.",
                apps: "Games op “Game”, muziek op “Music”, al het andere op “System”: elk krijgt een eigen fader en routing.",
                hover: "Beweeg over de naam van een rij of kolom om te zien wat het is.",
                chatLoop: "Voicechat kan niet terug naar de Chat Mic, anders horen de mensen met wie je praat zichzelf.",
                inputs: {
                    Microphone: "Je microfoon, na de bewerking (gate, equalizer, compressor, effecten).",
                    Chat: "Het audioapparaat “Chat” van de computer: stel het in als uitvoer van Discord of andere voicechat-apps.",
                    Music: "Het audioapparaat “Music”: stel het in als uitvoer van je muziekspeler.",
                    Game: "Het audioapparaat “Game”: stel het in als uitvoer van je games.",
                    Console: "De console-ingang aan de achterkant van de GoXLR.",
                    LineIn: "De lijningang aan de achterkant van de GoXLR.",
                    System: "Het audioapparaat “System”: de standaarduitvoer van de computer (meldingen, browser…).",
                    Samples: "De geluiden die de sampler afspeelt.",
                },
                outputs: {
                    Headphones: "Wat je in je koptelefoon hoort.",
                    BroadcastMix: "Het apparaat “Broadcast Stream Mix”: wat je stream of opname hoort (neem het op in OBS).",
                    StreamMix2: "Een tweede stream mix, bijvoorbeeld voor een VOD-spoor zonder muziek.",
                    ChatMic: "Het apparaat “Chat Mic”: wat de mensen in de voicechat horen (stel het in als invoer van Discord).",
                    Sampler: "Wat de sampler opneemt als je een lege knop ingedrukt houdt.",
                    LineOut: "De lijnuitgang aan de achterkant van de GoXLR.",
                },
            },
            // There are (frustratingly) some minor differences between how channels appear in the routing table,
            // and how they appear in the Mixer, these changes also fall under the hood at the Utility level, so
            // we'll define all the channels here, and 'fix' anything which needs adjustment.
            title: "Routing",

            input: "Ingangen",
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

            output: "Uitgangen",
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
            backup: {
                title: "Back-up",
                withSamples: "Samples meenemen",
                download: "Back-up downloaden",
                restore: "Back-up terugzetten",
                confirmTitle: "Deze back-up terugzetten?",
                confirmMessage: "Profielen, microfoonprofielen, presets, iconen en samples uit {name} worden toegevoegd. Bestanden die vervangen zouden worden, worden eerst naar de back-upmap gekopieerd.",
                restored: "Back-up teruggezet: {added} toegevoegd, {replaced} vervangen, {unchanged} ongewijzigd",
            },
            networkAccess: {
                restartNow: "Herstart de Utility nu",
                restarting: "De Utility herstart, de interface maakt vanzelf opnieuw verbinding.",
                qr: "QR-code",
                qrAlt: "QR-code om {url} te openen",
                title: "Netwerktoegang",
                explain: "Open op een ander apparaat in je netwerk (tablet, telefoon, computer) eenmalig een van deze links. Daarna wordt de toegang onthouden.",
                restart: "Herstart de GoXLR Utility om hem vanaf je netwerk te bereiken. De links verschijnen dan hier.",
                noAddress: "Er is geen netwerkadres gevonden voor deze computer.",
                copy: "Kopiëren",
                copied: "Gekopieerd",
                regenerate: "Nieuwe link (de vorige links werken niet meer)",
            },
            menu: {
                firmware: "Firmware-update",
            },
            firmwareUpdate: {
                seeLogs: "De logbestanden van het hulpprogramma bevatten de details (Systeem, Instellingen hulpprogramma, Logs openen).",
                noInfo: "De updateservers gaven geen antwoord, dus de nieuwste versie is onbekend. Deze GoXLR draait {currentVersion}.",
                updateTo: "Updaten naar {version}",
                reinstall: "{version} opnieuw installeren",
                customButton: "Aangepaste firmware…",
                confirmTitle: "Firmware flashen?",
                confirmText: "De GoXLR herstart tijdens de update. Koppel hem niet los en sluit de Utility niet tot het klaar is.",
                confirmCustom: "Je kiest hierna een firmwarebestand (.bin). Gebruik alleen een bestand dat je vertrouwt: een verkeerd bestand kan de GoXLR onbruikbaar maken. Koppel hem niet los tijdens de update.",
                betaWarning: "Je staat op het punt een bèta firmwareversie te installeren.\nDeze versie krijgt geen officiële ondersteuning en kan bugs of problemen bevatten die we niet kunnen oplossen.",
                newVersionAvailable: "Er is een nieuwere firmwareversie ({latestVersion}) beschikbaar voor je apparaat.\nWil je het apparaat nu updaten?",
                currentVersionIsNewer: "Je huidige firmwareversie ({currentVersion}) is nieuwer dan de nieuwste beschikbare firmwareversie ({latestVersion}) voor je apparaat.\nWil je downgraden naar de nieuwste firmwareversie?",
                currentIsUpToDate: "Je firmware is al up-to-date.\nWil je de huidige firmwareversie opnieuw installeren?",
                customFirmware: "Je staat op het punt een aangepaste firmware te installeren.\nDit wordt afgeraden, tenzij je weet wat je doet.\nWeet je zeker dat je wilt doorgaan?",
                warning: "Je staat op het punt een nieuwe firmwareversie naar je apparaat te flashen.\nDe ontwikkelaars van de GoXLR Utility zijn niet verantwoordelijk voor eventuele schade die door dit proces kan ontstaan. ",
                warningInfo: "Meer info",
                updatePaused: "Je staat op het punt firmwareversie {version} te installeren. Weet je zeker dat je wilt doorgaan?",
                updateInProgress: "Firmware-update bezig. Even geduld en koppel je apparaat niet los!",
                completed: "De firmware-update is succesvol voltooid.",
                failed: "Er is iets misgegaan tijdens de firmware-update. Probeer het opnieuw.",
                changelog: "Wijzigingen in versie {version}:",
                title: "Firmware installeren...",
                progress: {
                    starting: "Starten...",
                    manifest: "Manifest ophalen...",
                    download: "Firmware downloaden...",
                    pause: "Update gepauzeerd",
                    clearNVR: "Updatepartitie voorbereiden...",
                    uploadFirmware: "Firmware uploaden...",
                    validateUpload: "Geüploade firmware valideren...",
                    hardwareWrite: "Firmware schrijven...",
                    hardwareValidate: "Firmware valideren...",
                    complete: "Update voltooid",
                    failed: "Firmware-update kon niet worden voltooid",
                },
            },
            firmwareUpdateButton: {
                update: "Firmware updaten",
                downgrade: "Firmware downgraden",
                reinstall: "Firmware herinstalleren",
                custom: "Aangepaste firmware",
            },
            title: "System",

            powerButton: "Stroom acties",
            power: {
                shutdownTitle: "Afsluit acties",
                shutdownDescription: "Deze acties worden uitgevoerd wanneer de GoXLR wordt uitgeschakeld",

                sleepTitle: "Slaap acties",
                sleepDescription: "Deze acties worden uitgevoerd wanneer de GoXLR in slaapstand wordt gezet.",

                wakeTitle: "Wakker acties",
                wakeDescription: "Deze acties worden uitgevoerd wanneer de GoXLR wakker wordt gemaakt.",

                settingsError: "Het lijkt erop dat de configuratie met de hand is aangepast, om ervoor te zorgen dat er geen schade wordt toegebracht, zal de UI niet meer werken. Om de acties volledig te resetten, druk je op de resetknop hieronder.",
                settingsReset: "Reset Afsluit acties",

                power_options: {
                    reload: "Herlaad instellingen",
                    saveProfile: "Profiel opslaan",
                    loadProfile: "Laad volledig profiel",
                    loadColourProfile: "Laad kleurenprofiel",
                    saveMicProfile: "Sla Mic profiel op",
                    loadMicProfile: "Laad Mic profiel",
                }
            },

            deviceButton: "Apparaatinstelligen",
            device: {
                samplerFadeDuration: "Sampler uitloopduur",
                samplerFadeDurationAccessibility: "De duur in milliseconden waarin de sampler uitloopt wanneer het afspelen wordt gestopt",
                holdDuration: "Dempknop ingedrukt houden om alles te dempen",
                holdDurationAccessibility: "De duur hoelang de dempknop ingedrukt moet blijven om alles te dempen.",

                sampleBuffer: "Sampler Pre-Opname Buffer (in seconden)",
                sampleBufferAccessibility: "De duur van de buffer voordat de sampler gaat opnemen.",

                voiceDeafen: "Gesprekskanaal dempt ook gespreksmicrofoon",
                voiceDeafenAccessibility: "Wanneer je alle kanalen dempt, wordt ook de microfoon gedempt.",

                monitorWithFx: "Schakel Mic Monitoring in wanneer FX wordt ingedrukt",
                monitorWithFxAccessibility: "Schakelt Mic Monitoring in wanneer de FX knop wordt ingedrukt.",

                resetSampleFunctionOnClear: "Reset sample functie wanneer leeg",
                resetSampleFunctionOnClearAccessibility: "Resets de sample functie naar start / volgende wanneer leeg",

                lockFaders: "Blokkeer fader posities bij dempen",
                lockFadersAccessibility: "Zorgt ervoor dat de faders niet meer bewegen terwijl het kanaal gedempt is",
            },

            settingsButton: "Utility Instellingen",
            settings: {
                recoverConfirmTitle: "Standaardbestanden herstellen?",
                recoverConfirmMessage: "Ontbrekende standaard-{type} worden opnieuw toegevoegd. Bestaande bestanden blijven ongewijzigd.",
                recoverConfirmOk: "Herstellen",
                recoverDone: "Standaard-{type} hersteld",
                shutdownConfirmTitle: "Weet je het zeker?",
                shutdownConfirmMessage: "Weet je zeker dat je de GoXLR Utility wilt uitschakelen?",
                settingsRegionAccessibility: "instellingen",
                macosAggregateManagement: "Schakel MacOS Aggregate beheer uit (vereist een herstart)",
                macosAggregateManagementAccessibility: "Aggregate beheer door de Utility op MacOS uitgeschakeld (vereist een herstart)",
                firmwareSource: "Firmware updatekanaal",
                firmwareSources: {
                    live: "Live",
                    beta: "Bèta",
                },
                language: "Taal",
                useSystem: "Gebruik systeemtaal (indien beschikbaar)",

                uiHandler: "UI Regelaar",
                uiHandlers: {
                    browser: "Browser",
                    app: "App",
                    custom: "Custom"
                },


                logLevel: "Log Level (vereist restart)",
                logLevels: {
                    off: "Uit",
                    error: "Foutmeldingen",
                    warn: "Waarschuwingen",
                    info: "Info",
                    debug: "Debug",
                    trace: "Trace"

                    // OFF / ERROR / WARN / INFO / DEBUG / TRACE
                },

                allowNetworkAccess: "Sta netwerkbesturing toe (Vereist een herstart)",
                allowNetworkAccessAccessibility: "Geef toestemming dat dit programma door andere apparaten in het netwerk geopend kan worden",

                autoStart: "Start automatisch bij inloggen",
                autoStartAccessibility: "Start de GoXLR Utility wanneer de gebruiker inlogt",

                showOnLaunch: "Toon UI bij opstarten",
                showOnLaunchAccessibility: "Laat de UI automatisch zien bij opstarten",

                showTray: "Toon taakbalk icoon (Vereist een herstart)",
                showTrayAccessibility: "Toon de Utility in je taakbalk (bij het pijltje omhoog)",

                ttsOnButton: "Dicteer knopfunctie bij indrukken",
                ttsOnButtonAccessibility: "Wanneer een knop ingedrukt wordt, wordt de functie gedicteerd",

                recoverDefaults: "Haal standaard waardes op",
                recoverOptions: {
                    profiles: "Profielen",
                    micProfiles: "Mic Profielen",
                    icons: "Iconen",
                    presets: "Presets"
                },

                shutdownUtility: "Schakel GoXLR Utility uit"
            },

            aboutButton: "Over GoXLR",
            about: {
                serial: "Serienummer",
                utilityVersion: "Utility Versie",
                driverVersion: "Stuurprogramma Versie",
                hardwareVersion: "Hardware Versie",

                firmware: "Firmware",
                dice: "DICE", // Would be nice if there was some kind of explaination to this part, since not everyone knows it stands for describe, investigage, create and evaluate
                fpga: "FPGA" // Same for this one, it's field programmable gate arrays right?
            },

            licenses: "Licenties",
            help: "Ondersteuning",
        },

        // Strings used in Profile and Microphone Profile Management.
        profileManager: {
            export: "Exporteren",
            import: "Profielbestanden importeren",
            imported: "Profielbestanden geïmporteerd: {count}",
            menuRename: "Hernoemen",
            menuDuplicate: "Dupliceren",
            nameLabel: "Naam",
            nameEmpty: "Voer een naam in",
            nameInvalid: "Deze naam kan niet als bestandsnaam worden gebruikt (tekens / \\ : * ? \" < > {'|'}, een gereserveerde naam, of een punt of spatie aan het eind)",
            nameTaken: "{name} bestaat al",
            copyName: "{name} kopie",
            renameTitle: "{name} hernoemen",
            duplicateTitle: "{name} dupliceren",
            renamed: "{name} hernoemd naar {newName}",
            duplicated: "{name} gedupliceerd als {newName}",
            trashTitle: "Verwijderde profielen",
            trashEmpty: "Geen verwijderde profielen. Verwijderde profielen worden hier 30 dagen bewaard.",
            trashProfile: "Profiel",
            trashMic: "Mic profiel",
            // Accessibility Titles for the buttons at the bottom of the Profile List
            saveProfileName: "Profiel {profileName} opslaan",
            createProfile: "Maak profiel aan",

            // Dialog Popup when clicking 'Create Profile' Button
            newTitle: "Nieuwe profielbron",
            newQuestion: "Wil je de standaardconfiguratie als sjabloom gebruiken of je huidige profiel?",
            newDefaultButton: "Standaard",
            newCurrentButton: "Huidig",
            newCancelButton: "@:message.modalButtons.cancel",

            // Dialog Popup when hitting the 'Save Profile' button
            overwriteTitle: "Overschrijven bevestigen",
            overwriteQuestion: "Weet je zeker dat je {activeProfile} wilt overschrijven?",
            overwriteYes: "@:message.modalButtons.yes",
            overwriteNo: "@:message.modalButtons.no",

            // Dialog Popup when clicking the 'Delete' Menu Item
            deleteTitle: "Bevestig verwijderen",
            deleteQuestion: "Weet je zeker dat je {profileName} wilt verwijderen?",
            deleteYes: "@:message.modalButtons.yes",
            deleteNo: "@:message.modalButtons.no",

            // Dialog prompting for a new Profile Name
            newNameTitle: "Voer profielnaam in",
            newNamePlaceHolder: "Nieuwe Naam",
            newNameOk: "@:message.modalButtons.ok",
            newNameCancel: "@:message.modalButtons.cancel",

            // Dialog Popup when attempting to delete the active profile
            deleteCurrentErrorTitle: "Verwijderen niet mogelijk",
            deleteCurrentErrorMessage: "Het is niet mogelijk om je huidige profiel te verwijderen.",

            // Items in the Popup Menu on Profiles
            menuLoadProfile: "Laad profiel",
            menuLoadProfileColours: "Laad enkel de kleuren",
            menuDeleteProfile: "Verwijder",


            // Accessibility Messages (these are announced to screen readers)
            accessibilityLoadedProfile: "Profiel {profileName} ingeladen",
            accessibilityLoadedColours: "Profiel {profileName} kleuren ingeladen",
            accessibilityCreatedProfile: "Profiel {profileName} aangemaakt",
            accessibilitySavedProfile: "Profiel {profileName} opgeslagen",
            accessibilitySavedProfileAs: "Profiel {profileName} opgeslagen als {newProfileName}",
            accessibilityProfileDeleted: "Profiel {profileName} verwijderd",
            accessibilityDropMenuTitle: "{profileName} opties",
            accessibilityOpenProfileDirectory: "Open profielen map",
            accessibilityOpenMicProfileDirectory: "Open microfoonprofielen map",
        },
    }
}
