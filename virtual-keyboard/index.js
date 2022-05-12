let lang;

if(!localStorage.getItem("lang")) {
    localStorage.setItem("lang", "en");
} else {
    lang = localStorage.getItem("lang");
}

const enLang = ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
                "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\",
                "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter",
                "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "&#9650;", "Shift",
                "Ctrl", "Alt", "Space", "Alt", "&#9668;", "&#9660;", "&#9658;", "Ctrl"];
const ruLang = ["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
                "Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\",
                "CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter",
                "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "&#9650;", "Shift",
                "Ctrl", "Alt", "Space", "Alt", "&#9668;", "&#9660;", "&#9658;", "Ctrl"];

class Key {
    constructor(content) {
        this.content = content;
    }

    generate() {
        const k = document.createElement("div");
        k.className = "key";
        k.innerHTML = this.content;

        if(this.content === "Backspace" || this.content === "\\" || this.content === "CapsLock" || this.content === "Enter" || this.content === "Shift") {
            k.className = "key uniq-key";
        }

        if(this.content === "Space") {
            k.className = "key space-key"; 
        }

        return k;
    }
}

function generateKeyboard(lang) {
    const container = document.createElement("div");
    container.className = "container";

    const screen = document.createElement("textarea");
    screen.className = "screen";
    screen.setAttribute("autofocus", "autofocus");
    screen.autofocus = true;

    const keyboard = document.createElement("div");
    keyboard.className = "keyboard";

    const note = document.createElement("div");
    note.className = "note";
    note.innerText = "Create for Windows OS. Use Shift + Alt to change language.";

    if(lang === "en") {
        enLang.forEach(item => {
            const key = new Key(item);
            keyboard.append(key.generate());
        });
    } else {
        ruLang.forEach(item => {
            const key = new Key(item);
            keyboard.append(key.generate());
        });
    }

    container.append(screen);
    container.append(keyboard);
    container.append(note);
    document.body.append(container);
}

generateKeyboard(lang);

const keys = document.querySelectorAll(".key");

function changeLanguage() {
    if(lang === "en") {
        keys.forEach((item, index) => {
            item.innerHTML = ruLang[index];
        });
        localStorage.lang = "ru";
        lang = "ru";
    } else {
        keys.forEach((item, index) => {
            item.innerHTML = enLang[index];
        });
        localStorage.lang = "en";
        lang = "en";
    }
}

const screen = document.querySelector(".screen");

keys.forEach(item => {
    item.addEventListener("mousedown", () => pushVirtualKey(item.innerHTML));
});



function pushVirtualKey(content) {
    if(content === "Backspace") {
        screen.textContent = screen.textContent.substring(0, screen.textContent.length - 1);
    } else if(content === "CapsLock") {
        event.target.classList.toggle("key-active");
        keys.forEach(item => {
            if(item.innerHTML.length === 1 && event.target.classList.contains("key-active")) {
                item.innerHTML = item.innerHTML.toUpperCase();
            }
            
            if(item.innerHTML.length === 1 && !event.target.classList.contains("key-active")) {
                item.innerHTML = item.innerHTML.toLowerCase();
            }
        });
    } else if(content === "Shift") {
        keys.forEach(item => {
            if(item.innerHTML.length === 1 ) {
                item.innerHTML = item.innerHTML.toUpperCase();
            }
        });
    } else if(content === "Ctrl" || content === "Alt" || content === "Del") {
        return;
    } else if (content === "Space"){
        screen.textContent += " ";
    } else if(content === "Enter") {
        screen.textContent += "\n";
    } else if(content === "Tab") {
        screen.textContent += "\t";
    } else {
        screen.textContent += content;
    }   
}

keys.forEach(item => {
    item.addEventListener("mouseup", () => upVirtualKey(item.innerHTML));
});

function upVirtualKey(content) {
    if(content === "Shift") {
        keys.forEach(item => {
            if(item.innerHTML.length === 1) {
                item.innerHTML = item.innerHTML.toLowerCase();
            }
        });
    }  
}

document.addEventListener("keydown", pushPhysicalKey);
document.addEventListener("keyup", upPhysicalKey);

function pushPhysicalKey(e) {
    for(let i = 0; i < keys.length; i++) {
        if(keys[i].innerHTML === e.key) {
            keys[i].classList.add("key-active");
            break;
        }
        if(e.key === "Control") {
            keys[i].classList.add("key-active");
            break;
        }
 
        if(e.key === "ArrowUp") {
            keys[i].classList.add("key-active");
            break;
        }
        if(e.key === "ArrowLeft") {
            keys[i].classList.add("key-active");
            break;
        }
        if(e.key === "ArrowDown") {
            keys[i].classList.add("key-active");
            break;
        }
        if(e.key === "ArrowRight") {
            keys[i].classList.add("key-active");
            break;
        }
    }

    if(e.key === "Shift") {
        keys.forEach(item => {
            if(item.innerHTML.length === 1 ) {
                item.innerHTML = item.innerHTML.toUpperCase();
            }
        });
        } else if(e.altKey && e.shiftKey) {
            changeLanguage();
        } else if(e.key === "Control") {
            console.log("Control");
        } else if(e.key === "Alt") {
            e.preventDefault();
            console.log("Alt");
        } else if (e.key === "Backspace") {
            screen.textContent = screen.textContent.substring(0, screen.textContent.length - 1);
        } else if(e.key === "Enter") {
            screen.textContent += "\n";
        } else if(e.key === "CapsLock") {
            keys.forEach(item => {
                if(item.innerHTML.length === 1) {
                    if(item.innerHTML === item.innerHTML.toLowerCase()) {
                        item.innerHTML = item.innerHTML.toUpperCase(); 
                    } else {
                        item.innerHTML = item.innerHTML.toLowerCase();
                    }
                } 
            });
    } else if(e.key === "Tab") {
        e.preventDefault();
        screen.textContent += "\t";
    } else if(e.key === "ArrowUp") {
        e.preventDefault();
        screen.innerHTML += "&#9650;";
    } else if(e.key === "ArrowLeft") {
        e.preventDefault();
        screen.innerHTML += "&#9668;";
    } else if(e.key === "ArrowDown") {
        e.preventDefault();
        screen.innerHTML += "&#9660;";
    } else if(e.key === "ArrowRight") {
        e.preventDefault();
        screen.innerHTML += "&#9658;";
    } else {
        screen.textContent += e.key;
    }   
}

function upPhysicalKey(e) {
    keys.forEach(item => {
        if(item.innerHTML === e.key) {
            item.classList.remove("key-active");
        }
        if(item.innerHTML === "Ctrl") {
            item.classList.remove("key-active");
        }
    });
    if(e.key === "Shift") {
        keys.forEach(item => {
            if(item.innerHTML.length === 1 ) {
                item.innerHTML = item.innerHTML.toLowerCase();
            }
        });
    }
}


