<template>
    <Header/>
    <div class="feed">
        <CreatePost/>
        <Posts v-for="post in posts" :post="post" :key="post.id" @deleted="deletePost"/>
    </div>
</template>

<script>
import Header from "@/components/Header.vue"
import CreatePost from "@/components/CreatePost.vue"
import Posts from "@/components/Posts.vue"
import { mapGetters } from 'vuex'

export default {
    name: "Feed",
    components: {
        Header,
        CreatePost,
        Posts,
    },
    computed: {
        ...mapGetters(["posts"])
    },
    beforeCreate() {
        this.$store.commit('GET_FEED_POSTS');
    },
    methods: {
        deletePost(id) {
            this.$store.dispatch('deleteFeedPost', id);
        }
    }
}
</script>

<style lang="scss" scoped>
.feed {
    margin-top: 70px;
}
</style>