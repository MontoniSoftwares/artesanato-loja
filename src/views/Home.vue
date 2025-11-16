<template>
  <section class="home-container">
    <div class="logo-box">
      <img src="/LogoMM.png" alt="Logo MIMO ARTES" class="logo" />
    </div>
    <h1 class="title">MIMO ARTES</h1>
    <p class="slogan">"FAZENDO ARTE"</p>
    <router-link to="/produtos" class="btn-entrar">
      Entrar na Loja
    </router-link>
  </section>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffd1e3 0%, #ffb7c5 100%);
  text-align: center;
}
.logo-box {
  margin-bottom: 1.5rem;
}
.logo {
  width: 300px;
  height: auto;
}
.title {
  font-size: 2.6rem;
  color: #d72660;
  margin-bottom: 0.5rem;
  letter-spacing: 2px;
}
.slogan {
  font-size: 1.8rem;
  color: #d72660;
  margin-bottom: 2.2rem;
  font-style: italic;
}
.btn-entrar {
  display: inline-block;
  padding: 0.9rem 2.3rem;
  background: #d72660;
  color: #fff;
  border-radius: 22px;
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s;
  cursor: pointer;
}
.btn-entrar:hover {
  background: #ad1850;
}
</style>
