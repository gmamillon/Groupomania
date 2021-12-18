<template>
    <div class="fog">
        <div class="formContainer">
        <form action="PUT" class="modifier" @submit.prevent="modify">
            <label for="name">Nom d'utilisateur</label>
            <input type="text" name="name" v-model="userName" class="modifier__input">
            <label for="email">E-mail</label>
            <input type="text" name="email" v-model="email" class="modifier__input">
            <label for="bio">Biographie</label>
            <input type="text" name="bio" v-model="bio" class="modifier__input">
            <label for="pp">Photo de profil</label>
            <div>
                <input id="pp" type="file" name="pp" class="modifier__photo">
            </div>
            <button @click.prevent="modify" class="modifier__btn">Modifier le profil</button>
        </form>
        <button @click.prevent="deleteAccount" class="modifier__btn">Supprimer le compte</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Modify",
    data() {
        return {
            userName: this.$store.state.user.name,
            email: this.$store.state.user.email,
            bio: this.$store.state.user.bio,
        }
    },
    methods: {
        modify() {
            const file = document.getElementById('pp').files[0];
            const formdata = new FormData();
            formdata.append('file', file);
            formdata.append('name', this.userName);
            formdata.append('email', this.email);
            if (this.bio == null) {
                this.bio = "";
            }
            formdata.append('bio', this.bio);
            this.$store.commit('MODIFY', formdata);
        },
        deleteAccount() {
            this.$store.commit('DELETE_USER', this.$store.state.user.id)
        }
    }
}
</script>

<style lang="scss" scoped>
.fog {
    height: 100vh;
    z-index: 64;
    background: linear-gradient(#fff, 35%, #FFD7D7 35%, #FFD7D7 65%, #fff 65%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}
.formContainer {
    width: 40%;
    min-width: 270px;
    padding: 10px 0;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    box-shadow: 3px 3px 8px 4px #FD2D01;
}
.modifier {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
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
        color: white;
        font-size: 18px;
        border: 10px black;
        transition: 200ms ease-out;
        &:hover {
            background-color: white;
            color: #FD2D01;
            box-shadow: inset 1px 0px 4px black, 1px 0px 8px black;
        }
    }
    &__input {
        height: 30px;
        width: 60%;
        min-width: 204px;
        font-size: 18px;
        border-radius: 6px;
        border: inset 1px #FD2D01;
    }
    
}
</style>