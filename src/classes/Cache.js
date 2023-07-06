
class InMemoryCache {
	cache = {};
	async getCached() {
		console.log(this.cache);
		return this.cache;
	}
	async setCached(value) {
		this.cache = value;
	}
	async setCachedPartial(value) {
		this.cache = {
			...this.cache,
			...value,
		};
	}
}

module.exports = InMemoryCache;