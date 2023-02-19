const { faker } = require('@faker-js/faker');

const randomProductName = faker.commerce.productName();
const randomProductDescription = faker.commerce.productDescription();
const randomStok = faker.random.numeric(2);

describe('Produk Feature kasirAja', () => {

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
      cy.get('a[href="/products"]').should('be.visible').click();
      cy.get('a[href="/products/create"]', {timeout:5000}).should('be.visible');
      cy.url().should('include', '/products');
    })
  
    it('User can not add new product without fill any field', () => {
      cy.get('a[href="/products/create"]').should('be.visible').click();
      cy.get('#kode').should('be.visible');
      cy.get('#nama').should('be.visible').and('be.empty');
      cy.get('#deskripsi').should('be.visible').and('be.empty');
      cy.get('label[for="harga beli"] + input').should('be.visible').and('be.empty');
      cy.get('label[for="harga jual"] + input').should('be.visible').and('be.empty');
      cy.get('#stok').should('be.visible').and('be.empty');
      cy.get('#kategori').should('be.visible');
      cy.get('button.chakra-button').should('be.visible').click();
      cy.get('div[role="alert"]', {timeout:5000}).scrollIntoView().should('be.visible');
      cy.get('div[role="alert"]').should($elm => {
        expect($elm[0].outerText).to.contain('\"name\" is not allowed to be empty');
      })
    });

    it('User can not add new product if only fill name field', () => {
      cy.get('a[href="/products/create"]').should('be.visible').click();
      cy.get('#kode').should('be.visible');
      cy.get('#nama').should('be.visible').type(randomProductName);
      cy.get('#deskripsi').should('be.visible').and('be.empty');
      cy.get('label[for="harga beli"] + input').should('be.visible').and('be.empty');
      cy.get('label[for="harga jual"] + input').should('be.visible').and('be.empty');
      cy.get('#stok').should('be.visible').and('be.empty');
      cy.get('#kategori').should('be.visible');
      cy.get('button.chakra-button').should('be.visible').click();
      cy.get('div[role="alert"]', {timeout:5000}).scrollIntoView().should('be.visible');
      cy.get('div[role="alert"]').should($elm => {
        expect($elm[0].outerText).to.contain('\"cost\" must be greater than 0');
      })
    });

    it('User can not add new product if harga beli = harga jual', () => {
      cy.get('a[href="/products/create"]').should('be.visible').click();
      cy.get('#kode').should('be.visible');
      cy.get('#nama').should('be.visible').type(randomProductName);
      cy.get('#deskripsi').should('be.visible').type(randomProductDescription);
      cy.get('label[for="harga beli"] + input').should('be.visible').type('1');
      cy.get('label[for="harga jual"] + input').should('be.visible').and('be.empty');
      cy.get('#stok').should('be.visible').and('be.empty');
      cy.get('#kategori').should('be.visible');
      cy.get('button.chakra-button').should('be.visible').click();
      cy.get('div[role="alert"]', {timeout:5000}).scrollIntoView().should('be.visible');
      cy.get('div[role="alert"]').should($elm => {
        expect($elm[0].outerText).to.contain('\"price\" must be greater than ref:cost');
      })
    });

    it('User can not add new product if not choose kategori', () => {
      cy.get('a[href="/products/create"]').should('be.visible').click();
      cy.get('#kode').should('be.visible');
      cy.get('#nama').should('be.visible').type(randomProductName);
      cy.get('#deskripsi').should('be.visible').type(randomProductDescription);
      cy.get('label[for="harga beli"] + input').should('be.visible').type('1');
      cy.get('label[for="harga jual"] + input').should('be.visible').type('2');
      cy.get('#stok').should('be.visible').clear().type(randomStok);
      cy.get('#kategori').should('be.visible');
      cy.get('button.chakra-button').should('be.visible').click();
      cy.get('div[role="alert"]', {timeout:5000}).scrollIntoView().should('be.visible');
      cy.get('div[role="alert"]').should($elm => {
        expect($elm[0].outerText).to.contain('\"category_id\" is required');
      })
    });

    it('User can add new product by fill all field with valid data', () => {
        cy.get('a[href="/products/create"]').should('be.visible').click();
        cy.get('#kode').should('be.visible');
        cy.get('#nama').should('be.visible').type(randomProductName);
        cy.get('#deskripsi').should('be.visible').type(randomProductDescription);
        cy.get('label[for="harga beli"] + input').should('be.visible').type('1');
        cy.get('label[for="harga jual"] + input').should('be.visible').type('2');
        cy.get('#stok').should('be.visible').clear().type(randomStok);
        cy.get('#kategori').should('be.visible').click()
        cy.get('tbody tr td').then(($elm)=>{
           const randomIndex = Math.floor(Math.random() * $elm.length);
           const randomOption = $elm.eq(randomIndex);
           cy.wrap(randomOption).click();
        })
        cy.get('button.chakra-button').should('be.visible').click();
        cy.get('div[role="alert"]', {timeout:5000}).scrollIntoView().should('be.visible');
        cy.get('.chakra-alert__title').should($elm => {
           expect($elm[0].outerText).to.contain('success');
        })
        cy.get('.chakra-alert__desc').should($elm => {
           expect($elm[0].outerText).to.contain('item ditambahkan');
        })
        cy.reload();
        cy.get('tbody tr[role="row"]:first-child td:first-child + td').should($elm => {
           expect($elm[0].outerText).to.contain(randomProductName);
        })
        cy.get('tbody tr[role="row"]:first-child td:nth-child(9)').scrollIntoView().should($elm => {
            expect($elm[0].outerText).to.contain(randomProductDescription);
         })
    });
})