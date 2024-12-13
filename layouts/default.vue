<template>
  <div class="default-layout-container">
    <header>
      <nav>
        <ul>
          <li><nuxt-link to="/">Home</nuxt-link></li>
          <li><nuxt-link to="/wishes">My Wishes</nuxt-link></li>
          <li><nuxt-link to="/about">About</nuxt-link></li>
        </ul>
      </nav>
    </header>
    <main>
      <nuxt />
    </main>
    <footer>
      <p>&copy; 2024. All rights reserved.</p>
    </footer>
  </div>
</template>

<style lang="less" scoped>
.default-layout-container {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

  header {
    background-color: #3490dc;
    padding: 10px 20px;

    nav ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        margin-right: 20px;

        a {
          text-decoration: none;
          color: white;
          font-weight: bold;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

	main {
		flex: 1;
		padding: 10px 20px;
	}

  footer {
    text-align: center;
    padding: 10px 20px;
    background-color: #f4f4f4;
  }
}
</style>
