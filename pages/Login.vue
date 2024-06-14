<script setup>
useHead({
  title: "login"
})
</script>
<template>
    <div class="login">
      <div class="container">
         <section class="box_form" >
            <form method="post">
                <h3>Login</h3>

                <input type="email" name="userName" placeholder="Enter Your E-mail">
                <input type="password" name="password" placeholder="Enter Your password">
                <button type="submit">Login</button>
        </form>
         </section>
      </div>
    </div>
</template>
<style scoped>
.box_form{
    @apply flex justify-center items-center p-3
}

.box_form form{
    @apply flex flex-col justify-center items-center gap-3 p-3 border-[1px]
}
.box_form form h3{
    @apply text-2xl text-gray-950 font-medium
}
.box_form form input{
    @apply outline-none border-[1px] border-neutral-200 px-2 py-1 md:w-[300px] w-full
}
.box_form form input::placeholder{
    @apply text-sm 
}
.box_form form button{
    @apply text-base bg-gray-950 text-white px-5 py-3 md:w-[200px] w-full
}

</style>