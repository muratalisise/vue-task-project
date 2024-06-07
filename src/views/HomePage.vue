<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Posts</h1>

    <!-- Post Listesi -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="post in posts" :key="post.id" class="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
        <h2 class="text-lg font-semibold mb-2">{{ post.title }}</h2>
        <p class="text-gray-700">{{ post.body }}</p>

        <!-- Yorumlar -->
        <div class="mt-4">
          <h3 class="text-lg font-semibold mb-2">Yorumlar</h3>
          <ul>
            <li v-for="comment in post.comments" :key="comment.id" class="mb-2">
              <p><strong>{{ comment.name }}</strong>: {{ comment.body }}</p>
            </li>
          </ul>
        </div>

        <!-- Yeni Yorum Ekleme Formu -->
        <form @submit.prevent="addComment(post)" class="mt-4">
          <div class="mb-2">
            <input v-model="newCommentName" type="text" class="px-4 py-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="İsim">
          </div>
          <div class="mb-2">
            <textarea v-model="newCommentBody" class="px-4 py-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="Yorum"></textarea>
          </div>
          <div>
            <button type="submit" class="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">Yorum Ekle</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="loading" class="text-center mt-4">Yükleniyor...</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomePage',
  data() {
    return {
      posts: [],
      loading: false,
      newCommentName: '',
      newCommentBody: ''
    };
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      this.loading = true;
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_embed=comments');
        this.posts = response.data;
      } catch (error) {
        console.error('Gönderileri alırken hata oluştu:', error);
      } finally {
        this.loading = false;
      }
    },
    async addComment(post) {
      if (!this.newCommentName || !this.newCommentBody) return;
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/comments', {
          postId: post.id,
          name: this.newCommentName,
          body: this.newCommentBody
        });
        post.comments.push(response.data);
        this.newCommentName = '';
        this.newCommentBody = '';
      } catch (error) {
        console.error('Yorum eklerken hata oluştu:', error);
      }
    }
  }
}
</script>

<style scoped>
/* Tailwind CSS classes are used, no additional styles required */
</style>
