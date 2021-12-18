<template>
    <header class="header">
        <router-link to="/feed" title="Page d'acceuil"><img class="header__logo" src="../assets/icon.svg" alt="logo Groupomania"></router-link>
        <input class="header__input" type="text" placeholder="Rechercher un profil" @input="searchUser">
        <router-link class="header__pp" :to="'/profile/' + user.id" title="Votre profil"><img :src="user.ppurl" alt="photo de profil"></router-link>
    </header>
    <div class="researchDiv">
        <SearchProfile v-for="profile in searchedProfiles" :profile="profile" :key="profile.id"/>
    </div>
</template>

<script>
import SearchProfile from "@/components/SearchProfile.vue"
import {mapGetters, mapState} from "vuex"

export default {
    name: "Header",
    components: {
        SearchProfile
    },
    computed: {
        ...mapState(["user"]),
        ...mapGetters(["myProfile", "searchedProfiles"]),
    },
    watch: {
        $route() {
            this.$store.state.searchedProfiles = [];
        }
    },
    methods: {
        searchUser(event) {
            this.$store.state.searchedProfiles = [];
            const words = event.target.value.split(" ");
            for (let i = 0; i < words.length; i++) {
                if (words[0] !== "") {
                    const userName = { name: words[i] };
                    this.$store.commit('SEARCH_PROFILES', userName);
            }}
        },
    }
}
</script>

<style lang="scss">
.header {
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 3px 6px #FFD7D7;
    background-color: white;
    position: fixed;
    top: 0;
    z-index: 64;
    &__logo {
        height: 50px;
        width: 50px;
    }
    &__pp {
        width: 45px;
        height: 45px;
        margin-right: 10px;
        border-radius: 50%;
        overflow: hidden;
        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
    }
    &__input {
        height: 30px;
        width: 60%;
        margin: auto;
        min-width: 180px;
        font-size: 18px;
        border-radius: 6px;
        border: inset 1px #FFD7D7;
        &:focus, &:focus-visible {
            border: inset 1px #FD2D01;
            outline: none;
        }
    }
}
.researchDiv {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: fixed;
    top: 50px;
}
</style>