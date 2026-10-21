/*  Italian (Italy) language
 */


export default {
    message: {
        common: {
            close: "Chiudi",
            lighting: "Illuminazione",
            clear: "Cancella",
            collapseSection: "Comprimi Sezione",
            expandSection: "Espandi Sezione",
            activeProfile: "Profilo Attivo",
            switchDevice: "Cambia Dispositivo",
            removeSample: "Rimuovi Campione",
            waterfallAnimationUp: "Animazione Cascata verso l'Alto",
            waterfallAnimationDown: "Animazione Cascata verso il Basso",
            unknown: "Sconosciuto",
            tabList: "Elenco schede",
        },
        deviceSelector: {
            title: "Seleziona Dispositivo",
            connecting: "Tentativo di connessione a GoXLR Utility..",
            disconnected: "Impossibile connettersi a GoXLR Utility, verifica che sia in esecuzione.\n\nQuesta pagina tenterà di riconnettersi automaticamente..",
            noDevices: "Nessun Dispositivo GoXLR Trovato",
        },
        versionCheck: {
            updateAvailable: "Aggiornamento Disponibile",
            firmwareDirectionAvailable: "{direction} Firmware Disponibile",
            firmwareDirections: {
                update: "Aggiornamento",
                downgrade: "Downgrade",
                unknown: "SCONOSCIUTO",
            },
            incompatibleDriver: "I driver installati non sono compatibili con questo firmware, clicca qui per scaricare l'ultimo driver.",
        },
        theme: {
            label: "Tema colori",
            dark: "Scuro",
            light: "Chiaro",
            system: "Auto",
        },
        topBar: {
            loadTitle: "Caricare {name}?",
            loadQuestion: "Le impostazioni non salvate di {current} andranno perse.",
            loadMicQuestion: "Le impostazioni non salvate del profilo mic {current} andranno perse.",
            load: "Carica",
            saveThenLoad: "Salva, poi carica",
            lighting: "Illuminazione globale",
            lightingTitle: "Illuminazione globale",
            profile: "Profilo",
            profileLabel: "Profilo attivo",
            micProfile: "Mic",
            micProfileLabel: "Profilo mic attivo",
            save: "Salva",
            showDevice: "Mostra il GoXLR",
            hideDevice: "Nascondi il GoXLR",
        },
        sampleAssign: {
            title: "Assegna a {bank} · {button}",
            bank: "Banca",
            empty: "Questo tasto non ha ancora campioni.",
            current: "Questo tasto ha già {count} campione/i:",
            add: "Aggiungi",
            replace: "Sostituisci",
            removing: "Rimozione dei campioni attuali…",
            adding: "Aggiunta {index} di {total}: {name}…",
            done: "{count} campione/i assegnato/i a {bank} · {button}",
            timeoutRemove: "Il daemon ha impiegato troppo tempo a rimuovere i campioni attuali",
            timeout: "{name}: il daemon ha impiegato troppo tempo ad aggiungere questo campione",
        },
        sampleManager: {
            newFolder: "Nuova Cartella",
            openFolder: "Apri la Cartella Campioni",
            rename: "Rinomina",
            renameFolder: "Rinomina Cartella",
            renameFolderLabel: "Rinomina la cartella {name}",
            renameSample: "Rinomina Campione",
            moveTo: "Sposta in...",
            moveTitle: "Sposta {name}",
            moveDestination: "Cartella di destinazione",
            rootFolder: "(Cartella Campioni)",
            move: "Sposta",
            namePlaceholder: "Nome",
            extensionKept: "L'estensione {extension} viene mantenuta.",
            invalidName: "Un nome non può contenere / o \\.",
            ok: "OK",
            cancel: "Annulla",
            edit: "Modifica",
            listen: "Ascolta",
            playPreview: "Riproduci {name}",
            stopPreview: "Interrompi {name}",
            delete: "Elimina",
            deleteFolderLabel: "Elimina la cartella {name}",
            deleteSampleTitle: "Elimina Campione",
            deleteSampleQuestion: "Spostare {name} nel cestino?",
            deleteFolderTitle: "Elimina Cartella",
            deleteFolderQuestion: "Spostare nel cestino la cartella {name} e i {count} campione/i che contiene?",
            deleteEmptyFolderQuestion: "Spostare nel cestino la cartella vuota {name}?",
            usedByProfiles: "Usato da questi profili:",
            usedByProfilesHint: "I tasti del campionatore che lo usano non riprodurranno più nulla.",
            editTitle: "Modifica {name}",
            editHelp: "Trascina sull'onda per selezionare una parte, poi mantienila (ritaglia) o rimuovila. Le parti rimosse sono mostrate in rosso.",
            originalLength: "Durata: {length}",
            resultLength: "Dopo la modifica: {length}",
            selectionRange: "Selezione: {start} - {end}",
            playSelection: "Riproduci Selezione",
            playResult: "Riproduci Risultato",
            stop: "Stop",
            keepSelection: "Mantieni Selezione",
            removeSelection: "Rimuovi Selezione",
            undo: "Annulla",
            saveAs: "Salva",
            replaceFile: "Sostituisci il file",
            convertedToWav: "Verrà salvato come file WAV: {name}",
            saveCopy: "Salva come nuovo file",
            copyName: "Nome del nuovo file",
            copyHint: "Salvato come file WAV nella stessa cartella.",
            copySuffix: "(modificato)",
            save: "Salva",
            saving: "Salvataggio...",
            nothingLeft: "Questo rimuoverebbe tutto l'audio.",
            breadcrumb: "Cartella corrente",
            rootName: "Campioni",
            search: "Cerca",
            selectedCount: "{count} selezionati",
            selectAll: "Seleziona Tutto",
            done: "Fatto",
            selectSample: "Seleziona {name}",
            usedByActiveProfile: "Usato dal profilo corrente",
            sizeKb: "{size} KB",
            sizeMb: "{size} MB",
            noResults: "Nessun campione corrisponde a questa ricerca.",
            emptyFolder: "Questa cartella è vuota.",
            dropHint: "Rilascia qui dei file audio per importarli in questa cartella.",
            duplicate: "Duplica",
            import: "Importa Campioni",
            importing: "Importazione...",
            multiSelect: "Selezione Multipla",
            trash: "Cestino",
            trashCount: "Cestino ({count})",
            moveManyTitle: "Sposta {count} campioni",
            deleteSamplesQuestion: "Spostare questi {count} campioni nel cestino?",
            trashHint: "Può essere ripristinato dal cestino per 30 giorni.",
            moveToTrash: "Sposta nel Cestino",
            trashEmpty: "Il cestino è vuoto.",
            folderCount: "{count} campione/i",
            restore: "Ripristina",
            deleteForever: "Elimina",
            trashRetention: "Gli elementi vengono eliminati definitivamente dopo 30 giorni.",
            emptyTrash: "Svuota il Cestino",
            emptyTrashConfirm: "Clicca di nuovo per eliminare tutto",
            close: "Chiudi",
            trimSilence: "Taglia Silenzio",
            normalize: "Normalizza il volume (picco massimo a -1dB)",
            onlySilence: "Questo campione è silenzioso.",
            noSilence: "Non c'è silenzio da tagliare all'inizio o alla fine.",
            errorTitle: "Impossibile completare questa azione",
        },
        // For these, the keys map directly to their GoXLR Channel Names
        channels: {
            StreamMix1: "Mix Diretta 1",
            StreamMix2: "Mix Diretta 2",
            All: "Tutti",
            Mic: "Mic",
            Chat: "Chat Vocale",
            Music: "Musica",
            Game: "Gioco",
            Console: "Console",
            LineIn: "Line In",
            System: "Sistema",
            Sample: "Campioni",
            LineOut: "Line Out",
            Headphones: "Cuffie",
            MicMonitor: "Monitor Mic",
            StreamMix: "Mix Diretta",
            ChatMic: "Mic Chat",
            Sampler: "Campionatore",
            VOD: "VOD",
        },

        faders: {
            A: "Canale 1",
            B: "Canale 2",
            C: "Canale 3",
            D: "Canale 4"
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
            continue: "Continua",
            close: "Chiudi",
            ok: "Ok",
            yes: "Sì",
            no: "No",
            cancel: "Annulla"
        },

        // These Strings appear in the tabs throughout the pages
        navigation: {
            library: "Libreria",
            application: "Applicazione",
            // Tabs at the top of the Page
            profiles: "Profili",
            samples: "Campioni",

            // Main Navigation Tabs
            microphone: "Mic",
            mixer: "Mixer",
            effects: "Effetti",
            sampler: "Campionatore",
            routing: "Routing",
            system: "Sistema",

            // Navigation Sections on the Lighting Page

            // Accessibility Messages (these are announced to screen readers)
            accessibilityDeviceSection: "Impostazioni Dispositivo",
        },

        // Strings that appear in the Mic tab, note that the Profile Strings are handled in 'profileManager'
        microphone: {
            chain: {
                title: "Catena di elaborazione",
                input: "Ingresso",
                gate: "Gate",
                gateToggle: "Noise gate attivo",
                threshold: "Soglia",
                equaliser: "Equalizzatore",
                bands: "{count} bande",
                flat: "Piatto",
                eqPeak: "{gain} dB a {freq}",
                compressor: "Compressore",
                compressorDetail: "Soglia {threshold} dB",
                curveHintFine: "trascina un punto in alto o in basso per il livello, di lato per la frequenza",
                fineTune: "Regola frequenze",
                bandLabel: "Banda a {freq}",
                curveHint: "trascina un punto per regolare la sua banda",
            },
            profiles: {
                title: "Profili Mic"
            },

            setup: {
                button: "Configurazione Mic",
                title: "Configurazione Mic",
                type: "Tipo Mic",
                gain: "Guadagno",

                // Microphone Types
                xlr: "Microfono XLR",
                phantom: "XLR + Phantom (+{voltage}V)",
                jack: "3.5mm",
            },
            waveform: {
                loud: "Troppo Forte",
                good: "Giusto",
                gate_estimated: "Il Gate è una stima"
            },

            gate: {
                title: "Gate",
                threshold: "Soglia",
                attenuation: "Attenuazione",
                attack: "Attacco",
                release: "Rilascio",
            },

            equaliser: {
                compare: "Confronta con l'equalizzatore salvato",
                before: "Prima",
                after: "Dopo",
                save: "Salva",
                saveHint: "Salva l'equalizzatore nel profilo mic {profile}",
                savedNotice: "Equalizzatore salvato nel profilo mic {profile}",
                title: "Equalizzatore",
                reset: "Reset",
            },

            compressor: {
                title: "Compressore",
                amount: "Quantità",
                threshold: "Soglia",
                ratio: "Rapporto",
                attack: "Attacco",
                release: "Rilascio",
                makeUpGain: "Guadagno aggiuntivo",
            },

            extras: {
                title: "Extra",
                deEsser: "De-Esser",
                bleep: "Bip",
            }
        },

        mixer: {
            otherInputs: "Altri Ingressi",
            strip: {
                source: "Fonte",
                mute: "Muto",
                muteFunction: "Muta verso",
                lighting: "Illuminazione {channel}",
                lightingTitle: "Illuminazione · {channel}",
            },
            submixHint: "Un secondo mix (Mix B) per ogni canale, fader inclusi, per inviare livelli diversi ad alcune uscite.",
            // Box Headers
            outputs: "Uscite",
            mixAssignment: "Assegnamento Mix",

            // Submix Checkbox
            submix: "Submix",

            // Mix Assignment
            channelA: "A",
            channelB: "B"
        },

        // Strings in the Configuration Tab
        configuration: {
            // This is common between Faders and Cough Buttons
            mute_behaviour: {
                base: "Muta verso {channel}",
                all: "Muta verso @:message.channels.All",
            },
            muteBehaviourTitle: "Comportamento Muto",
            muteBehaviourLabel: "Comportamento Muto per {channel}",

            // Config for the Faders
            faders: {
                sourceLabel: "Fonte per {channel}",
            },

            // Configuration for the Cough Button
            cough: {
                lighting: "Illuminazione",
                lightingTitle: "Illuminazione Tosse e Bip",
                behaviour: {
                    hold: "Tieni Premuto",
                    toggle: "Premi",
                },

                title: "Impostazioni Tasto Tosse",
                behaviourTitle: "Comportamento Tasto Tosse",
            }
        },

        effects: {
            lighting: {
                title: "Illuminazione effetti",
                presetButton: "Tasto preset · {name}",
                applyPresets: "Applica a tutti i preset",
                encoders: "Manopole",
                applyEncoders: "Applica a tutte le manopole",
                buttons: "Tasti Effetto",
                applyButtons: "Applica a tutti i tasti effetto",
            },
            face: {
                label: "Effetti",
                master: "Effetti",
                enabled: "Attivo",
                on: "attivo",
                off: "disattivo",
                power: "Attiva o disattiva {effect}",
            },
            preset: {
                name: "Nome",
                title: "Preset",
                group: "Gruppo",

                menuLoad: "Carica",
                menuRename: "Rinomina",
                menuSave: "Salva nella Libreria",


                loadPreset: "Carica Preset",


                noPresets: "Al momento non sono presenti preset nella libreria, salva o copiane qualcuno per farli apparire qui.",
                loadPresetOk: "@:message.modalButtons.ok",

                confirmTitle: "Conferma Caricamento Preset",
                confirmMessage: "Caricare questo preset sostituirà qualsiasi modifica non salvata su questa banca effetti, vuoi procedere?",
                confirmOk: "@:message.modalButtons.ok",
                confirmCancel: "@:message.modalButtons.cancel",

                overwriteTitle: "Conferma Sovrascrizione Preset",
                overwriteMessage: "Il preset {current} esiste già nella tua libreria, vuoi sovrascriverlo?",
                overwriteConfirm: "Sovrascrivi",
                overwriteCancel: "@:message.modalButtons.cancel",

                accessibilityOpenPresetDirectory: "Apri Cartella Preset",
                accessibilityPresetLoaded: "Preset {name} caricato su {bank}",
                accessibilityPresetSaved: "Preset {name} salvato nella Libreria",
            },
            reverb: {
                title: "Riverbero",
                style: "Stile",

                styles: {
                    library: "Libreria",
                    darkBloom: "Dark Bloom",
                    musicClub: "Discoteca",
                    realPlate: "Real Plate",
                    chapel: "Cappella",
                    hockeyArena: "Arena Hockey"
                },

                amount: "Quantità",
                decay: "Decadimento",
                earlyLevel: "Livello di Inizio",
                tailLevel: "Livello di Coda",
                preDelay: "Pre-ritardo",
                lowColour: "Colore Basso",
                highColour: "Colore Alto",
                highFactor: "Fattore Alto",
                diffuse: "Diffusione",
                modSpeed: "Velocità Mod",
                modDepth: "Profondità Mod"
            },

            echo: {
                title: "Eco",

                style: "Stile",
                styles: {
                    quarter: "Quarto",
                    eighth: "Ottavo",
                    triplet: "Terzina",
                    pingPong: "Ping Pong",
                    classicSlap: "Schiaffo Classico",
                    multiTap: "Tocco Multiplo"
                },

                amount: "Quantità",
                feedback: "Ritorno",
                tempo: "Ritmo",
                delayLeft: "Ritardo Sx",
                delayRight: "Ritardo Dx",
                feedbackLeft: "Ritorno Sx",
                feedbackRight: "Ritorno Dx",
                xfbLeftToRight: "XFB Sx a Dx",
                xfbRightToLeft: "XFB Dx a Sx",
            },

            pitch: {
                title: "Tono",

                style: "Stile",
                styles: {
                    narrow: "Stretto",
                    wide: "Largo"
                },

                amount: "Quantità",
                character: "Carattere"
            },

            gender: {
                title: "Genere",

                style: "Stile",
                styles: {
                    narrow: "Stretto",
                    medium: "Medio",
                    wide: "Largo"
                },

                amount: "Quantità"
            },

            megaphone: {
                title: "Megafono",

                style: "Stile",
                styles: {
                    megaphone: "Megafono",
                    radio: "Radio",
                    onThePhone: "Al Telefono",
                    overdrive: "Sovraccarico",
                    buzzCutt: "Capelli a Spazzola",
                    tweed: "Tweed"
                },

                amount: "Quantità",
                postGain: "Guadagno Aggiuntivo"
            },

            robot: {
                title: "Robot",

                style: "Stile",
                styles: {
                    robot1: "Robot 1",
                    robot2: "Robot 2",
                    robot3: "Robot 3",
                },

                lowGain: "Guadagno Bassi",
                lowFrequency: "Frequenza Bassi",
                lowWidth: "Larghezza Bassi",
                midGain: "Guadagno Medi",
                midFrequency: "Frequenza Medi",
                midWidth: "Larghezza Medi",
                highGain: "Guadagno Alti",
                highFrequency: "Frequenza Alti",
                highWidth: "Larghezza Alti",
                waveform: "Onda",
                pulseWidth: "Larghezza Impulso",
                threshold: "Soglia",
                dryMix: "Mix Secco",
            },

            hardTune: {
                title: "Hard Tune",

                style: "Stile",
                styles: {
                    natural: "Naturale",
                    medium: "Medio",
                    hard: "Forte"
                },

                amount: "Quantità",
                rate: "Rapporto",
                window: "Finestra",

                source: "Fonte"
            }
        },

        sampler: {
            lighting: {
                label: "Illuminazione",
                title: "Illuminazione Campionatore",
                bank: "Tasti banca {bank}",
                note: "Il dispositivo imposta questi colori per l'intera banca, i quattro tasti li condividono.",
                applyBanks: "Applica a tutte le banche",
            },
            pads: {
                title: "Tasti",
                empty: "Vuoto",
                count: "{count} campione/i",
                dropHere: "Rilascia per assegnare",
            },
            banks: {
                bankTitle: "Banca",
                bank: {
                    a: "A",
                    b: "B",
                    c: "C"
                },
                buttonLabel: "Tasto per banca {activeBank}",
                buttons: {
                    topLeft: "Alto a Sinistra",
                    topRight: "Alto a Destra",
                    bottomLeft: "Basso a Sinistra",
                    bottomRight: "Basso a Destra",
                },

                functionTitle: "Funzione",
                functionLabel: "Funzione per tasto {activeButton} sulla banca {activeBank}",
                functions: {
                    playNext: "Inizia Riproduzione / Prossimo Campione",
                    playStop: "Inizia Riproduzione / Interrompi Riproduzione",
                    playFade: "Inizia Riproduzione / Sfuma Campione",
                    stopOnRelease: "Interrompi al Rilascio",
                    fadeOnRelease: "Sfuma al Rilascio",
                    loop: "Loop"
                },

                playOrderTitle: "Ordine di Riproduzione",
                playOrderLabel: "Ordine di riproduzione per il tasto {activeButton} sulla banca {activeBank}",
                playOrders: {
                    sequential: "Sequenziale",
                    random: "Casuale",
                },
            },

            samplesTitle: "Campioni",
            samples: {
                genericError: "Si è verificato un errore sconosciuto.",
                samplesTitle: "Campioni",
                samplesLabel: "Campioni per tasto {activeButton} sulla banca {activeBank}",

                // Button at the bottom of the Sample List
                addSample: "+",
                addSampleLabel: "Aggiungi Campione",
                sampleSelector: {
                    parentDirectory: "Cartella Superiore",
                    addButton: "Aggiungi",

                    noSamples: "Al momento non sono presenti campioni nella cartella dei campioni, copiane qualcuno per selezionarli qui!",

                    // Used with Screen Readers
                    directories: "Cartelle",
                    samples: "Campioni",
                },

                gain: "Guadagno",
                waveform: {
                    title: "Onda",

                    // These are primarily for accessibility, but are labels on the various buttons.
                    text: "Onda per {sample}",

                    // The Play / Stop button before the waveform
                    playbackSample: "Riproduci Campione",
                    stopSample: "Interrompi Campione",

                    // Labels for the draggable 'Handles'
                    sampleStart: "Inizio Campione",
                    sampleEnd: "Fine Campione",

                    sampleDeleted: "Il Campione {sampleName} è stato eliminato dal tasto {activeButton} sulla banca {activeBank}",
                    zoomLevel: "Livello di zoom: {level}",
                },

                addSampleWaitTitle: "Attendi",
                addSampleAnalysing: "Attendi mentre il campione viene analizzato.",
                addSampleProgress: "Progresso: {progress}@:message.suffixes.percentage",

                errorTitle: "Errore nell'aggiunta del Campione",
                errorText: "Si è verificato un errore nell'aggiunta del campione alla banca:",

                accessibilityOpenSamplesDirectory: "Apri Cartella Campioni",
                accessibilityAnalysing: "Attendi, analisi del campione in corso. Questo processo potrebbe richiedere fino a due minuti.",
                accessibilityAdded: "Il campione {name} è stato aggiunto al tasto {activeButton} sulla banca {activeBank}."
            }
        },

        lighting: {
            channel: {
                applyFaders: "Applica a tutti i fader",
                applyMutes: "Applica a tutti i tasti Muto",
                openIcons: "Apri la cartella delle icone",
                display: "Schermo",
                preview: "Anteprima",
                previewFader: "fader",
                previewMeter: "meter",
                hintTwoColour: "Sotto il fader: colore inizio. Sopra: colore fine.",
                hintGradient: "Sotto il fader: una sfumatura dal colore inizio al colore fine. Sopra: spento.",
                hintMeter: "I LED seguono il livello sonoro del canale invece della posizione del fader.",
                hintGradientMeter: "I LED seguono il livello sonoro del canale, sfumando dal colore inizio al colore fine.",
                previewScreen: "schermo",
                previewActive: "attivo",
                previewMute: "MUTO",
                previewRest: "a riposo",
            },
            // These are some common strings that are used in multiple places
            common: {
                pickColour: "scegli un colore",
                restLabel: "A riposo",
                restColour: "Colore a riposo",
                restDimmedHint: "Il tasto mostra il suo colore attivo, attenuato: nessun colore da scegliere.",
                brightness: "Luminosità",

                activeColour: "Attivo",

                inactiveOption: "Opzione Inattiva",
                inactiveOptions: {
                    dimActiveColour: "Riduci Luminosità Colore Attivo",
                    inactiveColour: "Colore Inattivo",
                    dimInactiveColour: "Riduci Luminosità Colore Inattivo"

                },

            },

            global: {
                areas: {
                    title: "Aree",

                    area: "Area",
                    areas: {
                        global: "Globale",
                        accent: "Accenti",
                    },

                },

                animations: {
                    title: "Animazioni",

                    mode: "Modalità Animazione",
                    modes: {
                        none: "Nessuna",
                        rainbowRetro: "Arcobaleno Retró",
                        rainbowBright: "Arcobaleno Chiaro",
                        rainbowDark: "Arcobaleno Scuro",
                        simple: "Semplice",
                        ripple: "Onda",
                    },

                    mod1: "Gradiente Mod 1",
                    mod2: "Gradiente Mod 2",

                    waterfall: "Impostazioni Cascata",
                    waterfallOff: "Disabilitata",
                }
            },

            mixer: {

                fader: {
                    title: "Fader",

                    style: "Stile",
                    styles: {
                        gradient: "Gradiente",
                        meter: "Meter",
                    },

                    bottomColour: "Colore Inizio",
                    topColour: "Colore Fine",

                },

                screen: {
                    title: "Schermo",
                    backgroundColour: "Colore di Sfondo",
                    icons: "Icone",
                    iconNone: "-- NESSUNA --",

                    options: {
                        showNumber: "Mostra Numbero",
                        invertDisplay: "Inverti Schermo",
                        text: "Testo",

                        accessibilityText: "Testo da mostrare sullo schermo di GoXLR"
                    }
                },

                mute: {
                    // Pretty much all other fields for this area come from 'Common'
                    title: "Muto",
                }
            },

            effects: {

                encoders: {
                    title: "Manopole",

                    encoder: "Manopola",
                    encoders: {
                        reverb: "Riverbero",
                        echo: "Eco",
                        pitch: "Tono",
                        gender: "Genere",
                    },

                    leftColour: "Colore Sinistro",
                    rightColour: "Colore Destro",
                    knobColour: "Colore Manopola"
                },

                buttons: {
                    title: "Tasti Effetto",

                    effect: {
                        megaphone: "Megafono",
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

                active: "Attivo / Caricato",
                empty: "Campione Vuoto",
            },

            cough: {

                buttons: {
                    bleep: "Bip",
                    cough: "Tosse",
                }
            },
        },

        routing: {
            // There are (frustratingly) some minor differences between how channels appear in the routing table,
            // and how they appear in the Mixer, these changes also fall under the hood at the Utility level, so
            // we'll define all the channels here, and 'fix' anything which needs adjustment.
            title: "Routing",

            input: "Ingressi",
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

            output: "Uscite",
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
                title: "Accesso di rete",
                explain: "Su un altro dispositivo della tua rete (tablet, telefono, computer), apri una volta uno di questi link. L'accesso viene poi ricordato.",
                restart: "Riavvia GoXLR Utility per raggiungerla dalla tua rete. I link appariranno poi qui.",
                noAddress: "Nessun indirizzo di rete trovato per questo computer.",
                copy: "Copia",
                copied: "Copiato",
                regenerate: "Nuovo link (i link precedenti smettono di funzionare)",
            },
            menu: {
                firmware: "Aggiornamento firmware",
            },
            firmwareUpdate: {
                noInfo: "I server di aggiornamento non hanno risposto, quindi l'ultima versione non è nota. Questo GoXLR usa la versione {currentVersion}.",
                updateTo: "Aggiorna a {version}",
                reinstall: "Reinstalla {version}",
                customButton: "Firmware personalizzato…",
                confirmTitle: "Installare il firmware?",
                confirmText: "Il GoXLR si riavvia durante l'aggiornamento. Non scollegarlo e non chiudere l'utility finché non è terminato.",
                confirmCustom: "Sceglierai poi un file firmware (.bin). Usa solo un file di cui ti fidi: un file sbagliato può rendere il GoXLR inutilizzabile. Non scollegarlo durante l'aggiornamento.",
                betaWarning: "Stai per installare una versione beta del firmware.\nQuesta versione non riceverà alcun supporto ufficiale e potrebbe contenere bug o problemi che non possiamo risolvere.",
                newVersionAvailable: "È disponibile una versione firmware più recente ({latestVersion}) per il tuo dispositivo.\nVuoi aggiornare il dispositivo ora?",
                currentVersionIsNewer: "La tua versione firmware attuale ({currentVersion}) è più recente dell'ultima versione firmware disponibile ({latestVersion}) per il tuo dispositivo.\nVuoi tornare all'ultima versione firmware disponibile?",
                currentIsUpToDate: "Il tuo firmware è già aggiornato.\nVuoi reinstallare la versione firmware attuale?",
                customFirmware: "Stai per installare un firmware personalizzato.\nNon è consigliato a meno che tu non sappia cosa stai facendo.\nConfermi di voler continuare?",
                warning: "Stai per installare una nuova versione firmware sul tuo dispositivo.\nGli sviluppatori di GoXLR Utility non sono responsabili per eventuali danni causati da questo processo. ",
                warningInfo: "Maggiori Info",
                updatePaused: "Stai per installare la versione firmware {version}. Confermi di voler continuare?",
                updateInProgress: "Aggiornamento Firmware in Corso. Attendi e non scollegare il dispositivo!",
                completed: "L'aggiornamento del firmware è stato completato con successo.",
                failed: "Qualcosa è andato storto durante l'aggiornamento del firmware. Riprova.",
                changelog: "Novità della Versione {version}:",
                title: "Installazione Firmware...",
                progress: {
                    starting: "Avvio...",
                    manifest: "Recupero Manifest...",
                    download: "Download Firmware...",
                    pause: "Aggiornamento in Pausa",
                    clearNVR: "Preparazione Partizione di Aggiornamento...",
                    uploadFirmware: "Caricamento Firmware...",
                    validateUpload: "Verifica Firmware caricato...",
                    hardwareWrite: "Scrittura Firmware...",
                    hardwareValidate: "Verifica Firmware...",
                    complete: "Aggiornamento completato",
                    failed: "Impossibile completare l'Aggiornamento Firmware",
                },
            },
            firmwareUpdateButton: {
                update: "Aggiorna Firmware",
                downgrade: "Downgrade Firmware",
                reinstall: "Reinstalla Firmware",
                custom: "Firmware Personalizzato",
            },
            title: "Sistema",

            powerButton: "Azione Alimentazione",
            power: {
                shutdownTitle: "Azioni di Spegnimento",
                shutdownDescription: "Queste azioni verranno eseguite quando GoXLR Utility viene chiusa in maniera pulita.",

                sleepTitle: "Azioni Modalità Riposo",
                sleepDescription: "Queste azioni verranno eseguite quando il computer va in Modalità Riposo.",

                wakeTitle: "Azioni di Risveglio",
                wakeDescription: "Queste azioni verranno eseguite quando il computer si risveglia dalla Modalità Riposo",

                settingsError: "Sembra che la Configurazione sia stata modificata manualmente. Al fine di evitare comportamenti inattesi, questa sezione è stata disabilitata. Per resettare completamente le Azioni di Spegnimento, premi il tasto qui sotto",
                settingsReset: "Resetta Azioni di Spegnimento",

                power_options: {
                    reload: "Ricarica Impostazioni",
                    saveProfile: "Salva Profilo",
                    loadProfile: "Carica Profilo Completo",
                    loadColourProfile: "Carica Colori Profilo",
                    saveMicProfile: "Salva Profilo Microfono",
                    loadMicProfile: "Carica Profilo Microfono",
                }
            },

            deviceButton: "Impostazioni Dispositivo",
            device: {
                samplerFadeDuration: "Durata Sfumatura Campionatore",
                samplerFadeDurationAccessibility: "La durata in millisecondi della sfumatura in uscita del campionatore quando la riproduzione viene interrotta",
                holdDuration: "Durata pressione Tasto Muto per mutare verso Tutti",
                holdDurationAccessibility: "La durata in millisecondi per cui bisogna tenere premuto il tasto Muto per mutare verso tutti i canali",

                sampleBuffer: "Buffer di pre-registrazione del Campionatore (in secondi)",
                sampleBufferAccessibility: "La durata in secondi che il Campionatore registerà prima che il tasto venga premuto.",

                voiceDeafen: "Muta verso Tutti su Chat Vocale muta anche Mic verso Mic Chat",
                voiceDeafenAccessibility: "Quando muti Chat Vocale verso tutti i canali, muta anche Mic verso Mic Chat",

                monitorWithFx: "Attiva/Disattiva monitoraggio microfono con tasto FX",
                monitorWithFxAccessibility: "Attiva monitoraggio microfono quando FX è attivo",

                resetSampleFunctionOnClear: "Resetta Funzione Campionatore al Cancellamento",
                resetSampleFunctionOnClearAccessibility: "Resetta il Campionatore a Inizia Riproduzione / Prossimo Campione al Cancellamento",

                lockFaders: "Blocca posizioni fader quando Muta verso Tutti viene attivato",
                lockFadersAccessibility: "Disabilita il movimento dei fader quando viene attivato Muta verso Tutti",
            },

            settingsButton: "Impostazioni Utility",
            settings: {
                shutdownConfirmTitle: "Sei Sicuro?",
                shutdownConfirmMessage: "Confermi di voler chiudere GoXLR Utility?",
                settingsRegionAccessibility: "impostazioni",
                macosAggregateManagement: "Disabilita Gestione Dispositivi Aggregati su MacOS (richiede il riavvio)",
                macosAggregateManagementAccessibility: "Disabilita la gestione dei dispositivi aggregati da parte dell'Utility su MacOS (richiede il riavvio)",
                firmwareSource: "Canale Aggiornamenti Firmware",
                firmwareSources: {
                    live: "Stabile",
                    beta: "Beta",
                },
                language: "Lingua",
                useSystem: "Usa Lingua di Sistema (se disponibile)",

                uiHandler: "Gestore UI",
                uiHandlers: {
                    browser: "Browser",
                    app: "App",
                    custom: "Personalizzato"
                },


                logLevel: "Livelli di Log (richiede il riavvio)",
                logLevels: {
                    off: "Disabilitato",
                    error: "Errori",
                    warn: "Avvisi",
                    info: "Info",
                    debug: "Debug",
                    trace: "Traccia"

                    // OFF / ERROR / WARN / INFO / DEBUG / TRACE
                },

                allowNetworkAccess: "Consenti accesso di Rete all'UI (richiede il riavvio)",
                allowNetworkAccessAccessibility: "Consente di accedere all'interfaccia utente tramite altri dispositivi sulla rete locale",

                autoStart: "Avvio automatico al Login",
                autoStartAccessibility: "Avvia GoXLR Utility quando l'utente esegue l'accesso",

                showOnLaunch: "Mostra l'UI al Avvio",
                showOnLaunchAccessibility: "Mostra l'UI all'avvio automaticamente",

                showTray: "Mostra icona Barra di Sistema (richiede il riavvio)",
                showTrayAccessibility: "Mostra l'icona di GoXLR Utility nella Barra di Sistema",

                ttsOnButton: "Sintesi Vocale alla pressione dei tasti",
                ttsOnButtonAccessibility: "Sintesi Vocale dello stato dei tasti quando premuti, tramite screen reader o TTS di sistema",

                recoverDefaults: "Ripristina Predefiniti",
                recoverOptions: {
                    profiles: "Profili",
                    micProfiles: "Profili Microfono",
                    icons: "Icone",
                    presets: "Preset"
                },

                shutdownUtility: "Chiudi GoXLR Utility"
            },

            aboutButton: "Informazioni GoXLR",
            about: {
                serial: "Seriale",
                utilityVersion: "Versione Utility",
                driverVersion: "Versione Driver",
                hardwareVersion: "Versione Hardware",

                firmware: "Firmware",
                dice: "DICE",
                fpga: "FPGA"
            },

            licenses: "Licenze",
            help: "Aiuto",
        },

        // Strings used in Profile and Microphone Profile Management.
        profileManager: {
            trashTitle: "Profili eliminati",
            trashEmpty: "Nessun profilo eliminato. I profili eliminati vengono conservati qui per 30 giorni.",
            trashProfile: "Profilo",
            trashMic: "Profilo mic",
            // Accessibility Titles for the buttons at the bottom of the Profile List
            saveProfileName: "Salva Profilo {profileName}",
            createProfile: "Crea Profilo",

            // Dialog Popup when clicking 'Create Profile' Button
            newTitle: "Origine del Nuovo Profilo",
            newQuestion: "Vuoi creare un nuovo profilo da quello predefinito o dalle impostazioni correnti?",
            newDefaultButton: "Predefinito",
            newCurrentButton: "Impostazioni Correnti",
            newCancelButton: "@:message.modalButtons.cancel",

            // Dialog Popup when hitting the 'Save Profile' button
            overwriteTitle: "Conferma di Sovrascrizione",
            overwriteQuestion: "Confermi di voler sovrascrivere il profilo {activeProfile}?",
            overwriteYes: "@:message.modalButtons.yes",
            overwriteNo: "@:message.modalButtons.no",

            // Dialog Popup when clicking the 'Delete' Menu Item
            deleteTitle: "Conferma di Eliminazione",
            deleteQuestion: "Confermi di voler eliminare il profilo {profileName}?",
            deleteYes: "@:message.modalButtons.yes",
            deleteNo: "@:message.modalButtons.no",

            // Dialog prompting for a new Profile Name
            newNameTitle: "inserisci Nuovo Nome Profilo",
            newNamePlaceHolder: "Nuovo Nome",
            newNameOk: "@:message.modalButtons.ok",
            newNameCancel: "@:message.modalButtons.cancel",

            // Dialog Popup when attempting to delete the active profile
            deleteCurrentErrorTitle: "Impossibile Eliminare",
            deleteCurrentErrorMessage: "Non è possibile eliminare il profilo attivo.",

            // Items in the Popup Menu on Profiles
            menuLoadProfile: "Carica Profilo",
            menuLoadProfileColours: "Carica Solo i Colori",
            menuDeleteProfile: "Elimina Profilo",


            // Accessibility Messages (these are announced to screen readers)
            accessibilityLoadedProfile: "Il profilo {profileName} è stato caricato",
            accessibilityLoadedColours: "I colori del profilo {profileName} sono stati caricati",
            accessibilityCreatedProfile: "Il profilo {profileName} è stato creato",
            accessibilitySavedProfile: "Il profilo {profileName} è stato salvato",
            accessibilitySavedProfileAs: "Il profilo {profileName} è stato salvato con nome {newProfileName}",
            accessibilityProfileDeleted: "Il profilo {profileName} è stato eliminato",
            accessibilityDropMenuTitle: "Opzioni per {profileName}",
            accessibilityOpenProfileDirectory: "Apri Cartella Profili",
            accessibilityOpenMicProfileDirectory: "Apri Cartella Profili Microfono",
        },
    }
}
