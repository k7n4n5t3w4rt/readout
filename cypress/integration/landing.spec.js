/// <reference types="cypress" />

context("Actions", () => {
  beforeEach(() => {
    // cy.visit("http://localhost:4000?pole1=PoleOne&pole2=PoleTwo");
  });
  afterEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  // https://on.cypress.io/interacting-with-elements

  it("Route / | Has pole1 and pole2 from the query string", () => {
    cy.visit("http://localhost:4000?pole1=PoleOne&pole2=PoleTwo");
    cy.get("div[data-cy=pole1]").should("contain", "PoleOne");
    cy.get("div[data-cy=pole2]").should("contain", "PoleTwo");
  });

  it("Route / | Has default values when pole1 and pole2 are not in the query string", () => {
    cy.visit("http://localhost:4000");
    cy.get("div[data-cy=pole1]").should("contain", "Left");
    cy.get("div[data-cy=pole2]").should("contain", "Right");
    cy.visit("http://localhost:4000/?pole1=PoleOne");
    cy.get("div[data-cy=pole1]").should("contain", "PoleOne");
    cy.get("div[data-cy=pole2]").should("contain", "Right");
    cy.visit("http://localhost:4000/?pole2=PoleTwo");
    cy.get("div[data-cy=pole1]").should("contain", "Left");
    cy.get("div[data-cy=pole2]").should("contain", "PoleTwo");
  });

  it("Route / | The fullscreen button is present", () => {
    cy.visit("http://localhost:4000");
    cy.get("div[data-cy=fullscreen]").should("be", "visible");
  });

  it("Route / | The GO button is present", () => {
    cy.visit("http://localhost:4000");
    cy.get("button[data-cy=go]").should("be", "visible");
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
