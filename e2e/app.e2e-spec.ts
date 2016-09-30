import { PersonalIoPage } from './app.po';

describe('personal-io App', function() {
  let page: PersonalIoPage;

  beforeEach(() => {
    page = new PersonalIoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
