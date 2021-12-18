<template>
    <div class="fog">
        <form class="logger">
            <img class="logger__logo" src="../assets/icon.svg" alt="Logo Groupomania">
            <input id="name" type="text" placeholder="Nom d'utilisateur">
            <input id="email" type="text" placeholder="Email">
            <input id="password" type="password" placeholder="Mot de passe">
            <button class="logger__btn" @click.prevent="signup">S'inscrire</button>
            <p>Vous possédez déjà un compte ? <router-link to="/">connectez vous !</router-link></p>
        </form>
    </div>
</template>

<script>
export default {
    name: "Logger",
    methods: {
        signup() {
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const body = {
                name: name,
                email: email,
                password: password
            };
            this.$store.commit('SIGNUP', body)
        }
    }

}
</script>

<style lang="scss" scoped>
p {
    width: 60%;
    min-width: 210px;
}
</style>
