///
/// Authors:
/// jonilala796
/// Kariko
///

export default {
    message: {
        common: {
            close: "Schließen",
            lighting: "Beleuchtung",
            clear: "Leeren",
            collapseSection: "Abschnitt einklappen",
            expandSection: "Abschnitt ausklappen",
            activeProfile: "Aktives Profil",
            switchDevice: "Gerät wechseln",
            removeSample: "Sample entfernen",
            waterfallAnimationUp: "Wasserfall-Animation aufwärts",
            waterfallAnimationDown: "Wasserfall-Animation abwärts",
            unknown: "Unbekannt",
            tabList: "Tab-Liste",
        },
        deviceSelector: {
            title: "Gerät auswählen",
            connecting: "Verbindung zum GoXLR Utility wird hergestellt..",
            disconnected: "Verbindung zum GoXLR Utility nicht möglich, bitte prüfe, ob es läuft.\n\nDiese Seite versucht automatisch, die Verbindung wiederherzustellen..",
            noDevices: "Keine GoXLR-Geräte gefunden",
        },
        versionCheck: {
            updateAvailable: "Update verfügbar",
            firmwareDirectionAvailable: "Firmware-{direction} verfügbar",
            firmwareDirections: {
                update: "Update",
                downgrade: "Downgrade",
                unknown: "UNBEKANNT",
            },
            incompatibleDriver: "Die installierten Treiber sind mit dieser Firmware nicht kompatibel, klicke hier, um den neuesten Treiber herunterzuladen.",
        },
        theme: {
            label: "Farbschema",
            dark: "Dunkel",
            light: "Hell",
            system: "Auto",
        },
        topBar: {
            loadTitle: "{name} laden?",
            loadQuestion: "Nicht gespeicherte Einstellungen von {current} gehen verloren.",
            loadMicQuestion: "Nicht gespeicherte Einstellungen des Mikrofonprofils {current} gehen verloren.",
            load: "Laden",
            saveThenLoad: "Speichern, dann laden",
            lighting: "Globale Beleuchtung",
            lightingTitle: "Globale Beleuchtung",
            profile: "Profil",
            profileLabel: "Aktives Profil",
            micProfile: "Mikrofon",
            micProfileLabel: "Aktives Mikrofonprofil",
            save: "Speichern",
            showDevice: "GoXLR anzeigen",
            hideDevice: "GoXLR ausblenden",
        },
        sampleAssign: {
            title: "Zuweisen zu {bank} · {button}",
            bank: "Bank",
            empty: "Diese Taste hat noch keine Samples.",
            current: "Diese Taste hat bereits {count} Sample(s):",
            add: "Hinzufügen",
            replace: "Ersetzen",
            removing: "Aktuelle Samples werden entfernt…",
            adding: "Füge {index} von {total} hinzu: {name}…",
            done: "{count} Sample(s) zu {bank} · {button} zugewiesen",
            timeoutRemove: "Der Daemon hat zu lange gebraucht, um die aktuellen Samples zu entfernen",
            timeout: "{name}: Der Daemon hat zu lange gebraucht, um dieses Sample hinzuzufügen",
        },
        sampleManager: {
            newFolder: "Neuer Ordner",
            openFolder: "Samples-Ordner öffnen",
            rename: "Umbenennen",
            renameFolder: "Ordner umbenennen",
            renameFolderLabel: "Ordner {name} umbenennen",
            renameSample: "Sample umbenennen",
            moveTo: "Verschieben nach...",
            moveTitle: "{name} verschieben",
            moveDestination: "Zielordner",
            rootFolder: "(Samples-Ordner)",
            move: "Verschieben",
            namePlaceholder: "Name",
            extensionKept: "Die Dateiendung {extension} bleibt erhalten.",
            invalidName: "Ein Name darf weder / noch \\ enthalten.",
            ok: "OK",
            cancel: "Abbrechen",
            edit: "Bearbeiten",
            listen: "Anhören",
            playPreview: "{name} abspielen",
            stopPreview: "{name} stoppen",
            delete: "Löschen",
            deleteFolderLabel: "Ordner {name} löschen",
            deleteSampleTitle: "Sample löschen",
            deleteSampleQuestion: "{name} in den Papierkorb verschieben?",
            deleteFolderTitle: "Ordner löschen",
            deleteFolderQuestion: "Den Ordner {name} und die {count} enthaltenen Sample(s) in den Papierkorb verschieben?",
            deleteEmptyFolderQuestion: "Den leeren Ordner {name} in den Papierkorb verschieben?",
            usedByProfiles: "Verwendet von diesen Profilen:",
            usedByProfilesHint: "Die Sampler-Tasten, die es verwenden, spielen dann nichts mehr ab.",
            editTitle: "{name} bearbeiten",
            editHelp: "Ziehe über die Wellenform, um einen Teil auszuwählen, und behalte ihn dann (zuschneiden) oder entferne ihn. Entfernte Teile werden rot angezeigt.",
            originalLength: "Länge: {length}",
            resultLength: "Nach der Bearbeitung: {length}",
            selectionRange: "Auswahl: {start} - {end}",
            playSelection: "Auswahl abspielen",
            playResult: "Ergebnis abspielen",
            stop: "Stopp",
            keepSelection: "Auswahl behalten",
            removeSelection: "Auswahl entfernen",
            undo: "Rückgängig",
            saveAs: "Speichern",
            replaceFile: "Datei ersetzen",
            convertedToWav: "Es wird als WAV-Datei gespeichert: {name}",
            saveCopy: "Als neue Datei speichern",
            copyName: "Neuer Dateiname",
            copyHint: "Wird als WAV-Datei im selben Ordner gespeichert.",
            copySuffix: "(bearbeitet)",
            save: "Speichern",
            saving: "Speichern...",
            nothingLeft: "Damit würde das gesamte Audio entfernt.",
            breadcrumb: "Aktueller Ordner",
            rootName: "Samples",
            search: "Suchen",
            selectedCount: "{count} ausgewählt",
            selectAll: "Alle auswählen",
            done: "Fertig",
            selectSample: "{name} auswählen",
            usedByActiveProfile: "Vom aktuellen Profil verwendet",
            sizeKb: "{size} KB",
            sizeMb: "{size} MB",
            noResults: "Kein Sample entspricht dieser Suche.",
            emptyFolder: "Dieser Ordner ist leer.",
            dropHint: "Lege Audiodateien hier ab, um sie in diesen Ordner zu importieren.",
            duplicate: "Duplizieren",
            import: "Samples importieren",
            importing: "Importiere...",
            multiSelect: "Mehrere auswählen",
            trash: "Papierkorb",
            trashCount: "Papierkorb ({count})",
            moveManyTitle: "{count} Samples verschieben",
            deleteSamplesQuestion: "Diese {count} Samples in den Papierkorb verschieben?",
            trashHint: "Es kann 30 Tage lang aus dem Papierkorb wiederhergestellt werden.",
            moveToTrash: "In den Papierkorb",
            trashEmpty: "Der Papierkorb ist leer.",
            folderCount: "{count} Sample(s)",
            restore: "Wiederherstellen",
            deleteForever: "Löschen",
            trashRetention: "Elemente werden nach 30 Tagen endgültig gelöscht.",
            emptyTrash: "Papierkorb leeren",
            emptyTrashConfirm: "Erneut klicken, um alles zu löschen",
            close: "Schließen",
            trimSilence: "Stille entfernen",
            normalize: "Lautstärke normalisieren (lautester Peak bei -1dB)",
            onlySilence: "Dieses Sample ist stumm.",
            noSilence: "Am Anfang oder Ende gibt es keine Stille zu entfernen.",
            errorTitle: "Diese Aktion konnte nicht abgeschlossen werden",
        },
        // For these, the keys map directly to their GoXLR Channel Names
        channels: {
            StreamMix1: "Stream-Mix 1",
            StreamMix2: "Stream-Mix 2",
            All: "Alle",
            Mic: "Mikrofon",
            Chat: "Sprachchat",
            Music: "Musik",
            Game: "Spiel",
            Console: "Konsole",
            LineIn: "Line-In",
            System: "System",
            Sample: "Samples",
            LineOut: "Line-Out",
            Headphones: "Kopfhörer",
            MicMonitor: "Mikrofon-Monitor",
            StreamMix: "Stream-Mix",
            ChatMic: "Chat-Mikrofon",
            Sampler: "Sampler",
            VOD: "VOD",
        },

        faders: {
            A: "Kanal 1",
            B: "Kanal 2",
            C: "Kanal 3",
            D: "Kanal 4"
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
            ok: "Ok",
            yes: "Ja",
            no: "Nein",
            cancel: "Abbrechen",
            continue: "Fortsetzen",
            close: "Schließen",
        },

        // These Strings appear in the tabs throughout the pages
        navigation: {
            library: "Bibliothek",
            application: "Anwendung",
            // Tabs at the top of the Page
            profiles: "Profile",
            samples: "Samples",

            // Main Navigation Tabs
            microphone: "Mikrofon",
            mixer: "Mixer",
            effects: "Effekte",
            sampler: "Sampler",
            routing: "Routing",
            system: "System",

            // Navigation Sections on the Lighting Page

            // Accessibility Messages (these are announced to screen readers)
            accessibilityDeviceSection: "Geräteeinstellungen",
        },

        // Strings that appear in the Mic tab, note that the Profile Strings are handled in 'profileManager'
        microphone: {
            chain: {
                title: "Signalkette",
                input: "Eingang",
                gate: "Gate",
                gateToggle: "Noise Gate an",
                threshold: "Schwellenwert",
                equaliser: "Equalizer",
                bands: "{count} Bänder",
                flat: "Linear",
                eqPeak: "{gain} dB bei {freq}",
                compressor: "Kompressor",
                compressorDetail: "Schwellenwert {threshold} dB",
                curveHintFine: "Ziehe einen Punkt nach oben oder unten für den Pegel, seitwärts für die Frequenz",
                fineTune: "Frequenzen anpassen",
                bandLabel: "Band bei {freq}",
                curveHint: "Ziehe einen Punkt, um sein Band einzustellen",
            },
            profiles: {
                title: "Mikrofon Profile",
            },

            setup: {
                button: "Mikrofon Setup",
                title: "Mikrofon Setup",
                type: "Mikrofon Typ",
                gain: "Gain",

                // Microphone Types
                xlr: "XLR Mikrofon",
                phantom: "XLR + Phantom (+{voltage}V)",
                jack: "3,5mm Klinke",
            },

            waveform: {
                loud: "Zu Laut",
                good: "Gut",
                gate_estimated: "Gate geschätzt",
            },

            gate: {
                title: "Gate",
                threshold: "Schwellenwert",
                attenuation: "Dämpfung",
                attack: "Attack",
                release: "Release",
            },

            equaliser: {
                compare: "Mit dem gespeicherten Equalizer vergleichen",
                before: "Vorher",
                after: "Nachher",
                save: "Speichern",
                saveHint: "Speichert den Equalizer im Mikrofonprofil {profile}",
                savedNotice: "Equalizer im Mikrofonprofil {profile} gespeichert",
                title: "Equalizer",
                reset: "Reset",
            },

            compressor: {
                title: "Kompressor",
                amount: "Anteil",
                threshold: "Schwellenwert",
                ratio: "Verhältnis",
                attack: "Attack",
                release: "Release",
                makeUpGain: "Make-Up Gain",
            },

            extras: {
                title: "Extras",
                deEsser: "De-Esser",
                bleep: "Piepton",
            }
        },

        mixer: {
            otherInputs: "Weitere Eingänge",
            strip: {
                source: "Quelle",
                mute: "Stummschalten",
                muteFunction: "Stummschalten für",
                lighting: "Beleuchtung {channel}",
                lightingTitle: "Beleuchtung · {channel}",
            },
            submixHint: "Ein zweiter Mix (Mix B) für jeden Kanal, inklusive Fader, um unterschiedliche Pegel an einige Ausgänge zu senden.",
            // Box Headers
            outputs: "Ausgänge",
            mixAssignment: "Mix Zuweisung",

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
                base: "{channel} stummschalten",
                all: "@:message.channels.All stummschalten",
            },
            muteBehaviourTitle: "Stummschaltverhalten",
            muteBehaviourLabel: "Stummschaltverhalten für {channel}",

            // Config for the Faders
            faders: {
                sourceLabel: "Quelle für {channel}",
            },

            // Configuration for the Cough Button
            cough: {
                lighting: "Beleuchtung",
                lightingTitle: "Beleuchtung Husten- und Piepton-Taste",
                behaviour: {
                    hold: "Halten",
                    toggle: "Umschalten",
                },

                title: "Hust Tasten Einstellungen",
                behaviourTitle: "Tastenverhalten",
            }
        },

        effects: {
            lighting: {
                title: "Effekt-Beleuchtung",
                presetButton: "Vorlagen-Taste · {name}",
                applyPresets: "Auf alle Vorlagen anwenden",
                encoders: "Encoder",
                applyEncoders: "Auf alle Encoder anwenden",
                buttons: "Effekt-Tasten",
                applyButtons: "Auf alle Effekt-Tasten anwenden",
            },
            face: {
                label: "Effekte",
                master: "Effekte",
                enabled: "An",
                on: "an",
                off: "aus",
                power: "{effect} ein- oder ausschalten",
            },
            preset: {
                name: "Name",
                title: "Vorlage",
                group: "Gruppe",

                menuLoad: "Laden",
                menuRename: "Umbenennen",
                menuSave: "In Bibliothek speichern",


                loadPreset: "Vorlage laden",


                noPresets: "Es gibt derzeit keine Vorlagen in der Bibliothek, speichere oder kopiere einige, damit sie hier erscheinen.",
                loadPresetOk: "@:message.modalButtons.ok",

                confirmTitle: "Bestätige Laden der Vorlage",
                confirmMessage: "Wenn du diese Vorlage lädst, werden alle ungespeicherten Änderungen in dieser Effektbank ersetzt, möchtest du fortfahren?",
                confirmOk: "@:message.modalButtons.ok",
                confirmCancel: "@:message.modalButtons.cancel",

                overwriteTitle: "Bestätige Überschreiben der Vorlage",
                overwriteMessage: "Die Vorlage {current} existiert bereits in deiner Bibliothek, möchtest du es überschreiben?",
                overwriteConfirm: "Überschreiben",
                overwriteCancel: "@:message.modalButtons.cancel",

                accessibilityOpenPresetDirectory: "Öffne Vorlagen Verzeichnis",
                accessibilityPresetLoaded: "Vorlage {name} in {bank} geladen",
                accessibilityPresetSaved: "Vorlage {name} in Bibliothek gespeichert",
            },
            reverb: {
                title: "Hall",
                style: "Art",

                styles: {
                    library: "Bibliothek",
                    darkBloom: "Dunkle Blüte",
                    musicClub: "Musik Club",
                    realPlate: "Echte Platte",
                    chapel: "Kapelle",
                    hockeyArena: "Hockey Arena",
                },

                amount: "Stärke",
                decay: "Abklingen",
                earlyLevel: "Anfängliches Niveau",
                tailLevel: "Endniveau",
                preDelay: "Pre-Delay",
                lowColour: "Lo Colour",
                highColour: "Hi Colour",
                highFactor: "Hi Factor",
                diffuse: "Diffusion",
                modSpeed: "Modulations-Geschwindigkeit",
                modDepth: "Modulations-Tiefe",
            },

            echo: {
                title: "Echo",

                style: "Art",
                styles: {
                    quarter: "Viertel",
                    eighth: "Achtel",
                    triplet: "Drittel",
                    pingPong: "Ping Pong",
                    classicSlap: "Klassischer Slap",
                    multiTap: "Multi-Tap",
                },

                amount: "Stärke",
                feedback: "Feedback",
                tempo: "Geschwindigkeit",
                delayLeft: "Verzögerung L",
                delayRight: "Verzögerung R",
                feedbackLeft: "Feedback L",
                feedbackRight: "Feedback R",
                xfbLeftToRight: "XFB L zu R",
                xfbRightToLeft: "XFB R zu L",
            },

            pitch: {
                title: "Tonhöhe",

                style: "Art",
                styles: {
                    narrow: "Schmal",
                    wide: "Weit",
                },

                amount: "Stärke",
                character: "Charakter",
            },

            gender: {
                title: "Geschlecht",

                style: "Art",
                styles: {
                    narrow: "Schmal",
                    medium: "Mittel",
                    wide: "Weit",
                },

                amount: "Stärke",
            },

            megaphone: {
                title: "Megafon",

                style: "Art",
                styles: {
                    megaphone: "Megafon",
                    radio: "Funk",
                    onThePhone: "Am Telefon",
                    overdrive: "Übersteuern",
                    buzzCutt: "Buzz Cutt",
                    tweed: "Tweed",
                },

                amount: "Stärke",
                postGain: "Post Gain"
            },

            robot: {
                title: "Roboter",

                style: "Art",
                styles: {
                    robot1: "Roboter 1",
                    robot2: "Roboter 2",
                    robot3: "Roboter 3",
                },

                lowGain: "Low Gain",
                lowFrequency: "Low Freq",
                lowWidth: "Low Width",
                midGain: "Mid Gain",
                midFrequency: "Mid Freq",
                midWidth: "Mid Width",
                highGain: "Hi Gain",
                highFrequency: "Hi Freq",
                highWidth: "Hi Width",
                waveform: "Wellenform",
                pulseWidth: "Pulsdauer",
                threshold: "Schwellenwert",
                dryMix: "Dry Mix",
            },

            hardTune: {
                title: "Hard Tune",

                style: "Art",
                styles: {
                    natural: "Natürlich",
                    medium: "Mittel",
                    hard: "Hart",
                },

                amount: "Amount",
                rate: "Rate",
                window: "Window",

                source: "Quelle",
            }
        },

        sampler: {
            lighting: {
                label: "Beleuchtung",
                title: "Sampler-Beleuchtung",
                bank: "Tasten von Bank {bank}",
                note: "Das Gerät legt diese Farben für die ganze Bank fest, alle vier Tasten teilen sie sich.",
                applyBanks: "Auf alle Bänke anwenden",
            },
            pads: {
                title: "Tasten",
                empty: "Leer",
                count: "{count} Sample(s)",
                dropHere: "Zum Zuweisen ablegen",
            },
            banks: {
                bankTitle: "Bank",
                bank: {
                    a: "A",
                    b: "B",
                    c: "C"
                },
                buttonLabel: "Taste für {activeBank}",
                buttons: {
                    topLeft: "Oben Links",
                    topRight: "Oben Rechts",
                    bottomLeft: "Unten Links",
                    bottomRight: "Unten Rechts",
                },

                functionTitle: "Funktionen",
                functionLabel: "Funktion für Taste {activeButton} in Bank {activeBank}",
                functions: {
                    playNext: "Abspielen / Nächster",
                    playStop: "Abspielen / Stop",
                    playFade: "Abspielen / Ausblenden",
                    stopOnRelease: "Stoppen bei Loslassen",
                    fadeOnRelease: "Ausblenden bei Loslassen",
                    loop: "Schleife",
                },

                playOrderTitle: "Abspielreihenfolge",
                playOrderLabel: "Abspielreihenfolge für Taste {activeButton} in Bank {activeBank}",
                playOrders: {
                    sequential: "Sequentiell",
                    random: "Zufällig",
                },
            },

            samplesTitle: "Samples",
            samples: {
                genericError: "Ein unbekannter Fehler ist aufgetreten.",
                samplesTitle: "Samples",
                samplesLabel: "Sample für Taste {activeButton} in Bank {activeBank}",

                // Button at the bottom of the Sample List
                addSample: "+",
                addSampleLabel: "Sample hinzufügen",
                sampleSelector: {
                    parentDirectory: "Übergeordnetes Verzeichnis",
                    addButton: "Hinzufügen",

                    noSamples: "Zurzeit befinden sich keine Samples im Samples-Ordner. Kopiere einige rüber, damit sie hier ausgewählt werden können!",

                    // Used with Screen Readers
                    directories: "Verzeichnisse",
                    samples: "Samples",
                },

                gain: "Gain",
                waveform: {
                    title: "Wellenform",

                    // These are primarily for accessibility, but are labels on the various buttons.
                    text: "Wellenform für {sample}",

                    // The Play / Stop button before the waveform
                    playbackSample: "Sample abspielen",
                    stopSample: "Sample stoppen",

                    // Labels for the draggable 'Handles'
                    sampleStart: "Sample Start",
                    sampleEnd: "Sample Ende",

                    sampleDeleted: "Sample {sampleName} wurde von der Taste {activeButton} in Bank {activeBank} gelöscht",
                    zoomLevel: "Zoom Level: {level}",
                },

                addSampleWaitTitle: "Bitte warten",
                addSampleAnalysing: "Bitte warte, während das Sample analysiert wird.",
                addSampleProgress: "Fortschritt: {progress}@:message.suffixes.percentage",

                errorTitle: "Fehler beim Hinzufügen des Samples",
                errorText: "Beim Hinzufügen des Samples zur Bank ist ein Fehler aufgetreten:",

                accessibilityOpenSamplesDirectory: "Öffne Samples Verzeichnis",
                accessibilityAnalysing: "Bitte warte, das Sample wird analysiert. Dieser Vorgang kann ein paar Minuten dauern.",
                accessibilityAdded: "Sample {name} wurde zur Taste {activeButton} in Bank {activeBank} hinzugefügt."
            }
        },

        lighting: {
            channel: {
                applyFaders: "Auf alle Fader anwenden",
                applyMutes: "Auf alle Stummschalttasten anwenden",
                openIcons: "Icons-Ordner öffnen",
                display: "Anzeige",
                preview: "Vorschau",
                previewFader: "Fader",
                previewMeter: "Pegel",
                hintTwoColour: "Unterhalb des Faders: untere Farbe. Oberhalb: obere Farbe.",
                hintGradient: "Unterhalb des Faders: ein Verlauf von der unteren zur oberen Farbe. Oberhalb: aus.",
                hintMeter: "Die LEDs folgen dem Pegel des Kanals statt der Faderposition.",
                hintGradientMeter: "Die LEDs folgen dem Pegel des Kanals, mit einem Verlauf von der unteren zur oberen Farbe.",
                previewScreen: "Anzeige",
                previewActive: "aktiv",
                previewMute: "MUTE",
                previewRest: "im Ruhezustand",
            },
            // These are some common strings that are used in multiple places
            common: {
                pickColour: "Farbe wählen",
                restLabel: "Im Ruhezustand",
                restColour: "Ruhefarbe",
                restDimmedHint: "Die Taste zeigt ihre aktive Farbe gedimmt an: keine Farbe zu wählen.",
                brightness: "Helligkeit",

                activeColour: "Aktive",

                inactiveOption: "Inaktive Option",
                inactiveOptions: {
                    dimActiveColour: "Dimme aktive Farbe",
                    inactiveColour: "Inaktive Farbe",
                    dimInactiveColour: "Dimme inaktive Farbe",

                },

            },

            global: {
                areas: {
                    title: "Bereiche",

                    area: "Bereich",
                    areas: {
                        global: "Global",
                        accent: "Akzent",
                    },

                },

                animations: {
                    title: "Animationen",

                    mode: "Animationsmodus",
                    modes: {
                        none: "Keine",
                        rainbowRetro: "Regenbogen Retro",
                        rainbowBright: "Regenbogen Hell",
                        rainbowDark: "Regenbogen Dunkel",
                        simple: "Einfach",
                        ripple: "Welle",
                    },

                    mod1: "Verlauf Mod 1",
                    mod2: "Verlauf Mod 2",

                    waterfall: "Wasserfall Einstellungen",
                    waterfallOff: "Aus",
                }
            },

            mixer: {

                fader: {
                    title: "Fader",

                    style: "Art",
                    styles: {
                        gradient: "Verlauf",
                        meter: "Audioanzeige",
                    },

                    bottomColour: "Untere Farbe",
                    topColour: "Obere Farbe",

                },

                screen: {
                    title: "Anzeige",
                    backgroundColour: "Hintergrundfarbe",
                    icons: "Icons",
                    iconNone: "-- KEINS --",

                    options: {
                        showNumber: "Zeige Nummer",
                        invertDisplay: "Anzeige invertieren",
                        text: "Text",

                        accessibilityText: "Text zur Anzeige auf dem GoXLR-Display"
                    }
                },

                mute: {
                    // Pretty much all other fields for this area come from 'Common'
                    title: "Stummschalten",
                }
            },

            effects: {

                encoders: {
                    title: "Encoder",

                    encoder: "Encoder",
                    encoders: {
                        reverb: "Reverb",
                        echo: "Echo",
                        pitch: "Pitch",
                        gender: "Geschlecht",
                    },

                    leftColour: "Linke Farbe",
                    rightColour: "Rechte Farbe",
                    knobColour: "Reglerfarbe",
                },

                buttons: {
                    title: "Effekt Tasten",

                    effect: {
                        megaphone: "Megafon",
                        robot: "Roboter",
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

                active: "Aktiv / Geladen",
                empty: "Sample leer",
            },

            cough: {

                buttons: {
                    bleep: "Piepton",
                    cough: "Husten",
                }
            },
        },

        routing: {
            // There are (frustratingly) some minor differences between how channels appear in the routing table,
            // and how they appear in the Mixer, these changes also fall under the hood at the Utility level, so
            // we'll define all the channels here, and 'fix' anything which needs adjustment.
            title: "Routing",

            input: "Eingänge",
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

            output: "Ausgänge",
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
            networkAccess: {
                title: "Netzwerkzugriff",
                explain: "Öffne auf einem anderen Gerät in deinem Netzwerk (Tablet, Handy, Computer) einmal einen dieser Links. Der Zugriff wird danach gespeichert.",
                restart: "Starte das GoXLR Utility neu, um es aus deinem Netzwerk zu erreichen. Die Links werden dann hier angezeigt.",
                noAddress: "Für diesen Computer wurde keine Netzwerkadresse gefunden.",
                copy: "Kopieren",
                copied: "Kopiert",
                regenerate: "Neuer Link (die bisherigen Links funktionieren nicht mehr)",
            },
            menu: {
                firmware: "Firmware-Update",
            },
            title: "System",

            powerButton: "Energie-Aktionen",
            power: {
                shutdownTitle: "Abschaltaktionen",
                shutdownDescription: "Diese Aktionen werden ausgeführt, wenn das GoXLR Utility sicher heruntergefahren ist.",

                sleepTitle: "Schlaf Aktionen",
                sleepDescription: "Diese Aktionen werden ausgeführt, wenn das System in den Schlafmodus wechselt.",

                wakeTitle: "Aufwach Aktionen",
                wakeDescription: "Diese Aktionen werden ausgeführt, wenn das System aus dem Schlafmodus aufwacht.",

                settingsError: "Die Konfiguration scheint manuell geändert worden zu sein. Um unerwartetes Verhalten zu vermeiden, wurde dieser Abschnitt deaktiviert. Um die Abschaltaktionen vollständig zurückzusetzen, drücke die Taste unten",
                settingsReset: "Abschaltaktionen zurücksetzen",

                power_options: {
                    reload: "Einstellungen neu laden",
                    saveProfile: "Profil speichern",
                    loadProfile: "Lade ganzes Profil",
                    loadColourProfile: "Lade Profilfarben",
                    saveMicProfile: "Mikrofonprofil speichern",
                    loadMicProfile: "Lade Mikrofonprofil",
                }
            },

            deviceButton: "Geräteeinstellungen",
            device: {
                holdDuration: "Stummschaltetaste Haltezeit um alles stummzuschalten",
                holdDurationAccessibility: "Dauer in Millisekunden, die die Stummschaltetaste gehalten werden muss, um für alle Kanäle stummzuschalten",

                sampleBuffer: "Sampler Pre-Record-Puffer (in Sekunden)",
                sampleBufferAccessibility: "Anzahl der Sekunden, die der Sampler im Voraus aufzeichnet, bevor er ausgelöst wird",

                voiceDeafen: "Sprachchat Stummschaltung für alle schaltet auch das Mikrofon zum Chat-Mikrofon stumm.",
                voiceDeafenAccessibility: "Wenn alle Kanäle stummgeschaltet werden, wird auch das Chat-Mikrofon stummgeschaltet.",

                monitorWithFx: "Mikrofonmonitor mit FX-Status umschalten",
                monitorWithFxAccessibility: "Aktiviert den Mikrofonmonitor, wenn FX aktiviert wird",

                resetSampleFunctionOnClear: "Sampler Modus beim Leeren zurücksetzen",
                resetSampleFunctionOnClearAccessibility: "Setzt den Sampler Modus beim Leeren auf Start/Nächster",

                lockFaders: "Faderpositionen bei Stummschaltung auf Alle sperren",
                lockFadersAccessibility: "Verhindert, dass sich die Fader nach unten bewegen, wenn Stummschaltung für alle aktiviert ist.",

                samplerFadeDuration: "Sampler Ausblenddauer",
                samplerFadeDurationAccessibility: "Die Dauer in Millisekunden, die der Sampler ausgeblendet wird, wenn die Wiedergabe gestoppt wird",
            },

            settingsButton: "Utility Einstellungen",
            settings: {
                shutdownConfirmTitle: "Bist du sicher?",
                shutdownConfirmMessage: "Bist du sicher, dass du das GoXLR Utility beenden möchtest?",
                settingsRegionAccessibility: "Einstellungen",
                macosAggregateManagement: "MacOS-Aggregatgeräteverwaltung deaktivieren (Neustart erforderlich)",
                macosAggregateManagementAccessibility: "Aggregatgeräteverwaltung des Utility unter MacOS deaktiviert (Neustart erforderlich)",
                language: "Sprache",
                useSystem: "System Sprache verwenden (wenn verfügbar)",

                uiHandler: "UI Handler",
                uiHandlers: {
                    browser: "Browser",
                    app: "App",
                    custom: "Benutzerdefiniert",
                },


                logLevel: "Log Level (erfordert Neustart)",
                logLevels: {
                    off: "Aus",
                    error: "Fehler",
                    warn: "Warnung",
                    info: "Info",
                    debug: "Debug",
                    trace: "Trace",

                    // OFF / ERROR / WARN / INFO / DEBUG / TRACE
                },

                firmwareSource: "Firmware Update Kanal",
                firmwareSources: {
                    live: "Live",
                    beta: "Beta"
                },

                allowNetworkAccess: "UI-Netzwerkzugriff zulassen (Neustart erforderlich)",
                allowNetworkAccessAccessibility: "Zugriff auf die UI von anderen Geräten im Netzwerk aus zulassen",

                autoStart: "AutoStart bei Anmeldung",
                autoStartAccessibility: "Starte das GoXLR Utility, wenn sich der Benutzer anmeldet",

                showOnLaunch: "UI beim Start anzeigen",
                showOnLaunchAccessibility: "Startet die UI automatisch beim Start",

                showTray: "Taskleistensymbol anzeigen (Neustart erforderlich)",
                showTrayAccessibility: "Anzeigen des GoXLR Utility Icons in der Taskleiste",

                ttsOnButton: "TTS auf Tastendruck",
                ttsOnButtonAccessibility: "Den Status der gedrückten Taste entweder über ein Bildschirmlesegerät oder das System-TTS vorlesen",

                recoverDefaults: "Standardwerte wiederherstellen",
                recoverOptions: {
                    profiles: "Profile",
                    micProfiles: "Mikrofon Profile",
                    icons: "Icons",
                    presets: "Vorlagen"
                },

                shutdownUtility: "GoXLR Utility beenden"
            },

            aboutButton: "Über GoXLR",
            about: {
                serial: "Seriennummer",
                utilityVersion: "Utility Version",
                driverVersion: "Treiber Version",
                hardwareVersion: "Hardware Version",

                firmware: "Firmware",
                dice: "DICE",
                fpga: "FPGA"
            },

            firmwareUpdateButton: {
                update: "Firmware Aktualisieren",
                downgrade: "Firmware Downgraden",
                reinstall: "Firmware Neu-Installieren",
                custom: "Custom Firmware",
            },
            firmwareUpdate: {
                noInfo: "Die Update-Server haben nicht geantwortet, daher ist die neueste Version unbekannt. Auf diesem GoXLR läuft {currentVersion}.",
                updateTo: "Auf {version} aktualisieren",
                reinstall: "{version} neu installieren",
                customButton: "Benutzerdefinierte Firmware…",
                confirmTitle: "Firmware flashen?",
                confirmText: "Das GoXLR startet während des Updates neu. Trenne es nicht und schließe das Utility nicht, bis der Vorgang abgeschlossen ist.",
                confirmCustom: "Als Nächstes wählst du eine Firmware-Datei (.bin). Verwende nur eine Datei, der du vertraust: Eine falsche Datei kann das GoXLR unbrauchbar machen. Trenne es während des Updates nicht.",
                betaWarning: "Du bist dabei, eine Beta-Firmware-Version zu installieren.\nFür diese Version gibt es keinen offiziellen Support und sie kann Fehler oder Probleme enthalten, die wir nicht beheben können.",
                newVersionAvailable: "Eine neuere Firmware-Version ({latestVersion}) ist für dein Gerät verfügbar.\nMöchtest du dein Gerät jetzt aktualisieren?",
                currentVersionIsNewer: "Deine aktuelle Firmware-Version ({currentVersion}) ist neuer als die letzte verfügbare Firmware-Version ({latestVersion}) für dein Gerät.\nMöchtest du ein Downgrade auf die neueste Firmware-Version durchführen?",
                currentIsUpToDate: "Deine Firmware ist bereits auf dem neuesten Stand.\nMöchtest du die aktuelle Firmware neu installieren?",
                customFirmware: "Du bist dabei, eine benutzerdefinierte Firmware zu installieren.\nDies ist nicht empfohlen, wenn du nicht weißt, was du tust.\nBist du sicher, dass du fortfahren möchtest?",

                warning: "Du bist dabei, eine neue Firmware auf dein Gerät zu flashen.\nDie Entwickler der GoXLR Utility sind nicht verantwortlich für Schäden, die durch diesen Vorgang verursacht werden können.",
                warningInfo: "Mehr Infos",

                updatePaused: "Du bist kurz davor, die Firmware {version} zu installieren. Bist du sicher, dass du fortfahren möchtest?",
                updateInProgress: "Firmware-Update wird durchgeführt. Bitte warte und trenne die Verbindung zu deinem Gerät nicht!",
                completed: "Die Aktualisierung der Firmware wurde erfolgreich abgeschlossen.",
                failed: "Bei der Aktualisierung der Firmware ist ein Fehler aufgetreten. Bitte versuche es erneut.",

                changelog: "Version {version} Änderungen:",
                title: "Installiere Firmware...",

                progress: {
                    starting: "Starte...",
                    manifest: "Lade Manifest...",
                    download: "Downloade Firmware...",
                    pause: "Update pausiert",
                    clearNVR: "Update-Partition wird vorbereitet...",
                    uploadFirmware: "Firmware wird hochgeladen...",
                    validateUpload: "Hochgeladene Firmware wird validiert...",
                    hardwareWrite: "Firmware wird geschrieben...",
                    hardwareValidate: "Firmware wird überprüft...",
                    complete: "Update agbeschlossen",
                    failed: "Firmware-Update konnte nicht abgeschlossen werden",
                }
            },

            licenses: "Lizenzen",
            help: "Hilfe",
        },

        // Strings used in Profile and Microphone Profile Management.
        profileManager: {
            trashTitle: "Gelöschte Profile",
            trashEmpty: "Keine gelöschten Profile. Gelöschte Profile werden hier 30 Tage lang aufbewahrt.",
            trashProfile: "Profil",
            trashMic: "Mikrofonprofil",
            // Accessibility Titles for the buttons at the bottom of the Profile List
            saveProfileName: "Profil {profileName} speichern",
            createProfile: "Neues Profil erstellen",

            // Dialog Popup when clicking 'Create Profile' Button
            newTitle: "Neues Profil Quelle",
            newQuestion: "Möchtest du ein neues Profil aus der Standard- oder der aktuellen Konfiguration erstellen?",
            newDefaultButton: "Standard",
            newCurrentButton: "Aktuell",
            newCancelButton: "@:message.modalButtons.cancel",

            // Dialog Popup when hitting the 'Save Profile' button
            overwriteTitle: "Überschreiben bestätigen",
            overwriteQuestion: "Bist du sicher, dass du das Profil {activeProfile} überschreiben möchtest?",
            overwriteYes: "@:message.modalButtons.yes",
            overwriteNo: "@:message.modalButtons.no",

            // Dialog Popup when clicking the 'Delete' Menu Item
            deleteTitle: "Löschen bestätigen",
            deleteQuestion: "Bist du sicher, dass du das Profil {activeProfile} löschen möchtest?",
            deleteYes: "@:message.modalButtons.yes",
            deleteNo: "@:message.modalButtons.no",

            // Dialog prompting for a new Profile Name
            newNameTitle: "Neuen Profilnamen eingeben",
            newNamePlaceHolder: "Neuer Name",
            newNameOk: "@:message.modalButtons.ok",
            newNameCancel: "@:message.modalButtons.cancel",

            // Dialog Popup when attempting to delete the active profile
            deleteCurrentErrorTitle: "Löschen nicht möglich",
            deleteCurrentErrorMessage: "Es ist nicht möglich, das aktive Profil zu löschen.",

            // Items in the Popup Menu on Profiles
            menuLoadProfile: "Profil laden",
            menuLoadProfileColours: "nur Farben laden",
            menuDeleteProfile: "Profil löschen",


            // Accessibility Messages (these are announced to screen readers)
            accessibilityLoadedProfile: "Profil {profileName} geladen",
            accessibilityLoadedColours: "Profil {profileName} Farben geladen",
            accessibilityCreatedProfile: "Profil {profileName} erstellt",
            accessibilitySavedProfile: "Profil {profileName} gespeichert",
            accessibilitySavedProfileAs: "Profile {profileName} als {newProfileName} gespeichert",
            accessibilityProfileDeleted: "Profile {profileName} gelöscht",
            accessibilityDropMenuTitle: "{profileName} Optionen",
            accessibilityOpenProfileDirectory: "Öffne Profil Verzeichnis",
            accessibilityOpenMicProfileDirectory: "Öffne Mikrofon Profil Verzeichnis",
        },
    }
}
