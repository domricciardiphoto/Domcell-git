const {
    app,
    BrowserWindow,
    Menu,
    BrowserView,
    globalShortcut
} = require('electron')

const {autoUpdater,AppUpdater} = require('electron-updater');


let curWindow;

autoUpdater.autoDownload = false;
autoUpdater.autoInstallonAppQuit = true;








process.env.NODE_ENV = 'production'
const isDev = process.env.NODE_ENV !== ' production' ? true : false
console.log(process.platform)

let mainWindow
let aboutWindow
let BuilderWindow



function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: 'Domcell Badge Builder',
        icon: `${__dirname}./assets/icons/icon-domcell.png`,
        width: 1920,
        height: 1080,
        hasShadow: true,
        darkTheme: true,
        visualEffectState: 'active',
        titleBarOverlay: true,
        allowRunningInsecureContent: true,
        
    })
    mainWindow.loadFile('./app/index.html');
    autoUpdater.checkForUpdates();
    //curWindow.ShowMessage('Checking for Updates')
}

function createAboutWindow() {
    aboutWindow = new BrowserWindow({
        title: 'About Domcell Badge Builder',
        icon: `${__dirname}./assets/icons/icon-domcell.png`,
        width: 500,
        height: 500,
        hasShadow: true,
        darkTheme: true,
        visualEffectState: 'active',
        titleBarOverlay: true,
        allowRunningInsecureContent: true,
        titleBarStyle: 'hidden',
        alwaysOnTop: true,


    })
    aboutWindow.loadFile('./app/about.html')

}


function createBuilderWindow() {
    builderWindow = new BrowserWindow({
        title: 'Overview Content Builder',
        icon: `${__dirname}./assets/icons/favicon-32.png`,
        width: 1920,
        height: 1080,
        hasShadow: true,
        darkTheme: true,
        visualEffectState: 'active',
        titleBarOverlay: true,
        allowRunningInsecureContent: true,


    })
    builderWindow.loadFile('./app/contentbuilder.html')

}




app.on('ready', () => {
    createMainWindow()
    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu)
    globalShortcut.register('CTRL+R', () => mainWindow.reload())
    globalShortcut.register('CTRL+D', () => mainWindow.toggleDevTools())

    mainWindow.on('closed', () => mainWindow = null)


   
  

})


const menu = [


   

    {
        label: 'Tools',
        submenu: [
            {
                label: 'Open Additonal Window',
                click: createMainWindow
            },


            { 
                label:"Reload Window",
                role: 'reload'
            },
            
            {
                role: 'cut'
            },

            {
                role: 'copy'
            },

            {
                role: 'paste'
            },
            
            {
                role: 'toggleDevTools'
            },

            {
                label: 'Quit',
                accelerator: 'Ctrl+Q',
                click: () => app.quit()
            },


        ]

    },


 

    {   
                label: 'About',
                click: createAboutWindow,
    },
       

]





