export default {
    message: {
        common: {
            close: "Cerrar",
            lighting: "Iluminación",
            clear: "Borrar",
            collapseSection: "Contraer Sección",
            expandSection: "Expandir Sección",
            activeProfile: "Perfil Activo",
            switchDevice: "Cambiar de Dispositivo",
            removeSample: "Quitar Muestra",
            waterfallAnimationUp: "Animación en Cascada Hacia Arriba",
            waterfallAnimationDown: "Animación en Cascada Hacia Abajo",
            unknown: "Desconocido",
            tabList: "Lista de pestañas",
        },
        deviceSelector: {
            reconnecting: "Se perdió la conexión con GoXLR Utility, reconectando…",
            title: "Seleccionar Dispositivo",
            connecting: "Intentando conectar con la Utilidad GoXLR...",
            disconnected: "No se puede conectar con la Utilidad GoXLR, comprueba que está en ejecución.\n\nEsta página intentará reconectarse automáticamente...",
            noDevices: "No se han Encontrado Dispositivos GoXLR",
        },
        versionCheck: {
            updateAvailable: "Actualización Disponible",
            firmwareDirectionAvailable: "{direction} de Firmware Disponible",
            firmwareDirections: {
                update: "Actualización",
                downgrade: "Versión Anterior",
                unknown: "DESCONOCIDO",
            },
            incompatibleDriver: "Los controladores instalados no son compatibles con este firmware, haz clic aquí para descargar el controlador más reciente.",
        },
        theme: {
            label: "Tema de color",
            dark: "Oscuro",
            light: "Claro",
            system: "Automático",
        },
        topBar: {
            saveBothHint: "Guardar el perfil {profile} y el perfil de micrófono {mic} (Ctrl+S)",
            saveMore: "Más opciones de guardado",
            saveProfileOnly: "Guardar solo el perfil {profile}",
            saveMicOnly: "Guardar solo el perfil de micrófono {mic}",
            savedBoth: "Perfil {profile} y perfil de micrófono {mic} guardados",
            savedProfile: "Perfil {profile} guardado",
            savedMic: "Perfil de micrófono {mic} guardado",
            loadTitle: "¿Cargar {name}?",
            loadQuestion: "Se perderán los ajustes de {current} que no se hayan guardado.",
            loadMicQuestion: "Se perderán los ajustes del perfil de micrófono {current} que no se hayan guardado.",
            load: "Cargar",
            saveThenLoad: "Guardar y cargar",
            lighting: "Iluminación global",
            lightingTitle: "Iluminación global",
            profile: "Perfil",
            profileLabel: "Perfil activo",
            micProfile: "Micro",
            micProfileLabel: "Perfil de micrófono activo",
            save: "Guardar",
            showDevice: "Mostrar el GoXLR",
            hideDevice: "Ocultar el GoXLR",
        },
        sampleAssign: {
            title: "Asignar a {bank} · {button}",
            bank: "Banco",
            empty: "Este botón aún no tiene muestras.",
            current: "Este botón ya tiene {count} muestra(s):",
            add: "Añadir",
            replace: "Reemplazar",
            removing: "Quitando las muestras actuales…",
            adding: "Añadiendo {index} de {total}: {name}…",
            done: "{count} muestra(s) asignada(s) a {bank} · {button}",
            timeoutRemove: "El daemon ha tardado demasiado en quitar las muestras actuales",
            timeout: "{name}: el daemon ha tardado demasiado en añadir esta muestra",
        },
        sampleManager: {
            newFolder: "Nueva Carpeta",
            openFolder: "Abrir la Carpeta de Muestras",
            rename: "Renombrar",
            renameFolder: "Renombrar Carpeta",
            renameFolderLabel: "Renombrar la carpeta {name}",
            renameSample: "Renombrar Muestra",
            moveTo: "Mover a...",
            moveTitle: "Mover {name}",
            moveDestination: "Carpeta de destino",
            rootFolder: "(Carpeta de muestras)",
            move: "Mover",
            namePlaceholder: "Nombre",
            extensionKept: "Se conserva la extensión {extension}.",
            invalidName: "Un nombre no puede contener / ni \\.",
            ok: "Aceptar",
            cancel: "Cancelar",
            edit: "Editar",
            listen: "Escuchar",
            playPreview: "Reproducir {name}",
            stopPreview: "Detener {name}",
            delete: "Eliminar",
            deleteFolderLabel: "Eliminar la carpeta {name}",
            deleteSampleTitle: "Eliminar Muestra",
            deleteSampleQuestion: "¿Mover {name} a la papelera?",
            deleteFolderTitle: "Eliminar Carpeta",
            deleteFolderQuestion: "¿Mover la carpeta {name} y las {count} muestra(s) que contiene a la papelera?",
            deleteEmptyFolderQuestion: "¿Mover la carpeta vacía {name} a la papelera?",
            usedByProfiles: "Usada por estos perfiles:",
            usedByProfilesHint: "Los botones del sampler que la usan dejarán de reproducir sonido.",
            editTitle: "Editar {name}",
            editHelp: "Arrastra sobre la forma de onda para seleccionar una parte y luego consérvala (recortar) o quítala. Las partes quitadas se muestran en rojo.",
            originalLength: "Duración: {length}",
            resultLength: "Tras la edición: {length}",
            selectionRange: "Selección: {start} - {end}",
            playSelection: "Reproducir Selección",
            playResult: "Reproducir Resultado",
            stop: "Detener",
            keepSelection: "Conservar Selección",
            removeSelection: "Quitar Selección",
            undo: "Deshacer",
            saveAs: "Guardar",
            replaceFile: "Reemplazar el archivo",
            convertedToWav: "Se guardará como archivo WAV: {name}",
            saveCopy: "Guardar como archivo nuevo",
            copyName: "Nombre del archivo nuevo",
            copyHint: "Se guarda como archivo WAV en la misma carpeta.",
            copySuffix: "(editado)",
            save: "Guardar",
            saving: "Guardando...",
            nothingLeft: "Eso eliminaría todo el audio.",
            breadcrumb: "Carpeta actual",
            rootName: "Muestras",
            search: "Buscar",
            selectedCount: "{count} seleccionada(s)",
            selectAll: "Seleccionar Todo",
            done: "Hecho",
            selectSample: "Seleccionar {name}",
            usedByActiveProfile: "Usada por el perfil actual",
            sizeKb: "{size} KB",
            sizeMb: "{size} MB",
            noResults: "Ninguna muestra coincide con esta búsqueda.",
            emptyFolder: "Esta carpeta está vacía.",
            dropHint: "Suelta aquí archivos de audio para importarlos a esta carpeta.",
            duplicate: "Duplicar",
            import: "Importar Muestras",
            importing: "Importando...",
            multiSelect: "Seleccionar Varias",
            trash: "Papelera",
            trashCount: "Papelera ({count})",
            moveManyTitle: "Mover {count} muestras",
            deleteSamplesQuestion: "¿Mover estas {count} muestras a la papelera?",
            trashHint: "Se puede restaurar desde la papelera durante 30 días.",
            moveToTrash: "Mover a la Papelera",
            trashEmpty: "La papelera está vacía.",
            folderCount: "{count} muestra(s)",
            restore: "Restaurar",
            deleteForever: "Eliminar",
            trashRetention: "Los elementos se eliminan definitivamente tras 30 días.",
            emptyTrash: "Vaciar la Papelera",
            emptyTrashConfirm: "Haz clic de nuevo para eliminarlo todo",
            close: "Cerrar",
            trimSilence: "Recortar Silencio",
            normalize: "Normalizar el volumen (pico máximo a -1dB)",
            onlySilence: "Esta muestra está en silencio.",
            noSilence: "No hay silencio que recortar al principio ni al final.",
            errorTitle: "No se ha podido completar esta acción",
        },
        channels: {
            StreamMix1: "Stream Mix 1",
            StreamMix2: "Stream Mix 2",
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
            ChatMic: "Chat Mic",
            Sampler: "Sampler",
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
            continue: "Continuar",
            close: "Cerrar",
            ok: "Aceptar",
            yes: "Sí",
            no: "No",
            cancel: "Cancelar"
        },

        navigation: {
            library: "Biblioteca",
            application: "Aplicación",
            profiles: "Perfiles",
            samples: "Muestras",
            microphone: "Micrófono",
            mixer: "Mezclador",
            effects: "Efectos",
            sampler: "Sampler",
            routing: "Ruteo",
            system: "Sistema",


            accessibilityDeviceSection: "Configuración del Dispositivo",
        },

        microphone: {
            chain: {
                title: "Cadena de procesamiento",
                input: "Entrada",
                gate: "Puerta",
                gateToggle: "Puerta de ruido activada",
                threshold: "Umbral",
                equaliser: "Ecualizador",
                bands: "{count} bandas",
                flat: "Plano",
                eqPeak: "{gain} dB a {freq}",
                compressor: "Compresor",
                compressorDetail: "Umbral {threshold} dB",
                curveHintFine: "arrastra un punto arriba y abajo para su nivel, y a los lados para su frecuencia",
                fineTune: "Ajustar frecuencias",
                bandLabel: "Banda a {freq}",
                curveHint: "arrastra un punto para ajustar su banda",
            },
            profiles: {
                title: "Perfiles de Micrófono"
            },

            setup: {
                phantomTitle: "¿Activar la alimentación phantom (+{voltage} V)?",
                phantomWarning: "Solo para micrófonos de condensador que la necesiten. Baja antes los auriculares y el stream: al activarla puede oírse un fuerte chasquido.",
                phantomEnable: "Activar",
                button: "Configuración de Micrófono",
                title: "Configuración de Micrófono",
                type: "Tipo de Micrófono",
                gain: "Ganancia",

                xlr: "Micrófono XLR",
                phantom: "XLR con Phantom (+{voltage}V)",
                jack: "3.5mm",
            },

            waveform: {
                loud: "Demasiado Alto",
                good: "Bueno",
                gate_estimated: "La Puerta de ruido no es precisa"
            },

            gate: {
                title: "Puerta de Ruido",
                threshold: "Umbral",
                attenuation: "Atenuación",
                attack: "Ataque",
                release: "Liberación",
            },

            equaliser: {
                resetTitle: "¿Restablecer el ecualizador?",
                resetQuestion: "Todas las bandas vuelven a 0 dB y a su frecuencia predeterminada. Antes / Después permite recuperar el ecualizador guardado hasta que guardes.",
                compare: "Comparar con el ecualizador guardado",
                before: "Antes",
                after: "Después",
                save: "Guardar",
                saveHint: "Guarda el ecualizador en el perfil de micrófono {profile}",
                savedNotice: "Ecualizador guardado en el perfil de micrófono {profile}",
                title: "Ecualizador",
                reset: "Restablecer",
            },

            compressor: {
                title: "Compresor",
                amount: "Cantidad",
                threshold: "Umbral",
                ratio: "Relación",
                attack: "Ataque",
                release: "Liberación",
                makeUpGain: "Ganancia de Compensación",
            },

            extras: {
                title: "Extras",
                deEsser: "De-Esser/desempolvador",
                bleep: "Pitido",
            }
        },

        mixer: {
            otherInputs: "Otras Entradas",
            strip: {
                source: "Fuente",
                mute: "Silenciar",
                muteFunction: "Silenciar para",
                lighting: "Iluminación de {channel}",
                lightingTitle: "Iluminación · {channel}",
            },
            submixHint: "Una segunda mezcla (Mezcla B) para cada canal, faders incluidos, para enviar niveles distintos a algunas salidas.",
            outputs: "Salidas",
            mixAssignment: "Asignación de Mezcla",
            submix: "Submezclas",
            channelA: "A",
            channelB: "B"
        },

        configuration: {
            mute_behaviour: {
                base: "Silenciar para {channel}",
                all: "Silenciar para @:message.channels.All",
            },
            muteBehaviourTitle: "Comportamiento de Silenciado",
            muteBehaviourLabel: "Comportamiento de Silenciado para {channel}",

            faders: {
                sourceLabel: "Fuente para {channel}",
            },

            cough: {
                lighting: "Iluminación",
                lightingTitle: "Iluminación de Tos y Pitido",
                behaviour: {
                    hold: "Mantener",
                    toggle: "Alternar",
                },

                title: "Configuración del Botón de la Tos",
                behaviourTitle: "Comportamiento del Botón",
            }
        },

        effects: {
            lighting: {
                title: "Iluminación de los efectos",
                presetButton: "Botón de preset · {name}",
                applyPresets: "Aplicar a todos los presets",
                encoders: "Codificadores",
                applyEncoders: "Aplicar a todos los codificadores",
                buttons: "Botones de efecto",
                applyButtons: "Aplicar a todos los botones de efecto",
            },
            face: {
                label: "Efectos",
                master: "Efectos",
                enabled: "Activado",
                on: "activado",
                off: "desactivado",
                power: "Activar o desactivar {effect}",
            },
            preset: {
                name: "Nombre",
                title: "Preset",
                group: "Grupo",

                menuLoad: "Cargar",
                menuRename: "Renombrar",
                menuSave: "Guardar en Biblioteca",

                loadPreset: "Cargar Preset",


                noPresets: "No tienes presets en la biblioteca, guarda o copia algunos para que aparezcan aquí.",
                loadPresetOk: "@:message.modalButtons.ok",

                confirmTitle: "Confirmar Carga de Preset",
                confirmMessage: "Cargar este preset reemplazaró cualquier cambio no guardado en este banco de efectos, ódesea continuar?",
                confirmOk: "@:message.modalButtons.ok",
                confirmCancel: "@:message.modalButtons.cancel",

                overwriteTitle: "Confirmar Sobrescritura de Preset",
                overwriteMessage: "El preset {current} ya existe en su biblioteca, ¿desea sobrescribirlo?",
                overwriteConfirm: "Sobrescribir",
                overwriteCancel: "@:message.modalButtons.cancel",

                accessibilityOpenPresetDirectory: "Abrir Carpeta de Presets",
                accessibilityPresetLoaded: "Preset {name} cargado en {bank}",
                accessibilityPresetSaved: "Preset {name} guardado en la Biblioteca",
            },
            reverb: {
                title: "Reverberación",
                style: "Estilo",

                styles: {
                    library: "Biblioteca",
                    darkBloom: "Flor Oscura",
                    musicClub: "Club de Mósica",
                    realPlate: "Placa Real",
                    chapel: "Capilla",
                    hockeyArena: "Pista de Hockey"
                },

                amount: "Cantidad",
                decay: "Decaimiento",
                earlyLevel: "Nivel Inicial",
                tailLevel: "Nivel Final",
                preDelay: "Pre-Retardo",
                lowColour: "Color Bajo",
                highColour: "Color Alto",
                highFactor: "Factor Alto",
                diffuse: "Difuso",
                modSpeed: "Velocidad de Modulación",
                modDepth: "Profundidad de Modulación"
            },

            echo: {
                title: "Eco",

                style: "Estilo",
                styles: {
                    quarter: "Cuarto",
                    eighth: "Octavo",
                    triplet: "Tresillo",
                    pingPong: "Ping Pong",
                    classicSlap: "Slap Clósico",
                    multiTap: "MultiTap"
                },

                amount: "Cantidad",
                feedback: "Realimentación",
                tempo: "Tempo",
                delayLeft: "Retardo Izquierdo",
                delayRight: "Retardo Derecho",
                feedbackLeft: "Realimentación Izquierda",
                feedbackRight: "Realimentación Derecha",
                xfbLeftToRight: "XFB Izq a Der",
                xfbRightToLeft: "XFB Der a Izq",
            },

            pitch: {
                title: "Tono",

                style: "Estilo",
                styles: {
                    narrow: "Estrecho",
                    wide: "Amplio"
                },

                amount: "Cantidad",
                character: "Carácter"
            },

            gender: {
                title: "Género",

                style: "Estilo",
                styles: {
                    narrow: "Estrecho",
                    medium: "Medio",
                    wide: "Amplio"
                },

                amount: "Cantidad"
            },

            megaphone: {
                title: "Megáfono",

                style: "Estilo",
                styles: {
                    megaphone: "Megáfono",
                    radio: "Radio",
                    onThePhone: "En el Teléfono",
                    overdrive: "Overdrive",
                    buzzCutt: "Recorte Buzz",
                    tweed: "Tweed"
                },

                amount: "Cantidad",
                postGain: "Ganancia Posterior"
            },

            robot: {
                title: "Robot",

                style: "Estilo",
                styles: {
                    robot1: "Robot 1",
                    robot2: "Robot 2",
                    robot3: "Robot 3",
                },

                lowGain: "Ganancia Baja",
                lowFrequency: "Frecuencia Baja",
                lowWidth: "Ancho Bajo",
                midGain: "Ganancia Media",
                midFrequency: "Frecuencia Media",
                midWidth: "Ancho Medio",
                highGain: "Ganancia Alta",
                                highFrequency: "Frecuencia Alta",
                highWidth: "Ancho Alto",
                waveform: "Forma de Onda",
                pulseWidth: "Ancho de Pulso",
                threshold: "Umbral",
                dryMix: "Mezcla Seco",
            },

            hardTune: {
                title: "Autoajuste",

                style: "Estilo",
                styles: {
                    natural: "Natural",
                    medium: "Medio",
                    hard: "Fuerte"
                },

                amount: "Cantidad",
                rate: "Velocidad",
                window: "Ventana",

                source: "Fuente"
            }
        },

        sampler: {
            lighting: {
                label: "Iluminación",
                title: "Iluminación del sampler",
                bank: "Botones del banco {bank}",
                note: "El dispositivo aplica estos colores a todo el banco: los cuatro botones los comparten.",
                applyBanks: "Aplicar a todos los bancos",
            },
            pads: {
                title: "Botones",
                empty: "Vacío",
                count: "{count} muestra(s)",
                dropHere: "Suelta para asignar",
            },
            banks: {
                bankTitle: "Banco",
                bank: {
                    a: "A",
                    b: "B",
                    c: "C"
                },
                buttonLabel: "Botón para banco {activeBank}",
                buttons: {
                    topLeft: "Arriba Izquierda",
                    topRight: "Arriba Derecha",
                    bottomLeft: "Abajo Izquierda",
                    bottomRight: "Abajo Derecha",
                },

                functionTitle: "Función",
                functionLabel: "Función para botón {activeButton} en banco {activeBank}",
                functions: {
                    playNext: "Reproducir / Siguiente",
                    playStop: "Reproducir / Detener",
                    playFade: "Reproducir / Fundir",
                    stopOnRelease: "Detener al Soltar",
                    fadeOnRelease: "Fundir al Soltar",
                    loop: "Bucle"
                },

                playOrderTitle: "Orden de Reproducción",
                playOrderLabel: "Orden de Reproducción para botón {activeButton} en banco {activeBank}",
                playOrders: {
                    sequential: "Secuencial",
                    random: "Aleatorio",
                },
            },

            samplesTitle: "Muestras",
            samples: {
                genericError: "Ha ocurrido un error desconocido.",
                samplesTitle: "Muestras",
                samplesLabel: "Muestra para botón {activeButton} en banco {activeBank}",

                addSample: "+",
                addSampleLabel: "Añadir Muestra",
                sampleSelector: {
                    parentDirectory: "Carpeta Anterior",
                    addButton: "Añadir",

                    noSamples: "No tienes muestras en la carpeta de muestras. Copia algunas aquí para poder seleccionarlas.",

                    directories: "Carpetas",
                    samples: "Muestras",
                },

                gain: "Ganancia",
                waveform: {
                    title: "Forma de Onda",

                    text: "Forma de Onda para {sample}",

                    playbackSample: "Reproducir Muestra",
                    stopSample: "Detener Muestra",

                    sampleStart: "Inicio de la Muestra",
                    sampleEnd: "Fin de la Muestra",

                    sampleDeleted: "La muestra {sampleName} se ha eliminado del botón {activeButton} en el banco {activeBank}",
                    zoomLevel: "Nivel de Zoom: {level}",
                },

                addSampleWaitTitle: "Por Favor, Espera",
                addSampleAnalysing: "Por favor, espera mientras se analiza la muestra.",
                addSampleProgress: "Progreso: {progress}@:message.suffixes.percentage",

                errorTitle: "Error al Añadir Muestra",
                errorText: "Ha ocurrido un error y no se ha añadido la muestra al banco:",

                accessibilityOpenSamplesDirectory: "Abrir Carpeta de Muestras",
                accessibilityAnalysing: "Por favor, espera mientras se analiza la muestra. Este proceso puede tardar un tiempo.",
                accessibilityAdded: "Muestra {name} añadida al botón {activeButton} en el banco {activeBank}."
            }
        },

        lighting: {
            channel: {
                applyFaders: "Aplicar a todos los faders",
                applyMutes: "Aplicar a todos los botones de silencio",
                openIcons: "Abrir la carpeta de iconos",
                display: "Visualización",
                preview: "Vista previa",
                previewFader: "fader",
                previewMeter: "medidor",
                hintTwoColour: "Por debajo del fader: color inferior. Por encima: color superior.",
                hintGradient: "Por debajo del fader: un degradado del color inferior al superior. Por encima: apagado.",
                hintMeter: "Los LED siguen el nivel de sonido del canal en lugar de la posición del fader.",
                hintGradientMeter: "Los LED siguen el nivel de sonido del canal, con un degradado del color inferior al superior.",
                previewScreen: "pantalla",
                previewActive: "activo",
                previewMute: "MUTE",
                previewRest: "en reposo",
            },
            common: {
                pickColour: "elige un color",
                restLabel: "En reposo",
                restColour: "Color en reposo",
                restDimmedHint: "El botón muestra su color activo atenuado: no hay color que elegir.",
                brightness: "Brillo",

                activeColour: "Activo",

                inactiveOption: "Opción Inactiva",
                inactiveOptions: {
                    dimActiveColour: "Atenuar Color Activo",
                    inactiveColour: "Color Inactivo",
                    dimInactiveColour: "Atenuar Color Inactivo"
                },

            },

            global: {
                areas: {
                    title: "áreas",

                    area: "área",
                    areas: {
                        global: "Global",
                        accent: "Acento",
                    },

                },

                animations: {
                    title: "Animaciones",

                    mode: "Modo de Animación",
                    modes: {
                        none: "Ninguno",
                        rainbowRetro: "Arcoíris Retro",
                        rainbowBright: "Arcoíris Brillante",
                        rainbowDark: "Arcoíris Oscuro",
                        simple: "Simple",
                        ripple: "Onda",
                    },

                    mod1: "Modificador Gradiente 1",
                    mod2: "Modificador Gradiente 2",

                    waterfall: "Ajustes Cascada",
                    waterfallOff: "Apagado",
                }
            },

            mixer: {

                fader: {
                    title: "Fader",

                    style: "Estilo",
                    styles: {
                        gradient: "Gradiente",
                        meter: "Medidor",
                    },

                    bottomColour: "Color Inferior",
                    topColour: "Color Superior",

                },

                screen: {
                    title: "Pantalla",
                    backgroundColour: "Color de Fondo",
                    icons: "Iconos",
                    iconNone: "-- NINGUNO --",

                    options: {
                        showNumber: "Mostrar Número",
                        invertDisplay: "Invertir Pantalla",
                        text: "Texto",

                        accessibilityText: "Texto para mostrar en la pantalla del GoXLR"
                    }
                },

                mute: {
                    title: "mute ",
                }
            },

            effects: {

                encoders: {
                    title: "Codificadores",

                    encoder: "Codificador",
                    encoders: {
                        reverb: "Reverberación",
                        echo: "Eco",
                        pitch: "Tono",
                        gender: "Género",
                    },

                    leftColour: "Color Izquierdo",
                    rightColour: "Color Derecho",
                    knobColour: "Color del Botón"
                },

                buttons: {
                    title: "Botones de Efecto",

                    effect: {
                        megaphone: "Megáfono",
                        robot: "Robot",
                        hardTune: "Autoajuste",
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

                active: "Activo / Cargado",
                empty: "Muestra Vacía",
            },

            cough: {

                buttons: {
                    bleep: "Pitido",
                    cough: "Botón de la Tos",
                }
            },
        },

        routing: {
            title: "Ruteo",

            input: "Entradas",
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

            output: "Salidas",
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
                title: "Acceso a la red",
                explain: "En otro dispositivo de tu red (tableta, móvil, ordenador), abre uno de estos enlaces una vez. Después recordará el acceso.",
                restart: "Reinicia la Utilidad GoXLR para acceder a ella desde tu red. Los enlaces aparecerán entonces aquí.",
                noAddress: "No se ha encontrado ninguna dirección de red para este ordenador.",
                copy: "Copiar",
                copied: "Copiado",
                regenerate: "Nuevo enlace (los enlaces anteriores dejarán de funcionar)",
            },
            menu: {
                firmware: "Actualización de firmware",
            },
            firmwareUpdate: {
                seeLogs: "Los registros de la utilidad tienen los detalles (Sistema, Ajustes de la utilidad, Abrir registros).",
                noInfo: "Los servidores de actualización no han respondido, así que no se conoce la última versión. Este GoXLR tiene la versión {currentVersion}.",
                updateTo: "Actualizar a {version}",
                reinstall: "Reinstalar {version}",
                customButton: "Firmware personalizado…",
                confirmTitle: "¿Instalar el firmware?",
                confirmText: "El GoXLR se reinicia durante la actualización. No lo desconectes ni cierres la utilidad hasta que termine.",
                confirmCustom: "A continuación elegirás un archivo de firmware (.bin). Usa solo un archivo de confianza: un archivo incorrecto puede dejar el GoXLR inutilizable. No lo desconectes durante la actualización.",
                betaWarning: "Estás a punto de instalar una versión beta del firmware.\nEsta versión no recibirá soporte oficial y puede contener errores o problemas que no podemos solucionar.",
                newVersionAvailable: "Hay una versión de firmware más reciente ({latestVersion}) disponible para tu dispositivo.\n¿Quieres actualizar el dispositivo ahora?",
                currentVersionIsNewer: "Tu versión de firmware actual ({currentVersion}) es más reciente que la última versión de firmware disponible ({latestVersion}) para tu dispositivo.\n¿Quieres volver a la última versión de firmware disponible?",
                currentIsUpToDate: "Tu firmware ya está actualizado.\n¿Quieres reinstalar la versión de firmware actual?",
                customFirmware: "Estás a punto de instalar un firmware personalizado.\nNo se recomienda a menos que sepas lo que haces.\n¿Seguro que quieres continuar?",
                warning: "Estás a punto de instalar una nueva versión de firmware en tu dispositivo.\nLos desarrolladores de la Utilidad GoXLR no se hacen responsables de los daños que pueda causar este proceso. ",
                warningInfo: "Más Información",
                updatePaused: "Estás a punto de instalar la versión de firmware {version}. ¿Seguro que quieres continuar?",
                updateInProgress: "Actualización de firmware en curso. ¡Espera y no desconectes tu dispositivo!",
                completed: "La actualización de firmware se ha completado correctamente.",
                failed: "Algo ha fallado durante la actualización de firmware. Inténtalo de nuevo.",
                changelog: "Novedades de la versión {version}:",
                title: "Instalando Firmware...",
                progress: {
                    starting: "Iniciando...",
                    manifest: "Obteniendo Manifiesto...",
                    download: "Descargando Firmware...",
                    pause: "Actualización en Pausa",
                    clearNVR: "Preparando Partición de Actualización...",
                    uploadFirmware: "Subiendo Firmware...",
                    validateUpload: "Validando el Firmware Subido...",
                    hardwareWrite: "Escribiendo Firmware...",
                    hardwareValidate: "Validando Firmware...",
                    complete: "Actualización completada",
                    failed: "No se ha podido completar la Actualización de Firmware",
                },
            },
            firmwareUpdateButton: {
                update: "Actualizar Firmware",
                downgrade: "Volver a Versión Anterior",
                reinstall: "Reinstalar Firmware",
                custom: "Firmware Personalizado",
            },
            title: "Sistema",

            powerButton: "Acción de Encendido",
            power: {
                shutdownTitle: "Acciones de Apagado",
                shutdownDescription: "Estas acciones se ejecutarán cuando se cierre de forma segura la utilidad GoXLR.",

                sleepTitle: "Acciones de Suspensión",
                sleepDescription: "Estas acciones se ejecutarán cuando tu sistema entre en suspensión.",

                wakeTitle: "Acciones al Despertar",
                wakeDescription: "Estas acciones se ejecutarán cuando tu sistema despierte de la suspensión.",

                settingsError: "Parece que la Configuración ha sido modificada manualmente. Para evitar comportamientos inesperados, esta sección ha sido deshabilitada. Para restablecer completamente las acciones de apagado, presiona el botón de abajo.",
                settingsReset: "Restablecer Acciones de Apagado",

                power_options: {
                    reload: "Recargar Configuración",
                    saveProfile: "Guardar Perfil",
                    loadProfile: "Cargar Perfil Completo",
                    loadColourProfile: "Cargar Colores del Perfil",
                    saveMicProfile: "Guardar Perfil de Micrófono",
                                        loadMicProfile: "Cargar Perfil de Micrófono",
                }
            },

            deviceButton: "Configuración del Dispositivo",
            device: {
                samplerFadeDuration: "Duración del Fundido del Sampler",
                samplerFadeDurationAccessibility: "La duración en milisegundos del fundido de salida del sampler cuando se detiene la reproducción",
                holdDuration: "Duración de Mantener el Botón de Silencio para Silenciar Todo",
                holdDurationAccessibility: "La duración en milisegundos que el botón de silencio debe mantenerse presionado para silenciar todos los canales",

                sampleBuffer: "Búfer de Pre-Grabación del Sampler (en segundos)",
                sampleBufferAccessibility: "La duración en segundos que el sampler grabará antes de que se presione el botón",

                voiceDeafen: "Silenciar Chat de Voz también silencia el Mic al Mic de Chat",
                voiceDeafenAccessibility: "Al silenciar el Chat de Voz en todos los canales, también silencia el micrófono para el mic de chat",

                monitorWithFx: "Alternar el Estado de Monitoreo del Mic con Efectos",
                monitorWithFxAccessibility: "Activa el monitoreo del micrófono cuando los efectos están habilitados",

                resetSampleFunctionOnClear: "Restablecer Función de Muestra al Borrar",
                resetSampleFunctionOnClearAccessibility: "Restablece la función de la muestra a Iniciar / Siguiente cuando se borra",

                lockFaders: "Bloquear la posición de los faders al silenciar todo",
                lockFadersAccessibility: "Evita que los faders se desplacen hacia abajo cuando está activo Silenciar Todo",
            },

            settingsButton: "Configuración de la Utilidad",
            settings: {
                recoverConfirmTitle: "¿Restaurar los archivos predeterminados?",
                recoverConfirmMessage: "Se volverán a añadir los {type} predeterminados que falten. Los archivos existentes no se modifican.",
                recoverConfirmOk: "Restaurar",
                recoverDone: "{type} predeterminados restaurados",
                shutdownConfirmTitle: "¿Estás seguro?",
                shutdownConfirmMessage: "¿Estás seguro de que deseas apagar la Utilidad GoXLR?",
                settingsRegionAccessibility: "configuración",
                macosAggregateManagement: "Desactivar la Gestión de Dispositivos Agregados de macOS (requiere reinicio)",
                macosAggregateManagementAccessibility: "Desactiva la gestión de dispositivos agregados de la Utilidad en macOS (requiere reinicio)",
                firmwareSource: "Canal de Actualización del Firmware",
                firmwareSources: {
                    live: "Estable",
                    beta: "Beta",
                },
                language: "Idioma",
                useSystem: "Usar Idioma del Sistema (si está disponible)",

                uiHandler: "Gestor de IU",
                uiHandlers: {
                    browser: "Navegador",
                    app: "Aplicación",
                    custom: "Personalizado"
                },

                logLevel: "Nivel de Registro (requiere reinicio)",
                logLevels: {
                    off: "Apagado",
                    error: "Error",
                    warn: "Advertencia",
                    info: "Información",
                    debug: "Depuración",
                    trace: "Traza"
                },

                allowNetworkAccess: "Permitir Acceso a la Red de la IU (requiere reinicio)",
                allowNetworkAccessAccessibility: "Permite que la IU sea accesible desde otros dispositivos en la red",

                autoStart: "Inicio Automático al Iniciar Sesión",
                autoStartAccessibility: "Inicia la Utilidad GoXLR cuando el usuario inicie sesión",

                showOnLaunch: "Mostrar IU al Iniciar",
                showOnLaunchAccessibility: "Lanza automáticamente la IU al iniciar",

                showTray: "Mostrar Icono en la Bandeja (requiere reinicio)",
                showTrayAccessibility: "Muestra el icono de la utilidad GoXLR en la bandeja del sistema",

                ttsOnButton: "TTS al presionar botón",
                ttsOnButtonAccessibility: "Habla el estado del botón cuando se presiona, ya sea a través del lector de pantalla o TTS del sistema",

                recoverDefaults: "Restablecer Valores Predeterminados",
                recoverOptions: {
                    profiles: "Perfiles",
                    micProfiles: "Perfiles de Micrófono",
                    icons: "Iconos",
                    presets: "Presets"
                },

                shutdownUtility: "Apagar Utilidad GoXLR"
            },

            aboutButton: "Acerca de GoXLR",
            about: {
                serial: "Número de Serie",
                utilityVersion: "Versión de la Utilidad",
                driverVersion: "Versión del Controlador",
                hardwareVersion: "Versión del Hardware",

                firmware: "Firmware",
                dice: "DICE",
                fpga: "FPGA"
            },

            licenses: "Licencias",
            help: "Ayuda",
        },

        profileManager: {
            trashTitle: "Perfiles eliminados",
            trashEmpty: "No hay perfiles eliminados. Los perfiles eliminados se conservan aquí durante 30 días.",
            trashProfile: "Perfil",
            trashMic: "Perfil de micrófono",
            saveProfileName: "Guardar Perfil {profileName}",
            createProfile: "Crear Perfil",

            newTitle: "Nueva Fuente de Perfil",
            newQuestion: "¿Te gustaría crear un nuevo perfil desde la configuración predeterminada o actual?",
            newDefaultButton: "Predeterminado",
            newCurrentButton: "Actual",
            newCancelButton: "@:message.modalButtons.cancel",

            overwriteTitle: "Confirmación de Sobrescritura",
            overwriteQuestion: "¿Estós seguro de que deseas sobrescribir el perfil {activeProfile}?",
            overwriteYes: "@:message.modalButtons.yes",
            overwriteNo: "@:message.modalButtons.no",

            deleteTitle: "Confirmación de Eliminación",
            deleteQuestion: "¿Estás seguro de que deseas eliminar el perfil {profileName}?",
            deleteYes: "@:message.modalButtons.yes",
            deleteNo: "@:message.modalButtons.no",

            newNameTitle: "Introduce el Nuevo Nombre de Perfil",
            newNamePlaceHolder: "Nuevo Nombre",
            newNameOk: "@:message.modalButtons.ok",
            newNameCancel: "@:message.modalButtons.cancel",

            deleteCurrentErrorTitle: "No se Puede Eliminar",
            deleteCurrentErrorMessage: "No es posible eliminar el perfil activo.",

            menuLoadProfile: "Cargar Perfil",
            menuLoadProfileColours: "Cargar Solo Colores",
            menuDeleteProfile: "Eliminar Perfil",

            accessibilityLoadedProfile: "Perfil {profileName} cargado",
            accessibilityLoadedColours: "Colores del perfil {profileName} cargados",
            accessibilityCreatedProfile: "Perfil {profileName} creado",
            accessibilitySavedProfile: "Perfil {profileName} guardado",
            accessibilitySavedProfileAs: "Perfil {profileName} guardado como {newProfileName}",
            accessibilityProfileDeleted: "Perfil {profileName} eliminado",
            accessibilityDropMenuTitle: "Opciones de {profileName}",
            accessibilityOpenProfileDirectory: "Abrir Carpeta de Perfiles",
            accessibilityOpenMicProfileDirectory: "Abrir Carpeta de Perfiles de Micrófono",
        },
    }
}
