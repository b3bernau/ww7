if (!window.VueWW) {
    window.VueWW = {};
}

window.VueWW.seriesPage = {
    props: [],
    data: function() {
        return {
            filterName: '',
            filterGenre: 'Tous',
            filterPlateformeDiffusion: 'Toutes',
            filterSalle: '',
            filterNote: '',
            series:[], 
        };
    },
    methods: {
        filteredList: function (series,filterName,filterGenre,filterPlateformeDiffusion,filterSalle,filterNote) {
            if(filterSalle){
                return series.filter(function(serie){
                    return serie.salle === filterSalle;
                })
            }
            if(filterNote){
                return series.filter(function(serie){
                    return serie.note === filterNote;
                })
            }
            if(filterGenre && filterGenre!='Tous'){
                return series.filter(function(serie){
                    return serie.genre === filterGenre;
                })
            }
            if(filterPlateformeDiffusion && filterPlateformeDiffusion!='Toutes'){
                return series.filter(function(serie){
                    return serie.plateformeDiffusion === filterPlateformeDiffusion;
                })
            }
            if(filterName){
                return series.filter(function(serie){
                    return serie.name.match(new RegExp(filterName,'i'));
                })
            }  

            else if(!filterName && filterGenre=='Tous' && filterPlateformeDiffusion=='Toutes'){
                return  [ ... series];
            }
        },
        testFunction: function(param){
            if(param.type=='salle'){
                this.filterSalle=param.state;
            } else if(param.type=='note'){
                this.filterNote=param.state;
            } else if(param.type=='genre'){
                this.filterGenre=param.state;
            } else if(param.type=='plateformeDiffusion'){
                this.filterPlateformeDiffusion=param.state;
            } else if(param.type=='name'){
                this.filterName=param.state;
            }
        },
        fetchItems(){
            let uri = 'http://localhost:8080/series';
            this.axios.get(uri).then((response) => {
                  console.log(response.data)
                  this.series = response.data;
              });
        }
    },
    created: async function() {
        this.fetchItems();
    },
    template: `
    <div class="container">
        <div class="row">
            <div class="col-md-2">
                <filters v-bind="{'type':'serie'}"
                    v-on:filter-event="testFunction($event)">
                </filters>
            </div>
            <div class="col-md-10">
                <div class="serie" v-for="serie in filteredList(series,filterName,filterGenre,filterPlateformeDiffusion,filterSalle,filterNote)"">
                    <series-list-item 
                        v-bind:id='serie.id'
                        v-bind:name='serie.name'
                        v-bind:img='serie.img'>
                    </series-list-item>
                </div>
            </div>
        </div>
    </div> 
    `
}; 