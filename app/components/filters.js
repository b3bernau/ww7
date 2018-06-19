if (!window.VueWW) {
    window.VueWW = {};
}

window.VueWW.filters = {
    props: ['type'],
    data: function() {
        return {
            filterName: '',
            filterGenre: '',
            filterPlateformeDiffusion: '',
            filterSalle: '',
            filterNote: '',
            movies:[], 
        };
    },
    methods: {},
    mounted: function() {
        if(this.type=="movie"){
            document.getElementById("listBoxGenre").style.visibility="visible";
            document.getElementById("listBoxPlateformeDiffusion").style.visibility="visible";
            document.getElementById("checkBoxVF").style.visibility="hidden";
            document.getElementById("checkBoxVOSTFR").style.visibility="hidden";
            document.getElementById("checkBoxSalle").style.visibility="visible";
            document.getElementById("noteRange").style.visibility="visible";
        } else if(this.type=="serie"){
            document.getElementById("listBoxGenre").style.visibility="visible";
            document.getElementById("listBoxPlateformeDiffusion").style.visibility="visible";
            document.getElementById("checkBoxVF").style.visibility="visible";
            document.getElementById("checkBoxVOSTFR").style.visibility="visible";
            document.getElementById("checkBoxSalle").style.visibility="hidden";
            document.getElementById("noteRange").style.visibility="visible";
        }

    },
    template: `
        <div>
            <div>
                <input id="searchBar" v-model="filterName" class="searchInput" placeholder="Search">
                <button type="button" class="btn btn-link" id="boutonRechercher"
                    v-on:click="$emit('filter-event',{ type: 'name', 'state': filterName})">
                    <span class="search fa fa-search"></span></button>
            </div>
            <div class="form-group" id="listBoxGenre">
                <label>Genre :</label>
                <select class="form-control" 
                    v-model="filterGenre"
                    v-on:change="$emit('filter-event',{ type: 'genre', 'state': filterGenre})">

                    <option>Tous</option>
                    <option>Action</option>
                    <option>Animation</option>
                    <option>Aventure</option>
                    <option>Biographique</option>
                    <option>Catastrophe</option>
                    <option>Comédie</option>
                    <option>Documentaire</option>
                    <option>Dramatique</option>
                    <option>Espionnage</option>
                    <option>Fantastique</option>
                    <option>Historique</option>
                    <option>Horreur</option>
                    <option>Musical</option>
                    <option>Policier</option>
                    <option>Romantique</option>
                    <option>Science fiction</option>
                    <option>Super héros</option>
                    <option>Thriller</option>
                    <option>Western</option>
                </select>
            </div>
            <div class="form-group" id="listBoxPlateformeDiffusion">
                <label>Plateforme de diffusion :</label>
                <select class="form-control" selectedIndex=0 
                    v-model="filterPlateformeDiffusion"
                    v-on:change="$emit('filter-event',{ type: 'plateformeDiffusion', 'state': filterPlateformeDiffusion})">

                    <option>Toutes</option>
                    <option>AMC</option>
                    <option>Amazon Prime Vidéos</option>
                    <option>Canal Play</option>
                    <option>FOX</option>
                    <option>Google Play Movies</option>
                    <option>HBO</option>
                    <option>History</option>
                    <option>Itunes</option>
                    <option>Netflix</option>
                    <option>OCS</option>
                    <option>SFR Play</option>
                </select>
            </div>
            <div class="form-check" id="checkBoxVF">
              <input class="form-check-input" type="checkbox" value="" onClick="VFChecked()">
              <label class="form-check-label" for="checkBoxVF">VF</label>
            </div>
            <div class="form-check" id="checkBoxVOSTFR">
              <input class="form-check-input" type="checkbox" value="" onClick="VOSTFRChecked()">
              <label class="form-check-label" for="checkBoxVOSTFR">VOSTFR</label>
            </div>
            <div class="form-check" id="checkBoxSalle">
              <input class="form-check-input" type="checkbox" value=""  
                    v-model="filterSalle" 
                    v-on:change="$emit('filter-event',{ type: 'salle', 'state': filterSalle})">
              <label class="form-check-label" for="checkBoxEnSalle">En salle</label>
            </div>
            <div class="form-group" id="noteRange">
                <label for="formControlRange">Note (★)</label>
                <input type="range" class="form-control-range" value="1" min="0" max="5" step="1" list="tickmarks"  
                    v-model="filterNote"
                    v-on:change="$emit('filter-event',{ type: 'note', 'state': filterNote})">
                <datalist id="tickmarks">
                  <option value="0"></option>
                  <option value="1"></option>
                  <option value="2"></option>
                  <option value="3"></option>
                  <option value="4"></option>
                  <option value="5"></option>
                </datalist>
            </div>
        </div>
    `
}; 
