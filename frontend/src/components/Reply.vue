<template>
    <div class="reply">
        <router-link :to="'/profile/' + reply.user.id" :title="'Profil de' + reply.user.name" class="reply__user">
            <img :src="reply.user.ppurl" :alt="'Photo de profil de ' + reply.user.name" class="reply__pp">
            {{reply.user.name}}
        </router-link>
        <button title="supprimer" v-if="reply.user.id == user.id || user.admin" @click.prevent="deleteReply" class="reply__delete"><i class="fas fa-trash"></i></button>
        <p class="reply__text">
            {{reply.content}}
        </p>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: "Reply",
    props: {
        reply: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapState(["user"]),
    },
    methods: {
        deleteReply() {
            this.$emit('deleteReply', this.reply)
        }
    }
}
</script>

<style lang="scss" scoped>
.reply {
        font-size: 14px;
        display: flex;
        flex-direction: column;
        border-top: 4px solid #FFD7D7;
        position: relative;
        &__user {
            display: flex;
            align-items: center;
            gap: 10px;
            border-bottom: 1px dashed #FD2D01;
            padding: 5px;
        }
        &__pp {
            height: 30px;
            width: 30px;
            border-radius: 50%;
            object-fit: cover;
        }
        &__text {
            height: 100%;
            padding: 6px 10px 6px 6px;
            overflow-wrap: break-word;
        }
        &__delete {
            padding: 0;
            border: none;
            background-color: white;
            font-size: 18px;
            color: #FD2D01;
            cursor: pointer;
            position: absolute;
            top: 10px;
            right: 10px;
            transition: 200ms ease-out;
            &:hover {
                color: black;
            }
        }
    }
</style>