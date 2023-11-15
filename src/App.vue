<template>
  <div>
    <Header class="bg-white"></Header>
    <div class="container-xxl">
      <router-view></router-view>
      <Footer></Footer>
<!--      <main>-->
<!--        <section id="main">-->
<!--          <router-view></router-view>-->
<!--        </section>-->
<!--      </main>-->
<!--        <aside class="d-none d-lg-block">-->
<!--          <section id="userContainer">-->
<!--            <WidgetLogin></WidgetLogin>-->
<!--          </section>-->
<!--          <section id="chat" class="mt-4">-->
<!--            <WidgetChatBot></WidgetChatBot>-->
<!--          </section>-->
<!--        </aside>-->
<!--      </main>-->
    </div>
  </div>
</template>

<script>
import Header from '@compo/Header.vue'
import Footer from '@compo/Footer.vue'

export default {
  components: {
    Header,
    Footer
  }
}
</script>