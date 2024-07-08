<script setup>
import { ref, onMounted } from "vue";

const posts = ref([]);

onMounted(() => {
  async function searchPosts() {
    const originUrl = window.location.origin;
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q");

    try {
      const res = await fetch(`${originUrl}/api/posts.json`);

      if (res.ok) {
        const data = await res.json();
        const searchedPosts = await data.results.filter((post) => {
          return post.properties.title.title[0].plain_text
            .toLowerCase()
            .includes(query.toLowerCase());
        });
        console.log(searchedPosts);
        posts.value = searchedPosts;
      }
    } catch (error) {
      console.log(error);
    }
  }

  searchPosts();
});
</script>

<template>
  <div v-for="post in posts" :key="post.id">
    <li>
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

            <h2 class="text-3xl font-semibold leading-snug tracking-tight mt-1">
              {{ post.properties.title.title[0].plain_text }}
            </h2>

            <div class="flex gap-2 mt-3">
              <span class="text-gray-400">
                <!-- {/* {post.properties.author} */}  -->
                author
              </span>
              <span class="text-gray-400">• </span>
              <time class="text-gray-400" :datetime="post.created_time">
                {{ post.created_time.split("T")[0] }}
              </time>
            </div>
          </div>
        </div>
      </a>
    </li>
    <br />
  </div>
</template>
