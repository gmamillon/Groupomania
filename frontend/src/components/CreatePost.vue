<template>
    <form id="postForm" class="postForm">
        <textarea id="textToPost" class="postForm__text"></textarea>
        <input id="file" type="file" name="files" class="postForm__file" accept=".jpeg,.jpg,.png,.mp4,.avi" multiple>
        <button @click.prevent="sendPost" class="postForm__button">Poster</button>
    </form>
</template>

<script>
import {mapGetters} from "vuex"

export default {
    name: "CreatePost",
    computed: {
        ...mapGetters(["user"])
    },
    methods: {
        sendPost() {
            const text = document.getElementById('textToPost').value;
            const files = document.getElementById('file').files;
            var media = false;
            if (files.length > 0) { media = true }
            const formData = new FormData();
            formData.append('content', text);
            formData.append('userId', this.user.id);
            formData.append('media', media);
            for (let i = 0; i < files.length; i++) {
                files[i].fieldname = "file";
                formData.append('file', files[i]);
            }
            this.$store.commit('ADD_POST', formData);
            document.getElementById('textToPost').value = "";
            document.getElementById('file').value = null;
        }
    },

}
</script>

<style lang="scss" scoped>
.postForm {
    margin: 20px auto;
    padding: 10px;
    width: 80%;
    max-width: 780px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 8px;
    box-shadow: 0px 2px 8px 4px #FFD7D7;
    &__text {
        height: 50px;
        border-radius: 8px;
        min-width: 180px;
        line-height: 24px;
        font-size: 18px;
        border-radius: 6px;
        border: inset 1px #FFD7D7;
        resize: none;
        &:focus, &:focus-visible {
            border: inset 1px #FD2D01;
            outline: none;
        }
    }
    &__button {
        height: 30px;
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
}
</style>