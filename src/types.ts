import * as mobx from "mobx";

type ShareModeType = "local" | "private" | "view" | "shared";
type FocusTypeStrs = "input"|"cmd"|"cmd-fg";

type SessionDataType = {
    sessionid : string,
    name : string,
    notifynum : number,
    activescreenid : string,
    sessionidx : number,
    sharemode : ShareModeType,
    archived? : boolean,
    remotes : RemoteInstanceType[],

    // for updates
    remove? : boolean,
    full? : boolean,
};

type LineType = {
    sessionid : string,
    windowid : string,
    userid : string,
    lineid : string,
    ts : number,
    linenum : number,
    linenumtemp : boolean,
    linelocal : boolean,
    linetype : string,
    text : string,
    renderer : string,
    cmdid? : string,
    contentheight? : number,
    star? : number,
    archived? : boolean,
    bookmarked? : boolean,
    pinned? : boolean,
    ephemeral? : boolean,
    remove? : boolean,
};

type ScreenOptsType = {
    tabcolor? : string,
    pterm? : string,
}

type ScreenDataType = {
    sessionid : string,
    screenid : string,
    windowid : string,
    screenidx : number,
    name : string,
    archived? : boolean,
    screenopts : ScreenOptsType,
    curremote : RemotePtrType,
    nextlinenum : number,
    selectedline : number,
    focustype : FocusTypeStrs,
    anchor : {anchorline : number, anchoroffset : number},

    // for updates
    full? : boolean,
    remove? : boolean,
};

type RemoteOptsType = {
    color : string,
};

type RemoteType = {
    remotetype : string,
    remoteid : string,
    physicalid : string,
    remotealias : string,
    remotecanonicalname : string,
    remotevars : Record<string, string>,
    status : string,
    errorstr : string,
    installstatus : string,
    installerrorstr : string,
    defaultfestate : FeStateType,
    connectmode : string,
    autoinstall : boolean,
    remoteidx : number,
    archived : boolean,
    uname : string,
    mshellversion : string,
    needsmshellupgrade : boolean,
    waitingforpassword : boolean,
    remoteopts? : RemoteOptsType,
    local : boolean,
    remove? : boolean,
};

type RemoteStateType = {
    cwd : string,
    env0 : string, // in base64 "env -0" form
};

type RemoteInstanceType = {
    riid : string,
    name : string,
    sessionid : string,
    windowid : string,
    remoteownerid : string,
    remoteid : string,
    festate : FeStateType,

    remove? : boolean,
}

type FeStateType = {
    cwd : string,
};

type RemotePtrType = {
    remoteid : string,
    ownerid? : string,
    name? : string,
};

type HistoryItem = {
    historyid : string,
    ts : number,
    userid : string,
    sessionid : string,
    screenid : string,
    windowid : string,
    lineid : string,
    haderror : boolean,
    cmdid : string,
    cmdstr : string,
    remove : boolean,
    remote : RemotePtrType,
    ismetacmd : boolean,
    historynum : string,
};

type CmdRemoteStateType = {
    remoteid : string
    remotename : string,
    cwd : string,
};

type UIContextType = {
    sessionid : string,
    screenid : string,
    windowid : string,
    remote : RemotePtrType,
    winsize : TermWinSize,
    linenum : number,
    build : string,
};

type FeCmdPacketType = {
    type : string,
    metacmd : string,
    metasubcmd? : string,
    args : string[],
    kwargs : Record<string, string>;
    rawstr? : string,
    uicontext : UIContextType,
    interactive : boolean,
};

type FeInputPacketType = {
    type : string,
    ck : string,
    remote : RemotePtrType,
    inputdata64? : string,
    signame? : string,
    winsize? : TermWinSize,
};

type RemoteInputPacketType = {
    type : string,
    remoteid : string,
    inputdata64 : string,
};

type WatchScreenPacketType = {
    type : string,
    sessionid : string,
    screenid : string,
    connect : boolean,
    authkey : string,
};

type TermWinSize = {
    rows : number,
    cols : number,
}

type TermOptsType = {
    rows : number,
    cols : number,
    flexrows? : boolean,
    maxptysize? : number,
};

type CmdStartPacketType = {
    type : string,
    respid : string,
    ts : number,
    ck : string,
    pid : number,
    mshellpid : number,
};

type CmdDoneInfoType = {
    ts : number,
    exitcode : number,
    durationms : number,
};

type CmdDataType = {
    sessionid : string,
    cmdid : string,
    remote : RemotePtrType,
    cmdstr : string,
    festate : FeStateType,
    termopts : TermOptsType,
    origtermopts : TermOptsType,
    status : string,
    startpk : CmdStartPacketType,
    doneinfo : CmdDoneInfoType,
    runout : any[],
    rtnstate : boolean,
    remove? : boolean,
};

type PtyDataUpdateType = {
    sessionid : string,
    cmdid : string,
    remoteid : string,
    ptypos : number,
    ptydata64 : string,
    ptydatalen : number,
};

type ScreenLinesType = {
    sessionid : string,
    screenid : string,
    windowid : string,
    lines : LineType[],
    cmds : CmdDataType[],
};

type ModelUpdateType = {
    interactive : boolean,
    sessions? : SessionDataType[],
    activesessionid? : string,
    screens? : ScreenDataType[],
    screenlines? : ScreenLinesType,
    line? : LineType,
    lines? : LineType[],
    cmd? : CmdDataType,
    info? : InfoType,
    cmdline? : CmdLineUpdateType,
    remotes? : RemoteType[],
    history? : HistoryInfoType,
    connect? : boolean,
    mainview? : string,
    bookmarks? : BookmarkType[],
    clientdata? : ClientDataType,
    historyviewdata? : HistoryViewDataType,
};

type HistoryViewDataType = {
    items : HistoryItem[],
    offset : number,
    rawoffset : number,
    nextrawoffset : number,
    hasmore : boolean,
    lines : LineType[],
    cmds : CmdDataType[],
};

type BookmarkType = {
    bookmarkid : string,
    createdts : number,
    cmdstr : string,
    alias : string,
    tags : string[],
    description : string,
    cmds : string[],
    orderidx : number,
    remove? : boolean,
};

type HistoryInfoType = {
    historytype : "global" | "session" | "window",
    sessionid : string,
    windowid : string,
    items : HistoryItem[],
    show : boolean,
};

type CmdLineUpdateType = {
    cmdline : string,
    cursorpos : number,
};

type RemoteEditType = {
    remoteedit : boolean,
    remoteid? : string,
    errorstr? : string,
    infostr? : string,
    keystr? : string,
    haspassword? : boolean,
};

type InfoType = {
    infotitle? : string,
    infomsg? : string,
    infoerror? : string,
    infolines? : string[],
    infocomps? : string[],
    infocompsmore? : boolean,
    timeoutms? : number,
    ptyremoteid? : string,
    remoteedit? : RemoteEditType,
    remoteshowall? : boolean,
};

type HistoryQueryOpts = {
    queryType : "global" | "session" | "window";
    limitRemote : boolean,
    limitRemoteInstance : boolean,
    limitUser : boolean,
    queryStr : string,
    maxItems : number,
    includeMeta : boolean,
    fromTs : number,
};

type ContextMenuOpts = {
    showCut? : boolean,
};

type UpdateMessage = PtyDataUpdateType | ModelUpdateType;

type RendererContext = {
    sessionId : string,
    screenId : string,
    windowId : string,
    cmdId : string,
    lineId : string,
    lineNum : number,
};

type RendererModel = {
    dispose : () => void,
    reload : (delayMs : number) => void,
    receiveData : (pos : number, data : Uint8Array, reason? : string) => void,
    cmdDone : () => void,
    resizeWindow : (size : WindowSize) => void,
    resizeCols : (cols : number) => void,
    giveFocus : () => void,
    getUsedRows : () => number,
};

type WindowSize = {
    height : number,
    width: number,
};

type PtyDataType = {
    pos : number,
    data : Uint8Array,
};

type FeOptsType = {
    termfontsize : number,
};

type ClientDataType = {
    clientid : string,
    userid : string,
    feopts : FeOptsType;
};

type PlaybookType = {
    playbookid : string,
    playbookname : string,
    description : string,
    entryids : string[],
    entries : PlaybookEntryType[],
};

type PlaybookEntryType = {
    entryid : string,
    playbookid : string,
    alias : string,
    cmdstr : string,
    description : string,
    createdts : number,
    updatedts : number,
    remove : boolean,
};

type AlertMessageType = {
    title? : string,
    message : string,
    confirm? : boolean,
};

type HistorySearchParams = {
    offset : number,
    rawOffset : number,
    searchText? : string,
    searchSessionId? : string,
    searchRemoteId? : string,
    fromTs? : number,
    noMeta? : boolean,
    filterCmds? : boolean,
};

type RenderModeType = "normal" | "collapsed";

export type {SessionDataType, LineType, RemoteType, RemoteStateType, RemoteInstanceType, HistoryItem, CmdRemoteStateType, FeCmdPacketType, TermOptsType, CmdStartPacketType, CmdDataType, ScreenDataType, ScreenOptsType, PtyDataUpdateType, ModelUpdateType, UpdateMessage, InfoType, CmdLineUpdateType, RemotePtrType, UIContextType, HistoryInfoType, HistoryQueryOpts, WatchScreenPacketType, TermWinSize, FeInputPacketType, RemoteInputPacketType, RemoteEditType, FeStateType, ContextMenuOpts, RendererContext, WindowSize, RendererModel, PtyDataType, BookmarkType, ClientDataType, PlaybookType, PlaybookEntryType, HistoryViewDataType, RenderModeType, AlertMessageType, HistorySearchParams, ScreenLinesType, FocusTypeStrs};
