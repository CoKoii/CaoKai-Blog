<script setup lang="ts">
import { computed, ref } from 'vue'
import AppLayout from '@/components/layout'

const sidebarHidden = ref(false)
const sidebarNoSpace = ref(false)
const sidebarCollapsed = ref(false)
const fullScreen = ref(false)
const persistLayout = ref(true)

const controlLabels = computed(() => ({
  sidebar: sidebarHidden.value ? '显示侧边栏' : '隐藏侧边栏',
  noSpace: sidebarNoSpace.value ? '侧边栏占位' : '侧边栏不占位',
  collapse: sidebarCollapsed.value ? '展开侧边栏' : '收缩侧边栏',
  fullScreen: fullScreen.value ? '退出全屏' : '进入全屏',
}))

const toggleSidebarHidden = () => {
  sidebarHidden.value = !sidebarHidden.value
}

const toggleSidebarNoSpace = () => {
  sidebarNoSpace.value = !sidebarNoSpace.value
}

const toggleSidebarCollapsed = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const toggleFullScreen = () => {
  fullScreen.value = !fullScreen.value
}
</script>

<template>
  <div class="layout-demo">
    <div class="layout-demo__controls">
      <button @click="toggleSidebarHidden">{{ controlLabels.sidebar }}</button>
      <button @click="toggleSidebarNoSpace">{{ controlLabels.noSpace }}</button>
      <button @click="toggleSidebarCollapsed">{{ controlLabels.collapse }}</button>
      <button @click="toggleFullScreen">{{ controlLabels.fullScreen }}</button>
    </div>

    <AppLayout
      :persist="persistLayout"
      v-model:sidebarHidden="sidebarHidden"
      v-model:sidebarNoSpace="sidebarNoSpace"
      v-model:sidebarCollapsed="sidebarCollapsed"
      v-model:fullScreen="fullScreen"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, commodi minima magnam
      exercitationem animi repellat accusamus aliquam quisquam, alias odit numquam voluptate modi
      maiores in minus sit! Numquam laudantium nemo quaerat voluptatem minima, velit, repellendus
      dolorem cum accusamus explicabo perspiciatis! Recusandae laudantium laboriosam perferendis
      error, pariatur nostrum corrupti voluptates ab saepe alias reiciendis sequi harum sit illo
      asperiores veritatis. Asperiores nobis sequi placeat explicabo nam consequuntur rem atque
      cupiditate, unde distinctio? Laboriosam magnam eaque, tempore molestias itaque quo aliquam
      eius dolorem reprehenderit autem corporis asperiores a delectus incidunt consequuntur magni
      sapiente ad exercitationem? Dolore sunt animi voluptates! Omnis, cum possimus? Tempora placeat
      laudantium, commodi sed porro, quaerat, possimus inventore temporibus repellat minima aperiam
      accusamus dolor voluptatem doloribus quam nam blanditiis vel dicta ex fugiat eligendi at cum
      harum culpa alias nam tempora, eveniet deleniti nulla tenetur quo libero. Minima,
      necessitatibus maxime deserunt itaque libero aut vitae quibusdam expedita commodi culpa nihil
      est ex impedit obcaecati explicabo quia eveniet labore quas provident perferendis fuga, ab
      sint error. Aliquid voluptas quod veritatis fugiat, doloribus fuga odio rerum autem totam quae
      tempore optio vitae qui quaerat nihil dignissimos ipsum rem est pariatur sed cumque corporis
      deserunt! Earum culpa repellat tenetur non explicabo deleniti accusantium. Molestiae sapiente
      adipisci praesentium ex fuga nisi unde nam at mollitia labore eos, quaerat eaque ducimus?
      Officiis, eos doloremque dicta sint iusto distinctio molestiae et fugit ipsam facilis in
      officia repudiandae provident nisi, consectetur nobis labore quo laudantium a. Earum eius
      labore quibusdam illo, aperiam consectetur perspiciatis quia, magnam libero tempora voluptatem
      aspernatur quas fugit asperiores consequatur fuga necessitatibus molestiae quos. Excepturi
      expedita eius doloremque qui facilis provident doloribus recusandae eligendi pariatur cum.
    </AppLayout>
  </div>
</template>

<style scoped lang="scss">
.layout-demo {
  height: 100vh;
  position: relative;
}

.layout-demo__controls {
  position: fixed;
  right: 10px;
  top: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1100;
}
</style>
