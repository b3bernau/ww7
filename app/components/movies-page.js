if (!window.VueWW) {
    window.VueWW = {};
}

window.VueWW.moviesPage = {
    props: [],
    data: function() {
        return {
            filterName: '',
            filterGenre: 'Tous',
            filterPlateformeDiffusion: 'Toutes',
            filterSalle: '',
            filterNote: '',
            movies:[],
        };
    },
    methods: {
        filteredList: function (movies,filterName,filterGenre,filterPlateformeDiffusion,filterSalle,filterNote) {
            if(filterSalle){
                return movies.filter(function(movie){
                    return movie.salle === filterSalle;
                })
            }
            if(filterNote){
                return movies.filter(function(movie){
                    return movie.note === filterNote;
                })
            }
            if(filterGenre && filterGenre!='Tous'){
                return movies.filter(function(movie){
                    return movie.genre === filterGenre;
                })
            }
            if(filterPlateformeDiffusion && filterPlateformeDiffusion!='Toutes'){
                return movies.filter(function(movie){
                    return movie.plateformeDiffusion === filterPlateformeDiffusion;
                })
            }
            if(filterName){
                return movies.filter(function(movie){
                    return movie.name.match(new RegExp(filterName,'i'));
                })
            }  

            else if(!filterName && filterGenre=='Tous' && filterPlateformeDiffusion=='Toutes'){
                return  [ ... movies];
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
            let uri = 'http://localhost:8080/movies';
            this.axios.get(uri).then((response) => {
                  console.log(response.data)
                  this.movies = response.data;
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
                <filters v-bind="{'type':'movie'}"
                    v-on:filter-event="testFunction($event)">
                </filters>
            </div>
            <div class="col-md-10">
                <div class="movie" v-for="movie in filteredList(movies,filterName,filterGenre,filterPlateformeDiffusion,filterSalle,filterNote)"">
                    <movies-list-item 
                        v-bind:id='movie.id'
                        v-bind:name='movie.name'
                        v-bind:img='movie.img'>
                    </movies-list-item>
                </div>
            </div>
        </div>
    </div> 
    `
}; 