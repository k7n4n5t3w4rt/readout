/// <reference types="cypress" />

context("Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4000");
  });
  afterEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  // https://on.cypress.io/interacting-with-elements

  it("Route / | Renders ok", () => {
    cy.get("h1[data-cy=heading]").should("contain", "Readout");
    cy.get("h2[data-cy=subheading]").should(
      "contain",
      "A quick readout from the room.",
    );
  });
  // it("Route / | Plus and minus work ok", () => {
  //   cy.get("button[data-cy=plus]").click();
  //   cy.get("button[data-cy=plus]").click();
  //   cy.get("button[data-cy=plus]").click();
  //   cy.get("h2[data-cy=number-display]").should("contain", "4");
  //   cy.get("button[data-cy=minus]").click();
  //   cy.get("button[data-cy=minus]").click();
  //   cy.get("button[data-cy=minus]").click();
  //   cy.get("h2[data-cy=number-display]").should("contain", "1");
  // });
});
