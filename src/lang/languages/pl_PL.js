/*  Check out https://vue-i18n.intlify.dev/guide/essentials/syntax for a syntax guide.

    This export will be directly included in the main structure, with the relevant language flag, all
    that needs to be worried about here are the messages, and any applicable language modifiers.

    Note, this file is for Polish

    I'm being as verbose as possible with the strings, while there are a lot of common answers for things
    like buttons (Yes, No, Ok, Cancel, etc), I'm a little paranoid some languages may need more contextual
    answers, so they're all individually labelled here.

    If you're editing, or creating a new language, everything inside quotation marks ("text") is translatable,
    Anything wrapped in curly brackets ({text}) is a variable, do NOT translate that!

    Also, feel free to leave your name as a contributor:
 */

///
/// Authors:
/// Pitermach
///


export default {
    message: {
        scenes: {
            title: "Sceny",
            runHint: "Zastosuj scenę {name} (głośności, wyciszenia, przekierowanie, efekty)",
            update: "Zastąp {name} bieżącymi ustawieniami",
            delete: "Usuń scenę {name}",
            empty: "Zapisz bieżące głośności, wyciszenia, przekierowanie i efekty, aby przywrócić je jednym kliknięciem.",
            new: "Nowa scena z bieżących ustawień…",
            newTitle: "Nowa scena",
            create: "Utwórz",
            saved: "Zapisano scenę {name}",
            ran: "Zastosowano scenę {name}",
            deleted: "Usunięto scenę {name}",
        },
        integrations: {
            title: "Integracje",
            intro: "Stream Deck, OBS, Touch Portal lub twoje własne skrypty mogą sterować GoXLR przez API HTTP narzędzia, to samo, którego używa ten interfejs.",
            commandUrl: "Wyślij polecenie",
            statusUrl: "Odczytaj pełny stan",
            websocketUrl: "Śledź zmiany (WebSocket)",
            format: "Polecenie to obiekt JSON, którego pole „Command” zawiera numer seryjny urządzenia i polecenie, jak w poniższych przykładach. Nazwy i argumenty są takie jak w GoXLRCommand w kodzie źródłowym narzędzia (ipc/src/lib.rs).",
            examples: "Przykłady dla tego urządzenia",
            copyCurl: "Kopiuj curl",
            copyJson: "Kopiuj JSON",
            more: "Z innego komputera dostęp sieciowy musi być włączony, a link musi zawierać token dostępu (zobacz Ustawienia narzędzia).",
            exampleMicMute: "Wycisz mikrofon",
            exampleVolume: "Ustaw głośność Music na połowę",
            exampleProfile: "Wczytaj profil {name}",
            exampleScene: "Zastosuj scenę {name}",
            copyFailed: "Nie można skopiować do schowka",
        },
        setupWizard: {
            menu: "Asystent konfiguracji",
            title: "Pierwsze kroki ({step} z {count})",
            micTitle: "Twój mikrofon",
            micText: "Wybierz typ mikrofonu, a następnie zwiększaj wzmocnienie, aż twój normalny głos dojdzie do połowy wskaźnika, nie wchodząc na czerwone.",
            routingTitle: "Dokąd trafia dźwięk",
            routingText: "GoXLR dodaje do komputera urządzenia audio. Skieruj każdą aplikację na jej własne urządzenie, aby sterować nią suwakami:",
            openRouting: "Otwórz tabelę przekierowań",
            saveTitle: "Zachowaj te ustawienia",
            saveText: "Zapisz profil i profil mikrofonu: są wczytywane ponownie przy każdym uruchomieniu GoXLR.",
            saveButton: "Zapisz profil i profil mikrofonu",
            skip: "Nie pokazuj ponownie",
            back: "Wstecz",
            next: "Dalej",
            finish: "Zakończ",
        },
        micMute: {
            mute: "Wycisz mikrofon",
            muted: "Mikrofon wyciszony",
            hint: "Wycisza mikrofon jak przycisk Mute urządzenia (M)",
            holdMode: "Przycisk Mute jest w trybie przytrzymania: wycisza tylko, gdy jest przytrzymany na urządzeniu",
        },
        shortcuts: {
            undo: "Cofnij ostatnią zmianę (głośności, wyciszenia, przekierowanie, korektor, kolory)",
            undone: "Cofnięto zmianę",
            title: "Skróty klawiszowe",
            save: "Zapisz profil i profil mikrofonu",
            micMute: "Wycisz lub włącz mikrofon",
            sections: "Przejdź do sekcji paska bocznego",
            presets: "Presety efektów 1–6",
            banks: "Banki samplera A, B i C",
            help: "Pokaż te skróty",
        },
        common: {
            close: "Zamknij",
            lighting: "Podświetlenie",
            clear: "Wyczyść",
            collapseSection: "Zwiń Sekcję",
            expandSection: "Rozwiń Sekcję",
            activeProfile: "Aktywny Profil",
            switchDevice: "Zmień Urządzenie",
            removeSample: "Usuń Sampel",
            waterfallAnimationUp: "Animacja Fali w Górę",
            waterfallAnimationDown: "Animacja Fali w Dół",
            unknown: "Nieznane",
            tabList: "Lista kart",
        },
        deviceSelector: {
            deviceLabel: "{model} · {serial}",
            helpCable: "Sprawdź, czy GoXLR jest włączony, a jego kabel USB podłączony (spróbuj innego portu USB, najlepiej z tyłu komputera).",
            helpLinux: "W systemie Linux reguły udev (50-goxlr.rules) muszą być zainstalowane w /etc/udev/rules.d. Następnie przeładuj je (udevadm control --reload), odłącz GoXLR i podłącz go ponownie.",
            helpWindows: "W systemie Windows musi być zainstalowany sterownik GoXLR od TC-Helicon. Po instalacji uruchom ponownie komputer.",
            helpMacos: "W systemie macOS podłącz GoXLR bezpośrednio, a nie przez hub, i zezwól na działanie narzędzia, jeśli system o to poprosi.",
            reconnecting: "Utracono połączenie z GoXLR Utility, ponowne łączenie…",
            title: "Wybierz Urządzenie",
            connecting: "Próba połączenia z GoXLR Utility..",
            disconnected: "Nie można połączyć się z GoXLR Utility, sprawdź, czy jest uruchomione.\n\nTa strona automatycznie spróbuje połączyć się ponownie..",
            noDevices: "Nie Znaleziono Urządzeń GoXLR",
        },
        versionCheck: {
            updateAvailable: "Dostępna Aktualizacja",
            firmwareDirectionAvailable: "Dostępna {direction} Firmware",
            firmwareDirections: {
                update: "Aktualizacja",
                downgrade: "Starsza Wersja",
                unknown: "NIEZNANE",
            },
            incompatibleDriver: "Zainstalowane sterowniki są niezgodne z tym firmware, kliknij tutaj, aby pobrać najnowszy sterownik.",
        },
        theme: {
            label: "Motyw kolorystyczny",
            dark: "Ciemny",
            light: "Jasny",
            system: "Auto",
        },
        topBar: {
            unsaved: "Niezapisane zmiany",
            revert: "Przywróć zapisaną wersję",
            saveBothHint: "Zapisz profil {profile} i profil mikrofonu {mic} (Ctrl+S)",
            saveMore: "Więcej opcji zapisu",
            saveProfileOnly: "Zapisz tylko profil {profile}",
            saveMicOnly: "Zapisz tylko profil mikrofonu {mic}",
            savedBoth: "Zapisano profil {profile} i profil mikrofonu {mic}",
            savedProfile: "Zapisano profil {profile}",
            savedMic: "Zapisano profil mikrofonu {mic}",
            loadTitle: "Wczytać {name}?",
            loadQuestion: "Niezapisane ustawienia profilu {current} zostaną utracone.",
            loadMicQuestion: "Niezapisane ustawienia profilu mikrofonu {current} zostaną utracone.",
            load: "Wczytaj",
            saveThenLoad: "Zapisz, potem wczytaj",
            lighting: "Podświetlenie globalne",
            lightingTitle: "Podświetlenie globalne",
            profile: "Profil",
            profileLabel: "Aktywny profil",
            micProfile: "Mikrofon",
            micProfileLabel: "Aktywny profil mikrofonu",
            save: "Zapisz",
            showDevice: "Pokaż GoXLR",
            hideDevice: "Ukryj GoXLR",
        },
        sampleAssign: {
            title: "Przypisz do {bank} · {button}",
            bank: "Bank",
            empty: "Ten przycisk nie ma jeszcze sampli.",
            current: "Ten przycisk ma już sample (liczba: {count}):",
            add: "Dodaj",
            replace: "Zastąp",
            removing: "Usuwanie obecnych sampli…",
            adding: "Dodawanie {index} z {total}: {name}…",
            done: "Przypisano sample (liczba: {count}) do {bank} · {button}",
            timeoutRemove: "Usuwanie obecnych sampli przez daemon trwało zbyt długo",
            timeout: "{name}: dodawanie tego sampla przez daemon trwało zbyt długo",
        },
        sampleManager: {
            newFolder: "Nowy Katalog",
            openFolder: "Otwórz Katalog Sampli",
            rename: "Zmień Nazwę",
            renameFolder: "Zmień Nazwę Katalogu",
            renameFolderLabel: "Zmień nazwę katalogu {name}",
            renameSample: "Zmień Nazwę Sampla",
            moveTo: "Przenieś do...",
            moveTitle: "Przenieś {name}",
            moveDestination: "Katalog docelowy",
            rootFolder: "(Katalog Sampli)",
            move: "Przenieś",
            namePlaceholder: "Nazwa",
            extensionKept: "Rozszerzenie {extension} zostanie zachowane.",
            invalidName: "Nazwa nie może zawierać / ani \\.",
            ok: "OK",
            cancel: "Anuluj",
            edit: "Edytuj",
            listen: "Odsłuchaj",
            playPreview: "Odtwórz {name}",
            stopPreview: "Zatrzymaj {name}",
            delete: "Usuń",
            deleteFolderLabel: "Usuń katalog {name}",
            deleteSampleTitle: "Usuń Sampel",
            deleteSampleQuestion: "Przenieść {name} do kosza?",
            deleteFolderTitle: "Usuń Katalog",
            deleteFolderQuestion: "Przenieść katalog {name} i zawarte w nim sample (liczba: {count}) do kosza?",
            deleteEmptyFolderQuestion: "Przenieść pusty katalog {name} do kosza?",
            usedByProfiles: "Używany przez te profile:",
            usedByProfilesHint: "Przyciski samplera, które go używają, nie będą już nic odtwarzać.",
            editTitle: "Edytuj {name}",
            editHelp: "Przeciągnij po obrazie fali, aby zaznaczyć fragment, a następnie go zachowaj (przytnij) lub usuń. Usunięte fragmenty są zaznaczone na czerwono.",
            originalLength: "Długość: {length}",
            resultLength: "Po edycji: {length}",
            selectionRange: "Zaznaczenie: {start} - {end}",
            playSelection: "Odtwórz Zaznaczenie",
            playResult: "Odtwórz Wynik",
            stop: "Zatrzymaj",
            keepSelection: "Zachowaj Zaznaczenie",
            removeSelection: "Usuń Zaznaczenie",
            undo: "Cofnij",
            saveAs: "Zapisz",
            replaceFile: "Zastąp plik",
            convertedToWav: "Zostanie zapisany jako plik WAV: {name}",
            saveCopy: "Zapisz jako nowy plik",
            copyName: "Nazwa nowego pliku",
            copyHint: "Zapisany jako plik WAV w tym samym katalogu.",
            copySuffix: "(edytowany)",
            save: "Zapisz",
            saving: "Zapisywanie...",
            nothingLeft: "To usunęłoby cały dźwięk.",
            breadcrumb: "Bieżący katalog",
            rootName: "Sample",
            search: "Szukaj",
            selectedCount: "Zaznaczono: {count}",
            selectAll: "Zaznacz Wszystko",
            done: "Gotowe",
            selectSample: "Zaznacz {name}",
            usedByActiveProfile: "Używany przez bieżący profil",
            sizeKb: "{size} KB",
            sizeMb: "{size} MB",
            noResults: "Żaden sampel nie pasuje do wyszukiwania.",
            emptyFolder: "Ten katalog jest pusty.",
            dropHint: "Upuść tutaj pliki audio, aby zaimportować je do tego katalogu.",
            duplicate: "Duplikuj",
            import: "Importuj Sample",
            importing: "Importowanie...",
            multiSelect: "Zaznacz Kilka",
            trash: "Kosz",
            trashCount: "Kosz ({count})",
            moveManyTitle: "Przenieś sample (liczba: {count})",
            deleteSamplesQuestion: "Przenieść te sample (liczba: {count}) do kosza?",
            trashHint: "Można go przywrócić z kosza przez 30 dni.",
            moveToTrash: "Przenieś do Kosza",
            trashEmpty: "Kosz jest pusty.",
            folderCount: "Sample: {count}",
            restore: "Przywróć",
            deleteForever: "Usuń",
            trashRetention: "Elementy są trwale usuwane po 30 dniach.",
            emptyTrash: "Opróżnij Kosz",
            emptyTrashConfirm: "Kliknij ponownie, aby usunąć wszystko",
            close: "Zamknij",
            trimSilence: "Przytnij Ciszę",
            normalize: "Normalizuj głośność (najgłośniejszy szczyt na -1dB)",
            onlySilence: "Ten sampel jest cichy.",
            noSilence: "Nie ma ciszy do przycięcia na początku ani na końcu.",
            errorTitle: "Nie można wykonać tej akcji",
        },
        // For these, the keys map directly to their GoXLR Channel Names
        channels: {
            StreamMix1: "Mix dla nadawania 1",
            StreamMix2: "Mix dla nadawania 2",
            All: "Wszystkie",
            Mic: "Mikrofon",
            Chat: "Czat głosowy",
            Music: "Muzyka",
            Game: "Gra",
            Console: "Konsola",
            LineIn: "Wejście Liniowe",
            System: "System",
            Sample: "Sample",
            LineOut: "Wyjście Liniowe",
            Headphones: "Słuchawki",
            MicMonitor: "Odsłóch Mikrofonu",
            StreamMix: "Mix dla nadawania",
            ChatMic: "Mix dla czatu",
            Sampler: "Sampler",
            VOD: "VOD",
        },

        faders: {
            A: "Kanał 1",
            B: "Kanał 2",
            C: "Kanał 3",
            D: "Kanał 4"
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
            continue: "Kontynuuj",
            close: "Zamknij",
            ok: "OK",
            yes: "Tak",
            no: "Nie",
            cancel: "Anuluj"
        },

        // These Strings appear in the tabs throughout the pages
        navigation: {
            library: "Biblioteka",
            application: "Aplikacja",
            // Tabs at the top of the Page
            profiles: "Profile",
            samples: "Sample",

            // Main Navigation Tabs
            microphone: "Mikrofon",
            mixer: "Mixer",
            effects: "Efekty",
            sampler: "Sampler",
            routing: "Przekierowanie",
            system: "System",

            // Navigation Sections on the Lighting Page

            // Accessibility Messages (these are announced to screen readers)
            accessibilityDeviceSection: "Ustawienia Urządzenia",
        },

        // Strings that appear in the Mic tab, note that the Profile Strings are handled in 'profileManager'
        microphone: {
            chain: {
                title: "Łańcuch przetwarzania",
                input: "Wejście",
                gate: "Bramka",
                gateToggle: "Bramka szumów włączona",
                threshold: "Próg",
                equaliser: "Korektor",
                bands: "Pasma: {count}",
                flat: "Płaski",
                eqPeak: "{gain} dB przy {freq}",
                compressor: "Kompresor",
                compressorDetail: "Próg {threshold} dB",
                curveHintFine: "przeciągnij punkt w górę lub w dół, aby zmienić poziom, w bok, aby zmienić częstotliwość",
                fineTune: "Dostosuj częstotliwości",
                bandLabel: "Pasmo {freq}",
                curveHint: "przeciągnij punkt, aby ustawić pasmo",
            },
            profiles: {
                title: "Profile Mikrofonu"
            },

            setup: {
                phantomTitle: "Włączyć zasilanie phantom (+{voltage} V)?",
                phantomWarning: "Tylko dla mikrofonów pojemnościowych, które go wymagają. Najpierw ścisz słuchawki i stream: włączenie może wywołać głośne trzaśnięcie.",
                phantomEnable: "Włącz",
                button: "Konfiguracja Mikrofonu",
                title: "Konfiguracja Mikrofonu",
                type: "Typ mikrofonu",
                gain: "Poziom",

                // Microphone Types
                xlr: "Mikrofon XLR",
                phantom: "Mikrofon XLR + Zasilanie Phantom (+{voltage}V)",
                jack: "Mikrofon na wejście 3.5mm",
            },

            waveform: {
                loud: "Za Głośno",
                good: "Dobry",
                gate_estimated: "Bramka jest Oszacowana"
            },

            gate: {
                title: "Bramka",
                threshold: "Threshold",
                attenuation: "Attenuation",
                attack: "Attack",
                release: "Release",
            },

            equaliser: {
                resetTitle: "Zresetować korektor?",
                resetQuestion: "Wszystkie pasma wrócą do 0 dB i domyślnej częstotliwości. Przed / Po pozwala przywrócić zapisany korektor, dopóki nie zapiszesz.",
                compare: "Porównaj z zapisanym korektorem",
                before: "Przed",
                after: "Po",
                save: "Zapisz",
                saveHint: "Zapisuje korektor w profilu mikrofonu {profile}",
                savedNotice: "Korektor zapisany w profilu mikrofonu {profile}",
                title: "Korektor",
                reset: "Resetuj",
            },

            compressor: {
                title: "Kompresor",
                amount: "Ilość",
                threshold: "Threshold",
                ratio: "Stopień",
                attack: "Attack",
                release: "Release",
                makeUpGain: "Make-Up",
            },

            extras: {
                title: "Extras",
                deEsser: "De-Esser",
                bleep: "Dźwięk Cenzury",
            }
        },

        mixer: {
            otherInputs: "Inne Wejścia",
            strip: {
                muteAllHint: "Prawy przycisk lub długie naciśnięcie: wycisz dla wszystkich",
                notMuted: "Niewyciszony",
                mutedAll: "Wyciszony dla wszystkich",
                source: "Źródło",
                mute: "Wycisz",
                muteFunction: "Wycisz dla",
                lighting: "Podświetlenie: {channel}",
                lightingTitle: "Podświetlenie · {channel}",
            },
            submixHint: "Drugi mix (Mix B) dla każdego kanału, łącznie z suwakami, aby wysyłać inne poziomy do niektórych wyjść.",
            // Box Headers
            outputs: "Wyjścia",
            mixAssignment: "Wybór Mixu",

            // Submix Checkbox
            submix: "Submixy",

            // Mix Assignment
            channelA: "A",
            channelB: "B"
        },

        // Strings in the Configuration Tab
        configuration: {
            // This is common between Faders and Cough Buttons
            mute_behaviour: {
                base: "Wycisz dla {channel}",
                all: "Wycisz Wszędzie",
            },
            muteBehaviourTitle: "Zachowanie Wyciszenia",
            muteBehaviourLabel: "Zachowanie Wyciszenia dla Kanału",

            // Config for the Faders
            faders: {
                sourceLabel: "Źrudło dla kanału",
            },

            // Configuration for the Cough Button
            cough: {
                lighting: "Podświetlenie",
                lightingTitle: "Podświetlenie przycisków Kaszel i Cenzura",
                behaviour: {
                    hold: "Trzymaj, aby Wyciszyć",
                    toggle: "Naciśnij, aby przełączyć Wyciszenie",
                },

                title: "Ustawienia przycisku Kaszel",
                behaviourTitle: "Zachowanie Przycisku",
            }
        },

        effects: {
            lighting: {
                title: "Podświetlenie efektów",
                presetButton: "Przycisk presetu · {name}",
                applyPresets: "Zastosuj do wszystkich presetów",
                encoders: "Pokrętła",
                applyEncoders: "Zastosuj do wszystkich pokręteł",
                buttons: "Przyciski efektów",
                applyButtons: "Zastosuj do wszystkich przycisków efektów",
            },
            face: {
                label: "Efekty",
                master: "Efekty",
                enabled: "Wł.",
                on: "wł.",
                off: "wył.",
                power: "Włącz lub wyłącz {effect}",
            },
            preset: {
                name: "Nazwa",
                title: "Preset",
                group: "Grupa",

                menuLoad: "Wczytaj",
                menuRename: "Zmień Nazwę",
                menuSave: "Zapisz do Biblioteki",


                loadPreset: "Wczytaj Preset",


                noPresets: "W tej chwili w bibliotece nie ma żadnych presetów, zapisz lub skopiuj jakieś presety, a wtedy pojawią się tutaj.",
                loadPresetOk: "@:message.modalButtons.ok",

                confirmTitle: "Potwierdź Wczytanie Presetu",
                confirmMessage: "Wczytanie tego presetu zastąpi niezapisane zmiany w tym banku efektów. Czy chcesz kontynuować?",
                confirmOk: "@:message.modalButtons.ok",
                confirmCancel: "@:message.modalButtons.cancel",

                overwriteTitle: "Potwierdź nadpisanie presetu",
                overwriteMessage: "Preset {current} już istnieje w twojej bibliotece, czy chcesz go nadpisać?",
                overwriteConfirm: "Nadpisz",
                overwriteCancel: "@:message.modalButtons.cancel",

                accessibilityOpenPresetDirectory: "Otwórz katalog Presetów",
                accessibilityPresetLoaded: "Preset {name} wczytany do banku {bank}",
                accessibilityPresetSaved: "Preset {name} zapisany w bibliotece.",
            },
            reverb: {
                title: "Pogłos",
                style: "Styl",

                styles: {
                    library: "Biblioteka",
                    darkBloom: "Ciemny Rozkwit",
                    musicClub: "Klub Muzyczny",
                    realPlate: "Stalowa Płyta",
                    chapel: "Kaplica",
                    hockeyArena: "Boisko Hockeyowe"
                },

                amount: "Ilość",
                decay: "Czas",
                earlyLevel: "Poziom Wczesnych",
                tailLevel: "Poziom późnych",
                preDelay: "Opóźnienie Wczesne",
                lowColour: "Kolor Niskich",
                highColour: "Kolor Wysokich",
                highFactor: "Podbicie Wysokich",
                diffuse: "Rozproszenie",
                modSpeed: "Szybkość Modulacji",
                modDepth: "Głębokość Modulacji"
            },

            echo: {
                title: "Echo",

                style: "Styl",
                styles: {
                    quarter: "Ćwiartki",
                    eighth: "Ósemki",
                    triplet: "Kropki",
                    pingPong: "Ping Pong",
                    classicSlap: "Klasyczny",
                    multiTap: "MultiTap"
                },

                amount: "Ilość",
                feedback: "Oddźwięk",
                tempo: "Tempo",
                delayLeft: "Opóźnienie L",
                delayRight: "Opóźnienie P",
                feedbackLeft: "Oddźwięk L",
                feedbackRight: "Oddźwięk P",
                xfbLeftToRight: "Mieszanie oddźwięku L Z P",
                xfbRightToLeft: "Mieszanie oddźwięku P Z L",
            },

            pitch: {
                title: "Ton",

                style: "Styl",
                styles: {
                    narrow: "Wąski",
                    wide: "Szeroki"
                },

                amount: "Ilość",
                character: "Charakter"
            },

            gender: {
                title: "Płeć",

                style: "Styl",
                styles: {
                    narrow: "Wąski",
                    medium: "Średni",
                    wide: "Szeroki"
                },

                amount: "Ilość"
            },

            megaphone: {
                title: "Megafon",

                style: "Styl",
                styles: {
                    megaphone: "Megafon",
                    radio: "Radio",
                    onThePhone: "Przez telefon",
                    overdrive: "Zniekształcony",
                    buzzCutt: "Buzz Cutt",
                    tweed: "Tweed"
                },

                amount: "Ilość",
                postGain: "Poziom"
            },

            robot: {
                title: "Robot",

                style: "Styl",
                styles: {
                    robot1: "Robot 1",
                    robot2: "Robot 2",
                    robot3: "Robot 3",
                },

                lowGain: "Poziom Niskich",
                lowFrequency: "Częst. Niskich",
                lowWidth: "Szerokość Niskich",
                midGain: "Poziom Średnich",
                midFrequency: "Częst. Średnich",
                midWidth: "Szerokość Średnich",
                highGain: "Poziom Wysokich",
                highFrequency: "Częst. Wysokich",
                highWidth: "Szerokość Wysokich",
                waveform: "Fala",
                pulseWidth: "Szerokość Impulsu",
                threshold: "Próg",
                dryMix: "Mix Suchy",
            },

            hardTune: {
                title: "Hard Tune",

                style: "Styl",
                styles: {
                    natural: "Naturalny",
                    medium: "Średni",
                    hard: "Ostry"
                },

                amount: "Ilość",
                rate: "Szybkość",
                window: "Okno",

                source: "Źródło"
            }
        },

        sampler: {
            lighting: {
                label: "Podświetlenie",
                title: "Podświetlenie samplera",
                bank: "Przyciski banku {bank}",
                note: "Urządzenie ustawia te kolory dla całego banku, wszystkie cztery przyciski je współdzielą.",
                applyBanks: "Zastosuj do wszystkich banków",
            },
            pads: {
                record: "Nagraj do {button}",
                stopRecording: "Zatrzymaj nagrywanie {button}",
                play: "Odtwórz {button}",
                stop: "Zatrzymaj {button}",
                title: "Przyciski",
                empty: "Pusty",
                count: "Sample: {count}",
                dropHere: "Upuść, aby przypisać",
            },
            banks: {
                bankTitle: "Bank",
                bank: {
                    a: "A",
                    b: "B",
                    c: "C"
                },
                buttonLabel: "Przycisk dla Banku {activeBank}",
                buttons: {
                    topLeft: "Lewy Górny",
                    topRight: "Prawy Górny",
                    bottomLeft: "Lewy Dolny",
                    bottomRight: "Prawy Dolny",
                },

                functionTitle: "Funkcja",
                functionLabel: "{activeButton} Przycisk w Banku {activeBank} - Funkcja",
                functions: {
                    playNext: "Odtwórz/Następny",
                    playStop: "Odtwórz/Zatrzymaj",
                    playFade: "Odtwórz/Wycisz",
                    stopOnRelease: "Zatrzymaj po puszczeniu",
                    fadeOnRelease: "Wycisz po puszczeniu",
                    loop: "Powtarzaj"
                },

                playOrderTitle: "Kolejność Odtwarzania",
                playOrderLabel: "{activeButton} Przycisk w Banku {activeBank} - Kolejność Odtwarzania",
                playOrders: {
                    sequential: "Sekwencyjna",
                    random: "Losowa",
                },
            },

            samplesTitle: "Sample",
            samples: {
                genericError: "Wystąpił nieznany błąd.",
                samplesTitle: "Sample",
                samplesLabel: "{activeButton} Przycisk w Banku {activeBank} - Sample",

                // Button at the bottom of the Sample List
                addSample: "+",
                addSampleLabel: "Dodaj Sampel",
                sampleSelector: {
                    parentDirectory: "Katalog Wyżej",
                    addButton: "Dodaj",

                    noSamples: "W katalogu Samples nie ma żadnych sampli. Skopiuj jakieś pliki, aby je tutaj wybrać!",

                    // Used with Screen Readers
                    directories: "Katalogi",
                    samples: "Sample",
                },

                gain: "Poziom",
                waveform: {
                    title: "Fala",

                    // These are primarily for accessibility, but are labels on the various buttons.
                    text: "Obraz fali dla {sample}",

                    // The Play / Stop button before the waveform
                    playbackSample: "Odtwórz",
                    stopSample: "Zatrzymaj",

                    // Labels for the draggable 'Handles'
                    sampleStart: "Początek Sampla",
                    sampleEnd: "Koniec Sampla",

                    sampleDeleted: "Sampel {sampleName} usunięty z {activeButton} przycisku w Banku {activeBank}",
                    zoomLevel: "Powiększenie: {level}",
                },

                addSampleWaitTitle: "Proszę Czekać",
                addSampleAnalysing: "Czekaj, plik jest analizowany.",
                addSampleProgress: "Postęp: {progress}@:message.suffixes.percentage",

                errorTitle: "Błąd Dodawania Sampla",
                errorText: "Wystąpił błąd podczas dodawania sampla do banku:",

                accessibilityOpenSamplesDirectory: "Otwórz Katalog Sampli",
                accessibilityAnalysing: "Proszę czekać, plik jest analizowany. Może to potrwać kilka minut.",
                accessibilityAdded: "Sampel {name} dodany na {activeButton} przycisk w banku {activeBank}."
            }
        },

        lighting: {
            channel: {
                applyFaders: "Zastosuj do wszystkich suwaków",
                applyMutes: "Zastosuj do wszystkich przycisków wyciszenia",
                openIcons: "Otwórz katalog ikon",
                display: "Wyświetlanie",
                preview: "Podgląd",
                previewFader: "suwak",
                previewMeter: "miernik",
                hintTwoColour: "Poniżej suwaka: kolor dołu. Powyżej: kolor góry.",
                hintGradient: "Poniżej suwaka: przejście od koloru dołu do koloru góry. Powyżej: wyłączone.",
                hintMeter: "Diody LED pokazują poziom dźwięku kanału zamiast pozycji suwaka.",
                hintGradientMeter: "Diody LED pokazują poziom dźwięku kanału, z przejściem od koloru dołu do koloru góry.",
                previewScreen: "ekran",
                previewActive: "aktywny",
                previewMute: "MUTE",
                previewRest: "spoczynek",
            },
            // These are some common strings that are used in multiple places
            common: {
                pickColour: "wybierz kolor",
                restLabel: "W spoczynku",
                restColour: "Kolor spoczynku",
                restDimmedHint: "Przycisk pokazuje swój aktywny kolor, przyciemniony: nie ma koloru do wybrania.",
                brightness: "Jasność",

                activeColour: "Aktywny",

                inactiveOption: "Nieaktywna Opcja",
                inactiveOptions: {
                    dimActiveColour: "Przyciemnij Aktywny Kolor",
                    inactiveColour: "Nieaktywny Kolor",
                    dimInactiveColour: "Przyciemnij Aktywny Kolor"

                },

            },

            global: {
                areas: {
                    title: "Obszary",

                    area: "Obszar",
                    areas: {
                        global: "Globalne",
                        accent: "Akcent",
                    },

                },

                animations: {
                    title: "Animacje",

                    mode: "Tryb Animacji",
                    modes: {
                        none: "Brak",
                        rainbowRetro: "Tęcza Retro",
                        rainbowBright: "Tęcza Jasna",
                        rainbowDark: "Tęcza Ciemna",
                        simple: "Prosta",
                        ripple: "Rozprysk",
                    },

                    mod1: "Gradient Mod 1",
                    mod2: "Gradient Mod 2",

                    waterfall: "Ustawienia Fali",
                    waterfallOff: "Wyłączona",
                }
            },

            mixer: {

                fader: {
                    title: "Suwak",

                    style: "Styl",
                    styles: {
                        gradient: "Gradient",
                        meter: "Miernik",
                    },

                    bottomColour: "Kolor dołu",
                    topColour: "Kolor Góry",

                },

                screen: {
                    title: "Ekran",
                    backgroundColour: "Kolor Tła",
                    icons: "Ikony",
                    iconNone: "-- BRAK --",

                    options: {
                        showNumber: "Pokazuj Liczbę",
                        invertDisplay: "Odwróć Ekran",
                        text: "Tekst",

                        accessibilityText: "Tekst do wyświetlenia na ekranie GoXLR"
                    }
                },

                mute: {
                    // Pretty much all other fields for this area come from 'Common'
                    title: "Wyciszenie",
                }
            },

            effects: {

                encoders: {
                    title: "Pokrętła",

                    encoder: "Pokrętło",
                    encoders: {
                        reverb: "Pogłos",
                        echo: "Echo",
                        pitch: "Ton",
                        gender: "Płeć",
                    },

                    leftColour: "Lewy Kolor",
                    rightColour: "Prawy Kolor",
                    knobColour: "Kolor Pokrętła"
                },

                buttons: {
                    title: "Przyciski Efektów",

                    effect: {
                        megaphone: "Megafon",
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

                active: "Aktywny / Wczytany",
                empty: "Pusty",
            },

            cough: {

                buttons: {
                    bleep: "Cenzura",
                    cough: "Kaszel",
                }
            },
        },

        routing: {
            cellLabel: "{input} do {output}",
            help: {
                title: "Gdzie kierować aplikacje",
                obs: "OBS: przechwytuj urządzenie „Broadcast Stream Mix”, to właśnie słyszy twój stream.",
                discord: "Discord: ustaw „Chat Mic” jako urządzenie wejściowe, a „Chat” jako urządzenie wyjściowe.",
                apps: "Gry na „Game”, muzyka na „Music”, cała reszta na „System”: każde z nich ma własny suwak i przekierowanie.",
                hover: "Najedź na nazwę wiersza lub kolumny, aby zobaczyć, czym jest.",
                chatLoop: "Czat głosowy nie może wracać do Chat Mic, bo twoi rozmówcy słyszeliby samych siebie.",
                inputs: {
                    Microphone: "Twój mikrofon po przetworzeniu (bramka, korektor, kompresor, efekty).",
                    Chat: "Urządzenie audio „Chat” komputera: ustaw je jako wyjście Discorda lub innych aplikacji do czatu głosowego.",
                    Music: "Urządzenie audio „Music”: ustaw je jako wyjście odtwarzacza muzyki.",
                    Game: "Urządzenie audio „Game”: ustaw je jako wyjście gier.",
                    Console: "Wejście konsoli z tyłu GoXLR.",
                    LineIn: "Wejście liniowe z tyłu GoXLR.",
                    System: "Urządzenie audio „System”: domyślne wyjście komputera (powiadomienia, przeglądarka…).",
                    Samples: "Dźwięki odtwarzane przez sampler.",
                },
                outputs: {
                    Headphones: "To, co słyszysz w słuchawkach.",
                    BroadcastMix: "Urządzenie „Broadcast Stream Mix”: to, co słyszy twój stream lub nagranie (przechwyć je w OBS).",
                    StreamMix2: "Drugi mix streamu, na przykład dla ścieżki VOD bez muzyki.",
                    ChatMic: "Urządzenie „Chat Mic”: to, co słyszą osoby na czacie głosowym (ustaw je jako wejście w Discordzie).",
                    Sampler: "To, co nagrywa sampler, gdy przytrzymujesz pusty przycisk.",
                    LineOut: "Wyjście liniowe z tyłu GoXLR.",
                },
            },
            // There are (frustratingly) some minor differences between how channels appear in the routing table,
            // and how they appear in the Mixer, these changes also fall under the hood at the Utility level, so
            // we'll define all the channels here, and 'fix' anything which needs adjustment.
            title: "Przekierowanie",

            input: "Wejścia",
            inputs: {
                Microphone: "@:message.channels.Mic",
                Chat: "Czat",
                Music: "@:message.channels.Music",
                Game: "@:message.channels.Game",
                Console: "@:message.channels.Console",
                LineIn: "@:message.channels.LineIn",
                System: "@:message.channels.System",
                Samples: "@:message.channels.Sample",
            },

            output: "Wyjścia",
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
                title: "Kopia zapasowa",
                withSamples: "Dołącz sample",
                download: "Pobierz kopię zapasową",
                restore: "Przywróć kopię zapasową",
                confirmTitle: "Przywrócić tę kopię zapasową?",
                confirmMessage: "Profile, profile mikrofonu, presety, ikony i sample z {name} zostaną dodane. Pliki, które zostałyby zastąpione, są najpierw kopiowane do katalogu kopii zapasowych.",
                restored: "Przywrócono kopię zapasową: dodane {added}, zastąpione {replaced}, bez zmian {unchanged}",
            },
            networkAccess: {
                restartNow: "Uruchom narzędzie ponownie teraz",
                restarting: "Narzędzie uruchamia się ponownie, interfejs połączy się sam.",
                qr: "Kod QR",
                qrAlt: "Kod QR do otwarcia {url}",
                title: "Dostęp sieciowy",
                explain: "Na innym urządzeniu w twojej sieci (tablet, telefon, komputer) otwórz jeden z tych linków jeden raz. Dostęp zostanie potem zapamiętany.",
                restart: "Uruchom ponownie GoXLR Utility, aby mieć do niego dostęp z sieci. Linki pojawią się wtedy tutaj.",
                noAddress: "Nie znaleziono adresu sieciowego dla tego komputera.",
                copy: "Kopiuj",
                copied: "Skopiowano",
                regenerate: "Nowy link (poprzednie linki przestaną działać)",
            },
            menu: {
                firmware: "Aktualizacja firmware",
            },
            firmwareUpdate: {
                seeLogs: "Szczegóły znajdziesz w dziennikach narzędzia (System, Ustawienia narzędzia, Otwórz dzienniki).",
                noInfo: "Serwery aktualizacji nie odpowiedziały, więc najnowsza wersja jest nieznana. Ten GoXLR ma wersję {currentVersion}.",
                updateTo: "Aktualizuj do {version}",
                reinstall: "Zainstaluj ponownie {version}",
                customButton: "Własny firmware…",
                confirmTitle: "Wgrać firmware?",
                confirmText: "GoXLR uruchomi się ponownie podczas aktualizacji. Nie odłączaj go ani nie zamykaj aplikacji, dopóki się nie zakończy.",
                confirmCustom: "Za chwilę wybierzesz plik firmware (.bin). Używaj tylko zaufanego pliku: niewłaściwy plik może sprawić, że GoXLR przestanie działać. Nie odłączaj go podczas aktualizacji.",
                betaWarning: "Zamierzasz zainstalować wersję beta firmware.\nTa wersja nie otrzyma żadnego oficjalnego wsparcia i może zawierać błędy lub problemy, których nie możemy naprawić.",
                newVersionAvailable: "Dla twojego urządzenia dostępna jest nowsza wersja firmware ({latestVersion}).\nCzy chcesz teraz zaktualizować urządzenie?",
                currentVersionIsNewer: "Twoja obecna wersja firmware ({currentVersion}) jest nowsza niż najnowsza dostępna wersja firmware ({latestVersion}) dla twojego urządzenia.\nCzy chcesz przejść na najnowszą dostępną wersję firmware?",
                currentIsUpToDate: "Twój firmware jest już aktualny.\nCzy chcesz ponownie zainstalować obecną wersję firmware?",
                customFirmware: "Zamierzasz zainstalować własny firmware.\nNie jest to zalecane, chyba że wiesz, co robisz.\nCzy na pewno chcesz kontynuować?",
                warning: "Zamierzasz wgrać nową wersję firmware do swojego urządzenia.\nTwórcy GoXLR Utility nie ponoszą odpowiedzialności za jakiekolwiek szkody, które mogą zostać spowodowane przez ten proces. ",
                warningInfo: "Więcej Informacji",
                updatePaused: "Zamierzasz zainstalować firmware w wersji {version}. Czy na pewno chcesz kontynuować?",
                updateInProgress: "Trwa Aktualizacja Firmware. Proszę czekać i nie odłączać urządzenia!",
                completed: "Aktualizacja firmware zakończyła się pomyślnie.",
                failed: "Coś poszło nie tak podczas aktualizacji firmware. Spróbuj ponownie.",
                changelog: "Lista zmian w wersji {version}:",
                title: "Instalowanie Firmware...",
                progress: {
                    starting: "Uruchamianie...",
                    manifest: "Pobieranie Manifestu...",
                    download: "Pobieranie Firmware...",
                    pause: "Aktualizacja Wstrzymana",
                    clearNVR: "Przygotowywanie Partycji Aktualizacji...",
                    uploadFirmware: "Wysyłanie Firmware...",
                    validateUpload: "Weryfikowanie wysłanego Firmware...",
                    hardwareWrite: "Zapisywanie Firmware...",
                    hardwareValidate: "Weryfikowanie Firmware...",
                    complete: "Aktualizacja zakończona",
                    failed: "Nie udało się ukończyć Aktualizacji Firmware",
                },
            },
            firmwareUpdateButton: {
                update: "Aktualizuj Firmware",
                downgrade: "Przywróć Starszy Firmware",
                reinstall: "Zainstaluj Ponownie Firmware",
                custom: "Własny Firmware",
            },
            title: "System",

            powerButton: "Akcje Zasilania",
            power: {
                shutdownTitle: "Akcje Zamekania",
                shutdownDescription: "Te akcje zostaną wykonane kiedy GoXLR Utility zostanie bezpiecznie zamknięte",

                sleepTitle: "Akcje Usypiania",
                sleepDescription: "Te akcje zostaną wykonane kiedy twój system przechodzi w tryb uśpienia",

                wakeTitle: "Akcje Obudzenia",
                wakeDescription: "Te akcje zostaną wykonane kiedy twój system obudzi się z uśpienia",

                settingsError: "Wygląda na to, że Konfiguracja została ręcznie zmodefikowana. Aby zapobiec nieoczekiwanym zachowaniom, ta sekcja została wyłączona. Jeśli chcesz zresetować ustawienia Akcji Zasilania, naciśnij przycisk poniżej.",
                settingsReset: "Resetuj Akcje Zasilania",

                power_options: {
                    reload: "Przeładuj Ustawienia",
                    saveProfile: "Zapisz Profil",
                    loadProfile: "Wczytaj Cały Profil",
                    loadColourProfile: "Wczytaj Kolory z Profilu",
                    saveMicProfile: "Zapisz Profil Mikrofonu",
                    loadMicProfile: "Wczytaj Profil Mikrofonu",
                }
            },

            deviceButton: "Ustawienia Urządzenia",
            device: {
                samplerFadeDuration: "Czas Wyciszania Samplera",
                samplerFadeDurationAccessibility: "Czas w milisekundach, przez który sampler będzie wyciszał dźwięk po zatrzymaniu odtwarzania",
                holdDuration: "Czas przytrzymania, aby wyciszyć wszędzie",
                holdDurationAccessibility: "Czas w milisekundach, przez który musi być przytrzymany przycisk wyciszenia, aby wyciszyć wszystkie kanały",

                sampleBuffer: "Bufor pre-nagrywania Samplera (w sekundach)",
                sampleBufferAccessibility: "Czas w sekundach, który nagra sampler przed naciśnięciem przycisku",

                voiceDeafen: "Wyciszenie Czatu wycisza również Mikrofon",
                voiceDeafenAccessibility: "Kiedy wyciszasz wszystkie kanały, wycisz również mikrofon dla Mixu Czat",

                monitorWithFx: "Przełącz odsłuch Mikrofonu z efektami",
                monitorWithFxAccessibility: "Włącza odsłuch mikrofonu kiedy efekty są włączone",

                resetSampleFunctionOnClear: "Reset Sample Function on Clear",
                resetSampleFunctionOnClearAccessibility: "Resets the Sample function to Start / Next when Cleared",

                lockFaders: "Zablokuj Pozycje Suwaków kiedy Wyciszasz Wszędzie",
                lockFadersAccessibility: "Nie przesuwa suwaków na dół kiedy opcja Wyciszenia Wszędzie jest aktywna",
            },

            settingsButton: "Ustawienia GoXLR Utility",
            settings: {
                recoverConfirmTitle: "Przywrócić pliki domyślne?",
                recoverConfirmMessage: "Brakujące domyślne {type} zostaną dodane ponownie. Istniejące pliki nie zostaną zmienione.",
                recoverConfirmOk: "Przywróć",
                recoverDone: "Przywrócono domyślne {type}",
                shutdownConfirmTitle: "Czy na pewno?",
                shutdownConfirmMessage: "Czy na pewno chcesz zamknąć GoXLR Utility?",
                settingsRegionAccessibility: "ustawienia",
                macosAggregateManagement: "Wyłącz zarządzanie urządzeniami zagregowanymi w MacOS (wymaga restartu)",
                macosAggregateManagementAccessibility: "Wyłącza zarządzanie urządzeniami zagregowanymi przez Utility w MacOS (wymaga restartu)",
                firmwareSource: "Kanał Aktualizacji Firmware",
                firmwareSources: {
                    live: "Stabilny",
                    beta: "Beta",
                },
                language: "Język",
                useSystem: "Użyj języka systemu (jeśli dostępny)",

                uiHandler: "Program obsługujący Interfejs",
                uiHandlers: {
                    browser: "Przeglądarka",
                    app: "Aplikacja",
                    custom: "Własny"
                },


                logLevel: "Poziom Logowania (wymaga restartu)",
                logLevels: {
                    off: "Wyłączone",
                    error: "Error (Błędy)",
                    warn: "Warn (Uwagi)",
                    info: "Info",
                    debug: "Debug",
                    trace: "Trace"

                    // OFF / ERROR / WARN / INFO / DEBUG / TRACE
                },

                allowNetworkAccess: "Zezwól na dostęp do interfejsu po sieci (wymaga restartu)",
                allowNetworkAccessAccessibility: "Pozwól, żeby interfejs był dostępny dla innych urządzeń w sieci",

                autoStart: "Uruchom po Zalogowaniu",
                autoStartAccessibility: "Uruchom GoXLR Utility po zalogowaniu użytkownika",

                showOnLaunch: "Pokaż Interfejs po Uruchomieniu",
                showOnLaunchAccessibility: "Automatycznie otwiera interfejs po starcie aplikacji",

                showTray: "Pokaż ikonę w Zasobniku (wymaga restartu)",
                showTrayAccessibility: "Pokaż ikonę GoXLR Utility w zasobniku systemowym",

                ttsOnButton: "Czytaj Naciśnięte Przyciski",
                ttsOnButtonAccessibility: "Czytaj stan naciśniętych przycisków na głos, używając czytnika ekranu lub systemowego głosu",

                recoverDefaults: "Przywróć Domyślne",
                recoverOptions: {
                    profiles: "Profile",
                    micProfiles: "Profile Mikrofonu",
                    icons: "Icony",
                    presets: "Presety"
                },

                shutdownUtility: "Zamknij GoXLR Utility"
            },

            aboutButton: "O GoXLR",
            about: {
                serial: "Numer Seryjny",
                utilityVersion: "Wersja GoXLR Utility",
                driverVersion: "Driver Version",
                hardwareVersion: "Wersja Sprzętu",

                firmware: "Firmware",
                dice: "DICE",
                fpga: "FPGA"
            },

            licenses: "Licencje",
            help: "Pomoc",
        },

        // Strings used in Profile and Microphone Profile Management.
        profileManager: {
            export: "Eksportuj",
            import: "Importuj pliki profili",
            imported: "Zaimportowane pliki profili: {count}",
            menuRename: "Zmień nazwę",
            menuDuplicate: "Duplikuj",
            nameLabel: "Nazwa",
            nameEmpty: "Wpisz nazwę",
            nameInvalid: "Tej nazwy nie można użyć jako nazwy pliku (znaki / \\ : * ? \" < > {'|'}, nazwa zastrzeżona albo kropka lub spacja na końcu)",
            nameTaken: "{name} już istnieje",
            copyName: "{name} kopia",
            renameTitle: "Zmień nazwę {name}",
            duplicateTitle: "Duplikuj {name}",
            renamed: "Zmieniono nazwę {name} na {newName}",
            duplicated: "Zduplikowano {name} jako {newName}",
            trashTitle: "Usunięte profile",
            trashEmpty: "Brak usuniętych profili. Usunięte profile są tu przechowywane przez 30 dni.",
            trashProfile: "Profil",
            trashMic: "Profil mikrofonu",
            // Accessibility Titles for the buttons at the bottom of the Profile List
            saveProfileName: "Zapisz Profil {profileName}",
            createProfile: "Utwórz Profil",

            // Dialog Popup when clicking 'Create Profile' Button
            newTitle: "Źródło Nowego Profilu",
            newQuestion: "Czy chcesz stworzyć nowy profil na bazie bierzących, czy domyślnych ustawień?",
            newDefaultButton: "Domyślne",
            newCurrentButton: "Bieżące",
            newCancelButton: "@:message.modalButtons.cancel",

            // Dialog Popup when hitting the 'Save Profile' button
            overwriteTitle: "Potwierdź Nadpisanie",
            overwriteQuestion: "Czy na pewno chcesz nadpisać profil {activeProfile}?",
            overwriteYes: "@:message.modalButtons.yes",
            overwriteNo: "@:message.modalButtons.no",

            // Dialog Popup when clicking the 'Delete' Menu Item
            deleteTitle: "Potwierdź Usunięcie",
            deleteQuestion: "Czy na pewno chcesz usunąć profil {profileName}?",
            deleteYes: "@:message.modalButtons.yes",
            deleteNo: "@:message.modalButtons.no",

            // Dialog prompting for a new Profile Name
            newNameTitle: "Podaj Nazwę Nowego Profilu",
            newNamePlaceHolder: "Nowa Nazwa",
            newNameOk: "@:message.modalButtons.ok",
            newNameCancel: "@:message.modalButtons.cancel",

            // Dialog Popup when attempting to delete the active profile
            deleteCurrentErrorTitle: "Nie Można Usunąć",
            deleteCurrentErrorMessage: "Usunięcie aktywnego profilu jest nie ożliwe.",

            // Items in the Popup Menu on Profiles
            menuLoadProfile: "Wczytaj Profil",
            menuLoadProfileColours: "Wczytaj Tylko Kolory",
            menuDeleteProfile: "Usuń Profil",


            // Accessibility Messages (these are announced to screen readers)
            accessibilityLoadedProfile: "Profil {profileName} wczytany",
            accessibilityLoadedColours: "Kolory z profilu {profileName} wczytane",
            accessibilityCreatedProfile: "Profil {profileName} utworzony",
            accessibilitySavedProfile: "Profil {profileName} zapisany",
            accessibilitySavedProfileAs: "Profil {profileName} zapisany jako {newProfileName}",
            accessibilityProfileDeleted: "Profil {profileName} usunięty",
            accessibilityDropMenuTitle: "Opcje dla {profileName}",
            accessibilityOpenProfileDirectory: "Otwórz Katalog Profili",
            accessibilityOpenMicProfileDirectory: "Otwórz Katalog Profili Mikrofonu",
        },
    }
}
