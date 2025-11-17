<template>
  <section class="home-container">
    <div class="logo-box">
      <img src="/mirian3.png" alt="Logo MIMO ARTES" class="logo" />
    </div>
    <p class="slogan">"FAZENDO ARTE"</p>
    <router-link to="/produtos" class="btn-entrar">
      Entrar na Loja
    </router-link>
  </section>
</template>

<style scoped>
.home-container {
  min-height: 90vh; /* 90% da altura da tela */
  max-width: 100vw;
  width: 100vw;
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ffd1e3 0%, #ffb7c5 100%);
  overflow-x: hidden;
  overflow-y: hidden;
  box-sizing: border-box;
}

.logo-box {
  margin-bottom: 1rem;
}

.logo {
  width: 300px;
  max-width: 98vw;
  height: auto;
}

.slogan {
  font-size: 1.1rem;
  color: #d72660;
  margin-bottom: 1rem;
  font-style: italic;
}

.btn-entrar {
  padding: 0.6rem 1.3rem;
  background: #d72660;
  color: #fff;
  border-radius: 14px;
  font-size: 1.05rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  margin-bottom: 0;
  transition: background 0.18s;
  box-sizing: border-box;
}

.btn-entrar:hover {
  background: #ad1850;
}

@media (max-width: 600px) {
  .logo {
    width: 180px;
    max-width: 90vw;
  }
  .slogan {
    font-size: 0.9rem;
    margin-bottom: 0.7rem;
  }
  .btn-entrar {
    font-size: 0.85rem;
    padding: 0.36rem 0.7rem;
    border-radius: 12px;
  }
  .home-container {
    padding: 0;
  }
}
</style>
