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
defineOptions({
  name: 'Layout',
})
</script>

<template>
  <div class="Layout" ref="Layout">
    <div class="buttons">
      <button @click="hideAside">隐藏侧边栏</button>
      <button @click="asideNoArea">侧边栏不占位</button>
      <button @click="asideCollapse">侧边栏收缩</button>
    </div>
    <div class="aside"></div>
    <div class="main">
      <div class="nav"></div>
      <div class="content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi facere dicta itaque ab ut
        eveniet aliquam repellendus commodi enim, praesentium maiores! Culpa illum earum id
        laudantium a labore? Doloribus labore ut ratione quasi commodi suscipit eos dolorem eum
        ipsam vero, repudiandae nostrum unde ad fugit impedit eius reprehenderit quos, aperiam
        laborum similique doloremque, a atque nesciunt! At sint unde est nobis, repellendus vitae
        assumenda eligendi recusandae nesciunt officiis eaque ullam non corporis tempore voluptates
        iusto incidunt dolore odio quos dolores saepe quasi? Voluptatum, recusandae debitis? Soluta,
        porro vitae placeat assumenda quod perferendis delectus ut error sequi quasi exercitationem
        aperiam quae, quidem maxime cupiditate. Saepe illo expedita enim neque, placeat totam eius,
        maxime quidem nesciunt est modi rem. Dolorem magnam temporibus, alias dolorum itaque illo
        facere quibusdam enim? At quas iure numquam eius laudantium amet quam corporis neque
        molestias quibusdam et velit ducimus animi minima consectetur harum earum, deleniti aliquam,
        nulla vitae quae architecto optio explicabo. Delectus, quos incidunt accusantium ullam
        repellat similique perferendis quasi aut omnis ut esse recusandae exercitationem officia
        rerum nemo distinctio ipsam fugit. Explicabo, voluptatem ipsam? Dolores vitae necessitatibus
        aliquid saepe ad nesciunt laborum eos dolore molestiae, aspernatur fugit laudantium
        accusantium rem labore voluptatem similique atque quod laboriosam, voluptatum unde. Quam
        blanditiis aut itaque aperiam distinctio nulla iste, eius eos molestias beatae deserunt
        repudiandae quae mollitia cupiditate laborum minus hic expedita natus! Incidunt debitis
        dignissimos suscipit molestias ad, officiis nisi accusantium, ipsum, placeat dolor odio
        inventore modi nihil quibusdam porro repudiandae? Quisquam odio deleniti aliquid, similique
        voluptas illum iure animi nostrum, nesciunt eveniet fugit qui, incidunt a inventore aperiam
        soluta earum dolore eum commodi quibusdam obcaecati. Recusandae iusto id suscipit incidunt
        enim magni fugit? Ut esse alias natus error repellat nobis repellendus ratione nesciunt,
        odit dicta similique est explicabo possimus? Assumenda itaque ducimus dolore tenetur nihil,
        maxime omnis sed illum molestiae, aliquam, repellat ut sequi sapiente! Qui perferendis atque
        obcaecati accusantium officiis vero cum. Obcaecati vel commodi doloribus, nemo maiores
        ducimus aliquid tempora quaerat quidem praesentium iure deserunt officiis eum harum sed ab
        odio. Ut rem a, consectetur voluptatem dolor quo voluptatum ipsam, aliquid nulla iste est
        dolorem accusantium ad. Doloremque hic, asperiores praesentium consectetur aliquam non quas
        perferendis unde deserunt dolor ipsam tenetur nesciunt, quisquam iure corporis id cupiditate
        obcaecati corrupti enim. Ea, provident? Vitae aperiam, doloremque beatae saepe voluptate
        dicta suscipit harum nesciunt, perspiciatis repellat ipsam id ipsa. Unde repellat iure,
        totam facilis itaque reiciendis natus, non odit accusantium enim hic saepe consequatur harum
        iusto laudantium? Distinctio est quia nulla perspiciatis voluptas sapiente quis voluptate
        repellat placeat ipsam assumenda iste vitae id saepe laborum maiores cum, nisi earum optio
        facilis veniam velit, reprehenderit aperiam nemo. Cumque, atque ducimus earum iusto
        exercitationem ut. Expedita quod dolores quia eius, molestiae cum et rerum eligendi quaerat
        doloribus fugiat facilis perspiciatis, ad tempora? Tenetur quam doloribus quos alias. Quia
        totam fuga vel, facilis doloribus corrupti similique assumenda voluptate. Quisquam natus,
        excepturi nulla, eos ab at alias commodi praesentium facilis, minus ratione laudantium sed
        sint labore perferendis. Fuga quo nobis repellendus nostrum, ea ut culpa veniam aliquid enim
        nisi ad aspernatur expedita iste explicabo quae, dignissimos laboriosam inventore.
        Voluptatibus nisi totam vero laborum optio provident, quos suscipit adipisci iusto dolorum
        quasi quisquam sunt. Cum, quam ab dolorum optio blanditiis quos consectetur ducimus libero
        harum perspiciatis ipsa. Hic odio et molestiae reprehenderit cum quasi architecto nihil iure
        explicabo ducimus odit ad in reiciendis consectetur nostrum, ut necessitatibus dignissimos,
        libero dolorum totam provident tenetur eveniet ab? Cumque quisquam officia vero similique
        nemo voluptatibus quasi vel ad ducimus repellendus repellat suscipit facilis inventore dicta
        sed placeat, laborum necessitatibus? Minus voluptatibus nisi eaque, voluptatum minima,
        possimus nobis amet magnam corporis vero dolore quasi, laboriosam similique. Totam deleniti
        repellat non hic inventore asperiores nihil, ipsa unde aut quo. Eius maiores velit sunt
        explicabo ab quam illum dignissimos nulla soluta officia itaque, natus porro sint at cum
        iure voluptatibus. Facere nesciunt impedit illum iure, quisquam placeat magnam quos eius
        cupiditate fugiat. Voluptatibus reiciendis praesentium est et veniam ea temporibus, error
        porro dolore ipsum, quis dolorum doloribus maxime impedit minima inventore quod accusantium
        illo necessitatibus odio ad itaque, asperiores ratione! Fuga suscipit debitis ut iure natus
        deserunt reprehenderit quisquam at ipsum illum unde sint nulla optio, dolor minima. Ratione
        eaque, quis, ut hic ad ea quaerat modi consequuntur corporis esse asperiores ex illo est,
        aliquam neque eius! Odit obcaecati, magni animi consequuntur minus ducimus dolorem quidem
        totam ut amet cum architecto sint nemo ab voluptas quas iure nisi unde voluptatibus quod
        quaerat. Nam blanditiis harum temporibus minus nemo, id, excepturi dicta quaerat
        reprehenderit itaque autem saepe animi illum dolores asperiores voluptas. Reprehenderit
        accusantium ex quam ipsa iste necessitatibus voluptatem error corporis omnis quos sint aut
        eum commodi ipsam distinctio, repellat soluta consequuntur fuga inventore accusamus
        voluptate officiis molestiae? Eveniet, omnis repellat. Sed eligendi quos quibusdam obcaecati
        voluptate, mollitia vitae maiores commodi harum consectetur quas magnam, cupiditate, hic
        eius beatae incidunt molestiae? Ipsum ipsa nostrum explicabo, dolores saepe recusandae odit
        harum, ut qui nobis libero fuga cumque ad optio vel iste pariatur placeat assumenda vero
        quidem obcaecati minima tempore? Aut quibusdam possimus aspernatur quaerat qui assumenda?
        Ducimus itaque molestias, laboriosam nihil at repellendus ipsa enim porro totam amet eaque,
        harum voluptatibus sequi numquam assumenda nesciunt debitis eos nemo natus voluptas dolores
        similique tempore et! Ea, officia pariatur. Tenetur corrupti adipisci aliquid quasi unde
        iusto nostrum fugit quos recusandae eius suscipit ducimus, id, blanditiis eum nam rerum,
        temporibus molestiae quam minus repellendus! Veniam dolores adipisci, facilis ipsam soluta
        quam pariatur recusandae voluptas corporis eligendi distinctio. Nesciunt quasi commodi
        exercitationem sapiente nostrum modi deserunt itaque velit, dicta quis quam maiores et
        neque? Id cum ea harum dolorum. A, hic quas sit autem amet dolorum harum dolores?
        Perspiciatis reprehenderit pariatur earum explicabo dicta corrupti reiciendis illo eos
        voluptatibus accusantium cumque vel porro, fuga, ad iusto temporibus aliquid sit vitae autem
        recusandae, ratione dolor itaque optio. Provident ex, eligendi deleniti iusto quam culpa
        quaerat blanditiis inventore soluta quae molestias consectetur tempore repudiandae ullam
        error debitis. Tempore omnis dignissimos fugiat illo, deleniti commodi!
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './style.scss';
</style>
