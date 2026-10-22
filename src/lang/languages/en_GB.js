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
/// FrostyCoolSlug
///


export default {
    message: {
        brand: {
            unofficial: "unofficial",
        },
        scenes: {
            title: "Scenes",
            runHint: "Apply the scene {name} (volumes, mutes, routing, effects)",
            update: "Replace {name} with the current settings",
            delete: "Delete the scene {name}",
            empty: "Save the current volumes, mutes, routing and effects to bring them back in one click.",
            new: "New scene from the current settings…",
            newTitle: "New scene",
            create: "Create",
            saved: "Scene {name} saved",
            ran: "Scene {name} applied",
            deleted: "Scene {name} deleted",
            updateTitle: "Replace {name}?",
            updateQuestion: "The scene {name} will hold the current volumes, mutes, routing and effects instead of its own.",
            updateYes: "Replace",
            deleteTitle: "Delete {name}?",
            deleteQuestion: "The scene {name} will be deleted. This can't be undone.",
            deleteYes: "Delete",
        },
        integrations: {
            title: "Integrations",
            intro: "Stream Deck, OBS, Touch Portal or your own scripts can control the GoXLR through the app's HTTP API, the same one this interface uses.",
            commandUrl: "Send a command",
            statusUrl: "Read the full status",
            websocketUrl: "Follow changes (WebSocket)",
            format: "A command is a JSON object whose \"Command\" entry holds the device's serial and the command, as in the examples below. The names and arguments are those of GoXLRCommand in the app's source (ipc/src/lib.rs).",
            examples: "Examples for this device",
            copyCurl: "Copy curl",
            copyJson: "Copy JSON",
            more: "From another computer, network access must be on and the link must carry the access token (see Network access above).",
            networkTitle: "Network access",
            exampleMicMute: "Mute the microphone",
            exampleVolume: "Set the Music volume to half",
            exampleProfile: "Load the profile {name}",
            exampleScene: "Apply the scene {name}",
            copyFailed: "Unable to copy to the clipboard",
            recordTitle: "Any control as an API command",
            recordIntro: "Turn recording on, then use the control you want (a fader, a button, an effect): the command it sent appears here, ready to copy. Recording stops when the interface is closed.",
            record: "Record the commands sent by this interface",
            recordEmpty: "Nothing yet: change something in the interface.",
            clear: "Clear",
            schemaTitle: "Schema",
            schemaIntro: "Every command and its arguments, as a JSON Schema (for editors and code generators).",
            schemaUrl: "JSON Schema of the requests",
        },
        setupWizard: {
            menu: "Setup assistant",
            title: "Getting started ({step} of {count})",
            micTitle: "Your microphone",
            micText: "Choose the type of microphone, then raise the gain until your normal voice reaches the middle of the meter, without going into the red.",
            routingTitle: "Where the sound goes",
            routingText: "The GoXLR adds audio devices to the computer. Send each app to its own device to control it with the faders:",
            openRouting: "Open the routing table",
            saveTitle: "Keep these settings",
            saveText: "Save the profile and the mic profile: they're loaded again each time the GoXLR starts.",
            saveButton: "Save the profile and the mic profile",
            skip: "Don't show again",
            back: "Back",
            next: "Next",
            finish: "Finish",
        },
        micMute: {
            mute: "Mute mic",
            muted: "Mic muted",
            hint: "Mutes the microphone like the device's Mute button (M)",
            holdMode: "The Mute button is in Hold mode: it only mutes while held on the device",
        },
        shortcuts: {
            undo: "Undo the last change (volumes, mutes, routing, equaliser, colours)",
            undone: "Change undone",
            title: "Keyboard shortcuts",
            save: "Save the profile and the mic profile",
            micMute: "Mute or unmute the microphone",
            sections: "Go to a section of the side bar",
            presets: "Effect presets 1 to 6",
            banks: "Sampler banks A, B and C",
            help: "Show these shortcuts",
        },
        // For these, the keys map directly to their GoXLR Channel Names
        channels: {
            All: "All",
            Mic: "Microphone",
            Chat: "Voice Chat",
            Music: "Music",
            Game: "Game",
            Console: "Console",
            LineIn: "Line In",
            System: "System",
            Sample: "Samples",
            LineOut: "Line Out",
            Headphones: "Headphones",
            MicMonitor: "Mic Monitor",
            StreamMix: "Stream Mix",
            StreamMix1: "Stream Mix 1",
            StreamMix2: "Stream Mix 2",
            ChatMic: "Chat Mic",
            Sampler: "Sampler",
            VOD: "VOD",
        },

        faders: {
            A: "Channel 1",
            B: "Channel 2",
            C: "Channel 3",
            D: "Channel 4"
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
            yes: "Yes",
            no: "No",
            cancel: "Cancel",
            continue: "Continue",
            close: "Close",
        },

        common: {
            close: "Close",
            lighting: "Lighting",
            clear: "Clear",
            collapseSection: "Collapse Section",
            expandSection: "Expand Section",
            activeProfile: "Active Profile",
            switchDevice: "Switch Device",
            removeSample: "Remove Sample",
            waterfallAnimationUp: "Waterfall Animation Up",
            waterfallAnimationDown: "Waterfall Animation Down",
            unknown: "Unknown",
            tabList: "Tab list",
        },

        // These Strings appear in the tabs throughout the pages
        navigation: {
            // Tabs at the top of the Page
            profiles: "Profiles",
            samples: "Samples",

            // Main Navigation Tabs
            microphone: "Mic",
            mixer: "Mixer",
            effects: "Effects",
            sampler: "Sampler",
            routing: "Routing",
            system: "System",
            library: "Library",
            application: "Application",

            // Navigation Sections on the Lighting Page

            // Accessibility Messages (these are announced to screen readers)
            accessibilityDeviceSection: "Device Settings",
        },

        // Strings that appear in the Mic tab, note that the Profile Strings are handled in 'profileManager'
        microphone: {
            chain: {
                title: "Processing chain",
                input: "Input",
                gate: "Gate",
                gateToggle: "Noise gate on",
                threshold: "Threshold",
                equaliser: "Equaliser",
                bands: "{count} bands",
                flat: "Flat",
                eqPeak: "{gain} dB at {freq}",
                compressor: "Compressor",
                compressorDetail: "Threshold {threshold} dB",
                curveHintFine: "drag a point up and down for its level, sideways for its frequency",
                fineTune: "Adjust frequencies",
                bandLabel: "Band at {freq}",
                curveHint: "drag a point to set its band",
            },
            profiles: {
                title: "Mic Profiles"
            },

            setup: {
                phantomTitle: "Switch on phantom power (+{voltage}V)?",
                phantomWarning: "Only for condenser microphones that need it. Turn your headphones and stream down first: switching it on can make a loud pop.",
                phantomEnable: "Switch on",
                button: "Mic Setup",
                title: "Mic Setup",
                type: "Mic Type",
                gain: "Gain",

                // Microphone Types
                xlr: "XLR Microphone",
                phantom: "XLR + Phantom (+{voltage}V)",
                jack: "3.5mm",
            },

            waveform: {
                loud: "Too Loud",
                good: "Good",
                gate_estimated: "Gate is Estimated"
            },

            gate: {
                title: "Gate",
                threshold: "Threshold",
                attenuation: "Attenuation",
                attack: "Attack",
                release: "Release",
            },

            equaliser: {
                resetTitle: "Reset the equaliser?",
                resetQuestion: "Every band goes back to 0 dB at its default frequency. Before / After can still bring the saved equaliser back until you save.",
                compare: "Compare with the saved equaliser",
                before: "Before",
                after: "After",
                save: "Save",
                saveHint: "Saves the equaliser in the mic profile {profile}",
                savedNotice: "Equaliser saved in the mic profile {profile}",
                title: "Equaliser",
                reset: "Reset",
            },

            compressor: {
                title: "Compressor",
                amount: "Amount",
                threshold: "Threshold",
                ratio: "Ratio",
                attack: "Attack",
                release: "Release",
                makeUpGain: "Make-Up Gain",
            },

            extras: {
                title: "Extras",
                deEsser: "De-Esser",
                bleep: "Bleep",
            }
        },

        mixer: {
            // Box Headers
            outputs: "Outputs",
            otherInputs: "Other Inputs",
            strip: {
                muteAllHint: "Right click or long press: mute for everyone",
                notMuted: "Not muted",
                mutedAll: "Muted for everyone",
                source: "Source",
                mute: "Mute",
                muteFunction: "Mute to",
                lighting: "{channel} lighting",
                lightingTitle: "Lighting · {channel}",
            },
            mixAssignment: "Mix Assignment",

            // Submix Checkbox
            submix: "Submixes",
            submixHint: "A second mix (Mix B) for every channel, faders included, to send different levels to some outputs.",

            // Mix Assignment
            channelA: "A",
            channelB: "B"
        },

        // Strings in the Configuration Tab
        configuration: {
            // This is common between Faders and Cough Buttons
            mute_behaviour: {
                base: "Mute to {channel}",
                all: "Mute to All",

            },
            muteBehaviourTitle: "Mute Behaviour",
            muteBehaviourLabel: "Mute Behaviour for {channel}",

            // Config for the Faders
            faders: {
                sourceLabel: "Source for {channel}",
            },

            // Configuration for the Cough Button
            cough: {
                lighting: "Lighting",
                lightingTitle: "Cough and Bleep lighting",
                behaviour: {
                    hold: "Hold",
                    toggle: "Toggle",
                },

                title: "Cough Button Settings",
                behaviourTitle: "Button Behaviour",
            }
        },

        effects: {
            lighting: {
                title: "Effects lighting",
                presetButton: "Preset button · {name}",
                applyPresets: "Apply to all presets",
                encoders: "Encoders",
                applyEncoders: "Apply to all encoders",
                buttons: "Effect buttons",
                applyButtons: "Apply to all effect buttons",
            },
            face: {
                label: "Effects",
                master: "Effects",
                enabled: "On",
                on: "on",
                off: "off",
                power: "Turn {effect} on or off",
            },
            preset: {
                name: "Name",
                title: "Preset",
                group: "Group",

                menuLoad: "Load",
                menuRename: "Rename",
                menuSave: "Save to Library",


                loadPreset: "Load Preset",


                noPresets: "There are currently no presets in the library, save or copy some for them to appear here.",
                loadPresetOk: "@:message.modalButtons.ok",

                confirmTitle: "Confirm Preset Load",
                confirmMessage: "Loading this preset will replace any unsaved changes on this effects bank, would you like to proceed?",
                confirmOk: "@:message.modalButtons.ok",
                confirmCancel: "@:message.modalButtons.cancel",

                overwriteTitle: "Confirm Preset Overwrite",
                overwriteMessage: "The preset {current} already exists in your library, would you like to overwrite?",
                overwriteConfirm: "Overwrite",
                overwriteCancel: "@:message.modalButtons.cancel",

                accessibilityOpenPresetDirectory: "Open Presets Directory",
                accessibilityPresetLoaded: "Preset {name} loaded to {bank}",
                accessibilityPresetSaved: "Preset {name} saved to Library",
            },
            reverb: {
                title: "Reverb",
                style: "Style",

                styles: {
                    library: "Library",
                    darkBloom: "Dark Bloom",
                    musicClub: "Music Club",
                    realPlate: "Real Plate",
                    chapel: "Chapel",
                    hockeyArena: "Hockey Arena"
                },

                amount: "Amount",
                decay: "Decay",
                earlyLevel: "Early Level",
                tailLevel: "Tail Level",
                preDelay: "Predelay",
                lowColour: "Lo Colour",
                highColour: "Hi Colour",
                highFactor: "Hi Factor",
                diffuse: "Diffuse",
                modSpeed: "ModSpeed",
                modDepth: "ModDepth"
            },

            echo: {
                title: "Echo",

                style: "Style",
                styles: {
                    quarter: "Quarter",
                    eighth: "Eighth",
                    triplet: "Triplet",
                    pingPong: "Ping Pong",
                    classicSlap: "Classic Slap",
                    multiTap: "MultiTap"
                },

                amount: "Amount",
                feedback: "Feedback",
                tempo: "Tempo",
                delayLeft: "Delay L",
                delayRight: "Delay R",
                feedbackLeft: "Feedback L",
                feedbackRight: "Feedback R",
                xfbLeftToRight: "XFB L to R",
                xfbRightToLeft: "XFB R to L",
            },

            pitch: {
                title: "Pitch",

                style: "Style",
                styles: {
                    narrow: "Narrow",
                    wide: "Wide"
                },

                amount: "Amount",
                character: "Character"
            },

            gender: {
                title: "Gender",

                style: "Style",
                styles: {
                    narrow: "Narrow",
                    medium: "Medium",
                    wide: "Wide"
                },

                amount: "Amount"
            },

            megaphone: {
                title: "Megaphone",

                style: "Style",
                styles: {
                    megaphone: "Megaphone",
                    radio: "Radio",
                    onThePhone: "On The Phone",
                    overdrive: "Overdrive",
                    buzzCutt: "Buzz Cutt",
                    tweed: "Tweed"
                },

                amount: "Amount",
                postGain: "Post Gain"
            },

            robot: {
                title: "Robot",

                style: "Style",
                styles: {
                    robot1: "Robot 1",
                    robot2: "Robot 2",
                    robot3: "Robot 3",
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
                waveform: "Waveform",
                pulseWidth: "Pulse Width",
                threshold: "Threshold",
                dryMix: "Dry Mix",
            },

            hardTune: {
                title: "Hard Tune",

                style: "Style",
                styles: {
                    natural: "Natural",
                    medium: "Medium",
                    hard: "Hard"
                },

                amount: "Amount",
                rate: "Rate",
                window: "Window",

                source: "Source"
            }
        },

        sampler: {
            lighting: {
                label: "Lighting",
                title: "Sampler lighting",
                bank: "Bank {bank} buttons",
                note: "The device sets these colours for the whole bank, all four buttons share them.",
                applyBanks: "Apply to all banks",
            },
            pads: {
                record: "Record into {button}",
                stopRecording: "Stop recording {button}",
                play: "Play {button}",
                stop: "Stop {button}",
                title: "Buttons",
                empty: "Empty",
                count: "{count} sample(s)",
                dropHere: "Drop to assign",
            },
            banks: {
                bankTitle: "Bank",
                bank: {
                    a: "A",
                    b: "B",
                    c: "C"
                },
                buttonLabel: "Button for bank {activeBank}",
                buttons: {
                    topLeft: "Top Left",
                    topRight: "Top Right",
                    bottomLeft: "Bottom Left",
                    bottomRight: "Bottom Right",
                },

                functionTitle: "Function",
                functionLabel: "Function for {activeButton} button in bank {activeBank}",
                functions: {
                    playNext: "Play / Next",
                    playStop: "Play / Stop",
                    playFade: "Play / Fade Out",
                    stopOnRelease: "Stop on Release",
                    fadeOnRelease: "Fade on Release",
                    loop: "Loop"
                },

                playOrderTitle: "Play Order",
                playOrderLabel: "Play Order for {activeButton} button in bank {activeBank}",
                playOrders: {
                    sequential: "Sequential",
                    random: "Random",
                },
            },

            samplesTitle: "Samples",
            samples: {
                samplesTitle: "Samples",
                samplesLabel: "Sample for {activeButton} button in bank {activeBank}",

                // Button at the bottom of the Sample List
                addSample: "+",
                addSampleLabel: "Add Sample",
                sampleSelector: {
                    parentDirectory: "Parent Directory",
                    addButton: "Add",

                    noSamples: "There are currently no samples in the samples folder. Copy some over so they can be selected here!",

                    // Used with Screen Readers
                    directories: "Directories",
                    samples: "Samples",
                },

                gain: "Gain",
                waveform: {
                    title: "Waveform",

                    // These are primarily for accessibility, but are labels on the various buttons.
                    text: "Waveform for {sample}",

                    // The Play / Stop button before the waveform
                    playbackSample: "Play Sample",
                    stopSample: "Stop Sample",

                    // Labels for the draggable 'Handles'
                    sampleStart: "Sample Start",
                    sampleEnd: "Sample End",

                    sampleDeleted: "Sample {sampleName} has been deleted from {activeButton} button in bank {activeBank}",
                    zoomLevel: "Zoom Level: {level}",
                },

                addSampleWaitTitle: "Please Wait",
                addSampleAnalysing: "Please wait while the sample is being analysed.",
                addSampleProgress: "Progress: {progress}@:message.suffixes.percentage",

                errorTitle: "Error Adding Sample",
                errorText: "An error occurred while adding the sample to the bank:",
                genericError: "An unknown error occurred.",

                accessibilityOpenSamplesDirectory: "Open Samples Directory",
                accessibilityAnalysing: "Please wait, analysing sample. This process may take a couple of minutes.",
                accessibilityAdded: "Sample {name} added to {activeButton} button in bank {activeBank}."
            }
        },

        lighting: {
            channel: {
                applyFaders: "Apply to all faders",
                applyMutes: "Apply to all mute buttons",
                openIcons: "Open the icons folder",
                display: "Display",
                preview: "Preview",
                previewFader: "fader",
                previewMeter: "meter",
                hintTwoColour: "Below the fader: bottom colour. Above it: top colour.",
                hintGradient: "Below the fader: a blend from the bottom to the top colour. Above it: off.",
                hintMeter: "The LEDs follow the channel's sound level rather than the fader position.",
                hintGradientMeter: "The LEDs follow the channel's sound level, blending from the bottom to the top colour.",
                previewScreen: "screen",
                previewActive: "active",
                previewMute: "MUTE",
                previewRest: "at rest",
            },
            // These are some common strings that are used in multiple places
            common: {

                activeColour: "Active",

                inactiveOption: "Inactive Option",
                inactiveOptions: {
                    dimActiveColour: "Dim Active Colour",
                    inactiveColour: "Inactive Colour",
                    dimInactiveColour: "Dim Inactive Colour"

                },

                pickColour: "pick a colour",
                restLabel: "At rest",
                restColour: "Rest colour",
                restDimmedHint: "The button shows its active colour, dimmed: no colour to pick.",
                brightness: "Brightness",
            },

            global: {
                areas: {
                    title: "Areas",

                    area: "Area",
                    areas: {
                        global: "Global",
                        accent: "Accent",
                    },

                },

                animations: {
                    title: "Animations",

                    mode: "Animation Mode",
                    modes: {
                        none: "None",
                        rainbowRetro: "Rainbow Retro",
                        rainbowBright: "Rainbow Bright",
                        rainbowDark: "Rainbow Dark",
                        simple: "Simple",
                        ripple: "Ripple",
                    },

                    mod1: "Gradient Mod 1",
                    mod2: "Gradient Mod 2",

                    waterfall: "Waterfall Settings",
                    waterfallOff: "Off",
                }
            },

            mixer: {

                fader: {
                    title: "Fader",

                    style: "Style",
                    styles: {
                        gradient: "Gradient",
                        meter: "Meter",
                    },

                    bottomColour: "Bottom Colour",
                    topColour: "Top Colour",

                },

                screen: {
                    title: "Screen",
                    backgroundColour: "Background Colour",
                    icons: "Icons",
                    iconNone: "-- NONE --",

                    options: {
                        showNumber: "Show Number",
                        invertDisplay: "Invert Display",
                        text: "Text",

                        accessibilityText: "Text to display on the GoXLR screen"
                    }
                },

                mute: {
                    // Pretty much all other fields for this area come from 'Common'
                    title: "Mute",
                }
            },

            effects: {

                encoders: {
                    title: "Encoders",

                    encoder: "Encoder",
                    encoders: {
                        reverb: "Reverb",
                        echo: "Echo",
                        pitch: "Pitch",
                        gender: "Gender",
                    },

                    leftColour: "Left Colour",
                    rightColour: "Right Colour",
                    knobColour: "Knob Colour"
                },

                buttons: {
                    title: "Effect Buttons",

                    effect: {
                        megaphone: "Megaphone",
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

                active: "Active / Loaded",
                empty: "Sample Empty",
            },

            cough: {

                buttons: {
                    bleep: "Bleep",
                    cough: "Cough",
                }
            },
        },

        routing: {
            cellLabel: "{input} to {output}",
            help: {
                title: "Where to send your apps",
                obs: "OBS: capture the \"Broadcast Stream Mix\" device, it's what your stream hears.",
                discord: "Discord: use \"Chat Mic\" as the input device and \"Chat\" as the output device.",
                apps: "Games on \"Game\", music on \"Music\", everything else on \"System\": each gets its own fader and routing.",
                hover: "Hover a row or column name to see what it is.",
                chatLoop: "Voice chat can't go back to the Chat Mic, the people you talk to would hear themselves.",
                inputs: {
                    Microphone: "Your microphone, after its processing (gate, equaliser, compressor, effects).",
                    Chat: "The \"Chat\" audio device of the computer: set it as the output of Discord or other voice chat apps.",
                    Music: "The \"Music\" audio device: set it as the output of your music player.",
                    Game: "The \"Game\" audio device: set it as the output of your games.",
                    Console: "The console input on the back of the GoXLR.",
                    LineIn: "The line input on the back of the GoXLR.",
                    System: "The \"System\" audio device: the computer's default output (notifications, browser…).",
                    Samples: "The sounds played by the sampler.",
                },
                outputs: {
                    Headphones: "What you hear in your headphones.",
                    BroadcastMix: "The \"Broadcast Stream Mix\" device: what your stream or recording hears (capture it in OBS).",
                    StreamMix2: "A second stream mix, for example for a VOD track without music.",
                    ChatMic: "The \"Chat Mic\" device: what the people in voice chat hear (set it as the input of Discord).",
                    Sampler: "What the sampler records when you hold an empty pad.",
                    LineOut: "The line output on the back of the GoXLR.",
                },
            },
            // There are (frustratingly) some minor differences between how channels appear in the routing table,
            // and how they appear in the Mixer, these changes also fall under the hood at the Utility level, so
            // we'll define all the channels here, and 'fix' anything which needs adjustment.
            title: "Routing",

            input: "Inputs",
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

            output: "Outputs",
            outputs: {
                Headphones: "@:message.channels.Headphones",
                BroadcastMix: "@:message.channels.StreamMix",
                StreamMix2: "@:message.channels.StreamMix2",
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
                    intro: "How the app starts, shows itself and updates. These settings apply to every device.",
                    startup: "Startup and display",
                    accessibility: "Accessibility",
                    updates: "Updates and diagnostics",
                    reset: "Reset",
                    autoStartHelp: "The app starts when you log in.",
                    showOnLaunchHelp: "Otherwise the app starts quietly in the system tray.",
                    showTray: "System tray icon",
                    showTrayHelp: "Quick access to profiles, mic mute and the interface.",
                    uiHandlerHelp: "The desktop app, or the default browser.",
                    ttsHelp: "A voice reads the action when a GoXLR button is pressed.",
                    firmwareSourceHelp: "Stable for everyone, Beta to try what's new.",
                    logLevel: "Log level",
                    logLevelHelp: "More detail helps to diagnose a problem.",
                    openLogs: "Open the logs",
                    downloadHelp: "Settings, profiles, mic profiles, presets and icons, in a .zip.",
                    downloadButton: "Download",
                    restoreHelp: "Replaced files are kept aside first; this computer's folders and network access are kept.",
                    restoreButton: "Choose a .zip…",
                    history: "Profile history",
                    historyHelp: "Each saved profile keeps its last 20 versions in the backups folder.",
                    recoverHelp: "Puts back the ones shipped with the app that are missing. Your files aren't changed.",
                    shutdownHelp: "The GoXLR keeps its current state until the next start."
                },
                device: {
                    intro: "How this GoXLR reacts to its buttons and sampler. Saved for this device ({serial}).",
                    mute: "Mute",
                    mic: "Microphone",
                    sampler: "Sampler",
                    hold: "Hold to mute everything",
                    holdHelp: "Holding a mute button this long mutes the channel everywhere.",
                    voiceDeafen: "Muting voice chat also mutes the mic to chat",
                    voiceDeafenHelp: "So you aren't heard while you aren't listening.",
                    lockFaders: "Lock the faders while everything is muted",
                    lockFadersHelp: "The motorised faders stay put while everything is muted.",
                    monitorWithFx: "Mic monitoring with effects",
                    monitorWithFxHelp: "Hear your voice in the headphones with the effects applied.",
                    preRecord: "Pre-record",
                    preRecordHelp: "A recording starts this many seconds before the press. 0 to turn it off.",
                    fade: "Fade duration",
                    fadeHelp: "For the playback modes that fade.",
                    resetOnClear: "Reset the playback mode when a button is cleared",
                    resetOnClearHelp: "Otherwise the button keeps its mode and play order.",
                    vodLabel: "{channel} behaviour",
                    vodDescription: "Sets what the {channel} channel carries",
                    vodRoutable: "Routable",
                    vodStreamNoMusic: "Stream Mix (No Music)",
                },
                power: {
                    intro: "What the app does by itself when it stops, when the computer goes to sleep and when it wakes up. The list on the right is only active when the action is on."
                },
                firmware: {
                    intro: "The GoXLR's own software. The channel (Stable or Beta) is chosen in the app settings.",
                    state: {
                        current: "Your firmware is up to date",
                        outdated: "An update is available",
                        newer: "Your firmware is newer than the latest release",
                        unknown: "No update information yet"
                    },
                    full: "GoXLR",
                    mini: "GoXLR Mini",
                    installed: "Installed",
                    latest: "Latest version",
                    channel: "Channel",
                    hintUpdate: "Don't unplug the GoXLR during the update.",
                    hintDowngrade: "This GoXLR has a newer version than the latest published one: installing it goes back to an older version.",
                    hintReinstall: "Nothing to install. You can reinstall the same version if the device misbehaves."
                },
                integrations: {
                    allowNetwork: "Allow other devices",
                    managedHere: "Managed on the computer the app runs on: open this page there to turn it on or off, or change the link.",
                    allowNetworkHelp: "A tablet, a phone or another PC on your network.",
                    api: "The API"
                },
                about: {
                    intro: "The versions to give when asking for help.",
                    device: "Device",
                    software: "Software",
                    origin: "Unofficial and open source, derived from GoXLR Utility (GoXLR-on-Linux), MIT licence. Not affiliated with TC-Helicon.",
                    utility: "GoXLR Desk",
                    driver: "Driver",
                    shareHint: "This information in one click, for a bug report or a request for help.",
                    copy: "Copy the versions"
                },
                licences: {
                    intro: "The app and what it uses, with their licence. Click to read the full text."
                }
            },
            backup: {
                title: "Backup",
                withSamples: "Include the samples",
                download: "Download a backup",
                restore: "Restore a backup",
                confirmTitle: "Restore this backup?",
                confirmMessage: "Settings, profiles, mic profiles, presets, icons and samples from {name} will be restored. Files that would be replaced are first copied to the backups folder; this computer's folders and network access are kept.",
                restored: "Backup restored: {added} added, {replaced} replaced, {unchanged} unchanged",
                openFolder: "Open the backups folder",
                history: "Each saved profile keeps its last 20 versions in the backups folder (history).",
            },
            networkAccess: {
                restartNow: "Restart the app now",
                restarting: "The app is restarting, the interface reconnects by itself.",
                qr: "QR code",
                qrAlt: "QR code to open {url}",
                title: "Network access",
                explain: "On another device of your network (tablet, phone, computer), open one of these links once. It remembers the access afterwards.",
                restart: "Restart GoXLR Desk to reach it from your network. The links will then show here.",
                noAddress: "No network address was found for this computer.",
                copy: "Copy",
                copied: "Copied",
                regenerate: "New link (the previous links stop working)",
                regenerateConfirm: "Click again: the current links will stop working",
            },
            title: "System",
            menu: {
                firmware: "Firmware update",
            },

            powerButton: "Power Action",
            power: {
                missing: "{name} (not found)",
                shutdownTitle: "Shutdown Actions",
                shutdownDescription: "These actions will be executed when GoXLR Desk is safely shut down.",

                sleepTitle: "Sleep Actions",
                sleepDescription: "These actions will be executed when your system is going to Sleep.",

                wakeTitle: "Wake Actions",
                wakeDescription: "These actions will be executed when your system wakes from Sleep",

                settingsError: "The Configuration appears to have been manually modified. In order to prevent unexpected behaviours, this section has been disabled. To completely reset the shutdown actions, press the button below",
                settingsReset: "Reset Shutdown Actions",

                power_options: {
                    reload: "Reload Settings",
                    saveProfile: "Save Profile",
                    loadProfile: "Load Full Profile",
                    loadColourProfile: "Load Profile Colours",
                    saveMicProfile: "Save Mic Profile",
                    loadMicProfile: "Load Mic Profile",
                }
            },

            deviceButton: "Device Settings",
            device: {
                holdDuration: "Mute Button Hold to Mute All Duration",
                holdDurationAccessibility: "The duration in milliseconds that the mute button must be held to mute to all channels",

                sampleBuffer: "Sampler Pre-Record Buffer (in seconds)",
                sampleBufferAccessibility: "The duration in seconds that the sampler will record before the button is pressed",

                voiceDeafen: "Voice Chat Mute All also mutes Mic to Chat Mic",
                voiceDeafenAccessibility: "When muting Voice Chat to all channels, also mute the mic to chat mic",

                monitorWithFx: "Toggle Mic Monitoring with FX state",
                monitorWithFxAccessibility: "Activates Mic Monitoring when FX is enabled",

                resetSampleFunctionOnClear: "Reset Sample Function on Clear",
                resetSampleFunctionOnClearAccessibility: "Resets the Sample function to Start / Next when Cleared",

                lockFaders: "Lock fader positions when Muting to All",
                lockFadersAccessibility: "Prevents the faders from moving down when Mute to All is active",

                samplerFadeDuration: "Sampler Fade Duration",
                samplerFadeDurationAccessibility: "The duration in milliseconds that the sampler will fade out when playback is stopped",
            },

            settingsButton: "App Settings",
            settings: {
                restartPill: "restart",
                recoverConfirmTitle: "Restore default files?",
                recoverConfirmMessage: "The default {type} that are missing will be added back. Existing files are not changed.",
                recoverConfirmOk: "Restore",
                recoverDone: "Default {type} restored",
                language: "Language",
                useSystem: "Use System Language (if available)",

                uiHandler: "UI Handler",
                uiHandlers: {
                    browser: "Browser",
                    app: "App",
                    custom: "Custom"
                },


                logLevel: "Log Level (requires restart)",
                logLevels: {
                    off: "Off",
                    error: "Error",
                    warn: "Warn",
                    info: "Info",
                    debug: "Debug",
                    trace: "Trace"

                    // OFF / ERROR / WARN / INFO / DEBUG / TRACE
                },

                firmwareSource: "Firmware Update Channel",
                firmwareSources: {
                    live: "Live",
                    beta: "Beta"
                },

                allowNetworkAccess: "Allow UI Network Access (requires restart)",
                allowNetworkAccessAccessibility: "Allow the UI to be accessed from other devices on the network",

                autoStart: "AutoStart on Login",
                autoStartAccessibility: "Start GoXLR Desk when the user logs in",

                showOnLaunch: "Show UI on Launch",
                showOnLaunchAccessibility: "Automatically launches the UI on startup",

                showTray: "Show Tray Icon (requires restart)",
                showTrayAccessibility: "Show GoXLR Desk icon in the system tray",

                ttsOnButton: "TTS on button press",
                ttsOnButtonAccessibility: "Speak the button status when pressed, either via screen reader or system TTS",

                recoverDefaults: "Recover Defaults",
                recoverOptions: {
                    profiles: "Profiles",
                    micProfiles: "Mic Profiles",
                    icons: "Icons",
                    presets: "Presets"
                },

                shutdownUtility: "Shut down GoXLR Desk",

                shutdownConfirmTitle: "Are you Sure?",
                shutdownConfirmMessage: "Are you sure you want to Shutdown GoXLR Desk?",

                settingsRegionAccessibility: "settings",

                macosAggregateManagement: "Disable MacOS Aggregate Management (requires restart)",
                macosAggregateManagementAccessibility: "Disable Aggregate Management on MacOS (requires restart)",
            },

            aboutButton: "About GoXLR",
            about: {
                serial: "Serial",
                utilityVersion: "GoXLR Desk version",
                driverVersion: "Driver Version",
                hardwareVersion: "Hardware Version",

                firmware: "Firmware",
                dice: "DICE",
                fpga: "FPGA",
            },

            firmwareUpdateButton: {
                update: "Update Firmware",
                downgrade: "Downgrade Firmware",
                reinstall: "Re-Install Firmware",
                custom: "Custom Firmware",
            },
            firmwareUpdate: {
                seeLogs: "The app's logs have the details (System, App settings, Open logs).",
                noInfo: "The update servers didn't answer, so the latest version isn't known. This GoXLR runs {currentVersion}.",
                updateTo: "Update to {version}",
                downgradeTo: "Go back to {version}",
                confirmDowngrade: "{current} is installed: {version} is an older version.",
                reinstall: "Reinstall {version}",
                customButton: "Custom firmware…",
                confirmTitle: "Flash the firmware?",
                confirmText: "The GoXLR restarts during the update. Don't unplug it or close the app until it's done.",
                confirmCustom: "You'll pick a firmware file (.bin) next. Only use a file you trust: a wrong file can leave the GoXLR unusable. Don't unplug it during the update.",
                newVersionAvailable: "A newer firmware version ({latestVersion}) is available for your device.\nDo you want to update device now?",
                currentVersionIsNewer: "Your current firmware version ({currentVersion}) is newer than the latest available firmware version ({latestVersion}) for your device.\nDo you want to downgrade to the latest firmware version?",
                currentIsUpToDate: "Your firmware is already up to date.\nDo you want to reinstall the current firmware version?",
                customFirmware: "You are about to install a custom firmware.\nThis is not recommended unless you know what you are doing.\nAre you sure you want to continue?",

                warning: "You are about to flash a new firmware version to your device.\nThe developers of GoXLR Desk are not responsible for any damage that can be caused by this process. ",
                warningInfo: "More Info",

                betaWarning: "You are about to install a beta firmware version.\nThis version will not receive any official support and may contain bugs or issues that we cannot fix.",

                updatePaused: "You are about to install firmware version {version}. Are you sure you want to continue?",
                updateInProgress: "Firmware Update in Progress. Please wait and do not disconnect your device!",
                completed: "The firmware update has completed successfully.",
                failed: "Something went wrong during the firmware update. Please try again.",

                changelog: "Version {version} Changelog:",
                title: "Installing Firmware...",

                progress: {
                    starting: "Starting...",
                    manifest: "Fetching Manifest...",
                    download: "Downloading Firmware...",
                    pause: "Update Paused",
                    clearNVR: "Preparing Update Partition...",
                    uploadFirmware: "Uploading Firmware...",
                    validateUpload: "Validating uploaded Firmware...",
                    hardwareWrite: "Writing Firmware...",
                    hardwareValidate: "Validating Firmware...",
                    complete: "Update complete",
                    failed: "Failed to complete Firmware Update",
                }
            },

            licenses: "Licenses",
            help: "Help",
        },

        deviceSelector: {
            deviceLabel: "{model} · {serial}",
            helpCable: "Check that the GoXLR is switched on and its USB cable is plugged in (try another USB port, preferably on the back of the computer).",
            helpLinux: "On Linux, the udev rules (50-goxlr.rules) must be installed in /etc/udev/rules.d, then reload them (udevadm control --reload) and unplug and replug the GoXLR.",
            helpWindows: "On Windows, the GoXLR driver from TC-Helicon must be installed; restart the computer after installing it.",
            helpMacos: "On macOS, connect the GoXLR directly rather than through a hub, and allow the app if the system asks for it.",
            reconnecting: "Connection to GoXLR Desk lost, reconnecting…",
            title: "Select Device",
            connecting: "Attempting to Connect to GoXLR Desk..",
            disconnected: "Unable to connect to GoXLR Desk, please check it's running.\n\nThis page will automatically try to reconnect..",
            noDevices: "No GoXLR Devices Found",
        },

        versionCheck: {
            updateAvailable: "Update Available",
            firmwareDirectionAvailable: "Firmware {direction} Available",
            firmwareDirections: {
                update: "Update",
                downgrade: "Downgrade",
                unknown: "UNKNOWN",
            },
            incompatibleDriver: "The installed drivers are incompatible with this firmware, click here to download the latest driver.",
        },

        // Strings used in Profile and Microphone Profile Management.
        theme: {
            label: "Colour theme",
            dark: "Dark",
            light: "Light",
            system: "Auto",
        },
        topBar: {
            unsaved: "Unsaved changes",
            revert: "Revert to the saved version",
            saveBothHint: "Save the profile {profile} and the mic profile {mic} (Ctrl+S)",
            saveMore: "More save options",
            saveProfileOnly: "Save the profile {profile} only",
            saveMicOnly: "Save the mic profile {mic} only",
            savedBoth: "Profile {profile} and mic profile {mic} saved",
            savedProfile: "Profile {profile} saved",
            savedMic: "Mic profile {mic} saved",
            loadTitle: "Load {name}?",
            loadQuestion: "Settings of {current} that weren't saved will be lost.",
            loadMicQuestion: "Settings of the mic profile {current} that weren't saved will be lost.",
            load: "Load",
            saveThenLoad: "Save, then load",
            createTitle: "Create {name}?",
            create: "Create",
            saveThenCreate: "Save, then create",
            lighting: "Global lighting",
            lightingTitle: "Global lighting",
            profile: "Profile",
            profileLabel: "Active profile",
            micProfile: "Mic",
            micProfileLabel: "Active mic profile",
            save: "Save",
            showDevice: "Show the GoXLR",
            hideDevice: "Hide the GoXLR",
        },
        sampleAssign: {
            title: "Assign to {bank} · {button}",
            bank: "Bank",
            empty: "This button has no samples yet.",
            current: "This button already has {count} sample(s):",
            add: "Add",
            replace: "Replace",
            removing: "Removing the current samples…",
            adding: "Adding {index} of {total}: {name}…",
            done: "{count} sample(s) assigned to {bank} · {button}",
            timeoutRemove: "The daemon took too long to remove the current samples",
            timeout: "{name}: the daemon took too long to add this sample",
        },
        sampleManager: {
            newFolder: "New Folder",
            openFolder: "Open the Samples Folder",
            rename: "Rename",
            renameFolder: "Rename Folder",
            renameFolderLabel: "Rename the {name} folder",
            renameSample: "Rename Sample",
            moveTo: "Move to...",
            moveTitle: "Move {name}",
            moveDestination: "Destination folder",
            rootFolder: "(Samples folder)",
            move: "Move",
            namePlaceholder: "Name",
            extensionKept: "The {extension} extension is kept.",
            invalidName: "A name can't contain / or \\.",
            ok: "OK",
            cancel: "Cancel",
            edit: "Edit",
            listen: "Listen",
            playPreview: "Play {name}",
            stopPreview: "Stop {name}",
            delete: "Delete",
            deleteFolderLabel: "Delete the {name} folder",
            deleteSampleTitle: "Delete Sample",
            deleteSampleQuestion: "Move {name} to the trash?",
            deleteFolderTitle: "Delete Folder",
            deleteFolderQuestion: "Move the {name} folder and the {count} sample(s) it contains to the trash?",
            deleteEmptyFolderQuestion: "Move the empty {name} folder to the trash?",
            usedByProfiles: "Used by these profiles:",
            usedByProfilesHint: "The sampler buttons using it won't play anything any more.",
            editTitle: "Edit {name}",
            editHelp: "Drag on the waveform to select a part, then keep it (crop) or remove it. Removed parts are shown in red.",
            originalLength: "Length: {length}",
            resultLength: "After editing: {length}",
            selectionRange: "Selection: {start} - {end}",
            playSelection: "Play Selection",
            playResult: "Play Result",
            stop: "Stop",
            keepSelection: "Keep Selection",
            removeSelection: "Remove Selection",
            undo: "Undo",
            saveAs: "Save",
            replaceFile: "Replace the file",
            convertedToWav: "It will be saved as a WAV file: {name}",
            saveCopy: "Save as a new file",
            copyName: "New file name",
            copyHint: "Saved as a WAV file in the same folder.",
            copySuffix: "(edited)",
            save: "Save",
            saving: "Saving...",
            nothingLeft: "That would remove all of the audio.",
            breadcrumb: "Current folder",
            rootName: "Samples",
            search: "Search",
            selectedCount: "{count} selected",
            selectAll: "Select All",
            done: "Done",
            selectSample: "Select {name}",
            usedByActiveProfile: "Used by the current profile",
            sizeKb: "{size} KB",
            sizeMb: "{size} MB",
            noResults: "No sample matches this search.",
            emptyFolder: "This folder is empty.",
            dropHint: "Drop audio files here to import them into this folder.",
            duplicate: "Duplicate",
            import: "Import Samples",
            importing: "Importing...",
            multiSelect: "Select Several",
            trash: "Trash",
            trashCount: "Trash ({count})",
            moveManyTitle: "Move {count} samples",
            deleteSamplesQuestion: "Move these {count} samples to the trash?",
            trashHint: "It can be restored from the trash for 30 days.",
            moveToTrash: "Move to Trash",
            trashEmpty: "The trash is empty.",
            folderCount: "{count} sample(s)",
            restore: "Restore",
            deleteForever: "Delete",
            deleteForeverConfirm: "Click again to delete",
            trashRetention: "Items are deleted for good after 30 days.",
            emptyTrash: "Empty the Trash",
            emptyTrashConfirm: "Click again to delete everything",
            close: "Close",
            trimSilence: "Trim Silence",
            normalize: "Normalize the volume (loudest peak at -1dB)",
            onlySilence: "This sample is silent.",
            noSilence: "There's no silence to trim at the start or the end.",
            errorTitle: "Unable to complete this action",
        },

        profileManager: {
            export: "Export",
            import: "Import profile files",
            imported: "Profile files imported: {count}",
            menuRename: "Rename",
            menuDuplicate: "Duplicate",
            nameLabel: "Name",
            nameEmpty: "Enter a name",
            nameInvalid: "This name can't be used for a file (characters / \\ : * ? \" < > {'|'}, a reserved name, or a dot or space at the end)",
            nameTaken: "{name} already exists",
            copyName: "{name} copy",
            renameTitle: "Rename {name}",
            duplicateTitle: "Duplicate {name}",
            renamed: "{name} renamed to {newName}",
            duplicated: "{name} duplicated as {newName}",
            // Accessibility Titles for the buttons at the bottom of the Profile List
            saveProfileName: "Save Profile {profileName}",
            createProfile: "Create Profile",

            // Dialog Popup when clicking 'Create Profile' Button
            newTitle: "New Profile Source",
            newQuestion: "Would you like to create a new profile from the default, or current configuration?",
            newDefaultButton: "Default",
            newCurrentButton: "Current",
            newCancelButton: "@:message.modalButtons.cancel",

            // Dialog Popup when hitting the 'Save Profile' button
            overwriteTitle: "Overwrite Confirmation",
            overwriteQuestion: "Are you sure you want to overwrite the profile {activeProfile}?",
            overwriteYes: "@:message.modalButtons.yes",
            overwriteNo: "@:message.modalButtons.no",

            // Dialog Popup when clicking the 'Delete' Menu Item
            deleteTitle: "Delete Confirmation",
            deleteQuestion: "Delete the profile {profileName}? It goes to the trash for 30 days, it can be restored from Library > Profiles.",
            trashTitle: "Deleted profiles",
            trashEmpty: "No deleted profile. Deleted profiles are kept here for 30 days.",
            trashProfile: "Profile",
            trashMic: "Mic profile",
            deleteYes: "@:message.modalButtons.yes",
            deleteNo: "@:message.modalButtons.no",

            // Dialog prompting for a new Profile Name
            newNameTitle: "Enter New Profile Name",
            newNamePlaceHolder: "New Name",
            newNameOk: "@:message.modalButtons.ok",
            newNameCancel: "@:message.modalButtons.cancel",

            // Dialog Popup when attempting to delete the active profile
            deleteCurrentErrorTitle: "Unable to Delete",
            deleteCurrentErrorMessage: "It is not possible to delete the active profile.",

            // Items in the Popup Menu on Profiles
            menuLoadProfile: "Load Profile",
            menuLoadProfileColours: "Load Colours Only",
            menuDeleteProfile: "Delete Profile",


            // Accessibility Messages (these are announced to screen readers)
            accessibilityLoadedProfile: "Profile {profileName} loaded",
            accessibilityLoadedColours: "Profile {profileName} colours loaded",
            accessibilityCreatedProfile: "Created profile {profileName}",
            accessibilitySavedProfile: "Profile {profileName} Saved",
            accessibilitySavedProfileAs: "Profile {profileName} Saved as {newProfileName}",
            accessibilityProfileDeleted: "Profile {profileName} deleted",
            accessibilityDropMenuTitle: "{profileName} options",
            accessibilityOpenProfileDirectory: "Open Profile Directory",
            accessibilityOpenMicProfileDirectory: "Open Mic Profile Directory",
        },
    }
}
