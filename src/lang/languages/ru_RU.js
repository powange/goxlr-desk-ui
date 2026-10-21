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
        common: {
            close: "Закрыть",
            lighting: "Подсветка",
            clear: "Очистить",
            collapseSection: "Свернуть раздел",
            expandSection: "Развернуть раздел",
            activeProfile: "Активный Профиль",
            switchDevice: "Сменить устройство",
            removeSample: "Удалить Сэмпл",
            waterfallAnimationUp: "Анимация Водопад вверх",
            waterfallAnimationDown: "Анимация Водопад вниз",
            unknown: "Неизвестно",
            tabList: "Список вкладок",
        },
        deviceSelector: {
            reconnecting: "Соединение с GoXLR Utility потеряно, переподключение…",
            title: "Выбор устройства",
            connecting: "Попытка подключения к GoXLR Utility..",
            disconnected: "Не удаётся подключиться к GoXLR Utility, проверьте, что она запущена.\n\nЭта страница автоматически попытается переподключиться..",
            noDevices: "Устройства GoXLR не найдены",
        },
        versionCheck: {
            updateAvailable: "Доступно обновление",
            firmwareDirectionAvailable: "Доступно: {direction} прошивки",
            firmwareDirections: {
                update: "Обновление",
                downgrade: "Откат",
                unknown: "НЕИЗВЕСТНО",
            },
            incompatibleDriver: "Установленные драйверы несовместимы с этой прошивкой, нажмите здесь, чтобы скачать последний драйвер.",
        },
        theme: {
            label: "Цветовая тема",
            dark: "Тёмная",
            light: "Светлая",
            system: "Авто",
        },
        topBar: {
            saveBothHint: "Сохранить профиль {profile} и профиль микрофона {mic} (Ctrl+S)",
            saveMore: "Другие варианты сохранения",
            saveProfileOnly: "Сохранить только профиль {profile}",
            saveMicOnly: "Сохранить только профиль микрофона {mic}",
            savedBoth: "Профиль {profile} и профиль микрофона {mic} сохранены",
            savedProfile: "Профиль {profile} сохранён",
            savedMic: "Профиль микрофона {mic} сохранён",
            loadTitle: "Загрузить {name}?",
            loadQuestion: "Несохранённые настройки {current} будут потеряны.",
            loadMicQuestion: "Несохранённые настройки Профиля Микрофона {current} будут потеряны.",
            load: "Загрузить",
            saveThenLoad: "Сохранить и загрузить",
            lighting: "Общая подсветка",
            lightingTitle: "Общая подсветка",
            profile: "Профиль",
            profileLabel: "Активный Профиль",
            micProfile: "Микрофон",
            micProfileLabel: "Активный Профиль Микрофона",
            save: "Сохранить",
            showDevice: "Показать GoXLR",
            hideDevice: "Скрыть GoXLR",
        },
        sampleAssign: {
            title: "Назначить на {bank} · {button}",
            bank: "Банк",
            empty: "У этой кнопки пока нет Сэмплов.",
            current: "У этой кнопки уже есть Сэмплы ({count}):",
            add: "Добавить",
            replace: "Заменить",
            removing: "Удаление текущих Сэмплов…",
            adding: "Добавление {index} из {total}: {name}…",
            done: "Сэмплов назначено на {bank} · {button}: {count}",
            timeoutRemove: "Демон слишком долго удалял текущие Сэмплы",
            timeout: "{name}: демон слишком долго добавлял этот Сэмпл",
        },
        sampleManager: {
            newFolder: "Новая папка",
            openFolder: "Открыть папку Сэмплов",
            rename: "Переименовать",
            renameFolder: "Переименовать папку",
            renameFolderLabel: "Переименовать папку {name}",
            renameSample: "Переименовать Сэмпл",
            moveTo: "Переместить в...",
            moveTitle: "Переместить {name}",
            moveDestination: "Папка назначения",
            rootFolder: "(Папка Сэмплов)",
            move: "Переместить",
            namePlaceholder: "Название",
            extensionKept: "Расширение {extension} сохраняется.",
            invalidName: "Название не может содержать / или \\.",
            ok: "Ок",
            cancel: "Отмена",
            edit: "Редактировать",
            listen: "Прослушать",
            playPreview: "Проиграть {name}",
            stopPreview: "Остановить {name}",
            delete: "Удалить",
            deleteFolderLabel: "Удалить папку {name}",
            deleteSampleTitle: "Удалить Сэмпл",
            deleteSampleQuestion: "Переместить {name} в корзину?",
            deleteFolderTitle: "Удалить папку",
            deleteFolderQuestion: "Переместить папку {name} и содержащиеся в ней Сэмплы ({count}) в корзину?",
            deleteEmptyFolderQuestion: "Переместить пустую папку {name} в корзину?",
            usedByProfiles: "Используется в этих Профилях:",
            usedByProfilesHint: "Кнопки Сэмплера, которые его используют, больше ничего не будут проигрывать.",
            editTitle: "Редактирование {name}",
            editHelp: "Проведите по волновой форме, чтобы выделить часть, затем оставьте её (обрезка) или удалите. Удалённые части показаны красным.",
            originalLength: "Длительность: {length}",
            resultLength: "После редактирования: {length}",
            selectionRange: "Выделение: {start} - {end}",
            playSelection: "Проиграть выделение",
            playResult: "Проиграть результат",
            stop: "Стоп",
            keepSelection: "Оставить выделение",
            removeSelection: "Удалить выделение",
            undo: "Отменить",
            saveAs: "Сохранить",
            replaceFile: "Заменить файл",
            convertedToWav: "Будет сохранён как файл WAV: {name}",
            saveCopy: "Сохранить как новый файл",
            copyName: "Имя нового файла",
            copyHint: "Сохраняется как файл WAV в той же папке.",
            copySuffix: "(изменён)",
            save: "Сохранить",
            saving: "Сохранение...",
            nothingLeft: "Это удалит весь звук.",
            breadcrumb: "Текущая папка",
            rootName: "Сэмплы",
            search: "Поиск",
            selectedCount: "Выбрано: {count}",
            selectAll: "Выбрать все",
            done: "Готово",
            selectSample: "Выбрать {name}",
            usedByActiveProfile: "Используется в текущем Профиле",
            sizeKb: "{size} КБ",
            sizeMb: "{size} МБ",
            noResults: "Нет Сэмплов, подходящих под этот поиск.",
            emptyFolder: "Эта папка пуста.",
            dropHint: "Перетащите сюда аудиофайлы, чтобы импортировать их в эту папку.",
            duplicate: "Дублировать",
            import: "Импортировать Сэмплы",
            importing: "Импорт...",
            multiSelect: "Выбрать несколько",
            trash: "Корзина",
            trashCount: "Корзина ({count})",
            moveManyTitle: "Переместить Сэмплы ({count})",
            deleteSamplesQuestion: "Переместить эти Сэмплы ({count}) в корзину?",
            trashHint: "Его можно будет восстановить из корзины в течение 30 дней.",
            moveToTrash: "В корзину",
            trashEmpty: "Корзина пуста.",
            folderCount: "Сэмплов: {count}",
            restore: "Восстановить",
            deleteForever: "Удалить",
            trashRetention: "Элементы удаляются навсегда через 30 дней.",
            emptyTrash: "Очистить корзину",
            emptyTrashConfirm: "Нажмите ещё раз, чтобы удалить всё",
            close: "Закрыть",
            trimSilence: "Обрезать тишину",
            normalize: "Нормализовать громкость (самый громкий пик на -1dB)",
            onlySilence: "В этом Сэмпле только тишина.",
            noSilence: "Нет тишины для обрезки в начале или в конце.",
            errorTitle: "Не удалось выполнить это действие",
        },
        // For these, the keys map directly to their GoXLR Channel Names
        channels: {
            StreamMix1: "Stream Mix 1",
            StreamMix2: "Stream Mix 2",
            All: "Все",
            Mic: "Микрофон",
            Chat: "Voice Chat",
            Music: "Music",
            Game: "Game",
            Console: "Console",
            LineIn: "Line In",
            System: "System",
            Sample: "Samples",
            LineOut: "Line Out",
            Headphones: "Наушники",
            MicMonitor: "Мониторинг",
            StreamMix: "Stream Mix",
            ChatMic: "Chat Mic",
            Sampler: "Sampler",
            VOD: "VOD",
        },

        faders: {
            A: "Канал 1",
            B: "Канал 2",
            C: "Канал 3",
            D: "Канал 4"
        },

        suffixes: {
            decibels: "дБ",
            percentage: "%",
            milliseconds: "мс",
            hertz: "Гц",
            kilohertz: "КГц",
            ratio: ":{value}",
            beatsPerMinute: "BPM",
        },

        modalButtons: {
            continue: "Продолжить",
            close: "Закрыть",
            ok: "Ок",
            yes: "Да",
            no: "Нет",
            cancel: "Закрыть"
        },

        // These Strings appear in the tabs throughout the pages
        navigation: {
            library: "Библиотека",
            application: "Приложение",
            // Tabs at the top of the Page
            profiles: "Профили",
            samples: "Сэмплы",

            // Main Navigation Tabs
            microphone: "Микрофон",
            mixer: "Микшер",
            effects: "Эффекты",
            sampler: "Сэмплер",
            routing: "Маршрутизация",
            system: "Система",

            // Navigation Sections on the Lighting Page

            // Accessibility Messages (these are announced to screen readers)
            accessibilityDeviceSection: "Настройки Устройства",
        },

        // Strings that appear in the Mic tab, note that the Profile Strings are handled in 'profileManager'
        microphone: {
            chain: {
                title: "Цепочка обработки",
                input: "Вход",
                gate: "Гейт",
                gateToggle: "Шумовой гейт включён",
                threshold: "Порог",
                equaliser: "Эквалайзер",
                bands: "Полос: {count}",
                flat: "Ровный",
                eqPeak: "{gain} dB на {freq}",
                compressor: "Компрессор",
                compressorDetail: "Порог {threshold} dB",
                curveHintFine: "перетащите точку вверх или вниз для изменения уровня, в сторону для изменения частоты",
                fineTune: "Настроить частоты",
                bandLabel: "Полоса на {freq}",
                curveHint: "перетащите точку, чтобы настроить её полосу",
            },
            profiles: {
                title: "Профили Микрофона"
            },

            setup: {
                phantomTitle: "Включить фантомное питание (+{voltage} В)?",
                phantomWarning: "Только для конденсаторных микрофонов, которым оно нужно. Сначала убавьте громкость наушников и стрима: при включении возможен громкий щелчок.",
                phantomEnable: "Включить",
                button: "Настройка",
                title: "Настройка Микрофона",
                type: "Тип Микрофона",
                gain: "Усиление",

                // Microphone Types
                xlr: "XLR Микрофон",
                phantom: "XLR + Фантомное (+{voltage}V)",
                jack: "3.5мм",
            },

            waveform: {
                loud: "Слишком громко",
                good: "Хорошо",
                gate_estimated: "Положение порога приблизительно"
            },

            gate: {
                title: "Гейт",
                threshold: "Порог",
                attenuation: "Приглушение",
                attack: "Атака",
                release: "Восстановление",
            },

            equaliser: {
                resetTitle: "Сбросить эквалайзер?",
                resetQuestion: "Все полосы вернутся к 0 дБ и частоте по умолчанию. «До / После» позволяет вернуть сохранённый эквалайзер, пока вы не сохраните.",
                compare: "Сравнить с сохранённым эквалайзером",
                before: "До",
                after: "После",
                save: "Сохранить",
                saveHint: "Сохраняет эквалайзер в Профиль Микрофона {profile}",
                savedNotice: "Эквалайзер сохранён в Профиль Микрофона {profile}",
                title: "Эквалайзер",
                reset: "Сброс",
            },

            compressor: {
                title: "Компрессор",
                amount: "Уровень",
                threshold: "Порог",
                ratio: "Соотношение",
                attack: "Атака",
                release: "Восстановление",
                makeUpGain: "Усиление после",
            },

            extras: {
                title: "Дополнительно",
                deEsser: "Де-эссер",
                bleep: "БИИП",
            }
        },

        mixer: {
            otherInputs: "Другие Вводы",
            strip: {
                source: "Источник",
                mute: "Заглушить",
                muteFunction: "Заглушить для",
                lighting: "Подсветка {channel}",
                lightingTitle: "Подсветка · {channel}",
            },
            submixHint: "Второй микс (Микс B) для каждого канала, включая фейдеры, чтобы отправлять разные уровни на некоторые выводы.",
            // Box Headers
            outputs: "Выводы",
            mixAssignment: "Назначение Микса",

            // Submix Checkbox
            submix: "Подмикс",

            // Mix Assignment
            channelA: "A",
            channelB: "B"
        },

        // Strings in the Configuration Tab
        configuration: {
            // This is common between Faders and Cough Buttons
            mute_behaviour: {
                base: "Заглушить для {channel}",
                all: "Заглушить для Всего",
            },
            muteBehaviourTitle: "Поведение Заглушения",
            muteBehaviourLabel: "Поведение Заглушения для {channel}",

            // Config for the Faders
            faders: {
                sourceLabel: "Источник для {channel}",
            },

            // Configuration for the Cough Button
            cough: {
                lighting: "Подсветка",
                lightingTitle: "Подсветка кнопок Cough и БИИП",
                behaviour: {
                    hold: "Удержание",
                    toggle: "Переключение",
                },

                title: "Настройки кнопки Cough",
                behaviourTitle: "Поведение кнопки",
            }
        },

        effects: {
            lighting: {
                title: "Подсветка эффектов",
                presetButton: "Кнопка пресета · {name}",
                applyPresets: "Применить ко всем пресетам",
                encoders: "Энкодеры",
                applyEncoders: "Применить ко всем энкодерам",
                buttons: "Кнопки Эффектов",
                applyButtons: "Применить ко всем кнопкам эффектов",
            },
            face: {
                label: "Эффекты",
                master: "Эффекты",
                enabled: "Вкл",
                on: "вкл",
                off: "выкл",
                power: "Включить или выключить {effect}",
            },
            preset: {
                name: "Название",
                title: "Пресет",
                group: "Группа",

                menuLoad: "Загрузить",
                menuRename: "Переименовать",
                menuSave: "Сохранить в Библиотеку",


                loadPreset: "Загрузить пресет",


                noPresets: "В Библиотеке пока нет Пресетов, сохраните или скопируйте, чтобы они появились здесь.",
                loadPresetOk: "@:message.modalButtons.ok",

                confirmTitle: "Подтвердить загрузку Пресета",
                confirmMessage: "Загрузка этого Пресета заменить любые несохранённые изменения на этом Банке Эффектов, хотите продолжить?",
                confirmOk: "@:message.modalButtons.ok",
                confirmCancel: "@:message.modalButtons.cancel",

                overwriteTitle: "Подтвердить перезапись Пресета",
                overwriteMessage: "Пресет {current} уже существует в Библиотеке, хотите перезаписать?",
                overwriteConfirm: "Перезаписать",
                overwriteCancel: "@:message.modalButtons.cancel",

                accessibilityOpenPresetDirectory: "Открыть папку Пресетов",
                accessibilityPresetLoaded: "Пресет {name} загружен в {bank}",
                accessibilityPresetSaved: "Пресет {name} сохранён в Библиотеку",
            },
            reverb: {
                title: "Реверб",
                style: "Стиль",

                styles: {
                    library: "Библиотека",
                    darkBloom: "Тёмное Цветение",
                    musicClub: "Музыкальный Клуб",
                    realPlate: "Пластина (Real Plate)",
                    chapel: "Часовня",
                    hockeyArena: "Хоккейная Арена"
                },

                amount: "Уровень",
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
                title: "Эхо",

                style: "Стиль",
                styles: {
                    quarter: "Четверть",
                    eighth: "Восьмая",
                    triplet: "Триплет",
                    pingPong: "Пинг Понг",
                    classicSlap: "Классический Слэп",
                    multiTap: "МультиТап"
                },

                amount: "Уровень",
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
                title: "Высота",

                style: "Диапазон",
                styles: {
                    narrow: "Узкий",
                    wide: "Широкий"
                },

                amount: "Уровень",
                character: "Характер"
            },

            gender: {
                title: "Гендер",

                style: "Диапазон",
                styles: {
                    narrow: "Узкий",
                    medium: "Средний",
                    wide: "Широкий"
                },

                amount: "Уровень"
            },

            megaphone: {
                title: "Мегафон",

                style: "Стиль",
                styles: {
                    megaphone: "Мегафон",
                    radio: "Радио",
                    onThePhone: "Как по телефону",
                    overdrive: "Перегрузка",
                    buzzCutt: "Buzz Cutt",
                    tweed: "Tweed"
                },

                amount: "Уровень",
                postGain: "Усиление после"
            },

            robot: {
                title: "Робот",

                style: "Стиль",
                styles: {
                    robot1: "Робот 1",
                    robot2: "Робот 2",
                    robot3: "Робот 3",
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
                title: "Хард-тюн",

                style: "Стиль",
                styles: {
                    natural: "Натуральный",
                    medium: "Средний",
                    hard: "Тяжёлый"
                },

                amount: "Уровень",
                rate: "Степень",
                window: "Окно",

                source: "Источник"
            }
        },

        sampler: {
            lighting: {
                label: "Подсветка",
                title: "Подсветка Сэмплера",
                bank: "Кнопки Банка {bank}",
                note: "Устройство задаёт эти цвета для всего банка, все четыре кнопки используют одни и те же цвета.",
                applyBanks: "Применить ко всем банкам",
            },
            pads: {
                title: "Кнопки",
                empty: "Пусто",
                count: "Сэмплов: {count}",
                dropHere: "Отпустите, чтобы назначить",
            },
            banks: {
                bankTitle: "Банк",
                bank: {
                    a: "A",
                    b: "B",
                    c: "C"
                },
                buttonLabel: "Кнопка для Банка {activeBank}",
                buttons: {
                    topLeft: "Верхняя Левая",
                    topRight: "Верхняя Правая",
                    bottomLeft: "Нижняя Левая",
                    bottomRight: "Нижняя Правая",
                },

                functionTitle: "Функция",
                functionLabel: "Функция для {activeButton} кнопки в Банке {activeBank}",
                functions: {
                    playNext: "Воспроизвести / Далее",
                    playStop: "Воспроизвести / Стоп",
                    playFade: "Воспроизвести / Затухание",
                    stopOnRelease: "Стоп при Отпускании",
                    fadeOnRelease: "Затухание при Отпускании",
                    loop: "Повтор"
                },

                playOrderTitle: "Порядок проигрывания",
                playOrderLabel: "Порядок проигрывания для кнопки {activeButton} в Банке {activeBank}",
                playOrders: {
                    sequential: "Последовательно",
                    random: "Случайно",
                },
            },

            samplesTitle: "Сэмплы",
            samples: {
                genericError: "Произошла неизвестная ошибка.",
                samplesTitle: "Сэмплы",
                samplesLabel: "Сэмплы для кнопки {activeButton} в Банке {activeBank}",

                // Button at the bottom of the Sample List
                addSample: "+",
                addSampleLabel: "Добавить Сэмпл",
                sampleSelector: {
                    parentDirectory: "Родительская папка",
                    addButton: "Добавить",

                    noSamples: "На данный момент, нет Сэмплов в папке Сэмплов. Перенесите их туда, чтобы их можно было ввыбрать здесь!",

                    // Used with Screen Readers
                    directories: "Папки",
                    samples: "Сэмплы",
                },

                gain: "Усиление",
                waveform: {
                    title: "Waveform",

                    // These are primarily for accessibility, but are labels on the various buttons.
                    text: "Waveform для {sample}",

                    // The Play / Stop button before the waveform
                    playbackSample: "Проиграть Сэмпл",
                    stopSample: "Остановить Сэмпл",

                    // Labels for the draggable 'Handles'
                    sampleStart: "Старт Сэмпла",
                    sampleEnd: "Конец Сэмпла",

                    sampleDeleted: "Сэмпл {sampleName} был удалён с кнопки {activeButton} в Банке {activeBank}",
                    zoomLevel: "Уровень приближения: {level}",
                },

                addSampleWaitTitle: "Пожалуйста, подождите",
                addSampleAnalysing: "Подождите, пока Сэмпл проанализируется.",
                addSampleProgress: "Прогресс: {progress}@:message.suffixes.percentage",

                errorTitle: "Ошибка при добавлении Сэмпла",
                errorText: "При добавлении Сэмпла в Банк произошла ошибка:",

                accessibilityOpenSamplesDirectory: "Открыть папку Сэмплов",
                accessibilityAnalysing: "Пожалуйста, подождите, Cэмпл анализируется. Процесс может занять пару минут.",
                accessibilityAdded: "Сэмпл {name} добавлен к кнопке {activeButton} в Банке {activeBank}."
            }
        },

        lighting: {
            channel: {
                applyFaders: "Применить ко всем фейдерам",
                applyMutes: "Применить ко всем кнопкам заглушения",
                openIcons: "Открыть папку иконок",
                display: "Отображение",
                preview: "Предпросмотр",
                previewFader: "фейдер",
                previewMeter: "измеритель",
                hintTwoColour: "Ниже фейдера: нижний цвет. Выше: верхний цвет.",
                hintGradient: "Ниже фейдера: переход от нижнего цвета к верхнему. Выше: выключено.",
                hintMeter: "Светодиоды показывают уровень звука канала, а не положение фейдера.",
                hintGradientMeter: "Светодиоды показывают уровень звука канала с переходом от нижнего цвета к верхнему.",
                previewScreen: "экран",
                previewActive: "активно",
                previewMute: "MUTE",
                previewRest: "в покое",
            },
            // These are some common strings that are used in multiple places
            common: {
                pickColour: "выберите цвет",
                restLabel: "В покое",
                restColour: "Цвет в покое",
                restDimmedHint: "Кнопка показывает свой активный цвет, но тусклее: выбирать цвет не нужно.",
                brightness: "Яркость",

                activeColour: "Активированный",

                inactiveOption: "Опция для Неактивированных",
                inactiveOptions: {
                    dimActiveColour: "Тусклый Цвет Активированного",
                    inactiveColour: "Цвет Неактивированного",
                    dimInactiveColour: "Тусклый Цвет Неактивированного"

                },

            },

            global: {
                areas: {
                    title: "Зоны",

                    area: "Зона",
                    areas: {
                        global: "Вся",
                        accent: "Логотип",
                    },

                },

                animations: {
                    title: "Анимации",

                    mode: "Режим Анимации",
                    modes: {
                        none: "Никакой",
                        rainbowRetro: "Радуга - Ретро",
                        rainbowBright: "Радуга - Светлая",
                        rainbowDark: "Радуга - Тёмная",
                        simple: "Дыхание",
                        ripple: "Рябь",
                    },

                    mod1: "Модификация градиента 1",
                    mod2: "Модификация градиента 2",

                    waterfall: "Водопад - Настройка",
                    waterfallOff: "Откл",
                }
            },

            mixer: {

                fader: {
                    title: "Фейдер",

                    style: "Стиль",
                    styles: {
                        gradient: "Градиент",
                        meter: "Измеритель",
                    },

                    bottomColour: "Нижний Цвет",
                    topColour: "Верхний Цвет",

                },

                screen: {
                    title: "Экран",
                    backgroundColour: "Фоновый цвет",
                    icons: "Иконки",
                    iconNone: "-- НЕТ --",

                    options: {
                        showNumber: "Показывать номер",
                        invertDisplay: "Инвертировать дисплей",
                        text: "Текст",

                        accessibilityText: "Текст для отображения на экране GoXLR"
                    }
                },

                mute: {
                    // Pretty much all other fields for this area come from 'Common'
                    title: "Заглушение",
                }
            },

            effects: {

                encoders: {
                    title: "Энкодеры",

                    encoder: "Энкодер",
                    encoders: {
                        reverb: "Реверб",
                        echo: "Эхо",
                        pitch: "Высота",
                        gender: "Гендер",
                    },

                    leftColour: "Левый Цвет",
                    rightColour: "Правый Цвет",
                    knobColour: "Цвет Ручки"
                },

                buttons: {
                    title: "Кнопки Эффектов",

                    effect: {
                        megaphone: "Megaphone",
                        robot: "Robot",
                        hardTune: "Hardtune",
                        fx: "FX"
                    }
                },
            },
            sampler: {

                buttons: {
                    a: "A",
                    b: "B",
                    c: "C"
                },

                active: "Активен / Загружен",
                empty: "Нет Сэмпла",
            },

            cough: {

                buttons: {
                    bleep: "БИИП",
                    cough: "Cough",
                }
            },
        },

        routing: {
            // There are (frustratingly) some minor differences between how channels appear in the routing table,
            // and how they appear in the Mixer, these changes also fall under the hood at the Utility level, so
            // we'll define all the channels here, and 'fix' anything which needs adjustment.
            title: "Маршрутизация",

            input: "Вводы",
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

            output: "Выводы",
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
                title: "Доступ по сети",
                explain: "На другом устройстве в вашей сети (планшет, телефон, компьютер) откройте одну из этих ссылок один раз. После этого доступ будет запомнен.",
                restart: "Перезапустите GoXLR Utility, чтобы открыть к ней доступ из вашей сети. После этого здесь появятся ссылки.",
                noAddress: "Не найден сетевой адрес этого компьютера.",
                copy: "Копировать",
                copied: "Скопировано",
                regenerate: "Новая ссылка (старые ссылки перестанут работать)",
            },
            menu: {
                firmware: "Обновление прошивки",
            },
            firmwareUpdate: {
                seeLogs: "Подробности в журналах утилиты (Система, Настройки утилиты, Открыть журналы).",
                noInfo: "Серверы обновлений не ответили, поэтому последняя версия неизвестна. На этом GoXLR установлена версия {currentVersion}.",
                updateTo: "Обновить до {version}",
                reinstall: "Переустановить {version}",
                customButton: "Своя прошивка…",
                confirmTitle: "Прошить устройство?",
                confirmText: "GoXLR перезагрузится во время обновления. Не отключайте его и не закрывайте утилиту, пока обновление не завершится.",
                confirmCustom: "Далее вы выберете файл прошивки (.bin). Используйте только файл, которому доверяете: неправильный файл может сделать GoXLR неработоспособным. Не отключайте его во время обновления.",
                betaWarning: "Вы собираетесь установить бета-версию прошивки.\nЭта версия не получает официальной поддержки и может содержать ошибки или проблемы, которые мы не сможем исправить.",
                newVersionAvailable: "Для вашего устройства доступна более новая версия прошивки ({latestVersion}).\nОбновить устройство сейчас?",
                currentVersionIsNewer: "Ваша текущая версия прошивки ({currentVersion}) новее последней доступной версии прошивки ({latestVersion}) для вашего устройства.\nОткатиться до последней доступной версии прошивки?",
                currentIsUpToDate: "Ваша прошивка уже обновлена.\nПереустановить текущую версию прошивки?",
                customFirmware: "Вы собираетесь установить свою прошивку.\nЭто не рекомендуется, если вы не знаете, что делаете.\nВы уверены, что хотите продолжить?",
                warning: "Вы собираетесь записать новую версию прошивки на ваше устройство.\nРазработчики GoXLR Utility не несут ответственности за любые повреждения, которые могут быть вызваны этим процессом. ",
                warningInfo: "Подробнее",
                updatePaused: "Вы собираетесь установить прошивку версии {version}. Вы уверены, что хотите продолжить?",
                updateInProgress: "Идёт обновление прошивки. Пожалуйста, подождите и не отключайте устройство!",
                completed: "Обновление прошивки успешно завершено.",
                failed: "Во время обновления прошивки что-то пошло не так. Пожалуйста, попробуйте ещё раз.",
                changelog: "Список изменений версии {version}:",
                title: "Установка прошивки...",
                progress: {
                    starting: "Запуск...",
                    manifest: "Получение манифеста...",
                    download: "Загрузка прошивки...",
                    pause: "Обновление приостановлено",
                    clearNVR: "Подготовка раздела обновления...",
                    uploadFirmware: "Отправка прошивки...",
                    validateUpload: "Проверка отправленной прошивки...",
                    hardwareWrite: "Запись прошивки...",
                    hardwareValidate: "Проверка прошивки...",
                    complete: "Обновление завершено",
                    failed: "Не удалось завершить обновление прошивки",
                },
            },
            firmwareUpdateButton: {
                update: "Обновить прошивку",
                downgrade: "Откатить прошивку",
                reinstall: "Переустановить прошивку",
                custom: "Своя прошивка",
            },
            title: "Система",

            powerButton: "Действия Питания",
            power: {
                shutdownTitle: "Действия при Завершении Работы",
                shutdownDescription: "Эти действия будут исполнены, когда GoXLR Utility безопасно отключён.",

                sleepTitle: "Действия при Сне",
                sleepDescription: "Эти действия будут исполнены, когда ваша система перейдёт в режим Сна.",

                wakeTitle: "Действия при Пробуждении",
                wakeDescription: "Эти действия будут исполнены, когда ваша система проснётся от режима Сна.",

                settingsError: "Похоже, что Конфигурация была изменена вручную, во избежание повреждений, интерфейс здесь не будет работать. Чтобы полностью сбросить Действия при Завершении Работы, нажмите кнопку ниже",
                settingsReset: "Сбросить Действия при Завершении Работы",

                power_options: {
                    reload: "Перезагрузить Настройки",
                    saveProfile: "Сохранить Профиль",
                    loadProfile: "Загрузить Полный профиль",
                    loadColourProfile: "Загрузить Цвета Профиля",
                    saveMicProfile: "Сохранить Профиль Микрофона",
                    loadMicProfile: "Загрузить Профиль Микрофона",
                }
            },

            deviceButton: "Настройки Устройства",
            device: {
                samplerFadeDuration: "Длительность затухания Сэмплера",
                samplerFadeDurationAccessibility: "Длительность в миллисекундах, в течение которой сэмплер будет затухать при остановке воспроизведения",
                holdDuration: "Длительность удержания кнопки Заглушить, чтобы Заглушить Всё",
                holdDurationAccessibility: "Длительность в миллисекундах, в течение которой необходимо удерживать кнопку отключения звука, чтобы отключить все каналы",

                sampleBuffer: "Буфер предзаписи Сэмплера (в секундах)",
                sampleBufferAccessibility: "Длительность в секундах, которую будет записывать сэмплер перед нажатием кнопки",

                voiceDeafen: "Заглушить Всё Voice Chat'а также заглушает Микрофон для Chat Mic",
                voiceDeafenAccessibility: "Когда заглушаются Все каналы, также глушится Микрофон для Chat Mic",

                monitorWithFx: "Включать Мониторинг вместе с Эффектами(FX)",
                monitorWithFxAccessibility: "Включить мониторинг микрофона, когда включены эффекты",

                resetSampleFunctionOnClear: "Сброс функции Сэмпла при Очистке",
                resetSampleFunctionOnClearAccessibility: "Сбрасывает функцию Сэмпла на Старт / Далее при Очищении",

                lockFaders: "Не передвигать Фейдеры при Заглушении для Всего",
                lockFadersAccessibility: "Не давать фейдера передвигаться вниз, когда включён Заглушить для Всего",
            },

            settingsButton: "Настройки Утилиты",
            settings: {
                recoverConfirmTitle: "Восстановить файлы по умолчанию?",
                recoverConfirmMessage: "Недостающие {type} по умолчанию будут добавлены снова. Существующие файлы не изменяются.",
                recoverConfirmOk: "Восстановить",
                recoverDone: "{type} по умолчанию восстановлены",
                shutdownConfirmTitle: "Вы уверены?",
                shutdownConfirmMessage: "Вы уверены, что хотите отключить GoXLR Utility?",
                settingsRegionAccessibility: "настройки",
                macosAggregateManagement: "Отключить управление агрегатными устройствами MacOS (нужен рестарт)",
                macosAggregateManagementAccessibility: "Отключает управление агрегатными устройствами Утилитой на MacOS (нужен рестарт)",
                firmwareSource: "Канал обновления прошивки",
                firmwareSources: {
                    live: "Стабильный",
                    beta: "Бета",
                },
                language: "Язык",
                useSystem: "Использовать Системный Язык (если доступен)",

                uiHandler: "Обработчик Интерфейса",
                uiHandlers: {
                    browser: "Браузер",
                    app: "Приложение",
                    custom: "Пользовательский"
                },


                logLevel: "Уровень Логов (нужен рестарт)",
                logLevels: {
                    off: "Откл",
                    error: "Error",
                    warn: "Warn",
                    info: "Info",
                    debug: "Debug",
                    trace: "Trace"

                    // OFF / ERROR / WARN / INFO / DEBUG / TRACE
                },

                allowNetworkAccess: "Дать Сетевой Доступ к Интерфейсу (нужен рестарт)",
                allowNetworkAccessAccessibility: "Разрешить доступ к Интерфейсу с других устройств в сети",

                autoStart: "Автозапуск при Входе",
                autoStartAccessibility: "Запускать GoXLR Utility, когда пользователь входит в систему",

                showOnLaunch: "Показывать Интерфейс при Запуске",
                showOnLaunchAccessibility: "Автоматически открывать Интерфейс при запуске",

                showTray: "Показывать Иконку в Трее (нужен рестарт)",
                showTrayAccessibility: "Показывать иконку GoXLR Utility в системном трее",

                ttsOnButton: "TTS при нажатии кнопок",
                ttsOnButtonAccessibility: "Произносит статус кнопки при нажатии, либо через программу чтения с экрана, либо через системный TTS",

                recoverDefaults: "Восстановить по умолчанию",
                recoverOptions: {
                    profiles: "Профили",
                    micProfiles: "Профили Микрофона",
                    icons: "Иконки",
                    presets: "Пресеты"
                },

                shutdownUtility: "Отключить GoXLR Utility"
            },

            aboutButton: "О GoXLR",
            about: {
                serial: "Серийный номер",
                utilityVersion: "Версия Утилиты",
                driverVersion: "Версия Драйвера",
                hardwareVersion: "Версия Аппаратной части",

                firmware: "Прошивка",
                dice: "DICE",
                fpga: "FPGA"
            },

            licenses: "Лицензии",
            help: "Помощь",
        },

        // Strings used in Profile and Microphone Profile Management.
        profileManager: {
            trashTitle: "Удалённые Профили",
            trashEmpty: "Нет удалённых Профилей. Удалённые Профили хранятся здесь 30 дней.",
            trashProfile: "Профиль",
            trashMic: "Профиль Микрофона",
            // Accessibility Titles for the buttons at the bottom of the Profile List
            saveProfileName: "Сохранить Профиль {profileName}",
            createProfile: "Создать Профиль",

            // Dialog Popup when clicking 'Create Profile' Button
            newTitle: "Источник нового Профиля",
            newQuestion: "Вы хотите создать новый Профиль из базового или из текущего?",
            newDefaultButton: "Базовый",
            newCurrentButton: "Текущий",
            newCancelButton: "@:message.modalButtons.cancel",

            // Dialog Popup when hitting the 'Save Profile' button
            overwriteTitle: "Подтвердить Перезапись",
            overwriteQuestion: "Вы уверены, что хотите перезаписать Профиль {activeProfile}?",
            overwriteYes: "@:message.modalButtons.yes",
            overwriteNo: "@:message.modalButtons.no",

            // Dialog Popup when clicking the 'Delete' Menu Item
            deleteTitle: "Подтвердить Удаление",
            deleteQuestion: "Вы уверены, что хотите удалить профиль {profileName}?",
            deleteYes: "@:message.modalButtons.yes",
            deleteNo: "@:message.modalButtons.no",

            // Dialog prompting for a new Profile Name
            newNameTitle: "Введите название нового Профиля",
            newNamePlaceHolder: "Название профиля",
            newNameOk: "@:message.modalButtons.ok",
            newNameCancel: "@:message.modalButtons.cancel",

            // Dialog Popup when attempting to delete the active profile
            deleteCurrentErrorTitle: "Не удаётся удалить",
            deleteCurrentErrorMessage: "Нельзя удалить текущий Профиль.",

            // Items in the Popup Menu on Profiles
            menuLoadProfile: "Загрузить Профиль",
            menuLoadProfileColours: "Загрузить только Цвета",
            menuDeleteProfile: "Удалить Профиль",


            // Accessibility Messages (these are announced to screen readers)
            accessibilityLoadedProfile: "Профиль {profileName} загружен",
            accessibilityLoadedColours: "Цвета Профиля {profileName} загружены",
            accessibilityCreatedProfile: "Создан Профиль {profileName}",
            accessibilitySavedProfile: "Профиль {profileName} сохранён",
            accessibilitySavedProfileAs: "Профиль {profileName} сохранён как {newProfileName}",
            accessibilityProfileDeleted: "Профиль {profileName} удалён",
            accessibilityDropMenuTitle: "Опции {profileName}",
            accessibilityOpenProfileDirectory: "Открыть папку Профилей",
            accessibilityOpenMicProfileDirectory: "Открыть папку Профилей Микрофона",
        },
    }
}
