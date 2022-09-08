const Home = {
  render: async () => `
    <div class="container">
      <h1>home</h1>
    </div>
  `,

  after_render: async () => {
    console.log('Home');
  },
};


export default Home
