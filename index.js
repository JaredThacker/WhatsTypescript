var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _this = this;
var formId = "defineform";
var accordionId = "wordAccordion";
var apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
var activateTooltips = function () {
    // @ts-ignore
    var tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    // @ts-ignore
    __spreadArray([], tooltipTriggerList, true).map(function (tooltipTriggerEl) { return new bootstrap.Tooltip(tooltipTriggerEl); });
};
var hideTooltip = function (tooltipContainerId) {
    if (tooltipContainerId.length > 0) {
        // @ts-ignore
        var foundTooltip = bootstrap.Tooltip.getInstance("#".concat(tooltipContainerId));
        // @ts-ignore
        foundTooltip.hide();
    }
};
var generateDefinition = function (definition, index) {
    var definitionCard = document.createElement("div");
    var definitionCardId = "definition_tooltip_container_".concat(index);
    definitionCard.setAttribute("data-bs-toggle", "tooltip");
    definitionCard.setAttribute("data-bs-title", definition.definition);
    definitionCard.setAttribute("data-bs-placement", "right");
    definitionCard.setAttribute("data-bs-trigger", "hover");
    definitionCard.id = definitionCardId;
    definitionCard.innerText = "Definition ".concat(index + 1);
    definitionCard.className = "text-primary fs-6 fw-lighter";
    definitionCard.style.width = "fit-content";
    definitionCard.style.cursor = "pointer";
    return definitionCard;
};
var generateMiscInfo = function (title, data) {
    var infoCard = document.createElement("div");
    infoCard.className = "d-flex flex-column flex-grow-1";
    var infoCardTitle = document.createElement("div");
    infoCardTitle.innerText = "".concat(title);
    infoCardTitle.className = "fs-5 fw-medium fst-italic text-center fw-lighter";
    var infoCardBody = document.createElement("div");
    // infoCardBody.className = "flex-wrap d-flex flex-row gap-2";
    infoCardBody.className = "text-info fs-6 fw-lighter text-center";
    infoCardBody.style.cursor = "pointer";
    var i = 0;
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var eachInfoDatum = data_1[_i];
        var eachInfoSpan = document.createElement("span");
        eachInfoSpan.className = "text-center";
        // eachInfoSpan.innerText = eachInfoDatum;
        eachInfoSpan.innerText = "- ".concat(i + 1, " -");
        eachInfoSpan.setAttribute("data-bs-toggle", "tooltip");
        eachInfoSpan.setAttribute("data-bs-title", eachInfoDatum);
        eachInfoSpan.setAttribute("data-bs-placement", "right");
        eachInfoSpan.setAttribute("data-bs-trigger", "hover");
        infoCardBody.appendChild(eachInfoSpan);
        i++;
    }
    infoCard.appendChild(infoCardTitle);
    infoCard.appendChild(infoCardBody);
    return infoCard;
};
var generateMiscInfoCard = function (definition) {
    var miscContainer = document.createElement("div");
    miscContainer.className = "d-flex flex-column justify-content-around gap-3";
    miscContainer.style.width = "100%";
    if (definition.synonyms.length > 0) {
        miscContainer.appendChild(generateMiscInfo("Synonyms", definition.synonyms));
    }
    if (definition.antonyms.length > 0) {
        miscContainer.appendChild(generateMiscInfo("Antonyms", definition.antonyms));
    }
    var isValid = definition.synonyms.length > 0 || definition.antonyms.length > 0;
    return isValid ? miscContainer : undefined;
};
var generateMeaningCard = function (meaning) {
    var baseCard = document.createElement("div");
    baseCard.className = "border rounded shadow px-3 pb-3 d-flex flex-column gap-3 overflow-y-scroll flex-grow-1 align-items-center";
    baseCard.style.maxHeight = "40vh";
    baseCard.addEventListener("scroll", function (event) {
        var divElem = event.target;
        var hoveredLink = divElem.querySelector("div:hover");
        if (hoveredLink !== null) {
            hideTooltip(hoveredLink.id);
        }
    });
    var baseCardTitle = document.createElement("div");
    baseCardTitle.className = "fst-italic fw-bold fs-5 pt-3 pb-2 px-3 text-center text-decoration-underline sticky-top text-nowrap";
    baseCardTitle.style.backgroundColor = "white";
    baseCardTitle.style.width = "100%";
    baseCardTitle.innerText = meaning.partOfSpeech;
    baseCard.appendChild(baseCardTitle);
    var i = 0;
    for (var _i = 0, _a = meaning.definitions; _i < _a.length; _i++) {
        var eachDefinition = _a[_i];
        baseCard.appendChild(generateDefinition(eachDefinition, i));
        // for (const eachDefinition of meaning.definitions) {
        //
        //   const infoCard = generateMiscInfoCard(eachDefinition);
        //   if (infoCard !== undefined) {
        //     baseCard.appendChild(infoCard);
        //   }
        // }
        i++;
    }
    for (var _b = 0, _c = meaning.definitions; _b < _c.length; _b++) {
        var eachDefinition = _c[_b];
        var infoCard = generateMiscInfoCard(eachDefinition);
        if (infoCard !== undefined) {
            baseCard.appendChild(infoCard);
        }
    }
    return baseCard;
};
var generateWordCard = function (word) {
    var mainCard = document.createElement("div");
    mainCard.className = "card";
    var cardBody = document.createElement("div");
    cardBody.className = "card-body";
    var cardTitle = document.createElement("div");
    cardTitle.className = "card-title";
    cardTitle.innerText = word.phonetic;
    var cardText = document.createElement("div");
    cardText.className = "card-text d-flex flex-row justify-content-around gap-4";
    for (var _i = 0, _a = word.meanings; _i < _a.length; _i++) {
        var eachMeaning = _a[_i];
        cardText.appendChild(generateMeaningCard(eachMeaning));
    }
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    mainCard.appendChild(cardBody);
    return mainCard;
};
window.onload = function () {
    var body = document.querySelector("body");
    body.style.fontFamily = "Quicksand, sans-serif";
    var formElement = document.getElementById(formId);
    formElement.onsubmit = function (event) { return __awaiter(_this, void 0, void 0, function () {
        var formInput, enteredWord, apiResponse, body, convertedBody, wordAccordion, i, _i, convertedBody_1, eachWord, eachWordAccordionItem, eachWordAccordionHeader, eachWordAccordionCollapse, eachWordAccordionBody, eachWordAccordionButton;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    formInput = document.querySelector("#defineform > input");
                    enteredWord = formInput.value;
                    return [4 /*yield*/, fetch("".concat(apiUrl).concat(enteredWord))];
                case 1:
                    apiResponse = _a.sent();
                    return [4 /*yield*/, apiResponse.json()];
                case 2:
                    body = _a.sent();
                    convertedBody = body;
                    console.log(convertedBody);
                    wordAccordion = document.getElementById(accordionId);
                    wordAccordion.innerHTML = "";
                    i = 0;
                    for (_i = 0, convertedBody_1 = convertedBody; _i < convertedBody_1.length; _i++) {
                        eachWord = convertedBody_1[_i];
                        eachWordAccordionItem = document.createElement("div");
                        eachWordAccordionItem.className = "accordion-item";
                        eachWordAccordionHeader = document.createElement("h2");
                        eachWordAccordionHeader.className = "accordion-header";
                        eachWordAccordionCollapse = document.createElement("div");
                        eachWordAccordionCollapse.id = "".concat(eachWord.word, "_").concat(i);
                        eachWordAccordionCollapse.className = "accordion-collapse collapse ".concat(i == 0 ? "show" : "");
                        eachWordAccordionCollapse.setAttribute("data-bs-parent", accordionId);
                        eachWordAccordionBody = document.createElement("div");
                        eachWordAccordionBody.className = "accordion-body";
                        eachWordAccordionBody.appendChild(generateWordCard(eachWord));
                        eachWordAccordionButton = document.createElement("button");
                        eachWordAccordionButton.className = "accordion-button ".concat(i == 0 ? "" : "collapsed");
                        eachWordAccordionButton.setAttribute("type", "button");
                        eachWordAccordionButton.setAttribute("data-bs-toggle", "collapse");
                        eachWordAccordionButton.setAttribute("data-bs-target", "#".concat(eachWord.word, "_").concat(i));
                        eachWordAccordionButton.setAttribute("aria-expanded", "true");
                        eachWordAccordionButton.setAttribute("aria-controls", "".concat(eachWord.word, "_").concat(i));
                        eachWordAccordionButton.innerHTML = "<span>".concat(i + 1, ")  <b>").concat(eachWord.word, "</b></span>");
                        eachWordAccordionHeader.appendChild(eachWordAccordionButton);
                        eachWordAccordionItem.appendChild(eachWordAccordionHeader);
                        eachWordAccordionCollapse.appendChild(eachWordAccordionBody);
                        eachWordAccordionItem.appendChild(eachWordAccordionCollapse);
                        wordAccordion.appendChild(eachWordAccordionItem);
                        i++;
                    }
                    activateTooltips();
                    return [2 /*return*/];
            }
        });
    }); };
};
