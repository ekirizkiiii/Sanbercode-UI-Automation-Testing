const { faker } = require('@faker-js/faker');

const randomCategory = faker.commerce.product();
const randomDescription = faker.lorem.sentence();

describe('Kategori Feature kasirAja', () => {

    beforeEach(() =>{
      cy.visit('https://kasirdemo.belajarqa.com');
      cy.url().should('include', '/login');
      cy.get('#email').should('be.visible').type('tokop@edi.com');
      cy.get('#password').should('be.visible').type('larismanis');
      cy.get('button[type="submit"]').should('be.visible').click();
      cy.get('h3.chakra-heading', {timeout:5000}).should('be.visible');
      cy.get('h3.chakra-heading').should($elm => {
        expect($elm[0].outerText).to.contain('kasirAja');
      })
      cy.url().should('include', '/dashboard');
      cy.get('a[href="/categories"]').should('be.visible').click();
      cy.get('a[href="/categories/create"]', {timeout:5000}).should('be.visible');
      cy.url().should('include', '/categories');
    })
  
    it('User can not add new category without fill any field', () => {
      cy.get('a[href="/categories/create"]').should('be.visible').click();
      cy.get('#nama').should('be.visible').and('be.empty');
      cy.get('#deskripsi').should('be.visible').and('be.empty');
      cy.get('button.chakra-button').should('be.visible').click();
      cy.get('div[role="alert"]', {timeout:5000}).should('be.visible');
      cy.get('div[role="alert"]').should($elm => {
        expect($elm[0].outerText).to.contain('\"name\" is not allowed to be empty');
      })
    });
  
    it('User can add new category without fill deskripsi field', () => {
      cy.get('a[href="/categories/create"]').should('be.visible').click();
      cy.get('#nama').should('be.visible').type(randomCategory);
      cy.get('#deskripsi').should('be.visible').and('be.empty');
      cy.get('button.chakra-button').should('be.visible').click();
      cy.get('div[role="alert"]', {timeout:5000}).should('be.visible');
      cy.get('.chakra-alert__title').should($elm => {
        expect($elm[0].outerText).to.contain('success');
      })
      cy.get('.chakra-alert__desc').should($elm => {
        expect($elm[0].outerText).to.contain('item ditambahkan');
      })
      cy.reload();
      cy.get('tbody tr[role="row"]:first-child td:first-child').should($elm => {
        expect($elm[0].outerText).to.contain(randomCategory);
      })
    });

    it('User can add new category by fill all field', () => {
        cy.get('a[href="/categories/create"]').should('be.visible').click();
        cy.get('#nama').should('be.visible').type(randomCategory);
        cy.get('#deskripsi').should('be.visible').type(randomDescription);
        cy.get('button.chakra-button').should('be.visible').click();
        cy.get('div[role="alert"]', {timeout:5000}).should('be.visible');
        cy.get('.chakra-alert__title').should($elm => {
          expect($elm[0].outerText).to.contain('success');
        })
        cy.get('.chakra-alert__desc').should($elm => {
          expect($elm[0].outerText).to.contain('item ditambahkan');
        })
        cy.reload();
        cy.get('tbody tr[role="row"]:first-child td:first-child').should($elm => {
          expect($elm[0].outerText).to.contain(randomCategory);
        })
        cy.get('tbody tr[role="row"]:first-child td:first-child + td').should($elm => {
            expect($elm[0].outerText).to.contain(randomDescription);
          })
    });
})