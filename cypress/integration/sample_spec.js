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

  it("You can update a car", () => {
    cy.visit(ROOT_DOMAIN);

    let id = null;

    // Find item on page
    cy.contains(newCarData.name)
      .parents("li")
      .invoke("attr", "data-id")
      .then((dataId) => {
        id = dataId;

        cy.contains(newCarData.name)
        .parents("li")
        .contains("Update")
          .click()
          .url()
          .should("eq", `${ROOT_DOMAIN}/cars/update/${id}`)
          
        cy.screenshot("update page");

        // Update the values
        cy.get('input[name="name"]').clear().type(updates.name);
        cy.get('input[name="bhp"]').clear().type(updates.bhp);
        cy.get('input[name="avatar_url"]').clear().type(updates.avatar_url);
// .type(`{meta+shift}{leftarrow}{del}`)
        cy.screenshot("form populated");

        cy.get('button[type="submit"]').click();

        // We'll be pushed back to the homepage
        cy.wait(200);

        // Verify updated car in list
        cy.contains(updates.name)
          .parents("li")
          .screenshot("updated item")
          .should("be.visible")
          .contains(updates.bhp)
          .parents("li")
          .children(".avatar")
          .invoke("attr", "src")
          .then((src) => {
            expect(src).to.equal(updates.avatar_url);
          });
      });
  });

  it("You can delete a car", () => {
    cy.visit(ROOT_DOMAIN);

    // find item and click delete button
    cy.contains(updates.name).parents("li").contains("Delete").click();

    // check it has been removed
    cy.contains(updates.name).should("not.exist");
    cy.screenshot("removed");

    // Reload and double-check
    cy.visit(ROOT_DOMAIN);
    cy.contains(updates.name).should("not.exist");
  });
});
