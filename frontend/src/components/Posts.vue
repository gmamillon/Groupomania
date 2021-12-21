<template>
    <div class="post">
        <div class="post__top">
            <div class="post__user">
                <router-link :to="profileUrl" class="post__user__pplink">
                    <img :src="post.user.ppurl" alt="photo de profile" class="post__user__pp">
                </router-link>
                <router-link :to="profileUrl" :title="'Profil de' + post.user.name">
                    {{post.user.name}}
                </router-link>
            </div>
            <button v-if="post.user_id == user.id || user.admin" @click.prevent="deletePost" class="post__user__delete"><i class="fas fa-trash"></i></button>
        </div>
        <div class="post__text">
            <p>{{post.content}}</p>
        </div>
        <div v-if="post.media.length > 0" :id="post.id" class="post__medias">
            <div v-for="media in post.media" :key="media.url" class="post__media" @click="show">
                <img v-if="media.url.match(/\.(jpg|jpeg|png|gif)$/)" :src="media.url" :alt="'image posté par ' + post.user.name" class="post__media__img">
                <video v-else-if="media.url.match(/\.(mp4|avi)$/)" controls class="post__media__video">
                    <source :src="media.url">
                </video>
            </div>
        </div>
        <button v-if="post.media.length > 1" class="post__btn" @click.prevent="showAll">Montrer plus</button>
        <button v-if="post.replies.length > 0" class="post__btn" @click.prevent="showReplies">Montrer les réponses ({{post.replies.length}})</button>
        <div v-if="repliesShown">
            <Reply v-for="reply in post.replies" :key="reply.id" :reply="reply" @deleteReply="deleteReply"/>
        </div>
        <form class="post__reply">
            <label for="reply">réponse</label>
            <input :id="'reply' + post.id" type="text" placeholder="Votre réponse" name="reply" class="post__reply__input">
            <label for="btn">envoyer la réponse</label>
            <button class="post__reply__btn" name="btn" @click.prevent="sendReply">Envoyer</button>
        </form>
    </div>
</template>

<script>
import Reply from '@/components/Reply.vue'
import {mapGetters} from 'vuex'

export default {
    name: "Posts",
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    emits: [
        "deleted"
    ],
    components: {
        Reply,
    },
    data() {
        return {
            isShown: false,
            allShown: false,
            repliesShown: false,
        }
    },
    computed: {
        ...mapGetters(['user']),
        profileUrl() {
            return "/profile/" + this.post.user_id
        },
    },
    methods: {
        show(event) {
            if (!this.isShown) {
                event.currentTarget.childNodes[0].style = "width: unset; object-fit: unset;";
                event.currentTarget.style = "position: fixed; height: 100%; width: 100%; max-width: unset; top: 0; left: 0; z-index: 64; background-color: black;";
                this.isShown = true
            } else {
                event.currentTarget.childNodes[0].style = "";
                event.currentTarget.style = "";
                this.isShown = false
            }
        },
        showAll(event) {
            const mediaList = document.getElementById(this.post.id); 
            if (!this.allShown) {
                mediaList.style = "height: unset;";
                event.target.innerHTML = "Montrer moins";
                this.allShown = true;
            } else {
                mediaList.style = "height: 350px;";
                event.target.innerHTML = "Montrer plus";
                this.allShown = false;
            }
        },
        showReplies(event) {
            if (!this.repliesShown) {
                event.target.innerHTML = "Masquer les réponses";
                this.repliesShown = true;
            } else {
                event.target.innerHTML = "Montrer les réponses (" + this.post.replies.length + ")";
                this.repliesShown = false;
            }
        },
        sendReply() {
            const reply = {
                content: document.getElementById('reply'+this.post.id).value,
                postId: this.post.id,
            };
            this.$store.dispatch('sendReply', reply).then(res => {
                const newReply = {
                    id: res.data.reply.id,
                    user: this.user,
                    content: res.data.reply.content,
                };
                this.post.replies.push(newReply)
                document.getElementById('reply'+this.post.id).value = "";
            })
        },
        deletePost() {
            this.$emit('deleted', this.post.id);
        },
        deleteReply(reply) {
            this.$store.commit('DELETE_REPLY', reply.id)
            const replyIndex = this.post.replies.indexOf(reply);
            this.post.replies.splice(replyIndex, 1);
        }
    }
}
</script>

<style lang="scss">
.post {
    margin: 20px auto;
    width: calc(80% + 20px);
    max-width: 800px;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    box-shadow: 0px 2px 8px 4px #FFD7D7;
    overflow: hidden;
    &__top {
        width: 100%;
        display: flex;
        justify-content: space-between;
        border-bottom: 4px solid #FFD7D7;
    }
    &__user {
        padding: 5px;
        display: flex;
        align-items: center;
        gap: 10px;
        &__pplink {
            height: 50px;
            width: 50px;
            border-radius: 50%;
            overflow: hidden;
        }
        &__pp {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
        &__delete {
            padding: 0 10px;
            border: none;
            background-color: white;
            font-size: 22px;
            color: #FD2D01;
            cursor: pointer;
            transition: 200ms ease-out;
            &:hover {
                color: black;
            }
        }
    }
    &__text {
        padding: 10px 15px;
        overflow-wrap: break-word;
    }
    &__medias {
        height: 350px;
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        background-color: #FFD7D7;
        border-top: 4px solid #FFD7D7;
        overflow: hidden;
    }
    &__btn {
        padding: 2px;
        border: none;
        border-top: 4px solid #FFD7D7;
        background-color: white;
        color: #FD2D01;
        font-size: 18px;
        transition: 200ms ease-out;
        &:hover {
            background-color: #FD2D01;
            color: white;
        }
    }
    &__media {
        height: 350px;
        width: 100%;
        max-width: 400px;
        background-color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        overflow: hidden;
        &__img {
            width: 100%;
            object-fit: cover;
        }
        &__video {
            height: 100%;
            width: 100%;
        }
    }
    &__reply {
        display: flex;
        background-color: #FFD7D7;
        border-top: 4px solid #FFD7D7;
        &__input {
            height: 24px;
            width: 100%;
            min-width: 120px;
            font-size: 16px;
            border-radius: 8px;
            border: inset 1px #FFD7D7;
            &:focus, &:focus-visible {
                border: inset 1px #FD2D01;
                outline: none;
            }
        }
        &__btn {
            padding: 2px;
            border-radius: 8px;
            border: none;
            background-color: white;
            color: #FD2D01;
            font-size: 18px;
            transition: 200ms ease-out;
            &:hover {
                background-color: #FD2D01;
                color: white;
            }
        }
        label {
            width: 0;
            height: 0;
        }
    }
    &__replies {
        font-size: 14px;
        display: flex;
        flex-direction: column;
        border-top: 4px solid #FFD7D7;
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
    }
}
</style>