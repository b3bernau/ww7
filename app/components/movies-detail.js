if (!window.VueWW) {
    window.VueWW = {};
}

window.VueWW.moviesDetail = {
    data: function() {
	    return {  
		    movie: {}, 
		    mainImg: null,
		};
	},
    computed: {
	    imgUrl: function() {
	        if (!this.movie.img) {
	            return;
	        }
	        return `../../data${this.movie.img}`;
	    },
	    labelUrl: function() {
            if (!this.movie.label) {
                return;
            }
            return `../../data/${this.movie.label}`;
        }
	},
	mounted: function() {
	    this.getMovieDetail(this.$route.params.id);
	},
	watch: {
    	'$route' (to, from) {
        	this.getMovieDetail(to.params.id);
    	}
  	},
  	methods: {
        getMovieDetail: async function(id) {
            let fetchResult
            fetchResult = await fetch(`../data/movies/details/${id}.json`);
            if (fetchResult.status == 200) {
                this.movie = await fetchResult.json();
            }
            this.mainImg = `../../data/movies/${this.movie.img}`;
        },
        setImage: function(img) { 
            this.mainImg = `../../data/movies/${img}`;
        }
    },
    template:  `
		<div v-bind:id="movie.id" class="detail clearfix">
		    <a href="#/movies">
		    	<img class="pull-right back" src="../../img/back.png">
		    </a>
		    <a href="#">
		    	<span class="pull-right back fa fa-heart" id="favBouton" href="#" onclick="ajouterFavoris(movie.name)"></span>
		    </a>
		    <h1 class="name">{{ movie.name }}</h1>
		    <img class="pull-right img" v-bind:src="mainImg">
		    <p class="description">{{ movie.description }}</p>

		    <ul class="specs">
			    <li>
			        <dl>
				        <dt>Année</dt>
				        <dd>{{movie.year}}</dd>
			        </dl>
			    </li>
			    <li>
			        <dl>
				        <dt>Durée</dt>
				        <dd>{{movie.duree}}</dd>
			        </dl>
			    </li>
			    <li>
			        <dl>
				        <dt>Age</dt>
				        <dd>{{movie.age}}</dd>
			        </dl>
			    </li>
			    <li>
			        <dl>
				        <dt>Genre</dt>
				        <dd>{{movie.genre}}</dd>
			        </dl>
			    </li>
			    <li>
			        <dl>
				        <dt>En salle</dt>
				        <dd>{{movie.salle}}</dd>
			        </dl>
			    </li>
			    <li>
			        <dl>
				        <dt>Plateforme de diffusion</dt>
				        <dd>{{movie.plateformeDiffusion}}</dd>
			        </dl>
			    </li>
			    <li>
			        <dl>
				        <dt>Note</dt>
				        <dd>{{movie.note}} étoile(s)</dd>
			        </dl>
			    </li>
			    <li>
			        <dl>
				        <dt>Bande annonce</dt>
				        <object type="application/x-shockwave-flash" width="425" height="355" v-bind:data="movie.video">
						</object>
			        </dl>
			    </li>
		    </ul>
		</div>
    `,
};

function ajouterFavoris (name) {
	console.log(name)
	if((document.getElementById("favBouton").style.color)=='red'){
		document.getElementById("favBouton").style.color="black";
	} else {
		document.getElementById("favBouton").style.color="red";
		this.axios.post('http://localhost:8080/favoris', {
                headers: {'x-access-token': localStorage.getItem('jwtToken')}
                },name)
            .then(response => {
                alert("Film ajouté aux favoris !");
                var nextPath;
                if(response.data.success){
                    nextPath="/favoris";
                    console.log("ok")
                } else {
                    nextPath="/favoris"
                    console.log("ko")
                }
                this.$router.push({
                    path: nextPath
                })
            }).catch(e=>{
                console.log(e);
         })
	}
}



