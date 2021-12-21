<template>
    <form id="postForm" class="postForm">
        <label for="texte">texte</label>
        <textarea id="textToPost" class="postForm__text" name="texte"></textarea>
        <label for="files">fichiers</label>
        <input id="file" type="file" name="files" class="postForm__file" accept=".jpeg,.jpg,.png,.mp4,.avi" multiple>
        <label for="btnpost">poster</label>
        <button @click.prevent="sendPost" name="btnpost" class="postForm__button">Poster</button>
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
    gap: 5px;
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
        color: black;
        font-size: 18px;
        border: 10px black;
        transition: 200ms ease-out;
        &:hover {
            background-color: white;
            color: black;
            box-shadow: inset 1px 0px 4px black, 1px 0px 8px black;
        }
    }
    label {
        width: 0;
        height: 0;
        opacity: 0;
    }
}
</style>