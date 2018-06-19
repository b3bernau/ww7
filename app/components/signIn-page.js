if (!window.VueWW) {
    window.VueWW = {};
}

window.VueWW.signInPage = {
    data: function() {
        return {  
            login: {} 
        };
    },
    computed: {},
    methods: {
        onSubmit(evt) {
            evt.preventDefault()
            this.axios.post('http://localhost:8080/signin', this.login)
            .then(response => {
                alert(response.data.msg);
                var nextPath;
                if(response.data.success){
                    nextPath="/home";
                } else {
                    nextPath="/signIn"
                }
                this.$router.push({
                    path: nextPath
                })
            }).catch(e=>{
                console.log(e);
            })
        }
    },
    template:  `
        <div>
    		<form @submit="onSubmit">
            <label id="signUpText">CONNEXION</label>
                <div class="form-group row">
                    <div class="col-sm-12">
                      <input type="pseudo" class="form-control" id="inputUser" v-model="login.username" placeholder="Pseudo">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-12">
                      <input type="password" class="form-control" id="inputPassword" v-model="login.password" placeholder="Mot de passe">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-12">
                      <button type="submit" class="btn btn-primary">Valider</button>
                    </div>
                </div>
                <a href="http://127.0.0.1:8887/app/WW7.html?#/signUp" id="pasInscritText">Pas encore inscrit ?</a>
            </form>
        </div>
    `
};