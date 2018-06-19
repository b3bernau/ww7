if (!window.VueWW) {
    window.VueWW = {};
}

window.VueWW.seriesListItem = {
	props: [ 'name','year','img','id','description','duree','age','genre','salle','plateformeDiffusion','note', 'video'],
    data: function() {
        return {   
        };
    },
    computed: {
	    imgUrl: function() {
	        if (!this.img) {
	            return;
	        }
	        return `../data/series${this.img}`;
	    },
	    detailUrl: function() {
            if (!this.id) {
                return '/';
            }
            return `/serie/${this.id}`
        }
	},
    template:  `
		<div v-bind:id="id" class="clearfix">
			<router-link v-bind:to="detailUrl">
			    <h5 class="el-name">{{ name }}</h5>
			    <img class="el-img" v-bind:src="imgUrl">
		    </router-link>
		</div>
    `
};