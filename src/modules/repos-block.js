import { getRemoteData, getUpdateDate, createRepoBlock, createNothingFoundBlock } from './utils.js'

export async function showRepos(searchRequest) {
	const reposContainer = document.querySelector('.repos__container')
	const loader = document.querySelector('#repos-loader')

	try {
		loader.classList.toggle('invinsible')
		reposContainer.innerHTML = ''

		const repos = await getRemoteData(`${searchRequest}&per_page=10`)

		if (repos.items.length === 0) {
			reposContainer.innerHTML = createNothingFoundBlock()
		}
		repos.items.forEach((repo) => {
			const avatar = repo.owner.avatar_url
			const author = repo.owner.login
			const repoName = repo.name
			const repoLink = repo.html_url
			const stars = repo.stargazers_count
			const updatedDate = getUpdateDate(repo.updated_at)

			reposContainer.insertAdjacentHTML(
				'beforeend',
				createRepoBlock(avatar, author, repoName, repoLink, stars, updatedDate)
			)
		})
	} catch (error) {
		console.error(error)
	} finally {
		loader.classList.toggle('invinsible')
	}
}
