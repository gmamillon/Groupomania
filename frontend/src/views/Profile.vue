<template>
    <Header/>
    <div class="profile">
        <div class="profile__who">
            <div class="profile__who__photo">
                <img :src="profileUser.ppurl" :alt="'Photo de profile de' + profileUser">
            </div>
            <p>{{profileUser.name}}</p>
        </div>
        <p class="profile__bio">{{profileUser.bio}}</p>
    <div v-if="user.id === profileUser.id" class="btns">
        <router-link to="/modify" class="btns__modify">Modifier</router-link>
        <button class="btns__logout" @click="logout">Se déconnecter</button>
    </div>
    </div>
    <Posts v-for="post in postsFrom" :post="post" :key="post.id" @deleted="deletePost" />
</template>

<script>
import Header from "@/components/Header.vue"
import Posts from "@/components/Posts.vue"
import {mapState} from "vuex"

export default {
    name: "Profile",
    components: {
        Header,
        Posts
    },
    computed: {
        ...mapState(["postsFrom", "user", "profileUser"]),
    },
    beforeCreate() {
        this.$store.dispatch('findUser', this.$route.params.id);
    },
    watch: {
        $route(to, from) {
            if (to.name == "Profile") {
                this.$store.dispatch('findUser', to.params.id);
            }
        }
    },
    methods: {
        logout() {
            sessionStorage.clear();
            this.$router.push({ name: "Logger" });
        },
        deletePost(id) {
            this.$store.dispatch('deleteProfilePost', id);
        }
    },
}
</script>

<style lang="scss" scoped>
.profile {
    margin-top: 60px;
    border-bottom: 4px solid #FFD7D7;
    &__who {
        display: flex;
        align-items: center;
        gap: 10px;
        &__photo {
            margin-left: 10px;
            height: 80px;
            width: 80px;
            border-radius: 50%;
            overflow: hidden;
            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }
    }
    &__bio {
        padding: 10px;
        overflow-wrap: break-word;
    }
}
.btns {
    padding: 10px;
    display: flex;
    justify-content: space-around;
    max-width: 300px;
    &__modify {
        height: 30px;
        width: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
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
    &__logout {
        height: 30px;
        width: 150px;
        cursor: pointer;
        border-radius: 6px;
        background-color: #FD2D01;
        color: black;
        font-size: 16px;
        border: 10px black;
        transition: 200ms ease-out;
        &:hover {
            background-color: white;
            color: #FD2D01;
            box-shadow: inset 1px 0px 4px black, 1px 0px 8px black;
        }
    }
}
</style>