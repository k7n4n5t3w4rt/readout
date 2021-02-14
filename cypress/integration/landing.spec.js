// @Flow
/// <reference types="cypress" />

context("Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4000");
  });
  afterEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it("Route / | Has the pole1 and pole2 input fields", () => {
    cy.get("input[data-cy=pole1]").should("exist");
    cy.get("input[data-cy=pole2]").should("exist");
  });

  it("Route /| The GO button is present", () => {
    cy.get("button[data-cy=go]").should("be", "visible");
  });

  it("Route /| The GO button submits the form", () => {
    cy.server({
      delay: 1000,
      status: 200,
    });
    cy.fixture("dyad-save_response").then((dyadSaveResponseJSON) => {
      cy.route({
        method: "GET",
        url: "/dyad-save*",
        response: JSON.stringify(dyadSaveResponseJSON),
        onRequest: (xhr) => {
          // do something with the
          // raw XHR object when the
          // request initially goes out
          console.log(response);
        },
      });
      cy.get("input[data-cy=pole1]").type("Pole One");
      cy.get("input[data-cy=pole2]").type("Pole Two");
      cy.get("button[data-cy=go]").click({ force: true });
      cy.location("search").should(
        "contain",
        "?pole1=Pole%20One&pole2=Pole%20Two&sessionId=",
      );
      cy.get("div[data-cy=pole1]").should("contain", "Pole One");
      cy.get("div[data-cy=pole2]").should("contain", "Pole Two");
    });
  });
});
