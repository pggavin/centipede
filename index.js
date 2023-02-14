// Copyright (C) 2022 Scott Henshaw

import Apple from './scripts/Apple.js'
import App from './scripts/App.js'

import Game from './scripts/Game.js'
let a = new Apple(120);

document.addEventListener('DOMContentLoaded', event => {
    // Our code goes here....
    // const app = new App()
    const app = new App();
    app.sampleDOMInteraction();
    app.buildTheTable();
    // Build the table
    app.initHandlers();
    app.run();
})
/*

<table>
        <tr>
            <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
        </tr>
</table>

*/