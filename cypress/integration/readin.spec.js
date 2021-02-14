/// <reference types="cypress" />

context("Actions", () => {
  beforeEach(() => {});
  afterEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  // https://on.cypress.io/interacting-with-elements

  it("Route /readin | Has pole1 and pole2 from the query string", () => {
    cy.server({
      delay: 1000,
      status: 200,
    });
    cy.fixture("dyad-read_response").then((dyadReadResponseJSON) => {
      cy.route({
        method: "GET",
        url: "/dyad-read*",
        response: JSON.stringify(dyadReadResponseJSON),
        onRequest: (xhr) => {
          // do something with the
          // raw XHR object when the
          // request initially goes out
          console.log(response);
        },
      });
      cy.visit(
        "http://localhost:4000/readin?pole1=Pole%20One&pole2=Pole%20Two&sessionId=1610882364201",
      );
      cy.get("div[data-cy=pole1]").should("contain", "Pole One");
      cy.get("div[data-cy=pole2]").should("contain", "Pole Two");
    });
  });

  it("Route /readin | Has default values when pole1 and pole2 are not in the query string", () => {
    cy.server({
      delay: 1000,
      status: 200,
    });
    cy.fixture("dyad-read_response").then((dyadReadResponseJSON) => {
      cy.route({
        method: "GET",
        url: "/dyad-read*",
        response: JSON.stringify(dyadReadResponseJSON),
        onRequest: (xhr) => {
          // do something with the
          // raw XHR object when the
          // request initially goes out
          console.log(response);
        },
      });
      cy.visit("http://localhost:4000/readin");
      cy.get("div[data-cy=pole1]").should("contain", "Left");
      cy.get("div[data-cy=pole2]").should("contain", "Right");
      cy.visit("http://localhost:4000/readin?pole1=PoleOne");
      cy.get("div[data-cy=pole1]").should("contain", "PoleOne");
      cy.get("div[data-cy=pole2]").should("contain", "Right");
      cy.visit("http://localhost:4000/readin?pole2=PoleTwo");
      cy.get("div[data-cy=pole1]").should("contain", "Left");
      cy.get("div[data-cy=pole2]").should("contain", "PoleTwo");
    });
  });

  it("Route /readin | The fullscreen button is present", () => {
    cy.server({
      delay: 1000,
      status: 200,
    });
    cy.fixture("dyad-read_response").then((dyadReadResponseJSON) => {
      cy.route({
        method: "GET",
        url: "/dyad-read*",
        response: JSON.stringify(dyadReadResponseJSON),
        onRequest: (xhr) => {
          // do something with the
          // raw XHR object when the
          // request initially goes out
          console.log(response);
        },
      });
      cy.visit("http://localhost:4000/readin");
      cy.get("div[data-cy=fullscreen]").should("be", "visible");
    });
  });
});
