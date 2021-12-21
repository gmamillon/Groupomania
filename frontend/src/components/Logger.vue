<template>
    <div class="fog">
        <form id="logger" class="logger" method="POST">
            <img class="logger__logo" src="../assets/icon.svg" alt="Logo Groupomania">
            <label for="email">e-mail</label>
            <input id="email" type="text" name="email" placeholder="email">
            <label for="password">mot de passe</label>
            <input id="password" type="password" placeholder="mot de passe" name="password">
            <label for="loggerbtn">connexion</label>
            <button id="loggerbtn" class="logger__btn" @click.prevent="login" name="connect">Se connecter</button>
            <router-link class="logger__btn" to="/signup" title="Page d'inscription">S'inscrire</router-link>
        </form>
    </div>
</template>

<script>
export default {
    name: "Logger",
    methods: {
        login() {
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const body = {
                email: email,
                password: password
            };
            this.$store.commit('LOGIN', body)
        }
    }

}
</script>

<style lang="scss">
.fog {
    height: 100vh;
    z-index: 64;
    background: linear-gradient(#fff, 35%, #FFD7D7 35%, #FFD7D7 65%, #fff 65%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}
.logger {
    height: 30%;
    width: 40%;
    min-height: 250px;
    min-width: 270px;
    padding-bottom: 4%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 8px;
    box-shadow: 3px 3px 8px 4px #FD2D01;
    &__logo {
        height: 100px;
    }
    &__btn {
        height: 30px;
        width: 60%;
        min-width: 210px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 6px;
        background-color: #FD2D01;
        color: black;
        font-size: 18px;
        border: 10px black;
        transition: 200ms ease-out;
        &:hover {
            background-color: white;
            color: #FD2D01;
            box-shadow: inset 1px 0px 4px black, 1px 0px 8px black;
        }
    }
    input {
        height: 30px;
        width: 60%;
        min-width: 204px;
        font-size: 18px;
        border-radius: 6px;
        border: inset 1px #FD2D01;
    }
    label {
        width: 0;
        height: 0;
    }
}
</style>
