<template>
  <div class="">
         
    <div class="px-4 grid grid-cols-3">
         <div class="py-1"></div>
        <button
        class="
          col-start-1 col-end-2
          transition
          delay-150
          duration-300
          rounded
          w-96
          bg-blue-500
          hover:bg-blue-700
          text-white
          font-bold
          py-2
          px-4
          rounded
          ease-in-out
          hover:-translate-y-1 hover:scale-110
          shadow
        "
        @click="this.$router.push('/')"
      >
        Home
      </button>
      <div class="py-3 col-start-1 col-end-2"></div>
      <div
        class="
          px-2
          font-bold
          text-2xl
          col-start-1 col-end-2
          rounded
          px-auto
          bg-gradient-to-r
          from-indigo-400
        "
      >
        What is this website?
      </div>
      <div class="py-1 col-start-1"></div>
      <div
        class="
          px-2
          font-mono
          text-l
          col-start-1 col-end-4
          rounded
          px-auto
          bg-amber-100
          hover:border-solid hover:border-2 hover:border-indigo-600
        "
      >
        This website allows aquarium clubs to digitally manage all aspects of
        in-person auctions, while also providing auction information to all its
        participants. Auction hosts can add new items, mark items as sold, list
        how much items are sold for, as well as retrieve the amount a person has
        spent and earned over the course of an auction. Particpants do not need
        to sign up for any accounts or provide any personal information and can
        view the live website from their mobile devices. Participants can see
        how much they have spent, made, what items are coming up, what items are
        sold, and are also able to get analytical data on sold items to inform
        their future choices as aquarists if they so desire. The website is
        designed to have items be projected to a bigger screen so those who do
        not want to use their phone to participate in an auction do not have to.
      </div>
      <div class="py-1 col-start-1"></div>
      <div
        class="
          px-2
          font-bold
          text-2xl
          col-start-1 col-end-2
          rounded
          px-auto
          bg-gradient-to-r
          from-indigo-400
        "
      >
        Who can use this website?
      </div>
      <div class="py-1 col-start-1"></div>
      <div
        class="
          px-2
          font-mono
          text-l
          col-start-1 col-end-4
          rounded
          px-auto
          bg-amber-100
          hover:border-solid hover:border-2 hover:border-indigo-600
        "
      >
        Anyone, I intend for this to be a free website.
      </div>
      <div class="py-1 col-start-1"></div>
      <div
        class="
          px-2
          font-bold
          text-2xl
          col-start-1 col-end-2
          rounded
          px-auto
          bg-gradient-to-r
          from-indigo-400
        "
      >
        How do I use this website?
      </div>
      <div class="py-1 col-start-1"></div>
      <div
        class="
          px-2
          font-mono
          text-l
          col-start-1 col-end-4
          rounded
          px-auto
          bg-amber-100
          hover:border-solid hover:border-2 hover:border-indigo-600
        "
      >
        Tutorials can be found here.
      </div>

      <div class="py-1 col-start-1"></div>
      <div
        class="
          px-2
          font-bold
          text-2xl
          col-start-1 col-end-2
          rounded
          px-auto
          bg-gradient-to-r
          from-indigo-400
        "
      >
        How did you make this website?
      </div>
      <div class="py-1 col-start-1"></div>
      <div
        class="
          px-2
          font-mono
          text-l
          col-start-1 col-end-4
          rounded
          px-auto
          bg-amber-100
          hover:border-solid hover:border-2 hover:border-indigo-600
        "
      >
        My design process is recored
        <NuxtLink class="text-blue-500 underline hover:text-blue-700" to="/design/fromabout">here</NuxtLink>.
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>