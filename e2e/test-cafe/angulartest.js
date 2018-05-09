import { Selector } from 'testcafe'; // first import testcafe selectors

import { AngularSelector, waitForAngular } from 'testcafe-angular-selectors';

fixture `App tests`
    .page('http://angular-app-url')
    .beforeEach(async () => {
        await waitForAngular();
    });

test('test', async t => {
    const firstListItem = AngularSelector('list list-item');
});