if (!window.VueWW) {
    window.VueWW = {};
}

window.VueWW.favorisPage = {
    data: function() {
        return {   
            movies: []
        };
    },
    computed: {},
    methods: {
        fetchItems(){
            let uri = 'http://localhost:8080/favoris';
            this.axios.get(uri).then((response) => {
                  console.log(response.data)
                  this.movies = response.data;
              });
        }
    },
    created: async function() {
        this.fetchItems();
    },
    template:  `
        <div class="container">
            <div class="row">
                <div class="col-md-2">
                    <filters></filters>
                </div>
                <div class="col-md-10">
                    <div class="movie" v-for="movie in movies">
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