/// <reference types="cypress" />

context("Actions", () => {
  beforeEach(() => {});
  afterEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  // https://on.cypress.io/interacting-with-elements

  it("Route /readout | Has pole1 and pole2 from the query string", () => {
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
        "http://localhost:4000/readout?question=VG8gYmUgb3Igbm90IHRvIGJlPw==&pole1=UG9sZSBPbmU=&pole2=UG9sZSBUd28=&sessionId=1626233154638",
      );
      cy.get("p[data-cy=question]").should("contain", "To be or not to be?");
      cy.get("div[data-cy=pole1]").should("contain", "Pole One");
      cy.get("div[data-cy=pole2]").should("contain", "Pole Two");
    });
  });

  it.only("Route /readin | Has default values when pole1 and pole2 are not in the query string", () => {
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
      cy.get("p[data-cy=question]").should("contain", "");
      cy.get("div[data-cy=pole1]").should("contain", "Left");
      cy.get("div[data-cy=pole2]").should("contain", "Right");
      cy.visit("http://localhost:4000/readin?pole1=UG9sZSBPbmU=");
      cy.get("p[data-cy=question]").should("contain", "");
      cy.get("div[data-cy=pole1]").should("contain", "Pole One");
      cy.get("div[data-cy=pole2]").should("contain", "Right");
      cy.visit("http://localhost:4000/readin?pole2=UG9sZSBUd28=");
      cy.get("p[data-cy=question]").should("contain", "");
      cy.get("div[data-cy=pole1]").should("contain", "Left");
      cy.get("div[data-cy=pole2]").should("contain", "Pole Two");
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
