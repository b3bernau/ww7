if (!window.VueWW) {
    window.VueWW = {};
}

window.VueWW.signUpPage = {
    data: function() {
        return { 
            user: {}   
        };
    },
    computed: {},
    methods: {
        onSubmit(evt) {
            evt.preventDefault()
            this.axios.post('http://localhost:8080/signup', this.user)
            .then(response => {
                alert(response.data.msg);
                this.$router.push({
                    path:'/signIn'
                })
            }).catch(e=>{
                console.log(e);
            })
        }
    },
    template:  `
        <div>
            <form @submit="onSubmit">
            <label id="signUpText">INSCRIPTION</label>
                <div class="form-group row">
                    <div class="col-sm-12">
                      <input type="text" class="form-control" id="inputNom" v-model="user.lastName" placeholder="Nom">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-12">
                      <input type="text" class="form-control" id="inputPrenom" v-model="user.firstName" placeholder="Prénom">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-12">
                      <input type="text" class="form-control" id="inputPseudo" v-model="user.username" placeholder="Pseudo">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-12">
                      <input type="email" class="form-control" id="inputEmail" v-model="user.email" placeholder="Email">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-12">
                      <input type="password" class="form-control" id="inputPassword" v-model="user.password" placeholder="Mot de passe">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-12">
                      <input type="password" class="form-control" id="inputConfirmationPassword" placeholder="Confirmation mot de passe">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-12">
                      <button type="submit" class="btn btn-primary">Valider</button>
                    </div>
                </div>
            </form>
        </div>
    `
};