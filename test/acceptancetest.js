Feature('Internal Home SPA Page');

Before((I) => {

});

BeforeSuite((I) => {

});

AfterSuite((I) => {

})

Scenario('IH:Tests1: Check that I can see Announcement on the home page as a header for our Announcements', (I) => {
	I.amOnPage('/');
	I.see('Express');
  I.see('Welcome to Express');

  I.amOnPage('/page2')
  I.see('Shamus & Aimee Page')
  I.click('Home Page')
  I.see('Express');

  I.click('Shamus and Aimee Page')
  I.seeInCurrentUrl('page2')

});
