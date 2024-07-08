<script setup>
import { ref, onMounted } from "vue";

const posts = ref([]);
const error = ref(null);
const loading = ref(true);

onMounted(() => {
  async function searchPosts() {
    const originUrl = window.location.origin;
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q");

    if (!query) {
      posts.value = [];
      error.value = "No query provided";
      loading.value = false;
      return;
    }

    try {
      const res = await fetch(`${originUrl}/api/posts.json`);

      if (res.ok) {
        const data = await res.json();
        const queryWords = query.toLowerCase().split(" ");

        const searchedPosts = data.results.filter((post) => {
          const title = post.properties.title.title[0].plain_text.toLowerCase();
          return queryWords.every((word) => title.includes(word));
        });

        if (searchedPosts.length !== 0) {
          posts.value = searchedPosts;
        } else {
          posts.value = [];
          error.value = "No results found";
        }
      } else {
        throw new Error("Failed to fetch posts");
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  searchPosts();
});
</script>

<template>
  <div
    class="w-full h-full flex justify-center items-center flex-col gap-14"
    v-if="loading">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15em"
      height="15em"
      viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
        <animateTransform
          attributeName="transform"
          dur="0.75s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;360 12 12" />
      </path>
    </svg>

    <p class="text-3xl">Searching ...</p>
  </div>

  <div v-else>
    <p v-if="error" class="text-3xl text-center py-10">{{ error }}</p>
    <ul class="grid gap-16 max-w-4xl mx-auto">
      <li v-for="post in posts" :key="post.id">
        <a :href="'/post/' + post.id">
          <div class="grid md:grid-cols-2 gap-5 md:gap-10 items-center">
            <img
              :src="post.properties.thumbnail.files[0].file.url"
              :alt="post.properties.title.title[0].plain_text" />
            <div>
              <span
                class="text-blue-400 uppercase tracking-wider text-sm font-medium">
                {{ post.properties.category.select.name }}
              </span>

              <h2
                class="text-3xl font-semibold leading-snug tracking-tight mt-1">
                {{ post.properties.title.title[0].plain_text }}
              </h2>

              <div class="flex gap-2 mt-3">
                <span class="text-gray-400"> author </span>
                <span class="text-gray-400">• </span>
                <time class="text-gray-400" :datetime="post.created_time">
                  {{ post.created_time.split("T")[0] }}
                </time>
              </div>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
