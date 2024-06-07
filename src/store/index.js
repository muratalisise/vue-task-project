import { defineStore } from 'pinia'
import axios from 'axios'

export const usePostStore = defineStore('post', {
	state: () => ({
		posts: [],
		comments: {},
		loading: false,
		error: null
	}),
	actions: {
		async fetchPosts() {
			this.loading = true
			try {
				const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
				this.posts = response.data
			} catch (error) {
				this.error = error.message
			} finally {
				this.loading = false
			}
		},
		async fetchComments(postId) {
			if (!this.comments[postId]) {
				this.loading = true
				try {
					const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
					this.$set(this.comments, postId, response.data)
				} catch (error) {
					this.error = error.message
				} finally {
					this.loading = false
				}
			}
		},
		addComment(postId, comment) {
			if (this.comments[postId]) {
				this.comments[postId].push(comment)
			} else {
				this.$set(this.comments, postId, [comment])
			}
		}
	}
})
