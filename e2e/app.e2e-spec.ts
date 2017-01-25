import { AngSisCampPage } from './app.po';

describe('ang-sis-camp App', function() {
  let page: AngSisCampPage;

  beforeEach(() => {
    page = new AngSisCampPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
