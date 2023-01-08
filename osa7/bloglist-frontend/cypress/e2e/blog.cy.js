describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", "http:localhost:3003/api/testing/reset");
    const user = {
      name: "Matti Luukkainen",
      username: "mare",
      password: "1234",
    };
    cy.request("POST", "http:localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  describe("Login", function () {
    it("Login form is shown", function () {
      cy.contains("blogs");
    });
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("mare");
      cy.get("#password").type(1234);
      cy.get("#login-button").click();

      cy.contains("logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("mare");
      cy.get("#password").type(123);
      cy.get("#login-button").click();

      cy.contains("error");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("mare");
      cy.get("#password").type(1234);
      cy.get("#login-button").click();
    });
    it("succeeds with correct credentials", function () {
      cy.contains("create a new blog").click();
      cy.get("#author").type("kirjoittaja");
      cy.get("#url").type("google.fi");
      cy.get("#title").type("title");
      cy.get("#submit-blog").click();
      cy.contains("kirjoittaja");
    });
    it("can like blogs", function () {
      cy.contains("create a new blog").click();
      cy.get("#author").type("kirjoittaja");
      cy.get("#url").type("google.fi");
      cy.get("#title").type("title");
      cy.get("#submit-blog").click();
      cy.contains("view").click();
      cy.contains("like").click();
      cy.contains("likes: 1");
      cy.contains("like").click();
      cy.contains("likes: 2");
    });
    it("can delete blogs", function () {
      cy.contains("create a new blog").click();
      cy.get("#author").type("kirjoittaja");
      cy.get("#url").type("google.fi");
      cy.get("#title").type("title");
      cy.get("#submit-blog").click();
      cy.contains("view").click();
      cy.contains("remove").click();
      cy.contains("kirjoittaja").should("not.exist");
    });
    it("blogs are in order", function () {
      cy.contains("create a new blog").click();
      cy.get("#author").type("kirjoittaja 1");
      cy.get("#url").type("google.fi");
      cy.get("#title").type("title");
      cy.get("#submit-blog").click();
      cy.contains("view").click();

      cy.get("#author").type("kirjoittaja 2");
      cy.get("#url").type("google.fi 2");
      cy.get("#title").type("title 2");
      cy.get("#submit-blog").click();
      cy.contains("view").click();
      cy.get(".like").eq(1).click();
      cy.get(".like").eq(1).click();

      cy.get(".blog").should("have.length", 2);
      cy.get(".blog").eq(0).should("contain", "kirjoittaja 2");
      cy.get(".blog").eq(1).should("contain", "kirjoittaja 1");
    });
  });
});
