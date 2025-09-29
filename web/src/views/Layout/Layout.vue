<script setup lang="ts">
import { useTemplateRef } from 'vue'

const LayoutRef = useTemplateRef('Layout')
const hideAside = () => {
  if (LayoutRef.value) {
    LayoutRef.value.classList.toggle('hide-aside')
  }
}
const asideNoArea = () => {
  if (LayoutRef.value && !LayoutRef.value.classList.contains('hide-aside')) {
    LayoutRef.value.classList.toggle('aside-no-area')
  }
}
const asideCollapse = () => {
  if (LayoutRef.value) {
    LayoutRef.value.classList.toggle('aside-collapse')
  }
}
const navCollapse = () => {
  if (LayoutRef.value) {
    LayoutRef.value.classList.toggle('nav-collapse')
    LayoutRef.value.classList.toggle('hide-aside')
  }
}
defineOptions({
  name: 'Layout',
})
</script>

<template>
  <div class="Layout" ref="Layout">
    <div class="mask" @click="hideAside"></div>
    <div class="buttons">
      <button @click="hideAside">隐藏侧边栏</button>
      <button @click="asideNoArea">侧边栏不占位</button>
      <button @click="asideCollapse">侧边栏收缩</button>
      <button @click="navCollapse">导航栏收缩</button>
    </div>
    <div class="aside"></div>
    <div class="main">
      <div class="nav">
        <div class="top"></div>
        <div class="bottom"></div>
      </div>
      <div class="content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, commodi minima magnam
        exercitationem animi repellat accusamus aliquam quisquam, alias odit numquam voluptate modi
        maiores in minus sit! Numquam laudantium nemo quaerat voluptatem minima, velit, repellendus
        dolorem cum accusamus explicabo perspiciatis! Recusandae laudantium laboriosam perferendis
        error, pariatur nostrum corrupti voluptates ab saepe alias reiciendis sequi harum sit illo
        asperiores veritatis. Asperiores nobis sequi placeat explicabo nam consequuntur rem atque
        cupiditate, unde distinctio? Laboriosam magnam eaque, tempore molestias itaque quo aliquam
        eius dolorem reprehenderit autem corporis asperiores a delectus incidunt consequuntur magni
        sapiente ad exercitationem? Dolore sunt animi voluptates! Omnis, cum possimus? Tempora
        placeat laudantium, commodi sed porro, quaerat, possimus inventore temporibus repellat
        minima aperiam accusamus dolor voluptatem doloribus quam nam blanditiis vel dicta ex
        consequatur beatae veritatis minus asperiores? Rem nihil hic reiciendis recusandae saepe
        earum unde mollitia, corrupti doloremque voluptatibus corporis debitis. Suscipit corrupti
        sequi, atque nam sunt, molestiae, ad at laudantium commodi eum sit facere. Suscipit impedit
        voluptatum cupiditate error asperiores, quidem totam commodi quo eaque veniam ipsa quibusdam
        odit fugiat velit voluptatibus earum beatae iure facilis vel excepturi! Eius illum sunt
        consequatur fuga magni velit vitae unde eos molestiae possimus laborum, ipsam provident esse
        atque accusamus repudiandae praesentium dolor dolore reiciendis odio cumque reprehenderit
        eveniet aliquid! Placeat et non, aspernatur voluptas modi libero quis ex incidunt at commodi
        labore consequuntur numquam quas pariatur amet doloremque cum ipsa, molestiae delectus
        veritatis voluptatum accusamus laboriosam, veniam sed. Modi neque accusantium omnis
        accusamus sunt et doloribus, consequuntur non blanditiis corporis sit, tempore voluptatem
        itaque rerum eligendi, excepturi doloremque est tenetur ducimus. Nisi deserunt blanditiis
        assumenda animi impedit necessitatibus sint quaerat unde? Doloremque eligendi harum soluta
        quae nisi in, blanditiis reiciendis adipisci modi voluptatibus qui maxime, vero consequuntur
        laudantium unde odit provident inventore ratione. Alias, exercitationem rem. Ipsa magnam ea
        fuga omnis, labore porro ipsum facere delectus facilis quasi impedit excepturi reiciendis
        quas voluptate maxime quidem? Natus harum temporibus iste, similique laborum incidunt
        dignissimos quod molestias adipisci iure ea est numquam placeat, doloremque debitis
        necessitatibus voluptate nam, eum id impedit ut. Ad consequatur sed reiciendis. Repellat
        neque labore autem consectetur amet enim blanditiis facere vitae odio, exercitationem esse
        quasi illo nihil atque voluptas ipsa nam rerum sequi odit quo sit fugiat unde voluptatum.
        Molestiae iusto distinctio, repellendus laborum neque earum officia placeat animi aut, quia
        fugiat eligendi at cum harum culpa alias nam tempora, eveniet deleniti nulla tenetur quo
        libero. Minima, necessitatibus maxime deserunt itaque libero aut vitae quibusdam expedita
        commodi culpa nihil est ex impedit obcaecati explicabo quia eveniet labore quas provident
        perferendis fuga, ab sint error. Aliquid voluptas quod veritatis fugiat, doloribus fuga odio
        rerum autem totam quae tempore optio vitae qui quaerat nihil dignissimos ipsum rem est
        pariatur sed cumque corporis deserunt! Earum culpa repellat tenetur non explicabo deleniti
        maxime aliquam aperiam, natus nobis unde necessitatibus dolorem incidunt, obcaecati fugiat
        hic maiores dicta? Modi quibusdam soluta possimus iste iusto voluptatem nesciunt debitis,
        veritatis ullam magnam provident! Aliquam est totam possimus expedita quasi odit! Vero
        explicabo nam rerum, in consectetur dolore tenetur quaerat aspernatur itaque reprehenderit
        eos ex ea odit error expedita magni voluptates porro ratione, unde numquam molestias
        perferendis mollitia, nulla minima. Inventore magnam animi, eos pariatur repellendus est ea
        mollitia quam cupiditate error repudiandae amet similique reprehenderit, hic eaque incidunt?
        Ullam cupiditate ipsam amet sed sint laborum fugiat in minima eius obcaecati earum sit ea
        veniam voluptatum, odit accusamus fuga voluptatem laboriosam iste repellat rem delectus
        minus explicabo dignissimos. Numquam, pariatur perspiciatis fugit laboriosam omnis repellat
        placeat dignissimos culpa animi aperiam autem qui blanditiis, quaerat, modi expedita
        reprehenderit! Error aliquid odio sint? Sint doloribus saepe consequatur recusandae vitae
        magni qui quidem repellat dolor dolorem, eveniet et iusto unde itaque incidunt excepturi
        enim perferendis. Cum, ut qui vitae laborum velit magnam ipsum voluptatibus sit. Maxime illo
        adipisci, ipsum impedit consequatur amet aliquam debitis perferendis eveniet quam quae
        itaque similique commodi ipsa minus assumenda doloremque nobis nam iure rerum ratione
        quaerat! Nobis, explicabo quasi, at minus officiis laborum, voluptatem deserunt obcaecati
        alias odio repellat quaerat nemo dolorum fuga asperiores excepturi consequuntur ducimus
        incidunt porro praesentium provident iusto perspiciatis? Officiis voluptatibus quisquam
        soluta esse dolorum, itaque officia neque sapiente ut aperiam non, aliquam distinctio quam
        beatae earum fugiat velit explicabo asperiores consequuntur! Saepe officia vitae facere eum
        distinctio magnam aut, nobis esse repellendus tenetur minima doloribus nisi et, assumenda
        voluptatum inventore debitis atque, in quis similique magni. Maiores fugiat exercitationem
        sint eum sit non atque, assumenda officia mollitia provident velit corporis quo, ut ullam
        similique consequatur, distinctio accusantium. Officia modi dolor commodi nostrum sit id
        praesentium fuga minima, unde doloribus consequuntur quam quas vitae nobis tempore,
        deserunt, a dicta delectus! Perspiciatis quis magni tempore maiores inventore explicabo
        eius, dolor nostrum autem tenetur minus vitae libero officiis expedita eos nisi incidunt at
        voluptatum, labore id. Vel iste, consequuntur illo ex nesciunt accusantium sint tenetur
        repudiandae cumque incidunt consectetur dolore quas impedit aut placeat quibusdam officiis,
        a at debitis voluptatibus. Dolorem vel corrupti architecto deserunt deleniti! Rerum iste,
        perspiciatis enim id veniam nesciunt aperiam repellendus, error eos recusandae asperiores
        provident iure, optio quasi dolorem eius! Explicabo id commodi impedit similique fugiat,
        esse pariatur recusandae incidunt quia sunt laudantium sit sed eos optio, corporis nisi
        quaerat cum! Officia fugiat cupiditate quia, incidunt accusamus, repellat non laboriosam
        natus, minus voluptates quisquam. Ipsam, magni ullam laboriosam eligendi doloribus dolore
        possimus itaque modi dignissimos labore laudantium tenetur aperiam reprehenderit ratione
        accusamus dolor officia distinctio laborum voluptate dolorem libero excepturi earum pariatur
        molestiae. Deserunt laudantium officia ipsa autem odio labore? Deleniti fugit blanditiis
        delectus ad, possimus dolorem, rem asperiores non, inventore cum voluptatum cumque
        accusantium. Molestiae sapiente adipisci praesentium ex fuga nisi unde nam at mollitia
        labore eos, quaerat eaque ducimus? Officiis, eos doloremque dicta sint iusto distinctio
        molestiae et fugit ipsam facilis in officia repudiandae provident nisi, consectetur nobis
        labore quo laudantium a. Earum eius labore quibusdam illo, aperiam consectetur perspiciatis
        quia, magnam libero tempora voluptatem aspernatur quas fugit asperiores consequatur fuga
        necessitatibus molestiae quos. Excepturi expedita eius doloremque qui facilis provident
        doloribus recusandae eligendi pariatur cum.
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './style.scss';
</style>
