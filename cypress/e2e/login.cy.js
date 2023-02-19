describe('Login Feature kasirAja', () => {

  beforeEach(() =>{
    cy.visit('https://kasirdemo.belajarqa.com');
    cy.url().should('include', '/login');
  })

  it('User can not login without fill any field', () => {
    cy.get('#email').should('be.visible').and('be.empty');
    cy.get('#password').should('be.visible').and('be.empty');
    cy.get('button[type="submit"]').should('be.visible').click();
    cy.get('div[role="alert"]', {timeout:5000}).should('be.visible');
    cy.get('div[role="alert"]').should($elm => {
      expect($elm[0].outerText).to.contain('\"email\" is not allowed to be empty');
    })
  });

  it('User can not login with invalid email', () => {
    cy.get('#email').should('be.visible').type('invalid@email');
    cy.get('#password').should('be.visible').and('be.empty');
    cy.get('button[type="submit"]').should('be.visible').click();
    cy.get('div[role="alert"]', {timeout:5000}).should('be.visible');
    cy.get('div[role="alert"]').should($elm => {
      expect($elm[0].outerText).to.contain('\"email\" must be a valid email');
    })
  });

  it('User can not login without fill password field', () => {
    cy.get('#email').should('be.visible').type('tokop@edi.com');
    cy.get('#password').should('be.visible').and('be.empty');
    cy.get('button[type="submit"]').should('be.visible').click();
    cy.get('div[role="alert"]', {timeout:5000}).should('be.visible');
    cy.get('div[role="alert"]').should($elm => {
      expect($elm[0].outerText).to.contain('\"password\" is not allowed to be empty');
    })
  });

  it('User can not login with invalid credentials', () => {
    cy.get('#email').should('be.visible').type('tokop@edi.com');
    cy.get('#password').should('be.visible').type('asalasal');
    cy.get('button[type="submit"]').should('be.visible').click();
    cy.get('div[role="alert"]', {timeout:5000}).should('be.visible');
    cy.get('div[role="alert"]').should($elm => {
      expect($elm[0].outerText).to.contain('Kredensial yang Anda berikan salah');
    })
  });

  it('User can login with valid credentials', () => {
    cy.get('#email').should('be.visible').type('tokop@edi.com');
    cy.get('#password').should('be.visible').type('larismanis');
    cy.get('button[type="submit"]').should('be.visible').click();
    cy.get('h3.chakra-heading', {timeout:5000}).should('be.visible');
    cy.get('h3.chakra-heading').should($elm => {
      expect($elm[0].outerText).to.contain('kasirAja');
    })
    cy.url().should('include', '/dashboard');
  });
})