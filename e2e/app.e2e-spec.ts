import { StudentsPage } from './app.po';

describe('students App', () => {
  let page: StudentsPage;

  beforeEach(() => {
    page = new StudentsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
