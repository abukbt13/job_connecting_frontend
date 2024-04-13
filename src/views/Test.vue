<script setup>
import { ref } from "vue";

const show = ref(false);

</script>

<template>
  <button @click="show = !show" class="btn m-4 btn-primary">Show content</button>
  <div :class="{ 'd-block': show }" class="test ">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet aspernatur aut consectetur dolore dolorum eius, enim esse fugiat id, illo illum iste natus nesciunt nihil
      nobis nulla odio officiis pariatur provident quibusdam quis ratione reprehenderit repudiandae similique, sunt ullam unde. Cum dicta fugiat molestiae obcaecati odit quae quam, quisquam quos. Atque autem commodi consequatur cum eligendi eos error fugiat illo inventore iste iure nostrum obcaecati quasi quia sunt tempora, temporibus, totam ullam unde vero! Aliquam at aut beatae consequuntur, culpa cumque cupiditate dolore ducimus enim esse fugit illum maxime nesciunt non officia possimus reiciendis sequi sint soluta tempora ullam ut vitae voluptate? Commodi doloremque error facilis, nulla tenetur ut! Cum cumque, dolores eaque error, eum hic laudantium libero porro quae quasi repellendus suscipit unde, vero? Ab accusantium, ad at aut error et eveniet fugiat, inventore, minima molestiae natus nesciunt nihil odio perferendis quod reprehenderit saepe! A adipisci atque consequuntur dicta, dolorum eaque est exercitationem expedita facilis fugit incidunt laboriosam magnam minima molestiae necessitatibus optio provident quaerat quia reprehenderit sed similique temporibus veniam! Aperiam assumenda eligendi itaque molestias natus nesciunt nihil quidem quisquam suscipit vero! Explicabo fugit odio quibusdam tempora veritatis! Aliquam assumenda aut autem cum dolore earum facere illum ipsa ipsum laboriosam minima minus odio quis, quisquam rem, sapiente sed soluta velit voluptate voluptatum. Ab accusantium distinctio et eum exercitationem harum impedit in ipsa laboriosam minima molestiae, neque non odit officia placeat praesentium provident quam quas quidem quis quod quos rem repudiandae rerum saepe similique totam, voluptates? Ad corporis exercitationem fugiat laudantium odio provident, quidem quisquam quod. Animi at atque autem dolore ducimus eos est explicabo fuga hic illum incidunt ipsa laborum magnam maxime minima mollitia neque non numquam officia perferendis qui ratione recusandae repellat repellendus, reprehenderit vitae voluptatibus. Adipisci aperiam earum ipsa ut. Adipisci dolorum itaque quibusdam. Accusantium deserunt distinctio doloremque ducimus, eos fuga harum id inventore libero minima officiis quis. Architecto deserunt dicta nemo, nulla repellat repudiandae.</p>
  </div>
</template>



<style scoped>
@media only screen and (min-width: 200px) and (max-width: 400px) {
  .test {
    display: none;
    background-color: grey;
    text-transform: uppercase;
  }
}


</style>