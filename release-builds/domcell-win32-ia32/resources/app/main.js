const {
    app,
    BrowserWindow,
    Menu,
    globalShortcut,
    shell,
    webview
} = require('electron')


const{autoUpdater} = require('electron-updater');
const log = require('electron-log');
log.transports.file.resolvePath = () => __dirname + "/logs/main.log";
log.log("Application Version "+app.getVersion())

require('./app/index.js')

autoUpdater.on('update-available' , (info)=> {
    log.info("update-available")
    })
    
    autoUpdater.on('checking-for-update' , ()=> {
        log.info("checking-for-update...")
    })
    
    autoUpdater.on("download-progress" ,(progressTrack) => {
        log.info('\n\ndownload progress')
        log.info(progressTrack)
    })
    
    autoUpdater.on("error" ,(err) => {
        log.info("Error in auto-updater" + err)
    })
    
    
    autoUpdater.on("update-downloaded" ,(info) => {
        log.info("update-downloaded")
    })
    


let mainWindow
let aboutWindow



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
        navigateOnDragDrop:true,
        
        
    })


    
  

    mainWindow.loadFile('./app/index.html');
    autoUpdater.checkForUpdates();
    
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
     center:true,
     resizable:false,
     frame:false,
     autoHideMenuBar:true,
     roundedCorners:true

    })
    aboutWindow.loadFile('./app/about.html')

}




function gotogoogle() {
   shell.openExternal("http://www.google.com")
}



app.on('ready', () => {
    createMainWindow()
    autoUpdater.checkForUpdatesAndNotify()
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
                label: "Google",
                click: gotogoogle,
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




