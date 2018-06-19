if (!window.VueWW) {
    window.VueWW = {};
}

window.VueWW.moviesListItem = {
	props: [ 'name','year','img','id','description','duree','age','genre','salle','plateformeDiffusion','note','video'],
    data: function() {
        return {   
        };
    },
    computed: {
	    imgUrl: function() {
	        if (!this.img) {
	            return;
	        }
	        return `../data/movies${this.img}`;
	    },
	    detailUrl: function() {
            if (!this.id) {
                return '/';
            }
            return `/movie/${this.id}`
        }
	},
    template:  `
		<div v-bind:id="id" class="clearfix">
			<router-link v-bind:to="detailUrl">
			    <p class="el-name">{{ name }}</p>
			    <img class="el-img" v-bind:src="imgUrl">
		    </router-link>
		</div>
    `
};