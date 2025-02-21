import masterLamdomaSeq from "./createLambdomaSeq.js";

const mainSection = document.getElementById("main");

export function createColumns() {
  masterLamdomaSeq.forEach((column, index) => {
    const thisRow = document.createElement("div");
    thisRow.setAttribute("id", `column-${index}`);
    // Buttons
    column.forEach((ratio) => {
      const thisButton = document.createElement("button");
      thisButton.setAttribute("id", `${ratio.numerator}-${ratio.denominator}`);
      thisButton.innerText = `${ratio.numerator}/${ratio.denominator}`;
      const thisRowEl = thisRow.insertAdjacentElement("afterbegin", thisButton);
      //console.log("thisRowEl", thisRowEl);
    });
    mainSection.insertAdjacentElement("afterbegin", thisRow);
  });
}