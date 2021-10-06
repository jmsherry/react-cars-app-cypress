/* global cy */
const newCarData = {
  name: "My new car",
  bhp: 123,
  avatar_url:
    "https://www.bugatti.com/fileadmin/_processed_/sei/p508/se-image-ac6ebcbfe2c9abf5d5b4b25909113e74.jpg",
};

const updates = {
  name: "My updated car",
  bhp: 666,
  avatar_url:
    "https://www.punx.uk/wp-content/uploads/productimages/ministry-jesus-built-my-hotrod-patch.jpg",
};

// let carId = null;

const ROOT_DOMAIN = "http://localhost:3000";

describe("Cars App", () => {
  it("Home page renders", () => {
    cy.visit(ROOT_DOMAIN);
    // Confirm page looks good. Can be used for visual regression testing
    cy.screenshot("homepage");
  });

  it("Add Car page renders", () => {
    cy.visit(`${ROOT_DOMAIN}/cars/add`);
    cy.screenshot("add page");
  });

  it("'Home' link works", () => {
    cy.visit(`${ROOT_DOMAIN}/cars/add`);
    cy.contains("Home").click();
    cy.url().should("eq", `${ROOT_DOMAIN}/`);
  });

  it("'Add Car' link works", () => {
    cy.visit(ROOT_DOMAIN);
    cy.contains("Add Car").click();
    cy.url().should("eq", `${ROOT_DOMAIN}/cars/add`);
  });

  it("You can add a car", () => {
    cy.visit(`${ROOT_DOMAIN}/cars/add`);

    cy.get('input[name="name"]').type(newCarData.name);
    cy.get('input[name="bhp"]').type(newCarData.bhp);
    cy.get('input[name="avatar_url"]').type(newCarData.avatar_url);

    cy.get('button[type="submit"]').click();

    cy.contains("Home").click();

    cy.contains(newCarData.name)
      .parents("li")
      .screenshot("added item")
      .should("be.visible")
      .contains(newCarData.bhp)
      .parents("li")
      .children(".avatar")
      .invoke("attr", "src")
      .then((src) => {
        expect(src).to.equal(newCarData.avatar_url);
      });
  });

});
