<template>        
        <router-link :to="profileUrl" :title="'Profil de ' + profile.name" @click.prevent="clearInput" class="searchProfile">
            <img :src="profile.ppurl" :alt="'Photo de profil de ' + profile.name" class="searchProfile__pp">
            <p>{{profile.name}}</p>
        </router-link>
</template>

<script>
export default {
    name: "SearchProfile",
    props: {
        profile: {
            type: Object,
            required: true
        }
    },
    computed: {
        profileUrl() {
            return "/profile/" + this.profile.id
        },
    },
    methods: {
        clearInput() {
            this.$store.state.searchedProfiles = [];
        }
    }
}
</script>

<style lang="scss" scoped>
.searchProfile {
    height: 50px;
    width: 60%;
    min-width: 280px;
    margin: auto;
    border: 3px solid #FFD7D7;
    background-color: white;
    display: flex;
    align-items: center;
    transition: 200ms ease-out;
    &:hover {
        border: 3px solid #FD2D01;
    }
    &__pp {
    height: 50px;
    margin-right: 10px;
    }
}
</style>