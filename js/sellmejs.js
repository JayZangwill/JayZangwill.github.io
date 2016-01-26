(function (_aoWin, _aoUndefined) {
    var _sVer = "QMWL/11.12.05",
        _oConfig = _aoWin.QMWLCfg || {},
        _oTopWin = _aoWin,
        _oRealTopWin = (function (_aoWin) {
            for (var _oTestWin = _aoWin, _oRealTopWin = _aoWin; _oTestWin;) {
                try {
                    _oTestWin = _oTestWin == _oTestWin.parent ? _aoUndefined : _oTestWin.parent;
                    _oTestWin.document && (_oRealTopWin = _oTestWin);
                } catch (_oError) {}
            }
            return _oRealTopWin;
        })(_aoWin),
        _fQMWL = function (_aoWin, _aoOptDoms, _asOptMode) {
            var _oSelf = this;
            _oSelf._moWin = _aoWin;
            if (!_aoOptDoms && !_asOptMode) {
                _oSelf._moOptData = _aoWin;
                _oSelf._msOptMode = "non-json";
            } else {
                _oSelf._moOptData = _aoOptDoms;
                _oSelf._msOptMode = _asOptMode;
            }
        },
        _nQMWLGuid = 1,
        _fInstance = function (_aoWin) {
            return _aoWin.QMWin || (((_aoWin.$ = _aoWin.Q = _aoWin.QMWin = new _fQMWL(_aoWin))["_guid_"] = _aoWin["_guid_"] = _nQMWLGuid++) && (_fQMWL.instance_(_aoWin) || true) && _aoWin.$.ready());
        },
        _fIsQMWLObj = function (_aoObj) {
            return _aoObj && typeof _aoObj.ctor_ == "function" && _aoObj.ctor_() === _fQMWL;
        },
        _oDebugMode = ({
            "unt": 900,
            "dev": 200,
            "err": 100,
            "usr": 0
        }),
        _nUntType = _fQMWL.DBG_UNT_TYPE = _oDebugMode["unt"],
        _nDevType = _fQMWL.DBG_DEV_TYPE = _oDebugMode["dev"],
        _nErrType = _fQMWL.DBG_ERR_TYPE = _oDebugMode["err"],
        _nUsrType = _fQMWL.DBG_USR_TYPE = _oDebugMode["usr"],
        _nDebugType = _fQMWL.CFG_DBG_TYPE = (_oDebugMode[_oConfig.sMode] || _nUsrType) + 1,
        _sCusErrType = "_qMeRR_",
        _fDebug = function () {
            var _oSelf = this;
            try {
                if (_fIsShowConsole()) {
                    var _oArgs = _fIsFunc(_fQMWL.debug) ? _fCall(_fQMWL.debug, arguments) : arguments,
                        _vData = _oArgs && _oArgs[0];
                    if (!_oArgs) {
                        return _oSelf;
                    }
                    if (_oArgs.length === 0) {
                        debugger;
                    } else {
                        if (_aoWin.console) {
                            _aoWin.console.log && _aoWin.console.log(_vData);
                        }
                        _aoWin.Console["debug"].add(_vData, _fIsObj(_vData) && !_fIsArr(_vData) ? 2 : "code");
                    }
                }
            } catch (_oError) {}
            return _oSelf;
        },
        _fLog = (function () {
            var _oLogs = (_aoWin.log && log.logs) || [],
                _sSerial = +new Date(),
                _fLogFun = _aoWin.log = function () {
                    _oLogs.length > 500 && _oLogs.shift();
                    _oLogs.push([_fNow(), [].slice.apply(arguments).join("")].join(" "));
                    return this;
                };
            _fLogFun.logs = _oLogs;
            _fLogFun.serial = function () {
                return _sSerial;
            };
            _fLogFun.clear = function () {
                _oLogs.splice(0);
            };
            return _fLogFun;
        })(),
        _fHandleErr = function (_aoErrInfo) {
            try {
                if (_fCall(_fQMWL.handleErr, [_aoErrInfo, _nDebugType >= _nErrType]) !== true && _nDebugType > _nErrType && _fIsShowConsole()) {
                    var _oErr = {
                        msg: _aoErrInfo.oErr.message,
                        line: _aoErrInfo.oErr.number || _aoErrInfo.oErr.lineNumber || _aoUndefined,
                        stack: _aoErrInfo.oErr.stack,
                        url: _aoErrInfo.oErr.fileName,
                        func: (_aoErrInfo.sName || _aoErrInfo.fFunc) ? [_aoErrInfo.sName, _aoErrInfo.fFunc].join(":") : _aoUndefined,
                        args: _fToArr(_aoErrInfo.oArg)
                    };
                    _fLog("err: func[" + (_oErr.func || "") + "] msg[" + _oErr.msg + "] line[" + (_oErr.line || "") + "] url[" + (_oErr.url || "") + "] args [" + (_oErr.args || "") + "] stack[" + (_oErr.stack || "") + "]");
                    _fDebug(_oErr);
                }
            } catch (_oError) {}
            return this;
        },
        _fIsShowConsole = function () {
            return !!_aoWin.Console || (_aoWin.console && _aoWin.console.log);
        },
        _fSafe = function (_afFunc, _asFuncName, _abIsStopRunning) {
            return function () {
                try {
                    return _afFunc.apply(this, arguments);
                } catch (_oError) {
                    if (_nDebugType > _nDevType && _oError && (!_abIsStopRunning || _oError.type !== _sCusErrType)) {
                        _fHandleErr({
                            oErr: _oError,
                            sName: _asFuncName,
                            fFunc: _afFunc,
                            oContext: this,
                            oArg: arguments
                        });
                    }
                    if (_nDebugType == _nUntType + 1) {
                        throw _oError;
                    }
                    if (_abIsStopRunning) {
                        _fThrowException(_oError, _asFuncName);
                    } else if (getTop().getUin() == '434537707') {
                        if (window.console && console.log) {
                            console.log(_oError.message, _oError.stack);
                        } else {
                            getTop().debug(_oError);
                        }
                    }
                }
                return this;
            };
        },
        _fSafeByConf = _nDebugType > _nDevType ? _fSafe : function (_afFunc) {
            return _afFunc;
        },
        _fThrowException = function (_avError, _asFuncName, _asType) {
            _fThrowException._nExceptionTime = _fNow();
            if (_avError instanceof Error) {
                _avError.type = _asType || _sCusErrType;
                throw _avError;
            } else {
                var _oDef = new Error();
                _oDef.type = _asType || _sCusErrType;
                if (_fIsStr(_avError)) {
                    _oDef.message = _asFuncName ? [_asFuncName, _avError].join(':') : _avError;
                } else {
                    _fExtend(_oDef, _avError);
                }
                throw _oDef;
            }
        },
        _fBindReady = function (_aoWin, _afReadyFn, _aoParam) {
            var _oReadyInfo = _fGetReadyInfo(_aoWin),
                _oContext = (_aoParam || {}).oContext;
            if (_oReadyInfo._bIsReady) {
                _fCall(_oContext || _aoWin.QMWin, _afReadyFn);
            } else {
                _fAddEvent(_oReadyInfo, ["ready", _afReadyFn, false, _aoWin, _oContext]);
                _fBoundReady(_aoWin, _oReadyInfo);
            }
        },
        _fBoundReady = function (_aoWin, _aoReadyInfo) {
            var _oDoc, _oDocElm, _fLoaded;
            if (_aoReadyInfo._bIsBound) {
                return;
            }
            _aoReadyInfo._bIsBound = true;
            _oDoc = _aoWin.document, _oDocElm = _oDoc.documentElement;

            function _ready() {
                if (!_aoReadyInfo._bIsReady) {
                    if (!_oDoc.body) {
                        return _aoWin.setTimeout(_ready, 13);
                    }
                    _aoReadyInfo._bIsReady = true;
                    _fFireCustomEvent(_aoReadyInfo, "ready");
                }
            }
            if (_oDoc.readyState === "complete") {
                return _ready();
            }
            if (_oDoc.addEventListener) {
                _fLoaded = function () {
                    _oDoc.removeEventListener("DOMContentLoaded", _fLoaded, false);
                    _aoWin.removeEventListener("load", _fLoaded, false);
                    _ready();
                };
                _oDoc.addEventListener("DOMContentLoaded", _fLoaded, false);
                _aoWin.addEventListener("load", _fLoaded, false);
            } else if (_oDoc.attachEvent) {
                _fLoaded = function (_aoEvent) {
                    if (_oDoc.readyState === "complete" || _aoEvent.type === "load") {
                        _oDoc.detachEvent("onreadystatechange", _fLoaded);
                        _aoWin.detachEvent("onload", _fLoaded);
                        _ready();
                    }
                };
                _oDoc.attachEvent("onreadystatechange", _fLoaded);
                _aoWin.attachEvent("onload", _fLoaded);
            }
        },
        _fGetReadyInfo = function (_aoWin) {
            var _sName = "_rEaDYinFO_",
                _oInfo = _aoWin[_sName];
            if (_fIsNull(_oInfo)) {
                _oInfo = _aoWin[_sName] = {
                    _bIsBound: false,
                    _bIsReady: false
                };
            }
            return _oInfo;
        },
        _fGetById = function (_aoDoc, _asId) {
            return _aoDoc.getElementById(_asId);
        },
        _fGetInDoc = function (_aoObj) {
            return _aoObj.ownerDocument || _aoObj.document || _aoObj;
        },
        _fGetInWin = function (_aoDom) {
            var _oDoc = _fGetInDoc(_aoDom);
            return _oDoc.parentWindow || _oDoc.defaultView;
        },
        _fInsertDetect = function (_aoDom, _asWhere) {
            return !(_aoDom.tagName == "TEXTAREA" && (_asWhere == "afterBegin" || _asWhere == "beforeEnd"));
        },
        _fInsertDom = function (_aoDom, _asWhere, _aoNewDom) {
            if (_fInsertDetect(_aoDom, _asWhere)) {
                if (_aoDom.insertAdjacentElement) {
                    _aoDom.insertAdjacentElement(_asWhere || "beforeBegin", _aoNewDom);
                } else {
                    switch (_asWhere) {
                    case "afterBegin":
                        _aoDom.insertBefore(_aoNewDom, _aoDom.firstChild);
                        break;
                    case "beforeEnd":
                        _aoDom.appendChild(_aoNewDom);
                        break;
                    case "afterEnd":
                        _aoDom.parentNode[_aoDom.nextSibling ? "insertBefore" : "appendChild"](_aoNewDom, _aoDom.nextSibling);
                        break;
                    default:
                        _aoDom.parentNode.insertBefore(_aoNewDom, _aoDom);
                        break;
                    }
                }
            }
        },
        _fInsertHtml = function (_aoDom, _asWhere, _asHtml) {
            if (_fInsertDetect(_aoDom, _asWhere)) {
                if (_aoDom.insertAdjacentHTML) {
                    _aoDom.insertAdjacentHTML(_asWhere, _asHtml);
                } else {
                    var _oRange = _aoDom.ownerDocument.createRange(),
                        _abIsBefore = _asWhere.indexOf("before") == 0,
                        _abIsBegin = _asWhere.indexOf("Begin") != -1;
                    if (_abIsBefore == _abIsBegin) {
                        _oRange[_abIsBefore ? "setStartBefore" : "setStartAfter"](_aoDom);
                        _aoDom.parentNode.insertBefore(_oRange.createContextualFragment(_asHtml), _abIsBegin ? _aoDom : _aoDom.nextSibling);
                    } else {
                        var _oDomObj = _aoDom[_abIsBefore ? "lastChild" : "firstChild"];
                        if (_oDomObj) {
                            _oRange[_abIsBefore ? "setStartAfter" : "setStartBefore"](_oDomObj);
                            _aoDom[_abIsBefore ? "appendChild" : "insertBefore"](_oRange.createContextualFragment(_asHtml), _oDomObj);
                        } else {
                            _aoDom.innerHTML = _asHtml;
                        }
                    }
                }
            }
        },
        _nStatTime = 0,
        _oExprNotWhite = /\S/,
        _fCall = function (_avParam1, _avParam2, _avParam3, _avParam4) {
            var _oContext = this,
                _fTmplFunc, _fFunc, _oParamList;
            if (_fIsFunc(_avParam1)) {
                _fFunc = _avParam1;
                _oParamList = _avParam2;
            } else if (_fIsFunc(_avParam2)) {
                _oContext = _avParam1;
                _fFunc = _avParam2;
                _oParamList = _avParam3;
            } else if (_fIsFunc(_fTmplFunc = _avParam1 && _avParam1[_avParam2])) {
                _oContext = _avParam1;
                _fFunc = _fTmplFunc;
                _oParamList = _avParam3;
            } else if (_fIsFunc(_fTmplFunc = _avParam2 && _avParam2[_avParam3])) {
                _oContext = _avParam1;
                _fFunc = _fTmplFunc;
                _oParamList = _avParam4;
            }
            return _fFunc && _fSafe(_fFunc).apply(_oContext, _oParamList || []);
        },
        _fCanLoop = function (_aoObject) {
            return !_fIsNull(_aoObject) && !_fIsStr(_aoObject) && _fIsNum(_aoObject.length) && !_fIsDom(_aoObject) && !_fIsAccessibleWin(_aoObject);
        },
        _fEach = function (_aoOptParam, _asOptMode, _anSize, _afCallBack, _avParam) {
            var _oSelf = this;
            if (_anSize === 1) {
                _fCall(_oSelf, _afCallBack, [_asOptMode == "array" ? _aoOptParam[0] : _aoOptParam, _avParam || 0, 0]);
            } else if (_anSize > 1) {
                for (var i = 0; i < _anSize && _fCall(_oSelf, _afCallBack, [_aoOptParam[i], _avParam || i, i]) !== false; i++) {;
                }
            } else if (_anSize < 0) {
                for (var _sKey in _aoOptParam) {
                    if (_fCall(_oSelf, _afCallBack, [_aoOptParam[_sKey], _avParam || _sKey, _sKey]) === false) {
                        break;
                    }
                }
            }
            return _oSelf;
        },
        _fEncodeURIComponent = encodeURIComponent,
        _fHtmlEncode = function (_asStr) {
            return _asStr && _asStr.replace ? (_asStr.replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\'/g, "&#39;")) : _asStr;
        },
        _fExCreater = function (_afFunc) {
            return function () {
                _fIsFunc(_afFunc) && _afFunc.apply(this, arguments);
                return this;
            };
        },
        _fExtend = function () {
            for (var _oArgs = arguments, _oDesc = _oArgs[0], i = 1, _nLen = _oArgs.length; i < _nLen; i++) {
                var _oSrce = _oArgs[i];
                for (var j in _oSrce) {
                    _oDesc[j] = _oSrce[j];
                }
            }
            return _oDesc;
        },
        _oExprFilteScript = /<script(.|\s)*?\/script>/gi,
        _fFilteScript = function (_asHtml) {
            return _asHtml.replace(_oExprFilteScript, "");
        },
        _fFormatParam = function (_avParam) {
            return _fIsQMWLObj(_avParam) ? _avParam.data(0) : _avParam;
        },
        _fIsAccessibleWin = function (_aoWin) {
            try {
                return !!_aoWin.setInterval;
            } catch (_oError) {
                return false;
            }
        },
        _fIsArr = function (_aoObj) {
            return _fToStrEx.call(_aoObj) == "[object Array]";
        },
        _fIsDom = function (_aoObj) {
            return _aoObj ? _aoObj.nodeType !== _aoUndefined : false;
        },
        _fIsFunc = function (_aoObj) {
            return typeof _aoObj == "function";
        },
        _oNull = null,
        _fIsNull = function (_aoObj) {
            return _aoObj === _aoUndefined || _aoObj === _oNull;
        },
        _fIsNaN = isNaN,
        _fIsNum = function (_aoObj) {
            return typeof _aoObj == "number" && !_fIsNaN(_aoObj);
        },
        _fIsObj = function (_aoObj) {
            return typeof _aoObj == "object";
        },
        _fIsStr = function (_aoObj) {
            return typeof _aoObj == "string";
        },
        _fNoop = function () {
            return this;
        },
        _fNow = function () {
            return +new Date();
        },
        _fParseInt = parseInt,
        _fRandom = Math.random,
        _fRegFilter = (function () {
            var _sExprFilter = /([\^\.\[\$\(\)\|\*\+\?\{\\])/ig;
            return function (_asRegExpStr) {
                return _asRegExpStr.replace(_sExprFilter, "\\$1");
            };
        })(),
        _fToArr = function (_aoObj) {
            if (_fIsArr(_aoObj)) {
                return _aoObj;
            }
            if (_fCanLoop(_aoObj)) {
                for (var i = 0, _oArr = [], _nLen = _aoObj.length; i < _nLen; i++) {
                    _oArr[i] = _aoObj[i];
                }
                return _oArr;
            }
            return [_aoObj];
        },
        _fToMap = function (_aoObj, _avKeyOrVal) {
            var _oObj = {};
            if (_fCanLoop(_aoObj)) {
                for (var i = 0, _nLen = _aoObj.length; i < _nLen; i++) {
                    _oObj[_aoObj[i]] = _avKeyOrVal;
                }
            } else if (!_fIsNull(_avKeyOrVal)) {
                _oObj[_asKeyOrVal] = _aoObj;
            }
            return _oObj;
        },
        _fToNum = function (_aoObj, _anDef) {
            var _nNum = _fParseInt(_aoObj);
            return !_fIsNaN(_nNum) || !_fIsNum(_anDef) ? _nNum : _anDef;
        },
        _fToStr = function (_aoObj) {
            return new String(_aoObj);
        },
        _fToStrEx = Object.prototype.toString,
        _fTrim = function (_asStr) {
            if (_fIsStr(_asStr)) {
                var _re = /\s/,
                    _n1 = -1,
                    _n2 = _asStr.length;
                while (_re.test(_asStr.charAt(--_n2)))
                ;
                while (_re.test(_asStr.charAt(++_n1)))
                ;
                return _asStr.slice(_n1, _n2 + 1);
            }
        },
        _fUnikey = function (_asPrefix) {
            return [_asPrefix, _fNow(), _fRandom()].join("").split(".").join("");
        },
        _fUnique = (function () {
            var _sUid = "_uNiQUe_",
                _nUid = 0;

            function _data(_avData, _aoMap) {
                if (_fIsObj(_avData)) {
                    if (_avData[_sUid] != _nUid) {
                        _avData[_sUid] = _nUid;
                        return true;
                    }
                } else {
                    if (!_aoMap[_avData]) {
                        _aoMap[_avData] = _nUid;
                        return true;
                    }
                }
                return false;
            };
            return function (_aoArr) {
                var _nLen = _aoArr.length,
                    _oRet = [],
                    r = -1,
                    i = 0,
                    _oMap = {},
                    _vItem;
                for (++_nUid; i < _nLen; ++i) {
                    _data(_vItem = _aoArr[i], _oMap) && (_oRet[++r] = _vItem);
                }
                _oMap = _aoUndefined;
                return _oRet;
            };
        })(),
        _oGlobalEvents = {},
        _fAddEvent = function (_aoObj, _aoParam) {
            if (!_fIsFunc(_aoParam[1])) {
                return;
            }
            var _sType = _aoParam[0],
                _bIsNonLink = _aoParam[2],
                _oContext = _aoParam[4],
                _oEvents = _aoObj._oEvents || (_aoObj._oEvents = {}),
                _bIsInit = !_oEvents[_sType],
                _oHandlers = _oEvents[_sType] || (_oEvents[_sType] = {});
            if (_bIsInit && (_fIsDom(_aoObj) || _fIsAccessibleWin(_aoObj))) {
                if (_sType == "unload") {
                    _fThrowException("use 'addPageUnloadEvent(func)' replace add 'unload' event!");
                } else {
                    var _sEventType = "on" + _sType,
                        _fOrgHandler = _aoObj[_sEventType];
                    _fOrgHandler && !_bIsNonLink && _fSaveEvent(_aoObj, _sType, _oHandlers, true, _fGetInWin(_aoObj), _fOrgHandler);
                    _fSaveEvent(_aoObj, _sType, _oHandlers, _bIsNonLink, _aoParam[3], _aoParam[1], _oContext);
                    _aoObj[_sEventType] = _fFireEventForDom;
                }
            } else {
                _fSaveEvent(_aoObj, _sType, _oHandlers, _bIsNonLink, _aoParam[3], _aoParam[1], _oContext);
            }
        },
        _fAddEvents = function (_aoObj, _aoParam) {
            var _oEventMap = _aoParam[0],
                _bIsNonLink = _aoParam[1],
                _oHandlerWin = _aoParam[2],
                _oContext = _aoParam[3];
            for (var _sType in _oEventMap) {
                _fAddEvent(_aoObj, [_sType, _oEventMap[_sType], _bIsNonLink, _oHandlerWin, _oContext]);
            }
        },
        _fDelEvent = function (_aoObj, _aoParam) {
            var _fHandler = _aoParam[1],
                _nHandlerGuid = _fIsFunc(_fHandler) && _fHandler._nHandlerGuid;
            _nHandlerGuid && _fDelEventByGuid(_aoObj, _aoParam[0], _nHandlerGuid);
        },
        _fDelEvents = function (_aoObj, _aoParam) {
            var _oEventMap = _aoParam[0];
            for (var _sType in _oEventMap) {
                _fDelEvent(_aoObj, [_sType, _oEventMap[_sType]]);
            }
        },
        _fDelEventByGuid = function (_aoObj, _asType, _anHandlerGuid) {
            try {
                var _nHandlerGuid = parseInt(_anHandlerGuid);
                if (_fIsNum(_nHandlerGuid)) {
                    var _oHandlers = _aoObj._oEvents && _aoObj._oEvents[_asType],
                        _oWin = _oHandlers[_nHandlerGuid];
                    delete _oHandlers[_nHandlerGuid];
                    delete _oWin["_event_" + _nHandlerGuid];
                }
            } catch (_oError) {}
        },
        _fFireCustomEvent = function (_aoObj, _asType, _aoParamList, _aoContext) {
            var _oHandlers = _aoObj._oEvents && _aoObj._oEvents[_asType],
                _oParamList = _aoParamList || [],
                _bReturnValue = true;
            for (var i in _oHandlers) {
                var _fEvent;
                try {
                    _fEvent = _oHandlers[i][0]["_event_" + i];
                } catch (_oError) {}
                _fEvent ? _fEvent.apply(_aoContext || _oHandlers[i][1] || _aoObj, _oParamList) === false && (_bReturnValue = false) : _fDelEventByGuid(_aoObj, _asType, i);
            }
            return _bReturnValue;
        },
        _oDomEventMap = {
            Mouse: {
                _sType: "click|mousedown|mouseup|mouseomove",
                _fArgs: function (_asType, _aoWin, _aoEvent) {
                    return [_asType, true, true, _aoWin, 0, _aoEvent.screenX || 0, _aoEvent.screenY || 0, _aoEvent.clientX || 0, _aoEvent.clientY || 0, false, false, false, false, 0, _aoEvent.relativeTarget || null];
                }
            },
            Key: {
                _sType: "keydown|keypress|keyup",
                _fArgs: function (_asType, _aoWin, _aoEvent) {
                    return [_asType, _aoWin, true, true, _aoWin, !!_aoEvent.ctrlKey, !!_aoEvent.altKey, !!_aoEvent.shiftKey, !!_aoEvent.metaKey, _aoEvent.keyCode, _aoEvent.charCode || _aoEvent.keyCode];
                }
            }
        },
        _oDomEvents = (function () {
            var _oEvents = {},
                _oEventTypes;
            for (var _sType in _oDomEventMap) {
                _oEventTypes = _oDomEventMap[_sType]._sType.split("|");
                for (var i = _oEventTypes.length - 1; i > -1; i--) {
                    _oEvents[_oEventTypes[i]] = _sType;
                }
            }
            return _oEvents;
        })(),
        _fFireDomEvent = function (_aoObj, _asType, _aoEvent) {
            if (_fIsDom(_aoObj) && _oDomEvents[_asType]) {
                var _sEventType = _oDomEvents[_asType];
                if (_aoObj.fireEvent) {
                    if (_asType === "click" && _aoObj.tagName === "INPUT" && _aoObj.type === "submit") {
                        _aoObj.click();
                    } else {
                        _aoObj.fireEvent("on" + _asType, _fExtend(_fGetInDoc(_aoObj).createEventObject(), {
                            cancelBubble: false,
                            returnValue: true
                        }, _aoEvent, {
                            type: _asType
                        }));
                    }
                } else {
                    var _oEvent = _fGetInDoc(_aoObj).createEvent(_sEventType + "Events");
                    _oEvent["init" + _sEventType + "Event"].apply(_oEvent, _oDomEventMap[_sEventType]._fArgs(_asType, _fGetInWin(_aoObj), _aoEvent || {}));
                    _aoObj.dispatchEvent(_oEvent);
                }
                return true;
            }
            return false;
        },
        _fFireEvent = function (_aoObj, _aoParam) {
            var _sType = _aoParam[0];
            return !_fFireDomEvent(_aoObj, _sType, _aoParam[1]) ? _fFireCustomEvent(_aoObj, _sType, _aoParam[1], _aoParam[4]) : true;
        },
        _nFireEventTime = 0,
        _oFireEventWin = _aoUndefined,
        _bIsSafariForEvent = /a/.__proto__ == '//',
        _fFireEventForDom = function (_aoEvent) {
            var _oEvent = _aoEvent || _fGetInWin(this).event;
            if (_bIsSafariForEvent) {
                if (_oEvent.type.indexOf("key") == 0 && _fNow() - _nFireEventTime < 100 && _oFireEventWin != _oEvent.view) {
                    return;
                }
                _nFireEventTime = _fNow();
                _oFireEventWin = _oEvent.view;
            }!_oEvent.currentTarget && (_oEvent.currentTarget = this);
            return _fFireCustomEvent(this, _oEvent.type, [_oEvent]);
        },
        _fEventOptCreate = function (_afOpt, _afOpts, _abIsNonLink) {
            return function () {
                var _oSelf = this,
                    _oWin = _oSelf._moWin,
                    _oArgs = arguments,
                    _vParam0 = _oArgs[0],
                    _vParam1 = _oArgs[1],
                    _vParam2 = _oArgs[2],
                    _vParam3 = _oArgs[3];
                if (_fIsQMWLObj(_vParam0)) {
                    return _oArgs.callee.apply(_vParam0, _fToArr(_oArgs).slice(1));
                }
                if (_fIsFunc(_vParam1) || _fIsStr(_vParam0)) {
                    return _oSelf.each(_afOpt, {
                        vParam: [_vParam0, _vParam1, _abIsNonLink, _oWin, (_vParam2 || {}).oContext]
                    });
                }
                if (_fIsNull(_vParam1) || (_fIsObj(_vParam1) && _vParam1.oContext)) {
                    return _oSelf.each(_afOpts, {
                        vParam: [_vParam0, _abIsNonLink, _oWin, (_vParam1 || {}).oContext]
                    });
                }
                if (!_fIsObj(_vParam0)) {
                    _fThrowException("can't add/del/fire event for '" + _vParam0 + "'");
                }
                if (_fIsStr(_vParam1)) {
                    return _oSelf.each([_vParam0], _afOpt, {
                        vParam: [_vParam1, _vParam2, _abIsNonLink, _oWin, (_vParam3 || {}).oContext]
                    });
                }
                return _oSelf.each([_vParam0], _afOpts, {
                    vParam: [_vParam1, _abIsNonLink, _oWin, (_vParam2 || {}).oContext]
                });
            };
        },
        _nEventGuid = 0,
        _fGetGlobalEventObj = function (_asGlobalEventObjName) {
            var _sGlobalEventObjName = _asGlobalEventObjName || "_gLoBAl_eVEnT_";
            return _oGlobalEvents[_sGlobalEventObjName] || (_oGlobalEvents[_sGlobalEventObjName] = {
                name: _sGlobalEventObjName
            });
        },
        _fSaveEvent = function (_aoObj, _asType, _aoHandlers, _abIsNonLink, _aoHandlerWin, _afHandler, _aoContext) {
            var _nHandlerGuid = _afHandler._nHandlerGuid || (_afHandler._nHandlerGuid = ++_nEventGuid);
            if (_abIsNonLink) {
                var _sLinkType = "_LinkEvent_" + _asType;
                _fDelEventByGuid(_aoObj, _asType, _aoObj[_sLinkType]);
                _aoObj[_sLinkType] = _nHandlerGuid;
            }
            _aoHandlers[_nHandlerGuid] = [_aoHandlerWin, _aoContext];
            _aoHandlerWin["_event_" + _nHandlerGuid] = _fSafe(_afHandler, "event:" + _asType, true);
        };
    _fQMWL.extend = (function () {
        var _fExtendInstance = function (_afInstance) {
                var _fSuperInstance = _fQMWL.instance_;
                _fQMWL.instance_ = function (_aoWin) {
                    _fCall(_fSuperInstance, [_aoWin]);
                    _fCall(_afInstance, [_aoWin]);
                };
                _aoWin.QMWin && _fCall(_afInstance, [_aoWin]);
            },
            _fExtendMethod = function (_aoMethodSet, _bSafeByConf) {
                var _oPrototype = _fQMWL.prototype;
                if (_bSafeByConf === false) {
                    for (var _sMethod in _aoMethodSet) {
                        _oPrototype[_sMethod] = _aoMethodSet[_sMethod];
                    }
                } else {
                    for (var _sMethod in _aoMethodSet) {
                        _oPrototype[_sMethod] = _fSafeByConf(_aoMethodSet[_sMethod], _sMethod, true);
                    }
                }
            },
            _fExtendVersion = function (_asVer) {
                var _sVer = _fQMWL.version ? [_fQMWL.version(), _asVer].join("; ") : _asVer;
                _fQMWL.version = function () {
                    return _sVer;
                };
            },
            _fTypeAssertCreater = function (_afFunc, _asName, _asType) {
                return _fQMWL.CFG_DBG_TYPE > _fQMWL.DBG_DEV_TYPE ? function () {
                    var _oArgs = arguments;
                    if (typeof _oArgs[0] != _asType) {
                        _fThrowException('error : QMWL.extend("' + _asName + '", _avParam); _avParam must ' + _asType + '! err param: ' + _oArgs[0]);
                    } else {
                        _afFunc.apply(_aoWin, _oArgs);
                    }
                } : _afFunc;
            },
            _oOpts = {
                "version": _fTypeAssertCreater(_fExtendVersion, "version", "string"),
                "method": _fTypeAssertCreater(_fExtendMethod, "method", "object"),
                "instance": _fTypeAssertCreater(_fExtendInstance, "instance", "function")
            };
        return function () {
            var _oArgs = _fToArr(arguments);
            _fCall(_oOpts[_oArgs.shift()], _oArgs);
            return _fQMWL;
        };
    })();
    _fQMWL.extend("version", _sVer);
    _fQMWL.extend("method", {
        cfg_: function () {
            return _oConfig;
        },
        ctor_: function () {
            return _fQMWL;
        },
        fnCreater_: _fExCreater
    });
    _fQMWL.extend("method", {
        error: _fThrowException,
        debug: _fDebug,
        log: _fLog,
        safe: _fSafe,
        safeByConf: _fSafeByConf
    }, false);
    _fQMWL.extend("method", (function () {
        var _QMMINI_VERSION = "0.3",
            _oExprAttr = /\[([\w\-_]+)(=[\'\"]?([\w\-_~@]+)[\'\"]?)?\]/,
            _oExprAttrs = /\[[\w\-_]+(=[\'\"]?[\w\-_~@]+[\'\"]?)?\]/g,
            _oExprBasicSelect = /^([#\$<:])([\w\-_]+)>?$/,
            _oExprClass = /.*?\.([\w\-_]+)/,
            _oExprSnack = /(?:[\w\-~@\\.#\[\]=\'\"]+)+|\*|>/ig,
            _oExprId = /#([\w\-_]+)/,
            _oExprNodeName = /^([\w\*\-_]+)/,
            _oNullArray = [_aoUndefined, _aoUndefined],
            _oSelectorFuncSet = {
                "#": function (_aoWin, _aoDoc, _asId) {
                    var _oDom = _fGetById(_aoDoc, _asId);
                    return new _fQMWL(_aoWin, _oDom, _oDom ? "non-json" : "none");
                },
                "$": function (_aoWin, _aoDoc, _asIframeId) {
                    if (_asIframeId === "top") {
                        return _fInstance(_oTopWin);
                    } else if (_asIframeId === "this") {
                        return _fInstance(_aoWin);
                    } else {
                        var _oIframeDom = _fGetById(_aoDoc, _asIframeId),
                            _oIframeWin = _oIframeDom && (_oIframeDom.contentWindow || _aoWin.frames[_asIframeId]);
                        return _fIsAccessibleWin(_oIframeWin) ? _fInstance(_oIframeWin) : _aoUndefined;
                    }
                },
                "<": function (_aoWin, _aoDoc, _asTagName) {
                    var _oDom = _asTagName === "fragment" ? _aoDoc.createDocumentFragment() : _aoDoc.createElement(_asTagName);
                    return new _fQMWL(_aoWin, _oDom, _oDom ? "non-json" : "none");
                },
                ":": function (_aoWin, _aoDoc, _asType) {
                    if (_asType === "doc") {
                        return new _fQMWL(_aoWin, _aoDoc, "non-json");
                    }
                    return _aoWin.QMWin;
                }
            },
            _oSizeFuncSet = {
                "array": function (_aoArray) {
                    return _aoArray.length;
                },
                "non-json": function () {
                    return 1;
                },
                "none": function () {
                    return 0;
                },
                "json": function () {
                    return -1;
                }
            };

        function _matchAttrs(_aoNode, _aoClass, _aoAttrs, _anAttrLen) {
            var _bMatch = !_aoClass || _aoClass.test(_aoNode.className),
                i = 0,
                _oAttrVal, _oAttrExpr;
            while (_bMatch && i < _anAttrLen) {
                _oAttrVal = _aoNode.getAttribute((_oAttrExpr = _aoAttrs[i++])[1]);
                _bMatch = _oAttrExpr[2] ? _oAttrVal === _oAttrExpr[3] : !!_oAttrVal;
            }
            return _bMatch;
        }

        function _parseAttrs(_asSelector) {
            var _oAttrs = _asSelector.match(_oExprAttrs);
            if (_oAttrs) {
                for (i = _oAttrs.length - 1; i >= 0; i--) {
                    _oAttrs[i] = _oAttrs[i].match(_oExprAttr);
                }
            }
            return _oAttrs;
        }

        function _parseClass(_asSelector) {
            var _sClass = (_asSelector.match(_oExprClass) || _oNullArray)[1];
            return _sClass && RegExp('(^|\\s)' + _sClass + '(\\s|$)');
        }

        function _filterParents(_aoSelectorParts, _aoCollection, _abDirect) {
            var _sParentSelector = _aoSelectorParts.pop();
            if (_sParentSelector === '>') {
                return _filterParents(_aoSelectorParts, _aoCollection, true);
            }
            var _sId = (_sParentSelector.match(_oExprId) || _oNullArray)[1],
                _oClass = _parseClass(_sParentSelector),
                _sNodeName = (_sParentSelector.match(_oExprNodeName) || _oNullArray)[1],
                _oAttrs = _parseAttrs(_sParentSelector),
                _nAttrLen = _oAttrs ? _oAttrs.length : 0,
                _oRet = [],
                _nRetIndex = -1,
                _nIndex = -1,
                _oNode, _oParent, _bMatches;
            _sNodeName && (_sNodeName = _sNodeName == "*" ? "" : _sNodeName.toUpperCase());
            while ((_oNode = _aoCollection[++_nIndex])) {
                _oParent = _oNode.parentNode;
                do {
                    _bMatches = (!_sId || _oParent.id === _sId) && (!_sNodeName || _oParent.nodeName == _sNodeName) && _matchAttrs(_oParent, _oClass, _oAttrs, _nAttrLen);
                    if (_abDirect || _bMatches) {
                        break;
                    }
                }
                while ((_oParent = _oParent.parentNode) && _oParent.getAttribute);
                _bMatches && (_oRet[++_nRetIndex] = _oNode);
            }
            return _aoSelectorParts[0] && _oRet[0] ? _filterParents(_aoSelectorParts, _oRet) : _oRet;
        }

        function _filter(_asSelector, _aoCollection) {
            var _oParts = _asSelector.match(_oExprSnack),
                _sPart = _oParts.pop(),
                _sId = (_sPart.match(_oExprId) || _oNullArray)[1],
                _oClass = _parseClass(_sPart),
                _oAttrs = _parseAttrs(_sPart),
                _nAttrLen = _oAttrs ? _oAttrs.length : 0,
                _sNodeName = (_sPart.match(_oExprNodeName) || _oNullArray)[1],
                _oCollection = [],
                i = -1,
                _nIndex = -1,
                _oNode;
            _sNodeName && (_sNodeName = _sNodeName == "*" ? "" : _sNodeName.toUpperCase());
            while (_oNode = _aoCollection[++i]) {
                (!_sId || _oNode.id === _sId) && (!_sNodeName || _oNode.nodeName == _sNodeName) && _matchAttrs(_oNode, _oClass, _oAttrs, _nAttrLen) && (_oCollection[++_nIndex] = _oNode);
            }
            return _oParts[0] && _oCollection[0] ? _filterParents(_oParts, _oCollection) : _oCollection;
        }

        function _find(_asSelector, _aoContext) {
            if (_aoContext.querySelectorAll && _nDebugType < _nDevType) {
                return _fToArr(_aoContext.querySelectorAll(_asSelector));
            }
            if (_asSelector.indexOf(',') > -1) {
                var _oSplit = _asSelector.split(/,/g),
                    _oRet = [],
                    i = 0,
                    _nLen = _oSplit.length;
                for (; i < _nLen; ++i) {
                    _oRet = _oRet.concat(_find(_oSplit[i], _aoContext));
                }
                return _fUnique(_oRet);
            }
            var _oParts = _asSelector.match(_oExprSnack),
                _sPart = _oParts.pop(),
                _sId = (_sPart.match(_oExprId) || _oNullArray)[1],
                _oClass = _parseClass(_sPart),
                _oAttrs = _parseAttrs(_sPart),
                _nAttrLen = _oAttrs ? _oAttrs.length : 0,
                _sNodeName = (_sPart.match(_oExprNodeName) || _oNullArray)[1],
                _oCollection;
            if (_sId) {
                if (_aoContext.getElementById) {
                    var _oDom = _aoContext.getElementById(_sId);
                    if (!_oDom || (_sNodeName && _oDom.nodeName != _sNodeName.toUpperCase()) || !_matchAttrs(_oDom, _oClass, _oAttrs, _nAttrLen)) {
                        return [];
                    }
                    _oCollection = [_oDom];
                } else {
                    var _oDoms = _aoContext.getElementsByTagName(_sNodeName || '*'),
                        i = -1,
                        _nIndex = -1,
                        _oNode;
                    _oCollection = [];
                    while (_oNode = _oDoms[++i]) {
                        _oNode.id == _sId && _matchAttrs(_oNode, _oClass, _oAttrs, _nAttrLen) && (_oCollection[++_nIndex] = _oNode);
                    }
                }
            } else {
                var _oDoms = _aoContext.getElementsByTagName(_sNodeName || '*');
                if (_oClass || _nAttrLen) {
                    var i = -1,
                        _nIndex = -1,
                        _oNode;
                    _oCollection = [];
                    if (!_nAttrLen) {
                        while (_oNode = _oDoms[++i]) {
                            _oClass.test(_oNode.className) && (_oCollection[++_nIndex] = _oNode);
                        }
                    } else {
                        while (_oNode = _oDoms[++i]) {
                            _matchAttrs(_oNode, _oClass, _oAttrs, _nAttrLen) && (_oCollection[++_nIndex] = _oNode);
                        }
                    }
                } else {
                    _oCollection = _fToArr(_oDoms);
                }
            }
            return _oParts[0] && _oCollection[0] ? _filterParents(_oParts, _oCollection) : _oCollection;
        }

        function _findEach(_aoDom, _aoParam) {
            if (_fIsDom(_aoDom)) {
                var _oHandler = _aoParam._oHandler;
                _oHandler._oRet = _oHandler._oRet.concat(_find(_aoParam._sSelector, _aoDom));
            }
        }

        function _selector(_avSelector, _avParam) {
            var _oSelf = this,
                _oWin = _oSelf._moWin;
            if (!_avSelector) {
                return new _fQMWL(_oWin, _avSelector, "none");
            }
            if (_fIsStr(_avSelector)) {
                if (!_fIsQMWLObj(_avParam)) {
                    var _oDoc = _oSelf._moWin.document,
                        _oMatch;
                    if (_avSelector == "body") {
                        return new _fQMWL(_oWin, _oDoc.body, "non-json");
                    }
                    if (_oMatch = _oExprBasicSelect.exec(_avSelector)) {
                        return _oSelectorFuncSet[_oMatch[1]](_oWin, _oDoc, _oMatch[2]);
                    }
                    return new _fQMWL(_oSelf._moWin, _find(_avSelector, _avParam || _oDoc), "array");
                } else {
                    return _avParam.find(_avSelector);
                }
            }
            if (_fIsQMWLObj(_avSelector)) {
                return _avSelector;
            }
            if (_fIsDom(_avSelector)) {
                if (_oWin != _fGetInWin(_avSelector)) {
                    var _oNewWin = _fGetInWin(_avSelector);
                    return _fIsAccessibleWin(_oNewWin) ? _fInstance(_oNewWin).$(_avSelector) : _aoUndefined;
                }
                return new _fQMWL(_oWin, _avSelector, "non-json");
            }
            if (_fIsAccessibleWin(_avSelector)) {
                return _fInstance(_avSelector);
            }
            if (_oSizeFuncSet[_avParam]) {
                return new _fQMWL(_oWin, _avSelector, _avParam);
            }
            if (_fCanLoop(_avSelector)) {
                return new _fQMWL(_oWin, _avSelector, "array");
            }
            return new _fQMWL(_oWin, _avSelector, "non-json");
        }

        function _parentEach(_aoDom, _aoParam) {
            if (_fIsDom(_aoDom)) {
                var _oCollection = _aoParam._oCollection;
                _oCollection.push(_aoDom = _aoDom.parentNode);
                if (_aoParam._bIsAll) {
                    while ((_aoDom = _aoDom.parentNode) && _aoDom.nodeType !== 9) {
                        _oCollection.push(_aoDom);
                    }
                }
            }
        }

        function _parentSelector(_asSelector, _abIsAll) {
            var _oCollection = [];
            this.each(_parentEach, {
                vParam: {
                    _oCollection: _oCollection,
                    _bIsAll: _abIsAll
                }
            });
            return new _fQMWL(this._moWin, _filter(_asSelector, this.size() > 1 ? _fUnique(_oCollection) : _oCollection), "array");
        }
        return ({
            $: _selector,
            Q: _selector,
            parent: function (_asSelector) {
                return _parentSelector.call(this, _asSelector, false);
            },
            parents: function (_asSelector) {
                return _parentSelector.call(this, _asSelector, true);
            },
            call: _fCall,
            callEx: _fExCreater(_fCall),
            each: function (_avParam1, _avParam2, _avParam3) {
                var _oSelf = this,
                    _oOptData, _sOptMode, _nSize, _oParam;
                if (_fIsFunc(_avParam1)) {
                    _oParam = _avParam2 || {};
                    _fEach.call(_oParam.oContext || _oSelf, _oSelf._moOptData, _oSelf._msOptMode, _oSelf.size(), _avParam1, _oParam.vParam);
                } else if (_fIsQMWLObj(_avParam1)) {
                    _oParam = _avParam3 || {};
                    _fEach.call(_oParam.oContext || _oSelf, _avParam1._moOptData, _avParam1._msOptMode, _avParam1.size(), _avParam2, _oParam.vParam);
                } else if (_fIsFunc(_avParam2) && !_fIsNull(_avParam1)) {
                    _oParam = _avParam3 || {};
                    if (_fCanLoop(_avParam1)) {
                        _fEach.call(_oParam.oContext || _oSelf, _avParam1, "array", _avParam1.length, _avParam2, _oParam.vParam);
                    } else {
                        _fEach.call(_oParam.oContext || _oSelf, _avParam1, "json", -1, _avParam2, _oParam.vParam);
                    }
                }
                return _oSelf;
            },
            find: function (_asSelector) {
                var _oSelf = this,
                    _oHandler = {
                        _oRet: []
                    };
                _oSelf.each(_findEach, {
                    vParam: {
                        _sSelector: _asSelector,
                        _oHandler: _oHandler
                    }
                });
                return new _fQMWL(_oSelf._moWin, _oSelf.size() > 1 ? _fUnique(_oHandler._oRet) : _oHandler._oRet, "array");
            },
            data: function (_avKey) {
                var _oSelf = this,
                    _oData = _oSelf._moOptData,
                    _oMode = _oSelf._msOptMode;
                return _fIsNull(_avKey) || _oMode == "non-json" || _fIsNull(_oData) ? _oData : _oData[_avKey];
            },
            is: _fIsQMWLObj,
            isWinEqual: function (_aoObj) {
                return (_fIsQMWLObj(_aoObj) ? _aoObj._moWin : _aoObj) == this._moWin;
            },
            size: function () {
                var _oSelf = this;
                return _oSizeFuncSet[_oSelf._msOptMode](_oSelf._moOptData);
            }
        });
    })());
    _fQMWL.extend("method", (function () {
        var _oDoc = document,
            _oDocElm = _oDoc.documentElement,
            _oSupport = {},
            _oScript = _oDoc.createElement("script"),
            _oDiv = _oDoc.createElement("div"),
            _sId = "script" + _fNow(),
            _oDivChilds, _oA;
        _oDiv.style.display = "none";
        _oDiv.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
        _oDivChilds = _oDiv.getElementsByTagName("*"), _oA = _oDiv.getElementsByTagName("a")[0];
        if (_oDivChilds && _oDivChilds.length && _oA) {
            _oSupport.opacity = /^0.55$/.test(_oA.style.opacity);
            _oSupport.cssFloat = !!_oA.style.cssFloat;
            _oScript.type = "text/javascript";
            try {
                _oScript.appendChild(_oDoc.createTextNode("window." + _sId + "=1;"));
            } catch (_oError) {}
            _oDocElm.insertBefore(_oScript, _oDocElm.firstChild);
            if (_aoWin[_sId]) {
                _oSupport.scriptEval = true;
                delete _aoWin[_sId];
            }
            _oDocElm.removeChild(_oScript);
        }
        _fBindReady(_aoWin, function () {
            var _oDiv = document.createElement("div");
            _oDiv.style.width = _oDiv.style.paddingLeft = "1px";
            document.body.appendChild(_oDiv);
            _oSupport.boxModel = _oDiv.offsetWidth === 2;
            document.body.removeChild(_oDiv).style.display = 'none';
            _oDiv = null;
        });
        _fQMWL.support = function (_asDetectType) {
            return _asDetectType ? !!_oSupport[_asDetectType] : _oSupport;
        };
        return ({
            support: _fQMWL.support
        });
    })());
    _fQMWL.extend("method", (function () {
        var _sUserAgent = navigator.userAgent,
            _sUaLowerCase = _sUserAgent.toLowerCase(),
            _oBrowserInfo = ({
                appName: navigator.appName,
                userAgent: _sUserAgent
            }),
            _oBrowser, _oOS, _oRenderEngine;

        function _getBrowser() {
            if (!_oBrowser) {
                var _oRenderEngine = _getRenderEngine(),
                    _oMatch;
                if (_oRenderEngine.ie) {
                    _oMatch = /(maxthon)[\x20]([\w.]+)/.exec(_sUaLowerCase) || /(tencenttraveler)[\x20]([\w.]+)/.exec(_sUaLowerCase) || /(the[\x20]?world)[\x20]?([\w.]+)?/.exec(_sUaLowerCase) || /(avant) Browser[\x20]([\w.]+)/.exec(_sUaLowerCase) || /(360se)[\x20]([\w.]+)/.exec(_sUaLowerCase) || /(se)[\x20]([\w.]+)/.exec(_sUaLowerCase);
                } else if (_oRenderEngine.webkit) {
                    _oMatch = /(chrome)\/([\w.]+)/.exec(_sUaLowerCase) || /(version)\/([\w.]+)/.exec(_sUaLowerCase);
                } else if (_oRenderEngine.gecko) {
                    _oMatch = /(firefox)\/([\w.]+)/.exec(_sUaLowerCase);
                }
                if (_oMatch) {
                    _oBrowser = {};
                    _oBrowser[_oBrowserInfo.app = {
                        tencenttraveler: "tt",
                        se: "sogou",
                        version: "safari"
                    }[_oMatch[1]] || _oMatch[1]] = _oBrowserInfo.appVersion = _oMatch[2] || "0";
                    _oBrowser[_oBrowserInfo.app + _oBrowserInfo.appVersion] = _oBrowser[_oBrowserInfo.app + _oBrowserInfo.appVersion.split(".")[0]] = _oBrowserInfo.appVersion;
                } else {
                    _oBrowser = _oRenderEngine;
                    _oBrowserInfo.app = _oBrowserInfo.engine;
                    _oBrowserInfo.appVersion = _oBrowserInfo.engineVersion;
                }
            }
            return _oBrowser;
        }

        function _getInfo() {
            _getBrowser();
            _getOS();
            return _oBrowserInfo;
        }

        function _getOS() {
            if (!_oOS) {
                var _oOS = {};
                if (/windows/.test(_sUaLowerCase) || /win32/.test(_sUaLowerCase)) {
                    if (/nt\x206.0/.test(_sUaLowerCase) || /windows vista/.test(_sUaLowerCase)) {
                        _oOS[_oBrowserInfo.os = "vista"] = _oOS["win"] = "6.0";
                    } else if (/nt\x206.1/.test(_sUaLowerCase)) {
                        _oOS[_oBrowserInfo.os = "win7"] = _oOS["win"] = "6.1";
                    } else {
                        _oOS[_oBrowserInfo.os = "win"] = "0";
                    }
                } else if (/ipad/.test(_sUaLowerCase)) {
                    _oOS[_oBrowserInfo.os = "ipad"] = "0";
                } else if (/mac\x20os\x20x/.test(_sUaLowerCase)) {
                    _oOS["mac os x"] = _oOS["mac"] = (/mac\x20os\x20x\x20([\w.]+)/.exec(_sUaLowerCase) || [])[1] || "0";
                    _oBrowserInfo.os = "mac os x " + _oOS["mac"];
                } else if (/macintosh/.test(_sUaLowerCase)) {
                    _oOS[_oBrowserInfo.os = "mac"] = "0";
                } else if (/linux/.test(_sUaLowerCase)) {
                    _oOS[_oBrowserInfo.os = "linux"] = "0";
                }
            }
            return _oOS;
        }

        function _getRenderEngine() {
            if (!_oRenderEngine) {
                var _oMatch = /(webkit)[\x20\/]([\w.]+)/.exec(_sUaLowerCase) || /(opera)(?:.*version)?[\x20\/]([\w.]+)/.exec(_sUaLowerCase) || /ms(ie)\x20([\w.]+)/.exec(_sUaLowerCase) || !/compatible/.test(_sUaLowerCase) && /(mozilla)(?:.*?\x20rv:([\w.]+))?/.exec(_sUaLowerCase) || [];
                _oRenderEngine = {};
                _oRenderEngine[_oBrowserInfo.engine = {
                    mozilla: "gecko"
                }[_oMatch[1]] || _oMatch[1] || "unknow"] = _oBrowserInfo.engineVersion = _oMatch[2] || "0";
                _oRenderEngine[_oBrowserInfo.engine + _oBrowserInfo.engineVersion] = _oRenderEngine[_oBrowserInfo.engine + _oBrowserInfo.engineVersion.split(".")[0]] = _oBrowserInfo.engineVersion;
            }
            return _oRenderEngine;
        }
        return ({
            browser: function (_asKey) {
                var _oInfo = _getInfo();
                return _asKey ? _oInfo[_asKey] : _oInfo;
            },
            isBrowser: function (_asBrowserExp) {
                var _bIsBrowser = false,
                    _oRenderEngine = _getRenderEngine(),
                    _oBrowser = _getBrowser();
                this.each(_asBrowserExp.split("|"), function (_asBrowser) {
                    if (_oRenderEngine[_asBrowser] || _oBrowser[_asBrowser]) {
                        return !(_bIsBrowser = true);
                    }
                });
                return _bIsBrowser;
            },
            browserVersion: function (_asBrowser) {
                return _getBrowser()[_asBrowser] || _getRenderEngine()[_asBrowser];
            },
            isOS: function (_asOSExp) {
                var _bIsOS = false,
                    _oOS = _getOS();
                this.each(_asOSExp.split("|"), function (_asOS) {
                    if (_oOS[_asOS]) {
                        return !(_bIsOS = true);
                    }
                });
                return _bIsOS;
            }
        });
    })());
    _fQMWL.extend("method", (function () {
        function _getLocParam(_aoLoc, _asAttr) {
            var _sHref = _aoLoc.href;
            return _asAttr === "hash" && _sHref.indexOf("#") > 0 && ("#" + _sHref.split("#")[1]) || _aoLoc[_asAttr];
        }
        var _oRegExpLocationSearch = /^(?:.*?\?)?(\S*?)(?:#.*)?$/,
            _oSearchSnack = /&([^&]+?)=([^&]*?)(?=&)/g;
        return {
            locSearch: function (_asUrl) {
                var _oResult = {};
                (_asUrl || this._moWin.location.href).replace(_oRegExpLocationSearch, "&$1&").replace(_oSearchSnack, function (_asValue1, _asValue2, _asValue3) {
                    var _vOldValue = _oResult[_asValue2 = decodeURIComponent(_asValue2)],
                        _sNewValue = decodeURIComponent(_asValue3);
                    if (_vOldValue == _aoUndefined) {
                        _oResult[_asValue2] = _sNewValue;
                    } else if (_fIsStr(_vOldValue)) {
                        _oResult[_asValue2] = [_vOldValue, _sNewValue];
                    } else {
                        _vOldValue.push(_sNewValue);
                    }
                    return "";
                });
                return _oResult;
            },
            loc: function (_asAttr, _asValue) {
                var _oLoc = this._moWin.location;
                if (_fIsNull(_asValue)) {
                    return _getLocParam(_oLoc, _asAttr);
                } else {
                    _oLoc[_asAttr] = _asValue;
                    return this;
                }
            }
        };
    })());
    _fQMWL.extend("method", {
        append: function (_avParam) {
            return this.insert(_avParam, "beforeEnd");
        },
        appendTo: function (_aoDom) {
            var _oSelf = this;
            return _oSelf.$(_aoDom).append(_oSelf) && _oSelf;
        },
        prepend: function (_avParam) {
            return this.insert(_avParam, "afterBegin");
        },
        prependTo: function (_aoDom) {
            var _oSelf = this;
            return _oSelf.$(_aoDom).prepend(_oSelf) && _oSelf;
        },
        fragment: function (_asHtml) {
            var _oSelf = this,
                _oFakeFrag$ = _oSelf.$("<div>").html(_asHtml),
                _oFrag$ = _oSelf.$("<fragment>"),
                _oNodeList = _oFakeFrag$.data(0).childNodes,
                _oCollection = [];
            for (var i = 0, l = _oNodeList.length; i < l; i++) {
                _oCollection[i] = _oNodeList[i].cloneNode(true);
            }
            return _asHtml ? new _fQMWL(_fGetInWin(_oFrag$.data(0)), _oCollection, "array") : _oSelf;
        },
        replaceWith: function (_asHtml) {
            return this.insert(_asHtml, "afterEnd").remove();
        },
        attr: function (_asKey, _avValue) {
            var _oSelf = this;
            if (_fIsNull(_avValue)) {
                var _vAttrVal;
                _oSelf.each(function (_aoDom) {
                    if (_fIsDom(_aoDom)) {
                        _vAttrVal = _aoDom[_asKey];
                        _fIsNull(_vAttrVal) && (_vAttrVal = _aoDom.getAttribute(_asKey));
                        return false;
                    }
                });
                return _vAttrVal;
            } else {
                return _oSelf.each(function (_aoDom) {
                    if ((_aoDom.tagName == "INPUT" || _aoDom.tagName == "TEXTAREA") && _asKey == "value") {
                        _aoDom.value = _avValue;
                    } else if (_fIsNum(_avValue) || _fIsStr(_avValue)) {
                        _aoDom.setAttribute(_asKey, _avValue);
                    } else {
                        _aoDom[_asKey] = _avValue;
                    }
                });
            }
        },
        focus: function () {
            var _oDom = this.data(0);
            _oDom && _oDom.focus && _oDom.focus();
            return this;
        },
        blur: function () {
            var _oDom = this.data(0);
            _oDom && _oDom.blur && _oDom.blur();
            return this;
        },
        rmAttr: function (_asKey) {
            return this.each(function (_aoDom) {
                _aoDom.removeAttribute && _aoDom.removeAttribute(_asKey);
                _aoDom[_asKey] && (_aoDom[_asKey] = _aoUndefined);
            });
        },
        contain: function (_aoDom) {
            var _oSelf = this,
                _oCurDom = _oSelf.data(0),
                _oTestDom = _fFormatParam(_aoDom);
            if (_fIsDom(_oCurDom) && _fIsDom(_oTestDom)) {
                if (_oCurDom.contains) {
                    return _oCurDom.contains(_oTestDom);
                } else if (_oCurDom.compareDocumentPosition) {
                    var _nCompareVal = _oCurDom.compareDocumentPosition(_oTestDom);
                    return (_nCompareVal == 20 || _nCompareVal == 0);
                }
            }
            return false;
        },
        html: function (_asHtml) {
            var _oSelf = this;
            if (_fIsNull(_asHtml)) {
                var _sHtml;
                _oSelf.each(function (_aoDom) {
                    if (_aoDom.nodeType === 1) {
                        _sHtml = _aoDom.innerHTML;
                        return false;
                    }
                });
                return _sHtml || "";
            } else {
                return _oSelf.each(function (_aoDom) {
                    _aoDom.nodeType === 1 && (_aoDom.innerHTML = _asHtml);
                });
            }
        },
        insert: function (_avParam, _asWhere) {
            var _oSelf = this,
                _vParam = _fFormatParam(_avParam),
                _fOpt = _fIsDom(_vParam) ? _fInsertDom : _fInsertHtml,
                _bNotBreak = _fOpt == _fInsertHtml;
            return _oSelf.each(function (_aoDom) {
                if (_fIsDom(_aoDom)) {
                    _fOpt(_aoDom, _asWhere, _vParam);
                    return _bNotBreak;
                }
            });
        },
        insertTo: function (_aoDom, _asWhere) {
            var _oSelf = this;
            return _oSelf.$(_aoDom).insert(_oSelf, _asWhere) && _oSelf;
        },
        insertIframe: function (_aoOpts, _asWhere) {
            return this.each(function (_aoDom) {
                if (_fIsDom(_aoDom)) {
                    var $ = this,
                        _sCbFuncName = "_ifRAmeoNlQAd_",
                        _oOpts = _aoOpts || {},
                        _sId = _oOpts.id = _oOpts.id || _fUnikey(),
                        _oWin = _fGetInWin(_aoDom),
                        _fCallBack = _oWin[_sCbFuncName],
                        _oOptList = [];
                    !_fIsFunc(_fCallBack) && (_fCallBack = _oWin[_sCbFuncName] = function (_asId, _aoIframe) {
                        if (!_aoIframe.getAttribute("_ok_") && !arguments.callee[_asId].src) {
                            return;
                        }
                        $.call(_aoIframe, arguments.callee[_asId].onload);
                    });
                    _fCallBack[_sId] = {
                        onload: _oOpts.onload,
                        src: _oOpts.src
                    };
                    _oOpts.onload = _sCbFuncName + "('" + _sId + "', this);";
                    _oOpts.src = _oOpts.src || ["javascript:document.open();document.writeln('<head><script>", "document.domain=\\x22" + document.domain + "\\x22;", "frameElement.setAttribute(\\x22_ok_\\x22,true);<\/script></head>');document.close();"].join("");
                    $.each(_oOpts, function (_asValue, _asKey) {
                        _oOptList.push(_asKey, '="', _asValue, '" ');
                    });
                    _fInsertHtml(_aoDom, _asWhere, '<iframe ' + _oOptList.join("") + '></iframe>');
                    return false;
                }
            });
        },
        inWin: function (_aoDom) {
            return _aoDom ? _fGetInWin(_aoDom) : this._moWin;
        },
        ready: function (_afReadyFn, _aoParam) {
            var _oSelf = this;
            _oSelf.isAccess() && _fBindReady(_oSelf._moWin, _afReadyFn, _aoParam);
            return _oSelf;
        },
        remove: function () {
            return this.each(_fSafe(function (_aoDom) {
                try {
                    _aoDom.parentNode.removeChild(_aoDom);
                } catch (_oError) {}
            }));
        },
        rewrite: _fSafe(function (_asHtml) {
            var _oSelf = this,
                _oDoc = _oSelf._moWin.document;
            _oDoc.open();
            _oDoc.write(_asHtml);
            _oDoc.close();
            return _oSelf;
        })
    });
    _fQMWL._oOffset = {
        _fInit: function () {
            var _oBody = document.body,
                _oContainer = document.createElement("div"),
                _oInnerDiv, _oCheckDiv, _oTable, _oTd, _nBodyMarginTop = parseFloat($.$(_oBody).css("marginTop")) || 0,
                _sHtml = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div>" + "<table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
            $.extend(_oContainer.style, {
                position: "absolute",
                top: 0,
                left: 0,
                margin: 0,
                border: 0,
                width: "1px",
                height: "1px",
                visibility: "hidden"
            });
            _oContainer.innerHTML = _sHtml;
            _oBody.insertBefore(_oContainer, _oBody.firstChild);
            _oInnerDiv = _oContainer.firstChild;
            _oCheckDiv = _oInnerDiv.firstChild;
            _oTd = _oInnerDiv.nextSibling.firstChild.firstChild;
            _fQMWL._oOffset.doesNotAddBorder = (_oCheckDiv.offsetTop !== 5);
            _fQMWL._oOffset.doesAddBorderForTableAndCells = (_oTd.offsetTop === 5);
            _oCheckDiv.style.position = "fixed", _oCheckDiv.style.top = "20px";
            _fQMWL._oOffset._bSupportsFixedPosition = (_oCheckDiv.offsetTop === 20 || _oCheckDiv.offsetTop === 15);
            _oCheckDiv.style.position = _oCheckDiv.style.top = "";
            _oInnerDiv.style.overflow = "hidden", _oInnerDiv.style.position = "relative";
            _fQMWL._oOffset._bSubtractsBorderForOverflowNotVisible = (_oCheckDiv.offsetTop === -5);
            _fQMWL._oOffset._bDoesNotIncludeMarginInBodyOffset = (_oBody.offsetTop !== _nBodyMarginTop);
            _oBody.removeChild(_oContainer);
            _oBody = _oContainer = _oInnerDiv = _oCheckDiv = _oTable = _oTd = null;
            _fQMWL._oOffset._fInit = _fNoop;
        }
    };
    _fQMWL.extend("method", (function () {
        var _oDomEx = {};

        function _swap(_aoDom, _aoParams, _afCallback, _aoSelf) {
            var _oParentParams = [],
                _oParent = _aoDom,
                _oOldParams, _oStyle;
            while (_oParent) {
                _oOldParams = null;
                if (_aoSelf.$(_oParent).css("display") == "none") {
                    _oOldParams = {};
                    _oStyle = _oParent.style;
                    for (var _sName in _aoParams) {
                        _oOldParams[_sName] = _oStyle[_sName];
                        _oStyle[_sName] = _aoParams[_sName];
                    }
                }
                _oParentParams.push(_oParent, _oOldParams);
                _oParent = _oParent.parentNode;
            }
            _fCall(_afCallback);
            for (var i = _oParentParams.length - 1; i > 0; i -= 2) {
                if (_oParentParams[i]) {
                    _oStyle = _oParentParams[i - 1].style;
                    for (var _sName in _aoParams) {
                        _oStyle[_sName] = _oParentParams[i][_sName];
                    }
                }
            }
        }

        function _getWidthHeight(_asName, _abPadding, _abBorder, _abMargin) {
            var _oSelf = this,
                _oDom = _oSelf.data(0),
                _oBox = [_abPadding ? "" : "padding", -1, _abBorder ? "" : "border", -1, _abMargin ? "margin" : "", 1],
                _nValue;

            function _getWH() {
                var _oRelative;
                if (_asName.toLowerCase() == 'width') {
                    _nValue = _oDom.offsetWidth;
                    _oRelative = ["Left", "Right"];
                } else {
                    _nValue = _oDom.offsetHeight;
                    _oRelative = ["Top", "Bottom"];
                }
                for (var i = _oBox.length - 2; i >= 0; i -= 2) {
                    if (_oBox[i]) {
                        for (var j = _oRelative.length - 1; j >= 0; j--) {
                            _nValue += _oBox[i + 1] * (parseFloat(_oSelf.css(_oBox[i] + _oRelative[j])) || 0);
                        }
                    }
                }
                return _nValue;
            }
            if (_oDom.offsetWidth > 0) {
                _getWH();
            } else {
                var _oCssShow = {
                    position: "absolute",
                    visibility: "hidden",
                    display: "block"
                };
                _swap(_oDom, _oCssShow, _getWH, _oSelf);
            }
            return _nValue;
        }

        function _getOffsetByBoundClientRect() {
            var _oSelf = this,
                _oElem = _oSelf.data(0);
            if (!_oElem || !_oElem.ownerDocument) {
                return null;
            }
            if (_oElem === _oElem.ownerDocument.body) {
                return null;
            }
            var _oBox = _oElem.getBoundingClientRect(),
                _oWin = _oSelf.inWin(_oElem),
                _oDoc = _oElem.ownerDocument,
                _oBody = _oDoc.body,
                _oDocElem = _oDoc.documentElement,
                _nClientTop = _oDocElem.clientTop || _oBody.clientTop || 0,
                _nClientLeft = _oDocElem.clientLeft || _oBody.clientLeft || 0,
                _nTop = _oBox.top + (_oWin.pageYOffset || _fQMWL.support("boxModel") && _oDocElem.scrollTop || _oBody.scrollTop) - _nClientTop,
                _nLeft = _oBox.left + (_oWin.pageXOffset || _fQMWL.support("boxModel") && _oDocElem.scrollLeft || _oBody.scrollLeft) - _nClientLeft;
            return {
                top: _fixTop(_nTop),
                left: _fixLeft(_nLeft)
            };
        }

        function _fixLeft(_anVal) {
            if (window.getTop && getTop().Scale) {
                return getTop().Scale.fixOffsetLeft(_anVal);
            }
            return _anVal;
        }

        function _fixTop(_anVal) {
            if (window.getTop && getTop().Scale) {
                return getTop().Scale.fixOffsetTop(_anVal);
            }
            return _anVal;
        }

        function _getOffset() {
            var _oSelf = this,
                _oElem = _oSelf.data(0);
            if (!_oElem || !_oElem.ownerDocument) {
                return null;
            }
            if (_oElem === _oElem.ownerDocument.body) {
                return null;
            }
            _fQMWL._oOffset._fInit();
            var _oOffsetParent = _oElem.offsetParent,
                _oPrevOffsetParent = _oElem,
                _oDoc = _oElem.ownerDocument,
                _oComputedStyle, _oDocElem = _oDoc.documentElement,
                _oBody = _oDoc.body,
                _oDefaultView = _oDoc.defaultView,
                _oPrevComputedStyle = _oDefaultView ? _oDefaultView.getComputedStyle(_oElem, null) : _oElem.currentStyle,
                _nTop = _oElem.offsetTop,
                _oLeft = _oElem.offsetLeft;
            while ((_oElem = _oElem.parentNode) && _oElem !== _oBody && _oElem !== _oDocElem) {
                if (_fQMWL._oOffset._bSupportsFixedPosition && _oPrevComputedStyle.position === "fixed") {
                    break;
                }
                _oComputedStyle = _oDefaultView ? _oDefaultView.getComputedStyle(_oElem, null) : _oElem.currentStyle;
                _nTop -= _fixTop(_oElem.scrollTop);
                _oLeft -= _fixLeft(_oElem.scrollLeft);
                if (_oElem === _oOffsetParent) {
                    _nTop += _fixTop(_oElem.offsetTop);
                    _oLeft += _fixLeft(_oElem.offsetLeft);
                    if (_fQMWL._oOffset.doesNotAddBorder && !(_fQMWL._oOffset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(_oElem.nodeName))) {
                        _nTop += _fixTop(parseFloat(_oComputedStyle.borderTopWidth)) || 0;
                        _oLeft += _fixLeft(parseFloat(_oComputedStyle.borderLeftWidth)) || 0;
                    }
                    _oPrevOffsetParent = offsetParent, offsetParent = _oElem.offsetParent;
                }
                if (_fQMWL._oOffset._bSubtractsBorderForOverflowNotVisible && _oComputedStyle.overflow !== "visible") {
                    _nTop += _fixTop(parseFloat(_oComputedStyle.borderTopWidth)) || 0;
                    _oLeft += _fixLeft(parseFloat(_oComputedStyle.borderLeftWidth)) || 0;
                }
                _oPrevComputedStyle = _oComputedStyle;
            }
            if (_oPrevComputedStyle.position === "relative" || _oPrevComputedStyle.position === "static") {
                _nTop += _fixTop(_oBody.offsetTop);
                _oLeft += _fixLeft(_oBody.offsetLeft);
            }
            if (_fQMWL._oOffset._bSupportsFixedPosition && _oPrevComputedStyle.position === "fixed") {
                _nTop += _fixTop(Math.max(_oDocElem.scrollTop, _oBody.scrollTop));
                _oLeft += _fixLeft(Math.max(_oDocElem.scrollLeft, _oBody.scrollLeft));
            }
            return {
                top: _nTop,
                left: _oLeft
            };
        }
        _oDomEx.offset = "getBoundingClientRect" in document.documentElement ? _getOffsetByBoundClientRect : _getOffset;

        function _fCreatePosMethod(_asName) {
            var _sMethod = "scroll" + _asName;
            _oDomEx[_sMethod] = function () {
                var _oSelf = this,
                    _oElem = _oSelf.data(0),
                    _oWin = _oSelf.inWin(_oElem);
                if (!_oElem) {
                    return null;
                }
                return _oWin ? ("pageXOffset" in _oWin) ? _oWin[_asName == "Top" ? "pageYOffset" : "pageXOffset"] : _fQMWL.support("boxModel") && _oWin.document.documentElement[_sMethod] || _oWin.document.body[_sMethod] : _oElem[_sMethod];
            };
        }
        var _oArr = ["Left", "Top"];
        for (var i = 0; i < _oArr.length; i++) {
            _fCreatePosMethod(_oArr[i]);
        }
        _oArr = ["Height", "Width"];

        function _fCreateSizeMethod(_asName) {
            var _asType = _asName.toLowerCase();
            _oDomEx["inner" + _asName] = function () {
                var _oSelf = this;
                return _oSelf.size() ? _fCall(_oSelf, _getWidthHeight, [_asName, true]) : null;
            };
            _oDomEx["outer" + _asName] = function (_abMargin) {
                var _oSelf = this;
                return _oSelf.size() ? _fCall(_oSelf, _getWidthHeight, [_asName, true, true, true]) : null;
            };
            _oDomEx[_asType] = function () {
                var _oSelf = this,
                    _oElem = _oSelf.data(0);
                return (_oElem && typeof _oElem === "object" && "setInterval" in _oElem) ? _oElem.document.compatMode === "CSS1Compat" && _oElem.document.documentElement["client" + _asName] || _oElem.document.body["client" + _asName] : (_oElem.nodeType === 9) ? Math.max(_oElem.documentElement["client" + _asName], _oElem.body["scroll" + _asName], _oElem.documentElement["scroll" + _asName], _oElem.body["offset" + _asName], _oElem.documentElement["offset" + _asName]) : _fCall(_oSelf, _getWidthHeight, [_asType]);
            };
        }
        for (var i = 0; i < _oArr.length; i++) {
            _fCreateSizeMethod(_oArr[i]);
        }
        return _oDomEx;
    })());
    _fQMWL.extend("method", (function () {
        var _oExprAlpha = /alpha\([^)]*\)/,
            _oExprExclude = /z-?index|font-?weight|opacity|zoom|line-?height/i,
            _oExprDashAlpha = /-([a-z])/ig,
            _oExprOpacity = /opacity=([^)]*)/,
            _oExprUpper = /([A-Z])/g,
            _fCamelCase = function (_aoAll, _asLetter) {
                return _asLetter.toUpperCase();
            },
            _fCamelName = _fQMWL.camelName = function (_asName) {
                return _asName.replace(_oExprDashAlpha, _fCamelCase);
            };

        function _canSetStyle(_aoDom) {
            return !(!_aoDom || _aoDom.nodeType === 3 || _aoDom.nodeType === 8);
        }

        function _curStyle(_aoDom, _asName) {
            var _sStyle = _aoDom.style,
                _oDefaultView = _fGetInWin(_aoDom),
                _oCurrentStyle = _aoDom.currentStyle,
                _sRet;
            if (_asName === "opacity" && !_fQMWL.support("opacity") && _oCurrentStyle) {
                _sRet = _oExprOpacity.test(_oCurrentStyle.filter || "") ? (Number(RegExp.$1) / 100) + "" : "";
                return _sRet === "" ? "1" : _sRet;
            }
            if (_oCurrentStyle) {
                var _sCamelCase = _fCamelName(_asName);
                _sRet = _oCurrentStyle[_asName] || _oCurrentStyle[_sCamelCase];
            } else if (_aoDom.nodeType != 9) {
                var _oComputedStyle = _oDefaultView.getComputedStyle(_aoDom, null);
                _asName = _asName.replace(_oExprUpper, "-$1").toLowerCase();
                _sRet = _oComputedStyle.getPropertyValue(_asName);
                _asName === "opacity" && _sRet === "" && (_sRet = "1");
            }
            return _sRet;
        }

        function _setStyle(_aoDom, _asName, _avValue) {
            if (_fIsNull(_avValue)) {
                return;
            }
            var _oStyle = _aoDom.style || _aoDom;
            if (!_fQMWL.support("opacity") && _asName === "opacity") {
                _oStyle.zoom = 1;
                var _sOpacity = parseInt(_avValue, 10) + "" === "NaN" ? "" : "alpha(opacity=" + _avValue * 100 + ")",
                    _sFilter = _oStyle.filter || _curStyle(_aoDom, "filter") || "";
                _oStyle.filter = _oExprAlpha.test(_sFilter) ? _sFilter.replace(_oExprAlpha, _sOpacity) : _sOpacity;
            }
            _asName = _fCamelName(_asName);
            if (_fIsNum(_avValue) && !_oExprExclude.test(_asName)) {
                _avValue += "px";
            }
            _aoDom.style[_asName] = _avValue;
        }

        function _setStyleForEach(_aoDom, _aoStyleList) {
            _canSetStyle(_aoDom) && _setStyle(_aoDom, _aoStyleList[0], _aoStyleList[1]);
        }

        function _setStylesForEach(_aoDom, _aoStyleInfo) {
            if (_canSetStyle(_aoDom)) {
                for (var _sName in _aoStyleInfo) {
                    _aoStyleInfo.hasOwnProperty(_sName) && _setStyle(_aoDom, _sName, _aoStyleInfo[_sName]);
                }
            }
        }
        return ({
            css: function (_avParam1, _avParam2) {
                var _oSelf = this;
                if (_fIsNull(_avParam2)) {
                    if (_fIsStr(_avParam1)) {
                        var _oDom = _oSelf.data(0);
                        if (_fIsDom(_oDom)) {
                            return _curStyle(_oDom, _avParam1);
                        }
                        return _aoUndefined;
                    } else {
                        _oSelf.each(_setStylesForEach, {
                            vParam: _avParam1
                        });
                    }
                } else {
                    _oSelf.each(_setStyleForEach, {
                        vParam: arguments
                    });
                }
                return this;
            },
            show: function () {
                return this.css("display", "");
            },
            hide: function () {
                return this.css("display", "none");
            },
            toggle: function () {
                return this[this.css("display") == "none" ? "show" : "hide"]();
            },
            addClass: function (_asClass) {
                return !_fIsNull(_asClass) ? this.each(function (_aoDom) {
                    var _sClassName = " " + _aoDom.className + " ";
                    if (_sClassName.indexOf(" " + _asClass + " ") < 0) {
                        _aoDom.className += _aoDom.className ? " " + _asClass : _asClass;
                    }
                }) : this;
            },
            rmClass: function (_asClass) {
                return this.each(function (_aoDom) {
                    if (!_fIsNull(_asClass)) {
                        var _sClassName = " " + _aoDom.className + " ";
                        _sClassName = _sClassName.replace(" " + _asClass + " ", " ");
                        _aoDom.className = _fTrim(_sClassName);
                    } else {
                        _aoDom.className = "";
                    }
                });
            },
            hasClass: function (_asClass) {
                return !!this.data(0) && (" " + this.data(0).className + " ").indexOf(" " + _asClass + " ") > -1;
            }
        });
    })());
    _fQMWL.extend("method", {
        addPageUnloadEvent: function (_afEventFunc) {
            var _oSelf = this,
                _oWin = _oSelf._moWin;
            if (!_oWin._ununloadsets) {
                _oWin._ununloadsets = [_afEventFunc];
                _oWin.onunload && _oWin._ununloadsets.push(_oWin.onunload);
                _oWin.onunload = function () {
                    var _oUnloads = _oWin._ununloadsets;
                    for (var i = _oUnloads.length - 1; i > -1; i--) {
                        _fCall(_oWin, _oUnloads[i]);
                    }
                };
            } else {
                _oWin._ununloadsets.push(_afEventFunc);
            }
            return _oSelf;
        },
        addEvent: _fEventOptCreate(_fAddEvent, _fAddEvents, false),
        delEvent: _fEventOptCreate(_fDelEvent, _fDelEvents),
        event$: function (_asGlobalEventObjName) {
            return this.$(_fGetGlobalEventObj(_asGlobalEventObjName));
        },
        fireEvent: _fEventOptCreate(_fFireEvent),
        on: _fEventOptCreate(_fAddEvent, _fAddEvents, true),
        stopPropagation: function (_aoEvent) {
            if (_aoEvent) {
                _aoEvent.stopPropagation ? _aoEvent.stopPropagation() : (_aoEvent.cancelBubble = true);
            }
            return this;
        },
        preventDefault: function (_aoEvent) {
            if (_aoEvent) {
                _aoEvent.preventDefault ? _aoEvent.preventDefault() : (_aoEvent.returnValue = false);
            }
            return this;
        },
        target: function (_aoEvent) {
            return _aoEvent && (_aoEvent.srcElement || _aoEvent.target);
        }
    });
    _fQMWL.extend("method", (function () {
        var _oExprTimeStamp = /(\?|&)r=.*?(&|$)/,
            _oExprQuery = /\?/,
            _nGlobalActivexNum = 0,
            _oAjaxSetting = {
                bAsync: true,
                bCache: true,
                sContentType: "application/x-www-form-urlencoded",
                bGlobal: true,
                nTimeout: 5000,
                sType: "GET",
                bProcessData: true,
                ongetxhr: _aoWin.XMLHttpRequest && (_aoWin.location.protocol !== "file:" || !_aoWin.ActiveXObject) ? function (_aoNewWin) {
                    return new(_aoNewWin || _aoWin).XMLHttpRequest();
                } : _fSafe(function (_aoNewWin) {
                    return new(_aoNewWin || _aoWin).ActiveXObject("Microsoft.XMLHTTP");
                })
            },
            _oAccepts = {
                xml: "application/xml, text/xml",
                html: "text/html",
                script: "text/javascript, application/javascript",
                json: "application/json, text/javascript",
                text: "text/plain",
                _default: "*/*"
            },
            _sAjaxEventSet = "|onbeforesend|oncomplete|ondatafilter|onerror|onsuccess|";

        function _add(_avValue, _aoData, _avKey) {
            var _bIsKeyNum = _fIsNum(_avKey),
                _sKey = _bIsKeyNum ? _avValue.name : _avKey,
                _vValue = _bIsKeyNum ? _avValue.value : _avValue;
            !_fIsNull(_sKey) && _aoData.push(_fEncodeURIComponent(_sKey) + "=" + _fEncodeURIComponent(_fIsFunc(_vValue) ? _fSafe(_vValue, "ajax build data : " + _sKey + " func")() : _vValue));
        }

        function _addQuery(_asUrl, _asQuery) {
            return _asUrl + (_oExprQuery.test(_asUrl) ? "&" : "?") + _asQuery;
        }

        function _bulidContentData(_avData, _asContentType, _abProcessData) {
            if (_abProcessData === false) {
                return _avData;
            }
            var _oSelf = this,
                _oData = [];
            if (_fIsStr(_avData)) {
                _oData.push(_avData);
            } else if (_fIsArr(_avData) || _fIsObj(_avData)) {
                _oSelf.each(_avData, _add, {
                    vParam: _oData
                });
            }
            return _oData.join("&");
        }

        function _responseDataProcess(_aoXhr, _asType, _aoSetting) {
            var _sContentType = _aoXhr.getResponseHeader("content-type") || "",
                _bXml = _asType === "xml" || !_asType && _sContentType.indexOf("xml") >= 0,
                _vData = _bXml ? _aoXhr.responseXML : _aoXhr.responseText;
            _bXml && _vData.documentElement.nodeName === "parsererror" && _fThrowException("parsererror");
            _aoSetting && _fIsFunc(_aoSetting.ondatafilter) && (_vData = _aoSetting.ondatafilter(_vData, _asType));
            if (_fIsStr(_vData)) {
                if (_asType === "json" || !_asType && _sContentType.indexOf("json") >= 0) {} else if (_asType === "script" || !_asType && _sContentType.indexOf("javascript") >= 0) {}
            }
            return _vData;
        }

        function _isAjaxEventSetting(_aoEvent) {
            var _bIsAjaxSet = false;
            for (var _sName in _aoEvent) {
                if (_fIsFunc(_aoEvent[_sName]) && _sAjaxEventSet.indexOf("|" + _sName + "|") != -1) {
                    _bIsAjaxSet = true;
                    break;
                }
            }
            return _bIsAjaxSet;
        }

        function _isHttpSuccess(_aoXhr) {
            try {
                return !_aoXhr.status && location.protocol === "files:" || (_aoXhr.status >= 200 && _aoXhr.status < 300) || _aoXhr.status === 304 || _aoXhr.status === 1223 || _aoXhr.status === 0;
            } catch (_oError) {}
            return false;
        }

        function _simpleAjaxParamFormat(_aoArg, _asType, _asEventName) {
            var _sEventName = _asEventName || "onsuccess",
                _oSetting = {
                    sUrl: _aoArg[0],
                    sType: _asType
                },
                _vParam1 = _aoArg[1],
                _vParam2 = _aoArg[2];
            if (_fIsFunc(_vParam1)) {
                _oSetting[_sEventName] = _vParam1;
                _oSetting.sDataType = _vParam2;
            } else if (_isAjaxEventSetting(_vParam1)) {
                _fExtend(_oSetting, _vParam1, {
                    sDataType: _vParam2
                });
            } else if (_isAjaxEventSetting(_vParam2)) {
                _fExtend(_oSetting, _vParam2, {
                    vData: _vParam1,
                    sDataType: _aoArg[3]
                });
            } else {
                _oSetting.vData = _vParam1;
                _oSetting[_sEventName] = _vParam2;
                _oSetting.sDataType = _aoArg[3];
            }
            return _oSetting;
        }
        return ({
            ajax: function (_aoSetting) {
                var _oSelf = this,
                    _oSetting = _fExtend({}, _oAjaxSetting, _aoSetting),
                    _oContext = _oSetting.oContext || _oSetting,
                    _sType = _oSetting.sType.toUpperCase(),
                    _sUrl = _oSetting.sUrl,
                    _sData = _bulidContentData.call(_oSelf, _oSetting.vData, _oSetting.sContentType, _oSetting.bProcessData),
                    _bRequestDone = false,
                    _sStatus, _vResponseData, _oErr, _oXhr, _nTimer;
                if (!_sUrl) {
                    return _oSelf;
                }
                if (_oSetting.bCache === false && _sType === "GET") {
                    var _sTimeStampQuery = "r=" + _fNow(),
                        _sNewUrl = _sUrl.replace(_oExprTimeStamp, "$1" + _sTimeStampQuery + "$2");
                    _sUrl = _sUrl === _sNewUrl ? _addQuery(_sNewUrl, _sTimeStampQuery) : _sNewUrl;
                }
                _sData && _sType === "GET" && (_sUrl = _addQuery(_sUrl, _sData));
                if (!(_oXhr = _fCall(_oSetting.ongetxhr, [_oSelf._moWin]))) {
                    return _oSelf;
                }
                _oSetting.bGlobal && !_nGlobalActivexNum++ && _fireGlobalEvent("start");
                _oXhr.open(_sType, _sUrl, _oSetting.bAsync);
                try {
                    (_sData || _aoSetting && _aoSetting.sContentType) && _oXhr.setRequestHeader("Content-Type", _oSetting.sContentType);
                    _oXhr.setRequestHeader("Accept", [_oSetting.sDataType && _oAccepts[_oSetting.sDataType], _oAccepts._default].join(", "));
                } catch (_oError) {}
                if (_fCall(_oContext, _oSetting.onbeforesend, [_oXhr]) === false) {
                    _oSetting.bGlobal && !--_nGlobalActivexNum && _fireGlobalEvent("stop");
                    _oXhr.abort();
                    return _oSelf;
                }
                _oSetting.bGlobal && _fireGlobalEvent("send");
                _oXhr.onreadystatechange = _onreadystatechange;
                try {
                    var _fOldAbort = _oXhr.abort;
                    _oXhr.abort = function () {
                        var _oAbortXhr = _oXhr;
                        _oAbortXhr && !(_oXhr = _aoUndefined) && _fOldAbort.call(_oAbortXhr);
                        _onreadystatechange("abort");
                    };
                } catch (_oError) {}
                if (_oSetting.bAsync && _oSetting.nTimeout > 0) {
                    _nTimer = setTimeout(function () {
                        _oXhr && !_bRequestDone && _onreadystatechange("timeout");
                    }, _oSetting.nTimeout);
                }
                try {
                    _oXhr.send(_sType != "GET" ? _sData : _aoUndefined);
                } catch (_oErr) {
                    _sStatus = "senderr";
                    _handleError();
                    _handleComplete();
                }!_oSetting.bAsync && _onreadystatechange();

                function _fireGlobalEvent(_asEventType, _aoParamList) {
                    _oSelf.event$("ajax").fireEvent(_asEventType, _aoParamList, {
                        oContext: _oContext
                    });
                }

                function _handleComplete() {
                    !!_nTimer && (clearTimeout(_nTimer) || 1) && (_nTimer = 0);
                    _fCall(_oContext, _oSetting.oncomplete, [_oXhr, _sStatus]);
                    _oSetting.bGlobal && _fireGlobalEvent("complete", [_oXhr, _sStatus]);
                    _oSetting.bGlobal && !--_nGlobalActivexNum && _fireGlobalEvent("stop");
                }

                function _handleError() {
                    _fCall(_oContext, _oSetting.onerror, [_oXhr, _sStatus, _oErr]);
                    _oSetting.bGlobal && _fireGlobalEvent("error", [_oXhr, _sStatus, _oErr]);
                }

                function _handleSuccess() {
                    _fCall(_oContext, _oSetting.onsuccess, [_vResponseData, _sStatus, _oXhr]);
                    _oSetting.bGlobal && _fireGlobalEvent("success", [_vResponseData, _sStatus, _oXhr]);
                }

                function _onreadystatechange(_asCustomStatus) {
                    if (!_oXhr || _oXhr.readyState === 0 || _asCustomStatus === "abort") {
                        _bRequestDone = true;
                        _oXhr && (_oXhr.onreadystatechange = _fNoop);
                        !_bRequestDone && _handleComplete();
                    } else if (!_bRequestDone && _oXhr && (_oXhr.readyState === 4 || _asCustomStatus === "timeout")) {
                        _bRequestDone = true;
                        _oXhr.onreadystatechange = _fNoop;
                        _sStatus = _asCustomStatus === "timeout" ? "timeout" : !_isHttpSuccess(_oXhr) ? "error" : "success";
                        if (_sStatus === "success") {
                            try {
                                _vResponseData = _responseDataProcess(_oXhr, _oSetting.sDataType, _oSetting);
                            } catch (_oExpection) {
                                _sStatus = _oExpection.type || "parsererror";
                                _oErr = _oExpection;
                            }
                        }
                        (_sStatus === "success" ? _handleSuccess : _handleError)();
                        _handleComplete();
                        _asCustomStatus === "timeout" && _oXhr.abort();
                        _oSetting.bAsync && (_oXhr = _aoUndefined);
                    }
                }
                return _oSelf;
            },
            ajaxSetting: function (_aoSetting) {
                var _vRet = this;
                _aoSetting ? _fExtend(_oAjaxSetting, _aoSetting) : (_vRet = _oAjaxSetting);
                return _vRet;
            },
            get: function () {
                return this.ajax(_simpleAjaxParamFormat(arguments, "GET"));
            },
            load: function () {
                var _oSelf = this,
                    _oOptDom;
                _oSelf.each(function (_aoObj) {
                    if (_fIsDom(_aoObj)) {
                        _oOptDom = _aoObj;
                        return false;
                    }
                });
                if (!_oOptDom) {
                    return _oSelf;
                }
                var _oSettings = _simpleAjaxParamFormat(arguments, "GET", "oncomplete"),
                    _fUserSuccess = _oSettings.onsuccess;
                return _oSelf.ajax(_fExtend(_oSettings, {
                    sDataType: "html",
                    onsuccess: function () {
                        _oOptDom.innerHTML = _fFilteScript(arguments[0]);
                        _fCall(this, _fUserSuccess, arguments);
                    }
                }));
            },
            loadJS: function (_asSrc, _aoSetting, _aoAttr) {
                var _oSelf = this,
                    _oWin = _oSelf._moWin,
                    _oScript$ = _oSelf.$("<script>"),
                    _oScriptDom = _oScript$.data(0),
                    _fOnLoad = function (_abIsOK, _abIsDelay) {
                        if (_nTimer != 0) {
                            _oWin.clearTimeout(_nTimer);
                            _nTimer = 0;
                            _abIsDelay ? _oWin.setTimeout(function () {
                                _fCall(_oScriptDom, _aoSetting, "onload", [!!_abIsOK]);
                            }, 100) : _fCall(_oScriptDom, _aoSetting, "onload", [!!_abIsOK]);
                            if (_aoSetting.bNeedRemove === true) {
                                _oScript$.remove();
                            }
                        }
                    },
                    _nTimer = _oWin.setTimeout(function () {
                        _fOnLoad(false);
                        _oScript$.remove();
                    }, _fIsNum(_aoSetting && _aoSetting.nTimeout) ? _aoSetting.nTimeout : 10000);
                _oSelf.each(_aoAttr, function (_avVal, _asKey) {
                    !_fIsNull(_avVal) && _oScriptDom.setAttribute(_asKey, _avVal);
                }).$("head").append(_fExtend(_oScriptDom, {
                    type: "text/javascript",
                    src: _asSrc,
                    onload: _fOnLoad,
                    onreadystatechange: function () {
                        ({
                            loaded: true,
                            complete: true
                        }[this.readyState]) && _fOnLoad(true, true);
                    }
                }));
                return _oSelf;
            },
            post: function () {
                return this.ajax(_simpleAjaxParamFormat(arguments, "POST"));
            }
        });
    })());
    _fQMWL.extend("method", (function () {
        function _QMTemplate(_avTmplStr, _asTmplReplaceVar, _asType) {
            var _oSelf = this;
            _oSelf._msTmplStr = _avTmplStr.join ? _avTmplStr.join("") : _avTmplStr.toString();
            _oSelf._msTmplReplaceVar = _asTmplReplaceVar || "$";
            _oSelf._replace = _asType == "exp" ? _oSelf._replaceWithExp : _oSelf._replaceWithParse;
        };
        _QMTemplate.prototype = {
            toString: function () {
                return this._msTmplStr;
            },
            replace: function (_aoJson, _asSection, _aoJsAdapter) {
                return this._replace(_aoJson, _asSection, _aoJsAdapter);
            },
            _replaceWithParse: function (_aoJson, _abIsOnlyReplaceExist, _aoRoot) {
                var _oSelf = this,
                    _sReplaceVar = _oSelf._msTmplReplaceVar,
                    _oTmplData = _oSelf._moTmplData,
                    _oLinkData = _oSelf._moLinkData,
                    _bIsNeeCompile = !_oTmplData,
                    _fGet = _abIsOnlyReplaceExist ? _oSelf._getWithNoReplace : _oSelf._get;
                if (_bIsNeeCompile) {
                    _oTmplData = _oSelf._moTmplData = _oSelf._msTmplStr.split(_oSelf._msTmplReplaceVar);
                    _oLinkData = _oSelf._moLinkData = _oSelf._moTmplData.concat();
                }
                for (var i = 1, _nLen = _oTmplData.length; i < _nLen; i += 2) {
                    _oLinkData[i] = _fGet.call(_oSelf, _bIsNeeCompile ? (_oTmplData[i] = _oTmplData[i].split(".")) : _oTmplData[i], _aoJson, _aoRoot, _sReplaceVar);
                }
                return _oLinkData.join("");
            },
            _replaceWithExp: function (_aoJson, _asSection, _aoJsAdapter) {
                var _oSelf = this,
                    _fHandler;
                if (!_oSelf._mfReplace) {
                    _oSelf._compile();
                }
                if (typeof _asSection == "string") {
                    var _vSecData = _oSelf._moSecDatas[_asSection];
                    if (_vSecData) {
                        _fHandler = typeof _vSecData != "function" ? _oSelf._moSecDatas[_asSection] = _oSelf._genHandleFunc(_vSecData) : _vSecData;
                    }
                } else {
                    _fHandler = _oSelf._mfReplace;
                }
                try {
                    return _fHandler && _fHandler(_aoJson, _oSelf._moTmplDatas, _oSelf._get, _oSelf._msTmplReplaceVar, _oSelf._tplFunc(), _aoJsAdapter || _asSection) || "";
                } catch (_oError) {
                    return _oError.message;
                }
            },
            _compile: function () {
                var _oSelf = this,
                    _nForLen = 0,
                    _oCompileDatas = [],
                    _oForStack = [],
                    _oSecStack = [],
                    _oSecDatas = _oSelf._moSecDatas = [],
                    _sReplaceVar = _oSelf._msTmplReplaceVar,
                    _oRegExp = new RegExp(["", "(.*?)", ""].join(_fRegFilter(_sReplaceVar)), "g"),
                    _sGetVar = "_afG('$1'.split('.'),_oD,_aoD,_aoR)",
                    _oTmplDatas = _oSelf._moTmplDatas = _oSelf._msTmplStr.split(["", "@", ""].join(_sReplaceVar)),
                    _sTmplValue;
                for (var i = 0, _nLen = _oTmplDatas.length; i < _nLen; i++) {
                    _sTmplValue = _oTmplDatas[i];
                    if (i % 2 == 0) {
                        _oCompileDatas.push("_oR.push(_aoT[", i, "].replace(_oD,false,_aoD));");
                        _oTmplDatas[i] = new _QMTemplate(_sTmplValue, _sReplaceVar);
                    } else if (_sTmplValue == "else") {
                        _oCompileDatas.push("}else{");
                    } else if (_sTmplValue == "endsec") {
                        if (_oSecStack.length) {
                            var _oData = _oSecStack.pop();
                            _oSecDatas[_oData[0]] = _oCompileDatas.slice(_oData[1]);
                        }
                    } else if (_sTmplValue == "endfor") {
                        _oForStack.length && _oCompileDatas.push("try{delete _oD._parent_;delete _oD._idx_;}catch(e){}", "}_oD=_oS", _oForStack.pop(), ";");
                    } else if (_sTmplValue == "endif") {
                        _oCompileDatas.push("}");
                    } else if (_sTmplValue.indexOf("else if(") == 0) {
                        _oCompileDatas.push("}", _sTmplValue.replace(_oRegExp, _sGetVar), "{");
                    } else if (_sTmplValue.indexOf("if(") == 0) {
                        _oCompileDatas.push(_sTmplValue.replace(_oRegExp, _sGetVar), "{");
                    } else if (_sTmplValue.indexOf("for(") == 0) {
                        _oForStack.push(++_nForLen);
                        _oCompileDatas.push("var _sI", _nForLen, ",_oD", _nForLen, ",_oS", _nForLen, "=_oD;", _sTmplValue.replace(_oRegExp, ["_sI", _nForLen, " in (_oD", _nForLen, "=", _sGetVar, ")"].join("")), "{", "_oD=_oD", _nForLen, "[_sI", _nForLen, "];", "try{", "_oD._parent_=_oS", _nForLen, ";", "_oD._idx_=_sI", _nForLen, ";", "}catch(e){}");
                    } else if (_sTmplValue.indexOf("sec ") == 0) {
                        _oSecStack.push([_sTmplValue.split(" ").pop(), _oCompileDatas.length]);
                    } else if (_sTmplValue.indexOf("eval ") == 0) {
                        _oCompileDatas.push("_oR.push(", _sTmplValue.substr(5).replace(_oRegExp, _sGetVar), ");");
                    } else if (_sTmplValue.indexOf("html(") == 0) {
                        _oCompileDatas.push("_oR.push(_aoFc.htmlEncode(", _sTmplValue.substr(5).replace(_oRegExp, _sGetVar), ");");
                    } else if (_sTmplValue.indexOf("SetVar(") == 0) {
                        _oCompileDatas.push("_oR.push(_aoFc.SetVar(_oD,", _sTmplValue.substr(7).replace(_oRegExp, _sGetVar), ");");
                    }
                }
                _oSelf._mfReplace = _oSelf._genHandleFunc(_oCompileDatas);
                return _oCompileDatas;
            },
            _genHandleFunc: function (_aoCompileDatas) {
                try {
                    return eval(['([function(_aoD,_aoT,_afG,_aoR, _aoFc, A){var _oR=[],_oD=_aoD;', _aoCompileDatas.join(""), 'return _oR.join("");}])'].join(""))[0];
                } catch (_oErr) {
                    return function () {
                        return "compile err!";
                    };
                }
            },
            _getWithNoReplace: function (_aoVarKeys, _aoJson, _aoRootJson, _asReplaceVar) {
                var _vVal = this._get(_aoVarKeys, _aoJson, _aoRootJson, _asReplaceVar);
                return typeof _vVal == "undefined" ? _asReplaceVar + _aoVarKeys.join(".") + _asReplaceVar : _vVal;
            },
            _get: function (_aoVarKeys, _aoJson, _aoRootJson, _asReplaceVar) {
                var _nLen = _aoVarKeys.length,
                    _sKey, _vVal, _oUndefined;
                if (_nLen > 1) {
                    try {
                        _vVal = _aoJson;
                        for (var i = 0; i < _nLen; i++) {
                            _sKey = _aoVarKeys[i];
                            if (_sKey == "_root_") {
                                _vVal = _aoRootJson;
                            } else {
                                _vVal = _vVal[_sKey];
                            }
                        }
                    } catch (_oError) {
                        _vVal = _oUndefined;
                    }
                } else {
                    _vVal = {
                        "_var_": _asReplaceVar,
                        "_this_": _aoJson
                    }[_sKey = _aoVarKeys[0]] || _aoJson[_sKey];
                }
                return _vVal;
            },
            _tplFunc: function () {
                return {
                    htmlEncode: _fHtmlEncode,
                    SetVar: function (_aoJson, _asName, _asValue) {
                        _aoJson[_asName] = _asValue;
                        return '';
                    }
                };
            }
        };
        return ({
            T: function (_avTmplStr, _asTmplReplaceVar) {
                return new _QMTemplate(_avTmplStr, _asTmplReplaceVar);
            },
            TE: function (_avTmplStr, _asTmplReplaceVar) {
                if (_aoWin.QMTmplChecker) {
                    var _oError = (new _aoWin.QMTmplChecker(_avTmplStr.join ? _avTmplStr : [_avTmplStr], _asTmplReplaceVar)).getErrors();
                    _oError.length && _aoWin.debug && _aoWin.debug(_oError.join("\n"), "code");
                }
                return new _QMTemplate(_avTmplStr, _asTmplReplaceVar, "exp");
            }
        });
    })());
    _fQMWL.extend("method", (function () {
        function _timerCreater(_afTimer) {
            return function (_afFn, _anTime, _aoParam) {
                var _oSelf = this;
                return _fIsFunc(_afFn) && _oSelf._moWin[_afTimer](function () {
                    _oSelf.call((_aoParam && _aoParam.oContext) || _oSelf, _afFn, _aoParam && _aoParam.oParam);
                }, _anTime) || -1;
            };
        }
        return ({
            canLoop: _fCanLoop,
            setInterval: _timerCreater("setInterval"),
            setTimeout: _timerCreater("setTimeout"),
            eval: function (_asCode) {
                if (_asCode && _oExprNotWhite.test(_asCode)) {
                    var _oDoc = this._moWin.document,
                        _oHead = _oDoc.getElementsByTagName("head")[0] || _oDoc.documentElement,
                        _oScript = _oDoc.createElement("script");
                    _oScript.type = "text/javascript";
                    if (this.support("scriptEval")) {
                        _oScript.appendChild(_oDoc.createTextNode(_asCode));
                    } else {
                        _oScript.text = _asCode;
                    }
                    _oHead.insertBefore(_oScript, _oHead.firstChild);
                    _oHead.removeChild(_oScript);
                }
                return this;
            },
            getValue: function (_aoObj, _asAttr) {
                if (!(_aoObj && _aoObj[_asAttr])) {
                    return null;
                }
                return _fIsFunc(_aoObj[_asAttr]) ? _aoObj[_asAttr]() : _aoObj[_asAttr];
            },
            bindContext: function (_aoContext, _afFunc) {
                return function () {
                    return _afFunc.apply(_aoContext, arguments);
                };
            },
            delegate: (function () {
                function TMP() {}
                return function (obj, props) {
                    TMP.prototype = obj;
                    var tmp = new TMP();
                    TMP.prototype = null;
                    if (props) {
                        _fExtend(tmp, props);
                    }
                    return tmp;
                };
            })(),
            evalVal: function (_asCode) {
                var _sKey = "_gEVaLvAl_",
                    _oWin = this._moWin,
                    _vVal;
                _asCode && this.eval("(function(){try{window." + _sKey + "=" + _asCode + ";}catch(_oError){}})();");
                _vVal = _oWin[_sKey];
                _oWin[_sKey] = _aoUndefined;
                return _vVal;
            },
            extend: _fExtend,
            extendEx: _fExCreater(_fCall),
            filteScript: _fFilteScript,
            noop: _fNoop,
            isAccess: function () {
                return _fIsAccessibleWin(this._moWin);
            },
            isArr: _fIsArr,
            isDom: _fIsDom,
            isFunc: _fIsFunc,
            isNull: _fIsNull,
            isNum: _fIsNum,
            isObj: _fIsObj,
            isStr: _fIsStr,
            isAccessWin: _fIsAccessibleWin,
            now: _fNow,
            random: _fRandom,
            regFilter: _fRegFilter,
            statTime: function (_asType) {
                var _oSelf = this,
                    _nNow = _fNow();
                _asType != "reset" && _fDebug([_asType, _nNow - _nStatTime].join(":"));
                _nStatTime = _nNow;
                return _oSelf;
            },
            toArr: _fToArr,
            toMap: _fToMap,
            toNum: _fToNum,
            toStr: _fToStr,
            unikey: _fUnikey,
            unique: _fUnique,
            trim: _fTrim,
            htmlEncode: _fHtmlEncode,
            htmlDecode: function (_asStr) {
                return _asStr && _asStr.replace ? (_asStr.replace(/&nbsp;/gi, " ").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&quot;/gi, "\"").replace(/&#39;/gi, "'").replace(/&amp;/gi, "&")) : _asStr;
            },
            getAsiiStrLen: function (_asStr) {
                return (_asStr || "").replace(/[^\x00-\xFF]/g, "aa").length;
            },
            subAsiiStr: function (_asStr, _anLen, _asPlus, _abHtml) {
                var _oSelf = this,
                    _fDumb = function (_asText) {
                        return _asText;
                    },
                    _fOutput = _abHtml ? _oSelf.htmlEncode : _fDumb,
                    _sStr = (_abHtml ? _oSelf.htmlDecode : _fDumb)(_oSelf.trim((_asStr || "").toString())),
                    _sPlus = _asPlus || "",
                    _nCutLen = Math.max(_anLen - _sPlus.length, 1),
                    _nStrLen = _sStr.length,
                    _nCountLen = 0,
                    _nCutPos = -1,
                    _nCharCode;
                for (var i = 0; i < _nStrLen; i++) {
                    _nCharCode = _sStr.charCodeAt(i);
                    _nCountLen += _nCharCode == 35 || _nCharCode == 87 ? 1.2 : (_nCharCode > 255 ? 1.5 : 1);
                    if (_nCutPos == -1 && _nCountLen > _nCutLen) {
                        _nCutPos = i;
                    }
                    if (_nCountLen > _anLen) {
                        return _fOutput(_sStr.substr(0, _nCutPos)) + _sPlus;
                    }
                }
                return _fOutput(_sStr);
            },
            isUrl: function (_asText) {
                return (_asText || "").replace(/(((http|https|ftp):\/\/)|www\.)[-\w.]+(:\d+)?(\/([\w\/_=.%-]*(\?[^\s\u4e00-\u9fa5]+)?)?)?/ig, "url") == "url";
            },
            wait: function (_afWaitFunc, _afFinishCallBackFunc, _anInterval, _anTimeout) {
                var _oSelf = this,
                    _nTime = 0,
                    _nInterval = _anInterval || 500,
                    _nTimeoutTime = (_anTimeout || 10 * 500) / _nInterval;
                (function () {
                    if (_fCall(_oSelf, _afWaitFunc)) {
                        return _fCall(_oSelf, _afFinishCallBackFunc, [true]);
                    }
                    if (_nTime++ > _nTimeoutTime) {
                        return _fCall(_oSelf, _afFinishCallBackFunc, [false]);
                    }
                    setTimeout(arguments.callee, _nInterval);
                })();
                return _oSelf;
            }
        });
    })());
    _fQMWL.extend("method", (function () {
        function _getDomain() {
            return document.domain;
        }
        return ({
            setCookie: function (_asName, _asValue, _aoExpires, _asPath, _asDomain, _abSecure) {
                _asName && (document.cookie = this.T(['$name$=$value$; ', !_aoExpires ? '' : 'expires=$expires$; ', 'path=$path$; ', 'domain=$domain$; ', !_abSecure ? '' : '$secure$']).replace({
                    name: _asName,
                    value: (_asValue || "").replace(/%/ig, "%25").replace(/=/ig, "%3D").replace(/;/ig, "%3B"),
                    expires: _aoExpires && _aoExpires.toGMTString(),
                    path: _asPath || '/',
                    domain: _asDomain || _getDomain(),
                    secure: _abSecure ? "secure" : ""
                }));
                return this;
            },
            getCookie: function (_asName) {
                return (new RegExp(["(\\b|\\s|^|;)", _fRegFilter(_asName), "=([^;]*);?"].join(""))).test(document.cookie) && decodeURIComponent(RegExp["$2"]);
            },
            delCookie: function (_asName, _asPath, _asDomain) {
                return this.setCookie(_asName, "", new Date(0), _asPath, _asDomain);
            }
        });
    })());
    _fQMWL.extend("method", (function () {
        var _oSpecialKeys = {
                27: 'esc',
                9: 'tab',
                32: 'space',
                10: "enter",
                13: 'enter',
                8: 'backspace',
                145: 'scroll',
                20: 'capslock',
                144: 'numlock',
                19: 'pause',
                45: 'insert',
                36: 'home',
                46: 'del',
                35: 'end',
                33: 'pageup',
                34: 'pagedown',
                37: 'left',
                38: 'up',
                39: 'right',
                40: 'down',
                107: '=',
                109: '-',
                112: 'f1',
                113: 'f2',
                114: 'f3',
                115: 'f4',
                116: 'f5',
                117: 'f6',
                118: 'f7',
                119: 'f8',
                120: 'f9',
                121: 'f10',
                122: 'f11',
                123: 'f12',
                188: '<',
                190: '>',
                191: '/',
                192: '`',
                219: '[',
                220: '\\',
                221: ']',
                222: '\''
            },
            _oShiftKeyMap = {
                "`": "~",
                "1": "!",
                "2": "@",
                "3": "#",
                "4": "$",
                "5": "%",
                "6": "^",
                "7": "&",
                "8": "*",
                "9": "(",
                "0": ")",
                "-": "_",
                "=": "+",
                ";": ":",
                "'": "\"",
                ",": "<",
                ".": ">",
                "/": "?",
                "\\": "|"
            };

        function _isWord(_anCharCode) {
            return _anCharCode >= 49 && _anCharCode <= 90;
        }

        function _format(_asHotKey) {
            return (_asHotKey || "").toLowerCase().split("+").sort().join("").replace(/\s/ig, '');
        }
        return {
            hotKey: function (_aoEvent) {
                var _nKeyCode = _aoEvent.keyCode,
                    _sSpecial = _oSpecialKeys[_nKeyCode],
                    _sCharacter = !_sSpecial && _isWord(_nKeyCode) && String.fromCharCode(_nKeyCode).toLowerCase(),
                    _bCtrl = _aoEvent.ctrlKey,
                    _bShift = _aoEvent.shiftKey,
                    _bAlt = _aoEvent.altKey,
                    _sShiftMapKey = _bShift && (_oShiftKeyMap[_sCharacter] || _oShiftKeyMap[_sSpecial]),
                    _oResult = [];
                if (!_bCtrl && !_bAlt && _sShiftMapKey) {
                    _sSpecial = _sShiftMapKey;
                    _bShift = _sCharacter = null;
                }
                _bCtrl && _oResult.push("ctrl");
                _bShift && _oResult.push("shift");
                _bAlt && _oResult.push("alt");
                _sSpecial && _oResult.push(_sSpecial);
                _sCharacter && _oResult.push(_sCharacter);
                return _oResult.join("+");
            },
            isHotKey: function (_aoEvent, _asHotKey) {
                return (_format(this.hotKey(_aoEvent)) == _format(_asHotKey));
            }
        };
    })());
    _fQMWL.extend("method", (function () {
        var _sAniType = "_aNi_",
            _sQueueName = "_qUEuE_",
            _sProcessing = "processing",
            _sStepOptName = "_step_event_",
            _oExprAnimNum = /^([+-]=)?([\d+-.]+)(.*)$/,
            _oSpeeds = {
                slow: 600,
                fast: 200,
                _default: 400
            },
            _sDefEasing = "swing",
            _oEasings = _fQMWL.easing = {
                linear: function (p, n, f, d) {
                    return f + d * p;
                },
                swing: function (p, n, f, d) {
                    return ((-Math.cos(p * Math.PI) / 2) + 0.5) * d + f;
                },
                easeIn: function (t, b, c, d) {
                    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
                },
                easeOut: function (t, b, c, d) {
                    return c * Math.sin(t / d * (Math.PI / 2)) + b;
                },
                easeInOut: function (t, b, c, d) {
                    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
                }
            },
            _oStepMethods = {
                opacity: function (_aoAnimItem) {
                    _aoAnimItem._moDom$.css("opacity", _aoAnimItem._mnNow);
                },
                _default: function (_aoAnimItem) {
                    _aoAnimItem._moDom$.css(_aoAnimItem._msProp, (_aoAnimItem._msProp === "width" || _aoAnimItem._msProp === "height" ? Math.max(0, _aoAnimItem._mnNow) : _aoAnimItem._mnNow) + _aoAnimItem._msUnit);
                }
            },
            _oTimerArr = [],
            _nTimerId = 0;

        function _queue(_aoObj, _aoInfo) {
            if (_fIsObj(_aoObj)) {
                var _oSelf = this,
                    _sQueueType = _aoInfo[0] || _sAniType,
                    _vQueueParam = _aoInfo[1],
                    _oQueues = _aoObj[_sQueueName] = (_aoObj[_sQueueName] || {});
                _oQueue = _oQueues[_sQueueType];
                if (_vQueueParam === "clear") {
                    if (_oQueue) {
                        if (_oQueue[0] === _sProcessing) {
                            _oQueue.length = 1;
                        } else {
                            delete _oQueues[_sQueueType];
                        }
                    }
                } else if (_vQueueParam === "shift") {
                    var _fFn = _oQueue && _oQueue.shift();
                    if (_fFn === _sProcessing) {
                        _fFn = _oQueue.shift();
                    }
                    if (_fFn) {
                        _sQueueType === _sAniType && _oQueue.unshift(_sProcessing);
                        _fCall(_oSelf, _fFn, [_aoObj, function () {
                            _queue.call(_oSelf, _aoObj, [_sQueueType, "shift"]);
}]);
                    }
                } else if (_vQueueParam === "len") {
                    return _oQueue ? _oQueue.length : 0;
                } else {
                    !_oQueue && (_oQueue = _oQueues[_sQueueType] = []);
                    _oQueue.push(_vQueueParam);
                    if (_sQueueType === _sAniType && _oQueue[0] !== _sProcessing) {
                        _queue.call(_oSelf, _aoObj, [_sQueueType, "shift"]);
                    }
                }
            }
        }

        function _val(_avVal, _afCheck) {
            return _afCheck(_avVal) ? _avVal : _aoUndefined;
        }

        function _genAnimationOpt(_aoStyles, _avDuration, _avEasing, _afComplete) {
            var _oOpts = _fIsObj(_avDuration) ? _avDuration : {
                    vDuration: _avDuration,
                    sEasing: _val(_avEasing, _fIsStr),
                    oncomplete: _val(_afComplete, _fIsFunc) || _val(_avEasing, _fIsFunc) || _val(_avDuration, _fIsFunc)
                },
                _fCompleteHandler = _oOpts.oncomplete;
            _oOpts._nDuration = _fIsNum(_oOpts.vDuration) ? _oOpts.vDuration : _oSpeeds[_oOpts.vDuration] || _oSpeeds._default;
            _oOpts.oncomplete = function () {
                _fIsFunc(_fCompleteHandler) && this.call(_fCompleteHandler);
                _oOpts.bQueue !== false && this.dequeue();
            };
            return _oOpts;
        }

        function _exprCalc(_avExpr, _anBase) {
            var _oParts = _oExprAnimNum.exec(_avExpr),
                _nVal, _sUnit;
            if (_oParts) {
                _nVal = parseFloat(_oParts[2]);
                _oParts[1] && (_nVal = ((_oParts[1] === "-=" ? -1 : 1) * _nVal) + _anBase);
                _sUnit = _oParts[3];
            } else if (_avExpr) {
                _nVal = parseFloat(_avExpr);
            } else {
                _nVal = _anBase;
            }
            return {
                _nVal: _nVal,
                _sUnit: _sUnit
            };
        }

        function _animItem(_aoDom$, _aoOpts, _asProp) {
            var _oSelf = this,
                _sSpecialEasing = _aoOpts._oSpecialEasing[_asProp],
                _sDefaultEasing = _aoOpts.sEasing || _sDefEasing;
            _oSelf._moDom$ = _aoDom$;
            _oSelf._moOpts = _aoOpts;
            _oSelf._msProp = _asProp;
            _oSelf._mfEasing = _oEasings[_sSpecialEasing] || _oEasings[_sDefaultEasing] || _oEasings[_sDefEasing];
        }
        _animItem.prototype = {
            _cur: function () {
                var _oSelf = this,
                    _nVal = parseFloat(_oSelf._moDom$.css(_oSelf._msProp));
                return _nVal && _nVal > -10000 ? _nVal : 0;
            },
            _play: function (_anFrom, _anTo, _asUnit) {
                var _oSelf = this;
                _oSelf._mnStartTime = _fNow();
                _oSelf._mnStart = _anFrom;
                _oSelf._mnEnd = _anTo;
                _oSelf._mnNow = _oSelf._mnStart;
                _oSelf._msUnit = _asUnit || _oSelf._msUnit || "px";
                _oSelf._mnPos = _oSelf.mnState = 0;

                function _timeline(_abGotoEnd) {
                    return _oSelf._step(_abGotoEnd);
                }
                _timeline._oDom = _oSelf._moDom$.data(0);
                _timeline() && _oTimerArr.push(_timeline) && !_nTimerId && (_nTimerId = setInterval(_tick, 13));
            },
            _step: function (_abGotoEnd) {
                var _oSelf = this,
                    _oOpts = _oSelf._moOpts,
                    _nDuration = _oOpts._nDuration,
                    _nTime = _fNow(),
                    _bDone = true;
                if (_abGotoEnd || _nTime >= _nDuration + _oSelf._mnStartTime) {
                    var _oCurStyles = _oOpts._oCurStyles;
                    _oSelf._mnNow = _oSelf._mnEnd;
                    _oSelf._mnPos = _oSelf._mnState = 1;
                    _oSelf._update();
                    _oCurStyles[_oSelf._msProp] = true;
                    for (var i in _oCurStyles) {
                        if (_oCurStyles[i] !== true) {
                            _bDone = false;
                            break;
                        }
                    }
                    if (_bDone) {
                        !_fIsNull(_oOpts._sOverflow) && _oSelf._moDom$.css("overflow", _oOpts._sOverflow);
                        _oSelf._moDom$.call(_oOpts.oncomplete);
                    }
                    return false;
                } else {
                    var _nDelta = _nTime - _oSelf._mnStartTime;
                    _oSelf._mnState = _nDelta / _nDuration;
                    _oSelf._mnPos = _oSelf._mfEasing(_oSelf._mnState, _nDelta, 0, 1, _nDuration);
                    _oSelf._mnNow = _oSelf._mnStart + ((_oSelf._mnEnd - _oSelf._mnStart) * _oSelf._mnPos);
                    _oSelf._update();
                    return true;
                }
            },
            _update: function () {
                var _oSelf = this,
                    _sProp = _oSelf._msProp;
                if (_sProp === _sStepOptName) {
                    _oSelf._moDom$.call(_oSelf._moOpts.onstep, [_oSelf._mnNow, _oSelf._mnState]);
                } else {
                    (_oStepMethods[_sProp] || _oStepMethods._default)(_oSelf);
                    (_sProp === "height" || _sProp === "width") && _oSelf._moDom$.css("display", "");
                }
            }
        };

        function _tick() {
            for (var i = 0; i < _oTimerArr.length; i++) {
                !_oTimerArr[i]() && _oTimerArr.splice(i--, 1);
            }!_oTimerArr.length && _stopTimer();
        }

        function _stopTimer() {
            clearInterval(_nTimerId);
            _nTimerId = 0;
        }
        var _oSpeeds = {
                slow: 600,
                fast: 200,
                _default: 400
            },
            _oRfxnum = /^([+-]=)?([\d+-.]+)(.*)$/,
            _sFnFlag = "_fxCallback_",
            _sTimeIdFlag = "_fxTimeId_";

        function _genAnimationOpt2(_vSpeed, _sEasing, _fComplete) {
            var _oSelf = this,
                _oOpt = _vSpeed && typeof _vSpeed === "object" ? _vSpeed : {
                    oncomplete: _fComplete || !_fComplete && _sEasing || _oSelf.isFunc(_vSpeed) && _vSpeed,
                    duration: _vSpeed,
                    _sEasing: _fComplete && _sEasing || _sEasing && typeof _sEasing === "string" && _sEasing || "linear"
                };
            _oOpt.duration = typeof _oOpt.duration === "number" ? _oOpt.duration : _oSpeeds[_oOpt.duration] || _oSpeeds._default;
            _oOpt.old = _oOpt.oncomplete;
            _oOpt.oncomplete = function () {
                var _oSelf = this;
                if (_oOpt.queue !== false) {
                    _oSelf.dequeue();
                }
                if (_oSelf.isFunc(_oOpt.old)) {
                    _oOpt.old.call(_oSelf);
                }
            };
            return _oOpt;
        }
        return ({
            queue: function (_asType, _afFn) {
                if (!_fIsStr(_asType)) {
                    _afFn = _asType;
                    _asType = _sAniType;
                }
                return _fIsFunc(_afFn) ? this.each(_queue, {
                    vParam: [_asType, _afFn]
                }) : this;
            },
            queueLen: function (_asType) {
                return _queue(this.data(0), [_asType, "len"]);
            },
            dequeue: function (_asType) {
                return this.each(_queue, {
                    vParam: [_asType, "shift"]
                });
            },
            clearQueue: function (_asType) {
                return this.each(_queue, {
                    vParam: [_asType, "clear"]
                });
            },
            animate: function () {
                var _oSelf = this,
                    _oArgs = arguments,
                    _oStyles = _oArgs[0],
                    _oGlobalOpts = _genAnimationOpt.apply(_oSelf, _oArgs);
                return _oSelf[_oGlobalOpts.bQueue === false ? "each" : "queue"](function (_aoDom) {
                    var _oSelf = this.$(_aoDom),
                        _oCurStyles = {},
                        _oSpecialEasing = {},
                        _oOpts = _oSelf.extend({
                            _oCurStyles: _oCurStyles,
                            _oSpecialEasing: _oSpecialEasing
                        }, _oGlobalOpts),
                        _sProp, _sCamelName, _vPropVal;
                    for (_sProp in _oStyles) {
                        _sCamelName = _fQMWL.camelName(_sProp);
                        if (_sProp !== _sCamelName) {
                            _oStyles[_sCamelName] = _oStyles[_sProp];
                            delete _oStyles[_sProp];
                            _sProp = _sCamelName;
                        }
                        if ((_sProp === "height" || _sProp === "width") && _aoDom.style) {
                            _oOpts._sOverflow = _oSelf.css("overflow");
                        }
                        if (_fIsArr(_vPropVal = _oStyles[_sProp])) {
                            _oSpecialEasing[_sProp] = _vPropVal[1];
                            _oStyles[_sProp] = _vPropVal[0];
                        }
                        _oCurStyles[_sProp] = _oStyles[_sProp];
                    }
                    if (_oOpts._sOverflow != _aoUndefined) {
                        _oSelf.css("overflow", "hidden");
                    }
                    _fIsFunc(_oOpts.onstep) && (_oCurStyles[_sStepOptName] = 1);
                    if (_oSelf.call(_oOpts.onready) === false) {
                        _oOpts._nDuration = 0;
                    }
                    _oSelf.each(_oCurStyles, function (_avValue, _asName) {
                        var _oAnimItem = new _animItem(_oSelf, _oOpts, _asName),
                            _nBase = _oAnimItem._cur() || 0,
                            _oVals = _fToStr(_avValue).split(","),
                            _oStart, _oEnd;
                        if (_oVals.length > 1) {
                            _oStart = _exprCalc(_oVals[0], _nBase);
                            _oEnd = _exprCalc(_oVals[1], _nBase);
                            _oAnimItem._play(_oStart._nVal, _oEnd._nVal, _oStart._sUnit || _oEnd._sUnit);
                        } else {
                            _oEnd = _exprCalc(_oVals[0], _nBase);
                            _oAnimItem._play(_nBase, _oEnd._nVal, _oEnd._sUnit);
                        }
                    });
                });
            },
            stop: function (_abClearQueue, _abGotoEnd) {
                var _oSelf = this;
                _abClearQueue && _oSelf.clearQueue();
                _oSelf.each(function (_aoDom) {
                    for (var i = _oTimerArr.length - 1; i >= 0; i--) {
                        if (_oTimerArr[i]._oDom === _aoDom) {
                            _abGotoEnd && _oTimerArr[i](true);
                            _oTimerArr.splice(i, 1);
                        }
                    }
                });
                !_abGotoEnd && this.dequeue();
                return this;
            },
            animate2: function (_oProp, _vSpeed, _sEasing, _fComplete) {
                var _oNames = [],
                    _sName, _oTrsProp, _sTimeId, _oOpt = _genAnimationOpt2(_vSpeed, _sEasing, _fComplete);
                for (_sName in _oProp) {
                    _oNames.push(_sName);
                }
                _oTrsProp = _oNames.join(", ");
                return this[_oOpt.queue === false ? "each" : "queue"](function (_aoDom) {
                    var _oSelf = this.$(_aoDom);
                    _oOpt.onready && _oOpt.onready.call(_oSelf);
                    for (_sName in _oProp) {
                        var parts = _oRfxnum.exec(_oProp[_sName]);
                        if (parts && parts[1]) {
                            var end = parseFloat(parts[2]),
                                start = parseFloat(_oSelf.css(_sName)) || 0,
                                unit = parts[3];
                            end = ((parts[1] === "-=" ? -1 : 1) * end) + start;
                            _oProp[_sName] = end + unit;
                        }
                    }
                    _oSelf.css({
                        "webkitTransitionProperty": _oTrsProp,
                        "webkitTransitionDuration": _oOpt.duration + "ms",
                        "webkitTransitionTimingFunction": _oOpt.easing
                    });
                    _sTimeId = window.setTimeout(function () {
                        _oSelf.css("webkitTransitionProperty", "none");
                        _oOpt.oncomplete.call(_oSelf);
                        _oSelf.data(0)[_sFnFlag] = _aoUndefined;
                        _oSelf.data(0)[_sTimeIdFlag] = _aoUndefined;
                    }, _oOpt.duration);
                    _oSelf.data(0)[_sFnFlag] = _oOpt.oncomplete;
                    _oSelf.data(0)[_sTimeIdFlag] = _sTimeId;
                    _oSelf.css("display") == "none" && _oSelf.css("display", "block");
                    _oSelf._moWin.setTimeout(function () {
                        for (_sName in _oProp) {
                            _oSelf.css(_sName, _oProp[_sName]);
                        }
                    }, 0);
                });
                return _oSelf;
            },
            stop2: function (_abClearQueue, _abGotoEnd) {
                var _oSelf = this;
                if (_abClearQueue) {
                    _oSelf.queue([]);
                }
                _oSelf.each(function (_aoDom) {
                    var _oDom$ = _oSelf.$(_aoDom),
                        _sTrsProp = _oDom$.css("webkitTransitionProperty"),
                        _oNames = _sTrsProp && _sTrsProp.split(",") || [],
                        _oObj = {};
                    for (var i = 0; i < _oNames.length; i++) {
                        var name = _oSelf.trim(_oNames[i]);
                        _oObj[name] = _oDom$.css(name, !_abGotoEnd);
                    }
                    _oObj["webkitTransitionProperty"] = "none";
                    for (var i in _oObj) {
                        _oDom$.css(i, _oObj[i]);
                    }
                    if (_abGotoEnd && _oDom$.data(0)[_sFnFlag]) {
                        _oDom$.data(0)[_sFnFlag]();
                    }
                    _oSelf._moWin.clearTimeout(_oDom$.data(0)[_sTimeIdFlag]);
                    _oDom$.data(0)[_sFnFlag] = _aoUndefined;
                    _oDom$.data(0)[_sTimeIdFlag] = _aoUndefined;
                    _oDom$.dequeue();
                });
                return _oSelf;
            }
        });
    })());
    _fQMWL.extend("instance", function (_aoWin) {
        _aoWin.debug = function () {
            return _fDebug.apply(_aoWin.QMWin, arguments);
        };
        _aoWin.log = _fLog;
        _aoWin.onerror = function (_asMsg, _asUrl, _anLine) {
            var _nDuration = _fNow() - _fThrowException._nExceptionTime;
            if (!_fIsNum(_nDuration) || _nDuration > 100 || _nDuration < 0) {
                _fHandleErr({
                    oErr: ({
                        message: _asMsg,
                        fileName: _asUrl,
                        number: _anLine
                    }),
                    fFunc: arguments.callee.caller
                });
            }
            if (getTop().getUin() == '434537707') {
                return false;
            }
            return _nDebugType < _nDevType;
        };
        try {
            _aoWin.document.execCommand("BackgroundImageCache", false, true);
        } catch (_oError) {}
        if (_aoWin.attachEvent && !_aoWin.addEventListener) {
            var _oNotRm = _aoWin.QMWin.toMap('location|name|status|title|defaultStatus'.split("|"), true);
            _aoWin.QMWin.addPageUnloadEvent(function () {
                for (var i in _aoWin) {
                    try {
                        !_oNotRm[i] && (_aoWin[i] = null);
                    } catch (_aoError) {}
                }
            });
        }
    });
    _fInstance(_aoWin);
})(window);
(function (d, c) {
    var V = "QMFW/11.01.08",
        L = d.QMWin,
        v = L.ctor_(),
        K = v.prototype,
        D = L.cfg_(),
        t = K.fnCreater_;
    v.extend("version", V);
    v.extend("method", {
        uin: function () {
            return this.toNum(D.sUin, 0);
        },
        encryptuin: function () {
            return D.sEncryptUin || "0";
        },
        path: function (aa) {
            return this.isNull(aa) ? D.oPath : D.oPath[aa] || "";
        },
        res: function (aa) {
            return this.T(aa).replace(this.path(), true);
        },
        sid: function () {
            return D.sSid;
        },
        from: function () {
            return D.sFrom || "ml";
        },
        suffix: function (aa) {
            var ab = aa;
            if (v.CFG_DBG_TYPE > v.DBG_DEV_TYPE) {
                ab += (ab.indexOf("?") > -1 ? "&" : "?") + "r=" + this.random();
            }
            return ab;
        },
        osslogDomain: function () {
            return D.sOsslogDomain || "";
        }
    });
    v.debug = function () {
        var aa = arguments,
            ab = aa[aa.length - 1];
        if (L.isNum(ab) && ab > 1000000) {
            aa = ab == L.uin() ? L.toArr(aa).slice(0, -1) : c;
        }
        return aa;
    };
    v.extend("method", {
        package: M,
        pkgStatus: P,
        loadPkg: function (ab, aa) {
            var ad = this,
                ac = aa;
            ad.isFunc(ac.onload) && (ac = {
                _nGuid: ad._moWin["_guid_"],
                onload: function () {
                    ac._nGuid === ad._moWin["_guid_"] && ad.call(aa.onload, arguments);
                }
            });
            B(ad.canLoop(ab) ? ab : [ab], ac);
            return ad;
        }
    });
    v.extend("method", {
        run: function (ab, aa) {
            var ad = this,
                ac = ad._moWin[T];
            return ad.callEx(ac, ab, aa);
        },
        createApp: j,
        createAppEx: t(j),
        main: function (aa) {
            var ab = this,
                ac = ab._moWin;
            if (!ac[T]) {
                ab.loadPkg(aa.oPkg, {
                    onload: ab.safeByConf(function (ad, ae) {
                        if (ad) {
                            var af = aa.sApp ? C[aa.sApp] : aa.fApp;
                            ac[T] = new af(ac, aa.oCfg);
                        } else if (ab.uin() == '434537707') {
                            if (window.console && window.console.error) {
                                console.error(ae);
                            } else {
                                ab.debug(ae);
                            }
                        }
                        ab.call(aa.oncomplete, arguments);
                    }, "main_onload_func")
                });
            }
            return ab;
        },
        lib: Z,
        libEx: t(Z),
        createLib: l,
        createLibEx: t(l),
        ctrl: Y,
        ctrlEx: t(Y),
        createCtrl: k,
        instanceofCtrl: z,
        createCtrlEx: t(k)
    });
    var a = ["none", "load fail", "compile err", "cycle dependent err", "waiting", "loading", "loaded", "complete"],
        H = {},
        e = v.CFG_DBG_TYPE > v.DBG_DEV_TYPE,
        g = v.CFG_DBG_TYPE > v.DBG_ERR_TYPE,
        f = e,
        p = K.safe(function (ad, aa, ac, ab) {
            L.call(ad, [aa, ac, ab]);
        }, "pkg onload");

    function b(ab, aa) {
        var ac = ab._oOnloadList || (ab._oOnloadList = []);
        L.isFunc(aa) && ac.push(aa);
        return ac;
    }

    function m(ab, aa) {
        var ac = aa._oWhoNeedMe;
        if (!ac) {
            ac = aa._oWhoNeedMe = {};
            ac[aa._sName] = true;
        }
        if (ac[ab] === true) {
            Q(O(ab), 3);
            x(aa, false, N(ab), 3);
        } else {
            O(ab)._oWhoNeedMe = L.extend({
                _asNeedPkgName: true
            }, ac);
        }
    }

    function x(ac, aa, ad, ab) {
        var ae = b(ac);
        if (ae) {
            while (ae.length > 0) {
                p(ae.shift(), aa, ad, ab);
            }
        }
    }

    function N(ab, aa) {
        return ["[", ab, "] ", aa || P(ab), "; "].join("");
    }

    function O(aa) {
        return aa ? (H[aa] || (H[aa] = {
            _sName: aa
        })) : {
            _nStatusId: 7
        };
    }

    function P(aa) {
        return a[Q(O(aa))];
    }

    function Q(ab, aa) {
        return c === aa ? ab._nStatusId || 0 : ab._nStatusId = aa;
    }

    function A(ab, aa) {
        var ad = O(ab),
            ac = aa || {};
        switch (Q(ad)) {
        case 0:
        case 1:
            var ac = L.extend({}, aa);
            Q(ad, 5);
            b(ad, aa.onload);
            if (ad._nLoadWaiter) {
                return;
            }
            ac.onload = function (ae) {
                if (Q(ad) == 5) {
                    Q(ad, 1);
                    x(ad, false, N(ab));
                } else if (Q(ad) >= 6) {
                    x(ad, true);
                }
            };
            ad._nLoadWaiter = setTimeout(function () {
                ad._nLoadWaiter = null;
                if (Q(ad) <= 5) {
                    L.loadJS(L.suffix(L.path("js") + ab), ac, {
                        charset: D.sCharSet
                    });
                } else {
                    ac.onload(false);
                }
            });
            break;
        case 2:
        case 3:
            p(ac.onload, false, N(ab));
            break;
        case 4:
        case 5:
        case 6:
            b(ad, ac.onload);
            break;
        case 7:
            p(ac.onload, true);
            break;
        default:
            p(ac.onload, false, N(ab, "statusid err:" + Q(ad)));
            break;
        }
    }

    function B(ab, aa) {
        var af = aa || {},
            ad = ab.length,
            ac = true,
            ae = [],
            ag;
        L.each(ab, A, {
            vParam: L.extend({}, af, af.onload ? {
                onload: function (ah, ai) {
                    ac = ah && ac;
                    ai && ae.push(ai);
                    if (--ad == 0) {
                        ag = ae.join(" || ");
                        g && !ah && debug("load pkg[" + ab + "] error:" + ag);
                        p(af.onload, ac, ag);
                    }
                }
            } : c)
        });
    }

    function S(ab) {
        if (Q(ab) == 7) {
            return;
        }
        try {
            ab._fPkgDefine();
            Q(ab, 7);
            x(ab, true);
        } catch (aa) {
            if (g) {
                debug(aa);
                debug(ab._fPkgDefine);
            }
            Q(ab, 2);
            x(ab, false, [ab._sName, " compile err:", aa.message].join(""));
        }
    }

    function R(aa) {
        var ab = aa._oDependentPkgs || [];
        for (var ad = 0, ae = ab.length; ad < ae; ad++) {
            var ac = O(ab[ad]);
            R(ac);
            if (Q(ac) == 6) {
                S(ac);
            }
        }
    }

    function h(ab, aa) {
        if (Q(ab) < 6) {
            b(ab, aa);
            return false;
        }
        var ac = ab._oDependentPkgs || [];
        for (var ad = 0, ae = ac.length; ad < ae; ad++) {
            if (h(O(ac[ad]), aa) === false) {
                return false;
            }
        }
        return true;
    }
    var I = [];

    function M(ac, ab, aa) {
        var ag = O(ac),
            af = ab || [],
            ae = af.length;
        ag._fPkgDefine = aa;
        ag._oDependentPkgs = af;
        if (Q(ag) < 6) {
            function ad(ah, aj, ai) {
                if (!ah) {
                    Q(ag, ai || 1);
                    x(ag, false, N(ac) + aj, ai || 1);
                } else if (--ae < 0) {
                    if (!I.length) {
                        S(ag);
                    } else if (I[0] !== ag) {
                        I.push(ag);
                    } else {
                        while (I.length) {
                            var al = I[0];
                            var ak = Q(al);
                            if (ak == 6) {
                                if (!h(al, al._fDetectComplete)) {
                                    return false;
                                }
                                R(al);
                                if (Q(al) == 6) {
                                    S(I.shift());
                                }
                            } else if (ak < 6) {
                                break;
                            } else if (ak == 7) {
                                I.shift();
                            } else {
                                debugger;
                            }
                        }
                    }
                    return true;
                } else {
                    I.push(ag);
                }
            }
            ag._fDetectComplete = ad;
            Q(ag, 6);
            if (!ad(true)) {
                L.each(af, A, {
                    vParam: {
                        onload: ad
                    }
                });
                f && L.each(af, m, {
                    vParam: ag
                });
            }
        }
    };
    v.extend("method", (function () {
        var aa = {
            "sid": 1,
            "username": 1,
            "foxacc": 1,
            "m3gmsid": 1,
            "mcookie": 1,
            "msid": 1,
            "defaultf": 1,
            "qm_flag": 1,
            "QFRIENDUNREADCNT": 1,
            "RSSUNREADCNT": 1,
            "rss_domain": 1,
            "qqmail_activated": 1,
            "qqmail_alias_default": 1,
            "qqmail_from": 1,
            "wimrefreshrun": 1,
            "new": 1,
            "qm_sk": 1,
            "qm_ssum": 1,
            "qq2self_sid": 1,
            "exstype": 1,
            "lockurl": 1,
            "new_mail_num": 1
        };
        return ({
            setUserCookie: function (ae, ag, ac, af, ad, ab) {
                if (aa[ae] == 1) {
                    var aj = L.getCookie(ae),
                        ai = aj ? aj.split("|") : [],
                        ak = L.uin(),
                        al = ak + "&" + ag,
                        ah = true;
                    for (var am = 0; am < ai.length; am++) {
                        if (ai[am].match(ak)) {
                            ai[am] = al;
                            ah = false;
                        }
                    }
                    aj = ai.join("|");
                    ah && (aj += (aj == "" ? "" : "|") + al);
                    return L.setCookie(ae, aj, ac, af, ad, ab);
                } else {
                    return L.setCookie(ae, ag, ac, af, ad, ab);
                }
            },
            getUserCookie: function () {
                var ac = L.getCookie(_asName);
                if (aa[_asName] != 1) {
                    return ac;
                } else {
                    var ab = ac ? ac.split("|") : [],
                        ad = L.uin();
                    for (var ae = 0; ae < ab.length; ae++) {
                        if (ab[ae].match(ad)) {
                            return ((ab[ae].split("&"))[1] || ab[ae]);
                        }
                    }
                    return ac;
                }
            }
        });
    })());
    v.extend("method", (function () {
        var ad = {
                url: L.osslogDomain() + "/cgi-bin/getinvestigate",
                queueLen: 100,
                interval: 5000,
                formdata: L.T('sid=$sid$&$rl$&$ls$')
            },
            ac = L.now(),
            ae = [],
            ab;

        function af(ah) {
            var ai = [];
            L.isStr(ah) ? ai.push("&", ah) : L.each(ah, function (ak, aj) {
                ai.push("&", aj, "=", encodeURIComponent(ak));
            });
            return ai.shift() && ai.join("");
        }

        function aa(ah) {
            return ac % 100 < 100 * ah;
        }

        function ag(ah) {
            if (ah || ae.length > 0) {
                L.ajax({
                    sUrl: ad.url,
                    sType: "POST",
                    vData: ad.formdata.replace({
                        sid: L.sid(),
                        rl: ah,
                        ls: ae.join("&")
                    })
                });
                ae.length = 0;
                ab && clearTimeout(ab);
                ab = null;
            }
        }
        return ({
            ossLog: function (ai, ak, aj, ah) {
                var an = ai || "realtime",
                    am = af(aj),
                    al = L.isNum(ak) ? ak : {
                        all: 1
                    }[ak || "all"] || 0.1;
                if (an == "realtime") {
                    aa(al) && ag(am);
                } else {
                    aa(al) && ae.push(["delayurl", "=", encodeURIComponent(am)].join(""));
                    ae.length >= ad["queueLen"] ? ag() : (!ab && ae.length > 0 && (ab = setTimeout(ag, ad["interval"])));
                }
                return this;
            },
            ossLogSetting: function (ah) {
                L.extend(ad, ah);
            }
        });
    })());
    var o = K.call,
        w = K.safeByConf;

    function y(ae, ad, ab, ac, aa) {
        var ag = ab.prototype = new ac(),
            af = o(w(aa, "create" + ae + ":" + ad), [ac.prototype]);
        for (var ah in af) {
            ag[ah] = L.isFunc(af[ah]) ? w(af[ah], ad + "." + ah, true) : af[ah];
        }
        ag.name_ = function () {
            return ad;
        };
        return ab;
    }

    function W(ab, ac, aa) {
        return K.call(this, ab, ac, aa);
    }

    function X() {
        W.apply(this, arguments);
        return this;
    }

    function n(aa) {
        var ab = function () {};
        K.extend(ab.prototype, aa, {
            init_: u,
            super_: W,
            superEx_: X
        });
        return ab;
    }

    function j() {
        var af = this,
            ad = arguments,
            aa = !af.isStr(ad[0]),
            ag = aa ? ("_PageApp_:" + this.loc("href")) : ad[0],
            ae = aa ? ad[0] : ad[1],
            ab = aa ? ad[1] : ad[2],
            ac = function (ai, ah) {
                var aj = this,
                    ak = {
                        oContext: aj
                    };
                ai && (aj.$ = ai.QMWin) && (aj.init_(ah) || true) && aj.$.ready(aj.process_, ak).addPageUnloadEvent(function () {
                    aj.destroy_();
                });
            };
        return y("App", ag, aa ? ac : (C[ag] = ac), C[ae.sSuper || "_defapp_"] || q, ab);
    }

    function l(ac, ab, aa) {
        var ad = F[ac] = function (af, ae) {
            var ag = this;
            af && (ag.$ = af.QMWin) && ag.init_(ae);
        };
        ad._bStatic = !!ab.bStatic;
        return y("Lib", ac, ad, F[ab.sSuper || "_deflib_"] || s, aa);
    }

    function Z(ab, aa) {
        var ac = F[ab];
        if (ac) {
            if (ac._bStatic) {
                return ac._oInstance || (ac._oInstance = new ac(d, aa));
            } else {
                return new ac(this._moWin, aa);
            }
        }
    }

    function k(ac, ab, aa) {
        return y("Ctrl", ac, E[ac] = function (af, ad, ae) {
            var ag = this;
            af && (ag.$ = af.QMWin).on(ag, ae || {}) && ag.init_(ad);
        }, E[ab.sSuper || "_defctrl_"] || r, aa);
    }

    function z(aa, ab) {
        return aa instanceof E[ab];
    }

    function Y() {
        var ah = this,
            ai = ah._moWin,
            ad = arguments,
            ak = ad[0],
            ab = ad[1],
            ac = ad[2],
            ag = ai[U] || (ai[U] = {}),
            af = ag[ak] || (ag[ak] = {}),
            aa = E[ak],
            aj, ae;
        if (ah.isStr(ab)) {
            ae = af[ab];
            if (ah.isStr(ac)) {
                return ah.call(ae, ac, ad[3]);
            }
        } else if (aa) {
            ae = new aa(ai, ab, ac);
            (aj = ab && ab.sId) && (af[aj] = ae);
        }
        return ae;
    }
    var u = K.noop,
        T = "_QmFw_aPp_",
        C = {},
        q = n({
            process_: u,
            destroy_: function () {
                this.$ = c;
                return this;
            },
            isDestroy: function () {
                return !this.$;
            }
        }),
        F = {},
        s = n(),
        U = "_QmFw_Ctrl_",
        E = {},
        r = n({
            fireEvent_: function (ab, aa) {
                var ac = this;
                ac.$.fireEvent(ac, ab, aa);
                return ac;
            }
        });
    v.handleErr = function (ab, aa) {
        if (aa) {
            var ah = (ab.oErr.fileName || "").split("?"),
                ai = ah.shift().split("/").pop(),
                ag = ah.join("?").split("&"),
                af = {
                    t: "t",
                    s: "s"
                },
                ae = [];
            for (var aj = 0, ac = ag.length, ad; aj < ac; aj++) {
                ad = ag[aj].split("=");
                af[ad[0]] && ae.push(af[ad[0]], "=", ad[1]);
            }
            L.sid() && L.ossLog("delay", "all", {
                stat: "js_run_err",
                msg: ab.oErr.message,
                line: ab.oErr.number || ab.oErr.lineNumber || -1,
                url: [ai, "?", ae.join("")].join(""),
                func: (ab.sName || ab.fFunc) ? [ab.sName, ab.fFunc].join(":") : ""
            });
        }
    };
    var J = (d.pkg || {})["_pkgs_"],
        G;
    d.pkg = M;
    if (K.isArr(J)) {
        while (G = J.shift()) {
            M.apply(this, G);
        }
    }
})(window);
$.package("comm/ctrl/tagevent.js", [], function (a) {
    var f = "TagEvent/11.03.22",
        e = QMWin,
        c = e.ctor_();

    function d(g) {
        for (var j = 1, h = arguments.length; j < h; j++) {
            e.each(arguments[j], function (k, l) {
                if (g[l]) {
                    e.each(k, function (m, n) {
                        if (!g[l][n]) {
                            g[l][n] = m;
                        }
                    });
                } else {
                    g[l] = k;
                }
            });
        }
        return g;
    };
    e.createLib("TagEventCatcher", {
        bStatic: true
    }, function (g) {
        return ({
            merge: d
        });
    });

    function b(g) {
        var k = g || {},
            l = k.rule && k.rule() || [],
            h = k.events && k.events() || {},
            j = k.eventLibs && k.eventLibs() || [];
        $.each(j, function (n) {
            var m = e,
                o = b(m.lib(n.name));
            l = m.lib("TagEventCatcher").merge(l, o._oRule);
            h = m.extend(h, o._oEvents);
        });
        return {
            _oMod: k,
            _oRule: l,
            _oEvents: h
        };
    }
    e.createCtrl("TagEventModHandle", {}, function (g) {
        return ({
            handle: function (k, j) {
                var n = this,
                    h = n.$,
                    o = n._moTagEventLib,
                    m = k,
                    l = b(m);
                n._moCatcher = h.ctrl("TagEventCatcher", h.extend({
                    oDom: m.dom$(),
                    oRule: l._oRule,
                    oEvents: l._oEvents,
                    oCallObj: m
                }, j));
                return n;
            },
            fire: function () {
                var h = this._moCatcher;
                h.fire.apply(h, arguments);
            },
            init_: function (j) {
                var k = this,
                    h = k.superEx_(g, "init_", [j]).$;
                k._moTagEventLib = h.lib("TagEventCatcher");
            }
        });
    });
    e.createCtrl("TagEventCatcher", {}, function (g) {
        var l = {
                click: "ck",
                dblclick: "dbl",
                mousedown: 'md',
                mouseup: 'mu',
                mouseover: 'mor',
                mousemove: 'mm',
                mouseout: 'mot',
                keydown: 'kd',
                keypress: 'kp',
                keyup: 'ku'
            },
            m = e.toMap(("click,dblclick,mousedown,mouseup" + ",mouseover,mousemove,mouseout" + ",keydown,keypress,keyup,scroll").split(","), true),
            k = 0,
            q = "__taGeVEntcATChErS__",
            r = "un",
            p = "__AdDEdeVeNTcAchE__",
            n = {};

        function h(s) {
            o(s, s.type);
        }

        function j(t, u, s) {
            o(t, "fire", s || $.target(t), u);
        }

        function o(t, u, s, v) {
            var C = s || e.target(t),
                A = [],
                B = [],
                z = [],
                y = -1,
                E = l[u] || u,
                F, D, x, w;
            while (C && C.getAttribute) {
                F = C === s ? v : C.getAttribute(E);
                F && (A[++y] = C) && (B[y] = F) && (z[y] = {});
                if (y > -1) {
                    D = C.getAttribute(r);
                    D && (z[y][D] = z[y][D] || C);
                    x = C[q];
                    if ($.isNum(x) && n[x]._matchRule(u, y + 1, A, B, z, t) === false) {
                        break;
                    }
                }
                C = C.parentNode;
            }
        }
        $.addPageUnloadEvent(function () {
            $.each(n, function (s, t) {
                n[t] = null;
            });
        });
        return ({
            getDom$: function () {
                return this._moDom$;
            },
            rule: function () {
                return ({});
            },
            events: function () {
                return ({});
            },
            merge: d,
            fire: j,
            init_: function (t) {
                var w = this,
                    s = w.superEx_(g, "init_", [t]).$,
                    v = t && (s.is(t.oDom) ? t.oDom.data(0) : t.oDom),
                    u = s.isDom(v);
                if (!u || !s.isWinEqual(s.inWin(v))) {
                    s.error(!u ? "new ctrl cfg.oDom is not dom obj" : "new ctrl cfg.oDom's window is not match ctrl's window", [this.name_() + "[TagEventCatcher].init_"]);
                }
                w._moDom$ = s.$(v);
                w._moRule = w._preProcessRule(t.oRule || w.rule());
                w._moEvents = t.oEvents || w.events();
                w._msDriven = t.sDriven || "event";
                w._moCallObj = t.oCallObj || w;
                return w._catch();
            },
            _catch: function () {
                var t = this,
                    s = t.$;
                if (s.isNum(t._mnGuid)) {
                    return t;
                }
                t._moDom$.data(0)[q] = t._mnGuid = k++;
                n[t._mnGuid] = t;
                s.each(t._moRule, t._catchRule, {
                    oContext: t
                });
                return t;
            },
            _catchRule: function (t, u) {
                var B = this,
                    s = B.$,
                    A = B._moDom$;
                if (m[u]) {
                    var z = B.$.data(0),
                        x = z[p] || (z[p] = {}),
                        y = x[u] || (x[u] = []),
                        v = true,
                        w;
                    for (var C = y.length - 1; C >= 0; C--) {
                        w = s.$(y[C]);
                        if (w.contain(A)) {
                            v = false;
                            break;
                        }
                        if (A.contain(w)) {
                            w.delEvent(u, h);
                            y.pop();
                        }
                    }
                    if (v) {
                        A.addEvent(u, h);
                        y.push(A.data(0));
                    }
                } else {
                    A.addEvent(u, h);
                }
                return B;
            },
            _matchRule: function (y, t, w, x, u, v) {
                var G = this,
                    s = G.$,
                    F = G._moRule;
                if (F = F[y]) {
                    for (var K = 0; K < t; K++) {
                        var C = x[K].split(","),
                            z = true;
                        for (var L = 0, A = C.length; L < A; L++) {
                            var I = C[L],
                                D = F[I],
                                H, B;
                            if (!D) {
                                break;
                            }
                            if (H = D.sContext) {
                                for (var M = K; M < t; M++) {
                                    if (B = u[M][H]) {
                                        break;
                                    }
                                }
                            } else {
                                B = w[K];
                            }
                            if (B) {
                                if (y == 'mouseout') {
                                    var E = v.relatedTarget || v.toElement;
                                    if (s.$(B).contain(E)) {
                                        break;
                                    }
                                }
                            }
                            if (B) {
                                var J = D.sProcess || I;
                                z = z && s.safe(G._moEvents[J], [G.name_(), J].join(".")).call(G._moCallObj, v, w[K], B) !== false && (D.bPropagable !== false);
                            }
                        }
                        if (!z) {
                            return false;
                        }
                    }
                }
                return true;
            },
            _preProcessRule: function (s) {
                return s;
            }
        });
    });
});
$.package("comm/ui/panel.js", ["comm/ctrl/tagevent.js"], function (b) {
    var j = $.ctor_(),
        m = QMWin,
        k = 1000;
    var a = "_pANelmAsk_",
        l = [];

    function d(n) {
        var p;
        if (n.oDom) {
            var o = c(n.oDom.data(0), a);
            p = o ? $.$(o) : $.$("<div>").attr("un", a);
            !o && n.oDom.insert(p, "afterBegin");
        } else {
            p = $.$("#" + a);
            if (!p.size()) {
                p = $.$("<div>").attr("id", a);
                $.$("body").insert(p, "afterBegin");
            }
        }
        return p;
    }

    function c(n, o) {
        var p = n.childNodes;
        for (var q = 0; q < p.length; q++) {
            if (p[q].getAttribute && p[q].getAttribute("un") == o) {
                return p[q];
            }
        }
    }

    function h(o, n) {
        var p = this;
        p._moDom$ = o;
        this._init(n = n || {});
    }
    h.prototype = {
        _init: function (n) {
            var o = this;
            o._initTagEvent(n);
            o._initPanel(n);
            o._mnZIndex = k = k + 2;
        },
        _initTagEvent: function (n) {
            var t = this,
                q = t._moDom$,
                p = n.oDom || q.size() && q.data(0),
                s = n.oRule,
                r = n.oEvents,
                o = n.oContext;
            t._moTagEvent = $.ctrl("TagEventCatcher", {
                oDom: p,
                oRule: s,
                oEvents: r,
                oCallObj: o
            });
        },
        _initPanel: function (n) {
            var o = this;
            o._mfOnBeforeClose = n.onbeforeclose, o._mfOnClose = n.onclose;
            o._moDom$.appendTo(d(n));
        },
        _getZIndex: function () {
            return this._mnZIndex;
        },
        _close: function () {
            this._moDom$.remove();
        }
    };

    function e(n) {
        var p = this,
            o = Array.apply(null, arguments);
        if ($.isStr(n)) {
            return g.apply(p, o);
        } else {
            return f.call(p, n);
        }
    }

    function f(n) {
        var o = this;
        o._moPanel = new h(o, n);
        return o;
    }

    function g(n) {
        var p = this,
            o = Array.apply(null, arguments);
        _oPanel = p._moPanel;
        switch (n) {
        case "instance":
            return _oPanel;
        case "close":
            _oPanel && _oPanel._close.apply(_oPanel, o.slice(1));
        case "z-index":
            return _oPanel && _oPanel._getZIndex.call(_oPanel);
            break;
        }
        return p;
    }
    j.extend("method", (function () {
        return ({
            panel: e
        });
    })());
});
$.package("comm/ui/dialog.js", ["comm/ui/panel.js"], function (b) {
    var g = $.ctor_(),
        h = QMWin;
    var a = (['<div dlg="mask" class="detail_mask"></div>', '<div dlg="panel" class="opp_obj">', '<div un="dlg" class="o_body rounded5">', '<strong dlg="title" class="o_title" style="display:none;"></strong>', '<a dlg="close" href="javascript:;" class="ico_close"></a>', '<div dlg="content" class="o_con"></div>', '<div class="t_mask"></div>', '</div>', '</div>']).join("");

    function f(k, j) {
        var l = this;
        l._moDom$ = k;
        this._init(j = j || {});
    }
    f.prototype = {
        _init: function (j) {
            var k = this;
            k._initPanel(j);
            k._initEvent(j);
        },
        _initPanel: function (k) {
            var z = this,
                j = z._moDom$,
                w = j,
                B = j.inWin(),
                v = B.document.documentElement,
                u = B.document.body,
                o = k.nTop,
                n = k.nLeft,
                p = k.nWidth || parseInt(w.css("width")) || 450,
                m = k.nHeight,
                C = k.oTmpl || a,
                y = z._moPanel$ = j.$("<div>").html(C).panel(j.extend({}, k)),
                s = z._moContainer$ = y.find("[dlg='panel']");
            if (p) {
                s.css("width", p);
            }
            if (m) {
                s.css("height", m);
            }
            var t = z._moContent$ = s.find("[dlg='content']").append(z._moDom$),
                A = z._moTitle$ = s.find("[dlg='title']").css("display", k.sTitle ? "" : "none").html(k.sTitle || ""),
                r = z._moClose$ = s.find("[dlg='close']"),
                x = z._moMask$ = y.find("[dlg='mask']");
            var q = y.panel("z-index");
            x.css("z-index", q - 1);
            s.css("z-index", q);
            k.sMaskClass && x.addClass(k.sMaskClass);
            m = s.height();
            s.css({
                "top": o == "auto" ? (v.clientHeight - m) / 2 + (v.scrollTop || u.scrollTop) : o,
                "left": n == "auto" ? (v.clientWidth - p) / 2 + (v.scrollLeft || u.scrollLeft) : n
            });
            r.on("click", l({
                sFrom: "button"
            }));
            x.on("click", l({
                sFrom: "mask"
            }));

            function l(D) {
                return function () {
                    z._onbeforeclose(D);
                };
            }
        },
        _initEvent: function (j) {
            var k = this;
            k._mfOnBeforeClose = j.onbeforeclose;
            k._mfOnClose = j.onclose;
        },
        _close: function () {
            var j = this;
            j._moPanel$.panel("close");
            j._onclose.apply(j, arguments);
        },
        _onbeforeclose: function (j) {
            var l = this,
                k = l._mfOnBeforeClose;
            if (k && k(j) || !k) {
                l._close();
            }
        },
        _onclose: function () {
            var k = this,
                j = k._mfOnClose;
            j && j.apply(k, arguments);
        }
    };

    function c(j) {
        var l = this,
            k = Array.apply(null, arguments);
        if ($.isStr(j)) {
            return e.apply(l, k);
        } else {
            return d.call(l, j);
        }
    }

    function d(j) {
        var k = this;
        k._moDialog = new f(k, j);
        return k;
    }

    function e(j) {
        var l = this,
            k = Array.apply(null, arguments);
        _oDialog = l._moDialog;
        switch (j) {
        case "instance":
            return _oDialog;
        case "close":
            _oDialog && _oDialog._close.apply(_oDialog, k.slice(1));
            break;
        }
        return l;
    }
    g.extend("method", (function () {
        return ({
            dialog: c
        });
    })());
});
$.package("comm/ui/qmpanel.js", ["comm/ctrl/tagevent.js"], function (a) {
    var b = QMWin;
    b.createCtrl("UI.QMPanel", {}, function (c) {
        return {
            show: function (d) {
                var e = this;
                e._moPanelDom$.show();
                return d && d.noEvent ? e : e.fireEvent_("show");
            },
            hide: function (d) {
                var e = this;
                e._moPanelDom$.hide();
                return d && d.noEvent ? e : e.fireEvent_("hide");
            },
            isShow: function () {
                var d = this;
                return !(d._moPanelDom$.css("display") == "none" || d._moPanelDom$.css("visibility") == "hidden");
            },
            isSee: function () {
                var e = this,
                    d = e.isShow();
                d && e._moPanelDom$.parents("*").each(function (f) {
                    return d = f.style.display == "none" || f.style.visibility == "hidden";
                });
                return d;
            },
            inDocument: function () {
                try {
                    var f = _oSelf._moPanelDom$.data(0);
                    if (f.parentNode == null) {
                        return false;
                    }
                    if (b.isBrowser("ie")) {
                        return !!f.ownerDocument;
                    } else {
                        var g = f.ownerDocument.defaultView,
                            d = g.frameElement;
                        if (d) {
                            return d.contentDocument == f.ownerDocument;
                        } else {
                            return g == b.$("$top");
                        }
                    }
                } catch (h) {
                    return false;
                }
                return true;
            },
            getSize: function () {
                var d = this;
                return [d._moPanelDom$.height(), d._moPanelDom$.width()];
            },
            getPosition: function () {
                var d = this._moPanelDom$.offset();
                return [d.top, d.left];
            },
            setPosition: function (e, d) {
                var f = this;
                e != a && e != null && f._moPanelDom$.css('top', e);
                d != a && d != null && f._moPanelDom$.css('left', d);
                return f;
            },
            getPanel: function () {
                return this._moPanelDom$;
            },
            init_: function (e) {
                var f = this,
                    d = f.superEx_(c, "init_", [e]).$;
                f._moPanelCfg = e;
                f._moPanelDom$ = d.$(e.oDom);
            }
        };
    });
    b.createCtrl("UI.QMAniPanel", {
        sSuper: "UI.QMPanel"
    }, function (c) {
        var g = 0,
            j = 1,
            h = 2,
            f = 3,
            e = 4,
            d = 5;
        return {
            show: function (k) {
                var o = this,
                    l = function () {
                        o._mnPanelStatus = h;
                        return o.superEx_(c, "show", [k]);
                    };
                if (!o.super_(c, "isShow")) {
                    if (o._mbAnimation && !(k && k.noAni)) {
                        o._mnPanelStatus = j;
                        var n = o.fireEvent_("showing")._moPanelDom$,
                            m = n.height();
                        n.stop().animate({
                            height: "+=5," + m
                        }, "fast", "", l);
                    } else {
                        l();
                    }
                }
                return o;
            },
            hide: function (k) {
                var m = this,
                    l = function () {
                        m._mnPanelStatus = e;
                        m.superEx_(c, "hide", [k]);
                    };
                if (m.super_(c, "isShow")) {
                    if (m._mbAnimation && !(k && k.noAni)) {
                        m._mnPanelStatus = f;
                        m.fireEvent_("hiding")._moPanelDom$.stop().animate({
                            height: "-=5,0"
                        }, "fast", "", l);
                    } else {
                        l();
                    }
                }
                return m;
            },
            isShow: function () {
                var k = this;
                return k._mnPanelStatus == h && k.super_(c, "isShow");
            },
            isSee: function () {
                var k = this;
                return k._mnPanelStatus == h && k.super_(c, "isSee");
            },
            init_: function (l) {
                var m = this,
                    k = m.superEx_(c, "init_", [l]).$;
                m._moPanelCfg = l;
                m._mbAnimation = !(l.bAnimation === false);
                m._mnPanelStatus = g;
                m._moPanelDom$ = k.$(l.oDom);
            }
        };
    });
    b.createCtrl("UI.QMSelectPanel", {
        sSuper: "UI.QMAniPanel"
    }, function (c) {
        var f = /(\d+)(px)?/,
            d = b.isBrowser("ie6"),
            h = b.lib("TagEventCatcher"),
            j = {
                wrapDiv: '<div id="selectpanelwrap" style="height:0px;"></div>',
                outterDiv: b.T(['<div id="$sId$" class="selectpanel $sClass$" style="display:none;position:absolute;top:$nTop$px;left:$nLeft$px;background:#FFF;outline:none;" hidefocus tabindex="0" md="noblur">', d ? '<iframe un="shim" src="javascript:\'\'" style="position:absolute;visibility:inherit;top:0px;left:0px;z-index:-1;opacity:0;filter:alpha(opacity=0);"></iframe>' : '', '<div un="header" style="display:"></div>', '<div un="outbody" class="selectpanelbody" unselectable="on">', '<div un="body" class="selectpanelbody_inner"></div>', '</div>', '<div un="footer" style="display:"></div>', '</div>']),
                item: b.TE(['$@$for($item$)$@$', '<div $@$if(!$nSel$)$@$mor="highlight" ck="sel" un="sel"$@$endif$@$>$sHtml$</div>', '$@$endfor$@$'])
            },
            g = {
                height: 0,
                width: 0
            };
        b.ready(function () {
            var l = b.$("<div>").css({
                    overflow: "scroll",
                    margin: "0px",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    left: "0px",
                    top: "0px",
                    visibility: "hidden"
                }).appendTo(b.$("body")),
                k = l.data();
            g.height = k.offsetHeight - k.clientHeight;
            g.width = k.offsetWidth - k.clientWidth;
            l.remove();
        });

        function e(l, k) {
            if (f.test(l)) {
                return parseInt(RegExp.$1);
            }
            return -1;
        }
        return {
            getTmpl_: function (k) {
                return j[k];
            },
            upBody_: function (m, l) {
                var r = this,
                    k = r.$,
                    s, q = l;
                if (k.isStr(m)) {
                    s = m;
                } else {
                    q = k.isFunc(m) ? k.call(r, m) : m;
                    s = r.getTmpl_("item").replace({
                        item: q
                    });
                }
                var p = r._moBody$.html(s).data(0).firstChild,
                    o = 0,
                    n = 0;
                r._moCacheItems = [];
                r._moCacheData = [];
                while (p) {
                    if (p.getAttribute && p.getAttribute("un") == "sel") {
                        r._moCacheItems.push(p);
                        r._moCacheData.push(q[n]);
                        p.setAttribute("selind", o++);
                    }
                    n++;
                    p = p.nextSibling;
                }
                r._mnSelectItem = -1;
                return r.resize();
            },
            setBody: function (k) {
                var l = this;
                return l.upBody_(k);
            },
            getOutBody: function () {
                return this._moOutBody$;
            },
            getBody: function () {
                return this._moBody$;
            },
            setHeader: function (k) {
                var l = this;
                if (k) {
                    l._moHeader$.html(k).show();
                } else if (k == "") {
                    l._moHeader$.hide();
                }
                return l;
            },
            setFooter: function (k) {
                var l = this;
                if (k) {
                    l._moFooter$.html(k).show();
                } else if (k == "") {
                    l._moFooter$.hide();
                }
                return l;
            },
            _preCalSize: function () {
                var l = this,
                    k = l._moSelectPanelCfg;
                l._moCacheHW = {};
                l.$.each(["Height", "Width"], function (m) {
                    var n, o, p = m.toLowerCase();
                    n = o = e(k["v" + m]);
                    n < 0 && (n = e(k["vMax" + m]));
                    o < 0 && (o = e(k["vMin" + m]));
                    l._moCacheHW[p] = [o, n];
                });
                return l;
            },
            resize: function () {
                var v = /scroll|auto/i,
                    F = "visible",
                    B = "auto",
                    C = "hidden",
                    z = this,
                    x = z._moOutBody$,
                    w = x.data(0),
                    y = w.style,
                    t = z._moBody$,
                    u = t.data(0).style,
                    D = x.css("overflowX"),
                    E = x.css("overflowY"),
                    A = d ? z._moShimIframe$.data(0).style : null,
                    m = z.isShow();
                z._moPanel$.css("height", B);
                y.width = B;
                y.height = B;
                y.overflow = F;
                u.width = B;
                u.height = B;
                if (A) {
                    A.height = B;
                    A.width = B;
                }
                if (!m) {
                    z.show({
                        noEvent: true,
                        noAni: true
                    });
                }
                var n = w.offsetHeight,
                    q = n,
                    o = w.offsetWidth,
                    r = o,
                    p = z._moCacheHW.height,
                    s = z._moCacheHW.width,
                    l = false,
                    k = false;
                if (p[1] > 0 && q > p[1]) {
                    q = p[1];
                    l = v.test(E);
                } else if (p[0] > 0 && q < p[0]) {
                    q = p[0];
                }
                if (s[1] > 0 && r > s[1]) {
                    r = s[1];
                    k = v.test(D);
                } else if (s[0] > 0 && r < s[0]) {
                    r = s[0];
                }
                r += l && (s[1] < 0 || s[1] >= r + g.width) ? g.width : 0;
                q += k && (p[1] < 0 || p[1] >= q + g.height) ? g.height : 0;
                if (D == C) {
                    o = r - (l ? g.width : 0);
                }
                if (E == C) {
                    n = q - (k ? g.height : 0);
                }
                y.width = r + "px";
                y.height = q + "px";
                u.width = o + "px";
                u.height = n + "px";
                y.overflowX = D;
                y.overflowY = E;
                if (A) {
                    A.height = q + "px";
                    A.width = r + "px";
                }
                if (!m) {
                    z.hide({
                        noEvent: true,
                        noAni: true
                    });
                }
                return z;
            },
            setSize: function (l) {
                var n = this,
                    m = n._moSelectPanelCfg;
                for (var o in l) {
                    m[o] = l[o];
                }
                return n._preCalSize().resize();
            },
            setSelectItem: function (m, k, l) {
                var q = this,
                    o = b.isDom(m) ? parseInt(m.getAttribute("selind")) : m,
                    n = q._moCacheItems.length,
                    p = q._mnSelectItem;
                if (b.isNum(o) && (o >= 0 || !k)) {
                    p = ((k ? 0 : p) + o + n) % n;
                    if (p != q._mnSelectItem) {
                        q._selectItemUI(q._mnSelectItem, false, l)._selectItemUI(q._mnSelectItem = p, true, l);
                    }
                } else {
                    q._selectItemUI(p, false, l);
                    q._mnSelectItem = -1;
                }
                return q;
            },
            _selectItemUI: function (m, l, k) {
                var o = this,
                    n = o._moCacheItems[m];
                o.$.$(n)[l ? 'addClass' : 'rmClass']("highlight");
                return l && k ? o._scrollIntoMidView(n) : o;
            },
            _scrollIntoMidView: function (k) {
                var r = this,
                    q = r._moOutBody$.data(0),
                    l = q.clientHeight,
                    o = q.scrollTop + q.offsetTop,
                    p = r._moBody$.data(0),
                    n = k.offsetTop,
                    m = k.offsetHeight;
                if (o >= n || o + l <= n + m) {
                    q.scrollTop = n - l / 2;
                }
                return r;
            },
            getSelectData: function () {
                var l = this,
                    k = l._moCacheItems[l._mnSelectItem];
                return k ? l._moCacheData[l.$.$(k).attr("selind")] : null;
            },
            getSelectDom: function () {
                var k = this;
                return k._moCacheItems[k._mnSelectItem];
            },
            rule: function () {
                var k = this;
                return h.merge({
                    click: {
                        sel: {}
                    },
                    mouseover: {
                        highlight: {}
                    }
                }, k._moSelectPanelCfg.oRule);
            },
            events: function () {
                var l = this,
                    k = l.$;
                return k.extend({
                    sel: function (n, o, m) {
                        l.setSelectItem(o, true, false).fireEvent_("select", [l.getSelectData()]);
                    },
                    highlight: function (n, o, m) {
                        l.setSelectItem(o, true, false);
                    }
                }, l._moSelectPanelCfg.oEvents);
            },
            _createDom: function () {
                var o = this,
                    l = o._moSelectPanelCfg,
                    k = o.$,
                    n = l.oContainer || k.$("#selectpanelwrap"),
                    m = k.$("#" + l.sId);
                if (!n.size()) {
                    k.$("body").insert(o.getTmpl_("wrapDiv"), "afterBegin");
                    n = k.$("#selectpanelwrap");
                }
                if (!m.size()) {
                    n.insert(o.getTmpl_("outterDiv").replace(l), "beforeEnd");
                    m = k.$("#" + l.sId);
                }
                o._moPanel$ = m;
                o._moHeader$ = m.find('div[un="header"]');
                o._moBody$ = m.find('div[un="body"]');
                o._moOutBody$ = m.find('div[un="outbody"]');
                o._moFooter$ = m.find('div[un="footer"]');
                o._moShimIframe$ = m.find('iframe[un="shim"]');
                k.ctrl("TagEventCatcher", {
                    oDom: m,
                    oRule: o.rule(),
                    oEvents: o.events()
                });
                return o;
            },
            destroy_: function () {
                var k = this;
                if (k._moPanel$) {
                    k._mnSelectItem = -1;
                    k._moCacheItems = [];
                    k._moCacheData = null;
                    k._moPanel$.remove();
                    k._moPanel$ = k._moHeader$ = k._moBody$ = k._moOutBody$ = k._moFooter$ = k._moShimIframe$ = null;
                }
                return k;
            },
            _resetPanelHeight: function () {
                var k = this;
                k._moPanel$ && k._moPanel$.css("height", "auto");
                return k;
            },
            init_: function (l) {
                var m = this,
                    k = m.$;
                l.sId = l.sId || k.unikey();
                m._moSelectPanelCfg = l;
                m._createDom()._preCalSize();
                m._mnSelectItem = -1;
                m._moCacheItems = [];
                m._moCacheData = null;
                l.bAnimation !== false && k.addEvent(m, {
                    show: m._resetPanelHeight,
                    hiding: function () {
                        m._moPanel$.css("height", m._moPanel$.height());
                    },
                    hide: m._resetPanelHeight
                });
                l.oDom = m._moPanel$;
                m.superEx_(c, "init_", [l]);
            }
        };
    });
});
$.package("comm/ctrl/verifycode.js", ["comm/ui/dialog.js"], function (c) {
    var a = c,
        d = QMWin,
        b = d.T(['<div class="vcode">', '<div class="addrtitle">$message$</div>', '<div class="vcodeinput">', '<div>\u9A8C\u8BC1\u7801\uFF1A<input class="txt" type="text" maxlength="8" kp="submit"/></div>', '<div class="vcodedisplay">', '<div class="graytext">\u8BF7\u8F93\u5165\u4E0B\u56FE\u6240\u793A\u5B57\u7B26\uFF0C\u4E0D\u533A\u5206\u5927\u5C0F\u5199\u3002</div>', '<img src="$src$" alt="\u9A8C\u8BC1\u7801\u56FE\u7247" />', '<div><a href="javascript:;" ck="change" class="underline">\u770B\u4E0D\u6E05\u695A\uFF1F&nbsp;\u6362\u4E00\u4E2A</a></div>', '</div>', '</div>', '<div class="vcodesubmit">', '<a href="javascript:;" class="left button_green_s" ck="submit">&nbsp;\u786E\u5B9A&nbsp;</a>', '<a href="javascript:;" class="underline" ck="cancel">\u53D6\u6D88</a>', '</div>', '</div>']);
    d.createCtrl("VerifyCode", {}, function (e) {
        return ({
            init_: function (g) {
                var k = this,
                    f = k.superEx_(e, "init_", [g]).$,
                    h = f.extend({
                        src: '/cgi-bin/getverifyimage?aid=23000101' + (g.f ? '&f=' + g.f : '') + '&sid=' + f.sid() + '&r=' + f.random(),
                        message: "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801"
                    }, g),
                    l = g.oTmpl || {},
                    m = l.oContent || b,
                    n = l.oDialog,
                    j = f.$("<div>").html(m.replace(h));
                j.dialog({
                    oTmpl: n,
                    oRule: {
                        click: {
                            submit: {},
                            cancel: {},
                            change: {}
                        },
                        keypress: {
                            submit: {}
                        }
                    },
                    oEvents: {
                        submit: function (o) {
                            var p = this,
                                q = o.type,
                                r = p.getDom$().find("input[type=text]").attr("value");
                            if (r && (q != "keypress" || o.keyCode == 13)) {
                                j.dialog("close", true).call(this, h.verify, [r]);
                            }
                        },
                        cancel: function () {
                            j.dialog("close");
                        },
                        change: function (p, q, o) {
                            var r = this.getDom$().find("img");
                            r.attr("src", (r.attr("orgsrc") || r.attr("orgsrc", r.attr("src")).attr("orgsrc")) + r.random()).stopPropagation(p).preventDefault(p);
                        }
                    },
                    onbeforeclose: function (o) {
                        return o.sFrom != "mask";
                    },
                    onclose: function (o) {
                        f.fireEvent(k, o ? "confirm" : "cancel");
                    },
                    nTop: g.nTop,
                    nLeft: g.nLeft
                }).find("input[type=text]").focus();
            }
        });
    });
});
$.package("openshare/lib/localcomm.js", ["comm/ctrl/verifycode.js"], function (c) {
    var a = c;
    var b = (['<div dlg="mask" class="detail_mask"></div>', '<div dlg="panel" class="opp_obj" id="vcode">', '<div un="dlg" class="o_body mask">', '<strong dlg="title" class="o_title" style="display:none;"></strong>', '<a dlg="close" class="ico_close"></a>', '<div dlg="content" ></div>', '</div>', '</div>']).join("");
    QMWin.createLib("OpenShare.comm", {
        bStatic: true
    }, function (d) {
        return ({
            init_: function (f) {
                var g = this.superEx_(d, "init_"),
                    e = g.$;
                g._moComposeData = f.oComposeData;
                window.loginCallback = function (j, h) {
                    if (j && h) {
                        QMWLCfg.sUin = j;
                        QMWLCfg.sSid = h;
                        e.$("#loginArea").hide().$("#login a[name='loginbtn']").hide().$("#login span[name='info']").show().$("#login span[name='uin']").html(e.uin());
                        g._mfCallBack && g._mfCallBack();
                    } else {
                        g.showTips("error", "\u767B\u5F55\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5");
                        g.showLogin();
                    }
                };
            },
            _setCallBack: function (f) {
                var g = this,
                    e = g.$;
                f && (g._mfCallBack = f);
            },
            resetUinSid: function () {
                QMWLCfg.sUin = QMWLCfg.sSid = "";
            },
            toGetCodeBtn: function (f, g) {
                var h = this,
                    e = h.$;
                window.open(e.uin() ? "http://mail.qq.com/cgi-bin/login?fun=passport&delegate_url=" + encodeURIComponent("/cgi-bin/qm_help_mailme?t=" + g) : "http://service.mail.qq.com/cgi-bin/help?subtype=1&&id=23&&no=" + f);
            },
            _scrollTop: function () {
                var e = document.documentElement || a.$("body").data(0);
                e.scrollTop = 0;
            },
            showLogin: function (e) {
                QMPTLogin.showLoginFrame();
                this._setCallBack(e);
            },
            hideLogin: function () {
                var f = this,
                    e = f.$;
                e.$("#loginArea").hide();
            },
            showTips: function (h, g, f) {
                var j = this,
                    e = j.$;
                e.$("#system_tips").show().find("span").html(g).data(0).className = (h == "info" ? "msg" : "errmsg");
                j._scrollTop();
                setTimeout(function () {
                    j.hideTips();
                }, f || 5000);
            },
            hideTips: function () {
                var f = this,
                    e = f.$;
                e.$("#system_tips").hide();
            },
            _successAndClose: function () {
                var h = this,
                    e = h.$,
                    f, g = 5;
                h.hideTips();
                e.$("#send_main").hide().$("#send_success").show();
                e.$("#closewin").on("click", function () {
                    h.closeWin();
                });
                f = setInterval(function () {
                    if (--g <= 0) {
                        window.f = h;
                        h.closeWin();
                    } else {
                        e.$("#time_close").html(g);
                    }
                }, 1000);
            },
            closeWin: function () {
                window.open('', '_self', '');
                window.close();
                setTimeout(function () {
                    window.location.href = "about:blank";
                }, 50);
            },
            _verifyCode: function (f) {
                var h = this,
                    e = h.$,
                    g = e.ctrl("VerifyCode", {
                        oTmpl: {
                            oDialog: b
                        },
                        verify: function (j) {
                            f(j);
                        }
                    });
            },
            doSend: function (f) {
                var j = this,
                    e = j.$,
                    h = function () {
                        j.doSend(f);
                    },
                    g = f.onsuccess;
                j.showTips("info", "\u6B63\u5728\u53D1\u9001\u4E2D...", 10000);
                e.ajax({
                    sUrl: "/cgi-bin/compose_send",
                    sType: "POST",
                    vData: e.extend({
                        sid: e.sid(),
                        resp_charset: "UTF8",
                        t: "compose.json",
                        ef: "js"
                    }, j._moComposeData, f),
                    nTimeout: 10000,
                    onsuccess: function (n, m, l) {
                        var k = e.evalVal(n) || {};
                        if (k.errcode) {
                            j.showTips("error", k.errmsg);
                            if (k.errcode == "-2") {
                                j.showLogin(h);
                            } else if (k.errmsg.indexOf("verifyCode") > -1) {
                                var o = /verifyCode\(.*?,\s*\"(.*?)\"\s*\)/gi.exec(k.errmsg);
                                j._verifyCode(function (p) {
                                    e.extend(f, {
                                        verifykey: o && o[1],
                                        verifycode: p,
                                        verifycode_cn: p
                                    });
                                    h();
                                });
                            }
                        } else {
                            j._successAndClose();
                            g && g(k, m);
                        }
                    },
                    onerror: function (l, m, k) {
                        j.showTips("error", k.message);
                    }
                });
            }
        });
    });
});
$.package("openshare/app/mailme.js", ["openshare/lib/localcomm.js"], function (a) {
    QMWin.createApp("OpenShare.mailme", {}, function (b) {
        return ({
            init_: function (c) {
                var d = this.superEx_(b, "init_");
                d._moLib = QMWin.lib("OpenShare.comm", c);
            },
            process_: function () {
                var d = this,
                    c = d.$;
                d._bindEvent();
            },
            _bindEvent: function () {
                var d = this,
                    c = d.$;
                c.$("#login a").on("click", function () {
                    d._moLib.showLogin(QMPTLogin.close);
                });
                c.$("#closeLoginIframe").on("click", function () {
                    d._moLib.hideLogin();
                });
                c.$("#sendbtn").on("click", function (e) {
                    if (c.uin()) {
                        d._doSend();
                    } else {
                        d._moLib.showLogin(QMPTLogin.close);
                    }
                });
                c.$("#togetcodebtn").on("click", function (e) {
                    d._moLib.toGetCodeBtn("1000811", "qm_help_mailme");
                    c.preventDefault(e);
                });
            },
            _doSend: function () {
                var d = this,
                    c = d.$,
                    f = c.$("#descriptiontx").attr("value"),
                    g = c.$("#subject").attr("value"),
                    e = c.$("#to").html();
                if (!g) {
                    d._moLib.showTips("error", "\u8BF7\u586B\u5199\u4E3B\u9898");
                    c.$("subject").focus();
                    return;
                }
                d._moLib.doSend({
                    to: e,
                    subject: g,
                    content__html: c.htmlEncode(f)
                });
            }
        });
    });
});
var QMPTLogin = (function () {
    var APPID = 522005705,
        DAID = 4,
        OVERLAY_ID = "qmptlogin_overlay",
        LOGINDIV_ID = "login_div",
        LOGINFRAME_ID = "login_frame";

    function _getCenterPos(_aoParam) {
        var _oWin = _aoParam.context,
            _nWidth = _aoParam.width,
            _nHeight = _aoParam.height;
        return {
            left: (_oWin.document.body.offsetWidth - _nWidth) / 2,
            top: (_oWin.document.body.offsetHeight - _nHeight) / 2 - 70
        };
    }

    function _str2JSON(str) {
        eval('var __pt_json=' + str);
        return __pt_json;
    }

    function ptlogin2_onResize(width, height) {
        var login_wnd = document.getElementById("login_div");
        document.getElementById("login_frame").style.height = height + 'px';
        document.getElementById("login_frame").style.width = width + 'px';
        if (login_wnd) {
            login_wnd.style.width = width + "px";
            login_wnd.style.height = height + "px";
            login_wnd.style.visibility = "hidden";
            login_wnd.style.visibility = "visible";
            login_wnd.style.marginLeft = -width / 2 + 'px';
            login_wnd.style.marginTop = -height / 2 + 'px';
        }
    }

    function ptlogin2_onClose() {
        var _oOverlay = document.getElementById(OVERLAY_ID),
            _oLoginDiv = document.getElementById(LOGINDIV_ID);
        _oOverlay.parentNode.removeChild(_oOverlay);
        _oLoginDiv.parentNode.removeChild(_oLoginDiv);
    }

    function ptlogin2_onLoginSucc(_aoData) {
        QMPTLogin.onLoginSucc(_aoData);
    }

    function _setDomPos(_aoDom, _aoPos) {
        _aoDom.style.top = _aoPos.top;
        _aoDom.style.left = _aoPos.left;
    }
    return {
        init: function (_aoCfg) {
            this._moCfg = _aoCfg;
            this._moWin = _aoCfg.oWin;
            this._fOnLoginCallback = _aoCfg.loginCallback;
            this.initPostMessage();
            this._moCfg.autoShow && this.showLoginFrame();
        },
        initPostMessage: function () {
            var _oSelf = this,
                _oWin = this._moWin;
            _oWin.ptlogin2_onClose = ptlogin2_onClose;
            _oWin.ptlogin2_onResize = ptlogin2_onResize;
            _oWin.ptlogin2_onLoginSucc = ptlogin2_onLoginSucc;
            if (typeof _oWin.postMessage !== 'undefined') {
                _oWin.onmessage = function (event) {
                    var msg = event || _oWin.event;
                    var data;
                    if (typeof JSON !== 'undefined')
                        data = JSON.parse(msg.data);
                    else data = _str2JSON(msg.data);
                    switch (data.action) {
                    case 'close':
                        ptlogin2_onClose();
                        break;
                    case 'resize':
                        ptlogin2_onResize(data.width, data.height);
                        break;
                    }
                };
            }
        },
        createOverlay: function () {
            var _oOverlay = this._moWin.document.createElement("div");
            _oOverlay.id = OVERLAY_ID;
            _oOverlay.className = OVERLAY_ID;
            _oOverlay.style.cssText = "display:none;background-color:gray;filter:alpha(opacity=80);opacity:0.8;width:100%;height:100%;position:fixed;_position:absolute;left:0;top:0;z-index:1000;";
            this._moWin.document.body.appendChild(_oOverlay);
            return _oOverlay;
        },
        showLoginFrame: function () {
            var _oDomModel = this.createOverlay(),
                _oUrlParams = {
                    appid: APPID,
                    daid: DAID,
                    s_url: encodeURIComponent("https://mail.qq.com/cgi-bin/login?vt=passport&vm=wpt&ft=loginpage&target=QMPTLOGIN&delegate_url=" + encodeURIComponent(this._moCfg.sUrl || "/cgi-bin/readtemplate?t=qmptlogin_succ")),
                    style: this._moCfg.frameStyle || "25",
                    target: this._moCfg.target || "self",
                    login_text: encodeURIComponent(this._moCfg.loginText || "\u767B\u5F55"),
                    proxy_url: this._moCfg.proxyUrl || this._moWin.location.protocol + "//mail.qq.com/proxy.html",
                    pt_no_auth: this._moCfg.autoLogin || "1",
                    css: this._moCfg.cssUrl || "https://res.mail.qq.com/zh_CN/htmledition/style/ptlogin_input.css",
                    need_qr: this._moCfg.needQR || "0",
                    hide_border: this._moCfg.hideBorder || "1",
                    border_radius: this._moCfg.borderRadius || "0",
                    self_regurl: this._moCfg.selfRegurl || "http://zc.qq.com/chs/index.html?type=1",
                    pt_feedback_link: this._moCfg.ptFeedbackLink || "http://support.qq.com/discuss/350_1.shtml"
                },
                _sLoginUrl = ['https://xui.ptlogin2.qq.com/cgi-bin/xlogin?', 'appid=', _oUrlParams.appid, '&daid=', _oUrlParams.daid, '&s_url=', _oUrlParams.s_url, '&style=', _oUrlParams.style, '&proxy_url=', _oUrlParams.proxy_url, '&target=', _oUrlParams.target, '&login_text=', _oUrlParams.login_text, "&pt_no_auth=", _oUrlParams.pt_no_auth, "&css=", _oUrlParams.css, "&need_qr=", _oUrlParams.need_qr, "&hide_border=", _oUrlParams.hide_border, "&border_radius=", _oUrlParams.border_radius, "&self_regurl=", _oUrlParams.self_regurl, "&pt_feedback_link=", _oUrlParams.pt_feedback_link].join("");
            _oLoginPos = _getCenterPos({
                width: this._moCfg.nWidth || 0,
                height: this._moCfg.nHeight || 0,
                context: this._moWin
            });
            _oDomModel.style.display = "block";
            this.createLoginFrame(_oLoginPos, _sLoginUrl);
            (new Image()).src = "//rl.mail.qq.com/cgi-bin/getinvestigate?kvclick=report|qmptlogin|login|show";
            this.setEvents();
        },
        createLoginFrame: function (_aoPos, _asUrl) {
            var _oLoginDiv = this._moWin.document.createElement("div"),
                _oLoginFrame = this._moWin.document.createElement("iframe");
            _oLoginDiv.id = _oLoginDiv.className = LOGINDIV_ID;
            _oLoginFrame.id = LOGINFRAME_ID;
            _oLoginDiv.style.position = "absolute";
            _oLoginDiv.style.top = _aoPos.top + "px";
            _oLoginDiv.style.left = _aoPos.left + "px";
            _oLoginDiv.style.zIndex = 1001;
            _oLoginFrame.src = _asUrl;
            _oLoginFrame.scrolling = "no";
            _oLoginFrame.style.border = "none";
            _oLoginFrame.style.borderRadius = "5px";
            _oLoginDiv.appendChild(_oLoginFrame);
            this._moWin.document.body.appendChild(_oLoginDiv);
        },
        onLoginSucc: function (_aoData) {
            this.close();
            this._fOnLoginCallback(_aoData);
            (new Image()).src = "//rl.mail.qq.com/cgi-bin/getinvestigate?kvclick=report|qmptlogin|login|succ&sid=" + _aoData.sid;
        },
        close: function () {
            ptlogin2_onClose();
        },
        setEvents: function () {
            var _oSelf = this,
                _oOverlay = this._moWin.document.getElementById(OVERLAY_ID);
            _oOverlay.onclick = function (_aoEvent) {
                _oSelf.close();
            };
        }
    };
})();
window.testLogin = function () {
    QMPTLogin.init({
        oWin: window,
        sUrl: location.protocol + "//" + location.host + "/cgi-bin/qm_share?t=openshare_success",
        autoShow: true
    });
};
