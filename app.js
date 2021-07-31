const apiKey = '7176dd60246c44bb92718988a51c7bee';
let customJoke = 'hello world';
let apUrl = `http://api.voicerss.org/?key=${apiKey}&hl=en-us&src=${customJoke}`;


const button = document.querySelector('#button');
const audioElement = document.querySelector('#audio');
let jokeText;



// VoiceRSS Javascript SDK
const VoiceRSS = {
    speech(e) {
        this._validate(e),
            this._request(e)
    },
    _validate(e) {
        if (!e) throw "The settings are undefined";
        if (!e.key) throw "The API key is undefined";
        if (!e.src) throw "The text is undefined";
        if (!e.hl) throw "The language is undefined";
        if (e.c && "auto" != e.c.toLowerCase()) {
            let a = !1;
            switch (e.c.toLowerCase()) {
                case "mp3":
                    a = (new Audio).canPlayType("audio/mpeg").replace("no", "");
                    break;
                case "wav":
                    a = (new Audio).canPlayType("audio/wav").replace("no", "");
                    break;
                case "aac":
                    a = (new Audio).canPlayType("audio/aac").replace("no", "");
                    break;
                case "ogg":
                    a = (new Audio).canPlayType("audio/ogg").replace("no", "");
                    break;
                case "caf":
                    a = (new Audio).canPlayType("audio/x-caf").replace("no", "")
            }
            if (!a) throw `The browser does not support the audio codec ${e.c}`
        }
    },
    _request(e) {
        const a = this._buildRequest(e),
            t = this._getXHR();
        t.onreadystatechange = function() {
            if (4 == t.readyState && 200 == t.status) {
                if (0 == t.responseText.indexOf("ERROR")) throw t.responseText;
                let e = t.responseText;
                audioElement.src = e, audioElement.onloadedmetadata = (() => {
                    audioElement.play()
                })
            }
        }, t.open("POST", "https://api.voicerss.org/", !0), t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), t.send(a)
    },
    _buildRequest(e) { const a = e.c && "auto" != e.c.toLowerCase() ? e.c : this._detectCodec(); return `key=${e.key || ""}&src=${e.src || ""}&hl=${e.hl || ""}&r=${e.r || ""}&c=${a || ""}&f=${e.f || ""}&ssml=${e.ssml || ""}&b64=true` },
    _detectCodec() { const e = new Audio; return e.canPlayType("audio/mpeg").replace("no", "") ? "mp3" : e.canPlayType("audio/wav").replace("no", "") ? "wav" : e.canPlayType("audio/aac").replace("no", "") ? "aac" : e.canPlayType("audio/ogg").replace("no", "") ? "ogg" : e.canPlayType("audio/x-caf").replace("no", "") ? "caf" : "" },
    _getXHR() { try { return new XMLHttpRequest } catch (e) {} try { return new ActiveXObject("Msxml3.XMLHTTP") } catch (e) {} try { return new ActiveXObject("Msxml2.XMLHTTP.6.0") } catch (e) {} try { return new ActiveXObject("Msxml2.XMLHTTP.3.0") } catch (e) {} try { return new ActiveXObject("Msxml2.XMLHTTP") } catch (e) {} try { return new ActiveXObject("Microsoft.XMLHTTP") } catch (e) {} throw "The browser does not support HTTP request" }
};



async function SpeechText() {

    const response = await fetch("https://v2.jokeapi.dev/joke/Programming,Dark,Pun?blacklistFlags=nsfw,religious,political,racist,explicit&type=single");
    const data = response.json()
        .then((data) => {
            jokeText = data.joke;

            console.log(jokeText);

            VoiceRSS.speech({
                key: `${apiKey}`,
                src: `${jokeText}`,
                hl: `en-us`,
                v: `John`,
                r: 0,
                c: 'mp3',
                f: '44khz_16bit_stereo',
                ssml: false
            });


        })
        .catch(error => console.log(err));









}




button.addEventListener('click', SpeechText);




let p = new Promise((resolve, reject) => {
    let a = 2;
    if (a === 2) {
        resolve('sucess');
    } else {
        reject('sorry');
    }

});

p.then((msg) => { console.log('then' + msg); })
    .catch((err) => {
        console.log('err' + err);

    })