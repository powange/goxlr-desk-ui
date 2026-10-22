# GoXLR Desk interface

The web interface of [GoXLR Desk](https://github.com/powange/goxlr-desk), an unofficial tool to configure and control
a TC-Helicon GoXLR or GoXLR Mini. GoXLR Desk embeds the built interface (`dist/`) in its daemon, which serves it.

This is a fork of the [GoXLR Utility interface](https://github.com/GoXLR-on-Linux/goxlr-ui), under the same MIT
licence, redesigned: mixer, microphone, effects, sampler and routing pages, a sample library, profiles, scenes, undo,
integrations and system pages. Not affiliated with TC-Helicon nor with the GoXLR Utility project.

## Development
This UI is based on [VueJS](https://vuejs.org), and communicates with the HTTP server embedded in the GoXLR Desk daemon.
Messages are sent and received in accordance with the daemon's IPC format to maintain consistent communication between 
clients. Detailed information on this is available in `src/util/socket.js`.

## Project setup
```
npm install
```

## Debug Mode
Note, that when running in debug mode, the code expects the GoXLR daemon to be running on the default port (14564).

```
npm run dev
```