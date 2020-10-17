/*!
 **|  CyTube Channel: MLPA External Script
 **|
 **|  All code written by Xaekai except where otherwise noted.
 **|  Copyright 2014-2019 All Rights Reserved
 **|
 **@preserve
 */
if (!this[CHANNEL.name]) {
    this[CHANNEL.name] = {}
}
if (!this[CHANNEL.name].branding) {
    this[CHANNEL.name].branding = $(".navbar-brand").html("").css({
        "background-image": 'url("https://cdn.discordapp.com/attachments/701588063616499792/712716820796276786/our-hive.png")',
        "height": "50px",
        "min-width": "50px",
		"background-repeat": "no-repeat",
    	"background-size": "cover"
    })
}
if (!this[CHANNEL.name].favicon) {
    this[CHANNEL.name].favicon = $("<link/>").prop("id", "favicon").attr("rel", "shortcut icon").attr("type", "image/png").attr("sizes", "64x64").attr("href", "https://cdn.discordapp.com/attachments/701588063616499792/712716820796276786/our-hive.png").appendTo("head")
}
/*!
 **|   Xaekai's Sequenced Module Loader
 **|
 **@preserve
 */
({
    options: {
        designator: {
            prefix: "Drone-",
            delay: 90 * 1e3
        },
        playlist: {
            collapse: true,
            inlineBlame: true,
            moveReporting: true,
            quickQuality: true,
            recentMedia: true,
            simpleLeader: true,
            syncCheck: true,
            thumbnails: true,
            timeEstimates: true,
            volumeControl: true
        },
        chatext: {
            persistIgnore: true,
            smartScroll: true,
            maxMessages: 120
        },
        userlist: {
            autoHider: true
        },
        various: {
            notepad: true,
            emoteToggle: true
        }
    },
    modules: {
        settings: {
            active: 1,
            rank: -1,
            url: "https://cdn.jsdelivr.net/gh/DeveloperNotFound/sgstuff/modules/settings.js",
            done: true
        },
        privmsg: {
            active: 1,
            rank: 1,
            url: "https://cdn.jsdelivr.net/gh/DeveloperNotFound/sgstuff/modules/privmsg.js",
            done: true
        },
        whispers: {
            active: 1,
            rank: -1,
            url: "https://cdn.jsdelivr.net/gh/DeveloperNotFound/sgstuff/modules/whispers.js",
            done: true
        },
        userlist: {
            active: 1,
            rank: -1,
            url: "https://cdn.jsdelivr.net/gh/DeveloperNotFound/sgstuff/modules/userlist.js",
            done: true
        },
        md5hash: {
            active: 1,
            rank: -1,
            url: "https://cdn.jsdelivr.net/gh/DeveloperNotFound/sgstuff/modules/md5hash.js",
            done: true
        },
        designator: {
            active: 1,
            rank: -1,
            url: "https://cdn.jsdelivr.net/gh/DeveloperNotFound/sgstuff/modules/designator.js",
            done: true
        },
        playlist: {
            active: 1,
            rank: -1,
            url: "https://cdn.jsdelivr.net/gh/DeveloperNotFound/sgstuff/modules/playlist.js",
            done: true
        },
        notifier: {
            active: 1,
            rank: -1,
            url: "https://cdn.jsdelivr.net/gh/DeveloperNotFound/sgstuff/modules/playlist.js",
            done: true
        },
        chatline: {
            active: 1,
            rank: -1,
            url: "https://cdn.jsdelivr.net/gh/DeveloperNotFound/sgstuff/modules/chatline.js",
            done: true
        },
        chatext: {
            active: 1,
            rank: -1,
            url: "https://cdn.jsdelivr.net/gh/DeveloperNotFound/sgstuff/modules/chattext.js",
            done: true
        },
        chatcolor: {
            active: 1,
            rank: -1,
            url: "https://cdn.jsdelivr.net/gh/DeveloperNotFound/sgstuff/modules/chattext.js",
            done: true
        },
        colormap: {
            active: 1,
            rank: -1,
            url: "https://cdn.jsdelivr.net/gh/DeveloperNotFound/sgstuff/modules/colormap.js",
            done: true
        },
        layout: {
            active: 1,
            rank: -1,
            url: "https://cdn.jsdelivr.net/gh/DeveloperNotFound/sgstuff/modules/layout.js",
            done: true
        },
        various: {
            active: 1,
            rank: -1,
            url: "https://cdn.jsdelivr.net/gh/DeveloperNotFound/sgstuff/modules/various.js",
            done: true
        },
        embedmedia: {
            active: 1,
            rank: -1,
            url: "https://cdn.jsdelivr.net/gh/DeveloperNotFound/sgstuff/modules/embedmedia.js",
            done: true
        },
        chaticons: {
            active: 1,
            rank: -1,
            url: "https://cdn.jsdelivr.net/gh/DeveloperNotFound/sgstuff/modules/embedmedia.js",
            done: true
        },
        ci_library: {
            active: 1,
            rank: -1,
            url: "https://cdn.jsdelivr.net/gh/DeveloperNotFound/sgstuff/modules/ci_library.js",
            done: true,
            cache: false
        },
        time: {
            active: 1,
            rank: -1,
            url: "https://cdn.jsdelivr.net/gh/DeveloperNotFound/sgstuff/modules/time.js",
            done: true
        }
    },
    getScript: function(url, success, cache = true) {
        return jQuery.ajax({
            url,
            cache,
            success,
            type: "GET",
            dataType: "script"
        })
    },
    initialize: function() {
        if (CLIENT.modules) {
            return
        } else {
            CLIENT.modules = this
        }
        window[CHANNEL.name].modulesOptions = this.options;
        console.info("[XaeModule]", "Begin Loading.");
        this.index = Object.keys(this.modules);
        this.sequencerLoader();
        this.cache = true
    },
    sequencerLoader: function() {
        if (this.state.prev) {
            setTimeout(this.modules[this.state.prev].done, 0);
            this.state.prev = ""
        }
        if (this.state.pos >= this.index.length) {
            return console.info("[XaeModule]", "Loading Complete.")
        }
        var currKey = this.index[this.state.pos];
        if (this.state.pos < this.index.length) {
            if (this.modules[currKey].active) {
                if (this.modules[currKey].rank <= CLIENT.rank) {
                    console.info("[XaeModule]", "Loading:", currKey);
                    this.state.prev = currKey;
                    this.state.pos++;
                    let cache = typeof this.modules[currKey].cache == "undefined" ? this.cache : this.modules[currKey].cache;
                    this.getScript(this.modules[currKey].url, this.sequencerLoader.bind(this), cache)
                } else {
                    if (this.modules[currKey].rank === 0 && CLIENT.rank === -1) {
                        (function(module) {
                            socket.once("login", (data => {
                                if (data.success) {
                                    this.getScript(module.url, false, this.cache)
                                }
                            }))
                        })(this.modules[currKey])
                    }
                    this.state.pos++;
                    this.sequencerLoader()
                }
            } else {
                this.state.pos++;
                this.sequencerLoader()
            }
        }
    },
    state: {
        prev: "",
        pos: 0
    }
}).initialize();
