import API from './API';
import Excursions from './Excursions';



document.addEventListener('DOMContentLoaded', init);

function init() {
    console.log('DOM');

    const api = new API();
    const excursions = new Excursions(api);
    
    excursions.load();
    excursions.remove();
    excursions.add();
    excursions.update();
} 