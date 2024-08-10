interface Word {
  word: string
  phonetic: string
  phonetics: Phonetic[]
  origin: string
  meanings: Meaning[]
}

interface Phonetic {
  text: string
  audio?: string
}

interface Meaning {
  partOfSpeech: string
  definitions: Definition[]
}

interface Definition {
  definition: string
  example: string
  synonyms: any[]
  antonyms: any[]
}

const formId = "defineform";
const accordionId = "wordAccordion";
const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/"

const activateTooltips = () => {
  // @ts-ignore
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  // @ts-ignore
  [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

const hideTooltip = (tooltipContainerId: string) => {

  if (tooltipContainerId.length > 0) {
    // @ts-ignore
    const foundTooltip = bootstrap.Tooltip.getInstance(`#${tooltipContainerId}`);

    // @ts-ignore
    foundTooltip.hide();
  }
}



const generateDefinition = (definition: Definition, index: number): HTMLDivElement => {
    const definitionCard = document.createElement("div");
    const definitionCardId = `definition_tooltip_container_${index}`;

    definitionCard.setAttribute("data-bs-toggle", "tooltip");
    definitionCard.setAttribute("data-bs-title", definition.definition);
    definitionCard.setAttribute("data-bs-placement", "right");
    definitionCard.setAttribute("data-bs-trigger", "hover");
    definitionCard.id = definitionCardId;

    definitionCard.innerText = `Definition ${index + 1}`;
    definitionCard.className = "text-primary fs-6 fw-lighter";
    definitionCard.style.cursor = "pointer";

    return definitionCard;
}

const generateMeaningCard = (meaning: Meaning): HTMLDivElement => {

  const baseCard = document.createElement("div");
  baseCard.className = "border rounded shadow px-3 pb-3 d-flex flex-column gap-3 overflow-y-scroll";
  baseCard.style.maxHeight = "40vh";

  baseCard.addEventListener("scroll", (event) => {
      const divElem: HTMLDivElement = event.target as HTMLDivElement;

      const hoveredLink = divElem.querySelector("div:hover");
      if (hoveredLink !== null) {
        hideTooltip(hoveredLink.id);
      }


  });


  const baseCardTitle = document.createElement("div");
  baseCardTitle.className = "fst-italic fs-5 pt-3 pb-2 px-3 text-center text-decoration-underline sticky-top"
  baseCardTitle.style.backgroundColor = "white";
  baseCardTitle.innerText = meaning.partOfSpeech;

  baseCard.appendChild(baseCardTitle);

  let i = 0;
  for (const eachDefinition of meaning.definitions) {
    baseCard.appendChild(generateDefinition(eachDefinition, i));
    i++;
  }

  return baseCard;
}

const generateWordCard = (word: Word): HTMLDivElement => {

  const mainCard = document.createElement("div");
  mainCard.className = "card";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardTitle = document.createElement("div");
  cardTitle.className = "card-title";
  cardTitle.innerText = word.phonetic;

  const cardText = document.createElement("div");
  cardText.className = "card-text d-flex flex-row justify-content-around";

  for (const eachMeaning of word.meanings) {
    cardText.appendChild(generateMeaningCard(eachMeaning));
  }

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  mainCard.appendChild(cardBody);

  /*

  <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>

   */

  return mainCard;

}

window.onload = () => {

  const body = document.querySelector("body");
  body.style.fontFamily = "Quicksand, sans-serif";

  const formElement = document.getElementById(formId);

  formElement.onsubmit = async (event) => {
    event.preventDefault();
    const formInput: HTMLInputElement = document.querySelector("#defineform > input");
    const enteredWord = formInput.value;
    const apiResponse = await fetch(`${apiUrl}${enteredWord}`);
    const body = await apiResponse.json();
    const convertedBody = body as Word[];

    console.log(convertedBody);

    const wordAccordion: HTMLUListElement = document.getElementById(accordionId) as unknown as HTMLUListElement;
    wordAccordion.innerHTML = "";

    let i = 0;
    for (const eachWord of convertedBody) {
      const eachWordAccordionItem = document.createElement("div");
      eachWordAccordionItem.className = "accordion-item";

      const eachWordAccordionHeader = document.createElement("h2");
      eachWordAccordionHeader.className = "accordion-header"

      const eachWordAccordionCollapse = document.createElement("div");
      eachWordAccordionCollapse.id = `${eachWord.word}_${i}`;
      eachWordAccordionCollapse.className = `accordion-collapse collapse ${i == 0 ? "show" : ""}`;
      eachWordAccordionCollapse.setAttribute("data-bs-parent", accordionId);

      const eachWordAccordionBody = document.createElement("div");
      eachWordAccordionBody.className = "accordion-body";
      eachWordAccordionBody.appendChild(generateWordCard(eachWord));

      const eachWordAccordionButton = document.createElement("button");
      eachWordAccordionButton.className = `accordion-button ${i == 0 ? "" : "collapsed"}`;
      eachWordAccordionButton.setAttribute("type", "button");
      eachWordAccordionButton.setAttribute("data-bs-toggle", "collapse");
      eachWordAccordionButton.setAttribute("data-bs-target", `#${eachWord.word}_${i}`);
      eachWordAccordionButton.setAttribute("aria-expanded", "true");
      eachWordAccordionButton.setAttribute("aria-controls", `${eachWord.word}_${i}`);
      eachWordAccordionButton.innerHTML = `<span>${i + 1})  <b>${eachWord.word}</b></span>`;

      // // wrap it all together folks
      eachWordAccordionHeader.appendChild(eachWordAccordionButton);
      eachWordAccordionItem.appendChild(eachWordAccordionHeader);

      // where we put out content (eachWordAccordionBody)
      eachWordAccordionCollapse.appendChild(eachWordAccordionBody);

      eachWordAccordionItem.appendChild(eachWordAccordionCollapse);
      wordAccordion.appendChild(eachWordAccordionItem);

      i++;
    }

    activateTooltips();
  }
}